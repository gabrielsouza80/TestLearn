import { useEffect, useRef, useState } from 'react';
import pilot from '../../docs/experiments/advanced-interpretation/pilot-v1.json';
import Text from '../learning/Text';
import { ObjectiveHelp } from '../learning/ObjectiveHelp';
import { objectivesById } from '../reference/objectives';
import { label } from '../i18n';
import {
  evaluateAnswer,
  summarize,
  type Attempt,
  type PilotQuestion,
} from './training';
import { useQuestionTimer } from './useQuestionTimer';
import { englishStrategies } from './reading-strategies';
import './advanced-training.css';

type Locale = 'pt' | 'en';
const questions: PilotQuestion[] = pilot.questions;
function duration(ms: number) {
  const seconds = Math.floor(ms / 1000);
  return `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
}

export default function AdvancedTraining() {
  const [language, setLanguage] = useState<Locale>('pt');
  const [stage, setStage] = useState<'setup' | 'question' | 'summary'>('setup');
  const [timed, setTimed] = useState(false);
  const [showTargets, setShowTargets] = useState(true);
  const [index, setIndex] = useState(0);
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const title = useRef<HTMLHeadingElement>(null);
  const t = (pt: string, en: string) => label(language, pt, en);
  useEffect(() => {
    document.documentElement.lang = language === 'en' ? 'en' : 'pt-PT';
  }, [language]);
  useEffect(() => {
    title.current?.focus();
  }, [stage]);
  const stats = summarize(attempts);
  const restart = () => {
    setAttempts([]);
    setIndex(0);
    setStage('setup');
  };
  return (
    <main
      className="advanced-training"
      lang={language === 'en' ? 'en' : 'pt-PT'}
    >
      <a href="/">← {t('Voltar ao TestLearn', 'Back to TestLearn')}</a>
      <header className="panel advanced-header">
        <span className="eyebrow">
          {t(
            'Experimental · apenas desenvolvimento',
            'Experimental · development only',
          )}
        </span>
        <h1>
          {t(
            'Treino de interpretação avançada',
            'Advanced interpretation training',
          )}
        </h1>
        <p>
          {t(
            '10 questões piloto · revisão humana pendente · sem pontuação de exame.',
            '10 pilot questions · human review pending · no exam scoring.',
          )}
        </p>
        <label>
          {t('Idioma', 'Language')}
          <select
            value={language}
            onChange={(event) => setLanguage(event.target.value as Locale)}
          >
            <option value="pt">Português</option>
            <option value="en">English</option>
          </select>
        </label>
      </header>
      {stage === 'setup' && (
        <section className="panel">
          <h2 ref={title} tabIndex={-1}>
            {t('Preparar a prática', 'Prepare your practice')}
          </h2>
          <p>
            {t(
              'Leia o cenário completo, escolha uma alternativa e confirme para ver a análise. O progresso desta experiência fica só em memória; sair ou recarregar apaga a sessão.',
              'Read the full scenario, choose one option and submit to see the analysis. This experience stays in memory; leaving or reloading clears the session.',
            )}
          </p>
          <fieldset>
            <legend>{t('Modo de prática', 'Practice mode')}</legend>
            <label>
              <input
                type="radio"
                name="mode"
                checked={!timed}
                onChange={() => setTimed(false)}
              />
              {t('Prática sem pressão', 'Practice without pressure')}
            </label>
            <label>
              <input
                type="radio"
                name="mode"
                checked={timed}
                onChange={() => setTimed(true)}
              />
              {t('Prática cronometrada', 'Timed practice')}
            </label>
          </fieldset>
          <p>
            {t(
              'O tempo ativo mede leitura e resposta em conjunto até à confirmação. Pausas, separador oculto, perda de foco e leitura da análise ficam excluídos.',
              'Active time measures reading and answering together until submission. Pauses, hidden tabs, loss of focus and feedback reading are excluded.',
            )}
          </p>
          <p>
            {t(
              'As metas cronometradas são sugestões editoriais não calibradas, não limites oficiais. Não há submissão automática ao ultrapassá-las.',
              'Timed targets are uncalibrated editorial suggestions, not official limits. Exceeding a target never submits an answer automatically.',
            )}
          </p>
          <button className="primary" onClick={() => setStage('question')}>
            {t('Iniciar treino', 'Start training')}
          </button>
        </section>
      )}
      {stage === 'question' && (
        <QuestionPractice
          key={questions[index].id}
          question={questions[index]}
          language={language}
          number={index + 1}
          total={questions.length}
          timed={timed}
          showTargets={showTargets}
          onToggleTargets={() => setShowTargets(!showTargets)}
          attempt={attempts[index]}
          onSubmit={(attempt) =>
            setAttempts((previous) =>
              previous.some((a) => a.questionId === attempt.questionId)
                ? previous
                : [...previous, attempt],
            )
          }
          onNext={() =>
            index + 1 === questions.length
              ? setStage('summary')
              : setIndex(index + 1)
          }
        />
      )}
      {stage === 'summary' && (
        <section className="panel">
          <h2 ref={title} tabIndex={-1}>
            {t('Resumo da sessão', 'Session summary')}
          </h2>
          <p className="advanced-score">
            {stats.correct} / {stats.answered} · {stats.accuracy}%
          </p>
          <p>
            {t('Tempo ativo total:', 'Total active time:')}{' '}
            {duration(stats.totalMs)}
          </p>
          <p>
            {t(
              'Resultados desta prática, sem previsão de aprovação ou diagnóstico de competência. Os tempos por linha estão arredondados para segundos.',
              'Results of this practice, without a pass prediction or competence diagnosis. Row times are rounded down to seconds.',
            )}
          </p>
          <div
            className="table-scroll"
            role="region"
            tabIndex={0}
            aria-label={t('Resultados por questão', 'Results by question')}
          >
            <table>
              <caption>
                {t(
                  'Precisão e tempo por questão',
                  'Accuracy and time per question',
                )}
              </caption>
              <thead>
                <tr>
                  <th scope="col">{t('Questão', 'Question')}</th>
                  <th scope="col">LO</th>
                  <th scope="col">{t('Resultado', 'Result')}</th>
                  <th scope="col">{t('Tempo ativo', 'Active time')}</th>
                </tr>
              </thead>
              <tbody>
                {attempts.map((attempt, i) => (
                  <tr key={attempt.questionId}>
                    <th scope="row">
                      {i + 1} · {attempt.questionId}
                    </th>
                    <td>{questions[i].learningObjective}</td>
                    <td>
                      {attempt.correct
                        ? t('Correta', 'Correct')
                        : t('Incorreta', 'Incorrect')}
                    </td>
                    <td>{duration(attempt.elapsedMs)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
      {stage !== 'setup' && (
        <button onClick={restart}>
          {t('Recomeçar sessão', 'Restart session')}
        </button>
      )}
    </main>
  );
}

function QuestionPractice({
  question: q,
  language,
  number,
  total,
  timed,
  showTargets,
  onToggleTargets,
  attempt,
  onSubmit,
  onNext,
}: {
  question: PilotQuestion;
  language: Locale;
  number: number;
  total: number;
  timed: boolean;
  showTargets: boolean;
  onToggleTargets: () => void;
  attempt?: Attempt;
  onSubmit: (attempt: Attempt) => void;
  onNext: () => void;
}) {
  const [selected, setSelected] = useState('');
  const submitted = useRef(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const feedback = useRef<HTMLHeadingElement>(null);
  const timer = useQuestionTimer();
  const t = (pt: string, en: string) => label(language, pt, en);
  useEffect(() => {
    heading.current?.focus();
  }, []);
  useEffect(() => {
    if (attempt) feedback.current?.focus();
  }, [attempt]);
  return (
    <article className="panel advanced-question" data-question-id={q.id}>
      <p>
        {t(`Questão ${number} de ${total}`, `Question ${number} of ${total}`)}
      </p>
      <h2 ref={heading} tabIndex={-1}>
        {q.id} · {q.learningObjective}
      </h2>
      <p>
        {t('Dificuldade de interpretação', 'Interpretation difficulty')}:{' '}
        {q.interpretationDifficulty} · {q.cognitiveLevel}
      </p>
      <p className="advanced-scenario">
        <Text value={q.prompt} language={language} />
      </p>
      <div className="advanced-time">
        <span aria-label={t('Tempo ativo da questão', 'Active question time')}>
          {t('Tempo ativo', 'Active time')}:{' '}
          {duration(attempt?.elapsedMs ?? timer.elapsedMs)}
        </span>
        {!attempt && (
          <button onClick={timer.togglePause} disabled={timer.autoPaused}>
            {timer.manualPaused ? t('Retomar', 'Resume') : t('Pausar', 'Pause')}
          </button>
        )}
        {!attempt && timer.paused && (
          <span role="status">
            {t(
              'Em pausa; retome ou volte a focar esta janela.',
              'Paused; resume or focus this window again.',
            )}
          </span>
        )}
      </div>
      {timed && (
        <div>
          <label>
            <input
              type="checkbox"
              checked={showTargets}
              onChange={onToggleTargets}
            />
            {t('Mostrar metas por questão', 'Show per-question targets')}
          </label>
          {showTargets && (
            <p>
              {t('Meta editorial:', 'Editorial target:')}{' '}
              {duration(q.timeTargetSeconds.total * 1000)}{' '}
              {t('(opcional, não calibrada)', '(optional, uncalibrated)')}
              {(attempt?.elapsedMs ?? timer.elapsedMs) >
                q.timeTargetSeconds.total * 1000 && (
                <>
                  {' '}
                  ·{' '}
                  {t(
                    'Meta ultrapassada; continue ao seu ritmo.',
                    'Target exceeded; continue at your own pace.',
                  )}
                </>
              )}
            </p>
          )}
        </div>
      )}
      {!attempt ? (
        <form
          onSubmit={(event) => {
            event.preventDefault();
            if (!selected || timer.paused || submitted.current) return;
            submitted.current = true;
            onSubmit(evaluateAnswer(q, selected, timer.finish()));
          }}
        >
          <fieldset disabled={timer.paused}>
            <legend>
              {t('Selecione uma alternativa', 'Select one option')}
            </legend>
            {q.options.map((option, i) => (
              <label className="advanced-option" key={option.id}>
                <input
                  type="radio"
                  name={q.id}
                  value={option.id}
                  checked={selected === option.id}
                  onChange={() => setSelected(option.id)}
                />
                <span>
                  <span aria-hidden="true" className="option-letter">
                    {String.fromCharCode(65 + i)}.{' '}
                  </span>
                  <Text value={option.text} language={language} />
                </span>
              </label>
            ))}
          </fieldset>
          <button
            className="primary"
            type="submit"
            disabled={!selected || timer.paused}
          >
            {t('Confirmar resposta', 'Submit answer')}
          </button>
        </form>
      ) : (
        <section
          className={`feedback feedback-${attempt.correct ? 'correct' : 'incorrect'}`}
          aria-label={t('Análise da resposta', 'Answer analysis')}
        >
          <h3 ref={feedback} tabIndex={-1}>
            {attempt.correct
              ? t('Resposta correta', 'Correct answer')
              : t('Resposta incorreta', 'Incorrect answer')}
          </h3>
          <ul className="review-options">
            {q.options.map((o, i) => (
              <li
                key={o.id}
                className={
                  q.correct.includes(o.id)
                    ? 'review-option-correct'
                    : o.id === attempt.selectedId
                      ? 'review-option-wrong'
                      : 'review-option-neutral'
                }
              >
                <p>
                  <strong>
                    {String.fromCharCode(65 + i)}.{' '}
                    <Text value={o.text} language={language} />
                  </strong>
                </p>
                <p>
                  {q.correct.includes(o.id)
                    ? t('Opção correta', 'Correct option')
                    : t('Opção incorreta', 'Incorrect option')}
                  {o.id === attempt.selectedId && (
                    <> · {t('Selecionada por si', 'Selected by you')}</>
                  )}
                </p>
                <p>
                  <Text value={o.explanation} language={language} />
                </p>
              </li>
            ))}
          </ul>
          <h4>{t('Conceito CTFL', 'CTFL concept')}</h4>
          <p>
            <Text
              value={objectivesById[q.learningObjective].description}
              language={language}
            />
          </p>
          <ObjectiveHelp lo={q.learningObjective} language={language} />
          <p>
            CTFL v4.0.1 · §{q.reference.section} · PDF {t('páginas', 'pages')}{' '}
            {q.reference.pdfPages.join(', ')}
          </p>
          <h4>
            {t('Estratégia de leitura sugerida', 'Suggested reading strategy')}
          </h4>
          <p>
            {language === 'pt' ? q.readingStrategy : englishStrategies[q.id]}
          </p>
          <button className="primary" onClick={onNext}>
            {number === total
              ? t('Ver resumo', 'View summary')
              : t('Próxima questão', 'Next question')}
          </button>
        </section>
      )}
    </article>
  );
}
