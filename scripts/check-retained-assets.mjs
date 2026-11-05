import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';

const RETAINED_PATH = 'config/retained-assets.json';
const ASSET_PATH =
  /^assets\/(?:index-[A-Za-z0-9_-]+\.(?:js|css)|questions-2026-10-27\.[1-8]-[A-Za-z0-9_-]+\.js)$/;
const INDEX_PATH = /^assets\/index-[A-Za-z0-9_-]+\.(?:js|css)$/;

export function readRetainedCatalog(file = RETAINED_PATH) {
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  assert.equal(data.schemaVersion, 1, 'Unknown retained-assets schema');
  assert(Array.isArray(data.assets), 'Missing retained assets');
  assert(data.assets.length > 0 && data.assets.length <= 250);
  const paths = new Set();
  let previous = '';
  for (const item of data.assets) {
    assert.equal(typeof item.path, 'string');
    assert.match(item.path, ASSET_PATH, 'Unsafe retained asset path');
    assert(item.path > previous, 'Retained paths must be sorted and unique');
    assert(!paths.has(item.path));
    assert.match(item.sha256, /^[a-f0-9]{64}$/);
    assert.match(item.sourceCommit, /^[a-f0-9]{40}$/);
    if (item.sourceDeployment !== undefined)
      assert.match(item.sourceDeployment, /^dpl_[A-Za-z0-9]+$/);
    previous = item.path;
    paths.add(item.path);
  }
  return data;
}

export function assertAppendOnly(previous, next) {
  assert.equal(previous.schemaVersion, 1);
  assert.equal(next.schemaVersion, 1);
  const current = new Map(next.assets.map((item) => [item.path, item]));
  for (const item of previous.assets) {
    assert.deepEqual(
      current.get(item.path),
      item,
      'Published asset must not be removed or altered: ' + item.path,
    );
  }
}

export function checkRetainedAssets(
  root = 'dist',
  catalogPath = RETAINED_PATH,
) {
  const catalog = readRetainedCatalog(catalogPath);
  const manifest = JSON.parse(
    fs.readFileSync(path.join(root, '.vite/manifest.json'), 'utf8'),
  );
  const entry = manifest['index.html'];
  assert(entry?.isEntry, 'Vite entrypoint missing from manifest');
  assert.match(entry.file, /^assets\/index-[A-Za-z0-9_-]+\.js$/);
  assert(Array.isArray(entry.css) && entry.css.length > 0);

  let bytes = 0;
  const retained = new Set();
  for (const item of catalog.assets) {
    const absolute = path.join(root, item.path);
    const stat = fs.lstatSync(absolute);
    assert(stat.isFile() && !stat.isSymbolicLink());
    const content = fs.readFileSync(absolute);
    const digest = createHash('sha256').update(content).digest('hex');
    assert.equal(digest, item.sha256, 'Retained asset corrupted: ' + item.path);
    bytes += content.length;
    retained.add(item.path);
  }
  assert(bytes < 32 * 1024 * 1024, 'Retained asset budget exhausted');

  const generated = new Set([entry.file, ...entry.css]);
  for (const asset of generated) assert.match(asset, INDEX_PATH);
  for (const name of fs.readdirSync(path.join(root, 'assets'))) {
    const asset = 'assets/' + name;
    if (INDEX_PATH.test(asset)) {
      assert(
        generated.has(asset) || retained.has(asset),
        'Untracked index asset: ' + asset,
      );
    }
  }
  return {
    currentEntry: entry.file,
    retainedAssets: catalog.assets.length,
    retainedBytes: bytes,
    verifiedPaths: [...retained],
  };
}

if (
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
)
  console.log(JSON.stringify(checkRetainedAssets(process.argv[2]), null, 2));
