import { topicLabel } from './topic-labels';
import {
  CONTENT_REVISION,
  LEGACY_CONTENT_REVISION,
  BLUEPRINT_CONTENT_REVISION,
  COVERAGE_CONTENT_REVISION,
  BILINGUAL_CONTENT_REVISION,
  VARIABILITY_CONTENT_REVISION,
  QUALITY_CONTENT_REVISION,
  TERMINOLOGY_CONTENT_REVISION,
  isBlueprintRevision,
} from './domain/revision';
import { distinctViewed, repeatedViewed } from './domain/progress';
import { useCallback, useEffect, useRef, useState } from 'react';
import { questions } from './data/questions';
import {
  answer,
  createSession,
  finish,
  isCorrect,
  recordTime,
  remaining,
  score,
  sessionQuestions,
  selectQuestions,
  type Session,
  type Question,
} from './domain/engine';
import {
  emptyState,
  load,
  loadAsync,
  readStoredValue,
  createStateWriter,
} from './storage/store';
import PublicInformation, {
  publicTitles,
  type InformationPage,
} from './PublicInformation';
import { BankNotReadyError } from './data/bank-history';
import { chapters, label, type Language, type Localized } from './i18n';
import './styles.css';
import EnglishLearning from './EnglishLearning';
import {
  selectPracticeExam,
  BlueprintSelectionError,
} from './domain/blueprint';

type Page =
  | 'dashboard'
  | 'practice'
  | 'session'
  | 'history'
  | 'english'
  | 'result'
  | InformationPage;
