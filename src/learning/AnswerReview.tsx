import { label, type Language } from '../i18n';
import type { Question } from '../domain/engine';
import { answerStatus, presentedOptions } from './assessment';
import { QuestionReference } from './ObjectiveHelp';
import Text from './Text';
export default function AnswerReview({
  question,
  selected,
  order,
  language,
  name,
  headingLevel = 3,
}: {
  question: Question;
  selected: string[];
  order: string[];
  language: Language;
  name: string;
  headingLevel?: 3 | 4;
}) {
  const Heading = headingLevel === 3 ? 'h3' : 'h4';
  const status = answerStatus(question, selected),
    options = presentedOptions(question, order);
  const selectedLetters = options
      .filter(({ option }) => selected.includes(option.id))
      .map((o) => o.letter)
      .join(', '),
    correctLetters = options
      .filter(({ option }) => question.correct.includes(option.id))
      .map((o) => o.letter)
      .join(', ');
  return (
    <section className={`feedback feedback-${status}`} aria-label={name}>
      <strong className="feedback-status">
        <span aria-hidden="true">
          {status === 'correct' ? '✓ ' : status === 'incorrect' ? '✗ ' : '— '}
        </span>
        {status === 'correct'
          ? label(language, 'Resposta correta', 'Correct answer')
          : status === 'incorrect'
            ? label(language, 'Resposta incorreta', 'Incorrect answer')
            : label(language, 'Sem resposta', 'Unanswered')}
      </strong>
      <p className="answer-sets">
        <strong>{label(language, 'A sua resposta:', 'Your answer:')}</strong>{' '}
        {selectedLetters || label(language, 'Sem resposta', 'Unanswered')} ·{' '}
        <strong>
          {label(language, 'Resposta correta:', 'Correct answer:')}
        </strong>{' '}
        {correctLetters}
      </p>
      {question.required > 1 && (
        <p>
          {label(
            language,
            'É necessário o conjunto exato de respostas; não há crédito parcial.',
            'The exact answer set is required; there is no partial credit.',
          )}
        </p>
      )}
      <div className="learning-takeaway">
        <Heading>
          {label(language, 'Ideia principal', 'Key learning point')}
        </Heading>
        <p>
          <Text value={question.explanation} language={language} />
        </p>
      </div>
      <ul className="review-options">
        {options.map(({ letter, option }) => {
          const chosen = selected.includes(option.id),
            right = question.correct.includes(option.id);
          return (
            <li
              key={option.id}
              data-option-id={option.id}
              data-selected={chosen ? 'true' : 'false'}
              className={
                right
                  ? 'review-option-correct'
                  : chosen
                    ? 'review-option-wrong'
                    : 'review-option-neutral'
              }
            >
              <p>
                <strong>
                  <span className="option-letter">{letter}.</span>{' '}
                  <Text value={option.text} language={language} />
                </strong>
              </p>
              <p className="option-state">
                {right ? '✓ ' : chosen ? '✗ ' : '— '}
                {right
                  ? label(language, 'Opção correta', 'Correct option')
                  : label(language, 'Opção incorreta', 'Incorrect option')}{' '}
                ·{' '}
                {chosen
                  ? label(language, 'Selecionada por si', 'Selected by you')
                  : label(language, 'Não selecionada', 'Not selected')}
              </p>
              {right || chosen ? (
                <p>
                  <Text value={option.explanation} language={language} />
                </p>
              ) : (
                <details>
                  <summary>
                    {label(
                      language,
                      `Porque está ${letter} incorreta?`,
                      `Why is ${letter} incorrect?`,
                    )}
                  </summary>
                  <p>
                    <Text value={option.explanation} language={language} />
                  </p>
                </details>
              )}
            </li>
          );
        })}
      </ul>
      <QuestionReference question={question} language={language} />
    </section>
  );
}
