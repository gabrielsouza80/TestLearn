# Correção urgente da reserva de escrita

Data: 2026-10-30. Projeto `C:\TestLearn`, revisão académica `2026-10-27.9`.

## Preflight e causa reproduzida

HEAD `19089a821e295f72aef47f565819f4825f20bcd4`, ramo main, com as alterações locais concluídas da Fase 9.4 já presentes. Foram preservadas. Antes de editar, guardou-se um inventário de hashes da árvore e igualdade profunda do banco real em `tmp/writer-fix/baseline.json`.

O problema foi classificado como **P1 bloqueante de release**, sem presumir que todo aviso de concorrência fosse falso. Reproduções isoladas, sem usar ou limpar o perfil do utilizador:

| Situação antes da correção                    | Botão de simulado                         | Web Locks                       |
| --------------------------------------------- | ----------------------------------------- | ------------------------------- |
| Produção, um separador saudável               | Disponível                                | Um proprietário legítimo        |
| Produção, segundo separador                   | Desativado, corretamente                  | Proprietário da primeira página |
| Primeira página fechada                       | Continua desativado, sem nova verificação | Zero locks ativos               |
| Segundo separador recarregado                 | Disponível                                | Novo proprietário               |
| Desenvolvimento, apenas uma página StrictMode | Desativado indevidamente                  | Zero locks ativos               |
| Refresh e Fast Refresh em desenvolvimento     | Bloqueio reproduzido                      | Zero locks ativos               |

Evidência anterior: `tmp/writer-fix/before.json`. `navigator.locks.query()` e uma aquisição não bloqueante na reprodução confirmaram a libertação; não se inferiu o fecho de outra página apenas por relógio ou ausência de atividade.

**Causa técnica:** `release()` resolvia o callback de retenção, mas não aguardava a conclusão do pedido no navegador. StrictMode executa setup → cleanup → setup. O pedido cancelado ainda podia ocupar a reserva quando o seguinte, com `ifAvailable`, era avaliado. Este recebia `busy`; depois o pedido anterior terminava e deixava zero locks, mas a UI conservava o estado busy sem retry. Os testes anteriores exerciam produção, sem o ciclo StrictMode de desenvolvimento. Um proprietário de fundo real também conserva legitimamente a reserva até libertar ou terminar: não é automaticamente um lock abandonado.

## Correção e limites de segurança

- O writer serializa os próprios pedidos até o pedido anterior terminar, incluindo o reconhecimento da libertação pelo navegador. Pedidos simultâneos partilham uma aquisição pendente. Tokens de geração invalidam callbacks de ciclos já cancelados.
- Conserva Web Locks exclusivo e `ifAvailable: true`. Não usa TTL, lock no LocalStorage, roubo de reserva, polling para declarar outro separador morto ou gravação sem autorização.
- A aquisição também recusa armazenamento ilegível. Cada gravação continua síncrona e compara o valor original antes de aplicar estado à UI.
- **Tentar obter acesso de escrita / Retry write access** permite repetir a verificação sem recarregar quando o snapshot não mudou. Não cria sessões nem altera dados por si só.
- **Libertar edição neste separador / Release editing in this tab** conserva a página em consulta, sem reserva. Não liberta automaticamente ao perder foco/ficar oculta, evitando revogar a reserva de uma página saudável em fundo.
- Alterações externas libertam a reserva local e mantêm o bloqueio seguro. O utilizador tem de **Recarregar o progresso guardado** e validar o snapshot atualizado. O retry nunca adota silenciosamente dados diferentes para sobrescrever com o snapshot antigo.
- Sessões inacabadas mantêm o caminho Continuar sessão. O botão de novo exame continua desativado nessa situação, com explicação. Uma sessão concluída não impede criar a seguinte, até ao limite de histórico existente.
- Sem Web Locks/contexto seguro ou com storage bloqueado, a edição continua bloqueada com ação de recuperação. A cópia explica o que não está disponível e distingue reserva de escrita de edição efetiva.

