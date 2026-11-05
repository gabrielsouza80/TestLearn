# Fase 10G — validação de Production e segurança de release

31 de outubro de 2026, Europe/Lisbon (horas abaixo em UTC). Auditoria atual, sem commit, push, merge de PR ou deployment. Estados: **VERIFIED**, **FAILED**, **NOT TESTED**, **BLOCKED**; não são intercambiáveis.

## A. Estado real verificado

O checkout inicial estava limpo em main/19a0572, mas seis commits atrás da origem. Foi atualizado apenas por fast-forward para **abf15ed5376e8b34a86fc4f873a65694b7705e34**, sem descartar trabalho. Versão 0.1.1, Node 24.19.0 (engines 24.x), React/TypeScript/Vite, Vitest/jsdom e Playwright em Chromium, Firefox, WebKit e móvel Chromium emulado. O repositório GitHub é atualmente público.

O inventário inicial pós-fast-forward tem 153 inputs e SHA-256 individuais em `tmp/phase10g/baseline.json`. As credenciais ignoradas da CLI anterior não foram lidas ou copiadas: testes executados numa cópia local dos mesmos inputs, sem .env/.vercel, usando as dependências já instaladas e removendo VERCEL_* e VITE_* do ambiente dos subprocessos. Não houve npm ci ou alteração de dependências. As normalizações LF posteriores e o novo teste estão identificados abaixo; não são ocultados como identidade byte a byte com a captura CRLF inicial.

**Production — VERIFIED por acesso direto:** https://testlearn-ctfl.vercel.app/ devolveu 200 numa requisição sem cookies e num contexto Chromium novo; não redirecionou para autenticação. Interfaces PT e EN disponíveis, botão de exame ativo, 40 perguntas/60 minutos/revisão .9; seleção seguida de refresh preservou respostas, ID, ordem e deadline. Não ocorreram pageerror ou pedidos falhados durante esse smoke. Uma repetição antes do encerramento, também com zero cookies iniciais, confirmou os dois idiomas e registou zero consoleErrors, pageErrors, pedidos falhados ou HTTP de erro; os pedidos observados ficaram na mesma origem. São observações Chromium desktop, não uma matriz remota ou de dispositivos físicos.

O HTML, manifesto, JS atual, CSS e oito chunks históricos devolveram 200 e MIME apropriado. O bundle anterior de A devolveu 404, descrito como falha abaixo. Inventário HTTP/hashes e screenshot: `production.json` e `production.png`.

