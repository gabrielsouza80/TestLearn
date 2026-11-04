# Phase 10H — inventário completo e revisão académica por IA de 90 itens

Data: 04-11-2026. Base: `dc94e6b1800ff345f387a30d8c5c7f16d84a761d`, conteúdo `2026-10-27.9`.

Trabalho local autorizado de revisão e preparação experimental. **10G continua BLOCKED**; iniciar estes documentos não satisfaz o gate de release nem declara 10H/10I concluídas. Nenhuma pergunta do banco foi alterada. Revisão por Codex/IA, sem decisão humana documentada e sem acreditação ISTQB/PSTQB.

## Entregáveis e leitura

- [Matriz auditável de 90 itens](review-matrix.json): ID, hash do item completo, LO/K, capítulo/secção, referência declarada, chave/texto correto, justificação atual EN/PT, inventário de alternativas/explicações, assessment e referências verificadas por item. A chave é um conjunto de IDs estáveis, não letras visuais baralhadas.
- [Registo das fontes](sources.json): versão observada, SHA-256, páginas realmente consultadas, URL oficial e limites de uso. PDFs, extrações e renders ficam fora do Git.
- [Piloto original de 10 questões](../../experiments/advanced-interpretation/pilot-v1.json) e [especificação de treino](../../experiments/advanced-interpretation/spec.md).
- Verificação reproduzível: `node scripts/check-academic-deliverables.mjs`.

## Progresso mensurável — estado atual após lote 7

| Medida                                               |   Resultado cumulativo |
| ---------------------------------------------------- | ---------------------: |
| IDs inventariados e revistos por IA                  | 90 (`tl-001`–`tl-090`) |
| Alternativas com texto e explicação EN/PT examinadas |                    364 |
| LO distintos mapeados                                |                     64 |
| `AI_REVIEWED_PENDING_HUMAN`                          |                     88 |
| `NEEDS_FIX`                                          | 2 (`tl-011`, `tl-090`) |
| `NOT_REVIEWED`                                       |                      0 |
| `HUMAN_APPROVED`                                     |                      0 |
| Itens com severidade editorial NONE / LOW / MEDIUM   |            55 / 33 / 2 |

**Revisão por IA: 90/90 (100%). Aprovação humana: 0/90.** Os 62 itens pendentes no checkpoint anterior foram revistos em cinco lotes de 12, 12, 12, 13 e 13. As 28 avaliações anteriores foram preservadas integralmente, incluindo estados e achados. Os resultados não constituem conclusão do gate de release nem aprovação académica humana.

Lote 1: `tl-001`–`tl-012`, `tl-025`, `tl-026`, `tl-036`, `tl-037`. Foram examinadas as versões atuais de enunciado, todas as alternativas e explicações EN/PT, a chave, a cardinalidade e a correspondência conceptual às secções indicadas. Os quatro K3 incluem rederivações e valores intermédios. **Não são resoluções cegas**: a exportação inicial expôs as chaves. Uma resolução humana cega, antes de consultar o pacote de respostas, continua pendente.

Todas as 90 linhas têm agora assessment individual e referências verificadas; a referência histórica declarada pelo banco continua identificada separadamente. As antigas flags `PASS` não foram usadas como substituto da revisão. Avaliações de dificuldade continuam a ser estimativas editoriais; não há calibração psicométrica nem equivalência demonstrada com a prova oficial.

## Achados

**Médio — H-001, tl-011:** EN usa “unaffected payment flows”, PT usa “fluxos de pagamento não alterados”. Não modificado não significa não afetado. Além disso, a explicação geral limita regressão a outras áreas, quando o syllabus EN 4.0.1, secção 2.2.3, pp.30–31, também inclui o mesmo componente, outros sistemas e ambiente. Proposta documentada na matriz: explicitar implementação não alterada e ampliar a explicação. Chave atual/proposta `o1`; não foi aplicada correção. Estado `NEEDS_FIX` porque é necessário decidir uma redação coerente antes de aprovar academicamente.

**Baixo — H-002, tl-001:** distratores com garantias absolutas tornam o item simples por eliminação. Não tornam a chave incorreta. Eventual reescrita exige reavaliação de todas as opções e cardinalidade dois.

**Baixo — H-003, tl-006/tl-008:** explicações gerais corretas mas abreviadas; propostas de enriquecimento registadas individualmente. Não foi identificado erro de chave nestes itens.

