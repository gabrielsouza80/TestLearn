# Recuperação controlada do aviso de tl-038

Data: 08-11-2026. **Estado final: BLOCKED por novas falhas E2E.** A Fase 10I continua apenas planeada. Não houve commit, push, merge, deploy ou nova aprovação académica.

Este registo acrescenta evidência; não substitui o [FAIL anterior](pedagogical-notice-verification-2026-11-08.md), o respetivo `STOP-FAILURE.json` ou os logs históricos. Evidências desta retoma: `C:/TestLearn/tmp/pedagogical-notice-recovery-20261108/`.

## Continuidade

Preflight: `develop`, HEAD `3fd0a85d95ecb79539515833ee3cbe7869c58049`. Inventariados 447 ficheiros existentes e os hashes dos 18 ficheiros da evidência anterior. Guardada cópia exata do teste antes da correção. Nenhum ficheiro académico, objeto do banco, histórico, código de produção ou guard existente foi modificado nesta retoma.

## 1. TypeScript — causa e correção demonstradas

O comando `node node_modules/typescript/bin/tsc --noEmit` reproduziu os mesmos 16 diagnósticos TS2769, com saída byte-idêntica à histórica, antes da correção. O mapa individual está em `typescript-diagnostic-map.json`.

Versões instaladas consultadas diretamente: `@testing-library/react` 16.3.3, `@testing-library/dom` 10.4.2, TypeScript 5.9.3. Em `types/queries.d.ts`, `ByRoleOptions` permite `name`, mas não `exact`. Em `dist/queries/role.js`, o filtro do nome chama `matches`; em `dist/matches.js`, uma string é comparada por igualdade exata. A opção extra era ignorada em runtime, explicando por que Vitest passava enquanto TypeScript rejeitava o teste. Não é necessário transformar nomes em regex ou reduzir a correspondência.

Todos os diagnósticos tinham a mesma causa, nas seguintes chamadas do novo ficheiro `tests/integration/pedagogical-review-notice.test.tsx`:

| Linha original | Consulta | Nome acessível preservado |
| --- | --- | --- |
| 40 | getByRole, note | título PT/EN |
| 56 | getByRole, button | Check answer / Confirmar resposta |
| 87 | queryByRole, button | Confirmar resposta |
| 93 | getByRole, radio | texto integral de o1 |
| 97 | getByRole, button | Seguinte |
| 101 | getByRole, button | Anterior |
| 105 | queryByRole, region | Explicação |
| 136 | getByRole, radio | texto integral de o1 |
| 140 | getByRole, button | Confirmar resposta |
| 144 | getByRole, region | Explicação |
| 147 | getByRole, button | Seguinte |
| 150 | getByRole, heading | enunciado integral de tl-078 |
| 155 | getByRole, button | Anterior |
| 160 | getByRole, button | Terminar sessão |
| 163 | getByRole, button | Confirmar e terminar |
| 166 | getByRole, heading | 1 / 2 |

Foram removidas apenas essas 16 propriedades incompatíveis. Mantidos nomes, roles e asserções originais. Acrescentadas duas verificações negativas por idioma que rejeitam título parcial e título com sufixo. As opções `exact` válidas em `getByText`, `getByLabelText` e no Playwright foram preservadas. Não foi aplicada substituição global.

Resultados novos: TypeScript exit 0; testes direcionados 21/21, exit 0. A formatação posterior do único teste alterado teve exit 0.

## 2. Timeout das 1.000 sementes — diagnóstico e limites

Teste existente, número de sementes, asserções, algoritmo e timeout de 15.000 ms permaneceram intactos. Comparados os hashes do teste, blueprint, auditoria, engine e banco com o preflight; não houve mudança. Esse teste não importa a apresentação do aviso.

Comando isolado, repetido duas vezes sem outras verificações lançadas por esta execução:

```text
node node_modules/vitest/vitest.mjs run tests/unit/blueprint.test.ts --maxWorkers=1 --no-file-parallelism -t "generates compliant examinations for 1,000 deterministic seeds"
```

| Condição | Tempo do teste | Tempo total do processo | Resultado |
| --- | --- | --- | --- |
| Histórico, suíte e outras ferramentas concorrentes | cerca de 16.089 ms | cerca de 21,79 s | FAIL, timeout de 15 s |
| Isolado 1 | 7,94 s | 11,931 s | 1 PASS; 15 skips por filtro explícito |
| Isolado 2 | 7,93 s | 11,635 s | 1 PASS; 15 skips por filtro explícito |
| Suíte completa sequencial | duração individual não emitida pelo reporter | 94,286 s | 282/282 PASS; zero skips |

Na repetição completa foi usado `vitest run --maxWorkers=1 --no-file-parallelism`, sem editar configuração ou timeout. O processamento levou 93,45 s segundo Vitest, incluindo ambiente e setup. Não se apresentou um filtro parcial como se fosse a suíte completa.

Condições medidas: Windows, 16 processadores lógicos; CPU global ocupada em média 19,96% e 18,56% nas duas execuções isoladas, 20,21% na suíte completa. RAM física disponível no início: aproximadamente 1,63 GiB, 1,81 GiB e 1,86 GiB, respetivamente. Havia oito processos Node externos preexistentes; não foram terminados ou modificados. O ambiente não era um host vazio. Os comandos de teste desta execução foram sequenciais.

