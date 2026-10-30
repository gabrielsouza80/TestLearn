# Fase 9.4 — experiência de estudo e progresso

Data: 2026-10-29. Revisão académica mantida: `2026-10-27.9`.

## Âmbito e baseline

O preflight começou em `main`, HEAD `19089a821e295f72aef47f565819f4825f20bcd4`, com a árvore limpa. Foram lidos o banco real, os nove arquivos, resolver, gerador, validação de sessões, writer, backups, interfaces e testes das fases 9.2/9.3. O baseline contém 90 perguntas, 364 alternativas, 64 LO e 29 grupos de estrutura do exame. Nenhuma pergunta, tradução, chave, classificação, quota ou arquivo foi alterado; não existe revisão `.10`.

O baseline técnico anterior era 194 testes unitários/integrados e 268 E2E. O JS inicial tinha 685 059 bytes (206 901 gzip); CSS 16 186 bytes (4 169 gzip). As medições anteriores foram preservadas em `tmp/phase93/`, sem as substituir.

Problemas confirmados: ação de simulado pouco destacada; rótulos K/LO ainda visíveis no exame ativo; ausência de causa de conclusão persistida; contadores que confundiam perguntas atribuídas com visitas; recomendações ordenadas por taxas com amostras pequenas; repetição de avisos longos. A importação podia alterar a ordem do histórico, pelo que a posição no array não constituía evidência de primeira exposição.

## Alterações

- Dashboard com duas ações PT/EN: **Estudar por capítulo / Study by chapter** e **Fazer simulado CTFL / Take a CTFL practice exam**. Explica prática sem quotas, simulado de 40 perguntas, 60 minutos padrão, referência 26/40 e ausência de equivalência oficial/calibração. A opção existente de 75 minutos mantém a ressalva de elegibilidade.
- Retoma explícita da tentativa existente: modo, respostas não vazias/total e limite/restante apenas quando o relógio é utilizável. Expiração e continuidade do relógio com a página fechada são explícitas. Não cria outra sessão nem altera o payload ao navegar.
- K/LO específicos ocultos durante exame ativo. Prática e revisão concluída conservam informação educativa; ajuda geral continua disponível.
- Rótulo **Beta pública / Public Beta**; aviso conciso no contexto de estudo, limitações necessárias nos resultados e informação completa em Sobre/Privacidade/Termos/Ajuda. Blueprint, grupos LO e tabela v1.19 ficam explicados nos detalhes técnicos da ajuda.
- Módulo **Inglês para QA — Vocabulário e entrevistas / English for QA — Vocabulary and interviews**, apresentado como recurso complementar. Vocabulário e entrevistas existentes integralmente preservados, sem serviços externos.

## Causa de conclusão e compatibilidade

`Session.completionReason` é opcional. Só novas sessões recebem `null` durante a atividade e uma das seguintes causas quando concluídas:

| Valor             | Significado                                                       |
| ----------------- | ----------------------------------------------------------------- |
| `submitted`       | Submissão explícita com todas as perguntas com resposta não vazia |
| `submitted-early` | Submissão explícita com pelo menos uma resposta em branco         |
| `expired`         | Conclusão executada com o prazo já atingido                       |
| Campo ausente     | Causa histórica desconhecida; nunca reconstruída                  |

Uma seleção múltipla incompleta continua a ser uma resposta incorreta, não uma resposta em branco. A causa não afeta pontos, respostas, duração, timestamps ou idempotência de `finish`. Sessões antigas sem campo continuam sem campo mesmo quando terminadas pelo cliente novo. A validação rejeita causas contraditórias, sem substituir o progresso local.

Esquema de sessão e formato de backup continuam v1, sem migração automática. Um fixture exportado pelo cliente anterior verifica a leitura e reexportação sem perda de campos, conflitos ou causas inventadas. O cliente novo lê os backups anteriores; não se promete que clientes antigos com validação estrita leiam backups novos com este campo adicional. Atualizar o cliente antes de importar um backup novo. JSON editável não constitui prova autenticada de avaliação.

Writer síncrono, lease exclusivo, erros de armazenamento, limites de 500 sessões/8 MiB, regras de conflitos/deduplicação e mecanismo de backup não foram reescritos. A confirmação do navegador não garante fsync físico; eliminação de dados/quota continua fora dessa garantia.

## Definição das métricas

Todas as métricas de progresso usam apenas sessões concluídas, deduplicadas por ID de sessão. A tentativa em curso fica separada na retoma. Resultados globais usam as chaves da revisão original.

