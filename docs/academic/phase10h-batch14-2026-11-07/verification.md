# Lote 14 — verificação técnica e limites

Execuções novas em 2026-11-07, horários UTC. Não se apresentam logs dos Lotes 1–13 como novas execuções. A revisão cega e os horários ficaram congelados antes da consulta dos gabaritos.

## Baseline e preservação

Preflight PASS: develop, HEAD 3fd0a85d95ecb79539515833ee3cbe7869c58049, revisão 2026-10-27.10. ZIP do Lote 13 autenticado por SHA-256 78162d4c4582d296e66f3bb6c57483988aec78214f366710c655d4f14b9f63d6, CRC, 431 hashes, 432 membros e verificador portátil. As 208 referências do repositório coincidiram com os bytes atuais. Inventário inicial: 373 ficheiros, 159 não rastreados e 170 documentos académicos anteriores.

Integridade global nova: 90 objetos completos iguais à referência imutável do membro review-data/current-bank.json do ZIP autenticado. Preservados 364 alternativas, 64 objetivos, IDs, gabaritos, versões, explicações e revisão .10. Os nove arquivos .1–.9 coincidem byte a byte com o HEAD e com o inventário inicial. Nenhuma alteração aos 373 ficheiros anteriores, incluindo as evidências de interrupção e recuperação. Não há revisão .11 nem novo aceite de proprietário ou aprovação humana.

## Resultados realmente executados

| Gate                         | Resultado                                                                                                                                                                                          |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Guard específico BATCH14     | PASS: oito objetos, 32 alternativas, 320 blocos literais, LO/K, versões, históricos, fontes e coerência das soluções                                                                               |
| Casos negativos encaminhados | PASS: 16 rejeitados, sendo 15 específicos e um global; inclui chave, segunda resposta, falta de fundamentação, tradução, fonte, histórico, falsa aprovação, proposta aplicada e alteração a tl-058 |
| GLOBAL14                     | PASS: 90 objetos completos iguais à referência fixa autenticada                                                                                                                                    |
| Casos negativos globais      | PASS: 96 rejeitados; texto em cada uma das 90 questões, chave, versão, explicação, ID ausente/duplicado e referência adulterada                                                                    |
| Encaminhamento de mutações   | PASS: o objeto adulterado tl-002 chega à proteção global, que o rejeita; o guard específico preserva o seu âmbito; tl-058 adulterada é rejeitada pelo específico                                   |
| Vitest direcionado           | PASS: 85 testes em seis ficheiros; sem skips                                                                                                                                                       |
| Seleção múltipla             | PASS: oito casos sintéticos de tl-001, conjunto correto o1 e o4, sem aceitar parcial, excedente ou duplicado; sem LocalStorage                                                                     |
| Fontes e JSON                | PASS: hashes das duas cópias locais oficiais, número de páginas, secções e LO nas páginas citadas; JSON legível e coerente                                                                         |
| Formato                      | PASS: Prettier nos 16 documentos novos sujeitos a estilo; os dois JSON da revisão cega permanecem byte a byte congelados, com sintaxe e conteúdo verificados separadamente                         |
| git diff --check             | PASS; documentos não rastreados têm guard, JSON e formato próprios, pois este comando não os cobre                                                                                                 |

Os seis ficheiros unitários são academic-audit, bank-history, backup, syllabus-coverage, quality-maintenance e blueprint. Comandos completos, datas e exit codes em evidence/checks. Os guards foram inspecionados antes de executar; expectativas vêm da referência autenticada e não foram alteradas para obter PASS. Não ocorreram falhas críticas nem foram removidos casos negativos nesta execução.

## Limitações e verificações não executadas

Não se executaram TypeScript, ESLint, build ou E2E completos: o âmbito é documentação académica e auxiliares externos, sem alteração de implementação, banco, pontuação ou persistência. O carregador runtime transpila os dados para comparação; não é typecheck completo. O guard legado --phase10h-batch2 não foi executado nem apresentado como validação linguística deste lote.

Ambos os endpoints oficiais ficaram acessíveis nesta execução; as referências precisas e hashes correspondem às cópias oficiais locais. Não se afirma que EN 4.0.1 e PT 4.0 tradução 1.0 sejam textualmente idênticos, nem igualdade remota dos bytes. Não foram incluídos PDFs integrais ou textos integrais de páginas protegidas. A análise de conceitos é interpretação académica por IA; automação valida consistência, não verdade ou aprovação humana independente.

