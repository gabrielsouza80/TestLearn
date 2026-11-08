# Fase 10H — Lote 3: tl-078

**Veredito AI: ACCEPT_AS_IS. Resposta independente e chave publicada: o1.** Nenhum problema académico obrigatório foi confirmado; pergunta, alternativas, explicações, versão 1, LO FL-5.5.1/K3 e revisão de conteúdo `.10` ficam exatos. Nenhuma aprovação humana ou autorização de publicação é atribuída.

## Preflight e continuidade

Branch develop; HEAD `3fd0a85d95ecb79539515833ee3cbe7869c58049`; working tree limpo no início. A diferença para c551cca… tem origem conhecida: commits locais 61f0c87… (fecho 10G) e 3fd0a85… (10H), criados e enviados por autorização explícita na execução anterior. Não é alteração inesperada. Nesta execução não houve operações Git remotas. Os 50 ficheiros de origem do ZIP revisto do Lote 2 coincidem byte a byte com o workspace; o ZIP conserva SHA-256 `8f3aac344149477d7b09c210be124b65ab765b28860e43b4ac5945e8bc93beca`.

Foram lidos a matriz original, os registos/aceites dos lotes anteriores, a verificação anterior e a linha tl-078 do Lote 3 no plano. Resultados anteriores são contexto histórico, não novas execuções.

## Aceite separado do Lote 2

O [registo novo](../phase10h-batch2-2026-11-05/owner-acceptance-2026-11-06.json) fixa OWNER_ACCEPTED para cada uma das oito versões/hashes/chaves revistas. O registo histórico de tl-038 como BLOCKED_HUMAN_DECISION permanece intacto: o proprietário aceita agora o conteúdo com a qualificação abaixo; isso não transforma retroativamente a análise anterior nem certifica um SME humano independente.

> The published answer is academically defensible and aligns with the ISTQB CTFL FL-5.5.1/K3 multiple-choice examination approach. Its difficulty is relatively low for K3, so a more demanding alternative may be developed later.

Aprovação académica independente permanece PENDING; não foram inventadas certificações, aprovação das restantes perguntas ou autorização de main/Vercel. As correções do Lote 1 e o respetivo aceite anterior permanecem intactos.

## Solução antes da chave e distratores

Preserve staging/build r204, create L-42 offline, reconnect and Sync once, expected one server record, observed two, trace t42, and the explicitly observed successful repetition. o1 preserves all facts without a causal diagnosis. o2 swaps expected/observed quantities; o3 changes offline creation to online and omits reconnection; o4 changes r204 to r205 and asserts an unproven server race. Reproducibility is supported only for the stated repetition/context, not universal determinism. A trace reference documents evidence, not proof of root cause.

A projeção inicial ocultou chave e explicações e embaralhou alternativas. A solução foi gravada antes de as consultar nesta execução. É raciocínio AI, não prova de independência humana nem ausência de conhecimento prévio da conversa. A solução o1 coincidiu depois com a chave armazenada. Todos os distratores foram avaliados individualmente em record.json.

## Hipóteses verificadas

- **incompleteReport**: Não confirmado como defeito: o enunciado pede resumo e a explicação distingue relatório completo. Não inventar severidade, prioridade ou campos não fornecidos.
- **reproducibility**: Não confirmado como defeito: repetição explicitamente observada sustenta reproduzível no contexto descrito. Não constitui garantia universal.
- **traceDiagnosis**: Não confirmado como defeito: t42 é evidência referenciada, não diagnóstico; o4 é rejeitado precisamente por inventar causa.

## Fontes oficiais, LO e comparação cognitiva

