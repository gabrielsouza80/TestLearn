# Preview CSS retention recovery — 2026-11-08

## Confirmed cause

The Preview for WIP commit `6d7d1ac66f18909cfb7ce3a89932fb4c8855822f`
failed in deployment `dpl_8bEadprHRRJCXWFN9z4YDNTcctw2`:
`Previous asset not retained: assets/index-CFv3SkJ7.css`.

The CSS was absent from disk (`public/assets` and the candidate `dist`),
the Git index, the commit tree, and `config/retained-assets.json`.
Neither `.gitignore` nor `.vercelignore` excludes this public asset.
Vercel did not discard a committed file. Its configured build command runs
the live-retention guard after `npm run build`, whereas the latter command
alone does not check retention against the currently published application.
The full remote build events are preserved in the external audit directory.
The failed deployment has no accessible output artifact from which to
independently enumerate files; the omission is demonstrated by its build log,
the exact Git tree and the reproduced local guard failure.

## Authentic recovery

Production deployment `dpl_3XxiEew9BgbUpXdt7a7KdEv34Fr3` is READY and belongs
to commit `6b378758602119f402d76e49abe5c6430d99b47f`. Its public HTML references
the CSS, which returned HTTP 200, `text/css`, 31,083 bytes on 2026-11-08.
The downloaded bytes have SHA-256:

`f714c6e9e72199b3a182698c8c66806acca61630ff4c79945c18a2915e6f8951`.

This independently matches the earlier Phase 10G inventory and Preview
verification. The original bytes were copied into `public/assets` and a
provenance entry was appended to the sorted retained-assets catalog.
The two existing entries and their bytes remain unchanged. The existing
`.gitattributes` rule `public/assets/** -text` preserves exact bytes in Git.
No generated replacement was given the historical filename.

The Vercel deployment file-tree API returned 404, so no artifact-list claim
is based on that API. Authentication uses the public HTTPS origin together
with the authenticated project/deployment identity and the earlier matching
Phase 10G hash.

## New evidence

- RED: unchanged live guard exited 1 with the exact missing-CSS message.
- GREEN: production TypeScript and Vite build exited 0; release, retained
  and live guards exited 0. The latter compared 10 published files,
  1,935,667 bytes, including CSS, entrypoint and eight archived chunks.
- 75/75 Node retention/release tests passed. Two new cases require rejection
  of missing CSS and CSS with altered bytes. Final focused rerun: 15/15.
- First scoped Prettier check failed on the new test formatting; only that
  file was formatted. Final scoped Prettier and ESLint checks exited 0.
- `git diff --check` exited 0.
- 90 complete academic objects and nine archive files match the authenticated
  reconciliation baseline. All 509 pre-existing files were checked: only
  the catalog and the new-test additions changed. No guard implementation,
  academic data, scoring, persistence or approval was modified.

Commands, UTC times, exit codes and full relevant logs are in `evidence/`.
The historical RED and formatting FAIL are retained as failures.
Vite emitted existing Zod annotation and large-chunk warnings.
The prior 282 unit/integration and 116 E2E results were not reexecuted:
this patch changes retained static bytes, catalog metadata and guard tests,
with no runtime application code or UI change. The legacy academic allowlist
and global historical formatting were neither changed nor claimed to pass.

## Release boundary and remote follow-up

Commit and push are authorized exclusively to
`wip/testlearn-phase10i-checkpoint-20261108`. The resulting automatic Preview
must be checked for its exact commit, build result and deployment protection.
Remote status will be recorded separately after the push; a local GREEN is
not evidence of a remote READY deployment.

No production deployment or settings change is authorized or performed.
This recovery does not resolve or revalidate a separate production P1.
Phase 10H remains open, human academic approval pending; Phase 10I remains
planned, with no participant sessions.
