import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {
  identifyProductionAssets,
  checkLiveAssetRetention,
} from './check-live-asset-retention.mjs';

function fixture() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'testlearn-live-'));
  const files = new Map();
  files.set(
    '/',
    '<!doctype html><script type="module" src="./assets/index-old.js"></script><link rel="stylesheet" href="./assets/index-old.css">',
  );
  const js = Array.from(
    { length: 8 },
    (_, index) => './questions-2026-10-27.' + (index + 1) + '-old.js',
  ).join(',');
  files.set('/assets/index-old.js', js);
  files.set('/assets/index-old.css', 'body{}');
  for (let n = 1; n <= 8; n++)
    files.set('/assets/questions-2026-10-27.' + n + '-old.js', 'export {};');
  for (const [file, content] of files) {
    if (file === '/') continue;
    const absolute = path.join(root, file.slice(1));
    fs.mkdirSync(path.dirname(absolute), { recursive: true });
    fs.writeFileSync(absolute, content);
  }
  const fetchImpl = async (url) => {
    const content = files.get(new URL(url).pathname);
    return new Response(content ?? 'Not found', {
      status: content === undefined ? 404 : 200,
    });
  };
  return { root, files, fetchImpl };
}

test('live verifier checks published JS, CSS and eight archived chunks', async (t) => {
  const data = fixture();
  t.after(() => fs.rmSync(data.root, { recursive: true, force: true }));
  const result = await checkLiveAssetRetention({
    root: data.root,
    fetchImpl: data.fetchImpl,
  });
  assert.equal(result.checkedPaths.length, 10);
});

test('fails closed if current production JS is missing from candidate', async (t) => {
  const data = fixture();
  t.after(() => fs.rmSync(data.root, { recursive: true, force: true }));
  fs.rmSync(path.join(data.root, 'assets/index-old.js'));
  await assert.rejects(
    checkLiveAssetRetention({
      root: data.root,
      fetchImpl: data.fetchImpl,
    }),
  );
});

test('detects altered bytes in an archived question chunk', async (t) => {
  const data = fixture();
  t.after(() => fs.rmSync(data.root, { recursive: true, force: true }));
  fs.writeFileSync(
    path.join(data.root, 'assets/questions-2026-10-27.5-old.js'),
    'modified',
  );
  await assert.rejects(
    checkLiveAssetRetention({
      root: data.root,
      fetchImpl: data.fetchImpl,
    }),
  );
});

test('rejects missing historical chapter references', () => {
  const data = fixture();
  try {
    const js = data.files
      .get('/assets/index-old.js')
      .replace('./questions-2026-10-27.8-old.js', '');
    assert.throws(() => identifyProductionAssets(data.files.get('/'), js));
  } finally {
    fs.rmSync(data.root, { recursive: true, force: true });
  }
});

test('rejects unexpected production origins', async (t) => {
  const data = fixture();
  t.after(() => fs.rmSync(data.root, { recursive: true, force: true }));
  await assert.rejects(
    checkLiveAssetRetention({
      root: data.root,
      origin: 'https://example.com',
      fetchImpl: data.fetchImpl,
    }),
  );
});

test('returns an error on remote 404, never a false PASS', async (t) => {
  const data = fixture();
  t.after(() => fs.rmSync(data.root, { recursive: true, force: true }));
  data.files.delete('/assets/index-old.css');
  await assert.rejects(
    checkLiveAssetRetention({
      root: data.root,
      fetchImpl: data.fetchImpl,
    }),
  );
});
