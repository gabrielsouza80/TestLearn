> Revisão atual **2026-10-27.6**: [validação da fase 5A](#fase-5a--variedade-quantificada), no fim. Os resultados anteriores são históricos.

# Validação do blueprint CTFL — fase 3

> Revisão atual **2026-10-27.5**: [validação da fase 4.1](#fase-41--manutenção-bilingue), no fim. Os resultados das fases 3/4 abaixo são históricos.

> O corpo da fase 3 é um registo histórico do banco de 47 perguntas. A [atualização da fase 4](#fase-4--regressão-com-o-banco-completo), no fim, regista o banco de 66 perguntas e a validação atual.

Data: **27-10-2026**. Revisão de conteúdo **2026-10-27.3**. Gerador de simulações independentes de prática, com alinhamento **estrutural** à tabela oficial. Não é um exame oficial, aprovação ISTQB/PSTQB, calibração psicométrica ou aprovação humana do conteúdo.

## Fontes efetivamente reconsultadas

Pasta local absoluta: `C:\TestLearn\docs\Certified Tester Foundation Level (CTFL) v4.0\`. Os PDFs originais e as extrações temporárias não são distribuídos no site/Git.

| Fonte                                            | Consulta desta fase                                                                                                                                   |
| ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| ISTQB_CTFL_Syllabus_v4.0.1.pdf                   | §§1.5.2 p.22, 1.4.3 p.20, 2.1.6 p.28, 5.1.7 p.51, 5.3.2 pp.54–55, 4.2.2 p.40; listas LO/K-level pp.14,38,47                                           |
| ISTQB_Exam-Structure-Tables_v1.19.pdf            | **v1.19, 19-08-2026**; regra de diversidade na p.1, totais na p.3, matriz completa CTFL nas pp.4–5; pp.4–5 renderizadas e inspecionadas               |
| ISTQB_Exam-Structures-and-Rules_v1.2.pdf         | v1.2; pp.8–10, estrutura por LO, um ponto, 65% e duração adicional                                                                                    |
| ISTQB_CTFL_Syllabus-v4.0-PT_v1.0 (1).pdf         | §1.5.2 p.24, §1.4.3 p.22, §2.1.6 pp.30–31, §5.1.7 pp.56–57, §5.3.2 pp.60–61, BVA pp.43–44                                                             |
| ISTQB_CTFL_v4.0_Sample-Exam-B-Answers_v1.7.pdf   | p.25: tratamento do limite do domínio na passagem de BVA de 2 para 3 valores; usado apenas como verificação da interpretação, não como modelo copiado |
| ISTQB_CTFL_v4.0_Sample-Exam-A-Answers_v1.7.pdf   | p.7: metadados LO/K-level e um ponto por pergunta                                                                                                     |
| ISTQB_CTFL_v4.0_Sample-Exam-B-Questions_v1.7.pdf | p.12: enunciado correspondente à explicação BVA consultada, incluindo o limite inferior de domínio; sem incorporação no banco                         |

Os PDFs foram abertos novamente nesta fase. Os hashes SHA-256 da fonte técnica (3b072f81…318d1f1) e tabela (bacdbba4…c9fa4fc) coincidem com os do inventário da [auditoria académica](academic-audit.md). Não se pressupôs que a tabela ou o relatório anterior estavam corretos. As contagens, grupos e níveis foram comparados com as páginas reais; não surgiu evidência que contradissesse as dez divergências reportadas.

Os documentos de referência pertencem ao ISTQB® e respetivos autores, conforme os avisos nos próprios ficheiros. Foram usados para verificar regras e conceitos, sem copiar perguntas oficiais.

## Revalidação do conjunto anterior

Aplicou-se o diagnóstico à cópia congelada do banco **2026-10-27.2**, antes de acrescentar perguntas. Os totais eram 40, capítulos 8/6/4/11/9/2 e níveis K1=8/K2=24/K3=8. Os dez desvios foram reproduzidos:

| Grupo            | Exigido | Observado no conjunto anterior |
| ---------------- | ------: | -----------------------------: |
| 1-k1-foundations |       1 |                              2 |
| 1-k1-whole-team  |       1 |                              0 |
| 1-k2-foundations |       1 |                              2 |
| 1-k2-activities  |       3 |                              2 |
| 2-k2-change      |       1 |                              2 |
| 2-k2-lifecycle   |       1 |                              0 |
| 5-k2-planning    |       1 |                              2 |
| 5-k2-quadrants   |       1 |                              0 |
| 5-k2-risk        |       1 |                              2 |
| 5-k2-reports     |       1 |                              0 |

Isto equivale a cinco lugares em falta e cinco excedentes noutros grupos. Não significa cinco perguntas necessariamente erradas nem a necessidade de apagar conteúdo. Os grupos excedentes agora oferecem variação de escolha; todas as 40 perguntas anteriores permanecem disponíveis na prática e conservaram integralmente texto, LO, K-level, IDs e versões.

## Matriz completa v1.19

A seleção escolhe a quantidade indicada por grupo. Quando há menos posições que LO, os LO escolhidos são distintos. Quando a quantidade coincide com o número de LO, cada LO é representado uma vez. Quando houver mais posições que LO, o algoritmo cobre cada LO pelo menos uma vez antes de preencher com outras perguntas distintas. A matriz CTFL atual não contém este último caso, embora o código respeite essa regra geral da p.1.

| Grupo              | Capítulo | K-level | Quantidade no exame | LO admissíveis                                   | Perguntas disponíveis no banco |
| ------------------ | -------: | ------- | ------------------: | ------------------------------------------------ | -----------------------------: |
| 1-k1-foundations   |        1 | K1      |                   1 | FL-1.1.1, FL-1.2.2                               |                              2 |
| 1-k1-whole-team    |        1 | K1      |                   1 | FL-1.5.2                                         |                              1 |
| 1-k2-foundations   |        1 | K2      |                   1 | FL-1.1.2, FL-1.2.1, FL-1.2.3                     |                              2 |
| 1-k2-principles    |        1 | K2      |                   1 | FL-1.3.1                                         |                              1 |
| 1-k2-activities    |        1 | K2      |                   3 | FL-1.4.1, FL-1.4.2, FL-1.4.3, FL-1.4.4, FL-1.4.5 |                              3 |
| 1-k2-skills        |        1 | K2      |                   1 | FL-1.5.1, FL-1.5.3                               |                              1 |
| 2-k1-practices     |        2 | K1      |                   1 | FL-2.1.2                                         |                              1 |
| 2-k1-test-first    |        2 | K1      |                   1 | FL-2.1.3                                         |                              1 |
| 2-k2-levels-types  |        2 | K2      |                   1 | FL-2.2.1, FL-2.2.2                               |                              1 |
| 2-k2-change        |        2 | K2      |                   1 | FL-2.2.3, FL-2.3.1                               |                              2 |
| 2-k2-lifecycle     |        2 | K2      |                   1 | FL-2.1.1, FL-2.1.6                               |                              1 |
| 2-k2-devops-shift  |        2 | K2      |                   1 | FL-2.1.4, FL-2.1.5                               |                              1 |
| 3-k1               |        3 | K1      |                   2 | FL-3.1.1, FL-3.2.1, FL-3.2.3, FL-3.2.5           |                              2 |
| 3-k2-static        |        3 | K2      |                   1 | FL-3.1.2, FL-3.1.3                               |                              1 |
| 3-k2-reviews       |        3 | K2      |                   1 | FL-3.2.2, FL-3.2.4                               |                              1 |
| 4-k2-families      |        4 | K2      |                   1 | FL-4.1.1                                         |                              1 |
| 4-k2-whitebox      |        4 | K2      |                   2 | FL-4.3.1, FL-4.3.2, FL-4.3.3                     |                              2 |
| 4-k2-experience    |        4 | K2      |                   2 | FL-4.4.1, FL-4.4.2, FL-4.4.3                     |                              2 |
| 4-k2-collaboration |        4 | K2      |                   1 | FL-4.5.1, FL-4.5.2                               |                              1 |
| 4-k3               |        4 | K3      |                   5 | FL-4.2.1, FL-4.2.2, FL-4.2.3, FL-4.2.4, FL-4.5.3 |                              7 |
| 5-k1               |        5 | K1      |                   1 | FL-5.1.2, FL-5.1.6, FL-5.2.1, FL-5.3.1           |                              1 |
| 5-k2-planning      |        5 | K2      |                   1 | FL-5.1.1, FL-5.1.3                               |                              2 |
| 5-k2-quadrants     |        5 | K2      |                   1 | FL-5.1.7                                         |                              1 |
| 5-k2-risk          |        5 | K2      |                   1 | FL-5.2.2, FL-5.2.3, FL-5.2.4                     |                              2 |
| 5-k2-reports       |        5 | K2      |                   1 | FL-5.3.2, FL-5.3.3                               |                              1 |
| 5-k2-configuration |        5 | K2      |                   1 | FL-5.4.1                                         |                              1 |
| 5-k3               |        5 | K3      |                   3 | FL-5.1.4, FL-5.1.5, FL-5.5.1                     |                              3 |
| 6-k2-tools         |        6 | K2      |                   1 | FL-6.1.1                                         |                              1 |
| 6-k1-automation    |        6 | K1      |                   1 | FL-6.2.1                                         |                              1 |

A matriz tem **29 grupos**, com soma de **40 posições**. O banco de **47** não deve ser avaliado como se fosse um exame de 40: os excedentes são candidatos alternativos, não divergências de um exame gerado.

| Capítulo | Banco total | Banco K1/K2/K3 | Cada exame | Exame K1/K2/K3 |
| -------- | ----------: | -------------- | ---------: | -------------- |
| 1        |          10 | 3/7/0          |          8 | 2/6/0          |
| 2        |           7 | 2/5/0          |          6 | 2/4/0          |
| 3        |           4 | 2/2/0          |          4 | 2/2/0          |
| 4        |          13 | 0/6/7          |         11 | 0/6/5          |
| 5        |          11 | 1/7/3          |          9 | 1/5/3          |
| 6        |           2 | 1/1/0          |          2 | 1/1/0          |
| Total    |      **47** | **9/28/10**    |     **40** | **8/24/8**     |

**Resultado exigido de cada exame novo: zero grupos divergentes**, 40 IDs únicos, todos os LO/K-levels válidos e cardinalidades intactas. Os 26 pontos de aprovação, um ponto por pergunta e os prazos absolutos de 60/75 minutos mantêm-se.

## Novas perguntas e revisão técnica/PT-PT

As sete perguntas são originais, com quatro alternativas de IDs estáveis e explicação individual em EN/PT. Todas têm `AI_REVIEWED`, resultado editorial por IA `PASS`, `humanApproval: PENDING` e `examEligible: true`. Nenhuma recebeu aprovação humana. O estado refere-se à revisão por IA feita nesta fase, não ao resultado de testes de software.

### tl-041

- **Objetivo:** Fechar FL-1.5.2, K1. Capítulo 1; versão 1; pergunta de seleção simples; quatro alternativas.
- **Fonte técnica:** syllabus EN §1.5.2, pp.22; PT, pp.24.
- **Análise e solução:** Reconhece responsabilidade partilhada e combinação de competências na whole team approach. As alternativas transferem indevidamente toda a qualidade para testes, isolam testadores ou impõem uma passagem sequencial. Não se promete que qualquer pessoa execute tarefas sem competências nem que a abordagem dispense independência em contextos críticos.
- **PT-PT:** Whole team approach foi mantido, como no syllabus português; testadores, competências e responsabilidade partilhada preservam o sentido inglês.
- **Chave verificada por IA:** o2; as restantes alternativas são explicitamente rejeitadas na própria pergunta.
- **Estado:** AI_REVIEWED / PASS; HUMAN_APPROVED = não; aprovação humana pendente. Dificuldade real não calibrada.

### tl-042

- **Objetivo:** Fechar o terceiro LO distinto do grupo FL-1.4.x, escolhendo FL-1.4.3, K2. Capítulo 1; versão 1; pergunta de seleção simples; quatro alternativas.
- **Fonte técnica:** syllabus EN §1.4.3, pp.20; PT, pp.22.
- **Análise e solução:** A análise produz condições de teste priorizadas. Casos detalhados são conceção, scripts são implementação e relatório de conclusão pertence à conclusão. O cenário explicita que os casos/scripts ainda não existem; não se confunde a atividade de análise com o plano de gestão.
- **PT-PT:** Testware, base para testes, condições de teste e relatório de conclusão do teste seguem o PSTQB.
- **Chave verificada por IA:** o1; as restantes alternativas são explicitamente rejeitadas na própria pergunta.
- **Estado:** AI_REVIEWED / PASS; HUMAN_APPROVED = não; aprovação humana pendente. Dificuldade real não calibrada.

### tl-043

- **Objetivo:** Fechar FL-2.1.6, K2. Capítulo 2; versão 1; pergunta de seleção simples; quatro alternativas.
- **Fonte técnica:** syllabus EN §2.1.6, pp.28; PT, pp.30,31.
- **Análise e solução:** A retrospetiva deve transformar observações em ações de melhoria e acompanhá-las. Arquivar sem acompanhamento, culpabilizar indivíduos ou excluir alterações ao processo não concretiza esse objetivo. O cenário fornece um problema de processo e uma ação verificável.
- **PT-PT:** Retrospetiva, iteração, revisão e acompanhamento foram revistos lado a lado; não se confunde corrigir um defeito com melhorar o processo.
- **Chave verificada por IA:** o3; as restantes alternativas são explicitamente rejeitadas na própria pergunta.
- **Estado:** AI_REVIEWED / PASS; HUMAN_APPROVED = não; aprovação humana pendente. Dificuldade real não calibrada.

### tl-044

- **Objetivo:** Fechar FL-5.1.7, K2. Capítulo 5; versão 1; pergunta de seleção simples; quatro alternativas.
- **Fonte técnica:** syllabus EN §5.1.7, pp.51; PT, pp.56,57.
- **Análise e solução:** O cenário critica um produto funcional a partir da perspetiva de utilizadores/negócio, logo Q3. Q1/Q4 são orientados para tecnologia; Q2 suporta a equipa em vez da exploração crítica descrita. As quatro alternativas combinam os dois eixos do modelo.
- **PT-PT:** Mantidos Q1–Q4 e a distinção suportar a equipa / criticar o produto; quadrantes de testes segue o vocabulário português.
- **Chave verificada por IA:** o4; as restantes alternativas são explicitamente rejeitadas na própria pergunta.
- **Estado:** AI_REVIEWED / PASS; HUMAN_APPROVED = não; aprovação humana pendente. Dificuldade real não calibrada.

### tl-045

- **Objetivo:** Fechar FL-5.3.2, K2. Capítulo 5; versão 1; pergunta de seleção simples; quatro alternativas.
- **Fonte técnica:** syllabus EN §5.3.2, pp.54,55; PT, pp.60,61.
- **Análise e solução:** Durante testes em curso, desvios do plano, impedimentos e riscos são informação de um relatório de progresso que suporta controlo. Um relatório de conclusão com critérios cumpridos contradiz o cenário; um defeito isolado ou apenas totais individuais não respondem à decisão de recursos.
- **PT-PT:** Relatório de progresso, período, desvios, impedimentos e risco mantêm correspondência com o syllabus português; não se atribui uma decisão automática ao relatório.
- **Chave verificada por IA:** o3; as restantes alternativas são explicitamente rejeitadas na própria pergunta.
- **Estado:** AI_REVIEWED / PASS; HUMAN_APPROVED = não; aprovação humana pendente. Dificuldade real não calibrada.

### tl-046

- **Objetivo:** Exercício próprio de BVA de 3 valores, FL-4.2.2, K3. Capítulo 4; versão 1; pergunta de seleção simples; quatro alternativas.
- **Fonte técnica:** syllabus EN §4.2.2, pp.40; PT, pp.43,44.
- **Análise e solução:** Domínio inteiro sem extremos externos finitos. Partições x≤4, 5≤x≤12, x≥13. Fronteiras: 4,5,12,13. Expansão ±1 e união: {3,4,5,6,11,12,13,14}; oito valores mínimos, opção o3. O1 só cobre 2 valores; o2 só expande os extremos da partição aceite e omite 3/14; o4 contém 7 supérfluo e não é mínimo.
- **PT-PT:** Considere todas as fronteiras finitas das três partições evita a ambiguidade de estudar só a partição aceite. Aceite/rejeitado e os limites inclusivos são iguais em EN/PT.
- **Chave verificada por IA:** o3; as restantes alternativas são explicitamente rejeitadas na própria pergunta.
- **Estado:** AI_REVIEWED / PASS; HUMAN_APPROVED = não; aprovação humana pendente. Dificuldade real não calibrada.

### tl-047

- **Objetivo:** Segundo exercício de BVA de 3 valores, FL-4.2.2, K3. Capítulo 4; versão 1; pergunta de seleção simples; quatro alternativas.
- **Fonte técnica:** syllabus EN §4.2.2, pp.40; PT, pp.43,44.
- **Análise e solução:** Domínio inteiro finito 0..30, exterior explicitamente impossível de introduzir. Partições [0,7], [8,22], [23,30]. Fronteiras já cobertas em BVA de 2 valores: {0,7,8,22,23,30}. União de BVA de 3 valores dentro do domínio: {0,1,6,7,8,9,21,22,23,24,29,30}. Subtrair os seis existentes dá {1,6,9,21,24,29}, opção o1. O2 omite 1/29; o3 inclui -1/31 impossíveis; o4 apenas repete testes.
- **PT-PT:** Domínio, extremos, dentro do domínio e adicional mínimo são explícitos nas duas línguas. Não se inferem testes fora do domínio nem se confundem entradas inválidas dentro do domínio com entradas impossíveis de introduzir.
- **Chave verificada por IA:** o1; as restantes alternativas são explicitamente rejeitadas na própria pergunta.
- **Estado:** AI_REVIEWED / PASS; HUMAN_APPROVED = não; aprovação humana pendente. Dificuldade real não calibrada.

### Elegibilidade dos exercícios BVA no exame

Os dois exercícios novos partilham o mesmo LO da tl-026. No grupo K3 do capítulo 4 existem cinco posições para cinco LO distintos. O seletor escolhe **exatamente uma** entre tl-026, tl-046 e tl-047 para FL-4.2.2 e uma por cada um dos outros quatro LO; nunca ocupa duas posições de exame com o mesmo LO BVA. A prática por tópico/LO pode incluir os três exercícios, sem quotas de exame.

## Algoritmo e falha segura

1. Validar estrutura, unicidade de IDs, LO/K-level, capítulo, cardinalidade e referências às alternativas. Banco inválido é rejeitado, não silenciosamente reparado.
2. Limitar a candidatos elegíveis: revisão técnica e tradução AI_REVIEWED, avaliação PASS, aprovação humana ainda PENDING nesta versão e sem `examEligible: false`. Perguntas experimentais/pendentes podem continuar em estudo; não entram no exame alinhado.
3. Ordenar os candidatos canonicamente por ID e agrupar por LO para cada grupo oficial. Baralhar LO com uma semente derivada do ID de grupo e depois escolher uma pergunta de cada LO necessário com outra sequência determinística.
4. Respeitar diversidade de LO antes de preencher posições adicionais; impedir repetição de IDs globalmente. Validar o conjunto final e baralhar a sua ordem.
5. A semente é um inteiro seguro. O gerador é reproduzível e não criptográfico. A ordem de entrada do banco não altera o resultado para a mesma semente.
6. Ausência de LO suficientes ou candidatos elegíveis gera `BlueprintSelectionError`, com código e grupo. A interface mostra mensagem localizada e aponta para a prática por tópico, sem produzir um exame parcial rotulado como alinhado. Um banco com mais de 40 perguntas pode continuar insuficiente se faltar um grupo obrigatório.

O construtor de sessões de exame e a validação do armazenamento da revisão nova também recusam conjuntos sem conformidade, para não depender apenas do botão da interface. Estudo por tópico usa outro caminho, sem prazo e sem exigência de quotas. Tentativas antigas não são retroativamente sujeitas à regra nova: mantêm a designação de simulação anterior.

## Evidência de seleção determinística

A suite percorre **sementes 0–999**, validando cada seleção contra um **oráculo de testes independente** transcrito da tabela oficial em `tests/fixtures/blueprint-oracle.ts`, sem importar as quotas de produção. Também verifica o diagnóstico de produção, estrutura válida, contagens por capítulo/K-level, LO distintos, IDs únicos e repetição da mesma seleção para a mesma semente.

Na execução concluída foram observados **1 000 exames conformes, zero desvios, 96 conjuntos distintos e 1 000 ordens distintas**. Todas as 47 perguntas apareceram pelo menos uma vez. As 96 combinações possíveis neste banco resultam de cinco escolhas binárias (fundamentos K1/K2, alterações no capítulo 2, planeamento e risco no capítulo 5) e três escolhas para BVA: 2⁵×3=96. Isto não significa uniformidade estatística nem calibração académica. A aprovação das 1 000 sementes é uma evidência de regressão estrutural, não uma prova matemática para todos os inteiros ou de correção académica.

Os testes cobrem ainda banco vazio/insuficiente, muitas cópias de um mesmo LO com IDs diferentes, IDs duplicados, capítulo inválido, chaves inválidas, sementes inválidas, metadados pendentes/experimentais, baralhamento de alternativas, seleção múltipla exata, 0/25/26/40 pontos, 60/75 minutos, expiração e restauração.

## Compatibilidade histórica

- Revisão atual: **2026-10-27.3**. Revisões anteriores preservadas: **2026-10-27.1** e **2026-10-27.2**. Não se altera nenhum campo guardado apenas por o conteúdo ter avançado.
- Antes de acrescentar perguntas, foi arquivado o banco completo da fase 2. Os primeiros 40 itens atuais são profundamente iguais a esse arquivo; nenhum LO foi relabelado para preencher quotas.
- SHA-256 do arquivo .1: `b5f44fc33cfd55b8e7aea1fceff7348c32857580f04ef493156107788d5717f5`; arquivo .2: `982e73ec30706a5e8cca992b80f9157d18cda2d3e77791b32430a804c3574cbb`. Os testes verificam os dois hashes. A regra local `.gitattributes` conserva LF apenas nestes arquivos, evitando falsos negativos por conversão CRLF em checkouts Windows.
- O resolvedor usa o banco associado à revisão para conteúdo, opções, explicações e pontuação. Testes comparam respostas, ordem, posição, marcações, prazo de 75 minutos, data/estado e pontuação de sessões ativas/concluídas das duas revisões.
- Revisões desconhecidas ou dados incompatíveis continuam a ser recuperados sem sobrescrever o valor bruto. A revisão anterior não recebe o rótulo de alinhamento novo. Não foi necessário abrir, editar ou apagar progresso real de utilizadores.

## Resultados finais da validação

| Comando                | Resultado final                                                          |
| ---------------------- | ------------------------------------------------------------------------ |
| `npm run typecheck`    | PASS                                                                     |
| `npm run lint`         | PASS                                                                     |
| `npm run format:check` | PASS                                                                     |
| `npm test`             | PASS — **61 testes**, sete ficheiros: **52 unitários e 9 de integração** |
| `npm run build`        | PASS — JS 564,76 kB / 161,13 kB gzip; CSS 13,38 kB / 3,50 kB gzip        |
| `npm run test:e2e`     | PASS — **24 testes**, 12 cenários em Chromium desktop e emulação móvel   |
| `git diff --check`     | PASS; apenas avisos de normalização LF/CRLF nos ficheiros anteriores     |

A execução de 1 000 sementes levou **2 314 ms** na última execução local (caso agregado; não é um benchmark garantido para outros ambientes). O total unitário/integração levou 5,80 s; Playwright, 18,0 s. A suite verifica reprodução de cada semente, 96 conjuntos e 1 000 ordens, sem chamar isto calibração académica.

Além dos cenários anteriores, Playwright verificou o exame alinhado de 75 minutos e a igualdade de todos os campos após reload, os dois BVA com feedback PT-PT, a revisão .2 sem relabelar o histórico e a prática de **47 perguntas**, incluindo retoma da posição 47. Axe não reportou violações nos ecrãs examinados de painel, exame, prática e resultados dos BVA. Não é certificação WCAG integral.

O teste de integração negativo remove uma pergunta obrigatória do banco: a interface identifica o grupo `1-k1-whole-team`, não cria sessão parcial e continua a permitir prática por tópico. A validação de armazenamento também rejeita uma seleção antiga inválida rotulada artificialmente com a revisão atual, preservando o valor bruto na recuperação.

Problemas encontrados e corrigidos durante a execução:

- Fixtures antigas construíam qualquer conjunto de 40 com o construtor atual e assumiam que a remoção de qualquer pergunta tornava o banco insuficiente. Passaram a usar conjuntos alinhados ou formas históricas explícitas; remover uma alternativa de um grupo selecionável já não é confundido com perder um grupo obrigatório.
- TypeScript identificou uma opção `exact` de Playwright usada indevidamente numa query React Testing Library. A opção foi removida desse teste, sem enfraquecer a correspondência por nome; dois imports tornados obsoletos foram removidos após o lint os detetar.
- Axe encontrou regiões de resultados com nome acessível duplicado «Explicação». Cada região de resultado passou a incluir o número da pergunta. A regra axe continuou ativa e a suite passou após a correção.
- O armazenamento limitava todas as sessões a 40, apesar de a prática agora permitir 47. O limite passou a ser o banco da revisão associado à sessão; a regra de exatamente 40 permanece específica do modo de exame. Foram acrescentadas regressões de gravação/retoma de prática acima de 40, no domínio e no navegador.

O build emite os avisos existentes sobre comentários de otimização Zod e um **novo aviso de chunk acima de 500 kB**. Os arquivos históricos completos e o banco síncrono acrescentam dados ao bundle, que tem cerca de 161 kB gzip. O limiar de aviso não foi alterado nem foram introduzidos chunks artificiais para o esconder. Uma futura otimização de carregamento dos bancos arquivados deve manter a recuperação histórica; não foi feita uma refatoração assíncrona fora do âmbito desta fase.

Não executados: CI remota, Safari/WebKit/Firefox reais, leitores de ecrã reais, revisão humana independente e estudo psicométrico. A suite usa Vite local; o artefacto de produção foi compilado e não publicado. Não se instalaram novas dependências npm ou ferramentas globais; os temporários de auditoria existentes continuaram locais e excluídos do Git.

## Cobertura restante e limites editoriais

O banco cobre **45 dos 64 LO**, mantendo **19 LO sem pergunta**: `FL-1.2.1`, `FL-1.4.2`, `FL-1.4.5`, `FL-1.5.1`, `FL-2.1.1`, `FL-2.1.4`, `FL-2.2.2`, `FL-3.1.2`, `FL-3.2.1`, `FL-3.2.2`, `FL-3.2.5`, `FL-4.3.3`, `FL-4.4.3`, `FL-4.5.1`, `FL-5.1.2`, `FL-5.2.1`, `FL-5.2.4`, `FL-5.3.1`, `FL-5.3.3`. Um exame seleciona 40 LO distintos segundo as quotas, não todos os objetivos do syllabus; isto é uma consequência legítima dos grupos selecionáveis, não uma promessa de cobertura integral do syllabus numa tentativa.

Todas as **47 perguntas e 47 traduções** aguardam aprovação humana independente: **HUMAN_APPROVED = 0**. O agente autor e revisor é IA; não se afirma independência humana, validação psicométrica nem dificuldade equivalente aos exames oficiais. As perguntas antigas mantêm em geral três alternativas; as sete novas têm quatro. O banco ainda é pequeno, e muitos itens são obrigatórios em todas as seleções: novas perguntas revistas são desejáveis para reduzir repetição. Não há inferência externa ou tradução em execução.

Próximo passo recomendado: revisão humana das sete perguntas novas e da matriz/oráculo, começando pelas condições de domínio da tl-047. Depois ampliar os LO ainda sem conteúdo com perguntas originais revistas; manter os arquivos enquanto houver tentativas históricas suportadas. Não houve push, publicação, alteração de deployment ou operações destrutivas.

## Fase 4 — regressão com o banco completo

Conteúdo **2026-10-27.4**: **66 perguntas, 64 LO distintos**, após confirmar novamente as seis listagens do syllabus 4.0.1 e a tabela v1.19 pp.1,3–5 (pp.4–5 renderizadas e inspecionadas). A matriz de 29 grupos acima permanece válida. As contagens de candidatos e os 19 LO em falta no corpo histórico referem-se à fase 3; as adições e as revisões individuais atuais estão apenas na [auditoria académica](academic-audit.md#fase-4--cobertura-completa-do-syllabus).

| Capítulo | Banco fase 3 | Banco fase 4 | Banco K1/K2/K3 | LO cobertos / examináveis | Cada exame | Exame K1/K2/K3 |
| -------- | -----------: | -----------: | -------------- | ------------------------- | ---------: | -------------- |
| 1        |           10 |           14 | 3/11/0         | 14/14                     |          8 | 2/6/0          |
| 2        |            7 |           10 | 2/8/0          | 10/10                     |          6 | 2/4/0          |
| 3        |            4 |            8 | 4/4/0          | 8/8                       |          4 | 2/2/0          |
| 4        |           13 |           16 | 0/9/7          | 14/14                     |         11 | 0/6/5          |
| 5        |           11 |           16 | 4/9/3          | 16/16                     |          9 | 1/5/3          |
| 6        |            2 |            2 | 1/1/0          | 2/2                       |          2 | 1/1/0          |
| Total    |       **47** |       **66** | **14/42/10**   | **64/64**                 |     **40** | **8/24/8**     |

O algoritmo, quotas, mistura de seeds e ausência de fallback não foram alterados. As novas perguntas entram pelos mesmos LO e critérios editoriais de elegibilidade. Cada exame continua com 40 LO distintos e não com 64: cobertura do banco e composição de uma tentativa são medidas diferentes. Grupos que ganharam LO alternativos deixaram de obrigar à seleção de certos itens antigos; os testes negativos removem agora LO suficientes para deixar realmente menos diversidade do que a quota exige, em vez de falhar pela remoção de um candidato substituível.

### Revisões e integridade do histórico

O banco completo de 47 foi congelado em src/data/archive/questions-2026-10-27.3.json **antes** das adições. SHA-256: **cc70ebf8768c1236fcb89099d88ad275600d542078c1531c1195fe43f2f96d38**. Os hashes .1/.2 acima mantêm-se, e os testes verificam os três arquivos. Os primeiros 47 itens atuais são profundamente iguais ao arquivo .3. Não foi alterado nenhum texto/chave antigo.

As revisões .1, .2 e .3 continuam suportadas e a nova revisão é .4. A resolução por revisão conserva texto, opções, chave, respostas, ordem, marcações, feedback, posição, tempos por pergunta, prazo e timestamps. Não há reclassificação nem migração de revisão. .3 e .4 mantêm a validação estrita do blueprint em exames; .1/.2 preservam a estrutura histórica. Foi corrigida a associação do rótulo alinhado exclusivamente à revisão corrente: exames .3 continuam corretamente identificados como alinhados, com aviso de banco anterior à cobertura completa. A prática .3 conserva 47 itens; a prática .4 suporta 66 e retoma a posição 66. Novos IDs não podem ser associados artificialmente a uma revisão antiga, e dados incompatíveis são preservados em bruto na recuperação.

### Validação final da fase 4

| Comando              | Resultado efetivamente executado                                       |
| -------------------- | ---------------------------------------------------------------------- |
| npm run typecheck    | PASS                                                                   |
| npm run lint         | PASS                                                                   |
| npm run format:check | PASS                                                                   |
| npm test             | PASS — **71 testes / 8 ficheiros: 62 unitários e 9 de integração**     |
| npm run build        | PASS — JS **707,09 kB / 198,13 kB gzip**; CSS 13,38 kB / 3,50 kB gzip  |
| npm run test:e2e     | PASS — **30 testes: 15 cenários em desktop Chromium e emulação móvel** |

Execução final em 27-10-2026: **1 000 seeds (0–999), 1 000 exames conformes, zero grupos divergentes, 1 000 conjuntos distintos e 1 000 ordens distintas**; todas as **66 perguntas** foram selecionadas pelo menos uma vez. O teste agregado levou **4 454 ms**, repetindo cada seleção e verificando também a ordem inversa do banco e o baralhamento de opções. A suite unitária/integração levou **8,87 s**; a suite E2E completa, **25,2 s**, sem retries locais. Estes tempos são observações locais, não garantias de desempenho ou distribuição estatística uniforme.

Playwright confirmou o novo LO FL-4.3.3 pela interface, a resposta semântica correta após baralhamento, justificações EN/PT e feedback restaurado; a sessão de prática de 66 itens e retoma da posição 66; e exame/prática .3 com conteúdo congelado, campos originais, conclusão e revisão após reload. Permanecem os cenários de .1/.2, pontuação exata, múltiplas respostas, timer, dados inválidos e limites de seleção. Axe não detetou violações nos ecrãs examinados, incluindo o novo feedback; isto não constitui auditoria WCAG integral.

O build mantém avisos do Rollup relativos a comentários de otimização na dependência Zod e ao **chunk acima de 500 kB**. O JS aumentou dos 564,76 kB / 161,13 kB gzip da fase 3 para **707,09 kB / 198,13 kB gzip**: mais conteúdo e mais um banco histórico carregados de forma síncrona. Não se alteraram limites de aviso nem se adicionaram dependências. O custo de transferência, parsing e memória merece acompanhamento em dispositivos lentos; não foi medido um benchmark de runtime nesses dispositivos. Uma otimização futura pode carregar arquivos históricos a pedido, mas deve preservar a recuperação e a pontuação por revisão. Não se reescreveu a persistência ou o motor estável para esconder este custo.

Foram executados todos os seis comandos pedidos, com exit code 0. A execução de npm test acrescentou apenas os reporters default/JSON e escreveu a evidência temporária local em tmp/phase4-unit-results.json. Os testes de software não alteram o estado editorial: **66 perguntas e traduções por aprovar por humanos**, sem calibração de dificuldade.

Os testes de cobertura usam um oráculo separado das definições de produção, transcrito das listas LO/nível do syllabus. O oráculo do blueprint continua separado e foi conferido com as tabelas reais. Os testes verificam todos os 29 grupos em cada seed, capítulos, K-level, diversidade, unicidade, banco válido, determinismo repetido e com ordem de entrada invertida, chaves intactas e IDs de alternativas depois de baralhar. As 19 novas perguntas não são sempre obrigatórias num exame, mas todas aparecem na amostra de seeds.

A validação bilingue verifica campos não vazios, justificações individuais, quatro opções nas novas, fontes/metadados, cardinalidade e IDs existentes; não prova tradução natural nem acerto académico. O schema passou a recusar explicações só com espaços, sem aplicar trim ao conteúdo histórico.

As fixtures históricas foram corrigidas para guardar respostas/marcações apenas em perguntas realmente selecionadas. A pesquisa de placeholders foi tornada sensível a TODO/TBD em maiúsculas, pois uma regex sem essa distinção confundia o português «todo/todos» com trabalho por concluir. Estas falhas eram dos novos testes; não se enfraqueceram as verificações de integridade do armazenamento para os fazer passar.

Não executados: revisão humana, calibração psicométrica, CI remota, Firefox/WebKit ou leitores de ecrã reais. As execuções Playwright usam Chromium desktop e Chromium com emulação de iPhone; não se afirma teste em Safari/iPhone real. Não houve publicação, deploy, push, novos serviços, dependências ou alteração de repositórios alheios.

## Fase 4.1 — manutenção bilingue

**2026-10-27.5**, sem perguntas novas: 66 itens / 64 LO. Apenas tl-002, tl-003, tl-008, tl-023 e tl-058 receberam ajustes linguísticos e incremento de versão. [Alterações exatas e fontes](academic-audit.md#fase-41--correções-bilingues-controladas). As restantes 61 perguntas e todas as chaves foram preservadas. O seletor, grupos e quotas não foram modificados.

### Arquivo e recuperação

O banco completo .4 foi serializado e formatado uma única vez antes de alterar os textos, segundo as convenções existentes, em src/data/archive/questions-2026-10-27.4.json. SHA-256: **413e93605f8026e7a633f92c512c0f93b2a466867e4a1d4d3752dbd03ee1f104**. O hash do JSON em memória (**fab0fbcb6b137f7885ddeddc8f07d2b15e38e8d385a2b00650a508a803fbd272**) coincide com o caderno de revisão independente .4. Os três arquivos anteriores conservam os hashes registados; os quatro ficam protegidos por regressões e pela regra LF de .gitattributes.

As cinco revisões são suportadas. Sessões .4 continuam a resolver textos EN/PT, opções, justificações e chave pela cópia congelada, sem migração de revisão. .3/.4/.5 conservam o rótulo de blueprint alinhado; .4 mostra aviso específico de banco anterior às correções bilingues. .1/.2 mantêm os avisos anteriores. Nenhuma sessão real foi editada.

Os testes exercitam exame e estudo para .1/.2/.3/.4, comparam todos os campos após gravação/retoma e conclusão, e substituem propositadamente os textos/chaves do banco atual para comprovar que a resolução histórica não os usa. A prática .4/.5 pode conter 66 itens. Playwright verifica tanto uma nova sessão .5 com a opção de confirmação explícita nos dois idiomas como sessões .4 que mantêm o texto antigo, a explicação antiga e o resultado após reload e revisão do histórico.

### Verificação final

Validação final retomada em **28-10-2026**, sem reaplicar correções nem recriar arquivos. A execução anterior de Playwright tinha terminado com 36 testes aprovados; não havia runner TestLearn ainda ativo. O servidor Vite existente foi mantido, sem terminar processos de outros projetos. Como a aplicação dos metadados passou depois a substituir os itens em vez de modificar objetos importados (evitando efeitos laterais no recarregamento dos módulos), todos os comandos foram repetidos sobre esse código final.

| Comando              | Resultado final efetivamente executado                                 |
| -------------------- | ---------------------------------------------------------------------- |
| npm run typecheck    | PASS                                                                   |
| npm run lint         | PASS                                                                   |
| npm run format:check | PASS                                                                   |
| npm test             | PASS — **78 testes / 9 ficheiros: 69 unitários e 9 de integração**     |
| npm run build        | PASS — JS **862,53 kB / 236,26 kB gzip**; CSS 13,38 kB / 3,50 kB gzip  |
| npm run test:e2e     | PASS — **36 testes**, 18 cenários em Chromium desktop e emulação móvel |

O caso agregado percorreu **1 000 seeds (0–999)**: exatamente 40 perguntas, todos os 29 grupos conformes, capítulos 8/6/4/11/9/2 e K1/K2/K3=8/24/8, diversidade de LO e IDs únicos. Para cada seed, a seleção de IDs/ordem foi **igual à revisão .4**, repetível e independente da ordem de entrada; chaves e IDs de opções mantêm-se após baralhar. Foram observados 1 000 conjuntos e 1 000 ordens distintos; todas as 66 perguntas apareceram. O caso levou **5 706 ms**; a suite unitária/integração, **8,99 s**; Playwright, **24,9 s**, sem retries locais. Não são benchmarks nem calibração estatística/psicométrica.

Os testes de manutenção comparam os 66 objetos completos contra a alteração esperada do arquivo .4: **apenas os cinco itens autorizados mudaram**, as outras **61 perguntas são profundamente iguais** e **66/66 conjuntos de resposta correta foram preservados**. Os quatro hashes dos arquivos .1–.4 foram novamente confirmados, bem como a igualdade de blueprint.ts e blueprint-audit.ts com o preflight. A comparação de hashes dos ficheiros pré-existentes com a lista de alterações autorizadas não encontrou modificações inesperadas. Os testes históricos cobrem exame/estudo, ordem de opções, respostas, marcações, feedback, posição, prazos e timestamps, em retoma e conclusão, com pontuação resolvida pelo arquivo mesmo quando se fornecem textos/chaves atuais artificialmente diferentes.

A primeira tentativa de typecheck na retoma falhou porque faltavam ficheiros/executáveis de dependências locais (tsc indisponível). Foram restauradas **apenas as dependências existentes**, a partir do cache e lockfile, com npm install --ignore-scripts --no-audit --no-fund --offline. Os hashes de package.json e package-lock.json permaneceram intactos. O npm emitiu avisos de limpeza de binários bloqueados pelo processo existente e de depreciação da versão instalada de ESLint; não foi efetuada limpeza manual nem atualização de versões. Após a reposição, os seis comandos acima passaram. Não foi escondida a falha inicial como se tivesse passado.

O build mantém os avisos conhecidos relativos a comentários de otimização na dependência Zod e a chunk acima de 500 kB. O arquivo .4 acrescenta dados históricos ao bundle síncrono: o custo passa de 707,09 kB / 198,13 kB gzip da fase 4 para os valores acima. Não se alteraram arquitetura, carregamento, limites de aviso ou dependências para otimizar o bundle. Nenhuma falha de software ficou por resolver no âmbito desta fase.

Os riscos editoriais anteriores permanecem: 39 perguntas com três alternativas, 16 itens obrigatórios por exame, distratores por melhorar e dificuldade sem calibração. Não se alteraram esses aspetos nesta manutenção. Software validado e duas avaliações por IA não constituem aprovação humana: **66 perguntas/traduções PENDING**. Não foram realizados CI remota, Safari/Firefox reais, estudo com candidatos ou revisão académica humana.

Não houve push, deploy, publicação, eliminação de ficheiros, novas dependências, alterações a KAVTRIS ou repos alheios. O trabalho local não commitado pré-existente foi preservado.

## Fase 5A — variedade quantificada

Preflight real: **.5, 66 perguntas, 64 LO, 29 grupos**, 16 IDs obrigatórios e sete deles K3, reproduzidos por análise de quotas/candidatos. A lista e as 16 correspondências estão na [auditoria académica](academic-audit.md#fase-5a--variedade-e-k3). A matriz oficial e o seletor permanecem intactos; SHA-256 de blueprint.ts **0d017a0376f4456a2956d2e1b3578c3e04352630f07d9906ded1fed53e6c8862**. Não foi relaxada qualquer quota ou validação.

Arquivo .5 criado antes das adições: src/data/archive/questions-2026-10-27.5.json, SHA-256 **c57da2c300f58dd5714a8c54746b9e1cd404b8134347c3b13123e83b97823a79**. Os primeiros 66 objetos atuais são profundamente iguais a esse arquivo. A revisão nova é **2026-10-27.6** e continuam legíveis .1–.5, com textos, explicações, ordem, respostas, pontuação e timestamps originais. .5 tem aviso específico de banco anterior à expansão, mantendo alinhamento estrutural; a prática .5 conserva 66 itens e a atual suporta **82**. Não se migram tentativas nem se sobrescreve progresso inválido em silêncio.

### Prova estrutural de ausência de IDs fixos

Cada um dos antigos 16 LO obrigatórios tem agora dois candidatos elegíveis do mesmo nível. Um ID individual deixou de ser inevitável. Os testes retiram cada antigo ID e constroem um exame conforme contendo a alternativa; retiram também cada um dos 82 IDs individualmente, e retiram em conjunto os 16 antigos ou os 16 novos. Todos esses bancos continuam a produzir exames válidos. A análise independente dos grupos identifica **zero IDs obrigatórios**, não apenas zero itens vistos em todas as seeds. Novas perguntas não são usadas para ocupar posições de outro LO.

Nas **1 000 seeds 0–999**: **1000 conjuntos distintos, 1000 ordens distintas, 82/82 perguntas selecionadas e zero IDs presentes em todas as tentativas**. Todos os exames têm 40 perguntas, capítulos 8/6/4/11/9/2 e K1/K2/K3=8/24/8, quotas dos 29 grupos, diversidade de LO e chaves estáveis após baralhamento. As seleções atuais podem legitimamente diferir da .5 para a mesma seed. A regressão antiga .4=.5 permanece verificada sobre os seus arquivos congelados, sem impor essa igualdade ao banco expandido.

### Frequência de cada pergunta nas 1 000 seeds

| ID     | LO       | Seleções | ID     | LO       | Seleções |
| ------ | -------- | -------: | ------ | -------- | -------: |
| tl-001 | FL-1.1.1 |      517 | tl-042 | FL-1.4.3 |      604 |
| tl-002 | FL-1.2.2 |      483 | tl-043 | FL-2.1.6 |      487 |
| tl-003 | FL-1.1.2 |      332 | tl-044 | FL-5.1.7 |      509 |
| tl-004 | FL-1.2.3 |      324 | tl-045 | FL-5.3.2 |      510 |
| tl-005 | FL-1.3.1 |      480 | tl-046 | FL-4.2.2 |      341 |
| tl-006 | FL-1.4.1 |      580 | tl-047 | FL-4.2.2 |      313 |
| tl-007 | FL-1.4.4 |      596 | tl-048 | FL-1.2.1 |      344 |
| tl-008 | FL-1.5.3 |      475 | tl-049 | FL-1.4.2 |      630 |
| tl-009 | FL-2.1.2 |      511 | tl-050 | FL-1.4.5 |      590 |
| tl-010 | FL-2.1.3 |      500 | tl-051 | FL-1.5.1 |      525 |
| tl-011 | FL-2.2.3 |      475 | tl-052 | FL-2.1.1 |      513 |
| tl-012 | FL-2.2.1 |      511 | tl-053 | FL-2.1.4 |      482 |
| tl-013 | FL-2.1.5 |      518 | tl-054 | FL-2.2.2 |      489 |
| tl-014 | FL-2.3.1 |      525 | tl-055 | FL-3.1.2 |      502 |
| tl-015 | FL-3.1.1 |      483 | tl-056 | FL-3.2.1 |      516 |
| tl-016 | FL-3.2.3 |      498 | tl-057 | FL-3.2.2 |      502 |
| tl-017 | FL-3.1.3 |      498 | tl-058 | FL-3.2.5 |      503 |
| tl-018 | FL-3.2.4 |      498 | tl-059 | FL-4.3.3 |      677 |
| tl-019 | FL-4.1.1 |      465 | tl-060 | FL-4.4.3 |      676 |
| tl-020 | FL-4.3.1 |      656 | tl-061 | FL-4.5.1 |      497 |
| tl-021 | FL-4.3.2 |      667 | tl-062 | FL-5.1.2 |      256 |
| tl-022 | FL-4.4.1 |      656 | tl-063 | FL-5.2.1 |      229 |
| tl-023 | FL-4.4.2 |      668 | tl-064 | FL-5.2.4 |      313 |
| tl-024 | FL-4.5.2 |      503 | tl-065 | FL-5.3.1 |      255 |
| tl-025 | FL-4.2.1 |      480 | tl-066 | FL-5.3.3 |      490 |
| tl-026 | FL-4.2.2 |      346 | tl-067 | FL-1.3.1 |      520 |
| tl-027 | FL-4.2.3 |      464 | tl-068 | FL-2.1.2 |      489 |
| tl-028 | FL-4.2.4 |      475 | tl-069 | FL-2.1.3 |      500 |
| tl-029 | FL-4.5.3 |      490 | tl-070 | FL-4.1.1 |      535 |
| tl-030 | FL-5.1.6 |      260 | tl-071 | FL-4.2.1 |      520 |
| tl-031 | FL-5.1.1 |      521 | tl-072 | FL-4.2.3 |      536 |
| tl-032 | FL-5.1.3 |      479 | tl-073 | FL-4.2.4 |      525 |
| tl-033 | FL-5.2.2 |      317 | tl-074 | FL-4.5.3 |      510 |
| tl-034 | FL-5.2.3 |      370 | tl-075 | FL-5.4.1 |      520 |
| tl-035 | FL-5.4.1 |      480 | tl-076 | FL-5.1.4 |      506 |
| tl-036 | FL-5.1.4 |      494 | tl-077 | FL-5.1.5 |      508 |
| tl-037 | FL-5.1.5 |      492 | tl-078 | FL-5.5.1 |      487 |
| tl-038 | FL-5.5.1 |      513 | tl-079 | FL-6.1.1 |      501 |
| tl-039 | FL-6.1.1 |      499 | tl-080 | FL-6.2.1 |      475 |
| tl-040 | FL-6.2.1 |      525 | tl-081 | FL-1.5.2 |      475 |
| tl-041 | FL-1.5.2 |      525 | tl-082 | FL-5.1.7 |      491 |

Nos 16 pares reforçados, os antigos IDs aparecem entre **464 e 525** vezes e os novos entre **475 e 536**; cada par soma 1 000 seleções. Há dez pares com mais seleções do novo ID, cinco com mais do antigo e um empate. A maior diferença é 464/536. Isto não sugere preferência sistemática pelos IDs antigos ou menores nesta amostra, mas também **não prova uniformidade estatística**. As frequências globais 229–677 refletem sobretudo quotas/probabilidades distintas por grupo: não se deve exigir a mesma frequência às 82 perguntas. A ordem inversa do banco não muda a seleção de uma seed.

### Limites teóricos

A contagem combinatória dos conjuntos permitidos pelo banco passa de **119439360** para **7827577896960**, fator **65 536 = 2¹⁶**: cada um dos 16 lugares anteriormente fixos ganhou uma escolha binária. É o número de conjuntos estruturalmente possíveis, não a afirmação de que o gerador alcança todos com as seeds disponíveis. Para K3, as combinações permitidas passam de três escolhas BVA para **2⁷×3=384** conjuntos de oito perguntas; os oito LO K3 continuam a ser os mesmos por imposição da matriz.

Existe ainda um mínimo estrutural de **três IDs repetidos entre quaisquer dois exames** deste banco: selecionar 3 de 5 LO de atividades do capítulo 1 força pelo menos uma coincidência; selecionar 2 de 3 LO em caixa-branca e 2 de 3 em experiência força mais uma em cada grupo. Esses LO ainda têm um único candidato. Isto é compatível com zero IDs universalmente obrigatórios: a identidade da coincidência pode mudar entre pares de exames.

O blueprint continua a forçar certos LO e cada exame usa quase metade do banco (40/82). Zero IDs obrigatórios não significa ausência de repetição ou independência psicométrica. Os dois candidatos de cada LO reforçado continuam poucos e não eliminam aprendizagem por reconhecimento após várias tentativas. A amostra de 1 000 seeds é evidência de regressão, não previsão de certificação.

### QA e desempenho

| Comando                                                                          | Resultado efetivamente executado                                                              |
| -------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| npm run typecheck                                                                | PASS; repetido após npm ci                                                                    |
| npm run lint                                                                     | PASS                                                                                          |
| npm run format:check                                                             | PASS                                                                                          |
| npm test                                                                         | PASS — **93 testes**, dez ficheiros: **84 unitários e 9 de integração**                       |
| npm run build                                                                    | PASS; repetido após npm ci — JS **1 057,87 kB / 287,14 kB gzip**, CSS 13,38 kB / 3,50 kB gzip |
| npm run test:e2e                                                                 | Primeira execução: **35 PASS / 7 timeouts**, oito workers                                     |
| npm run test:e2e -- --workers=2                                                  | Suite completa: **42/42 PASS**, 21 cenários desktop/móvel, **48,5 s**                         |
| npm run test:e2e -- tests/e2e/variability.spec.ts --project=chromium --workers=1 | Verificação adicional após npm ci: **3/3 PASS**, **13,3 s**, incluindo arranque Vite          |

Os sete timeouts iniciais ocorreram em page.goto nos primeiros testes Chromium, antes das verificações funcionais; os restantes 35 passaram. Com dois workers, **a suite completa passou**, sem aumentar timeouts, sem retries locais, sem alterar a configuração permanente, sem omitir testes e sem desativar axe ou asserções. A concorrência inicial e o carregamento a frio são uma explicação compatível com a evidência, não uma medição isolada da causa. Em ambientes com recursos limitados, usar a execução com dois workers; não se oculta a falha da execução padrão.

A suite unitária/integração terminou em **38,43 s** nesta execução (incluindo preparação dos ambientes). O caso agregado de 1 000 seeds com oráculo oficial separado levou **6 256 ms**; a amostragem adicional de frequências no teste levou 977 ms. Não se apresentam esses tempos como garantias de desempenho. Os dados de frequência foram novamente calculados em tmp/phase5-selection-results.json e o resumo das execuções ficou em tmp/phase5-final-evidence.json; o relatório HTML Playwright mais recente corresponde à verificação adicional de três testes após reinstalação, não à suite completa anterior.

O problema npm foi também reproduzido no contexto de processos: o Vite anterior mantinha binários carregados. Depois de o encerrar e confirmar ausência de processos TestLearn ativos, **npm ci --offline --no-audit --no-fund terminou com exit code 0**, sem EPERM. Package.json e lockfile mantiveram os hashes do preflight. O npm avisou sobre depreciação de ESLint e um script de instalação de esbuild sem autorização allowScripts; não se alterou essa política. O build e os três E2E subsequentes confirmaram funcionamento dos binários instalados. Um comando composto opcional de arranque/paragem manual foi rejeitado pela revisão automática; foi usado o servidor gerido pelo Playwright existente, que passou a verificação. Não se contornaram permissões nem se executou configuração global.

O JavaScript cresceu de **862,53 kB / 236,26 kB gzip** para **1 057,87 kB / 287,14 kB gzip**: **+195,34 kB** minificado e **+50,88 kB** gzip. O arquivo .5 e as 16 perguntas são carregados sincronamente pela arquitetura existente. Permanecem os avisos Rollup/Zod e chunk >500 kB, sem alterar limiares ou dividir artificialmente bundles. A otimização de carregamento fica para a fase 5C; não foi medido runtime em dispositivos lentos.

Verificações finais: hashes dos cinco arquivos confirmados; prefixo de 66 perguntas profundamente igual ao arquivo .5; **82 perguntas / 64 LO / 39 itens antigos de três alternativas**; todos os estados humanApproval=PENDING. Os hashes do seletor e da matriz, bem como package.json e lockfile, coincidem com o preflight anterior. As validações históricas e atuais passaram sem relaxar quotas ou pontuação.

Regressões ajustadas: o teste do tópico Tools assumia que só existia tl-039; agora preserva essa asserção com filtro explícito por ID e verifica também que a seleção de duas perguntas do tópico devolve tl-039/tl-079. Os negativos de grupos obrigatórios removem todos os candidatos desse LO ou tornam-nos inelegíveis; não se confunde remover uma alternativa com perder cobertura. Os registos históricos de fases 2–4.1 continuam a ser testados contra os respetivos arquivos. Não se enfraqueceram scoring, cardinalidade, quotas, acessibilidade ou comportamento de recuperação.

O erro EPERM de npm ci foi associado ao Vite TestLearn PID 138740 e ao seu serviço esbuild a manterem binários carregados. Só esses processos verificados foram parados; as dependências já restauradas passaram typecheck e o executável Vite respondeu com a versão correta. Para reinstalar dependências, fechar primeiro o servidor com Ctrl+C e depois executar npm ci; para iniciar normalmente usar npm run dev, sem reinstalar a cada arranque. Não são necessários privilégios de administrador para contornar um bloqueio de ficheiro em uso. Playwright voltou a iniciar o servidor local durante a validação.

Não houve novas dependências, serviços, push, deploy ou alterações a KAVTRIS. Não se otimizaram bundles nem se alteraram limites de avisos. Revisão humana, calibração psicométrica, CI remota, Firefox/WebKit reais e leitores de ecrã reais permanecem por executar.

## Fase 5C — carregamento histórico e estabilidade E2E (28-10-2026)

### Preflight e integridade

Ponto de partida: `main` limpo em `9d41e1b`, revisão **2026-10-27.6**, 82 perguntas, 64 LO, 29 grupos e 40 perguntas por exame. A baseline voltou a executar os **93 testes / 10 ficheiros** com sucesso (13,98 s). Dependências existentes reutilizadas; nenhum `npm ci`, dependência nova, mudança académica, migração, push ou deploy nesta fase.

A cadeia `main → App → engine → bank-history` importava estaticamente os cinco JSON históricos: **259 registos / 655 837 bytes de JSON** entravam no grafo inicial. A análise Rollup confirmou os cinco módulos dentro da entrada única. Os arquivos não eram a única fonte de tamanho: React DOM, Zod, interface e banco atual também têm peso relevante. Comprimentos de módulos antes da minificação não são tamanhos gzip atribuíveis individualmente.

### Fronteira assíncrona

- `src/data/bank-history.ts`: imports dinâmicos literais, lista fechada de revisões, cache por revisão e uma promessa partilhada durante cada carregamento. Validação integral do schema, IDs e cardinalidade antes de disponibilizar um arquivo não vazio. Falhas libertam a promessa; revisões desconhecidas são recusadas. Nunca existe fallback para o banco atual.
- `src/domain/question.ts`: schema e validadores extraídos sem alteração semântica para evitar dependência circular entre motor e carregador. O motor reexporta a API existente; pontuação, seleção, baralhamento e temporizadores continuam síncronos depois da preparação do banco.
- `src/storage/store.ts`: valida primeiro a estrutura persistida, prepara apenas as revisões referenciadas e aplica depois as verificações completas anteriores. Se os bytes guardados mudarem durante a espera, a recuperação é recusada; não apresenta um snapshot obsoleto nem escreve dados. `save` mantém a mesma implementação e validação.
- `src/App.tsx`: uma pequena barreira de recuperação antecede a interface existente. Durante a espera não há perguntas, chaves ou seleção de sessões. Erros mostram uma mensagem bilingue e permitem **recarregar e tentar novamente**, preservando LocalStorage. O recarregamento também contorna rejeições de import dinâmico memorizadas pelo navegador. Resultados de uma montagem entretanto desmontada são ignorados.
- As métricas atuais do painel calculam pontuações/fragilidades usando o histórico completo. Por isso, quando há histórico persistido, é necessário preparar as suas revisões antes de mostrar essas métricas. Uma visita sem histórico não descarrega arquivos; não existe prefetch especulativo. Alternar entre sessões já recuperadas usa a cache, sem novo pedido por pergunta.
- Os imports estáticos usados como oráculos históricos foram movidos para `tests/fixtures/banks.ts`, fora do grafo da aplicação. Os testes síncronos históricos preparam explicitamente a cache; nenhuma asserção anterior foi removida ou enfraquecida.

### Medição de produção antes/depois

Método: builds Vite separados e preview local; Chromium headless **156.0.8078.4**, Node **24.19.0**, Ryzen Z1 Extreme, 16 CPUs lógicas, 13 628 198 912 bytes de RAM. Sem throttling de rede/CPU, outros processos presentes. Três contextos novos por cenário, cada um seguido de reload com cache HTTP; relógio de domínio fixo sem alterar Resource Timing. Tempos medidos da navegação até ao elemento funcional esperado. Não constituem benchmark universal nem medem equipamento móvel real.

| Métrica                                                          |       Antes |      Depois |
| ---------------------------------------------------------------- | ----------: | ----------: |
| Entrada JS minificada                                            | 1 057 868 B |   550 677 B |
| Entrada JS gzip                                                  |   287 139 B |   168 508 B |
| JS transferido no painel novo (Resource Timing, inclui overhead) |   287 439 B |   168 808 B |
| Pedidos JS / arquivos incorporados na entrada                    |       1 / 5 |       1 / 0 |
| Total JS gerado, todos os chunks                                 | 1 057 868 B | 1 062 579 B |
| Soma gzip de todos os chunks                                     |   287 139 B |   293 182 B |

Redução inicial: **47,9% minificado / 41,3% gzip**. Overhead total: +4 711 B minificados e +6 043 B na soma gzip, incluindo a fronteira de recuperação/imports e compressão separada. Os arquivos continuam disponíveis; a redução é de transferência e parsing iniciais, não eliminação de conteúdo. O aviso de entrada acima de 500 kB mantém-se e não foi suprimido.

| Chunk histórico | Minificado |     Gzip |
| --------------- | ---------: | -------: |
| .1              |   51 782 B | 12 545 B |
| .2              |   65 758 B | 14 708 B |
| .3              |   87 739 B | 20 828 B |
| .4              |  153 173 B | 38 265 B |
| .5              |  153 450 B | 38 328 B |

O painel novo solicita apenas a entrada JS e o CSS (além do documento/outros recursos do navegador). Recuperar `.1` solicita a entrada e apenas o chunk `.1`: 181 653 B JS transferidos; `.4`: 207 373 B; `.5`: 207 436 B. Não se confundem ausência de pedidos JSON com ausência de arquivos: estes eram código embutido antes, agora são chunks JS identificados no grafo e na rede.

| Cenário                           | Antes frio / reload quente (ms) | Depois frio / reload quente (ms) |
| --------------------------------- | ------------------------------- | -------------------------------- |
| Painel novo                       | 316–616 / 61–77                 | 269–290 / 51–73                  |
| Exame .1                          | 285–488 / 64–91                 | 249–318 / 76–117                 |
| Exame .4                          | 262–270 / 63–68                 | 283–293 / 69–102                 |
| Exame .5                          | 270–291 / 61–62                 | 249–261 / 75–110                 |
| Prática .5, 66 perguntas          | 289–316 / 58–83                 | 283–293 / 89–93                  |
| Painel com histórico .5 concluído | 319–341 / 67–90                 | 298–331 / 86–97                  |

Abrir a revisão depois do painel histórico: antes 200–307 ms frio / 92–144 ms quente; depois 186–222 / 97–124 ms. O custo extra de import/validação existe, sobretudo no reload quente histórico; não se afirma melhoria em todos os cenários. A mediana fria do painel novo passou de 320 para 285 ms, numa amostra de apenas três. Heap JS observado no painel novo frio: ~6,65–6,68 MB → ~4,16–4,17 MB; sem GC forçado, não equivale a memória total do processo. No histórico .5 quente: ~9,94–9,96 MB → ~9,42–9,45 MB. A cache acumula as revisões usadas durante a vida da página; neste âmbito existem apenas cinco.

### Investigação de concorrência

A configuração anterior verificava apenas o HTML de um servidor de desenvolvimento, permitia reutilizar um processo existente e deixava a compilação do grafo para as primeiras navegações. Isso introduzia variabilidade e risco de reutilizar um servidor desatualizado. Agora os E2E compilam uma vez antes da suite e usam **preview de produção exclusivo em 127.0.0.1:4174**, `strictPort`, sem reutilização. Um conflito de porta falha explicitamente. Não se alteraram timeouts, retries existentes (`CI: 1`, local: 0) nem o número automático de workers. Não há dados persistidos partilhados entre contextos de browser; os testes que os inserem fazem-no no próprio contexto.

Diagnóstico controlado: 1/2/4/8 navegadores simultâneos, **duas repetições por configuração**, antes/depois e dev/preview; 30 navegações por matriz, **120/120 passaram**. Dev com cache de compilação nova em cada repetição; preview usa os artefactos congelados antes/depois. Os valores seguintes são intervalos de `page.goto`, não duração da suite completa nem medição de cada worker Playwright.

| Navegadores | Dev antes (ms) | Dev depois (ms) | Preview antes (ms) | Preview depois (ms) |
| ----------- | -------------- | --------------- | ------------------ | ------------------- |
| 1           | 2 015–2 192    | 2 025–3 516     | 121–144            | 92–114              |
| 2           | 2 129–2 220    | 2 079–2 331     | 123–146            | 94–118              |
| 4           | 2 106–2 298    | 2 237–4 183     | 152–244            | 106–147             |
| 8           | 2 500–3 694    | 2 431–3 642     | 180–547            | 155–454             |

Com oito, a memória global livre mínima foi ~163 MiB antes /185 MiB depois em dev, e ~989/1 025 MiB em preview. CPU global média nos intervalos com oito: ~41–47% dev /85–87% preview. São métricas do sistema inteiro, afetadas por outras aplicações; não demonstram a causa única dos timeouts antigos. O diagnóstico inicial com cache fora de `node_modules` foi descartado: provocava reprocessamento pelo plugin React e não representava a configuração real; os resultados acima usam o protocolo corrigido.

**Os sete timeouts da fase 5A não foram reproduzidos neste diagnóstico.** Compilação fria, readiness só do HTML e pressão de memória são fatores observados/plausíveis, não uma causa exclusiva provada. Não se declara estabilidade universal de oito workers com base nestas navegações curtas. A suite completa e as repetições estão registadas abaixo.

### Evidência de compatibilidade e QA

Os SHA-256 dos cinco JSON permanecem:

| Revisão | Perguntas | SHA-256                                                          |
| ------- | --------: | ---------------------------------------------------------------- |
| .1      |        40 | b5f44fc33cfd55b8e7aea1fceff7348c32857580f04ef493156107788d5717f5 |
| .2      |        40 | 982e73ec30706a5e8cca992b80f9157d18cda2d3e77791b32430a804c3574cbb |
| .3      |        47 | cc70ebf8768c1236fcb89099d88ad275600d542078c1531c1195fe43f2f96d38 |
| .4      |        66 | 413e93605f8026e7a633f92c512c0f93b2a466867e4a1d4d3752dbd03ee1f104 |
| .5      |        66 | c57da2c300f58dd5714a8c54746b9e1cd404b8134347c3b13123e83b97823a79 |

O banco atual serializado mantém SHA-256 `5d384e9de8a7962d8bbbf73fe5339d4cffdc779f17a8562019c6f619a7aac06c`. Comparação adicional de AST confirmou as 11 funções não relacionadas com resolução do motor, o schema de perguntas, a estrutura/refinamentos de sessão/estado, `save` e as asserções dos 16 ficheiros de testes originais sem alteração. Hashes de fontes de conteúdo, metadados editoriais, revisão, blueprint, auditor do blueprint e package/lock também coincidem com a baseline.

Os testes existentes verificam todas as revisões .1–.5, textos, opções/IDs, explicações, respostas, ordem, posição, flags, timestamps, prazos, pontuação e conclusão em exame/prática. Os novos testes controlam falhas, validação, promessas concorrentes, cache, ausência de fallback, mudanças de dados durante espera e cancelamento de resultados obsoletos. E2E acrescentam ausência de arquivo numa visita nova, falha/recuperação, reload enquanto pendente e todas as justificações na revisão bilingue; preservam os cenários .1/.4/.5 anteriores.

Evidência local detalhada (ignorada pelo Git): `tmp/phase5c-*-performance.json`, `tmp/phase5c-*-concurrency.json`, `tmp/phase5c-integrity-before.json`, `tmp/phase5c-static-integrity.mjs` e logs `tmp/phase5c-*`. Não contém PDFs oficiais nem dados pessoais de utilizadores.

Limites: não foram testados Safari real/Firefox, rede remota ou CI remota. Num alojamento estático, a publicação deve preservar os chunks pedidos por páginas já abertas; um chunk indisponível produz erro recuperável, não conteúdo substituto. Usar um separador de cada vez continua recomendado; a deteção de alteração durante recuperação não acrescenta sincronização entre separadores. Esta fase só valida software: revisão académica humana e calibração psicométrica continuam pendentes, sem endosso ISTQB/PSTQB.

### Execuções de regressão da fase 5C

| Verificação                                    | Resultado / exit code                                                                                                      |
| ---------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| npm run typecheck                              | PASS, 0                                                                                                                    |
| npm run lint                                   | PASS, 0                                                                                                                    |
| npm run format:check                           | PASS, 0; novamente verificado depois de terminar a documentação                                                            |
| npm test                                       | 112/112 em 13 ficheiros, 0; 93 anteriores + 19 novos                                                                       |
| npm run build                                  | PASS, 0; seis chunks JS, avisos Zod preexistentes e entrada >500 kB mantidos                                               |
| npm run test:e2e, predefinição de 8 workers    | 50/50, 0, antes da correção da asserção nova; execução final abaixo                                                        |
| E2E novos, 2 workers                           | 8/8, 0                                                                                                                     |
| E2E novos corrigidos, 4 workers, repeat-each=2 | 16/16, 0                                                                                                                   |
| Blueprint                                      | 1 000 seeds determinísticos, quotas/grupos/diversidade, IDs únicos, chaves após baralhamento e ordem inversa do pool: PASS |
| Hashes e diff                                  | 16 fontes/arquivos protegidos coincidem; banco atual intacto; git diff --check: 0                                          |

A primeira validação TypeScript durante a escrita dos testes identificou dois erros nos novos testes (nome de campo de justificação e opção de seletor da Testing Library); foram corrigidos antes da QA final. Não exigiram mudanças no produto.

Comparação de suites completas, 100 casos por configuração (50 testes × duas repetições), sem retries locais:

| Workers | Primeiro resultado | Tempo total incluindo build/runner | Seguimento                                                            |
| ------- | ------------------ | ---------------------------------: | --------------------------------------------------------------------- |
| 1       | 100/100, exit 0    |                           177,64 s | Antes da correção descrita abaixo                                     |
| 2       | 100/100, exit 0    |                           100,85 s | Antes da correção descrita abaixo                                     |
| 4       | **99/100, exit 1** |                            69,92 s | Falha de asserção no teste novo; repetição corrigida abaixo           |
| 8       | 100/100, exit 0    |                            68,99 s | Além da execução predefinida 50/50; antes da correção descrita abaixo |

A falha com quatro workers **não foi um timeout de navegação**. O novo teste de ausência de arquivos exigia um radio, embora a primeira pergunta sorteada pudesse ser múltipla. O snapshot mostrava tl-001 e as quatro checkboxes corretas. A asserção foi corrigida para validar enunciado, tipo, quantidade e nomes de todas as alternativas do item realmente guardado; uma seed fixa reproduz intencionalmente a pergunta múltipla. Isto reforça a verificação e elimina a dependência acidental do sorteio; não se alterou o produto, a aleatoriedade, as asserções anteriores, workers, timeout ou retries. Log e trace desta falha estão preservados em tmp/phase5c-radio-assumption-*.

As comparações de tempos acima são observações locais, com caches/processos do sistema variáveis, e não uma calibração de capacidade. A predefinição automática (oito nesta máquina) mantém-se; não há evidência para baixar workers para esconder um problema. A causa exclusiva dos sete timeouts antigos continua por demonstrar.

Resultados depois da correção do teste novo:

| Comando                                                                        | Resultado final                 | Tempo total incluindo build/runner |
| ------------------------------------------------------------------------------ | ------------------------------- | ---------------------------------: |
| npm run test:e2e -- tests/e2e/lazy-history.spec.ts --workers=4 --repeat-each=2 | 16/16, exit 0                   |                23,6 s (Playwright) |
| npm run test:e2e -- --workers=4 --repeat-each=2                                | 100/100, exit 0                 |                            77,91 s |
| npm run test:e2e                                                               | **50/50 com 8 workers, exit 0** |        49,33 s (47,4 s Playwright) |

Nenhuma falha de navegação na configuração final observada. As suites completas com 1, 2 e 8 workers tinham passado antes desta correção exclusivamente no teste; os testes originais e o artefacto da aplicação são os mesmos. Os resultados anteriores não são apresentados como uma nova execução da asserção corrigida. O build final mantém os mesmos nomes/hashes de chunks da medição otimizada. A revisão permanece 2026-10-27.6, com 82 perguntas, 64 LO, 29 grupos e exames de 40 perguntas. Nenhum conteúdo académico ou arquivo foi alterado e não houve push/deploy.

## Fase 5B — qualidade académica e revisão .7 (28-10-2026)

A baseline real era `.6`: 82 perguntas, 64 LO, 29 grupos, 82 elegíveis; 39 itens de três alternativas, exatamente **tl-002–tl-040**. Preflight, diagnóstico anterior às alterações, revisões por ID, novas opções o4, fontes, resolução, contestação de cada alternativa e limites metodológicos estão em [academic-audit.md](academic-audit.md#fase-5b--revisão-final-6--7). O trabalho local não commitado da fase 5C foi preservado; não se recomeçou a arquitetura.

Foi arquivado o runtime completo `.6` antes de alterar o conteúdo, segundo a serialização Prettier JSON/LF existente. Arquivo: `src/data/archive/questions-2026-10-27.6.json`; **82 objetos**, SHA-256 **8bf1990ee8eb05f93eec529fe903a05db20ad72a649648f161f2847802c6012e**. Os hashes `.1`–`.5` continuam os registados na fase 5C. Os testes comparam os seis arquivos e validam os seus schemas.

A revisão ativa é **2026-10-27.7**. Foram alterados exatamente os 39 alvos; cada um tem quatro alternativas, versão incrementada uma vez, novo o4 incorreto e metadados AI_REVIEWED/PASS com aprovação humana PENDING. Os outros **43 objetos são profundamente iguais à `.6`**, incluindo tl-001 e os seus dois IDs corretos. Todas as 82 chaves, cardinalidades, IDs originais, LO, K-levels, capítulos, tipos e tabelas foram preservados. Não houve novos IDs nem migração de tentativas. A distribuição continua capítulos **16/12/8/21/21/4** e K1/K2/K3 **18/47/17**.

Mudanças de suporte limitadas: `.6` adicionada ao registo de imports dinâmicos, enum de persistência e classificação de revisões alinhadas; novo aviso histórico `.6` para evitar a mensagem incorreta de revisão anterior ao blueprint. Cache, partilha de promessas, barreira assíncrona, erros e retry da fase 5C mantêm-se. Motor, algoritmo de seleção, quotas e configuração Playwright não foram alterados nesta fase. A igualdade histórica dos primeiros 66 itens na fase 5A passa a ser verificada explicitamente contra o arquivo `.6`, conservando a comparação exata com `.5`; expectativas de revisão ativa foram atualizadas para `.7`, sem remover asserções de comportamento.

### Regressões verificadas

- As mesmas 82 identidades, 64 LO e 29 grupos; exames de 40 com capítulo **8/6/4/11/9/2** e K **8/24/8**.
- Os testes existentes executam **1 000 seeds determinísticos** no banco atual, com oráculo de quotas/grupos/diversidade, unicidade, determinismo, inversão da ordem do pool e chaves após baralhamento. A suite de variedade também verifica 1 000 seeds.
- Comparação integral dos 39/43 itens; versões/metadados, quatro opções, IDs estáveis e chaves inalteradas; 390 pares bilingues com valores numéricos iguais. Os testes estruturais não provam equivalência semântica: esta foi revista separadamente por IA.
- Soluções derivadas para partições, BVA, tabela de decisão, transições, exemplos ATDD, estimativa e priorização; múltipla seleção continua sem crédito parcial. As oito aplicações K3 dos alvos foram revistas sem alterar classificação.
- `.6` retoma exame e prática com as três alternativas originais, ordem, respostas, flags, posição, timestamps, resultados e prazo original. A prática livre mantém prazo nulo; exames mantêm 60/75 minutos. A recuperação não escreve nem migra os dados. Testes usam até um banco atual deliberadamente alterado para provar que a pontuação histórica usa o arquivo.
- E2E novos: exame `.7` determinístico com quatro alternativas e ordem ligada aos IDs, alternância PT/EN e revisão das quatro justificações; prática que seleciona o4 e pontua 0; exame `.6` com três alternativas e revisão histórica; reload de prática `.6` enquanto o arquivo está pendente. Os 50 E2E anteriores mantêm recuperação de `.1`–`.5`, falha/retry e ausência de arquivos numa visita nova.

### Impacto de desempenho

Método igual ao da fase 5C: build Vite observado por plugin Rollup, preview local, Chromium headless 156.0.8078.4, Node 24.19.0, Ryzen Z1 Extreme/16 CPUs lógicas/13 628 198 912 B RAM, sem throttling e com outros processos presentes. Três contextos frios por cenário e um reload quente por contexto. Não se comparam estes tempos como benchmark universal ou experiência num telemóvel real.

| Métrica JS                                                    | Fase 5C (.6 ativa) | Fase 5B (.7 ativa) |
| ------------------------------------------------------------- | -----------------: | -----------------: |
| Entrada inicial minificada                                    |          550 677 B |          584 109 B |
| Entrada inicial gzip                                          |          168 508 B |          177 959 B |
| Transferência JS fria observada, incluindo overhead           |          168 808 B |          178 259 B |
| Total gerado em todos os chunks                               |        1 062 579 B |        1 301 319 B |
| Soma gzip de todos os chunks                                  |          293 182 B |          355 072 B |
| Arquivos no grafo inicial / pedidos históricos no painel novo |              0 / 0 |              0 / 0 |

Acréscimo inicial **33 432 B minificados (+6,1%) /9 451 B gzip (+5,6%)**, compatível com 39 alternativas e explicações adicionais e reformulação dos distratores, sem novas dependências. O crescimento total inclui o novo arquivo `.6`, **205 308 B minificados /52 439 B gzip**, carregado a pedido. Os cinco chunks anteriores conservam exatamente os nomes e tamanhos da fase 5C. Não se confundiu crescimento do total arquivado com transferência inicial; o build tem agora sete chunks JS. O aviso da entrada acima de 500 kB e os avisos de comentários Zod permanecem visíveis.

Painel novo frio: **238–276 ms**, reload quente **48–59 ms**, um pedido JS, zero arquivos. Recuperação `.6` fria/quente: exame **237–257/84–357 ms**, prática de 82 perguntas **241–254/75–89 ms**, painel com histórico concluído **272–296/73–90 ms**. Abrir a revisão histórica depois do painel: **179–242/99–121 ms**. Cada cenário `.6` solicita apenas entrada + chunk `.6` (230 998 B JS transferidos frios); no reload quente, 600 B de overhead observados. Houve uma observação de reload quente do exame a 357 ms; não foi descartada nem se aumentou timeout para a esconder. A `.6` era ativa na baseline anterior, pelo que não há medição histórica `.6` estritamente equivalente antes desta fase. A mediana fria do painel 5C foi ~285 ms e agora ~251 ms; a amostra/caches não permitem atribuir uma aceleração ao conteúdo novo. O sinal de desempenho relevante é o aumento inicial moderado e a preservação de zero arquivo inicial.

### Execuções e limites

Os oito E2E novos passaram em desktop e mobile Chromium, dois workers, **8/8**, exit 0 (21,2 s Playwright). A primeira suite com os testes novos de manutenção teve **119/120, exit 1**: uma asserção nova esperava expiração da prática livre, cujo contrato é prazo nulo/Infinity. Foi corrigida a asserção, acrescentando verificações distintas de prática sem prazo e exame a 75 minutos, inclusive limite do timestamp de conclusão. Não se alterou o produto nem um timeout para corrigir essa falha. Repetição posterior: **120/120 em 14 ficheiros, exit 0**, 16,08 s Vitest. A primeira passagem, anterior à inclusão dos sete testes novos, tinha 113/113.

| Comando              | Resultado final                                                                                         | Exit code |
| -------------------- | ------------------------------------------------------------------------------------------------------- | --------: |
| npm run typecheck    | PASS (5,31 s)                                                                                           |         0 |
| npm run lint         | PASS (6,30 s)                                                                                           |         0 |
| npm run format:check | PASS; repetido após a documentação final                                                                |         0 |
| npm test             | **120/120**, 14 ficheiros; execução final após preservar a restrição original de tl-035, 17,74 s Vitest |         0 |
| npm run build        | PASS; entrada index-BOSP4dkl.js coincide com a medição final (8,05 s do comando)                        |         0 |
| npm run test:e2e     | **58/58 com 8 workers**, sem retries locais; 40,4 s Playwright /41,81 s do comando                      |         0 |
| git diff --check     | Sem erros de whitespace                                                                                 |         0 |

A suite E2E completa anterior também passou 58/58 antes da última conferência textual. Essa conferência repôs em tl-035 a condição original de exclusividade da falha na versão 82/dados C; os testes e a medição foram repetidos sobre o texto final. O gráfico de chunks e a rede continuam a demonstrar zero arquivo histórico no painel novo. Os seis hashes e a comparação de 39 alterados/43 iguais mantêm-se válidos. O motor, schema partilhado, blueprint, configuração Playwright e dependências anteriores continuam intactos, exceto as extensões de reconhecimento da revisão .6 documentadas acima.

Evidência local em `tmp/phase5b-*`: inventário/hashes do trabalho pré-existente, banco anterior, validação de três lotes (15/28/39 itens), apresentação sem chaves, resoluções registadas, contestação, métricas editoriais, comparação de 39/43 objetos e relatório de produção com grafo e rede. Os PDFs oficiais e extrações não foram incorporados no site ou nos novos arquivos. Não há push/deploy, novas dependências, alterações KAVTRIS ou limpeza destrutiva.

Restam revisão académica humana independente, teste com candidatos e calibração de dificuldade/discriminação. As 43 perguntas fora do âmbito conservam também as suas limitações anteriores. Persistem algumas pistas de comprimento e exercícios simples, documentados por ID na auditoria. A contestação foi uma passagem separada do mesmo agente, não uma revisão independente entre fornecedores; o resultado PASS é limitado à avaliação por IA. Não se atribuiu aprovação humana nem equivalência/acreditação ISTQB/PSTQB.