**Informativo — H-004, fontes:** tabela atual ISTQB v1.20 (25-10-2026), em vez da v1.19 histórica. Syllabus EN 4.0.1 local coincide por SHA-256 com download oficial atual. A tradução PT 4.0 não deve prevalecer sobre o erratum inglês: em debugging, PT p.17 refere causa raiz onde EN p.16 descreve identificação do defeito. Não se alterou a referência histórica nem se certificou toda a distribuição do gerador.

**Limitação transversal:** 90/90 aguardam decisão humana nesta revisão; a aprovação anterior por IA não substitui essa decisão. Não foram identificados problemas críticos ou altos na revisão por IA dos 90 itens. Isso não elimina a necessidade de revisão humana independente, nem demonstra ausência de outros problemas.

## Decisões humanas e continuação

1. Revisor CTFL humano: resolver `tl-011` e `tl-090`, aprovar/rejeitar as outras 88 avaliações e verificar as traduções. Registar identidade, data, revisão/hash exatos, decisão, fundamento e evidência num registo real; nunca preencher automaticamente `HUMAN_APPROVED`.
2. Lote 2 concluído por IA: `tl-013`–`tl-024`, incluindo todas as 48 alternativas e 96 explicações de alternativas EN/PT, mais os 12 enunciados e explicações gerais bilingues. As secções efetivas vão de §2.1.5 a §4.5.2; não se presumiu que todos os IDs pertenciam às secções sugeridas no lote anterior.
3. Lotes 3–7 concluídos por IA: `tl-027`–`tl-035`, `tl-038`–`tl-090`. Não restam IDs sem revisão individual. Uma auditoria sistemática de duplicação entre todos os pares do banco e a calibração psicométrica continuam por fazer; não confundir isso com a revisão de unicidade das alternativas de cada item, que foi realizada.
4. O piloto é apenas um candidato editorial bilingue. Rever originalidade, resposta única, nível de leitura, tempos e equivalência EN/PT com humanos antes de qualquer experiência na aplicação. Não gerar um simulado de 40 itens repetindo estas 10 perguntas.

## Integridade e limites técnicos

Todos os originais, chaves, scoring, armazenamento e arquivos `.1`–`.8` permanecem intactos; a revisão `.9` continua a ser resolvida pelo banco atual, não por um arquivo `.9` inventado. `review-matrix.json` é um registo externo, não os metadados runtime de aprovação. O comportamento atual de `isExamEligible` aceita `humanApproval: PENDING`; não usar esse campo para tentar isolar novos candidatos.

O piloto fica em `docs/experiments/`, com namespace próprio, `examEligible:false` e sem importações runtime. A `.vercelignore` existente exclui `docs`; os guards de release só permitem os assets da aplicação. Nenhuma interface, migração, serviço pago ou workflow foi acrescentado. Os checks mecânicos verificam integridade e estrutura; **não provam verdade académica, qualidade de distratores, ausência de ambiguidade ou aprovação humana**.

## Verificação local da execução anterior (histórica)

| Comando/verificação                                                                                                                                                         | Resultado                                                                                                            |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `node scripts/check-academic-deliverables.mjs`                                                                                                                              | 90 IDs/364 alternativas/64 LO; 16 assessments; 10 candidatos/40 alternativas; nove corrupções deliberadas rejeitadas |
| `npm test`                                                                                                                                                                  | 27 ficheiros, 228 testes aprovados                                                                                   |
| `node --test scripts/check-release.test.mjs scripts/check-retained-assets.test.mjs scripts/check-live-asset-retention.test.mjs scripts/check-retained-append-only.test.mjs` | 71 aprovados, zero falhas/cancelamentos/skips                                                                        |
| `npm run lint`, `npm run typecheck`, `npm run format:check`                                                                                                                 | Aprovados                                                                                                            |
| `npm run build`                                                                                                                                                             | Aprovado; nenhum código runtime alterado                                                                             |
| `node scripts/check-release.mjs`                                                                                                                                            | 15 ficheiros permitidos, oito chunks históricos, zero assets privados/source maps                                    |
| `node scripts/check-retained-assets.mjs`                                                                                                                                    | Dois assets retidos, hashes verificados, 1 405 541 bytes                                                             |
| Pesquisa no `dist` por IDs do piloto e nomes destes documentos                                                                                                              | Nenhuma ocorrência                                                                                                   |
| Diff desde a base em `src`, `public`, `config`, `tests`, `.github`, dependências e configurações                                                                            | Nenhuma alteração                                                                                                    |
| `git diff --check` e índice                                                                                                                                                 | Sem erros; nada staged                                                                                               |

