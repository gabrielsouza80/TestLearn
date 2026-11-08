# Lote 13 — recuperação da falha de legibilidade

Estado atual: recuperação demonstrada. A falha histórica continua FAIL em STOP-FAILURE.json e verification.md. Estes documentos não foram reescritos.

## Diagnóstico e correção mínima

Causa A: erro de espaçamento no relatório novo tl-049. A expressão regular também é ampla: encontrou `ão1` dentro de `secção1.4.2`, mas o trecho realmente precisava de espaço. Existia igualmente `na20` no mesmo parágrafo. A falha foi reproduzida antes da correção com exit code 1; não era alteração ao banco.

Foram inseridos exatamente dois espaços: `continua na20;` → `continua na 20;` e `secção1.4.2 na p.21.` → `secção 1.4.2 na p.21.`. Secção e páginas foram mantidas e reconferidas nas cópias oficiais locais: EN v4.0.1, páginas físicas 19–20; PT v4.0 tradução 1.0, página física 21. Não houve alteração académica nem regeneração dos relatórios.

SHA-256 original: `e695590874cacf04c43fb70540374da4ebe29c3a0c4f994aa68e847a7b162a98`.

SHA-256 corrigido: `e91fd56b5237eddcc4ab62ba5966784ff248ba0b3776a95a9af73b52c05a4eb5`.

O relatório original está preservado em evidence/recovery/original/tl-049.md no pacote; o diff exato está em evidence/recovery/report-only.diff. Os 18 outros documentos iniciais do lote permanecem byte a byte idênticos. Os 352 ficheiros anteriores ao lote, incluindo 149 documentos académicos anteriores, permanecem preservados. Não se alega que todos os 19 documentos iniciais sejam idênticos.

## Demonstração e limites

O guard original e o global não foram modificados. O relatório preservado continua a falhar no guard completo; o corrigido passa e a remoção sintética do espaço em `secção 1.4.2` volta a falhar. Blocos literais do banco, soluções pré-gabarito, horários, decisões e expectativas não mudaram.

A alteração em tl-002 chega à proteção global: o guard do lote aceita esse controlo fora do seu âmbito e o global rejeita o banco adulterado. O guard específico rejeita a alteração em tl-048. Uma referência global igualmente adulterada é rejeitada. Resultados e hashes em evidence/recovery/red-green-routing.json.

Os oito pareceres académicos anteriores permanecem ACCEPT_AS_IS; a revisão cega não foi repetida. Não há OWNER_ACCEPTED ou HUMAN_APPROVED novo. Integridade técnica não é verdade académica nem revisão humana independente. A Fase 10H permanece aberta; não iniciar Lote 14.
