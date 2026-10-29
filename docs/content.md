# Conteúdo, referências e regras

Na fase 1 não existiam PDFs no projeto e foram consultadas páginas oficiais públicas. Na fase 2 foram encontrados 18 PDFs em `docs/Certified Tester Foundation Level (CTFL) v4.0`. O [inventário, versões, páginas efetivamente consultadas e auditoria individual](academic-audit.md) constituem o registo atual. Os PDFs e extrações estão excluídos do Git e não são distribuídos na aplicação.

## Referências consultadas

- [Página CTFL oficial](https://istqb.org/certifications/certified-tester-foundation-level-ctfl-v4-0/): estrutura, ligações e regras gerais.
- [Syllabus CTFL 4.0.1](https://istqb.org/?download_id=3345&sdm_process_download=1), 15-09-2024: objetivos e níveis cognitivos; conceitos usados como referência. Copyright ISTQB® e autores identificados no documento. O banco não reproduz questões oficiais.
- [PSTQB Foundation 4.0](https://pstqb.pt/foundation-level-v4/) e [syllabus português v1.0](https://pstqb.pt/wp-content/uploads/2024/05/ISTQB_CTFL_Syllabus-v4.0-PT_v1.0.pdf): consulta de terminologia. Não constitui revisão humana das nossas traduções.
- [Exam Structures & Rules v1.2](https://istqb.org/?download_id=3829&sdm_process_download=1): documento localizado e aberto; não se afirma uma auditoria integral de todas as regras.
- [Exam Structures & Rules Tables v1.19](https://istqb.org/?download_id=3832&sdm_process_download=1), 19-08-2026, páginas 3–5: totais de perguntas, duração e distribuição por capítulo e K-level.
- [Repositório de inspiração funcional](https://github.com/glaucodasilva/Simulador-CTFL-Foundation-4.0): apenas descrição/estrutura pública consultada. Nenhum código ou banco foi incorporado.

Na fase 2 foram consultados, por amostragem, os exames oficiais A–D e respetivas respostas, bem como o exame português, para avaliar estilo, terminologia e exigência. Não foram copiados para o banco. Não foram consultadas APIs privadas/ExamUnit. A revisão por IA não equivale a aprovação humana independente.

## Banco atual e exames selecionados

O banco tem **90 questões originais** e cobre nominalmente **todos os 64 LO examináveis** do syllabus 4.0.1. A fase 4 acrescentou tl-048–tl-066, uma por cada um dos 19 LO anteriormente sem pergunta; os 47 itens anteriores foram preservados nessa fase. A manutenção .5 aplica apenas cinco correções bilingues, descritas na [auditoria da fase 4.1](academic-audit.md#fase-41--correções-bilingues-controladas). Todas as 90 perguntas e traduções têm revisão por IA e **aprovação humana pendente**, sem calibração psicométrica. A lista de fontes, IDs, LO, níveis, chaves e revisão de todas as alternativas está na [auditoria académica](academic-audit.md#fase-4--cobertura-completa-do-syllabus).

| Capítulo |  Banco | LO cobertos | Cada exame |
| -------- | -----: | ----------: | ---------: |
| 1        |     16 |          14 |          8 |
| 2        |     13 |          10 |          6 |
| 3        |      9 |           8 |          4 |
| 4        |     24 |          14 |         11 |
| 5        |     24 |          16 |          9 |
| 6        |      4 |           2 |          2 |
| Total    | **90** |      **64** |     **40** |

O banco tem K1=18/K2=50/K3=22. Cada exame mantém **40 perguntas**, **K1=8/K2=24/K3=8**, capítulos **8/6/4/11/9/2** e as quotas/diversidade dos **29 grupos** v1.19. Sem repetição de IDs nem preenchimento silencioso de grupos em falta. Cobrir 64 LO no banco não exige nem permite incluí-los todos numa tentativa de 40. As novas perguntas elegíveis participam no seletor existente. O estudo por tópico não tem quotas e suporta as 90 perguntas, incluindo retoma para além da posição 40.

Regras mantidas: 40 pontos, limiar 26, 60/75 minutos; sem penalização por erro nem crédito parcial em seleção múltipla. tl-046/tl-047 são BVA de três valores; apenas um candidato FL-4.2.2 entra em cada exame devido à diversidade exigida, mas ambos podem ser estudados. Fontes e resultados exatos da verificação de 1 000 seeds e regressão estão na [atualização do blueprint](blueprint-validation.md#fase-5a--variedade-quantificada).

Revisão atual **2026-10-27.9**. As revisões .1–.8 mantêm conteúdo, ordem, respostas, tempos e pontuação originais, sem migração de tentativas. Os arquivos são protegidos por SHA-256; a prática histórica .3 mantém 47 perguntas. A fase 6C corrigiu apenas três itens e produziu .8; a fase 7 acrescentou tl-083–tl-090, preservando integralmente os 82 objetos da .8. A [auditoria atual](academic-audit.md#fase-7--avaliação-avançada-8--9) regista fontes, cálculos, traduções e limitações.

Há 86 perguntas de quatro alternativas e quatro de cinco (083/084/085/089). As perguntas 001/083/084/085 exigem exatamente duas respostas, sem crédito parcial; não há quota obrigatória de formato. As restantes exigem uma resposta. Não há ID individual obrigatório em todos os simulados; as [frequências e verificação atual](blueprint-validation.md#fases-6c7--validação-final) quantificam a variedade. Cobertura nominal de 64 LO não demonstra domínio de todos os aspetos nem dificuldade equivalente à certificação.

**Software validado, revisão por IA, aprovação humana e calibração de dificuldade são estados separados.** A aprovação humana continua PENDING em todos os itens. Não há endosso oficial nem calibração psicométrica. Os relatórios anteriores permanecem como histórico.

## Contribuir ou importar conteúdo

O tipo `Question`, `questionSchema` e `validateBank` são o ponto de entrada de conteúdo estruturado. Não há carregamento de ficheiros na interface nesta versão. Antes de incluir material autorizado, verificar licença, proveniência e âmbito da autorização. Não incluir PDFs, logótipos ou conjuntos oficiais por defeito.

Checklist manual para **cada** questão e tradução:

- Confirmar conceito, LO e K-level no syllabus da versão indicada.
- Resolver a questão sem consultar a solução; verificar se há uma única solução ou conjunto exato solicitado.
- Verificar dados suficientes, fronteiras, unidades e cálculos de forma independente.
- Garantir aplicação prática em K3 e distratores plausíveis, sem pistas gramaticais.
- Rever explicação correta e justificação individual de cada alternativa.
- Rever PT-PT e inglês lado a lado; preservar distinções técnicas e número de escolhas.
- Verificar tabelas, leitura por teclado e apresentação no telemóvel.
- Registar revisor, data, evidência e decisão. O estado `AI_REVIEWED` é separado de `humanApproval: PENDING`; nunca marcar `HUMAN_APPROVED` sem revisão humana efetiva e identificada.
- Incrementar versão do conteúdo e `CONTENT_REVISION` quando se alteram significado/soluções; arquivar o banco anterior e atualizar o resolvedor de revisões para preservar tentativas. Executar todos os checks.

A validação automática verifica estrutura, unicidade, cardinalidade, referências a opções e quotas. Não prova correção académica, naturalidade da tradução ou adequação psicométrica.
