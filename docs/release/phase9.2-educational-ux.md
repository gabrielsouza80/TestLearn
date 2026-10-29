# Fase 9.2 — clareza educativa e revisão de respostas

29-10-2026. Revisão de conteúdo **2026-10-27.9**, sem `.10`. Baseline: `e42f4533398e346b2c156b5063581fd1c27e2d2e`, working tree limpo antes desta fase. Alterações locais, sem commit, push, publicação ou deploy. O relatório da fase 9 é evidência histórica; este documento e `release-readiness.json` identificam a validação atual.

## Problemas reproduzidos e alterações

| Antes                                                       | Depois                                                                                                                                                                                                        |
| ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Códigos FL e níveis K sem significado acessível             | Catálogo central dos 64 LO, capítulo, secção, descrição, K e páginas; ajuda nativa expansível por teclado nos filtros, metadados de prática e ajuda pública                                                   |
| Lista extensa de LO sem contexto; combinações incompatíveis | Tópicos/LO agrupados por capítulo, ordem natural, descrições legíveis, dependências limpas quando muda a seleção                                                                                              |
| Histórico dos filtros pouco explicado                       | Texto descreve o comportamento real: erro anterior inclui resposta parcial/branca e não desaparece após acerto; branco inclui perguntas não abertas; nunca vista usa visitas registadas em sessões concluídas |
| Quantidade pedida pouco relacionada com a seleção           | Contagem dinâmica, limites, mensagem de seleção vazia e validação; retomar uma sessão existente continua disponível                                                                                           |
| Origem e apoio técnico pouco claros                         | Secção «Sobre esta questão» distingue autoria original assistida por IA de referência técnica; faltas de proveniência têm estado explícito                                                                    |
| Alternativas sem letras                                     | A–E pela posição visual guardada, sem converter `o1` em A; mesma ordem na tentativa e na revisão                                                                                                              |
| Revisão confundia incorretas com perguntas em branco        | Estados correta/incorreta/sem resposta, texto e ícones além de cor; resposta selecionada e correta identificadas; todas as alternativas e justificações acessíveis                                            |
| Filtro de revisão incompleto                                | Todas/corretas/incorretas/sem resposta com contagens, estado vazio e navegação focável; numeração original preservada                                                                                         |
| Resultado com pontuação ambígua                             | Percentagem, contagens, resultado explícito face a 26/40 apenas em exame alinhado; prática por tópico neutra, sem classificação de certificação                                                               |

Foram extraídos componentes pequenos em `src/learning`, reutilizando os objetos reais e as funções existentes de resolução/pontuação. Não se alterou seleção, blueprint, temporizador, domínio, persistência, esquema de sessões ou dependências. A identidade visual mantém-se; o espaçamento e a hierarquia da revisão foram ajustados sem redesenho global.

## Catálogo e referências verificadas

`src/reference/learning-objectives.json` contém **64/64 LO**. Extração independente dos PDFs locais e comparação de IDs, nível, descrição EN e página física. Páginas dos blocos de LO: EN 14/24/32/38/47/58; PT 15/26/35/41/52/64. Dois pins em `tests/fixtures/objective-reference.ts` verificam o corpus EN e a redação PT original sem exigir distribuir PDFs nos testes.

