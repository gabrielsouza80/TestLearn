# Fase 10B — primeiro Preview protegido: interrompida por P1

Data: 30 de outubro de 2026, Europe/Lisbon. **Objetivo não atingido.**
PUBLICATION_AUTHORIZED = NO. PUBLIC_BETA_READY = BLOCKED.

## Incidente e estado atual

A única tentativa utilizou explicitamente `deploy --prebuilt --target preview`, sem `--prod`, promoção, comando de atribuição de aliases ou bypass de autenticação. Apesar disso, a CLI e a API devolveram **target production**, READY, e a Vercel atribuiu automaticamente aliases de produção. O pedido anónimo ao deployment devolveu HTTP 200 e o corpo do HTML correspondeu exatamente ao `index.html` aprovado. Isto constitui **P1 bloqueante: aplicação publicamente acessível sem a autenticação exigida**.

- Deployment: `dpl_G4CHr8zB5wFwRwBNB4Tkdzw5qYJ8`.
- URL devolvido: `https://testlearn-n3etp7yxh-testlearn808005-9164.vercel.app`.
- Aliases atribuídos pela plataforma: `testlearn-lab.vercel.app` e `testlearn-lab-testlearn808005-9164.vercel.app`.
- Pedido de criação iniciado: `2026-10-30T13:51:50.361Z`.
- Target pedido e gravado no payload: `preview`; target efetivo confirmado pela API: `production`.
- Proteção do projeto: `ssoProtection.deploymentType = preview`; não protegeu este deployment de produção.
- Nenhum segundo deployment foi realizado. Os testes funcionais remotos foram interrompidos.

**Contenção confirmada em 2026-10-30T14:11:11.972Z.** O proprietário executou a suspensão reversível de `testlearn-lab` no seu terminal e escreveu o nome do projeto. A verificação independente posterior efetuou 18 pedidos anónimos: deployment específico e ambos os aliases, para `/`, `/index.html`, JS inicial, CSS e chunks históricos `.1` e `.8`. Todos devolveram HTTP 503 com `DEPLOYMENT_PAUSED`; nenhum corpo correspondeu ao asset aprovado. Evidências: `tmp/phase10b/containment-verified.json` e `paused-responses/`.

Inicialmente, a CLI recusara a suspensão não interativa com `interactive_confirmation_required`. Não se contornou essa confirmação por outra API. O primeiro comando copiado pelo proprietário tinha um separador de caminho em falta e não executou a CLI; a execução seguinte através do helper permitiu a confirmação humana. O P1 fica **contido, não resolvido**: o deployment continua classificado como produção e não foi obtido um Preview protegido. Não despausar.

O proprietário pode executar `node C:\TestLearn\tmp\phase10b\pause-manually.mjs` no seu terminal e escrever `testlearn-lab` quando solicitado. O helper preserva o prompt humano da CLI, usa exclusivamente a autenticação isolada e não cria deployments.

Verificação anterior à suspensão: `2026-10-30T14:05:48.977Z`, HTTP 200, HTML ainda igual ao aprovado, sem erro DEPLOYMENT_PAUSED. Corpo real e headers filtrados, sem cookies, em `tmp/phase10b/latest-anonymous-response.{html,json}`. Este registo é histórico; a verificação atual de suspensão é a indicada acima.

Evidência: `tmp/phase10b/{deployment-attempt,deployment-result,unexpected-production,containment-pause}.json`. O HTML anónimo teve SHA-256 `7ef5dd6f8b7703ce4ab25cbf735fe88c111b32b6f75ead931eff3f891067c3d8`, igual ao ficheiro aprovado; Content-Type `text/html; charset=utf-8`, sem redirect.

