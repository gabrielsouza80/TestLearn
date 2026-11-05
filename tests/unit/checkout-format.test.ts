import { it, expect } from 'vitest';
import { execFileSync } from 'node:child_process';
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

it('keeps text checkouts in LF even when Windows autocrlf is enabled', () => {
  const parent = path.resolve(tmpdir());
  const fixture = mkdtempSync(path.join(parent, 'testlearn-checkout-'));
  if (
    path.dirname(fixture) !== parent ||
    !path.basename(fixture).startsWith('testlearn-checkout-')
  )
    throw new Error('Unexpected checkout fixture path');
  const env = {
    ...process.env,
    GIT_CONFIG_NOSYSTEM: '1',
    GIT_CONFIG_GLOBAL: process.platform === 'win32' ? 'NUL' : '/dev/null',
  };
  const git = (...args: string[]) =>
    execFileSync('git', args, { cwd: fixture, env, stdio: 'pipe' });
  const files = [
    'src/example.tsx',
    'docs/example.md',
    'src/data/archive/example.json',
  ];
  try {
    copyFileSync('.gitattributes', path.join(fixture, '.gitattributes'));
    for (const file of files) {
      mkdirSync(path.dirname(path.join(fixture, file)), { recursive: true });
      writeFileSync(path.join(fixture, file), 'first line\nsecond line\n');
    }
    git('init', '--quiet');
    git('-c', 'core.autocrlf=false', 'add', '.gitattributes', ...files);
    git(
      '-c',
      'core.autocrlf=true',
      'checkout-index',
      '--prefix=checkout/',
      '--',
      ...files,
    );
    for (const file of files)
      expect(readFileSync(path.join(fixture, 'checkout', file), 'utf8')).toBe(
        'first line\nsecond line\n',
      );
  } finally {
    // Remove only the synthetic directory created by this test.
    rmSync(fixture, { recursive: true, force: true });
  }
});
