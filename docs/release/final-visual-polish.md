# TestLearn — acabamento visual e educativo

30 de outubro de 2026. Base: `b228c29c58689676f7cfe8dc7662cd9680f07bb3`.
Revisão académica mantida: `2026-10-27.9`.

## Âmbito e ponto recuperado

Foram recuperadas as oito alterações de apresentação, os testes parciais e as evidências em `tmp/visual-polish/`, sem recriar o banco ou descartar trabalho. A implementação e a avaliação visual seguiram a skill frontend-design; a avaliação delegada obteve PASS, mas utilizou o mesmo fornecedor de modelos. Não equivale a revisão humana ou a avaliação independente por outro fornecedor.

O azul-marinho e o verde mantêm a identidade. Verde/vermelho/cinzento distinguem respostas corretas/incorretas/em branco, sempre acompanhados de texto e símbolos. Roxo identifica informação educativa; âmbar destaca avisos e submissão antecipada. Não foram acrescentadas dependências, imagens, animações, rastreio ou serviços.

## Comportamento

- Revisão: uma pergunta apresentada de cada vez, botões numerados com estado e `aria-current`, filtros com contagens e numeração original. O filtro preserva o foco e a pergunta elegível; caso contrário, seleciona a primeira elegível. Anterior/seguinte percorrem o filtro atual; a seleção por número coloca o foco no título, incluindo nova seleção da pergunta atual. Há ligação para regressar à navegação.
- Explicações: a explicação geral original aparece uma vez como «Ideia principal». Todas as respostas corretas e as respostas erradas selecionadas têm justificação visível; os outros distratores usam detalhes nativos expansíveis. Mantêm-se texto integral, tabelas, IDs, ordem gravada e letras. Respostas múltiplas continuam a exigir o conjunto exato, sem crédito parcial. A origem e as referências permanecem disponíveis em PT-PT/EN.
- Resultados: resumo compacto, contagens separadas, tempo e limiar de referência preservados. A conclusão antecipada registada tem aviso explícito; não se inventa um motivo para sessões antigas.
- Dashboard: percursos com fundos subtis distintos, duração e avisos preservados. A 1280×800, os dois botões principais ficam integralmente visíveis, conforme medições guardadas.
- Progresso: resumo inicial de sessões concluídas, perguntas respondidas e respostas corretas; contagens completas em detalhes; seis capítulos e cautela do pequeno banco do capítulo 6. Backup antes do histórico, evitando que listas longas ocultem as ferramentas. Recomendação conservadora existente inalterada.
- Escrita: estado normal discreto; libertação da edição em detalhes acessíveis. Conflitos, falhas e recuperação continuam diretamente visíveis. Web Locks, handlers, persistência imediata e esquemas não foram alterados. Backup mantém input nativo, validação e confirmação.

## Acessibilidade e avaliação visual

Nove análises axe do dashboard, prática, exame, progresso, revisão correta/incorreta/em branco, EN móvel e inglês suplementar não apresentaram violações. Refluxo sem overflow nas capturas de 375/768 px; revisão também medida a 320 px com texto a 200%. O teste completo verifica teclado, foco, letras, alternativa errada selecionada, conjuntos múltiplos e recuperação de escrita.

Contrastes efetivamente medidos no browser, sobre os fundos renderizados, em `tmp/visual-polish/performance-accessibility.json`:

| Uso                  | Cor       | Fundo     | Rácio  |
| -------------------- | --------- | --------- | ------ |
| Correta              | `#17613d` | `#edf7ef` | 6,81:1 |
| Incorreta            | `#ac2f3c` | `#fff0f1` | 5,89:1 |
| Sem resposta         | `#536370` | `#edf1f3` | 5,46:1 |
| Informação educativa | `#6845a2` | `#f3eef9` | 6,22:1 |
| Aviso                | `#82530d` | `#fff5df` | 6,07:1 |
| Contorno de foco     | `#7354b5` | `#f6f7f3` | 5,33:1 |
| Limite de controlo   | `#768b82` | `#f6f7f3` | 3,37:1 |

Não se afirma conformidade WCAG integral. Leitor de ecrã real, zoom nativo e dispositivos físicos continuam por validar; WebKit em Windows e emulação móvel não provam Safari/iPhone físicos.

