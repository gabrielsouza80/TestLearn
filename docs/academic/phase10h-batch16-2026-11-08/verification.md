# Lote 16 — verificação técnica e limites

Preflight e soluções cegas em 2026-11-07 UTC; dossiê e verificações posteriores em 2026-11-08 UTC. Não se retrodatam horários nem se apresentam logs históricos como execuções novas. O dossiê identifica a data real de criação.

## Baseline e preservação

Preflight PASS: develop, HEAD 3fd0a85d95ecb79539515833ee3cbe7869c58049, revisão 2026-10-27.10. ZIP do Lote 15 autenticado por SHA-256 387a3e01f6c6b87bd3ad5229477fe7286f6a2c955bf4a82e114d0d980b4df68e, CRC, 517 hashes, 518 membros e verificador portátil em extração limpa. As 244 referências do repositório coincidiram com os bytes atuais. Inventário inicial: 409 ficheiros rastreados/não ignorados, 195 não rastreados e 206 documentos académicos anteriores.

Integridade nova: 90 objetos completos iguais à referência fixa autenticada, incluindo 364 alternativas, 64 objetivos, IDs, gabaritos, versões e explicações. Nove arquivos .1–.9 byte-idênticos ao HEAD e ao inventário inicial. Todos os 409 ficheiros anteriores preservados, incluindo guards e evidências de falhas/recuperações; nenhuma revisão .11. Nenhum OWNER_ACCEPTED ou HUMAN_APPROVED novo.

## Resultados novos

| Gate                    | Resultado                                                                                                                                                                                     |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| BATCH16 completo        | PASS: duas questões, dez alternativas, duas respostas por item, 96 blocos literais e comparações lado a lado                                                                                  |
| Negativos encaminhados  | PASS: 26 rejeitados, 25 específicos e um global; inclui chave, parcial/excedente, cardinalidade, tradução, versão/revisão, explicação, histórico, fontes, aprovação falsa e relatório ausente |
| GLOBAL16                | PASS: igualdade dos 90 objetos completos com referência fixa do ZIP anterior                                                                                                                  |
| Negativos globais       | PASS: 96 rejeitados, incluindo 90 mutações individuais de enunciado e chave, versão, explicação, ID ausente/duplicado e referência igualmente adulterada                                      |
| Encaminhamento          | PASS: tl-084 rejeitada pelo específico; tl-002 fora do lote aceita pelo controlo de âmbito específico e rejeitada pela proteção global; nenhuma mutação aplicada ao banco real                |
| Vitest direcionado      | PASS: 85 testes em seis ficheiros, sem skips                                                                                                                                                  |
| Seleção múltipla        | PASS: 36 casos, nove em cada tl-001, tl-083, tl-084 e tl-085; os 16 casos anteriores preservados, 16 equivalentes acrescentados e quatro combinações corretas/incorretas adicionais           |
| Matemática do requisito | PASS: três casos de fronteira inclusiva e um contraexemplo sintético que distingue p95 de máximo individual; não é teste de carga real                                                        |
| Fontes e JSON           | PASS: cópias locais oficiais, hashes, páginas e LO/K; continuidade de secção EN2.2.1 citada no corpo da página 29, com cabeçalho na página 28 verificado                                      |
| Formato                 | PASS: Prettier nos dez ficheiros novos aplicáveis; dois JSON cegos congelados, validados sem reformatar                                                                                       |
| git diff --check        | PASS; os documentos não rastreados recebem guard, JSON e formato próprios porque este comando não os cobre                                                                                    |

Os seis ficheiros reexecutados são academic-audit, bank-history, backup, syllabus-coverage, quality-maintenance e blueprint. Comandos, horários UTC, exit codes e logs completos estão em evidence/checks. Nenhum teste ou controlo foi removido ou enfraquecido. Não houve falha crítica neste lote.

## Conferência dos metadados

O rótulo layerContract inicialmente herdado dizia Scope8, embora a lista e os objetos realmente verificados já fossem os dois itens deste lote. Foi corrigido para Scope2, sem alterar guard, testes, dados ou expectativas, e os controlos foram reexecutados. O registo original permanece em evidence/checks/metadata-label-adjustment.json. Não se apresenta a etiqueta anterior como descrição válida do âmbito nem como falha do banco.

## Limitações

Não se repetiram TypeScript, ESLint, build nem E2E completos: não há alteração de banco, implementação, pontuação ou persistência. O carregamento runtime é comparação de dados, não typecheck completo. Não se executou guard académico legado como se fosse deste lote. Não houve acesso a dados reais, perfis ou LocalStorage: os testes usam apenas cópias em memória ou staging temporário.

Fontes EN v4.0.1 e PT v4.0 tradução 1.0 não são textualmente idênticas. Ambos os endpoints oficiais ficaram acessíveis; páginas e hashes referem-se às cópias oficiais locais, sem alegar igualdade remota de bytes. Nenhuma fonte contém uma definição detalhada de estimador do percentil: o raciocínio matemático do requisito está separado das regras do syllabus. O exemplo nearest-rank é apenas ilustração, não imposição ao banco. Não se executou carga real de 200 utilizadores nem se inventou método, duração ou limiar adicional.

Dois pareceres ACCEPT_AS_IS; nenhuma correção obrigatória ou proposta editorial justificada. Coincidência de chave não foi prova única; as dez alternativas, explicações, traduções e interpretações concorrentes estão analisadas. Revisão por IA não é aprovação académica humana. Fase 10H aberta, pendente de reconciliação global e revisão humana independente, não iniciadas automaticamente.