Referência primária: [CTFL v4.0.1 EN](https://istqb.org/wp-content/uploads/2024/11/ISTQB_CTFL_Syllabus_v4.0.1.pdf), §5.5 pp.56–57 e LO/K3 p.47. Comparação PT: [PSTQB CTFL v4.0/v1.0](https://pstqb.pt/wp-content/uploads/2024/05/ISTQB_CTFL_Syllabus-v4.0-PT_v1.0.pdf), §5.5 pp.62–63 e LO/K3 p.52. Páginas físicas, base 1. A tradução disponível não é apresentada como v4.0.1. Os PDFs locais foram lidos novamente e identificados por hash; as referências oficiais foram abertas no browser de pesquisa.

### Sample B v1.7, Q38 — FL-5.5.1/K3

[Questões p.20](https://tbok.istqb.org/api/exam-pdf/10/questions); [respostas p.36](https://tbok.istqb.org/api/exam-pdf/10/answers), resposta oficial b.

O exemplo oficial pede selecionar uma descrição útil da falha a partir de um log, não redigir o relatório inteiro. tl-078 também aplica critérios de reporte por seleção, mas fornece os factos de forma mais explícita e exige menos inferência de padrão. A classificação K3 do exemplo oficial refuta a exclusão automática de escolha múltipla; não certifica este item TestLearn.

O rationale B admite inferência qualificada de um padrão sustentado pelos resultados. Isso é diferente de afirmar uma causa raiz confirmada apenas porque existe uma referência de trace: em tl-078 não são fornecidos dados causais que confirmem a alegada condição de corrida. Não se ensina que toda hipótese seja proibida; distingue-se hipótese sustentada de diagnóstico apresentado como comprovado.

Comparação do enunciado e rationale oficiais; não se afirma resolução independente da tabela gráfica do log.

### Sample D v1.5, Q38 — FL-5.5.1/K3

[Questões p.19](https://tbok.istqb.org/api/exam-pdf/12/questions); [respostas p.33](https://tbok.istqb.org/api/exam-pdf/12/answers), resposta oficial a.

O exemplo oficial pede escolher a informação que melhor ajuda a reproduzir uma falha num relatório existente. tl-078 exige conservar dados, sequência, configuração e resultados, rejeitando um diagnóstico sem evidência. Ambos aplicam princípios de reporte num contexto delimitado sem exigir autoria livre; a exigência concreta e a dificuldade não são declaradas idênticas.

Analogia de tipo de tarefa, não equivalência psicométrica.

## EN/PT, explicação, dificuldade e treino profissional

PT/EN preservam staging/pré-produção, r204, offline, reconexão, Sync uma vez e contagens 1/2. Concorrência no servidor é mais amplo que server race; a expressão ocorre só no diagnóstico não sustentado de o4, que também erra build. Melhor precisão terminológica é opcional, sem criar segunda resposta defensável.

A explicação geral ensina separar factos/hipóteses e resumo/relatório completo; as quatro justificações explicam os erros concretos. Não promete que selecionar o resumo demonstra autoria independente de um relatório completo.

Aplicação delimitada de princípios de reporte a evidências concretas, compatível com o formato K3 dos exemplos oficiais B/D. Exigência baixa a média para K3, sobretudo pela explicitação dos factos e pelos dois erros simultâneos de o4; avaliação qualitativa, não calibração empírica.

Um treino profissional mais profundo pode pedir construir um relatório completo a partir de evidências brutas. Isso é um exercício adicional, não condição para invalidar automaticamente esta questão de exame de escolha múltipla.

## Limites e decisões pendentes

Os downloads Python dos quatro PDFs de exemplos devolveram HTTP 403. Os textos oficiais e rationales foram lidos com sucesso pela ferramenta web. A captura gráfica da página do log B falhou com cache miss; não se afirma inspeção da tabela gráfica nem resolução independente desse exemplo oficial. A comparação usa o tipo de tarefa e rationale oficiais. Não foram incluídos PDFs/extratos integrais no ZIP nem inventados hashes de downloads falhados.

Pendente: revisão académica humana de tl-078 e calibração de dificuldade se desejada. A recomendação AI não equivale a HUMAN_APPROVED. Possíveis melhorias futuras de precisão terminológica/discriminação são opcionais e não foram aplicadas. Nenhuma revisão `.11` é criada por documentação. Lote 4 não foi iniciado.

Os campos literais completos PT/EN estão em [question.json](question.json) e no ACADEMIC-REVIEW-SUMMARY.md do ZIP. O original e o proposto são idênticos. Resultados novos, falhas, avisos e verificações não executadas estão em verification.md.
