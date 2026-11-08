# Fase10H Lote7 — verificação / Batch7 verification

Data/date2026-11-06. WorkspaceC:/TestLearn/tmp/develop-workspace; develop; HEAD3fd0a85d95ecb79539515833ee3cbe7869c58049; content2026-10-27.10.

## Preflight e preservação / Preflight and preservation

Foi consultadogit status--untracked-files=all. Foram encontrados46documentos pendentes, correspondentes aos37anteriores mais9doLote6. Nenhum difftracked/staged e nenhuma divergência inesperada. Documentos dosLotes1–6presentes:57no total, incluindo os46pendentes e11tracked. Os260ficheiros existentes foram fotografados porSHA-256 e preservados byte a byte. / Actual pending count46; all57prior batch documents and all260preexisting files remain identical.

ZIPanterior:SHA-256031e64554c3dfe2065a75272df78e37f4180461069356159e19efcc2ca80fb94confirmado;101ficheiros/100hashes de payload,CRC e extração limpaPASS. Os dois scripts Python doZIPforam inspecionados antes da execução; verificador portátilPASS. Comparadas76cópias de origem,251hashes do snapshot anterior e o banco atual completo. Nenhuma suposição de ausência de concorrência substituiu essas comparações. Não houve consulta remotaGit.

Banco atual reavaliado em memória:90objetos/IDsúnicos, revisão.10, igual ao preflight e ao banco doZIPanterior. Todos os IDs/chaves/versões/explicações e restantes campos preservados. Arquivos.1–.9iguais em bytes aoHEAD; apenas as duas correções históricas já existentestl-011/tl-090diferenciam.10de.9. Os contratos store/backup e dados do projeto não foram alterados; dados reais de utilizadores não foram acedidos.

Os sete ficheiros de comparação pedidos estão presentes e coincidem byte a byte com oZIPdoLote5:syllabus-questions.ts,variability-questions.ts,domain/blueprint.ts,academic-audit.test.ts,blueprint.test.ts,quality-maintenance.test.ts,variability.test.ts. Caminhos completos e hashes estão em integrity-result.json; o exportador exige a inclusão de todos.

## Execuções novas / Fresh executions

Comandos de shell lançados via rtk proxy. Argv efetivo, timestampsUTC,exitcode e logs estão nas evidências. Resultados anteriores não são apresentados como execuções novas.

| Comando subjacente / Underlying command                                                                                                                                    | Resultado novo / Fresh result | Limite / Limit                                                                                                                                                               |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| python .../verify.py integrity                                                                                                                                             | PASS,exit0                    | 260ficheiros/46pendentes/57documentos anteriores;90objetos e9arquivos;7ficheiros pedidos iguais aoZIP5                                                                       |
| python .../verify.py batch7-specific                                                                                                                                       | PASS,exit0                    | Checks próprios destes2itens:LO/K/versão/hash,8alternativas,13conceitos críticos ancorados,soluções cegas,fonte/páginas,candidatos opcionais sem aplicação e9casos negativos |
| node scripts/check-academic-deliverables.mjs --phase10h-batch2                                                                                                             | PASS,exit0                    | APENASguard legado de contexto dosLotes1/2; NÃO validação linguística específica doLote7                                                                                     |
| node node_modules/vitest/vitest.mjs run tests/unit/academic-audit.test.ts tests/unit/quality-maintenance.test.ts tests/unit/bank-history.test.ts tests/unit/backup.test.ts | 60/60PASS,4/4ficheiros,exit0  | Regressão de integridade/explicações/histórico/backup; não comprova equivalência semântica automaticamente                                                                   |

Vitest executado2026-11-06T13:10:36.978531UTC a13:10:40.453500UTC. Sem falhas ou skips reportados. Os testes existentes abrangem checkpoints históricos diferentes; a igualdade dos itens atuais com o preflight é demonstrada pelo check de integridade, não presumida a partir de testes de bancos antigos.

O guard legado imprime90questões/364alternativas/64LO e13casos negativos, com status históricos88AI_PENDING/2NEEDS_FIX echeckpointtl-038BLOCKED. Isso não substitui avaliações/aceites posteriores em registos separados. Nada foi reescrito para aparentar aprovação. A saída menciona o piloto existente apenas por inspeção mecânica; não foi iniciada nem alterada outra fase.

## Checks próprios e falsos positivos / Specific checks and false-positive protection

