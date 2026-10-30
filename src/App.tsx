import Text from './learning/Text';
import QuestionTable from './learning/QuestionTable';
import AnswerReview from './learning/AnswerReview';
import ResultReview from './learning/ResultReview';
import DashboardPaths from './learning/DashboardPaths';
import ChapterProgress from './learning/ChapterProgress';
import { learningProgress } from './domain/learning-progress';
import ProgressBackup from './learning/ProgressBackup';
import { ObjectiveHelp, CognitiveLevelHelp } from './learning/ObjectiveHelp';
import { objectivesById, cognitiveLevels } from './reference/objectives';
import {
  updatePracticeFilters,
  filterGroups,
  historyDescriptions,
} from './learning/filters';
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
import { distinctViewed } from './domain/progress';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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
} from './domain/engine';
import {
  emptyState,
  load,
  loadAsync,
  readStoredValue,
  createStateWriter,
  type State,
} from './storage/store';
import PublicInformation, {
  publicTitles,
  type InformationPage,
} from './PublicInformation';
import { BankNotReadyError } from './data/bank-history';
import { chapters, label, type Language } from './i18n';
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
  const stateRef = useRef(state);
  const [leaseReady, setLeaseReady] = useState(false);
  const [editRequest, setEditRequest] = useState<number | null>(0);
  const [saveStatus, setSaveStatus] = useState('pending');
  const [recoveryRequired, setRecoveryRequired] = useState(!!initial.warning);
  const canWrite = leaseReady && !recoveryRequired;
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

  const [confirmSubmit, setConfirmSubmit] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const [error, setError] = useState('');
  const heading = useRef<HTMLHeadingElement>(null);
  const t = (pt: string, en: string) => label(language, pt, en);
  useEffect(() => {
    document.documentElement.lang = language === 'en' ? 'en' : 'pt-PT';
  }, [language]);
  useEffect(() => {
    if (editRequest === null) return;
    let cancelled = false;
    const acquire = () => {
      setLeaseReady(false);
      setSaveStatus('pending');
      void writer.acquire().then((status) => {
        if (cancelled) return;
        setLeaseReady(status === 'saved');
        setSaveStatus(status === 'saved' ? 'ready' : status);
        if (status === 'conflict') setStorageConflict(true);
      });
    };
    const hide = () => {
      writer.release();
      setLeaseReady(false);
    };
    const show = (event: PageTransitionEvent) => {
      if (event.persisted) acquire();
    };
    acquire();
    window.addEventListener('pagehide', hide);
    window.addEventListener('pageshow', show);
    return () => {
      cancelled = true;
      writer.release();
      window.removeEventListener('pagehide', hide);
      window.removeEventListener('pageshow', show);
    };
  }, [writer, editRequest]);
  const commit = useCallback(
    (next: State, allowRecovery = false) => {
      if (!leaseReady || (recoveryRequired && !allowRecovery)) return false;
      const status = writer.save(next);
      if (status === 'conflict') {
        writer.release();
        setLeaseReady(false);
        setStorageConflict(true);
      }
      setSaveStatus(status === 'saved' ? 'saved' : 'failed');
      if (status !== 'saved') {
        setWarning('WRITE_FAILED');
        return false;
      }
      stateRef.current = next;
      setState(next);
      setWarning(null);
      setRecoveryRequired(false);
      return true;
    },
    [writer, leaseReady, recoveryRequired],
  );
  useEffect(() => {
    const check = (event: StorageEvent) => {
      if (
        (event.key === 'testlearn.v1' || event.key === null) &&
        !writer.isCurrent()
      ) {
        writer.release();
        setLeaseReady(false);
        setStorageConflict(true);
      }
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
  const complete = useCallback(
    (session: Session) => {
      const previous = stateRef.current;
      if (previous.active?.id !== session.id) return;
      const completed = finish(previous.active);
      if (
        !commit({
          ...previous,
          active: null,
          history: [...previous.history, completed],
        })
      )
        return;
      setViewed(completed);
      setPage('result');
      setConfirmSubmit(false);
    },
    [commit],
  );
  useEffect(() => {
    if (!state.active?.deadline) return;
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
  const filters = { chapter, topic, lo, level };
  const groups = filterGroups(questions, filters);
  function changeFilters(change: Partial<typeof filters>) {
    const next = updatePracticeFilters(filters, change, questions);
    setChapter(next.chapter);
    setTopic(next.topic);
    setLo(next.lo);
    setLevel(next.level);
  }
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
      return true;
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
      if (!commit({ ...stateRef.current, active: updated })) return false;

      setError('');
      setNow(Date.now());
      setPage('session');
      return true;
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
      return false;
    }
  }
  function updateSession(session: Session) {
    const viewedId = session.questionIds[session.index];
    const updated = {
      ...session,
      visitedIds: [...new Set([...session.visitedIds, viewedId])],
    };
    commit({ ...stateRef.current, active: updated });
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
  const progress = useMemo(
    () => learningProgress(state.history, questions),
    [state.history],
  );
  const totalCorrect = progress.correct,
    totalAnswered = progress.answered;
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
              ? t(
                  'Inglês para QA — Vocabulário e entrevistas',
                  'English for QA — Vocabulary and interviews',
                )
              : page === 'result'
                ? t('Resultados e revisão', 'Results and review')
                : t('Uma questão de cada vez', 'One question at a time');
  function feedback(q: (typeof questions)[number], ids: string[]) {
    return (
      <AnswerReview
        question={q}
        selected={ids}
        order={active!.optionOrder[q.id]}
        language={language}
        name={t('Explicação', 'Explanation')}
      />
    );
  }
  if (storageConflict)
    return (
      <main>
        <h1>{t('TestLearn — Beta pública', 'TestLearn — Public Beta')}</h1>
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
          <span className="beta-badge">{t('Beta pública', 'Public Beta')}</span>
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
          <p aria-live="polite" aria-atomic="true" className="save-status">
            {saveStatus === 'pending'
              ? t('A reservar acesso de escrita…', 'Reserving write access…')
              : saveStatus === 'busy'
                ? t(
                    'Outro separador ou contexto tem a reserva de escrita. Pode consultar sem editar. Iniciar sessões, responder e importar progresso estão bloqueados aqui. Liberte a edição na outra página ou feche-a e tente novamente.',
                    'Another tab or context holds write access. You can browse without editing. Starting sessions, answering and importing progress are blocked here. Release editing in the other page or close it, then retry.',
                  )
                : saveStatus === 'unavailable'
                  ? t(
                      'A reserva segura de escrita está indisponível. A edição está bloqueada; tente um navegador atualizado em HTTPS.',
                      'Safe write access is unavailable. Editing is blocked; try an updated browser over HTTPS.',
                    )
                  : saveStatus === 'readonly'
                    ? t(
                        'Modo de consulta. A edição foi libertada neste separador; obter acesso novamente não altera os dados guardados.',
                        'Read-only mode. Editing was released in this tab; requesting access again does not change saved data.',
                      )
                    : saveStatus === 'saved'
                      ? t('Guardado neste navegador.', 'Saved in this browser.')
                      : saveStatus === 'failed'
                        ? t(
                            'Não guardado — a última alteração não foi aplicada.',
                            'Not saved — the last change was not applied.',
                          )
                        : t(
                            'Pronto para guardar neste navegador.',
                            'Ready to save in this browser.',
                          )}
          </p>
          <div className="actions">
            {leaseReady ? (
              <button
                onClick={() => {
                  writer.release();
                  setLeaseReady(false);
                  setSaveStatus('readonly');
                  setEditRequest(null);
                }}
              >
                {t(
                  'Libertar edição neste separador',
                  'Release editing in this tab',
                )}
              </button>
            ) : saveStatus !== 'pending' ? (
              <button
                onClick={() => {
                  setSaveStatus('pending');
                  setEditRequest((request) =>
                    request === null ? 0 : request + 1,
                  );
                }}
              >
                {t('Tentar obter acesso de escrita', 'Retry write access')}
              </button>
            ) : null}
            {recoveryRequired && (
              <button onClick={() => window.location.reload()}>
                {t('Recarregar o progresso guardado', 'Reload saved progress')}
              </button>
            )}
          </div>
          {warning && (
            <p role="alert" className="notice">
              {warning.startsWith('Saved data could not be read')
                ? t(
                    'O armazenamento não pôde ser lido. A edição está bloqueada e nenhum dado foi removido. Verifique as permissões do navegador e recarregue o progresso guardado.',
                    'Storage could not be read. Editing is blocked and no data was removed. Check browser permissions and reload saved progress.',
                  )
                : warning.startsWith('Saved data')
                  ? t(
                      'Os dados guardados estão corrompidos, incompatíveis ou indisponíveis. Os dados originais foram preservados. A edição está bloqueada. Exporte uma cópia válida quando possível ou use a eliminação explícita para recuperar.',
                      'Saved data is corrupted, incompatible or unavailable. The original data was preserved. Editing is blocked. Export a valid copy when possible or use explicit reset to recover.',
                    )
                  : warning === 'WRITE_FAILED'
                    ? t(
                        'Não foi possível guardar. A alteração não foi aplicada; os dados anteriores foram preservados. Exporte o progresso e verifique o espaço disponível (máximo de 500 sessões concluídas).',
                        'Unable to save. The change was not applied; previous data was preserved. Export progress and check available storage (maximum 500 completed sessions).',
                      )
                    : warning}
            </p>
          )}
          {(page === 'dashboard' || page === 'practice') && (
            <p className="draft-note">
              {t(
                'Beta independente. Conteúdo revisto por IA; aprovação humana e calibração pendentes. Consulte os termos e limites no rodapé.',
                'Independent beta. AI-reviewed content; human approval and calibration pending. See terms and limitations in the footer.',
              )}
            </p>
          )}
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
              <DashboardPaths
                active={state.active}
                now={now}
                language={language}
                minutes={minutes}
                onMinutes={setMinutes}
                onStudy={() => setPage('practice')}
                onExam={() => start('exam')}
                onResume={() => setPage('session')}
                canCreate={canWrite && questions.length >= 40}
              />
              <p>
                {questions.length}{' '}
                {t(
                  'questões originais · seis capítulos · PT-PT e EN',
                  'original questions · six chapters · PT-PT and EN',
                )}
              </p>
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
                    {t(
                      'Questões com visita registada',
                      'Questions with a recorded visit',
                    )}
                  </span>
                  <strong>{seen.size}</strong>
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
                      changeFilters({ chapter: String(index + 1) });
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
            </>
          )}
          {page === 'practice' && (
            <section className="panel">
              <h2>{t('Escolha o seu foco', 'Choose your focus')}</h2>
              <p>
                {t(
                  'Comece pelo capítulo e depois escolha o tópico ou objetivo. Alterar o contexto limpa filtros incompatíveis; as opções seguem a ordem do syllabus.',
                  'Start with a chapter, then choose a topic or objective. Changing context clears incompatible filters; options follow syllabus order.',
                )}
              </p>
              <p>
                {t(
                  'Prática por tópico: sem as quotas da estrutura de um exame completo.',
                  'Topic practice does not follow the structure quotas of a full examination.',
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
                        changeFilters({ chapter: event.target.value });
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
                      onChange={(event) =>
                        changeFilters({ topic: event.target.value })
                      }
                    >
                      <option value="">{t('Todos', 'All')}</option>
                      {groups.map((group) => (
                        <optgroup
                          key={group.chapter}
                          label={`${group.chapter}. ${label(language, chapters[group.chapter - 1].pt, chapters[group.chapter - 1].en)}`}
                        >
                          {group.topics.map((item) => (
                            <option key={item} value={item}>
                              {topicLabel(item, language)}
                            </option>
                          ))}
                        </optgroup>
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
                      onChange={(event) =>
                        changeFilters({ lo: event.target.value })
                      }
                    >
                      <option value="">{t('Todos', 'All')}</option>
                      {groups.map((group) => (
                        <optgroup
                          key={group.chapter}
                          label={`${group.chapter}. ${label(language, chapters[group.chapter - 1].pt, chapters[group.chapter - 1].en)}`}
                        >
                          {group.objectives.map((item) => (
                            <option key={item} value={item}>
                              {item} —{' '}
                              {label(
                                language,
                                objectivesById[item].description.pt,
                                objectivesById[item].description.en,
                              )}
                            </option>
                          ))}
                        </optgroup>
                      ))}
                    </select>
                  </label>
                  <label>
                    {t('Nível cognitivo', 'Cognitive level')}
                    <select
                      aria-label={t('Nível cognitivo', 'Cognitive level')}
                      value={level}
                      onChange={(event) =>
                        changeFilters({ level: event.target.value })
                      }
                    >
                      <option value="">{t('Todos', 'All')}</option>
                      {['K1', 'K2', 'K3'].map((item) => (
                        <option key={item} value={item}>
                          {item} —{' '}
                          {label(
                            language,
                            cognitiveLevels[
                              item as keyof typeof cognitiveLevels
                            ].title.pt,
                            cognitiveLevels[
                              item as keyof typeof cognitiveLevels
                            ].title.en,
                          )}
                        </option>
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
                      aria-describedby="history-filter-help"
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
                      max={eligible.length || 1}
                      aria-describedby="question-count-help"
                      value={count}
                      onChange={(event) => setCount(Number(event.target.value))}
                      required
                    />
                  </label>
                </div>
                <p id="history-filter-help">
                  {label(
                    language,
                    historyDescriptions[historyFilter].pt,
                    historyDescriptions[historyFilter].en,
                  )}
                </p>
                {lo && <ObjectiveHelp lo={lo} language={language} />}
                <CognitiveLevelHelp language={language} />
                <p aria-live="polite">
                  {eligible.length}{' '}
                  {t(
                    'questões disponíveis com estes filtros.',
                    'questions available with these filters.',
                  )}
                </p>
                <p id="question-count-help">
                  {!eligible.length
                    ? t(
                        'Nenhuma questão corresponde aos filtros. Altere a seleção ou o histórico.',
                        'No questions match these filters. Change the selection or history.',
                      )
                    : t(
                        `Escolha entre 1 e ${eligible.length} questões.`,
                        `Choose between 1 and ${eligible.length} questions.`,
                      )}
                </p>
                {eligible.length > 0 &&
                  (!Number.isInteger(count) ||
                    count < 1 ||
                    count > eligible.length) && (
                    <p className="notice">
                      {t(
                        'A quantidade pedida não é válida para esta seleção. Ajuste o número de questões.',
                        'The requested count is not valid for this selection. Adjust the number of questions.',
                      )}
                    </p>
                  )}
                <button
                  className="primary"
                  disabled={
                    !active &&
                    (!canWrite ||
                      !Number.isInteger(count) ||
                      count < 1 ||
                      count > eligible.length)
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
                          'Simulado segundo a estrutura CTFL',
                          'CTFL exam-structure simulation',
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
              <fieldset className="session-workspace" disabled={!canWrite}>
                <div className="exam-layout">
                  <section className="question panel">
                    <div className="question-meta">
                      <span>
                        {t('Questão', 'Question')} {active.index + 1} /{' '}
                        {active.questionIds.length}
                      </span>
                      {active.mode === 'practice' && (
                        <span>
                          {current.lo} · {current.level} —{' '}
                          {label(
                            language,
                            cognitiveLevels[current.level].title.pt,
                            cognitiveLevels[current.level].title.en,
                          )}
                        </span>
                      )}
                    </div>
                    <CognitiveLevelHelp language={language} />
                    {active.mode === 'practice' && (
                      <ObjectiveHelp lo={current.lo} language={language} />
                    )}
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
                      ).map((id, optionIndex) => {
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
                              type={
                                current.required === 1 ? 'radio' : 'checkbox'
                              }
                              name={current.id}
                              aria-describedby={`${current.id}-${id}-letter`}
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
                            <span id={`${current.id}-${id}-letter`} hidden>
                              {t(
                                `Opção ${String.fromCharCode(65 + optionIndex)}`,
                                `Option ${String.fromCharCode(65 + optionIndex)}`,
                              )}
                            </span>
                            <span className="option-letter" aria-hidden="true">
                              {String.fromCharCode(65 + optionIndex)}.
                            </span>
                            <span className="option-text">
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
                      / {active.questionIds.length}{' '}
                      {t('respondidas', 'answered')}
                    </p>
                    <button
                      className="primary"
                      onClick={() => setConfirmSubmit(true)}
                    >
                      {t('Terminar sessão', 'Finish session')}
                    </button>
                    <small>
                      {t(
                        'Só as alterações confirmadas como guardadas estão neste navegador. Um backup local permite transferi-las.',
                        'Only changes confirmed as saved are in this browser. A local backup lets you transfer them.',
                      )}
                    </small>
                  </aside>
                </div>
              </fieldset>
            </>
          )}
          {page === 'result' && viewed && (
            <ResultReview
              key={viewed.id}
              session={viewed}
              bank={questions}
              language={language}
              hasActive={!!active}
              canCreateExam={canWrite}
              onPractice={() => {
                setPage('practice');
                setViewed(null);
              }}
              onExam={() => {
                if (start('exam')) setViewed(null);
              }}
            />
          )}
          {page === 'history' && (
            <>
              <ProgressBackup
                state={state}
                language={language}
                canImport={canWrite}
                canExport={!recoveryRequired}
                isCurrent={writer.isCurrent}
                onApply={(next, expected) => {
                  if (stateRef.current !== expected) return 'changed';
                  if (!commit(next)) return 'write';
                  setViewed(null);
                  setPage(next.active ? 'session' : 'history');
                  return 'saved';
                }}
              />
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
                    <p>
                      {t(
                        'Sessões concluídas apenas; a sessão em curso não entra nestas métricas. IDs vistos em revisões diferentes contam uma vez. Visita registada não mede atenção.',
                        'Completed sessions only; the active session is excluded from these metrics. IDs viewed in different revisions count once. A recorded visit does not measure attention.',
                      )}
                    </p>
                    <dl className="progress-counts">
                      <div>
                        <dt>
                          {t('Corretas / respostas', 'Correct / responses')}
                        </dt>
                        <dd>
                          {progress.correct} / {progress.answered}
                        </dd>
                      </div>
                      <div>
                        <dt>
                          {t('Respostas incorretas', 'Incorrect responses')}
                        </dt>
                        <dd>{progress.incorrect}</dd>
                      </div>
                      <div>
                        <dt>
                          {t(
                            'Sem resposta, incluindo não abertas',
                            'Unanswered, including unopened',
                          )}
                        </dt>
                        <dd>{progress.unanswered}</dd>
                      </div>
                      <div>
                        <dt>
                          {t(
                            'Primeiras exposições registadas (IDs)',
                            'First recorded exposures (IDs)',
                          )}
                        </dt>
                        <dd>{progress.firstExposure}</dd>
                      </div>
                      <div>
                        <dt>
                          {t(
                            'Visitas repetidas, além da primeira',
                            'Repeat visits beyond the first',
                          )}
                        </dt>
                        <dd>{progress.repeatedVisits}</dd>
                      </div>
                    </dl>
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
                              · {new Set(session.visitedIds).size}{' '}
                              {t('visitas registadas', 'recorded visits')}
                            </p>
                          </div>
                          <button
                            onClick={() => {
                              setViewed(session);
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
              <ChapterProgress
                model={progress}
                language={language}
                onPractice={(chapter) => {
                  changeFilters({ chapter: String(chapter) });
                  setPage('practice');
                }}
              />
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
                  if (!commit(emptyState(), true)) return;
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
