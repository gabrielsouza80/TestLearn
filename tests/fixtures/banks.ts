import bilingual from '../../src/data/archive/questions-2026-10-27.5.json' with { type: 'json' };
import variability from '../../src/data/archive/questions-2026-10-27.6.json' with { type: 'json' };
import quality from '../../src/data/archive/questions-2026-10-27.7.json' with { type: 'json' };
import terminology from '../../src/data/archive/questions-2026-10-27.8.json' with { type: 'json' };
import aligned from '../../src/data/archive/questions-2026-10-27.3.json' with { type: 'json' };
import coverage from '../../src/data/archive/questions-2026-10-27.4.json' with { type: 'json' };
import archived from '../../src/data/archive/questions-2026-10-27.1.json' with { type: 'json' };
import audited from '../../src/data/archive/questions-2026-10-27.2.json' with { type: 'json' };
import type { Question } from '../../src/domain/engine';
// Only TestLearn's own original material. Never substitute corrected text in old attempts.
export const legacyQuestions = archived as Question[];
export const auditedQuestions = audited as Question[];
export const blueprintArchivedQuestions = aligned as Question[];
export const coverageArchivedQuestions = coverage as Question[];
export const bilingualArchivedQuestions = bilingual as Question[];
export const variabilityArchivedQuestions = variability as Question[];
export const qualityArchivedQuestions = quality as Question[];
export const terminologyArchivedQuestions = terminology as Question[];

import { loadQuestionBank } from '../../src/data/bank-history';
import { questions } from '../../src/data/questions';
export const prepareHistoricalBanks = () =>
  Promise.all(
    [1, 2, 3, 4, 5, 6, 7, 8].map((n) =>
      loadQuestionBank(`2026-10-27.${n}`, questions),
    ),
  );
