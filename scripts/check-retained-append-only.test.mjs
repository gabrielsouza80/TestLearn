import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { tmpdir } from 'node:os';
import { execFileSync, spawnSync } from 'node:child_process';

const script = path.resolve('scripts/check-retained-append-only.mjs');
const a = {
  path: 'assets/index-fixtureA.js',
  sha256: 'a'.repeat(64),
  sourceCommit: '1'.repeat(40),
};
const b = {
  path: 'assets/index-fixtureB.js',
  sha256: 'b'.repeat(64),
  sourceCommit: '2'.repeat(40),
};
const c = {
  path: 'assets/index-fixtureC.js',
  sha256: 'c'.repeat(64),
  sourceCommit: '3'.repeat(40),
};
function fixture(t, current = [a, b]) {
  const parent = path.resolve(tmpdir());
  const cwd = fs.mkdtempSync(path.join(parent, 'testlearn-retention-'));
  assert.equal(path.dirname(cwd), parent);
  const env = Object.fromEntries(
    Object.entries(process.env).filter(
      ([key]) => !key.startsWith('GIT_') && !key.startsWith('GITHUB_'),
    ),
  );
  Object.assign(env, {
    GIT_CONFIG_NOSYSTEM: '1',
    GIT_CONFIG_GLOBAL: process.platform === 'win32' ? 'NUL' : '/dev/null',
  });
  const git = (...args) =>
    execFileSync('git', args, {
      cwd,
      env,
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'pipe'],
    }).trim();
  git('init', '--quiet');
  git('config', 'user.name', 'TestLearn fixture');
  git('config', 'user.email', 'fixture@example.invalid');
  git('config', 'core.autocrlf', 'false');
  fs.writeFileSync(path.join(cwd, 'package.json'), '{}\n');
  git('add', 'package.json');
  fs.mkdirSync(path.join(cwd, 'config'));
  const catalogFile = path.join(cwd, 'config/retained-assets.json');
  const write = (assets) =>
    fs.writeFileSync(
      catalogFile,
      typeof assets === 'string'
        ? assets
        : JSON.stringify({ schemaVersion: 1, assets }),
    );
  const commit = (assets, parents, message) => {
    if (assets !== null) {
      write(assets);
      git('add', 'config/retained-assets.json');
    }
    const tree = git('write-tree');
    return git(
      'commit-tree',
      tree,
      ...parents.flatMap((p) => ['-p', p]),
      '-m',
      message,
    );
  };
  const bootstrap = commit(null, [], 'bootstrap without catalog');
  const main = commit([a], [bootstrap], 'main retains A');
  const develop = commit([a, b], [main], 'develop additionally retains B');
  const head = commit(current, [develop], 'candidate');
  git('update-ref', 'HEAD', head);
  git('update-ref', 'refs/remotes/origin/main', main);
  git('update-ref', 'refs/remotes/origin/develop', develop);
  t.after(() => {
    assert.equal(path.dirname(cwd), parent);
    fs.rmSync(cwd, { recursive: true, force: true });
  });
  const run = (eventName = 'pull_request', overrides = {}, extraEnv = {}) => {
    const event =
      eventName === 'pull_request'
        ? {
            pull_request: {
              base: { ref: 'develop', sha: develop },
              head: { sha: head },
            },
            ...overrides,
          }
        : eventName === 'push'
          ? {
              ref: 'refs/heads/develop',
              before: develop,
              after: head,
              deleted: false,
              forced: false,
              ...overrides,
            }
          : { inputs: { retention_base_sha: develop }, ...overrides };
    const eventFile = path.join(cwd, 'event.json');
    fs.writeFileSync(eventFile, JSON.stringify(event));
    return spawnSync(process.execPath, [script], {
      cwd,
      env: {
        ...env,
        GITHUB_EVENT_NAME: eventName,
        GITHUB_EVENT_PATH: eventFile,
        GITHUB_SHA: head,
        GITHUB_REF:
          eventName === 'pull_request'
            ? 'refs/pull/17/merge'
            : 'refs/heads/develop',
        GITHUB_BASE_REF: eventName === 'pull_request' ? 'develop' : '',
        ...extraEnv,
      },
      encoding: 'utf8',
    });
  };
  return { cwd, git, run, write, commit, bootstrap, main, develop, head };
}
function success(r, target, previous) {
  assert.equal(r.status, 0, r.stderr);
  const result = JSON.parse(r.stdout);
  assert.equal(result.checked, true);
  assert.equal(result.target, target);
  assert.equal(result.previous, previous);
  return result;
}
function failure(r, pattern) {
  assert.equal(r.status, 1, r.stdout);
  assert.match(r.stderr, pattern);
}

