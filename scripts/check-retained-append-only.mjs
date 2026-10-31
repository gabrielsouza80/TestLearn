import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readRetainedCatalog, assertAppendOnly } from './check-retained-assets.mjs';

export function checkCatalogAppendOnly(
  eventName = process.env.GITHUB_EVENT_NAME,
  baseRef = process.env.GITHUB_BASE_REF,
) {
  if (eventName !== 'pull_request') {
    return { checked: false, reason: 'Only required for pull requests' };
  }
  assert.equal(baseRef, 'main', 'Unexpected pull request base');
  execFileSync('git', ['show', 'origin/main:package.json'], {
    stdio: 'pipe',
  });
  let previous = { schemaVersion: 1, assets: [] };
  try {
    previous = JSON.parse(
      execFileSync(
        'git',
        ['show', 'origin/main:config/retained-assets.json'],
        { encoding: 'utf8', stdio: 'pipe' },
      ),
    );
  } catch (error) {
    const exists = execFileSync(
      'git',
      ['ls-tree', 'origin/main', 'config/retained-assets.json'],
      { encoding: 'utf8' },
    ).trim();
    if (exists.length !== 0) throw error;
  }
  const current = readRetainedCatalog();
  assertAppendOnly(previous, current);
  return {
    checked: true,
    previous: previous.assets.length,
    current: current.assets.length,
  };
}

if (process.argv[1]?.endsWith('check-retained-append-only.mjs'))
  console.log(JSON.stringify(checkCatalogAppendOnly(), null, 2));
