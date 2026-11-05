// Mechanical integrity checks only: this script cannot approve academic content.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { createServer } from 'vite';

const folder = 'docs/academic/phase10h-2026-11-04';
// Default remains the original documentation-only gate. Phase 10I is explicit
// and permits only these local prototype files, never bank/history/persistence.
const phase10i = process.argv.includes('--phase10i');
const prototypePaths = new Set(
  phase10i
    ? [
        'src/main.tsx',
        'src/experimental/main.tsx',
        '.vercelignore',
        '.github/workflows/quality.yml',
        'package.json',
        'vite.config.ts',
        'tsconfig.production.json',
        'src/vite-env.d.ts',
        'src/experimental/DevelopmentApp.tsx',
        'src/experimental/AdvancedTraining.tsx',
        'src/experimental/training.ts',
        'src/experimental/useQuestionTimer.ts',
        'src/experimental/reading-strategies.ts',
        'src/experimental/advanced-training.css',
        'tests/unit/advanced-training.test.ts',
        'tests/integration/advanced-training.test.tsx',
        'tests/integration/advanced-entry.test.tsx',
        'tests/experimental-e2e/advanced-training.spec.ts',
      ]
    : [],
);
const read = (p) => JSON.parse(fs.readFileSync(p, 'utf8'));
const matrix = read(`${folder}/review-matrix.json`);
const registry = read(`${folder}/sources.json`);
const pilot = read('docs/experiments/advanced-interpretation/pilot-v1.json');
const objectives = new Map(
  read('src/reference/learning-objectives.json').map((lo) => [lo.id, lo]),
);
const sourceMap = new Map(registry.sources.map((s) => [s.id, s]));
const git = (...args) => execFileSync('git', args, { encoding: 'utf8' }).trim();
const canonical = (value) => {
  if (Array.isArray(value)) return value.map(canonical);
  if (value !== null && typeof value === 'object')
    return Object.fromEntries(
      Object.keys(value)
        .sort()
        .map((key) => [key, canonical(value[key])]),
    );
  return value;
};
const hash = (value) =>
  createHash('sha256')
    .update(JSON.stringify(canonical(value)))
    .digest('hex');
const text = (value) => assert(typeof value === 'string' && /\S/.test(value));
const bilingual = (value) => {
  text(value?.en);
  text(value?.pt);
};
const reference = (ref) => {
  const source = sourceMap.get(ref.sourceId);
  assert(source, `Unknown source: ${ref.sourceId}`);
  text(ref.section);
  assert(ref.pdfPages.length > 0);
  for (const page of ref.pdfPages)
    assert(
      Number.isInteger(page) &&
        page > 0 &&
        page <= source.pdfPageCount &&
        source.pagesConsulted.includes(page),
      `Unconsulted/invalid source page: ${ref.sourceId} ${page}`,
    );
};

function validatePilot(data, bank) {
  assert.equal(data.questions.length, 10);
  assert.equal(data.humanApprovedCount, 0);
  const ids = new Set();
  for (const q of data.questions) {
    assert(/^exp-ai-\d{3}$/.test(q.id));
    assert(!ids.has(q.id) && !bank.some((item) => item.id === q.id));
    ids.add(q.id);
    assert.equal(q.examEligible, false);
    assert.equal(q.reviewStatus, 'AI_REVIEWED_PENDING_HUMAN');
    assert.equal(q.humanDecision, null);
    text(q.origin);
    text(q.revision);
    assert.equal(objectives.get(q.learningObjective)?.level, q.cognitiveLevel);
    assert(['I1', 'I2', 'I3'].includes(q.interpretationDifficulty));
    reference(q.reference);
    bilingual(q.prompt);
    assert.equal(q.options.length, 4);
    assert.equal(new Set(q.options.map((o) => o.id)).size, 4);
    assert.equal(q.correct.length, 1);
    assert(q.options.some((o) => o.id === q.correct[0]));
    for (const locale of ['en', 'pt']) {
      assert.equal(
        new Set(q.options.map((o) => o.text[locale].trim())).size,
        4,
      );
      assert(!bank.some((item) => item.text[locale] === q.prompt[locale]));
    }
    for (const option of q.options) {
      bilingual(option.text);
      bilingual(option.explanation);
      if (q.correct.includes(option.id))
        assert.equal(option.misconceptionTag, null);
      else text(option.misconceptionTag);
    }
    const t = q.timeTargetSeconds;
    assert(Number.isInteger(t.total) && t.reading > 0 && t.selection > 0);
    assert.equal(t.reading + t.selection, t.total);
    text(t.calibration);
    text(q.readingStrategy);
    text(q.workedSolution);
    text(q.aiReview);
    assert(q.criticalWording.length > 0);
    for (const wording of q.criticalWording) {
      bilingual(wording);
      for (const locale of ['en', 'pt'])
        assert(
          [q.prompt[locale], ...q.options.map((o) => o.text[locale])]
            .join(' ')
            .includes(wording[locale]),
          `${q.id}: critical wording absent from ${locale}`,
        );
    }
  }
}

