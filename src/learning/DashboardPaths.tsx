import { label, type Language } from '../i18n';
import { remaining, type Session } from '../domain/engine';
import { durationText } from './assessment';
export default function DashboardPaths({
  active,
  now,
  language,
  minutes,
  onMinutes,
  onStudy,
  onExam,
  onResume,
  canCreate,
}: {
  active: Session | null;
  now: number;
  language: Language;
  minutes: number;
  onMinutes: (n: number) => void;
  onStudy: () => void;
  onExam: () => void;
  onResume: () => void;
  canCreate: boolean;
}) {
  const t = (pt: string, en: string) => label(language, pt, en);
  const timed =
    active?.mode === 'exam' &&
    active.deadline !== null &&
    Number.isFinite(active.deadline) &&
    Number.isFinite(active.startedAt) &&
    Number.isFinite(now) &&
    now >= active.startedAt &&
    active.deadline >= active.startedAt;
  return (
    <>
      {active && (
        <section
          className="panel resume-session"
          aria-labelledby="resume-title"
        >
          <h2 id="resume-title">
            {t('Continuar a sessão em curso', 'Continue your active session')}
          </h2>
          <p>
            {active.mode === 'exam'
              ? t('Simulado CTFL', 'CTFL practice exam')
              : t('Prática por tópico', 'Topic practice')}{' '}
            ·{' '}
            {
              active.questionIds.filter((id) => !!active.answers[id]?.length)
                .length
            }
            /{active.questionIds.length}{' '}
            {t('perguntas com resposta', 'questions with a response')}
          </p>
          {timed ? (
            <>
              <p>
                {t('Limite guardado', 'Stored limit')}:{' '}
                {(active.deadline! - active.startedAt) / 60000} min ·{' '}
                {remaining(active, now) === 0
                  ? t(
                      'O tempo terminou. Ao continuar, consulte a conclusão e o resultado.',
                      'Time has expired. Continue to view completion and results.',
                    )
                  : t(
                      `Tempo restante: ${durationText(remaining(active, now))}`,
                      `Time remaining: ${durationText(remaining(active, now))}`,
                    )}
              </p>
              <p>
                {t(
                  'O relógio continua enquanto a página está fechada.',
                  'The timer continues while the page is closed.',
                )}
              </p>
            </>
          ) : (
            <p>
              {active.mode === 'practice'
                ? t('Sem limite de tempo.', 'No time limit.')
                : t(
                    'Informação de tempo indisponível.',
                    'Timing information unavailable.',
                  )}
            </p>
          )}
          <button className="primary" onClick={onResume}>
            {t('Continuar sessão', 'Resume session')}
          </button>
        </section>
      )}
      <section
        className="learning-paths"
        aria-label={t('Escolha como estudar', 'Choose how to study')}
      >
        <article className="panel learning-path study-path">
          <span className="path-label">
            {t('ESTUDAR E COMPREENDER', 'LEARN AND UNDERSTAND')}
          </span>
          <h2>{t('Aprender por capítulo', 'Learn by chapter')}</h2>
          <p>
            {t(
              'Prática focada, sem tempo limite, com explicações após cada resposta. Não segue as quotas de um exame completo.',
              'Focused, untimed practice with explanations after each answer. It does not use full-exam quotas.',
            )}
          </p>
          <div className="path-controls">
            <button className="primary" onClick={onStudy}>
              {t('Estudar por capítulo', 'Study by chapter')}
            </button>
            <span className="path-hint">
              {t(
                'Ao seu ritmo · feedback imediato',
                'At your pace · immediate feedback',
              )}
            </span>
          </div>
        </article>
        <article className="panel learning-path exam-path">
          <span className="path-label">
            {t('TREINAR A ESTRUTURA DO EXAME', 'PRACTISE THE EXAM STRUCTURE')}
          </span>
          <h2>{t('Treinar um exame completo', 'Practise a full exam')}</h2>
          <p>
            {t(
              '40 perguntas · seis capítulos · 60 minutos padrão · referência 26/40. Segue a estrutura de referência do CTFL.',
              '40 questions · six chapters · 60 standard minutes · 26/40 reference threshold. Follows the CTFL reference exam structure.',
            )}
          </p>
          <p>
            {t(
              'Simulação independente, não oficial nem calibrada; não prevê certificação.',
              'Independent simulation, neither official nor calibrated; it does not predict certification.',
            )}
          </p>
          <div className="path-controls">
            <label>
              {t('Duração', 'Duration')}
              <select
                aria-label={t('Duração', 'Duration')}
                value={minutes}
                onChange={(e) => onMinutes(Number(e.target.value))}
              >
                <option value={60}>60 min</option>
                <option value={75}>75 min</option>
              </select>
            </label>
            <button
              className="primary"
              disabled={!canCreate || !!active}
              onClick={onExam}
            >
              {t('Fazer simulado CTFL', 'Take a CTFL practice exam')}
            </button>
          </div>
          <small>
            {active
              ? t(
                  'Continue a sessão existente antes de iniciar outra.',
                  'Resume the existing session before starting another.',
                )
              : t(
                  '75 minutos é uma opção de prática; não confirma elegibilidade oficial para tempo adicional.',
                  '75 minutes is a practice option; it does not establish official extra-time eligibility.',
                )}
          </small>
        </article>
      </section>
    </>
  );
}
