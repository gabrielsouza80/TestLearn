# Quality para main/develop e proteção proposta

Política atualizada em 04-11-2026 segundo a decisão de Gabriel: desenvolvimento normal diretamente em `develop`, PR opcional nessa branch e publicação em `main` apenas por PR e autorização explícita. O JSON [develop-branch-protection.proposed.json](develop-branch-protection.proposed.json) é **apenas proposta**, destinada à branch exata `develop` de `gabrielsouza80/TestLearn`. Não é aplicado por nenhum script ou workflow.

A proposta anterior de PR/verify obrigatórios em `develop` fica substituída por esta política, mas preservada no histórico Git (`30b11dc9b12c31fa86e57a13f5cf85631167c606`) e nas evidências locais de migração/push. Não alterar retroativamente esses relatórios nem interpretar propostas como settings aplicados.

## Estado observado e política desejada

Consulta de leitura em 04-11-2026: `develop` remoto em `e2bd71e25c64df4f0875fd8424b8cbd77e59df9e`, `protected:false`, proteção HTTP 404 **Branch not protected** e lista de rulesets vazia. `main` em `abf15ed5376e8b34a86fc4f873a65694b7705e34`, com PR, `verify` da app GitHub Actions (15368), branch atualizada e administradores abrangidos; force push e eliminação bloqueados. O repositório é público e a identidade autenticada consultada tem permissão administrativa. Nenhuma definição remota foi alterada.

- **develop:** commits e pushes normais diretos, PRs opcionais; bloquear force push e eliminação, incluindo para administradores. Sem PR, check prévio ou bypass obrigatório para trabalhar normalmente. Quality corre após o push; falhas ficam visíveis em Actions/checks, devem ser investigadas e corrigidas e impedem considerar a revisão aprovada para release. Aceitação do push não prova QA.
- **main:** sem desenvolvimento direto; PR e `verify` obrigatório, branch atualizada, administradores abrangidos, force push e eliminação bloqueados. Merge/publicação exige autorização explícita. PR #7 continua a candidata designada do P1; não a substituir por todo o `develop`.

Os bloqueios desejados de `develop` **ainda não estão aplicados**. Quality em pushes já está na workflow versionada; não depende de exigir `verify` antes de aceitar um push.

## Eventos e base imutável

Quality executa o job verify completo para pushes em main/develop e PRs destinados a main/develop, incluindo drafts. O evento edited também é explícito para repetir a validação quando o destino do PR muda; edições de metadados também poderão repetir a suite. Não há filtros de paths nem condição que ignore testes documentais. Mantêm-se typecheck, lint, format, unit/integration/seeds, build, quatro ficheiros de testes dos guards, verificadores de release/retenção/live e os quatro projetos Playwright. Não se introduzem deploys, secrets ou pull_request_target.

O guard append-only exige GITHUB_EVENT_PATH com payload JSON válido, SHA candidato completo e checkout HEAD correspondente:

- PR: base.ref main/develop deve coincidir com GITHUB_BASE_REF, GITHUB_REF deve ser refs/pull/N/merge, e a comparação usa base.sha do evento. Base e head do PR devem ser ancestrais do checkout. Não se lê origin/main/develop mutável como referência de comparação.
- Push: ref main/develop do ambiente e payload devem coincidir; after deve coincidir com GITHUB_SHA. before deve existir e ser ancestral. Push forced/deleted, zero SHA ou histórico incompleto falham; não existe bootstrap silencioso de branch nova.
- workflow_dispatch: selecionar main/develop e fornecer retention_base_sha com o SHA completo do primeiro parent do commit escolhido. O guard confirma a igualdade com HEAD^1. Um ancestral antigo conveniente, input ausente ou tag/feature branch são recusados. Obter previamente o SHA pela consulta Git, não por suposição. O campo é obrigatório no YAML e é lido do payload, sem interpolação shell de input.

As semânticas de GITHUB_REF/GITHUB_SHA e checkout do merge sintético correspondem à [documentação GitHub](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows). Bases são argumentos Git validados, sem comandos shell construídos com conteúdo do evento. A falta de um objeto num checkout incompleto falha; fetch-depth:0 continua configurado. O guard não faz fetch nem aceita branches arbitrárias.

## Catálogos e limites

A validação estrutural existente foi extraída para parseRetainedCatalog e é usada tanto no catálogo histórico quanto no candidato. Um catálogo anterior ausente só permite bootstrap se ls-tree confirmar a ausência numa base real contendo package.json. JSON inválido, schema incorreto, catálogo vazio/inválido, falha Git ou catálogo alterado/removido são erros.

O catálogo atual deve corresponder ao catálogo do commit checked out e preservar integralmente as entradas antigas. Mantêm-se os limites e verificações existentes de paths, hashes, opções de proveniência, 250 entradas, menos de 32 MiB, ficheiros em falta, symlinks, corrupção e live guard. Append-only valida metadados; os guards de build continuam responsáveis pelos bytes e dependências publicados. Uma execução local fora dos eventos suportados agora falha em vez de devolver checked:false.

