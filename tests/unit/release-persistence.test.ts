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
describe('release persistence writer isolation', () => {
  it('serializes this page writes without confusing its own progress with an external update', async () => {
    const writer = createStateWriter(null);
    const first = {
      ...emptyState(),
      active: createSession([questions[0]], 'practice', 0, 1000, 42),
    };
    const second = {
      ...first,
      active: { ...first.active!, flagged: [questions[0].id] },
    };
    expect(
      await Promise.all([writer.save(first), writer.save(second)]),
    ).toEqual(['saved', 'saved']);
    expect(load().state).toEqual(second);
    expect(writer.isCurrent()).toBe(true);
  });
  it('refuses stale writes and all later queued writes after another tab changes the raw snapshot', async () => {
    const writer = createStateWriter(null);
    const raw = JSON.stringify({
      ...emptyState(),
      active: createSession([questions[1]], 'practice', 0, 1000, 42),
    });
    localStorage.setItem('testlearn.v1', raw);
    expect(writer.isCurrent()).toBe(false);
    expect(await writer.save(emptyState())).toBe('conflict');
    expect(await writer.save(emptyState())).toBe('conflict');
    expect(localStorage.getItem('testlearn.v1')).toBe(raw);
  });
  it('uses the origin Web Lock for the check and write when available', async () => {
    const request = vi.fn(async (_name: string, task: () => unknown) => task());
    vi.stubGlobal('navigator', { locks: { request } });
    try {
      expect(await createStateWriter(null).save(emptyState())).toBe('saved');
      expect(request).toHaveBeenCalledWith(
        'testlearn-progress',
        expect.any(Function),
      );
    } finally {
      vi.unstubAllGlobals();
    }
  });
  it('reports blocked/quota storage and never clears unrelated keys', async () => {
    localStorage.setItem('unrelated', 'keep');
    const writer = createStateWriter(null);
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new DOMException('full', 'QuotaExceededError');
    });
    expect(await writer.save(emptyState())).toBe('unavailable');
    expect(localStorage.getItem('unrelated')).toBe('keep');
    expect(localStorage.getItem('testlearn.v1')).toBeNull();
  });
  it('does not replace an unknown record after an unreadable initial store becomes readable', async () => {
    const writer = createStateWriter(undefined);
    localStorage.setItem('testlearn.v1', '{"preserve":true}');
    expect(await writer.save(emptyState())).toBe('conflict');
    expect(readStoredValue()).toBe('{"preserve":true}');
  });
  it('ignores untrusted prototype properties without pollution or overwriting the raw record', () => {
    const raw =
      '{"version":1,"active":null,"history":[],"__proto__":{"polluted":true}}';
    localStorage.setItem('testlearn.v1', raw);
    load();
    expect(({} as { polluted?: boolean }).polluted).toBeUndefined();
    expect(localStorage.getItem('testlearn.v1')).toBe(raw);
  });
});

it('never overwrites unseen progress when reads fail even if the browser would permit writes', async () => {
  const writer = createStateWriter(undefined);
  const set = vi.spyOn(Storage.prototype, 'setItem');
  vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
    throw new DOMException('blocked', 'SecurityError');
  });
  expect(await writer.save(emptyState())).toBe('unavailable');
  expect(set).not.toHaveBeenCalled();
});
