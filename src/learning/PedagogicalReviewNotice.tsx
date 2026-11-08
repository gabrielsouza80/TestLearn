import { useId } from 'react';
import type { Language } from '../i18n';
import Text from './Text';
import { pedagogicalReviewNotice } from './pedagogical-review-notices';

export default function PedagogicalReviewNotice({
  questionId,
  language,
}: {
  questionId: string;
  language: Language;
}) {
  const id = useId();
  const notice = pedagogicalReviewNotice(questionId);
  if (!notice) return null;
  return (
    <div
      className="notice pedagogical-review-notice"
      role="note"
      tabIndex={0}
      aria-labelledby={`${id}-title`}
      aria-describedby={`${id}-description`}
      lang={
        language === 'both' ? undefined : language === 'pt' ? 'pt-PT' : 'en'
      }
    >
      <strong id={`${id}-title`}>
        <Text value={notice.title} language={language} />
      </strong>
      <p id={`${id}-description`}>
        <Text value={notice.description} language={language} />
      </p>
    </div>
  );
}
