# Fase 10G — fecho técnico, 05-11-2026

**Estado técnico: ENCERRADA, com as limitações residuais aceites por Gabriel.** Este registo encerra os dois critérios que a decisão do ensaio complementar ainda deixava pendentes: conclusão positiva do Quality pós-merge e documentação fiel da distinção entre a simulação nova e a observação original perdida. Não declara recuperada essa observação, aprovação académica, conformidade WCAG integral ou ausência de risco futuro.

## Identidade e confirmações independentes

| Elemento           | Evidência confirmada nesta execução                                                                                                                                                 |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Production / main  | `6b378758602119f402d76e49abe5c6430d99b47f`                                                                                                                                          |
| PR #7 integrada    | Head autorizado `81fc1a5ab9a64764f247348ce6c996db3a6a0955`, árvore `200e5d9e499fff8aba725a7aceb47284ed491f0d`; release exclusivamente pela PR #7                                    |
| Quality pós-merge  | [Run 42061010519](https://github.com/gabrielsouza80/TestLearn/actions/runs/42061010519), `completed/success`, head exato `6b378758…`; atualizado em `2026-11-05T17:00:36Z`          |
| Deployment         | API Vercel: `dpl_3XxiEew9BgbUpXdt7a7KdEv34Fr3`, `READY`, target `production`, source `git`, branch `main`, SHA exato acima; alias `testlearn-ctfl.vercel.app`                       |
| develop preservada | `c551cca958add939fee9a7b0e82d0734f5a2aa32`; trabalho 10H/10I não publicado por esta execução                                                                                        |
| Histórico A        | GET atual do URL exato `/assets/index-CTbPgljy.js`: HTTP 200, 702764 bytes, SHA-256 `6def132bdf263f78c2b48798f917bc82e80ba05bd8b04b04689a79c0020629b1`, igualdade com bytes retidos |
| Histórico B        | GET atual `/assets/index-DB06V4Gu.js`: HTTP 200, 702777 bytes, SHA-256 `250eddc57ea8a0fe2c1722669a2826cc5222e76a9b89a30b65e41c1cd33d6b65`, igualdade com bytes retidos              |

Os dois GET atuais observaram `X-Vercel-Cache: HIT` e `Cache-Control: public, max-age=31536000, immutable`. Esta evidência pertence ao domínio público; os checks locais/Preview, por si só, nunca provaram retenção nesse domínio. Um GET atual também não prova que todas as caches de todos os clientes foram recuperadas.

## Resultados já executados e auditados

- Verificação da publicação real: 15/15 ficheiros retidos com bytes corretos; A recuperado para HTTP 200; associação do deployment/SHA; headers/rotas/proteção; continuidade da sessão sintética original, histórico, revisão, respostas, ordenação, flags e deadline; reabertura controlada; score sintético 2/40, 38 não respondidas; backup/importação e casos negativos. O relato inicial foi corretamente `PARTIAL` pela instrumentação de cache incompleta, não é reescrito como execução integral sem falhas.
- O auxiliar inicial procurou um botão incorreto e fechou o perfil temporário que recebera a 404 antes do merge. A observação desse perfil durante a transição real foi **PERDIDA / NÃO CONCLUÍDA**. Uma segunda falha local (`deployment is not defined`) também foi preservada; os checks HTTP restantes foram depois executados separadamente. Nenhum destes incidentes foi escondido ou classificado como defeito comprovado da aplicação.
- Ensaio complementar autorizado: **6/6 PASS**, auditado em `result-progress.json`, `decision.json` e hashes de evidência; nesta execução os 22 ficheiros indexados voltaram a corresponder aos hashes e tamanhos registados. Servidor loopback com os bytes públicos reais, perfis persistentes novos exclusivamente sintéticos e cache HTTP real dos browsers. Chromium demonstrou 404 servida de disco sem novo pedido à origem já corrigida; recuperação explícita por revalidação/bypass preservou todo o LocalStorage e a reabertura. O HTML B funcionou apesar da cache negativa de A. Firefox/WebKit revalidaram no reload normal nos cenários ensaiados. O ensaio não foi uma segunda publicação nem a transição original.
- O Quality que estava `IN_PROGRESS` nos relatórios anteriores terminou agora com `SUCCESS`. As suites da 10G não foram repetidas sem razão; os testes locais desta tarefa verificam alterações novas da 10H e têm registo próprio.

O ensaio regista mensagens de consola específicas de CSP/404 no cenário sintético, sem `pageErrors`, e o seu âmbito é recuperação do módulo e preservação dos dados. Não constitui auditoria visual completa, nem prova de comportamento em todos os dispositivos físicos.

## Efeitos automáticos do GitHub

PR #6: GitHub marca `MERGED`, `mergedAt=2026-11-05T16:03:33Z`, merge commit associado `81fc1a5ab9a64764f247348ce6c996db3a6a0955`; head original continua `f4d9e5524b0f485e9a55e8f313b66e7b3575dbf1`. É o efeito indireto da ancestralidade integrada pela PR #7, não um merge manual separado da PR #6.

Issue #5: GitHub marca `CLOSED`, `closedAt=2026-11-05T16:03:35Z`, como efeito automático da integração. Nesta tarefa apenas se consultaram os estados. Não se editaram PR #6, PR #7 ou issue #5. O fecho automático da issue, isoladamente, não foi critério técnico de sucesso.

## Limitações aceites e monitorização futura

- Risco de ferramentas de desenvolvimento: sete entradas moderadas do audit associadas à cadeia minimatch, conforme avaliação individual anterior; sem exposição demonstrada no runtime de Production. O aceite de Gabriel não transforma `npm audit` em PASS; não houve upgrade nesta tarefa.
- Cache negativa antiga pode prolongar o ecrã em branco em alguns perfis. Primeiro exportar backup quando a aplicação responde; tentar recarregar ignorando a cache/revalidar o recurso, sem apagar LocalStorage, dados do site ou histórico. O ensaio demonstra cenários limitados, não recuperação instantânea universal.
- Não existe rollback instantâneo comprovadamente seguro para retenção. Não restaurar automaticamente o deployment conhecido sem A; preferir recuperação para a frente preservando a união dos assets e formatos históricos. Qualquer nova publicação/rollback requer autorização própria, alvo exato e testes de continuidade.
- Monitorização futura de disponibilidade/hashes/erros de assets, relatos de ecrã em branco e continuidade/backup. Os checkpoints programados +1h/+24h não estão certificados como executados por este fecho; um GET posterior isolado não substitui todo o respetivo plano.
- Novas alterações de conteúdo/esquema/importação exigem verificação de compatibilidade e novo gate de release. A revisão `.10` preparada na 10H não está em Production.
- Aprovação académica humana das 90 perguntas, calibração, tradução, revisão assistiva/manual, Safari/iPhone físico e WCAG integral são trabalho independente, ainda pendente. 10H não está concluída.

## Evidência e recuperação preservadas

Relatórios originais, mantidos sem alterações, em `C:/TestLearn/tmp/`:

- `phase10g-rc-verification-20261105/report.md` e `release-and-recovery.md`;
- `phase10g-blocker-assessment-20261105/assessment.md` e `release-procedure.md`;
- `phase10g-production-release-20261105/release-result.md`, resultados parciais, snapshots, perfis e backups sintéticos;
- `phase10g-cache-complement-20261105/report.md`, `result-progress.json`, `decision.json` e `evidence-sha256.json`;
- Confirmação independente atual: `phase10h-batch1-20261105/closure-independent-evidence.json` (refs, Quality final, PR #6, issue #5, headers/hashes A/B).

Este registo posterior resolve estados temporários `OPEN/IN_PROGRESS` dos checkpoints anteriores, sem apagar a cronologia. Nenhuma alteração externa, commit, push, merge, promoção, deployment ou rollback foi realizada nesta tarefa.
