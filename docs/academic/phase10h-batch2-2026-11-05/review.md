# Fase 10H — Lote 2: revisão académica e decisão

**Resultado: 7 ACCEPT_AS_IS; 1 BLOCKED_HUMAN_DECISION (tl-038, adequação K3); 0 NEEDS_CORRECTION confirmado.** Nenhuma alteração ao conteúdo, chaves, versões ou implementação é justificada por esta revisão. A revisão de conteúdo continua `.10`; Production não é modificada. As classificações são da AI e não aprovação humana.

## Continuidade e aceite do Lote 1

O preflight confirmou branch develop, HEAD `c551cca958add939fee9a7b0e82d0734f5a2aa32`, os 18 ficheiros de origem do ZIP revisto e o banco atual completo exatamente iguais ao pacote SHA-256 `3830254c65518d296342bbbe3ced3b147a8e7e330a95fddbbd88f56f02bd4b2a`. O inventário de 33 alterações existentes coincide com o anterior; os 173 outros ficheiros tracked coincidem com os hashes do checkpoint original. Cada alteração existente foi preservada. Limite: o ZIP revisto não continha todos os ficheiros auxiliares do workspace; não se afirma que os continha.

Gabriel aceitou explicitamente tl-011 e tl-090 como product owner. O [registo novo e separado](../phase10h-batch1-2026-11-05/owner-acceptance-2026-11-05.json) fixa os hashes, versões e chaves aceites. Não reescreve datas/findings/records antigos nem inventa identidade, certificação ou revisão humana independente. OWNER_ACCEPTED não é HUMAN_APPROVED: o banco e o gate académico mantêm PENDING. O relato de avaliação independente provém da instrução do proprietário, sem prova de um SME humano independente.

Melhoria futura opcional tl-090: separar visualmente pré-condições e passos. Não implementada; a redação aceite fica exata.

## Método e fontes

Foi criada primeiro uma projeção cega dos oito enunciados/tabelas e alternativas em ordem embaralhada, sem chaves ou explicações. As soluções foram gravadas em blind-solutions.json antes da leitura das chaves/matriz detalhada nesta execução. É uma nova análise por AI, não independência humana nem garantia de ausência de conhecimento prévio da conversa. Todas coincidiram com as chaves publicadas.

