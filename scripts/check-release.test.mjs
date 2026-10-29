import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { inspectRelease } from './check-release.mjs';
function fixture(extra) {
  fs.mkdirSync('tmp/phase9', { recursive: true });
  const root = fs.mkdtempSync('tmp/phase9/artifact-test-');
  fs.mkdirSync(path.join(root, 'assets'));
  fs.mkdirSync(path.join(root, '.vite'));
  const manifest = {
    'index.html': {
      isEntry: true,
      file: 'assets/index-test.js',
      dynamicImports: [],
    },
  };
  fs.writeFileSync(
    path.join(root, 'index.html'),
    '<title>Public Beta</title><meta name="robots" content="noindex, nofollow">',
  );
  fs.writeFileSync(path.join(root, 'assets/index-test.js'), 'export {};');
  for (let n = 1; n <= 8; n++) {
    const key = `src/data/archive/questions-2026-10-27.${n}.json`,
      file = `assets/questions-2026-10-27.${n}-test.js`;
    manifest['index.html'].dynamicImports.push(key);
    manifest[key] = { file };
    fs.writeFileSync(path.join(root, file), 'export default [];');
  }
  fs.writeFileSync(
    path.join(root, '.vite/manifest.json'),
    JSON.stringify(manifest),
  );
  if (extra) {
    fs.mkdirSync(path.dirname(path.join(root, extra)), { recursive: true });
    fs.writeFileSync(path.join(root, extra), 'SYNTHETIC_FORBIDDEN_ASSET');
  }
  return root;
}
test('allows only the declared static beta artifact with all eight lazy archives', () => {
  assert.equal(inspectRelease(fixture()).archiveChunks, 8);
});
for (const name of [
  'private.md',
  'reference.pdf',
  'pilot.csv',
  'pilot.json',
  'assets/index-test.js.map',
  'tmp/review-answer-key-confidential.md',
])
  test(`rejects forbidden release asset ${name}`, () => {
    assert.throws(() => inspectRelease(fixture(name)));
  });
test('rejects a missing historic chunk even if the entry still declares it', () => {
  const root = fixture();
  const manifest = JSON.parse(
    fs.readFileSync(path.join(root, '.vite/manifest.json')),
  );
  manifest['src/data/archive/questions-2026-10-27.7.json'].file =
    'assets/missing.js';
  fs.writeFileSync(
    path.join(root, '.vite/manifest.json'),
    JSON.stringify(manifest),
  );
  assert.throws(() => inspectRelease(root));
});
