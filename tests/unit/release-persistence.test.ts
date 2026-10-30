import { beforeEach, describe, it, expect, vi } from 'vitest';
import {
  createStateWriter,
  emptyState,
  load,
  readStoredValue,
} from '../../src/storage/store';
import { createSession } from '../../src/domain/engine';
import { questions } from '../../src/data/questions';
beforeEach(() => {
  localStorage.clear();
  vi.restoreAllMocks();
});
describe('synchronous writes under an exclusive page lease', () => {
  it('serializes cancelled effect acquisition before the next StrictMode setup', async () => {
    const writer = createStateWriter(null);
    const cancelled = writer.acquire();
    writer.release();
    const current = writer.acquire();
    expect(await cancelled).toBe('unavailable');
    expect(await current).toBe('saved');
    expect((await navigator.locks.query()).held).toHaveLength(1);
    expect(writer.save(emptyState())).toBe('saved');
    writer.release();
  });
  it('waits for the browser request to settle when releasing and immediately reacquiring', async () => {
    const writer = createStateWriter(null);
    expect(await writer.acquire()).toBe('saved');
    writer.release();
    expect(await writer.acquire()).toBe('saved');
    expect(writer.save(emptyState())).toBe('saved');
    writer.release();
  });
  it('shares one pending acquisition across concurrent callers', async () => {
    const request = vi.spyOn(navigator.locks, 'request');
    const writer = createStateWriter(null);
    const first = writer.acquire(),
      second = writer.acquire();
    expect(first).toBe(second);
    expect(await first).toBe('saved');
    expect(await second).toBe('saved');
    expect(request).toHaveBeenCalledTimes(1);
    writer.release();
  });
  it('does not leak cancelled requests over multiple lifecycle cleanups', async () => {
    const writer = createStateWriter(null);
    const first = writer.acquire();
    writer.release();
    const second = writer.acquire();
    writer.release();
    const third = writer.acquire();
    expect(await Promise.all([first, second, third])).toEqual([
      'unavailable',
      'unavailable',
      'saved',
    ]);
    expect((await navigator.locks.query()).held).toHaveLength(1);
    writer.release();
    expect(await writer.acquire()).toBe('saved');
    writer.release();
  });
  it('retries the same busy writer only after the real owner releases', async () => {
    const first = createStateWriter(null),
      second = createStateWriter(null);
    expect(await first.acquire()).toBe('saved');
    expect(await second.acquire()).toBe('busy');
    expect(await second.acquire()).toBe('busy');
    first.release();
    await expect
      .poll(async () => (await navigator.locks.query()).held?.length)
      .toBe(0);
    expect(await second.acquire()).toBe('saved');
    expect(localStorage.getItem('testlearn.v1')).toBeNull();
    second.release();
  });
  it('cannot own writing when storage is unreadable, and may safely retry after recovery', async () => {
    const writer = createStateWriter(null);
    const read = vi
      .spyOn(Storage.prototype, 'getItem')
      .mockImplementation(() => {
        throw new DOMException('blocked', 'SecurityError');
      });
    expect(await writer.acquire()).toBe('unavailable');
    expect(writer.save(emptyState())).toBe('busy');
    read.mockRestore();
    expect(await writer.acquire()).toBe('saved');
    expect(localStorage.getItem('testlearn.v1')).toBeNull();
    writer.release();
  });
  it('does not resynchronize a stale snapshot when retrying after another writer saved', async () => {
    const first = createStateWriter(null),
      second = createStateWriter(null);
    await first.acquire();
    expect(await second.acquire()).toBe('busy');
    expect(first.save(emptyState())).toBe('saved');
    const raw = readStoredValue();
    first.release();
    await expect
      .poll(async () => (await navigator.locks.query()).held?.length)
      .toBe(0);
    expect(await second.acquire()).toBe('conflict');
    expect(
      second.save({
        ...emptyState(),
        active: createSession([questions[0]], 'practice', 0, 1000, 42),
      }),
    ).toBe('busy');
    expect(readStoredValue()).toBe(raw);
    second.release();
  });
  it('persists each state before save returns, without a promise or effect queue', async () => {
    const writer = createStateWriter(null);
    expect(await writer.acquire()).toBe('saved');
    const first = {
      ...emptyState(),
      active: createSession([questions[0]], 'practice', 0, 1000, 42),
    };
    const second = {
      ...first,
      active: { ...first.active, flagged: [questions[0].id] },
    };
    expect(writer.save(first)).toBe('saved');
    expect(load().state).toEqual(first);
    expect(writer.save(second)).toBe('saved');
    expect(load().state).toEqual(second);
    expect(writer.isCurrent()).toBe(true);
    writer.release();
  });
  it('fails closed before acquiring a lease, and after releasing it', async () => {
    const writer = createStateWriter(null);
    expect(writer.save(emptyState())).toBe('busy');
    expect(localStorage.getItem('testlearn.v1')).toBeNull();
    await writer.acquire();
    writer.release();
    expect(writer.save(emptyState())).toBe('busy');
  });
  it('prevents simultaneous writers; a fresh page may acquire after the owner releases', async () => {
    const first = createStateWriter(null),
      second = createStateWriter(null);
    expect(await first.acquire()).toBe('saved');
    expect(await second.acquire()).toBe('busy');
    expect(first.save(emptyState())).toBe('saved');
    expect(second.save(emptyState())).toBe('busy');
    first.release();
    await Promise.resolve();
    await Promise.resolve();
    const fresh = createStateWriter(readStoredValue());
    expect(await fresh.acquire()).toBe('saved');
    fresh.release();
  });
  it('refuses unexpected raw changes and every later write without replacing newer data', async () => {
    const writer = createStateWriter(null);
    await writer.acquire();
    const raw = '{"preserve":true}';
    localStorage.setItem('testlearn.v1', raw);
    expect(writer.isCurrent()).toBe(false);
    expect(writer.save(emptyState())).toBe('conflict');
    expect(writer.save(emptyState())).toBe('conflict');
    expect(readStoredValue()).toBe(raw);
    writer.release();
  });
  it('reports storage quota and preserves previous progress and unrelated keys', async () => {
    localStorage.setItem('unrelated', 'keep');
    const writer = createStateWriter(null);
    await writer.acquire();
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new DOMException('full', 'QuotaExceededError');
    });
    expect(writer.save(emptyState())).toBe('unavailable');
    expect(readStoredValue()).toBeNull();
    expect(localStorage.getItem('unrelated')).toBe('keep');
    writer.release();
  });
  it('does not overwrite unseen progress when initial reads were unavailable', async () => {
    const writer = createStateWriter(undefined);
    localStorage.setItem('testlearn.v1', '{"preserve":true}');
    expect(await writer.acquire()).toBe('conflict');
    expect(writer.save(emptyState())).toBe('busy');
    expect(readStoredValue()).toBe('{"preserve":true}');
    writer.release();
  });
  it('never writes if a later read fails', async () => {
    const writer = createStateWriter(null);
    await writer.acquire();
    const set = vi.spyOn(Storage.prototype, 'setItem');
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new DOMException('blocked', 'SecurityError');
    });
    expect(writer.save(emptyState())).toBe('unavailable');
    expect(set).not.toHaveBeenCalled();
    writer.release();
  });
  it('does not trust prototype properties or replace the original record when loading', () => {
    const raw =
      '{"version":1,"active":null,"history":[],"__proto__":{"polluted":true}}';
    localStorage.setItem('testlearn.v1', raw);
    load();
    expect(({} as { polluted?: boolean }).polluted).toBeUndefined();
    expect(readStoredValue()).toBe(raw);
  });
  it('fails closed when Web Locks rejects or is unsupported', async () => {
    vi.stubGlobal('navigator', {
      locks: { request: () => Promise.reject(new Error('lock failure')) },
    });
    try {
      expect(await createStateWriter(null).acquire()).toBe('unavailable');
      vi.stubGlobal('navigator', {});
      expect(await createStateWriter(null).acquire()).toBe('unavailable');
    } finally {
      vi.unstubAllGlobals();
    }
  });
});