Referência primária [CTFL v4.0.1 EN](https://istqb.org/wp-content/uploads/2024/11/ISTQB_CTFL_Syllabus_v4.0.1.pdf), comparação com [tradução oficial PT v4.0/v1.0](https://pstqb.pt/wp-content/uploads/2024/05/ISTQB_CTFL_Syllabus-v4.0-PT_v1.0.pdf). Páginas físicas base 1. As listas de LOs EN pp.14/38/47 e PT pp.15/41/52 confirmam os níveis indicados. A tradução PT não é apresentada como v4.0.1. PDFs locais identificados por hash; referências oficiais abertas novamente e secções relevantes lidas, sem incluir PDFs no pacote.

## tl-008 — ACCEPT_AS_IS

- LO/K: `FL-1.5.3` / `K2`; versão `4` preservada.
- Fonte: §1.5.3; EN pp.[14, 22, 23]; PT pp.[15, 25].
- Solução antes da chave: `['o1']` — A tester with a different perspective can challenge assumptions and detect different defects. Isolation, loss of shared quality responsibility and reduced domain expertise are not benefits.
- Chave publicada/proposta: `['o1']` / `['o1']`; nenhum bloqueio por alteração de chave.
- Decisão e razão: A resposta correta já explicita perspetivas e identificação de outros defeitos; as explicações dos distratores já distinguem colaboração, competência e responsabilidade. A explicação geral é breve, mas não falsa. Não se justifica mudar apenas para alongar o texto.
- Nível/dificuldade: K2: distinguir benefício principal de consequências negativas. Dificuldade baixa/média; não implica superioridade universal da independência.
- Ambiguidade previamente registada: Não tomar independência como superior em todos os contextos; o cenário pergunta o benefício principal.
- EN/PT: A opção correta preserva o conceito; a explicação geral Different backgrounds expose different assumptions/Experiências distintas revelam pressupostos diferentes é excessivamente abreviada para justificar main benefit.
- Opcional futuro: Expandir futuramente a explicação geral é editorial, não correção obrigatória.
- Aprovação humana: PENDING. Nenhum aceite do proprietário foi inferido para este item.

### Avaliação individual dos distratores

- `o2`: Perder responsabilidade dos developers é risco, não benefício pretendido.
- `o3`: Independência não substitui familiaridade e competências.
- `o4`: Isolamento/comunicação deficiente são desvantagens, não mecanismo desejado.

### Explicação e utilidade educativa

Foram lidas a explicação geral e as oito explicações de alternativa EN/PT. A resposta correta já explicita perspetivas e identificação de outros defeitos; as explicações dos distratores já distinguem colaboração, competência e responsabilidade. A explicação geral é breve, mas não falsa. Não se justifica mudar apenas para alongar o texto.

## tl-020 — ACCEPT_AS_IS

- LO/K: `FL-4.3.1` / `K2`; versão `2` preservada.
- Fonte: §4.3.1; EN pp.[38, 42, 43]; PT pp.[41, 46, 47].
- Solução antes da chave: `['o1']` — All executable statements exercised means 100% statement coverage. A true-only run of if(x>0) y=1; print(y) executes all statements but misses the false outcome. Neither all paths nor correctness follows.
- Chave publicada/proposta: `['o1']` / `['o1']`; nenhum bloqueio por alteração de chave.
- Decisão e razão: A opção usa pode/may; 100% de instruções não promete 100% de ramos, caminhos ou correção funcional. A explicação geral e os três distratores são tecnicamente corretos. O contraexemplo sem else confirma a não implicação.
- Nível/dificuldade: K2: interpretar limites de uma medida de cobertura. Dificuldade baixa/média; uma bateria particular pode também cobrir todos os ramos, sem contrariar pode.
- Ambiguidade previamente registada: “pode omitir” não afirma que há obrigatoriamente ramos por cobrir. Contraexemplo: if(x>0) y=1; print(y), com x=1 executa ambas as instruções e deixa o resultado falso por exercitar.
- EN/PT: may/pode e all executable/todas executáveis preservam a limitação. Bateria significa suite; omitir ramos significa não exercitá-los.
- Opcional futuro: Acrescentar um contraexemplo pedagógico é opcional; não há defeito confirmado.
- Aprovação humana: PENDING. Nenhum aceite do proprietário foi inferido para este item.

### Avaliação individual dos distratores

- `o2`: Implica relação inversa inválida: ramos engloba instruções, não o contrário.
- `o3`: Cobrir instruções não cobre todas as sequências viáveis de decisões.
- `o4`: Execução não demonstra correção; faltam dados sensibilizadores e verificações adequadas.

### Explicação e utilidade educativa

Foram lidas a explicação geral e as oito explicações de alternativa EN/PT. A opção usa pode/may; 100% de instruções não promete 100% de ramos, caminhos ou correção funcional. A explicação geral e os três distratores são tecnicamente corretos. O contraexemplo sem else confirma a não implicação.

## tl-021 — ACCEPT_AS_IS

- LO/K: `FL-4.3.2` / `K2`; versão `2` preservada.
- Fonte: §4.3.2; EN pp.[38, 43]; PT pp.[41, 46, 47].
- Solução antes da chave: `['o1']` — The stated denominator is precisely two branches. One exercised divided by two equals 50%; no program-wide percentage is implied.
- Chave publicada/proposta: `['o1']` / `['o1']`; nenhum bloqueio por alteração de chave.
- Decisão e razão: O âmbito é explicitamente estes dois ramos: 1/2×100=50%. Não se está a calcular o grafo completo. Em o4, dividir por quatro usa duas vezes o denominador correto; a frase é pouco natural, mas não torna 25% defensável. Não se atribui uma causa psicológica comprovada ao aluno.
- Nível/dificuldade: K2 confirmado no LO oficial. Aritmética elementar é suporte à compreensão do conceito, não motivo para converter o item em K3. Dificuldade muito baixa.
- Ambiguidade previamente registada: CTFL inclui transferências condicionais e incondicionais. Não generalizar 50% para grafo/programa completo sem o conhecer. Não há denominador zero neste cenário.
- EN/PT: for these two branches/destes dois ramos preserva denominador e âmbito. Valores percentuais são idênticos.
- Opcional futuro: Uma redação neutra de o4 e explicação com percentagem explícita podem melhorar estilo, sem necessidade de mudança neste lote.
- Aprovação humana: PENDING. Nenhum aceite do proprietário foi inferido para este item.

### Avaliação individual dos distratores

- `o2`: 100% exigiria exercitar também o ramo falso.
- `o3`: 0% ignoraria o ramo verdadeiro executado.
- `o4`: 25% usa denominador quatro sem suporte no cenário. A explicação atual atribui uma estratégia mental ao candidato sem evidência.

### Explicação e utilidade educativa

Foram lidas a explicação geral e as oito explicações de alternativa EN/PT. O âmbito é explicitamente estes dois ramos: 1/2×100=50%. Não se está a calcular o grafo completo. Em o4, dividir por quatro usa duas vezes o denominador correto; a frase é pouco natural, mas não torna 25% defensável. Não se atribui uma causa psicológica comprovada ao aluno.

## tl-035 — ACCEPT_AS_IS

- LO/K: `FL-5.4.1` / `K2`; versão `3` preservada.
- Fonte: §5.4; EN pp.[47, 56]; PT pp.[52, 62].
- Solução antes da chave: `['o1']` — Versioned build, testware and data preserve the observed configuration. Latest-data/latest-build substitutions or omission of test versions weaken reproducibility; this supports rather than guarantees reproducing a failure.
- Chave publicada/proposta: `['o1']` / `['o1']`; nenhum bloqueio por alteração de chave.
- Decisão e razão: A pergunta pede melhor suporte à configuração observada e a explicação diz supports/apoia, não garante reprodução. Build, testes e dados versionados são a melhor opção. Ambiente/dependências podem também ser relevantes, mas o1 não os proíbe e as restantes opções destroem ou omitem evidência.
- Nível/dificuldade: K2: exemplificar o contributo da gestão de configuração. Dificuldade baixa/média. Software em PT é ligeiramente mais amplo que build, sem alterar a decisão.
- Ambiguidade previamente registada: Preservar estes três elementos ajuda, não garante reprodução de fatores externos/ambiente; o item pede melhor suporte, não suficiência universal. A explicação não deve prometer determinismo.
- EN/PT: build 82/versão 82 equivalente; “versions of build” traduzido por versões do software é menos preciso mas não muda escolha. only/apenas refere cenário observado.
- Opcional futuro: Adicionar ressalvas sobre fatores externos e ambiente é opcional; não prometer determinismo.
- Aprovação humana: PENDING. Nenhum aceite do proprietário foi inferido para este item.

### Avaliação individual dos distratores

- `o2`: Sobrescrever dados pode perder condições de C.
- `o3`: Sem versão dos testes, baseline fica incompleta: passos/oráculos podem ter mudado.
- `o4`: Build atual não reproduz necessariamente build 82; serve outro propósito.

### Explicação e utilidade educativa

Foram lidas a explicação geral e as oito explicações de alternativa EN/PT. A pergunta pede melhor suporte à configuração observada e a explicação diz supports/apoia, não garante reprodução. Build, testes e dados versionados são a melhor opção. Ambiente/dependências podem também ser relevantes, mas o1 não os proíbe e as restantes opções destroem ou omitem evidência.

## tl-038 — BLOCKED_HUMAN_DECISION

- LO/K: `FL-5.5.1` / `K3`; versão `3` preservada.
- Fonte: §5.5; EN pp.[47, 56, 57]; PT pp.[52, 62, 63].
- Solução antes da chave: `['o1']` — Preserve QA/build82, authorised user, INV-7/25, Save, expected201+ID, observed500+noinvoice, and r17. o2 reverses results; o3 changes environment/build; o4 asserts an unsupported deadlock cause. These are reproduction fields rather than every field in a full defect report.
- Chave publicada/proposta: `['o1']` / `['o1']`; nenhum bloqueio por alteração de chave.
- Decisão e razão: O núcleo factual e a chave o1 são defensáveis e únicos. Porém, o item apenas solicita selecionar a transcrição fiel de factos já fornecidos, enquanto FL-5.5.1 requer preparar um relatório. O syllabus confirma K3, mas não prova que esta tarefa específica exija aplicação suficiente em vez de reconhecimento. Manter conteúdo/chave/LO e pedir decisão académica humana sobre a exigência cognitiva; não inventar campos nem reclassificar automaticamente.
- Nível/dificuldade: K3 é o nível oficial do LO; a adequação deste item ao nível permanece por decidir. Dificuldade baixa para K3. Resumo de reprodução não demonstra preparação independente de relatório completo.
- Ambiguidade previamente registada: o1 é resumo correto, não relatório completo: não inclui todos os campos típicos (título, severidade, prioridade etc.). Enunciado pede registo fiel da evidência disponível, não preencher campos ausentes. Não inferir causa de HTTP500.
- EN/PT: authorised/autorizado, synthetic/sintética, expected/esperado e actual/obtido preservados. HTTP e identificadores literais mantidos.
- Opcional futuro: O revisor deve decidir: manter o item como treino limitado de aplicação, ou autorizar futuro redesenho que exija preparar campos. Não é proposta de alteração da chave.
- Aprovação humana: PENDING. Nenhum aceite do proprietário foi inferido para este item.

### Avaliação individual dos distratores

- `o2`: Troca esperado 201/ID com observado 500/sem gravação.
- `o3`: Inventa ambiente Production e build 81 contra QA/build82.
- `o4`: HTTP500 e log r17 não confirmam deadlock; diagnóstico não estabelecido.

### Explicação e utilidade educativa

Foram lidas a explicação geral e as oito explicações de alternativa EN/PT. O núcleo factual e a chave o1 são defensáveis e únicos. Porém, o item apenas solicita selecionar a transcrição fiel de factos já fornecidos, enquanto FL-5.5.1 requer preparar um relatório. O syllabus confirma K3, mas não prova que esta tarefa específica exija aplicação suficiente em vez de reconhecimento. Manter conteúdo/chave/LO e pedir decisão académica humana sobre a exigência cognitiva; não inventar campos nem reclassificar automaticamente.

## tl-063 — ACCEPT_AS_IS

- LO/K: `FL-5.2.1` / `K1`; versão `1` preservada.
- Fonte: §5.2.1;5.2.3; EN pp.[47, 52, 53]; PT pp.[52, 57, 58, 59].
- Solução antes da chave: `['o1']` — Risk level depends on likelihood and impact together. Quantitative multiplication is an available method, not a universal rule for ordinal labels; test counts or either factor alone do not define the level.
- Chave publicada/proposta: `['o1']` / `['o1']`; nenhum bloqueio por alteração de chave.
- Decisão e razão: A opção diz pode/can e a explicação admite abordagem quantitativa e matriz qualitativa. Atributos probabilidade/impacto estão corretos; não se exige multiplicação de categorias ordinais nem cálculo numérico. Todos os distratores ignoram um atributo ou confundem nível com alocação de testes.
- Nível/dificuldade: K1: reconhecimento dos atributos e relação; o cenário não exige cálculo. Dificuldade baixa.
- Ambiguidade previamente registada: Não multiplicar categorias ordinais como se fossem probabilidades calibradas; o item reconhece abordagem quantitativa sem números. Matriz qualitativa explicitamente admitida.
- EN/PT: likelihood/probabilidade e harm/danos/impacto equivalentes; “can/pode” evita obrigar multiplicação em toda escala.
- Opcional futuro: Retirar a frase metapedagógica Este item K1 seria editorial; não altera a exatidão técnica e fica opcional.
- Aprovação humana: PENDING. Nenhum aceite do proprietário foi inferido para este item.

### Avaliação individual dos distratores

- `o2`: Impacto afeta nível, não só público do relatório.
- `o3`: Probabilidade importa antes da ocorrência, não só depois.
- `o4`: Quantidade de testes responde ao risco, não o define.

### Explicação e utilidade educativa

Foram lidas a explicação geral e as oito explicações de alternativa EN/PT. A opção diz pode/can e a explicação admite abordagem quantitativa e matriz qualitativa. Atributos probabilidade/impacto estão corretos; não se exige multiplicação de categorias ordinais nem cálculo numérico. Todos os distratores ignoram um atributo ou confundem nível com alocação de testes.

## tl-064 — ACCEPT_AS_IS

- LO/K: `FL-5.2.4` / `K2`; versão `1` preservada.
- Fonte: §5.2.4; EN pp.[47, 53]; PT pp.[52, 59].
- Solução antes da chave: `['o3']` — Product risk control includes monitoring mitigation effectiveness and residual/new risks, particularly with a technology change. Scheduling alone cannot close risk; counts cannot replace assessment; emailing results alone does not transfer responsibility.
- Chave publicada/proposta: `['o3']` / `['o3']`; nenhum bloqueio por alteração de chave.
- Decisão e razão: O cenário pede ação adicional: o3 acrescenta monitorização de eficácia, residual e riscos novos. A explicação expressa continuidade e alteração da resposta. Completes/completa pode soar terminal isoladamente, mas o próprio contexto e a resposta afastam encerramento definitivo; não é erro técnico confirmado.
- Nível/dificuldade: K2: distinguir mitigação e monitorização. Dificuldade média. Qualquer leitura de encerramento definitivo contradiz a explicação e o distrator o1.
- Ambiguidade previamente registada: “completes control” significa incluir monitorização que falta, não terminar atividade contínua nem eliminar risco. A explicação geral reforça reavaliação.
- EN/PT: further action/ação adicional, residual risk/risco residual e emerging risks/riscos emergentes preservados; upload traduzido como dados carregados sem mudar cenário.
- Opcional futuro: Preferir complements/complementa é melhoria editorial futura; não alterar automaticamente a redação.
- Aprovação humana: PENDING. Nenhum aceite do proprietário foi inferido para este item.

### Avaliação individual dos distratores

- `o1`: Agendar testes não prova mitigação eficaz nem encerra risco.
- `o2`: Contagem de execução é atividade, não substitui avaliação residual.
- `o4`: Enviar resultados sem acordo não transfere responsabilidade nem substitui monitorização.

### Explicação e utilidade educativa

Foram lidas a explicação geral e as oito explicações de alternativa EN/PT. O cenário pede ação adicional: o3 acrescenta monitorização de eficácia, residual e riscos novos. A explicação expressa continuidade e alteração da resposta. Completes/completa pode soar terminal isoladamente, mas o próprio contexto e a resposta afastam encerramento definitivo; não é erro técnico confirmado.

## tl-072 — ACCEPT_AS_IS

- LO/K: `FL-4.2.3` / `K3`; versão `1` preservada.
- Fonte: §4.2.3; EN pp.[38, 41]; PT pp.[41, 44, 45].
- Solução antes da chave: `['o1']` — Existing R1/R3 leave R2=(T,T,F) and R4=(F,any,any). Only o1 covers both. o2 repeatsR1+R4, o3 repeatsR3+R2, o4 coversR4twice; each wrong option reaches only3of4 rules. The four minimized columns collectively partition all8 Boolean combinations.
- Chave publicada/proposta: `['o1']` / `['o1']`; nenhum bloqueio por alteração de chave.
- Decisão e razão: As regras minimizadas são disjuntas e cobrem 1+1+2+4=8 combinações. Cobertura é de quatro colunas viáveis, não oito entradas. Faltam R2/R4; só o1 cobre ambas. T/F e travessão estão definidos nos dois idiomas; X e branco seguem a notação oficial e não são necessários para decidir quais colunas faltam.
- Nível/dificuldade: K3: aplicar tabela e cobertura adicional. Dificuldade média/alta. T em PT é explicitamente definido como verdadeiro; não confundir irrelevante com falso ou inviável.
- Ambiguidade previamente registada: Tabela tem quatro regras, não oito regras; – não representa condição falsa nem combinação inviável. X e brancos de ação seguem notação da fonte, embora só –/T/F sejam definidos no enunciado.
- EN/PT: B/O/E, T/F e – definidos nos dois enunciados. Headers/ações bilingues Request key/Pedir chave, Restore/Recuperar, Hold/Suspender e External recovery/Recuperação externa equivalentes.
- Opcional futuro: Uma legenda X/branco melhora autonomia editorial, mas a sua ausência não impede a tarefa pedida nem exige corrigir condições, ações ou chave.
- Aprovação humana: PENDING. Nenhum aceite do proprietário foi inferido para este item.

### Avaliação individual dos distratores

- `o2`: (T,T,T)=R1 repetida, (F,F,F)=R4; falta R2.
- `o3`: (T,F,F)=R3 repetida, (T,T,F)=R2; falta R4.
- `o4`: Ambas B=F pertencem a R4, O/E irrelevantes; falta R2.

### Explicação e utilidade educativa

Foram lidas a explicação geral e as oito explicações de alternativa EN/PT. As regras minimizadas são disjuntas e cobrem 1+1+2+4=8 combinações. Cobertura é de quatro colunas viáveis, não oito entradas. Faltam R2/R4; só o1 cobre ambas. T/F e travessão estão definidos nos dois idiomas; X e branco seguem a notação oficial e não são necessários para decidir quais colunas faltam.

## Decisões pendentes e próximo passo

Gabriel/revisor académico deve decidir a suficiência cognitiva K3 de tl-038 antes de o considerar academicamente aprovado. Não se propõe nova chave nem se confunde esta pendência com defeito técnico de Production. As outras sete recomendações ACCEPT_AS_IS também aguardam aprovação académica humana. O aceite do proprietário do Lote 1 não se estende a estas oito ou às restantes 80 perguntas do programa de lotes.

Nenhuma correção foi implementada: não criar revisão `.11`, não alterar wording apenas por preferência e não acrescentar migrações desnecessárias. O próximo lote ainda não foi iniciado. Referências históricas e alterações do Lote 1 permanecem intactas. Consultar verification.md e o pacote em Downloads para evidência técnica nova e comparações textuais exatas.
