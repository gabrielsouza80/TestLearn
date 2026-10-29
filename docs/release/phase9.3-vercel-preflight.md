# Fase 9.3 — preparação Vercel Hobby isolada

Consulta de documentação oficial: **29-10-2026**. Apenas configuração/documentação local; nenhum projeto, domínio, alias, recurso pago, ligação Git ou deploy foi criado. Não foram consultados projetos, variáveis, bases de dados ou código KAVTRIS. `testlearn.vercel.app` é **tentativo, disponibilidade não verificada**.

## Configuração preparada

`vercel.json`: framework Vite, `npm ci`, Node **24.x** declarado em package/lock, build `npm run build && node scripts/check-release.mjs`, output **dist**. Sem functions, backend, variáveis, regiões de funções, autenticação, analytics, aliases ou rewrites SPA. A aplicação navega internamente; caminhos inexistentes devem continuar a devolver 404, sem devolver index.html para um chunk em falta.

Headers restritivos de `config/security-headers.json` transpostos para o host. HTML `/` e `/index.html` com revalidação (`max-age=0,must-revalidate`); `/assets/*` com cache imutável de um ano. Nenhum limite de cache equivale a uma política de retenção. `.vercelignore` exclui docs/tmp/testes/relatórios/node_modules/dist e ficheiros locais sensíveis do upload CLI; `.vercel/` fica fora do Git. No fluxo Git, o checkout/build é tratado pelo fornecedor: a fronteira **pública** continua a ser apenas dist, não uma promessa de que o fornecedor nunca processa fontes.

Guard existente executado após build recusa assets inesperados, PDFs, materiais privados e source maps, e verifica os oito chunks históricos lazy. Testes locais verificam a configuração e o preview. Headers, TLS/redirect, cache, deploy e rollback **remotos não foram testados**.

Fontes: [configuração](https://vercel.com/docs/project-configuration/vercel-json), [Vite](https://vercel.com/docs/frameworks/frontend/vite), [Node](https://vercel.com/docs/functions/runtimes/node-js/node-js-versions), [cache](https://vercel.com/docs/caching/cache-control-headers), [TLS](https://vercel.com/docs/cdn-security/encryption). O provider fornece HTTPS, mas o comportamento HTTP→HTTPS, headers de erro e domínio concreto têm de ser demonstrados no ensaio remoto autorizado; não se inventou uma regra de domínio antes de este existir.

## Retenção de assets: NOT_TESTED, bloqueia publicação

Deployments têm [URLs geradas próprias](https://vercel.com/docs/deployments/generated-urls), mas o alias de produção aponta para um deployment: não se conclui daí que todos os paths de deployments anteriores continuem acessíveis nesse alias.

Foi identificada informação oficial com datas diferentes: a página antiga de [Hobby](https://vercel.com/docs/plans/hobby) menciona retenção ilimitada por defeito; o [changelog de 16-09-2026](https://vercel.com/changelog/hobby-projects-now-retain-fewer-deployments-to-free-up-storage) descreve 10 GB de Deployment Storage e retenção Hobby mais restrita, com proteção das três produções mais recentes e dos três deployments mais recentes de qualquer tipo, além das exceções referidas. Prevalece a necessidade de confirmar a política atual no projeto real; não se promete retenção indefinida.

[Skew Protection](https://vercel.com/docs/skew-protection) está documentada para Pro/Enterprise; não é pressuposta em Hobby. A funcionalidade de [assets imutáveis Next.js 16.3](https://vercel.com/blog/vercel-supports-next-js-16-3), sob prefixo próprio, também não demonstra retenção dos chunks Vite em `/assets`. Não foi introduzida uma subscrição paga ou alterado o bundler para fingir essa garantia.

### Experiência remota necessária — não executada

Só depois de autorização explícita, num projeto descartável **TestLearn** isolado:

1. Identificar repository/branch/source SHA, conta/projeto e plano, sem herdar qualquer ligação KAVTRIS. Build A com assets sintéticos identificados e inventário SHA; guardar URL própria e alias.
2. Abrir A no alias, mantendo um cliente antigo vivo sem pré-carregar o chunk histórico. Desativar cache apenas no contexto de teste e registar headers/respostas.
3. Publicar B com nomes de assets diferentes, sem alterar perguntas académicas no projeto real. Pedir o path antigo pelo alias B e pela URL própria A, em contexto frio. Exigir status, MIME e SHA do asset esperado; HTML 200 não serve como sucesso.
4. Verificar o cliente antigo ao pedir o chunk, reload, prazos e preservação do raw de uma sessão sintética. Confirmar falha fechada e retry, sem fallback académico.
5. Reverter para A e testar clientes A/B, paths e dados. O [rollback Hobby](https://vercel.com/docs/cli/rollback) está documentado como limitado à produção anterior; não prometer rollback arbitrário de longo prazo.
6. Confirmar retenção efetiva, exceções, prazos de limpeza e orçamento do plano. Guardar evidência após alteração de alias e rollback; um teste local de Vite não satisfaz esta etapa.

Política pretendida: preservar a união dos assets publicados durante a vida suportada dos clientes. Se o alias/host não o assegurar, preparar e rever uma estratégia de retenção de ficheiros antigos antes de publicar, ou manter o gate bloqueado. Os chunks atuais continuam presentes e sem alterações nesta fase, mas isso não prova o comportamento de futuras mudanças de tooling ou deploy.

## Hobby, privacidade e decisões do responsável

Uso pretendido: beta pessoal **não comercial**, sujeito à confirmação de elegibilidade pelo responsável. [Hobby/fair use](https://vercel.com/docs/plans/hobby) limita o uso; tráfego, pedidos, builds e armazenamento têm quotas que podem suspender o serviço ou impedir deploys. Conferir os limites correntes na [documentação](https://vercel.com/docs/limits) e na conta antes de aprovar. Não existe promessa de custo zero permanente, disponibilidade ilimitada ou upgrade automático autorizado.

LocalStorage não significa ausência de processamento pelo host: carregar HTML/assets/arquivos gera pedidos que podem conter IP e dados técnicos. Finalidades, retenção, acessos, localizações/processadores e condições contratuais do fornecedor ficam **OWNER_ACTION_REQUIRED**. A distribuição estática pode usar CDN global; não se declarou uma região exclusiva para dados. Confirmar no projeto real logs, Toolbar/injeções, analytics desligados e ausência de recursos pagos.

Antes de qualquer primeira publicação, confirmar separadamente: repositório TestLearn, branch main, projeto TestLearn próprio, nome/URL disponível, Node/build/output, nenhuma variável/integração partilhada, source SHA limpo autorizado e inventário exato; identidade/contacto e avisos/direitos reais; ensaio remoto e rollback; autorização final. Ligar Git pode desencadear deploys: **não ligar antes dessa autorização**. `PUBLICATION_AUTHORIZED = NO` mantém-se.

## Operações realmente executadas

A integração foi usada apenas em duas chamadas `search_vercel_documentation`, para configuração e para Hobby/skew/retention. As restantes consultas foram páginas públicas oficiais. Não foram usados endpoints de projeto/conta, variáveis, deployments ou mutações, nem CLI Vercel; não existe ligação local de projeto. `tmp/phase93/vercel-operations.json` regista este âmbito observado, sem alegar auditoria de atividades externas a esta execução. Zero deploys, projetos/domínios/recursos pagos criados e zero acesso KAVTRIS.
