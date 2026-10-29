# Fase 9.3 — resultados e gates

29-10-2026. Validação técnica local concluída. **PUBLICATION_AUTHORIZED = NO**, **PUBLIC_BETA_READY = BLOCKED**. Sem commit, push, deploy, projeto criado, domínio ou recurso pago. A orientação de retoma mais recente proíbe commits/push; nenhuma dessas ações foi executada. O trabalho local da fase 9.2 mantém-se preservado.

> Entrega Git posterior à avaliação: o responsável autorizou explicitamente vários commits e push para main. A implementação/configuração validada está no commit `f2e2ab93ee8660a623a44e5c42a7e3e08fde0bd2`; a documentação de entrega segue num commit separado. As referências anteriores a trabalho local/sem commits descrevem o checkpoint de validação. Não foi autorizado deploy nem alterado PUBLICATION_AUTHORIZED=NO.

## QA efetivamente executada

| Comando/verificação                          | Resultado final                                         | Exit |
| -------------------------------------------- | ------------------------------------------------------- | ---: |
| `npm run typecheck`                          | PASS                                                    |    0 |
| `npm run lint`                               | PASS, sem warnings                                      |    0 |
| `npm run format:check`                       | PASS; repetido após documentação                        |    0 |
| `npm test`                                   | **194/194**, 22 ficheiros, 27,40 s                      |    0 |
| `npm run build`                              | PASS; aviso de chunk >500 kB conservado                 |    0 |
| `npm run test:e2e`                           | **268/268**, dois workers, zero retries locais, 4,9 min |    0 |
| `node scripts/check-release.mjs`             | PASS                                                    |    0 |
| `node --test scripts/check-release.test.mjs` | **8/8**, zero skipped                                   |    0 |
| Integridade e 1 000 seeds                    | PASS; 29 grupos e quotas/diversidade                    |    0 |

Baseline novamente executada antes da implementação: **165/165** unitários/integração, **100/100** E2E e **8/8** guard; entrada 671 699 B / 202 402 B gzip. Checkpoints conservados: 193/193 e 264/264 antes dos últimos probes; depois das correções de histórico/texto e dos novos casos, 194/194 e 268/268 sobre o código final. Não se usou um resultado antigo para aprovar código posterior.

A matriz final executa **67 casos em cada um dos quatro projetos**: Chromium desktop, Firefox desktop, WebKit desktop e emulação móvel Chromium. Inclui os testes anteriores, 5 novos casos de durabilidade e 12 de backup, sem desativar assertions ou aumentar timeouts. As 29 novas verificações unitárias incluem validação de backup, lease, configuração e histórico grande. Os resultados dos 48 casos dirigidos são evidência intermédia, não substituto da matriz final.

Banco executável profundamente igual ao preflight e snapshot `.9`: **90 perguntas / 364 alternativas / 64 LO**. Nove SHA-256 e materiais privados da fase 8 intactos. **1 000 seeds**: 40 IDs únicos, 29 grupos, quotas de capítulos **8/6/4/11/9/2**, K **8/24/8**, diversidade e determinismo. Chaves estáveis após baralhar. Engine de scoring, perguntas, metadados académicos e arquivos não mudaram; o helper de contagem de visitas foi otimizado sem alterar resultados. Dependências inalteradas; package/lock só acrescentam Node 24.x.

Logs/inventários/recibo em `tmp/phase93`, fora de dist. A verificação de âmbito usa o inventário do início da fase 9.3, distinguindo o trabalho já existente da fase 9.2.

## Gates independentes