for (const target of ['main', 'develop'])
  test(`PR to ${target} validates its exact event base`, (t) => {
    const f = fixture(t);
    const sha = f[target];
    const result = success(
      f.run(
        'pull_request',
        { pull_request: { base: { ref: target, sha }, head: { sha: f.head } } },
        { GITHUB_BASE_REF: target },
      ),
      target,
      target === 'main' ? 1 : 2,
    );
    assert.equal(result.baseCommit, sha);
    assert.equal(result.candidateCommit, f.head);
  });
test('PR to develop cannot remove B even though main only retains A', (t) => {
  const f = fixture(t, [a]);
  failure(
    f.run(),
    /Published asset must not be removed or altered: assets\/index-fixtureB.js/,
  );
});
test('an immutable metadata alteration fails', (t) => {
  const f = fixture(t, [a, { ...b, sourceCommit: '9'.repeat(40) }]);
  failure(f.run(), /Published asset must not be removed or altered/);
});
test('a changed origin/develop cannot replace the event-pinned base', (t) => {
  const f = fixture(t);
  const advanced = f.commit([a, b, c], [f.develop], 'later target');
  f.git('update-ref', 'refs/remotes/origin/develop', advanced);
  f.write([a, b]);
  success(f.run(), 'develop', 2);
});
test('an unsupported PR target fails', (t) => {
  const f = fixture(t);
  failure(
    f.run(
      'pull_request',
      {
        pull_request: {
          base: { ref: 'other', sha: f.develop },
          head: { sha: f.head },
        },
      },
      { GITHUB_BASE_REF: 'other' },
    ),
    /Unsupported target branch/,
  );
});
test('a PR base environment mismatch fails', (t) => {
  const f = fixture(t);
  failure(
    f.run('pull_request', {}, { GITHUB_BASE_REF: 'main' }),
    /PR base ref mismatch/,
  );
});
for (const bad of [
  '',
  '0'.repeat(40),
  'HEAD',
  'main:config/retained-assets.json',
  '--help',
])
  test(`invalid base SHA ${bad || '(empty)'} fails`, (t) => {
    const f = fixture(t);
    failure(
      f.run('pull_request', {
        pull_request: {
          base: { ref: 'develop', sha: bad },
          head: { sha: f.head },
        },
      }),
      /Invalid base commit SHA/,
    );
  });
test('missing base commit is not treated as an empty catalog', (t) => {
  const f = fixture(t);
  failure(
    f.run('pull_request', {
      pull_request: {
        base: { ref: 'develop', sha: 'e'.repeat(40) },
        head: { sha: f.head },
      },
    }),
    /Cannot read base commit/,
  );
});
test('non-ancestor base fails', (t) => {
  const f = fixture(t);
  const unrelated = f.commit([a, b], [], 'unrelated');
  failure(
    f.run('pull_request', {
      pull_request: {
        base: { ref: 'develop', sha: unrelated },
        head: { sha: f.head },
      },
    }),
    /Base is not an ancestor/,
  );
});
test('wrong checked out commit fails', (t) => {
  const f = fixture(t);
  failure(
    f.run('pull_request', {}, { GITHUB_SHA: f.main }),
    /Checkout does not match event commit/,
  );
});
test('PR head must be included in the checked out candidate', (t) => {
  const f = fixture(t);
  const unrelated = f.commit([a, b], [], 'unrelated head');
  failure(
    f.run('pull_request', {
      pull_request: {
        base: { ref: 'develop', sha: f.develop },
        head: { sha: unrelated },
      },
    }),
    /PR head is not an ancestor/,
  );
});
for (const target of ['main', 'develop'])
  test(`push to ${target} compares the before SHA`, (t) => {
    const f = fixture(t);
    const before = f[target];
    const r = success(
      f.run(
        'push',
        { ref: 'refs/heads/' + target, before },
        { GITHUB_REF: 'refs/heads/' + target },
      ),
      target,
      target === 'main' ? 1 : 2,
    );
    assert.equal(r.baseCommit, before);
  });