O comportamento coincide com reproduções publicadas no [issue #17069 do repositório oficial da Vercel](https://github.com/vercel/vercel/issues/17069), relativas ao primeiro deployment de projetos sem deployments anteriores. Esse relato não é uma confirmação da causa interna deste incidente. A flag e o dry-run não bastaram para assegurar o target remoto. Esta particularidade devia ter sido investigada antes do upload; a responsabilidade por essa verificação em falta não é transferida para o proprietário.

## Fonte e integridade

Ramo `main`, HEAD `53d3bf38656e29a2d8f20001904f8132a153a76b`, árvore limpa no preflight e até à criação do deployment. A correção de writer/StrictMode e o acabamento visual estavam presentes e foram inspecionados nos ficheiros reais.

Inventário inicial imutável: 148 ficheiros, `tmp/phase10b/source-SHA256SUMS.txt` e `source-inventory.json`. Fingerprint SHA-256 do inventário: `643f39e8486271f679225c89a7f30c2e94e28d3b7fe8a5b094130deb6602f462`.

Confirmados banco real e igualdade profunda com o arquivo `.9`: **90 perguntas, 364 alternativas, 64 LO, 29 grupos**, hashes dos nove arquivos `.1`–`.9` intactos. Não houve alteração académica, de scoring, esquemas, persistência ou sessões históricas. O oracle independente verificou 1000 seeds, quotas, diversidade, unicidade, determinismo e chaves após baralhar.

## Gates locais efetivamente executados

Todos terminaram com exit code 0:

| Comando                                                            | Resultado                                                                             |
| ------------------------------------------------------------------ | ------------------------------------------------------------------------------------- |
| `npm run typecheck`                                                | PASS                                                                                  |
| `npm run lint`                                                     | PASS                                                                                  |
| `npm run format:check`                                             | PASS                                                                                  |
| `npm test -- --maxWorkers=1`                                       | 226/226, 25 ficheiros, 72,78 s                                                        |
| `npm run build`                                                    | PASS; aviso existente de entry >500 kB                                                |
| `node scripts/check-release.mjs`                                   | 14 ficheiros permitidos, oito chunks históricos, zero source maps/artefactos privados |
| `node --test scripts/check-release.test.mjs`                       | 8/8                                                                                   |
| `npm run test:e2e -- --workers=1 --shard=N/4 --reporter=list,json` | N=1–4 sequencial; 364/364, 91 por projeto                                             |
| Integridade e oracle                                               | 1000/1000 seeds, banco e arquivos intactos                                            |

A matriz Chromium/Firefox/WebKit/Chromium móvel emulado foi comparada com a descoberta integral: 364 IDs únicos, zero omissões, duplicados, skips, flaky ou retries. Duração total 1084494 ms, aproximadamente 18,1 minutos. Inclui backup real com dados sintéticos, históricos, reload imediato, exclusão entre separadores, StrictMode, Fast Refresh e reinício do servidor. Estes são resultados **locais**, não smoke tests do deployment remoto.

Logs e JSON finais em `tmp/phase10b/`, incluindo `final-checks.json`, `e2e-clean-summary.json` e `integrity.json`. As evidências da fase anterior foram preservadas.

## Conta, ligação e configurações remotas

- Conta/equipa: Testlearn, slug `testlearn808005-9164`, ID `team_YNKbyfPSXwYEw0XveEc3TXRp`.
- Plano verificado: Hobby.
- Projeto existente: `testlearn-lab`, ID `prj_lFdRrkxQt2yqEpfzurOA00WJJX69`, framework Vite.
- Antes da tentativa: zero deployments, zero targets ativos, Git não ligado, apenas domínio padrão `testlearn-lab.vercel.app`; autenticação Preview ativa.
- Nenhum projeto foi criado, nenhuma integração Git configurada, nenhum serviço pago ativado e nenhum upgrade de plano solicitado.

O conector Vercel não tinha acesso a esta equipa (403; autorização da equipa devolveu 404). Foi usada a CLI oficial **59.3.0** existente na cache npm. Uma tentativa de resolução offline com versão explícita falhou numa dependência não disponível em cache; usou-se diretamente o binário existente cuja versão foi confirmada, sem alterar dependências da aplicação. A autenticação global anterior também não tinha acesso à equipa; o proprietário concluiu OAuth numa configuração isolada fora do repositório. Valores de tokens e conteúdos de `.env` não foram incluídos no relatório ou no payload.

A ligação local foi verificada pelos IDs de `.vercel/project.json` e por `project inspect` sob o scope correto. A CLI criou `.env.local` e acrescentou duas regras redundantes a `.gitignore`; apenas essas adições automáticas foram removidas após comparação com o baseline. Foram restaurados exatamente os bytes originais. `.env.local` e `.vercel/` continuam ignorados pelas regras existentes.

## Build prebuilt e ficheiros enviados

Executados `pull --environment preview` e `build --target preview`. O projeto remoto indicava Node 26, mas a CLI confirmou que `engines.node = 24.x` do `package.json` prevalece. O build correu em Node 24.19.0. Os 14 ficheiros públicos do output corresponderam, byte a byte e por SHA-256, ao build aprovado antes da autenticação; não houve diferença material da aplicação.

O dry-run inicial listou 19 ficheiros, incluindo diagnósticos da CLI com caminhos locais. O output original foi preservado. Preparou-se em `tmp/phase10b/payload/` uma cópia mínima: os 14 ficheiros públicos, `config.json` com as mesmas rotas/headers e `builds.json` mínimo com target Preview e versão da CLI. A leitura do código instalado da CLI confirmou a validação do target neste metadado. Um segundo dry-run, sem upload nem deployment, confirmou exatamente esses **16 ficheiros**.

Não foram enviados relatórios privados, diagnósticos, `tmp/`, Git history, `.env`, credenciais, backups, progresso pessoal, perfis de teste, PDFs oficiais ou source maps. A lista de ficheiros foi validada por allowlist e os metadados foram revistos para padrões de tokens antes da única criação.

Fingerprint SHA-256 do payload de 16 ficheiros: `30b34e209c37bf79349e6f3f08e086c80ae99c11db8d45896e6e25df7795bd2a`. Checksums individuais: `tmp/phase10b/upload-inventory.json`. JS inicial 702001 B / 212404 B gzip; CSS 31083 B / 6631 B gzip. Não houve otimização ou reescrita da arquitetura.

## Verificação remota e testes não executados

O acesso anónimo ao HTML falhou o gate de segurança. O corpo real foi recebido e comparado ao hash do HTML aprovado; a verificação não se limitou ao status HTTP. Não foram gerados links públicos de partilha nem tokens de bypass.

Não se executaram, depois desta falha, os smoke tests remotos de PT/EN, prática, exame, timer, 26/40, resume, duplicação, persistência, cross-tab, revisão, explicações, históricos, progresso ou backup. Também não se afirma aprovação remota de acessibilidade, mobile, headers/cache ou rotas em falta. O protocolo usado foi HTTPS, com validação TLS normal; isso não satisfaz o gate de autenticação.

Não foram importados dados reais. Não se abriu o fluxo funcional da aplicação para testar tentativas remotas; progresso de localhost não foi transferido para o domínio Vercel. Acesso de terceiros durante a exposição não foi auditado; não se pode afirmar que ninguém tenha acedido.

Custos: plano Hobby verificado, sem ativação deliberada de recursos pagos ou upgrade. Não foi efetuada uma auditoria de faturação que permita garantir um custo final. Mantêm-se os limites de avaliação manual com leitor de ecrã, zoom nativo e dispositivos físicos.

## Retenção, rollback e próximo passo permitido

Retenção e rollback **NOT_TESTED**. Os URLs/checksums desta tentativa ficam guardados para auditoria, mas ela não é um Release A protegido aprovado. Um futuro ensaio A/B precisa de nova autorização: primeiro estabelecer uma estratégia que assegure o target e proteção efetivos, depois verificar URLs específicos, eventuais aliases estáveis de laboratório, assets antigos, sessão longa, chunks históricos e rollback/redeployment. Alterações a aliases/rollback ou outro deployment não estão autorizadas por esta fase.

Prioridade imediata: manter o projeto suspenso. Os pedidos de leitura confirmaram que deployment, aliases e assets deixaram de servir a aplicação nos URLs verificados. Não despausar, promover, atribuir domínios, publicar produção ou realizar uma segunda tentativa automaticamente. A continuação depende de resolver este P1 e de autorização explícita para qualquer novo deployment.

Sem commit, push, alteração KAVTRIS, nova conta ou nova pergunta. Aprovação académica humana continua PENDING.
