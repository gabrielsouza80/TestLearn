# Advanced Interpretation Mode — especificação técnica e pedagógica

Estado: proposta concreta para implementação futura, 04-11-2026. Não existe novo modo na aplicação nesta alteração. [Piloto v1](pilot-v1.json): 10 questões originais EN/PT, quatro alternativas por questão, uma resposta, todas `AI_REVIEWED_PENDING_HUMAN` e `examEligible:false`. Fontes em [sources.json](../../academic/phase10h-2026-11-04/sources.json).

## Problema e resultados pretendidos

O resultado de 55% e as dificuldades relatadas por Gabriel orientam o desenho; não demonstram, isoladamente, uma causa clínica, linguística ou conceptual. O treino deve ajudar a extrair condições decisivas, comparar alternativas quase corretas e gerir o tempo sem premiar adivinhação rápida. Um cenário longo não transforma um LO K1 em K3. Os níveis abaixo são **editoriais**, separados dos K1/K2/K3 oficiais, e os tempos são hipóteses a calibrar com utilização humana.

| Nível de interpretação     | Trabalho do aluno                                                                              | Piloto         | Alvo editorial por item |
| -------------------------- | ---------------------------------------------------------------------------------------------- | -------------- | ----------------------- |
| I1 — informação decisiva   | Identificar o objetivo, a função ou a ordem pedida; rejeitar uma inferência indevida           | exp-ai-001–003 | 75–90 s                 |
| I2 — condições e cobertura | Construir uma representação pequena (partições/regras/estados); distinguir métrica e conclusão | exp-ai-004–007 | 120–180 s               |
| I3 — restrições combinadas | Separar esforço/duração, prioridade/prontidão e direção correta/justificação falsa             | exp-ai-008–010 | 150–180 s               |

Progressão proposta: primeiro todos os itens sem limite, com passos de leitura e feedback após confirmação. Depois blocos opcionais de 4–6 itens sem pistas antes da resposta, com tempo-alvo visível se o aluno o escolher. Só depois prática com deadline do bloco. Permitir repetir um nível e desligar o relógio na prática; não bloquear estudo por uma métrica de velocidade. Em sessões temporizadas, permitir marcar, saltar e regressar sem revelar a resposta.

## Política editorial do piloto

Cada item tem ID de candidato próprio, revisão, LO/K, referência exata, cenário, quatro opções com IDs estáveis, uma chave, raciocínio e explicação de todas as opções, termos decisivos, tags de erro e objetivos de leitura/seleção. O array `correct` tem tamanho um; a letra de apresentação nunca é a identidade da resposta. A distribuição de posições corretas no documento varia, mas isso não prova qualidade. Não usar “todas/nenhuma das anteriores”, dupla negação artificial, detalhe irrelevante apenas para alongar, ou pressupostos omitidos para criar dificuldade.

As opções devem diferir por uma distinção técnica real, como cobertura de regra versus resultado, ou teste disponível versus prioridade global. A explicação deve apontar a condição violada por **cada** distrator, sem alegar que uma ação é sempre inútil. A resposta correta não deve sobressair sempre por comprimento. O item 010 inclui deliberadamente uma conclusão com prioridade adequada e justificação falsa: é preciso avaliar a afirmação inteira.

Revisão humana obrigatória antes de integrar: conteúdo CTFL, resposta única, originalidade, clareza, equivalência EN/PT e plausibilidade. Exigir decisão por ID/revisão/hash; qualquer mudança substancial reabre a decisão. Não copiar exames oficiais, imagens/tabelas protegidas, nem tratar o piloto como treino Advanced Level ISTQB. Não há evidência psicométrica ainda. A aceitação humana de um item não autoriza publicação ou ultrapassa 10G.

## Fluxo e feedback

1. Mostrar cenário completo, tabelas quando existirem e todas as alternativas, com idioma selecionável e navegação por teclado. Nunca ocultar condições para forçar memória.
2. Em treino guiado, disponibilizar “Identifiquei o pedido” como marca opcional de fim de primeira leitura; não exigir marca para responder. As pistas de termos críticos são opcionais e contam como assistência.
3. Selecionar e confirmar explicitamente. Só então mostrar a chave, o raciocínio, a evidência do syllabus e a razão individual de cada opção. Explicar qual palavra/condição torna a alternativa escolhida inadequada; não mostrar apenas “errado”.
4. Permitir registar confiança opcional e a razão escolhida pelo aluno (conceito, leitura, cálculo, tempo ou não sei). Distinguir autorrelato da tag editorial associada à alternativa; não inferir nervosismo de um cronómetro.
5. Oferecer revisão dirigida da secção e um exemplo novo do mesmo conceito. Repetição do mesmo item fica identificada como repetição; não prova transferência nem domínio.

