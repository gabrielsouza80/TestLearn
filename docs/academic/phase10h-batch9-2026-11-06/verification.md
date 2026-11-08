# Verificação nova — Lote 9

Data: 2026-11-06T14:29:02.882569+00:00

| Comando efetivamente executado                                                                                                                                                                                                                 | Exit | Resultado                                                      |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---- | -------------------------------------------------------------- |
| `node node_modules/vitest/vitest.mjs run tests/unit/academic-audit.test.ts tests/unit/quality-maintenance.test.ts tests/unit/bank-history.test.ts tests/unit/backup.test.ts tests/unit/blueprint.test.ts tests/unit/syllabus-coverage.test.ts` | 0    | 85/85 testes, 6 ficheiros, sem falhas/skips reportados         |
| `node C:\TestLearn\tmp\phase10h-batch9-20261106\check-multiple-answer.cjs C:\TestLearn\tmp\develop-workspace`                                                                                                                                  | 0    | 8/8 seleções sintéticas, sem armazenamento                     |
| `node scripts/check-academic-deliverables.mjs --phase10h-batch2`                                                                                                                                                                               | 0    | PASS contextual dos Lotes1/2; não aprovação académica do Lote9 |

`python verify.py integrity`: exit0;285 ficheiros anteriores byte-idênticos;71 documentos pendentes preservados;82 documentos dos Lotes1–8 preservados;90 objetos/IDs/chaves/versões/explicações iguais;9 arquivos históricos iguais ao HEAD;7 referências adicionais iguais ao ZIP8.

`python verify.py batch9-specific`: exit0;8 identidades/LO/K/hashes,32 distratores,36 pares de termos ancorados,4 propostas não aplicadas,12 corrupções rejeitadas. Os verificadores validam consistência da evidência, não verdade académica ou equivalência semântica automática.

A primeira execução do helper específico falhou: dois casos negativos herdados do Lote8 não alteravam a chave/cardinalidade no contexto do Lote9. Foram corrigidos para adulterações reais (o4 e cardinalidade2), sem modificar testes do projeto. A reexecução rejeitou os12 casos. Nenhum teste foi desativado.

Formato dos18 novos documentos e `git diff --check` são executados e registados em evidence/checks antes da exportação. CRC, extração limpa, hashes, continuidade176/176 e verificador portátil são executados na construção do ZIP; resultados finais externos acompanham o pacote.

Sem alterações funcionais: TypeScript, lint, build e E2E completos não repetidos;85 testes direcionados e pontuação atual foram suficientes para o âmbito documental. Backups/históricos/blueprint/coverage tiveram testes unitários novos; não se alegam novas provas de retenção em Production.

Fontes: EN4.0.1 e PT4.0 tradução1.0 consultadas localmente com hashes/páginas registados. Abertura web EN conseguida; endpointPT teve timeout. Não se alega novo downloadPT nem identidade remota comprovada. Nenhuma fonte essencial ficou indisponível porque a cópia oficial local foi consultada.

Nenhuma aprovação OWNER_ACCEPTED/HUMAN_APPROVED nova. Nenhuma alteração ao banco ou ficheiro anterior; revisão.10 e arquivos.1–.9 preservados. Fase10H OPEN; parar após Lote9.
