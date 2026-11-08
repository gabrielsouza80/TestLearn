# Lote 13 — verificação interrompida

Execuções novas em 2026-11-07 (UTC). Identificador solicitado da pasta: 2026-11-06. Nenhum resultado histórico é apresentado como nova execução.

## Preflight

Branch develop; HEAD 3fd0a85d95ecb79539515833ee3cbe7869c58049; revisão 2026-10-27.10. ZIP do Lote 12: SHA-256 5467564b85dbacf310ab8986a3b9249efd1bb3ed994504d6dfcff70d679f130e. CRC, 365 hashes, 366 membros e verificador portátil passaram. Os 187 ficheiros de proveniência do repositório incluídos nesse ZIP coincidem com o workspace. O inventário inicial registou 352 ficheiros, 138 não rastreados e 149 documentos dos lotes anteriores.

## Resultados novos

| Comando | Resultado | Exit code |
|---|---|---|
| `rtk proxy python C:/TestLearn/tmp/phase10h-batch13-20261106/verify.py integrity` | PASS: 90 objetos completos iguais à referência autenticada; 364 alternativas, 64 objetivos; nove históricos iguais ao HEAD; todos os 352 ficheiros anteriores preservados | 0 |
| `rtk proxy python C:/TestLearn/tmp/phase10h-batch13-20261106/verify.py batch13-specific` | FAIL: asserção de legibilidade na linha 55 de BATCH13-RULES.py | 1 |
| `rtk proxy python C:/TestLearn/tmp/phase10h-batch13-20261106/verify.py targeted-vitest` | PASS: seis ficheiros, 85 testes | 0 |
| `rtk proxy python C:/TestLearn/tmp/phase10h-batch13-20261106/verify.py multiple-answer-scoring` | PASS: oito casos sintéticos de tl-001; seleção parcial, excedente e duplicada rejeitadas; ambas as ordens do conjunto completo aceites; sem acesso a LocalStorage | 0 |

Os quatro comandos foram lançados em paralelo antes de ser conhecido o FAIL. Após a falha não foram iniciados novos gates; apenas diagnóstico em leitura e registo da interrupção. A suite já iniciada terminou com sucesso.

## Falha observada e causa

O relatório novo tl-049 contém `secção1.4.2` e `na20` sem espaço. A expressão regular de legibilidade encontrou `ão1` dentro de `secção1`. A asserção é mais ampla do que apenas identificadores o1/E2E, pois também alcança essa sequência num termo português. Existe efetivamente uma deficiência de espaçamento no novo relatório. Isto não demonstra uma alteração do banco nem invalida por si só o raciocínio académico.

A falha original está em STOP-FAILURE.json. O traceback completo, copiado da saída da ferramenta sem reexecutar ou alegar um PASS, está em `C:/TestLearn/tmp/phase10h-batch13-20261106/batch13-specific-FAILURE.log`. Nenhuma expectativa, expressão regular, texto que disparou a falha, chave, histórico ou solução cega foi corrigido depois da falha.

## Verificações não executadas após a interrupção

Casos negativos específicos e globais, demonstração de encaminhamento das mutações entre as duas camadas, formato Prettier, git diff --check, continuidade de exportação dos 366 membros, novo verificador portátil, CRC e extração de um ZIP do Lote 13: NÃO EXECUTADOS. Nenhum ZIP final foi criado. Os casos negativos do Lote 12 foram executados apenas pelo seu verificador durante o preflight e não contam como casos novos do Lote 13.

TypeScript, lint, build e E2E completos não foram executados: alterações exclusivamente documentais e auxiliares externos, sem alterações ao banco, código funcional ou testes do projeto. A interrupção impede certificar o dossiê como tecnicamente concluído.

## Limitações e próximos passos

Os oito pareceres académicos são ACCEPT_AS_IS e as soluções pré-gabarito coincidem com as chaves. Nenhuma alteração obrigatória ao banco foi confirmada e não foram propostas alterações editoriais ao conteúdo das questões. Não há novas aprovações OWNER_ACCEPTED ou HUMAN_APPROVED. As fontes EN e PT foram consultadas em cópias oficiais locais; o endpoint PT teve timeout, sem alegar novo download. Integridade automatizada não comprova verdade académica. Fase 10H aberta; sem início do Lote 14.

