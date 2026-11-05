# Fase 10H — plano dos 88 itens restantes

A matriz de 04-11 é um checkpoint AI de 90/90, não aprovação humana. Lote 1 (`tl-011`, `tl-090`) fica separado e pendente de duas decisões humanas. Nos 88 restantes há 33 LOW e 55 NONE; não há achados médios/superiores adicionais registados. O risco de explicação abaixo é uma prioridade de confirmação, não um novo defeito comprovado. Qualquer novo achado médio/superior sobe imediatamente para o lote seguinte.

Lotes até oito itens, agrupados por motivo para permitir decisões independentes e rastreáveis. Não publicar automaticamente nenhum lote. Fontes, LO, K, solução independente, alternativas, EN/PT, histórico, chave e testes são obrigatórios por item. Se uma chave publicada precisar de mudar, parar esse item e pedir autorização.

## Lote 2 — Explicações/ressalvas que merecem confirmação prioritária

| ID     | LO / K        | Severidade AI | Foco já registado na matriz                                                                                                                                                                                                              |
| ------ | ------------- | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| tl-008 | FL-1.5.3 / K2 | LOW           | Não tomar independência como superior em todos os contextos; o cenário pergunta o benefício principal.                                                                                                                                   |
| tl-020 | FL-4.3.1 / K2 | LOW           | “pode omitir” não afirma que há obrigatoriamente ramos por cobrir. Contraexemplo: if(x>0) y=1; print(y), com x=1 executa ambas as instruções e deixa o resultado falso por exercitar.                                                    |
| tl-021 | FL-4.3.2 / K2 | LOW           | CTFL inclui transferências condicionais e incondicionais. Não generalizar 50% para grafo/programa completo sem o conhecer. Não há denominador zero neste cenário.                                                                        |
| tl-035 | FL-5.4.1 / K2 | LOW           | Preservar estes três elementos ajuda, não garante reprodução de fatores externos/ambiente; o item pede melhor suporte, não suficiência universal. A explicação não deve prometer determinismo.                                           |
| tl-038 | FL-5.5.1 / K3 | LOW           | o1 é resumo correto, não relatório completo: não inclui todos os campos típicos (título, severidade, prioridade etc.). Enunciado pede registo fiel da evidência disponível, não preencher campos ausentes. Não inferir causa de HTTP500. |
| tl-063 | FL-5.2.1 / K1 | LOW           | Não multiplicar categorias ordinais como se fossem probabilidades calibradas; o item reconhece abordagem quantitativa sem números. Matriz qualitativa explicitamente admitida.                                                           |
| tl-064 | FL-5.2.4 / K2 | LOW           | “completes control” significa incluir monitorização que falta, não terminar atividade contínua nem eliminar risco. A explicação geral reforça reavaliação.                                                                               |
| tl-072 | FL-4.2.3 / K3 | LOW           | Tabela tem quatro regras, não oito regras; – não representa condição falsa nem combinação inviável. X e brancos de ação seguem notação da fonte, embora só –/T/F sejam definidos no enunciado.                                           |

## Lote 3 — Explicações/ressalvas que merecem confirmação prioritária

| ID     | LO / K        | Severidade AI | Foco já registado na matriz                                                                                                                                                          |
| ------ | ------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| tl-078 | FL-5.5.1 / K3 | LOW           | Enunciado pede resumo, não todos campos típicos. Repetição observada sustenta reproduzível neste contexto, não garantia universal. Um trace referenciado não estabelece diagnóstico. |

## Lote 4 — Aplicação K3: resolver independentemente e comparar distratores

