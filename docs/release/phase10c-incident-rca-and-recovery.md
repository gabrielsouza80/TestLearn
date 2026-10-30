# Fase 10C — RCA do incidente e plano de recuperação

30 de outubro de 2026. Investigação apenas de leitura; nenhuma recuperação executada.

```text
INCIDENT = CONTAINED_NOT_RESOLVED
DEPLOYMENT_AUTHORIZED = NO
PROJECT_RESUME_AUTHORIZED = NO
PUBLICATION_AUTHORIZED = NO
PUBLIC_BETA_READY = BLOCKED
```

## 1. Resumo executivo

Foi pedido Preview, mas o primeiro deployment de `testlearn-lab` ficou classificado como Production e serviu anonimamente o HTML real do TestLearn. A proteção configurada abrangia apenas Preview. A suspensão manual pelo proprietário conteve a exposição; não converteu o deployment em Preview nem validou uma estratégia de staging.

Nesta investigação, cinco consultas GET à API confirmaram projeto `paused: true`, `live: false`, plano Hobby, Git desligado e exatamente um deployment, ainda Production. Foram efetuados **45 GET anónimos**: raiz e todos os 14 ficheiros públicos, nos três hosts conhecidos. Todos devolveram 503 `DEPLOYMENT_PAUSED`. Não apareceu conteúdo aprovado da aplicação. Não há evidência de um deployment posterior.

A documentação oficial atual explica o tratamento especial do primeiro deployment, incluindo o caso de `--target=preview`. Isso sustenta a explicação operacional. **A implementação interna exata da reclassificação permanece `ROOT_CAUSE_UNCONFIRMED`**: não há captura do request HTTP original nem trace interno da plataforma que identifique a rotina responsável. Não se demonstrou um bug específico da CLI ou da aplicação, nem se repetiu o upload.

A falha de controlo está confirmada: aceitar a intenção local de target e proteção Preview-only como suficientes para enviar conteúdo académico real. A recomendação é manter este projeto pausado e, apenas com nova autorização, validar a plataforma num laboratório separado exclusivamente sintético, com proteção independente da classificação Preview/Production.

## 2. Evidências, preservação e âmbito

Fontes locais lidas: relatórios 10B e visual-polish, readiness, `tmp/phase10b/`, `.vercel/project.json`, metadados de build, manifesto enviado, scripts históricos e código instalado da CLI. Não foram lidos valores de tokens ou conteúdos de ficheiros `.env`. Caminhos privados de autenticação são representados por `<AUTH>` abaixo.

- HEAD: `53d3bf38656e29a2d8f20001904f8132a153a76b`, ramo main.
- Fonte 10B: 148 ficheiros; fingerprint `643f39e8486271f679225c89a7f30c2e94e28d3b7fe8a5b094130deb6602f462`.
- Payload 10B: 16 ficheiros, 1939766 bytes; fingerprint `30b34e209c37bf79349e6f3f08e086c80ae99c11db8d45896e6e25df7795bd2a`.
- Inventário de preservação desta RCA: `tmp/phase10c/phase10b-evidence-before.json`, com SHA-256, tamanho e mtime de **93 ficheiros** da Fase 10B. É uma garantia de comparação desde esta captura, não uma assinatura retroativa ou armazenamento WORM.
- Consultas atuais: `tmp/phase10c/remote-current.json`; HTTP: `http-containment.json`, `http-extra-containment.json` e `http-bodies/`.
- Árvore efetivamente armazenada na Vercel: `remote-file-tree.json` e `remote-file-comparison.json`, obtidos numa sexta consulta GET, exclusivamente de metadados.
- Análise local: `local-analysis.json`, `bank-bundle-probe.json`, `build-span-times.json`, `cli-source-locations.json`.