## Medição de tempo: definição operacional

Não é possível medir leitura cognitiva com eventos de browser. Usar rótulos honestos: **tempo até à marca de leitura**, **tempo até à primeira seleção**, **tempo até à confirmação** e **tempo de revisita**.

Contrato proposto para a futura função pura de observação:

```text
TrainingAttempt {
  schemaVersion, attemptId, sessionId, questionId, candidateRevision,
  contentHash, locale, mode: guided|untimed|timed,
  firstExposure, assisted, optionOrderIds, selectedOptionId,
  confirmed, outcome: correct|incorrect|unanswered,
  visibleActiveMs, readingMarkerMs?: number, firstSelectionMs?: number,
  confirmationMs?: number, revisitMs, clockDiscontinuity,
  languageChanged, interruptionCount, selfReportedReason?: string
}
```

- Injetar relógio monotónico para segmentos na mesma página; incrementar apenas quando o item está visível, a janela está ativa e a sessão não está pausada. Um heartbeat por si só não pode contar tempo em background. Eventos duplicados não somam tempo duas vezes.
- Se a marca de leitura existir, o tempo de seleção após marca é `confirmationMs - readingMarkerMs`; o tempo sem marca permanece ausente, não zero nem uma estimativa inventada. Uma seleção antes da marca invalida a separação leitura/seleção e conserva as latências observadas.
- Navegação termina o segmento; regressar abre outro. Somar revisitas separadamente. Trocar idioma marca a tentativa como bilingue e impede comparações simples com a primeira leitura monolingue; não resetar o tempo já gasto.
- Não subtrair valores monotónicos de documentos diferentes. Após refresh, conservar apenas segmentos confirmados e marcar a lacuna/interrupção. Recuo do relógio de calendário não produz duração negativa nem tempo extra de simulado. Clocks incoerentes tornam métricas indisponíveis, não “rápidas”.
- Em prática, pausas explícitas suspendem os segmentos. Num simulado de deadline fixo, background e refresh **não suspendem o deadline**; tempo de exposição e tempo disponível são métricas diferentes. Usar o contrato de deadline já existente do simulado, sem alterar scoring.
- Comparar medianas e distribuição de primeiras exposições não assistidas, por nível/idioma e após pelo menos cinco itens distintos. Amostra menor mostra “evidência insuficiente”. Estes limiares são propostas de produto, não normas ISTQB.

## Erros repetidos e recomendações determinísticas

As tags do piloto são hipóteses editoriais sobre a confusão representada pela opção; não são diagnóstico automático. Distinguir `incorrect`, `unanswered`, pedido de ajuda e falha de armazenamento. Um item sem resposta não ganha uma tag de distrator.

Regra inicial proposta, explicável ao aluno: recomendar uma secção quando a **mesma tag** aparece em respostas incorretas confirmadas a **três itens distintos**, em **pelo menos duas sessões**, entre as últimas dez primeiras exposições não assistidas dessa tag. Ordenar recomendações por número de itens distintos, depois exposição mais recente e finalmente ID da tag, para desempate estável. Não contar retry/revisita da mesma questão como evidência independente. Zero ou uma resposta não gera declaração de fraqueza. Sem três variantes aprovadas para uma tag, mostrar somente observações por item; o piloto de 10 questões não suporta já todas essas recomendações agregadas.

Mapear cada tag para LO/secção e uma ação curta: por exemplo, `frequency-for-coverage` → §1.3, distinguir repetição de cobertura nova; `forget-initial-state` → §4.2.4, simular estado inicial e eventos; `unweighted-mean` → §5.1.4, atribuir a/m/b e unidades; `fail-to-recompute-ready-set` → §5.1.5, atualizar prontidão após cada teste. Usar o mapa explícito do conteúdo aprovado; não chamadas a LLM, inferência remota ou serviços pagos. Se não existir mapa aprovado, mostrar a explicação do item e não inventar recomendação.

O aluno pode rever e apagar os seus registos de treino. Treino local é opt-in; dados sintéticos nos testes, sem telemetria de terceiros ou custos recorrentes. Não apresentar percentagem de aprovação prevista ou estado emocional calculado a partir destes sinais.

