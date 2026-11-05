# Phase 10I — local Advanced Interpretation Training prototype

Preview parity correction (05-11-2026): the production entry no longer imports the development tree. Vite selects a separate experimental entry only while serving locally; production type-checking uses tsconfig.production.json, and the full development typecheck remains intact. See [the parity correction record](../../release/phase10i-preview-build-parity.md). The original lazy-entry description below is historical; the local navigation and training behavior are unchanged.

Status: usable development-only prototype, on develop. Phase 10G remains BLOCKED. No commit, push, merge, deployment, PR or production change. The published bank remains 90 questions at revision 2026-10-27.9; all keys/IDs/historical archives are preserved. Academic review is 90/90 by AI, with zero human approvals and two NEEDS_FIX items (tl-011/tl-090).

Subsequent authorization: the user requested committing all completed work and pushing develop. The six academic deliverables were committed separately as `4ba26eb`; the prototype follows in its own commit. Earlier no-commit/HEAD statements below describe the implementation checkpoint. The checker now accepts descendant commits while verifying the original academic baseline tree and preserving its file/hash guards. This Git authorization does not approve academic content or unblock Phase 10G, merge, production or deployment.

## Launch and navigation

From `C:/TestLearn/tmp/develop-workspace`, run `npm run dev -- --port 5173 --strictPort`. Open `http://127.0.0.1:5173/`, follow **Treino experimental · Advanced training (local)**, then **Iniciar treino**. Direct entry: `http://127.0.0.1:5173/?training=advanced`. The ordinary CTFL modes remain in App. A production build/preview ignores this query and shows the ordinary application.

Choose practice without pressure or timed practice. Timed practice offers optional editorial targets from the ten original items, with no automatic answer or deadline. The selected EN/PT language, full scenario, four alternatives, question position, interpretation difficulty and LO/K are visible. Select and submit once to reveal all four technical explanations, the correct option, the relevant CTFL concept/reference and a reading strategy. Continue to obtain accuracy and active time per question; restart clears this experimental session only.

Active time is measured with a monotonic clock from question mount until submission. It combines reading and answering; it does not infer separate reading/decision durations. Manual pause, hidden tabs, unfocused windows and feedback time are excluded. Row durations are displayed to whole seconds, rounded down; totals use unrounded measured milliseconds. No emotional diagnosis, predicted exam score, persistence, telemetry or AI inference is implemented.

## Academic protection and proposed commit

Six original deliverables remain present:

1. `docs/academic/phase10h-2026-11-04/README.md`
2. `docs/academic/phase10h-2026-11-04/review-matrix.json`
3. `docs/academic/phase10h-2026-11-04/sources.json`
4. `docs/experiments/advanced-interpretation/spec.md`
5. `docs/experiments/advanced-interpretation/pilot-v1.json`
6. `scripts/check-academic-deliverables.mjs`

The exact proposed academic-only commit is recorded in `tmp/phase10i/proposed-academic-commit.json`, with six paths, SHA-256 hashes and exact local snapshots, plus `tmp/phase10i/proposed-academic.patch`. Proposed subject: `docs: preserve Phase 10H academic review and advanced pilot`. No staging or commit was executed. These ignored local files describe a candidate, not an instruction to apply a patch over existing files. The candidate includes the suggested regression checks added to the decision evidence, and the checker version before the prototype extension; prototype changes are excluded from that candidate.

The pilot, spec, matrix and source registry retain their bytes. The academic README only gained suggested future regression checks for tl-011/tl-090. Their decision records already contain current/proposed EN/PT wording, evidence, technical justification and unchanged proposed keys o1/o2. No correction or human approval was applied. The checker subsequently gained an explicit `--phase10i` allowlist while preserving its strict documentation-only default, all question hashes, structure and negative validation cases. The default deliberately rejects this feature's runtime changes; use `node scripts/check-academic-deliverables.mjs --phase10i` in the prototype workspace.

The old specification's documentation-only stage is historical. This local opt-in prototype is authorized by the Phase 10I request; it does not promote those items to approved or examination content. `examEligible:false` and pending review statuses remain untouched.

## Exact application and verification files

Modified existing application file:

- `src/main.tsx`: DEV-only lazy entry; production continues to use App.

Created application files:

