# Recuperação dos quatro E2E do aviso pedagógico

Data: 08-11-2026. **Estado: BLOCKED — três E2E continuam a rejeitar um defeito de reflow preexistente.** A Fase 10I permanece apenas planeada. Não houve publicação ou piloto humano.

## Preflight e preservação

Branch `develop`, HEAD `3fd0a85d95ecb79539515833ee3cbe7869c58049`, revisão `.10`. Inventariados 448 ficheiros do workspace e 65 ficheiros de evidências anteriores, incluindo traces. Todos os anteriores foram preservados, exceto a correção autorizada do novo teste `tests/e2e/pedagogical-review-notice.spec.ts`; uma cópia exata anterior ficou guardada no diretório novo de evidências.

Evidências desta execução: `C:/TestLearn/tmp/pedagogical-e2e-recovery-20261108/`. Cada execução tem comando, horários UTC, exit code e stdout/stderr completos em pares JSON/TXT. Os FAIL anteriores não foram substituídos ou reclassificados como PASS.

## Causa das quatro falhas

### Chromium, Firefox e WebKit — defeito real preexistente

Os três browsers reproduzem 352 px de `scrollWidth` para 320 px de `clientWidth`, com fonte raiz a 200%. O mesmo resultado ocorre no build isolado com App/CSS do HEAD sem aviso e depois de remover apenas o nó do aviso na página atual.

O fieldset de opções mantém mínimo intrínseco `min-content`, com aproximadamente 300,3 px de largura numa área útil de 215,6 px. As etiquetas acompanham essa largura. A linha flex de navegação sem wrap também requer aproximadamente 292,4 px; os seus controlos ultrapassam a área disponível. O aviso ocupa a largura útil e não causou a diferença.

O [registo separado do defeito](preexisting-question-reflow-2026-11-08.md) contém medições, impacto, referência, recomendação e limites das sondas adicionais. `diagnosis.json` contém bounding boxes e estilos completos; foram capturadas imagens dos três browsers com e sem aviso.

Não foi alterado CSS para corrigir este defeito preexistente: a autorização exige documentá-lo separadamente. Não foi usado clipping, redução de fonte, tolerância maior, skip ou remoção da asserção. Portanto, os três E2E permanecem corretamente FAIL.

### Mobile — problema confirmado de seletor

O trace anterior e a reprodução nova mostram uma região `Explanation` com `feedback-correct`, opção o1 selecionada e DOM:

```html
<strong class="feedback-status">
  <span aria-hidden="true">✓ </span>Correct answer
</strong>
```

O nome acessível ignora o ícone, mas a pesquisa textual exata do Playwright inclui o texto descendente. `getByText('Correct answer', { exact: true })` encontrou zero elementos, apesar de o feedback estar correto. A reprodução confirmou o texto `✓ Correct answer` e a pontuação 1/2, com uma questão sem resposta.

Foi corrigido somente o novo teste, identificando a região `Explanation`, exigindo classe `feedback-correct` e texto exato `✓ Correct answer` em `.feedback-status`. Não se substituiu por uma pesquisa global parcial.

Foi acrescentado `tests/e2e/pedagogical-feedback-negative.spec.ts`: seleciona o distrator o2, exige classe e texto de resposta incorreta, rejeita explicitamente classe/texto de resposta correta e verifica resultado 0/1 e resposta persistida. Os quatro projetos passaram nesse controlo negativo. Não aceita feedback incorreto para produzir PASS.

## Demonstração e regressão nova

| Verificação                                                        | Resultado desta execução                                                                                                          |
| ------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| Diagnóstico em três browsers, atual versus HEAD sem aviso          | Reproduzido o mesmo overflow; ficheiros do workspace intocados                                                                    |
| Reprodução mobile antes da correção                                | Seletor antigo: zero correspondências; feedback específico correto e score 1/2 confirmados                                        |
| Quatro testes originalmente falhados, após correção                | 1 PASS mobile; 3 FAIL desktop na mesma asserção de reflow                                                                         |
| Todos os E2E relevantes, com quatro controlos negativos adicionais | 37 PASS / 3 FAIL, quatro projetos, zero skips                                                                                     |
| TypeScript                                                         | PASS, exit 0                                                                                                                      |
| Unitários e integração completos                                   | 35 ficheiros, 282/282 PASS, zero skips; execução sequencial com um worker                                                         |
| ESLint                                                             | PASS, exit 0                                                                                                                      |
| TypeScript de produção e build Vite                                | PASS, exit 0                                                                                                                      |
| Guard de release                                                   | PASS; manifesto e nove históricos lazy presentes                                                                                  |
| Guard de assets retidos                                            | PASS local; dois assets, incluindo index-CTbPgljy.js                                                                              |
| Guard de isolamento experimental                                   | PASS; dez itens piloto excluídos do build                                                                                         |
| Regressões Node dos guards                                         | 91/91 PASS, zero skips; inclui build com .vercelignore aplicado                                                                   |
| Integridade independente final                                     | 90 objetos completos iguais à referência autenticada; 364 alternativas, 64 LO, nove históricos íntegros; 90 humanApproval PENDING |

