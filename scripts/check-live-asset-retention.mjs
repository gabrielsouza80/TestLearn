import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const PUBLIC_ORIGIN = 'https://testlearn-ctfl.vercel.app';
const INDEX_JS = /^assets\/index-[A-Za-z0-9_-]+\.js$/;
const INDEX_CSS = /^assets\/index-[A-Za-z0-9_-]+\.css$/;
const ARCHIVE = /^assets\/questions-2026-10-27\.([1-8])-[A-Za-z0-9_-]+\.js$/;

export function identifyProductionAssets(html, entryJs) {
  const scripts = [
    ...html.matchAll(
      /<script\b[^>]*\bsrc=["']\.\/(assets\/index-[A-Za-z0-9_-]+\.js)["'][^>]*>/g,
    ),
  ].map((match) => match[1]);
  assert.equal(scripts.length, 1, 'Expected exactly one production entrypoint');
  assert.match(scripts[0], INDEX_JS);

  const css = [
    ...html.matchAll(
      /<link\b[^>]*\bhref=["']\.\/(assets\/index-[A-Za-z0-9_-]+\.css)["'][^>]*>/g,
    ),
  ].map((match) => match[1]);
  assert(css.length > 0, 'Production CSS missing');
  for (const name of css) assert.match(name, INDEX_CSS);

  const historical = new Map();
  for (const match of entryJs.matchAll(
    /questions-2026-10-27\.([1-8])-[A-Za-z0-9_-]+\.js/g,
  )) {
    const name = 'assets/' + match[0];
    assert.match(name, ARCHIVE);
    const chapter = Number(match[1]);
    assert(
      !historical.has(chapter) || historical.get(chapter) === name,
      'Ambiguous archived question asset',
    );
    historical.set(chapter, name);
  }
  assert.equal(historical.size, 8, 'All eight historical archives required');
  return [
    ...new Set([
      scripts[0],
      ...css,
      ...[...historical.entries()]
        .sort(([a], [b]) => a - b)
        .map(([, value]) => value),
    ]),
  ];
}

export async function checkLiveAssetRetention({
  root = 'dist',
  origin = PUBLIC_ORIGIN,
  fetchImpl = fetch,
} = {}) {
  assert.equal(
    new URL(origin).origin,
    PUBLIC_ORIGIN,
    'Untrusted production origin',
  );
  async function get(pathname) {
    const response = await fetchImpl(origin + pathname, {
      redirect: 'error',
      signal: AbortSignal.timeout(15000),
    });
    assert.equal(response.status, 200, 'Production asset missing: ' + pathname);
    const payload = Buffer.from(await response.arrayBuffer());
    assert(payload.length > 0 && payload.length < 10 * 1024 * 1024);
    return payload;
  }
  const html = (await get('/')).toString('utf8');
  const entryPath = html.match(
    /<script\b[^>]*\bsrc=["']\.\/(assets\/index-[A-Za-z0-9_-]+\.js)["'][^>]*>/,
  )?.[1];
  assert(entryPath, 'Missing published JS reference');
  const entryJs = (await get('/' + entryPath)).toString('utf8');
  const paths = identifyProductionAssets(html, entryJs);
  let comparedBytes = 0;
  for (const asset of paths) {
    const localFile = path.join(root, asset);
    assert(fs.existsSync(localFile), 'Previous asset not retained: ' + asset);
    const local = fs.readFileSync(localFile);
    const published =
      asset === entryPath
        ? Buffer.from(entryJs, 'utf8')
        : await get('/' + asset);
    assert(local.equals(published), 'Published asset bytes changed: ' + asset);
    comparedBytes += published.length;
  }
  return { origin, checkedPaths: paths, comparedBytes };
}

if (
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
)
  checkLiveAssetRetention()
    .then((result) => console.log(JSON.stringify(result, null, 2)))
    .catch((error) => {
      console.error(error.message);
      process.exitCode = 1;
    });
