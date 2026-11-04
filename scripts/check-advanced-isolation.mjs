import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';

export function inspectAdvancedIsolation(root = 'dist') {
  const pilot = JSON.parse(
    fs.readFileSync(
      new URL(
        '../docs/experiments/advanced-interpretation/pilot-v1.json',
        import.meta.url,
      ),
      'utf8',
    ),
  );
  const forbidden = [
    pilot.pilotId,
    'exp-ai-',
    ...pilot.questions
      .flatMap((q) => [
        q.prompt.en,
        q.prompt.pt,
        q.readingStrategy,
        q.workedSolution,
        ...q.options.flatMap((o) => [
          o.text.en,
          o.text.pt,
          o.explanation.en,
          o.explanation.pt,
        ]),
      ])
      .filter((text) => text.length >= 60),
  ];
  let filesChecked = 0;
  const visit = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      assert(!entry.isSymbolicLink(), 'Do not inspect symlink assets');
      assert(
        !/AdvancedTraining|DevelopmentApp|pilot-v1|advanced-interpretation|experimental/i.test(
          entry.name,
        ),
        `Experimental asset: ${full}`,
      );
      if (entry.isDirectory()) visit(full);
      else {
        filesChecked++;
        const text = fs.readFileSync(full, 'utf8');
        for (const token of forbidden)
          assert(
            !text.includes(token) &&
              !text.includes(JSON.stringify(token).slice(1, -1)),
            `Experimental content: ${full}`,
          );
      }
    }
  };
  visit(root);
  assert(filesChecked > 0, 'No built artifacts to inspect');
  return { filesChecked, pilotQuestions: pilot.questions.length };
}
if (
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
)
  console.log(
    JSON.stringify(inspectAdvancedIsolation(process.argv[2]), null, 2),
  );