Comparando os hashes atuais com a fonte 10B, apenas `docs/release/release-readiness.json` difere entre os ficheiros originais. O relatório 10B é um ficheiro adicional. Código da aplicação, configuração `vercel.json`/`.vercelignore`, dependências, testes, perguntas, scoring, storage e writer mantêm os hashes originais. Na Fase 10B, a CLI alterou temporariamente `.gitignore`; as duas regras redundantes foram removidas e os bytes anteriores restaurados. Isto está registado, não foi ocultado como ausência de alterações intermédias.

Foram criados ficheiros derivados locais: ligação `.vercel/`, ficheiros de ambiente ignorados, output oficial de build, scripts de orquestração e payload mínimo dentro de `tmp/phase10b/`. O `builds.json` enviado foi deliberadamente reduzido a target Preview e versão da CLI; não era uma cópia integral do metadado oficial. Não há alteração do conteúdo público resultante: os 14 ficheiros públicos são iguais, por SHA-256, ao build aprovado. A minimização dos metadados é uma variável do empacotamento que deve ser explicitamente validada com conteúdo sintético numa futura experiência, não presumida universalmente inócua.

## 3. Sequência e comandos

Horas em UTC, equivalentes a Europe/Lisbon nesta data. **API** e timestamps gravados dentro de JSON são eventos com relógio explícito; **FS** é mtime do ficheiro preservado, não necessariamente início/fim exatos do comando. Não foi capturado um transcript completo, inviolável, de todas as execuções.

| Hora                              | Evento e evidência                                                                      | Resultado                                                                                |
| --------------------------------- | --------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| 13:13:02, FS                      | Preflight e inventário da fonte, árvore inicialmente limpa                              | `source-inventory.json`                                                                  |
| 13:13–13:14:58, FS/logs           | Typecheck, lint, formato, 226 testes/25 ficheiros, build, guard e oito guard tests      | Todos exit 0 em `final-checks.json`                                                      |
| 13:15:19, FS                      | Banco/arquivos e oracle independente de 1000 seeds                                      | PASS, 90 perguntas/364 opções/64 LO/29 grupos                                            |
| 13:15:43–13:33:56, JSON/logs      | Quatro shards sequenciais, um worker: Chromium, Firefox, WebKit, móvel                  | 364/364, zero omissions/skips/flaky/retries; 1084494 ms                                  |
| Antes de 13:35:03                 | Autenticação isolada concluída pelo proprietário; consultas scoped ao projeto existente | IDs/plano/proteção/zero deployments verificados                                          |
| 13:35:03, FS                      | Ligação local confirmada                                                                | `link-verification.json`, IDs exatos                                                     |
| Entre ligação e início do build   | Pull das variáveis/configuração Preview                                                 | Hora exata não persistida; nenhum valor de segredo reproduzido                           |
| 13:36:28, FS                      | Revisão do delta automático de `.gitignore`                                             | Regras redundantes revertidas, exclusões mantidas                                        |
| 13:36:53.932–13:38:02.823         | Primeiro span de build e mtime do log final                                             | Build Preview concluído, exit 0; Node 24 prevaleceu sobre default remoto 26              |
| 13:47:05, FS                      | Dry-run do output oficial                                                               | 19 ficheiros, incluindo diagnósticos locais                                              |
| Até 13:50:26, FS                  | Cópia mínima e segundo dry-run                                                          | 16 ficheiros; zero upload/deployment no dry-run                                          |
| 13:51:50.361, JSON                | Ledger local criado imediatamente antes da única chamada de deploy                      | Target pedido: preview                                                                   |
| 13:51:53.428, API                 | Deployment criado; `buildingAt` e `ready` têm o mesmo timestamp no objeto atual         | Production; não inferir duração real de build destes campos prebuilt                     |
| 13:51:54.484, API                 | Aliases atribuídos                                                                      | Dois aliases Production automáticos                                                      |
| 13:51:55.419, FS                  | Resposta CLI guardada                                                                   | `status=ok`, READY, target Production; o exit 0 não significava segurança aprovada       |
| Até 13:53:53, FS                  | Descoberta do target e GET anónimo                                                      | HTTP 200; hash igual ao HTML aprovado, sem redirect                                      |
| 13:54:52, FS                      | Tentativa de suspensão não interativa                                                   | Exit 1, `interactive_confirmation_required`; nenhuma suspensão efetuada por esse comando |
| 14:05:48.977, JSON                | Nova verificação de contenção                                                           | Ainda HTTP 200 e HTML aprovado                                                           |
| Entre essa observação e 14:11:11  | Proprietário confirmou a suspensão no terminal                                          | Success reportado; hora exata e exit code do terminal não capturados                     |
| 14:11:11.972, JSON                | Primeira verificação independente pós-pausa                                             | 18/18: 503 `DEPLOYMENT_PAUSED`                                                           |
| 15:22:44–15:22:52, JSON           | Cinco GET atuais da API                                                                 | Todos exit 0; paused=true, live=false, um deployment Production                          |
| 15:23:56.688 e 15:35:27.205, JSON | Verificação atual de raiz e dos 14 assets nos três hosts                                | 36+9 GET; todos 503 `DEPLOYMENT_PAUSED`                                                  |

