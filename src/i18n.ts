export type Language = 'pt' | 'en' | 'both';
export type Localized = { pt: string; en: string };
export const chapters: Localized[] = [
  { pt: 'Fundamentos dos testes', en: 'Fundamentals of testing' },
  {
    pt: 'Testes no ciclo de desenvolvimento',
    en: 'Testing throughout the lifecycle',
  },
  { pt: 'Testes estáticos', en: 'Static testing' },
  { pt: 'Análise e conceção de testes', en: 'Test analysis and design' },
  { pt: 'Gestão das atividades de teste', en: 'Managing test activities' },
  { pt: 'Ferramentas de teste', en: 'Test tools' },
];
export function label(language: Language, pt: string, en: string) {
  return language === 'en' ? en : pt;
}