O verificador doLote7não é um classificador automático de português/inglês nem prova de correção académica. As soluções foram derivadas porAIantes de ler chaves/justificações, às2026-11-06T13:02:28.905505UTC. Regras mecânicas validam o registo: identidade exata de cada item; LO/Kcorretos(K2eK1, nãoK3); todas as opções e justificações cobertas; frases críticas existentes nos textos reais; fontes/páginas consultadas; candidatas opcionais separadas e não aplicadas; zeroaprovações novas. As chaves esperadas provêm do registo prévio da soluçãoAI, não de inferência semântica do script.

Nove adulterações rejeitadas: chave errada, aprovação humana inventada, aceite do proprietário inventado, alegação falsa de tradução literal perfeita, distrator omitido, segunda resposta marcada defensável, aplicação não autorizada de melhoria opcional, página inventada e chave vazada na projeção cega. Essas verificações não contam como testesVitestadicionais. Não se usou mera paridade de números ou palavras como prova de equivalência.

Análise palavra a palavra dos conceitos está nos dois relatórios. tl-022preserva o fundamento experiencial; possíveis usos da mesma data em exploração/BVAnão tornam essas opções a melhor explicação da base dada. tl-041preserva responsabilidade coletiva; “equipa de desenvolvimento” tem risco de âmbito mais estreito, mas não impõe composição exclusiva de programadores. APSTQBmantém a expressão inglesaWhole Team Approach; glosaPTsugerida não é apresentada como termo oficial.

## Fontes, falhas e limites / Sources, failures and limits

EN4.0.1:§4.4.1pp.43–44,§4.4.2p.44,§4.2.2p.40,§1.5.2p.22;LOpp.38/14. PT4.0/v1.0:§4.4.1pp.47–48,§4.4.2p.48,§4.2.2pp.43–44,§1.5.2p.24;LOpp.41/15. PDFs locais lidos novamente e hashes calculados. ENoficial abriu naweb; fetchPToficial devolveutimeoutna ferramenta, pelo que se usa a cópia oficial local com hash explícito, sem inventar download bem-sucedido. Não se afirma igualdade byte a byte com downloads remotos novos nem cobertura de todas aserrataENpelaPT.

Uma primeira versão dohelperdeextração assumiu que o próximo título estaria na mesmapáginaPT24; falhou antes de gravar os resultados. O recorte foi corrigido para refletir a paginação real; segunda execução completaPASS, com referências lidas acima. Falha dohelperregistada emhelper-failures.json; não foi divergência do banco nem teste de projeto falhado. Uma busca exploratória de origem também tentou dois nomes de ficheiro inexistentes; a lista real de ficheiros e imports identificou as origens corretas, incluídas no pacote. Essa falha de busca está registada e não representa divergência nem teste falhado. Nenhum teste foi desativado. Não há calibração psicométrica nem estudo empírico de interpretação de leitores. PDFs completos/páginas integrais protegidas não são redistribuídos.

Só se criaram nove documentos doLote7. TypeScript,ESLint,build eE2Ecompleto não foram repetidos, por não haver mudança de código/banco/configuração; não se apresentam logs antigos comoPASSnovo. Se posteriormente for autorizado texto novo no banco, a revisão/versionamento e regressão/render/línguas exigirão outro âmbito de execução.

Formatação dos nove documentos e git diff--check têm resultados próprios nos logs. Difftrackednão cobreuntracked; a formatação e o verificador portátil cobrem explicitamente os documentos novos. O exportador só aceita códigos0das verificações executadas, compara hashes/literais e inclui os sete ficheiros adicionais pedidos.

## Decisões e gate / Decisions and gate

tl-022ACCEPT_AS_IS,o1;tl-041ACCEPT_AS_IS,o2. Nenhum problema académico obrigatório confirmado. Melhorias editoriais opcionais têm texto anterior/candidato completoPT/EN, mantendo chave/opções/explicações; nenhuma aplicada. Sem nova revisão.11nem incremento de versão. Não se converte revisão técnica de continuidade doLote6emaceite de conteúdo ou aprovação humana. OWNER_ACCEPTED/HUMAN_APPROVEDnovos=0; aceites anteriores preservados. Fase10Haberta;Lote8não iniciado. Aguardar revisão externa doZIP.

CRC,manifesto,extração limpa,verificador portátil eSHAdoZIPsão verificados no resultado externo de exportação, evitando circularidade de incluir oSHAdoZIPdentro dele mesmo. O pacote é autocontido para revisão/verificaçãoPython, não um repositório completo executável.
