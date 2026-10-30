import { topicLabel } from '../topic-labels';
import { chapters, label, type Language } from '../i18n';
import type { Question } from '../domain/engine';
import {
  cognitiveLevels,
  objectivesById,
  officialReferences,
} from '../reference/objectives';
import Text from './Text';
export function CognitiveLevelHelp({ language }: { language: Language }) {
  return (
    <details className="learning-help">
      <summary>
        {label(
          language,
          'K1, K2 e K3 — o que significam?',
          'K1, K2 and K3 — what do they mean?',
        )}
      </summary>
      <dl>
        {Object.entries(cognitiveLevels).map(([id, item]) => (
          <div key={id}>
            <dt>
              {id} — <Text value={item.title} language={language} />
            </dt>
            <dd>
              <Text value={item.description} language={language} />
            </dd>
          </div>
        ))}
      </dl>
    </details>
  );
}
function ObjectiveDescription({
  lo,
  language,
}: {
  lo: string;
  language: Language;
}) {
  const item = objectivesById[lo];
  if (!item)
    return (
      <p>
        {label(
          language,
          'Descrição do objetivo não documentada.',
          'Objective description not documented.',
        )}
      </p>
    );
  return (
    <div className="objective-description">
      <p>
        <strong>{item.id}</strong> —{' '}
        <Text value={item.description} language={language} />
      </p>
      <p>
        {label(language, 'Capítulo', 'Chapter')} {item.chapter}:{' '}
        <Text value={chapters[item.chapter - 1]} language={language} /> · §
        {item.section} — <Text value={item.topic} language={language} />
      </p>
      <p>
        <strong>
          {item.level} —{' '}
          <Text value={cognitiveLevels[item.level].title} language={language} />
        </strong>
        :{' '}
        <Text
          value={cognitiveLevels[item.level].description}
          language={language}
        />
      </p>
      <small>
        {label(
          language,
          `Descrição EN: syllabus 4.0.1, PDF p.${item.pages.en}. PT: ${item.ptWording === 'localized-4.0.1' ? 'localização TestLearn do significado EN, conferida com o syllabus PT 4.0' : 'redação do syllabus 4.0/PT v1.0'}, PDF p.${item.pages.pt}.`,
          `EN wording: syllabus 4.0.1, PDF p.${item.pages.en}. PT: ${item.ptWording === 'localized-4.0.1' ? 'TestLearn localization of the English meaning, checked against the Portuguese 4.0 syllabus' : 'wording from syllabus 4.0/PT v1.0'}, PDF p.${item.pages.pt}.`,
        )}
      </small>
    </div>
  );
}
export function ObjectiveHelp({
  lo,
  language,
}: {
  lo: string;
  language: Language;
}) {
  return (
    <details className="learning-help">
      <summary>
        {label(
          language,
          `Conhecer o objetivo ${lo}`,
          `Understand objective ${lo}`,
        )}
      </summary>
      <ObjectiveDescription lo={lo} language={language} />
    </details>
  );
}
export function QuestionReference({
  question,
  language,
}: {
  question: Question;
  language: Language;
}) {
  const documented =
    question.origin === 'original' &&
    question.review === 'AI_REVIEWED' &&
    !!question.academicReview?.report;
  const review = question.academicReview;
  return (
    <details className="question-reference">
      <summary>
        {label(
          language,
          'Origem e referência da pergunta',
          'Question origin and reference',
        )}
      </summary>
      <p>
        <strong>
          {label(language, 'Origem da pergunta', 'Question origin')}
        </strong>
        :{' '}
        {documented
          ? label(
              language,
              'Questão original do TestLearn — criação e revisão assistidas por IA.',
              'Original TestLearn question — AI-assisted creation and review.',
            )
          : label(
              language,
              'Origem não totalmente documentada nesta revisão.',
              'Origin not fully documented for this revision.',
            )}
      </p>
      <p>
        {label(
          language,
          'A referência técnica apoia a matéria e a resposta; não é a origem de uma cópia do enunciado. Aprovação académica humana pendente.',
          'The technical reference supports the subject and answer; it does not mean the question text was copied. Human academic approval is pending.',
        )}
      </p>
      <p>
        {label(language, 'Tópico da pergunta', 'Question topic')}:{' '}
        {topicLabel(question.topic, language)}
      </p>
      <ObjectiveDescription lo={question.lo} language={language} />
      <p>
        <strong>
          {label(
            language,
            'Referência técnica registada',
            'Recorded technical reference',
          )}
        </strong>
        :{' '}
        {review?.section && review.pages.length
          ? `${officialReferences.en.title}; §${review.section}; PDF ${review.pages.length > 1 ? 'pp.' : 'p.'}${review.pages.join(', ')}.`
          : label(
              language,
              'Referência e páginas desta revisão não totalmente documentadas.',
              'Reference and pages for this revision are not fully documented.',
            )}
      </p>
      <p>
        {label(
          language,
          'Referência registada na revisão assistida por IA, não aprovação humana.',
          'Reference recorded in the AI-assisted review, not human approval.',
        )}
      </p>
      <p>
        <a href={officialReferences.en.url} target="_blank" rel="noreferrer">
          {officialReferences.en.title} ↗
        </a>
      </p>
      <p>
        <a href={officialReferences.pt.url} target="_blank" rel="noreferrer">
          {officialReferences.pt.title} ↗
        </a>
      </p>
      <small>
        {label(
          language,
          'Descrições dos objetivos: © ISTQB® e autores do syllabus. Excertos identificados para estudo; sem afiliação ou acreditação.',
          'Objective descriptions: © ISTQB® and syllabus authors. Attributed excerpts for study; no affiliation or accreditation.',
        )}
      </small>
    </details>
  );
}