Os oito pareceres são ACCEPT_AS_IS; nenhuma correção obrigatória ou proposta editorial justificada foi identificada. Isso não aprova automaticamente outros itens. Nenhum OWNER_ACCEPTED ou HUMAN_APPROVED foi atribuído. A Fase 10H permanece aberta; não iniciar Lote 15.

## Exportação condicionada

Somente após os gates, a exportação deve comparar diretamente os 432 membros anteriores e criar o novo manifesto. CRC, extração limpa, verificador portátil e adulterações do pacote têm registo próprio em export-result.json externo e evidence/checks/package-negative-tests.json no pacote. Resultados destes passos não são antecipados neste registo.

## Metadados novos

```json
{
  "specific": {
    "command": [
      "python",
      "C:\\TestLearn\\tmp\\phase10h-batch14-20261107\\verify.py",
      "batch14-specific"
    ],
    "startedAt": "2026-11-07T23:16:38.936021+00:00",
    "completedAt": "2026-11-07T23:16:41.200488+00:00",
    "exitCode": 0
  },
  "integrity": {
    "command": [
      "python",
      "C:\\TestLearn\\tmp\\phase10h-batch14-20261107\\verify.py",
      "integrity"
    ],
    "startedAt": "2026-11-07T23:16:49.260346+00:00",
    "completedAt": "2026-11-07T23:16:51.360189+00:00",
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
      "startedAt": "2026-11-07T23:16:49.260346+00:00",
      "completedAt": "2026-11-07T23:17:01.400488+00:00",
      "exitCode": 0,
      "scopeNote": "Fresh scoped execution"
    },
    "multiple-answer-scoring": {
      "command": [
        "node",
        "C:\\TestLearn\\tmp\\phase10h-batch14-20261107\\check-multiple-answer.cjs",
        "C:\\TestLearn\\tmp\\develop-workspace"
      ],
      "startedAt": "2026-11-07T23:16:49.284877+00:00",
      "completedAt": "2026-11-07T23:16:50.058842+00:00",
      "exitCode": 0,
      "scopeNote": "Fresh scoped execution"
    },
    "format-check": {
      "command": [
        "node",
        "node_modules/prettier/bin/prettier.cjs",
        "--check",
        "docs/academic/phase10h-batch14-2026-11-07/README.md",
        "docs/academic/phase10h-batch14-2026-11-07/alternative-assessments.json",
        "docs/academic/phase10h-batch14-2026-11-07/decision-matrix.json",
        "docs/academic/phase10h-batch14-2026-11-07/exact-comparisons.json",
        "docs/academic/phase10h-batch14-2026-11-07/file-inventory.json",
        "docs/academic/phase10h-batch14-2026-11-07/optional-candidates.json",
        "docs/academic/phase10h-batch14-2026-11-07/reports/tl-058.md",
        "docs/academic/phase10h-batch14-2026-11-07/reports/tl-059.md",
        "docs/academic/phase10h-batch14-2026-11-07/reports/tl-060.md",
        "docs/academic/phase10h-batch14-2026-11-07/reports/tl-061.md",
        "docs/academic/phase10h-batch14-2026-11-07/reports/tl-065.md",
        "docs/academic/phase10h-batch14-2026-11-07/reports/tl-066.md",
        "docs/academic/phase10h-batch14-2026-11-07/reports/tl-067.md",
        "docs/academic/phase10h-batch14-2026-11-07/reports/tl-068.md",
        "docs/academic/phase10h-batch14-2026-11-07/sources.json",
        "docs/academic/phase10h-batch14-2026-11-07/verification.md"
      ],
      "startedAt": "2026-11-07T23:16:49.291791+00:00",
      "completedAt": "2026-11-07T23:16:50.058842+00:00",
      "exitCode": 0,
      "scopeNote": "Fresh scoped execution"
    },
    "diff-check": {
      "command": ["git", "diff", "--check"],
      "startedAt": "2026-11-07T23:16:49.284877+00:00",
      "completedAt": "2026-11-07T23:16:49.365455+00:00",
      "exitCode": 0,
      "scopeNote": "Fresh scoped execution"
    }
  },
  "layerRouting": {
    "result": "PASS",
    "at": "2026-11-07T23:18:22.253004+00:00",
    "intactControlsPassed": true,
    "tl002MutationInjectedIntoActualArgument": true,
    "tl002ScopedControlPassed": true,
    "tl002GlobalRejected": true,
    "tl058ScopedRejected": true,
    "poisonedReferenceRejected": true,
    "layerContract": "Scope8 evidence / immutable full90 object equality; out-of-scope edits intentionally delegated globally"
  }
}
```
