import { CONTENT_REVISION } from '../domain/revision';
import { validateBank, type Question } from '../domain/question';
const archiveLoaders = {
  '2026-10-27.1': () =>
    import('./archive/questions-2026-10-27.1.json').then((m) => m.default),
  '2026-10-27.2': () =>
    import('./archive/questions-2026-10-27.2.json').then((m) => m.default),
  '2026-10-27.3': () =>
    import('./archive/questions-2026-10-27.3.json').then((m) => m.default),
  '2026-10-27.4': () =>
    import('./archive/questions-2026-10-27.4.json').then((m) => m.default),
  '2026-10-27.5': () =>
    import('./archive/questions-2026-10-27.5.json').then((m) => m.default),
  '2026-10-27.6': () =>
    import('./archive/questions-2026-10-27.6.json').then((m) => m.default),
};
type ArchiveRevision = keyof typeof archiveLoaders;
type Loaders = Record<ArchiveRevision, () => Promise<unknown>>;
export class BankNotReadyError extends Error {
  constructor(public readonly revision: string) {
    super(`Question bank ${revision} is not loaded`);
    this.name = 'BankNotReadyError';
  }
}
export class BankLoadError extends Error {
  constructor(
    public readonly revision: string,
    options?: ErrorOptions,
  ) {
    super(`Could not load or validate question bank ${revision}`, options);
    this.name = 'BankLoadError';
  }
}
export function createQuestionBankRegistry(loaders: Loaders = archiveLoaders) {
  const ready = new Map<string, Question[]>();
  const pending = new Map<string, Promise<Question[]>>();
  const supported = (revision: string): revision is ArchiveRevision =>
    Object.hasOwn(archiveLoaders, revision);
  function getQuestionBank(revision: string, current: Question[]): Question[] {
    if (revision === CONTENT_REVISION) return current;
    if (!supported(revision))
      throw new Error(`Unsupported content revision: ${revision}`);
    const bank = ready.get(revision);
    if (!bank) throw new BankNotReadyError(revision);
    return bank;
  }
  function loadQuestionBank(
    revision: string,
    current: Question[],
  ): Promise<Question[]> {
    if (revision === CONTENT_REVISION) return Promise.resolve(current);
    if (!supported(revision))
      return Promise.reject(
        new Error(`Unsupported content revision: ${revision}`),
      );
    const bank = ready.get(revision);
    if (bank) return Promise.resolve(bank);
    const existing = pending.get(revision);
    if (existing) return existing;
    const request = Promise.resolve()
      .then(() => loaders[revision]())
      .then((raw) => {
        if (
          !Array.isArray(raw) ||
          raw.length === 0 ||
          validateBank(raw).length > 0
        )
          throw new Error('Invalid archived question bank');
        const validated = raw as Question[];
        ready.set(revision, validated);
        return validated;
      })
      .catch((cause: unknown) => {
        throw new BankLoadError(revision, { cause });
      })
      .finally(() => {
        pending.delete(revision);
      });
    pending.set(revision, request);
    return request;
  }
  return { getQuestionBank, loadQuestionBank };
}
export const { getQuestionBank, loadQuestionBank } =
  createQuestionBankRegistry();