## Exportação condicionada

Só após os gates, comparar diretamente todos os 518 membros anteriores, preservar manifesto e metadados históricos e produzir novo manifesto. Os testes de pacote, CRC, extração limpa e hashes têm registo próprio no export-result.json externo e no pacote. Não se antecipam resultados desses passos neste documento.

## Metadados novos

```json
{
  "specific": {
    "command": [
      "python",
      "C:\\TestLearn\\tmp\\phase10h-batch16-20261107\\verify.py",
      "batch16-specific"
    ],
    "startedAt": "2026-11-08T00:03:10.426313+00:00",
    "completedAt": "2026-11-08T00:03:13.314901+00:00",
    "exitCode": 0
  },
  "integrity": {
    "command": [
      "python",
      "C:\\TestLearn\\tmp\\phase10h-batch16-20261107\\verify.py",
      "integrity"
    ],
    "startedAt": "2026-11-08T00:03:26.262817+00:00",
    "completedAt": "2026-11-08T00:03:28.696536+00:00",
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
      "startedAt": "2026-11-08T00:03:26.244956+00:00",
      "completedAt": "2026-11-08T00:03:39.634962+00:00",
      "exitCode": 0,
      "scopeNote": "Fresh scoped execution"
    },
    "multiple-answer-scoring": {
      "command": [
        "node",
        "C:\\TestLearn\\tmp\\phase10h-batch16-20261107\\check-multiple-answer.cjs",
        "C:\\TestLearn\\tmp\\develop-workspace"
      ],
      "startedAt": "2026-11-08T00:03:26.230747+00:00",
      "completedAt": "2026-11-08T00:03:27.192150+00:00",
      "exitCode": 0,
      "scopeNote": "Fresh scoped execution"
    },
    "format-check": {
      "command": [
        "node",
        "node_modules/prettier/bin/prettier.cjs",
        "--check",
        "docs/academic/phase10h-batch16-2026-11-08/README.md",
        "docs/academic/phase10h-batch16-2026-11-08/alternative-assessments.json",
        "docs/academic/phase10h-batch16-2026-11-08/decision-matrix.json",
        "docs/academic/phase10h-batch16-2026-11-08/exact-comparisons.json",
        "docs/academic/phase10h-batch16-2026-11-08/file-inventory.json",
        "docs/academic/phase10h-batch16-2026-11-08/optional-candidates.json",
        "docs/academic/phase10h-batch16-2026-11-08/reports/tl-084.md",
        "docs/academic/phase10h-batch16-2026-11-08/reports/tl-085.md",
        "docs/academic/phase10h-batch16-2026-11-08/sources.json",
        "docs/academic/phase10h-batch16-2026-11-08/verification.md"
      ],
      "startedAt": "2026-11-08T00:03:26.241887+00:00",
      "completedAt": "2026-11-08T00:03:26.976742+00:00",
      "exitCode": 0,
      "scopeNote": "Fresh scoped execution"
    },
    "diff-check": {
      "command": ["git", "diff", "--check"],
      "startedAt": "2026-11-08T00:03:26.302603+00:00",
      "completedAt": "2026-11-08T00:03:26.389756+00:00",
      "exitCode": 0,
      "scopeNote": "Fresh scoped execution"
    }
  },
  "layerRouting": {
    "result": "PASS",
    "at": "2026-11-08T00:06:28.753918+00:00",
    "intactControlsPassed": true,
    "tl002MutationInjectedIntoActualArgument": true,
    "tl002ScopedControlPassed": true,
    "tl002GlobalRejected": true,
    "tl084ScopedRejected": true,
    "poisonedReferenceRejected": true,
    "layerContract": "Scope2 evidence / immutable full90 object equality; out-of-scope edits intentionally delegated globally"
  },
  "mathematicalChecks": {
    "result": "PASS",
    "at": "2026-11-08T00:06:30.711774+00:00",
    "checks": 4,
    "inclusiveLimitCases": [
      {
        "p95ms": 299.999,
        "limitMS": 300,
        "users": 200,
        "expected": true,
        "actual": true
      },
      {
        "p95ms": 300,
        "limitMS": 300,
        "users": 200,
        "expected": true,
        "actual": true
      },
      {
        "p95ms": 300.001,
        "limitMS": 300,
        "users": 200,
        "expected": false,
        "actual": false
      }
    ],
    "percentileCounterexample": {
      "method": "Illustrative nearest-rank only; not a mandated estimator for the question",
      "sampleCount": 100,
      "lowCount": 95,
      "lowMS": 250,
      "tailCount": 5,
      "tailMS": 450,
      "p95MS": 250,
      "maxMS": 450,
      "p95LimitSatisfied": true,
      "allResponsesLimitSatisfied": false
    },
    "scope": "Synthetic mathematical interpretation only; no real load test or user data; question leaves estimator/sampling unspecified"
  }
}
```

## Conferência final da proveniência de exportação

A primeira exportação passou todos os controlos, mas uma descrição de proveniência do resumo ainda dizia oito relatórios, apesar do conteúdo e contagens corretos de duas questões e dez alternativas. Essa exportação permanece preservada, sem ser a entrega final. Corrigiu-se exclusivamente o descritivo do novo exportador e gerou-se um ZIP final com sufixo único, reexecutando os controlos do pacote. O resultado anterior e o diagnóstico estão em evidence/checks/export-description-adjustment.json. Não houve alteração académica, ao banco, soluções cegas, guards ou expectativas.
