# Advanced Training local prototype — implementation plan

Post-implementation authorization: the user explicitly requested commits and push to develop. The earlier no-commit/push constraints describe the implementation phase; two separate commits now preserve the academic checkpoint and prototype. No branch/worktree, merge or deploy is authorized by that follow-up.

Goal: make the ten existing pilot items usable locally, with delayed feedback and measured active question time. Implements the user's Phase 10I brief; no approval of academic content is implied.

Architecture: a development-only lazy root in `src/main.tsx` loads `src/experimental/DevelopmentApp.tsx`. That root offers `/?training=advanced` and leaves `App` intact. The query route accommodates the existing Vite `appType: mpa` without changing server routing. Its import graph alone reads the unchanged pilot JSON; Vite must erase it in production. Use existing Text, ObjectiveHelp, panel/button/option styles and a scoped experimental stylesheet. Do not coerce pilots into published Question/Session contracts.

Approaches: extending the existing exam engine would couple unapproved content to persistence/scoring. A separate built production route would risk publication. Choose a Vite DEV-only entry and small in-memory component, with production artifact checks proving exclusion.

Constraints: existing develop only; no branch/worktree/staging/commit/remote operations. Preserve all 90 published items, keys and revisions. Freeze the six academic deliverables as an exact proposed commit before code changes; the checker may subsequently gain an explicit Phase 10I mode while retaining its strict default. Pilot/spec bytes stay identical. No dependencies or services added.

Rulings: the supplied request explicitly says prepare a short design then implement; execute inline without an extra design approval round. Time means active reading-and-answering combined, from question display until submission; no inferred reading/decision split. Pause on hidden/blur/manual pause. Feedback time is excluded. Timed practice uses optional editorial targets, never an automatic answer or fabricated official limit. Strategy strings in the existing pilot are PT-only; supply an EN translation adapter, leaving the pilot intact. This prototype is opt-in local use of unapproved material, authorized by this request despite the earlier documentation-only proposal.

## Tasks and verification ledger

- [x] Protect: baseline academic checker; exact six-path/hash/snapshot commit proposal in `tmp/phase10i`, no staging. Add suggested correction regressions to decision evidence.
- [x] RED→GREEN domain: `src/experimental/training.ts`, tests in `tests/unit/advanced-training.test.ts`. Catch incorrect answer, invalid selection, bad summary denominator, accumulating review time, clock reversal and pause/resume errors with literal expected values.
- [x] RED→GREEN interface: `src/experimental/AdvancedTraining.tsx`, tests in `tests/integration/advanced-training.test.tsx`. Full real pilot prompts/options, submit gating and no feedback before submission, EN/PT preservation, time freezing, restart, complete summary. Native radios/labels, focus on question/feedback/summary headings, wrapping long content.
- [x] RED→GREEN boundary: DEV root/navigation, `src/vite-env.d.ts`, production scanner and negative fixture tests. Explicit checker Phase 10I allowlist must still protect all bank/history/persistence files. Never turn off existing release guards.
- [x] Verify: full Vitest, TypeScript, lint, formatting, production build, artifact exclusion, release/retained guards and targeted Playwright dev + production route tests at desktop/mobile widths. Do not claim the full E2E matrix unless run. Fresh read-only review after implementation; fix material issues with a failing test first.

Review focus: repeated submit cannot duplicate results; switching languages cannot reset or reveal answers; pause/background/review cannot inflate question time; restarting clears only in-memory experimental state; production artifacts and route cannot contain pilot content. Academic timing targets and translated strategies remain uncalibrated/pending human review. No persistence or emotional/competence diagnosis.

Execution ledger: 12 prototype Vitest tests and six targeted browser tests passed. Independent reviewer findings (initial focus and isolated payload fingerprints) were reproduced RED and fixed GREEN. Full Vitest: 240 passed. Final release/format/preservation checks recorded in prototype-local.md. Ruling: query routing replaces a path route because existing Vite is MPA; no server configuration was changed. No commit/worktree/branch steps executed, per user constraints.
