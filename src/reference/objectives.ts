import records from './learning-objectives.json';
import type { Localized } from '../i18n';
export interface ObjectiveReference {
  id: string;
  chapter: number;
  section: string;
  level: 'K1' | 'K2' | 'K3';
  description: Localized;
  topic: Localized;
  pages: { en: number; pt: number };
  ptWording: string;
  ptOriginal: string;
  localizationNote?: string;
}
export const objectiveCatalog = records as ObjectiveReference[];
export const objectivesById: Readonly<Record<string, ObjectiveReference>> =
  Object.fromEntries(objectiveCatalog.map((item) => [item.id, item]));
export const officialReferences = {
  en: {
    title: 'ISTQB Certified Tester Foundation Level Syllabus v4.0.1',
    url: 'https://istqb.org/?download_id=3345&sdm_process_download=1',
  },
  pt: {
    title: 'ISTQB CTFL Syllabus v4.0 — PT v1.0',
    url: 'https://pstqb.pt/wp-content/uploads/2024/05/ISTQB_CTFL_Syllabus-v4.0-PT_v1.0.pdf',
  },
} as const;
export const cognitiveLevels: Record<
  'K1' | 'K2' | 'K3',
  { title: Localized; description: Localized }
> = {
  K1: {
    title: { pt: 'Recordar', en: 'Remember' },
    description: {
      pt: 'Identificar, reconhecer ou recordar conhecimento.',
      en: 'Identify, recognize or recall knowledge.',
    },
  },
  K2: {
    title: { pt: 'Compreender', en: 'Understand' },
    description: {
      pt: 'Explicar, classificar, comparar ou interpretar conceitos.',
      en: 'Explain, classify, compare or interpret concepts.',
    },
  },
  K3: {
    title: { pt: 'Aplicar', en: 'Apply' },
    description: {
      pt: 'Utilizar técnicas ou conhecimento para resolver um problema. Não significa necessariamente uma pergunta mais difícil ou longa.',
      en: 'Use techniques or knowledge to solve a problem. This does not necessarily mean a harder or longer question.',
    },
  },
};
export const naturalObjectiveOrder = (a: string, b: string) =>
  a.localeCompare(b, 'en', { numeric: true });
