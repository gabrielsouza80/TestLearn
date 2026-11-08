# Fase10H Lote6 — verificação / Batch6 verification

Data/date2026-11-06. Workspace C:/TestLearn/tmp/develop-workspace. Branch develop. HEAD3fd0a85d95ecb79539515833ee3cbe7869c58049. Content revision2026-10-27.10.

## Preflight executado antes de criar documentos / Preflight before new documents

Git status completo:37documentos não rastreados dos Lotes2–5; nenhum diff tracked/staged. Batches1–5 presentes. O ZIP do Lote5 manteve SHA-2563362e5c849df18cfbaf453733ee4521cce59c5a2b5d69ddbb0c1d630a52277e9;92ficheiros/91hashes de payload eCRC válidos. Foram comparadas70cópias de origem do pacote,236hashes do snapshot anterior e o banco atual inteiro. O banco continha90IDs únicos e revisão.10. Nenhuma alteração concorrente detetada. Não houve consulta remota Git nem suposição de atualização de origin. / The local state matched the prior ZIP; no remote Git operation was used to infer freshness.

VERIFY-PACKAGE.py eREVIEW-ORACLES.py anteriores foram lidos antes de executar. Extração numa pasta temporária nova, caminhos seguros, verificador portátil PASS. Só depois se escreveram evidências locais e os novos documentos. O preflight contém SHA-256 de todos os251ficheiros preexistentes,37documentos pendentes, inventário Git e resultado do verificador anterior. / Prior package scripts were inspected before clean extraction and read-only execution.

## Execuções novas / Fresh executions

Shell commands use `rtk proxy`; the actual subprocess argv, timestampsUTC and exit codes are in evidence/checks. No historical test result is presented as a fresh run.

| Comando subjacente / Underlying command                                                                                                    | Resultado novo / Fresh result | Alcance / Scope                                                                                                                                                                                         |
| ------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `python .../verify.py integrity`                                                                                                           | PASS,exit0                    | 251ficheiros anteriores e37pendentes byte-identical;90IDs/chaves/versões/explicações preservados;9arquivos iguais aHEAD;4soluções PT/EN;18avaliações de alternativas;6corrupções de registos rejeitadas |
| `node scripts/check-academic-deliverables.mjs --phase10h-batch2`                                                                           | PASS,exit0                    | 90questões,364alternativas,64LO;13casos negativos;0alterações runtime/histórico não autorizadas                                                                                                         |
| `node node_modules/vitest/vitest.mjs run tests/unit/advanced-assessment.test.ts tests/unit/bank-history.test.ts tests/unit/backup.test.ts` | 52/52PASS,3/3ficheiros,exit0  | Oráculos relevantes, carregamento histórico, backup/restauro sintéticos; sem falhas/skips reportados                                                                                                    |

Vitest iniciou2026-11-06T12:38:25UTC e terminou12:38:46UTC; os tempos exatos estão no JSON do log. A suite avançada contém outros itens congelados como testes de regressão, sem nova revisão académica desses itens. Para tl-088/tl-089 os objetos congelados.9 e atuais.10 são iguais, demonstrado separadamente. A suite avançada também exercita1000seeds determinísticas; não se atribui calibração académica a esse resultado estrutural.

O guard original ainda imprime a matriz histórica.9 com88AI_REVIEWED_PENDING_HUMAN/2NEEDS_FIX e o checkpoint do Lote2 comtl-038BLOCKED_HUMAN_DECISION. Isso não revoga correções posteriores nem o aceite do proprietário registado separadamente. Não se reescreveu o histórico. O guard adicional valida os documentos novos, não abrangidos pelo guard antigo. / Historical status output is not a new content failure or human approval.

## Robustez dos verificadores / Verification strength

O novo oráculo Python não lê chaves nem justificações para derivar respostas. Em tl-088 interpreta a tabela real de seis pares, reiniciaLocked por teste, mantém estado apósINVALID, termina e marca eventos posteriores como não executados. São20eventos executados e2não executados nas dez sequências, por versão linguística. Cobertura distingue pares, não apenas estados finais. A política do plano é validada separadamente da cobertura realmente atingida.