| ID     | LO / K        | Severidade AI | Foco já registado na matriz                                                                                                                                                                                   |
| ------ | ------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| tl-025 | FL-4.2.1 / K3 | NONE          | O mínimo refere as três partições declaradas, não combinações de múltiplos parâmetros ou teste exaustivo.                                                                                                     |
| tl-026 | FL-4.2.2 / K3 | NONE          | Não confundir extremos apenas da partição válida com todos os extremos adjacentes.                                                                                                                            |
| tl-027 | FL-4.2.3 / K3 | LOW           | Só R1 concede entrega gratuita. O enunciado pede entrada; a explicação completa o resultado esperado. Não exige cobertura das quatro regras.                                                                  |
| tl-028 | FL-4.2.4 / K3 | NONE          | Reaching Paid não autoriza parar a leitura antes do último evento de o4. Combinações não declaradas são explicitamente inválidas em EN/PT.                                                                    |
| tl-029 | FL-4.5.3 / K3 | LOW           | 49 e 50 estão em lados opostos, mas não são vizinhos mais próximos se o domínio aceitar cêntimos; o item não promete BVA de valores adjacentes. Dois exemplos não cobrem toda a story nem todos os negativos. |
| tl-036 | FL-5.1.4 / K3 | NONE          | Estimativa não é garantia nem duração de calendário; o item pede valor central, não intervalo de confiança.                                                                                                   |
| tl-037 | FL-5.1.5 / K3 | NONE          | C,A,B seria defensável sob política diferente de desbloquear A o mais cedo possível. A regra local disponível especificada exclui-a.                                                                          |
| tl-046 | FL-4.2.2 / K3 | NONE          | Oito versus seis depende de considerar também limites das partições rejeitadas, explicitamente exigido. Não introduzir endpoints de máquina num domínio matemático sem limites.                               |

## Lote 5 — Aplicação K3: resolver independentemente e comparar distratores

| ID     | LO / K        | Severidade AI | Foco já registado na matriz                                                                                                                                                                                                                                                            |
| ------ | ------------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| tl-047 | FL-4.2.2 / K3 | LOW           | Syllabus define fronteira e dois vizinhos; não descreve explicitamente esta regra de recorte nos extremos do domínio. A chave é correta sob a convenção anunciada, mas “full three-value BVA” pode parecer alegação de equivalência geral ao exame. Validar essa convenção com humano. |
| tl-071 | FL-4.2.1 / K3 | NONE          | Combinar dois campos inválidos pode mascarar validações em sistemas reais; o cenário exclui expressamente esse mascaramento. Não generalizar mínimo dois sem essa premissa.                                                                                                            |
| tl-073 | FL-4.2.4 / K3 | LOW           | Há outra sequência mínima que faça ciclo de revoke antes de return/resubmit, mas não está entre opções. Não se pede sequência mínima única global; o3 é única correta oferecida.                                                                                                       |
| tl-074 | FL-4.5.3 / K3 | NONE          | Não se pede todas as combinações de três condições, apenas duas regras de recusa não exercitadas. No reservation explícito impede confundir causa da recusa.                                                                                                                           |
| tl-076 | FL-5.1.4 / K3 | NONE          | A independência não é necessária para somar valores esperados, mas não prejudica cálculo. Não somar SD nem inferir paralelismo: pergunta só esforço esperado.                                                                                                                          |
| tl-077 | FL-5.1.5 / K3 | NONE          | Não otimizar globalmente para desbloquear B cedo: política local está expressa. Sem empates, duração igual e disponibilidade definida removem ordens alternativas entre opções.                                                                                                        |
| tl-086 | FL-4.2.2 / K3 | NONE          | Os três pontos de mudança têm seis valores de fronteira (4/5,11/12,20/21); “three neighbourhoods” na explicação são uniões de ambos os lados, não só três valores. Não incluir endpoints excluídos.                                                                                    |
| tl-087 | FL-4.2.3 / K3 | LOW           | Tabela minimizada não conta cada combinação como regra. R1 tem2 combinações, R2/R3 uma cada, R4 quatro; cobrir uma basta por coluna segundo critério indicado.                                                                                                                         |

## Lote 6 — Aplicação K3: resolver independentemente e comparar distratores

