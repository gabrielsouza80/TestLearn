import type { Question } from '../domain/engine';
type Pair = [en: string, pt: string];
const text = ([en, pt]: Pair) => ({ en, pt });
function original(
  n: number,
  lo: string,
  level: Question['level'],
  topic: string,
  prompt: Pair,
  alternatives: { id: string; value: Pair; reason: Pair }[],
  correct: string,
  explanation: Pair,
  section: string,
  pages: number[],
  tags: string[] = [],
): Question {
  return {
    id: `tl-${String(n).padStart(3, '0')}`,
    chapter: Number(lo[3]),
    lo,
    level,
    topic,
    type: level === 'K3' ? 'calculation' : 'single',
    required: 1,
    text: text(prompt),
    options: alternatives.map((o) => ({
      id: o.id,
      text: text(o.value),
      explanation: text(o.reason),
    })),
    correct: [correct],
    explanation: text(explanation),
    origin: 'original',
    syllabus: '4.0.1',
    version: 1,
    review: 'AI_REVIEWED',
    translationReview: 'AI_REVIEWED',
    humanApproval: 'PENDING',
    examEligible: true,
    tags,
    academicReview: {
      method: 'AI_REVIEWED',
      status: 'PASS',
      reviewedAt: '2026-10-27',
      section,
      pages,
      report: `docs/blueprint-validation.md#tl-${String(n).padStart(3, '0')}`,
    },
  };
}
export const blueprintQuestions: Question[] = [
  original(
    41,
    'FL-1.5.2',
    'K1',
    'Whole team approach',
    [
      'A delivery team adopts the whole team approach. Which benefit is associated with this approach?',
      'Uma equipa de desenvolvimento adota a whole team approach. Que vantagem está associada a esta abordagem?',
    ],
    [
      {
        id: 'o1',
        value: [
          'Quality accountability is transferred entirely from developers to the testing role.',
          'A responsabilidade pela qualidade é transferida integralmente dos programadores para a função de teste.',
        ],
        reason: [
          'Quality remains a responsibility shared by everyone, rather than being transferred to one role.',
          'A qualidade continua a ser uma responsabilidade partilhada por todos, em vez de ser transferida para uma função.',
        ],
      },
      {
        id: 'o2',
        value: [
          'Complementary skills and close collaboration help the team achieve its quality goals.',
          'Competências complementares e colaboração próxima ajudam a equipa a alcançar os seus objetivos de qualidade.',
        ],
        reason: [
          'Sharing skills and collaborating across business, development and testing supports collective quality goals.',
          'Partilhar competências e colaborar entre negócio, desenvolvimento e testes apoia os objetivos coletivos de qualidade.',
        ],
      },
      {
        id: 'o3',
        value: [
          'Keeping testers outside team discussions preserves the main benefit of this approach.',
          'Manter os testadores fora das discussões da equipa preserva a principal vantagem desta abordagem.',
        ],
        reason: [
          'The approach encourages collaboration, not isolation of testing from the team.',
          'A abordagem incentiva a colaboração, não o isolamento dos testes em relação à equipa.',
        ],
      },
      {
        id: 'o4',
        value: [
          'Testing starts only after developers have handed over all completed implementation work.',
          'Os testes só começam depois de os programadores entregarem todo o trabalho de implementação concluído.',
        ],
        reason: [
          'This imposes a sequential handover; the whole team approach promotes cooperation throughout the work.',
          'Isto impõe uma passagem de trabalho sequencial; a whole team approach promove a cooperação ao longo do trabalho.',
        ],
      },
    ],
    'o2',
    [
      'The whole team approach combines skills and shared responsibility. Tasks still require suitable skills and knowledge; context can require additional independence.',
      'A whole team approach combina competências e responsabilidade partilhada. As tarefas continuam a exigir competências e conhecimentos adequados; o contexto pode exigir independência adicional.',
    ],
    '1.5.2',
    [22],
  ),
  original(
    42,
    'FL-1.4.3',
    'K2',
    'Testware',
    [
      'A tester analyses booking requirements and records what needs testing, ordered by risk. No test cases or scripts have been written yet. Which work product best represents the output of this analysis?',
      'Um testador analisa requisitos de reservas e regista o que deve ser testado, ordenado por risco. Ainda não foram escritos casos de teste nem scripts. Que produto de trabalho melhor representa o resultado desta análise?',
    ],
    [
      {
        id: 'o1',
        value: [
          'Prioritised test conditions linked to the requirements.',
          'Condições de teste priorizadas e ligadas aos requisitos.',
        ],
        reason: [
          'Test analysis produces test conditions, identifying what to test and relating it to the test basis.',
          'A análise de teste produz condições de teste, identificando o que testar e relacionando-o com a base para testes.',
        ],
      },
      {
        id: 'o2',
        value: [
          'Executable automation scripts for the booking workflow.',
          'Scripts de automação executáveis para o fluxo de reservas.',
        ],
        reason: [
          'Scripts are test implementation work products, not the described analysis output.',
          'Os scripts são produtos de trabalho da implementação do teste, não o resultado da análise descrita.',
        ],
      },
      {
        id: 'o3',
        value: [
          'A test completion report with archived results.',
          'Um relatório de conclusão do teste com resultados arquivados.',
        ],
        reason: [
          'A completion report summarises completed testing; the scenario is still analysing requirements.',
          'Um relatório de conclusão resume testes concluídos; o cenário ainda está na análise dos requisitos.',
        ],
      },
      {
        id: 'o4',
        value: [
          'Detailed test cases with input data and expected results.',
          'Casos de teste detalhados com dados de entrada e resultados esperados.',
        ],
        reason: [
          'Elaborating conditions into test cases is test design, explicitly not yet performed here.',
          'Concretizar condições em casos de teste é conceção de teste, explicitamente ainda não realizada neste cenário.',
        ],
      },
    ],
    'o1',
    [
      'The described output is a prioritised set of test conditions. Test cases belong to design, scripts to implementation, and completion reports to completion.',
      'O resultado descrito é um conjunto priorizado de condições de teste. Os casos de teste pertencem à conceção, os scripts à implementação e os relatórios de conclusão à conclusão.',
    ],
    '1.4.3',
    [20],
  ),
  original(
    43,
    'FL-2.1.6',
    'K2',
    'Retrospectives',
    [
      'At an iteration retrospective, the team identifies late interface feedback as a recurring problem. Which action best turns this finding into process improvement?',
      'Numa retrospetiva de iteração, a equipa identifica o feedback tardio sobre interfaces como um problema recorrente. Que ação melhor transforma esta conclusão numa melhoria do processo?',
    ],
    [
      {
        id: 'o1',
        value: [
          'Archive the suggestion without checking later whether anything changes.',
          'Arquivar a sugestão sem verificar posteriormente se alguma coisa muda.',
        ],
        reason: [
          'Recording alone does not ensure that the recommended improvement is followed up.',
          'O registo, por si só, não assegura o acompanhamento da melhoria recomendada.',
        ],
      },
      {
        id: 'o2',
        value: [
          'Use the retrospective to rank individual testers by the number of defects they missed.',
          'Usar a retrospetiva para classificar individualmente os testadores pelo número de defeitos que não detetaram.',
        ],
        reason: [
          'Blaming individuals does not address the identified process issue or support team learning.',
          'Culpabilizar pessoas não resolve o problema de processo identificado nem apoia a aprendizagem da equipa.',
        ],
      },
      {
        id: 'o3',
        value: [
          'Agree on earlier interface reviews, assign responsibility, and check the outcome in the next iteration.',
          'Acordar revisões de interfaces mais cedo, atribuir responsabilidades e verificar o resultado na iteração seguinte.',
        ],
        reason: [
          'This makes an improvement actionable and follows it up, supporting continuous improvement.',
          'Isto torna a melhoria executável e permite acompanhá-la, apoiando a melhoria contínua.',
        ],
      },
      {
        id: 'o4',
        value: [
          'Restrict the discussion to fixing the current interface defects and exclude changes to the testing process.',
          'Limitar a discussão à correção dos defeitos atuais das interfaces e excluir alterações ao processo de teste.',
        ],
        reason: [
          'Fixing product defects is useful, but excluding process changes misses the retrospective improvement objective.',
          'Corrigir defeitos do produto é útil, mas excluir alterações ao processo não cumpre o objetivo de melhoria da retrospetiva.',
        ],
      },
    ],
    'o3',
    [
      'A retrospective examines what worked, what can improve and how to apply improvements. Agreed actions require follow-up rather than blame or passive archiving.',
      'Uma retrospetiva analisa o que funcionou, o que pode melhorar e como aplicar melhorias. As ações acordadas exigem acompanhamento, em vez de culpabilização ou arquivo passivo.',
    ],
    '2.1.6',
    [28],
  ),
  original(
    44,
    'FL-5.1.7',
    'K2',
    'Testing quadrants',
    [
      'Business representatives explore a working reporting dashboard to discover awkward user workflows and challenge whether it meets their needs. In the testing quadrants model, which quadrant best describes this activity?',
      'Representantes do negócio exploram um painel de relatórios funcional para descobrir dificuldades nos fluxos dos utilizadores e questionar se satisfaz as suas necessidades. No modelo dos quadrantes de testes, que quadrante melhor descreve esta atividade?',
    ],
    [
      {
        id: 'o1',
        value: [
          'Q1: technology-facing tests that support the team.',
          'Q1: testes orientados para a tecnologia que suportam a equipa.',
        ],
        reason: [
          'Q1 includes component and component integration tests; the scenario evaluates user workflows from a business perspective.',
          'Q1 inclui testes de componentes e de integração de componentes; o cenário avalia fluxos de utilizadores de uma perspetiva de negócio.',
        ],
      },
      {
        id: 'o2',
        value: [
          'Q2: business-facing tests that support the team.',
          'Q2: testes orientados para o negócio que suportam a equipa.',
        ],
        reason: [
          'Q2 examples guide development; this scenario critiques an existing working product through exploration.',
          'Os exemplos de Q2 orientam o desenvolvimento; este cenário critica um produto já funcional através da exploração.',
        ],
      },
      {
        id: 'o3',
        value: [
          'Q4: technology-facing tests that critique the product.',
          'Q4: testes orientados para a tecnologia que criticam o produto.',
        ],
        reason: [
          'Although the product is being critiqued, the stated concerns are user workflows and business needs, not technology-facing quality evaluation.',
          'Apesar de o produto ser criticado, as preocupações indicadas são os fluxos dos utilizadores e as necessidades do negócio, não uma avaliação orientada para a tecnologia.',
        ],
      },
      {
        id: 'o4',
        value: [
          'Q3: business-facing tests that critique the product.',
          'Q3: testes orientados para o negócio que criticam o produto.',
        ],
        reason: [
          'Q3 includes exploratory and usability testing from the user/business perspective, as described.',
          'Q3 inclui testes exploratórios e de usabilidade da perspetiva do utilizador e do negócio, como no cenário descrito.',
        ],
      },
    ],
    'o4',
    [
      'The activity is business-facing and critiques the working product. These two axes identify Q3; the model does not classify every business-facing activity as Q2.',
      'A atividade é orientada para o negócio e critica o produto funcional. Estes dois eixos identificam Q3; o modelo não classifica todas as atividades orientadas para o negócio como Q2.',
    ],
    '5.1.7',
    [51],
  ),
  original(
    45,
    'FL-5.3.2',
    'K2',
    'Test reporting',
    [
      'System testing is still in progress. Coverage is behind plan, an environment outage blocks work, and a high-risk area remains untested. Management must decide whether to adjust resources. Which report best supports this decision?',
      'O teste de sistema ainda está em curso. A cobertura está abaixo do planeado, uma indisponibilidade do ambiente bloqueia o trabalho e uma área de risco elevado ainda não foi testada. A gestão tem de decidir se ajusta os recursos. Que relatório melhor apoia esta decisão?',
    ],
    [
      {
        id: 'o1',
        value: [
          'A completion report declaring that the test level has ended and all exit criteria have been met.',
          'Um relatório de conclusão que declara que o nível de teste terminou e todos os critérios de saída foram cumpridos.',
        ],
        reason: [
          'The level is ongoing and an important area is untested; declaring completion contradicts the given situation.',
          'O nível está em curso e uma área importante não foi testada; declarar a conclusão contradiz a situação apresentada.',
        ],
      },
      {
        id: 'o2',
        value: [
          'A defect report describing only one observed application failure.',
          'Um relatório de defeito que descreve apenas uma falha observada na aplicação.',
        ],
        reason: [
          'A single defect report does not summarise progress against plan, environment impediments and the remaining test risk.',
          'Um relatório de um único defeito não resume o progresso face ao plano, os impedimentos do ambiente e o risco de teste restante.',
        ],
      },
      {
        id: 'o3',
        value: [
          'A progress report showing the reporting period, plan deviations, impediments, risk changes and planned next work.',
          'Um relatório de progresso que apresenta o período reportado, os desvios do plano, os impedimentos, as alterações de risco e o trabalho seguinte planeado.',
        ],
        reason: [
          'Progress reports provide information during testing to support control decisions such as changing resources or schedule.',
          'Os relatórios de progresso fornecem informação durante os testes para apoiar decisões de controlo, como alterar recursos ou calendário.',
        ],
      },
      {
        id: 'o4',
        value: [
          'A progress report listing individual activity totals without plan deviations, impediments or risk information.',
          'Um relatório de progresso que lista totais de atividade individuais sem desvios do plano, impedimentos ou informação sobre riscos.',
        ],
        reason: [
          'Activity totals alone omit the evidence management needs to judge the stated resource and risk problem.',
          'Os totais de atividade, por si só, omitem a evidência de que a gestão precisa para avaliar o problema de recursos e risco descrito.',
        ],
      },
    ],
    'o3',
    [
      'During ongoing testing, a progress report communicates deviations, impediments and risks so stakeholders can make control decisions. A completion report serves a different point in the test lifecycle.',
      'Durante os testes em curso, um relatório de progresso comunica desvios, impedimentos e riscos para os stakeholders poderem tomar decisões de controlo. Um relatório de conclusão corresponde a outro momento do ciclo de teste.',
    ],
    '5.3.2',
    [54, 55],
  ),
  original(
    46,
    'FL-4.2.2',
    'K3',
    'Boundary values',
    [
      'An integer input has no lower or upper domain limit. Values below 5 are rejected, 5 to 12 inclusive are accepted, and values above 12 are rejected. Consider every finite boundary of all three partitions. Which minimal set gives 100% three-value BVA coverage?',
      'Uma entrada inteira não tem limite inferior nem superior de domínio. Os valores inferiores a 5 são rejeitados, os de 5 a 12 inclusive são aceites e os superiores a 12 são rejeitados. Considere todas as fronteiras finitas das três partições. Que conjunto mínimo dá 100% de cobertura de BVA de 3 valores?',
    ],
    [
      {
        id: 'o1',
        value: ['4, 5, 12, 13', '4, 5, 12, 13'],
        reason: [
          'These are the four finite partition boundaries and give two-value coverage; their other neighbours are missing.',
          'Estas são as quatro fronteiras finitas das partições e dão cobertura de 2 valores; faltam os outros vizinhos.',
        ],
      },
      {
        id: 'o2',
        value: ['4, 5, 6, 11, 12, 13', '4, 5, 6, 11, 12, 13'],
        reason: [
          'This expands only the accepted partition endpoints 5 and 12. It misses neighbours 3 and 14 of the rejected partition boundaries 4 and 13.',
          'Isto expande apenas os extremos 5 e 12 da partição aceite. Omite os vizinhos 3 e 14 das fronteiras 4 e 13 das partições rejeitadas.',
        ],
      },
      {
        id: 'o3',
        value: ['3, 4, 5, 6, 11, 12, 13, 14', '3, 4, 5, 6, 11, 12, 13, 14'],
        reason: [
          'Expand boundaries 4, 5, 12 and 13 by one integer on each side. The union has eight values: 3, 4, 5, 6, 11, 12, 13, 14.',
          'Expanda as fronteiras 4, 5, 12 e 13 por um inteiro de cada lado. A união tem oito valores: 3, 4, 5, 6, 11, 12, 13, 14.',
        ],
      },
      {
        id: 'o4',
        value: [
          '3, 4, 5, 6, 7, 11, 12, 13, 14',
          '3, 4, 5, 6, 7, 11, 12, 13, 14',
        ],
        reason: [
          'This covers the required values but includes unnecessary interior value 7, so it is not minimal.',
          'Isto cobre os valores exigidos, mas inclui o valor interior desnecessário 7, pelo que não é mínimo.',
        ],
      },
    ],
    'o3',
    [
      'The partitions are x≤4, 5≤x≤12 and x≥13. Finite boundaries are 4,5,12,13. Three-value BVA adds each boundary and both immediate integer neighbours: {3,4,5,6} ∪ {11,12,13,14}. All eight are needed. Two-value BVA here needs only {4,5,12,13}; the domain has no finite external endpoints to add.',
      'As partições são x≤4, 5≤x≤12 e x≥13. As fronteiras finitas são 4,5,12,13. A BVA de 3 valores acrescenta cada fronteira e ambos os vizinhos inteiros imediatos: {3,4,5,6} ∪ {11,12,13,14}. São necessários os oito valores. A BVA de 2 valores exige aqui apenas {4,5,12,13}; o domínio não tem extremos externos finitos a acrescentar.',
    ],
    '4.2.2',
    [40],
    ['bva-3-value', 'unbounded-integer-domain'],
  ),
  original(
    47,
    'FL-4.2.2',
    'K3',
    'Boundary values',
    [
      'A control accepts only integer inputs in domain 0 to 30 inclusive; values outside this domain cannot be entered and must not be tested. Within the domain, reject 0–7, accept 8–22, and reject 23–30. The six partition boundaries 0,7,8,22,23,30 have already been tested for two-value BVA. To reach full three-value BVA of all partitions, using only neighbours within the domain, which minimal additional set is needed?',
      'Um controlo permite apenas entradas inteiras no domínio de 0 a 30 inclusive; os valores fora deste domínio não podem ser introduzidos nem devem ser testados. Dentro do domínio, rejeita 0–7, aceita 8–22 e rejeita 23–30. As seis fronteiras das partições 0,7,8,22,23,30 já foram testadas para BVA de 2 valores. Para alcançar cobertura completa de BVA de 3 valores de todas as partições, usando apenas vizinhos dentro do domínio, que conjunto adicional mínimo é necessário?',
    ],
    [
      {
        id: 'o1',
        value: ['1, 6, 9, 21, 24, 29', '1, 6, 9, 21, 24, 29'],
        reason: [
          'Expanding all six boundaries within 0–30 gives twelve distinct values. Removing the six already tested leaves 1,6,9,21,24,29.',
          'Expandir as seis fronteiras dentro de 0–30 dá doze valores distintos. Remover os seis já testados deixa 1,6,9,21,24,29.',
        ],
      },
      {
        id: 'o2',
        value: ['6, 9, 21, 24', '6, 9, 21, 24'],
        reason: [
          'This omits the valid domain neighbours 1 and 29 of endpoints 0 and 30.',
          'Isto omite os vizinhos 1 e 29, dentro do domínio, dos extremos 0 e 30.',
        ],
      },
      {
        id: 'o3',
        value: ['-1, 1, 6, 9, 21, 24, 29, 31', '-1, 1, 6, 9, 21, 24, 29, 31'],
        reason: [
          'Values -1 and 31 are outside the explicitly restricted input domain and cannot be entered.',
          'Os valores -1 e 31 estão fora do domínio de entrada explicitamente limitado e não podem ser introduzidos.',
        ],
      },
      {
        id: 'o4',
        value: ['0, 7, 8, 22, 23, 30', '0, 7, 8, 22, 23, 30'],
        reason: [
          'These values have already been tested; repeating them adds none of the missing neighbours.',
          'Estes valores já foram testados; repeti-los não acrescenta nenhum dos vizinhos em falta.',
        ],
      },
    ],
    'o1',
    [
      'The required in-domain union is {0,1,6,7,8,9,21,22,23,24,29,30}. Boundary 0 contributes only neighbour 1 inside the domain; boundary 30 contributes only 29. Subtract {0,7,8,22,23,30}, already covered by two-value BVA, to obtain the six additional values {1,6,9,21,24,29}. No out-of-domain test is required by this exercise.',
      'A união exigida dentro do domínio é {0,1,6,7,8,9,21,22,23,24,29,30}. A fronteira 0 contribui apenas com o vizinho 1 dentro do domínio; a fronteira 30 contribui apenas com 29. Subtraia {0,7,8,22,23,30}, já coberto por BVA de 2 valores, para obter os seis valores adicionais {1,6,9,21,24,29}. Este exercício não exige testes fora do domínio.',
    ],
    '4.2.2',
    [40],
    ['bva-3-value', 'bounded-integer-domain'],
  ),
];