Não existe alteração do esquema de sessões, formato v1 de backups, perguntas, opções, chaves, scoring, quotas ou arquivos. Não há eliminação de LocalStorage para recuperar locks. O reset de progresso existente não é chamado por nenhuma ação nova.

## QA final

Resultados finais efetivamente executados:

| Comando / controlo                                                         | Resultado                                                                                                        |
| -------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `npm run typecheck`                                                        | PASS, exit 0                                                                                                     |
| `npm run lint`                                                             | PASS, exit 0                                                                                                     |
| `npm run format:check`                                                     | PASS, exit 0                                                                                                     |
| `npm test`                                                                 | **223/223**, 24 ficheiros, 26.66 s                                                                               |
| `npm run build`                                                            | PASS; aviso de entry >500 kB permanece                                                                           |
| `npm run test:e2e -- --workers=1 --shard=N/4 --reporter=list,json`, N=1..4 | **352/352**, 15.1m sequential shards; quatro shards sequenciais, 88 casos por projeto, zero skips/retries        |
| `node scripts/check-release.mjs`                                           | PASS, 14 assets permitidos, oito chunks históricos, zero assets privados/source maps                             |
| `node --test scripts/check-release.test.mjs`                               | **8/8**                                                                                                          |
| Integridade independente                                                   | **1 000 seeds**, 29 grupos/quota/diversidade, 40 IDs únicos, chaves estáveis após shuffle                        |
| Banco e arquivos                                                           | 90 objetos profundamente iguais ao baseline; 364 alternativas, 64 LO, hashes .1–.9 intactos                      |
| Âmbito                                                                     | Fase 9.4 preservada; engine/scoring, resolver, esquemas, backup, dependências e Playwright config sem alterações |

### Cenários pedidos

| Cenário                                  | Evidência final                                                                                               |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Um separador saudável                    | Exame gravado, 40 IDs; dois exames sucessivos preservam os dois registos                                      |
| Sessão inacabada                         | Novo exame bloqueado com explicação; Continuar mantém ID/payload                                              |
| Dois separadores / proprietário de fundo | Retry recusado; lock original e bytes intactos                                                                |
| Fecho do proprietário                    | Zero locks confirmado antes de retry; segundo separador edita sem reload                                      |
| Refresh do proprietário                  | Reaquisição válida, sem permitir roubo pelo segundo                                                           |
| Retry e libertação voluntária            | Sem mutação ao libertar; dados externos diferentes exigem reload                                              |
| Reinício de browser                      | Dois lançamentos reais com o mesmo perfil sintético; payload e escolhas preservados                           |
| StrictMode, Fast Refresh e restart Vite  | Dashboard utilizável, atualização do módulo recebida, resposta nova guardada após HMR e preservada no restart |
| Storage indisponível                     | Nenhuma substituição; reload só depois da recuperação/validação                                               |
| Criação concorrente                      | Um único proprietário, uma única tentativa ativa, nenhum histórico apagado                                    |
| Resposta e reload imediato               | Seleção preservada, sem polling prévio da gravação                                                            |
| Backup export/import                     | Download/import real, conflitos, deduplicação, validação e falha atómica nos quatro projetos                  |
| Histórico                                | Restauração das revisões e respostas/racionais originais na suite completa                                    |

### Execuções intermédias e ambiente

A primeira execução dirigida Vitest não executou testes: timeout de arranque de dois workers, com duração/relógio a avançar várias horas. A repetição passou 19/19; a suite final passou 223/223. Typecheck detetou uso indevido da opção exact da Testing Library e await dentro de callback síncrono no teste novo; foram corrigidos antes do build válido.

O primeiro harness Vite dentro do worker Playwright bloqueou no carregamento e foi isolado num processo Node sem o loader TypeScript do runner. Uma expectativa de contagem interna de aquisições foi substituída por prova do comportamento: atualização efetiva do módulo, nova resposta e storage. A cache fria também expôs 504 Outdated Optimize Dep; o fixture passou a aguardar warmup, static-import idle e processamento do optimizer antes de anunciar disponibilidade. Não se aumentaram timeouts de asserções para ocultar estas falhas.