| ID     | LO / K        | Severidade AI | Foco já registado na matriz                                                                                                                                                                               |
| ------ | ------------- | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| tl-088 | FL-4.2.4 / K3 | NONE          | A regra de parar ao primeiro inválido é premissa explícita do exercício, alinhada a evitar mascaramento; não afirmar que todo sistema real obriga encerramento da sessão após evento inválido.            |
| tl-089 | FL-5.1.4 / K3 | NONE          | Sobreposição não reduz soma de esforço; não calcular duração sem capacidade/calendário. Fórmula explícita evita disputa entre média simples e PERT ponderada; nenhuma hipótese de confiança é necessária. |

## Lote 7 — Equivalência EN/PT sinalizada

| ID     | LO / K        | Severidade AI | Foco já registado na matriz                                                                                                                                                                |
| ------ | ------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| tl-022 | FL-4.4.1 / K2 | LOW           | personal knowledge/o seu conhecimento e similar products/produtos semelhantes equivalentes. “dias bissextos” é pouco idiomático para leap-day, mas no contexto de datas é entendível.      |
| tl-041 | FL-1.5.2 / K1 | LOW           | delivery team/equipa de desenvolvimento é ligeiramente mais estreito no PT: pode sugerir só programadores, embora o resto explicite negócio/desenvolvimento/testes. Sem inversão da chave. |

## Lote 8 — Ressalvas/editorial LOW

| ID     | LO / K        | Severidade AI | Foco já registado na matriz                                                                                                                                |
| ------ | ------------- | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| tl-001 | FL-1.1.1 / K1 | LOW           | DOIS/TWO e required=2 concordam. EN/PT preservam objetivos e absolutos.                                                                                    |
| tl-006 | FL-1.4.1 / K2 | LOW           | Condições/conditions e análise/analysis correspondem. A explicação de o1 é correta mas breve.                                                              |
| tl-013 | FL-2.1.5 / K2 | LOW           | before coding/antes de programar e reviewing/rever são equivalentes; shift left permanece termo técnico nas duas línguas.                                  |
| tl-014 | FL-2.3.1 / K2 | LOW           | operational/em operação, can/pode e even without/mesmo sem preservam modalidade e contexto. Motor de base de dados é equivalente a database engine.        |
| tl-015 | FL-3.1.1 / K1 | LOW           | written/documented corresponde a escritos; checkout traduzido por compra mantém o domínio. directly/diretamente e without/sem limitam a atividade.         |
| tl-017 | FL-3.1.3 / K2 | LOW           | contradictory/contraditórios, directly/diretamente e failure/falha mantêm os conceitos. Não se traduz defeito por erro humano.                             |
| tl-019 | FL-4.1.1 / K2 | LOW           | externally specified/especificado externamente e without/sem mantêm restrição. Caixa-preta/branca e experiência preservam classificação.                   |
| tl-023 | FL-4.4.2 / K2 | LOW           | while/enquanto, timeboxed/duração definida e charter/carta de testes preservam simultaneidade e estrutura. Avaliação está expressa em ambos os enunciados. |

## Lote 9 — Ressalvas/editorial LOW

| ID     | LO / K        | Severidade AI | Foco já registado na matriz                                                                                                                                                               |
| ------ | ------------- | ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| tl-024 | FL-4.5.2 / K2 | LOW           | starting context/contexto inicial e triggering action/ação desencadeadora equivalentes; when opened/quando é aberto refere cesto nas duas línguas. Total zero é observável e equivalente. |
| tl-030 | FL-5.1.6 / K1 | LOW           | generally/geralmente evita regra universal; low-level/baixo nível não significa baixa qualidade. small/pequenos e large/grandes correspondem a granularidade/âmbito.                      |
| tl-032 | FL-5.1.3 / K2 | LOW           | before starts/antes de iniciar e before declaring complete/antes de declarar concluídos preservam propósito. Stakeholder acceptance/aceitação pelos stakeholders equivalente.             |
| tl-033 | FL-5.2.2 / K2 | LOW           | possibility/possibilidades enquadra opções como eventos potenciais, não defeitos já confirmados. Invoice/fatura é metonímia do sistema que calcula.                                       |
| tl-040 | FL-6.2.1 / K1 | LOW           | risk rather than benefit/risco em vez de benefício preserva polaridade; underestimating/subestimar não se confunde com custo inevitável.                                                  |
| tl-044 | FL-5.1.7 / K2 | LOW           | working/funcional significa operacional neste contexto, não apenas tipo funcional. critique/criticar significa avaliar contra expectativas; eixos são iguais nas opções EN/PT.            |
| tl-055 | FL-3.1.2 / K2 | LOW           | potential/potencial e later/posterior mantêm benefício sem quantificação garantida. Retention/conservação é consistente no contexto de dados.                                             |
| tl-056 | FL-3.2.1 / K1 | LOW           | picking workflow/preparação de encomendas adequado ao armazém; weekly/semanalmente e evolving/em evolução preservam frequência/contexto.                                                  |

