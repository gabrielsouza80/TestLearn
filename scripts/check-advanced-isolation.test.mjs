import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { inspectAdvancedIsolation } from './check-advanced-isolation.mjs';

const pilot = JSON.parse(
  fs.readFileSync(
    'docs/experiments/advanced-interpretation/pilot-v1.json',
    'utf8',
  ),
);
function fixture(run) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'testlearn-isolation-'));
  try {
    run(dir);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}
test('accepts a clean built artifact without experimental content', () =>
  fixture((dir) => {
    fs.writeFileSync(path.join(dir, 'index.html'), '<h1>Public Beta</h1>');
    assert.deepEqual(inspectAdvancedIsolation(dir), {
      filesChecked: 1,
      pilotQuestions: 10,
    });
  }));
for (const q of pilot.questions) {
  test(`rejects leaked pilot identity ${q.id}`, () =>
    fixture((dir) => {
      fs.writeFileSync(
        path.join(dir, 'entry.js'),
        `const id=${JSON.stringify(q.id)}`,
      );
      assert.throws(
        () => inspectAdvancedIsolation(dir),
        /Experimental content/,
      );
    }));
}
test('rejects leaked question wording even after its identity is removed', () =>
  fixture((dir) => {
    fs.writeFileSync(
      path.join(dir, 'entry.js'),
      JSON.stringify(pilot.questions[0].prompt.en),
    );
    assert.throws(() => inspectAdvancedIsolation(dir), /Experimental content/);
  }));
for (const field of ['explanation', 'readingStrategy', 'workedSolution']) {
  test(`rejects a leaked isolated ${field} without an ID or scenario`, () =>
    fixture((dir) => {
      const q = pilot.questions[0];
      const token =
        field === 'explanation' ? q.options[0].explanation.en : q[field];
      fs.writeFileSync(path.join(dir, 'entry.js'), JSON.stringify(token));
      assert.throws(
        () => inspectAdvancedIsolation(dir),
        /Experimental content/,
      );
    }));
}
test('rejects experimental chunks even if their data were renamed', () =>
  fixture((dir) => {
    fs.writeFileSync(
      path.join(dir, 'AdvancedTraining-abc.js'),
      'export default {}',
    );
    assert.throws(() => inspectAdvancedIsolation(dir), /Experimental asset/);
  }));
test('does not certify a missing or empty build', () =>
  fixture((dir) => {
    assert.throws(() => inspectAdvancedIsolation(path.join(dir, 'missing')));
    assert.throws(() => inspectAdvancedIsolation(dir));
  }));