Em tl-089 usa frações exatas, três médias ponderadas, repetição seletiva e configuração uma vez. Uma segunda expressão reagrupada confirma17. Cada uma das cinco alternativas é avaliada com unidade; o máximo das execuções paralelas nunca substitui soma de esforço. Não se infere duração/calendário, arredondamento, SD ou confiança.

Oito contraexemplos/grupos adicionais verificam: sufixo após paragem, cobertura4/6ou5/6, prefixo inválido sem cobertura futura, duplicação de resposta correta e quatro erros de esforço. Seis corrupções de registos/modelo são rejeitadas: chave proposta errada, aprovação humana inventada, aceite do proprietário inventado, hash errado, página inexistente e opção correta duplicada. Não se contam estas asserções como testes Vitest adicionais.

PT/EN: oráculos das duas línguas dão as mesmas respostas e execuções. Os relatórios examinam as restrições e todas as explicações semanticamente. Isto é avaliaçãoAI, não prova automática universal de tradução. Constantes50%/setup2 e estado inicialLocked estão declaradas no modelo dos cenários exatos; não é um interpretador genérico de linguagem natural.

## Preservação e histórico / Preservation and history

O banco reavaliado em memória é igual ao snapshot inicial:90objetos completos e revisão.10. IDs, chaves, versões, explicações e demais campos são preservados. Todos os arquivos.1–.9 coincidem em bytes comHEAD. Só as duas correções históricas já existentes tl-011/tl-090 distinguem.10 de.9. tl-088/tl-089 foram introduzidas na.9; não existirem antes não é perda de histórico. Store/backup e restantes ficheiros preexistentes não mudaram. Nenhum dado real foi lido ou modificado.

Nenhuma alteração de código, configuração, questão ou teste do repositório. Só nove documentos novos neste lote; sem nova revisão.11. Os37documentos pendentes anteriores e251ficheiros existentes permanecem intactos. / Documentation-only additions; all preexisting bytes remain identical.

## Limitações e falhas exploratórias / Limitations and exploratory failures

Syllabus EN4.0.1 ePT4.0/v1.0 foram lidos novamente em PDFs locais; URLs oficiais abertos nesta execução. Não se afirma igualdade byte a byte com downloads novos. Páginas físicas incluem capa. Textos integrais dos documentos oficiais não são redistribuídos. Sem revisão humanaSME ou calibração empírica de dificuldade.

Um comando inicial inline Node falhou por perda de aspas antes de executar a inspeção; foi substituído por extractor externo já inspecionado. Uma busca tentou um nome de fixture inexistente; os imports identificaram o corretoadvanced-solvers.ts. Ambos constam em helper-failures.json comexit1; não são falhas de testes nem divergências do workspace. As buscasrgsemAGENTS.md devolveramexit1por ausência de resultados, não uma falha do projeto. Sem falsos alarmes semânticos ou testes desativados.

TypeScript,ESLint,build eE2Ecompleto não foram reexecutados por só haver documentos novos; não se apresentam resultados antigos comoPASS novo. Não houve browser, Production ou publicação. Testes proporcionais cobrem oráculos de conteúdo existente, histórico e backups.

## Aprovações e gate / Approvals and gate

Duas recomendações AI ACCEPT_AS_IS. Nenhum problema confirmado ou proposta substantiva. Melhorias opcionais de clareza/estilo não aplicadas. Chaves coincidem com soluções independentes:tl-088o3;tl-089o4=17pessoas-hora. Gabriel não aprovou neste pedido os itens deste lote; OWNER_ACCEPTED não criado. HUMAN_APPROVED não criado. Aceites prévios do Lote2 preservados; Lotes3–5 continuam sem novo aceite. Fase10H aberta; Lote7 não iniciado.

Formatação dos nove documentos, diff e verificação final do ZIP têm comandos/resultados específicos em evidence/checks e no resultado externo de exportação. O exportador exigeexit0de cada gate executado antes de aceitar o pacote. O resultado externo identificaCRC, extração limpa, manifesto, verificador portátil eSHAdoZIPsem circularidade.
