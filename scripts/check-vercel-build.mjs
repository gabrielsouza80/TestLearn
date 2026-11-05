// Reproduce the uploaded source boundary without moving/deleting original files.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync, spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { inspectRelease } from './check-release.mjs';
import { inspectAdvancedIsolation } from './check-advanced-isolation.mjs';

export function checkVercelBuild(root = process.cwd()) {
  const git = (args) =>
    execFileSync('git', args, { cwd: root, encoding: 'utf8' });
  const files = git([
    'ls-files',
    '-z',
    '--cached',
    '--others',
    '--exclude-standard',
  ])
    .split('\0')
    .filter(Boolean);
  // Git implements the gitignore syntax used by .vercelignore. Inventory already
  // excludes untracked Git-ignored files; --no-index also checks tracked docs.
  const ignored = spawnSync(
    'git',
    [
      '-c',
      `core.excludesFile=${path.resolve(root, '.vercelignore')}`,
      'check-ignore',
      '--no-index',
      '--stdin',
      '-z',
    ],
    { cwd: root, encoding: 'utf8', input: files.join('\0') + '\0' },
  );
  assert([0, 1].includes(ignored.status), ignored.stderr);
  const excluded = new Set(ignored.stdout.split('\0').filter(Boolean));
  fs.mkdirSync(path.join(root, 'tmp'), { recursive: true });
  const sandbox = fs.mkdtempSync(path.join(root, 'tmp', 'vercel-parity-'));
  for (const file of files.filter((file) => !excluded.has(file))) {
    const source = path.resolve(root, file);
    const target = path.resolve(sandbox, file);
    assert(target.startsWith(sandbox + path.sep), 'Unsafe parity-copy path');
    assert(
      !fs.lstatSync(source).isSymbolicLink(),
      'Do not copy source symlinks',
    );
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.copyFileSync(source, target);
  }
  for (const name of ['docs', 'tests', '.github', '.git', 'src/experimental'])
    assert(
      !fs.existsSync(path.join(sandbox, name)),
      `${name} was not excluded`,
    );
  // Dependency reuse is test infrastructure, not an uploaded source file.
  fs.symlinkSync(
    fs.realpathSync(path.join(root, 'node_modules')),
    path.join(sandbox, 'node_modules'),
    process.platform === 'win32' ? 'junction' : 'dir',
  );
  const build = spawnSync('npm run build', {
    cwd: sandbox,
    shell: true,
    encoding: 'utf8',
    timeout: 180000,
  });
  const result = {
    status: build.status,
    sandbox,
    excludedFiles: excluded.size,
    output: (build.stdout ?? '') + (build.stderr ?? ''),
  };
  if (build.status === 0) {
    result.release = inspectRelease(path.join(sandbox, 'dist'));
    result.isolation = inspectAdvancedIsolation(path.join(sandbox, 'dist'));
  }
  // Retain only this isolated copy for diagnosis; never clean the source tree.
  return result;
}

if (
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  const result = checkVercelBuild();
  console.log(result.output);
  assert.equal(
    result.status,
    0,
    `Excluded-file production build failed: ${result.sandbox}`,
  );
  console.log(
    JSON.stringify(
      {
        sandbox: result.sandbox,
        excludedFiles: result.excludedFiles,
        archiveChunks: result.release.archiveChunks,
        isolation: result.isolation,
      },
      null,
      2,
    ),
  );
}
