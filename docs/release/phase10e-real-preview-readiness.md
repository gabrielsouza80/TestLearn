# Fase 10E — auditoria de preparação do Preview real

30 de outubro de 2026, Europe/Lisbon. Auditoria local e consultas remotas GET; **nenhum deployment autorizado ou executado**.

## Resumo e âmbito

A aprovação dos ensaios sintéticos não aprova a aplicação real. O código, perguntas, testes e configuração não foram alterados. A evidência nova está em `tmp/phase10e/`, fora de `dist` e excluída do upload; este relatório é o único documento novo destinado ao controlo de versões, mas não foi feito commit nem push. Os resultados finais e o veredicto constam no fim.

## Linha de base preservada

- main, HEAD `53d3bf38656e29a2d8f20001904f8132a153a76b`; sem alterações staged. Origin aponta para o repositório TestLearn, não KAVTRIS.
- Aplicação `0.1.0`, conteúdo `2026-10-27.9`, Node `24.19.0`, engines `24.x`. package.json e package-lock.json incluídos no inventário SHA-256 de 150 ficheiros.
- Trabalho anterior: readiness modificado e relatórios 10B/10C não rastreados. Preservados, sem reset, limpeza ou substituição. Não foi encontrado relatório local 10D: as observações sintéticas fornecidas pelo proprietário são uma entrada externa, parcialmente reconfirmada abaixo.
- `baseline.json` regista HEAD, branch, status, remotes sem credenciais, versões e hashes dos inputs; `workspace-verification.json` confirma a cópia exata dos 150 inputs.
- O repositório contém ficheiros de ambiente ignorados gerados pela CLI na fase anterior. Os seus valores não foram lidos. Os testes correram numa cópia local exata em `tmp/phase10e/workspace`, sem `.env` ou `.vercel`, com VERCEL_* e VITE_* removidas do ambiente dos subprocessos. As dependências existentes foram ligadas por junction; nenhuma instalação. Foram criados apenas diretórios de saída sintética necessários aos testes.
- `docs/release/release-readiness.json` é um objeto JSON válido, com gates, qa e secções por fase; não foi encontrada uma schema dedicada que valide todo o documento. `readiness-shape.json` regista os tipos reais, HEAD/revisão coincidentes e autorização NO. Os PASS anteriores são históricos. O estado remoto desse documento ainda refere o incidente, não a nova verificação do laboratório sintético; não foi silenciosamente atualizado.
- As 93 evidências 10B coincidem em SHA-256, tamanho e mtime com o inventário pré-10C. Um novo inventário de 143 ficheiros 10B/10C permite verificar a sua preservação até ao encerramento. Isto é comparação local, não assinatura inviolável ou armazenamento WORM.

## Integridade académica

`academic.json`: 90 perguntas, 364 alternativas, 64 LO, 29 grupos, revisão .9; `validateBank` sem erros e igualdade integral com o snapshot .9. Os nove hashes coincidem com os pins anteriores. Contagens .1–.9: 40, 40, 47, 66, 66, 82, 82, 82, 90.

O validador verifica identificadores únicos, opções e chaves existentes, cardinalidade, capítulo/LO/K, textos PT/EN e explicações não vazias e largura das tabelas. Os testes académicos incluem resolução independente de exercícios e comparação das revisões; não constituem uma nova revisão semântica humana de todas as 364 alternativas. A correspondência estrutural PT/EN e os hashes não demonstram por si só equivalência linguística ou qualidade psicométrica. Os IDs atuais são exatamente tl-001–tl-090 e as 90 perguntas mantêm humanApproval PENDING. Existem 180 enunciados localizados, 728 textos de alternativas, 180 explicações gerais e 728 explicações de alternativas; os nove arquivos foram também validados individualmente pela schema. A aprovação humana mantém-se PENDING; nenhuma pergunta foi aprovada ou editada nesta fase.