test('push cannot remove assets from its before commit', (t) => {
  const f = fixture(t, [a]);
  failure(f.run('push'), /Published asset must not be removed or altered/);
});
test('push with zero before fails closed', (t) => {
  const f = fixture(t);
  failure(f.run('push', { before: '0'.repeat(40) }), /Invalid base commit SHA/);
});
test('push ref mismatch fails', (t) => {
  const f = fixture(t);
  failure(f.run('push', { ref: 'refs/heads/main' }), /Push ref mismatch/);
});
test('forced push event is refused', (t) => {
  const f = fixture(t);
  failure(f.run('push', { forced: true }), /Forced or deleted push/);
});
test('deleted push event is refused', (t) => {
  const f = fixture(t);
  failure(f.run('push', { deleted: true }), /Forced or deleted push/);
});
test('push after must match event SHA', (t) => {
  const f = fixture(t);
  failure(f.run('push', { after: f.main }), /Push after mismatch/);
});
test('dispatch requires its explicit first-parent comparison', (t) => {
  const f = fixture(t);
  success(f.run('workflow_dispatch'), 'develop', 2);
});
test('dispatch without a comparison SHA fails closed', (t) => {
  const f = fixture(t);
  failure(
    f.run('workflow_dispatch', { inputs: {} }),
    /Invalid base commit SHA/,
  );
});
test('dispatch cannot select an older convenient ancestor', (t) => {
  const f = fixture(t);
  failure(
    f.run('workflow_dispatch', { inputs: { retention_base_sha: f.main } }),
    /Dispatch base must be the first parent/,
  );
});
test('unsupported events fail rather than report unchecked', (t) => {
  const f = fixture(t);
  failure(f.run('schedule'), /Unsupported GitHub event/);
});
test('an unreadable event file fails closed', (t) => {
  const f = fixture(t);
  failure(
    f.run('push', {}, { GITHUB_EVENT_PATH: path.join(f.cwd, 'absent.json') }),
    /ENOENT/,
  );
});
for (const [previous, expected] of [
  ['{invalid', /SyntaxError/],
  [
    JSON.stringify({ schemaVersion: 2, assets: [a, b] }),
    /Unknown retained-assets schema/,
  ],
  [
    JSON.stringify({ schemaVersion: 1, assets: [] }),
    /Retained asset count must be between 1 and 250/,
  ],
])
  test(`invalid existing base catalog fails: ${previous.slice(0, 35)}`, (t) => {
    const f = fixture(t);
    const invalid = f.commit(previous, [f.main], 'invalid catalog');
    const head = f.commit([a, b], [invalid], 'candidate after invalid');
    f.git('update-ref', 'HEAD', head);
    failure(
      f.run('push', { before: invalid, after: head }, { GITHUB_SHA: head }),
      expected,
    );
  });
test('bootstrap is allowed only for a real ancestor with no catalog', (t) => {
  const f = fixture(t);
  success(
    f.run(
      'pull_request',
      {
        pull_request: {
          base: { ref: 'main', sha: f.bootstrap },
          head: { sha: f.head },
        },
      },
      { GITHUB_BASE_REF: 'main' },
    ),
    'main',
    0,
  );
});
test('invalid candidate catalog fails', (t) => {
  const f = fixture(t, [{ ...a, sha256: 'invalid' }]);
  failure(f.run(), /Invalid retained asset SHA-256/);
});
test('missing current catalog fails', (t) => {
  const f = fixture(t);
  fs.unlinkSync(path.join(f.cwd, 'config/retained-assets.json'));
  failure(f.run(), /ENOENT/);
});
test('uncommitted catalog change cannot impersonate the checkout', (t) => {
  const f = fixture(t);
  f.write([a]);
  failure(f.run(), /Working catalog differs from checked out commit/);
});
test('malformed event JSON fails before comparison', (t) => {
  const f = fixture(t);
  const file = path.join(f.cwd, 'bad-event.json');
  fs.writeFileSync(file, '{broken');
  failure(f.run('push', {}, { GITHUB_EVENT_PATH: file }), /SyntaxError/);
});
test('a null event is rejected as an invalid payload', (t) => {
  const f = fixture(t);
  const file = path.join(f.cwd, 'null-event.json');
  fs.writeFileSync(file, 'null');
  failure(
    f.run('push', {}, { GITHUB_EVENT_PATH: file }),
    /Invalid GitHub event payload/,
  );
});
test('a missing base package cannot masquerade as bootstrap', (t) => {
  const f = fixture(t);
  f.git('rm', 'package.json');
  const base = f.commit([a], [], 'not an application base');
  const head = f.commit([a, b], [base], 'candidate');
  f.git('update-ref', 'HEAD', head);
  failure(
    f.run('push', { before: base, after: head }, { GITHUB_SHA: head }),
    /package.json.*does not exist|does not exist.*package.json/,
  );
});
