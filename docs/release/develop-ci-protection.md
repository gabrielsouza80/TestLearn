# Quality para main/develop e proteção proposta

A implementação local da feature branch não altera definições remotas. O JSON [develop-branch-protection.proposed.json](develop-branch-protection.proposed.json) é **apenas proposta**, destinada à branch exata develop do repositório gabrielsouza80/TestLearn. Não é aplicado por nenhum script ou workflow.

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

Exigir PR e verify emitido pela app GitHub Actions (15368), strict/up-to-date, administradores abrangidos, conversas resolvidas, sem force push/eliminação ou bypass. Manter merge commits para preservar os históricos integrados; não exigir linear history. Zero aprovações externas obrigatórias enquanto existir um único mantenedor disponível, como na main observada; não representa revisão independente. Não exigir assinaturas retroativas ou CODEOWNERS sem responsáveis.

A proteção não existe só por este JSON estar versionado. Confirmar API/permissões e o fornecedor/nome real do check antes de uma aplicação autorizada, segundo a [documentação de branches protegidas](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches). Não substituir verify por Vercel READY. Não configurar merge queue sem suporte merge_group próprio.

## Validação e sequência autorizável

Os testes do guard usam Git real e CLI em repositórios sintéticos, incluindo main/develop com catálogos distintos, para detetar comparação com a branch errada, ref mutável, remoção, metadata alterada, eventos/SHA inválidos, ancestry/checkout incorretos e dispatch/base imprópria. A prova definitiva de triggers/runners/checks GitHub continua a exigir CI remota autorizada; um parser YAML ou fixture local não a substitui.

1. Rever o diff e os resultados locais da árvore exata.
2. Autorizar separadamente commit local e envio/Preview/PR para develop, conforme o âmbito pretendido. Não criar PR para main nem alterar PR #7.
3. Inspecionar Quality completa na árvore/merge sintético exatos, sem tratar skips ou retries como invisíveis. Preservar guards fail-closed mesmo em falhas de rede.
4. Só com autorização própria, aplicar a regra exata develop depois de verify ser reconhecido e validado. Se o plano não suportar a proteção, parar; sem upgrades pagos ou bypass.
5. Merge em develop e futura sincronização com main exigem autorização específica. Nenhum merge em main, deploy, promoção ou rollback é autorizado por esta documentação.

Podem existir duas execuções futuras quando develop for origem de PR para main: push e merge sintético têm propósitos distintos. Workflow dispatch requer que o workflow exista na default branch; essa condição já existe na configuração atual, mas os novos inputs no ref escolhido ainda precisam de prova remota. Manter as limitações de rede, retenção bounded e oito arquivos atuais documentadas. **Phase 10G permanece BLOCKED; PR #7 continua a candidata atual do P1.**

Os perfis persistentes do teste de recuperação de browser são criados no diretório temporário do sistema, fora da árvore observada pelo Vite. Isto evita que um parent.lock nativo do Firefox faça cair o servidor de HMR durante testes paralelos; as asserções de recuperação, os timeouts e os workers não foram reduzidos ou relaxados.
