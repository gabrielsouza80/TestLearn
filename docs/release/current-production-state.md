# TestLearn — estado de Production e releases

> Estado observado em 30 de outubro de 2026. Este documento atualiza o estado operativo dos planos históricos anteriores à publicação. Não constitui certificação jurídica ou académica.

## Serviço público

- Site: https://testlearn-ctfl.vercel.app/
- Código: https://github.com/gabrielsouza80/TestLearn
- Alojamento: Vercel, projeto `testlearn`, plano Hobby, independente de KAVTRIS.
- A Production tem domínio público; os Previews e URLs de deployment individuais permanecem protegidos por autenticação Vercel.
- Baseline público verificado: commit `48624cba2929b1a31aa9b82ec4d38d2d322d4c70`.
- Pipeline do baseline: **226 testes unitários e 364 testes E2E aprovados**, além de typecheck, lint, Prettier, build e guard de release.
- Banco académico: 90 questões, revisão `2026-10-27.9`; não é alterado pela 0.1.1.
- Responsável público: Gabriel Souza. Contacto: testlearn808005@gmail.com.

`READY` na Vercel valida o build, não a qualidade do conteúdo nem a execução do GitHub Actions. Uma página acessível na sessão do proprietário não demonstra, isoladamente, acesso anónimo.

## Bloqueio atual de release

Em 30 de outubro, a branch `main` estava **sem proteção**. A Vercel constrói Production assim que chegam commits à `main`, mesmo que a workflow `Quality` ainda não tenha terminado. **A workflow, sozinha, não é um gate de publicação.**

Não fazer merge do PR 0.1.1 nem push direto em `main` até a proteção ser configurada e verificada. O conector GitHub atual não tem permissão para configurar essas regras; o proprietário precisa de atuar na interface.

## Configuração obrigatória — GitHub

Abrir https://github.com/gabrielsouza80/TestLearn/settings/branches e aplicar uma regra à branch exata `main`:

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

- Falta demonstrar remotamente a continuidade **A → B** de uma sessão sintética com novo deployment, incluindo URLs de chunks anteriores e rollback compatível. Os E2E locais não provam retenção remota.
- Alterações de `src/storage`, do esquema `testlearn.v1` ou do conteúdo/revisões académicas requerem ensaio A → B antes da promoção.
- A aprovação académica humana das 90 perguntas, tradução e calibração ainda estão pendentes. Não são perguntas oficiais ISTQB/PSTQB.
- Privacidade, bases legais, retenção de logs Vercel, direitos de conteúdo e obrigações jurídicas precisam de revisão do responsável.
- Safari/iPhone físico, leitores de ecrã e zoom real não foram integralmente auditados.
- `noindex` continua ativo intencionalmente durante a Beta.
- O projeto antigo do incidente permanece isolado e não deve ser reativado.

Consultar também [rollback-plan.md](rollback-plan.md) e [privacy-and-data-inventory.md](privacy-and-data-inventory.md).

## Atualização operacional — 31 de outubro de 2026

A proteção da `main` foi ativada, com Pull Request obrigatório e check `verify` aprovado antes de integrar. O teste remoto A→B (ver #3) confirmou, por relato do utilizador, a continuidade da sessão sintética após recarregar; os oito chunks históricos responderam 200, mas o JavaScript principal antigo respondeu 404 no domínio público (P1 #5). A correção proposta na [Fase 10I](phase10i-retained-assets.md) preserva bundles anteriores no build e verifica as referências da Production antes de publicar; enquanto não for integrada e validada, é apenas um candidato, não uma correção certificada.