- EN: [ISTQB Certified Tester Foundation Level Syllabus v4.0.1](https://istqb.org/?download_id=3345&sdm_process_download=1), SHA-256 local `3b072f81db5c7671aadacc42553e726faa93913a969cc7a89e9dc28c2318d1f1`.
- PT: [ISTQB CTFL Syllabus v4.0 — PT v1.0](https://pstqb.pt/wp-content/uploads/2024/05/ISTQB_CTFL_Syllabus-v4.0-PT_v1.0.pdf). Não existe neste projeto uma tradução oficial PT de 4.0.1 que possa ser presumida.

A interface identifica as versões e a natureza da redação PT. Sessenta descrições preservam a redação PT original. Quatro equivalentes TestLearn, conferidos com EN 4.0.1 e PT 4.0, têm a redação original e a nota de localização conservadas no catálogo:

| LO       | Diferença tratada no catálogo, sem alterar perguntas                                      |
| -------- | ----------------------------------------------------------------------------------------- |
| FL-1.4.1 | EN «Explain» em vez do anterior PT «Resumir»: «Explicar»                                  |
| FL-2.1.1 | Tornar explícito o ciclo de vida «escolhido»                                              |
| FL-3.1.1 | EN atual refere produtos de trabalho examináveis por testes estáticos                     |
| FL-3.2.1 | Feedback antecipado/frequente **dos** stakeholders, evitando inverter a direção com «aos» |

Estas quatro formulações não são apresentadas como citações oficiais PT 4.0.1. A revisão linguística foi assistida por IA, não aprovação humana. K1/K2/K3 têm definições bilingues; K3 não implica necessariamente maior dificuldade ou extensão. Foram visualmente conferidas páginas de LO EN/PT; as restantes comparações usam a extração textual dos documentos reais. Não foram copiados enunciados de exames oficiais.

Nos **90/90** itens atuais, os registos existentes documentam origem original, revisão por IA e referência. Os identificadores de secção foram localizados nas páginas EN citadas em **90/90** casos. Esta verificação de localização não substitui nova auditoria académica de cada afirmação. O texto explica que a referência apoia a matéria/resposta, e não a proveniência de uma cópia. Mostra título, versão, secção, LO, páginas e ligações oficiais verificadas; atribui os excertos dos LO ao ISTQB/autores. Não se distribuem PDFs ou logótipos oficiais. Revisões antigas com metadados insuficientes mostram «Origem não totalmente documentada»/referência indisponível, sem completar retroativamente os arquivos.

## Estados, letras e resultados

As letras são calculadas sobre `session.optionOrder[id]` usando a pergunta da revisão da sessão. IDs internos, chaves e cardinalidade não mudam. Testes abrangem alternativas com três, quatro e cinco opções, troca EN/PT e reload. Respostas múltiplas exigem o conjunto exato, sem crédito parcial. Uma escolha correta mais uma errada é incorreta; zero escolhas é sem resposta.

As opções corretas e as incorretas selecionadas mostram logo a justificação; distratores não selecionados têm controlo expansível com a sua justificação integral. Enunciados, tabelas e explicações usam o conteúdo original da revisão correspondente. A revisão mantém «Questão N de total», mesmo filtrada. A navegação leva o foco ao título da questão.

O limiar **26/40 (65%)** só é apresentado para sessão concluída, modo exame, revisão com blueprint e seleção efetivamente conforme. 26 aprova a simulação e 25 não aprova. Não se trata de aprovação ISTQB/PSTQB nem de previsão de certificação. Prática por tópico e exames históricos não alinhados recebem resumo neutro. A classificação e a pontuação originais continuam a ser calculadas pelo motor existente.

Brancos não pontuam; terminar cedo ou expirar com 40 brancos mostra zero incorretas e 40 sem resposta. Tempo é diferença fiável entre timestamps existentes, incluindo inatividade; dados insuficientes mostram indisponível. O limite provém da sessão guardada. O esquema não guarda motivo de conclusão: a interface declara essa ausência, sem inferir expiração ou conclusão manual. Nenhuma migração foi introduzida.

Durante exame ativo, não são mostradas referências específicas, explicações ou ajuda específica do LO que possam dar pistas. A ajuda genérica de K continua disponível. As referências completas aparecem no feedback de prática e na revisão concluída.

## Integridade e regressão

**90 perguntas / 364 alternativas / 64 LO / 29 grupos** antes e depois. Igualdade profunda do banco executável com o preflight e o snapshot `.9`, incluindo textos, traduções, chaves, metadados e estados humanos. Os nove hashes `.1`–`.9` e todos os materiais privados da fase 8 mantêm-se. Snapshot `.9`: `89a0d7b2483afbbd279f7a1d9ac707d1ce9b4e049225be88a59c0dd30cd42bb2`. Nenhum ficheiro de dados/domínio/storage/package/lock/configuração Playwright foi alterado.

**1 000 seeds**, IDs únicos e determinismo confirmados com oracle independente: 40 perguntas, quotas de capítulos **8/6/4/11/9/2**, K **8/24/8**, quotas e diversidade dos 29 grupos, chaves estáveis após baralhar. Casos históricos exercitam os textos, escolhas, ordem, chaves, resultados e timestamps originais, carregamento pendente/erro/retry, sem fallback para o banco atual.

| Comando executado                            | Resultado final                                                                            |
| -------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `npm run typecheck`                          | PASS, exit 0                                                                               |
| `npm run lint`                               | PASS, exit 0                                                                               |
| `npm run format:check`                       | PASS, exit 0; repetido após documentação final                                             |
| `npm test`                                   | **165/165**, 20 ficheiros, 16,86 s                                                         |
| `npm run build`                              | PASS, exit 0; aviso de chunk >500 kB permanece                                             |
| `npm run test:e2e`                           | **100/100**, Chromium desktop e viewport móvel, oito workers, zero retries locais, 1,0 min |
| `node scripts/check-release.mjs`             | PASS, oito chunks históricos lazy, zero assets privados/source maps                        |
| `node --test scripts/check-release.test.mjs` | **8/8**, exit 0                                                                            |
| Integridade/oracle de 1 000 seeds            | PASS                                                                                       |

Novos casos: 13 unitários, cinco de integração com interação real e sete E2E executados em dois projetos. Não foram desativados testes ou assertions, aumentados timeouts ou alterados retries/workers. Seletores de grupo de resposta passaram a usar o nome acessível: os novos `details` nativos também têm papel `group`, tornando os seletores genéricos ambíguos. As verificações do conteúdo original continuam exatas.

Falhas intermédias registadas: opção `exact` de Playwright aplicada indevidamente a Testing Library (corrigida antes da execução); import de tipo não utilizado após extração (removido); primeira execução específica 9/14, por ambiguidade dos grupos e reload antes da gravação; execução específica seguinte 14/14. Primeira suite completa 98/100: expectativa antiga de «K2» sem o novo significado. Segunda 99/100: outro reload imediato de teste legado antes da gravação assíncrona. Testes passam agora por verificação da gravação real, sem sleeps; terceira suite completa 100/100. O mecanismo assíncrono existente não foi reescrito.

## Acessibilidade, desempenho e limites

Evidência de teclado, nomes/descrições acessíveis, radios/checkboxes, foco, semântica de tabelas e estados textuais nos testes de interação e axe, em desktop e emulação móvel. O reflow foi exercitado de 320 a 1920 px. Os limites de avaliação manual e as medições desta fase constam da secção final e do JSON de release; não se afirma conformidade WCAG integral.

Inspeção visual dos filtros desktop, revisão mista desktop e resumo móvel a 320 px. A revisão mista foi também verificada com axe e sem overflow horizontal a 1280/640/320 px, equivalentes de viewport para reflow a 100/200/400% a partir de 1280 px. **Não é zoom real do browser.** Uma primeira sonda com CSS `zoom: 4` produziu overflow porque não ajustava o viewport/media queries; esse resultado foi retido no log e não usado como prova de zoom. A medição foi corrigida para testar viewports explícitos. Leitor de ecrã, zoom real, Firefox/WebKit e dispositivos físicos continuam por verificar.

| Artefacto                | Antes (HEAD reconstruído) |      Depois |
| ------------------------ | ------------------------: | ----------: |
| JS inicial               |                 629 032 B |   671 699 B |
| JS inicial gzip          |                 193 417 B |   202 402 B |
| CSS                      |                  13 854 B |    15 696 B |
| CSS gzip                 |                   3 624 B |     4 035 B |
| JS total, incluindo lazy |               1 830 839 B | 1 873 506 B |

Aumento de 42 667 B de JS inicial (+6,78%), 8 985 B gzip (+4,65%), por catálogo bilingue e apresentação educativa. Oito arquivos históricos continuam separados. O aviso >500 kB é divulgado; não se mudou o limite nem se fez otimização arquitetural fora de âmbito. O controlo de distribuição recusa ficheiros inesperados, PDFs, mapas e material privado. Não há novas dependências, tracking ou serviços externos; as ligações oficiais só abrem por ação do utilizador.

O grafo final tem zero arquivos históricos na entrada e zero módulos privados/docs/tmp. Painel novo e criação de exame pedem zero chunks históricos. A comparação local isolada, sem suite paralela, usou três contextos novos e três reloads por build em Chromium 156.0.8078.4, sem throttling. Tempos do painel frio antes: 910/225/238 ms; depois: 1623/364/255 ms. Medianas: 238,4 → 364,2 ms a frio e 53,6 → 56,5 ms em reload; início de exame após painel: medianas frias 170,2 → 91,2 ms. Todas as observações, incluindo os primeiros arranques lentos, estão conservadas. Amostra pequena e ordem sequencial antes/depois: não permite atribuir causalidade, prometer desempenho equivalente ou substituir benchmark em dispositivo modesto. O aumento de bundle é real e deve ser acompanhado numa fase de desempenho posterior.

## Decisão e próximos passos

`PUBLICATION_AUTHORIZED = NO`; `PUBLIC_BETA_READY = BLOCKED`; aprovação académica humana **PENDING** e calibração psicométrica/piloto real **NOT_TESTED**. O PASS técnico local não remove estes gates.

- **P0 externos:** titular/contacto, direitos e avisos finais, host/HTTPS/headers/logs/retenção/rollback, aprovação do snapshot exato e autorização de publicar.
- **P1:** nenhum defeito novo confirmado por resolver no âmbito validado; não equivale a auditoria universal.
- **P2:** aviso de bundle, browsers Firefox/WebKit e dispositivos físicos, leitores de ecrã e zoom real, stress prolongado e dispositivos modestos; revisão académica humana e piloto real continuam pendentes. Existe janela breve antes da conclusão da gravação assíncrona: reload/fecho imediato pode perder a última interação ainda não gravada; os testes de recuperação aguardam o estado persistido, e não prometem durabilidade antes disso.

Evidência local em `tmp/phase92`: preflight, extração oficial e pins, referências, logs de todas as tentativas, igualdade/hashes/seeds, inventário, medições e screenshots. Nada desta pasta é publicado. Próxima ação recomendada: revisão manual com leitor de ecrã e zoom real, seguida das decisões externas do responsável; qualquer alteração posterior exige QA proporcional antes de autorizar publicação.
