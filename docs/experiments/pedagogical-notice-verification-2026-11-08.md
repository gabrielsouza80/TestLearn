# Aviso de tl-038 — implementação interrompida na verificação

Data: 08-11-2026. Estado: **BLOCKED — IMPLEMENTADO LOCALMENTE, VALIDAÇÃO INCOMPLETA**. Nenhuma publicação, alteração de aprovação ou execução humana do piloto.

## Preflight e alteração

Branch `develop`, HEAD `3fd0a85d95ecb79539515833ee3cbe7869c58049`, revisão `.10`, 90 questões, 364 alternativas e 64 objetivos. Inventariados 438 ficheiros anteriores, incluindo evidências não commitadas. O ZIP de reconciliação foi autenticado pelo SHA-256 `ed772087d8fbbb87a989676095a2756436d1a1f60dc08bb96b40edcf13691ff7`.

O aviso foi acrescentado em `src/App.tsx`, na resolução em prática e simulado, através de `src/learning/PedagogicalReviewNotice.tsx` e da configuração separada `src/learning/pedagogical-review-notices.ts`. Não é aplicado à revisão de resultados nem ao protótipo experimental. A classe nova em `src/styles.css` reutiliza `.notice`, cores e foco existentes. Não altera objetos do banco ou pontuação.

O título e a descrição solicitados existem em PT/EN e no modo bilingue, reutilizando `Text`. O aviso é um `note` com nome e descrição acessíveis e foco por teclado; não tem botão ou resposta oculta. Apenas `tl-038` recebe sinalização. Não constitui aprovação académica, desbloqueio K3 ou correção do risco P1 de produção.

## Execuções novas

Logs completos, comandos, horários UTC e exit codes estão em `C:/TestLearn/tmp/pedagogical-notice-20261108/`, nos pares `.json`/`.txt` correspondentes.

| Execução | Comando efetivo | Resultado |
| --- | --- | --- |
| RED inicial | `node node_modules/vitest/vitest.mjs run tests/integration/pedagogical-review-notice.test.tsx` | Exit 1; dois casos falharam pela ausência do aviso PT/EN, antes da implementação |
| GREEN inicial | Mesmo comando, depois da implementação | Exit 0; 2/2 |
| Direcionados | `node node_modules/vitest/vitest.mjs run tests/unit/pedagogical-notice-integrity.test.ts tests/integration/pedagogical-review-notice.test.tsx tests/integration/pedagogical-review-scope.test.tsx` | Exit 0; 21/21, três ficheiros |
| Formatação inicial | `node node_modules/prettier/bin/prettier.cjs --write` com lista explícita dos dez ficheiros desta alteração naquele momento | Exit 0; não formatou documentação histórica |
| TypeScript | `node node_modules/typescript/bin/tsc --noEmit` | **Exit 2; FAIL**, 16 diagnósticos TS2769 nos testes novos |
| ESLint | `node node_modules/eslint/bin/eslint.js .` | Exit 0; PASS |
| Vitest completo | `node node_modules/vitest/vitest.mjs run` | **Exit 1; FAIL**, 281 aprovados e um timeout; 34 ficheiros aprovados e um com falha |

## Bloqueios e causa observada

1. **TypeScript:** o novo ficheiro `tests/integration/pedagogical-review-notice.test.tsx` usa `exact: true` em consultas `getByRole` da Testing Library. `ByRoleOptions` não admite essa propriedade. A execução em runtime passou, mas a compilação dos testes falha. É erro introduzido nesta tarefa. Não foi corrigido depois do gate crítico, respeitando a instrução de parar. Uma correção futura deve manter a correspondência exata pelo nome, usando a API tipada correta, sem enfraquecer a asserção. As opções do Playwright são de outra API e não devem ser alteradas por substituição cega.
2. **Vitest completo:** `tests/unit/blueprint.test.ts`, caso de 1.000 sementes determinísticas, ultrapassou o timeout de 15.000 ms (execução observada de cerca de 16.089 ms). O erro observado é timeout, não um gabarito ou estrutura inválida. TypeScript, lint e Vitest estavam a executar em paralelo; contenção de recursos é uma hipótese, ainda não causa demonstrada. O teste existente, timeout, configuração e expectativas ficaram intactos. O diagnóstico seguinte deve começar por execução isolada/sequencial, sem aumentar limites para conseguir PASS.

Também ocorreram problemas de invocação, sem execução dos testes correspondentes: um comando PowerShell de redirecionamento teve erro de aspas; o auxiliar Python não encontrou `npm` como executável Windows em três tentativas. As execuções válidas usaram diretamente os CLIs Node já instalados, equivalentes aos scripts de `package.json`. Durante exploração foram tentados dois caminhos documentais/configuração inexistentes; foram localizados os ficheiros reais, sem os criar ou substituir.

## Cobertura que passou e limites

Os 21 testes direcionados verificam: textos PT/EN e modo bilingue; ausência nas outras 89 questões e num ID desconhecido; nome/descrição e foco; ausência de feedback antecipado; seleção e fluxo de prática; prazo de simulado; tempos de resposta conhecidos; navegação e persistência da seleção; resultado 1/2 com uma questão sem resposta; 90 objetos completos e nove arquivos iguais à referência autenticada; rejeição de alterações sintéticas de texto, chave e falsa aprovação. A referência de hashes foi extraída do ZIP autenticado, não do candidato.

Testes de browser foram escritos em `tests/e2e/pedagogical-review-notice.spec.ts`, incluindo axe no aviso, teclado, 320/1280 px, texto a 200%, persistência e pontuação. **Não foram executados.** Não se declara acessibilidade real com leitor de ecrã, responsividade ou browser coverage aprovada apenas com jsdom.

Build, Playwright, guards de release/retenção/isolamento e verificação final de formato/diff **não executados depois da interrupção**. O guard académico legado tem allowlist restrita aos lotes antigos e rejeitaria a nova apresentação autorizada; não foi alterado nem apresentado como aprovação desta tarefa. A proteção do banco e dos históricos passou nos testes direcionados e na suíte completa, mas não substitui os gates restantes.

## Retoma proposta — não executada

Pedir orientação para corrigir exclusivamente a API tipada dos novos testes e diagnosticar o timeout isoladamente, preservando os logs e sem alterar o teste de blueprint. Se autorizado e os bloqueios forem resolvidos, reexecutar TypeScript, os testes relevantes e a suíte completa com concorrência proporcional aos recursos, depois build, guards, Playwright e verificação final de integridade/diff. Qualquer nova falha crítica exige nova paragem.

O [plano do ciclo 1](phase10i-controlled-cycle1-2026-11-08.md) é somente preparação. O adiamento da revisão humana é risco aceite para essa preparação; não é `HUMAN_APPROVED`, não resolve `BLOCKED_HUMAN_DECISION` de `tl-038` e não autoriza produção. `tl-078` continua sob atenção interna à calibração, sem aviso público adicional. A Fase 10H permanece aberta.
