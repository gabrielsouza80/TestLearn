import assert from 'node:assert/strict';
import { test } from 'node:test';
import { checkVercelBuild } from './check-vercel-build.mjs';

test(
  'production builds with .vercelignore applied and contains no pilot data',
  { timeout: 240000 },
  () => {
    const result = checkVercelBuild();
    assert.equal(result.status, 0, result.output);
    assert.equal(result.release.archiveChunks, 8);
    assert.equal(result.release.privateAssets, 0);
    assert.equal(result.isolation.pilotQuestions, 10);
    assert(result.isolation.filesChecked > 0);
  },
);
