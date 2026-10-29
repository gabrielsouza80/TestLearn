/** Deterministic origin lock model for jsdom; real engines are tested by Playwright. */
export function createTestLocks(): LockManager {
  const held = new Set<string>();
  function request<T>(
    name: string,
    callback: LockGrantedCallback<T>,
  ): Promise<T>;
  function request<T>(
    name: string,
    options: LockOptions,
    callback: LockGrantedCallback<T>,
  ): Promise<T>;
  function request<T>(
    name: string,
    options: LockOptions | LockGrantedCallback<T>,
    task?: LockGrantedCallback<T>,
  ): Promise<T> {
    const callback = typeof options === 'function' ? options : task!;
    if (held.has(name)) return Promise.resolve(callback(null));
    held.add(name);
    return Promise.resolve(
      callback({ name, mode: 'exclusive' } as Lock),
    ).finally(() => held.delete(name));
  }
  return {
    request,
    query: async () => ({
      held: [...held].map((name) => ({ name, mode: 'exclusive' as const })),
      pending: [],
    }),
  };
}