function Text({ value, language }: { value: Localized; language: Language }) {
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
function QuestionTable({
  table,
  language,
  questionId,
}: {
  questionId: string;
  table: Question['table'];
  language: Language;
}) {
  if (!table) return null;
  return (
    <div
      className="table-scroll"
      role="region"
      tabIndex={0}
      aria-label={`${questionId}: ${label(language, 'Dados da tabela; deslocação horizontal se necessária', 'Table data; scroll horizontally if needed')}`}
    >
      <table>
        <caption>
          {label(language, 'Dados da questão', 'Question data')}
        </caption>
        <thead>
          <tr>
            {table.headers.map((cell, index) => (
              <th key={index} scope="col">
                {cell}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, index) => (
            <tr key={index}>
              {row.map((cell, i) =>
                i === 0 ? (
                  <th key={i} scope="row">
                    {cell}
                  </th>
                ) : (
                  <td key={i}>{cell}</td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function App() {
  const [restoration, setRestoration] = useState<
    | {
        status: 'ready';
        initial: ReturnType<typeof load>;
        initialRaw: string | null | undefined;
      }
    | { status: 'loading' }
    | { status: 'error' }
  >(() => {
    try {
      const initialRaw = readStoredValue();
      return { status: 'ready', initial: load(), initialRaw };
    } catch (error) {
      if (error instanceof BankNotReadyError) return { status: 'loading' };
      return { status: 'error' };
    }
  });
  const needsRestore = restoration.status === 'loading';
  useEffect(() => {
    if (!needsRestore) return;
    let cancelled = false;
    const initialRaw = readStoredValue();
    void loadAsync()
      .then((initial) => {
        if (!cancelled)
          setRestoration({ status: 'ready', initial, initialRaw });
      })
      .catch(() => {
        if (!cancelled) setRestoration({ status: 'error' });
      });
    return () => {
      cancelled = true;
    };
  }, [needsRestore]);
  if (restoration.status === 'ready')
    return (
      <LearningApp
        initial={restoration.initial}
        initialRaw={restoration.initialRaw}
      />
    );
  return (
    <main>
      <h1>TestLearn</h1>
      {restoration.status === 'loading' ? (
        <p role="status">
          A carregar as perguntas da sessão guardada… / Loading saved session
          questions…
        </p>
      ) : (
        <div role="alert">
          <p>
            Não foi possível recuperar a sessão. Os dados guardados foram
            preservados. / Could not restore the session. Saved data has been
            preserved.
          </p>
          <button onClick={() => window.location.reload()}>
            Recarregar e tentar novamente / Reload and retry
          </button>
        </div>
      )}
    </main>
  );
}

function LearningApp({
  initial,
  initialRaw,
}: {
  initial: ReturnType<typeof load>;
  initialRaw: string | null | undefined;
}) {
  const [writer] = useState(() => createStateWriter(initialRaw));
  const [storageConflict, setStorageConflict] = useState(false);
  const [state, setState] = useState(initial.state);
  const [warning, setWarning] = useState(initial.warning);
  const [language, setLanguage] = useState<Language>('pt');
  const [page, setPage] = useState<Page>(
    initial.state.active ? 'session' : 'dashboard',
  );
  const [viewed, setViewed] = useState<Session | null>(null);
  const [now, setNow] = useState(() => Date.now());
  const [chapter, setChapter] = useState('');
  const [topic, setTopic] = useState('');
  const [lo, setLo] = useState('');
  const [level, setLevel] = useState('');
  const [count, setCount] = useState(5);
  const [historyFilter, setHistoryFilter] = useState('all');
  const [minutes, setMinutes] = useState(60);

  const [reviewFilter, setReviewFilter] = useState('all');
  const [confirmSubmit, setConfirmSubmit] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const [error, setError] = useState('');
  const heading = useRef<HTMLHeadingElement>(null);
  const t = (pt: string, en: string) => label(language, pt, en);
  useEffect(() => {
    document.documentElement.lang = language === 'en' ? 'en' : 'pt-PT';
  }, [language]);
  useEffect(() => {
    if (state === initial.state) return;
    let cancelled = false;
    void writer.save(state).then((status) => {
      if (cancelled) return;
      if (status === 'conflict') setStorageConflict(true);
      else
        setWarning(
          status === 'saved'
            ? null
            : 'Não foi possível guardar neste dispositivo. / Unable to save on this device.',
        );
    });
    return () => {
      cancelled = true;
    };
  }, [state, initial.state, writer]);
  useEffect(() => {
    const check = (event: StorageEvent) => {
      if (
        (event.key === 'testlearn.v1' || event.key === null) &&
        !writer.isCurrent()
      )
        setStorageConflict(true);
    };
    window.addEventListener('storage', check);
    return () => window.removeEventListener('storage', check);
  }, [writer]);

  useEffect(() => {
    heading.current?.focus();
  }, [page]);
  useEffect(() => {
    if (!confirmSubmit && !confirmReset) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const dialog = document.querySelector<HTMLElement>('[role="alertdialog"]');
    const buttons = dialog?.querySelectorAll<HTMLButtonElement>('button');
    buttons?.[0]?.focus();
    function keyboard(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setConfirmSubmit(false);
        setConfirmReset(false);
      }
      if (event.key === 'Tab' && buttons?.length) {
        const first = buttons[0];
        const last = buttons[buttons.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener('keydown', keyboard);
    return () => {
      document.removeEventListener('keydown', keyboard);
      previousFocus?.focus();
    };
  }, [confirmSubmit, confirmReset]);
  const complete = useCallback((session: Session) => {
    const completed = finish(session);
    setState((previous) => ({
      ...previous,
      active: null,
      history: previous.history.some((item) => item.id === completed.id)
        ? previous.history
        : [...previous.history, completed],
    }));
    setViewed(completed);
    setPage('result');
    setConfirmSubmit(false);
  }, []);
  useEffect(() => {
    function tick() {
      const time = Date.now();
      setNow(time);
      if (state.active?.deadline && remaining(state.active, time) <= 0)
        complete(state.active);
    }
    const immediate = window.setTimeout(tick, 0);
    const timer = window.setInterval(tick, 1000);
    return () => {
      clearTimeout(immediate);
      clearInterval(timer);
    };
  }, [state.active, complete]);
  const seen = distinctViewed(state.history);
  const wrong = new Set(
    state.history.flatMap((session) =>
      session.questionIds.filter((id) => {
        const q = sessionQuestions(session, questions).find(
          (item) => item.id === id,
        );
        return q && !isCorrect(q, session.answers[id] ?? []);
      }),
    ),
  );
  const filterIds =
    historyFilter === 'incorrect'
      ? [...wrong]
      : historyFilter === 'unanswered'
        ? [
            ...new Set(
              state.history.flatMap((session) =>
                session.questionIds.filter(
                  (id) => !(session.answers[id] ?? []).length,
                ),
              ),
            ),
          ]
        : historyFilter === 'unseen'
          ? questions.filter((q) => !seen.has(q.id)).map((q) => q.id)
          : undefined;
  const eligible = questions.filter(
    (q) =>
      (!chapter || q.chapter === Number(chapter)) &&
      (!topic || q.topic === topic) &&
      (!lo || q.lo === lo) &&
      (!level || q.level === level) &&
      (!filterIds || filterIds.includes(q.id)),
  );
  function start(mode: 'exam' | 'practice') {
    if (state.active) {
      setPage('session');
      return;
    }
    try {
      const selected =
        mode === 'exam'
          ? selectPracticeExam(questions, Date.now())
          : selectQuestions(
              questions,
              {
                chapter: chapter ? Number(chapter) : undefined,
                topic: topic || undefined,
                lo: lo || undefined,
                level: level || undefined,
                ids: filterIds,
              },
              count,
              Date.now(),
            );
      const session = createSession(
        selected,
        mode,
        mode === 'exam' ? minutes : 0,
      );
      const viewedId = session.questionIds[session.index];
      const updated = {
        ...session,
        visitedIds: [...new Set([...session.visitedIds, viewedId])],
      };
      setState((previous) => ({ ...previous, active: updated }));

      setError('');
      setPage('session');
    } catch (error) {
      setError(
        error instanceof BlueprintSelectionError
          ? t(
              `Não foi possível criar uma simulação alinhada${error.groupId ? `: falta cobertura elegível no grupo ${error.groupId}` : ': o banco é inválido ou incompatível'}. Verifique as questões e a revisão editorial deste grupo. Pode continuar a usar a prática por tópico.`,
              `Could not build a blueprint-aligned simulation. ${error.message} Check the pool and editorial review. Topic practice remains available.`,
            )
          : t(
              'Não existem questões suficientes para esta seleção. Reduza a quantidade ou altere os filtros.',
              'There are not enough questions for this selection. Reduce the count or change filters.',
            ),
      );
    }
  }
  function updateSession(session: Session) {
    const viewedId = session.questionIds[session.index];
    const updated = {
      ...session,
      visitedIds: [...new Set([...session.visitedIds, viewedId])],
    };
    setState((previous) => ({ ...previous, active: updated }));
  }
  const active = state.active;
  const checked = active?.feedbackIds ?? [];
  const displayedSession =
    page === 'session' ? active : page === 'result' ? viewed : null;
  const unansweredCount = active
    ? active.questionIds.filter((id) => !active.answers[id]?.length).length
    : 0;
  const current = active
    ? sessionQuestions(active, questions).find(
        (q) => q.id === active.questionIds[active.index],
      )
    : undefined;
  const totalCorrect = state.history.reduce(
    (sum, session) => sum + score(session, questions).correct,
    0,
  );
  const totalAnswered = state.history.reduce(
    (sum, session) =>
      sum + session.questionIds.length - score(session, questions).unanswered,
    0,
  );
  const weakness = chapters
    .map((name, index) => {
      const attempts = state.history.flatMap((session) =>
        session.questionIds
          .filter(
            (id) =>
              sessionQuestions(session, questions).find((q) => q.id === id)
                ?.chapter ===
              index + 1,
          )
          .map((id) => ({
            q: sessionQuestions(session, questions).find((q) => q.id === id)!,
            ids: session.answers[id] ?? [],
          })),
      );
      return {
        name,
        index,
        attempts: attempts.length,
        correct: attempts.filter((item) => isCorrect(item.q, item.ids)).length,
      };
    })
    .filter((item) => item.attempts)
    .sort((a, b) => a.correct / a.attempts - b.correct / b.attempts);
  const title =
    page in publicTitles
      ? publicTitles[page as InformationPage][language === 'en' ? 'en' : 'pt']
      : page === 'dashboard'
        ? t('O seu espaço de aprendizagem', 'Your learning workspace')
        : page === 'practice'
          ? t('Praticar com intenção', 'Practice with purpose')
          : page === 'history'
            ? t('O seu percurso', 'Your learning history')
            : page === 'english'
              ? t('Inglês para trabalhar em QA', 'English for working in QA')
              : page === 'result'
                ? t('Resultados e revisão', 'Results and review')
                : t('Uma questão de cada vez', 'One question at a time');
  function feedback(q: (typeof questions)[number], ids: string[]) {
    return (
      <section
        className="feedback"
        aria-label={
          page === 'result'
            ? t(
                `Explicação da questão ${(viewed?.questionIds.indexOf(q.id) ?? -1) + 1}`,
                `Explanation for question ${(viewed?.questionIds.indexOf(q.id) ?? -1) + 1}`,
              )
            : t('Explicação', 'Explanation')
        }
      >
        <strong>
          {isCorrect(q, ids)
            ? t('Resposta correta', 'Correct answer')
            : t('Reveja este conceito', 'Review this concept')}
        </strong>
        <p>
          <Text value={q.explanation} language={language} />
        </p>
        <ul>
          {q.options.map((option) => (
            <li key={option.id}>
              <strong>
                {q.correct.includes(option.id) ? '✓ ' : ''}
                <Text value={option.text} language={language} />
              </strong>
              <p>
                <Text value={option.explanation} language={language} />
              </p>
            </li>
          ))}
        </ul>
        <small>
          {q.lo} · {q.level} · {topicLabel(q.topic, language)}
        </small>
      </section>
    );
  }
  if (storageConflict)
    return (
      <main>
        <h1>TestLearn — Public Beta</h1>
        <div role="alert">
          <p>
            {t(
              'O progresso foi alterado noutro separador. Esta página parou de guardar para preservar esses dados. Alterações ainda não guardadas nesta página não serão recuperadas ao recarregar. Use apenas um separador.',
              'Progress changed in another tab. This page stopped saving to preserve that data. Unsaved changes on this page will not be recovered after reloading. Use one tab at a time.',
            )}
          </p>
          <button onClick={() => window.location.reload()}>
            {t('Recarregar o progresso guardado', 'Reload saved progress')}
          </button>
        </div>
      </main>
    );
  return (
    <div className="app">
      <a className="skip" href="#main">
        {t('Saltar para o conteúdo', 'Skip to content')}
      </a>
      <header className="header">
        <a
          className="brand"
          href="#"
          onClick={(event) => {
            event.preventDefault();
            setPage('dashboard');
          }}
        >
          <span className="brand-icon" aria-hidden="true">
            T<span>✓</span>
          </span>
          TestLearn
          <span className="beta-badge">Public Beta</span>
          <span className="brand-caption">LEARN. PRACTICE. IMPROVE.</span>
        </a>
        <label className="language">
          {t('Idioma', 'Language')}
          <select
            aria-label={t('Idioma', 'Language')}
            value={language}
            onChange={(event) => setLanguage(event.target.value as Language)}
          >
            <option value="pt">Português</option>
            <option value="en">English</option>
            <option value="both">EN + PT</option>
          </select>
        </label>
      </header>
      <div className="layout">
        <nav
          className="sidebar"
          aria-label={t('Navegação principal', 'Main navigation')}
        >
          <span className="nav-label">CTFL 4.0.1</span>
          {(['dashboard', 'practice', 'history', 'english'] as const).map(
            (item, index) => (
              <button
                key={item}
                className={page === item ? 'nav-item active' : 'nav-item'}
                aria-current={page === item ? 'page' : undefined}
                onClick={() => setPage(item)}
              >
                <span aria-hidden="true">{['◫', '↗', '◷', 'Aa'][index]}</span>
                {
                  [
                    t('Visão geral', 'Overview'),
                    t('Praticar', 'Practice'),
                    t('Progresso', 'Progress'),
                    t('Inglês para QA', 'English for QA'),
                  ][index]
                }
              </button>
            ),
          )}
          <div className="sidebar-note">
            <strong>
              {t('O conhecimento constrói-se.', 'Knowledge takes practice.')}
            </strong>
            <p>
              {t(
                'Reserve alguns minutos. Aprenda um conceito. Volte amanhã.',
                'Take a few minutes. Learn one concept. Come back tomorrow.',
              )}
            </p>
          </div>
          <small>
            {t(
              'Gratuito · Sem conta · Dados locais',
              'Free · No account · Local data',
            )}
          </small>
        </nav>
        <main id="main">
          <div className="page-heading">
            <p className="eyebrow">
              {t('APRENDER, UM PASSO DE CADA VEZ', 'LEARN, ONE STEP AT A TIME')}
            </p>
            <h1 tabIndex={-1} ref={heading}>
              {title}
            </h1>
          </div>
          {warning && (
            <p role="alert" className="notice">
              {warning.startsWith('Saved data')
                ? t(
                    'Os dados guardados estão corrompidos, incompatíveis ou indisponíveis. Os dados originais foram preservados. Uma nova sessão irá substituí-los.',
                    'Saved data is corrupted, incompatible or unavailable. The original data was preserved. Starting a new session will replace it.',
                  )
                : warning}
            </p>
          )}
          <p className="draft-note">
            {t(
              'Material independente e provisório. Questões e traduções revistas por IA; aprovação humana pendente. Sem calibração psicométrica. Não é um exame oficial nem uma previsão de certificação.',
              'Independent provisional material. Questions and translations reviewed by AI; human approval pending. No psychometric calibration. This is not an official examination or a certification prediction.',
            )}
          </p>
          {displayedSession &&
            displayedSession.contentRevision !== CONTENT_REVISION && (
              <p role="status" className="notice">
                {t(
                  displayedSession.contentRevision === LEGACY_CONTENT_REVISION
                    ? 'Esta tentativa usa o banco anterior à auditoria, que contém problemas conhecidos. O texto e a classificação originais foram preservados; consulte a auditoria académica na documentação.'
                    : displayedSession.contentRevision ===
                        BLUEPRINT_CONTENT_REVISION
                      ? 'Esta tentativa usa o banco anterior à cobertura completa do syllabus. O conteúdo e a classificação originais foram preservados; as simulações desta revisão mantêm o alinhamento estrutural verificado.'
                      : displayedSession.contentRevision ===
                          COVERAGE_CONTENT_REVISION
                        ? 'Esta tentativa usa o banco anterior às correções bilingues da revisão .5. O texto e a classificação originais foram preservados; as simulações desta revisão mantêm o alinhamento estrutural verificado.'
                        : displayedSession.contentRevision ===
                            BILINGUAL_CONTENT_REVISION
                          ? 'Esta tentativa usa o banco de 66 perguntas anterior à expansão de variedade. O conteúdo e a classificação originais foram preservados; o alinhamento estrutural mantém-se.'
                          : displayedSession.contentRevision ===
                              VARIABILITY_CONTENT_REVISION
                            ? 'Esta tentativa usa a revisão .6, anterior à revisão de distratores. O texto, as alternativas e a classificação originais foram preservados; o alinhamento estrutural mantém-se.'
                            : displayedSession.contentRevision ===
                                QUALITY_CONTENT_REVISION
                              ? 'Esta tentativa usa a revisão .7, anterior às correções terminológicas. O texto e a classificação originais foram preservados; o alinhamento estrutural mantém-se.'
                              : displayedSession.contentRevision ===
                                  TERMINOLOGY_CONTENT_REVISION
                                ? 'Esta tentativa usa o banco de 82 perguntas da revisão .8, anterior à expansão avançada. O texto, as alternativas e a classificação originais foram preservados; o alinhamento estrutural mantém-se.'
                                : 'Esta tentativa usa a revisão anterior ao gerador alinhado ao blueprint. O conteúdo, a distribuição e a classificação originais foram preservados; não se aplica a indicação de estrutura alinhada.',
                  displayedSession.contentRevision === LEGACY_CONTENT_REVISION
                    ? 'This attempt uses the pre-audit bank, which contains known issues. Its original text and scoring were preserved; see the academic audit in the documentation.'
                    : displayedSession.contentRevision ===
                        BLUEPRINT_CONTENT_REVISION
                      ? 'This attempt uses the bank before full syllabus coverage. Its original content and scoring were preserved; simulations from this revision retain verified structural alignment.'
                      : displayedSession.contentRevision ===
                          COVERAGE_CONTENT_REVISION
                        ? 'This attempt uses the bank before the bilingual corrections in revision .5. Its original text and scoring were preserved; simulations from this revision retain verified structural alignment.'
                        : displayedSession.contentRevision ===
                            BILINGUAL_CONTENT_REVISION
                          ? 'This attempt uses the 66-question bank before the variability expansion. Its original content and scoring were preserved; structural alignment remains valid.'
                          : displayedSession.contentRevision ===
                              VARIABILITY_CONTENT_REVISION
                            ? 'This attempt uses revision .6, before the distractor review. Its original text, options and scoring were preserved; structural alignment remains valid.'
                            : displayedSession.contentRevision ===
                                QUALITY_CONTENT_REVISION
                              ? 'This attempt uses revision .7, before the terminology corrections. Its original text and scoring were preserved; structural alignment remains valid.'
                              : displayedSession.contentRevision ===
                                  TERMINOLOGY_CONTENT_REVISION
                                ? 'This attempt uses the 82-question bank from revision .8, before the advanced expansion. Its original text, options and scoring were preserved; structural alignment remains valid.'
                                : 'This attempt uses the revision before blueprint-aligned generation. Its original content, distribution and scoring were preserved; it is not labelled structurally aligned.',
                )}
              </p>
            )}
          {error && (
            <p role="alert" className="notice">
              {error}
            </p>
          )}
          {page === 'dashboard' && (
            <>
              <section className="welcome">
                <div>
                  <span className="section-number">
                    01 / {t('COMEÇAR', 'GET STARTED')}
                  </span>
                  <h2>
                    {state.history.length
                      ? t(
                          'Continue a construir confiança.',
                          'Keep building confidence.',
                        )
                      : t(
                          'O próximo passo começa aqui.',
                          'Your next step starts here.',
                        )}
                  </h2>
                  <p>
                    {t(
                      'Compreenda os fundamentos dos testes de software, pratique ao seu ritmo e aprenda com cada resposta.',
                      'Understand the fundamentals of software testing, practise at your own pace and learn from every answer.',
                    )}
                  </p>
                  <button
                    className="primary"
                    onClick={() =>
                      state.active ? setPage('session') : setPage('practice')
                    }
                  >
                    {state.active
                      ? t('Retomar sessão', 'Resume session')
                      : t('Começar a praticar', 'Start practising')}{' '}
                    <span aria-hidden="true">→</span>
                  </button>
                </div>
                <aside>
                  <strong>
                    CTFL <span>4.0</span>
                  </strong>
                  <p>
                    {questions.length}{' '}
                    {t('questões originais', 'original questions')}
                    <br />
                    {t('6 capítulos · PT + EN', '6 chapters · PT + EN')}
                  </p>
                </aside>
              </section>
              <section
                className="stats"
                aria-label={t(
                  'Estatísticas de aprendizagem',
                  'Learning statistics',
                )}
              >
                <article>
                  <span>{t('Sessões concluídas', 'Completed sessions')}</span>
                  <strong>{state.history.length}</strong>
                </article>
                <article>
                  <span>
                    {t('Questões distintas vistas', 'Distinct questions seen')}
                  </span>
                  <strong>
                    {seen.size}
                    <small> / {questions.length}</small>
                  </strong>
                </article>
                <article>
                  <span>
                    {t('Respostas certas / respondidas', 'Correct / answered')}
                  </span>
                  <strong>
                    {totalCorrect}
                    <small> / {totalAnswered}</small>
                  </strong>
                </article>
              </section>
              <div className="section-heading">
                <h2>{t('Explore o programa', 'Explore the syllabus')}</h2>
                <span>
                  {t(
                    'Seis capítulos. Uma base sólida.',
                    'Six chapters. One solid foundation.',
                  )}
                </span>
              </div>
              <section className="chapters">
                {chapters.map((name, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setChapter(String(index + 1));
                      setTopic('');
                      setLo('');
                      setPage('practice');
                    }}
                  >
                    <span className="chapter-number">0{index + 1}</span>
                    <span>
                      <strong>{label(language, name.pt, name.en)}</strong>
                      <small>
                        {
                          questions.filter((q) => q.chapter === index + 1)
                            .length
                        }{' '}
                        {t('questões', 'questions')}
                      </small>
                    </span>
                    <span aria-hidden="true">↗</span>
                  </button>
                ))}
              </section>
              <section className="exam-setup">
                <div>
                  <h2>
                    {t(
                      'Simulação alinhada ao blueprint',
                      'Blueprint-aligned practice simulation',
                    )}
                  </h2>
                  <p>
                    {t(
                      '40 questões · 26 pontos para aprovação · quotas por capítulo, K-level e grupo de LO verificadas na tabela v1.19.',
                      '40 questions · 26 points to pass · chapter, K-level and LO-group quotas verified against table v1.19.',
                    )}
                  </p>
                  <p>
                    {t(
                      'Simulação independente: alinhamento estrutural não significa exame oficial, dificuldade equivalente ou aprovação humana do conteúdo.',
                      'Independent simulation: structural alignment does not mean an official examination, equivalent difficulty or human-approved content.',
                    )}
                  </p>
                  <p>
                    {t(
                      'A opção de 75 minutos permite praticar com tempo adicional; a elegibilidade oficial é decidida pelo fornecedor do exame.',
                      'The 75-minute option lets you practise with extra time; official eligibility is determined by the exam provider.',
                    )}
                  </p>
                  {questions.length < 40 && (
                    <p className="notice">
                      {t(
                        `Indisponível: existem ${questions.length} questões; são necessárias 40 distintas. Use o modo de prática.`,
                        `Unavailable: ${questions.length} questions available; 40 distinct questions required. Use practice mode.`,
                      )}
                    </p>
                  )}
                </div>
                <div>
                  <label>
                    {t('Duração', 'Duration')}
                    <select
                      aria-label={t('Duração', 'Duration')}
                      value={minutes}
                      onChange={(event) =>
                        setMinutes(Number(event.target.value))
                      }
                    >
                      <option value={60}>60 min</option>
                      <option value={75}>75 min</option>
                    </select>
                  </label>
                  <button
                    className="primary"
                    disabled={questions.length < 40}
                    onClick={() => start('exam')}
                  >
                    {t('Iniciar simulação', 'Start simulation')}
                  </button>
                </div>
              </section>
            </>
          )}
          {page === 'practice' && (
            <section className="panel">
              <h2>{t('Escolha o seu foco', 'Choose your focus')}</h2>
              <p>
                {t(
                  'Prática por tópico: sem quotas de exame. Não constitui uma simulação alinhada ao blueprint.',
                  'Topic practice has no examination quotas. It is not a blueprint-aligned simulation.',
                )}
              </p>
              <p>
                {t(
                  'Receba uma explicação após confirmar cada resposta.',
                  'Get an explanation after checking each answer.',
                )}
              </p>
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  start('practice');
                }}
              >
                <div className="filter-grid">
                  <label>
                    {t('Capítulo', 'Chapter')}
                    <select
                      aria-label={t('Capítulo', 'Chapter')}
                      value={chapter}
                      onChange={(event) => {
                        setChapter(event.target.value);
                        setTopic('');
                        setLo('');
                      }}
                    >
                      <option value="">{t('Todos', 'All')}</option>
                      {chapters.map((name, index) => (
                        <option key={index} value={index + 1}>
                          {index + 1}. {label(language, name.pt, name.en)}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label>
                    {t('Tópico', 'Topic')}
                    <select
                      aria-label={t('Tópico', 'Topic')}
                      value={topic}
                      onChange={(event) => setTopic(event.target.value)}
                    >
                      <option value="">{t('Todos', 'All')}</option>
                      {[
                        ...new Set(
                          questions
                            .filter(
                              (q) => !chapter || q.chapter === Number(chapter),
                            )
                            .map((q) => q.topic),
                        ),
                      ].map((item) => (
                        <option key={item} value={item}>
                          {topicLabel(item, language)}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label>
                    {t('Objetivo de aprendizagem', 'Learning objective')}
                    <select
                      aria-label={t(
                        'Objetivo de aprendizagem',
                        'Learning objective',
                      )}
                      value={lo}
                      onChange={(event) => setLo(event.target.value)}
                    >
                      <option value="">{t('Todos', 'All')}</option>
                      {[
                        ...new Set(
                          questions
                            .filter(
                              (q) => !chapter || q.chapter === Number(chapter),
                            )
                            .map((q) => q.lo),
                        ),
                      ].map((item) => (
                        <option key={item}>{item}</option>
                      ))}
                    </select>
                  </label>
                  <label>
                    {t('Nível cognitivo', 'Cognitive level')}
                    <select
                      aria-label={t('Nível cognitivo', 'Cognitive level')}
                      value={level}
                      onChange={(event) => setLevel(event.target.value)}
                    >
                      <option value="">{t('Todos', 'All')}</option>
                      {['K1', 'K2', 'K3'].map((item) => (
                        <option key={item}>{item}</option>
                      ))}
                    </select>
                  </label>
                  <label>
                    {t('Histórico das questões', 'Question history')}
                    <select
                      aria-label={t(
                        'Histórico das questões',
                        'Question history',
                      )}
                      value={historyFilter}
                      onChange={(event) => setHistoryFilter(event.target.value)}
                    >
                      <option value="all">{t('Todas', 'All')}</option>
                      <option value="incorrect">
                        {t(
                          'Anteriormente erradas ou sem resposta',
                          'Previously incorrect or unanswered',
                        )}
                      </option>
                      <option value="unseen">
                        {t('Nunca vistas', 'Never seen')}
                      </option>
                      <option value="unanswered">
                        {t(
                          'Anteriormente sem resposta',
                          'Previously unanswered',
                        )}
                      </option>
                    </select>
                  </label>
                  <label>
                    {t('Número de questões', 'Number of questions')}
                    <input
                      aria-label={t(
                        'Número de questões',
                        'Number of questions',
                      )}
                      type="number"
                      min="1"
                      max={questions.length || 1}
                      value={count}
                      onChange={(event) => setCount(Number(event.target.value))}
                      required
                    />
                  </label>
                </div>
                <p aria-live="polite">
                  {eligible.length}{' '}
                  {t(
                    'questões disponíveis com estes filtros.',
                    'questions available with these filters.',
                  )}
                </p>
                <button
                  className="primary"
                  disabled={
                    !Number.isInteger(count) ||
                    count < 1 ||
                    count > eligible.length
                  }
                >
                  {active
                    ? t('Retomar sessão em curso', 'Resume active session')
                    : t('Iniciar prática', 'Start practice')}
                </button>
              </form>
            </section>
          )}
          {page === 'session' && active && current && (
            <>
              <div className="session-bar">
                <span>
                  {active.mode === 'exam'
                    ? isBlueprintRevision(active.contentRevision)
                      ? t(
                          'Simulação alinhada ao blueprint',
                          'Blueprint-aligned simulation',
                        )
                      : t(
                          'Simulação anterior, sem alinhamento verificado',
                          'Earlier simulation, alignment not verified',
                        )
                    : t('Prática orientada', 'Guided practice')}
                </span>
                <strong
                  role="timer"
                  aria-live="off"
                  aria-label={t('Tempo restante', 'Time remaining')}
                >
                  {active.deadline
                    ? `${Math.floor(Math.max(0, remaining(active, now)) / 60000)
                        .toString()
                        .padStart(2, '0')}:${Math.floor(
                        (Math.max(0, remaining(active, now)) / 1000) % 60,
                      )
                        .toString()
                        .padStart(2, '0')}`
                    : t('Sem limite de tempo', 'Untimed')}
                </strong>
              </div>
              {active.deadline &&
                remaining(active, now) > 0 &&
                remaining(active, now) <= 300000 && (
                  <p role="status" className="notice">
                    {remaining(active, now) <= 60000
                      ? t(
                          'Resta um minuto ou menos. O exame termina automaticamente no prazo.',
                          'One minute or less remains. The exam finishes automatically at the deadline.',
                        )
                      : t(
                          'Restam cinco minutos ou menos.',
                          'Five minutes or less remain.',
                        )}
                  </p>
                )}
              <div className="exam-layout">
                <section className="question panel">
                  <div className="question-meta">
                    <span>
                      {t('Questão', 'Question')} {active.index + 1} /{' '}
                      {active.questionIds.length}
                    </span>
                    <span>
                      {current.lo} · {current.level}
                    </span>
                  </div>
                  <h2>
                    <Text value={current.text} language={language} />
                  </h2>
                  <QuestionTable
                    questionId={current.id}
                    table={current.table}
                    language={language}
                  />
                  <fieldset
                    className="options"
                    disabled={checked.includes(current.id)}
                  >
                    <legend>
                      {t(
                        `Selecione ${current.required} ${current.required === 1 ? 'resposta' : 'respostas'}.`,
                        `Select ${current.required} ${current.required === 1 ? 'answer' : 'answers'}.`,
                      )}
                    </legend>
                    {(
                      active.optionOrder[current.id] ??
                      current.options.map((option) => option.id)
                    ).map((id) => {
                      const option = current.options.find(
                        (item) => item.id === id,
                      )!;
                      const selected = (
                        active.answers[current.id] ?? []
                      ).includes(id);
                      return (
                        <label
                          className={selected ? 'option selected' : 'option'}
                          key={id}
                        >
                          <input
                            type={current.required === 1 ? 'radio' : 'checkbox'}
                            name={current.id}
                            checked={selected}
                            disabled={
                              !selected &&
                              current.required > 1 &&
                              (active.answers[current.id] ?? []).length >=
                                current.required
                            }
                            onChange={() => {
                              const old = active.answers[current.id] ?? [];
                              const ids =
                                current.required === 1
                                  ? [id]
                                  : selected
                                    ? old.filter((item) => item !== id)
                                    : [...old, id];
                              updateSession(answer(active, current.id, ids));
                            }}
                          />
                          <span>
                            <Text value={option.text} language={language} />
                          </span>
                        </label>
                      );
                    })}
                  </fieldset>
                  {active.mode === 'practice' &&
                    !checked.includes(current.id) && (
                      <button
                        className="primary"
                        disabled={
                          (active.answers[current.id] ?? []).length !==
                          current.required
                        }
                        onClick={() =>
                          updateSession({
                            ...active,
                            feedbackIds: [...checked, current.id],
                          })
                        }
                      >
                        {t('Confirmar resposta', 'Check answer')}
                      </button>
                    )}
                  {active.mode === 'practice' &&
                    checked.includes(current.id) &&
                    feedback(current, active.answers[current.id] ?? [])}
                  <div className="question-actions">
                    <button
                      onClick={() =>
                        updateSession({
                          ...active,
                          flagged: active.flagged.includes(current.id)
                            ? active.flagged.filter((id) => id !== current.id)
                            : [...active.flagged, current.id],
                        })
                      }
                      aria-pressed={active.flagged.includes(current.id)}
                    >
                      {active.flagged.includes(current.id)
                        ? t('Retirar marcação', 'Remove flag')
                        : t('Marcar para rever', 'Flag for review')}
                    </button>
                    <div>
                      <button
                        disabled={active.index === 0}
                        onClick={() =>
                          updateSession({
                            ...recordTime(active),
                            index: active.index - 1,
                          })
                        }
                      >
                        {t('Anterior', 'Previous')}
                      </button>
                      <button
                        disabled={
                          active.index === active.questionIds.length - 1
                        }
                        onClick={() =>
                          updateSession({
                            ...recordTime(active),
                            index: active.index + 1,
                          })
                        }
                      >
                        {t('Seguinte', 'Next')}
                      </button>
                    </div>
                  </div>
                </section>
                <aside className="navigator panel">
                  <h2>{t('Navegador', 'Navigator')}</h2>
                  <div className="question-grid">
                    {active.questionIds.map((id, index) => (
                      <button
                        key={id}
                        aria-label={`${t('Questão', 'Question')} ${index + 1}${(active.answers[id] ?? []).length ? t(', respondida', ', answered') : t(', sem resposta', ', unanswered')}${active.flagged.includes(id) ? t(', marcada', ', flagged') : ''}`}
                        aria-current={
                          index === active.index ? 'step' : undefined
                        }
                        className={`${(active.answers[id] ?? []).length ? 'answered' : ''} ${active.flagged.includes(id) ? 'flagged' : ''}`}
                        onClick={() =>
                          updateSession({ ...recordTime(active), index })
                        }
                      >
                        {index + 1}
                        {active.flagged.includes(id) && (
                          <span aria-hidden="true">*</span>
                        )}
                      </button>
                    ))}
                  </div>
                  <p className="legend">
                    {t(
                      'Verde: respondida · *: marcada · contorno: atual',
                      'Green: answered · *: flagged · outline: current',
                    )}
                  </p>
                  <p>
                    {
                      active.questionIds.filter(
                        (id) => (active.answers[id] ?? []).length,
                      ).length
                    }{' '}
                    / {active.questionIds.length} {t('respondidas', 'answered')}
                  </p>
                  <button
                    className="primary"
                    onClick={() => setConfirmSubmit(true)}
                  >
                    {t('Terminar sessão', 'Finish session')}
                  </button>
                  <small>
                    {t(
                      'A sessão é guardada neste dispositivo. Pode voltar mais tarde.',
                      'Your session is saved on this device. You can come back later.',
                    )}
                  </small>
                </aside>
              </div>
            </>
          )}
          {page === 'result' && viewed && (
            <>
              <section className="result-banner">
                <div>
                  <p>{t('SESSÃO CONCLUÍDA', 'SESSION COMPLETED')}</p>
                  <h2>
                    {score(viewed, questions).correct}{' '}
                    <span>/ {viewed.questionIds.length}</span>
                  </h2>
                  <p>
                    {score(viewed, questions).unanswered}{' '}
                    {t('sem resposta', 'unanswered')} ·{' '}
                    {Math.round(
                      ((viewed.completedAt ?? viewed.startedAt) -
                        viewed.startedAt) /
                        60000,
                    )}{' '}
                    min
                  </p>
                  {viewed.mode === 'exam' && (
                    <strong>
                      {score(viewed, questions).passed
                        ? t(
                            'Limiar de prática atingido',
                            'Practice threshold reached',
                          )
                        : t(
                            'Limiar de prática não atingido',
                            'Practice threshold not reached',
                          )}
                    </strong>
                  )}
                </div>
                <div>
                  <p>
                    {t(
                      'Cada erro mostra onde pode aprender.',
                      'Every mistake shows where you can learn.',
                    )}
                  </p>
                  <button
                    className="primary"
                    onClick={() => {
                      setPage('practice');
                      setViewed(null);
                    }}
                  >
                    {t('Nova prática', 'New practice')}
                  </button>
                </div>
              </section>
              <div className="section-heading">
                <h2>{t('Rever respostas', 'Review answers')}</h2>
                <label>
                  {t('Mostrar', 'Show')}
                  <select
                    aria-label={t('Mostrar', 'Show')}
                    value={reviewFilter}
                    onChange={(event) => setReviewFilter(event.target.value)}
                  >
                    <option value="all">{t('Todas', 'All')}</option>
                    <option value="incorrect">
                      {t('Erradas e sem resposta', 'Incorrect and unanswered')}
                    </option>
                    <option value="unanswered">
                      {t('Sem resposta', 'Unanswered')}
                    </option>
                  </select>
                </label>
              </div>
              {viewed.questionIds
                .map((id) =>
                  sessionQuestions(viewed, questions).find((q) => q.id === id),
                )
                .filter((q) => q !== undefined)
                .filter(
                  (q) =>
                    reviewFilter === 'all' ||
                    (reviewFilter === 'unanswered'
                      ? !(viewed.answers[q.id] ?? []).length
                      : !isCorrect(q, viewed.answers[q.id] ?? [])),
                )
                .map((q) => (
                  <article className="panel review-question" key={q.id}>
                    <p className="eyebrow">
                      {q.lo} · {q.level}
                    </p>
                    <h3>
                      <Text value={q.text} language={language} />
                    </h3>
                    <QuestionTable
                      questionId={q.id}
                      table={q.table}
                      language={language}
                    />
                    <p>
                      <strong>{t('A sua resposta: ', 'Your answer: ')}</strong>
                      {(viewed.answers[q.id] ?? []).length
                        ? (viewed.answers[q.id] ?? []).map((id) => {
                            const option = q.options.find(
                              (item) => item.id === id,
                            );
                            return (
                              option && (
                                <span key={id} className="chosen">
                                  <Text
                                    value={option.text}
                                    language={language}
                                  />
                                </span>
                              )
                            );
                          })
                        : t('Sem resposta', 'Unanswered')}
                    </p>
                    {feedback(q, viewed.answers[q.id] ?? [])}
                  </article>
                ))}
            </>
          )}
          {page === 'history' && (
            <>
              <section className="panel">
                <h2>
                  {t('O que o seu percurso mostra', 'What your history shows')}
                </h2>
                {!state.history.length ? (
                  <p>
                    {t(
                      'Ainda não concluiu nenhuma sessão. Comece pela prática para criar o seu primeiro registo.',
                      'You have not completed a session yet. Start practising to create your first record.',
                    )}
                  </p>
                ) : (
                  <>
                    <p>
                      {seen.size}{' '}
                      {t(
                        'questões distintas vistas. Os resultados de questões repetidas não equivalem ao desempenho em questões novas.',
                        'distinct questions seen. Results on repeated questions are not equivalent to performance on new questions.',
                      )}
                    </p>
                    {weakness[0] && (
                      <p>
                        <strong>
                          {t('Sugestão de estudo: ', 'Suggested focus: ')}
                        </strong>
                        {label(
                          language,
                          weakness[0].name.pt,
                          weakness[0].name.en,
                        )}
                      </p>
                    )}
                    <ul className="history-list">
                      {[...state.history].reverse().map((session) => (
                        <li key={session.id}>
                          <div>
                            <strong>
                              {new Date(
                                session.completedAt ?? session.startedAt,
                              ).toLocaleString(
                                language === 'en' ? 'en-GB' : 'pt-PT',
                              )}
                            </strong>
                            <p>
                              {score(session, questions).correct}/
                              {session.questionIds.length} ·{' '}
                              {session.mode === 'exam'
                                ? isBlueprintRevision(session.contentRevision)
                                  ? t(
                                      'Simulação alinhada',
                                      'Aligned simulation',
                                    )
                                  : t(
                                      'Simulação anterior',
                                      'Earlier simulation',
                                    )
                                : t('Prática', 'Practice')}{' '}
                              ·{' '}
                              {repeatedViewed(
                                session,
                                state.history.slice(
                                  0,
                                  state.history.indexOf(session),
                                ),
                              )}{' '}
                              {t('repetidas', 'repeated')}
                            </p>
                          </div>
                          <button
                            onClick={() => {
                              setViewed(session);
                              setReviewFilter('all');
                              setPage('result');
                            }}
                          >
                            {t('Rever', 'Review')}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </section>
              <section className="panel reset">
                <h2>
                  {t(
                    'Os seus dados, no seu dispositivo',
                    'Your data, on your device',
                  )}
                </h2>
                <p>
                  {t(
                    'O progresso fica apenas no navegador. Limpar os dados do navegador elimina os registos.',
                    'Progress stays in this browser. Clearing browser data removes your records.',
                  )}
                </p>
                <button onClick={() => setConfirmReset(true)}>
                  {t('Apagar progresso', 'Reset progress')}
                </button>
              </section>
            </>
          )}
          {page in publicTitles && (
            <PublicInformation
              page={page as InformationPage}
              language={language}
            />
          )}
          {page === 'english' && <EnglishLearning language={language} />}
        </main>
      </div>
      <footer>
        <nav
          className="public-links"
          aria-label={t('Informação pública', 'Public information')}
        >
          {(Object.keys(publicTitles) as InformationPage[]).map((item) => (
            <button
              key={item}
              onClick={() => setPage(item)}
              aria-current={page === item ? 'page' : undefined}
            >
              {publicTitles[item][language === 'en' ? 'en' : 'pt']}
            </button>
          ))}
        </nav>
        TestLearn ·{' '}
        {t(
          'Aprendizagem independente. Sem afiliação ou aprovação do ISTQB®.',
          'Independent learning. No ISTQB® affiliation or endorsement.',
        )}{' '}
        <a
          href="https://istqb.org/certifications/certified-tester-foundation-level-ctfl-v4-0/"
          target="_blank"
          rel="noreferrer"
        >
          {t('Referência oficial', 'Official reference')} ↗
        </a>
      </footer>
      {confirmSubmit && active && (
        <div className="dialog-backdrop">
          <section
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="submit-title"
            className="dialog"
          >
            <h2 id="submit-title">
              {t('Terminar esta sessão?', 'Finish this session?')}
            </h2>
            <p>
              {t(
                `${unansweredCount} ${unansweredCount === 1 ? 'questão sem resposta' : 'questões sem resposta'}. Depois de terminar, as respostas não podem ser alteradas.`,
                `${unansweredCount} unanswered ${unansweredCount === 1 ? 'question' : 'questions'}. Answers cannot be changed after finishing.`,
              )}
            </p>
            <div className="actions">
              <button onClick={() => setConfirmSubmit(false)}>
                {t('Continuar a responder', 'Continue answering')}
              </button>
              <button className="primary" onClick={() => complete(active)}>
                {t('Confirmar e terminar', 'Confirm and finish')}
              </button>
            </div>
          </section>
        </div>
      )}
      {confirmReset && (
        <div className="dialog-backdrop">
          <section
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="reset-title"
            className="dialog"
          >
            <h2 id="reset-title">
              {t('Apagar todo o progresso?', 'Reset all progress?')}
            </h2>
            <p>
              {t(
                'O histórico e qualquer sessão em curso serão eliminados deste navegador. Esta ação não pode ser anulada.',
                'History and any active session will be removed from this browser. This cannot be undone.',
              )}
            </p>
            <div className="actions">
              <button onClick={() => setConfirmReset(false)}>
                {t('Cancelar', 'Cancel')}
              </button>
              <button
                className="primary"
                onClick={() => {
                  setState(emptyState());
                  setViewed(null);
                  setConfirmReset(false);
                  setPage('dashboard');
                }}
              >
                {t('Confirmar eliminação', 'Confirm reset')}
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
