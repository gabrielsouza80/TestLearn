import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import childProcess from 'node:child_process';
import { syncBuiltinESMExports } from 'node:module';
import { checkCatalogAppendOnly } from './check-retained-append-only.mjs';

const current = JSON.parse(
  fs.readFileSync('config/retained-assets.json', 'utf8'),
);
function gitStub(
  t,
  { previous, tree = '', unavailable = false, treeUnavailable = false } = {},
) {
  const calls = [];
  const mocked = t.mock.method(
    childProcess,
    'execFileSync',
    (command, args) => {
      assert.equal(command, 'git');
      calls.push(args);
      if (args[0] === 'show' && args[1] === 'origin/main:package.json') {
        if (unavailable) throw new Error('Missing trusted base');
        return Buffer.from('{}');
      }
      if (
        args[0] === 'show' &&
        args[1] === 'origin/main:config/retained-assets.json'
      ) {
        if (previous === undefined) throw new Error('No catalog in base');
        return typeof previous === 'string'
          ? previous
          : JSON.stringify(previous);
      }
      assert.deepEqual(args, [
        'ls-tree',
        'origin/main',
        'config/retained-assets.json',
      ]);
      if (treeUnavailable) throw new Error('Cannot inspect base tree');
      return tree;
    },
  );
  syncBuiltinESMExports();
  t.after(() => {
    mocked.mock.restore();
    syncBuiltinESMExports();
  });
  return calls;
}

test('non-PR invocation explicitly reports unchecked without reading Git', (t) => {
  const calls = gitStub(t);
  assert.deepEqual(checkCatalogAppendOnly('push', 'main'), {
    checked: false,
    reason: 'Only required for pull requests',
  });
  assert.equal(calls.length, 0);
});
test('an unexpected PR base fails', (t) => {
  const calls = gitStub(t);
  assert.throws(
    () => checkCatalogAppendOnly('pull_request', 'other'),
    /Unexpected pull request base/,
  );
  assert.equal(calls.length, 0);
});
test('missing trusted base is not treated as an empty catalog', (t) => {
  gitStub(t, { unavailable: true });
  assert.throws(
    () => checkCatalogAppendOnly('pull_request', 'main'),
    /Missing trusted base/,
  );
});
test('bootstrap is allowed only when the catalog is absent from the base tree', (t) => {
  const calls = gitStub(t);
  assert.deepEqual(checkCatalogAppendOnly('pull_request', 'main'), {
    checked: true,
    previous: 0,
    current: current.assets.length,
  });
  assert.equal(calls.length, 3);
});
test('an existing immutable subset permits append-only growth', (t) => {
  gitStub(t, {
    previous: { schemaVersion: 1, assets: current.assets.slice(0, 1) },
  });
  assert.deepEqual(checkCatalogAppendOnly('pull_request', 'main'), {
    checked: true,
    previous: 1,
    current: current.assets.length,
  });
});
test('removing an existing base entry fails the wrapper', (t) => {
  gitStub(t, {
    previous: {
      schemaVersion: 1,
      assets: [
        ...current.assets,
        { path: 'assets/index-required.js', sha256: 'a'.repeat(64) },
      ],
    },
  });
  assert.throws(
    () => checkCatalogAppendOnly('pull_request', 'main'),
    /Published asset must not be removed or altered/,
  );
});
test('invalid JSON in an existing base catalog is not a bootstrap', (t) => {
  gitStub(t, {
    previous: '{broken',
    tree: '100644 blob existing config/retained-assets.json',
  });
  assert.throws(
    () => checkCatalogAppendOnly('pull_request', 'main'),
    SyntaxError,
  );
});
test('unreadable base tree fails closed', (t) => {
  gitStub(t, { treeUnavailable: true });
  assert.throws(
    () => checkCatalogAppendOnly('pull_request', 'main'),
    /Cannot inspect base tree/,
  );
});