## Simulado de 40 perguntas / 60 minutos

A tabela oficial atual v1.20, pp.4–5, confirma 40 perguntas, 40 pontos, 26 para aprovação, 60 minutos e distribuição cognitiva 8 K1/24 K2/8 K3. Os 75 minutos aplicam-se quando existe elegibilidade para extensão linguística; não assumir essa autorização para Gabriel. Os tempos indicativos por K não são limites rígidos por questão. A prática avançada não deve alterar esses K, quotas ou a pontuação estabelecida.

Preservar o simulado existente e a identificação de Public Beta enquanto a revisão humana do banco atual está pendente. Uma futura simulação com candidatos avançados só pode ser composta quando houver itens aprovados suficientes para as quotas LO/K, 40 IDs distintos e uma política de seleção aprovada. Dez candidatos não são um banco de 40. Não repetir itens, preencher lacunas com rascunhos, nem misturar silenciosamente ajuda/pistas com o resultado de simulado. Em simulado, disponibilizar explicações apenas no fim; treino guiado mantém resultados separados. Seleção e ordem reprodutíveis por seed, sem promoção automática de candidatos por métricas de treino.

## Fronteiras técnicas e compatibilidade

Escolha de desenho nesta proposta: documentos/JSON fora de runtime agora; posteriormente um módulo puro de treino e um adaptador de UI fino, em vez de alterar já `Session.mode` ou expandir o banco atual. `docs` já está excluído por `.vercelignore`; o schema experimental é deliberadamente distinto de `Question`. `examEligible:false` é uma proteção adicional, não o único mecanismo de isolamento.

No futuro, guardar treino numa estrutura versionada separada, por exemplo sob uma chave local dedicada; não reutilizar silenciosamente o objeto estrito de progresso/backup. Sem migração nesta alteração. Antes de implementar persistência, especificar transação, limites de tamanho, quota, duas tabs, retenção, export/import e recuperação de bytes inválidos. Uma falha deve ser apresentada como falha, nunca como tentativa gravada. Não usar `humanApproval:PENDING` como filtro de aprovação: o código atual aceita esse literal no banco existente.

Antes de qualquer banco novo, resolver explicitamente limites `max(90)` dos backups, enum de revisões, lazy loaders e guards que esperam oito arquivos. Não substituir nem editar snapshots históricos para acomodar o piloto. Preservar IDs, option IDs, ordem de opções de cada tentativa e explicações históricas. “AI_REVIEWED_PENDING_HUMAN” neste documento não se converte automaticamente em `PASS` runtime.

## Critérios testáveis para a futura implementação

- Conteúdo: chaves independentes, quatro opções únicas, tradução humana, quatro explicações, LO/K verificado e apenas candidatos autorizados elegíveis. Testes estruturais não certificam a semântica.
- Tempo com relógio injetado: hidden/blur/pause não incrementam prática; revisita e troca de idioma não apagam tempo; seleção antes da marca não fabrica tempo de leitura; refresh/clock inverso assinalam lacuna. Deadline do simulado não pausa em background.
- Diagnóstico: dois erros/repetições do mesmo ID não disparam recomendação; três IDs em duas sessões podem disparar; sem resposta e assistência são excluídas; desempates determinísticos; revisão de conteúdo separa evidência por hash.
- UI: seletores por role/nome acessível e ID de questão estável; confirmar quantidade e conteúdo das opções, foco, enunciado inteiro e feedback correto. Não usar `nth(0)` como resposta certa, sleeps fixos, contagem de cards ou só toast de “guardado”.
- Preservação: restaurar tentativas antigas reais por cada revisão suportada, validar chaves/ordens/score exatos, refresh e duas tabs; falha de quota não pode resultar em falso sucesso. Executar os quatro projetos Playwright quando houver UI.
- Publicação: build/manifesto/guards sem rascunhos, PDFs, fontes de revisão ou chaves novas em assets; 10G continua gate separado, sem deploy autorizado por esta especificação.

## Próximo incremento concreto

Rever humanamente `exp-ai-001`–`exp-ai-003` e as equivalências EN/PT, recolhendo tempos sem pressão sem os usar para pontuação. Em paralelo, concluir o lote académico `tl-013`–`tl-024`. Após aprovação do desenho de produto, implementar primeiro o módulo puro de eventos de tempo com relógio injetado e os casos negativos acima; só depois UI e persistência separada. Não há commit, push ou deployment autorizado por este documento.