## Comparação equivalente

Mesma sessão concluída de 40 perguntas, mesma ordem gravada, PT e viewport 1280×900; builds de produção anterior e atual executados sequencialmente no mesmo processo. Cinco aberturas da revisão por versão, medição até dois frames após o resultado estar visível. Não é benchmark de produção nem garantia de latência.

| Medida                                 |    Antes |  Depois |
| -------------------------------------- | -------: | ------: |
| Elementos DOM                          |     2734 |     292 |
| Perguntas simultaneamente renderizadas |       40 |       1 |
| Altura da página                       | 46704 px | 2610 px |
| Mediana local de abertura da revisão   | 129,0 ms | 83,3 ms |

Navegação observada entre perguntas: 81–90 ms, incluindo automação e dois frames. A redução de DOM e altura resulta da apresentação de uma pergunta; todas continuam acessíveis. As medições anteriores guardadas foram reproduzidas, sem comparar viewports ou sessões diferentes.

| Artefacto       |    Antes |   Depois | Diferença |
| --------------- | -------: | -------: | --------: |
| JS inicial      | 697181 B | 702001 B |   +4820 B |
| JS inicial gzip | 210969 B | 212404 B |   +1435 B |
| CSS             |  17545 B |  31083 B |  +13538 B |
| CSS gzip        |   4387 B |   6631 B |   +2244 B |

O JS inicial aumenta cerca de 0,69%; o CSS cresce com os estados semânticos e componentes. Mantêm-se os oito chunks históricos carregados a pedido, sem arquivos históricos na entrada inicial, source maps ou materiais privados. O aviso Vite de chunk superior a 500 kB permanece; não se alterou a arquitetura nem se iniciou uma otimização adicional do bundle.

Capturas locais: [dashboard anterior](../../tmp/visual-polish/before-dashboard-desktop.png), [dashboard atual](../../tmp/visual-polish/eval-dashboard-desktop.png), [revisão anterior](../../tmp/visual-polish/before-result.png), [revisão atual comparável](../../tmp/visual-polish/after-result-comparable.png), [móvel](../../tmp/visual-polish/eval-result-375.png), [320 px e texto 200%](../../tmp/visual-polish/after-review-320-text200.png). O primeiro par de capturas do dashboard tem dimensões diferentes; serve para inspeção visual, não para comparação quantitativa.

## Validação final

Validação local final concluída. Todos os comandos abaixo terminaram com exit code 0:

| Comando                                                            | Resultado efetivo                                                                |
| ------------------------------------------------------------------ | -------------------------------------------------------------------------------- |
| `npm run typecheck`                                                | PASS                                                                             |
| `npm run lint`                                                     | PASS, sem supressões                                                             |
| `npm run format:check`                                             | PASS                                                                             |
| `npm test -- --maxWorkers=1`                                       | 226/226, 25 ficheiros; 67,20 s                                                   |
| `npm run build`                                                    | PASS; aviso de chunk >500 kB mantido                                             |
| `npm run test:e2e -- --workers=1 --shard=N/4 --reporter=list,json` | N=1–4, sequencial; 364/364, 17 ficheiros, 91 por projeto                         |
| `node scripts/check-release.mjs`                                   | PASS; 14 ficheiros, oito chunks históricos, zero artefactos privados/source maps |
| `node --test scripts/check-release.test.mjs`                       | 8/8                                                                              |
| Verificação de integridade e oracle de blueprint                   | 1000/1000 seeds, 29 grupos                                                       |
| `git -c core.autocrlf=false diff --check`                          | PASS; configuração global não alterada                                           |

A matriz corresponde exatamente aos 364 IDs descobertos: Chromium, Firefox, WebKit e Chromium móvel emulado. Zero omissões, duplicados, skips, flaky ou retries nas quatro passagens finais; duração total 992543 ms (aproximadamente 16,5 min). A configuração existente de dois workers não foi editada; usou-se um worker por CLI. Backups reais descarregados/importados, 500 sessões sintéticas, persistência seguida de reload imediato, históricos, concorrência entre separadores, StrictMode, Fast Refresh e reinício do servidor passaram nos quatro projetos.

