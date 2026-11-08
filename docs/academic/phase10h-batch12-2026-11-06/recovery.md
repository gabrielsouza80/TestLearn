# Lote 12 — diagnóstico e resolução da interrupção

Este documento complementa, sem substituir, o README e verification.md da interrupção. Esses ficheiros, STOP-FAILURE.json e os 18 documentos académicos existentes foram preservados byte a byte. O estado técnico atual é sustentado por revalidation.md e pelas evidências RED/GREEN do pacote. A revisão académica não foi repetida e as soluções pré-gabarito conservam os seus horários.

## Causa raiz confirmada: hipótese B

O caso `unauthorized bank edit` faz uma cópia profunda dos argumentos e altera `bank[1].text.en` para `adulterated bank`. O elemento é tl-002. A cópia é passada diretamente como primeiro argumento a `check(*a)`: o hash de tl-002 muda, pelo que a injeção funciona. Não é a hipótese C de uma cópia ignorada.

`BATCH12-RULES.py:check` compara os hashes e a evidência das oito questões do lote. Também verifica cardinalidades estruturais do banco, mas não compara o conteúdo dos outros 82 objetos. O caso fora do lote estava, portanto, colocado na camada errada. A verificação global em `verify.py:integrity` já comparava o banco completo reavaliado com o snapshot. Essa condição rejeita a mesma adulteração de tl-002. Não foi demonstrada uma falha na igualdade global; havia uma lacuna real na organização dos testes negativos, que esperava uma responsabilidade global do guard específico.

A investigação reproduziu a falha original antes da alteração, com exit 1 e a mesma mensagem. `evidence/recovery/red.log`, red-result.json, diagnosis.json e as cópias dos auxiliares originais permitem auditar o RED. O resultado anterior permanece uma falha, não foi reclassificado como aprovação.

## Comparação com os Lotes 10 e 11

- No Lote 10, tl-002 está fora da questão revista; o guard específico aceita essa alteração fora do seu âmbito, enquanto a igualdade global a rejeita.
- No Lote 11, tl-002 faz parte das oito questões; a mesma posição da lista é rejeitada pelo hash específico. O teste passava por coincidência entre o índice escolhido e o âmbito desse lote.
- No Lote 12, tl-002 volta a estar fora do âmbito. Copiar o mesmo teste sem encaminhamento global fez surgir a falha.

As implementações anteriores foram lidas e os seus comportamentos comparados em memória, sem modificar documentos ou auxiliares desses lotes.

## Correção mínima e responsabilidades

1. Novo `GLOBAL12-RULES.py`: extrai a proteção de igualdade completa do banco para uma função pura reutilizável. `check_bank` compara todos os 90 objetos, incluindo textos, explicações, chaves, versões e metadados. Confirma também 364 alternativas, 64 objetivos e a seleção múltipla de tl-001.
2. O caso original de tl-002 permanece com o mesmo texto adulterado e a mesma expectativa de rejeição. Só esse caso é encaminhado para a proteção global. Os casos de coerência académica continuam no guard específico; foi acrescentada uma mutação de tl-016 para demonstrar a rejeição dentro do lote.
3. `verify.py` usa a mesma função global na integridade do banco real e nos testes negativos. O guard específico recebe agora o banco reavaliado atual; a referência esperada não é obtida desse candidato.

Referência imutável: `review-data/current-bank.json` do ZIP do Lote 11, autenticado por SHA-256 `57db2636f49d56402944f71f8b87d14b0235cc25cd2d47d5b01951b3730c6188`. Os bytes do membro foram conferidos com o manifesto anterior antes de serem usados. SHA-256 desses bytes: `9a6bc09d6ab5a512cb53ea26dc7a1da5ae465167bf5e2b6ba8c9c9b34f332615`; hash canónico dos 90 objetos: `3b1faffe3e89031fac6a76ee30e8f82e5a81d3ebea58f1857d0f36391bf9320a`. Ambos são constantes na regra global. Um candidato adulterado acompanhado de uma referência igualmente adulterada é rejeitado, evitando rebaseline silencioso.

## Demonstração da correção

- RED: o comando original `python verify.py batch12-specific` termina com exit 1 e `False positive: unauthorized bank edit`.
- GREEN: o mesmo comando termina com exit 0; a mesma adulteração de tl-002 é rejeitada pela proteção global, com controlo do banco intacto aprovado.
- O guard específico continua deliberadamente limitado aos oito itens. A alteração fora do lote não o transforma num segundo verificador global.
- A alteração sintética de tl-016 é rejeitada pelo guard específico.
- Os 16 casos negativos combinados foram rejeitados: 15 específicos e o caso original encaminhado para a proteção global.
- A proteção global rejeita 96 casos: uma mutação em cada uma das 90 questões, alteração de chave, versão e explicação, ID ausente, ID duplicado e referência adulterada.

Não foram eliminadas asserções, ignoradas exceções ou atualizados hashes para aceitar conteúdo adulterado. Nenhum banco ou teste de produção foi alterado. `replay-recovery.py` e os resultados guardados demonstram o fluxo dos dados em cópias sintéticas, sem LocalStorage ou dados reais.

## Preservação e limites

Todos os ficheiros anteriores ao Lote 12 permanecem iguais; os 18 documentos já existentes deste lote e STOP-FAILURE.json também foram congelados e conferidos por hash. Foram apenas alterados os auxiliares novos afetados e acrescentadas evidências/documentação desta recuperação. Não houve commits, operações Git remotas ou publicação.

Os oito pareceres académicos continuam ACCEPT_AS_IS; não se acrescentaram propostas nem se repetiu a avaliação. Nenhum OWNER_ACCEPTED ou HUMAN_APPROVED atribuído. Verificadores demonstram consistência e proteção dos dados, não verdade académica ou certificação humana. A Fase 10H permanece aberta; parar após Lote 12 e aguardar auditoria antes de Lote 13.
