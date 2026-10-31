# Fase 10I — preservação de assets estáticos entre releases

> Proposta em PR; não presumir uma correção em Production antes de confirmar os testes. A implementação não usa serviços pagos, analytics nem cookies de aplicação.

## Problema demonstrado na fase 10H

Ao trocar a Production da versão A (SHA `58ec1f04d3971ce8ff3fc46730f1bdd8e54f5c68`) para B (`abf15ed5376e8b34a86fc4f873a65694b7705e34`), o HTML passou a usar `assets/index-DB06V4Gu.js`. O ficheiro anterior `assets/index-CTbPgljy.js` passou a devolver **404 no domínio público atual**, embora ainda existisse no deployment A. Os oito chunks académicos das revisões `.1`–`.8` mantiveram HTTP 200.

A Vercel mantém deployments imutáveis, mas o alias Production aponta apenas para o deployment atual; um header de cache `immutable` não torna o ficheiro anterior automaticamente disponível a quem ainda não o tem em cache. O utilizador confirmou que a tentativa sintética aberta se manteve após recarregar a página; isso não elimina o risco durante a troca.

## Abordagem sem custo adicional

A pasta `public/assets/` do Vite copia ficheiros para a saída estática com nomes e bytes preservados. Os entrypoints publicados anteriores ficam ali, num **inventário append-only** em `config/retained-assets.json`, com SHA-256, commit e deployment de origem. Os dois ficheiros iniciais são:

| Asset antigo | SHA-256 |
| --- | --- |
| `assets/index-CTbPgljy.js` | `6def132bdf263f78c2b48798f917bc82e80ba05bd8b04b04689a79c0020629b1` |
| `assets/index-DB06V4Gu.js` | `250eddc57ea8a0fe2c1722669a2826cc5222e76a9b89a30b65e41c1cd33d6b65` |

A integridade é verificada por `scripts/check-retained-assets.mjs`: catálogo, caminhos seguros, SHA-256, orçamento máximo, manifest do Vite e deteção de entrypoints inesperados. `scripts/check-retained-append-only.mjs` impede remover ou alterar entradas já presentes na branch `main` durante Pull Requests.

`scripts/check-live-asset-retention.mjs` consulta **apenas** `https://testlearn-ctfl.vercel.app/` a partir do ambiente de build/CI, lê o HTML Production, identifica JavaScript principal, CSS e oito chunks históricos, e exige que **os mesmos bytes** estejam em `dist/`. Um 404, mudança de bytes, origem inesperada, rede indisponível ou chunk ausente falha a verificação. A Vercel só deve marcar o build como pronto quando os checks passarem. Estes pedidos de build não fazem parte da aplicação React no navegador.

## Instruções de atualização futura

1. **Antes de alterar código ou CSS:** identificar no HTML Production os assets ainda servidos, com URL, SHA-256 e deployment de origem.
2. Se algum asset Production não constar já do catálogo, copiar os **bytes exatos** para `public/assets/` e acrescentá-lo a `config/retained-assets.json`, ordenado alfabeticamente. Não modificar assets antigos nem reconstruí-los com outro compilador.
3. Criar PR, rever o crescimento do bundle retido, assegurar que não há source maps, PDFs, dados privados, segredos ou ficheiros não previstos. Não formatar bundles minificados arquivados.
4. Exigir CI com `npm ci`, `npm run build`, `node scripts/check-release.mjs`, `node scripts/check-retained-assets.mjs`, os testes de ambas as verificações e `node scripts/check-live-asset-retention.mjs`. O check append-only requer histórico Git e `origin/main`.
5. Confirmar que o Preview da Vercel está `READY` e protegido. Testar por HTTP os URLs dos dois bundles históricos e dos oito arquivos no Preview.
6. Só após CI e revisão, promover por PR protegido. Confirmar no domínio Production: JS atual e anteriores 200 com conteúdos idênticos, CSS, arquivos 200, headers/404 e retoma de uma sessão sintética.
7. Registar resultados e plano de recuperação; não apagar LocalStorage nem fazer rollback para uma revisão incompatível com sessões guardadas.

## Limites e riscos

- **Retenção aumenta armazenamento e transferência**, apesar de não exigir subscrição paga. O guard impõe até 250 assets históricos e menos de 32 MiB retidos. Se atingido, suspender lançamentos até haver uma política justificada; não eliminar ficheiros arbitrariamente.
- A proteção vale apenas para os assets preservados e os testes executados. Recursos de versões mais antigas, cache e páginas interrompidas durante o deploy ainda requerem ensaios.
- Os assets permanecem públicos, como o código da SPA já era; não colocar segredos ou dados pessoais no código arquivado.
- A verificação remota exige acesso ao domínio público Production durante CI e builds Vercel. Indisponibilidade bloqueia o release, sem fallback inseguro para SKIP.
- Não se afirma equivalência académica ISTQB, validação psicométrica, conformidade jurídica certificada ou retenção remota de assets sem o ensaio pós-deployment.
- Não se alteram a proteção dos Previews, projetos de incidentes ou KAVTRIS.

Evidências e acompanhamento: [Fase 10H](https://github.com/gabrielsouza80/TestLearn/issues/3) e [defeito P1](https://github.com/gabrielsouza80/TestLearn/issues/5).
