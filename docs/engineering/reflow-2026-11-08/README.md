# TL-REFLOW-320 — verificação e recuperação

Data: 08-11-2026. Correção local **PASS**; prontidão global **BLOCKED**. Não é publicação ou aprovação académica.

## Checkpoint remoto recuperável

Repositório gabrielsouza80/TestLearn, branch `wip/testlearn-phase10i-checkpoint-20261108`. Primeiro commit/push confirmado: `d78dd703756ce5088865b8940386034dc3eeda22`. Foram preservados 292 ficheiros, incluindo revisões e reconciliação, aviso, testes, plano 10I e evidências selecionadas. O ZIP autenticado conserva os bytes originais das evidências académicas perante normalização de texto do Git. Inventário e exclusões locais exatas: `../checkpoint-2026-11-08/evidence-inventory.json`. Não foi usado git add indiscriminado.

O primeiro staged diff check sinalizou espaços finais de quatro logs brutos, preservados no WIP e explicitamente documentados; não se apresenta esse check como PASS. O segundo commit contém apenas a correção, teste novo e este dossiê; os ficheiros congelados não são reescritos.

## Causa e alteração mínima

O fieldset impunha mínimo intrínseco min-content e o texto flex não podia encolher. A linha de navegação sem wrap mantinha largura superior ao conteúdo disponível. O defeito era anterior ao aviso: referência sem aviso e remoção do nó mantinham 352 px num viewport de 320 px.

Oito linhas CSS acrescentadas: min-width: 0 no fieldset e texto das alternativas, overflow-wrap:anywhere no texto, max-width: 100% nos botões de ação e min-width: 0/flex-wrap:wrap na linha de navegação. Seletores usados apenas na apresentação de perguntas. Sem ocultar overflow, reduzir fonte, cortar conteúdo, mudar dados ou reescrever lógica.

## RED → GREEN

RED fresco após checkpoint: três FAIL desktop nos testes originais, na mesma condição de 320 px/texto 200%. Depois da correção, Chromium, Firefox e WebKit: **scrollWidth320/clientWidth320 e zero elementos excedentes**. A referência isolada anterior continua352/320 nos três browsers. Medições completas, estilos e bounding boxes em diagnosis.json dentro do arquivo de evidência.

O novo teste cobre PT/EN,320 px normal/200%,390px normal/200%,768px e1280px normais; alternativas longas, foco, aviso exclusivo, feedback correto/incorreto, navegação, pontuação e persistência da ordem de opções. Axe aplicado à região de perguntas; não se afirma certificação humana com leitor de ecrã.

Na primeira execução do teste novo, WebKit atingiu limite de captura de 32767px numa imagem full-page:10 PASS, 1 FAIL e 5 não executados por fail-fast. O FAIL e trace foram preservados. Só a captura de evidência foi adaptada a dois viewports (aviso e controlos); todas as asserções e fonte 200% permanecem. Reexecução final:16/16 PASS, sem skips.

## Resultados novos, sequenciais

| Verificação                                                | Resultado                                                                                                                                                      |
| ---------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| TypeScript, lint e build                                   | PASS                                                                                                                                                           |
| Unitários/integração completos                             | 282/282 PASS, zero skips, um worker, timeout/sementes intactos                                                                                                 |
| E2E aviso/reflow e negativos                               | 16/16 PASS nos quatro projetos                                                                                                                                 |
| E2E existentes app/educational-ux/progress-backup          | 100/100 PASS nos quatro projetos                                                                                                                               |
| Regressões Node dos guards                                 | 91/91 PASS, incluindo paridade .vercelignore                                                                                                                   |
| Release/manifesto, assets retidos, isolamento experimental | PASS local; nove históricos e dois assets retidos                                                                                                              |
| Integridade                                                | 90 objetos completos,364 opções, 64 LO e nove arquivos iguais ao ZIP autenticado; 90 humanApproval PENDING                                                     |
| Formato CSS/teste alterados                                | PASS após formatação exclusiva do ficheiro novo; primeira verificação FAIL preservada                                                                          |
| Formatação global                                          | FAIL: 75 documentos já existentes no primeiro checkpoint, incluindo os 45 originais e cópias de evidência; não reformatados                                    |
| Guard académico legado                                     | FAIL de âmbito: allowlist antiga rejeita apresentação/testes novos; não modificado. Também pressupõe develop, pelo que não é um gate genérico de aplicação/WIP |

Comandos, UTC, exit codes e stdout/stderr estão em evidence.zip. Não se reutilizaram logs anteriores como execuções novas. A suite E2E inteira fora dos ficheiros selecionados não foi executada; não é apresentada como tal. Verificações de formato/diff finais e staged são registadas antes do segundo commit.

## Automatismos e risco remoto

API Vercel confirmou projeto único ligado ao repo, produção apenas por main, todos os Previews protegidos, plano Hobby; workflow GitHub Quality não dispara push desta branch WIP. Nenhuma configuração foi alterada.

O push do checkpoint originou Preview automático `dpl_4gp3F2WKQ6wrkd9xEyKUmceQqjbJ`, target null/ERROR, sem aliases. Build e guards locais passaram; o guard live recusou `Previous asset not retained: assets/index-CFv3SkJ7.css`. Este bloqueio antecede a correção e não foi corrigido ou ignorado. Segundo push WIP poderá repetir o erro; não será uma validação de Preview ou produção. Manter gate 10G/P1 separado; nenhuma promoção autorizada.

## Estado académico e próximo passo

tl-038 mantém BLOCKED_HUMAN_DECISION, chave o1 e aviso; tl-078 mantém atenção à calibração. tl-011/tl-090 e revisão académica humana continuam pendentes. Nenhum novo OWNER_ACCEPTED ou HUMAN_APPROVED.

Condições técnicas locais para um piloto posterior melhoraram, mas não há autorização para iniciar participantes. Fase 10I permanece apenas plano local com facilitador, cinco voluntários, 35–45min e feedback mínimo. Fase 10H continua aberta. Próxima decisão humana: rever os resultados locais e decidir o próximo ciclo, mantendo bloqueios remotos/históricos explícitos.

## Recuperar noutra sessão

Consultar esta branch e o SHA remoto, sem merge. Para reconstruir bytes das evidências originais, verificar o ZIP autenticado do primeiro checkpoint e extrair em pasta nova seguindo o mapa de continuidade; não sobrescrever um workspace com alterações. O primeiro checkpoint é o pai do commit de correção. Os dois SHAs completos e os pushes ficam confirmados no relatório final; o próprio commit não contém o seu SHA futuro.
