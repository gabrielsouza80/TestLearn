# Fase 10G — Operação da beta pública (v0.1.1)

> Estado operacional em 30-10-2026. Este documento contém verificações reais e passos **ainda por executar**. Não significa que todas as proteções já estejam ativas.

## Estado e evidência

- Projeto TestLearn, independente da KAVTRIS. Repositório `gabrielsouza80/TestLearn`.
- Production: <https://testlearn-ctfl.vercel.app/>; Vercel projeto `testlearn`, ID `prj_lE5DcKsY473SnniV0CXXMC1aBx3w`.
- Baseline de Production `48624cba2929b1a31aa9b82ec4d38d2d322d4c70`, deployment `dpl_5nPhrkeHUuyBXXLnbyxqZgFTHkSE` em estado `READY`.
- O responsável confirmou acesso ao domínio sem login numa janela anónima. A execução `Quality/verify` do baseline passou: 226 testes unitários e 364 E2E.
- A Vercel usa `prod_deployment_urls_and_all_previews`: o domínio Production é público; URLs individuais de deployment e Previews requerem autenticação.
- Responsável público Gabriel Souza; contacto `testlearn808005@gmail.com`. Beta independente, não afiliada nem acreditada pelo ISTQB/PSTQB.
- Revisão académica humana e calibração continuam pendentes. `noindex` e bloqueio em `robots.txt` são intencionais durante a beta.

## P0 — proteger o caminho para Production

Foi confirmado que a branch `main` não tinha proteção (`protected=false`) nem checks exigidos. Vercel cria e promove um Production build automaticamente após um push para `main`; a workflow de QA que corre em paralelo **não bloqueia** essa promoção.

**Não integrar o Pull Request v0.1.1 enquanto a proteção abaixo não estiver ativada e verificada.** A integração GitHub utilizada neste trabalho não tem permissão para gerir a proteção da branch; este passo é do proprietário do repositório.

1. Abrir <https://github.com/gabrielsouza80/TestLearn/settings/branches> e criar uma regra de proteção com o padrão exato `main`.
2. Exigir **Pull Request antes do merge** e **status checks aprovados antes do merge**. Selecionar o job GitHub Actions **`verify`** da workflow `Quality` (depois de o PR gerar um check).
3. Recomendar branch atualizada antes do merge, proibir force-push e eliminação, e ativar a prevenção de bypass, se disponível no plano e configuração do repositório.
4. Se apenas uma pessoa mantém o repositório, **não exigir aprovação de outro revisor inexistente**: o autor não pode aprovar o próprio PR. Manter PR + testes obrigatórios.
5. Verificar na página de Branches/Rules que `main` está protegida e que um PR com checks pendentes não pode ser integrado. Confirmar novamente `protected=true` pela API, quando acessível.
6. Não alterar a configuração de deploy de outros projetos, nem desativar a proteção dos Previews da Vercel.

## CI da v0.1.1

- Preservar o job **`verify`** e os testes existentes: TypeScript, ESLint, Prettier, Vitest, Vite/build, guard de artefactos e Playwright em quatro perfis.
- Executar CI em Pull Requests para `main` e pushes em `main`, evitando execuções duplicadas de `push` em branches de PR.
- A proteção da branch deve exigir `verify`; a workflow isolada é apenas diagnóstico, não bloqueio de merge.
- Avaliar depois Deployment Checks da Vercel caso estejam disponíveis no plano gratuito, sem contratar add-ons.

## Procedimento de atualização

1. Criar `feature/*` ou `release/*`, abrir PR, identificar source SHA e alterações aos dados.
2. Aguardar `Quality/verify=success` e inspecionar o Preview **protegido**.
3. Confirmar ausência de regressões em `testlearn.v1`, revisão atual e arquivos históricos; não publicar perguntas ou traduções sem rever direitos e qualidade.
4. Fazer merge somente com regras de proteção efetivas e com autorização do responsável. A Vercel deverá iniciar um novo Production build.
5. Confirmar no domínio oficial: documento, idioma PT/EN, exame sintético, resultados, armazenamento, exportação JSON, 404, headers e contacto.
6. Testar continuidade **A→B**, ainda pendente: com sessão sintética iniciada em A, publicar B e verificar retoma, prazo, respostas, histórico e disponibilidade de chunks antigos.
7. Documentar commit/deployment efetivo e procedimento de rollback. Nunca limpar LocalStorage dos estudantes como parte de rollback.

## Pendências que não se devem declarar concluídas

- [ ] Branch `main` protegida e check `verify` obrigatório.
- [ ] PR de v0.1.1 aprovado pela CI, revisto e integrado.
- [ ] Smoke remoto após novo merge e continuidade A→B.
- [ ] Retenção remota de assets antigos e rollback ensaiados.
- [ ] Revisão dos avisos de privacidade, direitos das questões e validação académica humana.

Nota: documentos mais antigos de pré-publicação permanecem no repositório como **evidência histórica**, não como instruções operacionais atualizadas.
