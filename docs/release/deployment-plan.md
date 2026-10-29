# Plano de alojamento e publicação — NÃO EXECUTAR SEM AUTORIZAÇÃO

> Atualização: resultados e preparação atuais em [fase 9.3](phase9.3-release-gates.md). O detalhe abaixo conserva a evidência/contrato anterior; não representa uma nova validação remota ou manual.

Não existe host/projeto de deployment/domínio configurado. A workflow quality é QA, sem deploy. Não criar automaticamente recursos Vercel/Netlify ou modificar infraestrutura de outro projeto. Vite preview é apenas servidor local de validação. Selecionar alojamento estático HTTPS que suporte headers, 404 correto e retenção dos assets antigos.

## Contrato técnico

- Node **24**; versão local v24.19.0, package-lock preservado. Preparação limpa autorizada usa npm ci apenas se necessário, sem processos TestLearn a prender Rollup/esbuild; nunca terminar processos alheios.
- Build: npm run build. Distribuição: **só dist/**, incluindo assets e favicon/robots. Nenhuma variável de ambiente de aplicação requerida. Não publicar raiz do repositório, docs, tmp ou relatórios.
- Navegação sem router de URLs: / e /index.html; restantes caminhos existentes servem ficheiros; caminhos desconhecidos/JS em falta devolvem **404**, não HTML 200. Não são suportadas rotas /privacy ou /about: informação navega dentro da aplicação. Testar separadamente um subdiretório com base relativo antes de o suportar.
- Transpor config/security-headers.json para respostas do host. Validar CSP real, framing/nosniff/referrer/permissions/robots e compatibilidade com imports. Preview.headers não configura um fornecedor remoto.
- HTTPS obrigatório, redirect HTTP→HTTPS e HSTS após confirmação do domínio/política. Não configurar preload ou incluir subdomínios sem conhecer o domínio e efeitos.
- HTML e ficheiros sem hash: no-cache/revalidação. Assets com hash: public,max-age=31536000,immutable, sem os reescrever sob o mesmo nome. Segurança headers deve aplicar-se também a erros; cache de erros não deve esconder recuperação.
- **Retenção:** preservar a união de todos os assets JS/CSS com hash já publicados durante a vida suportada da beta. URLs antigos podem ser pedidos muito depois de uma página abrir. Não confiar no browser cache, no TTL ou numa alegação genérica de deploy imutável. Confirmar e demonstrar no host que uma URL antiga continua acessível após novo deploy/rollback.
- O carregamento de um arquivo perdido falha fechado: preserva dados, mostra mensagem e oferece reload; não faz fallback para conteúdo atual. O teste local 404→retry comprova recuperação quando o asset volta, não retenção remota.

## Sequência de release

1. Rever e preservar o trabalho local. O candidato atual não está commitado nem limpo; o responsável deve rever, criar um commit autorizado e identificar source SHA antes de qualquer publicação. Não aceitar uma tag que omita ficheiros novos.
2. Conferir lock, banco .9 e nove hashes; executar typecheck, lint, format:check, npm test, build, node scripts/check-release.mjs, node --test scripts/check-release.test.mjs e npm run test:e2e. Guardar logs/exit codes e inventário SHA-256 do artefacto.
3. Rever lista de ficheiros, grafo de módulos, ausência de dados privados/segredos/PDFs/source maps, noindex e copy pública. Manter mapas e evidência técnica fora do upload.
4. Smoke de preview de produção: início, 40 quotas, múltiplas, retoma, prazo, resultado, .1–.8, 404/retry, storage, reset, teclado/axe e zero tracking.
5. Completar identidade/contacto reais, política de host/logs, direitos e revisão dos avisos. Substituir a informação de preparação pública por texto final aprovado. Repetir QA proporcional se o runtime/copy mudar. Canonical/og:url só quando existir URL real; não derivar de um domínio de staging. Não há sitemap necessário para este único entry point de beta noindex.
6. Confirmar headers/TLS/cache/retention/rollback no host escolhido. Receber **autorização explícita do responsável** para o source SHA e artefacto exatos. Sem isto PUBLICATION_AUTHORIZED=NO.
7. Só após autorização: upload estático, sem diretórios privados. Smoke remoto com headers/404/assets antigos, fluxos guardados e privacy/contacto reais; não usar dados reais de piloto como fixture. Verificar também robots/canonical no domínio final. Não alegar deploy bem-sucedido a partir de teste local.
8. Guardar release ID/inventário e iniciar triagem de incidentes. Falha crítica: suspender publicação/acionar rollback de artefactos sem apagar dados de browsers.

O host, URL, retenção e detalhes de logging são OWNER_ACTION_REQUIRED; nenhuma capacidade de retenção Vercel/Netlify foi presumida. Um preview/local bem-sucedido não é autorização de publicação.