function validateMatrix(data, bank) {
  assert.equal(data.totalQuestions, bank.length);
  assert.equal(
    data.totalAlternatives,
    bank.reduce((n, q) => n + q.options.length, 0),
  );
  assert.deepEqual(
    data.questions.map((r) => r.questionId),
    bank.map((q) => q.id),
  );
  let reviewed = 0;
  for (const [i, row] of data.questions.entries()) {
    const q = bank[i];
    assert.equal(row.questionSHA256, hash(q), `${q.id}: bank snapshot changed`);
    assert.equal(row.alternativeFieldsSHA256, hash(q.options));
    assert.equal(row.learningObjective, q.lo);
    assert.equal(row.syllabusChapter, q.chapter);
    assert.equal(row.cognitiveLevel, objectives.get(q.lo).level);
    assert.equal(row.cognitiveLevel, q.level);
    assert.equal(row.contentRevision, '2026-10-27.9');
    assert.equal(row.syllabusSection, q.academicReview.section);
    assert.equal(row.learningObjectiveSection, objectives.get(q.lo).section);
    assert.deepEqual(row.currentCorrectAnswer, q.correct);
    assert.deepEqual(
      row.currentCorrectOptions,
      q.options.filter((o) => q.correct.includes(o.id)),
    );
    assert.deepEqual(row.currentExplanation, q.explanation);
    assert.deepEqual(
      row.alternativeIds,
      q.options.map((o) => o.id),
    );
    assert.equal(
      row.explanationFields.alternativeExplanationsPresent,
      q.options.length * 2,
    );
    assert.equal(row.humanDecision, null);
    assert(
      ['NOT_REVIEWED', 'AI_REVIEWED_PENDING_HUMAN', 'NEEDS_FIX'].includes(
        row.reviewStatus,
      ),
    );
    if (row.reviewStatus === 'NOT_REVIEWED') {
      for (const field of [
        'reviewer',
        'reviewedOn',
        'correctAnswerJustification',
        'distractorAssessment',
        'wordingAndTranslationConcerns',
        'potentialAmbiguity',
        'difficultyAssessment',
        'proposedCorrection',
      ])
        assert.equal(
          row[field],
          null,
          `${q.id}: unreviewed field claims assessment`,
        );
      assert.equal(row.verifiedReferences.length, 0);
      continue;
    }
    reviewed++;
    text(row.reviewer);
    text(row.reviewedOn);
    text(row.correctAnswerJustification);
    text(row.wordingAndTranslationConcerns);
    text(row.potentialAmbiguity);
    text(row.difficultyAssessment);
    assert(row.verifiedReferences.length >= 2);
    row.verifiedReferences.forEach(reference);
    const wrongIds = q.options
      .filter((o) => !q.correct.includes(o.id))
      .map((o) => o.id)
      .sort();
    assert.deepEqual(Object.keys(row.distractorAssessment).sort(), wrongIds);
    Object.values(row.distractorAssessment).forEach(text);
    assert.equal(row.proposedCorrection.applied, false);
    assert.deepEqual(row.proposedCorrection.keyBefore, q.correct);
    assert.deepEqual(row.proposedCorrection.keyProposed, q.correct);
    if (q.level === 'K3') text(row.workedSolution);
    if (row.reviewStatus === 'NEEDS_FIX')
      text(row.proposedCorrection.description);
  }
  assert.equal(reviewed, data.reviewedCount);
}

