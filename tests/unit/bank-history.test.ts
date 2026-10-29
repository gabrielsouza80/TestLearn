import { describe, it, expect, vi } from 'vitest';
import {
  createQuestionBankRegistry,
  BankNotReadyError,
  BankLoadError,
} from '../../src/data/bank-history';
import { questions } from '../../src/data/questions';
import { CONTENT_REVISION } from '../../src/domain/revision';
import {
  legacyQuestions,
  auditedQuestions,
  blueprintArchivedQuestions,
  coverageArchivedQuestions,
  bilingualArchivedQuestions,
  variabilityArchivedQuestions,
  qualityArchivedQuestions,
  terminologyArchivedQuestions,
} from '../fixtures/banks';
const banks = {
  '2026-10-27.1': legacyQuestions,
  '2026-10-27.2': auditedQuestions,
  '2026-10-27.3': blueprintArchivedQuestions,
  '2026-10-27.4': coverageArchivedQuestions,
  '2026-10-27.5': bilingualArchivedQuestions,
  '2026-10-27.6': variabilityArchivedQuestions,
  '2026-10-27.7': qualityArchivedQuestions,
  '2026-10-27.8': terminologyArchivedQuestions,
};
function fixtures() {
  return {
    '2026-10-27.1': vi.fn(async () => banks['2026-10-27.1']),
    '2026-10-27.2': vi.fn(async () => banks['2026-10-27.2']),
    '2026-10-27.3': vi.fn(async () => banks['2026-10-27.3']),
    '2026-10-27.4': vi.fn(async () => banks['2026-10-27.4']),
    '2026-10-27.5': vi.fn(async () => banks['2026-10-27.5']),
    '2026-10-27.6': vi.fn(async () => banks['2026-10-27.6']),
    '2026-10-27.7': vi.fn(async () => banks['2026-10-27.7']),
    '2026-10-27.8': vi.fn(async () => banks['2026-10-27.8']),
  };
}
describe('on-demand immutable revisions', () => {
  it('uses the active bank without invoking any archive loader', async () => {
    const loaders = fixtures();
    const registry = createQuestionBankRegistry(loaders);
    expect(registry.getQuestionBank(CONTENT_REVISION, questions)).toBe(
      questions,
    );
    expect(await registry.loadQuestionBank(CONTENT_REVISION, questions)).toBe(
      questions,
    );
    for (const loader of Object.values(loaders))
      expect(loader).not.toHaveBeenCalled();
  });
  it.each(Object.keys(banks) as (keyof typeof banks)[])(
    'selects only %s and caches exact content including all keys and rationales',
    async (revision) => {
      const loaders = fixtures();
      const registry = createQuestionBankRegistry(loaders);
      expect(() => registry.getQuestionBank(revision, questions)).toThrow(
        BankNotReadyError,
      );
      const bank = await registry.loadQuestionBank(revision, questions);
      expect(bank).toBe(banks[revision]);
      expect(bank).not.toBe(questions);
      expect(registry.getQuestionBank(revision, questions)).toBe(bank);
      expect(await registry.loadQuestionBank(revision, questions)).toBe(bank);
      for (const [id, loader] of Object.entries(loaders))
        expect(loader).toHaveBeenCalledTimes(id === revision ? 1 : 0);
    },
  );
  it('denies unknown revisions without invoking loaders or substituting current questions', async () => {
    const loaders = fixtures();
    const registry = createQuestionBankRegistry(loaders);
    for (const revision of ['2099-01-01.1', '__proto__', 'toString', '']) {
      expect(() => registry.getQuestionBank(revision, questions)).toThrow(
        'Unsupported',
      );
      await expect(
        registry.loadQuestionBank(revision, questions),
      ).rejects.toThrow('Unsupported');
    }
    for (const loader of Object.values(loaders))
      expect(loader).not.toHaveBeenCalled();
  });
  it('shares an in-flight promise and releases failures for an explicit retry', async () => {
    const loaders = fixtures();
    let reject!: (error: Error) => void;
    loaders['2026-10-27.1'].mockImplementationOnce(
      () =>
        new Promise((_, no) => {
          reject = no;
        }),
    );
    const registry = createQuestionBankRegistry(loaders);
    const first = registry.loadQuestionBank('2026-10-27.1', questions);
    const second = registry.loadQuestionBank('2026-10-27.1', questions);
    expect(first).toBe(second);
    await Promise.resolve();
    const rejected = expect(first).rejects.toBeInstanceOf(BankLoadError);
    reject(new Error('offline'));
    await rejected;
    expect(() => registry.getQuestionBank('2026-10-27.1', questions)).toThrow(
      BankNotReadyError,
    );
    expect(await registry.loadQuestionBank('2026-10-27.1', questions)).toBe(
      legacyQuestions,
    );
    expect(loaders['2026-10-27.1']).toHaveBeenCalledTimes(2);
  });
  it.each([
    [],
    {},
    [{ ...legacyQuestions[0], correct: ['absent'] }],
    [legacyQuestions[0], legacyQuestions[0]],
  ])('rejects malformed/empty archives: %j', async (raw) => {
    const registry = createQuestionBankRegistry({
      ...fixtures(),
      '2026-10-27.1': async () => raw,
    });
    await expect(
      registry.loadQuestionBank('2026-10-27.1', questions),
    ).rejects.toBeInstanceOf(BankLoadError);
    expect(() => registry.getQuestionBank('2026-10-27.1', questions)).toThrow(
      BankNotReadyError,
    );
  });
});