Oracle independente em `tests/fixtures/blueprint-oracle.ts`: seeds 0–999, 40 IDs únicos, seleção repetível, quotas dos 29 grupos e diversidade de LO exigida, capítulos 8/6/4/11/9/2, K1/K2/K3 8/24/8, chaves preservadas pelo shuffle. Não se exige que cada exame cubra todos os 64 LO. O script de auditoria usa o banco real e compara com o oracle, não deriva as quotas do seletor.

## Exames, persistência e qualidade dos testes

A implementação usa deadline absoluto; o relógio continua quando o separador fecha. Simulação normal 60 minutos, opção de prática 75 minutos identificada como não confirmação de elegibilidade oficial, limiar de prática 26/40. Apenas o conjunto exato recebe crédito, sem pontuação parcial. Não é previsão de aprovação oficial.

A matriz existente verifica UI e bytes reais do LocalStorage: navegação, reload imediato após seleção, flags, retomada sem segundo exame, conclusão e revisão, 25/40 versus 26/40, perguntas não respondidas, múltiplas respostas, textos e alternativas históricos. Asserções por role/nome/ID e comparação de estado são mais fortes do que apenas observar uma mensagem de sucesso. Há relógios e fixtures sintéticos, comparação de chaves históricas e oracle independente; não se toma o número de testes como garantia de correção total.

Os cenários adversos estão em `data-durability`, `writer-recovery`, `progress-backup`, `lazy-history`, `public-release`, `student-experience` e testes unitários de storage/backup: quota e leitura indisponível, JSON corrompido, import inválido/forjado e escrita atómica recusada, revisão desconhecida, arquivo em falta, separadores simultâneos, owner legítimo/background, fecho/reload e retry, mudança de snapshot, falta de Web Locks com falha segura, StrictMode/Fast Refresh/reinício Vite, reabertura de perfil sintético após shutdown real do processo do navegador. O shutdown é controlado pelo teste: crash do SO/corte de energia e kill arbitrário do browser não foram executados.

O teste HMR arranca exclusivamente o seu servidor de fixture e termina apenas esse processo. A fixture emite evento de hot update e o teste exige a mensagem do browser e igualdade dos dados, evitando confundir reload com HMR. O teste de reabertura compara a tentativa e reserva de escrita no mesmo perfil sintético; não usa o perfil pessoal. Os testes de tempo incluem deadline/expiração e registo de duração; não foi observado um exame remoto de 60 minutos em tempo real nem suspensão do SO na fronteira. Estes limites permanecem explícitos.

O backup descarregado é efetivamente importado noutro contexto vazio e comparado, incluindo revisão histórica e respostas múltiplas. A schema limita o ficheiro a 8 MiB e a história a 500 sessões; não há remoção automática das antigas para acomodar uma importação. O limite de prática permite 90 questões. Importações não são uma cópia integral das preferências do navegador nem transferem cookies de autenticação.

## Privacidade e armazenamento

O código guarda `testlearn.v1` no LocalStorage, com IDs de tentativas, revisão, escolhas, ordem, índices, datas/deadlines, duração e resultados derivados. Estes dados podem ser pessoais quando associados a alguém, apesar de não existir conta ou identificador nominal obrigatório. A escrita é síncrona sob Web Locks, com comparação do snapshot; alterações recusadas não são anunciadas como gravadas. O reset confirmado afeta a chave TestLearn, preservando dados alheios. Sem Web Locks seguro, editar fica bloqueado em vez de perder exclusão mútua.

Não foram encontrados analytics, SDK de tracking, fetch de respostas/resultados, scripts/fontes externos ou service worker no código da aplicação. São necessários pedidos HTTP dos assets e dos arquivos lazy; os links oficiais são navegação explícita, não cópias PDF no output. A Vercel/autenticação pode tratar IP, cookies próprios e logs técnicos: finalidade, retenção, operador e informação ao utilizador exigem confirmação. O CSP local não prova a privacidade do fornecedor nem headers efetivos de um futuro deployment real.