A API confirmou domínio associado ao projeto **testlearn**, `prj_lE5DcKsY473SnniV0CXXMC1aBx3w`, equipa Testlearn `team_YNKbyfPSXwYEw0XveEc3TXRp`, deployment **dpl_G9Wsax2WV1Cz9KWN2U5mENeYdGkp**, target production/READY, commit abf15ed. Projeto ligado à GitHub main e promoção automática de domínios ligada. A proteção configurada é `prod_deployment_urls_and_all_previews`: domínio Production público, Previews/URLs individuais protegidos. Não foi contornada proteção nem criado bypass. O conector Vercel devolveu 403; a consulta GET foi feita com a autenticação CLI existente, na equipa explícita, sem login novo. Seis GET anónimos adicionais (raiz, JS e arquivo .8 no Preview da PR #6 e no URL individual de Production) devolveram 302 para vercel.com/sso-api, sem seguir redirects; são uma amostra de proteção, não prova exaustiva de todos os caminhos ou roles. O projeto antigo do incidente continua paused=true/live=false; não foi usado para testes funcionais nem reativado.

**CI — VERIFIED para a revisão publicada:** verify SUCCESS, [run 41152055646](https://github.com/gabrielsouza80/TestLearn/actions/runs/41152055646), incluindo os steps de typecheck, lint, formato, unit, build, guard e E2E. O upload de artefactos condicionado a falha foi skipped: isso não significa omissão de testes. Este run não valida o novo teste nem a regra LF locais, que não foram enviados. Existe a PR #6, head f4d9e5524b0f485e9a55e8f313b66e7b3575dbf1, com verify e Preview aprovados segundo os checks consultados; não foi integrada por esta fase e os seus testes não são contados como resultados locais da main.

## B. Problemas, causa e impacto

### P1 — retenção do JS de A: FAILED, correção externa pendente

GET anónimo atual de `/assets/index-CTbPgljy.js` retorna **404** no domínio público, enquanto `/assets/index-DB06V4Gu.js`, CSS e oito chunks académicos retornam 200. A mudança A=58ec1f0 para B=abf15ed alterou o hash de entrypoint; o build atual não inclui o entrypoint anterior. A cache immutable não obriga o alojamento a conservar esse caminho na origem atual.

Uma página que ainda precise do recurso A durante uma transição pode falhar. Não é prova de perda de respostas: o smoke e o ensaio isolado de sessão passaram. Os arquivos académicos atuais continuaram disponíveis porque os seus hashes não mudaram; isso não garante retenção de um futuro chunk cujo hash mude.

O mesmo problema está aberto em [issue #5](https://github.com/gabrielsouza80/TestLearn/issues/5), com proposta na [PR #6](https://github.com/gabrielsouza80/TestLearn/pull/6). Não foi duplicada a estratégia nem copiados bundles para main. A existência de um Preview READY ou CI verde na PR não demonstra que o domínio Production já devolve o JS antigo. A disponibilidade autenticada no deployment antigo é relatada no issue; não foi revalidada com bypass nesta fase. A issue #3, de ensaio remoto A→B, permanece aberta e não recebe PASS global.

### P2 — checkout Windows incompatível com Prettier: corrigido localmente

Antes da alteração, npm run format:check falhou em **14 ficheiros** recém-atualizados. core.autocrlf=true e ausência de regra geral em .gitattributes produziram CRLF. Para cada um dos 14, o conteúdo normalizado para LF foi comparado com o output Prettier e o blob HEAD: igualdade exata, sem alteração de palavras, lógica ou configuração semântica.

Acrescentou-se `* text=auto eol=lf`; a regra específica dos arquivos académicos foi preservada. O teste novo cria um repositório Git sintético sem credenciais, usa as regras reais do projeto e força core.autocrlf=true num checkout de TSX, Markdown e JSON de arquivo. Exige igualdade byte a byte com LF, em vez de apenas procurar uma string de configuração. Falhou com as regras antigas da cópia e passou após aplicar as novas; o diretório temporário é validado antes da remoção, sem tocar em dados de utilizadores.

A comparação posterior do build encontrou também favicon.svg e robots.txt em CRLF, ignorados pelo check Prettier. A versão LF de cada um coincide exatamente com o blob Git e o ficheiro servido em Production. Foram normalizados após a matriz final e repetidos build, guard e comparação dos 14 assets. JS, CSS e históricos não mudaram; não se repetiu a matriz por esta alteração semântica nula de dois assets estáticos. A primeira comparação 12/14 está preservada, separada da comparação final 14/14.

Os 14 ficheiros inicialmente identificados e esses dois assets locais foram normalizados para os bytes LF de HEAD; não produzem diff Git de conteúdo. O índice foi refrescado apenas para esses conteúdos comprovadamente iguais, sem staging final de alterações. Não se alterou a configuração global Git.

### P2 — advisories de tooling: FAILED no audit completo, sem correção incompatível

npm audit --json devolveu exit 1, **11 entradas moderadas**, zero altas/críticas. A cadeia ESLint/typescript-eslint usa minimatch; as 11 entradas incluem propagação do mesmo advisory, não 11 provas independentes de exploração. A [fonte primária GHSA-g3hv-75wg-m249](https://github.com/advisories/GHSA-g3hv-75wg-m249) classifica versões inferiores a 11.0.1 e descreve amplificação de padrões com optimizationLevel >= 2. A árvore instalada e o relatório completo estão preservados. Não foi executado um ataque de exaustão nem demonstrada exploração concreta de todas as versões transitivas.

npm audit --omit=dev devolveu exit 0 e **zero advisories de dependências de produção**. Isso não é certificação de ausência de vulnerabilidades. O caminho apontado é de ferramentas de desenvolvimento/CI; não há endpoint da aplicação que aceite padrões glob para ESLint. Não foi aplicado audit fix --force: o npm sugere downgrades/majors incompatíveis de ESLint/typescript-eslint. A próxima atualização deve ser resolvida e testada como manutenção própria, sem esconder o advisory ou forçar minimatch 11 sobre APIs antigas.

### P2 — teste de foco sem precondição: corrigido localmente

A primeira matriz completa teve 363/364 casos aprovados: WebKit falhou ao esperar foco em Confirmar importação depois de Tab. O teste esperava apenas os dados do diálogo visíveis antes da tecla; o foco inicial em Cancelar é aplicado por useEffect e não é garantido por essa observação do DOM. Acrescentou-se uma asserção auto-repetida de foco em Cancelar antes de enviar Tab. Não se chamou focus() no teste, não se retirou a asserção posterior nem se aumentou o timeout. A aplicação fica obrigada a estabelecer o foco correto. O caso corrigido passou isoladamente nos quatro projetos, incluindo validação da importação e dos dados preservados.

A ausência da precondição é confirmada no código; a ordem exata do agendamento da primeira falha não foi reconstruída. Os JSON/logs preservam o erro; o trace dessa falha foi eliminado pelo cleanup automático do diretório partilhado ao arrancar o shard seguinte. As execuções posteriores usam diretórios de output distintos por shard para preservar futuros traces. Esta limitação de evidência é explícita, e a primeira falha não é ocultada por um novo resultado.

### Processo de release: mitigação existente e limite confirmado

A API GitHub confirma PR obrigatório para main, verify obrigatório da app GitHub Actions (app_id 15368), strict=true, enforce_admins=true, force push e eliminação desligados. Required approvals=0 permite manutenção individual; não significa revisão humana independente. Não há rulesets adicionais. Não foram tentados pushes/merges inválidos para testar a rejeição remotamente.

O risco inicial de main completamente desprotegida **já não corresponde à configuração atual**. A cronologia prova: verify do PR #4 terminou 00:46:48; merge 00:47:20; árvore do head aprovado e árvore integrada iguais, SHA de árvore 3a51009f589d6dd8d6619ea029e64a4c48504e9d. Alias Production atribuído 00:48:16.562; verify pós-merge terminou 00:55:40. Portanto a Vercel pode publicar antes de acabar o CI pós-merge, mas neste caso já existia validação pré-merge da mesma árvore.

Não se declarou configurado um Deployment Check Vercel que espere pelo verify pós-merge: essa garantia não foi demonstrada. A [documentação oficial](https://vercel.com/docs/deployment-checks) distingue promoção automática de promoção condicionada por checks. Configurar tal gate exigiria aprovação de Gabriel e confirmação de disponibilidade/custo; não se contratou nem ativou nada. A [proteção GitHub disponível em repositórios públicos no plano gratuito](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches) já permite o processo mais simples: PR atualizado, verify verde, revisão do diff incluindo a própria workflow, autorização de merge e smoke posterior. Não exige contas, infraestrutura ou serviços novos. A regra GitHub não bloqueia por si só publicações manuais externas pela CLI Vercel.

O runbook que ainda chamava main desprotegida foi atualizado com estes factos. Relatórios 10B/10C/10E e release-readiness.json são checkpoints históricos com HEAD/gates antigos; não foram reescritos como se tivessem observado a publicação atual.

## C. Alterações locais implementadas

- `.gitattributes`: checkout LF coerente com o Prettier em Windows/Linux; conserva os pins e a regra dos arquivos.
- `tests/unit/checkout-format.test.ts`: regressão através do comportamento real de Git, com fixture isolada e assert byte a byte; sem alterações de testes académicos ou de regras de produto.
- `tests/e2e/progress-backup.spec.ts`: exige foco inicial correto antes de Tab, preservando navegação, focus trap e todas as asserções de integridade da importação.
- `docs/release/current-production-state.md`: corrige estado da proteção, SHA publicado, cronologia CI e risco de retenção; liga este relatório.
- Este relatório: resultados atuais, evidências e decisões, sem atribuir a esta fase mudanças remotas realizadas anteriormente.

Não foram alterados requisitos, pontuação, motor, storage, sessões, perguntas, opções, chaves, explicações, LO ou traduções académicas. Não há dependências novas, alterações de package/lock por conteúdo ou mudança do build/deployment. A PR #6 permanece separada, sem merge, comentários ou ações externas criados nesta fase.

## D. Verificação atual

| Comando/verificação efetivamente executado                                                | Resultado atual                                                                       |              Exit |
| ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ----------------: |
| npm run typecheck                                                                         | VERIFIED; src, tests e configs incluídos                                              |                 0 |
| npm run lint                                                                              | VERIFIED                                                                              |                 0 |
| npm run format:check                                                                      | VERIFIED, cópia atualizada sem credenciais; relatório final também verificado à parte |                 0 |
| npm test -- --maxWorkers=1                                                                | 227/227, 26 ficheiros, zero skips                                                     |                 0 |
| npm run build                                                                             | VERIFIED; aviso conhecido de chunk >500 kB                                            |                 0 |
| node scripts/check-release.mjs                                                            | 14 assets, oito chunks lazy, zero source maps/privados                                |                 0 |
| node --test scripts/check-release.test.mjs                                                | 8/8; zero falhas/skips/todo/cancelados                                                |                 0 |
| node tmp/phase10g/academic.mjs                                                            | 1 000 seeds e integridade .9/.1–.9 VERIFIED                                           |                 0 |
| node tmp/phase10g/continuity-ab.mjs                                                       | Dados VERIFIED; reproduz 404 de recurso A                                             |                 0 |
| Playwright --grep do teste de importação, quatro projetos                                 | 4/4 após correção da precondição                                                      |                 0 |
| npm run test:e2e -- --workers=1 --retries=0 --shard=N/4 --reporter=list,json --output=... | Segunda matriz completa: 364/364, N=1..4 sequenciais                                  |      0 nos quatro |
| npm audit --json                                                                          | FAILED: 11 entradas moderadas de tooling, zero altas/críticas                         |                 1 |
| npm audit --omit=dev --json --fetch-timeout=20000 --fetch-retries=0                       | Zero advisories de dependências de produção                                           |                 0 |
| Produção anónima e comparação binária final                                               | 200, PT/EN, 14/14 assets atuais idênticos ao build; JS anterior 404                   | não é comando npm |

| Projeto, matriz final | Aprovados | Duração reportada (s) | Exit |
| --------------------- | --------: | --------------------: | ---: |
| chromium              |        91 |                127.92 |    0 |
| firefox               |        91 |                180.13 |    0 |
| webkit                |        91 |                294.05 |    0 |
| mobile                |        91 |                129.03 |    0 |

Consolidação da matriz final contra discovery: **364 IDs únicos**, 0 omissões, 0 extras, 0 duplicados, 0 skips, 0 retries e 0 casos classificados flaky pelo Playwright nessa execução. Isto não apaga a falha intermitente da primeira matriz. O mobile é iPhone 13 emulado em Chromium; não é Safari físico. Axe exige lista de violações vazia nos cenários cobertos; isso não certifica WCAG integral.

Checkpoints preservados: baseline de 226 unitários aprovados, formato inicialmente FAILED em 14 ficheiros; novo teste de checkout FAILED com atributos antigos e aprovado com os novos; primeira versão do teste teve lint no-unsafe-finally FAILED, corrigido movendo a validação do caminho para antes do try/finally, sem suprimir regra; 227 unitários/26 ficheiros depois da correção; primeira matriz E2E **363/364**, focada corrigida **4/4**, segunda matriz completa **364/364**. Nenhum destes números foi somado como se fossem casos únicos diferentes. Não foram aumentados timeouts ou introduzidos retries automáticos. A nova asserção E2E foi depois coberta pela matriz completa e por typecheck/lint/formato atuais. A normalização posterior de favicon/robots foi validada por novo build/guard/comparação; não altera o runtime testado, cujo SHA continua igual.

Artefacto final: **14 ficheiros, 1939181 bytes**, JS inicial 702777 B/gzip 212672 B. A allowlist e o scan de padrões não detetaram ficheiros privados, source maps, chaves privadas, formatos selecionados de tokens/JWT, caminhos privados Windows ou sourceMappingURL. Não é uma prova exaustiva de ausência de segredos, conteúdo ofuscado ou dependências vulneráveis; não substitui o audit completo, que falhou. Inventário com caminhos, MIME e SHA-256 em artifact-inventory-final.json. O total e os hashes são do build final, não os do build com CRLF inicial.

Integridade: 153 inputs inventariados; 15 ficheiros só com diferenças de fim de linha, três ficheiros com alterações intencionais de conteúdo/configuração e dois novos. Os 14 normalizados iniciais incluem o runbook, que depois recebeu a atualização documental; por isso não se confundem contagens de normalização e de diff final. Dados académicos, domain e storage mantêm os bytes do baseline, dependências mantêm os blobs Git, 143 evidências históricas do incidente mantêm os hashes. Main e HEAD abf15ed não mudaram; staging vazio. A consulta final confirmou origin/main ainda abf15ed e PR #6 ainda OPEN, sem atos remotos de escrita por esta fase.

### Evidências locais e SHA-256

Os logs, relatórios JSON, fixture A e perfis sintéticos ficam em tmp/phase10g, fora do conteúdo publicado e do Git. A tabela aponta para evidência atual, inclusive resultados falhados intermédios, e não transforma logs históricos em aprovação nova. Scripts de execução e diagnósticos também se encontram nesse diretório. O inventário inicial não é uma assinatura WORM. O snapshot académico .9 conserva SHA-256 89a0d7b2483afbbd279f7a1d9ac707d1ce9b4e049225be88a59c0dd30cd42bb2.

| Evidência                                              | SHA-256                                                          |
| ------------------------------------------------------ | ---------------------------------------------------------------- |
| tmp/phase10g/baseline.json                             | 4d80fb045a0fd44834bc6b5ebdbfecee3fc34e85cd592f4a5f5371d5a7e1ad1c |
| tmp/phase10g/workspace-verification.json               | 3ff45d961d4078656833fb15cece3684563085dc21cfa18f070dd614b233afb1 |
| tmp/phase10g/newline-diagnosis.json                    | 139ea2d1548b45104b24614b09b3aedfbb86f7737f0aaa32da6915ee3706a0e6 |
| tmp/phase10g/static-newline-diagnosis.json             | 8eb9b732b288c90982972a7304d083eec2492e8cc0b65f4501bbd4ce84c5a073 |
| tmp/phase10g/checkout-red.log                          | bffdd5a8c3175f0e55b8998a4f921d8da0278fcdb09b2be3c9310bccdb4aa950 |
| tmp/phase10g/checkout-green.log                        | 0e89dc4a76391b74f246a6674e20cc4588351dbf9ae964f5c3eb1629a1a71026 |
| tmp/phase10g/local-checks-baseline.json                | 79370c61b514779719e50011642a8a4c11ae9ca0519cbe7383cc896dfecba9de |
| tmp/phase10g/local-checks-verified.json                | d2531e6894d9697cb9dc4fb8cf18f7e864eafbcb058dd4bcbd619bc3aa10ee4d |
| tmp/phase10g/local-checks-closing.json                 | 7d0a241ba59aa3f48fcd7f3fd2432a27b73187a85c9449ad15342158c6e3e609 |
| tmp/phase10g/unit-verified.log                         | 179053d6aeaed3ced37c953e577cb63ee8e3e0b9735f6ef77365479ca13ec030 |
| tmp/phase10g/e2e-summary-baseline.json                 | 2b8d2c25034c8811bb4e231def3c2b8fa024658851b8e8cc76edb88cc442a697 |
| tmp/phase10g/focus-fixed.json                          | 28abbd6682ce4f991aa6d3c48b2c95571c6610cba1522dfc246928b5c9f42ffc |
| tmp/phase10g/e2e-summary-final.json                    | ed434eb4184aedd1b49503abdbd88c15e419a88e8a0279c4df3a4dcb6e0e4258 |
| tmp/phase10g/continuity-ab.json                        | 5eb0d2c47d0797d2ba6cab806b59fc6ce962047f17b63a849f3a4c11182f1a98 |
| tmp/phase10g/production.json                           | 1bd7ad4329defddfd4c161606ca2deab3ae86f6015fccb0fb1c2bc682d471850 |
| tmp/phase10g/production-console.json                   | 3248e17d0475ff7db7e2527d453b00d479290dae5b12dddc3b8a35d2746ceb00 |
| tmp/phase10g/production-artifact-comparison.json       | bf5fbf206486ad786e36b965941860ba4735115ab66eecbcaa62762ac04f48b0 |
| tmp/phase10g/production-artifact-comparison-final.json | 32275d27939e82fdce0c9ad57936d84f31d9b40c83f15c03969c19763c9326f8 |
| tmp/phase10g/protected-access.json                     | 776cd98cb2c2fc47fb74190938cb9de5dfda8193f279bf9c25ea674650058f6d |
| tmp/phase10g/vercel.json                               | 310e35253ede3cea4b5b78ffb30ae93e44ce8d67f60a642a0c13947d78ee070c |
| tmp/phase10g/remote-extra.json                         | 4bd28b2c12358ac854057bea7d30833a5bfe32a4fdf7336551d6e07ccfc7f97f |
| tmp/phase10g/github.json                               | 788fc4e14b0169dcf888463fd510265ce6ee402adc36c952c7c5a24ae118aed2 |
| tmp/phase10g/release-timeline.json                     | cc2e237f2d70a388dee129e76c5e0703fbb02e7ff7ccfd007a19f7067c0eb17c |
| tmp/phase10g/team-plan.json                            | f4989b5becd124b43da4decbf1bb86b54b62dbe8c868bf65bc1fb379cac65e1d |
| tmp/phase10g/remote-final.json                         | 2aa0814c7c0f37bd8a8e26cf9000f3b420405174d200b2079903cb39ea7db0e5 |
| tmp/phase10g/npm-audit-summary.json                    | 81e56a475905a28e297b2f4ad5460aa3c652508c934bf52419ac98d3d4e0b048 |
| tmp/phase10g/npm-audit-production.json                 | c8d7dfb977698498883cdc20274304e3cdb4005bf3bfee36dd7da35707d5d311 |
| tmp/phase10g/artifact-inventory-final.json             | 755b83ae3445d65ac6c19bfe20e9c6f6f73a652306fa7dbdc746dbaa15c6ac67 |
| tmp/phase10g/final-integrity.json                      | baef513962cfa7294569a9fc9831525b5e947322f12e3088fbfc2f7e0d8bdb0f |

## E. Continuidade e riscos residuais

**H — VERIFIED para dados no ensaio isolado:** extraíram-se as fontes Git de A=58ec1f04d3971ce8ff3fc46730f1bdd8e54f5c68 e B=abf15ed5376e8b34a86fc4f873a65694b7705e34 para builds locais, sem .env. Um servidor em porta aleatória serviu A e depois B **na mesma origem**. Num perfil Chromium novo iniciou-se exame de 40, responderam-se duas perguntas, marcou-se uma e navegou-se para outra; havia ainda um histórico .4 sintético. Após mudar para B, refresh preservou integralmente o estado: respostas, ordem, opções, índice, ID, revisão, startedAt/deadline, flags e histórico. O timer mostrou 58:00 após dois minutos simulados, sem reiniciar. Um segundo separador estava impedido de editar. Após fechar e reabrir o processo do navegador com o mesmo perfil, mostrou 57:00 aos três minutos; concluiu-se o exame, comparou-se a pontuação com o conjunto de respostas e preservaram-se ambos os históricos e o resultado após reload.

`continuity-ab.json` guarda os checks. O seu status PASS significa que as asserções do ensaio passaram, incluindo a **reprodução esperada do 404**; não significa retenção aprovada. Não se mudou o esquema v1 nem se inventou uma revisão académica. Migrações futuras de esquema, rollback remoto e durabilidade perante corte de energia continuam **NOT TESTED**. O fecho de navegador é controlado, não um crash do SO. O relógio foi controlado, não um exame de 60 minutos em tempo real. Um novo URL de deployment é outra origem: não partilha automaticamente LocalStorage; portabilidade exige backup/importação, testada separadamente.

Os cenários A–G são cobertos na matriz E2E e testes de storage/backup: refresh imediato, troca de separadores, owner legítimo e fecho/retry, reinício de perfil, retomada sem duplicação, limites de tempo/score, resultado/revisão, backups reais descarregados e importados noutro contexto sintético, import inválido e quota/corrupção com preservação dos bytes anteriores. Falta de Web Locks falha de forma segura; não se apagou storage para contornar conflitos. Não foram usados perfis, backups ou respostas reais de estudantes.

**Académico:** banco real .9 com 90 perguntas, 364 opções, 64 LO e 29 grupos; nove hashes de arquivo preservados. Oracle de 1 000 seeds exige 40 IDs únicos, determinismo, quotas 8/6/4/11/9/2, K 8/24/8, diversidade LO e chaves estáveis após shuffle. Aprovação humana continua PENDING. Consistência automática e exercícios resolvidos nos testes não substituem revisão independente de todas as alternativas nem calibração psicométrica. Nenhuma suspeita académica nova foi selecionada para alteração.

**Segurança/privacidade:** respostas e histórico continuam só no browser pelo código da aplicação; alojamento/autenticação podem tratar metadados técnicos. Banco, chaves e explicações são entregues em JavaScript e estão em fonte pública: não há garantia anticópia ou de scoring inviolável. CSP/headers e ausência de tracking têm checks locais e observação de headers HTTP, não certificação de segurança integral ou RGPD. Direitos, retenção de logs e revisão jurídica continuam sob responsabilidade do operador.

**Acessibilidade/mobile:** axe, teclado, navegação, focus e reflow integram a matriz. Safari/iPhone físico, tecnologia assistiva real, zoom nativo e WCAG integral permanecem NOT TESTED. O smoke Production foi Chromium desktop; não se converte a matriz local em validação remota de todos os browsers. Não foi demonstrada falha nova de score, timer, duplicação, race ou navegação nos casos aprovados, mas não se afirma inexistência universal de defeitos.

## F. Próxima fase e autorizações

1. Prioridade P1: rever a PR #6, o catálogo de hashes, checks e Preview protegido, sem reduzir o guard. Após aprovação explícita do proprietário para merge/publicação, confirmar na origem Production os JS A/B e arquivos por status, MIME e bytes, e repetir continuidade/backup/rollback compatível. Não fechar #5 por existir uma proposta ou porque o exame retoma.
2. Rever a atualização de tooling minimatch/ESLint com versões compatíveis e nova regressão. O audit completo permanece com falha; não o suprimir nem anunciar zero vulnerabilidades globais.
3. Rever e integrar a correção LF e a documentação por PR, com verify verde e autorização própria. Nenhum push ou PR foi criado por esta fase.
4. Preservar a proteção main e o processo PR-first gratuito. Qualquer alteração de branch protection/rulesets, Vercel Deployment Checks, promoção, domínio, autenticação, merge ou deployment exige autorização prévia de Gabriel. Não é necessária nova definição remota para concluir esta auditoria local.
5. Prosseguir revisão humana académica, validação assistiva/dispositivos e questões jurídicas em separado; não há endosso ISTQB/PSTQB nem aprovação académica humana nesta entrega.

**Veredicto:** funcionamento público básico VERIFIED; continuidade de dados A→B local VERIFIED; retenção do recurso A em Production FAILED; audit completo de tooling FAILED; alterações locais ainda sem CI remoto por não terem sido enviadas. **Nova release permanece BLOCKED até revisão dos riscos e autorização, sem considerar a Beta publicamente existente uma nova publicação desta fase.** Nenhuma ação remota protegida foi executada.