| Métrica                                            | Evidência usada                                                                                                           |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| Sessões concluídas                                 | IDs de sessões concluídas distintos                                                                                       |
| Perguntas vistas / primeiras exposições registadas | União de `visitedIds` por ID de pergunta, mesmo entre revisões; não mede atenção nem primeira exposição fora da aplicação |
| Visitas registadas                                 | Um registo por pergunta e sessão; não conta cada navegação na mesma sessão                                                |
| Visitas repetidas                                  | Soma das visitas por sessão menos IDs distintos vistos                                                                    |
| Respostas                                          | Seleções não vazias, incluindo tentativas repetidas                                                                       |
| Corretas / incorretas                              | Correspondência exata com a chave original / restantes respostas não vazias                                               |
| Sem resposta                                       | Perguntas atribuídas com seleção vazia, incluindo as nunca abertas                                                        |

Uma resposta sem visita registada conta como resposta, mas nunca é convertida numa visita. Não se inventa uma ordem cronológica pelo índice no array importado.

## Capítulos e recomendações

Os seis capítulos mostram perguntas únicas respondidas/disponíveis na revisão atual, primeiras respostas corretas/respondidas e prática repetida correta/respostas. Cobertura do banco não é domínio do syllabus. Histórico de outras revisões permanece no histórico e nos totais globais, mas não entra nos denominadores de desempenho do capítulo atual.

Primeira visita classificável: primeira sessão com evidência nessa revisão, visita e resposta presentes, sem sobreposição/empate com a sessão seguinte e sem visita/resposta conhecida ao mesmo ID noutra revisão. Repetição classificável: existe visita nesta revisão numa sessão terminada antes do início desta, com início estritamente anterior. Ausência de visitas, sobreposições ou ordem não demonstrável ficam explicitamente desconhecidas. Não se reconstitui o instante de abertura individual a partir das datas da sessão.

Heurística do produto: pelo menos **cinco perguntas distintas respondidas na primeira visita classificável** e **duas incorretas** para sugerir revisão. Exclui respostas em branco e repetições da amostra inicial. Não ordena capítulos por taxa: mantém a ordem dos capítulos. Não usa intervalos de confiança, diagnóstico psicométrico ou previsão de aprovação. O capítulo 6 tem quatro perguntas e não atinge este mínimo; isso é apresentado como limitação do banco, não insuficiência do estudante.

Com pouca evidência: “Há ainda poucas respostas para identificar áreas que precisam de mais estudo.” / “Not enough answers yet to identify reliable study priorities.” Cada capítulo oferece uma ação acessível de prática, sem iniciar uma segunda tentativa automaticamente.

## Validação final