| Gate                      | Estado e fronteira                                                                                                                 |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| DATA_DURABILITY           | **PASS** — aceitação síncrona pelo browser antes de aplicar a alteração, lease e falhas explícitas; não é garantia física de disco |
| BACKUP_EXPORT             | **PASS** — download real, sem modificar a origem, até 500 sessões sintéticas exercitadas                                           |
| BACKUP_IMPORT             | **PASS** — validação, preview, confirmação, merge conservador, rejeições e falha atómica                                           |
| HISTORICAL_COMPATIBILITY  | **PASS** — snapshots `.1`–`.9` e round-trip das nove revisões; sem migração/fallback                                               |
| CROSS_BROWSER_SUPPORT     | **PASS** — engines/matriz indicados; não equivale a dispositivos físicos                                                           |
| ACCESSIBILITY             | **NOT_TESTED** integralmente — teclado/axe/reflow/texto 200% PASS no âmbito exercitado; zoom nativo/AT manual pendentes            |
| VERCEL_CONFIG_READY       | **PASS** — preparação local estática e isolada; não prova configuração remota                                                      |
| REMOTE_ASSET_RETENTION    | **NOT_TESTED** — condição bloqueante para publicar                                                                                 |
| OWNER_PRIVACY_AND_CONTACT | **OWNER_ACTION_REQUIRED**                                                                                                          |
| ACADEMIC_HUMAN_APPROVAL   | **OWNER_ACTION_REQUIRED** — humanApproval continua PENDING                                                                         |
| PUBLICATION_AUTHORIZED    | **BLOCKED — NO**                                                                                                                   |

TECHNICAL_RELEASE_CANDIDATE_READY = PASS no âmbito local validado; beta pública e aprovação académica permanecem bloqueadas por gates independentes.

## Falhas intermédias conservadas

- Fixtures iniciais de Web Locks tinham uma assinatura TypeScript incompleta; corrigida sem alterar a API de produção.
- A alteração do corte automático de 500 exigiu atualizar o teste: agora verifica recusa e preservação dos bytes/primeira tentativa, em vez de aceitar eliminação silenciosa.
- Testes jsdom de remontagem/expiração passaram a esperar o ciclo real de aquisição/libertação da reserva; não se acrescentaram sleeps.
- O primeiro fixture E2E tentou carregar arquivos JSON pela importação nativa Node sem atributo JSON; foi substituído por fixture independente do formato wire. O carregamento de produção não foi alterado.
- A primeira passagem de UI detetou regresso de foco incorreto ao cancelar; corrigido no componente. Uma expectativa de checkbox foi corrigida para verificar uma opção selecionada: distratores ficam corretamente desativados quando a cardinalidade já está preenchida.
- Lint detetou limpeza de estado em efeito, mutação de objeto de estado e import não utilizado. A invalidação de operações usa agora um token em ref e preview derivado do snapshot, sem cascata de setters no efeito.
- Um teste de configuração assumia LF; passou a aceitar CRLF/LF, conservando todas as verificações de exclusão.
- A primeira matriz completa com oito workers não produziu resultado final válido: memória esgotada e browsers encerrados. Repetição completa com dois workers, sem remover testes, aumentar timeouts ou alterar retries.

- O ensaio inicial de 500 sessões não conseguia acionar o download dentro do timeout. A contagem de visitas reconstruía o conjunto anterior para cada pergunta e o timer fazia renders mesmo em páginas sem exame ativo. Corrigiram-se esses dois trabalhos repetidos, preservando resultados; acrescentou-se regressão de 500 sessões nos quatro projetos.
- A ampliação real do texto CSS para 200% revelou overflow a 640/320 px. Corrigiram-se quebra do cabeçalho, link de salto baseado em transform e mínimos da grelha de navegação, sem reduzir o texto. A sonda final mede 14,4 → 28,8 px e largura 1280/640/320 sem overflow.
- O primeiro script axe isolado usou `browser.newPage()` com contexto pertencente à página; passou a usar `browser.newContext().newPage()`, como exige axe. Uma sonda posterior ainda apontava ao bundle anterior: foi identificada e repetida contra dist atual. Logs anteriores preservados.
- As primeiras medições guardavam screenshots/diagnóstico dentro do intervalo de download; a medição final retirou esse overhead. Não se apresentaram tempos instrumentados como a medida final limpa.

## Desempenho final

| Artefacto                | Baseline da fase 9.2 | Final da fase 9.3 |
| ------------------------ | -------------------: | ----------------: |
| JS inicial               |            671 699 B |         685 059 B |
| JS inicial gzip          |            202 402 B |         206 901 B |
| CSS / gzip               |     15 696 / 4 035 B |  16 186 / 4 169 B |
| JS total, incluindo lazy |          1 873 506 B |       1 886 866 B |

Delta JS inicial **+13 360 B (+1,99%)**, gzip **+4 499 B (+2,22%)**. Nove chunks JS (entrada + oito arquivos lazy), um CSS; 14 ficheiros no inventário permitido. Zero arquivos históricos na entrada, zero módulos privados/docs/tmp/testes no grafo; zero source maps ou PDFs emitidos. Painel novo não pede arquivos históricos. O aviso >500 kB permanece.