- `src/vite-env.d.ts`: Vite environment types.
- `src/experimental/DevelopmentApp.tsx`: local link/query entry.
- `src/experimental/AdvancedTraining.tsx`: setup, question/feedback and summary flow.
- `src/experimental/training.ts`: separate attempt evaluation, summary and active clock.
- `src/experimental/useQuestionTimer.ts`: pause/focus/visibility lifecycle.
- `src/experimental/reading-strategies.ts`: EN translations of the original PT strategies; no new questions.
- `src/experimental/advanced-training.css`: scoped wrapping and layout using existing styles/tokens.

Modified academic file: `docs/academic/phase10h-2026-11-04/README.md` (future correction tests only). Extended checker: `scripts/check-academic-deliverables.mjs` (explicit prototype allowlist; default stays strict).

Created verification files:

- `tests/unit/advanced-training.test.ts`
- `tests/integration/advanced-training.test.tsx`
- `tests/integration/advanced-entry.test.tsx`
- `tests/experimental-e2e/advanced-training.spec.ts`
- `playwright.advanced.config.ts`
- `scripts/check-advanced-isolation.mjs`
- `scripts/check-advanced-isolation.test.mjs`

Created documentation: this file and `docs/superpowers/plans/2026-11-04-advanced-training.md`. Temporary protection/commit proposal files are under ignored `tmp/phase10i`. Browser screenshots/traces are under ignored `test-results`.

## Verification evidence

TDD: the initial domain/UI tests failed against inert shells, then passed with behavior. Entry tests failed before the DEV wrapper existed. Isolation negative fixtures failed before the scanner existed. Independent review found an initially unfocused timer edge case and incomplete leak fingerprints; new failing tests reproduced both, then passed after fixes. The scanner now checks IDs and distinctive long scenarios/options/explanations/strategies/solutions; generic short numeric alternatives alone are not unique content fingerprints.

Executed results:

- Full Vitest: 30 files, 240 tests passed (228 existing plus 12 new).
- Node release/retention/isolation regression suites: 88 tests passed, zero failed/skipped/cancelled (71 existing plus 17 isolation fixtures).
- Targeted Playwright: six tests passed, Chromium desktop and mobile. Each covers the complete ten-item bilingual flow, or narrow/zoom readability with axe, or production query isolation. No Firefox/WebKit or full existing E2E suite was run.
- Production build: passed. Existing Zod annotation and large-chunk warnings remain.
- Production inspection: no pilot fingerprints or experimental chunks; release guard preserves the eight lazy archives; retained-assets guard verifies both existing retained entries.
- TypeScript, ESLint, repository formatting and `git diff --check`: passed. Academic checker `--phase10i`: passed with all 90 item hashes/keys intact, nine negative cases rejected and only the twelve named application/test paths permitted. The five non-checker academic files match their frozen proposal snapshots; the checker extension is explicit. HEAD is still `dc94e6b1800ff345f387a30d8c5c7f16d84a761d` on develop, with an empty index.

No mechanical check constitutes academic approval. Reproduction:

```powershell
npm test
npm run typecheck
npm run lint
npm run format:check
npm run build
node scripts/check-academic-deliverables.mjs --phase10i
node scripts/check-advanced-isolation.mjs
node scripts/check-release.mjs
node scripts/check-retained-assets.mjs
node --test scripts/check-release.test.mjs scripts/check-retained-assets.test.mjs scripts/check-live-asset-retention.test.mjs scripts/check-retained-append-only.test.mjs scripts/check-advanced-isolation.test.mjs
node node_modules/@playwright/test/cli.js test --config playwright.advanced.config.ts
```

Playwright config starts local Vite development/preview servers on 4175/4176 and requires a current production build first. No live-production call is needed. In the managed sandbox, Vite's shared node_modules temporary files required an approved run outside the sandbox; this is an environment permission, not an application dependency.

## Limits and next milestone

The ten original items and new EN strategy translations still need human content/translation/difficulty review. tl-011/tl-090 remain unchanged pending explicit correction approval. Fixed pilot order, ten-item sessions, no persistence or review navigation are intentional prototype limits. Targets are uncalibrated guides, and elapsed active time is not a measure of comprehension. The first question screenshot was visually inspected after narrow-width/200% text testing.

Next: human review of the ten pilots and EN strategy translations, plus decisions on tl-011/tl-090. Then conduct a small local usability/time-calibration trial before deciding whether persistence or additional training variants are justified. Any production access remains a separate decision after release gates; this prototype adds no deploy permission.