LocalStorage é por origem: localhost, 127.0.0.1, portas diferentes e URLs de deployments diferentes não partilham automaticamente o progresso. Um futuro ensaio deve usar perfil descartável vazio, dados sintéticos e backups gerados nesse perfil. A passagem a outra origem requer exportação/importação validada pelo utilizador; não há sincronização de contas. Limpeza do browser, modo privado, quotas e alteração da schema suportada podem impedir recuperação. Nunca apagar storage para resolver lock ou arquivo em falta.

## Artefacto e exposição do conteúdo

O build auditado contém 14 ficheiros, 1 938 407 bytes, oito chunks históricos lazy, zero source maps e zero ficheiros privados segundo o guard. O inventário completo abaixo inclui MIME inferido pela extensão; o MIME efetivamente servido terá de ser verificado no futuro. Todos os ficheiros são apenas candidatos condicionais para o upload exato que o proprietário vier a autorizar; **nenhum upload está autorizado agora**.

O scan por padrões não encontrou chaves privadas, padrões selecionados de tokens GitHub/AWS/Vercel, JWT, caminhos de perfil Windows, sourceMappingURL ou referências import.meta.env em texto. Não foram incluídos `.env`, backups, progresso pessoal, fixtures, relatórios internos, `.git`, PDFs, documentos privados ou logs. O manifesto revela caminhos relativos de módulos e os nomes dos arquivos históricos: metadados de build intencionais, não caminhos privados absolutos. O scan não prova ausência de segredos desconhecidos, codificados ou fragmentados; não é auditoria forense nem nova auditoria de dependências. O npm audit anterior não foi reexecutado e não recebe PASS atual.

O JavaScript inicial contém as perguntas atuais, traduções, chaves e explicações; os arquivos históricos também são entregues ao cliente quando solicitados. Um aluno autenticado pode inspecionar ou copiar os assets e alterar o seu storage/scoring local. Repositório privado e autenticação do alojamento limitam distribuição, mas não fornecem sigilo de respostas, proteção anticópia ou exame resistente a fraude. A dependência React/validação e as referências oficiais incorporadas não são novas fontes de perguntas oficiais. O guard exclui ficheiros de teste/dev; não é prova formal da eliminação de todas as branches de desenvolvimento dos pacotes. O build é de produção e não inclui servidor Vite/HMR ou scripts de teste como assets separados.

Aviso existente de chunk inicial superior a 500 kB: 702 001 bytes, gzip 212 404; CSS 31 083 bytes, gzip 6 631. Não houve otimização nem novo benchmark: performance em rede/dispositivo real permanece por medir.