Os comandos E2E foram os seguintes, com diretórios de saída novos para preservar os anteriores:

```text
node node_modules/@playwright/test/cli.js test tests/e2e/pedagogical-review-notice.spec.ts --workers=1 --reporter=list --output=C:/TestLearn/tmp/pedagogical-e2e-recovery-20261108/four-e2e-results
node node_modules/@playwright/test/cli.js test tests/e2e/pedagogical-review-notice.spec.ts tests/e2e/pedagogical-feedback-negative.spec.ts tests/e2e/academic-batch2.spec.ts --workers=1 --reporter=list --output=C:/TestLearn/tmp/pedagogical-e2e-recovery-20261108/all-relevant-results
node node_modules/vitest/vitest.mjs run --maxWorkers=1 --no-file-parallelism
```

Os 32 E2E existentes do Lote 2 passaram, incluindo pontuação/persistência de tl-038 nos quatro projetos. O aviso continua exclusivo de tl-038; os testes de integração abrangem as outras 89 questões em PT, EN e modo bilingue. Os checks do aviso, teclado e axe são executados antes da asserção de overflow; isso não torna o cenário composto aprovado nem substitui testes manuais com leitor de ecrã.

## Guard académico legado — rejeição observada, não contornada

Foi executado `node scripts/check-academic-deliverables.mjs --phase10h-batch2`. Resultado: **exit 1**, na linha 471, com `Runtime/history/test/config change outside the explicit task scope`.

A allowlist histórica não contempla estes dez ficheiros da apresentação e respetivos testes:

- `src/App.tsx`
- `src/styles.css`
- `src/learning/PedagogicalReviewNotice.tsx`
- `src/learning/pedagogical-review-notices.ts`
- `tests/e2e/pedagogical-feedback-negative.spec.ts`
- `tests/e2e/pedagogical-review-notice.spec.ts`
- `tests/fixtures/pedagogical-notice-integrity.json`
- `tests/integration/pedagogical-review-notice.test.tsx`
- `tests/integration/pedagogical-review-scope.test.tsx`
- `tests/unit/pedagogical-notice-integrity.test.ts`

Este contrato é dos lotes antigos. A autorização atual não foi incorporada artificialmente no guard. Não foi removida ou enfraquecida qualquer asserção. A comparação independente do banco com a referência autenticada está em `integrity-final.json`; não se apresenta essa comparação como PASS do guard legado. A compatibilização formal do gate com este novo âmbito exige decisão separada.

## Formatação, diff e limites

| Verificação final                            | Resultado                                                                         |
| -------------------------------------------- | --------------------------------------------------------------------------------- |
| `prettier --check .`                         | **FAIL, exit 1:** 45 documentos anteriores com diferenças de estilo               |
| Verificação dos 45 avisos contra o preflight | 45/45 já presentes e byte-idênticos; nenhum ficheiro novo/alterado desta execução |
| Prettier nos quatro ficheiros desta execução | PASS, exit 0                                                                      |
| `git diff --check`                           | PASS, exit 0                                                                      |

As execuções finais são registadas nos logs `format-*` e `diff-check`; a lista completa dos 45 documentos está em `preexisting-format-findings.json`. Inclui evidências académicas congeladas e os dois relatórios anteriores de interrupção. Não foram reformatados ou acrescentados a ignore-lists para obter PASS. O gate global de formato continua a falhar; o PASS restrito aos ficheiros desta execução não o substitui.

O build manteve avisos de anotações PURE do Zod e chunk principal superior a 500 kB. Os guards locais não comprovam retenção/cache no domínio público nem resolvem o P1 de produção referido pelo proprietário. Não houve consulta nova à produção nesta tarefa.

As duas sondas auxiliares de CSS que falharam permanecem em logs próprios e não fundamentam uma declaração de GREEN. A comparação original entre as duas versões foi concluída antes dessas sondas; não depende delas.

## Próxima decisão necessária

Autorizar separadamente a correção de reflow preexistente das alternativas e navegação, com TDD nos três browsers e regressão PT/EN. Manter a asserção de 320 px/texto a 200% e todos os controlos de pontuação. Até essa decisão, os três FAIL devem permanecer visíveis.

Não houve alteração do banco, gabaritos, scoring, persistência, arquivos históricos, versões ou aprovações. A revisão humana independente continua pendente, tl-038 mantém o bloqueio académico e a Fase 10I permanece apenas planeada.