### Argumentos das operações históricas

`VC` significa `node <CLI_59.3.0>/dist/vc.js --global-config <AUTH>`. Os placeholders ocultam somente o caminho local do executável e a localização da autenticação; target, flags e identificadores são os usados. **Esta secção é evidência, não instrução para executar comandos.**

```text
VC link --project prj_lFdRrkxQt2yqEpfzurOA00WJJX69 --team team_YNKbyfPSXwYEw0XveEc3TXRp --scope testlearn808005-9164 --yes --non-interactive
VC pull --environment preview --project prj_lFdRrkxQt2yqEpfzurOA00WJJX69 --scope testlearn808005-9164 --yes --non-interactive
VC build --target preview --project prj_lFdRrkxQt2yqEpfzurOA00WJJX69 --scope testlearn808005-9164 --non-interactive
VC deploy --dry --prebuilt --target preview --project prj_lFdRrkxQt2yqEpfzurOA00WJJX69 --scope testlearn808005-9164 --non-interactive --json
VC deploy --dry --prebuilt --target preview --cwd tmp/phase10b/payload --project prj_lFdRrkxQt2yqEpfzurOA00WJJX69 --scope testlearn808005-9164 --non-interactive --json
VC deploy --prebuilt --target preview --cwd tmp/phase10b/payload --project prj_lFdRrkxQt2yqEpfzurOA00WJJX69 --scope testlearn808005-9164 --non-interactive --yes --json --no-wait
VC project pause testlearn-lab --scope testlearn808005-9164 --non-interactive --json
```

Os seis primeiros comandos tiveram exit 0 observado na execução 10B; a tentativa de pausa não interativa teve exit 1, com recibo JSON. Nem todos têm um recibo individual de return code: a reconstrução cruza a observação anterior, scripts, logs, manifests e ramos de sucesso. A pausa manual seguinte não deve receber um exit code inventado: apenas a mensagem do proprietário e a verificação HTTP estão disponíveis. `--team` na ligação gerou aviso de depreciação; não alterou os IDs verificados. A sugestão `deploy --prod` incluída em `next` na resposta da CLI **não foi executada**.

Ocorreram também falhas locais de preparação: resolução offline de uma dependência da CLI e um import relativo incorreto no helper, corrigido antes de a chamada de criação ser alcançada. O ledger exclusivo e a listagem remota de um único deployment impedem confundir essas falhas locais com deployments adicionais. Os seus instantes exatos não ficaram num recibo dedicado.

## 4. RCA: factos, inferências e limites

**Factos verificados:**