Vitest e build foram inicialmente impedidos pelo sandbox de escrever a configuração temporária no `node_modules` partilhado (EPERM); foram repetidos com sucesso fora do sandbox. Os avisos do build sobre anotações de Zod e tamanho do chunk principal persistem; não foram tratados como falhas nem corrigidos fora do âmbito.

Não foram repetidos E2E nesta árvore documental: os 364 E2E do Quality da base são evidência anterior, não uma nova execução desta sessão. Não foi feita nova consulta funcional a Production. O checkout original ficou limpo; `main` e a referência local `origin/main` continuam em `abf15ed5376e8b34a86fc4f873a65694b7705e34`. Não foram executados commit, push, PR, merge, deployment ou alterações remotas nesta tarefa.

## Lote 2 — evidência, limites e achados editoriais

Revisão por IA em 04-11-2026; 12 itens novos, sem revisão cega porque as chaves foram vistas. Cada linha da matriz contém a justificação de LO/K e chave, rejeição individual dos três distratores, equivalência EN/PT, ambiguidades, dificuldade estimada e proposta não aplicada. Nenhuma chave alternativa foi identificada como necessária neste lote. Nenhuma aprovação humana foi atribuída.

Autoridade técnica: [ISTQB CTFL v4.0.1](https://istqb.org/?download_id=3345&sdm_process_download=1), disponibilizado no [portal oficial CTFL v4.0](https://istqb.org/certifications/certified-tester-foundation-level-ctfl-v4-0/), consultado novamente nesta continuação. Referência PT: cópia local v4.0, tradução 1.0, com proveniência e limites no registo de fontes. Foram lidas as extrações das páginas abaixo; não se alega nova inspeção visual nem nova comparação de download/hash remoto. As conclusões são paráfrases editoriais, não transcrições do syllabus.

| Item   | LO / K        | Evidência EN / PT (páginas físicas) | Resultado e contexto principal                                                                                                         |
| ------ | ------------- | ----------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| tl-013 | FL-2.1.5 / K2 | §2.1.5: 27 / 29–30                  | Revisão antecipada é shift left; explicar que testes posteriores continuam necessários.                                                |
| tl-014 | FL-2.3.1 / K2 | §2.3: 31 / 33–34                    | Migração do ambiente é gatilho; não exigir conversão de dados em toda migração.                                                        |
| tl-015 | FL-3.1.1 / K1 | §3.1.1: 33 / 36                     | Requisito escrito é revisável; “measured latency” pode sugerir relatório já existente. Proposta de tornar o2 uma atividade de medição. |
| tl-016 | FL-3.2.3 / K1 | §3.2.3: 36 / 39                     | Moderador facilita; pessoas podem acumular papéis. Sem correção proposta.                                                              |
| tl-017 | FL-3.1.3 / K2 | §3.1.3: 34 / 37                     | Defeito nos requisitos versus falha observada; não inferir causalidade entre os achados.                                               |
| tl-018 | FL-3.2.4 / K2 | §3.2.4: 36–37 / 39–40               | Inspeção é a mais formal; métricas isoladas não bastam. Sem correção proposta.                                                         |
| tl-019 | FL-4.1.1 / K2 | §4.1: 39 / 42                       | Base especificada distingue caixa-preta; risco pode coexistir como orientação.                                                         |
| tl-020 | FL-4.3.1 / K2 | §§4.3.1–2: 42–43 / 46–47            | Instruções a 100% não implicam ramos nem correção; contraexemplo na matriz.                                                            |
| tl-021 | FL-4.3.2 / K2 | §4.3.2: 43 / 46–47                  | 1/2 × 100 = 50% apenas nos dois ramos indicados; programa completo inclui outros ramos, também incondicionais.                         |
| tl-022 | FL-4.4.1 / K2 | §4.4.1: 43–44 / 47–48               | Experiência de falhas semelhantes fundamenta antecipação; pode coexistir com BVA/exploração.                                           |
| tl-023 | FL-4.4.2 / K2 | §4.4.2: 44 / 48                     | Aprendizagem/conceção/execução/avaliação em sessão; carta e timebox não são universais à exploração.                                   |
| tl-024 | FL-4.5.2 / K2 | §4.5.2: 45–46 / 49–50               | o1 explicita contexto/ação/resultado; regras o2/o3 podem ser critérios válidos noutro pedido.                                          |

LO/K conferidos adicionalmente nas listas EN pp.24, 32 e 38 e no catálogo local. Os itens K2 013/018/019/021 são especialmente simples; isso limita profundidade pedagógica, não demonstra erro de classificação ou equivalência com dificuldade de exame. Não há calibração empírica.

**Baixo — H-005:** explicações abreviadas em tl-013/014/017/019/020/021/023/024; propostas individuais na matriz. Em tl-021, evitar atribuir ao candidato uma estratégia mental de dupla contagem: basta explicar o denominador sem suporte de 25%. Em tl-024, não ensinar que critérios orientados a regras são inválidos.

**Baixo — H-006:** tl-015 o2 admite leitura residual de uma medição documentada; propor uma atividade de medição explícita. tl-022 “dias bissextos” pode ser melhorado para “29 de fevereiro”. Não foi encontrada mudança de sentido suficiente para alterar a chave ou exigir NEEDS_FIX; confirmar com revisor humano.

## Registo de decisão humana — tl-011 (H-001)

Estado: **PENDING — proposta preparada por IA, sem decisão humana**. Item/revisão `tl-011` / `2026-10-27.9`; hash completo na linha da matriz. Abaixo reproduz-se o texto atual do banco TestLearn para permitir uma decisão concreta. Nenhuma redação foi aplicada.

### Texto atual

EN: “After fixing a discount defect, the team reruns its failing test and checks unaffected payment flows. What are these checks respectively?”

PT: “Após corrigir um defeito num desconto, a equipa repete o teste que falhou e verifica fluxos de pagamento não alterados. Que testes são, respetivamente?”

Opções EN / PT, pela identidade estável (a ordem visual pode variar):

- `o1`: Confirmation and regression / Confirmação e regressão — chave atual.
- `o2`: Regression and confirmation / Regressão e confirmação.
- `o3`: Both are confirmation testing / Ambos são testes de confirmação.
- `o4`: Both are regression testing / Ambos são testes de regressão.

Explicação geral atual, também usada em `o1`:

EN: “Confirmation verifies the fix; regression checks adverse effects elsewhere.”

PT: “A confirmação verifica a correção; a regressão procura efeitos adversos noutras áreas.”

### Correção proposta para decisão

Enunciado EN: “After fixing a discount defect, the team reruns the test that previously failed to verify the fix. It also tests payment flows whose implementation was not changed, to check for adverse effects of the fix. What are these checks respectively?”

Enunciado PT: “Após corrigir um defeito num desconto, a equipa repete o teste que falhou anteriormente para verificar a correção. Testa também fluxos de pagamento cuja implementação não foi alterada, para procurar efeitos adversos da correção. Que testes são, respetivamente?”

Explicação geral e `o1` EN: “The first check is confirmation testing: it verifies that the original defect was fixed. The second is regression testing: it checks for adverse consequences of the change. Regression can concern the changed component, other components, connected systems or the environment; unchanged implementation does not guarantee unaffected behavior.”

Explicação geral e `o1` PT: “A primeira verificação é teste de confirmação: verifica se o defeito original foi corrigido. A segunda é teste de regressão: procura consequências adversas da alteração. A regressão pode abranger o componente alterado, outros componentes, sistemas interligados ou o ambiente; uma implementação inalterada não garante comportamento não afetado.”

Proposta para explicação `o2`: EN “The order is reversed: the first check verifies the original fix; the second checks adverse consequences of the change.” / PT “A ordem está invertida: a primeira verificação verifica a correção original; a segunda procura consequências adversas da alteração.”

`o3` já explica corretamente a distinção; conservar após validar equivalência. Para `o4`, propor EN “The first check verifies that the original defect was fixed, so it is confirmation testing. The second checks for adverse consequences of the change, so it is regression testing.” / PT “A primeira verificação verifica se o defeito original foi corrigido, pelo que é teste de confirmação. A segunda procura consequências adversas da alteração, pelo que é teste de regressão.” Isto evita repetir a limitação “elsewhere/noutras áreas”. Os textos das quatro opções podem manter-se.

### Fundamentação e efeito na chave

[Syllabus EN §2.2.3, pp.30–31](https://istqb.org/?download_id=3345&sdm_process_download=1) e PT §2.2.3, p.33: confirmação verifica o defeito original; regressão procura consequências adversas, também no próprio componente e no ambiente. “Unaffected” já afirma ausência de efeito; “não alterados” afirma ausência de modificação direta. São proposições diferentes. O propósito explícito proposto remove essa assimetria sem pressupor o resultado da regressão.

A chave proposta continua **`[o1]`**, required=1. o2 inverte finalidades; o3 ignora a procura de consequências adversas; o4 ignora a verificação específica da correção original. Repetir testes, por si só, não distingue confirmação de regressão: o propósito é essencial. Não há fundamento para trocar a chave atual; há fundamento para corrigir a redação antes da aprovação académica. Uma futura alteração de conteúdo exigirá nova revisão/hash e regressão de conteúdo conforme o processo do projeto; esta tarefa não a executa.

| Campo de decisão humana                        | Valor                                              |
| ---------------------------------------------- | -------------------------------------------------- |
| Decisão (aceitar / rever / rejeitar proposta)  | Pendente                                           |
| Revisor humano e qualificação                  | Não fornecidos                                     |
| Data da decisão                                | Não fornecida                                      |
| Hash/revisão aprovados                         | Pendente; confirmar contra matriz antes de decidir |
| Fundamento / ressalvas do revisor              | Pendente                                           |
| Autorização de aplicação e validação posterior | Pendente; nenhuma aplicação nesta iteração         |

## Verificação histórica do lote 2 (checkpoint 28/90)

Os resultados da secção histórica não constituem nova execução. Os seis entregáveis originais foram preservados; apenas README, matriz e fontes recebem alterações nesta continuação. Piloto, especificação e checker mantêm os bytes anteriores, conferidos por SHA-256 antes/depois. Não foram geradas perguntas adicionais.

| Verificação fresca                                                                                                                                                          | Resultado                                                                                                                                                          |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `node scripts/check-academic-deliverables.mjs`                                                                                                                              | 90 itens, 364 alternativas, 64 LO; 28 revistos, 27 pendentes humanos, 1 NEEDS_FIX, 62 não revistos; nove corrupções rejeitadas; zero alterações runtime/históricas |
| `npm test`                                                                                                                                                                  | 27 ficheiros, 228 testes aprovados; primeira tentativa EPERM no temporário Vite do node_modules partilhado, repetição autorizada fora do sandbox aprovada          |
| `node --test scripts/check-release.test.mjs scripts/check-retained-assets.test.mjs scripts/check-live-asset-retention.test.mjs scripts/check-retained-append-only.test.mjs` | 71 aprovados, zero falhas, cancelamentos ou skips; testes locais com fixtures, sem consulta funcional a produção                                                   |
| `npm run format:check`                                                                                                                                                      | Todos os ficheiros verificados aprovados                                                                                                                           |
| `git diff --check`                                                                                                                                                          | Aprovado                                                                                                                                                           |

Não se repetiram build, lint, typecheck ou E2E nesta continuação documental; os resultados anteriores estão identificados como históricos. O checker verifica os hashes contra o banco carregado atualmente e protege `src`, `public`, configurações e testes contra mudanças desde a base. A sua aprovação mecânica não valida mérito académico. Permanecemos em `develop`, na base original, sem staging, commit, push, merge ou deployment.

Checkpoint histórico após lote 2: **28/90 (31,1%)** revistos por IA; **62/90** então por rever (`tl-027`–`tl-035`, `tl-038`–`tl-090`). Permanecem H-001 médio, H-002/H-003/H-005/H-006 baixos e H-004 informativo; zero aprovações humanas. As propostas editoriais permanecem externas ao banco e aguardam decisão.

## Lotes 3–7 — continuação sistemática

Executados sequencialmente em 04-11-2026. Cada lote foi gravado e passou em `node scripts/check-academic-deliverables.mjs` antes do lote seguinte. Foram examinados os 62 novos enunciados, 252 alternativas, 504 explicações de alternativas EN/PT e 62 explicações gerais bilingues. As tabelas auxiliares de decisão, estados, intervalos, esforço e evidência também foram examinadas. Nenhuma pergunta, alternativa, explicação publicada ou chave foi alterada.

| Lote | IDs novos                    | Quantidade | Cumulativo | Resultado estrutural                     |
| ---- | ---------------------------- | ---------: | ---------: | ---------------------------------------- |
| 3    | tl-027–tl-035; tl-038–tl-040 |         12 |      40/90 | PASS: 39 pendentes humanos + 1 NEEDS_FIX |
| 4    | tl-041–tl-052                |         12 |      52/90 | PASS: 51 pendentes humanos + 1 NEEDS_FIX |
| 5    | tl-053–tl-064                |         12 |      64/90 | PASS: 63 pendentes humanos + 1 NEEDS_FIX |
| 6    | tl-065–tl-077                |         13 |      77/90 | PASS: 76 pendentes humanos + 1 NEEDS_FIX |
| 7    | tl-078–tl-090                |         13 |      90/90 | PASS: 88 pendentes humanos + 2 NEEDS_FIX |

Cada linha da [matriz](review-matrix.json) contém LO/K, justificação de cada resposta correta, rejeição de cada distrator pelo seu ID, equivalência EN/PT, ambiguidade/contexto, dificuldade estimada, referência física à fonte e correção proposta não aplicada. Itens de resposta múltipla tl-083/tl-084/tl-085 foram verificados com cinco alternativas e exatamente duas corretas; tl-089 tem cinco alternativas e uma correta. A cardinalidade não foi inferida de letras ou posições visuais.

Autoridade técnica: [syllabus ISTQB CTFL v4.0.1](https://istqb.org/?download_id=3345&sdm_process_download=1), disponibilizado pelo [portal CTFL v4.0](https://istqb.org/certifications/certified-tester-foundation-level-ctfl-v4-0/) reconfirmado nesta execução. PT v4.0/tradução 1.0 foi usado para cotejo terminológico, sem o apresentar como erratum 4.0.1. A conferência textual local encontrou todos os pares LO/K das 90 linhas nas listas oficiais EN e PT; a adequação de cada cenário ao LO foi avaliada individualmente, não aprovada por essa pesquisa mecânica.

As cópias PDF locais EN/PT mantêm os SHA-256 do registo de fontes e as extrações usadas correspondem exatamente ao texto extraído novamente desses PDFs. Não houve novo download oficial nem inspeção visual de páginas nesta continuação. A proveniência da cópia PT mantém a limitação já declarada. Não foram incorporados PDFs/textos integrais oficiais nos entregáveis.

### Achados cumulativos adicionais

Os achados H-001–H-006 anteriores permanecem abertos e os respetivos assessments não foram reescritos.

**Médio — H-007, tl-090:** a tabela de evidência fornece a pré-condição `no T-91 / T-91 inexistente`. O melhor relatório proposto em o2 não a regista, embora a explicação afirme repor as pré-condições e a pergunta peça um relatório reproduzível. §5.5 EN pp.56–57 / PT pp.62–63 exige contexto e descrição suficientes para reprodução. Um T-91 preexistente pode afetar a execução, particularmente a interpretação de HTTP 409; isto é risco de reprodução, não diagnóstico da falha observada. Estado NEEDS_FIX, chave atual/proposta o2, decisão humana pendente; detalhes abaixo.

**Baixo — H-008, tl-047:** o cálculo é coerente com o recorte de vizinhos aos limites do domínio explicitado no exercício, mas §4.2.2 EN p.40 / PT pp.43–44 define fronteira e vizinhos sem enunciar esta convenção específica de recorte. Proposta: chamar-lhe cobertura de todos os itens exequíveis dentro do domínio definido, evitando universalizar “full three-value BVA”. Chave o1 mantém-se. tl-046 inclui todas as fronteiras finitas sem endpoints externos; tl-086 exclui endpoints explicitamente. As três convenções foram tratadas separadamente, sem normalização silenciosa.

**Baixo — H-009, profundidade de LO:** tl-027/028/029 são aplicações K3 simples; tl-038 e tl-078 selecionam relatórios já preparados e tl-090 repara um resumo. A adequação temática a FL-5.5.1 (prepare a defect report, EN p.47; PT p.52) é parcial quanto à produção autónoma. Não foi alterado o K publicado. Antes de afirmar domínio desse LO, pedir ao humano uma preparação independente, sem opções. Todos os 22 K3 do banco têm workedSolution na matriz; 18 foram acrescentados nesta continuação.

**Baixo — H-010, equivalência/legendas:** tl-041 delivery team/equipa de desenvolvimento pode estreitar composição da equipa; tl-073 “a shortest” deve ser “de comprimento mínimo”; tl-078 server race é mais preciso como “condição de corrida” que “concorrência”; tl-027/072/087 beneficiam de legenda X/branco autónoma; tl-087 pode localizar 62.5% para 62,5% em PT. §1.5.2 EN p.22/PT p.24; §4.2.4 EN pp.41–42/PT p.45; §5.5 EN pp.56–57/PT pp.62–63; §4.2.3 EN p.41/PT pp.44–45. Não se encontrou necessidade de alterar chaves por estas melhorias.

**Baixo — H-011, contexto pedagógico das explicações:** propostas individuais ampliam contexto em tl-030/032/035/040/044/055/064 e retiram comentários de construção do item ao aluno em tl-062/063/073. Destacam-se: não classificar quadrantes só pelo momento de execução; não prometer reprodução determinística só por preservar versões; não ensinar que aceitação de risco basta para todo critério de saída; não sugerir que controlo contínuo de risco fica definitivamente terminado. As evidências precisas estão nas linhas correspondentes da matriz.

As 33 linhas com severidade LOW não representam 33 falhas de gabarito; incluem melhorias opcionais de clareza, contexto ou dificuldade. Há duas linhas MEDIUM e 55 NONE. Não foi proposta troca de chave em nenhum item nesta revisão; isso é uma conclusão desta análise por IA, não certificação independente. Nenhum campo humanDecision foi preenchido.

## Registo de decisão humana — tl-090 (H-007)

Estado: **PENDING**, preparado por IA. Item/revisão `tl-090` / `2026-10-27.9`. Hash do item atual: `4cd336bf348f4c4611885be1c95f7fca8ea947a56c2bf356600a68ec5912ff1c`.

Evidência fornecida na tabela atual: `stock-clerk; SKU-4 stock 20; no T-91 / T-91 inexistente`; ação: criar rascunho T-91, SKU-4, quantidade 2, Confirmar uma vez; esperado pela regra: reduzir 20−2=18 e estado Confirmed; obtido: stock 20, Draft, HTTP 409. Anexos disponíveis req-b7 e shot-b7. A causa não está estabelecida.

Texto atual de o2 EN: “Steps: stock-clerk, SKU-4 stock 20, create draft T-91 quantity 2, Confirm once; expected: 18, Confirmed; actual: 20, Draft, HTTP 409; evidence: req-b7 + shot-b7; cause not established.”

Texto atual de o2 PT: “Passos: stock-clerk, SKU-4 com stock 20, criar rascunho T-91 com quantidade 2, Confirmar uma vez; esperado: 18, Confirmed; obtido: 20, Draft, HTTP 409; evidência: req-b7 + shot-b7; causa não estabelecida.”

Proposta concreta EN: “Preconditions: role stock-clerk, SKU-4 stock 20, no existing T-91. Steps: create draft T-91 for SKU-4, quantity 2; Confirm once. Expected: stock 18, Confirmed. Actual: stock 20, Draft, HTTP 409. Evidence: req-b7 + shot-b7; cause not established.”

Proposta concreta PT: “Pré-condições: papel stock-clerk, SKU-4 com stock 20, T-91 inexistente. Passos: criar rascunho T-91 para SKU-4, quantidade 2; Confirmar uma vez. Esperado: stock 18, Confirmed. Obtido: stock 20, Draft, HTTP 409. Evidência: req-b7 + shot-b7; causa não estabelecida.”

Conservar QA/inventory-3.8.1 conforme pedido. Se aprovada uma alteração futura, explicitar a mesma pré-condição nos distratores comparáveis para não transformar a sua mera presença numa pista da chave, preservando os equívocos de quantidade/ação/diagnóstico de cada um. Ajustar explicação geral e de o2 para enumerar a pré-condição reposta. Nenhum destes textos foi aplicado ao banco.

Implicação para a chave: o2 continua a melhor opção atual e a chave proposta. o1 inverte quantidades, o3 muda a ação observada para duas confirmações e o4 inventa um deadlock confirmado. A omissão partilhada não torna outro distrator correto, mas precisa de decisão quanto à suficiência de um resumo apresentado como reproduzível.

| Campo humano                                                            | Estado                                     |
| ----------------------------------------------------------------------- | ------------------------------------------ |
| Aceitar correção, rever proposta ou aceitar resumo atual com fundamento | Pendente                                   |
| Revisor/qualificação e data                                             | Não fornecidos                             |
| Revisão/hash exatos aprovados                                           | Pendente                                   |
| Fundamentação sobre suficiência de pré-condições                        | Pendente                                   |
| Autorização de aplicação e nova revisão após alteração                  | Pendente; nenhuma aplicação nesta iteração |

## Checklist humana priorizada

### Regressões sugeridas para as duas correções (preparação Phase 10I)

Nenhuma correção do banco foi autorizada ou aplicada. Para tl-011, a futura aprovação deve testar EN/PT da finalidade de cada verificação, chave exata `[o1]` com `required=1`, rejeição de o2/o3/o4, explicação de regressão no mesmo componente/outros componentes/sistemas/ambiente e ausência da pressuposição “unaffected”. Para tl-090, testar a pré-condição T-91 inexistente em ambas as línguas e em todas as opções comparáveis, esperado `20−2=18 / Confirmed`, observado `20 / Draft / HTTP 409`, uma confirmação/um POST, anexos req-b7/shot-b7, causa não estabelecida e chave exata `[o2]` com `required=1`. Em ambos: revisão/hash novos só após autorização, teste da avaliação sem alteração de pontuação e restauração das revisões históricas anteriores sem reescrever snapshots. As propostas atuais EN/PT e a fundamentação ISTQB permanecem nos registos de decisão acima e abaixo.

1. **P1 — resolver NEEDS_FIX:** decidir tl-011/H-001 (semântica de regressão EN/PT e âmbito da explicação) e tl-090/H-007 (pré-condição de reprodução). Usar os registos concretos acima; documentar revisor, data, hash/revisão, decisão e fundamento. As chaves propostas permanecem o1 e o2, respetivamente.
2. **P2 — resolução independente dos 22 K3:** resolver antes de abrir as chaves/soluções da matriz. Priorizar BVA tl-025/026/046/047/086, tabelas tl-027/072/087, estados tl-028/073/088, estimativa/priorização tl-036/037/076/077/089, ATDD tl-029/074 e relatórios tl-038/078/090. Confirmar domínio/recorte, denominadores, mínimos, restrições e oráculos; produzir um relatório livre para avaliar FL-5.5.1.
3. **P2 — resposta múltipla e equivalência:** confirmar todas as cinco alternativas e cardinalidade de tl-083/084/085; distinguir o caso de uma chave em cinco opções de tl-089. Rever EN/PT com foco em negações, inclusive/at least, mínimo/adicional, ordem, condições de disponibilidade e termos de domínio. Rever H-006/H-010 e diferenças da tradução PT face ao erratum EN.
4. **P3 — qualidade editorial:** decidir as melhorias opcionais de H-002/003/005/008/009/011 e as 33 linhas LOW. Avaliar plausibilidade dos distratores e pistas por absolutos, extensão ou múltiplos erros. Verificar profundidade real dos K1/K2/K3 simples; não promover dificuldade estimada a calibração de exame.
5. **P3 — aprovação rastreável:** avaliar os 90 itens individualmente. Nenhuma aprovação implícita por lote ou por testes mecânicos; registar HUMAN_APPROVED apenas mediante decisão humana documentada sobre conteúdo/hash exatos. Auditoria de duplicação entre itens e calibração psicométrica permanecem separadas e pendentes.
6. **Antes de qualquer uso experimental futuro:** manter os dez pilotos isolados e intactos enquanto aguardam revisão humana própria; este trabalho não autoriza novos itens, publicação, release ou expansão do piloto. Nenhuma alteração de banco proposta aqui foi executada.

## Verificação final dos lotes 3–7

| Verificação fresca                                                                                                                                                          | Resultado                                                                                                                                   |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| Checker estrutural após cada lote                                                                                                                                           | PASS em 40/52/64/77/90 revistos; nove corrupções deliberadas rejeitadas em cada execução                                                    |
| Banco carregado pelo checker                                                                                                                                                | 90 itens, 364 alternativas, 64 LO; hashes dos itens/opções e chaves atuais preservados; zero alterações runtime/históricas desde a base     |
| Preservação do checkpoint anterior                                                                                                                                          | As 28 linhas anteriormente revistas são estruturalmente idênticas às guardadas no início desta execução                                     |
| Piloto/spec/checker                                                                                                                                                         | SHA-256 antes/depois idênticos; os seis entregáveis continuam presentes                                                                     |
| Fontes e LO/K                                                                                                                                                               | SHA-256 EN/PT local confere; extrações textuais iguais às reextraídas; os 90 pares LO/K constam das listas oficiais EN/PT                   |
| Aritmética independente                                                                                                                                                     | Uniões/diferenças de BVA e estimativas de esforço das novas revisões conferidas por asserções temporárias, além das derivações documentadas |
| `npm test`                                                                                                                                                                  | 27 ficheiros, 228 testes aprovados; tentativa inicial EPERM no node_modules partilhado, repetição fora do sandbox aprovada                  |
| `node --test scripts/check-release.test.mjs scripts/check-retained-assets.test.mjs scripts/check-live-asset-retention.test.mjs scripts/check-retained-append-only.test.mjs` | 71 aprovados, zero falhas/cancelamentos/skips; testes locais/fixtures, sem consulta funcional a produção                                    |

`npm run format:check` e `git diff --check` passaram após a consolidação; o índice está vazio e `git status` confirma develop. O checker final voltou a confirmar 90/90 revistos, 88 pendentes humanos e dois NEEDS_FIX; a verificação de preservação e fontes também voltou a passar. Build, lint, typecheck e E2E não foram repetidos nesta execução documental; não se apresentam resultados históricos como novos. Os checks não aprovam conteúdo académico. Trabalho em develop, HEAD original, sem staging, criação de branch, commit, push, merge ou deploy. Nenhum próximo ID por rever: NOT_REVIEWED=0. Próximo trabalho é decisão humana, começando por tl-011 e tl-090.
