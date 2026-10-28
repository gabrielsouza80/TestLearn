import { variabilityQuestions } from './variability-questions';
import { syllabusQuestions } from './syllabus-questions';
import bilingualReviews from './bilingual-review.json' with { type: 'json' };
import { blueprintQuestions } from './blueprint-questions';
import auditRecords from './academic-review.json' with { type: 'json' };
import type { Question } from '../domain/engine';
type Pair = [en: string, pt: string];
const t = ([en, pt]: Pair) => ({ en, pt });
function q(
  n: number,
  lo: string,
  level: Question['level'],
  topic: string,
  prompt: Pair,
  choices: [Pair, Pair, Pair] | [Pair, Pair, Pair, Pair],
  reason: Pair,
  wrong: [Pair, Pair] | [Pair, Pair, Pair],
  type: Question['type'] = 'single',
): Question {
  return {
    id: `tl-${String(n).padStart(3, '0')}`,
    chapter: Number(lo[3]),
    lo,
    level,
    topic,
    type,
    required: 1,
    text: t(prompt),
    options: choices.map((c, i) => ({
      id: `o${i + 1}`,
      text: t(c),
      explanation: t(i === 0 ? reason : wrong[i - 1]),
    })),
    correct: ['o1'],
    explanation: t(reason),
    review: 'AI_REVIEWED',
    translationReview: 'AI_REVIEWED',
    version: auditRecords[n - 1].originalStatus === 'PASS' ? 1 : 2,
    humanApproval: 'PENDING',
    academicReview: {
      method: 'AI_REVIEWED',
      status: 'PASS',
      reviewedAt: '2026-10-27',
      section: auditRecords[n - 1].section,
      pages: auditRecords[n - 1].enPages,
      report: 'docs/academic-audit.md#tl-' + String(n).padStart(3, '0'),
    },
    syllabus: '4.0.1',
    origin: 'original',
  };
}
// Original material, AI-reviewed against local official references; human approval remains pending.
export const questions: Question[] = [
  q(
    1,
    'FL-1.1.1',
    'K1',
    'Objectives',
    [
      'Select TWO useful testing objectives.',
      'Selecione DOIS objetivos úteis dos testes.',
    ],
    [
      [
        'Provide information for a release decision',
        'Fornecer informação para uma decisão de lançamento',
      ],
      ['Prove that no defects exist', 'Provar que não existem defeitos'],
      [
        'Guarantee every user is satisfied',
        'Garantir a satisfação de todos os utilizadores',
      ],
    ],
    [
      'Testing provides decision evidence and finds defects. It cannot guarantee defect absence or universal user satisfaction.',
      'Os testes fornecem evidência para decisões e encontram defeitos. Não garantem a ausência de defeitos nem a satisfação de todos os utilizadores.',
    ],
    [
      [
        'Finite testing cannot prove defect absence.',
        'Testes finitos não provam a ausência de defeitos.',
      ],
      [
        'Satisfaction cannot be guaranteed by testing.',
        'Os testes não garantem satisfação.',
      ],
    ],
  ),
  q(
    2,
    'FL-1.2.2',
    'K1',
    'Quality assurance',
    [
      'Which activity is primarily process-oriented quality assurance?',
      'Que atividade de garantia da qualidade se centra principalmente no processo?',
    ],
    [
      [
        'Improving the team review process',
        'Melhorar o processo de revisão da equipa',
      ],
      ['Executing a checkout test', 'Executar um teste de compra'],
      [
        'Reporting a product failure in a build',
        'Reportar uma falha numa versão',
      ],
      [
        'Reviewing the source code of the tax module',
        'Rever o código-fonte do módulo fiscal',
      ],
    ],
    [
      'QA seeks to prevent defects by improving processes. Changing the team review process is QA; executing a checkout test, reporting a failure and reviewing code evaluate the product.',
      'A QA procura prevenir defeitos através da melhoria dos processos. Alterar o processo de revisão da equipa é QA; executar um teste de compra, reportar uma falha e rever código avaliam o produto.',
    ],
    [
      ['Execution evaluates the product.', 'A execução avalia o produto.'],
      [
        'This reports a product problem.',
        'Isto reporta um problema do produto.',
      ],
      [
        'A code review evaluates a product and finds defects directly. Improving how reviews are performed is the process-oriented QA activity.',
        'Uma revisão de código avalia um produto e encontra defeitos diretamente. Melhorar a forma de realizar as revisões é a atividade de QA orientada para o processo.',
      ],
    ],
  ),
  q(
    3,
    'FL-1.1.2',
    'K2',
    'Debugging',
    [
      'Which activity belongs to debugging rather than testing?',
      'Qual das seguintes atividades pertence ao debugging (depuração), em vez de aos testes?',
    ],
    [
      [
        'Diagnosing the defect that caused the failure and repairing the faulty code',
        'Diagnosticar o defeito que causou a falha e corrigir o código incorreto',
      ],
      [
        'Compare the actual and expected results while executing a new test',
        'Comparar os resultados obtidos e esperados durante a execução de um novo teste',
      ],
      [
        'Running a confirmation test after the fix',
        'Executar um teste de confirmação após a correção',
      ],
      [
        'Checking related payment flows for adverse effects of the fix',
        'Verificar fluxos de pagamento relacionados para detetar efeitos adversos da correção',
      ],
    ],
    [
      'Debugging may reproduce a failure, diagnose its cause and remove the defect. Locating and repairing the cause is debugging; later confirmation testing checks the fix.',
      'O debugging pode reproduzir uma falha, diagnosticar a causa e remover o defeito. Localizar e corrigir a causa é debugging; o teste de confirmação posterior verifica a correção.',
    ],
    [
      [
        'Comparing outcomes during test execution is testing. Reproducing an existing failure can also be part of debugging, so reproduction alone does not distinguish the activities.',
        'Comparar resultados durante a execução de teste é uma atividade de teste. A reprodução de uma falha existente também pode fazer parte do debugging, pelo que a reprodução, por si só, não distingue as atividades.',
      ],
      [
        'Running a confirmation test checks whether the fix resolved the original problem; locating and removing the defect is debugging.',
        'Executar um teste de confirmação verifica se a correção resolveu o problema original; localizar e remover o defeito pertence ao debugging.',
      ],
      [
        'Checking for adverse effects of a change is regression testing. Diagnosing and removing the cause of the original failure is debugging.',
        'Procurar efeitos adversos de uma alteração é teste de regressão. Diagnosticar e remover a causa da falha original é debugging.',
      ],
    ],
    'scenario',
  ),
  q(
    4,
    'FL-1.2.3',
    'K2',
    'Error and defect',
    [
      'A programmer misunderstands a tax rule and writes the wrong formula. What is the wrong formula?',
      'Um programador interpreta mal uma regra fiscal e escreve uma fórmula errada. O que é a fórmula errada?',
    ],
    [
      ['A defect', 'Um defeito'],
      ['An error', 'Um erro'],
      ['An observed failure', 'Uma falha observada'],
      [
        'A root cause in the development process',
        'Uma causa raiz no processo de desenvolvimento',
      ],
    ],
    [
      'The misunderstanding is a human error; the wrong formula written in the code is a defect. Executing that defect may cause an incorrect tax result, a failure. The scenario does not establish a particular underlying process root cause.',
      'A interpretação incorreta é um erro humano; a fórmula errada escrita no código é um defeito. Executar esse defeito pode causar um resultado fiscal incorreto, uma falha. O cenário não estabelece uma causa raiz específica no processo.',
    ],
    [
      [
        'The misunderstanding is the human error.',
        'A interpretação incorreta é o erro humano.',
      ],
      [
        'A failure is observed during execution.',
        'Uma falha é observada durante a execução.',
      ],
      [
        'A root cause is an underlying reason for a problem, such as inadequate training. The erroneous formula itself is the defect in the work product, not that underlying process cause.',
        'Uma causa raiz é uma razão subjacente a um problema, como formação inadequada. A própria fórmula errada é o defeito no produto de trabalho, não essa causa subjacente do processo.',
      ],
    ],
    'scenario',
  ),
  q(
    5,
    'FL-1.3.1',
    'K2',
    'Testing principles',
    [
      'Repeated regression runs pass, but users report new failure types that the suite does not exercise. What is the best response to improve defect detection?',
      'As execuções repetidas de regressão passam, mas os utilizadores reportam novos tipos de falha que a bateria não exercita. Qual é a melhor resposta para melhorar a deteção de defeitos?',
    ],
    [
      [
        'Review tests and data for missing scenarios, retaining useful regression checks',
        'Rever testes e dados para cenários em falta, mantendo verificações de regressão úteis',
      ],
      [
        'Run the existing cases more frequently while keeping their data unchanged',
        'Executar mais vezes os casos existentes, mantendo os seus dados de teste inalterados',
      ],
      [
        'Replace the existing suite with cases for the most recently reported failure',
        'Substituir a bateria existente por casos para a falha reportada mais recentemente',
      ],
      [
        'Vary the execution order of existing tests while keeping their data unchanged',
        'Variar a ordem de execução dos testes existentes, mantendo os seus dados inalterados',
      ],
    ],
    [
      'Review and vary tests and data to cover the newly observed failure types, while retaining useful regression checks. Tests can wear out; passing an unchanged suite does not demonstrate coverage of new scenarios.',
      'Rever e variar os testes e os dados permite cobrir os novos tipos de falha observados, mantendo verificações de regressão úteis. Os testes podem perder eficácia; uma bateria inalterada passar não demonstra cobertura de novos cenários.',
    ],
    [
      [
        'More frequent execution can detect regressions sooner, but does not add coverage of the missing scenarios.',
        'Uma execução mais frequente pode detetar regressões mais cedo, mas não acrescenta cobertura dos cenários em falta.',
      ],
      [
        'A focused new test is useful, but replacing the suite discards useful regression coverage for other behavior.',
        'Um novo teste focado é útil, mas substituir a bateria elimina cobertura de regressão útil para outros comportamentos.',
      ],
      [
        'Changing order may reveal order dependencies, but it does not by itself cover the new failure scenarios. The suite and data need review.',
        'Mudar a ordem pode revelar dependências de ordem, mas, por si só, não cobre os novos cenários de falha. É necessário rever a bateria e os dados.',
      ],
    ],
  ),
  q(
    6,
    'FL-1.4.1',
    'K2',
    'Test activities',
    [
      'A tester derives test conditions from requirements. Which activity is this?',
      'Um testador deriva condições de teste a partir de requisitos. Que atividade é esta?',
    ],
    [
      ['Test analysis', 'Análise de teste'],
      ['Test execution', 'Execução de teste'],
      ['Test completion', 'Conclusão do teste'],
      ['Test design', 'Conceção de teste'],
    ],
    [
      'Analysis identifies what needs testing.',
      'A análise identifica o que é necessário testar.',
    ],
    [
      [
        'Execution runs tests and compares results.',
        'A execução realiza testes e compara resultados.',
      ],
      [
        'Completion consolidates outcomes and assets.',
        'A conclusão consolida resultados e recursos.',
      ],
      [
        'Analysis defines what to test as test conditions. Design elaborates those conditions into test cases and determines how to test them.',
        'A análise define o que testar através de condições de teste. A conceção desenvolve essas condições em casos de teste e determina como as testar.',
      ],
    ],
  ),
  q(
    7,
    'FL-1.4.4',
    'K2',
    'Traceability',
    [
      'A payment requirement changes. How do requirement-to-test links help?',
      'Um requisito de pagamento muda. Como ajudam as ligações entre requisitos e testes?',
    ],
    [
      [
        'Identify the linked tests whose conditions or expected results may need revision',
        'Identificar os testes ligados cujas condições ou resultados esperados podem precisar de revisão',
      ],
      [
        'Use the links as evidence that previously passed tests still pass after the change',
        'Usar as ligações como evidência de que os testes anteriormente aprovados continuam a passar após a alteração',
      ],
      [
        'Obtain revised expected results from the links instead of the changed requirement',
        'Obter resultados esperados atualizados das ligações em vez de consultar o requisito alterado',
      ],
      [
        'Treat a linked test as unaffected when its script has not been edited',
        'Considerar um teste ligado como não afetado quando o seu script não foi editado',
      ],
    ],
    [
      'Traceability supports change impact analysis.',
      'A rastreabilidade apoia a análise de impacto das alterações.',
    ],
    [
      [
        'A link records a relationship, not a new execution result. The changed behavior must be assessed and relevant tests executed.',
        'Uma ligação regista uma relação, não um novo resultado de execução. É necessário avaliar o comportamento alterado e executar os testes relevantes.',
      ],
      [
        'Traceability points to the affected requirement; its revised content, not the existence of the link, defines the expected behavior.',
        'A rastreabilidade aponta para o requisito afetado; o seu conteúdo atualizado, e não a existência da ligação, define o comportamento esperado.',
      ],
      [
        'A requirement change can invalidate a test or its expected result even when the test file is unchanged. Links support that impact analysis.',
        'Uma alteração de requisito pode invalidar um teste ou o seu resultado esperado mesmo sem alterações no ficheiro do teste. As ligações apoiam essa análise de impacto.',
      ],
    ],
  ),
  q(
    8,
    'FL-1.5.3',
    'K2',
    'Independence',
    [
      'What is the main benefit of testing independence described in CTFL when someone other than the author tests a work product?',
      'Qual é o principal benefício da independência de teste descrito no CTFL quando alguém além do autor testa um produto de trabalho?',
    ],
    [
      [
        'Different backgrounds and perspectives help identify different defects and challenge author assumptions',
        'Experiências e perspetivas diferentes ajudam a identificar outros defeitos e a questionar pressupostos',
      ],
      [
        'It transfers responsibility for product quality from developers to independent testers',
        'Transfere a responsabilidade pela qualidade do produto dos programadores para os testadores independentes',
      ],
      [
        "It reduces the need to maintain the testers' domain knowledge",
        'Reduz a necessidade de manter o conhecimento do domínio dos testadores',
      ],
      [
        'It reduces bias by avoiding discussions with the developers',
        'Reduz o enviesamento ao evitar discussões com os programadores',
      ],
    ],
    [
      'Different backgrounds expose different assumptions.',
      'Experiências distintas revelam pressupostos diferentes.',
    ],
    [
      [
        'Independence does not transfer quality ownership. Developers and other team members remain responsible for quality.',
        'A independência não transfere a responsabilidade pela qualidade. Os programadores e os outros membros da equipa continuam responsáveis pela qualidade.',
      ],
      [
        'Independent testers still need relevant knowledge and skills. Independence provides another perspective, not a substitute for competence.',
        'Os testadores independentes continuam a precisar de conhecimentos e competências relevantes. A independência oferece outra perspetiva, não substitui a competência.',
      ],
      [
        'Different perspectives can challenge assumptions while collaborating. Isolation and communication problems are drawbacks of independence, not the intended benefit.',
        'Perspetivas diferentes podem questionar pressupostos mantendo a colaboração. O isolamento e os problemas de comunicação são desvantagens da independência, não o benefício pretendido.',
      ],
    ],
  ),
  q(
    9,
    'FL-2.1.2',
    'K1',
    'Lifecycle',
    [
      'Which practice applies across development lifecycles?',
      'Que prática se aplica aos vários ciclos de desenvolvimento?',
    ],
    [
      [
        'Start test analysis during related development work, using available draft work products',
        'Iniciar a análise de teste durante o desenvolvimento relacionado, usando os produtos preliminares disponíveis',
      ],
      [
        'Finish implementation before starting the corresponding test analysis',
        'Concluir a implementação antes de iniciar a análise de teste correspondente',
      ],
      [
        'Give component and acceptance testing the same test objectives',
        'Atribuir os mesmos objetivos de teste aos testes de componente e de aceitação',
      ],
      [
        'Replace reviews of development work products with later system-test execution',
        'Substituir revisões de produtos de desenvolvimento pela execução posterior de testes de sistema',
      ],
    ],
    [
      'Early corresponding test activities support feedback.',
      'Atividades de teste correspondentes e precoces apoiam o feedback.',
    ],
    [
      [
        'Waiting for completed code delays analysis that can start from development work products such as requirements.',
        'Esperar por código concluído atrasa uma análise que pode começar a partir de produtos de desenvolvimento, como os requisitos.',
      ],
      [
        'Different test levels have distinct objectives; lifecycle-independent good practice does not make their objectives identical.',
        'Os diferentes níveis de teste têm objetivos distintos; uma boa prática aplicável a vários ciclos de vida não torna os seus objetivos idênticos.',
      ],
      [
        'Reviews of drafts support early defect detection and complement later dynamic tests. Later system testing is not a replacement for those early activities.',
        'As revisões de versões preliminares apoiam a deteção precoce de defeitos e complementam os testes dinâmicos posteriores. O teste de sistema posterior não substitui essas atividades iniciais.',
      ],
    ],
  ),
  q(
    10,
    'FL-2.1.3',
    'K1',
    'Test first',
    [
      'Which approach directs coding through a repeated cycle of writing a component test, writing code to satisfy it, and refactoring the tests and code?',
      'Que abordagem orienta a programação através de um ciclo repetido de escrever um teste de componente, escrever código que o satisfaça e refatorizar os testes e o código?',
    ],
    [
      [
        'Test-driven development (TDD)',
        'Desenvolvimento orientado para testes (TDD)',
      ],
      [
        'Acceptance test-driven development (ATDD)',
        'Desenvolvimento orientado para testes de aceitação (ATDD)',
      ],
      [
        'Behavior-driven development (BDD)',
        'Desenvolvimento orientado para o comportamento (BDD)',
      ],
      ['Continuous integration (CI)', 'Integração contínua (CI)'],
    ],
    [
      'TDD directs coding through tests: write a test, implement code to satisfy it, then refactor tests and code. ATDD and BDD also support early testing, but have different defining characteristics.',
      'O TDD orienta a programação através de testes: escrever um teste, implementar código que o satisfaça e depois refatorizar os testes e o código. O ATDD e o BDD também apoiam testes precoces, mas têm características distintivas diferentes.',
    ],
    [
      [
        'ATDD derives acceptance tests collaboratively from acceptance criteria before implementation. The specified test-code-refactor cycle identifies TDD.',
        'O ATDD deriva testes de aceitação em colaboração a partir de critérios de aceitação antes da implementação. O ciclo teste-código-refatorização especificado identifica o TDD.',
      ],
      [
        'BDD expresses desired behavior in stakeholder-readable examples, often Given/When/Then. Writing tests first is shared; the component test-code-refactor cycle is the TDD characteristic here.',
        'O BDD expressa o comportamento pretendido em exemplos compreensíveis pelos stakeholders, frequentemente Dado/Quando/Então. Escrever testes primeiro é uma característica partilhada; o ciclo de teste de componente-código-refatorização é aqui a característica do TDD.',
      ],
      [
        'CI integrates changes frequently and can run automated tests. It does not define the test-first coding and refactoring cycle described.',
        'A CI integra alterações com frequência e pode executar testes automatizados. Não define o ciclo de programação orientada por testes e refatorização descrito.',
      ],
    ],
  ),
  q(
    11,
    'FL-2.2.3',
    'K2',
    'Regression',
    [
      'After fixing a discount defect, the team reruns its failing test and checks unaffected payment flows. What are these checks respectively?',
      'Após corrigir um defeito num desconto, a equipa repete o teste que falhou e verifica fluxos de pagamento não alterados. Que testes são, respetivamente?',
    ],
    [
      ['Confirmation and regression', 'Confirmação e regressão'],
      ['Regression and confirmation', 'Regressão e confirmação'],
      ['Both are confirmation testing', 'Ambos são testes de confirmação'],
      ['Both are regression testing', 'Ambos são testes de regressão'],
    ],
    [
      'Confirmation verifies the fix; regression checks adverse effects elsewhere.',
      'A confirmação verifica a correção; a regressão procura efeitos adversos noutras áreas.',
    ],
    [
      ['The order is reversed.', 'A ordem está invertida.'],
      [
        'Confirmation checks whether the original defect was fixed. Checking other payment flows for adverse effects of the change is regression testing.',
        'A confirmação verifica se o defeito original foi corrigido. Verificar outros fluxos de pagamento para detetar efeitos adversos da alteração é teste de regressão.',
      ],
      [
        'The first check specifically confirms the fix by repeating the previously failing test. The second checks for adverse effects elsewhere.',
        'A primeira verificação confirma especificamente a correção ao repetir o teste que falhava. A segunda procura efeitos adversos noutras áreas.',
      ],
    ],
    'scenario',
  ),
  q(
    12,
    'FL-2.2.1',
    'K2',
    'Test levels',
    [
      'A test focuses on the interface between a tax module and an invoice module within one application. Which level fits best?',
      'Um teste centra-se na interface entre um módulo fiscal e um módulo de faturação da mesma aplicação. Qual é o nível mais adequado?',
    ],
    [
      ['Component integration testing', 'Teste de integração de componentes'],
      ['Acceptance testing', 'Teste de aceitação'],
      [
        'System integration with external systems',
        'Teste de integração de sistemas com sistemas externos',
      ],
      ['Component testing in isolation', 'Teste de componente isolado'],
    ],
    [
      'The scope is interaction between internal components.',
      'O âmbito é a interação entre componentes internos.',
    ],
    [
      [
        'Acceptance focuses on business needs and readiness.',
        'A aceitação centra-se nas necessidades de negócio e na prontidão.',
      ],
      [
        'No external system is in the stated scope.',
        'O âmbito descrito não inclui um sistema externo.',
      ],
      [
        'An isolated component test focuses on an individual module. The stated scope is the interface and interaction between two internal modules.',
        'Um teste de componente isolado centra-se num módulo individual. O âmbito indicado é a interface e a interação entre dois módulos internos.',
      ],
    ],
  ),
  q(
    13,
    'FL-2.1.5',
    'K2',
    'Shift left',
    [
      'Reviewing acceptance criteria before coding is an example of what?',
      'Rever critérios de aceitação antes de programar é um exemplo de quê?',
    ],
    [
      ['Shift left', 'Shift left'],
      ['Test execution', 'Execução de teste'],
      ['Regression testing', 'Teste de regressão'],
      ['Test completion', 'Conclusão do teste'],
    ],
    [
      'Earlier evaluation gives earlier feedback.',
      'A avaliação antecipada permite feedback mais cedo.',
    ],
    [
      [
        'Executing tests runs the test object and compares actual and expected results. Reviewing criteria before implementation is an earlier, static activity illustrating shift left.',
        'A execução de teste executa o objeto de teste e compara os resultados obtidos e esperados. Rever critérios antes da implementação é uma atividade estática antecipada que ilustra shift left.',
      ],
      [
        'Regression testing checks adverse effects of changes. The described purpose is earlier feedback on acceptance criteria, not checking effects of a change.',
        'O teste de regressão procura efeitos adversos de alterações. A finalidade descrita é obter feedback mais cedo sobre critérios de aceitação, não verificar efeitos de uma alteração.',
      ],
      [
        'Completion consolidates results and test assets after test activities. Reviewing criteria before coding brings evaluation earlier in the lifecycle.',
        'A conclusão consolida resultados e recursos de teste após as atividades de teste. Rever critérios antes da programação antecipa a avaliação no ciclo de vida.',
      ],
    ],
  ),
  q(
    14,
    'FL-2.3.1',
    'K2',
    'Maintenance',
    [
      'An operational service moves to a new database engine. Why plan maintenance testing?',
      'Um serviço em operação muda para outro motor de base de dados. Porquê planear testes de manutenção?',
    ],
    [
      [
        'Migration can affect the data and existing behavior, even without application code changes',
        'A migração pode afetar dados e comportamento existente, mesmo sem alterar o código da aplicação',
      ],
      [
        'Existing test results remain sufficient for the new environment because application features are unchanged',
        'Os resultados anteriores continuam a ser suficientes para o novo ambiente porque as funcionalidades da aplicação não mudaram',
      ],
      [
        'Maintenance testing concerns code changes rather than environment migrations',
        'Os testes de manutenção dizem respeito a alterações de código, não a migrações de ambiente',
      ],
      [
        'Data-migration checks replace regression checks of the service behavior',
        'As verificações da migração de dados substituem as verificações de regressão do comportamento do serviço',
      ],
    ],
    [
      'Environment migration is a maintenance-testing trigger.',
      'A migração do ambiente é um motivo para testes de manutenção.',
    ],
    [
      [
        'Unchanged feature requirements do not establish that the application behaves correctly with a different database engine. Migration can introduce regressions.',
        'Requisitos funcionais inalterados não demonstram que a aplicação se comporta corretamente com outro motor de base de dados. A migração pode introduzir regressões.',
      ],
      [
        'Maintenance testing can be triggered by environment upgrades or migrations, not just source-code changes.',
        'Os testes de manutenção podem ser desencadeados por atualizações ou migrações do ambiente, não apenas por alterações ao código-fonte.',
      ],
      [
        'Data correctness matters, but the new engine can also affect existing application behavior. Maintenance testing includes evaluating the change and possible regressions.',
        'A correção dos dados é importante, mas o novo motor também pode afetar o comportamento existente da aplicação. Os testes de manutenção incluem avaliar a alteração e possíveis regressões.',
      ],
    ],
  ),
  q(
    15,
    'FL-3.1.1',
    'K1',
    'Static work products',
    [
      'Which item is directly examinable by reviewing its written content, without executing the application?',
      'Que item pode ser examinado diretamente através da revisão do seu conteúdo escrito, sem executar a aplicação?',
    ],
    [
      [
        'Documented requirements for checkout validation rules',
        'Os requisitos escritos sobre regras de validação da compra',
      ],
      [
        "The checkout service's measured response latency",
        'A latência de resposta medida no serviço de compras',
      ],
      [
        "The application's memory growth under concurrent load",
        'O crescimento de memória da aplicação sob carga concorrente',
      ],
      [
        'The observed checkout behavior after selecting Pay',
        'O comportamento da compra observado após selecionar Pagar',
      ],
    ],
    [
      'Requirements can be inspected directly.',
      'Os requisitos podem ser inspecionados diretamente.',
    ],
    [
      [
        'Measuring response latency requires execution under defined conditions; it is a dynamic evaluation rather than inspection of a document.',
        'Medir a latência de resposta exige execução em condições definidas; é uma avaliação dinâmica, não a inspeção de um documento.',
      ],
      [
        'Memory growth during a load test is observed while the application executes. A later review of a written report would be a different, static activity.',
        'O crescimento da memória durante um teste de carga é observado com a aplicação em execução. Rever posteriormente um relatório escrito seria uma atividade diferente, estática.',
      ],
      [
        'Observing the behavior after an action requires executing the application. A requirement describing that behavior can instead be reviewed statically.',
        'Observar o comportamento após uma ação exige executar a aplicação. Um requisito que descreva esse comportamento pode, em alternativa, ser revisto estaticamente.',
      ],
    ],
  ),
  q(
    16,
    'FL-3.2.3',
    'K1',
    'Review roles',
    [
      'Who normally facilitates a review meeting and helps keep it effective?',
      'Quem normalmente facilita uma reunião de revisão e ajuda a mantê-la eficaz?',
    ],
    [
      ['The moderator', 'O moderador'],
      ['The scribe', 'O redator (anotador)'],
      ['The manager', 'O gestor'],
      ['The review leader', 'O líder de revisão'],
    ],
    [
      'The moderator facilitates the review meeting through mediation, time management and a safe environment for participation. The scribe records information; the manager provides resources; the review leader organizes the review overall.',
      'O moderador facilita a reunião de revisão através da mediação, da gestão do tempo e de um ambiente seguro para a participação. O redator regista informação; o gestor disponibiliza recursos; o líder de revisão organiza a revisão no seu conjunto.',
    ],
    [
      [
        'The scribe records anomalies and review decisions; this is not the meeting facilitation responsibility.',
        'O redator regista anomalias e decisões da revisão; facilitar a reunião não é esta responsabilidade.',
      ],
      [
        'The manager provides resources and decides what will be reviewed; the moderator facilitates the meeting.',
        'O gestor disponibiliza recursos e decide o que será revisto; o moderador facilita a reunião.',
      ],
      [
        'The review leader has overall responsibility and organizes participation, timing and location. The moderator is specifically responsible for effective meeting facilitation.',
        'O líder de revisão tem responsabilidade global e organiza participantes, data e local. O moderador é especificamente responsável pela facilitação eficaz da reunião.',
      ],
    ],
  ),
  q(
    17,
    'FL-3.1.3',
    'K2',
    'Static versus dynamic',
    [
      'Review finds contradictory date requirements; execution finds an incorrect date displayed. Which statement is accurate?',
      'Uma revisão encontra requisitos contraditórios de datas; a execução encontra uma data incorreta apresentada. Qual afirmação é correta?',
    ],
    [
      [
        'Static testing found a defect directly; dynamic testing observed a failure',
        'O teste estático encontrou diretamente um defeito; o dinâmico observou uma falha',
      ],
      [
        'Static testing observed a failure; dynamic testing directly located the code defect',
        'O teste estático observou uma falha; o dinâmico localizou diretamente o defeito no código',
      ],
      [
        'Both found failures because both results conflict with expectations',
        'Ambos encontraram falhas porque ambos os resultados contrariam as expectativas',
      ],
      [
        'Both directly found code defects because each result identifies the faulty statement',
        'Ambos encontraram diretamente defeitos no código porque cada resultado identifica a instrução incorreta',
      ],
    ],
    [
      'Review can find flaws without execution; execution exposes failures.',
      'A revisão pode encontrar imperfeições sem execução; a execução revela falhas.',
    ],
    [
      [
        'The mechanisms are reversed: a document review finds the inconsistency directly, while the wrong displayed date is an observed failure requiring further analysis to locate its cause.',
        'Os mecanismos estão invertidos: a revisão do documento encontra diretamente a inconsistência, enquanto a data incorreta apresentada é uma falha observada que exige análise adicional para localizar a causa.',
      ],
      [
        'A failure is a deviation observed during execution. Contradictory written requirements are defects found without executing the application.',
        'Uma falha é um desvio observado durante a execução. Requisitos escritos contraditórios são defeitos encontrados sem executar a aplicação.',
      ],
      [
        'The review found a requirements defect, not a code statement. The displayed failure alone does not identify which code statement caused it.',
        'A revisão encontrou um defeito nos requisitos, não uma instrução de código. A falha apresentada, por si só, não identifica a instrução de código que a causou.',
      ],
    ],
  ),
  q(
    18,
    'FL-3.2.4',
    'K2',
    'Review types',
    [
      'A team needs the most formal review type, with defined roles and collected metrics. Which fits?',
      'Uma equipa precisa do tipo de revisão mais formal, com papéis definidos e métricas recolhidas. Qual é adequado?',
    ],
    [
      ['Inspection', 'Inspeção'],
      ['Technical review', 'Revisão técnica'],
      ['Walkthrough', 'Walkthrough'],
      ['Informal review', 'Revisão informal'],
    ],
    [
      'Inspection is the most formal CTFL review type: it follows the complete generic review process and collects metrics for process improvement. Defined roles or metrics in isolation do not turn another review type into an inspection.',
      'A inspeção é o tipo de revisão CTFL mais formal: segue o processo genérico de revisão completo e recolhe métricas para melhorar o processo. Papéis definidos ou métricas, isoladamente, não transformam outro tipo de revisão numa inspeção.',
    ],
    [
      [
        'A technical review uses technically qualified reviewers and a moderator, but inspection is the most formal type described.',
        'Uma revisão técnica envolve revisores tecnicamente qualificados e um moderador, mas a inspeção é o tipo mais formal descrito.',
      ],
      [
        'A walkthrough is led by the author and does not require the full inspection process and metrics.',
        'Um walkthrough é conduzido pelo autor e não exige todo o processo de inspeção nem as suas métricas.',
      ],
      [
        'An informal review does not require the complete defined process and collected metrics characteristic of an inspection. Other review types may collect metrics, but inspection is the most formal CTFL type.',
        'Uma revisão informal não exige o processo completo definido e as métricas recolhidas característicos de uma inspeção. Outros tipos podem recolher métricas, mas a inspeção é o tipo CTFL mais formal.',
      ],
    ],
  ),
  q(
    19,
    'FL-4.1.1',
    'K2',
    'Technique families',
    [
      'Tests derived from externally specified behaviour, without using code structure, belong to which family?',
      'Testes derivados do comportamento especificado externamente, sem usar a estrutura do código, pertencem a que família?',
    ],
    [
      ['Black-box techniques', 'Técnicas de caixa-preta'],
      ['White-box techniques', 'Técnicas de caixa-branca'],
      ['Experience-based techniques', 'Técnicas baseadas na experiência'],
      ['Risk-based testing', 'Teste baseado no risco'],
    ],
    [
      'The source is specified behaviour.',
      'A origem é o comportamento especificado.',
    ],
    [
      [
        'White-box techniques use internal structure.',
        'As técnicas de caixa-branca usam a estrutura interna.',
      ],
      [
        'Experience-based techniques derive tests from tester knowledge and experience. The stated derivation basis is externally specified behavior, which identifies black-box techniques.',
        'As técnicas baseadas na experiência derivam testes dos conhecimentos e da experiência do testador. A base de derivação indicada é o comportamento especificado externamente, o que identifica técnicas de caixa-preta.',
      ],
      [
        'Risk-based testing guides scope, depth and priority using assessed risks. It is not the CTFL technique family identified by deriving tests from specified behavior without code structure.',
        'O teste baseado no risco orienta o âmbito, a profundidade e a prioridade usando os riscos avaliados. Não é a família de técnicas CTFL identificada pela derivação de testes do comportamento especificado sem usar a estrutura do código.',
      ],
    ],
  ),
  q(
    20,
    'FL-4.3.1',
    'K2',
    'Statement coverage',
    [
      'A suite executes all executable statements. What can we conclude?',
      'Uma bateria executa todas as instruções executáveis. O que podemos concluir?',
    ],
    [
      [
        'It has 100% statement coverage, but may miss branches',
        'Tem 100% de cobertura de instruções, mas pode omitir ramos',
      ],
      [
        'It achieves 100% branch coverage as well',
        'Atinge também 100% de cobertura de ramos',
      ],
      [
        'It covers all feasible paths through the decisions',
        'Cobre todos os caminhos viáveis através das decisões',
      ],
      [
        'It establishes the functional correctness of the executed statements',
        'Estabelece a correção funcional das instruções executadas',
      ],
    ],
    [
      'Statement coverage counts executed statements, not every possible branch.',
      'A cobertura de instruções conta instruções executadas, não todos os ramos possíveis.',
    ],
    [
      [
        'Executing every statement does not establish that both outcomes of each decision were exercised. Branch coverage subsumes statement coverage, not the reverse.',
        'Executar todas as instruções não demonstra que ambos os resultados de cada decisão foram exercitados. A cobertura de ramos engloba a de instruções, não o inverso.',
      ],
      [
        'Statement coverage does not establish coverage of every sequence of decision outcomes. A feasible path can remain untested even when all statements execute.',
        'A cobertura de instruções não demonstra cobertura de todas as sequências de resultados de decisão. Um caminho viável pode ficar por testar mesmo com todas as instruções executadas.',
      ],
      [
        'Coverage records execution, not correctness. Executed statements can still contain defects or produce results that were not checked adequately.',
        'A cobertura regista execução, não correção. As instruções executadas podem continuar a conter defeitos ou produzir resultados que não foram adequadamente verificados.',
      ],
    ],
  ),
  q(
    21,
    'FL-4.3.2',
    'K2',
    'Branch coverage',
    [
      'A decision has true and false branches. Only true is executed. What is branch coverage for these two branches?',
      'Uma decisão tem ramos verdadeiro e falso. Só o verdadeiro é executado. Qual é a cobertura destes dois ramos?',
    ],
    [
      ['50%', '50%'],
      ['100%', '100%'],
      ['0%', '0%'],
      ['25%', '25%'],
    ],
    [
      'One of two branches is covered: 1/2.',
      'Um de dois ramos está coberto: 1/2.',
    ],
    [
      ['The false branch is missing.', 'Falta o ramo falso.'],
      ['One branch was executed.', 'Um ramo foi executado.'],
      [
        'The stated scope contains two branches. Dividing the one exercised branch by four counts the denominator twice; the correct fraction is 1/2, or 50%.',
        'O âmbito indicado contém dois ramos. Dividir o ramo exercitado por quatro duplica o denominador; a fração correta é 1/2, ou 50%.',
      ],
    ],
    'calculation',
  ),
  q(
    22,
    'FL-4.4.1',
    'K2',
    'Error guessing',
    [
      'A tester selects date-parsing cases using personal knowledge of leap-day failures in similar products. Which technique best explains the basis for selecting these cases?',
      'Um testador seleciona casos de interpretação de datas usando o seu conhecimento de falhas em dias bissextos em produtos semelhantes. Que técnica melhor explica a base de seleção destes casos?',
    ],
    [
      ['Error guessing', 'Antecipação de erros'],
      ['Statement testing', 'Teste de instruções'],
      ['Exploratory testing', 'Teste exploratório'],
      ['Boundary value analysis', 'Análise de valor fronteira'],
    ],
    [
      'Prior experience guides likely defect targets.',
      'A experiência anterior orienta a procura de defeitos prováveis.',
    ],
    [
      [
        'No code coverage criterion is given.',
        'Não é indicado um critério de cobertura do código.',
      ],
      [
        'Exploratory testing combines learning, test design and execution. The described selection basis is knowledge of past failures, which specifically illustrates error guessing; the techniques can be combined in practice.',
        'O teste exploratório combina aprendizagem, conceção e execução de testes. A base de seleção descrita é o conhecimento de falhas anteriores, o que ilustra especificamente a antecipação de erros; as técnicas podem ser combinadas na prática.',
      ],
      [
        'BVA derives cases from boundaries of ordered partitions. The scenario supplies past failure knowledge as the basis, not partition boundaries from which these cases were derived.',
        'A BVA deriva casos das fronteiras de partições ordenadas. O cenário fornece conhecimento de falhas anteriores como base, não fronteiras de partições das quais tenham sido derivados estes casos.',
      ],
    ],
  ),
  q(
    23,
    'FL-4.4.2',
    'K2',
    'Exploratory testing',
    [
      'A tester learns about a new search feature while designing, executing and evaluating tests in a timeboxed session guided by a test charter. Which technique is most directly characterized by these combined activities?',
      'Um testador aprende sobre uma nova funcionalidade de pesquisa enquanto concebe, executa e avalia testes numa sessão de duração definida, orientada por uma carta de testes. Que técnica é mais diretamente caracterizada por estas atividades combinadas?',
    ],
    [
      [
        'Session-based exploratory testing',
        'Teste exploratório baseado em sessões',
      ],
      [
        'Replay of predefined test scripts without adapting them',
        'Repetição de scripts de teste predefinidos sem os adaptar',
      ],
      ['Error guessing', 'Antecipação de erros'],
      ['Checklist-based testing', 'Teste baseado em checklists'],
    ],
    [
      'Learning, design and execution inform each other.',
      'A aprendizagem, a conceção e a execução influenciam-se mutuamente.',
    ],
    [
      [
        'The tester designs and adapts tests while learning. Fixed replay does not explain that simultaneous learning, design and execution.',
        'O testador concebe e adapta testes enquanto aprende. Uma repetição fixa não explica essa aprendizagem, conceção e execução em simultâneo.',
      ],
      [
        'Error guessing selects likely defect targets using experience of errors and failures. Here the defining behavior is simultaneous learning, design and execution guided by a charter; error guessing could support, but does not replace, that exploratory approach.',
        'A antecipação de erros seleciona alvos prováveis de defeitos usando a experiência de erros e falhas. Aqui, o comportamento distintivo é a aprendizagem, a conceção e a execução simultâneas orientadas por uma carta de testes; a antecipação de erros pode apoiar, mas não substitui, essa abordagem exploratória.',
      ],
      [
        'Checklist-based testing derives tests from a list of test conditions. A charter sets session objectives; the scenario describes discovering and adapting tests during the session, not deriving them from checklist entries.',
        'O teste baseado em checklists deriva testes de uma lista de condições de teste. Uma carta de testes define objetivos da sessão; o cenário descreve descobrir e adaptar testes durante a sessão, não derivá-los de entradas de uma checklist.',
      ],
    ],
  ),
  q(
    24,
    'FL-4.5.2',
    'K2',
    'Acceptance criteria',
    [
      'A team needs an acceptance example that explicitly states the starting context, triggering action and observable expected result. Which criterion best meets that need?',
      'Uma equipa precisa de um exemplo de aceitação que explicite o contexto inicial, a ação desencadeadora e o resultado esperado observável. Que critério melhor satisfaz essa necessidade?',
    ],
    [
      [
        'Given an empty basket, when opened, then show a zero total',
        'Dado um cesto vazio, quando é aberto, então apresenta total zero',
      ],
      [
        'The basket total must equal the sum of its item prices.',
        'O total do cesto deve ser igual à soma dos preços dos seus artigos.',
      ],
      [
        'A basket with no items must have a total of zero.',
        'Um cesto sem artigos deve ter um total igual a zero.',
      ],
      [
        'When the basket opens, calculate its total by calling the pricing service',
        'Quando o cesto é aberto, calcular o total através de uma chamada ao serviço de preços',
      ],
    ],
    [
      'The criterion describes a concrete context, event and observable outcome.',
      'O critério descreve contexto, evento e resultado observável concretos.',
    ],
    [
      [
        'This is a rule-oriented criterion, not a Given/When/Then scenario.',
        'Este é um critério orientado para regras, não um cenário Dado/Quando/Então.',
      ],
      [
        'This states a rule without the explicit context/event/outcome structure.',
        'Isto apresenta uma regra sem a estrutura explícita de contexto, evento e resultado.',
      ],
      [
        'This describes an implementation action, but omits the starting basket state and the observable expected total. It is not a complete acceptance example of the requested form.',
        'Isto descreve uma ação de implementação, mas omite o estado inicial do cesto e o total esperado observável. Não é um exemplo de aceitação completo no formato solicitado.',
      ],
    ],
  ),
  q(
    25,
    'FL-4.2.1',
    'K3',
    'Equivalence partitioning',
    [
      'An integer quantity is accepted from 3 to 8 inclusive. Which smallest set covers the below-range, valid and above-range partitions?',
      'Uma quantidade inteira é aceite de 3 a 8 inclusive. Que conjunto mínimo cobre as partições abaixo do intervalo, válida e acima do intervalo?',
    ],
    [
      ['2, 5, 9', '2, 5, 9'],
      ['3, 5, 8', '3, 5, 8'],
      ['2, 9', '2, 9'],
      ['2, 3, 5', '2, 3, 5'],
    ],
    [
      'Each of the three partitions has one representative.',
      'Cada uma das três partições tem um representante.',
    ],
    [
      [
        'All three values are in the valid partition.',
        'Os três valores estão na partição válida.',
      ],
      [
        'The valid partition is not covered.',
        'A partição válida não está coberta.',
      ],
      [
        '2 covers the below-range partition; 3 and 5 both cover the valid partition. No value covers the above-range partition, so the three-value set is insufficient.',
        '2 cobre a partição abaixo do intervalo; 3 e 5 cobrem ambos a partição válida. Nenhum valor cobre a partição acima do intervalo, pelo que o conjunto de três valores é insuficiente.',
      ],
    ],
    'scenario',
  ),
  q(
    26,
    'FL-4.2.2',
    'K3',
    'Boundary values',
    [
      'An integer score from 10 to 20 inclusive is valid; all other integers are rejected. Which set gives full 2-value boundary value analysis coverage of the boundaries between the three partitions?',
      'Uma pontuação inteira de 10 a 20 inclusive é válida; todos os outros inteiros são rejeitados. Que conjunto dá cobertura completa de análise de valor fronteira de 2 valores nas fronteiras entre as três partições?',
    ],
    [
      ['9, 10, 20, 21', '9, 10, 20, 21'],
      ['10, 15, 20', '10, 15, 20'],
      ['9, 10, 19, 20', '9, 10, 19, 20'],
      ['10, 11, 20, 21', '10, 11, 20, 21'],
    ],
    [
      'The boundary pairs are 9/10 and 20/21. The four distinct coverage items are 9, 10, 20 and 21. This is 2-value BVA, not 3-value BVA.',
      'Os pares de valores fronteira são 9/10 e 20/21. Os quatro itens de cobertura distintos são 9, 10, 20 e 21. Trata-se de BVA de 2 valores, não de BVA de 3 valores.',
    ],
    [
      [
        'The neighbouring invalid values are missing.',
        'Faltam os valores inválidos vizinhos.',
      ],
      [
        'This incorrectly treats 19/20 as the upper boundary pair. Since 20 is valid, the upper pair must be 20/21; 21 is missing.',
        'Isto trata incorretamente 19/20 como o par de fronteira superior. Como 20 é válido, o par superior tem de ser 20/21; falta 21.',
      ],
      [
        'This incorrectly treats 10/11 as the lower boundary pair. Since 10 is valid, the lower pair must be 9/10; 9 is missing.',
        'Isto trata incorretamente 10/11 como o par de fronteira inferior. Como 10 é válido, o par inferior tem de ser 9/10; falta 9.',
      ],
    ],
    'scenario',
  ),
  q(
    27,
    'FL-4.2.3',
    'K3',
    'Decision tables',
    [
      'Using the decision table (T = true, F = false, X = grant free delivery), which input derives a test case for rule R1?',
      'Usando a tabela de decisão (T = verdadeiro, F = falso, X = conceder entrega gratuita), que entrada permite obter um caso de teste para a regra R1?',
    ],
    [
      ['Member = yes; total = 60', 'Membro = sim; total = 60'],
      ['Member = no; total = 60', 'Membro = não; total = 60'],
      ['Member = yes; total = 20', 'Membro = sim; total = 20'],
      ['Member = no; total = 20', 'Membro = não; total = 20'],
    ],
    [
      'Rule R1 requires membership and a total of at least 50. A member with total 60 satisfies both conditions and must receive free delivery.',
      'A regra R1 exige que o cliente seja membro e que o total seja pelo menos 50. Um membro com total 60 satisfaz ambas as condições e deve receber entrega gratuita.',
    ],
    [
      [
        'A non-member with total 60 satisfies only the total condition, which is R3, not R1.',
        'Um não membro com total 60 satisfaz apenas a condição do total, o que corresponde a R3, não a R1.',
      ],
      [
        'A member with total 20 satisfies only membership, which is R2, not R1.',
        'Um membro com total 20 satisfaz apenas a condição de ser membro, o que corresponde a R2, não a R1.',
      ],
      [
        'These inputs satisfy neither condition and exercise R4, not R1. R1 requires membership and a total of at least 50.',
        'Estas entradas não satisfazem nenhuma das condições e exercitam R4, não R1. R1 exige que o cliente seja membro e que o total seja pelo menos 50.',
      ],
    ],
    'table',
  ),
  q(
    28,
    'FL-4.2.4',
    'K3',
    'State transitions',
    [
      'An order starts Draft. Submit moves Draft to Pending; Pay moves Pending to Paid. All other event/state combinations are invalid. Which sequence reaches Paid using only valid transitions?',
      'Uma encomenda começa em Rascunho. Submeter passa para Pendente; Pagar passa de Pendente para Paga. Todas as outras combinações de evento e estado são inválidas. Que sequência chega a Paga só com transições válidas?',
    ],
    [
      ['Submit, Pay', 'Submeter, Pagar'],
      ['Pay, Submit', 'Pagar, Submeter'],
      ['Submit, Submit', 'Submeter, Submeter'],
      ['Submit, Pay, Pay', 'Submeter, Pagar, Pagar'],
    ],
    [
      'From Draft, Submit reaches Pending; Pay then reaches Paid. Both transitions are valid.',
      'A partir de Rascunho, Submeter leva a Pendente; depois Pagar leva a Paga. Ambas as transições são válidas.',
    ],
    [
      ['Pay is initially invalid.', 'Pagar é inicialmente inválido.'],
      [
        'The second Submit is invalid in Pending and the order never reaches Paid.',
        'O segundo Submeter é inválido em Pendente e a encomenda nunca chega a Paga.',
      ],
      [
        'Submit and Pay reach Paid, but the extra Pay is invalid in Paid. Reaching the target before an invalid event does not make the whole sequence valid.',
        'Submeter e Pagar levam a Paga, mas o Pagar adicional é inválido em Paga. Chegar ao destino antes de um evento inválido não torna válida a sequência completa.',
      ],
    ],
    'scenario',
  ),
  q(
    29,
    'FL-4.5.3',
    'K3',
    'ATDD',
    [
      'Before implementation, business, development and testing agree: delivery costs 5 for totals below 50 and is free for totals at least 50. Which pair of ATDD acceptance examples correctly covers both sides of that threshold?',
      'Antes da implementação, representantes de negócio, desenvolvimento e testes acordam: a entrega custa 5 para totais inferiores a 50 e é gratuita para totais de pelo menos 50. Que par de exemplos de aceitação ATDD cobre corretamente os dois lados desse limiar?',
    ],
    [
      [
        'Given total 49, when delivery is priced, then charge 5; given total 50, when delivery is priced, then charge 0.',
        'Dado um total de 49, quando se calcula a entrega, então cobrar 5; dado um total de 50, quando se calcula a entrega, então cobrar 0.',
      ],
      [
        'Given total 49, when delivery is priced, then charge 0; given total 50, when delivery is priced, then charge 0.',
        'Dado um total de 49, quando se calcula a entrega, então cobrar 0; dado um total de 50, quando se calcula a entrega, então cobrar 0.',
      ],
      [
        'Given total 49, when delivery is priced, then charge 5; given total 50, when delivery is priced, then charge 5.',
        'Dado um total de 49, quando se calcula a entrega, então cobrar 5; dado um total de 50, quando se calcula a entrega, então cobrar 5.',
      ],
      [
        'Given total 49, when delivery is priced, then charge 0; given total 50, when delivery is priced, then charge 5.',
        'Dado um total de 49, quando se calcula a entrega, então cobrar 0; dado um total de 50, quando se calcula a entrega, então cobrar 5.',
      ],
    ],
    [
      '49 is below 50 and costs 5; 50 meets the inclusive threshold and costs 0. Both acceptance examples are derived before implementation from the agreed rule.',
      '49 é inferior a 50 e implica um custo de 5; 50 satisfaz o limiar inclusivo e implica um custo de 0. Ambos os exemplos de aceitação são derivados da regra acordada antes da implementação.',
    ],
    [
      [
        'The expectation for 49 contradicts the below-threshold charge.',
        'O resultado esperado para 49 contradiz o custo aplicável abaixo do limiar.',
      ],
      [
        'The expectation for 50 wrongly excludes the inclusive threshold.',
        'O resultado esperado para 50 exclui incorretamente o limiar inclusivo.',
      ],
      [
        'Both expected results are reversed: 49 is below 50 and must cost 5; the inclusive threshold makes delivery free at 50.',
        'Ambos os resultados esperados estão invertidos: 49 é inferior a 50 e implica um custo de 5; o limiar inclusivo torna a entrega gratuita em 50.',
      ],
    ],
    'scenario',
  ),
  q(
    30,
    'FL-5.1.6',
    'K1',
    'Test pyramid',
    [
      'Which distribution is generally encouraged by a test pyramid?',
      'Que distribuição é geralmente incentivada pela pirâmide de testes?',
    ],
    [
      [
        'Many small low-level tests, fewer large end-to-end tests',
        'Muitos testes pequenos de baixo nível, menos testes grandes de ponta a ponta',
      ],
      [
        'Many large end-to-end tests, fewer isolated low-level tests',
        'Muitos testes grandes de ponta a ponta, menos testes pequenos e isolados',
      ],
      [
        'Equal numbers of tests at each level',
        'Números semelhantes de testes em todos os níveis',
      ],
      [
        'Many integration tests, fewer component and end-to-end tests',
        'Muitos testes de integração, menos testes de componente e de ponta a ponta',
      ],
    ],
    [
      'Smaller tests often give fast, focused feedback.',
      'Os testes menores dão frequentemente feedback rápido e localizado.',
    ],
    [
      [
        'This inverts the pyramid. Large end-to-end tests generally cost more time and provide less focused feedback than small isolated tests.',
        'Isto inverte a pirâmide. Os testes grandes de ponta a ponta exigem geralmente mais tempo e dão feedback menos localizado do que os testes pequenos e isolados.',
      ],
      [
        'A pyramid represents different proportions according to granularity, isolation and execution cost, not equal counts across levels.',
        'Uma pirâmide representa proporções diferentes de acordo com a granularidade, o isolamento e o custo de execução, não contagens iguais entre níveis.',
      ],
      [
        'A concentration in the middle is a different distribution. The pyramid generally has a broad base of small isolated tests and fewer larger tests above.',
        'Uma concentração no meio corresponde a uma distribuição diferente. A pirâmide tem geralmente uma base larga de testes pequenos e isolados e menos testes maiores nos níveis superiores.',
      ],
    ],
  ),
  q(
    31,
    'FL-5.1.1',
    'K2',
    'Test plan',
    [
      'A team needs a project-level document bringing together the agreed test scope, resources and approach. Which artifact addresses this need?',
      'Uma equipa precisa de um documento ao nível do projeto que reúna o âmbito, os recursos e a abordagem de teste acordados. Que artefacto responde a esta necessidade?',
    ],
    [
      ['Test plan', 'Plano de testes'],
      ['Test policy', 'Política de testes'],
      ['Test execution schedule', 'Cronograma de execução de testes'],
      ['Test completion report', 'Relatório de conclusão do teste'],
    ],
    [
      'A test plan communicates project-specific test objectives, scope, resources and processes. It brings these agreements together; a policy, execution schedule or completion report has a different purpose.',
      'Um plano de testes comunica objetivos, âmbito, recursos e processos de teste específicos do projeto. Reúne esses acordos; uma política, um cronograma de execução ou um relatório de conclusão têm finalidades diferentes.',
    ],
    [
      [
        'A policy provides organizational direction. The project test plan communicates the specific scope, resources and approach for this testing effort.',
        'Uma política fornece orientação organizacional. O plano de testes do projeto comunica o âmbito, os recursos e a abordagem específicos deste esforço de teste.',
      ],
      [
        'An execution schedule arranges test runs and dependencies. It does not bring together the project test objectives, scope, resources and approach as a test plan does.',
        'Um cronograma de execução organiza execuções e dependências. Não reúne os objetivos, o âmbito, os recursos e a abordagem de teste do projeto como um plano de testes.',
      ],
      [
        'A completion report summarizes the outcomes of completed testing. It is not the planning document used to agree how the project testing will be organized.',
        'Um relatório de conclusão resume os resultados dos testes concluídos. Não é o documento de planeamento usado para acordar como serão organizados os testes do projeto.',
      ],
    ],
  ),
  q(
    32,
    'FL-5.1.3',
    'K2',
    'Entry and exit',
    [
      'A team requires an available test environment before system testing starts and stakeholder acceptance of the residual risk before declaring testing complete. How are these classified?',
      'Uma equipa exige a disponibilidade do ambiente de teste antes de iniciar o teste de sistema e a aceitação do risco residual pelos stakeholders antes de declarar os testes concluídos. Como se classificam estes critérios?',
    ],
    [
      [
        'Entry criterion, then exit criterion',
        'Critério de entrada, depois critério de saída',
      ],
      [
        'Exit criterion, then entry criterion',
        'Critério de saída, depois critério de entrada',
      ],
      ['Both are entry criteria', 'Ambos são critérios de entrada'],
      ['Both are exit criteria', 'Ambos são critérios de saída'],
    ],
    [
      'Entry supports starting; exit supports deciding completion.',
      'A entrada apoia o início; a saída apoia a decisão de conclusão.',
    ],
    [
      ['The order is reversed.', 'A ordem está invertida.'],
      [
        'Environment availability is a precondition for starting, but accepted residual risk is specified here as a condition for declaring testing complete.',
        'A disponibilidade do ambiente é uma pré-condição para começar, mas o risco residual aceite é aqui especificado como condição para declarar os testes concluídos.',
      ],
      [
        'The first condition must be met before system testing starts, so it is an entry criterion. The second supports the completion decision.',
        'A primeira condição tem de ser satisfeita antes de começar o teste de sistema, pelo que é um critério de entrada. A segunda apoia a decisão de conclusão.',
      ],
    ],
  ),
  q(
    33,
    'FL-5.2.2',
    'K2',
    'Risk types',
    [
      'Which possibility is a product risk rather than a project risk?',
      'Qual das seguintes possibilidades é um risco de produto em vez de um risco de projeto?',
    ],
    [
      [
        'An invoice calculates the wrong tax',
        'Uma fatura calcula imposto incorreto',
      ],
      ['A tester leaves the team', 'Um testador sai da equipa'],
      [
        'A test environment arrives late',
        'Um ambiente de teste chega atrasado',
      ],
      [
        'A test-tool supplier misses the agreed delivery date',
        'Um fornecedor de uma ferramenta de teste falha a data de entrega acordada',
      ],
    ],
    [
      'Wrong tax threatens product quality.',
      'Imposto incorreto ameaça a qualidade do produto.',
    ],
    [
      [
        'Staff availability threatens project delivery.',
        'A disponibilidade da equipa ameaça a entrega do projeto.',
      ],
      [
        'A late environment threatens the project schedule.',
        'Um ambiente atrasado ameaça o calendário do projeto.',
      ],
      [
        "A supplier delivery delay threatens the project schedule and resources. Incorrect tax calculation concerns the product's functional quality.",
        'Um atraso de entrega do fornecedor ameaça o calendário e os recursos do projeto. Um cálculo fiscal incorreto diz respeito à qualidade funcional do produto.',
      ],
    ],
  ),
  q(
    34,
    'FL-5.2.3',
    'K2',
    'Risk-based testing',
    [
      'Incorrect transfers and a cosmetic alignment issue have comparable estimated likelihood, but incorrect transfers have much higher impact. Which choice best bases test effort on the assessed product risk?',
      'Transferências incorretas e um desalinhamento visual têm probabilidades estimadas comparáveis, mas as transferências incorretas têm impacto muito superior. Que escolha baseia melhor o esforço de teste no risco de produto avaliado?',
    ],
    [
      [
        'Allocate deeper testing to transfers, considering their likelihood and impact',
        'Atribuir testes mais aprofundados às transferências, considerando a probabilidade e o impacto',
      ],
      [
        'Prioritize the visual issue because users notice it immediately',
        'Dar prioridade ao problema visual porque os utilizadores o notam imediatamente',
      ],
      [
        'Prioritize the visual issue because it is quicker to verify',
        'Dar prioridade ao problema visual porque é mais rápido de verificar',
      ],
      [
        'Treat comparable likelihood as comparable risk and split effort equally',
        'Tratar probabilidades comparáveis como riscos comparáveis e dividir o esforço igualmente',
      ],
    ],
    [
      'Risk analysis guides effort and scope; both impact and likelihood matter.',
      'A análise de risco orienta esforço e âmbito; impacto e probabilidade contam.',
    ],
    [
      [
        'Visibility alone is not the assessed risk level. With comparable likelihood, the much higher impact of incorrect transfers calls for deeper testing.',
        'A visibilidade, por si só, não é o nível de risco avaliado. Com probabilidades comparáveis, o impacto muito superior das transferências incorretas exige testes mais aprofundados.',
      ],
      [
        'Execution speed can affect scheduling, but it does not outweigh the stated higher product risk when deciding test thoroughness.',
        'A rapidez de execução pode afetar o planeamento, mas não se sobrepõe ao risco de produto superior indicado ao decidir a profundidade dos testes.',
      ],
      [
        'Risk level considers both likelihood and impact. Comparable likelihood does not imply comparable risk when the impacts differ substantially.',
        'O nível de risco considera a probabilidade e o impacto. Probabilidades comparáveis não implicam riscos comparáveis quando os impactos diferem substancialmente.',
      ],
    ],
  ),
  q(
    35,
    'FL-5.4.1',
    'K2',
    'Configuration management',
    [
      'A failure occurs only in build 82 with dataset C. What best supports reproducing the configuration of that observed test result?',
      'Uma falha ocorre apenas na versão 82 com o conjunto de dados C. O que melhor apoia a reprodução da configuração desse resultado de teste observado?',
    ],
    [
      [
        'Identify and preserve versions of build, tests and data',
        'Identificar e preservar versões do software, testes e dados',
      ],
      [
        'Overwrite the data with the latest version',
        'Substituir os dados pela versão mais recente',
      ],
      [
        'Preserve build 82 and dataset C, but omit the version of the tests used',
        'Preservar a versão 82 e o conjunto de dados C, mas omitir a versão dos testes usados',
      ],
      [
        'Preserve dataset C, but reproduce the result using the latest build',
        'Preservar o conjunto de dados C, mas reproduzir o resultado com a versão mais recente do software',
      ],
    ],
    [
      'Configuration identification supports reproducible testing.',
      'A identificação da configuração apoia testes reproduzíveis.',
    ],
    [
      [
        'Overwriting may lose the triggering conditions.',
        'A substituição pode perder as condições que provocam a falha.',
      ],
      [
        'Test versions are part of the configuration too: changed steps or checks may change the result. Preserving only software and data leaves the baseline incomplete.',
        'As versões dos testes também fazem parte da configuração: alterações nos passos ou nas verificações podem alterar o resultado. Preservar apenas software e dados deixa a baseline incompleta.',
      ],
      [
        'A later build is not the observed build 82 configuration. It may be useful for confirmation testing, but does not preserve the original reproduction baseline.',
        'Uma versão posterior não corresponde à configuração observada da versão 82. Pode ser útil para testes de confirmação, mas não preserva a baseline original de reprodução.',
      ],
    ],
  ),
  q(
    36,
    'FL-5.1.4',
    'K3',
    'Estimation',
    [
      'Using three-point estimation (optimistic + 4 × most likely + pessimistic) / 6, the estimates are 2, 5 and 14 person-hours respectively. What is the weighted estimate?',
      'Usando a estimativa de três pontos (otimista + 4 × mais provável + pessimista) / 6, as estimativas são, respetivamente, 2, 5 e 14 pessoas-hora. Qual é a estimativa ponderada?',
    ],
    [
      ['6 person-hours', '6 pessoas-hora'],
      ['7 person-hours', '7 pessoas-hora'],
      ['14 person-hours', '14 pessoas-hora'],
      ['5 person-hours', '5 pessoas-hora'],
    ],
    [
      '(2 + 4 × 5 + 14) / 6 = 36 / 6 = 6 person-hours.',
      '(2 + 4 × 5 + 14) / 6 = 36 / 6 = 6 pessoas-hora.',
    ],
    [
      [
        '7 is the unweighted mean (2 + 5 + 14) / 3; it omits the required weighting.',
        '7 é a média não ponderada (2 + 5 + 14) / 3; omite a ponderação exigida.',
      ],
      [
        '14 is the pessimistic estimate alone, not the weighted estimate.',
        '14 é apenas a estimativa pessimista, não a estimativa ponderada.',
      ],
      [
        '5 is the most likely estimate alone. Applying the required weights gives (2 + 4 × 5 + 14) / 6 = 6, not 5.',
        '5 é apenas a estimativa mais provável. Aplicar os pesos exigidos dá (2 + 4 × 5 + 14) / 6 = 6, não 5.',
      ],
    ],
    'calculation',
  ),
  q(
    37,
    'FL-5.1.5',
    'K3',
    'Prioritization',
    [
      'Risk priority is A before B before C, but A requires C to run first. B is independent. Which order respects the dependency and runs the highest-risk available test first?',
      'A prioridade de risco é A antes de B antes de C, mas A exige executar C primeiro. B é independente. Que ordem respeita a dependência e executa primeiro o teste disponível de maior risco?',
    ],
    [
      ['B, C, A', 'B, C, A'],
      ['A, B, C', 'A, B, C'],
      ['C, A, B', 'C, A, B'],
      ['B, A, C', 'B, A, C'],
    ],
    [
      'Initially only B and C are available; B has higher risk. C then enables A.',
      'Inicialmente só B e C estão disponíveis; B tem risco maior. Depois C permite A.',
    ],
    [
      ['A cannot run before C.', 'A não pode ser executado antes de C.'],
      [
        'This runs lower-risk C while higher-risk B is available.',
        'Isto executa C de menor risco quando B de maior risco está disponível.',
      ],
      [
        'B is correctly chosen first, but A is still blocked until C runs. After B, execute C and then A.',
        'B é corretamente escolhido primeiro, mas A continua bloqueado até executar C. Após B, executar C e depois A.',
      ],
    ],
    'scenario',
  ),
  q(
    38,
    'FL-5.5.1',
    'K3',
    'Defect reports',
    [
      'In QA, build 82: an authorised test user enters valid synthetic invoice INV-7 with total 25 and selects Save. The requirement expects HTTP 201 and a new invoice ID; the observed result is HTTP 500 and no saved invoice. Log request r17 is available. Which prepared report accurately records the evidence for reproduction?',
      'No ambiente QA, versão 82: um utilizador de teste autorizado introduz a fatura sintética válida INV-7, com total 25, e seleciona Guardar. O requisito prevê HTTP 201 e um novo identificador de fatura; o resultado obtido é HTTP 500 e nenhuma fatura guardada. Está disponível o registo do pedido r17. Que relatório preparado regista corretamente a evidência para reprodução?',
    ],
    [
      [
        'QA / build 82; authorised user; INV-7, total 25; select Save; expected: 201 and invoice ID; actual: 500, no saved invoice; attach r17.',
        'QA / versão 82; utilizador autorizado; INV-7, total 25; selecionar Guardar; esperado: 201 e identificador; obtido: 500, sem fatura guardada; anexar r17.',
      ],
      [
        'QA / build 82; authorised user; INV-7, total 25; select Save; expected: 500, no saved invoice; actual: 201 and invoice ID; attach r17.',
        'QA / versão 82; utilizador autorizado; INV-7, total 25; selecionar Guardar; esperado: 500, sem fatura guardada; obtido: 201 e identificador; anexar r17.',
      ],
      [
        'Production / build 81; authorised user; INV-7, total 25; select Save; expected: 201 and invoice ID; actual: 500, no saved invoice; attach r17.',
        'Produção / versão 81; utilizador autorizado; INV-7, total 25; selecionar Guardar; esperado: 201 e identificador; obtido: 500, sem fatura guardada; anexar r17.',
      ],
      [
        'QA / build 82; authorised user; INV-7, total 25; select Save; expected: 201 and invoice ID; actual: 500, no saved invoice; confirmed cause: database deadlock; attach r17.',
        'QA / versão 82; utilizador autorizado; INV-7, total 25; selecionar Guardar; esperado: 201 e identificador; obtido: 500, sem fatura guardada; causa confirmada: bloqueio mútuo na base de dados; anexar r17.',
      ],
    ],
    [
      'This report applies the given environment, preconditions, data, steps and expected/actual outcomes without inventing a cause.',
      'Este relatório aplica o ambiente, as pré-condições, os dados, os passos e os resultados esperados e obtidos fornecidos, sem inventar uma causa.',
    ],
    [
      [
        'This reverses the specified expected result and observed actual result.',
        'Isto inverte o resultado esperado especificado e o resultado obtido observado.',
      ],
      [
        'This changes the observed environment and build, making the reproduction context inaccurate.',
        'Isto altera o ambiente e a versão observados, tornando incorreto o contexto de reprodução.',
      ],
      [
        'The scenario supplies symptoms and a log reference, but no evidence confirming a database deadlock. Recording a confirmed cause invents a diagnosis beyond the observed evidence.',
        'O cenário fornece sintomas e uma referência de registo, mas nenhuma evidência que confirme um bloqueio mútuo na base de dados. Registar uma causa confirmada inventa um diagnóstico para além da evidência observada.',
      ],
    ],
    'scenario',
  ),
  q(
    39,
    'FL-6.1.1',
    'K2',
    'Tools',
    [
      'A team must generate thousands of simultaneous requests against a test environment and measure response latency under that generated load. Which tool fits best?',
      'Uma equipa tem de gerar milhares de pedidos simultâneos contra um ambiente de teste e medir a latência de resposta sob essa carga gerada. Que ferramenta é mais adequada?',
    ],
    [
      ['Load testing tool', 'Ferramenta de teste de carga'],
      ['Static analysis tool', 'Ferramenta de análise estática'],
      [
        'Application monitoring tool',
        'Ferramenta de monitorização de aplicações',
      ],
      ['Test management tool', 'Ferramenta de gestão de testes'],
    ],
    [
      'Load tools generate traffic and measure performance.',
      'As ferramentas de carga geram tráfego e medem desempenho.',
    ],
    [
      [
        'Static analysis examines code without executing the service. It does not generate the requested concurrent traffic or measure latency under that traffic.',
        'A análise estática examina código sem executar o serviço. Não gera o tráfego concorrente solicitado nem mede a latência sob esse tráfego.',
      ],
      [
        'Monitoring can observe latency from existing traffic, but the requirement includes actively generating controlled concurrent requests against a test environment.',
        'A monitorização pode observar a latência do tráfego existente, mas o requisito inclui gerar ativamente pedidos concorrentes controlados contra um ambiente de teste.',
      ],
      [
        'Test management organizes plans, cases and results. Its primary role is not generating concurrent service load and measuring runtime performance.',
        'A gestão de testes organiza planos, casos e resultados. A sua função principal não é gerar carga concorrente num serviço nem medir o desempenho em execução.',
      ],
    ],
  ),
  q(
    40,
    'FL-6.2.1',
    'K1',
    'Automation',
    [
      'A team is planning test automation. Which issue should be recorded as a risk rather than an expected benefit?',
      'Uma equipa está a planear a automação de testes. Que questão deve ser registada como risco em vez de benefício esperado?',
    ],
    [
      [
        'Underestimating the effort to maintain automated test scripts',
        'Subestimar o esforço necessário para manter os scripts de teste automatizados',
      ],
      [
        'Reducing repetitive manual test execution effort',
        'Reduzir o esforço de execução manual repetitiva de testes',
      ],
      [
        'Improving the repeatability of test execution',
        'Melhorar a repetibilidade da execução de testes',
      ],
      [
        'Obtaining tool-supported coverage metrics that would be difficult to collect by hand',
        'Obter, com apoio de ferramentas, métricas de cobertura difíceis de recolher manualmente',
      ],
    ],
    [
      'Maintenance costs must be considered.',
      'Os custos de manutenção têm de ser considerados.',
    ],
    [
      [
        'Reducing repetitive manual work is a potential benefit of automation. The risk is failing to budget realistically for introduction and maintenance effort.',
        'Reduzir trabalho manual repetitivo é um benefício potencial da automação. O risco é não prever realisticamente o esforço de introdução e manutenção.',
      ],
      [
        'Consistent, repeatable execution is a potential benefit. It does not eliminate the need to maintain scripts as the product changes.',
        'Uma execução consistente e repetível é um benefício potencial. Não elimina a necessidade de manter os scripts à medida que o produto muda.',
      ],
      [
        'Tool-supported measurement can be a benefit. Underestimating the effort needed to keep automated tests and tools useful is the risk identified here.',
        'A medição apoiada por ferramentas pode ser um benefício. Subestimar o esforço necessário para manter úteis os testes automatizados e as ferramentas é o risco aqui identificado.',
      ],
    ],
  ),
];
questions[26].table = {
  headers: ['Condition / action · Condição / ação', 'R1', 'R2', 'R3', 'R4'],
  rows: [
    ['Member? / Membro?', 'T', 'T', 'F', 'F'],
    ['Total ≥ 50?', 'T', 'F', 'T', 'F'],
    ['Free delivery? / Entrega gratuita?', 'X', '', '', ''],
  ],
};
// A genuine two-answer item, rather than partial-credit scoring.
questions[0] = {
  ...questions[0],
  type: 'multiple',
  required: 2,
  text: t([
    'Select TWO useful testing objectives.',
    'Selecione DOIS objetivos úteis dos testes.',
  ]),
  options: [
    ...questions[0].options,
    {
      id: 'o4',
      text: t([
        'Find defects in work products',
        'Encontrar defeitos em produtos de trabalho',
      ]),
      explanation: t([
        'Finding flaws is a testing objective.',
        'Encontrar imperfeições é um objetivo dos testes.',
      ]),
    },
  ],
  correct: ['o1', 'o4'],
};

