# Continuidade 10G — revisão da PR #6 e entrada do programa 10G–10L

31-10-2026. **AUDIT_COMPLETED = YES; PHASE_10G = BLOCKED; RELEASE_AUTHORIZED = NO.** O relatório original [10G](phase10g-production-validation.md) foi lido integralmente e preservado. Este documento acrescenta evidência; não o transforma em aprovação de release.

## Estado real, sem confundir revisões

- Produção e origin/main: `abf15ed5376e8b34a86fc4f873a65694b7705e34`.
- main local: `a20490f6e848cd39f3b67289c96c55eb720c2691`, um commit à frente. Contém a correção LF, regressão de checkout, precondição de foco e relatório 10G. O push anterior foi rejeitado por exigir PR e verify; não foi repetido nem contornado.
- PR #6: OPEN, head `f4d9e5524b0f485e9a55e8f313b66e7b3575dbf1`, base abf15ed; verify e Vercel SUCCESS no snapshot consultado. Não contém automaticamente a20490f. São candidatos diferentes: não somar resultados como aprovação de uma árvore integrada inexistente.
- Nesta revisão: raiz pública 200, JS B `index-DB06V4Gu.js` 200, JS A `index-CTbPgljy.js` **404**, sem cookies nem redirects seguidos. Evidência datada: `tmp/phase10g-continuity/current-state.json`.
- Banco real ainda .9: 90 perguntas, 364 opções, 64 LO; preparação identificou **44 LO com apenas uma pergunta**. Isso não significa 44 perguntas obrigatórias num exame. Nenhum conteúdo, chave ou estado de aprovação foi alterado.
- Os 227 unitários/integração, 364 E2E, oito guard tests e 1000 seeds do relatório 10G são evidência daquela execução. Não foram repetidos integralmente agora. Os testes novos desta revisão estão separados abaixo.

Os nomes legados “10H” (ensaio A→B) e “10I” (PR de retenção) já existem no Git/GitHub. Neste programa novo, **10H = auditoria académica** e **10I = aprendizagem CTFL**. Referir sempre título e SHA, não apenas o número da fase.

## Causa do P1 e impacto delimitado

O HTML A referencia um nome com hash que existe apenas no build/deployment A. Depois de o domínio servir B, o ficheiro A está ausente do conjunto de ficheiros B. Cache immutable não garante que um cliente sem esse recurso em cache consiga obtê-lo da origem nova. Não há evidência de que a causa seja o LocalStorage, o writer lease ou uma migração das respostas.

Foi modelado localmente um HTML A já recebido cujos assets são pedidos depois da troca para B, num contexto novo:

| Origem de assets local   | HTML | JS A |                 Botão de exame |
| ------------------------ | ---: | ---: | -----------------------------: |
| Build B atual            |  200 |  404 | Ausente; aplicação não arranca |
| Build da PR #6, bytes LF |  200 |  200 |                     Disponível |

O ensaio local adicional A→PR #6 preservou respostas, order/options, índice, flags, ID, revisão, startedAt/deadline, histórico .4 e resultados; timer 58:00 aos dois minutos simulados, 57:00 após reabrir o perfil aos três minutos; segundo separador sem escrita. A requisição ao JS A devolveu os bytes originais.

**Conclusão:** continuidade remota de assets FAILED; continuidade de dados local VERIFIED; perda de dados de estudantes não demonstrada. A continuidade de dados num deployment remoto autorizado, incluindo rollback, continua sem prova independente completa nesta execução. Um HTML 200, um exame retomado ou um CI verde não fecham isoladamente este P1.

## Revisão das alterações reais da PR #6

Foram examinados os 16 caminhos alterados, incluindo workflow, configuração Vercel, exclusões de formatação/lint, catálogo, três verificadores, dois ficheiros de testes novos, teste de configuração e documentação. Os dois bundles foram comparados por SHA-256 com os blobs Git/catalogados, sem os imprimir como código-fonte ou reconstruir os ficheiros publicados.

