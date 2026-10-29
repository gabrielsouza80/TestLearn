import { useState } from 'react';
import { label, type Language } from '../i18n';
import type { Question, Session } from '../domain/engine';
import {
  resultPresentation,
  durationText,
  type AnswerStatus,
} from './assessment';
import Text from './Text';
import QuestionTable from './QuestionTable';
import AnswerReview from './AnswerReview';
const statusLabel = (status: AnswerStatus, language: Language) =>
  status === 'correct'
    ? label(language, 'Correta', 'Correct')
    : status === 'incorrect'
      ? label(language, 'Incorreta', 'Incorrect')
      : label(language, 'Sem resposta', 'Unanswered');
export default function ResultReview({
  session,
  bank,
  language,
  onPractice,
  onExam,
  hasActive,
  canCreateExam,
}: {
  session: Session;
  bank: Question[];
  language: Language;
  onPractice: () => void;
  onExam: () => void;
  hasActive: boolean;
  canCreateExam: boolean;
}) {
  const model = resultPresentation(session, bank),
    [filter, setFilter] = useState('all');
  const counts = {
    all: model.total,
    correct: model.correct,
    incorrect: model.incorrect,
    unanswered: model.unanswered,
  };
  const visible = model.rows.filter(
    (row) => filter === 'all' || row.status === filter,
  );
  const go = (id: string) => {
    const target = document.getElementById(`review-title-${id}`);
    target?.focus();
    target?.scrollIntoView?.({ block: 'start' });
  };
  const t = (pt: string, en: string) => label(language, pt, en);
  return (
    <>
      <section
        className={`result-banner result-${model.practicePassed === null ? 'neutral' : model.practicePassed ? 'passed' : 'failed'}`}
        aria-label={t('Resumo dos resultados', 'Result summary')}
      >
        <div>
          <p>
            {session.mode === 'exam'
              ? t('SIMULAÇÃO CONCLUÍDA', 'EXAM SIMULATION COMPLETED')
              : t('PRÁTICA POR TÓPICO CONCLUÍDA', 'TOPIC PRACTICE COMPLETED')}
          </p>
          <h2>
            {model.correct} <span>/ {model.total}</span>
          </h2>
          <p>
            {t('Percentagem', 'Percentage')}:{' '}
            {new Intl.NumberFormat(language === 'en' ? 'en' : 'pt-PT', {
              maximumFractionDigits: 1,
            }).format(model.percentage)}
            %
          </p>
          {model.alignedExam && (
            <>
              <strong className="practice-outcome">
                {model.practicePassed
                  ? t(
                      'Aprovado na simulação de prática',
                      'Passed the practice exam',
                    )
                  : t(
                      'Não aprovado na simulação de prática',
                      'Did not pass the practice exam',
                    )}
              </strong>
              <p>
                {t('Limiar de referência', 'Reference threshold')}: 26/40 (65%)
              </p>
            </>
          )}
          <dl className="result-counts">
            <div>
              <dt>{t('Corretas', 'Correct')}</dt>
              <dd>{model.correct}</dd>
            </div>
            <div>
              <dt>{t('Incorretas', 'Incorrect')}</dt>
              <dd>{model.incorrect}</dd>
            </div>
            <div>
              <dt>{t('Sem resposta', 'Unanswered')}</dt>
              <dd>{model.unanswered}</dd>
            </div>
          </dl>
          <p>
            {t(
              'Tempo decorrido (min:seg, inclui inatividade)',
              'Elapsed time (min:sec, includes inactivity)',
            )}
            :{' '}
            {model.elapsedMs === null
              ? t('Não disponível', 'Unavailable')
              : durationText(model.elapsedMs)}
            {model.limitMinutes !== null &&
              ` · ${t('Limite', 'Limit')}: ${model.limitMinutes} min`}
          </p>
          <p>
            {t(
              'O motivo de conclusão não está registado nestas sessões.',
              'The completion reason is not recorded for these sessions.',
            )}
          </p>
        </div>
        <div>
          <p>
            {t(
              'As perguntas sem resposta não pontuam. Este é um resultado de prática independente, não um certificado ou uma previsão de aprovação oficial.',
              'Unanswered questions earn no points. This is an independent practice result, not a certificate or a prediction of official success.',
            )}
          </p>
          <button
            onClick={() => {
              const target = document.getElementById('answer-review');
              target?.focus();
              target?.scrollIntoView?.({ block: 'start' });
            }}
          >
            {t('Rever respostas', 'Review answers')}
          </button>
          <button
            className="primary"
            onClick={onExam}
            disabled={!hasActive && !canCreateExam}
          >
            {hasActive
              ? t('Retomar sessão em curso', 'Resume active session')
              : t('Nova simulação', 'New practice exam')}
          </button>
          <button onClick={onPractice}>
            {t('Nova prática', 'New practice')}
          </button>
        </div>
      </section>
      <div className="section-heading">
        <h2 id="answer-review" tabIndex={-1}>
          {t('Rever respostas', 'Review answers')}
        </h2>
        <label>
          {t('Mostrar', 'Show')}
          <select
            aria-label={t('Mostrar', 'Show')}
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
          >
            {(['all', 'correct', 'incorrect', 'unanswered'] as const).map(
              (status) => (
                <option key={status} value={status}>
                  {status === 'all'
                    ? t('Todas', 'All')
                    : statusLabel(status, language)}{' '}
                  ({counts[status]})
                </option>
              ),
            )}
          </select>
        </label>
      </div>
      {!!visible.length && (
        <label className="review-jump">
          {t('Ir para questão', 'Go to question')}
          <select
            aria-label={t('Ir para questão', 'Go to question')}
            value=""
            onChange={(event) => go(event.target.value)}
          >
            <option value="">
              {t('Escolher questão…', 'Choose a question…')}
            </option>
            {visible.map((row) => (
              <option value={row.question.id} key={row.question.id}>
                {t('Questão', 'Question')} {row.number} ·{' '}
                {statusLabel(row.status, language)} · {row.question.lo}
              </option>
            ))}
          </select>
        </label>
      )}
      {!visible.length && (
        <p role="status" className="notice">
          {t(
            'Nenhuma questão nesta categoria. Escolha outro filtro.',
            'No questions in this category. Choose another filter.',
          )}
        </p>
      )}
      {visible.map(({ question: q, number, status }) => (
        <article
          className={`panel review-question review-${status}`}
          key={q.id}
          data-question-id={q.id}
          data-status={status}
          aria-labelledby={`review-title-${q.id}`}
        >
          <p className="eyebrow">
            {t('Questão', 'Question')} {number} {t('de', 'of')} {model.total} ·{' '}
            {q.lo} · {q.level}
          </p>
          <p className="question-status">
            <strong>
              {status === 'correct'
                ? '✓ '
                : status === 'incorrect'
                  ? '✗ '
                  : '— '}
              {statusLabel(status, language)}
            </strong>
          </p>
          <h3 id={`review-title-${q.id}`} tabIndex={-1}>
            <Text value={q.text} language={language} />
          </h3>
          <QuestionTable
            questionId={q.id}
            table={q.table}
            language={language}
          />
          <AnswerReview
            question={q}
            selected={session.answers[q.id] ?? []}
            order={session.optionOrder[q.id]}
            language={language}
            name={t(
              `Explicação da questão ${number}`,
              `Explanation for question ${number}`,
            )}
          />
        </article>
      ))}
    </>
  );
}