**Conclusão:** timeout histórico não reproduzido nas condições controladas; não há regressão funcional demonstrada. A diferença é compatível com sensibilidade à carga/concorrência, mas não prova uma causa exclusiva: o FAIL original não registou CPU/RAM e não se fez uma reprodução artificial de pressão. A intermitência permanece risco para execução paralela futura; o FAIL não foi apagado.

### Limitação adicional das métricas

O auxiliar novo registou CPU acumulada da árvore de processos, baseada em contadores de duração de vida e relações PID/parent, sem diferença entre amostras nem validação de data de criação. Esse campo não deve ser usado como CPU do intervalo. No build apareceu um valor impossível para o intervalo medido; o problema está documentado em `resource-measurement-limitation.json`, sem alterar os logs. Reutilização de PID é um mecanismo possível, não provado retroativamente. Os contadores globais do host e a duração de parede são medições separadas; memória da árvore é apenas uma estimativa. Não se usa esse campo CPU para provar contenção ou declarar PASS.

## 3. Regressão efetivamente executada

Todos os comandos e horários UTC encontram-se nos pares `.json`/`.txt` do diretório de evidências.

| Verificação | Resultado novo |
| --- | --- |
| TypeScript completo | PASS, exit 0 |
| Vitest direcionado | 21/21 PASS, exit 0 |
| Duas repetições isoladas de 1.000 sementes | PASS, sem reduzir sementes ou aumentar timeout |
| Vitest completo sequencial | 35 ficheiros, 282 testes PASS, zero skips |
| ESLint completo | PASS, exit 0 |
| TypeScript de produção | PASS, exit 0 |
| Vite build de produção | PASS, exit 0 |
| Guard de release/manifesto | PASS; nove chunks históricos lazy; sem source maps ou assets privados |
| Guard de assets retidos | PASS local, dois assets, incluindo index-CTbPgljy.js |
| Guard de isolamento experimental | PASS; dez itens piloto excluídos do build; 17 ficheiros inspecionados |
| Playwright relevante, quatro projetos | **FAIL: 32 PASS e quatro FAIL**, exit 1 |

O build manteve avisos de anotações PURE do Zod e chunk principal acima de 500 kB; não foram suprimidos nem resolvidos nesta tarefa. A retenção local não prova disponibilidade no domínio público e não resolve o P1 de produção referido pelo proprietário.

## 4. Novos bloqueios E2E e paragem

Executados os oito testes existentes do Lote 2 e o novo teste do aviso, em Chromium, Firefox, WebKit e mobile, com um worker. Os 32 casos existentes passaram, incluindo o fluxo bilingue e a pontuação/persistência de tl-038. O novo teste falhou nos quatro projetos:

1. **Chromium, Firefox e WebKit:** a linha 87 rejeitou `document.documentElement.scrollWidth <= window.innerWidth` a 320 px e texto a 200%. A asserção anterior da largura interna do aviso passou. Isso não demonstra que o seu ancestral ou a página caibam no viewport. Origem do overflow e eventual preexistência/regressão **não identificadas**. Não se retirou a asserção, não se ocultou overflow e não se modificou CSS.
2. **Mobile:** a linha 104 não encontrou `getByText('Correct answer', { exact: true })`. O snapshot mostra a região Explanation e a opção correta selecionada. O DOM preservado no trace contém `strong.feedback-status`, um span `aria-hidden` com `✓ ` e o texto `Correct answer`. A igualdade textual do Playwright inclui o texto descendente do ícone, pelo que esta consulta não corresponde a todo o texto visível do elemento. A evidência indica uma fragilidade do seletor, não um erro demonstrado de pontuação. Nenhum seletor, asserção ou expectativa foi alterado para obter PASS.

Os testes chegaram às verificações PT/EN, foco e axe antes das falhas, mas o cenário composto não terminou com sucesso. Não se declara o E2E do aviso ou a responsividade global aprovados. Traces, snapshots e stdout completo foram preservados em `playwright-results/` e `e2e-relevant.txt`.

Por existir uma nova falha crítica de layout sem causa identificada, a sequência foi interrompida. Não foram executados depois disso: guard académico legado, regressões Node adicionais dos guards, paridade Vercel, verificação final global de formato/diff ou novos testes de browser. A cópia local de evidências não é uma publicação.

O guard académico legado tem contrato explícito dos lotes antigos: `check-academic-deliverables.mjs`, allowlists `batchPaths`/`prototypePaths` e asserção de `protectedChanges` (linhas 445–478). Não permite estes novos ficheiros de apresentação/teste. Nesta retoma a rejeição não foi executada; a limitação é constatada no código, não reportada como FAIL observado. O guard não foi alterado ou contornado. A proteção dos 90 objetos e nove históricos foi executada pelos testes de integridade com referência autenticada fixa, não por essa allowlist de âmbito antigo.

## Estado e próximo passo

**BLOCKED.** TypeScript resolvido e timeout não reproduzido em duas repetições isoladas mais suíte completa sequencial. A regressão E2E revelou bloqueios novos. Preservar asserções e evidências; pedir orientação para uma investigação delimitada do overflow com medições de elementos/ancestrais e comparação antes/depois, e para corrigir o seletor do novo teste mediante diagnóstico já registado. Não atribuir a causa ao aviso ou a um defeito antigo sem comparação.

Banco, gabaritos, nove históricos, scoring, persistência e aprovações académicas permanecem inalterados. A Fase 10H continua aberta e a Fase 10I apenas planeada, sem participantes ou recolha de dados. Nenhum resultado técnico constitui `HUMAN_APPROVED` ou autorização de produção.