Medição isolada final em `tmp/phase93/performance.json`, sem suite paralela, sem throttling e só com dados sintéticos. Uma observação por cenário no desktop local, não percentis, SLA ou benchmark de dispositivo físico:

| Medida                    | 100 sessões | 500 sessões |
| ------------------------- | ----------: | ----------: |
| Backup compacto           |   301 584 B | 1 507 984 B |
| Exportação/validação Node |     82,4 ms |    103,2 ms |
| Parse/validação Node      |     45,0 ms |    120,5 ms |
| Plano de importação Node  |     21,6 ms |     55,5 ms |

No browser, painel vazio 317,8 ms e perfil de 500 sessões 581,5 ms até pronto; abrir histórico 297,2 ms, clique/exportação até evento de download 193,0 ms e seleção do ficheiro até preview 620,4 ms. Importar histórico grande envolve trabalho síncrono e pode bloquear brevemente a UI; não se demonstrou ausência de long tasks nem desempenho em dispositivo modesto. Limite 8 MiB/quota do browser e avaliação física continuam importantes. A primeira medição identificou um gargalo real e não foi descartada como ruído.

O mesmo ficheiro descarregado em Chromium foi importado em **Firefox 157.0 e WebKit 27.2**, em perfis novos: igualdade profunda das sessões, IDs, escolhas, histórico e revisões `.4`/`.9`, incluindo múltiplas e a ordem histórica. Sem transmissão do backup a serviços; só assets locais da aplicação/arquivos carregam.

## Acessibilidade e operação Vercel

Reflow, teclado, foco, erros, confirmação, opções e estados de revisão foram exercitados nos testes de browser. A sonda de texto a 200% passou a 1280/640/320 px; axe não reportou violações nos cenários exercitados. **Não é zoom real.** O atalho Control+= no contexto automatizado manteve viewport 1280 e DPR 1: zoom nativo **NOT_TESTED**. Leitor de ecrã, dispositivos físicos e WCAG integral **NOT_TESTED**; checklist em [browsers/acessibilidade](phase9.3-cross-browser-accessibility.md).

A integração Vercel foi usada em **duas pesquisas de documentação, somente leitura**. Não se chamaram ferramentas de projeto/conta, logs, variáveis ou mutações, nem comandos CLI Vercel. Não existe ligação `.vercel/project.json`. Registo do âmbito observado em `tmp/phase93/vercel-operations.json`; isto não é uma auditoria de toda a conta. Nenhum projeto/deploy/domínio/recurso pago/KAVTRIS foi acedido ou alterado por esta execução. A preparação local e o ensaio remoto ainda necessário estão em [preflight Vercel](phase9.3-vercel-preflight.md).

## P0/P1/P2 e próximo passo

**P0 externos:** identidade/contacto/direitos e privacidade do host; retenção remota, HTTPS/headers/cache/rollback demonstrados; source e artefacto exatos revistos e autorização explícita. REMOTE_ASSET_RETENTION fica NOT_TESTED e impede publicar. PUBLICATION_AUTHORIZED continua NO.

**P1:** nenhum defeito funcional ou corrida de perda de dados confirmado por resolver no âmbito final exercitado. Se o bug de durabilidade voltar a ser reproduzível em condições suportadas, DATA_DURABILITY passa a FAIL e bloqueia release; não é reclassificado como P2 para contornar o problema.

**P2/limites:** memória do ambiente exige dois workers; quota/eliminação do storage pelo navegador; um único escritor por origem; 500 concluídas sem corte automático; JSON editável, sem autenticidade; validação de grandes ficheiros síncrona; ausência de testes físicos/leitor/zoom nativo; bundle >500 kB; aprovação académica humana, piloto e calibração pendentes.

Próximo passo recomendado: o responsável executar o checklist manual de leitor de ecrã/zoom nativo. Depois rever titular/contacto/direitos e elegibilidade Hobby e, só com nova autorização, realizar o ensaio remoto descartável TestLearn e validar a retenção/rollback. Não ligar Git, criar projeto, fazer commit/push ou publicar por inferência desta validação.
