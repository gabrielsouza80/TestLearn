import type { Language, Localized } from '../i18n';
export default function Text({
  value,
  language,
}: {
  value: Localized;
  language: Language;
}) {
  return language === 'both' ? (
    <>
      <span lang="en">{value.en}</span>{' '}
      <span className="translation" lang="pt-PT">
        {value.pt || 'Tradução indisponível'}
      </span>
    </>
  ) : (
    <>
      {value[language] ||
        (language === 'pt'
          ? 'Tradução indisponível'
          : 'Translation unavailable')}
    </>
  );
}