1. A CLI instalada é 59.3.0; o hash do entrypoint coincide com o inventário 10B. O help guardado admite `--prebuilt` e `--target`. O script histórico fornece literalmente `preview`; não fornece `--prod` ou `--temporary`.
2. Os IDs locais e remotos coincidem: equipa `team_YNKbyfPSXwYEw0XveEc3TXRp`, projeto `prj_lFdRrkxQt2yqEpfzurOA00WJJX69`. Não houve troca para KAVTRIS. O snapshot anterior e o guard de deploy indicam zero deployments antes da criação.
3. O build original e o `builds.json` mínimo enviado registam `target: preview`. `--prebuilt` evita reconstruir a aplicação remotamente; não é, por si, uma garantia de classificação ou de autenticação.
4. A resposta CLI e consultas independentes à API confirmam `production`, incluindo o target de produção do projeto e os aliases. A autenticação continuava `deploymentType: preview`.
5. O código instalado de `parseTarget` preserva o valor string pedido. O leitor de prebuilt verifica target/erros locais. Isto não constitui uma captura do POST efetivamente enviado nem revela a implementação interna da plataforma.

**Explicação documental e operacional:** a [documentação de ambientes, secção First deployment](https://vercel.com/docs/deployments/environments#first-deployment), consultada nesta RCA, inclui explicitamente `--target=preview` entre os casos em que o primeiro deployment é Production. Também distingue deployments anteriores falhados de deployments eliminados: eliminar todos volta a deixar o projeto sem baseline. A sequência observada é consistente com essa regra. Não foi recolhida uma cópia histórica dessa página antes da tentativa; não se afirma que a RCA tenha acesso ao estado interno do serviço nessa hora.

**Causa de exposição confirmada:** conteúdo académico real foi enviado antes de existir uma proteção comprovada para todos os targets/hosts possíveis. A classificação resultante ficou fora da proteção Preview-only. O controlo de release confundiu intenção local com garantia remota e só detetou o problema depois da publicação. A responsabilidade pela validação prévia em falta não é transferida para o proprietário.

**Inferência forte:** o tratamento especial do primeiro deployment explica a classificação deste caso. Não é necessário supor uma mudança do banco, do writer, do Node ou das chaves para explicar o incidente.

**Hipóteses não comprovadas:** bug concreto da CLI, ponto exato de normalização no request/API/backend, influência da minimização de metadados e comportamento de outras versões/planos/interfaces. Para esses detalhes: `ROOT_CAUSE_UNCONFIRMED`. Não foi reproduzido nenhum deles. O [issue #17069](https://github.com/vercel/vercel/issues/17069) documenta relatos semelhantes, mas não substitui uma prova interna nem autoriza novos ensaios.

### Proteção e Hobby

A [documentação da API de Vercel Authentication](https://vercel.com/docs/deployment-protection/methods-to-protect-deployments/vercel-authentication#how-to-manage-vercel-authentication-with-the-api) distingue `preview`, Standard Protection e `all`. A proteção efetiva observada era a primeira. **Standard Protection também não equivale a proteger os domínios de produção**; a cobertura de todos os URLs exige All Deployments. Ver [âmbitos de proteção](https://vercel.com/docs/deployment-protection).

A [tabela atual de preços](https://vercel.com/docs/deployment-protection/usage-and-pricing) inclui Vercel Authentication e All Deployments no Hobby, sem add-on específico. Não confundir isso com Password Protection, indisponível no Hobby. A documentação de ambientes reserva ambientes personalizados nomeados para Pro/Enterprise. Não foi ativada ou testada a opção All nesta conta; a sua eficácia deve ser demonstrada com artefactos sintéticos, não presumida a partir da tabela. Não foi feita auditoria de faturação nem se garante custo total zero.

## 5. Inventário e avaliação de exposição

Todos os 16 ficheiros locais enviados ainda correspondem aos hashes de `upload-inventory.json`. Os 14 ficheiros públicos somam 1938407 bytes; os dois metadados somam 1359 bytes. Os SHA-256 completos e tamanhos individuais ficam no manifesto original e em `tmp/phase10c/local-analysis.json`.

A árvore remota de `/v6/deployments/<ID>/files` contém exatamente os mesmos 16 caminhos, sem extras. Todos os `uid` retornados coincidem com o SHA-1 calculado dos ficheiros locais aprovados, cujos SHA-256 também foram reconfirmados. Esta comparação reforça a identificação do payload efetivamente armazenado; não exigiu ler ficheiros privados, descarregar conteúdo remoto da aplicação ou despausar o projeto. SHA-1 é aqui o identificador devolvido pelo serviço, não uma garantia criptográfica isolada contra adulteração deliberada.

| Categoria                                                                               | Incluído no payload             | Entrega anónima antes da pausa                                                                      |
| --------------------------------------------------------------------------------------- | ------------------------------- | --------------------------------------------------------------------------------------------------- |
| `index.html`, 686 B                                                                     | Sim                             | **Confirmada**, corpo exato; SHA `7ef5dd6f8b7703ce4ab25cbf735fe88c111b32b6f75ead931eff3f891067c3d8` |
| JS inicial, 702001 B                                                                    | Sim                             | Potencialmente público; não foi descarregado anonimamente antes da pausa na evidência preservada    |
| CSS, 31083 B                                                                            | Sim                             | Potencialmente público; não demonstrado individualmente antes da pausa                              |
| Banco atual, PT/EN, chaves e explicações                                                | Integrado no JS cliente         | Potencialmente exposto com o JS, não confundir com dados de progresso                               |
| Oito chunks históricos `.1`–`.8`                                                        | Sim                             | Potencialmente públicos; acessos pré-pausa não foram medidos individualmente                        |
| `.vite/manifest.json`, favicon e robots                                                 | Sim                             | Potencialmente públicos; não se presume proteção por serem ficheiros auxiliares/ocultos             |
| `config.json` e `builds.json` mínimos                                                   | Sim, metadados de deploy        | Não foi demonstrado acesso anónimo a estes ficheiros do plano de controlo                           |
| Source maps, fontes `.ts/.tsx`, documentação interna, PDFs, fixtures, backups ou perfis | Não constam da allowlist dos 16 | Sem evidência de envio como ficheiros; JS compilado contém código e referências de proveniência     |
| `.env`, credenciais locais e progresso pessoal                                          | Não constam do payload          | Não há evidência de envio de valores desses ficheiros ou de dados LocalStorage                      |

O banco atual tem 90 perguntas, 364 opções e 64 LO. O código constrói parte dos IDs em runtime: uma busca por IDs literais falhou para 29 IDs e não foi tratada como ausência de conteúdo. Prefixos de enunciados PT e EN das 90 perguntas estão presentes no JS, corroborando as importações eager e os hashes do build validado. Não foi executado código remoto para extrair dados de terceiros.

Os arquivos `.1`, `.2`, `.3`, `.4`, `.5`, `.6`, `.7`, `.8` contêm respetivamente **40, 40, 47, 66, 66, 82, 82, 82 perguntas**. A revisão `.9` de 90 perguntas é o banco atual; não existe um nono chunk histórico separado enviado. Contagens de versões não devem ser somadas como perguntas originais únicas.

O manifesto é uma prova dos ficheiros preparados/enviados, não um pacote integral de todos os campos do POST. A API atual também mostra chaves de metadados Git de autor/email/SHA: a CLI enviou metadados do commit fora da lista de ficheiros. Valores pessoais não foram reproduzidos nesta RCA e não se provou a sua divulgação anónima. Isso não é upload da pasta `.git` ou de todo o histórico. A afirmação anterior de ausência de Git history deve ser lida com esta distinção.

A verificação de padrões JWT no payload foi estreita, não uma auditoria exaustiva de qualquer segredo possível. A allowlist, a igualdade com o build pré-autenticação e a ausência de ficheiros privados são evidências complementares. Referências como caminhos `docs/...` dentro da proveniência das perguntas não demonstram que os relatórios completos tenham sido enviados.

`src/storage/store.ts` grava `testlearn.v1` no LocalStorage do navegador. Esses dados não pertencem ao build estático. Não há prova de que progresso real de localhost tenha sido transferido para a Vercel; os testes remotos funcionais foram interrompidos antes de importar dados. Um eventual visitante poderia criar progresso no seu próprio navegador, cuja existência não foi investigada. Não se recuperaram dados privados de utilizadores.

### Janela e alcance desconhecidos

O HTML esteve comprovadamente acessível por GET na observação registada aproximadamente às 13:53:53 e novamente às 14:05:48.977. Isto não é monitorização contínua. A criação/READY às 13:51:53.428 e a primeira prova de bloqueio às 14:11:11.972 delimitam uma **janela potencial máxima observada de 19 min 18,544 s** para esta análise; o instante exato da pausa não foi registado. Não há contagem verificada de visitantes, downloads, indexação ou cópias em caches de terceiros. Pausar não recupera conteúdo que alguém possa já ter descarregado.

## 6. Contenção atual

Consultas GET scoped de 15:22:44–15:22:52: equipa Hobby correta, projeto `paused=true`, `live=false`, proteção Preview-only, Git não ligado; um único deployment, paginação sem próximo resultado, target Production. `READY` descreve o artefacto concluído e é compatível com o projeto estar pausado; não é prova de tráfego ativo. `live` do objeto de deployment não foi retornado, pelo que não se inventa um valor: `live=false` é do projeto.

Domínio listado: `testlearn-lab.vercel.app`. Os dois aliases do deployment são esse host e `testlearn-lab-testlearn808005-9164.vercel.app`; são conceitos/listagens diferentes, não uma inconsistência. Não apareceu domínio personalizado adicional.

Os 45 GET atuais cobrem os três hosts conhecidos e todos os ficheiros públicos, incluindo cada um dos oito chunks históricos. Todos devolveram 503 `DEPLOYMENT_PAUSED`; os primeiros 36 também foram comparados com hashes de conteúdo aprovado, sem correspondência. Estes resultados confirmam a contenção nesses URLs agora. Não comprovam eliminação dos artefactos na Vercel, retenção futura, revogação de cópias já descarregadas ou ausência de acessos passados. Não foram detetadas inconsistências novas que invalidem a contenção.

## 7. Comparação de recuperação — propostas não autorizadas

| Critério                                  | A — laboratório sintético separado; atual pausado                                              | B — retirar/eliminar o deployment após preservar evidência                                         | C — staging com origem privada independente da classificação                                                              |
| ----------------------------------------- | ---------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| Conteúdo real em risco no primeiro ensaio | Nenhum, se isolamento físico e allowlist sintética forem cumpridos                             | Continua possível se voltar a enviar o TestLearn                                                   | Nenhum antes de a origem negar acesso público e passar o ensaio sintético                                                 |
| Primeiro deployment                       | Tratar Production como resultado esperado; requer autorização específica mesmo sendo sintético | Apagar todos reinicia a condição de primeiro deployment segundo a documentação; não é uma correção | Evita depender dessa regra; o provedor/arquitetura escolhido ainda precisa de prova                                       |
| Proteção/domínios                         | All Deployments pré-configurado e validado nos URLs gerados e de produção; Standard não basta  | Remoção pode retirar entrega, mas não prova autenticação para uma próxima tentativa                | Autenticação/controlo de rede cobre HTML, JS, CSS, históricos e origem direta; proxy sem bloquear a origem é insuficiente |
| Hobby/custo                               | Auth All incluída segundo documentação atual; verificar conta/quotas antes, sem upgrades       | Não resolve limites de plano ou proteção; remoção não equivale a zerar custos/retencão             | Reutilização local/infra privada existente pode evitar serviços pagos; disponibilidade e custo não demonstrados           |
| Validação                                 | Mais simples: minúsculo artefacto revisto, sem banco, sem segredos, sem fixtures do TestLearn  | Exige prova de remoção por URL/alias, preservação de logs e revalidação integral                   | Mais componentes, credenciais e pontos de bypass para auditar; nova decisão arquitetural                                  |
| Reversibilidade/evidência                 | Melhor: incidente intacto e pausado; laboratório descartável separadamente                     | Pior: apagar deployment/projeto pode perder metadados, logs e histórico de classificação           | Incidente pode ficar intacto, mas nova infraestrutura aumenta operação e configuração                                     |
| Isolamento KAVTRIS                        | Equipa Testlearn, diretório e IDs novos aprovados; sem herdar contexto do repositório real     | Mesmos IDs do incidente, risco operacional maior                                                   | Fronteiras próprias e nenhum recurso KAVTRIS; têm de ser explicitamente provadas                                          |

**Recomendação: A.** A evidência atual mostra que apagar/repetir no mesmo estado vazio não é uma garantia e que o conteúdo real foi o fator de impacto. Preservar o incidente pausado e testar primeiro apenas conteúdo sintético reduz o dano possível sem perder evidência. O laboratório seria novo e descartável, com diretório próprio e contexto de build que não possa ler perguntas, arquivos, backups ou credenciais do TestLearn.

Antes desse primeiro ensaio, obter autorização explícita para criação do laboratório, configuração de proteção e uma implantação **sintética que pode ser classificada como Production**. A recomendação é mantê-la protegida com All Deployments desde antes do upload. Uma landing page sintética intencionalmente pública é uma alternativa distinta, permitida apenas se o proprietário autorizar expressamente a publicação dessa landing sem conteúdo TestLearn, dados pessoais ou segredos. Não está autorizada aqui.

Depois de um laboratório sintético demonstrar target efetivo e acesso negado em todos os hosts/assets, uma tentativa posterior com conteúdo académico real continua a exigir autorização própria. Não utilizar a autorização anterior nem uma simples mudança de flag como permissão. C é alternativa se não se conseguir demonstrar a proteção global; um staging local privado mantém o conteúdo fora de uploads enquanto isso. B não é recomendado como primeiro passo e nenhuma eliminação foi efetuada.

## 8. Gates futuros que falham em segurança

Isto é desenho de processo, não implementação de um novo executor:

1. **Autorização e identidade:** ficheiro de autorização específico por tentativa, válido para conta/equipa/projeto exatos, artefacto `SYNTHETIC` ou `REAL`, hash, operações, target permitido e prazo. Qualquer falta/diferença bloqueia antes do upload. Não aceitar automaticamente o projeto encontrado no cwd ou em variáveis de ambiente.
2. **Contexto e classificação:** separar diretório sintético do repositório real. Consultar historial antes; zero deployments é uma condição especial, não uma garantia de Preview. Não passar conteúdo real ao primeiro ensaio. Uma classificação Production necessita de autorização separada, não de fallback automático.
3. **Proteção anterior à publicação:** exigir configuração efetiva que cubra todos os targets e hosts possíveis, incluindo domínios de produção. Para conteúdo real, uma estratégia já provada com conteúdo sintético e proteção All/origem privada tem de existir **antes** do upload. `noindex`, robots e URL difícil de adivinhar não satisfazem o gate.
4. **Artefacto:** inventário imutável, allowlist exata, negação por defeito de ficheiros desconhecidos, resolução segura de symlinks, comparação de hashes, scan local de segredos com revisão de falsos negativos e revisão dos metadados API/Git fora da lista de ficheiros. Contexto sintético não pode importar o banco real; regexes de IDs não bastam. Não enviar `.env`, perfis, backups, documentação ou diagnósticos privados.
5. **Tentativa única e recibos:** CLI e dependências de tooling fixadas/verificadas, argumentos registados com segredos redigidos; tokens não passados na linha de comandos. Guardar exit code, stdout/stderr seguros e ledger exclusivo antes da única criação. Timeout ou resultado incerto exige apenas inspeção; nunca repetir automaticamente a criação.
6. **Target remoto imediatamente após criação:** obter ID e classificação da resposta e confirmar pela API. Target inesperado, em falta, inconclusivo ou divergente interrompe o pipeline **antes de qualquer teste funcional** e aciona o procedimento de incidente. Exit 0 não significa aprovação. Não executar sugestões `next` do output sem verificar autorização.
7. **Teste anónimo independente:** contexto sem cookies, tokens, bypass, sessão Vercel ou redirects silenciosos. Testar deployment, todos os aliases/domínios e HTML/JS/CSS/manifest/históricos; analisar headers e corpos, não apenas status. Um 200 de login não é um 200 da aplicação; um erro de rede não prova proteção. Qualquer conteúdo aprovado anónimo bloqueia.
8. **Acesso autorizado e cache:** só depois dos gates anteriores, login legítimo e smoke sintético. Depois de aquecer assets com acesso autorizado, repetir os pedidos anónimos. Nenhum bypass/share link é requisito deste plano. Migrar para conteúdo real apenas na estratégia e autorização já aprovadas.
9. **Contenção viável antes da janela:** procedimento escrito, operador presente e permissões mínimas aprovadas para a intervenção necessária. Se a plataforma exigir confirmação humana, não automatizar o prompt nem contorná-lo por outra API. Se não houver contenção suportada e disponível, o gate para conteúdo real permanece fechado. Não presumir que um monitor terá tempo de reagir.
10. **Preservação e encerramento:** checksums, relógios/origem dos timestamps, IDs e provas negativas/positivas guardados localmente sem credenciais; separar estado local PASS de publicação/proteção remota. Mudança de versão, política, scope, domínio ou contexto invalida a prova anterior e exige revalidação sintética. Retenção, sessão longa, alias e rollback são ensaios futuros com autorização própria.

**Detetar Production depois da criação não garante que o conteúdo nunca esteve exposto.** Um fail-closed exclusivamente reativo só interrompe a continuação do pipeline; não retira bytes já entregues. Esta é a razão para impedir uploads reais até existir proteção prévia e estratégia comprovada. Nenhum mecanismo novo desse tipo foi instalado ou ativado nesta fase.

## 9. P0/P1/P2 e decisões que exigem autorização nova

- **P0 / bloqueios de governação existentes:** publicação, identidade/contactos/direitos, aprovação académica humana e aceitação dos riscos continuam sem fecho. Não se cria um novo P0 de exfiltração de dados sem evidência.
- **P1 contido, não resolvido:** entrega académica sem autenticação ocorreu; target continua Production. Recuperação de Preview seguro e prevenção pré-publicação não foram demonstradas.
- **P2:** mecanismo interno da reclassificação sem trace; janela/visitantes/downloads desconhecidos; recibos individuais de alguns comandos e timestamp exato da pausa ausentes; secret scan anterior limitado; metadados Git transmitidos fora do manifesto; minimização de metadados sem ensaio comparativo; retenção/rollback e validação manual de acessibilidade/dispositivos por provar. O aviso de bundle não explica este incidente e não autoriza otimização nesta fase.

Exigem autorização nova, específica e independente deste relatório: criar/configurar qualquer laboratório, alterar proteção ou acessos, implantar conteúdo sintético (incluindo classificação Production), tornar pública uma landing, enviar conteúdo real, fazer novo deployment/redeployment, despausar o projeto, promover, alterar domínios/aliases, eliminar deployments/projeto, testar rollback, contactar suporte/postar um issue, alterar plano/ativar custos ou fazer commit/push. O plano não concede essas autorizações.

## 10. Ações efetivas desta investigação

Apenas seis GET de API com allowlist e 45 GET anónimos nos hosts conhecidos. Um pequeno módulo de política de leitura, local em `tmp/phase10c/`, rejeita verbos de mutação, endpoints não aprovados, outros IDs/hosts, query tokens e redirects fora do host. **5/5 testes offline** desse guard passaram. Não se executaram `link`, `pull`, build/deploy, pause/unpause, alteração de proteção, Git commit/push ou qualquer operação KAVTRIS.

Os testes de aplicação 226/364/8 e os 1000 seeds acima foram **auditados na evidência 10B**, não repetidos ou apresentados como nova execução 10C. O relatório e os diagnósticos locais são as únicas adições desta fase. Não foram alterados os dois documentos preexistentes do incidente, a aplicação ou os testes validados. Manter o projeto pausado e parar após esta investigação.
