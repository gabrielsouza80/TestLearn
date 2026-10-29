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