Para retomar, é necessária orientação explícita após esta falha, corrigindo apenas o problema justificado na nova evidência, preservando a falha e reexecutando os gates. Não exportar enquanto houver gate crítico pendente.

## Registos auxiliares

Ocorreram erros não relacionados com testes durante consultas: expansão de variável num comando de leitura PowerShell; tentativa de invocar Get-ChildItem como executável via rtk; e consulta de chave inexistente priorPackage no preflight JSON. Foram apenas erros de leitura, sem alteração do projeto. Não foram tratados como testes aprovados. O diagnóstico final leu as chaves corretas.

## Metadados completos das execuções novas

```json
{
  "integrity": {
    "command": [
      "python",
      "C:\\TestLearn\\tmp\\phase10h-batch13-20261106\\verify.py",
      "integrity"
    ],
    "startedAt": "2026-11-07T01:30:20.447521+00:00",
    "completedAt": "2026-11-07T01:30:22.266495+00:00",
    "exitCode": 0
  },
  "targetedVitest": {
    "command": [
      "node",
      "node_modules/vitest/vitest.mjs",
      "run",
      "tests/unit/academic-audit.test.ts",
      "tests/unit/bank-history.test.ts",
      "tests/unit/backup.test.ts",
      "tests/unit/syllabus-coverage.test.ts",
      "tests/unit/quality-maintenance.test.ts",
      "tests/unit/blueprint.test.ts"
    ],
    "startedAt": "2026-11-07T01:30:20.442628+00:00",
    "completedAt": "2026-11-07T01:30:55.710668+00:00",
    "exitCode": 0,
    "scopeNote": "Fresh scoped execution"
  },
  "syntheticScoring": {
    "command": [
      "node",
      "C:\\TestLearn\\tmp\\phase10h-batch13-20261106\\check-multiple-answer.cjs",
      "C:\\TestLearn\\tmp\\develop-workspace"
    ],
    "startedAt": "2026-11-07T01:30:20.465998+00:00",
    "completedAt": "2026-11-07T01:30:22.685561+00:00",
    "exitCode": 0,
    "scopeNote": "Fresh scoped execution"
  },
  "specificFailure": {
    "status": "STOPPED_CRITICAL_GATE_FAILURE",
    "recordedAt": "2026-11-07T01:32:10.492802+00:00",
    "command": "rtk proxy python C:/TestLearn/tmp/phase10h-batch13-20261106/verify.py batch13-specific",
    "exitCode": 1,
    "toolChunk": "c9f8e2",
    "failureOutputProvenance": "Exact traceback copied from tool output; not a new execution or reconstructed PASS.",
    "failureLog": "C:/TestLearn/tmp/phase10h-batch13-20261106/batch13-specific-FAILURE.log",
    "matches": [
      {
        "file": "docs/academic/phase10h-batch13-2026-11-06/reports/tl-049.md",
        "match": "ão1",
        "context": "a 15.\n\nA lista EN de fatores começa na p.19 e continua na20; PT concentra a secção1.4.2 na p.21. Domínio, necessidades e restrições influenciam técnicas, cobertura"
      }
    ],
    "observedCause": "Report tl-049 contains secção1.4.2 and na20 without spaces. The inherited prose assertion matches ão1 inside secção1; it was intended to detect identifier collisions. This is a readability defect in new evidence, not evidence of a bank edit. No fix or weakened assertion was applied.",
    "testsNotReached": [
      "Batch13 negative mutations",
      "GLOBAL13 negative mutations",
      "two-layer mutation routing demonstration"
    ],
    "resumeCondition": "Explicit authorization to correct the new documentation or verification as justified, then reexecute all required gates. Do not export before all pass.",
    "bankModified": false,
    "newOwnerAccepted": 0,
    "newHumanApproved": 0,
    "finalZIPCreated": false,
    "failurePreserved": true
  }
}
```