## Lote 10 — Ressalvas/editorial LOW

| ID     | LO / K        | Severidade AI | Foco já registado na matriz                                                                                                                         |
| ------ | ------------- | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| tl-062 | FL-5.1.2 / K1 | LOW           | typically/tipicamente evita papéis exclusivos; next iteration/próxima iteração preserva distinção de planeamento de release. Tasks/tarefas correto. |

## Lote 11 — Sem problema identificado pela AI: revisão humana continua obrigatória

| ID     | LO / K        | Severidade AI | Foco já registado na matriz                                                                                                                                                                                           |
| ------ | ------------- | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| tl-002 | FL-1.2.2 / K1 | NONE          | primarily/principalmente limita a classificação ao objetivo principal, evitando afirmar que resultados não possam alimentar QA.                                                                                       |
| tl-003 | FL-1.1.2 / K2 | NONE          | Debugging (depuração) compreensível. PT oficial 4.0 p.17 fala em causa raiz no diagnóstico; EN 4.0.1 p.16 fala em encontrar o defeito. A redação atual segue o EN sem equiparar todo debugging a root cause analysis. |
| tl-004 | FL-1.2.3 / K2 | NONE          | O que é a fórmula/what is the wrong formula identifica claramente o objeto. Pode causar/may cause nas explicações preserva a não inevitabilidade de falha.                                                            |
| tl-005 | FL-1.3.1 / K2 | NONE          | PT bateria e EN suite são equivalentes; retaining/mantendo preserva a ressalva do syllabus sobre regressão.                                                                                                           |
| tl-007 | FL-1.4.4 / K2 | NONE          | may/podem explicita impacto potencial; EN/PT concordam.                                                                                                                                                               |
| tl-009 | FL-2.1.2 / K1 | NONE          | during/durante e preliminares/draft preservam a fase correspondente, sem exigir execução dinâmica sem código.                                                                                                         |
| tl-010 | FL-2.1.3 / K1 | NONE          | O enunciado explicita component teste e a refatorização; EN/PT concordam. PT oficial usa reestruturados e o projeto refatorizar, sem mudança conceptual.                                                              |
| tl-012 | FL-2.2.1 / K2 | NONE          | within one application/da mesma aplicação fixa a fronteira relevante. System integration with external systems é uma opção específica, não uma definição exaustiva de integração de sistemas.                         |

## Lote 12 — Sem problema identificado pela AI: revisão humana continua obrigatória