const server = await createServer({
  configFile: false,
  optimizeDeps: { noDiscovery: true, include: [] },
  server: { middlewareMode: true, watch: null },
  appType: 'custom',
});
try {
  const { questions } = await server.ssrLoadModule('/src/data/questions.ts');
  const { validateBank } = await server.ssrLoadModule(
    '/src/domain/question.ts',
  );
  assert.deepEqual(validateBank(questions), []);
  assert.deepEqual(
    questions.map((q) => q.id),
    Array.from(
      { length: 90 },
      (_, i) => `tl-${String(i + 1).padStart(3, '0')}`,
    ),
  );
  assert.equal(
    questions.reduce((n, q) => n + q.options.length, 0),
    364,
  );
  assert.equal(new Set(questions.map((q) => q.lo)).size, 64);
  validateMatrix(matrix, questions);
  validatePilot(pilot, questions);

  // Check the checker: these corruptions must not produce a false structural PASS.
  const mutations = [
    (p) => {
      p.questions[0].examEligible = true;
    },
    (p) => {
      p.questions[0].correct = ['missing'];
    },
    (p) => {
      p.questions[0].correct.push('p1');
    },
    (p) => {
      p.questions[0].options[0].explanation.pt = ' ';
    },
    (p) => {
      p.questions[0].reviewStatus = 'HUMAN_APPROVED';
    },
    (p) => {
      p.questions[0].id = questions[0].id;
    },
    (p) => {
      p.questions[0].reference.pdfPages = [999];
    },
    (p) => {
      p.questions[0].options[1].text = p.questions[0].options[0].text;
    },
  ];
  for (const mutate of mutations) {
    const broken = structuredClone(pilot);
    mutate(broken);
    assert.throws(() => validatePilot(broken, questions));
  }
  const brokenMatrix = structuredClone(matrix);
  brokenMatrix.questions[0].currentCorrectAnswer = ['o2'];
  assert.throws(() => validateMatrix(brokenMatrix, questions));

  const protectedPaths = [
    'src',
    'public',
    'config',
    'tests',
    '.github',
    'package.json',
    'package-lock.json',
    'vite.config.ts',
    'tsconfig.production.json',
    'vercel.json',
    '.vercelignore',
  ];
  const protectedChanges = [
    git('diff', '--name-only', matrix.baselineCommit, '--', ...protectedPaths),
    git('ls-files', '--others', '--exclude-standard', '--', ...protectedPaths),
  ].flatMap((value) => value.split(/\r?\n/).filter(Boolean));
  assert.deepEqual(
    protectedChanges.filter((p) => !prototypePaths.has(p)),
    [],
    'Runtime/history/test/config change outside the explicit task scope',
  );
  assert(
    fs.readFileSync('.vercelignore', 'utf8').split(/\r?\n/).includes('docs'),
  );
  assert.equal(
    git('rev-parse', `${matrix.baselineCommit}^{tree}`),
    matrix.baselineTree,
    'Academic baseline tree does not match the recorded checkpoint',
  );
  // Authorized follow-up commits may advance develop. Keep the original
  // immutable comparison base and reject a checkout unrelated to that history.
  git('merge-base', '--is-ancestor', matrix.baselineCommit, 'HEAD');
  assert.equal(git('branch', '--show-current'), 'develop');
  console.log(
    JSON.stringify(
      {
        questions: 90,
        alternatives: 364,
        learningObjectives: 64,
        reviewed: matrix.reviewedCount,
        statuses: Object.fromEntries(
          [
            'NOT_REVIEWED',
            'AI_REVIEWED_PENDING_HUMAN',
            'NEEDS_FIX',
            'HUMAN_APPROVED',
          ].map((s) => [
            s,
            matrix.questions.filter((r) => r.reviewStatus === s).length,
          ]),
        ),
        pilotQuestions: pilot.questions.length,
        pilotAlternatives: 40,
        negativeValidationCases: mutations.length + 1,
        runtimeAndHistoricalChanges: protectedChanges.length,
        authorizedPrototypeChanges: phase10i ? protectedChanges : [],
        unapprovedRuntimeAndHistoricalChanges: 0,
        academicApproval: 'NOT provided by this mechanical check',
      },
      null,
      2,
    ),
  );
} finally {
  await server.close();
}
