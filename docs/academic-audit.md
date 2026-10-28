> Revisão atual **2026-10-27.7**: [Fase 5B — revisão de distratores](#fase-5b--revisão-final-6--7). Registos anteriores preservados como histórico.

> Revisão atual **2026-10-27.6**: [Fase 5A — variedade e K3](#fase-5a--variedade-e-k3), no fim. Os registos anteriores são históricos.

﻿# Auditoria académica e PT-PT — TestLearn

> Revisão atual **2026-10-27.5**: ver a [manutenção da fase 4.1](#fase-41--correções-bilingues-controladas), no fim. Os registos das fases anteriores são históricos.

> O registo individual das 40 perguntas iniciais corresponde à fase 2. A fase 4 está registada no fim deste documento: **66 perguntas e cobertura nominal dos 64 LO**, com aprovação humana pendente. A fase 3 acrescentou sete perguntas e um gerador alinhado: ver o [relatório de validação do blueprint](blueprint-validation.md) e a atualização no fim deste documento. As conclusões históricas de distribuição não descrevem os novos exames.

Data: **27-10-2026**. Revisão **assistida por IA**, realizada pelo agente Codex; **não é revisão humana independente, certificação, acreditação ou aprovação ISTQB/PSTQB**. Referência de execução: banco `2026-10-27.1` → `2026-10-27.2`.

## Resultado da fase 2

| Indicador                                          | Quantidade |
| -------------------------------------------------- | ---------: |
| Questões revistas individualmente                  |         40 |
| PASS na avaliação inicial                          |         18 |
| NEEDS_CORRECTION na avaliação inicial              |         21 |
| AMBIGUOUS na avaliação inicial                     | 1 (tl-003) |
| Questões corrigidas/melhoradas                     |         22 |
| PASS após correções, limitado à revisão por IA     |         40 |
| AMBIGUOUS / INSUFFICIENT_EVIDENCE / BLOCKED finais |  0 / 0 / 0 |
| Traduções PT-PT revistas por IA                    |         40 |
| HUMAN_APPROVED                                     |      **0** |
| Questões a aguardar aprovação académica humana     |     **40** |
| Traduções a aguardar aprovação humana              |     **40** |

PASS significa apenas que não foi identificado outro problema técnico ou linguístico nesta auditoria, segundo as fontes indicadas. Não prova dificuldade equivalente a exame, qualidade psicométrica ou ausência de erros. Não se atribuiu qualquer flag de aprovação humana.

## Inventário e consulta real

Todos os caminhos abaixo são relativos à pasta absoluta **`C:\TestLearn\docs\Certified Tester Foundation Level (CTFL) v4.0\`**. As 18 referências foram encontradas localmente, abertas e inventariadas; o âmbito efetivamente lido é indicado individualmente. O nome do ficheiro não foi considerado prova da versão: foram consultadas capas/cabeçalhos. Os PDFs e as extrações de trabalho ficam excluídos do Git; não foram adicionados a `public/` ou ao banco de perguntas.

| Ficheiro local (dentro da pasta acima)                | Versão observada                                 | Páginas | Consulta efetiva                                                                 |
| ----------------------------------------------------- | ------------------------------------------------ | ------: | -------------------------------------------------------------------------------- |
| Foundation4.0_PT.pdf                                  | CTFL 4.0; folheto sem versão editorial declarada |       2 | Inventariado e capa consultada; não usado como autoridade para aprovar perguntas |
| ISTQB_CTFL_Accreditation-Guidelines_v4.0.pdf          | Capa: 0.3 (apesar do nome v4.0)                  |       6 | Inventariado e capa consultada; não usado como autoridade para aprovar perguntas |
| ISTQB_CTFL_Release-Notes_v4.0_CHzRtzh.pdf             | 4.0 / 26-04-2023                                 |       2 | Inventariado e capa consultada; não usado como autoridade para aprovar perguntas |
| ISTQB_CTFL_Sample-Exam-Answers_v4.0_PT_v1.0 (1).pdf   | 1.0; cabeçalho 12-04-2023                        |      28 | Capa e PDF pp.7, 17                                                              |
| ISTQB_CTFL_Sample-Exam-Questions_v4.0_PT_v1.0 (1).pdf | 1.0 / 11-11-2024                                 |      22 | Capa e PDF p.13 (amostra de estilo/terminologia; não revisão integral do exame)  |
| ISTQB_CTFL_Syllabus-v4.0-PT_v1.0 (1).pdf              | 4.0; tradução PT 1.0, páginas 21-04-2023         |      85 | Terminologia; secções correspondentes nas páginas citadas                        |
| ISTQB_CTFL_Syllabus-v4.0.pdf                          | 4.0 / 21-04-2023                                 |      74 | Inventariado e capa consultada; não usado como autoridade para aprovar perguntas |
| ISTQB_CTFL_Syllabus_v4.0.1.pdf                        | 4.0.1 / 15-09-2024                               |      78 | Autoridade técnica; LO pp.14/24/32/38/47/58 e secções citadas por pergunta       |
| ISTQB_CTFL_v4.0_Sample-Exam-A-Answers_v1.7.pdf        | 1.7 / 01-04-2025                                 |      38 | Capa e PDF pp.7, 18                                                              |
| ISTQB_CTFL_v4.0_Sample-Exam-A-Questions_v1.7.pdf      | 1.7 / 01-04-2025                                 |      31 | Capa e PDF p.13 (amostra de estilo/terminologia; não revisão integral do exame)  |
| ISTQB_CTFL_v4.0_Sample-Exam-B-Answers_v1.7.pdf        | 1.7 / 01-04-2025                                 |      37 | Capa e PDF pp.6, 25                                                              |
| ISTQB_CTFL_v4.0_Sample-Exam-B-Questions_v1.7.pdf      | 1.7 / 01-04-2025                                 |      21 | Capa e PDF p.13 (amostra de estilo/terminologia; não revisão integral do exame)  |
| ISTQB_CTFL_v4.0_Sample-Exam-C-Answers_v1.6.pdf        | 1.6 / 25-03-2025                                 |      37 | Capa e PDF pp.6, 26                                                              |
| ISTQB_CTFL_v4.0_Sample-Exam-C-Questions_v1.6.pdf      | 1.6 / 25-03-2025                                 |      21 | Capa e PDF p.13 (amostra de estilo/terminologia; não revisão integral do exame)  |
| ISTQB_CTFL_v4.0_Sample-Exam-D-Answers_v1.5.pdf        | 1.5 / 02-05-2025                                 |      35 | Capa e PDF pp.6, 22                                                              |
| ISTQB_CTFL_v4.0_Sample-Exam-D-Questions_v1.5.pdf      | 1.5 / 02-05-2025                                 |      20 | Capa e PDF p.13 (amostra de estilo/terminologia; não revisão integral do exame)  |
| ISTQB_Exam-Structure-Tables_v1.19.pdf                 | 1.19 / 19-08-2026                                |      37 | PDF pp.1, 3–5; tabelas 3–5 também renderizadas e inspecionadas visualmente       |
| ISTQB_Exam-Structures-and-Rules_v1.2.pdf              | 1.2 / 02-05-2025                                 |      10 | PDF pp.6, 8–10; estrutura, pontos e duração                                      |

Não faltou nenhuma das referências principais solicitadas. O syllabus inglês **4.0.1** prevalece tecnicamente; o português **4.0** é referência terminológica e não uma tradução do erratum 4.0.1. Datas divergentes entre as capas portuguesas de perguntas e respostas foram registadas, sem presumir que constituem uma versão sincronizada. Os documentos de acreditação, release notes, folheto e syllabus inglês 4.0 foram apenas inventariados/capas: não se afirma revisão integral desses documentos.

Os exames A–D e PT foram consultados **por amostragem**, para distinguir aplicação K3, qualidade dos distratores, instruções de seleção e organização das explicações. Não se copiaram enunciados, tabelas, alternativas ou conjuntos oficiais para a aplicação. A diferença de exigência face aos exemplos oficiais é um risco editorial, mesmo após correções.

### Identificação reproduzível das fontes

Hashes SHA-256 dos ficheiros locais, para reconhecer exatamente a versão usada (não certificam autenticidade editorial nem substituem verificação junto do emissor):

| Ficheiro                                              | SHA-256                                                            |
| ----------------------------------------------------- | ------------------------------------------------------------------ |
| Foundation4.0_PT.pdf                                  | `443181d44a780da057a6522404d09db5f8783740cf6da3fe804f6918b263689e` |
| ISTQB_CTFL_Accreditation-Guidelines_v4.0.pdf          | `af7eda71b029e446319c7b32329ab41f2b759f128fd2947971411b69c41f4694` |
| ISTQB_CTFL_Release-Notes_v4.0_CHzRtzh.pdf             | `1d106d8d56302872c2b56e61d278f57b77ee60259cf7bb7f7c509adc15b14474` |
| ISTQB_CTFL_Sample-Exam-Answers_v4.0_PT_v1.0 (1).pdf   | `05e555100cf91f8f1b072e20a367c13d9322bc01a552323ebedbe3178be5e5de` |
| ISTQB_CTFL_Sample-Exam-Questions_v4.0_PT_v1.0 (1).pdf | `80cd71693ef5b4c2e92abb0e626b2c4f2f892ccc274979213ff3ddceb4cb5c5b` |
| ISTQB_CTFL_Syllabus-v4.0-PT_v1.0 (1).pdf              | `ee82959e813673016a4872ad805b883b74e702224a307b728c807c24a269a496` |
| ISTQB_CTFL_Syllabus-v4.0.pdf                          | `887e0bc0759cbc9f19883c3abb3e0444b781b714b7cab2582731009296e38b5b` |
| ISTQB_CTFL_Syllabus_v4.0.1.pdf                        | `3b072f81db5c7671aadacc42553e726faa93913a969cc7a89e9dc28c2318d1f1` |
| ISTQB_CTFL_v4.0_Sample-Exam-A-Answers_v1.7.pdf        | `cd7724806a645a128be41b426782570998fa1694ef5eff4a3239756cc2b579da` |
| ISTQB_CTFL_v4.0_Sample-Exam-A-Questions_v1.7.pdf      | `f2996eec47914c04ea5b94422a5d98018ef3b04e44d27900b76a68050a64efb3` |
| ISTQB_CTFL_v4.0_Sample-Exam-B-Answers_v1.7.pdf        | `d4b616a7927216767e1aae3f1240a7fa8e124c0a423f58ad218228e32814b335` |
| ISTQB_CTFL_v4.0_Sample-Exam-B-Questions_v1.7.pdf      | `861ae3a9658aca04b61b841bf9f53d68dc9b5e0c780aa6fb68c2fb2760f3982d` |
| ISTQB_CTFL_v4.0_Sample-Exam-C-Answers_v1.6.pdf        | `dd85bff947aadb22b724ecb1a1104a9ee1d9e059e14390c2ee92c91d8fd65683` |
| ISTQB_CTFL_v4.0_Sample-Exam-C-Questions_v1.6.pdf      | `0ae653c7704674267674ed6cfd2f84b3b7a89b7e8017563b8c8aaa0e132c3141` |
| ISTQB_CTFL_v4.0_Sample-Exam-D-Answers_v1.5.pdf        | `aa55a690e819755f42cde11b2340b823353a3bbcec48bbcab5c7b42744f4144e` |
| ISTQB_CTFL_v4.0_Sample-Exam-D-Questions_v1.5.pdf      | `fe11bffb1c823a4addb57bfedd9a88f56e8abf8f87d6716976ab53d5b14dc720` |
| ISTQB_Exam-Structure-Tables_v1.19.pdf                 | `bacdbba4526afa3bb80081756e81cac90f7397b79e4a3618da641aa51c9fa4fc` |
| ISTQB_Exam-Structures-and-Rules_v1.2.pdf              | `caca1b3aa513e93637f20145fabfc18cc666880c522239dbcc5b3a0d0a5f80fa` |

## Método e integridade

1. Inspecionados README, relatórios existentes, banco real, schemas Zod, motor, pontuação, persistência, traduções, interface e testes. O Git já continha a implementação não commitada da fase 1; foi preservada.
2. Comparadas as 40 perguntas EN/PT com a secção técnica aplicável e os LO/K-levels do syllabus 4.0.1. LO e secção de conteúdo foram distinguidos: por exemplo, FL-5.5.1 aponta para o conteúdo da secção 5.5, não para uma secção 5.5.1 inexistente.
3. Resolvidos os oito cenários K3 por raciocínio/cálculo; ver secção própria. Verificadas as chaves e **cada** alternativa, dados suficientes, sentido das traduções, condições e explicações. Não foi alterado nenhum LO, K-level ou ID para preencher quotas.
4. Registado o estado original e final de cada pergunta em `src/data/academic-review.json`. Os metadados da aplicação usam `AI_REVIEWED` e `humanApproval: PENDING`; os 22 itens alterados passam de versão 1 para 2. Os outros 18 conservam versão 1 e recebem apenas metadados de revisão por IA.
5. Preservado exatamente o banco original próprio em `src/data/archive/questions-2026-10-27.1.json`. As sessões antigas continuam a resolver texto, opções, explicações e chave pela sua revisão. Não se duplicaram PDFs ou conteúdo oficial. A serialização das sessões antigas não precisa de migração nem ganha snapshots volumosos.
6. Adicionados testes regressivos de conteúdo, grupos de LO, compatibilidade histórica e apresentação Playwright. Estes testes impedem regressões específicas; **não constituem aprovação académica automatizada**.

Os números de página neste relatório são **páginas físicas do PDF, contadas a partir de 1**, coincidentes com a paginação impressa nas secções citadas. EN = syllabus 4.0.1; PT = syllabus português 4.0. As conclusões e explicações aqui são paráfrases originais; copyright dos documentos de referência pertence ao ISTQB® e autores indicados nos próprios documentos.

## Registo por pergunta

A chave manteve-se `o1` em todas as perguntas de seleção simples e `o1 + o4` na tl-001. A manutenção do mesmo ID de opção **não** implica que o seu texto seja igual entre revisões; o resolvedor de revisões impede essa substituição em tentativas antigas.

### tl-001

- **LO / nível / capítulo:** FL-1.1.1 / K1 / 1. LO e K-level confrontados com a listagem do capítulo no syllabus; correspondência preservada.
- **Estado:** NEEDS_CORRECTION → **PASS (AI_REVIEWED)**; HUMAN_APPROVED = não.
- **Evidência:** EN, secção 1.1.1, pp. 15; PT, secção correspondente, pp. 16.
- **Achado técnico e opções:** Dois objetivos corretos, o1/o4; as garantias absolutas o2/o3 são falsas. Explicação geral cobria só informação para decisões.
- **Tradução:** Esclarecida a decisão de lançamento e a justificação dos dois objetivos.
- **Correção recomendada:** Explicação geral expandida; chave o1/o4 preservada.
- **Alteração aplicada:** Explicação geral expandida; chave o1/o4 preservada.
- **Chave:** o1 + o4, exatamente duas escolhas; versão 1 → 2. Nenhuma opção foi renumerada.
- **Incerteza restante:** Sem problema técnico/linguístico adicional identificado nesta revisão por IA; dificuldade e qualidade psicométrica não calibradas, aprovação humana pendente.

### tl-002

- **LO / nível / capítulo:** FL-1.2.2 / K1 / 1. LO e K-level confrontados com a listagem do capítulo no syllabus; correspondência preservada.
- **Estado:** PASS → **PASS (AI_REVIEWED)**; HUMAN_APPROVED = não.
- **Evidência:** EN, secção 1.2.2, pp. 17; PT, secção correspondente, pp. 18.
- **Achado técnico e opções:** QA preventivo/orientado a processos; execução e reporte avaliam o produto.
- **Tradução:** Equivalência PT-PT confirmada; sem alteração.
- **Correção recomendada:** Manter; submeter a revisão humana independente.
- **Alteração aplicada:** Nenhuma.
- **Chave:** o1, uma escolha; versão 1. Nenhuma opção foi renumerada.
- **Incerteza restante:** Sem problema técnico/linguístico adicional identificado nesta revisão por IA; dificuldade e qualidade psicométrica não calibradas, aprovação humana pendente.

### tl-003

- **LO / nível / capítulo:** FL-1.1.2 / K2 / 1. LO e K-level confrontados com a listagem do capítulo no syllabus; correspondência preservada.
- **Estado:** AMBIGUOUS → **PASS (AI_REVIEWED)**; HUMAN_APPROVED = não.
- **Evidência:** EN, secção 1.1.2, pp. 16; PT, secção correspondente, pp. 17.
- **Achado técnico e opções:** AMBIGUOUS original: reproduzir uma falha consta do processo de debugging, pelo que o2 também é defensável; a explicação o2 estava errada.
- **Tradução:** Manter debugging como no PSTQB e acrescentar depuração como sinónimo explicativo.
- **Correção recomendada:** Enunciado focado na distinção; o2 agora compara resultados durante teste; explicação reconhece reprodução no debugging.
- **Alteração aplicada:** Enunciado focado na distinção; o2 agora compara resultados durante teste; explicação reconhece reprodução no debugging.
- **Chave:** o1, uma escolha; versão 1 → 2. Nenhuma opção foi renumerada.
- **Incerteza restante:** Sem problema técnico/linguístico adicional identificado nesta revisão por IA; dificuldade e qualidade psicométrica não calibradas, aprovação humana pendente.

### tl-004

- **LO / nível / capítulo:** FL-1.2.3 / K2 / 1. LO e K-level confrontados com a listagem do capítulo no syllabus; correspondência preservada.
- **Estado:** PASS → **PASS (AI_REVIEWED)**; HUMAN_APPROVED = não.
- **Evidência:** EN, secção 1.2.3, pp. 17; PT, secção correspondente, pp. 18, 19.
- **Achado técnico e opções:** A interpretação é erro humano, a fórmula é defeito e o comportamento incorreto em execução é falha.
- **Tradução:** Equivalência entre as três distinções preservada.
- **Correção recomendada:** Manter; submeter a revisão humana independente.
- **Alteração aplicada:** Nenhuma.
- **Chave:** o1, uma escolha; versão 1. Nenhuma opção foi renumerada.
- **Incerteza restante:** Sem problema técnico/linguístico adicional identificado nesta revisão por IA; dificuldade e qualidade psicométrica não calibradas, aprovação humana pendente.

### tl-005

- **LO / nível / capítulo:** FL-1.3.1 / K2 / 1. LO e K-level confrontados com a listagem do capítulo no syllabus; correspondência preservada.
- **Estado:** PASS → **PASS (AI_REVIEWED)**; HUMAN_APPROVED = não.
- **Evidência:** EN, secção 1.3, pp. 17, 18; PT, secção correspondente, pp. 18, 19.
- **Achado técnico e opções:** Princípio do desgaste: variar testes sem eliminar regressão útil; restantes opções não decorrem da execução sem novos defeitos.
- **Tradução:** Terminologia e exceção da regressão confirmadas.
- **Correção recomendada:** Manter; submeter a revisão humana independente.
- **Alteração aplicada:** Nenhuma.
- **Chave:** o1, uma escolha; versão 1. Nenhuma opção foi renumerada.
- **Incerteza restante:** Sem problema técnico/linguístico adicional identificado nesta revisão por IA; dificuldade e qualidade psicométrica não calibradas, aprovação humana pendente.

### tl-006

- **LO / nível / capítulo:** FL-1.4.1 / K2 / 1. LO e K-level confrontados com a listagem do capítulo no syllabus; correspondência preservada.
- **Estado:** NEEDS_CORRECTION → **PASS (AI_REVIEWED)**; HUMAN_APPROVED = não.
- **Evidência:** EN, secção 1.4.1, pp. 18, 19; PT, secção correspondente, pp. 20, 21.
- **Achado técnico e opções:** Derivar condições de requisitos exemplifica análise; execução e conclusão são atividades diferentes.
- **Tradução:** PSTQB usa conclusão do teste.
- **Correção recomendada:** Conclusão de teste → Conclusão do teste; tester → testador.
- **Alteração aplicada:** Conclusão de teste → Conclusão do teste; tester → testador.
- **Chave:** o1, uma escolha; versão 1 → 2. Nenhuma opção foi renumerada.
- **Incerteza restante:** Sem problema técnico/linguístico adicional identificado nesta revisão por IA; dificuldade e qualidade psicométrica não calibradas, aprovação humana pendente.

### tl-007

- **LO / nível / capítulo:** FL-1.4.4 / K2 / 1. LO e K-level confrontados com a listagem do capítulo no syllabus; correspondência preservada.
- **Estado:** PASS → **PASS (AI_REVIEWED)**; HUMAN_APPROVED = não.
- **Evidência:** EN, secção 1.4.4, pp. 20, 21; PT, secção correspondente, pp. 22, 23.
- **Achado técnico e opções:** Ligações suportam impacto e cobertura, não reescrevem testes nem substituem análise.
- **Tradução:** Rastreabilidade e análise de impacto consistentes.
- **Correção recomendada:** Manter; submeter a revisão humana independente.
- **Alteração aplicada:** Nenhuma.
- **Chave:** o1, uma escolha; versão 1. Nenhuma opção foi renumerada.
- **Incerteza restante:** Sem problema técnico/linguístico adicional identificado nesta revisão por IA; dificuldade e qualidade psicométrica não calibradas, aprovação humana pendente.

### tl-008

- **LO / nível / capítulo:** FL-1.5.3 / K2 / 1. LO e K-level confrontados com a listagem do capítulo no syllabus; correspondência preservada.
- **Estado:** NEEDS_CORRECTION → **PASS (AI_REVIEWED)**; HUMAN_APPROVED = não.
- **Evidência:** EN, secção 1.5.3, pp. 22, 23; PT, secção correspondente, pp. 25.
- **Achado técnico e opções:** Perspetivas independentes questionam pressupostos; não eliminam responsabilidade nem garantem deteção.
- **Tradução:** Uniformizar tester/testers para testador/testadores.
- **Correção recomendada:** Substituição PT-PT; conceito mantido.
- **Alteração aplicada:** Substituição PT-PT; conceito mantido.
- **Chave:** o1, uma escolha; versão 1 → 2. Nenhuma opção foi renumerada.
- **Incerteza restante:** Sem problema técnico/linguístico adicional identificado nesta revisão por IA; dificuldade e qualidade psicométrica não calibradas, aprovação humana pendente.

### tl-009

- **LO / nível / capítulo:** FL-2.1.2 / K1 / 2. LO e K-level confrontados com a listagem do capítulo no syllabus; correspondência preservada.
- **Estado:** PASS → **PASS (AI_REVIEWED)**; HUMAN_APPROVED = não.
- **Evidência:** EN, secção 2.1.2, pp. 25, 26; PT, secção correspondente, pp. 27, 28.
- **Achado técnico e opções:** Boas práticas aplicáveis ao SDLC: análise em fase de desenvolvimento correspondente; não esperar por instalação nem limitar a um nível.
- **Tradução:** Formulação PT-PT conserva atividades correspondentes.
- **Correção recomendada:** Manter; submeter a revisão humana independente.
- **Alteração aplicada:** Nenhuma.
- **Chave:** o1, uma escolha; versão 1. Nenhuma opção foi renumerada.
- **Incerteza restante:** Sem problema técnico/linguístico adicional identificado nesta revisão por IA; dificuldade e qualidade psicométrica não calibradas, aprovação humana pendente.

### tl-010

- **LO / nível / capítulo:** FL-2.1.3 / K1 / 2. LO e K-level confrontados com a listagem do capítulo no syllabus; correspondência preservada.
- **Estado:** NEEDS_CORRECTION → **PASS (AI_REVIEWED)**; HUMAN_APPROVED = não.
- **Evidência:** EN, secção 2.1.3, pp. 26; PT, secção correspondente, pp. 28.
- **Achado técnico e opções:** TDD escreve testes antes de código; monitorização e testes apenas após entrega não são test-first.
- **Tradução:** PSTQB usa desenvolvimento orientado para testes.
- **Correção recomendada:** Orientado por → orientado para.
- **Alteração aplicada:** Orientado por → orientado para.
- **Chave:** o1, uma escolha; versão 1 → 2. Nenhuma opção foi renumerada.
- **Incerteza restante:** Sem problema técnico/linguístico adicional identificado nesta revisão por IA; dificuldade e qualidade psicométrica não calibradas, aprovação humana pendente.

### tl-011

- **LO / nível / capítulo:** FL-2.2.3 / K2 / 2. LO e K-level confrontados com a listagem do capítulo no syllabus; correspondência preservada.
- **Estado:** PASS → **PASS (AI_REVIEWED)**; HUMAN_APPROVED = não.
- **Evidência:** EN, secção 2.2.3, pp. 30, 31; PT, secção correspondente, pp. 33, 34.
- **Achado técnico e opções:** Repetir o teste da falha após correção confirma; verificar fluxos existentes procura regressões.
- **Tradução:** Confirmação e regressão equivalentes nas opções.
- **Correção recomendada:** Manter; submeter a revisão humana independente.
- **Alteração aplicada:** Nenhuma.
- **Chave:** o1, uma escolha; versão 1. Nenhuma opção foi renumerada.
- **Incerteza restante:** Sem problema técnico/linguístico adicional identificado nesta revisão por IA; dificuldade e qualidade psicométrica não calibradas, aprovação humana pendente.

### tl-012

- **LO / nível / capítulo:** FL-2.2.1 / K2 / 2. LO e K-level confrontados com a listagem do capítulo no syllabus; correspondência preservada.
- **Estado:** NEEDS_CORRECTION → **PASS (AI_REVIEWED)**; HUMAN_APPROVED = não.
- **Evidência:** EN, secção 2.2.1, pp. 28, 29; PT, secção correspondente, pp. 31, 32.
- **Achado técnico e opções:** Interfaces entre componentes internos correspondem a integração de componentes, não aceitação nem integração com outro sistema.
- **Tradução:** Explicitar Teste na designação do terceiro nível.
- **Correção recomendada:** Rótulo PT do distrator clarificado.
- **Alteração aplicada:** Rótulo PT do distrator clarificado.
- **Chave:** o1, uma escolha; versão 1 → 2. Nenhuma opção foi renumerada.
- **Incerteza restante:** Sem problema técnico/linguístico adicional identificado nesta revisão por IA; dificuldade e qualidade psicométrica não calibradas, aprovação humana pendente.

### tl-013

- **LO / nível / capítulo:** FL-2.1.5 / K2 / 2. LO e K-level confrontados com a listagem do capítulo no syllabus; correspondência preservada.
- **Estado:** PASS → **PASS (AI_REVIEWED)**; HUMAN_APPROVED = não.
- **Evidência:** EN, secção 2.1.5, pp. 27; PT, secção correspondente, pp. 29, 30.
- **Achado técnico e opções:** Revisão anterior à programação exemplifica shift left e complementa testes posteriores.
- **Tradução:** Shift left é mantido pelo syllabus português; não traduzido literalmente.
- **Correção recomendada:** Manter; submeter a revisão humana independente.
- **Alteração aplicada:** Nenhuma.
- **Chave:** o1, uma escolha; versão 1. Nenhuma opção foi renumerada.
- **Incerteza restante:** Sem problema técnico/linguístico adicional identificado nesta revisão por IA; dificuldade e qualidade psicométrica não calibradas, aprovação humana pendente.

### tl-014

- **LO / nível / capítulo:** FL-2.3.1 / K2 / 2. LO e K-level confrontados com a listagem do capítulo no syllabus; correspondência preservada.
- **Estado:** PASS → **PASS (AI_REVIEWED)**; HUMAN_APPROVED = não.
- **Evidência:** EN, secção 2.3, pp. 31; PT, secção correspondente, pp. 34.
- **Achado técnico e opções:** Migração do ambiente operacional é motivo para teste de manutenção; funcionalidades existentes podem regredir.
- **Tradução:** Sem desvio de sentido ou terminologia.
- **Correção recomendada:** Manter; submeter a revisão humana independente.
- **Alteração aplicada:** Nenhuma.
- **Chave:** o1, uma escolha; versão 1. Nenhuma opção foi renumerada.
- **Incerteza restante:** Sem problema técnico/linguístico adicional identificado nesta revisão por IA; dificuldade e qualidade psicométrica não calibradas, aprovação humana pendente.

### tl-015

- **LO / nível / capítulo:** FL-3.1.1 / K1 / 3. LO e K-level confrontados com a listagem do capítulo no syllabus; correspondência preservada.
- **Estado:** PASS → **PASS (AI_REVIEWED)**; HUMAN_APPROVED = não.
- **Evidência:** EN, secção 3.1.1, pp. 33; PT, secção correspondente, pp. 36.
- **Achado técnico e opções:** Documento de requisitos é produto revisto estaticamente; as opções restantes descrevem observação de execução.
- **Tradução:** Sem erro identificado; distratores muito fáceis, manter como introdutório.
- **Correção recomendada:** Manter; submeter a revisão humana independente.
- **Alteração aplicada:** Nenhuma.
- **Chave:** o1, uma escolha; versão 1. Nenhuma opção foi renumerada.
- **Incerteza restante:** Sem problema técnico/linguístico adicional identificado nesta revisão por IA; dificuldade e qualidade psicométrica não calibradas, aprovação humana pendente.

### tl-016

- **LO / nível / capítulo:** FL-3.2.3 / K1 / 3. LO e K-level confrontados com a listagem do capítulo no syllabus; correspondência preservada.
- **Estado:** NEEDS_CORRECTION → **PASS (AI_REVIEWED)**; HUMAN_APPROVED = não.
- **Evidência:** EN, secção 3.2.3, pp. 36; PT, secção correspondente, pp. 39.
- **Achado técnico e opções:** Moderador facilita; o distrator fila de apoio não era um papel plausível.
- **Tradução:** PSTQB chama redator/anotador ao scribe.
- **Correção recomendada:** Distratores substituídos por redator e gestor, com responsabilidades corretas.
- **Alteração aplicada:** Distratores substituídos por redator e gestor, com responsabilidades corretas.
- **Chave:** o1, uma escolha; versão 1 → 2. Nenhuma opção foi renumerada.
- **Incerteza restante:** Sem problema técnico/linguístico adicional identificado nesta revisão por IA; dificuldade e qualidade psicométrica não calibradas, aprovação humana pendente.

### tl-017

- **LO / nível / capítulo:** FL-3.1.3 / K2 / 3. LO e K-level confrontados com a listagem do capítulo no syllabus; correspondência preservada.
- **Estado:** PASS → **PASS (AI_REVIEWED)**; HUMAN_APPROVED = não.
- **Evidência:** EN, secção 3.1.3, pp. 34; PT, secção correspondente, pp. 37.
- **Achado técnico e opções:** Revisão encontra defeito diretamente; execução observa falha; contradições também são problemas.
- **Tradução:** Distinção defeito/falha preservada.
- **Correção recomendada:** Manter; submeter a revisão humana independente.
- **Alteração aplicada:** Nenhuma.
- **Chave:** o1, uma escolha; versão 1. Nenhuma opção foi renumerada.
- **Incerteza restante:** Sem problema técnico/linguístico adicional identificado nesta revisão por IA; dificuldade e qualidade psicométrica não calibradas, aprovação humana pendente.

### tl-018

- **LO / nível / capítulo:** FL-3.2.4 / K2 / 3. LO e K-level confrontados com a listagem do capítulo no syllabus; correspondência preservada.
- **Estado:** NEEDS_CORRECTION → **PASS (AI_REVIEWED)**; HUMAN_APPROVED = não.
- **Evidência:** EN, secção 3.2.4, pp. 36, 37; PT, secção correspondente, pp. 39, 40.
- **Achado técnico e opções:** Inspeção é a revisão mais formal e recolhe métricas; distratores originais não nomeavam tipos formais comparáveis.
- **Tradução:** Revisão técnica e walkthrough seguem termos PSTQB.
- **Correção recomendada:** Distratores agora são tipos de revisão reconhecidos; justificação específica.
- **Alteração aplicada:** Distratores agora são tipos de revisão reconhecidos; justificação específica.
- **Chave:** o1, uma escolha; versão 1 → 2. Nenhuma opção foi renumerada.
- **Incerteza restante:** Sem problema técnico/linguístico adicional identificado nesta revisão por IA; dificuldade e qualidade psicométrica não calibradas, aprovação humana pendente.

### tl-019

- **LO / nível / capítulo:** FL-4.1.1 / K2 / 4. LO e K-level confrontados com a listagem do capítulo no syllabus; correspondência preservada.
- **Estado:** PASS → **PASS (AI_REVIEWED)**; HUMAN_APPROVED = não.
- **Evidência:** EN, secção 4.1, pp. 39; PT, secção correspondente, pp. 42.
- **Achado técnico e opções:** Técnicas caixa-preta partem de comportamento especificado; caixa-branca usa estrutura; experiência não é a base descrita.
- **Tradução:** Caixa-preta/caixa-branca conforme terminologia PT.
- **Correção recomendada:** Manter; submeter a revisão humana independente.
- **Alteração aplicada:** Nenhuma.
- **Chave:** o1, uma escolha; versão 1. Nenhuma opção foi renumerada.
- **Incerteza restante:** Sem problema técnico/linguístico adicional identificado nesta revisão por IA; dificuldade e qualidade psicométrica não calibradas, aprovação humana pendente.

### tl-020

- **LO / nível / capítulo:** FL-4.3.1 / K2 / 4. LO e K-level confrontados com a listagem do capítulo no syllabus; correspondência preservada.
- **Estado:** PASS → **PASS (AI_REVIEWED)**; HUMAN_APPROVED = não.
- **Evidência:** EN, secção 4.3.1, pp. 42; PT, secção correspondente, pp. 46.
- **Achado técnico e opções:** 100% de instruções não implica 100% de ramos nem correção de requisitos; nem execução de uma instrução garante revelar o defeito.
- **Tradução:** Bateria e cobertura de instruções adequadas.
- **Correção recomendada:** Manter; submeter a revisão humana independente.
- **Alteração aplicada:** Nenhuma.
- **Chave:** o1, uma escolha; versão 1. Nenhuma opção foi renumerada.
- **Incerteza restante:** Sem problema técnico/linguístico adicional identificado nesta revisão por IA; dificuldade e qualidade psicométrica não calibradas, aprovação humana pendente.

### tl-021

- **LO / nível / capítulo:** FL-4.3.2 / K2 / 4. LO e K-level confrontados com a listagem do capítulo no syllabus; correspondência preservada.
- **Estado:** PASS → **PASS (AI_REVIEWED)**; HUMAN_APPROVED = não.
- **Evidência:** EN, secção 4.3.2, pp. 43; PT, secção correspondente, pp. 46, 47.
- **Achado técnico e opções:** Um dos dois ramos explicitamente considerados: 1/2 × 100 = 50%; não confundir com cobertura global de todos os ramos do programa.
- **Tradução:** Ramos conforme PSTQB.
- **Correção recomendada:** Manter; submeter a revisão humana independente.
- **Alteração aplicada:** Nenhuma.
- **Chave:** o1, uma escolha; versão 1. Nenhuma opção foi renumerada.
- **Incerteza restante:** Sem problema técnico/linguístico adicional identificado nesta revisão por IA; dificuldade e qualidade psicométrica não calibradas, aprovação humana pendente.

### tl-022

- **LO / nível / capítulo:** FL-4.4.1 / K2 / 4. LO e K-level confrontados com a listagem do capítulo no syllabus; correspondência preservada.
- **Estado:** NEEDS_CORRECTION → **PASS (AI_REVIEWED)**; HUMAN_APPROVED = não.
- **Evidência:** EN, secção 4.4.1, pp. 43, 44; PT, secção correspondente, pp. 47, 48.
- **Achado técnico e opções:** Conhecimento de falhas em produtos semelhantes fundamenta error guessing; não há critério estrutural nem exaustividade.
- **Tradução:** PSTQB usa antecipação de erros, não suposição de erros.
- **Correção recomendada:** Termo corrigido e tester substituído por testador.
- **Alteração aplicada:** Termo corrigido e tester substituído por testador.
- **Chave:** o1, uma escolha; versão 1 → 2. Nenhuma opção foi renumerada.
- **Incerteza restante:** Sem problema técnico/linguístico adicional identificado nesta revisão por IA; dificuldade e qualidade psicométrica não calibradas, aprovação humana pendente.

### tl-023

- **LO / nível / capítulo:** FL-4.4.2 / K2 / 4. LO e K-level confrontados com a listagem do capítulo no syllabus; correspondência preservada.
- **Estado:** NEEDS_CORRECTION → **PASS (AI_REVIEWED)**; HUMAN_APPROVED = não.
- **Evidência:** EN, secção 4.4.2, pp. 44; PT, secção correspondente, pp. 48.
- **Achado técnico e opções:** Exploração combina aprendizagem, conceção, execução e avaliação; a duração delimita a sessão e a carta orienta-a.
- **Tradução:** Missão limitadora da sessão não traduz test charter/timebox adequadamente.
- **Correção recomendada:** Sessão de duração definida orientada por carta de testes em ambas as línguas; avaliação explicitada.
- **Alteração aplicada:** Sessão de duração definida orientada por carta de testes em ambas as línguas; avaliação explicitada.
- **Chave:** o1, uma escolha; versão 1 → 2. Nenhuma opção foi renumerada.
- **Incerteza restante:** Sem problema técnico/linguístico adicional identificado nesta revisão por IA; dificuldade e qualidade psicométrica não calibradas, aprovação humana pendente.

### tl-024

- **LO / nível / capítulo:** FL-4.5.2 / K2 / 4. LO e K-level confrontados com a listagem do capítulo no syllabus; correspondência preservada.
- **Estado:** NEEDS_CORRECTION → **PASS (AI_REVIEWED)**; HUMAN_APPROVED = não.
- **Evidência:** EN, secção 4.5.2, pp. 45, 46; PT, secção correspondente, pp. 49, 50.
- **Achado técnico e opções:** Dado/Quando/Então é orientado para cenários; os dois distratores originais não eram critérios de aceitação verificáveis.
- **Tradução:** Dado é variante abreviada de Dado que; regra/cenário agora comparáveis.
- **Correção recomendada:** Distratores transformados em critérios orientados para regras, sem alterar a chave.
- **Alteração aplicada:** Distratores transformados em critérios orientados para regras, sem alterar a chave.
- **Chave:** o1, uma escolha; versão 1 → 2. Nenhuma opção foi renumerada.
- **Incerteza restante:** Sem problema técnico/linguístico adicional identificado nesta revisão por IA; dificuldade e qualidade psicométrica não calibradas, aprovação humana pendente.

### tl-025

- **LO / nível / capítulo:** FL-4.2.1 / K3 / 4. LO e K-level confrontados com a listagem do capítulo no syllabus; correspondência preservada.
- **Estado:** PASS → **PASS (AI_REVIEWED)**; HUMAN_APPROVED = não.
- **Evidência:** EN, secção 4.2.1, pp. 39, 40; PT, secção correspondente, pp. 42, 43.
- **Achado técnico e opções:** Partições inteiras x<3, 3≤x≤8, x>8. 2/5/9 cobre as três; 3/5/8 só a válida; 2/9 omite a válida. Mínimo = 3.
- **Tradução:** Particionamento por equivalências conforme PSTQB; dados suficientes.
- **Correção recomendada:** Manter; submeter a revisão humana independente.
- **Alteração aplicada:** Nenhuma.
- **Chave:** o1, uma escolha; versão 1. Nenhuma opção foi renumerada.
- **Incerteza restante:** Sem problema técnico/linguístico adicional identificado nesta revisão por IA; dificuldade e qualidade psicométrica não calibradas, aprovação humana pendente.

### tl-026

- **LO / nível / capítulo:** FL-4.2.2 / K3 / 4. LO e K-level confrontados com a listagem do capítulo no syllabus; correspondência preservada.
- **Estado:** NEEDS_CORRECTION → **PASS (AI_REVIEWED)**; HUMAN_APPROVED = não.
- **Evidência:** EN, secção 4.2.2, pp. 40; PT, secção correspondente, pp. 43, 44.
- **Achado técnico e opções:** Partições x≤9, 10≤x≤20, x≥21: fronteiras 9/10/20/21, conjunto exato o1. A explicação não distinguia as variantes de BVA.
- **Tradução:** Usar análise de valor fronteira de 2 valores e explicitar rejeição dos restantes inteiros.
- **Correção recomendada:** Condições e justificação completas; chave mantida. Não acrescentada uma pergunta de 3 valores.
- **Alteração aplicada:** Condições e justificação completas; chave mantida. Não acrescentada uma pergunta de 3 valores.
- **Chave:** o1, uma escolha; versão 1 → 2. Nenhuma opção foi renumerada.
- **Incerteza restante:** Sem problema técnico/linguístico adicional identificado nesta revisão por IA; dificuldade e qualidade psicométrica não calibradas, aprovação humana pendente.

### tl-027

- **LO / nível / capítulo:** FL-4.2.3 / K3 / 4. LO e K-level confrontados com a listagem do capítulo no syllabus; correspondência preservada.
- **Estado:** NEEDS_CORRECTION → **PASS (AI_REVIEWED)**; HUMAN_APPROVED = não.
- **Evidência:** EN, secção 4.2.3, pp. 41; PT, secção correspondente, pp. 44, 45.
- **Achado técnico e opções:** R1 é membro=T e total≥50=T, logo membro com 60; outras entradas falham uma condição. Tabela original era transposta face à convenção do syllabus.
- **Tradução:** Notação T/F/X explicada em PT; sentido das condições preservado.
- **Correção recomendada:** Tabela convencional com regras em colunas e condições/ação em linhas; referência a R1.
- **Alteração aplicada:** Tabela convencional com regras em colunas e condições/ação em linhas; referência a R1.
- **Chave:** o1, uma escolha; versão 1 → 2. Nenhuma opção foi renumerada.
- **Incerteza restante:** Sem problema técnico/linguístico adicional identificado nesta revisão por IA; dificuldade e qualidade psicométrica não calibradas, aprovação humana pendente.

### tl-028

- **LO / nível / capítulo:** FL-4.2.4 / K3 / 4. LO e K-level confrontados com a listagem do capítulo no syllabus; correspondência preservada.
- **Estado:** NEEDS_CORRECTION → **PASS (AI_REVIEWED)**; HUMAN_APPROVED = não.
- **Evidência:** EN, secção 4.2.4, pp. 41, 42; PT, secção correspondente, pp. 45, 46.
- **Achado técnico e opções:** Rascunho→Pendente→Paga por Submeter/Pagar. Original não definia todas as combinações, incluindo Submeter em Pendente.
- **Tradução:** Estados e eventos equivalentes em ambas as línguas.
- **Correção recomendada:** Combinações restantes explicitamente inválidas e explicação do segundo Submeter.
- **Alteração aplicada:** Combinações restantes explicitamente inválidas e explicação do segundo Submeter.
- **Chave:** o1, uma escolha; versão 1 → 2. Nenhuma opção foi renumerada.
- **Incerteza restante:** Sem problema técnico/linguístico adicional identificado nesta revisão por IA; dificuldade e qualidade psicométrica não calibradas, aprovação humana pendente.

### tl-029

- **LO / nível / capítulo:** FL-4.5.3 / K3 / 4. LO e K-level confrontados com a listagem do capítulo no syllabus; correspondência preservada.
- **Estado:** NEEDS_CORRECTION → **PASS (AI_REVIEWED)**; HUMAN_APPROVED = não.
- **Evidência:** EN, secção 4.5.3, pp. 46; PT, secção correspondente, pp. 50.
- **Achado técnico e opções:** ATDD deriva exemplos de aceitação antes da implementação. O original tinha distrator sobre existência de método, sem exigir aplicação suficiente da regra.
- **Tradução:** Cenário, resultados e limiar inclusivo preservados e aprofundados.
- **Correção recomendada:** Par de exemplos 49→5 e 50→0; alternativas com expectativas erradas, mantendo K3 e o1.
- **Alteração aplicada:** Par de exemplos 49→5 e 50→0; alternativas com expectativas erradas, mantendo K3 e o1.
- **Chave:** o1, uma escolha; versão 1 → 2. Nenhuma opção foi renumerada.
- **Incerteza restante:** Sem problema técnico/linguístico adicional identificado nesta revisão por IA; dificuldade e qualidade psicométrica não calibradas, aprovação humana pendente.

### tl-030

- **LO / nível / capítulo:** FL-5.1.6 / K1 / 5. LO e K-level confrontados com a listagem do capítulo no syllabus; correspondência preservada.
- **Estado:** PASS → **PASS (AI_REVIEWED)**; HUMAN_APPROVED = não.
- **Evidência:** EN, secção 5.1.6, pp. 50, 51; PT, secção correspondente, pp. 56.
- **Achado técnico e opções:** Pirâmide privilegia testes pequenos/isolados em quantidade maior e menos testes extensos; não impõe igualdade nem apenas interface.
- **Tradução:** Ponta a ponta é tradução explicativa de end-to-end.
- **Correção recomendada:** Manter; submeter a revisão humana independente.
- **Alteração aplicada:** Nenhuma.
- **Chave:** o1, uma escolha; versão 1. Nenhuma opção foi renumerada.
- **Incerteza restante:** Sem problema técnico/linguístico adicional identificado nesta revisão por IA; dificuldade e qualidade psicométrica não calibradas, aprovação humana pendente.

### tl-031

- **LO / nível / capítulo:** FL-5.1.1 / K2 / 5. LO e K-level confrontados com a listagem do capítulo no syllabus; correspondência preservada.
- **Estado:** NEEDS_CORRECTION → **PASS (AI_REVIEWED)**; HUMAN_APPROVED = não.
- **Evidência:** EN, secção 5.1.1, pp. 48; PT, secção correspondente, pp. 53.
- **Achado técnico e opções:** Plano documenta objetivos, recursos e abordagem; relatório de defeito e registo de execução têm outros fins.
- **Tradução:** PSTQB usa plano de testes.
- **Correção recomendada:** Plano de teste → plano de testes na opção e explicação.
- **Alteração aplicada:** Plano de teste → plano de testes na opção e explicação.
- **Chave:** o1, uma escolha; versão 1 → 2. Nenhuma opção foi renumerada.
- **Incerteza restante:** Sem problema técnico/linguístico adicional identificado nesta revisão por IA; dificuldade e qualidade psicométrica não calibradas, aprovação humana pendente.

### tl-032

- **LO / nível / capítulo:** FL-5.1.3 / K2 / 5. LO e K-level confrontados com a listagem do capítulo no syllabus; correspondência preservada.
- **Estado:** NEEDS_CORRECTION → **PASS (AI_REVIEWED)**; HUMAN_APPROVED = não.
- **Evidência:** EN, secção 5.1.3, pp. 49; PT, secção correspondente, pp. 54.
- **Achado técnico e opções:** Disponibilidade do ambiente permite iniciar; aceitação do risco residual pode suportar a decisão de terminar. Avaliação apenas não implica aceitação.
- **Tradução:** Distinguir avaliação de risco de aceitação do risco residual.
- **Correção recomendada:** Critério de saída agora exige aceitação pelos stakeholders, explicitada nas duas línguas.
- **Alteração aplicada:** Critério de saída agora exige aceitação pelos stakeholders, explicitada nas duas línguas.
- **Chave:** o1, uma escolha; versão 1 → 2. Nenhuma opção foi renumerada.
- **Incerteza restante:** Sem problema técnico/linguístico adicional identificado nesta revisão por IA; dificuldade e qualidade psicométrica não calibradas, aprovação humana pendente.

### tl-033

- **LO / nível / capítulo:** FL-5.2.2 / K2 / 5. LO e K-level confrontados com a listagem do capítulo no syllabus; correspondência preservada.
- **Estado:** NEEDS_CORRECTION → **PASS (AI_REVIEWED)**; HUMAN_APPROVED = não.
- **Evidência:** EN, secção 5.2.2, pp. 52; PT, secção correspondente, pp. 57, 58.
- **Achado técnico e opções:** Cálculo fiscal incorreto ameaça qualidade do produto; saída de pessoal e ambiente atrasado ameaçam o projeto.
- **Tradução:** Uniformizar testador.
- **Correção recomendada:** Tester → testador na opção.
- **Alteração aplicada:** Tester → testador na opção.
- **Chave:** o1, uma escolha; versão 1 → 2. Nenhuma opção foi renumerada.
- **Incerteza restante:** Sem problema técnico/linguístico adicional identificado nesta revisão por IA; dificuldade e qualidade psicométrica não calibradas, aprovação humana pendente.

### tl-034

- **LO / nível / capítulo:** FL-5.2.3 / K2 / 5. LO e K-level confrontados com a listagem do capítulo no syllabus; correspondência preservada.
- **Estado:** PASS → **PASS (AI_REVIEWED)**; HUMAN_APPROVED = não.
- **Evidência:** EN, secção 5.2.3, pp. 52, 53; PT, secção correspondente, pp. 58, 59.
- **Achado técnico e opções:** Impacto e probabilidade informam risco e profundidade/âmbito; não implicam esforço igual nem abandono automático de testes visuais.
- **Tradução:** Sem desvio técnico identificado.
- **Correção recomendada:** Manter; submeter a revisão humana independente.
- **Alteração aplicada:** Nenhuma.
- **Chave:** o1, uma escolha; versão 1. Nenhuma opção foi renumerada.
- **Incerteza restante:** Sem problema técnico/linguístico adicional identificado nesta revisão por IA; dificuldade e qualidade psicométrica não calibradas, aprovação humana pendente.

### tl-035

- **LO / nível / capítulo:** FL-5.4.1 / K2 / 5. LO e K-level confrontados com a listagem do capítulo no syllabus; correspondência preservada.
- **Estado:** NEEDS_CORRECTION → **PASS (AI_REVIEWED)**; HUMAN_APPROVED = não.
- **Evidência:** EN, secção 5.4, pp. 56; PT, secção correspondente, pp. 62.
- **Achado técnico e opções:** Versões de software, testes e dados identificam a configuração; sobrescrever dados perde contexto, nome isolado não chega.
- **Tradução:** Uniformizar testador.
- **Correção recomendada:** Tester → testador na opção.
- **Alteração aplicada:** Tester → testador na opção.
- **Chave:** o1, uma escolha; versão 1 → 2. Nenhuma opção foi renumerada.
- **Incerteza restante:** Sem problema técnico/linguístico adicional identificado nesta revisão por IA; dificuldade e qualidade psicométrica não calibradas, aprovação humana pendente.

### tl-036

- **LO / nível / capítulo:** FL-5.1.4 / K3 / 5. LO e K-level confrontados com a listagem do capítulo no syllabus; correspondência preservada.
- **Estado:** NEEDS_CORRECTION → **PASS (AI_REVIEWED)**; HUMAN_APPROVED = não.
- **Evidência:** EN, secção 5.1.4, pp. 49, 50; PT, secção correspondente, pp. 54, 55.
- **Achado técnico e opções:** Fórmula original correta, mas 2/5/8 dava 5 também com média simples: não distinguia a ponderação.
- **Tradução:** Distinguir esforço (pessoas-hora) de duração.
- **Correção recomendada:** Estimativas assimétricas 2/5/14: E=6; distrator 7 é média simples e 14 só o pessimista.
- **Alteração aplicada:** Estimativas assimétricas 2/5/14: E=6; distrator 7 é média simples e 14 só o pessimista.
- **Chave:** o1, uma escolha; versão 1 → 2. Nenhuma opção foi renumerada.
- **Incerteza restante:** Sem problema técnico/linguístico adicional identificado nesta revisão por IA; dificuldade e qualidade psicométrica não calibradas, aprovação humana pendente.

### tl-037

- **LO / nível / capítulo:** FL-5.1.5 / K3 / 5. LO e K-level confrontados com a listagem do capítulo no syllabus; correspondência preservada.
- **Estado:** PASS → **PASS (AI_REVIEWED)**; HUMAN_APPROVED = não.
- **Evidência:** EN, secção 5.1.5, pp. 50, 51; PT, secção correspondente, pp. 55, 56.
- **Achado técnico e opções:** Algoritmo explicitamente pedido: entre disponíveis escolher maior risco. B e C disponíveis → B; C desbloqueia A → B,C,A. A,B,C viola dependência; C,A,B viola regra dos disponíveis.
- **Tradução:** A instrução dos disponíveis evita ambiguidade com outra política que antecipasse C para desbloquear A.
- **Correção recomendada:** Manter; submeter a revisão humana independente.
- **Alteração aplicada:** Nenhuma.
- **Chave:** o1, uma escolha; versão 1. Nenhuma opção foi renumerada.
- **Incerteza restante:** Sem problema técnico/linguístico adicional identificado nesta revisão por IA; dificuldade e qualidade psicométrica não calibradas, aprovação humana pendente.

### tl-038

- **LO / nível / capítulo:** FL-5.5.1 / K3 / 5. LO e K-level confrontados com a listagem do capítulo no syllabus; correspondência preservada.
- **Estado:** NEEDS_CORRECTION → **PASS (AI_REVIEWED)**; HUMAN_APPROVED = não.
- **Evidência:** EN, secção 5.5, pp. 56, 57; PT, secção correspondente, pp. 62, 63.
- **Achado técnico e opções:** LO pede preparar relatório; original limitava-se a reconhecer uma lista genérica de campos.
- **Tradução:** Resultados obtidos é o termo PSTQB para actual results.
- **Correção recomendada:** Preparar/selecionar relatório completo de QA/82/INV-7/25, comparar 201 esperado e 500 obtido; distratores invertem resultados ou alteram ambiente/versão.
- **Alteração aplicada:** Preparar/selecionar relatório completo de QA/82/INV-7/25, comparar 201 esperado e 500 obtido; distratores invertem resultados ou alteram ambiente/versão.
- **Chave:** o1, uma escolha; versão 1 → 2. Nenhuma opção foi renumerada.
- **Incerteza restante:** Sem problema técnico/linguístico adicional identificado nesta revisão por IA; dificuldade e qualidade psicométrica não calibradas, aprovação humana pendente.

### tl-039

- **LO / nível / capítulo:** FL-6.1.1 / K2 / 6. LO e K-level confrontados com a listagem do capítulo no syllabus; correspondência preservada.
- **Estado:** PASS → **PASS (AI_REVIEWED)**; HUMAN_APPROVED = não.
- **Evidência:** EN, secção 6.1, pp. 59; PT, secção correspondente, pp. 65.
- **Achado técnico e opções:** Gerar carga concorrente e medir latência requer ferramenta de desempenho/carga; ortografia e checklist não geram tráfego.
- **Tradução:** Sem desvio de sentido; item introdutório com distratores fáceis.
- **Correção recomendada:** Manter; submeter a revisão humana independente.
- **Alteração aplicada:** Nenhuma.
- **Chave:** o1, uma escolha; versão 1. Nenhuma opção foi renumerada.
- **Incerteza restante:** Sem problema técnico/linguístico adicional identificado nesta revisão por IA; dificuldade e qualidade psicométrica não calibradas, aprovação humana pendente.

### tl-040

- **LO / nível / capítulo:** FL-6.2.1 / K1 / 6. LO e K-level confrontados com a listagem do capítulo no syllabus; correspondência preservada.
- **Estado:** NEEDS_CORRECTION → **PASS (AI_REVIEWED)**; HUMAN_APPROVED = não.
- **Evidência:** EN, secção 6.2, pp. 59, 60; PT, secção correspondente, pp. 65, 66.
- **Achado técnico e opções:** Subestimar manutenção é risco; dispensar julgamento e garantir ausência de falhas são alegações falsas, não benefícios garantidos.
- **Tradução:** PSTQB conserva scripts de teste.
- **Correção recomendada:** Guiões → scripts de teste.
- **Alteração aplicada:** Guiões → scripts de teste.
- **Chave:** o1, uma escolha; versão 1 → 2. Nenhuma opção foi renumerada.
- **Incerteza restante:** Sem problema técnico/linguístico adicional identificado nesta revisão por IA; dificuldade e qualidade psicométrica não calibradas, aprovação humana pendente.

## Cobertura real de objetivos e dificuldade

Foram identificados **64 LO** nas listagens dos seis capítulos do syllabus (pp.14, 24, 32, 38, 47 e 58). O banco cobre **40 LO distintos**, uma pergunta por LO, e deixa **24 LO sem pergunta**. A presença de um LO válido não demonstra que toda a profundidade desse objetivo foi exercitada.

| Capítulo | Perguntas |  K1 |  K2 |  K3 |
| -------- | --------: | --: | --: | --: |
| 1        |         8 |   2 |   6 |   0 |
| 2        |         6 |   2 |   4 |   0 |
| 3        |         4 |   2 |   2 |   0 |
| 4        |        11 |   0 |   6 |   5 |
| 5        |         9 |   1 |   5 |   3 |
| 6        |         2 |   1 |   1 |   0 |
| Total    |        40 |   8 |  24 |   8 |

LO sem pergunta: `FL-1.2.1`, `FL-1.4.2`, `FL-1.4.3`, `FL-1.4.5`, `FL-1.5.1`, `FL-1.5.2`, `FL-2.1.1`, `FL-2.1.4`, `FL-2.1.6`, `FL-2.2.2`, `FL-3.1.2`, `FL-3.2.1`, `FL-3.2.2`, `FL-3.2.5`, `FL-4.3.3`, `FL-4.4.3`, `FL-4.5.1`, `FL-5.1.2`, `FL-5.1.7`, `FL-5.2.1`, `FL-5.2.4`, `FL-5.3.1`, `FL-5.3.2`, `FL-5.3.3`.

As classificações dos 40 LO usados coincidem com os níveis oficiais. Os K3 foram mantidos e aprofundados onde se identificou reconhecimento demasiado superficial (tl-029 e tl-038); a sua dificuldade real ainda não foi calibrada. Questões como tl-015 e tl-039 continuam introdutórias e têm distratores fáceis. A maioria usa três alternativas; os exemplos oficiais consultados usam geralmente quatro, ou cinco em algumas seleções múltiplas. Esta diferença, por si só, impede assumir equivalência editorial.

## Resolução explícita dos oito itens K3

| ID     | Resolução e rejeição das restantes opções                                                                                                                                                                                                                                                                 |
| ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| tl-025 | Inteiros: x<3, 3≤x≤8, x>8. É necessário pelo menos um representante por partição: 2/5/9. 3/5/8 cobre apenas a válida; 2/9 omite a válida. Mínimo três entradas.                                                                                                                                           |
| tl-026 | Inteiros rejeitados abaixo de 10 e acima de 20: fronteiras finitas 9,10,20,21. BVA de 2 valores exige os pares 9/10 e 20/21. O1 cobre os quatro; o2 omite inválidos; o3 não cobre estes pares.                                                                                                            |
| tl-027 | R1 exige membro=T e total≥50=T. Membro com 60 satisfaz R1 e a ação X. Não membro com 60 falha a primeira condição; membro com 20 falha a segunda. Cada coluna é uma regra, não um passo de teste.                                                                                                         |
| tl-028 | Estado inicial Rascunho; Submeter→Pendente; Pagar→Paga. Pagar antes de Submeter é inválido. Submeter duas vezes tenta uma combinação declarada inválida e não chega a Paga.                                                                                                                               |
| tl-029 | Regra acordada: total<50 implica entrega 5; total≥50 implica entrega 0. Exemplos 49→5 e 50→0 cobrem ambos os lados, incluindo igualdade. Distrator o2 erra o resultado de 49; o3 erra o de 50.                                                                                                            |
| tl-036 | E=(2+4×5+14)/6=36/6=6 pessoas-hora. Média simples seria 7; 14 é só o pessimista. Os antigos 2/5/8 davam 5 também por média simples: fórmula antiga correta, capacidade de discriminação fraca.                                                                                                            |
| tl-037 | Regra expressa: escolher o maior risco **entre testes disponíveis**. Inicialmente B e C; B tem prioridade maior. Depois C; após C, A fica disponível. Resultado B,C,A. A,B,C viola dependência; C,A,B viola a política expressa, embora outra política que antecipasse pré-requisitos pudesse escolhê-lo. |
| tl-038 | Relatório deve conservar QA/82, utilizador autorizado, INV-7/25, ação Guardar, resultado esperado 201+ID e obtido 500+ausência de gravação, com r17. O2 troca esperado/obtido; o3 inventa produção/81. Não se atribui uma causa raiz sem evidência.                                                       |

### BVA de 2 e 3 valores: limite da cobertura atual

A tl-026 testa **apenas BVA de 2 valores**. A ausência de uma pergunta própria de 3 valores continua uma lacuna; não se infere cobertura completa do tema a partir de um único item LO-4.2.2.

Para o domínio inteiro não limitado do nosso exemplo, as partições têm quatro fronteiras finitas: {9,10,20,21}. Na BVA de 3 valores, tomando **todas** essas fronteiras e ambos os vizinhos, a união é **{8,9,10,11,19,20,21,22}**. Se o exercício delimitasse explicitamente apenas os extremos da partição válida, 10 e 20, resultariam seis valores {9,10,11,19,20,21}; isto é um âmbito diferente. Não se deve chamar a esses seis valores cobertura de todas as fronteiras de todas as partições. A origem e os limites do domínio também importam (syllabus EN §4.2.2, p.40; exemplos de explicação B p.25, C p.26 e D p.22). Os números acima são do exemplo original TestLearn, não cópia de uma pergunta oficial.

## Regras e blueprint de exame

Confirmados na tabela v1.19, pp.3–5: 40 perguntas, 40 pontos, 26 pontos para aprovação, 60 minutos e 75 minutos com +25%. As regras v1.2, §§5.2.1/5.3.1 (p.9) e §6.2.1 (p.10), fundamentam um ponto por pergunta, 65% e o tempo adicional em língua não nativa. TestLearn mantém os 75 minutos como configuração de prática, sem decidir elegibilidade oficial.

O motor atribui um ponto por **conjunto exato de IDs**, sem crédito parcial, incluindo seleção múltipla. Baralhar opções não altera identidades. A interface apresenta a cardinalidade exigida e impede excedê-la em novas seleções, permitindo desmarcar e corrigir. As soluções continuam ocultas durante o exame. O código e os dados estáticos públicos contêm as chaves, pelo que isto não é um exame supervisionado nem proteção contra inspeção do cliente.

Os totais por capítulo e K-level **coincidem** com a fonte oficial, mas não bastam. A tabela impõe 29 grupos de LO; a regra na p.1 exige diversidade quando há menos perguntas que LO e cobertura dos LO quando há mais perguntas que LO. Os casos com quantidade igual aos LO foram tratados com um por objetivo. O validador `src/domain/blueprint-audit.ts` transcreve os grupos e deteta contagens, objetivos repetidos, IDs duplicados e LO não abrangidos. Não confunde esta conformidade estrutural com aprovação académica.

Há **10 grupos divergentes**, correspondentes a cinco lugares em falta e cinco excedentes em outros grupos:

| Grupo            | LO admissíveis                       | Exigido | Atual | Desvio |
| ---------------- | ------------------------------------ | ------: | ----: | ------ |
| 1 K1 fundamentos | FL-1.1.1 / FL-1.2.2                  |       1 |     2 | +1     |
| 1 K1 whole team  | FL-1.5.2                             |       1 |     0 | −1     |
| 1 K2 fundamentos | FL-1.1.2 / FL-1.2.1 / FL-1.2.3       |       1 |     2 | +1     |
| 1 K2 atividades  | FL-1.4.1–FL-1.4.5, três LO distintos |       3 |     2 | −1     |
| 2 K2 alterações  | FL-2.2.3 / FL-2.3.1                  |       1 |     2 | +1     |
| 2 K2 ciclo       | FL-2.1.1 / FL-2.1.6                  |       1 |     0 | −1     |
| 5 K2 planeamento | FL-5.1.1 / FL-5.1.3                  |       1 |     2 | +1     |
| 5 K2 quadrantes  | FL-5.1.7                             |       1 |     0 | −1     |
| 5 K2 risco       | FL-5.2.2 / FL-5.2.3 / FL-5.2.4       |       1 |     2 | +1     |
| 5 K2 relatórios  | FL-5.3.2 / FL-5.3.3                  |       1 |     0 | −1     |

Os outros 19 grupos cumprem as contagens e diversidade de LO nesta seleção de 40. Não se trocaram LO de perguntas existentes sem correspondência conceptual, nem se substituíram cenários por itens mais fáceis para corrigir quotas. O seletor continua a servir **simulação independente de prática com quotas capítulo/K-level**, não exame oficialmente equivalente. Aumentar o banco com perguntas originais revistas para os grupos em falta é o próximo passo estrutural, fora desta correção individual.

## PT-PT e interface

| Inglês / forma anterior                            | Forma usada / decisão                                               | Evidência                                                                                   |
| -------------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| Error guessing / Suposição de erros                | **Antecipação de erros**                                            | PT §4.4.1, p.47                                                                             |
| Debugging / apenas depuração                       | **debugging (depuração)** no item corrigido; não excluir reprodução | PT §1.1.2, p.17; EN p.16                                                                    |
| Test charter / missão que limita a sessão          | **carta de testes**, que orienta uma sessão de duração definida     | PT §4.4.2, p.48; EN p.44                                                                    |
| Test completion / conclusão de teste               | **Conclusão do teste**                                              | PT §1.4.1, pp.20–21                                                                         |
| TDD / orientado por testes                         | **Desenvolvimento orientado para testes**                           | PT §2.1.3, p.28                                                                             |
| Test plan / plano de teste                         | **Plano de testes**                                                 | PT §5.1.1, p.53                                                                             |
| Scribe                                             | **Redator (anotador)**                                              | PT §3.2.3, p.39                                                                             |
| Actual results / resultado real                    | **Resultado obtido**                                                | PT §5.5, p.63                                                                               |
| Scripts / guiões                                   | **scripts de teste**, conservando o empréstimo técnico              | PT §1.4.1, p.20 e §6.2, p.66                                                                |
| Tester(s) no texto português                       | **Testador(es)**; inglês mantém tester                              | Vocabulário e texto PSTQB                                                                   |
| Person-hours                                       | **Pessoas-hora** como unidade de esforço                            | PT p.55 usa pessoas/hora; preferiu-se a notação dimensional inequívoca de produto, não taxa |
| Given/When/Then                                    | **Dado/Quando/Então**, forma abreviada de Dado que/Quando/Então     | PT §4.5.2, p.50                                                                             |
| Shift left, walkthrough, ATDD e identificadores FL | Mantidos, com explicação quando necessária                          | PT §§2.1.5, 3.2.4, 4.5.3                                                                    |

Revistos todos os enunciados, opções e explicações PT-PT, as instruções, filtros, avisos e a secção de inglês técnico. Os tópicos antes apresentados apenas em inglês passaram a ter rótulos PT-PT, mantendo chaves estáveis nos filtros. Corrigida a concordância singular/plural no aviso de pergunta(s) sem resposta. Nenhuma tradução é gerada em execução. A secção de inglês mantém intencionalmente exemplos e definições em inglês; isto não é uma falha de localização do modo de estudo.

## Compatibilidade e segurança das tentativas

- Revisão nova: `2026-10-27.2`; revisão anterior suportada: `2026-10-27.1`. As sessões retêm a revisão com que começaram, sem alteração de respostas, prazo, posição, marcações ou resultados.
- A pontuação, revisão de respostas, pergunta ativa, erros e recomendações de histórico resolvem o banco associado à tentativa. As sessões antigas mostram aviso de conteúdo anterior à auditoria. A tl-003 histórica conserva a classificação original, embora a ambiguidade seja conhecida; **não houve reclassificação retroativa escondida**.
- Revisões futuras desconhecidas ou dados inválidos continuam a produzir recuperação segura e preservação do valor bruto; não há coerção para a revisão atual. A versão antiga deve permanecer arquivada enquanto o produto suportar as respetivas tentativas.
- Não foi necessário abrir nem modificar o progresso real de qualquer utilizador. Testes usam armazenamento isolado e dados determinísticos. Não foram alterados deployment, serviços externos, configurações globais ou repositórios alheios.

## Verificação de software

Resultados finais e limitações da execução são registados aqui após os comandos obrigatórios, separados dos estados académicos.

| Comando / verificação  | Resultado final                                                      |
| ---------------------- | -------------------------------------------------------------------- |
| `npm run typecheck`    | PASS                                                                 |
| `npm run lint`         | PASS                                                                 |
| `npm test`             | PASS — 46 testes em 6 ficheiros: 38 unitários e 8 de integração      |
| `npm run build`        | PASS — JS ~473,49 kB / 138,46 kB gzip; CSS ~13,38 kB                 |
| `npm run test:e2e`     | PASS — 16 testes, oito cenários em Chromium desktop e emulação móvel |
| `npm run format:check` | PASS                                                                 |
| `git diff --check`     | PASS — apenas avisos de normalização LF/CRLF                         |

Os 14 novos testes unitários exercitam as correções da ambiguidade de debugging, terminologia, soluções K3, metadados sem aprovação humana, quotas de LO e isolamento de versões. A cobertura Playwright acrescenta duas histórias, executadas nos dois projetos: conteúdo PT-PT real (tabela R1–R4, símbolo ≥, instruções, duas escolhas, limite de seleção, explicações, resultados 4/4 e preservação da tabela na revisão); e retoma/revisão de uma tentativa antiga com a pergunta de estimativa original e resultado 1/40 preservados.

A suite existente continua a verificar 26/40 pela interface, alternativas baralhadas, nenhuma explicação durante exame, expiração, persistência e acessibilidade axe nos ecrãs de painel/prática testados. A apresentação da tabela foi reutilizada no exame/prática e nos resultados, com legenda e cabeçalhos de linha/coluna. A checklist React foi aplicada às alterações: componentes auxiliares fora de App, estado derivado sem novos efeitos, IDs estáveis, nenhum HTML arbitrário ou pedido de rede novo.

Falhas de execução encontradas e resolvidas: importação JSON no Node/Playwright exigiu `with { type: 'json' }`; lint inicialmente analisou os scripts locais de extração e inventário da auditoria. As pastas geradas `tmp/` ficaram excluídas do Git, ESLint e Prettier, mantendo as mesmas regras para `src/` e `tests/`. Uma edição automatizada do teste da tabela não encontrou o marcador esperado; foi corrigida por patch explícito, e a suite final passou com a tabela também na revisão. Não foram ocultadas falhas da aplicação.

O build mantém os avisos anteriores de comentários de otimização da dependência Zod; Rollup remove os comentários e conclui normalmente. Não foram instaladas/alteradas dependências npm nem configurações de deployment. A ferramenta PDF de leitura foi instalada apenas em `C:\TestLearn\tmp\pdf-tools`, sem configuração global.

Não executados: CI remota, Firefox/WebKit/Safari real, leitores de ecrã reais, ensaios psicométricos e revisão humana. A suite foi executada no servidor Vite local; build de produção compilado, sem publicação. Os testes passaram, mas isso não transforma `AI_REVIEWED` em `HUMAN_APPROVED`.

A limpeza recursiva de `C:\TestLearn\tmp` foi rejeitada automaticamente com “blocked by policy”, sem razão mais específica. Não se repetiu a remoção. Os temporários foram mantidos localmente e excluídos das verificações/distribuição; não bloqueiam os resultados da auditoria. Nenhum PDF original foi removido.

## Incertezas e ação recomendada

Todos os 40 itens e traduções continuam a exigir **revisão humana independente**; o agente que fez esta auditoria também participou na implementação inicial. Os estados AI_REVIEWED não simulam independência humana. Não foram realizados estudo psicométrico, calibração com candidatos ou certificação da terminologia por PSTQB. Há 24 LO sem pergunta e nenhuma pergunta própria de BVA de 3 valores. O mesmo banco de 40 repete-se entre simulações. Persistem distratores introdutórios fáceis e a diferença de número de alternativas.

Recomendação imediata: uma pessoa com domínio CTFL deve rever as 22 alterações, começando pela ambiguidade corrigida tl-003 e pelos oito K3, usando as páginas citadas. Em seguida, criar perguntas originais revistas para os cinco lugares em falta no blueprint, sem alterar artificialmente a classificação dos itens atuais.

## Atualização da fase 3 — alinhamento estrutural

No final da fase 3, o banco tinha **47 questões**, **45 LO distintos**, K1=9/K2=28/K3=10. Cada exame novo contém **40 questões**, K1=8/K2=24/K3=8, capítulos 8/6/4/11/9/2 e **zero grupos divergentes** nas 1 000 sementes 0–999 verificadas. A prática por tópico continua sem quotas. As dez divergências do conjunto antigo foram reproduzidas antes de alterar o seletor; não se alterou o LO nem o conteúdo das 40 perguntas existentes.

| Novo ID | LO       | Nível | Revisão por IA     | Aprovação humana |
| ------- | -------- | ----- | ------------------ | ---------------- |
| tl-041  | FL-1.5.2 | K1    | AI_REVIEWED / PASS | PENDING          |
| tl-042  | FL-1.4.3 | K2    | AI_REVIEWED / PASS | PENDING          |
| tl-043  | FL-2.1.6 | K2    | AI_REVIEWED / PASS | PENDING          |
| tl-044  | FL-5.1.7 | K2    | AI_REVIEWED / PASS | PENDING          |
| tl-045  | FL-5.3.2 | K2    | AI_REVIEWED / PASS | PENDING          |
| tl-046  | FL-4.2.2 | K3    | AI_REVIEWED / PASS | PENDING          |
| tl-047  | FL-4.2.2 | K3    | AI_REVIEWED / PASS | PENDING          |

As duas últimas são exercícios de BVA de 3 valores, incluindo domínio inteiro não limitado e domínio finito com vizinhos apenas dentro dos limites. A resolução, rejeição de cada alternativa, revisão PT-PT e páginas de evidência das sete perguntas estão no [relatório focado](blueprint-validation.md#novas-perguntas-e-revisão-técnicapt-pt); os dados contêm a mesma referência em academicReview. Não há aprovação humana implícita: **47 perguntas e 47 traduções continuam pendentes**, HUMAN_APPROVED=0.

O banco da fase 2 foi congelado em questions-2026-10-27.2.json antes das adições. As revisões .1 e .2 continuam a resolver conteúdo e classificação originais, sem migração silenciosa; a revisão .3 aplica validação estrutural estrita nos novos exames e na sua restauração. Restam 19 LO sem pergunta. A evidência de testes final e a matriz completa estão no relatório focado, evitando duplicar resultados de execução aqui.

## Fase 4 — cobertura completa do syllabus

Revisão **2026-10-27.4**, 27-10-2026. Banco anterior: **47 perguntas / 45 LO**; banco atual: **66 perguntas / 64 LO**. Foram acrescentadas exatamente 19 perguntas originais, uma por LO anteriormente em falta; as primeiras 47 permanecem profundamente iguais ao arquivo da revisão .3. As 19 adições são **5 K1 e 14 K2**. Não havia LO K3 por cobrir; os dez exercícios K3 anteriores permanecem intactos e com regressões de cálculo.

A lista anterior foi reproduzida comparando o banco real com os **64 LO das páginas 14, 24, 32, 38, 47 e 58 do ISTQB_CTFL_Syllabus_v4.0.1.pdf**, reaberto nesta fase. Não se tomou o registo de produção como oráculo: tests/fixtures/syllabus-oracle.ts enumera os LO/níveis separadamente; o teste compara o registo, o banco e os grupos oficiais. Os 19 LO validados são os da tabela seguinte. Não restam LO examináveis sem pergunta. Uma pergunta por objetivo dá cobertura nominal, não profundidade suficiente para todos os aspetos de cada objetivo.

As fontes continuam na pasta local inventariada acima; EN é a autoridade técnica 4.0.1, PT é a referência terminológica 4.0 (tradução 1.0). Os números seguintes são páginas físicas do PDF, contadas a partir de 1. As secções de fonte são os sufixos dos LO, com complemento explícito no caso de risco quantitativo. Foram lidas as secções e páginas de continuação necessárias, e novamente inspecionadas visualmente as tabelas v1.19 pp.4–5 e a regra da p.1. Os hashes das fontes principais continuam os do inventário.

Para estilo foram novamente consultados **A Questions v1.7 pp.7,13; B Questions v1.7 pp.6,13; C Questions v1.6 pp.6,13; D Questions v1.5 pp.6,13**, e **A–D Answers p.7**. A p.6 de A era índice e foi descartada como amostra de perguntas; a p.13 foi efetivamente lida. A consulta é por amostragem: enunciado focado, conceitos próximos nos distratores, instrução de cardinalidade e aplicação de dados em K3. Nenhum cenário, tabela, conjunto de alternativas ou chave oficial foi incorporado. Copyright das fontes: ISTQB® e autores indicados nos próprios PDFs. Os exemplos oficiais também não constituem uma escala empírica de dificuldade.

### Registo das 19 adições

Todas têm quatro alternativas o1–o4, seleção simples, required=1, versão 1, origin=original, syllabus=4.0.1, examEligible=true. Enunciado, quatro alternativas, quatro justificações e explicação geral existem nos dois idiomas. A posição apresentada é baralhada sem alterar os IDs.

| ID     | LO       | K-level | EN: secção / páginas | PT: páginas | Chave |
| ------ | -------- | ------- | -------------------- | ----------- | ----- |
| tl-048 | FL-1.2.1 | K2      | §1.2.1 / 16–17       | 17–18       | o2    |
| tl-049 | FL-1.4.2 | K2      | §1.4.2 / 19–20       | 21          | o3    |
| tl-050 | FL-1.4.5 | K2      | §1.4.5 / 21          | 23          | o4    |
| tl-051 | FL-1.5.1 | K2      | §1.5.1 / 21–22       | 23–24       | o1    |
| tl-052 | FL-2.1.1 | K2      | §2.1.1 / 25          | 27          | o3    |
| tl-053 | FL-2.1.4 | K2      | §2.1.4 / 26–27       | 28–29       | o2    |
| tl-054 | FL-2.2.2 | K2      | §2.2.2 / 29–30       | 32–33       | o4    |
| tl-055 | FL-3.1.2 | K2      | §3.1.2 / 33–34       | 36–37       | o1    |
| tl-056 | FL-3.2.1 | K1      | §3.2.1 / 35          | 38          | o3    |
| tl-057 | FL-3.2.2 | K2      | §3.2.2 / 35–36       | 38–39       | o2    |
| tl-058 | FL-3.2.5 | K1      | §3.2.5 / 37          | 40          | o4    |
| tl-059 | FL-4.3.3 | K2      | §4.3.3 / 43          | 47          | o1    |
| tl-060 | FL-4.4.3 | K2      | §4.4.3 / 44–45       | 48–49       | o3    |
| tl-061 | FL-4.5.1 | K2      | §4.5.1 / 45          | 49          | o2    |
| tl-062 | FL-5.1.2 | K1      | §5.1.2 / 48–49       | 53–54       | o4    |
| tl-063 | FL-5.2.1 | K1      | §5.2.1 / 52–53       | 57–58       | o1    |
| tl-064 | FL-5.2.4 | K2      | §5.2.4 / 53          | 59          | o3    |
| tl-065 | FL-5.3.1 | K1      | §5.3.1 / 54          | 60          | o2    |
| tl-066 | FL-5.3.3 | K2      | §5.3.3 / 55          | 61          | o4    |

**Resultado editorial comum aos 19 itens e 19 traduções: AI_REVIEWED / PASS, humanApproval: PENDING.** Autor e revisor são o agente IA; não houve revisor humano ou agente independente. PASS significa que esta passagem por todas as alternativas e traduções não identificou outro erro técnico ou linguístico, não que o conteúdo esteja certificado. A data, secção, páginas EN e âncora deste registo estão em academicReview.

### tl-048

- **LO/nível:** FL-1.2.1 / K2; fonte EN §1.2.1, pp.16–17; PT pp.17–18. **Chave revista: o2**.
- **Revisão de todas as alternativas:** Evidência de qualidade para decidir a disponibilização. O1 confunde cumprimento do processo com qualidade suficiente; o3 ignora impacto e critérios; o4 atribui correção de código à execução do teste. O cenário não força uma decisão comercial automática.
- **PT-PT:** Disponibilização, transbordos e cobrança duplicada preservam o cenário EN; debugging continua distinto da deteção.
- **Estado:** PASS assistido por IA; aprovação humana PENDING. Dificuldade e funcionamento real dos distratores não calibrados.

### tl-049

- **LO/nível:** FL-1.4.2 / K2; fonte EN §1.4.2, pp.19–20; PT pp.21. **Chave revista: o3**.
- **Revisão de todas as alternativas:** Adaptação ao risco, disponibilidade e evidência auditável. O1 aumenta só exemplos funcionais; o2 reduz contexto à tecnologia; o4 escolhe formalidade máxima sem avaliar necessidades. A resposta não exige o processo mais pesado em qualquer situação.
- **PT-PT:** Coordenação de meios de emergência substitui uma tradução menos natural de dispatch; âmbito, cobertura e evidências mantêm as distinções técnicas.
- **Estado:** PASS assistido por IA; aprovação humana PENDING. Dificuldade e funcionamento real dos distratores não calibrados.

### tl-050

- **LO/nível:** FL-1.4.5 / K2; fonte EN §1.4.5, pp.21; PT pp.23. **Chave revista: o4**.
- **Revisão de todas as alternativas:** Rever calendário é principalmente gestão/controlo; derivar casos é conceção na função de teste. O1 absorve a conceção na gestão; o2 confunde função com cargo; o3 classifica bem as tarefas mas exige incorretamente pessoas distintas.
- **PT-PT:** Função de gestão de testes e função de teste distinguem responsabilidades, sem impor cargos ou separação de pessoas.
- **Estado:** PASS assistido por IA; aprovação humana PENDING. Dificuldade e funcionamento real dos distratores não calibrados.

### tl-051

- **LO/nível:** FL-1.5.1 / K2; fonte EN §1.5.1, pp.21–22; PT pp.23–24. **Chave revista: o1**.
- **Revisão de todas as alternativas:** Escuta ativa, conhecimento do domínio e análise de exemplos resolvem interpretações diferentes. O2 comprova reprodução sem esclarecer o esperado; o3 transfere o significado de negócio para vocabulário técnico; o4 escala sem esclarecer. Escalar pode ser adequado noutro contexto, mas não é a melhor primeira resposta neste.
- **PT-PT:** Reembolsado preserva o termo ambíguo do cenário; programador, escuta ativa e discussão construtiva evitam julgamento pessoal.
- **Estado:** PASS assistido por IA; aprovação humana PENDING. Dificuldade e funcionamento real dos distratores não calibrados.

### tl-052

- **LO/nível:** FL-2.1.1 / K2; fonte EN §2.1.1, pp.25; PT pp.27. **Chave revista: o3**.
- **Revisão de todas as alternativas:** Incrementos utilizáveis exigem feedback estático/dinâmico e regressão ao longo do desenvolvimento. O1 adia dinâmica; o2 congela conceção apesar da mudança; o4 adia regressão. Não se afirma que todos os projetos devam ter exatamente a mesma automação.
- **PT-PT:** Entrega incremental, conceção e testes de regressão foram comparados com EN; a frequência de duas semanas mantém-se.
- **Estado:** PASS assistido por IA; aprovação humana PENDING. Dificuldade e funcionamento real dos distratores não calibrados.

### tl-053

- **LO/nível:** FL-2.1.4 / K2; fonte EN §2.1.4, pp.26–27; PT pp.28–29. **Chave revista: o2**.
- **Revisão de todas as alternativas:** DevOps permite feedback rápido, mas exige manutenção e não elimina teste manual. O1 reduz toda a atividade a checks repetíveis; o3 recria uma passagem tardia para operações; o4 adia manutenção até falhar em produção.
- **PT-PT:** Pipeline e DevOps mantidos como termos profissionais; teste manual na perspetiva do utilizador não é confundido com trabalho repetitivo.
- **Estado:** PASS assistido por IA; aprovação humana PENDING. Dificuldade e funcionamento real dos distratores não calibrados.

### tl-054

- **LO/nível:** FL-2.2.2 / K2; fonte EN §2.2.2, pp.29–30; PT pp.32–33. **Chave revista: o4**.
- **Revisão de todas as alternativas:** Correção dos registos é funcional; tempo de resposta é não funcional. O1 confunde função executada com característica avaliada; o2 responde com níveis e contradiz o sistema explícito; o3 inventa uso de estrutura interna.
- **PT-PT:** Tipos de teste, níveis, caixa-branca e caixa-preta mantêm os eixos distintos. A carga acordada existe em ambos os idiomas.
- **Estado:** PASS assistido por IA; aprovação humana PENDING. Dificuldade e funcionamento real dos distratores não calibrados.

### tl-055

- **LO/nível:** FL-3.1.2 / K2; fonte EN §3.1.2, pp.33–34; PT pp.36–37. **Chave revista: o1**.
- **Revisão de todas as alternativas:** Resolver a contradição na especificação evita propagação e retrabalho. O2 inventa evidência runtime; o3 inventa resultados de regressão; o4 aceita ambas as regras incompatíveis sem resolução. A revisão não demonstra conformidade da futura implementação.
- **PT-PT:** Conservação de dados e produtos de trabalho não executáveis mantêm o significado; distinguir deteção direta e execução.
- **Estado:** PASS assistido por IA; aprovação humana PENDING. Dificuldade e funcionamento real dos distratores não calibrados.

### tl-056

- **LO/nível:** FL-3.2.1 / K1; fonte EN §3.2.1, pp.35; PT pp.38. **Chave revista: o3**.
- **Revisão de todas as alternativas:** Reconhece prevenção de equívocos e retrabalho. O1 promete requisitos fixos; o2 substitui indevidamente critérios; o4 garante aceitação universal. Não se exige derivar um processo ou calcular benefício.
- **PT-PT:** Preparação de encomendas é a tradução contextual de picking; feedback antecipado e frequente mantém o termo do syllabus PT.
- **Estado:** PASS assistido por IA; aprovação humana PENDING. Dificuldade e funcionamento real dos distratores não calibrados.

### tl-057

- **LO/nível:** FL-3.2.2 / K2; fonte EN §3.2.2, pp.35–36; PT pp.38–39. **Chave revista: o2**.
- **Revisão de todas as alternativas:** Decidir estado, responsáveis e ações é comunicação e análise. O1 prepara acesso/funções; o3 identifica e regista individualmente; o4 acompanha correções e reporta. O cenário situa explicitamente a análise conjunta após registo individual.
- **PT-PT:** Início da revisão, revisão individual, comunicação e análise, correção e elaboração de relatórios conferidos com PT. Anomalia não é automaticamente defeito.
- **Estado:** PASS assistido por IA; aprovação humana PENDING. Dificuldade e funcionamento real dos distratores não calibrados.

### tl-058

- **LO/nível:** FL-3.2.5 / K1; fonte EN §3.2.5, pp.37; PT pp.40. **Chave revista: o4**.
- **Revisão de todas as alternativas:** Reconhece objetivos claros, saída mensurável e tempo adequado. O1 elimina preparação; o2 ignora adequação do tipo; o3 aumenta excessivamente o pacote. Trata fatores de sucesso, sem impor reunião ou preparação formal a todos os tipos de revisão.
- **PT-PT:** Critérios de saída mensuráveis e preparação adequados ao contexto; guia de instalação é o produto de trabalho do cenário.
- **Estado:** PASS assistido por IA; aprovação humana PENDING. Dificuldade e funcionamento real dos distratores não calibrados.

### tl-059

- **LO/nível:** FL-4.3.3 / K2; fonte EN §4.3.3, pp.43; PT pp.47. **Chave revista: o1**.
- **Revisão de todas as alternativas:** Cobertura estrutural é útil com especificação incompleta, mas pode não revelar funcionalidade omitida. O2 equipara ramos a todos os requisitos; o3 descarta a utilidade da implementação; o4 troca cobertura de requisitos/código e trata código ausente como instrução existente não coberta.
- **PT-PT:** Ramos, instruções e omissão de requisito preservam os denominadores conceptuais; não há cálculo nem promoção artificial para K3.
- **Estado:** PASS assistido por IA; aprovação humana PENDING. Dificuldade e funcionamento real dos distratores não calibrados.

### tl-060

- **LO/nível:** FL-4.4.3 / K2; fonte EN §4.4.3, pp.44–45; PT pp.48–49. **Chave revista: o3**.
- **Revisão de todas as alternativas:** Checklist de alto nível admite variabilidade/menor repetibilidade; defeitos graves informam atualização. O1 exige procedimento detalhado sem atualizar condições; o2 descarta consistência útil; o4 mantém checklist congelada. A atualização deve continuar específica e diretamente verificável.
- **PT-PT:** Checklist mantida com rótulo PT; carta de teste exploratório substitui missão para alinhar terminologia com a referência portuguesa.
- **Estado:** PASS assistido por IA; aprovação humana PENDING. Dificuldade e funcionamento real dos distratores não calibrados.

### tl-061

- **LO/nível:** FL-4.5.1 / K2; fonte EN §4.5.1, pp.45; PT pp.49. **Chave revista: o2**.
- **Revisão de todas as alternativas:** Conversação e confirmação combinam negócio, desenvolvimento e teste. O1 deixa conveniência técnica decidir a regra; o3 exclui perspetivas; o4 troca valor/regras por tarefas e adia aceitação. Exemplos positivos e negativos esclarecem a story, sem exigir derivar casos ATDD K3.
- **PT-PT:** User story, cartão, conversação e confirmação mantidos conforme PT; critérios testáveis e valor de negócio preservados.
- **Estado:** PASS assistido por IA; aprovação humana PENDING. Dificuldade e funcionamento real dos distratores não calibrados.

### tl-062

- **LO/nível:** FL-5.1.2 / K1; fonte EN §5.1.2, pp.48–49; PT pp.53–54. **Chave revista: o4**.
- **Revisão de todas as alternativas:** Reconhece testabilidade, tarefas e esforço na iteração. O1 assume ordenação do negócio; o2 assume decisão de arquitetura; o3 adia entradas úteis de planeamento. Não exige calcular esforço ou aplicar algoritmo.
- **PT-PT:** Planeamento da iteração, testabilidade e esforço mantêm a distinção face ao planeamento da entrega.
- **Estado:** PASS assistido por IA; aprovação humana PENDING. Dificuldade e funcionamento real dos distratores não calibrados.

### tl-063

- **LO/nível:** FL-5.2.1 / K1; fonte EN §5.2.1, pp.52–53; PT pp.57–58. **Chave revista: o1**.
- **Revisão de todas as alternativas:** Reconhece probabilidade e impacto; a multiplicação é uma abordagem quantitativa, não a única. O2 exclui impacto; o3 exclui probabilidade; o4 confunde nível de risco com atribuição de testes. §5.2.1 p.52 sustenta atributos; §5.2.3 p.53 sustenta produto quantitativo/matriz qualitativa.
- **PT-PT:** Probabilidade, impacto e nível de risco conferidos; não há números a calcular nem mudança indevida para K3.
- **Estado:** PASS assistido por IA; aprovação humana PENDING. Dificuldade e funcionamento real dos distratores não calibrados.

### tl-064

- **LO/nível:** FL-5.2.4 / K2; fonte EN §5.2.4, pp.53; PT pp.59. **Chave revista: o3**.
- **Revisão de todas as alternativas:** Controlo inclui mitigação e monitorização da eficácia, risco residual e riscos emergentes. O1 fecha ao agendar; o2 substitui avaliação por contagem; o4 confunde envio de resultados com transferência acordada. O cenário exige acompanhar a mudança tecnológica.
- **PT-PT:** Mitigação, monitorização e risco residual preservam conceitos; envio de resultados não é transferência de risco.
- **Estado:** PASS assistido por IA; aprovação humana PENDING. Dificuldade e funcionamento real dos distratores não calibrados.

### tl-065

- **LO/nível:** FL-5.3.1 / K1; fonte EN §5.3.1, pp.54; PT pp.60. **Chave revista: o2**.
- **Revisão de todas as alternativas:** Tempo de resposta é métrica de qualidade do produto; o1 é progresso, o3 defeitos e o4 cobertura. O enunciado explicita a classificação, pois todas podem apoiar decisões sobre qualidade.
- **PT-PT:** Qualidade do produto, progresso, defeitos e cobertura mantêm categorias; registos bibliotecários não acrescentam cálculo.
- **Estado:** PASS assistido por IA; aprovação humana PENDING. Dificuldade e funcionamento real dos distratores não calibrados.

### tl-066

- **LO/nível:** FL-5.3.3 / K2; fonte EN §5.3.3, pp.55; PT pp.61. **Chave revista: o4**.
- **Revisão de todas as alternativas:** Combinar dashboard/notificações assíncronas e resumo de riscos adapta frequência e detalhe. O1 é demasiado lento para bloqueios; o2 ignora fusos e registo persistente; o3 exige que direção derive informação de logs sem resumo. A ausência de formato regulamentar único é explícita.
- **PT-PT:** Fusos horários, notificações assíncronas, grupo de direção e resumo de riscos foram revistos lado a lado. Não se impõe dashboard a todos os contextos.
- **Estado:** PASS assistido por IA; aprovação humana PENDING. Dificuldade e funcionamento real dos distratores não calibrados.

### Qualidade, terminologia e limites da fase 4

Os K2 pedem compreender consequências de um contexto ou distinguir conceitos relacionados; os K1 reconhecem contributos, atributos, fatores ou categorias. Todos têm dados suficientes para a distinção pedida, sem promover a classificação cognitiva. Não há cálculos novos. A manutenção dos K3 é verificada pelas resoluções independentes de particionamento, BVA, tabelas de decisão, estados, estimativa e priorização já existentes.

Foram revistas **76 alternativas novas**, incluindo todas as incorretas, e as respetivas 76 justificações EN/PT. As simplificações perigosas foram explicitamente evitadas: cobertura de ramos não implica todos os requisitos; feedback não congela requisitos; automação não elimina teste manual; contagem de execuções não mede por si só controlo do risco; métricas de defeitos podem informar qualidade mas pertencem a categoria distinta; análise de anomalias precede correção. Os termos conceção, planeamento, controlo, utilizador, programador, âmbito, ficheiro, escuta ativa e carta de teste foram conferidos com PT. Não se reproduziram gralhas da tradução oficial como regra técnica.

As 47 perguntas anteriores não foram reescritas. Persistem itens introdutórios com três alternativas e alguns distratores fáceis. Nas novas, cenários e distratores mais próximos reduzem simplificações evidentes, mas alternativas corretas por vezes mais completas e diferenças de comprimento podem dar pistas. Nenhum teste de software mede dificuldade, discriminação, taxa de acerto casual, eficácia real dos distratores ou equivalência aos exames oficiais. São necessários candidatos/revisores humanos para essa evidência.

Separação de estados: **software** é validado pelas execuções no [relatório de blueprint](blueprint-validation.md#fase-4--regressão-com-o-banco-completo); **revisão académica e linguística por IA** tem PASS limitado ao âmbito descrito; **aprovação editorial humana** continua pendente para **66 perguntas e 66 traduções**, HUMAN_APPROVED=0; **calibração psicométrica** não foi realizada. Não se afirma endosso ISTQB/PSTQB.

Recomendação: revisão humana independente das 19 adições, com resolução sem consultar a chave, avaliação de cada distrator e comparação EN/PT, antes de recolher dados de dificuldade. Priorizar as distinções de cobertura/omissão (tl-059), métricas (tl-065), monitorização de risco (tl-064) e papéis (tl-050).

## Fase 4.1 — correções bilingues controladas

Revisão **2026-10-27.4 → 2026-10-27.5**, 27-10-2026. Manutenção de cinco itens, sem expansão: **66 perguntas, 64 LO, 29 grupos de blueprint**. O preflight reproduziu os totais, validou uma seleção de 40 e confirmou os três hashes históricos antes de qualquer alteração de conteúdo. O Git já tinha trabalho não commitado de fases anteriores; não foi revertido. Não surgiu estado inesperado.

Entrada: relatório fornecido pelo utilizador, «TestLearn — Revisão independente por IA do banco 2026-10-27.4». As observações sobre os cinco textos foram confrontadas com o banco executável e confirmadas. O resultado 66/66 chaves compatíveis pertence à segunda IA e não é aprovação humana nem calibração psicométrica. Os restantes achados sobre distratores e repetição ficam por tratar; não foram adicionadas opções ou perguntas.

### Fase 4.1 — tl-002

- **Campo:** o3, EN, “Reporting a crash in a build” → “Reporting a product failure in a build”. PT mantém “Reportar uma falha numa versão”.
- **Motivo:** alinhar a descrição inglesa com a falha de produto mencionada em PT, mantendo reporte de problema do produto versus garantia da qualidade orientada ao processo. Não se altera a chave o1, nem as justificações. Versão **1 → 2**.
- **Fonte técnica mantida:** syllabus EN 4.0.1 §1.2.2 p.17; não se usa uma nova citação para justificar uma alteração meramente linguística.

### Fase 4.1 — tl-003

- **Campo:** o3 EN “Checking the repair afterwards” → **“Running a confirmation test after the fix”**; PT “Verificar posteriormente a correção através de testes” → **“Executar um teste de confirmação após a correção”**.
- **Justificação de o3:** EN “Running a confirmation test checks whether the fix resolved the original problem; locating and removing the defect is debugging.” PT “Executar um teste de confirmação verifica se a correção resolveu o problema original; localizar e remover o defeito pertence ao debugging.”
- **Motivo:** retirar a interpretação genérica de checking como possível verificação dentro de debugging. A explicação geral e as alternativas o1/o2 já distinguem deteção/remoção e confirmação; foram mantidas integralmente. Chave **o1**, tipo scenario e required=1 preservados. Versão **2 → 3**.
- **Fonte reconsultada:** syllabus EN 4.0.1 §1.1.2, p.16: confirmação posterior verifica se a correção resolveu o problema; debugging localiza e remove o defeito.

### Fase 4.1 — tl-008

- **Campo:** o3 PT “Testers independentes nunca deixam passar defeitos” → **“Testadores independentes nunca deixam passar defeitos”**.
- **Motivo:** uniformizar terminologia PT-PT. EN, explicações, chave o1 e conceito de independência inalterados. Versão **2 → 3**.
- **Fonte técnica mantida:** syllabus EN 4.0.1 §1.5.3 pp.22–23.

### Fase 4.1 — tl-023

- **Campo:** o2 PT “Apenas repetição de guiões” → **“Apenas repetição de scripts de teste”**.
- **Motivo:** aplicar terminologia do projeto. A referência PSTQB, syllabus PT 4.0 tradução 1.0 §1.4.3 p.22, foi reaberta e usa scripts de teste nos produtos de trabalho de implementação. A secção técnica da questão continua EN 4.0.1 §4.4.2 p.44. EN, carta de testes, chave o1 e explicações inalterados. Versão **2 → 3**.

### Fase 4.1 — tl-058

- **Campo:** enunciado PT passa a **“Um líder de revisão prepara uma revisão de um guia atualizado de colocação em serviço de software. Que medida é um fator reconhecido de sucesso das revisões?”**.
- **Motivo:** deployment guide não se limita a instalação. “Colocação em serviço de software” mantém o referente inglês sem impor produção ou uma tecnologia específica. É uma escolha editorial PT-PT para este cenário, não uma alegação de termo oficial obrigatório. O enunciado EN, opções e justificações ficam intactos. Chave o4 e conceito de sucesso da revisão preservados. Versão **1 → 2**.
- **Fonte técnica mantida:** syllabus EN 4.0.1 §3.2.5 p.37; referência PT §3.2.5 p.40 reaberta para confirmar que o conceito de objetivos/saída/preparação não mudou.

### Controlo de âmbito e editorial

Os cinco IDs e as versões estão registados em src/data/bilingual-review.json. Apenas esses itens recebem nova versão e referência de revisão; os registos originais da fase 2 e as fontes técnicas não foram reescritos. Revisão técnica/linguística continua assistida por IA, PASS limitado ao âmbito descrito; **humanApproval: PENDING nas 66 perguntas**. Não há atribuição de aprovação humana à segunda IA.

Os testes constroem a alteração esperada campo a campo a partir do arquivo .4 e comparam os **66 objetos completos**, incluindo tabelas e explicações: a diferença é exatamente os cinco itens autorizados; os outros 61 são profundamente iguais. As chaves, IDs de opções, capítulo, LO, K-level, tipo e cardinalidade das 66 perguntas mantêm-se. Os testes antigos sobre as fases 2/3/4 usam os respetivos bancos congelados para conservar a evidência histórica, enquanto a regressão nova verifica explicitamente o banco .5.

Arquivo, compatibilidade, 1 000 seeds e resultados dos comandos estão no [registo de validação da fase 4.1](blueprint-validation.md#fase-41--manutenção-bilingue), evitando duplicar resultados aqui. Os dois cadernos de revisão independente em tmp continuam a representar .4 e não foram regenerados silenciosamente.

## Fase 5A — variedade e K3

Data da revisão por IA: **28-10-2026**. Banco **66 → 82 perguntas**, **64 LO mantidos**. Identificados no banco e nos grupos reais os 16 IDs obrigatórios: **tl-005, tl-009, tl-010, tl-019, tl-025, tl-027, tl-028, tl-029, tl-035, tl-036, tl-037, tl-038, tl-039, tl-040, tl-041, tl-044**. Sete são K3: tl-025, tl-027, tl-028, tl-029, tl-036, tl-037 e tl-038. FL-4.2.2 não era obrigatório por ID, pois já tinha três candidatos; não se inventou uma necessidade de nova BVA nesta fase.

As listagens de LO/nível do syllabus inglês 4.0.1 pp.14,24,38,47,58 e as secções técnicas abaixo foram reabertas, tal como a tabela de estrutura v1.19 pp.4–5. A matriz e o algoritmo não mudaram. Os PDFs locais continuam excluídos da aplicação e do Git. As perguntas novas são originais: não foram copiados enunciados, valores, tabelas ou alternativas oficiais. Direitos das referências pertencem a ISTQB® e autores identificados nos documentos. Não se fez nova consulta integral dos exemplos A–D nesta fase; a referência técnica é o syllabus efetivamente consultado.

| Antigo ID obrigatório | Nova alternativa | LO       | Nível | Secção EN / páginas | Chave |
| --------------------- | ---------------- | -------- | ----- | ------------------- | ----- |
| tl-005                | tl-067           | FL-1.3.1 | K2    | §1.3 / 17, 18       | o2    |
| tl-009                | tl-068           | FL-2.1.2 | K1    | §2.1.2 / 25, 26     | o1    |
| tl-010                | tl-069           | FL-2.1.3 | K1    | §2.1.3 / 26         | o3    |
| tl-019                | tl-070           | FL-4.1.1 | K2    | §4.1 / 39           | o4    |
| tl-025                | tl-071           | FL-4.2.1 | K3    | §4.2.1 / 39, 40     | o2    |
| tl-027                | tl-072           | FL-4.2.3 | K3    | §4.2.3 / 41         | o1    |
| tl-028                | tl-073           | FL-4.2.4 | K3    | §4.2.4 / 41, 42     | o3    |
| tl-029                | tl-074           | FL-4.5.3 | K3    | §4.5.3 / 46         | o4    |
| tl-035                | tl-075           | FL-5.4.1 | K2    | §5.4 / 56           | o3    |
| tl-036                | tl-076           | FL-5.1.4 | K3    | §5.1.4 / 49, 50     | o3    |
| tl-037                | tl-077           | FL-5.1.5 | K3    | §5.1.5 / 50, 51     | o2    |
| tl-038                | tl-078           | FL-5.5.1 | K3    | §5.5 / 56, 57       | o1    |
| tl-039                | tl-079           | FL-6.1.1 | K2    | §6.1 / 59           | o4    |
| tl-040                | tl-080           | FL-6.2.1 | K1    | §6.2 / 59, 60       | o2    |
| tl-041                | tl-081           | FL-1.5.2 | K1    | §1.5.2 / 22         | o3    |
| tl-044                | tl-082           | FL-5.1.7 | K2    | §5.1.7 / 51         | o1    |

### Fase 5A — tl-067

**FL-1.3.1 / K2**, alternativa de tl-005, fonte EN §1.3 pp.17, 18. Quatro opções estáveis o1–o4, required=1, versão 1.

O piloto salarial cumpre cálculos especificados mas falha a necessidade de aprovação: falácia da ausência de defeitos. O2 valida o fluxo real. O1 aumenta verificação, o3 aplica concentração de defeitos e o4 desgaste de testes, sem tratar a necessidade omitida.

**EN/PT-PT:** revistos enunciado, dados, todas as alternativas e respetivas justificações; condições, números, eventos e cardinalidade preservados. Tabelas têm rótulos bilingues e tokens comuns, sem tradução de IDs. Resultado **AI_REVIEWED / PASS**, humanApproval **PENDING**. Não houve revisor humano independente ou calibração da dificuldade.

### Fase 5A — tl-068

**FL-2.1.2 / K1**, alternativa de tl-009, fonte EN §2.1.2 pp.25, 26. Quatro opções estáveis o1–o4, required=1, versão 1.

Reconhecer análise e participação nos rascunhos como boas práticas transversais ao SDLC. O1 preserva teste antecipado; o2 mistura objetivos de níveis, o3 adia revisão e o4 subordina estático à sequência dinâmica. É K1, sem apresentar esta classificação como aplicação K3.

**EN/PT-PT:** revistos enunciado, dados, todas as alternativas e respetivas justificações; condições, números, eventos e cardinalidade preservados. Tabelas têm rótulos bilingues e tokens comuns, sem tradução de IDs. Resultado **AI_REVIEWED / PASS**, humanApproval **PENDING**. Não houve revisor humano independente ou calibração da dificuldade.

### Fase 5A — tl-069

**FL-2.1.3 / K1**, alternativa de tl-010, fonte EN §2.1.3 pp.26. Quatro opções estáveis o1–o4, required=1, versão 1.

Reconhecer descrições comportamentais partilhadas com execução como característica de BDD (o3). O1 descreve TDD, o2 revisão estática e o4 exploração. A explicação reconhece sobreposição com ATDD e necessidade de código de suporte; não promete transformação mágica de qualquer frase em teste.

**EN/PT-PT:** revistos enunciado, dados, todas as alternativas e respetivas justificações; condições, números, eventos e cardinalidade preservados. Tabelas têm rótulos bilingues e tokens comuns, sem tradução de IDs. Resultado **AI_REVIEWED / PASS**, humanApproval **PENDING**. Não houve revisor humano independente ou calibração da dificuldade.

### Fase 5A — tl-070

**FL-4.1.1 / K2**, alternativa de tl-019, fonte EN §4.1 pp.39. Quatro opções estáveis o1–o4, required=1, versão 1.

Aplicar as bases de derivação aos três trabalhos: comportamento especificado, ramos internos e padrões de incidentes. O4 classifica caixa-preta/caixa-branca/experiência; os outros três trocam fontes, não formatos de execução.

**EN/PT-PT:** revistos enunciado, dados, todas as alternativas e respetivas justificações; condições, números, eventos e cardinalidade preservados. Tabelas têm rótulos bilingues e tokens comuns, sem tradução de IDs. Resultado **AI_REVIEWED / PASS**, humanApproval **PENDING**. Não houve revisor humano independente ou calibração da dificuldade.

### Fase 5A — tl-071

**FL-4.2.1 / K3**, alternativa de tl-025, fonte EN §4.2.1 pp.39, 40. Quatro opções estáveis o1–o4, required=1, versão 1.

Partições dos dias: <2, 2–14, 15–45, >45; formatos PDF/CSV/outro. Os dois casos existentes cobrem quatro das sete partições. Faltam dias baixos, dias altos e outro formato. São precisos pelo menos dois testes porque os dois intervalos de dias em falta não podem coexistir num único valor. (1,XML) e (46,PDF) cobrem os três itens. O1 repete dias válidos, o3 omite dias altos e o4 omite outro formato. A avaliação independente de campos, mesmo inválidos, é explícita para impedir mascaramento. O teste calcula os conjuntos sem consultar a chave e encontra apenas o2.

**EN/PT-PT:** revistos enunciado, dados, todas as alternativas e respetivas justificações; condições, números, eventos e cardinalidade preservados. Tabelas têm rótulos bilingues e tokens comuns, sem tradução de IDs. Resultado **AI_REVIEWED / PASS**, humanApproval **PENDING**. Não houve revisor humano independente ou calibração da dificuldade.

### Fase 5A — tl-072

**FL-4.2.3 / K3**, alternativa de tl-027, fonte EN §4.2.3 pp.41. Quatro opções estáveis o1–o4, required=1, versão 1.

Tabela completa minimizada: R1 B/O/E=T/T/T; R2 T/T/F; R3 T/F/–; R4 F/–/–. As colunas cobrem respetivamente 1+1+2+4=8 combinações sem sobreposição, cada uma com uma ação. Enumeradas exaustivamente as oito entradas no teste, cada uma casa exatamente com uma regra. Os casos existentes cobrem R1/R3; faltam R2/R4. O1 fornece (T,T,F) e (F,F,T). O2 repete R1, o3 repete R3, o4 executa R4 duas vezes. Nenhuma combinação inviável ou regra contraditória foi escondida.

**EN/PT-PT:** revistos enunciado, dados, todas as alternativas e respetivas justificações; condições, números, eventos e cardinalidade preservados. Tabelas têm rótulos bilingues e tokens comuns, sem tradução de IDs. Resultado **AI_REVIEWED / PASS**, humanApproval **PENDING**. Não houve revisor humano independente ou calibração da dificuldade.

### Fase 5A — tl-073

**FL-4.2.4 / K3**, alternativa de tl-028, fonte EN §4.2.4 pp.41, 42. Quatro opções estáveis o1–o4, required=1, versão 1.

Modelo com quatro estados e cinco transições válidas: Review→Approved por approve; Review→Returned por return; Returned→Review por resubmit; Approved→Review por revoke; Approved→Published por publish. Outros pares são explicitamente inválidos. Um teste começa em Review e termina em Published cobrindo as cinco transições. Revoke exige voltar a aprovar antes da publicação; portanto cinco transições distintas exigem pelo menos seis eventos. O3 atinge o limite: return,resubmit,approve,revoke,approve,publish. O1 omite a devolução; o2 omite revoke; o4 tenta resubmit a partir de Review. Uma pesquisa independente encontra comprimento mínimo 6 e uma única alternativa válida entre as oferecidas.

**EN/PT-PT:** revistos enunciado, dados, todas as alternativas e respetivas justificações; condições, números, eventos e cardinalidade preservados. Tabelas têm rótulos bilingues e tokens comuns, sem tradução de IDs. Resultado **AI_REVIEWED / PASS**, humanApproval **PENDING**. Não houve revisor humano independente ou calibração da dificuldade.

### Fase 5A — tl-074

**FL-4.5.3 / K3**, alternativa de tl-029, fonte EN §4.5.3 pp.46. Quatro opções estáveis o1–o4, required=1, versão 1.

Critérios ATDD acordados antes do código: titular, sem reserva, contagem anterior <2; sucesso incrementa, recusa não altera. Os casos existentes cobrem sucesso e bloqueio por reserva. Falta isolar não titular e limite atingido. O4 usa outro requerente/0→recusa/0 e titular/2→recusa/2. O1 tem resultados válidos mas não cobre titularidade; o2 permite indevidamente exceder o limite; o3 permite outro requerente. O teste avalia cada resultado contra o predicado e a atualização do contador, sem usar a chave. Não se acrescentam regras fora da story.

**EN/PT-PT:** revistos enunciado, dados, todas as alternativas e respetivas justificações; condições, números, eventos e cardinalidade preservados. Tabelas têm rótulos bilingues e tokens comuns, sem tradução de IDs. Resultado **AI_REVIEWED / PASS**, humanApproval **PENDING**. Não houve revisor humano independente ou calibração da dificuldade.

### Fase 5A — tl-075

**FL-5.4.1 / K2**, alternativa de tl-035, fonte EN §5.4 pp.56. Quatro opções estáveis o1–o4, required=1, versão 1.

A reprodução de r208/esquema v12/dados D6 exige a base relacionada de compilação, esquema, dados, scripts e configuração (o3). O1 confia em nomes, o2 restaura só uma parte e o4 mistura versões recentes; nenhum reproduz a base original. É aplicação conceptual de gestão de configurações, sem alterar configurações reais.

**EN/PT-PT:** revistos enunciado, dados, todas as alternativas e respetivas justificações; condições, números, eventos e cardinalidade preservados. Tabelas têm rótulos bilingues e tokens comuns, sem tradução de IDs. Resultado **AI_REVIEWED / PASS**, humanApproval **PENDING**. Não houve revisor humano independente ou calibração da dificuldade.

### Fase 5A — tl-076

**FL-5.1.4 / K3**, alternativa de tl-036, fonte EN §5.1.4 pp.49, 50. Quatro opções estáveis o1–o4, required=1, versão 1.

Três pontos por tarefa: X=(3+4×6+15)/6=7; Y=(2+4×5+8)/6=5. O esforço fixo separado de preparação é 3, somado uma única vez: total 15 pessoas-hora (o3). O1=12 omite preparação; o2=14 usa apenas mais prováveis; o4=16 usa médias não ponderadas. A independência, aditividade e exclusão prévia da preparação são explícitas. O teste lê os números da tabela e calcula as duas estimativas; não confunde esforço com duração nem inventa intervalos de confiança.

**EN/PT-PT:** revistos enunciado, dados, todas as alternativas e respetivas justificações; condições, números, eventos e cardinalidade preservados. Tabelas têm rótulos bilingues e tokens comuns, sem tradução de IDs. Resultado **AI_REVIEWED / PASS**, humanApproval **PENDING**. Não houve revisor humano independente ou calibração da dificuldade.

### Fase 5A — tl-077

**FL-5.1.5 / K3**, alternativa de tl-037, fonte EN §5.1.5 pp.50, 51. Quatro opções estáveis o1–o4, required=1, versão 1.

Quatro intervalos, um testador, duração de um intervalo por teste; B depende de A e C só tem ambiente a partir do 3. Regra explícita: escolher maior risco entre executáveis, sem reservar intervalos. Conjuntos: {A,D}→D; {A}→A; {B,C}→B; {C}→C. O2=D,A,B,C. O1 ignora D inicialmente; o3 ignora risco relativo B/C no intervalo 3; o4 antecipa o ambiente de C. O teste simula dependências/disponibilidade por intervalo e deriva a ordem independentemente.

**EN/PT-PT:** revistos enunciado, dados, todas as alternativas e respetivas justificações; condições, números, eventos e cardinalidade preservados. Tabelas têm rótulos bilingues e tokens comuns, sem tradução de IDs. Resultado **AI_REVIEWED / PASS**, humanApproval **PENDING**. Não houve revisor humano independente ou calibração da dificuldade.

### Fase 5A — tl-078

**FL-5.5.1 / K3**, alternativa de tl-038, fonte EN §5.5 pp.56, 57. Quatro opções estáveis o1–o4, required=1, versão 1.

Preparar um resumo fiel aos factos: r204/pré-produção, item L-42 criado offline, restabelecer ligação, uma sincronização, esperado 1 registo/obtidos 2, reprodução e trace t42. O1 conserva estes dados. O2 inverte esperado/obtido; o3 perde pré-condição e passo; o4 troca para r205 e inventa uma causa de concorrência. O teste confronta os quatro rascunhos com os factos. Um resumo não é tratado como relatório completo: identificadores, impacto, prioridade e acompanhamento podem ser acrescentados num relatório real.

**EN/PT-PT:** revistos enunciado, dados, todas as alternativas e respetivas justificações; condições, números, eventos e cardinalidade preservados. Tabelas têm rótulos bilingues e tokens comuns, sem tradução de IDs. Resultado **AI_REVIEWED / PASS**, humanApproval **PENDING**. Não houve revisor humano independente ou calibração da dificuldade.

### Fase 5A — tl-079

**FL-6.1.1 / K2**, alternativa de tl-039, fonte EN §6.1 pp.59. Quatro opções estáveis o1–o4, required=1, versão 1.

Escolher a capacidade que mede os ramos efetivamente exercitados (o4). Análise estática/complexidade (o1), rastreabilidade de requisitos (o2) e contagem de asserções aprovadas (o3) são resultados úteis de ferramentas, mas não respondem à lacuna de cobertura estrutural. Evita a comparação antiga demasiado óbvia entre carga e corretor ortográfico.

**EN/PT-PT:** revistos enunciado, dados, todas as alternativas e respetivas justificações; condições, números, eventos e cardinalidade preservados. Tabelas têm rótulos bilingues e tokens comuns, sem tradução de IDs. Resultado **AI_REVIEWED / PASS**, humanApproval **PENDING**. Não houve revisor humano independente ou calibração da dificuldade.

### Fase 5A — tl-080

**FL-6.2.1 / K1**, alternativa de tl-040, fonte EN §6.2 pp.59, 60. Quatro opções estáveis o1–o4, required=1, versão 1.

Reconhecer dependência do fornecedor e compatibilidade continuada quando termina o suporte do executor (o2). As outras opções descrevem consistência humana, acesso a métricas e comparações manuais: preocupações reais, mas diferentes do facto apresentado. Não se conclui que resultados atuais se tornem automaticamente inválidos.

**EN/PT-PT:** revistos enunciado, dados, todas as alternativas e respetivas justificações; condições, números, eventos e cardinalidade preservados. Tabelas têm rótulos bilingues e tokens comuns, sem tradução de IDs. Resultado **AI_REVIEWED / PASS**, humanApproval **PENDING**. Não houve revisor humano independente ou calibração da dificuldade.

### Fase 5A — tl-081

**FL-1.5.2 / K1**, alternativa de tl-041, fonte EN §1.5.2 pp.22. Quatro opções estáveis o1–o4, required=1, versão 1.

Transferência de conhecimento permite que um programador qualificado execute e avalie uma verificação de aceitação durante a ausência do testador: flexibilidade de tarefas e qualidade partilhada (o3). O1 descreve independência, o2 automação e o4 reprodutibilidade por configuração; são vantagens reais de outras práticas, não o benefício observado. O cenário não presume competência sem formação nem elimina independência quando o contexto a exige.

**EN/PT-PT:** revistos enunciado, dados, todas as alternativas e respetivas justificações; condições, números, eventos e cardinalidade preservados. Tabelas têm rótulos bilingues e tokens comuns, sem tradução de IDs. Resultado **AI_REVIEWED / PASS**, humanApproval **PENDING**. Não houve revisor humano independente ou calibração da dificuldade.

### Fase 5A — tl-082

**FL-5.1.7 / K2**, alternativa de tl-044, fonte EN §5.1.7 pp.51. Quatro opções estáveis o1–o4, required=1, versão 1.

Investigar esgotamento de recursos e degradação de tempo de resposta no serviço integrado antes da entrega é Q4, tecnológico/avaliação crítica do produto (o1). O2 Q1 apoia desenvolvimento por componentes, o3 Q2 orienta por exemplos de negócio, o4 Q3 aborda perspetiva do utilizador/usabilidade. Retirou-se do enunciado a indicação explícita dos dois eixos para a classificação depender do cenário, não da repetição das palavras da alternativa.

**EN/PT-PT:** revistos enunciado, dados, todas as alternativas e respetivas justificações; condições, números, eventos e cardinalidade preservados. Tabelas têm rótulos bilingues e tokens comuns, sem tradução de IDs. Resultado **AI_REVIEWED / PASS**, humanApproval **PENDING**. Não houve revisor humano independente ou calibração da dificuldade.

### Limites e revisão de tradução

Foram revistas 64 alternativas novas e as justificações nos dois idiomas. PT-PT usa ficheiro, utilizador, programador, conceção, preparação, cobertura, partição, ramo e pessoas-hora. Identificadores B/O/E, T/F/–, estados/eventos, X/Y, A/B/C/D, r204, L-42 e trace t42 são os mesmos nos dois idiomas; pré-produção traduz staging. O enunciado de partições explicita ausência de mascaramento; o modelo de estados define todos os pares não listados como inválidos; a priorização define janelas, dependências e recursos. Estas restrições não são pressupostos ocultos.

Os 66 objetos anteriores permanecem profundamente iguais ao arquivo .5, incluindo as 39 perguntas antigas de três opções, deixadas para a fase 5B. O banco atual tem K1=18/K2=47/K3=17 e capítulos 16/12/8/21/21/4. Há apenas duas perguntas para cada um dos 16 LO agora reforçados; a repetição continua possível. Algumas opções corretas podem continuar mais completas que os distratores; não foram medidos dificuldade empírica, discriminação ou tempo com candidatos. Os novos K3 exigem aplicação de dados/regras, mas não se afirma dificuldade equivalente a exame oficial.

Software PASS, avaliação académica por IA PASS, aprovação humana e calibração psicométrica são estados separados. **82 perguntas e 82 traduções aguardam aprovação humana; HUMAN_APPROVED=0**. A evidência quantitativa e de execução fica na [validação da fase 5A](blueprint-validation.md#fase-5a--variedade-quantificada). Recomenda-se revisão humana sem acesso prévio à chave, começando pelos sete novos K3 e pelas justificações dos distratores.

## Fase 5B — baseline editorial anterior às alterações (28-10-2026)

Preflight concluído antes do arquivo .6 e antes de editar o banco: 82 IDs consecutivos tl-001–tl-082, 82 elegíveis, 64 LO, 29 grupos. Exatamente 39 itens de três opções: tl-002–tl-040; os outros 43 ficam fora do âmbito. Revisão .6 e arquivos .1–.5 válidos. Trabalho local 5C inventariado em tmp/phase5b-preflight.json e preservado; evidência imediatamente anterior: 112 unitários/integração e 50 E2E passaram, exit 0. Não há falha de integridade material.

Consulta técnica: syllabus EN 4.0.1 (15-09-2024), secções/páginas por item abaixo; PT 4.0 v1.0 como referência terminológica, não tradução do erratum. Tabelas v1.19 pp.1,4–5 confirmam 40 perguntas, 8/24/8 por K-level e 29 grupos. Amostras A1.7/B1.7/C1.6/D1.5, p.13 de cada, apenas para estilo/estrutura; nada dessas perguntas foi incorporado. A consulta é parcial e não implica auditoria integral das amostras.

Categorias: defeito factual = incompatibilidade demonstrável; fragilidade pedagógica = distrator/indício/nível pouco exigente; preferência editorial = forma sem mudança de conceito. Não foi identificado erro de chave que exija bloqueio. As insuficiências de contexto em tl-005/tl-010/tl-034 e a fragilidade K2 em tl-024 podem ser corrigidas preservando conceito/chave/LO. EN/PT analisados em paralelo: não se encontrou nova divergência factual nos 39; a reformulação exigirá nova verificação.

| ID     | LO / K / versão .6 / chave / cardinalidade | Fonte EN: secção, páginas PDF | Resolução e diagnóstico individual antes da edição                                                                                                                                                                                                           |
| ------ | ------------------------------------------ | ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| tl-002 | FL-1.2.2 / K1 / v2 / o1 / 1                | 1.2.2, 17                     | QA/QC: o1 melhora o processo; o2/o3 avaliam/reportam o produto. K1 adequado. Falta uma alternativa próxima de revisão; sem defeito factual identificado.                                                                                                     |
| tl-003 | FL-1.1.2 / K2 / v3 / o1 / 1                | 1.1.2, 16                     | Debugging: o1 localiza/remove o defeito; confirmação é teste. K2 muito direto, mas distinção válida. A reprodução isolada seria ambígua; preservar ressalva e aproximar distratores de atividades reais de teste.                                            |
| tl-004 | FL-1.2.3 / K2 / v1 / o1 / 1                | 1.2.3, 17                     | A fórmula no código é um defeito (o1), não a ação humana nem o comportamento observado. K2 classifica um exemplo concreto. Completar a cadeia causal com uma alternativa de causa raiz, sem confundir a causa com a fórmula.                                 |
| tl-005 | FL-1.3.1 / K2 / v1 / o1 / 1                | 1.3, 17, 18                   | Variar testes/dados (o1) pode melhorar deteção, mas ausência de novos defeitos, sozinha, não prova desgaste. Clarificar falhas novas fora da suite; substituir declarar ausência de defeitos/parar regressão por estratégias plausíveis porém insuficientes. |
| tl-006 | FL-1.4.1 / K2 / v2 / o1 / 1                | 1.4.1, 18, 19                 | Derivar condições é análise (o1). K2 adequado, contexto suficiente. Execução/conclusão são distantes; acrescentar conceção, a confusão mais próxima, e explicar o que versus como testar.                                                                    |
| tl-007 | FL-1.4.4 / K2 / v1 / o1 / 1                | 1.4.4, 20, 21                 | Ligações identificam impacto (o1). Reparação automática e eliminação da análise tornam os distratores óbvios. Substituir por confusão entre rastreabilidade, evidência de execução e oráculo de resultados.                                                  |
| tl-008 | FL-1.5.3 / K2 / v3 / o1 / 1                | 1.5.3, 22, 23                 | Perspetivas diferentes (o1) desafiam pressupostos. Independentes nunca falham é pista absoluta; explorar transferência de responsabilidade, perda de competências e isolamento. K2 simples, sem garantia de deteção.                                         |
| tl-009 | FL-2.1.2 / K1 / v1 / o1 / 1                | 2.1.2, 25, 26                 | Análise paralela ao desenvolvimento (o1) é boa prática. K1 adequado. Esperar deployment/um nível apenas são pouco competitivos; aproximar os erros de timing, objetivos por nível e substituição indevida de revisões.                                       |
| tl-010 | FL-2.1.3 / K1 / v2 / o1 / 1                | 2.1.3, 26                     | TDD (o1) é compatível; escrever testes antes do código também ocorre em ATDD/BDD. Clarificar o ciclo teste-código-refatoração antes de oferecer essas alternativas plausíveis. K1 reconhece uma característica, sem aplicação adicional.                     |
| tl-011 | FL-2.2.3 / K2 / v1 / o1 / 1                | 2.2.3, 30, 31                 | Repetir teste falhado é confirmação, verificar efeitos noutras áreas é regressão (o1). K2 adequado. Usar quatro combinações simétricas e justificar cada classificação.                                                                                      |
| tl-012 | FL-2.2.1 / K2 / v2 / o1 / 1                | 2.2.1, 28, 29                 | Interfaces entre módulos internos implicam integração de componentes (o1). K2 adequado. Falta componente isolado, confusão de âmbito relevante. Não confundir integração interna com sistemas externos.                                                      |
| tl-013 | FL-2.1.5 / K2 / v1 / o1 / 1                | 2.1.5, 27                     | Antecipar revisão é shift left (o1). Os distratores atuais negar testes posteriores/produção apenas são fáceis. Contrastar timing e finalidade de shift right, regressão e conclusão.                                                                        |
| tl-014 | FL-2.3.1 / K2 / v1 / o1 / 1                | 2.3, 31                       | Migrar ambiente operacional desencadeia manutenção (o1). Os incorretos negam regressões/efeitos da infraestrutura. Substituir por confusões entre mudança de ambiente, dados e validade da evidência anterior.                                               |
| tl-015 | FL-3.1.1 / K1 / v1 / o1 / 1                | 3.1.1, 33                     | Requisitos são um produto examinável estaticamente (o1). Não usar logs/código como distratores, pois também são examináveis. Contrastar documento com medições/comportamentos dependentes de execução. K1 continua reconhecimento.                           |
| tl-016 | FL-3.2.3 / K1 / v2 / o1 / 1                | 3.2.3, 36                     | Moderador facilita a reunião (o1). K1 correto; redator/gestor já são plausíveis. Acrescentar líder de revisão e distinguir responsabilidade global de facilitação.                                                                                           |
| tl-017 | FL-3.1.3 / K2 / v1 / o1 / 1                | 3.1.3, 34                     | Revisão encontra defeito diretamente; execução observa falha (o1). K2 contextual. Os incorretos atuais são frágeis; criar classificações simétricas de defeito/falha e limites da inferência da causa.                                                       |
| tl-018 | FL-3.2.4 / K2 / v2 / o1 / 1                | 3.2.4, 36, 37                 | Inspeção (o1) é a mais formal e recolhe métricas. K2 simples, cenário suficiente. Distratores técnicos/walkthrough adequados; acrescentar revisão informal sem alegar que outras revisões nunca recolhem métricas.                                           |
| tl-019 | FL-4.1.1 / K2 / v1 / o1 / 1                | 4.1, 39                       | Base em comportamento especificado indica caixa-preta (o1). K2 adequado. Remover apenas em experiência; a quarta opção deve distinguir abordagem de risco da família por base de derivação, sem inventar uma família CTFL.                                   |
| tl-020 | FL-4.3.1 / K2 / v1 / o1 / 1                | 4.3.1, 42                     | Cobertura de instruções 100% não implica ramos (o1). K2 correto. Requisitos corretos é demasiado distante; contrastar ramos, caminhos e correção funcional.                                                                                                  |
| tl-021 | FL-4.3.2 / K2 / v1 / o1 / 1                | 4.3.2, 43                     | Um ramo de dois dá 50% (o1). K2 explica a medida com aritmética elementar; não promover para K3. Novo 25% deve corresponder a denominador duplicado; manter âmbito restrito aos dois ramos.                                                                  |
| tl-022 | FL-4.4.1 / K2 / v2 / o1 / 1                | 4.4.1, 43, 44                 | Conhecimento de falhas anteriores guia antecipação de erros (o1). K2 adequado; exaustivo é distante. Clarificar a base de seleção e distinguir exploração e fronteiras, admitindo combinação de técnicas noutros contextos.                                  |
| tl-023 | FL-4.4.2 / K2 / v3 / o1 / 1                | 4.4.2, 44                     | Aprender/conceber/executar em conjunto caracteriza exploração (o1). K2 adequado. Retirar apenas; distinguir scripts fixos, antecipação de erros e checklists, sem afirmar exclusividade entre técnicas.                                                      |
| tl-024 | FL-4.5.2 / K2 / v2 / o1 / 1                | 4.5.2, 45, 46                 | o1 explicita contexto-evento-resultado. Enunciado atual pede reconhecer palavras Given/When/Then, fragilidade K2. Pedir adequação a uma necessidade de exemplo observável; manter regra de negócio e o1.                                                     |
| tl-025 | FL-4.2.1 / K3 / v1 / o1 / 1                | 4.2.1, 39, 40                 | Partições <3, 3..8, >8: 2/5/9 é mínimo (o1), três representantes. K3 aplicado e inequívoco. Acrescentar conjunto de três que repete válida e omite superior; não oferecer outra solução válida.                                                              |
| tl-026 | FL-4.2.2 / K3 / v2 / o1 / 1                | 4.2.2, 40                     | BVA 2 valores: 9/10 e 20/21 (o1). K3 aplicado. Um superconjunto de seis valores também cobriria os quatro e não pode ser distrator no enunciado atual. Usar erros de inclusão/exclusão de fronteiras.                                                        |
| tl-027 | FL-4.2.3 / K3 / v2 / o1 / 1                | 4.2.3, 41                     | R1 exige membro e total≥50; sim/60 (o1). K3 aplicado; tabela suficiente. Quarta opção deve corresponder a R4, completando os quatro padrões sem alterar tabela.                                                                                              |
| tl-028 | FL-4.2.4 / K3 / v2 / o1 / 1                | 4.2.4, 41, 42                 | Rascunho-Submeter-Pendente-Pagar-Paga resolve o1. K3 aplicado, todas as restantes combinações são inválidas. Acrescentar transição extra após chegar a Paga; não supor eventos ignorados.                                                                    |
| tl-029 | FL-4.5.3 / K3 / v2 / o1 / 1                | 4.5.3, 46                     | 49→5 e 50→0 (o1) pela regra inclusiva. K3 aplicado. Completar as quatro combinações possíveis de resultados; manter formato paralelo e colaboração ATDD anterior à implementação.                                                                            |
| tl-030 | FL-5.1.6 / K1 / v1 / o1 / 1                | 5.1.6, 50, 51                 | Pirâmide favorece muitos testes pequenos e poucos grandes (o1). K1 adequado. Só UI/igual obrigatório são óbvios; contrastar pirâmide invertida, distribuição uniforme e concentração na integração.                                                          |
| tl-031 | FL-5.1.1 / K2 / v2 / o1 / 1                | 5.1.1, 48                     | Plano reúne âmbito, recursos e abordagem (o1). K2 contextual, mas relatório de defeito/registo são distantes. Distinguir política, cronograma e relatório de conclusão como artefactos relacionados mas insuficientes.                                       |
| tl-032 | FL-5.1.3 / K2 / v2 / o1 / 1                | 5.1.3, 49                     | Ambiente antes do início é entrada; aceitação de risco para conclusão é saída (o1). K2 adequado. Ambos dados é absurdo; oferecer as quatro combinações entrada/saída.                                                                                        |
| tl-033 | FL-5.2.2 / K2 / v2 / o1 / 1                | 5.2.2, 52                     | Cálculo fiscal incorreto é risco de qualidade do produto (o1), saídas/atrasos são projeto. K2 adequado. Formular como possibilidade, sem converter a classificação num defeito já observado; acrescentar risco de fornecedor.                                |
| tl-034 | FL-5.2.3 / K2 / v1 / o1 / 1                | 5.2.3, 52, 53                 | Impacto importa, mas probabilidade ausente deixa a alocação comparativa subespecificada. Explicitar probabilidade comparável para sustentar o1; contrastar visibilidade, duração e probabilidade isolada.                                                    |
| tl-035 | FL-5.4.1 / K2 / v2 / o1 / 1                | 5.4, 56                       | Reprodução precisa de identificar configuração de software/testes/dados (o1). K2 adequado. Nome de testador é fraco; contrastar preservação parcial e atualização de um elemento da configuração.                                                            |
| tl-036 | FL-5.1.4 / K3 / v2 / o1 / 1                | 5.1.4, 49, 50                 | (2+4×5+14)/6=6 (o1), média simples=7; K3 aplicado. Acrescentar 5, confundindo estimativa mais provável com ponderada. Manter valores/unidades.                                                                                                               |
| tl-037 | FL-5.1.5 / K3 / v1 / o1 / 1                | 5.1.5, 50, 51                 | Disponíveis inicialmente B/C; B primeiro, depois C desbloqueia A: B,C,A (o1). K3 aplicado. Acrescentar B,A,C, que respeita a primeira prioridade mas viola a dependência.                                                                                    |
| tl-038 | FL-5.5.1 / K3 / v2 / o1 / 1                | 5.5, 56, 57                   | o1 preserva QA/build82/INV-7/25/Save/201/500/r17. K3 seleciona relatório aplicado. Outros dois alteram resultados/configuração; acrescentar diagnóstico inventado sem evidência. Igualar estrutura das quatro opções.                                        |
| tl-039 | FL-6.1.1 / K2 / v1 / o1 / 1                | 6.1, 59                       | Gerar tráfego e medir latência exige ferramenta de carga (o1). K2 contextual, mas corretor/lista são absurdos. Contrastar ferramentas reais de análise estática, monitorização e gestão; esclarecer geração ativa da carga.                                  |
| tl-040 | FL-6.2.1 / K1 / v2 / o1 / 1                | 6.2, 59, 60                   | Subestimar manutenção é risco (o1); opções atuais são garantias falsas. K1 distingue risco de benefícios reais: redução de repetição, repetibilidade e métricas. Não inserir outros riscos que seriam igualmente corretos.                                   |

Todos os 39: review/translationReview=AI_REVIEWED, academicReview=PASS anterior (não prova independente), humanApproval=PENDING. Cenários K3 com dados suficientes; resultados derivados acima antes de criar alternativas. Complexidade simples continua uma limitação pedagógica, não se alteram K-levels para a esconder. Métricas de comprimento e termos absolutos serão comparadas na avaliação final, sem as confundir com dificuldade psicométrica.

## Fase 5B — revisão final .6 → .7

Foram revistos os 39 alvos, sem novos IDs. Todos recebem o4, uma alternativa incorreta original; a chave o1 e a cardinalidade 1 mantêm-se. Os outros 43 objetos são profundamente iguais ao arquivo .6. O banco .7 tem 82 perguntas e 328 opções (quatro em cada pergunta); a pergunta múltipla tl-001 mantém o1/o4 e cardinalidade 2.

Arquivo .6: `src/data/archive/questions-2026-10-27.6.json`, 82 objetos, serialização Prettier JSON com LF, SHA-256 **8bf1990ee8eb05f93eec529fe903a05db20ad72a649648f161f2847802c6012e**. Foi criado exclusivamente antes de alterar o banco e comparado profundamente com o runtime .6. Os hashes .1–.5 mantêm-se. O resolver continua assíncrono; .6 só foi acrescentada à lista de imports dinâmicos e revisões suportadas, sem fallback/migração.

### Método e alcance da contestação

Depois da primeira redação, as 39 perguntas foram apresentadas com alternativas baralhadas em letras A–D, sem chaves, explicações ou IDs de opção. Foram registadas respostas e razões antes de consultar o mapa letra→ID/chave: 39 coincidências. O agente já tinha visto as chaves e também escreveu o conteúdo: esta é uma **passagem adversarial separada do mesmo agente, com exposição prévia**, não revisão externa cega nem revisão independente entre modelos. A coincidência de chaves não determinou automaticamente PASS: abaixo constam argumentos em defesa das alternativas incorretas e a respetiva refutação.

Foram assinaladas NEEDS_REVISION durante a contestação tl-008 (benefício principal CTFL, não promessa de isolamento), tl-023 (atividades combinadas, não exclusão de técnicas auxiliares) e tl-034 (esforço baseado no risco, não ordenação por custo). Os enunciados foram clarificados e reavaliados; os 39 ficaram PASS dentro deste âmbito de revisão por IA. Não ficou bloqueio técnico identificado que exija trocar chave/LO/K/cardinalidade. Em tl-038, PT usa bloqueio mútuo, em vez de inglês não necessário.

Uma segunda passagem editorial detetou uma pista introduzida no rascunho: a correta era estritamente a mais curta em 13/39 EN. As opções foram reequilibradas por redação natural, sem quotas artificiais de comprimento. A versão final foi relida contra as razões da contestação; as seleções e princípios mantêm-se. Não se afirma independência psicométrica ou dificuldade de exame oficial.

### Indicadores editoriais

Contagem por palavras separadas por espaço; apenas textos das alternativas dos 39 alvos, não enunciados/explicações. Mais longa/curta significa estritamente, sem empates. Termos EN: always/never/only/all/guarantee(d)/impossible; PT: sempre/nunca/apenas/todos/todas/garante/garantido/impossível. É um diagnóstico lexical limitado, não análise gramatical ou calibração.

| Indicador                         | EN antes → depois | PT antes → depois |
| --------------------------------- | ----------------: | ----------------: |
| Opções analisadas                 |         117 → 156 |         117 → 156 |
| Correta estritamente mais longa   |             9 → 3 |             9 → 4 |
| Correta estritamente mais curta   |             5 → 0 |             7 → 1 |
| Ocorrências dos termos absolutos  |            19 → 1 |            23 → 2 |
| Comprimento mínimo/mediano/máximo |   1/4/23 → 1/5/27 |   1/5/26 → 1/6/30 |

Persistem pistas pontuais de comprimento: EN tl-003/008/009 mais longas; PT tl-002/009/020/034 mais longas e tl-013 mais curta (termo shift left). Não se removeu precisão nem se esticaram rótulos só para igualar comprimentos. K1 continua reconhecimento, incluindo tl-015 e tl-040; vários K2/K3 permanecem exercícios simples. As médias de tempo/dificuldade, discriminação e funcionamento dos distratores exigem dados de utilização e revisão humana.

### Verificação bilingue

390 pares de texto dos itens alterados (enunciado, explicação geral, quatro alternativas e quatro justificações) foram verificados para presença e valores numéricos na mesma ordem. A revisão semântica por IA verificou atores, condições, limiares inclusivos, eventos/estados, modalidade e erro de raciocínio nos dois idiomas. A verificação numérica automatizada não substitui essa revisão. Tabelas, identificadores, símbolos e fórmulas foram preservados. Terminologia PT consultada no syllabus PSTQB: scripts de teste (p.20/22/62), moderador/redator/líder (p.39), antecipação de erros (p.47) e carta de testes/checklists (p.48). O inglês técnico 4.0.1 prevalece sobre o português 4.0 para conteúdo técnico.

### Fase 5B — tl-002

FL-1.2.2, capítulo 1, K1; v2 → v3; chave **o1**, cardinalidade 1. Fonte primária: **ISTQB CTFL Syllabus v4.0.1, §1.2.2, PDF p.17**. Alterações: explicação geral EN/PT; o1.explanation EN/PT; o4 novo; data/report da revisão atualizados. LO/K/capítulo/tipo/tabela preservados.

Novo **o4 EN:** Reviewing the source code of the tax module

Novo **o4 PT-PT:** Rever o código-fonte do módulo fiscal

**Resolução e K-level — PASS:** letra D → o1. QA melhora o processo; executar, reportar e rever código avaliam produto. O nível é o mesmo da baseline; não se promoveu dificuldade pela extensão do texto.

**Contestação das incorretas:**

- **o2:** argumento possível — A execução automatizada é frequentemente chamada QA no uso corrente. Refutação — A execução avalia o produto.

- **o3:** argumento possível — O reporte pode fornecer dados usados para melhorar processos. Refutação — Isto reporta um problema do produto.

- **o4:** argumento possível — A revisão de código também é informalmente designada QA. Refutação — Uma revisão de código avalia um produto e encontra defeitos diretamente. Melhorar a forma de realizar as revisões é a atividade de QA orientada para o processo.

**EN/PT — PASS limitado à IA:** condições e consequências equivalentes; mesma chave/cardinalidade; valores e eventos verificados. A aprovação humana continua **PENDING**. A plausibilidade é julgamento editorial, ainda sem calibração empírica.

### Fase 5B — tl-003

FL-1.1.2, capítulo 1, K2; v3 → v4; chave **o1**, cardinalidade 1. Fonte primária: **ISTQB CTFL Syllabus v4.0.1, §1.1.2, PDF p.16**. Alterações: o1.text EN/PT; o4 novo; data/report da revisão atualizados. LO/K/capítulo/tipo/tabela preservados.

Novo **o4 EN:** Checking related payment flows for adverse effects of the fix

Novo **o4 PT-PT:** Verificar fluxos de pagamento relacionados para detetar efeitos adversos da correção

**Resolução e K-level — PASS:** letra C → o1. Diagnosticar e reparar o defeito é debugging; comparação de resultados, confirmação e regressão são teste. O nível é o mesmo da baseline; não se promoveu dificuldade pela extensão do texto.

**Contestação das incorretas:**

- **o2:** argumento possível — Comparar resultados pode ajudar uma investigação. Refutação — Comparar resultados durante a execução de teste é uma atividade de teste. A reprodução de uma falha existente também pode fazer parte do debugging, pelo que a reprodução, por si só, não distingue as atividades.

- **o3:** argumento possível — Confirmação faz parte do fluxo global de correção. Refutação — Executar um teste de confirmação verifica se a correção resolveu o problema original; localizar e remover o defeito pertence ao debugging.

- **o4:** argumento possível — Regressão procura problemas depois da correção. Refutação — Procurar efeitos adversos de uma alteração é teste de regressão. Diagnosticar e remover a causa da falha original é debugging.

**EN/PT — PASS limitado à IA:** condições e consequências equivalentes; mesma chave/cardinalidade; valores e eventos verificados. A aprovação humana continua **PENDING**. A plausibilidade é julgamento editorial, ainda sem calibração empírica.

### Fase 5B — tl-004

FL-1.2.3, capítulo 1, K2; v1 → v2; chave **o1**, cardinalidade 1. Fonte primária: **ISTQB CTFL Syllabus v4.0.1, §1.2.3, PDF p.17**. Alterações: explicação geral EN/PT; o1.explanation EN/PT; o2.text EN/PT; o4 novo; data/report da revisão atualizados. LO/K/capítulo/tipo/tabela preservados.

Novo **o4 EN:** A root cause in the development process

Novo **o4 PT-PT:** Uma causa raiz no processo de desenvolvimento

**Resolução e K-level — PASS:** letra D → o1. A fórmula é um produto defeituoso; erro é a interpretação humana, falha é a manifestação e causa de processo não é a fórmula. O nível é o mesmo da baseline; não se promoveu dificuldade pela extensão do texto.

**Contestação das incorretas:**

- **o2:** argumento possível — Erro pode ser usado coloquialmente para código errado. Refutação — A interpretação incorreta é o erro humano.

- **o3:** argumento possível — Uma fórmula errada pode originar um valor incorreto observado. Refutação — Uma falha é observada durante a execução.

- **o4:** argumento possível — Um defeito pode contribuir causalmente para uma falha. Refutação — Uma causa raiz é uma razão subjacente a um problema, como formação inadequada. A própria fórmula errada é o defeito no produto de trabalho, não essa causa subjacente do processo.

**EN/PT — PASS limitado à IA:** condições e consequências equivalentes; mesma chave/cardinalidade; valores e eventos verificados. A aprovação humana continua **PENDING**. A plausibilidade é julgamento editorial, ainda sem calibração empírica.

### Fase 5B — tl-005

FL-1.3.1, capítulo 1, K2; v1 → v2; chave **o1**, cardinalidade 1. Fonte primária: **ISTQB CTFL Syllabus v4.0.1, §1.3, PDF p.17/18**. Alterações: enunciado EN/PT; explicação geral EN/PT; o1.text EN/PT; o1.explanation EN/PT; o2.text EN/PT; o2.explanation EN/PT; o3.text EN/PT; o3.explanation EN/PT; o4 novo; data/report da revisão atualizados. LO/K/capítulo/tipo/tabela preservados.

Novo **o4 EN:** Vary the execution order of existing tests while keeping their data unchanged

Novo **o4 PT-PT:** Variar a ordem de execução dos testes existentes, mantendo os seus dados inalterados

**Resolução e K-level — PASS:** letra D → o1. Faltam cenários; frequência/ordem não criam essa cobertura e substituir toda a regressão perde proteção útil. O nível é o mesmo da baseline; não se promoveu dificuldade pela extensão do texto.

**Contestação das incorretas:**

- **o2:** argumento possível — Mais execuções podem descobrir falhas mais cedo. Refutação — Uma execução mais frequente pode detetar regressões mais cedo, mas não acrescenta cobertura dos cenários em falta.

- **o3:** argumento possível — Focar a falha mais recente parece eficiente. Refutação — Um novo teste focado é útil, mas substituir a bateria elimina cobertura de regressão útil para outros comportamentos.

- **o4:** argumento possível — Variar a ordem pode revelar dependências entre testes. Refutação — Mudar a ordem pode revelar dependências de ordem, mas, por si só, não cobre os novos cenários de falha. É necessário rever a bateria e os dados.

**EN/PT — PASS limitado à IA:** condições e consequências equivalentes; mesma chave/cardinalidade; valores e eventos verificados. A aprovação humana continua **PENDING**. A plausibilidade é julgamento editorial, ainda sem calibração empírica.

### Fase 5B — tl-006

FL-1.4.1, capítulo 1, K2; v2 → v3; chave **o1**, cardinalidade 1. Fonte primária: **ISTQB CTFL Syllabus v4.0.1, §1.4.1, PDF p.18/19**. Alterações: o4 novo; data/report da revisão atualizados. LO/K/capítulo/tipo/tabela preservados.

Novo **o4 EN:** Test design

Novo **o4 PT-PT:** Conceção de teste

**Resolução e K-level — PASS:** letra C → o1. Definir condições a partir da base de teste é análise, antes da conceção de casos. O nível é o mesmo da baseline; não se promoveu dificuldade pela extensão do texto.

**Contestação das incorretas:**

- **o2:** argumento possível — A conceção também consulta os requisitos. Refutação — A execução realiza testes e compara resultados.

- **o3:** argumento possível — Executar testes também produz informação sobre condições. Refutação — A conclusão consolida resultados e recursos.

- **o4:** argumento possível — A conclusão revê os resultados da análise. Refutação — A análise define o que testar através de condições de teste. A conceção desenvolve essas condições em casos de teste e determina como as testar.

**EN/PT — PASS limitado à IA:** condições e consequências equivalentes; mesma chave/cardinalidade; valores e eventos verificados. A aprovação humana continua **PENDING**. A plausibilidade é julgamento editorial, ainda sem calibração empírica.

### Fase 5B — tl-007

FL-1.4.4, capítulo 1, K2; v1 → v2; chave **o1**, cardinalidade 1. Fonte primária: **ISTQB CTFL Syllabus v4.0.1, §1.4.4, PDF p.20/21**. Alterações: o1.text EN/PT; o2.text EN/PT; o2.explanation EN/PT; o3.text EN/PT; o3.explanation EN/PT; o4 novo; data/report da revisão atualizados. LO/K/capítulo/tipo/tabela preservados.

Novo **o4 EN:** Treat a linked test as unaffected when its script has not been edited

Novo **o4 PT-PT:** Considerar um teste ligado como não afetado quando o seu script não foi editado

**Resolução e K-level — PASS:** letra A → o1. Uma relação identifica impacto, mas não executa testes nem reescreve o oráculo; ausência de diff no script não prova ausência de impacto. O nível é o mesmo da baseline; não se promoveu dificuldade pela extensão do texto.

**Contestação das incorretas:**

- **o2:** argumento possível — A ligação permite localizar resultados aprovados antigos. Refutação — Uma ligação regista uma relação, não um novo resultado de execução. É necessário avaliar o comportamento alterado e executar os testes relevantes.

- **o3:** argumento possível — A ligação identifica a origem do comportamento esperado. Refutação — A rastreabilidade aponta para o requisito afetado; o seu conteúdo atualizado, e não a existência da ligação, define o comportamento esperado.

- **o4:** argumento possível — Um script sem alterações parece manter a validade. Refutação — Uma alteração de requisito pode invalidar um teste ou o seu resultado esperado mesmo sem alterações no ficheiro do teste. As ligações apoiam essa análise de impacto.

**EN/PT — PASS limitado à IA:** condições e consequências equivalentes; mesma chave/cardinalidade; valores e eventos verificados. A aprovação humana continua **PENDING**. A plausibilidade é julgamento editorial, ainda sem calibração empírica.

### Fase 5B — tl-008

FL-1.5.3, capítulo 1, K2; v3 → v4; chave **o1**, cardinalidade 1. Fonte primária: **ISTQB CTFL Syllabus v4.0.1, §1.5.3, PDF p.22/23**. Alterações: enunciado EN/PT; o1.text EN/PT; o2.text EN/PT; o2.explanation EN/PT; o3.text EN/PT; o3.explanation EN/PT; o4 novo; data/report da revisão atualizados. LO/K/capítulo/tipo/tabela preservados.

Novo **o4 EN:** It reduces bias by avoiding discussions with the developers

Novo **o4 PT-PT:** Reduz o enviesamento ao evitar discussões com os programadores

**Resolução e K-level — PASS:** letra A → o1. Perspetivas e enviesamentos distintos permitem questionar pressupostos; não transferem responsabilidade nem legitimam isolamento ou falta de competências. O nível é o mesmo da baseline; não se promoveu dificuldade pela extensão do texto.

**Contestação das incorretas:**

- **o2:** argumento possível — Uma equipa independente pode assumir tarefas de avaliação. Refutação — A independência não transfere a responsabilidade pela qualidade. Os programadores e os outros membros da equipa continuam responsáveis pela qualidade.

- **o3:** argumento possível — Independência pode ser confundida com competência suficiente. Refutação — Os testadores independentes continuam a precisar de conhecimentos e competências relevantes. A independência oferece outra perspetiva, não substitui a competência.

- **o4:** argumento possível — Preparação individual pode limitar influência do autor. Refutação — Perspetivas diferentes podem questionar pressupostos mantendo a colaboração. O isolamento e os problemas de comunicação são desvantagens da independência, não o benefício pretendido.

**EN/PT — PASS limitado à IA:** condições e consequências equivalentes; mesma chave/cardinalidade; valores e eventos verificados. A aprovação humana continua **PENDING**. A plausibilidade é julgamento editorial, ainda sem calibração empírica.

### Fase 5B — tl-009

FL-2.1.2, capítulo 2, K1; v1 → v2; chave **o1**, cardinalidade 1. Fonte primária: **ISTQB CTFL Syllabus v4.0.1, §2.1.2, PDF p.25/26**. Alterações: o1.text EN/PT; o2.text EN/PT; o2.explanation EN/PT; o3.text EN/PT; o3.explanation EN/PT; o4 novo; data/report da revisão atualizados. LO/K/capítulo/tipo/tabela preservados.

Novo **o4 EN:** Replace reviews of development work products with later system-test execution

Novo **o4 PT-PT:** Substituir revisões de produtos de desenvolvimento pela execução posterior de testes de sistema

**Resolução e K-level — PASS:** letra B → o1. Análise acompanha desenvolvimento; esperar por código atrasa feedback, objetivos por nível diferem e revisão complementa execução. O nível é o mesmo da baseline; não se promoveu dificuldade pela extensão do texto.

**Contestação das incorretas:**

- **o2:** argumento possível — Esperar por código parece tornar análise mais concreta. Refutação — Esperar por código concluído atrasa uma análise que pode começar a partir de produtos de desenvolvimento, como os requisitos.

- **o3:** argumento possível — Um produto tem objetivos de qualidade comuns. Refutação — Os diferentes níveis de teste têm objetivos distintos; uma boa prática aplicável a vários ciclos de vida não torna os seus objetivos idênticos.

- **o4:** argumento possível — Testes de sistema também podem detetar defeitos que uma revisão perderia. Refutação — As revisões de versões preliminares apoiam a deteção precoce de defeitos e complementam os testes dinâmicos posteriores. O teste de sistema posterior não substitui essas atividades iniciais.

**EN/PT — PASS limitado à IA:** condições e consequências equivalentes; mesma chave/cardinalidade; valores e eventos verificados. A aprovação humana continua **PENDING**. A plausibilidade é julgamento editorial, ainda sem calibração empírica.

### Fase 5B — tl-010

FL-2.1.3, capítulo 2, K1; v2 → v3; chave **o1**, cardinalidade 1. Fonte primária: **ISTQB CTFL Syllabus v4.0.1, §2.1.3, PDF p.26**. Alterações: enunciado EN/PT; explicação geral EN/PT; o1.explanation EN/PT; o2.text EN/PT; o2.explanation EN/PT; o3.text EN/PT; o3.explanation EN/PT; o4 novo; data/report da revisão atualizados. LO/K/capítulo/tipo/tabela preservados.

Novo **o4 EN:** Continuous integration (CI)

Novo **o4 PT-PT:** Integração contínua (CI)

**Resolução e K-level — PASS:** letra D → o1. Teste-código-refatorização identifica TDD; ATDD aceita exemplos de negócio e BDD expressa comportamento; CI integra alterações. O nível é o mesmo da baseline; não se promoveu dificuldade pela extensão do texto.

**Contestação das incorretas:**

- **o2:** argumento possível — ATDD também define testes antes da implementação. Refutação — O ATDD deriva testes de aceitação em colaboração a partir de critérios de aceitação antes da implementação. O ciclo teste-código-refatorização especificado identifica o TDD.

- **o3:** argumento possível — BDD também é test-first. Refutação — O BDD expressa o comportamento pretendido em exemplos compreensíveis pelos stakeholders, frequentemente Dado/Quando/Então. Escrever testes primeiro é uma característica partilhada; o ciclo de teste de componente-código-refatorização é aqui a característica do TDD.

- **o4:** argumento possível — CI executa testes automaticamente e dá feedback rápido. Refutação — A CI integra alterações com frequência e pode executar testes automatizados. Não define o ciclo de programação orientada por testes e refatorização descrito.

**EN/PT — PASS limitado à IA:** condições e consequências equivalentes; mesma chave/cardinalidade; valores e eventos verificados. A aprovação humana continua **PENDING**. A plausibilidade é julgamento editorial, ainda sem calibração empírica.

### Fase 5B — tl-011

FL-2.2.3, capítulo 2, K2; v1 → v2; chave **o1**, cardinalidade 1. Fonte primária: **ISTQB CTFL Syllabus v4.0.1, §2.2.3, PDF p.30/31**. Alterações: o3.text EN/PT; o3.explanation EN/PT; o4 novo; data/report da revisão atualizados. LO/K/capítulo/tipo/tabela preservados.

Novo **o4 EN:** Both are regression testing

Novo **o4 PT-PT:** Ambos são testes de regressão

**Resolução e K-level — PASS:** letra B → o1. A primeira execução verifica a correção do defeito original; a segunda procura efeitos adversos noutras áreas. O nível é o mesmo da baseline; não se promoveu dificuldade pela extensão do texto.

**Contestação das incorretas:**

- **o2:** argumento possível — Os termos são frequentemente invertidos. Refutação — A ordem está invertida.

- **o3:** argumento possível — Ambas as verificações se seguem à mesma correção. Refutação — A confirmação verifica se o defeito original foi corrigido. Verificar outros fluxos de pagamento para detetar efeitos adversos da alteração é teste de regressão.

- **o4:** argumento possível — Ambas reutilizam testes depois de uma alteração. Refutação — A primeira verificação confirma especificamente a correção ao repetir o teste que falhava. A segunda procura efeitos adversos noutras áreas.

**EN/PT — PASS limitado à IA:** condições e consequências equivalentes; mesma chave/cardinalidade; valores e eventos verificados. A aprovação humana continua **PENDING**. A plausibilidade é julgamento editorial, ainda sem calibração empírica.

### Fase 5B — tl-012

FL-2.2.1, capítulo 2, K2; v2 → v3; chave **o1**, cardinalidade 1. Fonte primária: **ISTQB CTFL Syllabus v4.0.1, §2.2.1, PDF p.28/29**. Alterações: o4 novo; data/report da revisão atualizados. LO/K/capítulo/tipo/tabela preservados.

Novo **o4 EN:** Component testing in isolation

Novo **o4 PT-PT:** Teste de componente isolado

**Resolução e K-level — PASS:** letra D → o1. A interface entre dois componentes da mesma aplicação é integração de componentes, não componente isolado, sistema externo ou aceitação. O nível é o mesmo da baseline; não se promoveu dificuldade pela extensão do texto.

**Contestação das incorretas:**

- **o2:** argumento possível — Os dois módulos são componentes. Refutação — A aceitação centra-se nas necessidades de negócio e na prontidão.

- **o3:** argumento possível — O fluxo tem significado de negócio. Refutação — O âmbito descrito não inclui um sistema externo.

- **o4:** argumento possível — Integração pode ser entendida como integração de sistemas em sentido amplo. Refutação — Um teste de componente isolado centra-se num módulo individual. O âmbito indicado é a interface e a interação entre dois módulos internos.

**EN/PT — PASS limitado à IA:** condições e consequências equivalentes; mesma chave/cardinalidade; valores e eventos verificados. A aprovação humana continua **PENDING**. A plausibilidade é julgamento editorial, ainda sem calibração empírica.

### Fase 5B — tl-013

FL-2.1.5, capítulo 2, K2; v1 → v2; chave **o1**, cardinalidade 1. Fonte primária: **ISTQB CTFL Syllabus v4.0.1, §2.1.5, PDF p.27**. Alterações: o2.text EN/PT; o2.explanation EN/PT; o3.text EN/PT; o3.explanation EN/PT; o4 novo; data/report da revisão atualizados. LO/K/capítulo/tipo/tabela preservados.

Novo **o4 EN:** Test completion

Novo **o4 PT-PT:** Conclusão do teste

**Resolução e K-level — PASS:** letra B → o1. Rever critérios antes de programar antecipa feedback; não é execução, regressão ou conclusão. O nível é o mesmo da baseline; não se promoveu dificuldade pela extensão do texto.

**Contestação das incorretas:**

- **o2:** argumento possível — A revisão é uma atividade do processo de teste. Refutação — A execução de teste executa o objeto de teste e compara os resultados obtidos e esperados. Rever critérios antes da implementação é uma atividade estática antecipada que ilustra shift left.

- **o3:** argumento possível — Rever critérios pode apoiar testes após mudanças. Refutação — O teste de regressão procura efeitos adversos de alterações. A finalidade descrita é obter feedback mais cedo sobre critérios de aceitação, não verificar efeitos de uma alteração.

- **o4:** argumento possível — Critérios também são revistos ao decidir a conclusão. Refutação — A conclusão consolida resultados e recursos de teste após as atividades de teste. Rever critérios antes da programação antecipa a avaliação no ciclo de vida.

**EN/PT — PASS limitado à IA:** condições e consequências equivalentes; mesma chave/cardinalidade; valores e eventos verificados. A aprovação humana continua **PENDING**. A plausibilidade é julgamento editorial, ainda sem calibração empírica.

### Fase 5B — tl-014

FL-2.3.1, capítulo 2, K2; v1 → v2; chave **o1**, cardinalidade 1. Fonte primária: **ISTQB CTFL Syllabus v4.0.1, §2.3, PDF p.31**. Alterações: o1.text EN/PT; o2.text EN/PT; o2.explanation EN/PT; o3.text EN/PT; o3.explanation EN/PT; o4 novo; data/report da revisão atualizados. LO/K/capítulo/tipo/tabela preservados.

Novo **o4 EN:** Data-migration checks replace regression checks of the service behavior

Novo **o4 PT-PT:** As verificações da migração de dados substituem as verificações de regressão do comportamento do serviço

**Resolução e K-level — PASS:** letra A → o1. Mudar o motor pode alterar dados e comportamento; resultados antigos ou verificação de dados isolada não cobrem o novo ambiente. O nível é o mesmo da baseline; não se promoveu dificuldade pela extensão do texto.

**Contestação das incorretas:**

- **o2:** argumento possível — As funcionalidades requeridas não mudaram. Refutação — Requisitos funcionais inalterados não demonstram que a aplicação se comporta corretamente com outro motor de base de dados. A migração pode introduzir regressões.

- **o3:** argumento possível — O código da aplicação pode continuar igual. Refutação — Os testes de manutenção podem ser desencadeados por atualizações ou migrações do ambiente, não apenas por alterações ao código-fonte.

- **o4:** argumento possível — Uma migração parece dizer respeito apenas aos dados. Refutação — A correção dos dados é importante, mas o novo motor também pode afetar o comportamento existente da aplicação. Os testes de manutenção incluem avaliar a alteração e possíveis regressões.

**EN/PT — PASS limitado à IA:** condições e consequências equivalentes; mesma chave/cardinalidade; valores e eventos verificados. A aprovação humana continua **PENDING**. A plausibilidade é julgamento editorial, ainda sem calibração empírica.

### Fase 5B — tl-015

FL-3.1.1, capítulo 3, K1; v1 → v2; chave **o1**, cardinalidade 1. Fonte primária: **ISTQB CTFL Syllabus v4.0.1, §3.1.1, PDF p.33**. Alterações: enunciado EN/PT; o1.text EN/PT; o2.text EN/PT; o2.explanation EN/PT; o3.text EN/PT; o3.explanation EN/PT; o4 novo; data/report da revisão atualizados. LO/K/capítulo/tipo/tabela preservados.

Novo **o4 EN:** The observed checkout behavior after selecting Pay

Novo **o4 PT-PT:** O comportamento da compra observado após selecionar Pagar

**Resolução e K-level — PASS:** letra B → o1. O documento tem conteúdo legível diretamente; as outras opções pedem observação da aplicação em execução. O nível é o mesmo da baseline; não se promoveu dificuldade pela extensão do texto.

**Contestação das incorretas:**

- **o2:** argumento possível — Um relatório posterior poderia conter medições de latência. Refutação — Medir a latência de resposta exige execução em condições definidas; é uma avaliação dinâmica, não a inspeção de um documento.

- **o3:** argumento possível — Um relatório de memória poderia ser revisto estaticamente. Refutação — O crescimento da memória durante um teste de carga é observado com a aplicação em execução. Rever posteriormente um relatório escrito seria uma atividade diferente, estática.

- **o4:** argumento possível — A especificação do comportamento também poderia ser revista. Refutação — Observar o comportamento após uma ação exige executar a aplicação. Um requisito que descreva esse comportamento pode, em alternativa, ser revisto estaticamente.

**EN/PT — PASS limitado à IA:** condições e consequências equivalentes; mesma chave/cardinalidade; valores e eventos verificados. A aprovação humana continua **PENDING**. A plausibilidade é julgamento editorial, ainda sem calibração empírica.

### Fase 5B — tl-016

FL-3.2.3, capítulo 3, K1; v2 → v3; chave **o1**, cardinalidade 1. Fonte primária: **ISTQB CTFL Syllabus v4.0.1, §3.2.3, PDF p.36**. Alterações: explicação geral EN/PT; o1.explanation EN/PT; o4 novo; data/report da revisão atualizados. LO/K/capítulo/tipo/tabela preservados.

Novo **o4 EN:** The review leader

Novo **o4 PT-PT:** O líder de revisão

**Resolução e K-level — PASS:** letra D → o1. O moderador gere mediação/tempo/participação; líder organiza a revisão, redator regista e gestor disponibiliza recursos. O nível é o mesmo da baseline; não se promoveu dificuldade pela extensão do texto.

**Contestação das incorretas:**

- **o2:** argumento possível — O redator participa na reunião e pode tomar a palavra. Refutação — O redator regista anomalias e decisões da revisão; facilitar a reunião não é esta responsabilidade.

- **o3:** argumento possível — O gestor disponibiliza tempo e pessoas. Refutação — O gestor disponibiliza recursos e decide o que será revisto; o moderador facilita a reunião.

- **o4:** argumento possível — O líder de revisão organiza o evento. Refutação — O líder de revisão tem responsabilidade global e organiza participantes, data e local. O moderador é especificamente responsável pela facilitação eficaz da reunião.

**EN/PT — PASS limitado à IA:** condições e consequências equivalentes; mesma chave/cardinalidade; valores e eventos verificados. A aprovação humana continua **PENDING**. A plausibilidade é julgamento editorial, ainda sem calibração empírica.

### Fase 5B — tl-017

FL-3.1.3, capítulo 3, K2; v1 → v2; chave **o1**, cardinalidade 1. Fonte primária: **ISTQB CTFL Syllabus v4.0.1, §3.1.3, PDF p.34**. Alterações: o2.text EN/PT; o2.explanation EN/PT; o3.text EN/PT; o3.explanation EN/PT; o4 novo; data/report da revisão atualizados. LO/K/capítulo/tipo/tabela preservados.

Novo **o4 EN:** Both directly found code defects because each result identifies the faulty statement

Novo **o4 PT-PT:** Ambos encontraram diretamente defeitos no código porque cada resultado identifica a instrução incorreta

**Resolução e K-level — PASS:** letra A → o1. Contradição documental é defeito direto; data exibida errada é falha e não localiza por si a causa no código. O nível é o mesmo da baseline; não se promoveu dificuldade pela extensão do texto.

**Contestação das incorretas:**

- **o2:** argumento possível — Uma revisão também encontra resultados contrários à expectativa. Refutação — Os mecanismos estão invertidos: a revisão do documento encontra diretamente a inconsistência, enquanto a data incorreta apresentada é uma falha observada que exige análise adicional para localizar a causa.

- **o3:** argumento possível — Ambas as observações indicam problemas. Refutação — Uma falha é um desvio observado durante a execução. Requisitos escritos contraditórios são defeitos encontrados sem executar a aplicação.

- **o4:** argumento possível — Uma falha pode dar pistas sobre a causa no código. Refutação — A revisão encontrou um defeito nos requisitos, não uma instrução de código. A falha apresentada, por si só, não identifica a instrução de código que a causou.

**EN/PT — PASS limitado à IA:** condições e consequências equivalentes; mesma chave/cardinalidade; valores e eventos verificados. A aprovação humana continua **PENDING**. A plausibilidade é julgamento editorial, ainda sem calibração empírica.

### Fase 5B — tl-018

FL-3.2.4, capítulo 3, K2; v2 → v3; chave **o1**, cardinalidade 1. Fonte primária: **ISTQB CTFL Syllabus v4.0.1, §3.2.4, PDF p.36/37**. Alterações: explicação geral EN/PT; o1.explanation EN/PT; o4 novo; data/report da revisão atualizados. LO/K/capítulo/tipo/tabela preservados.

Novo **o4 EN:** Informal review

Novo **o4 PT-PT:** Revisão informal

**Resolução e K-level — PASS:** letra C → o1. Inspeção é o tipo mais formal, com processo completo e métricas; não se presume que outros tipos nunca tenham métricas. O nível é o mesmo da baseline; não se promoveu dificuldade pela extensão do texto.

**Contestação das incorretas:**

- **o2:** argumento possível — A revisão técnica também tem moderador e pode recolher métricas. Refutação — Uma revisão técnica envolve revisores tecnicamente qualificados e um moderador, mas a inspeção é o tipo mais formal descrito.

- **o3:** argumento possível — Um walkthrough também pode ter preparação e relatório. Refutação — Um walkthrough é conduzido pelo autor e não exige todo o processo de inspeção nem as suas métricas.

- **o4:** argumento possível — Uma revisão informal pode detetar os mesmos defeitos. Refutação — Uma revisão informal não exige o processo completo definido e as métricas recolhidas característicos de uma inspeção. Outros tipos podem recolher métricas, mas a inspeção é o tipo CTFL mais formal.

**EN/PT — PASS limitado à IA:** condições e consequências equivalentes; mesma chave/cardinalidade; valores e eventos verificados. A aprovação humana continua **PENDING**. A plausibilidade é julgamento editorial, ainda sem calibração empírica.

### Fase 5B — tl-019

FL-4.1.1, capítulo 4, K2; v1 → v2; chave **o1**, cardinalidade 1. Fonte primária: **ISTQB CTFL Syllabus v4.0.1, §4.1, PDF p.39**. Alterações: o3.text EN/PT; o3.explanation EN/PT; o4 novo; data/report da revisão atualizados. LO/K/capítulo/tipo/tabela preservados.

Novo **o4 EN:** Risk-based testing

Novo **o4 PT-PT:** Teste baseado no risco

**Resolução e K-level — PASS:** letra D → o1. O comportamento especificado é base de caixa-preta; risco orienta esforço/prioridade, não define uma quarta família por base de derivação. O nível é o mesmo da baseline; não se promoveu dificuldade pela extensão do texto.

**Contestação das incorretas:**

- **o2:** argumento possível — Caixa-branca pode verificar o mesmo comportamento. Refutação — As técnicas de caixa-branca usam a estrutura interna.

- **o3:** argumento possível — Experiência pode ajudar a interpretar requisitos. Refutação — As técnicas baseadas na experiência derivam testes dos conhecimentos e da experiência do testador. A base de derivação indicada é o comportamento especificado externamente, o que identifica técnicas de caixa-preta.

- **o4:** argumento possível — Riscos podem orientar quais os requisitos testados primeiro. Refutação — O teste baseado no risco orienta o âmbito, a profundidade e a prioridade usando os riscos avaliados. Não é a família de técnicas CTFL identificada pela derivação de testes do comportamento especificado sem usar a estrutura do código.

**EN/PT — PASS limitado à IA:** condições e consequências equivalentes; mesma chave/cardinalidade; valores e eventos verificados. A aprovação humana continua **PENDING**. A plausibilidade é julgamento editorial, ainda sem calibração empírica.

### Fase 5B — tl-020

FL-4.3.1, capítulo 4, K2; v1 → v2; chave **o1**, cardinalidade 1. Fonte primária: **ISTQB CTFL Syllabus v4.0.1, §4.3.1, PDF p.42**. Alterações: o2.text EN/PT; o2.explanation EN/PT; o3.text EN/PT; o3.explanation EN/PT; o4 novo; data/report da revisão atualizados. LO/K/capítulo/tipo/tabela preservados.

Novo **o4 EN:** It establishes the functional correctness of the executed statements

Novo **o4 PT-PT:** Estabelece a correção funcional das instruções executadas

**Resolução e K-level — PASS:** letra D → o1. Executar todas as instruções prova cobertura de instruções, não resultados de decisão, caminhos nem correção funcional. O nível é o mesmo da baseline; não se promoveu dificuldade pela extensão do texto.

**Contestação das incorretas:**

- **o2:** argumento possível — Todas as instruções executadas parecem cobrir decisões. Refutação — Executar todas as instruções não demonstra que ambos os resultados de cada decisão foram exercitados. A cobertura de ramos engloba a de instruções, não o inverso.

- **o3:** argumento possível — Cada caminho é formado por instruções executáveis. Refutação — A cobertura de instruções não demonstra cobertura de todas as sequências de resultados de decisão. Um caminho viável pode ficar por testar mesmo com todas as instruções executadas.

- **o4:** argumento possível — Executar código pode revelar defeitos funcionais. Refutação — A cobertura regista execução, não correção. As instruções executadas podem continuar a conter defeitos ou produzir resultados que não foram adequadamente verificados.

**EN/PT — PASS limitado à IA:** condições e consequências equivalentes; mesma chave/cardinalidade; valores e eventos verificados. A aprovação humana continua **PENDING**. A plausibilidade é julgamento editorial, ainda sem calibração empírica.

### Fase 5B — tl-021

FL-4.3.2, capítulo 4, K2; v1 → v2; chave **o1**, cardinalidade 1. Fonte primária: **ISTQB CTFL Syllabus v4.0.1, §4.3.2, PDF p.43**. Alterações: o4 novo; data/report da revisão atualizados. LO/K/capítulo/tipo/tabela preservados.

Novo **o4 EN:** 25%

Novo **o4 PT-PT:** 25%

**Resolução e K-level — PASS:** letra C → o1. Numerador um ramo, denominador dois: 1/2=50%; não contar decisões completas ou duplicar o denominador. O nível é o mesmo da baseline; não se promoveu dificuldade pela extensão do texto.

**Contestação das incorretas:**

- **o2:** argumento possível — A decisão foi executada uma vez. Refutação — Falta o ramo falso.

- **o3:** argumento possível — A decisão não teve ambos os resultados exercitados. Refutação — Um ramo foi executado.

- **o4:** argumento possível — Alguém pode contar dois ramos e mais dois resultados como quatro itens. Refutação — O âmbito indicado contém dois ramos. Dividir o ramo exercitado por quatro duplica o denominador; a fração correta é 1/2, ou 50%.

**EN/PT — PASS limitado à IA:** condições e consequências equivalentes; mesma chave/cardinalidade; valores e eventos verificados. A aprovação humana continua **PENDING**. A plausibilidade é julgamento editorial, ainda sem calibração empírica.

### Fase 5B — tl-022

FL-4.4.1, capítulo 4, K2; v2 → v3; chave **o1**, cardinalidade 1. Fonte primária: **ISTQB CTFL Syllabus v4.0.1, §4.4.1, PDF p.43/44**. Alterações: enunciado EN/PT; o3.text EN/PT; o3.explanation EN/PT; o4 novo; data/report da revisão atualizados. LO/K/capítulo/tipo/tabela preservados.

Novo **o4 EN:** Boundary value analysis

Novo **o4 PT-PT:** Análise de valor fronteira

**Resolução e K-level — PASS:** letra A → o1. A base declarada é conhecimento de falhas anteriores, não cobertura estrutural/fronteiras nem o ciclo simultâneo da exploração. O nível é o mesmo da baseline; não se promoveu dificuldade pela extensão do texto.

**Contestação das incorretas:**

- **o2:** argumento possível — A execução das datas pode cobrir instruções. Refutação — Não é indicado um critério de cobertura do código.

- **o3:** argumento possível — Exploração também usa experiência do testador. Refutação — O teste exploratório combina aprendizagem, conceção e execução de testes. A base de seleção descrita é o conhecimento de falhas anteriores, o que ilustra especificamente a antecipação de erros; as técnicas podem ser combinadas na prática.

- **o4:** argumento possível — Datas de fronteira podem estar relacionadas com falhas bissextas. Refutação — A BVA deriva casos das fronteiras de partições ordenadas. O cenário fornece conhecimento de falhas anteriores como base, não fronteiras de partições das quais tenham sido derivados estes casos.

**EN/PT — PASS limitado à IA:** condições e consequências equivalentes; mesma chave/cardinalidade; valores e eventos verificados. A aprovação humana continua **PENDING**. A plausibilidade é julgamento editorial, ainda sem calibração empírica.

### Fase 5B — tl-023

FL-4.4.2, capítulo 4, K2; v3 → v4; chave **o1**, cardinalidade 1. Fonte primária: **ISTQB CTFL Syllabus v4.0.1, §4.4.2, PDF p.44**. Alterações: enunciado EN/PT; o1.text EN/PT; o2.text EN/PT; o2.explanation EN/PT; o3.text EN/PT; o3.explanation EN/PT; o4 novo; data/report da revisão atualizados. LO/K/capítulo/tipo/tabela preservados.

Novo **o4 EN:** Checklist-based testing

Novo **o4 PT-PT:** Teste baseado em checklists

**Resolução e K-level — PASS:** letra C → o1. O conjunto aprender-conceber-executar caracteriza exploração; erros e checklists podem apoiar mas não definem essas atividades combinadas. O nível é o mesmo da baseline; não se promoveu dificuldade pela extensão do texto.

**Contestação das incorretas:**

- **o2:** argumento possível — Scripts também podem ser executados numa sessão com duração definida. Refutação — O testador concebe e adapta testes enquanto aprende. Uma repetição fixa não explica essa aprendizagem, conceção e execução em simultâneo.

- **o3:** argumento possível — Antecipação de erros pode guiar a exploração. Refutação — A antecipação de erros seleciona alvos prováveis de defeitos usando a experiência de erros e falhas. Aqui, o comportamento distintivo é a aprendizagem, a conceção e a execução simultâneas orientadas por uma carta de testes; a antecipação de erros pode apoiar, mas não substitui, essa abordagem exploratória.

- **o4:** argumento possível — Uma checklist também pode apoiar uma sessão exploratória. Refutação — O teste baseado em checklists deriva testes de uma lista de condições de teste. Uma carta de testes define objetivos da sessão; o cenário descreve descobrir e adaptar testes durante a sessão, não derivá-los de entradas de uma checklist.

**EN/PT — PASS limitado à IA:** condições e consequências equivalentes; mesma chave/cardinalidade; valores e eventos verificados. A aprovação humana continua **PENDING**. A plausibilidade é julgamento editorial, ainda sem calibração empírica.

### Fase 5B — tl-024

FL-4.5.2, capítulo 4, K2; v2 → v3; chave **o1**, cardinalidade 1. Fonte primária: **ISTQB CTFL Syllabus v4.0.1, §4.5.2, PDF p.45/46**. Alterações: enunciado EN/PT; o4 novo; data/report da revisão atualizados. LO/K/capítulo/tipo/tabela preservados.

Novo **o4 EN:** When the basket opens, calculate its total by calling the pricing service

Novo **o4 PT-PT:** Quando o cesto é aberto, calcular o total através de uma chamada ao serviço de preços

**Resolução e K-level — PASS:** letra C → o1. O exemplo do cesto vazio explicita contexto, evento e resultado; regras omitem evento e o comando de implementação omite estado/oráculo. O nível é o mesmo da baseline; não se promoveu dificuldade pela extensão do texto.

**Contestação das incorretas:**

- **o2:** argumento possível — Uma regra formal é um critério de aceitação válido. Refutação — Este é um critério orientado para regras, não um cenário Dado/Quando/Então.

- **o3:** argumento possível — A regra do cesto vazio exprime o mesmo resultado esperado. Refutação — Isto apresenta uma regra sem a estrutura explícita de contexto, evento e resultado.

- **o4:** argumento possível — A chamada ao serviço descreve uma ação durante a abertura. Refutação — Isto descreve uma ação de implementação, mas omite o estado inicial do cesto e o total esperado observável. Não é um exemplo de aceitação completo no formato solicitado.

**EN/PT — PASS limitado à IA:** condições e consequências equivalentes; mesma chave/cardinalidade; valores e eventos verificados. A aprovação humana continua **PENDING**. A plausibilidade é julgamento editorial, ainda sem calibração empírica.

### Fase 5B — tl-025

FL-4.2.1, capítulo 4, K3; v1 → v2; chave **o1**, cardinalidade 1. Fonte primária: **ISTQB CTFL Syllabus v4.0.1, §4.2.1, PDF p.39/40**. Alterações: o4 novo; data/report da revisão atualizados. LO/K/capítulo/tipo/tabela preservados.

Novo **o4 EN:** 2, 3, 5

Novo **o4 PT-PT:** 2, 3, 5

**Resolução e K-level — PASS:** letra C → o1. Partições <3, [3,8], >8: 2,5,9 cobre três; restantes omitem válida, superior ou ambas inválidas. O nível é o mesmo da baseline; não se promoveu dificuldade pela extensão do texto.

**Contestação das incorretas:**

- **o2:** argumento possível — Valores nos dois limites válidos parecem diversificados. Refutação — Os três valores estão na partição válida.

- **o3:** argumento possível — As duas partições inválidas são cobertas. Refutação — A partição válida não está coberta.

- **o4:** argumento possível — Há três valores distintos no conjunto. Refutação — 2 cobre a partição abaixo do intervalo; 3 e 5 cobrem ambos a partição válida. Nenhum valor cobre a partição acima do intervalo, pelo que o conjunto de três valores é insuficiente.

**EN/PT — PASS limitado à IA:** condições e consequências equivalentes; mesma chave/cardinalidade; valores e eventos verificados. A aprovação humana continua **PENDING**. A plausibilidade é julgamento editorial, ainda sem calibração empírica.

### Fase 5B — tl-026

FL-4.2.2, capítulo 4, K3; v2 → v3; chave **o1**, cardinalidade 1. Fonte primária: **ISTQB CTFL Syllabus v4.0.1, §4.2.2, PDF p.40**. Alterações: o3.text EN/PT; o3.explanation EN/PT; o4 novo; data/report da revisão atualizados. LO/K/capítulo/tipo/tabela preservados.

Novo **o4 EN:** 10, 11, 20, 21

Novo **o4 PT-PT:** 10, 11, 20, 21

**Resolução e K-level — PASS:** letra D → o1. Pares de fronteira 9/10 e 20/21: os outros conjuntos omitem 9 ou 21 ou ambos. O nível é o mesmo da baseline; não se promoveu dificuldade pela extensão do texto.

**Contestação das incorretas:**

- **o2:** argumento possível — Testar mínimo, meio e máximo cobre a partição válida. Refutação — Faltam os valores inválidos vizinhos.

- **o3:** argumento possível — O limite superior pode ser confundido com exclusivo. Refutação — Isto trata incorretamente 19/20 como o par de fronteira superior. Como 20 é válido, o par superior tem de ser 20/21; falta 21.

- **o4:** argumento possível — O limite inferior pode ser confundido com exclusivo. Refutação — Isto trata incorretamente 10/11 como o par de fronteira inferior. Como 10 é válido, o par inferior tem de ser 9/10; falta 9.

**EN/PT — PASS limitado à IA:** condições e consequências equivalentes; mesma chave/cardinalidade; valores e eventos verificados. A aprovação humana continua **PENDING**. A plausibilidade é julgamento editorial, ainda sem calibração empírica.

### Fase 5B — tl-027

FL-4.2.3, capítulo 4, K3; v2 → v3; chave **o1**, cardinalidade 1. Fonte primária: **ISTQB CTFL Syllabus v4.0.1, §4.2.3, PDF p.41**. Alterações: o2.explanation EN/PT; o3.explanation EN/PT; o4 novo; data/report da revisão atualizados. LO/K/capítulo/tipo/tabela preservados.

Novo **o4 EN:** Member = no; total = 20

Novo **o4 PT-PT:** Membro = não; total = 20

**Resolução e K-level — PASS:** letra D → o1. R1=T,T: membro sim e 60≥50; outras opções representam R2, R3, R4. O nível é o mesmo da baseline; não se promoveu dificuldade pela extensão do texto.

**Contestação das incorretas:**

- **o2:** argumento possível — O total é suficientemente elevado. Refutação — Um não membro com total 60 satisfaz apenas a condição do total, o que corresponde a R3, não a R1.

- **o3:** argumento possível — O cliente é membro. Refutação — Um membro com total 20 satisfaz apenas a condição de ser membro, o que corresponde a R2, não a R1.

- **o4:** argumento possível — A combinação de duas condições falsas é uma regra válida da tabela. Refutação — Estas entradas não satisfazem nenhuma das condições e exercitam R4, não R1. R1 exige que o cliente seja membro e que o total seja pelo menos 50.

**EN/PT — PASS limitado à IA:** condições e consequências equivalentes; mesma chave/cardinalidade; valores e eventos verificados. A aprovação humana continua **PENDING**. A plausibilidade é julgamento editorial, ainda sem calibração empírica.

### Fase 5B — tl-028

FL-4.2.4, capítulo 4, K3; v2 → v3; chave **o1**, cardinalidade 1. Fonte primária: **ISTQB CTFL Syllabus v4.0.1, §4.2.4, PDF p.41/42**. Alterações: o4 novo; data/report da revisão atualizados. LO/K/capítulo/tipo/tabela preservados.

Novo **o4 EN:** Submit, Pay, Pay

Novo **o4 PT-PT:** Submeter, Pagar, Pagar

**Resolução e K-level — PASS:** letra A → o1. Rascunho --Submeter--> Pendente --Pagar--> Paga. Qualquer evento inválido invalida a sequência; Pagar adicional não é ignorado. O nível é o mesmo da baseline; não se promoveu dificuldade pela extensão do texto.

**Contestação das incorretas:**

- **o2:** argumento possível — Os dois eventos corretos aparecem no conjunto. Refutação — Pagar é inicialmente inválido.

- **o3:** argumento possível — Submeter duas vezes pode parecer uma operação repetível. Refutação — O segundo Submeter é inválido em Pendente e a encomenda nunca chega a Paga.

- **o4:** argumento possível — O estado pretendido é atingido antes do último evento. Refutação — Submeter e Pagar levam a Paga, mas o Pagar adicional é inválido em Paga. Chegar ao destino antes de um evento inválido não torna válida a sequência completa.

**EN/PT — PASS limitado à IA:** condições e consequências equivalentes; mesma chave/cardinalidade; valores e eventos verificados. A aprovação humana continua **PENDING**. A plausibilidade é julgamento editorial, ainda sem calibração empírica.

### Fase 5B — tl-029

FL-4.5.3, capítulo 4, K3; v2 → v3; chave **o1**, cardinalidade 1. Fonte primária: **ISTQB CTFL Syllabus v4.0.1, §4.5.3, PDF p.46**. Alterações: o4 novo; data/report da revisão atualizados. LO/K/capítulo/tipo/tabela preservados.

Novo **o4 EN:** Given total 49, when delivery is priced, then charge 0; given total 50, when delivery is priced, then charge 5.

Novo **o4 PT-PT:** Dado um total de 49, quando se calcula a entrega, então cobrar 0; dado um total de 50, quando se calcula a entrega, então cobrar 5.

**Resolução e K-level — PASS:** letra C → o1. Regra do negócio exige 49→5, 50→0. As outras três combinações trocam um ou os dois resultados. O nível é o mesmo da baseline; não se promoveu dificuldade pela extensão do texto.

**Contestação das incorretas:**

- **o2:** argumento possível — No limite superior o resultado está correto. Refutação — O resultado esperado para 49 contradiz o custo aplicável abaixo do limiar.

- **o3:** argumento possível — Abaixo do limite o resultado está correto. Refutação — O resultado esperado para 50 exclui incorretamente o limiar inclusivo.

- **o4:** argumento possível — Um candidato pode inverter a regra comercial inteira. Refutação — Ambos os resultados esperados estão invertidos: 49 é inferior a 50 e implica um custo de 5; o limiar inclusivo torna a entrega gratuita em 50.

**EN/PT — PASS limitado à IA:** condições e consequências equivalentes; mesma chave/cardinalidade; valores e eventos verificados. A aprovação humana continua **PENDING**. A plausibilidade é julgamento editorial, ainda sem calibração empírica.

### Fase 5B — tl-030

FL-5.1.6, capítulo 5, K1; v1 → v2; chave **o1**, cardinalidade 1. Fonte primária: **ISTQB CTFL Syllabus v4.0.1, §5.1.6, PDF p.50/51**. Alterações: o2.text EN/PT; o2.explanation EN/PT; o3.text EN/PT; o3.explanation EN/PT; o4 novo; data/report da revisão atualizados. LO/K/capítulo/tipo/tabela preservados.

Novo **o4 EN:** Many integration tests, fewer component and end-to-end tests

Novo **o4 PT-PT:** Muitos testes de integração, menos testes de componente e de ponta a ponta

**Resolução e K-level — PASS:** letra B → o1. Base larga de testes pequenos e poucos grandes; distribuição uniforme, invertida ou centrada na integração não é a pirâmide descrita. O nível é o mesmo da baseline; não se promoveu dificuldade pela extensão do texto.

**Contestação das incorretas:**

- **o2:** argumento possível — Testes de ponta a ponta parecem mais próximos da utilização real. Refutação — Isto inverte a pirâmide. Os testes grandes de ponta a ponta exigem geralmente mais tempo e dão feedback menos localizado do que os testes pequenos e isolados.

- **o3:** argumento possível — Equilibrar contagens parece dar atenção igual a cada nível. Refutação — Uma pirâmide representa proporções diferentes de acordo com a granularidade, o isolamento e o custo de execução, não contagens iguais entre níveis.

- **o4:** argumento possível — Uma arquitetura pode legitimamente adotar mais testes de integração. Refutação — Uma concentração no meio corresponde a uma distribuição diferente. A pirâmide tem geralmente uma base larga de testes pequenos e isolados e menos testes maiores nos níveis superiores.

**EN/PT — PASS limitado à IA:** condições e consequências equivalentes; mesma chave/cardinalidade; valores e eventos verificados. A aprovação humana continua **PENDING**. A plausibilidade é julgamento editorial, ainda sem calibração empírica.

### Fase 5B — tl-031

FL-5.1.1, capítulo 5, K2; v2 → v3; chave **o1**, cardinalidade 1. Fonte primária: **ISTQB CTFL Syllabus v4.0.1, §5.1.1, PDF p.48**. Alterações: enunciado EN/PT; explicação geral EN/PT; o1.text EN/PT; o1.explanation EN/PT; o2.text EN/PT; o2.explanation EN/PT; o3.text EN/PT; o3.explanation EN/PT; o4 novo; data/report da revisão atualizados. LO/K/capítulo/tipo/tabela preservados.

Novo **o4 EN:** Test completion report

Novo **o4 PT-PT:** Relatório de conclusão do teste

**Resolução e K-level — PASS:** letra A → o1. O plano reúne âmbito, recursos, objetivos e abordagem do projeto; política, cronograma e conclusão têm finalidades mais restritas/diferentes. O nível é o mesmo da baseline; não se promoveu dificuldade pela extensão do texto.

**Contestação das incorretas:**

- **o2:** argumento possível — A política contém orientação para os testes. Refutação — Uma política fornece orientação organizacional. O plano de testes do projeto comunica o âmbito, os recursos e a abordagem específicos deste esforço de teste.

- **o3:** argumento possível — O cronograma inclui ordem e recursos de execução. Refutação — Um cronograma de execução organiza execuções e dependências. Não reúne os objetivos, o âmbito, os recursos e a abordagem de teste do projeto como um plano de testes.

- **o4:** argumento possível — O relatório de conclusão comunica informação aos stakeholders. Refutação — Um relatório de conclusão resume os resultados dos testes concluídos. Não é o documento de planeamento usado para acordar como serão organizados os testes do projeto.

**EN/PT — PASS limitado à IA:** condições e consequências equivalentes; mesma chave/cardinalidade; valores e eventos verificados. A aprovação humana continua **PENDING**. A plausibilidade é julgamento editorial, ainda sem calibração empírica.

### Fase 5B — tl-032

FL-5.1.3, capítulo 5, K2; v2 → v3; chave **o1**, cardinalidade 1. Fonte primária: **ISTQB CTFL Syllabus v4.0.1, §5.1.3, PDF p.49**. Alterações: o3.text EN/PT; o3.explanation EN/PT; o4 novo; data/report da revisão atualizados. LO/K/capítulo/tipo/tabela preservados.

Novo **o4 EN:** Both are exit criteria

Novo **o4 PT-PT:** Ambos são critérios de saída

**Resolução e K-level — PASS:** letra D → o1. Antes de começar: entrada. Para declarar concluído: saída. Quatro combinações, só uma respeita o timing. O nível é o mesmo da baseline; não se promoveu dificuldade pela extensão do texto.

**Contestação das incorretas:**

- **o2:** argumento possível — As condições podem ser classificadas em ordem inversa. Refutação — A ordem está invertida.

- **o3:** argumento possível — Ambas têm de estar satisfeitas nalgum momento. Refutação — A disponibilidade do ambiente é uma pré-condição para começar, mas o risco residual aceite é aqui especificado como condição para declarar os testes concluídos.

- **o4:** argumento possível — Ambas contribuem para uma conclusão bem-sucedida. Refutação — A primeira condição tem de ser satisfeita antes de começar o teste de sistema, pelo que é um critério de entrada. A segunda apoia a decisão de conclusão.

**EN/PT — PASS limitado à IA:** condições e consequências equivalentes; mesma chave/cardinalidade; valores e eventos verificados. A aprovação humana continua **PENDING**. A plausibilidade é julgamento editorial, ainda sem calibração empírica.

### Fase 5B — tl-033

FL-5.2.2, capítulo 5, K2; v2 → v3; chave **o1**, cardinalidade 1. Fonte primária: **ISTQB CTFL Syllabus v4.0.1, §5.2.2, PDF p.52**. Alterações: enunciado EN/PT; o4 novo; data/report da revisão atualizados. LO/K/capítulo/tipo/tabela preservados.

Novo **o4 EN:** A test-tool supplier misses the agreed delivery date

Novo **o4 PT-PT:** Um fornecedor de uma ferramenta de teste falha a data de entrega acordada

**Resolução e K-level — PASS:** letra C → o1. Cálculo incorreto ameaça qualidade funcional do produto; pessoas, ambiente atrasado e fornecedor ameaçam execução do projeto. O nível é o mesmo da baseline; não se promoveu dificuldade pela extensão do texto.

**Contestação das incorretas:**

- **o2:** argumento possível — A saída de uma pessoa pode afetar a qualidade final. Refutação — A disponibilidade da equipa ameaça a entrega do projeto.

- **o3:** argumento possível — Um ambiente indisponível pode impedir descobrir defeitos do produto. Refutação — Um ambiente atrasado ameaça o calendário do projeto.

- **o4:** argumento possível — A ferramenta atrasada pode reduzir a cobertura. Refutação — Um atraso de entrega do fornecedor ameaça o calendário e os recursos do projeto. Um cálculo fiscal incorreto diz respeito à qualidade funcional do produto.

**EN/PT — PASS limitado à IA:** condições e consequências equivalentes; mesma chave/cardinalidade; valores e eventos verificados. A aprovação humana continua **PENDING**. A plausibilidade é julgamento editorial, ainda sem calibração empírica.

### Fase 5B — tl-034

FL-5.2.3, capítulo 5, K2; v1 → v2; chave **o1**, cardinalidade 1. Fonte primária: **ISTQB CTFL Syllabus v4.0.1, §5.2.3, PDF p.52/53**. Alterações: enunciado EN/PT; o1.text EN/PT; o2.text EN/PT; o2.explanation EN/PT; o3.text EN/PT; o3.explanation EN/PT; o4 novo; data/report da revisão atualizados. LO/K/capítulo/tipo/tabela preservados.

Novo **o4 EN:** Treat comparable likelihood as comparable risk and split effort equally

Novo **o4 PT-PT:** Tratar probabilidades comparáveis como riscos comparáveis e dividir o esforço igualmente

**Resolução e K-level — PASS:** letra A → o1. Com probabilidade comparável, maior impacto implica risco superior; visibilidade e rapidez não determinam profundidade baseada nesse risco. O nível é o mesmo da baseline; não se promoveu dificuldade pela extensão do texto.

**Contestação das incorretas:**

- **o2:** argumento possível — Visibilidade para o utilizador é relevante ao avaliar um problema. Refutação — A visibilidade, por si só, não é o nível de risco avaliado. Com probabilidades comparáveis, o impacto muito superior das transferências incorretas exige testes mais aprofundados.

- **o3:** argumento possível — Testes rápidos podem ser úteis no planeamento da execução. Refutação — A rapidez de execução pode afetar o planeamento, mas não se sobrepõe ao risco de produto superior indicado ao decidir a profundidade dos testes.

- **o4:** argumento possível — Probabilidade é um dos fatores do nível de risco. Refutação — O nível de risco considera a probabilidade e o impacto. Probabilidades comparáveis não implicam riscos comparáveis quando os impactos diferem substancialmente.

**EN/PT — PASS limitado à IA:** condições e consequências equivalentes; mesma chave/cardinalidade; valores e eventos verificados. A aprovação humana continua **PENDING**. A plausibilidade é julgamento editorial, ainda sem calibração empírica.

### Fase 5B — tl-035

FL-5.4.1, capítulo 5, K2; v2 → v3; chave **o1**, cardinalidade 1. Fonte primária: **ISTQB CTFL Syllabus v4.0.1, §5.4, PDF p.56**. Alterações: enunciado EN/PT; o3.text EN/PT; o3.explanation EN/PT; o4 novo; data/report da revisão atualizados. LO/K/capítulo/tipo/tabela preservados.

Novo **o4 EN:** Preserve dataset C, but reproduce the result using the latest build

Novo **o4 PT-PT:** Preservar o conjunto de dados C, mas reproduzir o resultado com a versão mais recente do software

**Resolução e K-level — PASS:** letra C → o1. Reproduzir a configuração observada exige versões do software, testes e dados; trocar ou omitir uma delas perde identificação da baseline. O nível é o mesmo da baseline; não se promoveu dificuldade pela extensão do texto.

**Contestação das incorretas:**

- **o2:** argumento possível — A versão mais recente dos dados pode ser a recomendada para uso futuro. Refutação — A substituição pode perder as condições que provocam a falha.

- **o3:** argumento possível — Software e dados são elementos importantes da baseline. Refutação — As versões dos testes também fazem parte da configuração: alterações nos passos ou nas verificações podem alterar o resultado. Preservar apenas software e dados deixa a baseline incompleta.

- **o4:** argumento possível — Uma versão recente pode servir para testar se uma correção funcionou. Refutação — Uma versão posterior não corresponde à configuração observada da versão 82. Pode ser útil para testes de confirmação, mas não preserva a baseline original de reprodução.

**EN/PT — PASS limitado à IA:** condições e consequências equivalentes; mesma chave/cardinalidade; valores e eventos verificados. A aprovação humana continua **PENDING**. A plausibilidade é julgamento editorial, ainda sem calibração empírica.

### Fase 5B — tl-036

FL-5.1.4, capítulo 5, K3; v2 → v3; chave **o1**, cardinalidade 1. Fonte primária: **ISTQB CTFL Syllabus v4.0.1, §5.1.4, PDF p.49/50**. Alterações: o4 novo; data/report da revisão atualizados. LO/K/capítulo/tipo/tabela preservados.

Novo **o4 EN:** 5 person-hours

Novo **o4 PT-PT:** 5 pessoas-hora

**Resolução e K-level — PASS:** letra C → o1. (2 + 4 × 5 + 14) / 6 = 36 / 6 = 6. 7 é a média simples, 5 é a estimativa mais provável e 14 é a estimativa pessimista. O nível é o mesmo da baseline; não se promoveu dificuldade pela extensão do texto.

**Contestação das incorretas:**

- **o2:** argumento possível — Uma média simples é uma operação familiar sobre três valores. Refutação — 7 é a média não ponderada (2 + 5 + 14) / 3; omite a ponderação exigida.

- **o3:** argumento possível — A estimativa pessimista é uma aproximação conservadora. Refutação — 14 é apenas a estimativa pessimista, não a estimativa ponderada.

- **o4:** argumento possível — A estimativa mais provável parece o melhor palpite individual. Refutação — 5 é apenas a estimativa mais provável. Aplicar os pesos exigidos dá (2 + 4 × 5 + 14) / 6 = 6, não 5.

**EN/PT — PASS limitado à IA:** condições e consequências equivalentes; mesma chave/cardinalidade; valores e eventos verificados. A aprovação humana continua **PENDING**. A plausibilidade é julgamento editorial, ainda sem calibração empírica.

### Fase 5B — tl-037

FL-5.1.5, capítulo 5, K3; v1 → v2; chave **o1**, cardinalidade 1. Fonte primária: **ISTQB CTFL Syllabus v4.0.1, §5.1.5, PDF p.50/51**. Alterações: o4 novo; data/report da revisão atualizados. LO/K/capítulo/tipo/tabela preservados.

Novo **o4 EN:** B, A, C

Novo **o4 PT-PT:** B, A, C

**Resolução e K-level — PASS:** letra A → o1. Disponíveis B e C: B vence. C permite A; B,A,C viola dependência e C,A,B escolhe primeiro um risco menor disponível. O nível é o mesmo da baseline; não se promoveu dificuldade pela extensão do texto.

**Contestação das incorretas:**

- **o2:** argumento possível — A,B,C segue a prioridade de risco sem considerar dependência. Refutação — A não pode ser executado antes de C.

- **o3:** argumento possível — C,A,B respeita a dependência e antecipa A. Refutação — Isto executa C de menor risco quando B de maior risco está disponível.

- **o4:** argumento possível — B está corretamente em primeiro lugar. Refutação — B é corretamente escolhido primeiro, mas A continua bloqueado até executar C. Após B, executar C e depois A.

**EN/PT — PASS limitado à IA:** condições e consequências equivalentes; mesma chave/cardinalidade; valores e eventos verificados. A aprovação humana continua **PENDING**. A plausibilidade é julgamento editorial, ainda sem calibração empírica.

### Fase 5B — tl-038

FL-5.5.1, capítulo 5, K3; v2 → v3; chave **o1**, cardinalidade 1. Fonte primária: **ISTQB CTFL Syllabus v4.0.1, §5.5, PDF p.56/57**. Alterações: o4 novo; data/report da revisão atualizados. LO/K/capítulo/tipo/tabela preservados.

Novo **o4 EN:** QA / build 82; authorised user; INV-7, total 25; select Save; expected: 201 and invoice ID; actual: 500, no saved invoice; confirmed cause: database deadlock; attach r17.

Novo **o4 PT-PT:** QA / versão 82; utilizador autorizado; INV-7, total 25; selecionar Guardar; esperado: 201 e identificador; obtido: 500, sem fatura guardada; causa confirmada: bloqueio mútuo na base de dados; anexar r17.

**Resolução e K-level — PASS:** letra D → o1. O relatório mantém ambiente/dados/resultados observados e referência do registo; inversões, versão errada ou causa confirmada não fornecida distorcem evidência. O nível é o mesmo da baseline; não se promoveu dificuldade pela extensão do texto.

**Contestação das incorretas:**

- **o2:** argumento possível — O relatório tem as mesmas classes de resultados HTTP. Refutação — Isto inverte o resultado esperado especificado e o resultado obtido observado.

- **o3:** argumento possível — O relatório mantém passos e resultados. Refutação — Isto altera o ambiente e a versão observados, tornando incorreto o contexto de reprodução.

- **o4:** argumento possível — Um HTTP 500 e um registo podem sugerir uma causa de base de dados. Refutação — O cenário fornece sintomas e uma referência de registo, mas nenhuma evidência que confirme um bloqueio mútuo na base de dados. Registar uma causa confirmada inventa um diagnóstico para além da evidência observada.

**EN/PT — PASS limitado à IA:** condições e consequências equivalentes; mesma chave/cardinalidade; valores e eventos verificados. A aprovação humana continua **PENDING**. A plausibilidade é julgamento editorial, ainda sem calibração empírica.

### Fase 5B — tl-039

FL-6.1.1, capítulo 6, K2; v1 → v2; chave **o1**, cardinalidade 1. Fonte primária: **ISTQB CTFL Syllabus v4.0.1, §6.1, PDF p.59**. Alterações: enunciado EN/PT; o1.text EN/PT; o2.text EN/PT; o2.explanation EN/PT; o3.text EN/PT; o3.explanation EN/PT; o4 novo; data/report da revisão atualizados. LO/K/capítulo/tipo/tabela preservados.

Novo **o4 EN:** Test management tool

Novo **o4 PT-PT:** Ferramenta de gestão de testes

**Resolução e K-level — PASS:** letra C → o1. A necessidade inclui gerar tráfego concorrente controlado e medir latência; monitorização observa, análise estática não executa e gestão organiza. O nível é o mesmo da baseline; não se promoveu dificuldade pela extensão do texto.

**Contestação das incorretas:**

- **o2:** argumento possível — Análise estática pode encontrar problemas de desempenho no código. Refutação — A análise estática examina código sem executar o serviço. Não gera o tráfego concorrente solicitado nem mede a latência sob esse tráfego.

- **o3:** argumento possível — Monitorização mede latência em tráfego real. Refutação — A monitorização pode observar a latência do tráfego existente, mas o requisito inclui gerar ativamente pedidos concorrentes controlados contra um ambiente de teste.

- **o4:** argumento possível — Gestão de testes pode recolher resultados e métricas. Refutação — A gestão de testes organiza planos, casos e resultados. A sua função principal não é gerar carga concorrente num serviço nem medir o desempenho em execução.

**EN/PT — PASS limitado à IA:** condições e consequências equivalentes; mesma chave/cardinalidade; valores e eventos verificados. A aprovação humana continua **PENDING**. A plausibilidade é julgamento editorial, ainda sem calibração empírica.

### Fase 5B — tl-040

FL-6.2.1, capítulo 6, K1; v2 → v3; chave **o1**, cardinalidade 1. Fonte primária: **ISTQB CTFL Syllabus v4.0.1, §6.2, PDF p.59/60**. Alterações: enunciado EN/PT; o1.text EN/PT; o2.text EN/PT; o2.explanation EN/PT; o3.text EN/PT; o3.explanation EN/PT; o4 novo; data/report da revisão atualizados. LO/K/capítulo/tipo/tabela preservados.

Novo **o4 EN:** Obtaining tool-supported coverage metrics that would be difficult to collect by hand

Novo **o4 PT-PT:** Obter, com apoio de ferramentas, métricas de cobertura difíceis de recolher manualmente

**Resolução e K-level — PASS:** letra B → o1. Custos de manutenção subestimados são risco; trabalho repetitivo reduzido, repetibilidade e medição são benefícios potenciais, não garantias. O nível é o mesmo da baseline; não se promoveu dificuldade pela extensão do texto.

**Contestação das incorretas:**

- **o2:** argumento possível — Reduzir trabalho manual é uma expectativa realista. Refutação — Reduzir trabalho manual repetitivo é um benefício potencial da automação. O risco é não prever realisticamente o esforço de introdução e manutenção.

- **o3:** argumento possível — Repetibilidade é um objetivo legítimo da automação. Refutação — Uma execução consistente e repetível é um benefício potencial. Não elimina a necessidade de manter os scripts à medida que o produto muda.

- **o4:** argumento possível — Ferramentas permitem medir cobertura difícil de recolher manualmente. Refutação — A medição apoiada por ferramentas pode ser um benefício. Subestimar o esforço necessário para manter úteis os testes automatizados e as ferramentas é o risco aqui identificado.

**EN/PT — PASS limitado à IA:** condições e consequências equivalentes; mesma chave/cardinalidade; valores e eventos verificados. A aprovação humana continua **PENDING**. A plausibilidade é julgamento editorial, ainda sem calibração empírica.

### Validação de software da fase 5B

Resultados de comandos, compatibilidade e bundle: ver a secção Fase 5B de [blueprint-validation.md](blueprint-validation.md). A revisão académica acima é separada de validação de software, aprovação humana e calibração psicométrica. Os testes não provam qualidade académica. Nenhuma aprovação humana/ISTQB/PSTQB foi atribuída.