| Caminho                                   |  Bytes | SHA-256                                                          | MIME inferido    | Finalidade                                   | Preview futuro         |
| ----------------------------------------- | -----: | ---------------------------------------------------------------- | ---------------- | -------------------------------------------- | ---------------------- |
| .vite/manifest.json                       |   2551 | abfb0415e31716a242f54071a9b4374a1a5a05a2da68f1a13386c3325f401894 | application/json | Manifesto de build                           | Condicional; agora NÃO |
| assets/index-CFv3SkJ7.css                 |  31083 | f714c6e9e72199b3a182698c8c66806acca61630ff4c79945c18a2915e6f8951 | text/css         | Estilos                                      | Condicional; agora NÃO |
| assets/index-CowTQ3-G.js                  | 702001 | b73e8ac133bf165b8c8b8f7300eb0aa34aa40d3385d47708657f04a1a77ab20d | text/javascript  | Aplicação, banco atual, chaves e explicações | Condicional; agora NÃO |
| assets/questions-2026-10-27.1-W7yLFLHs.js |  51782 | 69adfae8b006a629236c0fcb0559b88a0dacc5d2f90ca4e42da13e9a756d72ec | text/javascript  | Banco histórico lazy                         | Condicional; agora NÃO |
| assets/questions-2026-10-27.2-D-tyE03s.js |  65758 | e2839ed36ca6273d4f8072ab62e3bda1a6687a70d926030514ae811ef4c0a17c | text/javascript  | Banco histórico lazy                         | Condicional; agora NÃO |
| assets/questions-2026-10-27.3-BEhMXjsZ.js |  87739 | 65ef813a337922fc6de659ab4a0c03670d6da25e032d04d08b61188dda75df05 | text/javascript  | Banco histórico lazy                         | Condicional; agora NÃO |
| assets/questions-2026-10-27.4-BAQ4Dpi_.js | 153173 | 1686f7dd0efed601181f211ae9998f83299a72816d1af13b939ab9b4272e3508 | text/javascript  | Banco histórico lazy                         | Condicional; agora NÃO |
| assets/questions-2026-10-27.5-CgwUPsDp.js | 153450 | ae655803c5bce318cec4a0420d740ab62758f4efc1aaa5be87681b678e595d22 | text/javascript  | Banco histórico lazy                         | Condicional; agora NÃO |
| assets/questions-2026-10-27.6-BrE7YM3i.js | 205308 | eaf2bd5984a020500c7934334388e73c24d498d3c1dfa0102c006a11e95986fd | text/javascript  | Banco histórico lazy                         | Condicional; agora NÃO |
| assets/questions-2026-10-27.7-3UV0lmO3.js | 242294 | ebfc17e35aac7fc0e92ab79eb262e65e6a0413877b0c52c3636421151fc95e8a | text/javascript  | Banco histórico lazy                         | Condicional; agora NÃO |
| assets/questions-2026-10-27.8-71jBULRe.js | 242303 | c1892d154e00e07f53b32ea2d39b91033b170607235453de57d194dae0521e99 | text/javascript  | Banco histórico lazy                         | Condicional; agora NÃO |
| favicon.svg                               |    249 | dde5cce8d7d2603649550a900f1966918a00bbf82c01bb5d7e555fde8d1fcfb6 | image/svg+xml    | Ícone                                        | Condicional; agora NÃO |
| index.html                                |    686 | 7ef5dd6f8b7703ce4ab25cbf735fe88c111b32b6f75ead931eff3f891067c3d8 | text/html        | Entrada HTML                                 | Condicional; agora NÃO |
| robots.txt                                |     30 | 9fe5b2c66383db36542d53281f23cadaad51b999ba0bff353987dc97d541c785 | text/plain       | Diretivas de indexação                       | Condicional; agora NÃO |

## Continuidade entre versões e retenção

1. Repositório: snapshots .1–.9 preservados e comparados por hash.
2. Build atual: .9 no entry, .1–.8 em oito imports dinâmicos; o guard verifica manifesto e existência dos chunks.
3. Assets de deployments antigos: retenção e acesso protegido não foram demonstrados para a aplicação real nesta fase. Cache immutable de um ano não obriga o servidor a conservar um URL antigo.
4. Sessões A→B: testes locais de arquivos e reload preservam dados; não são um deployment remoto A→B. Não há service worker ou mecanismo de version pinning remoto comprovado. Um tab com runtime A pode pedir depois um chunk A ausente na origem atualizada; deve preservar storage e permitir recuperação, como no teste de falha de arquivo, mas isso não prova toda a experiência após update.

