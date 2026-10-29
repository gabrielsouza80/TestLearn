import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { gzipSync } from 'node:zlib';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';
export function inspectRelease(root = 'dist') {
  const files = [];
  const visit = (dir) => {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, e.name);
      assert(!e.isSymbolicLink(), 'Do not release symlink assets');
      if (e.isDirectory()) visit(p);
      else files.push(path.relative(root, p).replaceAll('\\', '/'));
    }
  };
  visit(root);
  const allowed = (p) =>
    ['index.html', 'favicon.svg', 'robots.txt', '.vite/manifest.json'].includes(
      p,
    ) ||
    /^assets\/(?:index|questions-2026-10-27\.[1-8])-[A-Za-z0-9_-]+\.(?:js|css)$/.test(
      p,
    );
  for (const p of files) {
    assert(allowed(p), `Unexpected release asset: ${p}`);
    assert(!/\.(?:map|pdf|csv|md)$/i.test(p), 'Private/source asset forbidden');
  }
  const manifest = JSON.parse(
    fs.readFileSync(path.join(root, '.vite/manifest.json'), 'utf8'),
  );
  const entry = manifest['index.html'];
  assert(entry?.isEntry);
  assert.equal(
    (entry.dynamicImports ?? []).length,
    8,
    'All supported archives must stay lazy',
  );
  for (let n = 1; n <= 8; n++) {
    const key = `src/data/archive/questions-2026-10-27.${n}.json`;
    assert(entry.dynamicImports.includes(key), `Archive .${n} not lazy`);
    assert(files.includes(manifest[key]?.file), `Archive .${n} asset missing`);
  }
  const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  assert(html.includes('Public Beta'));
  assert(html.includes('noindex, nofollow'));
  assert(!/<script[^>]+src=["']https?:/i.test(html));
  const hash = (p) =>
    createHash('sha256')
      .update(fs.readFileSync(path.join(root, p)))
      .digest('hex');
  const stats = files.map((p) => {
    const bytes = fs.readFileSync(path.join(root, p));
    return {
      path: p,
      bytes: bytes.length,
      gzip: gzipSync(bytes).length,
      sha256: hash(p),
    };
  });
  assert(files.filter((p) => /questions-.*\.js$/.test(p)).length === 8);
  return {
    files: stats,
    initialJS: stats.find((x) => x.path === entry.file),
    css: stats.filter((x) => x.path.endsWith('.css')),
    totalJS: stats
      .filter((x) => x.path.endsWith('.js'))
      .reduce((n, x) => n + x.bytes, 0),
    archiveChunks: 8,
    privateAssets: 0,
    sourceMaps: 0,
  };
}
if (
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
)
  console.log(JSON.stringify(inspectRelease(process.argv[2]), null, 2));