Não se alteram perguntas, scoring, persistência, revisões históricas, Vercel config ou a regra main. GitHub Actions e os guards executam código do PR: não são uma sandbox nem substituem revisão de código; nenhuma credencial de deploy é fornecida pelo workflow. Não se afirma que metadata sourceCommit é assinatura ou endosso académico.

## Proteção develop proposta, não aplicada

O JSON usa `required_pull_request_reviews:null` e `required_status_checks:null`. Zero aprovações dentro de um objeto de reviews **não** desativa a exigência de PR. `enforce_admins:true`, `allow_force_pushes:false` e `allow_deletions:false` preservam os bloqueios sem impedir pushes normais. Não se exigem conversas resolvidas, histórico linear, restrições de push ou lock. Não executar este JSON nesta tarefa.

### Configuração manual por Gabriel

1. Abrir [Settings → Branches](https://github.com/gabrielsouza80/TestLearn/settings/branches) → **Add classic branch protection rule**. Em **Branch name pattern**, escrever apenas `develop`, sem wildcard. Se entretanto existir regra exata, inspecioná-la e editá-la em vez de duplicar. Não editar `main`.
2. Deixar **Require a pull request before merging** e **Require status checks to pass before merging** desmarcados; não selecionar `verify` nem exigir branch atualizada em `develop`.
3. Marcar **Do not allow bypassing the above settings** (ou **Include administrators**, conforme a interface).
4. Deixar **Allow force pushes** e **Allow deletions** desmarcados. A regra clássica bloqueia ambos por defeito; estas opções são permissões, não bloqueios.
5. Deixar desmarcados **Lock branch**, histórico linear, assinaturas, conversas ou deployments obrigatórios, merge queue e restrições adicionais de quem pode fazer push, se disponíveis. Não adicionar exceções/bypass para permitir desenvolvimento normal.
6. Rever e guardar apenas a regra `develop`. O repositório público suporta esta proteção sem upgrade pago. Se a interface/permissão não corresponder, parar e registar a diferença, sem alterar permissões.
7. Reconsultar proteção/rulesets por leitura: proteção ativa, administradores abrangidos, force push/eliminação desativados, sem PR/checks obrigatórios ou restrições que impeçam pushes normais; campos de requisitos desativados podem estar ausentes. Confirmar `main` intacta. Não testar com force push, eliminação ou push deliberadamente inválido.

Referências consultadas em 04-11-2026: [gestão de regras clássicas](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/managing-a-branch-protection-rule) e [branches protegidas](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches). O JSON versionado não aplica proteção; Vercel READY não substitui Quality.

## Validação e sequência autorizável

Os testes do guard usam Git real e CLI em repositórios sintéticos, incluindo main/develop com catálogos distintos, para detetar comparação com a branch errada, ref mutável, remoção, metadata alterada, eventos/SHA inválidos, ancestry/checkout incorretos e dispatch/base imprópria. A prova definitiva de triggers/runners/checks GitHub continua a exigir CI remota autorizada; um parser YAML ou fixture local não a substitui.

1. Rever o diff e os resultados locais da árvore exata.
2. Obter autorização para commit local e, separadamente, push normal direto para `develop`, incluindo o Preview protegido automático existente. PR para `develop` é opcional; não criar PR para `main` nem alterar PR #7 nesta tarefa.
3. Após push autorizado, inspecionar Quality completa no SHA exato, incluindo falhas, skips e retries. Corrigir falhas em `develop`; preservar guards fail-closed mesmo em falhas de rede. Não alegar CI aprovada para árvore local não enviada.
4. Gabriel configura manualmente a regra exata `develop` pelos passos acima; confirmar por leitura. Não é necessário `verify` pré-existente para guardar esta política ou aceitar um push normal.
5. Futuras releases seguem por PR para `main` quando prontas, com Quality aprovada e autorização explícita de publicação. Este documento não autoriza commit, push, PR, merge, deploy, promoção, rollback ou settings.

Podem existir duas execuções futuras quando develop for origem de PR para main: push e merge sintético têm propósitos distintos. Workflow dispatch requer que o workflow exista na default branch; essa condição já existe na configuração atual, mas os novos inputs no ref escolhido ainda precisam de prova remota. Manter as limitações de rede, retenção bounded e oito arquivos atuais documentadas. **Phase 10G permanece BLOCKED; PR #7 continua a candidata atual do P1.**

Os perfis persistentes do teste de recuperação de browser são criados no diretório temporário do sistema, fora da árvore observada pelo Vite. Isto evita que um parent.lock nativo do Firefox faça cair o servidor de HMR durante testes paralelos; as asserções de recuperação, os timeouts e os workers não foram reduzidos ou relaxados.