O HTML tem configuração must-revalidate e os assets com hash immutable; headers efetivos e políticas de plataforma têm de ser observados após autorização. A [documentação de Skew Protection](https://vercel.com/docs/skew-protection) não constitui evidência de integração nesta aplicação Vite: não foi assumida nem ativada essa garantia.

**Experiência futura desenhada, não executada:** autorizar separadamente dois artefactos A/B, respetivos hashes, projeto não incidente e todos os passos remotos; usar perfil sintético e origem protegida estável explicitamente aprovada, sem promoção Production. Iniciar exame de 40 em A; responder a várias perguntas, marcar e navegar; guardar backup e snapshot de IDs, revision, optionOrder, respostas, index, startedAt/deadline. Registar os URLs/hashes dos chunks A antes de B. Disponibilizar B apenas no target aprovado; mudar a origem estável para B somente se autorizado e sem abrir acesso público. Manter um tab A, um tab novo B e um refresh do perfil original; comparar todos os campos, tempo decorrido, respostas, revisão e score, incluindo histórico .1–.8. Pedir chunks antigos e novos autenticado e anonimamente, validar corpo/MIME/hash e ausência de login HTML servido como JS. Repetir expiração e sessão sem chunk em cache. Se A/B usarem URLs de deployment distintas, declarar mudança de origem e testar portabilidade por backup separadamente, não chamar isso continuidade automática. Definir retenção mínima até encerrar tentativas, verificar políticas e manter recuperação/backup antes de aprovar a experiência. Uma indisponibilidade deve falhar sem migrar perguntas ou apagar dados. Não eliminar deployments para preparar este ensaio.

## Verificação remota apenas de leitura

Sete GET autenticados via CLI existente confirmaram equipa Testlearn `team_YNKbyfPSXwYEw0XveEc3TXRp`, slug `testlearn808005-9164`, Hobby. Sem novo login, link, pull, alteração de projeto ou bypass.

- Safety `prj_zBq3IFR8oR82DHiDU8xUSZp4apIe`: All Deployments (`deploymentType: all`), sem link Git, dois deployments READY. B1 `dpl_HFp7pYkr5AMnbzh8hyN62vULMm3d` é Production; B2 `dpl_6giL2pWtBYfUiUfc2YpiZVjXKoSF` tem target API null, correspondente ao Preview normal, não uma string literal preview. A listagem e os projectIds individuais coincidem.
- Incidente `prj_lFdRrkxQt2yqEpfzurOA00WJJX69`: paused=true, live=false, sem Git, continua um único deployment Production. Proteção ainda preview-only; não despausar.
- Oito GET anónimos atuais, sem cookies e sem seguir redirects: raiz/index dos quatro hosts sintéticos conhecidos devolvem 302 para `https://vercel.com/sso-api`. Não foi medido novamente o conjunto original 12/12 nem confirmado conteúdo autenticado nesta fase. Esse conteúdo B1/B2 é confirmação anterior do proprietário, não nova observação nossa.
- Seis GET anónimos raiz/index nos três hosts do incidente: 503 com DEPLOYMENT_PAUSED. Assets completos já foram verificados na 10C, não foram todos retransferidos agora. Não se assume isolamento completo a partir destes seis pedidos.

`remote.json` contém apenas campos selecionados, sem env/tokens/emails de membros; `http-normalized.json` corrige a representação de Location ausente no primeiro script (era artificialmente /null, não redirect do serviço). Os hashes dos corpos e códigos estão guardados, sem cookies ou query de autenticação. API configurada + redirects são evidência parcial, não prova de todos os caminhos, destinatários ou autorização de entrega real.

A [regra oficial do primeiro deployment](https://vercel.com/docs/deployments/environments#first-deployment) inclui `--target=preview`: um projeto vazio não é destino seguro para o banco real. [All Deployments](https://vercel.com/docs/deployment-protection) cobre também domínios Production, ao contrário de Standard/Preview-only. Documentação consultada nesta auditoria; nenhuma configuração foi mudada.

## Gates propostos para um futuro Preview real

Todos exigem evidência e autorização **novas**, sem executar agora:

1. Proprietário aprova equipa, ID exato de destino, audiência e objetivo; nunca incidente. O laboratório safety está validado como sintético, não automaticamente designado para receber conteúdo real. Se o destino for outro projeto, primeiro validar só com conteúdo sintético, já protegido, e confirmar histórico não vazio e target efetivo.
2. Reconsultar All Deployments antes de qualquer upload, audiência/roles, exceções, bypasses e todos os aliases/domínios. Provar recusa anónima de HTML, JS, CSS, manifest e históricos, mais acesso autenticado correto sem HTML de login nos assets. Não publicar tokens de bypass ou partilhas. Não basta 302 ou API 200.
3. Git desligado e ausência de hooks/autodeploy; nenhuma promoção Production automática. Provar isto em configuração atual e nos comandos exatos. A intenção --target não substitui a resposta efetiva.
4. Aprovar HEAD + delta documental, revisão .9 e hashes do artefacto. Reexecutar checks se inputs mudarem; rever o payload completo, incluindo metadados CLI, e não enviar source, env, tmp, relatórios ou diagnósticos. Inventário de dist não é aprovação automática do envelope prebuilt.
5. Scan de segredos satisfatório com limites aceites; backup/recovery sintéticos e regressão completos; aceitar explicitamente divulgação das chaves aos destinatários autenticados. Aprovação editorial para piloto restrito, sem a apresentar como aprovação humana integral. Direitos e aviso de privacidade suficientes para esses destinatários.
6. Autorizar separadamente a única operação de deploy com artefacto/projeto/target definidos, plano de inspeção e contenção pelo proprietário; não encadear outro upload caso haja divergência.
7. Após essa autorização: inspecionar imediatamente owner/project/target/aliases, proteção, árvore de ficheiros e hashes; matriz anónima/autenticada por asset; smoke real de exame, persistência, backup e histórico. Se exposição/target errado, parar e acionar contenção aprovada no projeto exato, preservando evidência. Verificações reativas não impedem exposição já ocorrida e não autorizam despausar o incidente.
8. Só depois executar experiência A→B autorizada e documentar retenção de chunks e limites de origem. Nenhuma promoção pública resulta destes gates.

## Bloqueios humanos e publicação

**P0:** nenhuma exposição atual adicional demonstrada; o incidente anterior continua contido, não resolvido. Ausência de P0 identificado não é certificação de segurança.

**P1 antes de enviar o Preview real:** faltam autorização exata, designação explícita do destino para conteúdo real, audiência aprovada e comprovação atual dos controlos de acesso de todos os assets/roles nesse destino. O laboratório sintético não é automaticamente o destino real. **Checks posteriores ao primeiro Preview autorizado:** smoke remoto real, continuidade A→B e retenção permanecem NOT_TESTED; não se exige executá-los antes de autorizar o ensaio que os torna possíveis. A falta destes checks limita o que pode ser prometido aos participantes, sobretudo sobre continuidade e recuperação. A documentação de readiness precisa de reconciliação explícita numa fase autorizada, sem transformar o ensaio sintético em PASS da aplicação. Não foi identificado motivo para alterar a arquitetura nesta auditoria.

**P1 para Beta pública:** revisão académica humana e tradução, validade das explicações/distratores, calibração psicométrica e limites da pontuação; direitos das perguntas/quotations/documentos e licenças, branding e ausência de afiliação ISTQB/PSTQB; operador e contacto reais, aviso de privacidade/hosting/logs/retenção e termos revistos por responsável competente; autorização de publicação ausente. A validação manual de acessibilidade com tecnologia assistiva real também permanece pendente antes da Beta. Nenhum parecer jurídico ou endosso oficial foi presumido. A marca Public Beta no HTML não significa que a release esteja autorizada.

**P2:** benchmark em rede/dispositivos modestos, audit de dependências atualizado, teste em dispositivos físicos, browser zoom real e leitor de ecrã/tecnologia assistiva. Axe, teclado, focus/reflow e texto 200% são apenas parte da acessibilidade; conformidade WCAG 2.2 AA integral permanece NOT_TESTED. Não instalar serviços nem otimizar nesta fase.

A correção de writer, persistência síncrona, recuperação de arquivos, revisão por identidade e backups tem cobertura atual na regressão; o resultado de execução consolidado abaixo determina se continuam resolvidos. Não foram modificadas funcionalidades para obter um PASS.

## Resultados finais e evidências

Verificação local atual: **PASS**. Decisão de prontidão para enviar conteúdo real: **BLOCKED**, pelos gates de destino/audiência/controlo de acesso e autorização ainda pendentes. Não foi demonstrada uma regressão da aplicação. O bloqueio não transforma checks locais aprovados em falhas nem autoriza operações remotas para recolher o que falta.

| Execução efetiva                                                             | Resultado                                           |            Exit |
| ---------------------------------------------------------------------------- | --------------------------------------------------- | --------------: |
| npm run typecheck                                                            | PASS                                                |               0 |
| npm run lint                                                                 | PASS                                                |               0 |
| npm run format:check                                                         | PASS, inputs da cópia verificada                    |               0 |
| Prettier --check do novo relatório                                           | PASS, verificação adicional após redação            |               0 |
| npm test -- --maxWorkers=1                                                   | 226/226, 25 ficheiros; zero falhas/skips            |               0 |
| npm run build                                                                | PASS; aviso conhecido >500 kB                       |               0 |
| node scripts/check-release.mjs                                               | 14 assets, oito chunks, zero source maps/privados   |               0 |
| node --test scripts/check-release.test.mjs                                   | 8/8; zero falhas/skips/todo/cancelados              |               0 |
| node tmp/phase10e/academic.mjs                                               | 1 000 seeds; 29 grupos; arquivos e banco válidos    |               0 |
| node tmp/phase10e/academic-metadata.mjs                                      | 90 IDs e aprovação PENDING; nove arquivos validados |               0 |
| Playwright discovery --list --reporter=json                                  | 364 casos descobertos                               |               0 |
| npm run test:e2e -- --workers=1 --retries=0 --shard=N/4 --reporter=list,json | N=1..4 sequencial: 364/364                          | 0 em cada shard |

| Projeto  | Passaram | Duração reportada (s) | Exit |
| -------- | -------: | --------------------: | ---: |
| chromium |       91 |                156.68 |    0 |
| firefox  |       91 |                216.10 |    0 |
| webkit   |       91 |                384.10 |    0 |
| mobile   |       91 |                165.64 |    0 |

Consolidação por IDs comparada com discovery: 364 únicos, 0 em falta, 0 extras, 0 duplicados, 0 skips, 0 flaky, 0 retries, 0 erros de runner. Um worker por shard; configuração original de dois workers preservada. Mobile é iPhone 13 emulado em Chromium; não é Safari físico. Os testes de axe exigem lista de violações vazia e correram nos quatro projetos, juntamente com teclado/reflow. Não se atribui PASS a leitor de ecrã, zoom nativo real ou WCAG integral.

Nenhum teste obrigatório local ficou por executar. Smoke da aplicação real hospedada, A→B remoto, retenção, crash do SO e SCA atualizado continuam NOT_TESTED, pelos limites descritos. Os sete GET API tiveram exit 0; HTTP atual: oito redirects de autenticação sintéticos e seis respostas de pausa do incidente. Acesso autenticado ao conteúdo sintético permanece confirmação anterior do proprietário.

Os 150 inputs originais e os 150 da cópia permanecem iguais ao baseline; os 143 ficheiros inventariados do incidente mantêm os hashes. HEAD e staging inalterados. Único ficheiro novo não ignorado: este relatório; preservados os três pendentes anteriores. As evidências novas e os outputs de testes são locais/ignorados. Não houve alteração de perguntas, respostas, quota, banco, traduções, históricos, testes ou funcionalidade.

Problemas de orquestração local: um caminho inicial do runner não produziu o ficheiro esperado e um primeiro helper de inventário teve SyntaxError; corrigidos apenas os diagnósticos em tmp antes dos respetivos resultados válidos. O normalizador de Location ausente foi corrigido numa evidência derivada, preservando a captura original. Nenhuma dessas tentativas foi contabilizada como PASS de testes da aplicação. Avisos NO_COLOR/FORCE_COLOR e de chunk grande não são falhas ocultadas. Não foram necessários retries de testes nem alterações aos seus timeouts.

Fingerprint dos 150 inputs: 5fa741f6953400229d8c65c9199a9e20d968236b2995059961d2485462f5bdc0. Snapshot .9: 89a0d7b2483afbbd279f7a1d9ac707d1ce9b4e049225be88a59c0dd30cd42bb2. Os inventários completos permitem consultar os hashes individuais de todos os inputs e dos nove arquivos. Manifesto de evidências: tmp/phase10e/evidence-sha256.json.

| Evidência local                              | SHA-256                                                          |
| -------------------------------------------- | ---------------------------------------------------------------- |
| tmp/phase10e/baseline.json                   | 70e4b138fb5035c1b5c3f1d4a4669225a642b6b6430e4d28ca990f1d32368f8b |
| tmp/phase10e/workspace-verification.json     | bd4f7b48b64b1c02538fe0cb49a95762fff04e4ac3a4b2e772797de8314681fe |
| tmp/phase10e/local-checks.json               | 557b04d85f1c80838f9333d81b832e33d74f8a255e405ef78ff5d4387e9de513 |
| tmp/phase10e/unit.log                        | 45d30c96ad1aef94dad9c45ced72cad869b50e7fdf2e4eef7570764cfac0fd51 |
| tmp/phase10e/guard-tests.log                 | 25baf7932450b2009ac4367b057bf931216696caf0c966af3fe8a8736ba36728 |
| tmp/phase10e/discovery.json                  | 16ec8d2d2b615543f42de242c421a98b00b1eb407abccdd94359b471bda6e03e |
| tmp/phase10e/e2e-1.json                      | 2f9e98b84dc177cf5cce4781c928f0f45273f2fa6ee428d2fc952e13b188ba42 |
| tmp/phase10e/e2e-2.json                      | 198604baa86169003e40d83baf161b0219458d571f21287ec4e05ac183a2bc1a |
| tmp/phase10e/e2e-3.json                      | 39ef446d42690728bf2857a6bcccffd58b83f150681f1d91fb254f790e678fb4 |
| tmp/phase10e/e2e-4.json                      | 527b7f6e06bbb88bf47ab1751239c309f83827d4d546b19197299930bca12f8a |
| tmp/phase10e/e2e-summary.json                | 373102336ea6499ef442f8087fe4feda84ab9cad84c392bbc8bbdee3b3deb0af |
| tmp/phase10e/academic.json                   | fdd82c72638e84914e12b4f58b8c35ecc222f6dbe014f94510785a00863aed68 |
| tmp/phase10e/academic-metadata.json          | cd3f51e3fa946429d73647ca1d28b787fd4711e9913411e81110a1bbcc971aac |
| tmp/phase10e/artifact-inventory.json         | 4c225ad8a44cd58e7b0b4590550416dce139013a3ab41ac86d794c1d894e36fb |
| tmp/phase10e/build-reproduction.json         | 44f2895a6a62f434dbc1b3ac5e8d0080adbfe9fd50cc5da00cece9f4ab14436c |
| tmp/phase10e/readiness-shape.json            | c9ab4dc13cf6d8e21657dec0892de19d3e86e062d7b3aa3f4235d7e696dce2fe |
| tmp/phase10e/remote.json                     | b560c85308d82126ca839a1a2fc5b7b4585c6403888aaa2c30b4bc7e084aa29d |
| tmp/phase10e/http-normalized.json            | b8ef86a8207bd76564f8abffc860f1eea1f5f14a9281b07fb926b93f6ea05483 |
| tmp/phase10e/incident-preservation.json      | 69d964f0123a54c5e4a795e1aa953ff9359053dd678edb7d7ae3ff96fb5cd2f6 |
| tmp/phase10e/incident-current-inventory.json | b86db8446f7242d6ccab83ecf3e7b2baf5d2f0c2b8abdb35c63957e03d336835 |
| tmp/phase10e/final-integrity.json            | 41a19c465daec0c48a5f5e74cddf750bc6c60a751f1c623adb6fd20e72e69519 |

### Veredicto explícito

```text
PHASE10E_AUDIT = BLOCKED
REAL_PREVIEW_DEPLOYMENT_AUTHORIZED = NO
INCIDENT_PROJECT_RESUME_AUTHORIZED = NO
PUBLICATION_AUTHORIZED = NO
PUBLIC_BETA_READY = BLOCKED
```

Próximo passo recomendado: o proprietário rever este relatório e definir, numa autorização separada, destino, audiência e artefacto exatos para um primeiro ensaio protegido, depois de satisfazer os gates pré-upload. Até lá, manter o incidente pausado e não enviar a aplicação real. A auditoria termina aqui; não há commit, push, deployment ou alteração remota.