| ID     | LO / K        | Severidade AI | Foco já registado na matriz                                                                                                                           |
| ------ | ------------- | ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| tl-016 | FL-3.2.3 / K1 | NONE          | moderator/moderador e scribe/redator (anotador) coincidem com PT oficial. normally/normalmente não impõe pessoas distintas.                           |
| tl-018 | FL-3.2.4 / K2 | NONE          | most formal/mais formal e collected metrics/métricas recolhidas equivalentes; Inspeção é termo PT oficial.                                            |
| tl-031 | FL-5.1.1 / K2 | NONE          | project-level/ao nível do projeto e agreed/acordados equivalentes; artifact/artefacto e plan/plano corretos.                                          |
| tl-034 | FL-5.2.3 / K2 | NONE          | comparable/comparáveis e much higher/muito superior preservam comparação; deeper/mais aprofundados trata profundidade, não simplesmente ordem.        |
| tl-039 | FL-6.1.1 / K2 | NONE          | generate/gerar e under that generated load/sob essa carga gerada são restrições equivalentes; simultâneos preserva concorrência.                      |
| tl-042 | FL-1.4.3 / K2 | NONE          | what needs testing/o que deve ser testado e no cases or scripts/ainda não casos nem scripts mantêm fronteira. Conditions/condições distinto de casos. |
| tl-043 | FL-2.1.6 / K2 | NONE          | recurring/recorrente e outcome/resultado mantêm foco; assign responsibility/atribuir responsabilidades não equivale a culpar pessoas.                 |
| tl-045 | FL-5.3.2 / K2 | NONE          | in progress/em curso, behind plan/abaixo do planeado e high-risk/risco elevado preservados. Management/gestão é público destinatário compatível.      |

## Lote 13 — Sem problema identificado pela AI: revisão humana continua obrigatória

| ID     | LO / K        | Severidade AI | Foco já registado na matriz                                                                                                                                                            |
| ------ | ------------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| tl-048 | FL-1.2.1 / K2 | NONE          | valid transfers/transbordos válidos é tradução de domínio adequada a transportes, distinto de transferências financeiras. tested journeys/viagens testadas mantém limite da evidência. |
| tl-049 | FL-1.4.2 / K2 | NONE          | emergency dispatch/coordenação de meios de emergência e audit retention/conservação para auditoria preservam domínio e obrigação; availability/disponibilidade equivalente.            |
| tl-050 | FL-1.4.5 / K2 | NONE          | mainly/principalmente preserva atribuição não exclusiva; one person may/uma pessoa pode equivalente. Testing role/função de teste distingue-se do processo amplo.                      |
| tl-051 | FL-1.5.1 / K2 | NONE          | intended/previsto e refunded/reembolsado mantêm ambiguidade do termo. “falha reportada” não transforma alegação em defeito confirmado; a disputa está explícita.                       |
| tl-052 | FL-2.1.1 / K2 | NONE          | usable increments/incrementos utilizáveis e can change/podem mudar equivalentes; static and dynamic/estáticos e dinâmicos preservados.                                                 |
| tl-053 | FL-2.1.4 / K2 | NONE          | can/pode preserva benefício potencial; manual user-focused/centrado no utilizador equivalente. Setup/preparação não nega manutenção.                                                   |
| tl-054 | FL-2.2.2 / K2 | NONE          | primary objectives/objetivos principais evita exclusividade entre dimensões. Response time/tempo de resposta e agreed workload/carga acordada equivalentes.                            |
| tl-057 | FL-3.2.2 / K2 | NONE          | anomalies/anomalias distinto de defects/defeitos nas duas línguas. Owners/responsáveis e follow-up/acompanhamento coerentes.                                                           |

## Lote 14 — Sem problema identificado pela AI: revisão humana continua obrigatória

