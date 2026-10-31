# TestLearn — estado de Production e releases

> Estado reconfirmado em 31 de outubro de 2026, na auditoria 10G. Este documento atualiza o estado operativo dos planos históricos anteriores à publicação. Não constitui certificação jurídica ou académica.

## Serviço público

- Site: https://testlearn-ctfl.vercel.app/
- Código: https://github.com/gabrielsouza80/TestLearn
- Alojamento: Vercel, projeto `testlearn`, plano Hobby, independente de KAVTRIS.
- A Production tem domínio público; os Previews e URLs de deployment individuais permanecem protegidos por autenticação Vercel.
- Production verificada: commit `abf15ed5376e8b34a86fc4f873a65694b7705e34`, deployment `dpl_G9Wsax2WV1Cz9KWN2U5mENeYdGkp`, associado ao domínio público pela API.
- CI desse commit: `verify` aprovado, run `41152055646`. É evidência remota dessa revisão, não validação de alterações locais posteriores. Resultados atuais e limitações: [auditoria 10G](phase10g-production-validation.md).
- Banco académico: 90 questões, revisão `2026-10-27.9`; não é alterado pela 0.1.1.
- Responsável público: Gabriel Souza. Contacto: testlearn808005@gmail.com.

`READY` na Vercel valida o build, não a qualidade do conteúdo nem a execução do GitHub Actions. Uma página acessível na sessão do proprietário não demonstra, isoladamente, acesso anónimo.

## Gate de release reconfirmado

O relato inicial de 30 de outubro identificava `main` sem proteção. A consulta de 31 de outubro confirma agora PR obrigatório, check `verify` da aplicação GitHub Actions obrigatório, branch atualizada, regras aplicadas a administradores e force push/eliminação desativados. Não existem rulesets adicionais; a proteção é a regra de branch. Nenhuma definição remota foi alterada nesta auditoria.

No PR #4, `verify` terminou às 00:46:48 UTC antes do merge às 00:47:20; as árvores Git do head aprovado e do commit integrado são iguais. A Vercel atribuiu o domínio às 00:48:16, antes de o novo `verify` pós-merge terminar às 00:55:40. Assim, a proteção pré-merge existe, mas não se deve afirmar que a Vercel espera pelo CI pós-merge. A workflow isolada continua sem constituir um gate de publicação. Não foram testados pushes ou merges deliberadamente inválidos.

Manter PR validado e autorização explícita antes de cada merge, pois a Vercel publica automaticamente a `main`. A PR #6 propõe retenção dos assets e continua separada desta auditoria; não fazer merge ou promover deployments sem autorização. Eventuais Deployment Checks ou alterações de promoção na Vercel precisam de proposta e aprovação próprias.

## Configuração obrigatória — GitHub (já observada)

Preservar a regra da branch exata `main`, consultável em https://github.com/gabrielsouza80/TestLearn/settings/branches:

1. **Require a pull request before merging**, sem exigir uma aprovação externa impossível para o único mantenedor.
2. **Require status checks to pass before merging**. Selecionar o check **`verify`** da workflow **Quality**, após estar visível no PR.
3. Exigir atualização da branch antes do merge quando a opção estiver disponível.
4. Bloquear force pushes e eliminação da `main`; impedir bypass de administradores se disponível e compatível com a manutenção individual.
5. Confirmar pela interface que o merge fica bloqueado se `verify` estiver pendente ou falhar.

As opções exatas dependem do plano e das permissões do GitHub. **Não declarar o gate implementado apenas por existir este documento ou um PR.** Não contratar serviços pagos.

## Procedimento para cada atualização

1. Criar branch e PR; Previews devem continuar privados.
2. Rever alterações, conteúdo, licenças, dados locais e direitos de terceiros; não incluir PDF oficial, segredos, backups ou dados pessoais.
3. Exigir `Quality / verify` verde **no commit que será integrado**: typecheck, lint, formatação, testes unitários, build, verificador de release e E2E.
4. Confirmar proteção real de `main` e autorização do responsável. Só então fazer merge; a Vercel criará Production automaticamente.
5. Verificar SHA do deployment, estado `READY` e acesso anónimo à URL pública: HTML, JS, CSS, CSP, 404, PT-PT/EN e fluxo de exame com dados sintéticos.
6. Registar resultados e plano de rollback; não apagar LocalStorage nem assets históricos.

## Limites e testes pendentes

- O ensaio local isolado **A → B** da 10G preservou sessão, deadline, respostas, ordem, índice, histórico e resultados. Não publicou versões. A disponibilidade remota do JS de A falha: `/assets/index-CTbPgljy.js` devolve 404 no domínio atual; JS de B, CSS e oito arquivos históricos devolvem 200. A correção proposta está na PR #6/issue #5. Não declarar retenção ou rollback PASS apenas porque os dados da sessão sobrevivem.
- Alterações de `src/storage`, do esquema `testlearn.v1` ou do conteúdo/revisões académicas requerem ensaio A → B antes da promoção.
- A aprovação académica humana das 90 perguntas, tradução e calibração ainda estão pendentes. Não são perguntas oficiais ISTQB/PSTQB.
- Privacidade, bases legais, retenção de logs Vercel, direitos de conteúdo e obrigações jurídicas precisam de revisão do responsável.
- Safari/iPhone físico, leitores de ecrã e zoom real não foram integralmente auditados.
- `noindex` continua ativo intencionalmente durante a Beta.
- O projeto antigo do incidente permanece isolado e não deve ser reativado.

Consultar também [rollback-plan.md](rollback-plan.md) e [privacy-and-data-inventory.md](privacy-and-data-inventory.md).

## Atualização operacional — 31 de outubro de 2026

A proteção da `main` foi ativada, com Pull Request obrigatório e check `verify` aprovado antes de integrar. O teste remoto A→B (ver #3) confirmou, por relato do utilizador, a continuidade da sessão sintética após recarregar; os oito chunks históricos responderam 200, mas o JavaScript principal antigo respondeu 404 no domínio público (P1 #5). A correção proposta na [Fase 10I](phase10i-retained-assets.md) preserva bundles anteriores no build e verifica as referências da Production antes de publicar; enquanto não for integrada e validada, é apenas um candidato, não uma correção certificada.

## Gate de continuidade e programa 10G–10L

A auditoria 10G foi efetuada, mas a fase continua **BLOCKED** enquanto os critérios de release não forem satisfeitos. A [revisão de continuidade/PR #6](phase10g-continuity-gate.md) distingue produção, commit local não publicado, candidata e evidências novas. O [plano mestre e checklist](../superpowers/plans/2026-10-31-testlearn-10g-10l.md) define dependências e preparação local permitida. Estes documentos não autorizam merge, push, deploy ou alterações remotas, nem aprovam academicamente o banco.
