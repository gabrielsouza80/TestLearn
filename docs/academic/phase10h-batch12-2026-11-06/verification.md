# Verificação do Lote 12

**STOPPED_VERIFICATION_FAILURE. Sem ZIP produzido.** Interrupção em cumprimento da restrição operacional 11 do pedido. Nenhum banco, teste do projeto ou guard foi corrigido após a falha.

Execuções novas iniciadas nesta sessão:

| Comando | Data UTC | Exit | Resultado |
| --- | --- | --- | --- |
| `rtk proxy python C:/TestLearn/tmp/phase10h-batch12-preflight.py` | 2026-11-06, antes da resolução cega | 0 | ZIP 11 correto: SHA-256, CRC, 298 hashes e verificador portátil PASS; 299 membros contabilizados no baseline |
| `rtk proxy python C:/TestLearn/tmp/phase10h-batch12-20261106/verify.py integrity` | 2026-11-06T16:51:23.158112Z | 0 | 332 ficheiros anteriores byte-idênticos; 118 não rastreados anteriores e 129 documentos académicos preservados; 90 objetos e chaves/versões/explicações intactos; arquivos .1–.9 iguais ao HEAD |
| `rtk proxy python C:/TestLearn/tmp/phase10h-batch12-20261106/verify.py batch12-specific` | 2026-11-06T16:51:23Z | 1 | Falha: `AssertionError: False positive: unauthorized bank edit` |
| `node node_modules/vitest/vitest.mjs run tests/unit/academic-audit.test.ts tests/unit/bank-history.test.ts tests/unit/backup.test.ts tests/unit/syllabus-coverage.test.ts tests/unit/quality-maintenance.test.ts tests/unit/blueprint.test.ts` | 2026-11-06T16:51:21.210550Z a 16:51:33.495260Z | 0 | 85/85 testes em 6 ficheiros; sem falhas ou skips reportados |
| `node C:/TestLearn/tmp/phase10h-batch12-20261106/check-multiple-answer.cjs C:/TestLearn/tmp/develop-workspace` | 2026-11-06T16:51:21.250605Z | 0 | 8/8 seleções sintéticas; tl-001 mantém exatamente [o1,o4], requer duas; seleção parcial, extra ou duplicada rejeitada; sem armazenamento real |

Os testes unitários já estavam iniciados quando foi detetada a falha; foi apenas recolhido o resultado final. Não se iniciaram novas suites após a decisão de parar. Logs completos e metadados das execuções estão em `C:/TestLearn/tmp/phase10h-batch12-20261106/`. Não se apresentam logs históricos como execuções novas.

## Diagnóstico da falha

O guard específico verifica os hashes das oito questões revistas e as cardinalidades globais do banco. O caso negativo altera o texto de `bank[1]`, tl-002, que está fora do Lote 12. Essa alteração sintética não modifica cardinalidades e foi aceite pelo guard específico. A cópia usada pelo teste é independente; o banco real não foi alterado. A verificação de integridade completa, executada separadamente, comparou todos os objetos reais com o baseline e passou.

Esta distinção não torna o teste negativo dispensável: revela uma lacuna de cobertura do novo verificador. Não se alterou o resultado esperado, não se redirecionou a adulteração para um item do lote e não se removeu o teste para obter PASS. A suite de casos negativos abortou neste caso; não é legítimo afirmar que todos os restantes foram aprovados.

Resolução técnica proposta, ainda não aplicada: vincular a verificação aos hashes canónicos do baseline completo de 90 questões, ou exercitar explicitamente a rotina de integridade global com uma mutação sintética fora do lote. Preservar este caso negativo e acrescentar casos dentro do lote; só retomar com orientação após esta interrupção.

## Não executado e entrega pendente

Não executados: Prettier final, `git diff --check` final, exportação, manifesto do Lote 12, verificador portátil do Lote 12, extração limpa, CRC e SHA-256 do novo ZIP. Não existe novo ZIP para auditar. A continuidade do ZIP 11 foi validada como baseline, mas ainda não foi demonstrada numa exportação do Lote 12.

TypeScript completo, ESLint, build e E2E não iniciados: apenas documentação foi acrescentada; os testes direcionados e a integridade eram o âmbito proporcional. O carregamento de TypeScript para integridade não é um typecheck completo. Nenhum teste foi desativado.

## Estado académico e preservação

Oito recomendações por IA ACCEPT_AS_IS, com soluções independentes, 32 alternativas e textos PT/EN completos. Sem defeito académico obrigatório ou proposta de conteúdo confirmada; o bloqueio atual é técnico, na verificação de evidência. O dossiê é incompleto e não está declarado pronto para auditoria portátil.

Os syllabi oficiais foram consultados; EN web acessível, PT por cópia oficial local após timeout. Páginas/edições/hashes em sources.json. IA não equivale a revisão humana independente; nenhuma aprovação OWNER_ACCEPTED ou HUMAN_APPROVED foi atribuída. Sem revisão .11, commit, push, merge, PR, deploy ou Production. Fase 10H aberta; não iniciar Lote 13.