Evidências locais: `tmp/visual-polish/{final-checks,e2e-clean-summary,final-validation,integrity,callback-integrity}.json` e logs individuais. As falhas intermédias não foram apagadas: `shard-1-initial.{json,log}` e `affected.{json,log}`. A validação final usa o código corrigido nas quatro passagens completas.

O lint detetou a IIFE de renderização que impedia o analisador de reconhecer corretamente os handlers com refs; a pergunta passou a ser derivada antes do JSX, com refs apenas em efeitos/eventos e sem supressão de regras. A formatação pendente foi aplicada com Prettier.

A primeira passagem Chromium encontrou três falhas axe com a mesma causa: título `h4` sob pergunta `h2` na prática. Corrigiu-se o nível contextual (`h3` na prática, `h4` na revisão), sem desativar regras. Outra falha era do teste novo, que verificava preservação de foco sem primeiro o colocar no filtro; foi corrigida a pré-condição. Houve ainda timeout de 60 s na espera pela preparação da fixture Vite, antes de qualquer navegação; a causa transitória exata não ficou estabelecida. A repetição dos cinco casos passou (incluindo HMR/reinício, 49,2 s); o diagnóstico isolado do servidor também ficou pronto. O timeout original permanece registado e não foi mascarado com retries ou aumento do limite existente.

Integridade já verificada: deep equality das 90 perguntas/364 alternativas, 64 LO, SHA-256 dos arquivos `.1`–`.9`, 29 grupos e 1000 seeds determinísticos com quotas, diversidade, unicidade e chaves após baralhar. Todos os ficheiros de dados/domínio/referência/storage, assessment, dependências e configuração Playwright permanecem iguais à base. O código anterior ao render de App mantém igualdade textual. Não houve migração histórica.

Também se compararam as árvores sintáticas dos 49 callbacks de App, backup, capítulos e percursos: iguais à base, independentemente da nova indentação. Evidências: `tmp/visual-polish/{integrity,callback-integrity}.json`.

## Ficheiros e limites

Produção: `src/App.tsx`, `src/styles.css`, `src/learning/{AnswerReview,ChapterProgress,DashboardPaths,ObjectiveHelp,ProgressBackup,ResultReview}.tsx`.

Testes adaptados: `tests/integration/{App,educational-ux}.test.tsx`; `tests/e2e/{advanced-assessment,app,bilingual-maintenance,educational-ux,quality-maintenance,student-experience,writer-recovery}.spec.ts`. Novos: `tests/integration/final-visual-polish.test.tsx`, `tests/e2e/final-visual-polish.spec.ts`, `tests/fixtures/{review-navigation,visual-review}.ts`. As adaptações trocam contagens de artigos simultâneos por navegação e verificação de conteúdo acessível; não removem cobertura. Documentação: este relatório e `release-readiness.json`.

P0: mantêm-se os bloqueios externos já registados em `release-readiness.json` (ações do proprietário, direitos/contacto, prova do alojamento e autorização de publicação); não são novos defeitos técnicos locais. P1: nenhum novo defeito local pendente identificado nesta validação. P2: aviso do bundle, crescimento do CSS, limites de validação manual/dispositivos e o timeout transitório inicial de preparação da fixture, sem causa determinista confirmada; não voltou a ocorrer na matriz final.

Não se declara aprovação académica humana nem calibração psicométrica. PUBLICATION_AUTHORIZED = NO; PUBLIC_BETA_READY = BLOCKED. Sem commit, push, deploy, criação de projeto Vercel ou alterações KAVTRIS. O próximo passo recomendado é o laboratório Vercel protegido já planeado, mediante autorização separada.

## Entrega posterior em Git

Ap?s a valida??o acima, o propriet?rio autorizou v?rios commits na main e push para origin/main em 30 de outubro de 2026. Implementa??o: `f38695f`; testes: `e015ddb`. C?digo e testes mant?m os hashes da valida??o final; apenas esta documenta??o foi atualizada para registar a autoriza??o posterior. As declara??es anteriores de aus?ncia de commit/push referem-se ao encerramento da execu??o de valida??o. N?o foi autorizada uma publica??o ou opera??o de deployment; os bloqueios externos mant?m-se.
