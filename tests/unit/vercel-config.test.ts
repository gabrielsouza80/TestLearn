import { it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import configuration from '../../vercel.json';
import security from '../../config/security-headers.json';
it('prepares only the guarded static build, without rewrites, environment sharing or provisioned services', () => {
  expect(Object.keys(configuration).sort()).toEqual(
    [
      '$schema',
      'framework',
      'installCommand',
      'buildCommand',
      'outputDirectory',
      'headers',
    ].sort(),
  );
  expect(configuration.outputDirectory).toBe('dist');
  expect(configuration.framework).toBe('vite');
  expect(configuration.installCommand).toBe('npm ci');
  expect(configuration.buildCommand).toBe(
    [
      'npm run build',
      'node scripts/check-release.mjs',
      'node scripts/check-retained-assets.mjs',
      'node scripts/check-live-asset-retention.mjs',
    ].join(' && '),
  );
  expect(JSON.parse(readFileSync('package.json', 'utf8')).engines.node).toBe(
    '24.x',
  );
});
it('keeps restrictive security headers and separates revalidated HTML from immutable hashed assets', () => {
  const all = configuration.headers.find((h) => h.source === '/(.*)')!.headers;
  for (const [key, value] of Object.entries(security).filter(
    ([k]) => k !== 'Cache-Control',
  ))
    expect(all).toContainEqual({ key, value });
  for (const source of ['/', '/index.html'])
    expect(
      configuration.headers.find((h) => h.source === source)!.headers,
    ).toContainEqual({
      key: 'Cache-Control',
      value: 'public, max-age=0, must-revalidate',
    });
  expect(
    configuration.headers.find((h) => h.source === '/assets/(.*)')!.headers,
  ).toContainEqual({
    key: 'Cache-Control',
    value: 'public, max-age=31536000, immutable',
  });
});
it('excludes private work from source uploads and local project links from Git', () => {
  const ignored = readFileSync('.vercelignore', 'utf8').split(/\r?\n/);
  for (const name of [
    'docs',
    'tmp',
    'tests',
    'node_modules',
    'dist',
    '.vercel',
    '.env*',
  ])
    expect(ignored).toContain(name);
  expect(readFileSync('.gitignore', 'utf8')).toContain('.vercel/');
});