A proposta preserva A/B em public/assets, impõe catálogo SHA-256 append-only, 250 entradas e menos de 32 MiB, e consulta a Production por GET para exigir no candidato os mesmos bytes de JS, CSS e oito arquivos históricos atualmente publicados. Não modifica perguntas, motor, storage, dependências, domínio ou proteção. Segundo a [documentação Vite](https://vite.dev/guide/assets.html#the-public-directory), public é copiado para dist conservando os ficheiros; a reprodução local confirmou o comportamento neste projeto.

### Resultados efetivamente obtidos

| Execução local da PR fixada por SHA                                                                                           | Resultado                                                               |                          Exit |
| ----------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- | ----------------------------: |
| node --test scripts/check-release.test.mjs scripts/check-retained-assets.test.mjs scripts/check-live-asset-retention.test.mjs | 20/20, zero skipped/cancelled/todo                                      |                             0 |
| npm run build, extração com core.autocrlf=true                                                                                | Build termina; não implica aprovação dos guards                         |                             0 |
| check-retained-assets, mesma extração Windows                                                                                 | FAILED: bundle A convertido para CRLF                                   |                             1 |
| npm run build, extração com core.autocrlf=false                                                                               | VERIFIED                                                                |                             0 |
| check-release e check-retained-assets, extração LF                                                                            | Ambos VERIFIED                                                          |                           0/0 |
| check-live-asset-retention, extração LF                                                                                       | Dez paths atuais: JS, CSS e oito arquivos iguais à Production, só GET   |                             0 |
| Fixture Git de preservação de bytes                                                                                           | Duas divergências com regras antigas; dois hashes preservados com -text |        0, asserções esperadas |
| Fixture de HTML A/recursos B                                                                                                  | Falha atual reproduzida; candidata arranca                              | 0, cenários negativo/positivo |
| Fixture A→candidata PR #6                                                                                                     | Dados preservados e JS A 200 com bytes originais                        |                             0 |

Não foram executados agora todos os unitários/E2E da PR, nem testado o seu Preview autenticado. Os checks remotos SUCCESS continuam evidência separada, associada ao head f4d9e55.

### R1 — preservar bytes no checkout, antes de aceitar integração

Os blobs Git dos dois bundles coincidem com o catálogo. A extração com core.autocrlf=true converteu 66 fins de linha em cada um e alterou os hashes. A versão LF passa. O guard deteta a corrupção e falha de forma segura; os testes com pequenos fixtures, sozinhos, não a detetavam no payload real.

A regra LF geral de a20490f ajuda nos bundles atuais LF, mas a regra explícita proposta para **artefactos imutáveis** é `public/assets/** -text`, além das regras de fontes/arquivos existentes. Não deve haver conversão de conteúdo compilado, mesmo se um asset futuro usar outros fins de linha. A regra foi testada apenas num repositório sintético local; **não foi aplicada à PR, à main ou a definições remotas**. Acrescentar uma regressão de checkout dos bytes reais/sintéticos antes de aprovar uma candidata integrada. Não “corrigir” o catálogo para aceitar os bytes acidentalmente convertidos.

### R2 — cobertura e limites que não desaparecem com CI verde

- Append-only é imposto pelo wrapper em pull_request; noutras invocações esse wrapper devolve checked=false. Um deploy manual ou rollback não recebe automaticamente a mesma garantia. O procedimento autorizado deve comparar sempre com o último catálogo aprovado; não assumir que permissões GitHub governam a CLI Vercel.
- O live check observa um instante da Production. Reconsultar main, alias, asset inventory e catálogo imediatamente antes da ação autorizada; releases sequenciais, sem publicação concorrente. TOCTOU e atribuição de aliases não ficam resolvidos por uma única consulta anterior.
- Produção indisponível bloqueia build/CI por desenho. Os testes não devem converter falhas de rede ou redirects de autenticação em SKIP/PASS. Documentar recuperação do serviço e reprovação do candidato, sem ignorar o gate.
- Regexes e guard fixam oito arquivos .1–.8, embora o catálogo aceite esses arquivos. O guard de release exige exatamente oito chunks. Uma futura mudança de compilador/hashes que exija conservar duas versões do mesmo arquivo, ou a introdução de .9 lazy, requer evolução coerente dos três verificadores e testes. Não prometer suporte genérico a novos chunks com a implementação atual.
- Os seis testes novos de catálogo cobrem casos úteis, mas não todos os limites declarados: há casos em falta para orçamento, symlinks, duplicados/ordenação separados e wrapper append-only (base errada/ref ausente/remoção real). Os seis testes live cobrem 404 e bytes alterados, mas não toda a matriz de redirects/timeouts/indisponibilidade. Não afirmar esses cenários testados.
- O live gate valida os assets da Production atual; o catálogo e o ensaio de dependências antigas complementam-no. Preservar o conjunto transitivo necessário a runtimes antigos, não só o entrypoint. Novos layouts de chunks precisam de testes próprios.
- Retenção bounded não é retenção infinita gratuita: acompanhar o orçamento e quotas existentes, sem contratação, e parar releases antes de remover arbitrariamente URLs suportados. Nenhuma limpeza automática de históricos.

### Abordagens consideradas

| Abordagem                                                             | Decisão                                                                                                                                                                                                               |
| --------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Catálogo e cópia imutável de assets, como PR #6, com hardening/testes | Recomendada: preserva arquitetura e serviços atuais; sujeita a capacidade, proveniência e dependências verificadas                                                                                                    |
| Skew Protection da plataforma                                         | Não selecionada: a [documentação atual](https://vercel.com/docs/skew-protection) indica Pro/Enterprise e frameworks suportados; não é uma garantia disponível demonstrada para este Vite/Hobby sem alterar requisitos |
| Reload automático ao falhar um chunk                                  | Não substitui retenção: se o entrypoint não carregar, o handler React nem arranca; pode ainda gerar loops ou perder alterações não guardadas                                                                          |
| Service worker, backend ou CDN novo                                   | Não justificado para este incidente; acrescenta arquitetura e pode exigir relaxar worker-src/controlos existentes                                                                                                     |

## Ordem de resolução recomendada

1. Preservar a20490f, PR #6 e evidências como árvores distintas. Preparar uma candidata única em isolamento, depois de rever a estratégia de integração; não executar merge da PR por este prompt.
2. Acrescentar preservação de bytes e testes das lacunas prioritárias, sem afrouxar guards. Verificar compatibilidade com as correções 10G locais e resolver apenas o conflito documental real.
3. Testar essa árvore exata: typecheck, lint, formato, unit/integration, guards, build, 1000 seeds, quatro projetos E2E sem retries para aprovação local, snapshots e backup. Resultados de árvores anteriores não substituem estes.
4. Fechar revisão local com inventário e hashes, plano de continuidade/recuperação, estado de advisories e limites explícitos. Antes de enviar alterações, pedir autorização de push/PR; antes de merge/publicação, obter autorização separada de Gabriel para a árvore/artefacto/target exatos.
5. Só num ensaio remoto autorizado: novo perfil sintético, exame com respostas/flags/índice guardados, backup, tempo/deadline, URLs antigos sem depender da cache; publicar a candidata aprovada; observar página que ficou aberta, refresh, reabertura, review/export/import e arquivos por bytes/MIME/status; registar proteção dos URLs previstos. Não apagar LocalStorage. Rollback só com artefacto compatível e autorização própria.
6. Declarar P1 resolvido apenas quando os critérios remotos forem satisfeitos e registados. Sem isso, 10G **BLOCKED**, mesmo com todos os checks locais verdes. Só então decidir a entrada formal em 10H académica.

## Bloqueios e trabalho independente

| Item                                                      | Classificação / trabalho permitido                                                                                                  |
| --------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| JS A 404 / continuidade de assets remota                  | P1 e gate técnico G aberto; exige resolução e observação remota autorizadas                                                         |
| Candidata integrada ainda inexistente/sem CI dessa árvore | Gate de release; preparação e testes locais permitidos, publicação não autorizada                                                   |
| Rollback remoto não testado                               | Não declarar recuperação remota validada; ensaio requer aprovação, compatibilidade e perfil sintético                               |
| Advisories moderados de tooling                           | Continuam abertos no relatório 10G; corrigir com versões compatíveis ou documentar decisão explícita de risco; não suprimir o audit |
| Aprovação académica humana                                | Gate académico/publicação; não impede pesquisa/inventário local, mas impede alegar validação humana                                 |
| AT real, dispositivos e piloto                            | Gates de K/L e limites atuais de publicação; preparação local permitida, sem PASS inventado                                         |
| Plano, registo de fontes, templates e inventário 90 itens | Executável agora, sem mudar runtime, scoring ou conteúdo                                                                            |

O [plano/checklist mestre](../superpowers/plans/2026-10-31-testlearn-10g-10l.md) fixa dependências e critérios. As fases seguintes não foram implementadas. A preparação CSV contém 90 linhas com revisão independente NOT_REVIEWED, fontes ainda NOT_VERIFIED_THIS_REVIEW e aprovação humana PENDING. Não é a revisão académica 10H.

## Evidência e continuidade

Evidências novas em `tmp/phase10g-continuity/`: current-state.json, source-baseline.json, pr6-inventory.json, pr6-line-ending-proof.json, pr6-validation.json, pr6-tests.log, pr6-live-check.log, byte-preservation-probe.json, stale-html-probe.json, continuity-candidate.json, academic-review-preparation.csv e bank-preparation.json. A primeira versão do servidor do probe teve um erro local de headers; foi corrigida apenas no diagnóstico antes dos resultados válidos, sem mudar a aplicação. Os perfis são sintéticos e os PDFs oficiais não foram copiados para o output ou Git.

**10G não está concluída como fase de release.** A auditoria está concluída; critérios remotos continuam em aberto. Não houve commit, push, merge, deployment, alteração remota, alteração académica ou migração de dados nesta revisão.
