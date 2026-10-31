import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { createHash } from 'node:crypto';
import {
  readRetainedCatalog,
  checkRetainedAssets,
  assertAppendOnly,
} from './check-retained-assets.mjs';

function fixture() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'testlearn-retained-'));
  fs.mkdirSync(path.join(root, 'assets'));
  fs.mkdirSync(path.join(root, '.vite'));
  const old = 'export const old = true;';
  const name = 'assets/index-old.js';
  const sha256 = createHash('sha256').update(old).digest('hex');
  fs.writeFileSync(path.join(root, name), old);
  fs.writeFileSync(path.join(root, 'assets/index-current.js'), 'export {};');
  fs.writeFileSync(path.join(root, 'assets/index-current.css'), 'body{}');
  fs.writeFileSync(
    path.join(root, '.vite/manifest.json'),
    JSON.stringify({
      'index.html': {
        isEntry: true,
        file: 'assets/index-current.js',
        css: ['assets/index-current.css'],
      },
    }),
  );
  const catalogPath = path.join(root, 'retained.json');
  const catalog = {
    schemaVersion: 1,
    assets: [
      {
        path: name,
        sha256,
        sourceCommit: 'a'.repeat(40),
      },
    ],
  };
  fs.writeFileSync(catalogPath, JSON.stringify(catalog));
  return { root, catalogPath, catalog, name };
}

test('published assets match the SHA-256 catalog', (t) => {
  const data = fixture();
  t.after(() => fs.rmSync(data.root, { recursive: true, force: true }));
  const result = checkRetainedAssets(data.root, data.catalogPath);
  assert.equal(result.retainedAssets, 1);
  assert.deepEqual(result.verifiedPaths, [data.name]);
});

test('retained files cannot be removed from the build', (t) => {
  const data = fixture();
  t.after(() => fs.rmSync(data.root, { recursive: true, force: true }));
  fs.rmSync(path.join(data.root, data.name));
  assert.throws(() => checkRetainedAssets(data.root, data.catalogPath));
});

test('modified retained files fail the content hash check', (t) => {
  const data = fixture();
  t.after(() => fs.rmSync(data.root, { recursive: true, force: true }));
  fs.writeFileSync(path.join(data.root, data.name), 'export const old = false;');
  assert.throws(() => checkRetainedAssets(data.root, data.catalogPath));
});

test('an unexpected entrypoint is rejected', (t) => {
  const data = fixture();
  t.after(() => fs.rmSync(data.root, { recursive: true, force: true }));
  fs.writeFileSync(path.join(data.root, 'assets/index-surprise.js'), 'export {};');
  assert.throws(() => checkRetainedAssets(data.root, data.catalogPath));
});

test('catalog prevents unsafe paths and unsorted entries', (t) => {
  const data = fixture();
  t.after(() => fs.rmSync(data.root, { recursive: true, force: true }));
  data.catalog.assets[0].path = '../outside.js';
  fs.writeFileSync(data.catalogPath, JSON.stringify(data.catalog));
  assert.throws(() => readRetainedCatalog(data.catalogPath));
});

test('published catalog entries are immutable and append-only', () => {
  const old = { schemaVersion: 1, assets: [{ path: 'assets/index-old.js', sha256: 'a' }] };
  const added = {
    schemaVersion: 1,
    assets: [...old.assets, { path: 'assets/index-new.js', sha256: 'b' }],
  };
  assert.doesNotThrow(() => assertAppendOnly(old, added));
  assert.throws(() => assertAppendOnly(old, { schemaVersion: 1, assets: [] }));
  assert.throws(() =>
    assertAppendOnly(old, {
      schemaVersion: 1,
      assets: [{ path: 'assets/index-old.js', sha256: 'changed' }],
    }),
  );
});
