import bilingual from './archive/questions-2026-10-27.5.json' with { type: 'json' };
import aligned from './archive/questions-2026-10-27.3.json' with { type: 'json' };
import coverage from './archive/questions-2026-10-27.4.json' with { type: 'json' };
import archived from './archive/questions-2026-10-27.1.json' with { type: 'json' };
import audited from './archive/questions-2026-10-27.2.json' with { type: 'json' };
import type { Question } from '../domain/engine';
// Only TestLearn's own original material. Never substitute corrected text in old attempts.
export const legacyQuestions = archived as Question[];
export const auditedQuestions = audited as Question[];
export const blueprintArchivedQuestions = aligned as Question[];
export const coverageArchivedQuestions = coverage as Question[];
export const bilingualArchivedQuestions = bilingual as Question[];
