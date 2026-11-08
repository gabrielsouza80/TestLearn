# Defeito preexistente — reflow das alternativas e navegação

Data: 08-11-2026. Estado: **CONFIRMADO, NÃO CORRIGIDO**. Identificador documental: TL-REFLOW-320-TEXT200. Não é defeito do banco académico nem do gabarito de tl-038.

## Reprodução e referência

Perfil de browser novo, apenas sessão sintética de prática com tl-038 e tl-078, inglês, viewport de 320 × 900 px, tamanho de fonte raiz ampliado para 200% (32 px). Não equivale a afirmar que foi executado zoom nativo do browser ou certificação de acessibilidade.

Foram comparados:

1. Build atual com o aviso.
2. Build isolado sem aviso, a partir de uma cópia explícita das fontes, com `src/App.tsx` e `src/styles.css` substituídos **somente na cópia** pelos bytes de HEAD `3fd0a85d95ecb79539515833ee3cbe7869c58049`.
3. Na página atual, remoção transitória do nó do aviso, sem modificar ficheiros.

O banco, históricos e restantes fontes são os mesmos. Os dois módulos novos de apresentação, não importados pelo App do HEAD, não entram no bundle de referência. Proveniência e hashes: `C:/TestLearn/tmp/pedagogical-e2e-recovery-20261108/baseline-provenance.json`. Nenhum checkout ou substituição foi realizado no workspace de desenvolvimento.

| Browser  | Atual com aviso, scrollWidth/clientWidth | HEAD sem aviso | Atual com nó do aviso removido |
| -------- | ---------------------------------------- | -------------- | ------------------------------ |
| Chromium | 352 / 320 px                             | 352 / 320 px   | 352 / 320 px                   |
| Firefox  | 352 / 320 px                             | 352 / 320 px   | 352 / 320 px                   |
| WebKit   | 352 / 320 px                             | 352 / 320 px   | 352 / 320 px                   |

Com texto normal, a largura da página é 320 px nas seis comparações. A diferença aparece no cenário de texto ampliado. A persistência do mesmo excesso nas três referências demonstra preexistência em relação ao aviso; não se afirma que a produção atual foi consultada.

## Causa de layout e medições

O painel ocupa 288 px entre x = 16 e x = 304. Com padding e bordas, o conteúdo útil fica aproximadamente entre x = 52,19 e x = 267,81, com 215,63 px disponíveis.

| Elemento                  | Chromium / WebKit                                                   | Firefox                                                                | Restrição relevante                                         |
| ------------------------- | ------------------------------------------------------------------- | ---------------------------------------------------------------------- | ----------------------------------------------------------- |
| `fieldset.options`        | largura 300,297; direita 352,484; scroll/client 300/300 px          | largura 300,233; direita 352,433; scroll/client 300/300 px             | `min-width: min-content` computado, sem reset em `.options` |
| `.question-actions > div` | largura 292,438; direita 344,625; scroll/client 292/292 px          | largura 292,433; direita 344,633; scroll/client 292/292 px             | flex sem wrap, `min-width: auto`, botões e gap intrínsecos  |
| Botão “Flag for review”   | largura 292,438; direita 344,625 px                                 | largura 292,433; direita 344,633 px                                    | largura da linha/itens excede a caixa de ações              |
| Aviso atual               | largura aproximada 215,63; direita 267,81; scroll/client 214/214 px | mesmas restrições de largura do conteúdo, com arredondamentos do motor | `min-width: 0`, quebra de texto, sem excesso observado      |

As alternativas herdam o mínimo intrínseco do fieldset. A composição flex das opções, os espaços, controlos, letras e texto ampliado exigem mais largura que o conteúdo disponível. As etiquetas e parte do texto acompanham o excesso. Separadamente, a linha de navegação mantém a largura intrínseca dos botões sem permitir wrap; também excede a área disponível. Os estilos responsáveis já existem no HEAD sem aviso.

Os dados integrais incluem x, y, largura, altura, direita, fundo, scrollWidth, clientWidth e estilos computados dos elementos relevantes, em `diagnosis.json`. Foram capturadas imagens completas da versão atual e da referência nos três browsers (`*-current-320-200.png` e `*-HEAD-no-notice-320-200.png`).

## Impacto

Existe deslocamento horizontal necessário para aceder ao conteúdo nesta combinação de viewport e texto ampliado. A condição exigida pelo teste de reflow não é satisfeita. A asserção deve continuar a falhar; não foi removida, marcada como skip ou substituída por uma tolerância maior.

O cenário mobile com emulação de iPhone tem comportamento de viewport diferente e consegue terminar o fluxo após a correção do seletor. Isso não invalida os resultados dos três browsers desktop a 320 px.

## Recomendação, não aplicada

Preparar uma correção de layout separada, com autorização específica, abrangendo o mínimo intrínseco do fieldset/opções e a capacidade de quebra/encolhimento dos controlos de navegação. Investigar `min-inline-size`, quebra de palavras e wrap no contexto correto, preservando alvos de interação e legibilidade. Validar em PT/EN, texto normal/ampliado, prática/simulado e sem alterar dados ou scoring.

Não usar `overflow-x: hidden`, clipping, redução da fonte, remoção de verificações ou alteração da condição de 320 px/200% para obter PASS. Uma hipótese de CSS não é uma correção demonstrada: as sondas transitórias adicionais não constituem evidência de GREEN e não foram aplicadas aos ficheiros do produto.

## Limites das sondas adicionais

Depois da comparação independente bem-sucedida, uma tentativa auxiliar de introduzir regras de estilo transitórias foi rejeitada pela CSP `style-src 'self'`. A política não foi alterada. Uma segunda sonda com propriedades de elementos falhou na asserção de restauração do DOM descartável (345 px obtidos versus 352 px esperados). Esses dois comandos continuam registados como FAIL, não como prova de correção. Os contextos foram fechados e os ficheiros de referência/workspace não foram modificados. As conclusões deste relatório usam a comparação inicial, anterior e independente dessas sondas.
