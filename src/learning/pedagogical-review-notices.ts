import type { Localized } from '../i18n';

// Presentation only. This registry neither changes academic approval nor scoring.
const tl038Notice: { title: Localized; description: Localized } = {
  title: {
    pt: 'Em revisão pedagógica',
    en: 'Under pedagogical review',
  },
  description: {
    pt: 'Esta questão está em análise quanto ao nível de exigência pedagógica. A resposta e a pontuação permanecem inalteradas.',
    en: 'This question is under review regarding its cognitive demand. The answer and scoring remain unchanged.',
  },
};

export function pedagogicalReviewNotice(questionId: string) {
  return questionId === 'tl-038' ? tl038Notice : undefined;
}