| Comando / controlo                           | Resultado efetivamente executado                                                                                                                                      |
| -------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm run typecheck`                          | PASS, exit 0                                                                                                                                                          |
| `npm run lint`                               | PASS, exit 0                                                                                                                                                          |
| `npm run format:check`                       | PASS, exit 0                                                                                                                                                          |
| `npm test`                                   | 213/213, 23 ficheiros, 27.59 s                                                                                                                                        |
| `npm run build`                              | PASS; aviso de entry >500 kB permanece                                                                                                                                |
| `npm run test:e2e`                           | 312/312, 5.8m, 78 casos × 4 projetos, dois workers, zero retries/skips                                                                                                |
| `node scripts/check-release.mjs`             | PASS, 14 ficheiros permitidos, zero assets privados/source maps                                                                                                       |
| `node --test scripts/check-release.test.mjs` | 8/8                                                                                                                                                                   |
| Oráculo independente de estrutura            | 1 000 seeds determinísticos; 29 quotas/diversidade, 40 IDs únicos e chaves após shuffle                                                                               |
| Integridade                                  | 90 objetos profundamente iguais ao preflight e snapshot .9; hashes .1–.9, banco/fontes/editorial, dependências, scoring, writer, backup e conteúdo inglês preservados |

A primeira matriz completa terminou em **296 PASS / 12 FAIL**: três cenários repetidos nos quatro projetos. Dois procuravam títulos anteriores; outro revelou um espaço em falta entre LO e K na prática. Corrigiram-se os títulos esperados e o espaço na UI, mantendo asserções exatas e todos os testes, timeouts e retries. Cinco testes dirigidos passaram antes da nova matriz completa. Foi acrescentado um caso de texto a 200%, aumentando de 308 para 312 execuções finais.

Os primeiros testes unitários também detetaram expectativas antigas de CTA/causa histórica e um fixture legado com o novo marcador; foram corrigidos mantendo a verificação de ausência de causas em legados. Lint detetou um import não usado, removido. As sondas a 200% detetaram overflow real do título/nomes de capítulo e de uma descrição dos filtros; foram corrigidos com quebra de texto e contadores móveis numa coluna. Não se classificaram essas execuções intermédias como PASS.

### Acessibilidade e utilização

Chromium, Firefox, WebKit e emulação móvel Chromium passaram a matriz. Inclui teclado, foco, filtros, ambas as línguas, nova retoma, resultados, gravação/reload imediato, fecho/reabertura e proteção entre separadores. Os dois CTAs ficam integralmente no viewport desktop de 1280×800; capturas desktop/móveis foram revistas. Sonda de texto de 14,4 para 28,8 px passou nas páginas dashboard/progresso/prática a 1280/640/320 px sem scroll horizontal; axe não encontrou violações nesses cenários. A regressão a 320 px/200% também passou nos quatro projetos. A ajuda técnica foi verificada em PT e EN.

Isto não demonstra zoom nativo, leitor de ecrã, WCAG integral nem dispositivos físicos. Motores: Chromium 156.0.8078.4, Firefox 157.0 e WebKit 27.2; a emulação iPhone 13 usa Chromium, não iOS real.

### Assets e desempenho

JS inicial: **685 059 → 695149 bytes**, delta 10090 (+1.5%); gzip **206 901 → 210344 bytes**, delta 3443 (+1.7%). CSS: 16 186/4 169 → 17545/4387 bytes/gzip. JS total: 1896956; oito chunks históricos continuam lazy. Grafo sem módulos de tmp/docs/tests e sem arquivos históricos no entry; zero pedidos de arquivos no arranque atual e ao abrir histórico apenas da revisão atual.

Observação sintética local, sem CPU/rede limitadas: com 500 sessões, backup 1523484 bytes; export/parse/plano 119.7/116.7/63.2 ms. Arranque sem/com 500 sessões 1267.3/1472 ms; abrir histórico 205.5 ms e preview de backup 573.3 ms. Estes valores individuais variaram entre execuções: não demonstram equivalência de velocidade com a fase anterior.

Comparação adicional no mesmo processo de browser, três repetições por versão/carga, alternando ordem, medianas locais:

| Fase | Sessões sintéticas | Arranque até pronto (ms) | Abrir histórico (ms) |
| ---- | ------------------ | ------------------------ | -------------------- |
| 9.3  | 0                  | 275.3                    | —                    |
| 9.3  | 500                | 524.1                    | 299.1                |
| 9.4  | 0                  | 268.4                    | —                    |
| 9.4  | 500                | 470.6                    | 131.5                |

Amostra pequena sem significância estatística, rede móvel, dispositivo modesto ou garantia de ausência de long tasks. Validação de grandes backups continua síncrona. O mesmo ficheiro realmente descarregado em Chromium foi importado em Firefox/WebKit, com igualdade profunda de sessões, opções, respostas, timestamps e revisões .4/.9.

### Resultado e entrega

Definition of Done **cumprida no âmbito técnico local**; não equivale a PUBLIC_BETA_READY. Sem P0/P1 funcionais conhecidos por resolver nos cenários exercitados. **P0 externos de publicação:** operador/contacto/direitos/privacidade, retenção remota/HTTPS/cache/rollback e autorização de publicação. **P2:** entry >500 kB, dispositivos modestos/físicos, zoom nativo/leitor, quota e limite de histórico, heurística não calibrada e leitura de novos backups por clientes antigos estritos.

Gates separados: TECHNICAL_RELEASE_CANDIDATE_READY=PASS; PUBLIC_BETA_READY=BLOCKED; REMOTE_ASSET_RETENTION=NOT_TESTED; OWNER_PRIVACY_AND_CONTACT=OWNER_ACTION_REQUIRED; ACADEMIC_HUMAN_APPROVAL=OWNER_ACTION_REQUIRED (humanApproval=PENDING); PUBLICATION_AUTHORIZED=NO. Evidências locais em `tmp/phase94/`, fora dos assets publicados. O relatório central preserva a avaliação anterior em `previousPhase93Assessment`.

Próximo passo exato: executar e registar o checklist manual de leitor de ecrã e zoom nativo 200/400% contra esta revisão local. Depois resolver os gates do operador e obter autorização específica antes de qualquer ensaio remoto TestLearn. Nenhum commit, push ou deploy foi efetuado; HEAD permanece o baseline e a árvore contém apenas as alterações locais desta fase.

## Limites e gates

Não há publicação, commit, push, acesso a KAVTRIS, recursos remotos Vercel ou dependências novas nesta fase. Aprovação académica humana continua `PENDING`; não há piloto real nem calibração psicométrica.

Os testes locais não desbloqueiam retenção remota, HTTPS/caching/rollback do alojamento, identidade/contacto/privacidade/direitos do operador ou autorização de publicação. Leitor de ecrã manual, zoom nativo e dispositivos físicos continuam sem validação completa. WebKit em Windows e emulação móvel Chromium não demonstram Safari/iPhone físicos.

## Entrega Git posterior à validação

Em 2026-10-30, o responsável autorizou explicitamente vários commits na main e push para origin/main. Implementação: `6ff0a8c`; testes: `3b206f7ac9d7b45a9ddd01c9c0bfc2151a9b0196`. Os resultados de QA acima foram reutilizados, sem alterar o runtime ou os testes depois da validação. As referências anteriores a trabalho não commitado descrevem o momento dessa avaliação. Esta entrega Git não autoriza nem executa deploy; os gates de publicação e aprovação académica mantêm-se.
