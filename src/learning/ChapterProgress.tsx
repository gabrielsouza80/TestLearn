import { label, chapters, type Language } from '../i18n';
import { CONTENT_REVISION } from '../domain/revision';
import {
  STUDY_MINIMUM,
  type learningProgress,
} from '../domain/learning-progress';
type Model = ReturnType<typeof learningProgress>;
export default function ChapterProgress({
  model,
  language,
  onPractice,
}: {
  model: Model;
  language: Language;
  onPractice: (chapter: number) => void;
}) {
  const t = (pt: string, en: string) => label(language, pt, en);
  return (
    <section
      className="panel chapter-overview"
      aria-labelledby="chapter-progress-title"
    >
      <h2 id="chapter-progress-title">
        {t('Progresso por capítulo', 'Chapter progress')}
      </h2>
      <p>
        {t(
          `Apenas sessões concluídas da revisão atual (${CONTENT_REVISION}). As revisões anteriores continuam no histórico. Cobertura do banco não demonstra domínio do syllabus.`,
          `Completed sessions from the current revision (${CONTENT_REVISION}) only. Earlier revisions remain in history. Bank coverage does not demonstrate syllabus mastery.`,
        )}
      </p>
      <p>
        {!model.enoughEvidence
          ? t(
              'Há ainda poucas respostas para identificar áreas que precisam de mais estudo.',
              'Not enough answers yet to identify reliable study priorities.',
            )
          : !model.priorities.length
            ? t(
                'Não há uma prioridade evidente nesta amostra. Continue a variar a prática; isto não é um diagnóstico de competência.',
                'No clear priority in this sample. Keep varying practice; this is not a competency diagnosis.',
              )
            : t(
                'Pode valer a pena rever os capítulos abaixo. São descrições da prática, sem ordenar capítulos ou prever aprovação.',
                'Consider reviewing the chapters below. These describe practice, without ranking chapters or predicting success.',
              )}
      </p>
      {!!model.priorities.length && (
        <ul className="study-priorities">
          {model.priorities.map((c) => (
            <li key={c.chapter}>
              {label(
                language,
                chapters[c.chapter - 1].pt,
                chapters[c.chapter - 1].en,
              )}
              : {c.firstCorrect}/{c.firstAnswered}{' '}
              {t(
                'corretas nas primeiras visitas registadas com resposta.',
                'correct in first recorded visits with an answer.',
              )}
            </li>
          ))}
        </ul>
      )}
      <details className="learning-help">
        <summary>
          {t('Como interpretar estes dados', 'How to interpret these figures')}
        </summary>
        <p>
          {t(
            `Heurística do produto: pelo menos ${STUDY_MINIMUM} perguntas distintas respondidas na primeira visita registada e pelo menos duas incorretas para sugerir revisão de um capítulo. Não é uma norma estatística ou ISTQB. Capítulos com poucas perguntas podem nunca fornecer esta amostra. Não comparamos taxas para criar um ranking.`,
            `Product heuristic: at least ${STUDY_MINIMUM} distinct questions answered in their first recorded visit and at least two incorrect to suggest chapter review. This is not a statistical or ISTQB standard. Small chapters may never provide this sample. Rates are not compared to create a ranking.`,
          )}
        </p>
        <p>
          {t(
            'Primeira visita: primeira sessão com evidência, sem sobreposição com a seguinte e sem visitas ou respostas ao mesmo ID noutras revisões. Prática repetida: existe visita nesta revisão numa sessão terminada antes de esta começar. Se faltam visitas, há outra revisão ou as datas se sobrepõem, a primeira exposição fica desconhecida. Uma resposta em branco não entra nos denominadores de respostas.',
            'First visit: the first evidenced session, without overlap with the next or visits/answers to the same ID in another revision. Repeated practice: a visit in this revision exists in a session completed before this one started. Missing visits, another revision or overlapping dates leave first exposure unknown. Blank responses do not enter answer denominators.',
          )}
        </p>
      </details>
      <div className="chapter-progress-grid">
        {model.chapters.map((c) => (
          <article
            className={`chapter-progress chapter-accent-${c.chapter}`}
            key={c.chapter}
          >
            <h3>
              {c.chapter}.{' '}
              {label(
                language,
                chapters[c.chapter - 1].pt,
                chapters[c.chapter - 1].en,
              )}
            </h3>
            <dl>
              <div>
                <dt>
                  {t(
                    'Perguntas únicas respondidas / disponíveis',
                    'Unique questions answered / available',
                  )}
                </dt>
                <dd>
                  {c.uniqueAnswered} / {c.available}
                </dd>
              </div>
              <div>
                <dt>
                  {t(
                    'Primeiras visitas: corretas / respondidas',
                    'First visits: correct / answered',
                  )}
                </dt>
                <dd>
                  {c.firstCorrect} / {c.firstAnswered}
                </dd>
              </div>
              <div>
                <dt>
                  {t(
                    'Prática repetida: corretas / respostas',
                    'Repeated practice: correct / responses',
                  )}
                </dt>
                <dd>
                  {c.repeatCorrect} / {c.repeatAnswered}
                </dd>
              </div>
              {c.unknownAnswered > 0 && (
                <div>
                  <dt>
                    {t(
                      'Respostas com ordem de exposição desconhecida',
                      'Answers with unknown exposure order',
                    )}
                  </dt>
                  <dd>{c.unknownAnswered}</dd>
                </div>
              )}
            </dl>
            {c.available < STUDY_MINIMUM && (
              <small>
                {t(
                  'Banco pequeno: não permite a amostra mínima desta heurística.',
                  'Small bank: insufficient for this heuristic’s minimum sample.',
                )}
              </small>
            )}
            <button onClick={() => onPractice(c.chapter)}>
              {t(
                `Praticar capítulo ${c.chapter}`,
                `Practise chapter ${c.chapter}`,
              )}
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