Um teste histórico existente observou dois pedidos ao mesmo arquivo .6. O setup inseria o estado antes de garantir que o primeiro documento tinha montado, podendo iniciar a restauração antes e depois do reload. Foi acrescentada uma espera de readiness antes do seed. A exigência de exatamente um pedido e todas as asserções históricas foram preservadas. O ficheiro passou novamente **16/16** nos quatro projetos; o shard WebKit inteiro foi repetido. Estes 16 casos adicionais são repetições dirigidas, não aumentam os 352 IDs únicos da matriz final.

A execução com dois workers passou os 88 Chromium, mas sofreu timeouts Firefox enquanto o Windows tinha cerca de 180 MiB livres. Foi interrompida apenas a árvore de processos desse runner, identificada e registada em tmp/writer-fix. Outra execução evidenciou a cache fria 504 e um erro de teardown interno Firefox Browser.removeBrowserContext/SessionStore. A validação final isola processos em quatro shards sequenciais com um worker CLI, sem alterar playwright.config.ts, desativar casos, reduzir asserções ou introduzir retries. Os JSON finais foram confrontados com a descoberta completa: exatamente 352 IDs, nenhum omitido, duplicado, skipped, flaky ou repetido. Execuções interrompidas/intermédias não são apresentadas como suites completas aprovadas; a contagem acima corresponde à matriz completa final distribuída pelos quatro shards.

Assets: JS inicial **695 149 → 697181 bytes**, gzip **210 344 → 210969 bytes**. CSS permanece 17 545/4 387 bytes/gzip; JS total 1898988. Não houve otimização de arquitetura nem novo benchmark de tempo de execução.

O P1 fica resolvido no âmbito validado. TECHNICAL_RELEASE_CANDIDATE_READY=PASS; publicação continua NO, beta pública BLOCKED, retenção remota NOT_TESTED e identidade/contacto/privacidade e aprovação humana pendentes. Evidências em `tmp/writer-fix/`, fora do site. Para usar a correção num separador antigo, recarregue a aplicação; perante conflito legítimo, liberte a edição na outra página e use a ação de retry. Nenhum dado tem de ser apagado.

Os novos cenários verificam dados reais no storage, IDs, respostas e bytes preservados, não apenas mensagens. O teste de desenvolvimento aguarda a atualização real do módulo no cliente, altera uma resposta depois do HMR e confirma a persistência antes/depois de reiniciar o servidor.

Para isolar os loaders TypeScript, o servidor Vite do teste corre num processo Node próprio, com cache própria e porta dinâmica exclusiva. O teste não edita App.tsx para provocar HMR e não usa o servidor de desenvolvimento pessoal. Só termina o seu processo auxiliar. Os dois cenários com arranque/reinício real têm orçamento de 60 s próprio; os timeouts de asserções, restantes testes, retries e dois workers existentes não foram alterados.

## Limitações e entrega

Os perfis de browser dos testes são sintéticos e locais. Reinício gracioso real de processos é distinguido de falhas físicas/crash do sistema. Eventos pagehide/pageshow são também exercitados sinteticamente; isso não certifica todas as políticas de BFCache/suspensão de todos os dispositivos. Não se garante fsync físico nem recuperação após eliminação/quota do navegador.

Nenhum commit, push, deploy, serviço pago, dependência nova ou operação Vercel/KAVTRIS. Aprovação académica humana permanece PENDING; publicação continua não autorizada. A avaliação anterior da Fase 9.4 permanece histórica; o gate técnico só é reposto após passar esta correção.

## Entrega Git posterior à validação

Em 2026-10-30, o responsável autorizou explicitamente vários commits na main e push para origin/main. Implementação: `6ff0a8c`; testes: `3b206f7ac9d7b45a9ddd01c9c0bfc2151a9b0196`. Os resultados de QA acima foram reutilizados, sem alterar o runtime ou os testes depois da validação. As referências anteriores a trabalho não commitado descrevem o momento dessa avaliação. Esta entrega Git não autoriza nem executa deploy; os gates de publicação e aprovação académica mantêm-se.
