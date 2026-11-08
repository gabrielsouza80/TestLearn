# Fase 10H — Lote 3: verificação proporcional

Execução de 06-11-2026, branch `develop`, HEAD `3fd0a85d95ecb79539515833ee3cbe7869c58049`. O working tree estava limpo no preflight. O avanço desde `c551cca…` foi explicado pelos dois commits anteriormente autorizados; nenhum commit, push ou operação Git remota ocorreu nesta tarefa.

## Alterações e preservação

Somente documentação nova: aceite individual OWNER_ACCEPTED do Lote 2 e dossier do Lote 3. Nenhum ficheiro existente foi editado, nenhum teste/runtime/banco foi alterado e nenhuma revisão de conteúdo foi criada. O conteúdo mantém `.10`.

O verificador externo recarregou o banco real por transpiling TypeScript em memória, sem caches ou ficheiros no repositório. Comparou todos os 214 ficheiros existentes com o preflight, os nove arquivos `.1`–`.9` com os bytes Git do HEAD, todos os 90 IDs/chaves e a matriz original com `.9`. O banco inteiro permaneceu idêntico ao preflight. O código-fonte que define tl-078 (`src/data/variability-questions.ts`) não foi alterado, e a representação canónica do objeto conserva SHA-256 `5619a0b21ce32f1520f7b552df844f73bbc3c9140da4cfbceac0cfd5e236f800`.

Os 50 ficheiros de origem do pacote revisto do Lote 2 coincidiram com o workspace; o pacote foi conferido pelo seu hash conhecido. Os registos anteriores continuam históricos, incluindo o BLOCKED_HUMAN_DECISION de tl-038. O novo OWNER_ACCEPTED guarda separadamente a qualificação exata de Gabriel e não atribui revisão SME humana, certificação ou HUMAN_APPROVED.

## Verificações novas executadas

| Comando                                                                                                                                                                   | Resultado desta execução                                                                                                                                                                                                                                                             |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `python C:/TestLearn/tmp/phase10h-batch3-20261106/verify.py integrity`                                                                                                    | PASS: banco/ficheiros anteriores exatos; 90 IDs/chaves; nove arquivos históricos; versões/hashes dos oito aceites; qualificação tl-038; 6 corrupções deliberadas rejeitadas                                                                                                          |
| `node scripts/check-academic-deliverables.mjs --phase10h-batch2`                                                                                                          | PASS: 90 questões, 364 alternativas, 64 LOs e 13 casos negativos do gate existente. As contagens 88 pendentes/2 NEEDS_FIX são o checkpoint original `.9`, não um resumo dos aceites novos. O aceite novo e o registo do Lote 3 são validados adicionalmente pelo verificador externo |
| `node node_modules/vitest/vitest.mjs run tests/unit/academic-batch1.test.ts tests/unit/academic-batch2.test.ts tests/unit/bank-history.test.ts tests/unit/backup.test.ts` | 4 ficheiros, **59/59 PASS**; inclui compatibilidade histórica, backup/restauro, distinção de aprovações e 1000 seeds do banco atual                                                                                                                                                  |
| `node node_modules/prettier/bin/prettier.cjs --check <ficheiros novos>`                                                                                                   | PASS nos ficheiros do dossier e aceite; formatação novamente verificada após fechar a documentação                                                                                                                                                                                   |
| `git diff --check`                                                                                                                                                        | PASS para alterações tracked; os ficheiros novos foram verificados por Prettier e pela comparação/hash do pacote                                                                                                                                                                     |

Logs e metadados novos: `C:/TestLearn/tmp/phase10h-batch3-20261106`. O script de verificação local também acompanha o ZIP como evidência; o `VERIFY-PACKAGE.py` separado é o verificador portátil. A verificação de integridade inclui casos negativos para impedir falsa aceitação de chave alterada, HUMAN_APPROVED indevido, SME inventado, autorização de deployment, hash errado ou qualificação tl-038 removida.

## Falhas, skips, avisos e limites

- Zero falhas ou skips nos 59 testes Vitest e nos gates executados. Nenhum teste foi desativado para obter PASS.
- A tentativa inicial de download Python dos exemplos oficiais falhou com HTTP 403; os quatro endpoints continuaram indisponíveis nesse cliente. A ferramenta web leu os PDFs oficiais com sucesso, incluindo versões/páginas/rationales. A tentativa de screenshot da página B falhou com cache miss. Não se afirma ter visto a tabela gráfica ou calculado independentemente a resposta desse exemplo oficial, nem se inventam hashes dos PDFs não descarregados. Fontes e limites estão registados em sources.json/assessment.md.
- Os PDFs de syllabus locais EN/PT foram lidos novamente, com as páginas e hashes registados. A tradução PT é v4.0/v1.0, não v4.0.1.
- Não foram repetidos TypeScript, ESLint, build, toda a suite Vitest, release guards ou Playwright: houve apenas documentação e nenhum ficheiro existente mudou. Os resultados anteriores não são apresentados como novos. A verificação atual recarregou o banco real e executou os gates/testes direcionados relevantes.
- Não executados: CI remoto, Preview, smoke/deployment de Production, operações Git remotas, auditoria assistiva/dispositivos físicos ou calibração psicométrica. Não há publicação nesta tarefa; testes locais não provam uma transição pública futura.
- Pendente: aprovação académica humana independente. O veredito ACCEPT_AS_IS é da AI. Dificuldade baixa a média para K3 é avaliação qualitativa, não medição empírica. O aceite do Lote 2 é do proprietário, sem falsa certificação.

## Entrega e próximo passo

ZIP em Downloads com data real de execução **20261106**, inventário Git, comparações PT/EN literais e manifesto; pacote delimitado, não checkout executável completo. Verificar extração e `python VERIFY-PACKAGE.py`. Manifesto não inclui hash de si próprio para evitar circularidade; o SHA-256 externo do ZIP cobre o arquivo completo.

Rever a recomendação tl-078 e, se desejado, registar o seu aceite separadamente. O Lote 4 permanece por iniciar e requer nova instrução; Fase 10H continua aberta. Não houve alteração de `main`, Production, protótipo 10I ou conteúdo académico aceite.
