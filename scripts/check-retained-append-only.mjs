import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import {
  readRetainedCatalog,
  parseRetainedCatalog,
  assertAppendOnly,
} from './check-retained-assets.mjs';

const CATALOG = 'config/retained-assets.json';
const TARGETS = new Set(['main', 'develop']);
function commitSHA(value, label) {
  assert(
    typeof value === 'string' &&
      /^[a-f0-9]{40}$/.test(value) &&
      value !== '0'.repeat(40),
    'Invalid ' + label + ' commit SHA',
  );
  return value;
}
export function checkCatalogAppendOnly({
  env = process.env,
  cwd = process.cwd(),
} = {}) {
  const eventName = env.GITHUB_EVENT_NAME;
  assert(
    ['pull_request', 'push', 'workflow_dispatch'].includes(eventName),
    'Unsupported GitHub event',
  );
  assert(
    typeof env.GITHUB_EVENT_PATH === 'string' &&
      env.GITHUB_EVENT_PATH.length > 0,
    'Missing GitHub event path',
  );
  const event = JSON.parse(fs.readFileSync(env.GITHUB_EVENT_PATH, 'utf8'));
  assert(
    event && typeof event === 'object' && !Array.isArray(event),
    'Invalid GitHub event payload',
  );
  const candidateCommit = commitSHA(env.GITHUB_SHA, 'candidate');
  let target;
  let baseCommit;
  let headCommit;
  if (eventName === 'pull_request') {
    target = event.pull_request?.base?.ref;
    assert(TARGETS.has(target), 'Unsupported target branch');
    assert.equal(env.GITHUB_BASE_REF, target, 'PR base ref mismatch');
    assert.match(
      env.GITHUB_REF ?? '',
      /^refs\/pull\/[1-9][0-9]*\/merge$/,
      'Unexpected PR checkout ref',
    );
    baseCommit = commitSHA(event.pull_request?.base?.sha, 'base');
    headCommit = commitSHA(event.pull_request?.head?.sha, 'PR head');
  } else {
    target = /^refs\/heads\/(main|develop)$/.exec(env.GITHUB_REF ?? '')?.[1];
    assert(TARGETS.has(target), 'Unsupported target branch');
    if (eventName === 'push') {
      assert.equal(event.ref, env.GITHUB_REF, 'Push ref mismatch');
      assert(
        event.deleted === false && event.forced === false,
        'Forced or deleted push',
      );
      assert.equal(event.after, candidateCommit, 'Push after mismatch');
      baseCommit = commitSHA(event.before, 'base');
    } else {
      baseCommit = commitSHA(event.inputs?.retention_base_sha, 'base');
    }
  }
  const git = (...args) =>
    execFileSync('git', args, { cwd, encoding: 'utf8', stdio: 'pipe' }).trim();
  assert.equal(
    git('rev-parse', 'HEAD'),
    candidateCommit,
    'Checkout does not match event commit',
  );
  try {
    git('cat-file', '-e', baseCommit + '^{commit}');
  } catch {
    throw new Error('Cannot read base commit: ' + baseCommit);
  }
  try {
    git('merge-base', '--is-ancestor', baseCommit, candidateCommit);
  } catch {
    throw new Error('Base is not an ancestor of candidate');
  }
  if (headCommit) {
    try {
      git('merge-base', '--is-ancestor', headCommit, candidateCommit);
    } catch {
      throw new Error('PR head is not an ancestor of candidate');
    }
  }
  if (eventName === 'workflow_dispatch')
    assert.equal(
      baseCommit,
      git('rev-parse', candidateCommit + '^1'),
      'Dispatch base must be the first parent',
    );
  git('show', baseCommit + ':package.json');
  const entry = git('ls-tree', baseCommit, '--', CATALOG);
  const previous =
    entry.length === 0
      ? { schemaVersion: 1, assets: [] }
      : parseRetainedCatalog(git('show', baseCommit + ':' + CATALOG));
  const committed = parseRetainedCatalog(
    git('show', candidateCommit + ':' + CATALOG),
  );
  const current = readRetainedCatalog(path.join(cwd, CATALOG));
  assert.deepEqual(
    current,
    committed,
    'Working catalog differs from checked out commit',
  );
  assertAppendOnly(previous, current);
  return {
    checked: true,
    event: eventName,
    target,
    baseCommit,
    candidateCommit,
    previous: previous.assets.length,
    current: current.assets.length,
  };
}
if (
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
)
  console.log(JSON.stringify(checkCatalogAppendOnly(), null, 2));
