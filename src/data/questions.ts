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
  choices: [Pair, Pair, Pair],
  reason: Pair,
  wrong: [Pair, Pair],
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
    ],
    [
      'QA improves processes to help prevent defects.',
      'A garantia da qualidade melhora processos para ajudar a prevenir defeitos.',
    ],
    [
      ['Execution evaluates the product.', 'A execução avalia o produto.'],
      [
        'This reports a product problem.',
        'Isto reporta um problema do produto.',
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
      ['Locating and repairing the cause', 'Localizar e corrigir a causa'],
      [
        'Compare the actual and expected results while executing a new test',
        'Comparar os resultados obtidos e esperados durante a execução de um novo teste',
      ],
      [
        'Running a confirmation test after the fix',
        'Executar um teste de confirmação após a correção',
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
      ['A human error', 'Um erro humano'],
      ['An observed failure', 'Uma falha observada'],
    ],
    [
      'The formula is a flaw in a work product.',
      'A fórmula é uma imperfeição num produto de trabalho.',
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
    ],
    'scenario',
  ),
  q(
    5,
    'FL-1.3.1',
    'K2',
    'Testing principles',
    [
      'The same regression tests stop finding new defects. What is the best response?',
      'Os mesmos testes de regressão deixam de encontrar novos defeitos. Qual é a melhor resposta?',
    ],
    [
      ['Review and vary tests and data', 'Rever e variar testes e dados'],
      ['Declare the product defect-free', 'Declarar o produto sem defeitos'],
      ['Stop all regression testing', 'Parar todos os testes de regressão'],
    ],
    [
      'Tests can wear out; refresh them while retaining useful checks.',
      'Os testes podem perder eficácia; devem ser renovados mantendo verificações úteis.',
    ],
    [
      [
        'A clean test run is not proof of absence.',
        'Uma execução sem falhas não prova ausência de defeitos.',
      ],
      [
        'Existing checks still detect regressions.',
        'As verificações existentes ainda detetam regressões.',
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
        'Identify tests affected by the change',
        'Identificam testes afetados pela alteração',
      ],
      [
        'Automatically repair every affected test',
        'Corrigem automaticamente todos os testes afetados',
      ],
      [
        'Remove the need for impact analysis',
        'Eliminam a necessidade de análise de impacto',
      ],
    ],
    [
      'Traceability supports change impact analysis.',
      'A rastreabilidade apoia a análise de impacto das alterações.',
    ],
    [
      ['Links do not rewrite tests.', 'As ligações não reescrevem testes.'],
      [
        'Links supply evidence for the analysis.',
        'As ligações fornecem evidência para a análise.',
      ],
    ],
  ),
  q(
    8,
    'FL-1.5.3',
    'K2',
    'Independence',
    [
      'Why involve someone other than the author in testing?',
      'Porquê envolver alguém além do autor nos testes?',
    ],
    [
      [
        'Different perspectives may challenge assumptions',
        'Perspetivas diferentes podem questionar pressupostos',
      ],
      [
        'The author no longer has quality responsibility',
        'O autor deixa de ter responsabilidade pela qualidade',
      ],
      [
        'Independent testers never miss defects',
        'Testadores independentes nunca deixam passar defeitos',
      ],
    ],
    [
      'Different backgrounds expose different assumptions.',
      'Experiências distintas revelam pressupostos diferentes.',
    ],
    [
      [
        'Quality remains a shared responsibility.',
        'A qualidade continua a ser responsabilidade partilhada.',
      ],
      [
        'All testers can miss defects.',
        'Todos os testadores podem deixar passar defeitos.',
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
        'Start test analysis alongside related development work',
        'Iniciar a análise de teste em paralelo com o trabalho de desenvolvimento relacionado',
      ],
      [
        'Wait for deployment before any testing',
        'Esperar pela instalação antes de qualquer teste',
      ],
      ['Use only one test level', 'Usar apenas um nível de teste'],
    ],
    [
      'Early corresponding test activities support feedback.',
      'Atividades de teste correspondentes e precoces apoiam o feedback.',
    ],
    [
      [
        'Static testing can start earlier.',
        'Os testes estáticos podem começar antes.',
      ],
      [
        'Different levels address different objectives.',
        'Níveis diferentes abordam objetivos diferentes.',
      ],
    ],
  ),
  q(
    10,
    'FL-2.1.3',
    'K1',
    'Test first',
    [
      'Which approach writes component tests before the corresponding implementation?',
      'Que abordagem escreve testes de componente antes da implementação correspondente?',
    ],
    [
      [
        'Test-driven development (TDD)',
        'Desenvolvimento orientado para testes (TDD)',
      ],
      ['Testing only after release', 'Testar apenas após a entrega'],
      ['Production monitoring alone', 'Apenas monitorização em produção'],
    ],
    [
      'TDD uses tests to guide small implementation steps.',
      'O TDD usa testes para orientar pequenos passos de implementação.',
    ],
    [
      ['This is not test first.', 'Isto não é uma abordagem test first.'],
      [
        'Monitoring does not prescribe test-first development.',
        'A monitorização não prescreve desenvolvimento test first.',
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
      ['Both are only confirmation', 'Ambos são apenas confirmação'],
    ],
    [
      'Confirmation verifies the fix; regression checks adverse effects elsewhere.',
      'A confirmação verifica a correção; a regressão procura efeitos adversos noutras áreas.',
    ],
    [
      ['The order is reversed.', 'A ordem está invertida.'],
      [
        'Unchanged flows are regression checks.',
        'Os fluxos não alterados são verificações de regressão.',
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
      ['Eliminating later testing', 'Eliminar os testes posteriores'],
      ['Production-only testing', 'Testar apenas em produção'],
    ],
    [
      'Earlier evaluation gives earlier feedback.',
      'A avaliação antecipada permite feedback mais cedo.',
    ],
    [
      [
        'Earlier tests complement later tests.',
        'Os testes antecipados complementam os posteriores.',
      ],
      [
        'The review occurs before implementation.',
        'A revisão ocorre antes da implementação.',
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
        'Migration can affect data and existing behaviour',
        'A migração pode afetar dados e comportamento existente',
      ],
      [
        'Only new features ever need tests',
        'Só as novas funcionalidades precisam de testes',
      ],
      [
        'Infrastructure changes cannot affect software',
        'Alterações de infraestrutura não afetam o software',
      ],
    ],
    [
      'Environment migration is a maintenance-testing trigger.',
      'A migração do ambiente é um motivo para testes de manutenção.',
    ],
    [
      [
        'Existing features can regress.',
        'As funcionalidades existentes podem sofrer regressões.',
      ],
      [
        'Dependencies can alter behaviour.',
        'As dependências podem alterar o comportamento.',
      ],
    ],
  ),
  q(
    15,
    'FL-3.1.1',
    'K1',
    'Static work products',
    [
      'Which work product can be reviewed without executing software?',
      'Que produto de trabalho pode ser revisto sem executar software?',
    ],
    [
      ['A requirements document', 'Um documento de requisitos'],
      [
        'Only a running server response',
        'Apenas uma resposta de servidor em execução',
      ],
      [
        'Only a deployed binary under load',
        'Apenas um binário instalado sob carga',
      ],
    ],
    [
      'Requirements can be inspected directly.',
      'Os requisitos podem ser inspecionados diretamente.',
    ],
    [
      [
        'A running response requires execution.',
        'Uma resposta em execução exige execução.',
      ],
      [
        'Load execution is dynamic testing.',
        'A execução sob carga é teste dinâmico.',
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
    ],
    [
      'The moderator facilitates the review.',
      'O moderador facilita a revisão.',
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
        'Both required executing the application',
        'Ambos exigiram executar a aplicação',
      ],
      [
        'Only the displayed date can indicate a problem',
        'Só a data apresentada pode indicar um problema',
      ],
    ],
    [
      'Review can find flaws without execution; execution exposes failures.',
      'A revisão pode encontrar imperfeições sem execução; a execução revela falhas.',
    ],
    [
      ['Review does not require execution.', 'A revisão não exige execução.'],
      [
        'Contradictory requirements are also a problem.',
        'Requisitos contraditórios também são um problema.',
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
    ],
    [
      'Inspection has a formal process and metrics.',
      'A inspeção tem um processo formal e métricas.',
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
      [
        'Only experience-based techniques',
        'Apenas técnicas baseadas na experiência',
      ],
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
        'Experience is not the stated basis.',
        'A experiência não é a base indicada.',
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
        'It necessarily covers every branch',
        'Cobre necessariamente todos os ramos',
      ],
      [
        'It proves every requirement is correct',
        'Prova que todos os requisitos estão corretos',
      ],
    ],
    [
      'Statement coverage counts executed statements, not every possible branch.',
      'A cobertura de instruções conta instruções executadas, não todos os ramos possíveis.',
    ],
    [
      [
        'A decision outcome can be missed despite executing every statement.',
        'Um resultado de decisão pode ser omitido apesar de executar todas as instruções.',
      ],
      [
        'Structural coverage does not prove requirement correctness.',
        'A cobertura estrutural não prova a correção dos requisitos.',
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
    ],
    [
      'One of two branches is covered: 1/2.',
      'Um de dois ramos está coberto: 1/2.',
    ],
    [
      ['The false branch is missing.', 'Falta o ramo falso.'],
      ['One branch was executed.', 'Um ramo foi executado.'],
    ],
    'calculation',
  ),
  q(
    22,
    'FL-4.4.1',
    'K2',
    'Error guessing',
    [
      'A tester targets date parsing because similar products failed on leap days. Which technique is used?',
      'Um testador foca a interpretação de datas porque produtos semelhantes falharam em dias bissextos. Que técnica usa?',
    ],
    [
      ['Error guessing', 'Antecipação de erros'],
      ['Statement testing', 'Teste de instruções'],
      ['Exhaustive testing', 'Teste exaustivo'],
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
        'Only selected risk areas are targeted.',
        'Só são visadas áreas de risco selecionadas.',
      ],
    ],
  ),
  q(
    23,
    'FL-4.4.2',
    'K2',
    'Exploratory testing',
    [
      'A tester learns about a new search feature while designing, executing and evaluating tests in a timeboxed session guided by a test charter. Which technique fits?',
      'Um testador aprende sobre uma nova funcionalidade de pesquisa enquanto concebe, executa e avalia testes numa sessão de duração definida, orientada por uma carta de testes. Que técnica está a utilizar?',
    ],
    [
      ['Exploratory testing', 'Teste exploratório'],
      ['Only scripted replay', 'Apenas repetição de scripts de teste'],
      ['Only static analysis', 'Apenas análise estática'],
    ],
    [
      'Learning, design and execution inform each other.',
      'A aprendizagem, a conceção e a execução influenciam-se mutuamente.',
    ],
    [
      [
        'The tester adapts tests while learning.',
        'O testador adapta os testes enquanto aprende.',
      ],
      ['The scenario includes execution.', 'O cenário inclui execução.'],
    ],
  ),
  q(
    24,
    'FL-4.5.2',
    'K2',
    'Acceptance criteria',
    [
      'Which criterion uses scenario-oriented Given/When/Then structure?',
      'Que critério usa a estrutura de cenário Dado/Quando/Então?',
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
      ['8, 12, 18, 23', '8, 12, 18, 23'],
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
        'These are not the boundary pairs.',
        'Estes não são os pares de fronteira.',
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
    ],
    [
      'Rule R1 requires membership and a total of at least 50. A member with total 60 satisfies both conditions and must receive free delivery.',
      'A regra R1 exige que o cliente seja membro e que o total seja pelo menos 50. Um membro com total 60 satisfaz ambas as condições e deve receber entrega gratuita.',
    ],
    [
      ['Membership is required.', 'É necessário ser membro.'],
      ['The total must be at least 50.', 'O total tem de ser pelo menos 50.'],
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
        'Only UI end-to-end tests',
        'Apenas testes de interface de ponta a ponta',
      ],
      [
        'An equal mandatory number at every level',
        'Um número igual obrigatório em todos os níveis',
      ],
    ],
    [
      'Smaller tests often give fast, focused feedback.',
      'Os testes menores dão frequentemente feedback rápido e localizado.',
    ],
    [
      [
        'Only large tests tend to slow diagnosis and feedback.',
        'Apenas testes grandes tendem a atrasar o diagnóstico e o feedback.',
      ],
      [
        'The pyramid is a model, not an equal-count rule.',
        'A pirâmide é um modelo, não uma regra de contagem igual.',
      ],
    ],
  ),
  q(
    31,
    'FL-5.1.1',
    'K2',
    'Test plan',
    [
      'A team needs agreement on test scope, resources and approach. Which artifact addresses this?',
      'Uma equipa precisa de acordar âmbito, recursos e abordagem de teste. Que artefacto responde a isto?',
    ],
    [
      ['A test plan', 'Um plano de testes'],
      ['One defect report', 'Um relatório de defeito'],
      ['Only an execution log', 'Apenas um registo de execução'],
    ],
    [
      'A test plan communicates how testing will be organised.',
      'Um plano de testes comunica como os testes serão organizados.',
    ],
    [
      [
        'A defect report describes a specific anomaly.',
        'Um relatório de defeito descreve uma anomalia específica.',
      ],
      [
        'A log records events rather than agreeing the approach.',
        'Um registo documenta eventos em vez de acordar a abordagem.',
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
      ['Both are test data', 'Ambos são dados de teste'],
    ],
    [
      'Entry supports starting; exit supports deciding completion.',
      'A entrada apoia o início; a saída apoia a decisão de conclusão.',
    ],
    [
      ['The order is reversed.', 'A ordem está invertida.'],
      [
        'These are conditions for activities, not input values.',
        'São condições para atividades, não valores de entrada.',
      ],
    ],
  ),
  q(
    33,
    'FL-5.2.2',
    'K2',
    'Risk types',
    [
      'Which is a product risk rather than a project risk?',
      'Qual é um risco de produto em vez de risco de projeto?',
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
    ],
  ),
  q(
    34,
    'FL-5.2.3',
    'K2',
    'Risk-based testing',
    [
      'Incorrect transfers have much higher impact than a cosmetic alignment issue. How should this influence testing?',
      'Transferências incorretas têm impacto muito superior a um desalinhamento visual. Como deve isto influenciar os testes?',
    ],
    [
      [
        'Allocate deeper testing to transfers, considering likelihood too',
        'Atribuir testes mais aprofundados às transferências, considerando também a probabilidade',
      ],
      [
        'Always spend equal effort on both',
        'Gastar sempre esforço igual em ambos',
      ],
      [
        'Ignore all visual tests automatically',
        'Ignorar automaticamente todos os testes visuais',
      ],
    ],
    [
      'Risk analysis guides effort and scope; both impact and likelihood matter.',
      'A análise de risco orienta esforço e âmbito; impacto e probabilidade contam.',
    ],
    [
      [
        'Equal effort ignores differing risks.',
        'Esforço igual ignora riscos diferentes.',
      ],
      [
        'Lower risk does not automatically mean no testing.',
        'Risco menor não implica automaticamente ausência de testes.',
      ],
    ],
  ),
  q(
    35,
    'FL-5.4.1',
    'K2',
    'Configuration management',
    [
      'A failure occurs only in build 82 with dataset C. What helps reproduce it?',
      'Uma falha ocorre apenas na versão 82 com o conjunto de dados C. O que ajuda a reproduzi-la?',
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
      ['Record only the tester name', 'Registar apenas o nome do testador'],
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
        'A name does not identify the tested configuration.',
        'Um nome não identifica a configuração testada.',
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
    ],
    'scenario',
  ),
  q(
    39,
    'FL-6.1.1',
    'K2',
    'Tools',
    [
      'A team needs to simulate thousands of simultaneous requests and measure response latency. Which tool fits best?',
      'Uma equipa precisa de simular milhares de pedidos simultâneos e medir a latência. Que ferramenta é mais adequada?',
    ],
    [
      ['A load-testing tool', 'Uma ferramenta de teste de carga'],
      ['A spelling checker', 'Um corretor ortográfico'],
      [
        'A review checklist alone',
        'Apenas uma lista de verificação de revisão',
      ],
    ],
    [
      'Load tools generate traffic and measure performance.',
      'As ferramentas de carga geram tráfego e medem desempenho.',
    ],
    [
      [
        'Spelling checks do not simulate traffic.',
        'A correção ortográfica não simula tráfego.',
      ],
      [
        'A checklist cannot generate concurrent load.',
        'Uma lista não gera carga concorrente.',
      ],
    ],
  ),
  q(
    40,
    'FL-6.2.1',
    'K1',
    'Automation',
    [
      'Which is a realistic risk of test automation?',
      'Qual é um risco realista da automação de testes?',
    ],
    [
      [
        'Underestimating script maintenance effort',
        'Subestimar o esforço de manutenção dos scripts de teste',
      ],
      [
        'All human judgement becomes unnecessary',
        'Todo o julgamento humano se torna desnecessário',
      ],
      [
        'Automation guarantees no future failures',
        'A automação garante ausência de falhas futuras',
      ],
    ],
    [
      'Maintenance costs must be considered.',
      'Os custos de manutenção têm de ser considerados.',
    ],
    [
      [
        'Human analysis remains necessary.',
        'A análise humana continua a ser necessária.',
      ],
      [
        'Automation cannot guarantee defect absence.',
        'A automação não garante ausência de defeitos.',
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
