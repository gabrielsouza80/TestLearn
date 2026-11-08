# Lote 15 — verificação técnica e limites

Execuções novas em 2026-11-07, horários UTC. Não se apresentam logs dos Lotes 1–14 como novas execuções. A revisão cega e os horários ficaram congelados antes da consulta dos gabaritos.

## Baseline e preservação

Preflight PASS: develop, HEAD 3fd0a85d95ecb79539515833ee3cbe7869c58049, revisão 2026-10-27.10. ZIP do Lote 14 autenticado por SHA-256 47ad385f5cd7f7fe2761ff6bae56312779c71825c753d3f0bb04a46997894c04, CRC, 470 hashes, 471 membros e verificador portátil. As 226 referências do repositório coincidiram com os bytes atuais. Inventário inicial: 391 ficheiros, 177 não rastreados e 188 documentos académicos anteriores.

Integridade global nova: 90 objetos completos iguais à referência imutável do membro review-data/current-bank.json do ZIP autenticado. Preservados 364 alternativas, 64 objetivos, IDs, gabaritos, versões, explicações e revisão .10. Os nove arquivos .1–.9 coincidem byte a byte com o HEAD e com o inventário inicial. Nenhuma alteração aos 391 ficheiros anteriores, incluindo as evidências de interrupção e recuperação. Não há revisão .11 nem novo aceite de proprietário ou aprovação humana.

## Resultados realmente executados

| Gate                         | Resultado                                                                                                                                                                                          |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Guard específico BATCH15     | PASS: oito objetos, 33 alternativas, 328 blocos literais, LO/K, versões, históricos, fontes e coerência das soluções                                                                               |
| Casos negativos encaminhados | PASS: 18 rejeitados, sendo 17 específicos e um global; inclui chave, segunda resposta, falta de fundamentação, tradução, fonte, histórico, falsa aprovação, proposta aplicada e alteração a tl-069 |
| GLOBAL15                     | PASS: 90 objetos completos iguais à referência fixa autenticada                                                                                                                                    |
| Casos negativos globais      | PASS: 96 rejeitados; texto em cada uma das 90 questões, chave, versão, explicação, ID ausente/duplicado e referência adulterada                                                                    |
| Encaminhamento de mutações   | PASS: o objeto adulterado tl-002 chega à proteção global, que o rejeita; o guard específico preserva o seu âmbito; tl-069 adulterada é rejeitada pelo específico                                   |
| Vitest direcionado           | PASS: 85 testes em seis ficheiros; sem skips                                                                                                                                                       |
| Seleção múltipla             | PASS: 16 casos sintéticos: oito para tl-001 (o1 e o4) e oito para tl-083 (o2 e o4), sem aceitar parcial, excedente ou duplicado; sem LocalStorage                                                  |
| Fontes e JSON                | PASS: hashes das duas cópias locais oficiais, número de páginas, secções e LO nas páginas citadas; JSON legível e coerente                                                                         |
| Formato                      | PASS: Prettier nos 16 documentos novos sujeitos a estilo; os dois JSON da revisão cega permanecem byte a byte congelados, com sintaxe e conteúdo verificados separadamente                         |
| git diff --check             | PASS; documentos não rastreados têm guard, JSON e formato próprios, pois este comando não os cobre                                                                                                 |

Os seis ficheiros unitários são academic-audit, bank-history, backup, syllabus-coverage, quality-maintenance e blueprint. Comandos completos, datas e exit codes em evidence/checks. Os guards foram inspecionados antes de executar; expectativas vêm da referência autenticada e não foram alteradas para obter PASS. Não ocorreram falhas críticas nem foram removidos casos negativos nesta execução.

## Conferência dos metadados

Um rótulo do auxiliar de encaminhamento ainda dizia tl058ScopedRejected, herdado do lote anterior, embora a mutação real já fosse aplicada a tl-069. O nome foi corrigido para tl069ScopedRejected e os controlos de encaminhamento e fontes foram reexecutados sem alterar expectativas. O registo anterior e a explicação ficam em evidence/checks/superseded-routing-label.json; não foi uma falha de banco ou guard nem foi ocultado como resultado histórico diferente.

## Limitações e verificações não executadas

Não se executaram TypeScript, ESLint, build ou E2E completos: o âmbito é documentação académica e auxiliares externos, sem alteração de implementação, banco, pontuação ou persistência. O carregador runtime transpila os dados para comparação; não é typecheck completo. O guard legado --phase10h-batch2 não foi executado nem apresentado como validação linguística deste lote.

EN ficou acessível nesta execução e PT teve timeout; as cópias oficiais locais foram usadas; as referências precisas e hashes correspondem às cópias oficiais locais. Não se afirma que EN 4.0.1 e PT 4.0 tradução 1.0 sejam textualmente idênticos, nem igualdade remota dos bytes. Não foram incluídos PDFs integrais ou textos integrais de páginas protegidas. A análise de conceitos é interpretação académica por IA; automação valida consistência, não verdade ou aprovação humana independente.