| ID     | LO / K        | Severidade AI | Foco já registado na matriz                                                                                                                                                        |
| ------ | ------------- | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| tl-058 | FL-3.2.5 / K1 | NONE          | deployment guide/guia de colocação em serviço preserva artefacto; measurable/mensuráveis e adequate/adequado equivalentes.                                                         |
| tl-059 | FL-4.3.3 / K2 | NONE          | may/pode preserva limitação não absoluta; required/obrigatória mantém que omissão é defeito. Objective/objetiva refere medição, não prova de correção.                             |
| tl-060 | FL-4.4.3 / K2 | NONE          | high-level/alto nível, directly checkable/diretamente verificável e trade-off/compromisso de repetibilidade mantêm significado; severidade do defeito preservada.                  |
| tl-061 | FL-4.5.1 / K2 | NONE          | amend/alterar, permitted/forbidden/permitidos/proibidos e before implementation/antes preservados. “Confirmação” refere critérios da story, não teste de confirmação pós-correção. |
| tl-065 | FL-5.3.1 / K1 | NONE          | rather than/em vez de preserva categorias; measured/medido e high-priority/prioridade elevada corretos. Não confunde prioridade com severidade.                                    |
| tl-066 | FL-5.3.3 / K2 | NONE          | rapid/rápida, across time zones/diferentes fusos e weekly/semanal preservados. Steering group/grupo de direção adequado.                                                           |
| tl-067 | FL-1.3.1 / K2 | NONE          | specified/especificados e necessary approval/aprovação necessária preservam causa da lacuna. Month-end/fecho mensal e payroll/processamento salarial adequados.                    |
| tl-068 | FL-2.1.2 / K1 | NONE          | early draft/versão inicial e corresponding/correspondente equivalentes. Across lifecycles/diferentes ciclos mantém generalidade.                                                   |

## Lote 15 — Sem problema identificado pela AI: revisão humana continua obrigatória

| ID     | LO / K        | Severidade AI | Foco já registado na matriz                                                                                                                                                             |
| ------ | ------------- | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| tl-069 | FL-2.1.3 / K1 | NONE          | shared natural-language/linguagem natural partilhada e become executable/tornam executáveis equivalentes. A explicação geral evita tradução automática mágica de texto.                 |
| tl-070 | FL-4.1.1 / K2 | NONE          | respectively/respetivamente preserva ordem dos nomes; tokens de nomes e três famílias coincidem. “sem ler código” não transforma execução em manual.                                    |
| tl-075 | FL-5.4.1 / K2 | NONE          | build/compilação, schema/esquema e seed data/dados iniciais preservados. Same script/mesmo script não implica ambiente igual; ambas línguas explicitam reconstrução.                    |
| tl-079 | FL-6.1.1 / K2 | NONE          | internal branches/ramos internos e most directly/mais diretamente preservam capacidade específica. Instrumented/instrumentados equivalente.                                             |
| tl-080 | FL-6.2.1 / K1 | NONE          | proprietary runner/executor proprietário e next year/próximo ano preservam cenário. Support ending/fim suporte não é “ferramenta deixa já de funcionar”.                                |
| tl-081 | FL-1.5.2 / K1 | NONE          | qualified/qualificado e necessary skills/competências necessárias preservam condição; cross-skilled/competências partilhadas mantém treino entre funções, sem dispensar especialização. |
| tl-082 | FL-5.1.7 / K2 | NONE          | critique/avaliam criticamente é tradução precisa e mais neutra que “criticam”; integrated/integrado não altera eixos. Concurrency/pedidos concorrentes preservados.                     |
| tl-083 | FL-3.2.4 / K2 | NONE          | TWO/DUAS e ordem das duas etapas preservadas. Review leader/líder de revisão e scribe/redator coincidem com fonte PT; qualificação e consenso equivalentes.                             |

## Lote 16 — Sem problema identificado pela AI: revisão humana continua obrigatória

| ID     | LO / K        | Severidade AI | Foco já registado na matriz                                                                                                                                                                     |
| ------ | ------------- | ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| tl-084 | FL-2.2.2 / K2 | NONE          | at most/no máximo é ≤300ms, não <300; 95th-percentile/percentil95 e 200 concurrent/concorrentes preservados. Não confundir percentil com todos os pedidos.                                      |
| tl-085 | FL-5.2.4 / K2 | NONE          | rather than repeat initial analysis/em vez de repetir análise inicial limita cenário e evita ambiguidade; clock-change/mudança da hora, likelihood/probabilidade e impact/impacto equivalentes. |

## Próximo passo

Revisão académica humana independente de tl-011 e tl-090, com decisão por item. Depois, iniciar o Lote 2, sem confundir o aceite técnico deste workspace com aprovação académica ou autorização de release. Nenhum item do plano fica HUMAN_APPROVED por constar desta lista.