// Phase 3 additions: no existing question or option identity is replaced.
questions.push(...blueprintQuestions);

// Phase 4: one original item for each previously uncovered objective.
questions.push(...syllabusQuestions);

// Scoped maintenance reviews; original phase-2 review records remain historical.
// Replace items so imported addition objects remain reusable during module reloads.
for (const review of bilingualReviews) {
  const index = questions.findIndex((q) => q.id === review.id);
  const item = questions[index];
  if (!item?.academicReview || item.version !== review.previousVersion)
    throw new Error(`Incompatible bilingual review: ${review.id}`);
  questions[index] = {
    ...item,
    version: review.version,
    academicReview: {
      ...item.academicReview,
      reviewedAt: review.reviewedAt,
      report: review.report,
    },
  };
}

// Phase 5A adds candidates without revising any of the original 66 items.
questions.push(...variabilityQuestions);

// Phase 5B: original option IDs/keys retained; earlier editorial records remain historical.
const qualityRevisionIds = [
  'tl-002',
  'tl-003',
  'tl-004',
  'tl-005',
  'tl-006',
  'tl-007',
  'tl-008',
  'tl-009',
  'tl-010',
  'tl-011',
  'tl-012',
  'tl-013',
  'tl-014',
  'tl-015',
  'tl-016',
  'tl-017',
  'tl-018',
  'tl-019',
  'tl-020',
  'tl-021',
  'tl-022',
  'tl-023',
  'tl-024',
  'tl-025',
  'tl-026',
  'tl-027',
  'tl-028',
  'tl-029',
  'tl-030',
  'tl-031',
  'tl-032',
  'tl-033',
  'tl-034',
  'tl-035',
  'tl-036',
  'tl-037',
  'tl-038',
  'tl-039',
  'tl-040',
];
for (const id of qualityRevisionIds) {
  const index = questions.findIndex((q) => q.id === id);
  const item = questions[index];
  if (!item?.academicReview || item.options.length !== 4)
    throw new Error('Incompatible quality review: ' + id);
  questions[index] = {
    ...item,
    version: item.version + 1,
    humanApproval: 'PENDING',
    academicReview: {
      ...item.academicReview,
      reviewedAt: '2026-10-28',
      report: 'docs/academic-audit.md#fase-5b--' + id,
    },
  };
}