A referência autenticada contém cinco alternativas em tl-083 e exige duas respostas; por isso foram revistas 33 alternativas, sem omitir a quinta ou alterar o banco. Os oito pareceres são ACCEPT_AS_IS; nenhuma correção obrigatória ou proposta editorial justificada foi identificada. Isso não aprova automaticamente outros itens. Nenhum OWNER_ACCEPTED ou HUMAN_APPROVED foi atribuído. A Fase 10H permanece aberta; não iniciar Lote 16.

## Exportação condicionada

Somente após os gates, a exportação deve comparar diretamente os 471 membros anteriores e criar o novo manifesto. CRC, extração limpa, verificador portátil e adulterações do pacote têm registo próprio em export-result.json externo e evidence/checks/package-negative-tests.json no pacote. Resultados destes passos não são antecipados neste registo.

## Metadados novos

```json
{
  "specific": {
    "command": [
      "python",
      "C:\\TestLearn\\tmp\\phase10h-batch15-20261107\\verify.py",
      "batch15-specific"
    ],
    "startedAt": "2026-11-07T23:35:27.336143+00:00",
    "completedAt": "2026-11-07T23:35:29.347044+00:00",
    "exitCode": 0
  },
  "integrity": {
    "command": [
      "python",
      "C:\\TestLearn\\tmp\\phase10h-batch15-20261107\\verify.py",
      "integrity"
    ],
    "startedAt": "2026-11-07T23:35:34.708646+00:00",
    "completedAt": "2026-11-07T23:35:36.409983+00:00",
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
      "startedAt": "2026-11-07T23:35:34.708646+00:00",
      "completedAt": "2026-11-07T23:36:04.408532+00:00",
      "exitCode": 0,
      "scopeNote": "Fresh scoped execution"
    },
    "multiple-answer-scoring": {
      "command": [
        "node",
        "C:\\TestLearn\\tmp\\phase10h-batch15-20261107\\check-multiple-answer.cjs",
        "C:\\TestLearn\\tmp\\develop-workspace"
      ],
      "startedAt": "2026-11-07T23:35:34.720699+00:00",
      "completedAt": "2026-11-07T23:35:36.834627+00:00",
      "exitCode": 0,
      "scopeNote": "Fresh scoped execution"
    },
    "format-check": {
      "command": [
        "node",
        "node_modules/prettier/bin/prettier.cjs",
        "--check",
        "docs/academic/phase10h-batch15-2026-11-07/README.md",
        "docs/academic/phase10h-batch15-2026-11-07/alternative-assessments.json",
        "docs/academic/phase10h-batch15-2026-11-07/decision-matrix.json",
        "docs/academic/phase10h-batch15-2026-11-07/exact-comparisons.json",
        "docs/academic/phase10h-batch15-2026-11-07/file-inventory.json",
        "docs/academic/phase10h-batch15-2026-11-07/optional-candidates.json",
        "docs/academic/phase10h-batch15-2026-11-07/reports/tl-069.md",
        "docs/academic/phase10h-batch15-2026-11-07/reports/tl-070.md",
        "docs/academic/phase10h-batch15-2026-11-07/reports/tl-075.md",
        "docs/academic/phase10h-batch15-2026-11-07/reports/tl-079.md",
        "docs/academic/phase10h-batch15-2026-11-07/reports/tl-080.md",
        "docs/academic/phase10h-batch15-2026-11-07/reports/tl-081.md",
        "docs/academic/phase10h-batch15-2026-11-07/reports/tl-082.md",
        "docs/academic/phase10h-batch15-2026-11-07/reports/tl-083.md",
        "docs/academic/phase10h-batch15-2026-11-07/sources.json",
        "docs/academic/phase10h-batch15-2026-11-07/verification.md"
      ],
      "startedAt": "2026-11-07T23:35:34.744786+00:00",
      "completedAt": "2026-11-07T23:35:35.520339+00:00",
      "exitCode": 0,
      "scopeNote": "Fresh scoped execution"
    },
    "diff-check": {
      "command": ["git", "diff", "--check"],
      "startedAt": "2026-11-07T23:35:34.725927+00:00",
      "completedAt": "2026-11-07T23:35:34.800197+00:00",
      "exitCode": 0,
      "scopeNote": "Fresh scoped execution"
    }
  },
  "layerRouting": {
    "result": "PASS",
    "at": "2026-11-07T23:38:02.999046+00:00",
    "intactControlsPassed": true,
    "tl002MutationInjectedIntoActualArgument": true,
    "tl002ScopedControlPassed": true,
    "tl002GlobalRejected": true,
    "tl069ScopedRejected": true,
    "poisonedReferenceRejected": true,
    "layerContract": "Scope8 evidence / immutable full90 object equality; out-of-scope edits intentionally delegated globally"
  }
}
```
