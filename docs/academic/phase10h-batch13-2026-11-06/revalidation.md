# Lote 13 — revalidação após recuperação

Execuções novas de 2026-11-07, horários UTC. As execuções anteriores e a interrupção foram preservadas separadamente; os resultados abaixo não são herdados.

| Verificação nova              | Resultado                                                                                                                     |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| Guard específico completo     | PASS: oito questões, 32 alternativas e 320 blocos literais antes/depois                                                       |
| Casos negativos encaminhados  | PASS: 16 rejeitados; 15 específicos e um global, sem atribuir tl-002 ao âmbito específico                                     |
| Proteção global               | PASS: 90 objetos completos iguais à referência imutável autenticada                                                           |
| Negativos globais             | PASS: 96 rejeitados, incluindo texto em cada questão, chave, versão, explicação, ID ausente/duplicado e referência adulterada |
| Testes unitários direcionados | PASS: 85 testes em seis ficheiros                                                                                             |
| Seleção múltipla tl-001       | PASS: oito casos sintéticos; conjunto correto o1 e o4, sem aceitar seleção parcial; sem LocalStorage                          |
| Integridade e histórico       | PASS: 90 IDs/chaves, 364 alternativas, 64 objetivos, revisão .10 e nove arquivos; 352 ficheiros anteriores preservados        |
| git diff --check              | PASS; não inspeciona documentos não rastreados, que têm validação própria                                                     |

Os testes de auditoria académica, histórico, backup, cobertura do syllabus, manutenção de qualidade e blueprint foram realmente reexecutados. Não houve skips nestes 85 testes. Comandos completos, horários, exit codes e logs ficam em evidence/checks.

JSON e referências do dossiê são verificados pelo guard e pelo verificador portátil. Apenas os dois documentos novos de recuperação são formatados com Prettier; os 19 documentos iniciais ficam congelados, com a única exceção autorizada dos dois espaços em tl-049. Os blocos textuais originais são comparados literalmente pelo guard, em vez de reformatados. Não se alega um PASS global de Prettier sobre documentos preservados.

TypeScript, ESLint, build e E2E completos não foram repetidos: esta recuperação não altera banco, código funcional, testes do projeto, pontuação ou persistência. Os guards não comprovam equivalência semântica automaticamente. A cópia oficial local PT foi usada; mantém-se a limitação histórica do endpoint PT com timeout.

README.md, verification.md e STOP-FAILURE.json iniciais permanecem como evidência histórica da interrupção. Este documento e recovery.md descrevem a recuperação. A exportação só é permitida após os restantes gates de formato, inventário e pacote passarem; os resultados de CRC, extração e adulterações do pacote serão apresentados pelo export-result.json externo e pela execução do verificador portátil.

## Metadados novos

```json
{
  "specific": {
    "command": [
      "python",
      "C:\\TestLearn\\tmp\\phase10h-batch13-20261106\\verify.py",
      "batch13-specific"
    ],
    "startedAt": "2026-11-07T22:52:22.576159+00:00",
    "completedAt": "2026-11-07T22:52:24.494839+00:00",
    "exitCode": 0
  },
  "integrity": {
    "command": [
      "python",
      "C:\\TestLearn\\tmp\\phase10h-batch13-20261106\\verify.py",
      "integrity"
    ],
    "startedAt": "2026-11-07T22:52:29.322383+00:00",
    "completedAt": "2026-11-07T22:52:31.070986+00:00",
    "exitCode": 0
  },
  "commands": {
    "targeted-vitest": {
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
      "startedAt": "2026-11-07T22:52:29.339011+00:00",
      "completedAt": "2026-11-07T22:53:13.677269+00:00",
      "exitCode": 0,
      "scopeNote": "Fresh scoped execution"
    },
    "multiple-answer-scoring": {
      "command": [
        "node",
        "C:\\TestLearn\\tmp\\phase10h-batch13-20261106\\check-multiple-answer.cjs",
        "C:\\TestLearn\\tmp\\develop-workspace"
      ],
      "startedAt": "2026-11-07T22:52:29.339011+00:00",
      "completedAt": "2026-11-07T22:52:32.011711+00:00",
      "exitCode": 0,
      "scopeNote": "Fresh scoped execution"
    },
    "diff-check": {
      "command": ["git", "diff", "--check"],
      "startedAt": "2026-11-07T22:52:29.342217+00:00",
      "completedAt": "2026-11-07T22:52:29.413894+00:00",
      "exitCode": 0,
      "scopeNote": "Fresh scoped execution"
    }
  },
  "redGreenRouting": {
    "result": "PASS",
    "recordedAt": "2026-11-07T22:54:18.409930+00:00",
    "originalFullGuardStillRED": true,
    "correctedFullGuardGREEN": true,
    "syntheticSpacingRegressionRejected": true,
    "tl002MutationActuallyInjected": true,
    "tl002ScopedControlPassed": true,
    "tl002GlobalRejected": true,
    "tl048ScopedRejected": true,
    "poisonedReferenceRejected": true,
    "guardsSHA256": {
      "BATCH13-RULES.py": "047e88548bcb08aa260fbe7bdeb0a90f9c051e4cf5076a73ace9c2cdd2353627",
      "GLOBAL13-RULES.py": "1ed5ddff5edd120248aa45057e08e43c649aef66ecb0c392c53451339657029d"
    }
  }
}
```
