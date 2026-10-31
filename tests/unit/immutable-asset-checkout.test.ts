import { it, expect } from 'vitest';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import {
  copyFileSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';

it('preserves published bytes through Git staging and Windows checkout', () => {
  const parent = path.resolve(tmpdir());
  const fixture = mkdtempSync(path.join(parent, 'testlearn-immutable-'));
  if (path.dirname(fixture) !== parent) throw new Error('Unsafe fixture path');
  const git = (...args: string[]) =>
    execFileSync('git', args, {
      cwd: fixture,
      stdio: 'pipe',
      env: {
        ...process.env,
        GIT_CONFIG_NOSYSTEM: '1',
        GIT_CONFIG_GLOBAL: process.platform === 'win32' ? 'NUL' : '/dev/null',
      },
    });
  const catalog = JSON.parse(
    readFileSync('config/retained-assets.json', 'utf8'),
  ) as { assets: { path: string; sha256: string }[] };
  const published = catalog.assets.map((item) => ({
    file: 'public/' + item.path,
    bytes: readFileSync('public/' + item.path),
    sha256: item.sha256,
  }));
  const crlf = Buffer.from('export const fixture = true;\r\nexport {};\r\n');
  published.push({
    file: 'public/assets/index-crlf-fixture.js',
    bytes: crlf,
    sha256: createHash('sha256').update(crlf).digest('hex'),
  });
  try {
    copyFileSync('.gitattributes', path.join(fixture, '.gitattributes'));
    for (const item of published) {
      mkdirSync(path.dirname(path.join(fixture, item.file)), {
        recursive: true,
      });
      writeFileSync(path.join(fixture, item.file), item.bytes);
    }
    git('init', '--quiet');
    git(
      '-c',
      'core.autocrlf=true',
      'add',
      '.gitattributes',
      ...published.map((x) => x.file),
    );
    git(
      '-c',
      'core.autocrlf=true',
      'checkout-index',
      '--prefix=checkout/',
      '--',
      ...published.map((x) => x.file),
    );
    for (const item of published) {
      const checkedOut = readFileSync(
        path.join(fixture, 'checkout', item.file),
      );
      expect(checkedOut.equals(item.bytes)).toBe(true);
      expect(createHash('sha256').update(checkedOut).digest('hex')).toBe(
        item.sha256,
      );
    }
  } finally {
    rmSync(fixture, { recursive: true, force: true });
  }
});
