# Fase 10H — Lote 1: decisões para revisão humana

Estado: **AI_CORRECTED_PENDING_HUMAN**, aplicado apenas no workspace de desenvolvimento; 0 aprovações humanas. Cada item pode ser aprovado ou rejeitado independentemente. Nenhum commit, push ou publicação foi efetuado. A matriz de 04-11 mantém o checkpoint original `.9`, incluindo os dois `NEEDS_FIX`; não é reescrita para simular aprovação.

Base Git: `c551cca958add939fee9a7b0e82d0734f5a2aa32`. Nova revisão de conteúdo: `2026-10-27.10`; é a continuação da série de identificadores, não a data desta revisão. `.9` fica congelada e passa a ser carregada por importação histórica. Schema de persistência/backup continua v1. Os 88 outros objetos, as 90 chaves, IDs, LOs, níveis, elegibilidade e estrutura do exame são preservados.

## Fontes e âmbito da evidência

- [ISTQB CTFL v4.0.1 EN](https://istqb.org/wp-content/uploads/2024/11/ISTQB_CTFL_Syllabus_v4.0.1.pdf): referência principal. §2.2.3, pp.30–31; LO FL-2.2.3/K2 na p.24. §5.5, pp.56–57; LO FL-5.5.1/K3 na p.47.
- [PSTQB, tradução oficial PT CTFL v4.0, v1.0](https://pstqb.pt/wp-content/uploads/2024/05/ISTQB_CTFL_Syllabus-v4.0-PT_v1.0.pdf): §2.2.3 p.33 e LO p.26; §5.5 pp.62–63 e LO p.52. A tradução disponível é v4.0, não uma tradução das erratas EN v4.0.1. Os conceitos usados nestas duas correções são concordantes.
- Hashes/downloads oficiais comparados: [sources-verified.json](sources-verified.json). Páginas são números físicos do PDF, contados desde 1; não se inventam referências a ISO/IEC/IEEE 29119-3 não consultada.
- Checkpoint e decisões anteriores: [matriz 90/90](../phase10h-2026-11-04/review-matrix.json), [registos H-001/H-007](../phase10h-2026-11-04/README.md), `docs/academic-audit.md` (Fase 5B tl-011) e `src/data/advanced-questions.ts` (item original tl-090).

As perguntas e chaves abaixo são material original TestLearn; não são perguntas nem gabaritos oficiais ISTQB. A solução foi conferida com os conceitos oficiais do syllabus.

## tl-011

- Achado: **H-001 / MEDIUM**, revisão AI, decisão humana pendente.
- LO/nível/fontes: FL-2.2.3 / K2 / §2.2.3; EN pp.24,30–31; PT pp.26,33.
- Versão: 2 → 3; chave publicada/proposta: `['o1']` → `['o1']`; **impacto de chave: nenhum**.
- Problema exato: O EN afirma “unaffected payment flows”, pressupondo ausência de impacto; o PT fala em implementação não alterada. A explicação “elsewhere/noutras áreas” restringe indevidamente a regressão, que também pode abranger o componente alterado. O enunciado EN/PT e as explicações geral/o1/o4 precisam de clarificação. As alternativas, chave e LO mantêm-se.
- Revisão de todas as alternativas: o1: confirmação verifica a correção e regressão procura efeitos adversos; o2 inverte a ordem; o3 trata incorretamente a segunda verificação como confirmação; o4 trata incorretamente a primeira como regressão. A finalidade explícita dos dois passos sustenta o1 sem mudar a chave.
- Risco/limitação: Baixo risco conceptual após revisão; risco técnico controlado pela nova revisão. Não ensinar que regressão só ocorre fora do componente modificado. Rever semanticamente ambas as línguas, não apenas procurar palavras.
- Recomendação: aceitar a correção como proposta para revisão humana; não promover a HUMAN_APPROVED. Rejeição de um item não impede decisão independente sobre o outro.

### Histórico preservado

- `2026-10-27.1`: versão 1, chave `['o1']`.
- `2026-10-27.2`: versão 1, chave `['o1']`.
- `2026-10-27.3`: versão 1, chave `['o1']`.
- `2026-10-27.4`: versão 1, chave `['o1']`.
- `2026-10-27.5`: versão 1, chave `['o1']`.
- `2026-10-27.6`: versão 1, chave `['o1']`.
- `2026-10-27.7`: versão 2, chave `['o1']`.
- `2026-10-27.8`: versão 2, chave `['o1']`.
- `2026-10-27.9`: versão 2, chave `['o1']`.

### Enunciado original e proposto

**PT original:** Após corrigir um defeito num desconto, a equipa repete o teste que falhou e verifica fluxos de pagamento não alterados. Que testes são, respetivamente?

**PT proposto:** Após corrigir um defeito num desconto, a equipa repete o teste que falhou anteriormente para verificar a correção. Testa também fluxos de pagamento cuja implementação não foi alterada, para procurar efeitos adversos da correção. Que testes são, respetivamente?

**EN original:** After fixing a discount defect, the team reruns its failing test and checks unaffected payment flows. What are these checks respectively?

**EN proposto:** After fixing a discount defect, the team reruns the test that previously failed to verify the fix. It also tests payment flows whose implementation was not changed, to check for adverse effects of the fix. What are these checks respectively?

### Alternativas e respetivas justificações

**o1** — correta

- PT original: Confirmação e regressão
- PT proposto: Confirmação e regressão
- Justificação PT original: A confirmação verifica a correção; a regressão procura efeitos adversos noutras áreas.
- Justificação PT proposta: A primeira verificação é teste de confirmação: verifica se o defeito original foi corrigido. A segunda é teste de regressão: procura consequências adversas da alteração. A regressão pode abranger o componente alterado, outros componentes, sistemas interligados ou o ambiente; uma implementação não alterada não garante um comportamento sem efeitos adversos.
- EN original: Confirmation and regression
- EN proposto: Confirmation and regression
- Justificação EN original: Confirmation verifies the fix; regression checks adverse effects elsewhere.
- Justificação EN proposta: The first check is confirmation testing: it verifies that the original defect was fixed. The second is regression testing: it checks for adverse consequences of the change. Regression can concern the changed component, other components, connected systems or the environment; unchanged implementation does not guarantee unaffected behavior.

**o2** — distrator

- PT original: Regressão e confirmação
- PT proposto: Regressão e confirmação
- Justificação PT original: A ordem está invertida.
- Justificação PT proposta: A ordem está invertida.
- EN original: Regression and confirmation
- EN proposto: Regression and confirmation
- Justificação EN original: The order is reversed.
- Justificação EN proposta: The order is reversed.

**o3** — distrator

- PT original: Ambos são testes de confirmação
- PT proposto: Ambos são testes de confirmação
- Justificação PT original: A confirmação verifica se o defeito original foi corrigido. Verificar outros fluxos de pagamento para detetar efeitos adversos da alteração é teste de regressão.
- Justificação PT proposta: A confirmação verifica se o defeito original foi corrigido. Verificar outros fluxos de pagamento para detetar efeitos adversos da alteração é teste de regressão.
- EN original: Both are confirmation testing
- EN proposto: Both are confirmation testing
- Justificação EN original: Confirmation checks whether the original defect was fixed. Checking other payment flows for adverse effects of the change is regression testing.
- Justificação EN proposta: Confirmation checks whether the original defect was fixed. Checking other payment flows for adverse effects of the change is regression testing.

**o4** — distrator

- PT original: Ambos são testes de regressão
- PT proposto: Ambos são testes de regressão
- Justificação PT original: A primeira verificação confirma especificamente a correção ao repetir o teste que falhava. A segunda procura efeitos adversos noutras áreas.
- Justificação PT proposta: A primeira verificação verifica a correção do defeito original, pelo que é teste de confirmação. A segunda procura consequências adversas da alteração, pelo que é teste de regressão.
- EN original: Both are regression testing
- EN proposto: Both are regression testing
- Justificação EN original: The first check specifically confirms the fix by repeating the previously failing test. The second checks for adverse effects elsewhere.
- Justificação EN proposta: The first check verifies the original defect fix, so it is confirmation testing. The second checks for adverse consequences of the change, so it is regression testing.

### Explicação geral

**PT original:** A confirmação verifica a correção; a regressão procura efeitos adversos noutras áreas.

**PT proposta:** A primeira verificação é teste de confirmação: verifica se o defeito original foi corrigido. A segunda é teste de regressão: procura consequências adversas da alteração. A regressão pode abranger o componente alterado, outros componentes, sistemas interligados ou o ambiente; uma implementação não alterada não garante um comportamento sem efeitos adversos.

**EN original:** Confirmation verifies the fix; regression checks adverse effects elsewhere.

**EN proposta:** The first check is confirmation testing: it verifies that the original defect was fixed. The second is regression testing: it checks for adverse consequences of the change. Regression can concern the changed component, other components, connected systems or the environment; unchanged implementation does not guarantee unaffected behavior.

### Decisão humana independente

- Decisão: **PENDENTE**.
- Revisor/data/fundamentação: por preencher pelo revisor humano.
- Aceitar/rejeitar enunciado, equivalência EN/PT, explicações e alinhamento LO/K; chave permanece publicada. Qualquer proposta de mudar a chave exige autorização explícita adicional.
- Testes e evidência: [verification.md](verification.md); hashes dos objetos antes/depois em [records.json](records.json).

## tl-090

- Achado: **H-007 / MEDIUM**, revisão AI, decisão humana pendente.
- LO/nível/fontes: FL-5.5.1 / K3 / §5.5; EN pp.47,56–57; PT pp.52,62–63.
- Versão: 1 → 2; chave publicada/proposta: `['o2']` → `['o2']`; **impacto de chave: nenhum**.
- Problema exato: Não existe uma referência a um caso de teste T-91 ausente. T-91 é o identificador da transferência. A própria tabela documenta “no T-91 / T-91 inexistente” antes de “create draft T-91”. As quatro alternativas omitiam essa pré-condição, embora o1/o2/o3/o4 declarassem passos completos. Repor a ausência em todas evita sugerir a resposta correta por completude apenas em o2. Clarificar explicações geral/o2; não inventar caso de teste nem causa para HTTP 409.
- Revisão de todas as alternativas: o1 inverte stock esperado/obtido (esperado 20−2=18, observado 20); o2 preserva QA/inventory-3.8.1, stock-clerk, SKU-4, ausência inicial de T-91, criação com quantidade 2 e uma confirmação, estado esperado Confirmed, observado Draft/HTTP 409, anexos req-b7/shot-b7 e causa não estabelecida; o3 acrescenta segunda confirmação não observada; o4 transforma uma hipótese de deadlock em causa confirmada. A chave o2 permanece única.
- Risco/limitação: Baixo risco de chave; verificar que as quatro alternativas recebem a mesma pré-condição e que números, eventos e anexos não mudam. Limite académico mantido: selecionar uma reparação aplica regras de preparação, mas não demonstra redação independente de um relatório completo K3.
- Recomendação: aceitar a correção como proposta para revisão humana; não promover a HUMAN_APPROVED. Rejeição de um item não impede decisão independente sobre o outro.

### Histórico preservado

- `2026-10-27.1`: item ainda não existente.
- `2026-10-27.2`: item ainda não existente.
- `2026-10-27.3`: item ainda não existente.
- `2026-10-27.4`: item ainda não existente.
- `2026-10-27.5`: item ainda não existente.
- `2026-10-27.6`: item ainda não existente.
- `2026-10-27.7`: item ainda não existente.
- `2026-10-27.8`: item ainda não existente.
- `2026-10-27.9`: versão 1, chave `['o2']`.

### Enunciado original e proposto

**PT original:** A evidência abaixo provém de um teste isolado com uma transferência sintética. Um colega redige: QA / inventory-3.8.1; passos: "Confirmar transferência"; esperado: stock 20, Confirmed; obtido: stock 18, Draft, HTTP 409; diagnóstico: "bloqueio mútuo na base de dados confirmado"; evidência: nenhum anexo. Manter os campos de ambiente/versão. Que substituição dos restantes campos prepara um relatório exato e reproduzível sustentado pela evidência?

**PT proposto:** A evidência abaixo provém de um teste isolado com uma transferência sintética. Um colega redige: QA / inventory-3.8.1; passos: "Confirmar transferência"; esperado: stock 20, Confirmed; obtido: stock 18, Draft, HTTP 409; diagnóstico: "bloqueio mútuo na base de dados confirmado"; evidência: nenhum anexo. Manter os campos de ambiente/versão. Que substituição dos restantes campos prepara um relatório exato e reproduzível sustentado pela evidência?

**EN original:** Evidence below is from an isolated test with a synthetic transfer. A colleague drafts: QA / inventory-3.8.1; steps: "Confirm transfer"; expected: stock 20, Confirmed; actual: stock 18, Draft, HTTP 409; diagnosis: "database deadlock confirmed"; evidence: none attached. Keep the environment/build fields. Which replacement for the other fields prepares an accurate reproducible report supported by the evidence?

**EN proposto:** Evidence below is from an isolated test with a synthetic transfer. A colleague drafts: QA / inventory-3.8.1; steps: "Confirm transfer"; expected: stock 20, Confirmed; actual: stock 18, Draft, HTTP 409; diagnosis: "database deadlock confirmed"; evidence: none attached. Keep the environment/build fields. Which replacement for the other fields prepares an accurate reproducible report supported by the evidence?

### Tabela original mantida, sem qualquer alteração

| Evidence / Evidência                | Observed or agreed data / Dados observados ou acordados                                                          |
| ----------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Environment/build / Ambiente/versão | QA / inventory-3.8.1                                                                                             |
| Precondition / Pré-condição         | stock-clerk; SKU-4 stock 20; no T-91 / T-91 inexistente                                                          |
| Input/action / Entrada/ação         | create draft T-91, SKU-4, quantity 2; Confirm once / criar rascunho T-91, SKU-4, quantidade 2; Confirmar uma vez |
| Agreed / Acordado                   | reduce stock by quantity and set Confirmed / reduzir stock pela quantidade e definir Confirmed                   |
| Actual / Obtido                     | stock 20; Draft; HTTP 409                                                                                        |
| Available / Disponível              | req-b7: one POST, HTTP 409 / um POST, HTTP 409; shot-b7: not confirmed / não confirmado                          |

### Alternativas e respetivas justificações

**o1** — distrator

- PT original: Passos: stock-clerk, SKU-4 com stock 20, criar rascunho T-91 com quantidade 2, Confirmar uma vez; esperado: 20, Confirmed; obtido: 18, Draft, HTTP 409; evidência: req-b7 + shot-b7; causa não estabelecida.
- PT proposto: Passos: stock-clerk, SKU-4 com stock 20, T-91 inexistente, criar rascunho T-91 com quantidade 2, Confirmar uma vez; esperado: 20, Confirmed; obtido: 18, Draft, HTTP 409; evidência: req-b7 + shot-b7; causa não estabelecida.
- Justificação PT original: Isto mantém as quantidades invertidas. Partindo de 20, uma transferência bem-sucedida de 2 deve deixar 18; o stock observado mantém-se em 20.
- Justificação PT proposta: Isto mantém as quantidades invertidas. Partindo de 20, uma transferência bem-sucedida de 2 deve deixar 18; o stock observado mantém-se em 20.
- EN original: Steps: stock-clerk, SKU-4 stock 20, create draft T-91 quantity 2, Confirm once; expected: 20, Confirmed; actual: 18, Draft, HTTP 409; evidence: req-b7 + shot-b7; cause not established.
- EN proposto: Steps: stock-clerk, SKU-4 stock 20, no existing T-91, create draft T-91 quantity 2, Confirm once; expected: 20, Confirmed; actual: 18, Draft, HTTP 409; evidence: req-b7 + shot-b7; cause not established.
- Justificação EN original: This retains the reversed quantities. Starting at 20, a successful transfer of 2 should leave 18; the observed stock remains 20.
- Justificação EN proposta: This retains the reversed quantities. Starting at 20, a successful transfer of 2 should leave 18; the observed stock remains 20.

**o2** — correta

- PT original: Passos: stock-clerk, SKU-4 com stock 20, criar rascunho T-91 com quantidade 2, Confirmar uma vez; esperado: 18, Confirmed; obtido: 20, Draft, HTTP 409; evidência: req-b7 + shot-b7; causa não estabelecida.
- PT proposto: Passos: stock-clerk, SKU-4 com stock 20, T-91 inexistente, criar rascunho T-91 com quantidade 2, Confirmar uma vez; esperado: 18, Confirmed; obtido: 20, Draft, HTTP 409; evidência: req-b7 + shot-b7; causa não estabelecida.
- Justificação PT original: Isto repõe pré-condições/dados/passo, deriva corretamente a quantidade esperada, preserva as observações obtidas e cita a evidência disponível sem afirmar uma causa.
- Justificação PT proposta: Repõe a função, o stock inicial e a inexistência de T-91 antes de criar o rascunho, preserva o único passo de confirmação, deriva o stock esperado 18 de 20 − 2 e regista o stock observado 20, Draft e HTTP 409 com as evidências disponíveis, sem afirmar uma causa.
- EN original: Steps: stock-clerk, SKU-4 stock 20, create draft T-91 quantity 2, Confirm once; expected: 18, Confirmed; actual: 20, Draft, HTTP 409; evidence: req-b7 + shot-b7; cause not established.
- EN proposto: Steps: stock-clerk, SKU-4 stock 20, no existing T-91, create draft T-91 quantity 2, Confirm once; expected: 18, Confirmed; actual: 20, Draft, HTTP 409; evidence: req-b7 + shot-b7; cause not established.
- Justificação EN original: This restores the preconditions/data/step, derives the expected quantity correctly, preserves actual observations and cites the available evidence without asserting a cause.
- Justificação EN proposta: This restores the role, initial stock and absence of T-91 before creating the draft, preserves the single confirmation step, derives expected stock 18 from 20 − 2, and reports the actual stock 20, Draft and HTTP 409 with the available evidence, without asserting a cause.

**o3** — distrator

- PT original: Passos: stock-clerk, SKU-4 com stock 20, criar rascunho T-91 com quantidade 2, Confirmar duas vezes; esperado: 18, Confirmed; obtido: 20, Draft, HTTP 409; evidência: req-b7 + shot-b7; causa não estabelecida.
- PT proposto: Passos: stock-clerk, SKU-4 com stock 20, T-91 inexistente, criar rascunho T-91 com quantidade 2, Confirmar duas vezes; esperado: 18, Confirmed; obtido: 20, Draft, HTTP 409; evidência: req-b7 + shot-b7; causa não estabelecida.
- Justificação PT original: O teste observado premiu Confirmar uma vez. Acrescentar uma segunda pressão altera o procedimento de reprodução em vez de documentar a evidência.
- Justificação PT proposta: O teste observado premiu Confirmar uma vez. Acrescentar uma segunda pressão altera o procedimento de reprodução em vez de documentar a evidência.
- EN original: Steps: stock-clerk, SKU-4 stock 20, create draft T-91 quantity 2, Confirm twice; expected: 18, Confirmed; actual: 20, Draft, HTTP 409; evidence: req-b7 + shot-b7; cause not established.
- EN proposto: Steps: stock-clerk, SKU-4 stock 20, no existing T-91, create draft T-91 quantity 2, Confirm twice; expected: 18, Confirmed; actual: 20, Draft, HTTP 409; evidence: req-b7 + shot-b7; cause not established.
- Justificação EN original: The observed test pressed Confirm once. Adding a second press changes the reproduction procedure rather than documenting the evidence.
- Justificação EN proposta: The observed test pressed Confirm once. Adding a second press changes the reproduction procedure rather than documenting the evidence.

**o4** — distrator

- PT original: Passos: stock-clerk, SKU-4 com stock 20, criar rascunho T-91 com quantidade 2, Confirmar uma vez; esperado: 18, Confirmed; obtido: 20, Draft, HTTP 409; evidência: req-b7 + shot-b7; bloqueio mútuo na base de dados confirmado.
- PT proposto: Passos: stock-clerk, SKU-4 com stock 20, T-91 inexistente, criar rascunho T-91 com quantidade 2, Confirmar uma vez; esperado: 18, Confirmed; obtido: 20, Draft, HTTP 409; evidência: req-b7 + shot-b7; bloqueio mútuo na base de dados confirmado.
- Justificação PT original: O erro HTTP e o stock inalterado não demonstram um bloqueio mútuo na base de dados. Uma hipótese não deve ser apresentada como causa confirmada sem evidência que a suporte.
- Justificação PT proposta: O erro HTTP e o stock inalterado não demonstram um bloqueio mútuo na base de dados. Uma hipótese não deve ser apresentada como causa confirmada sem evidência que a suporte.
- EN original: Steps: stock-clerk, SKU-4 stock 20, create draft T-91 quantity 2, Confirm once; expected: 18, Confirmed; actual: 20, Draft, HTTP 409; evidence: req-b7 + shot-b7; database deadlock confirmed.
- EN proposto: Steps: stock-clerk, SKU-4 stock 20, no existing T-91, create draft T-91 quantity 2, Confirm once; expected: 18, Confirmed; actual: 20, Draft, HTTP 409; evidence: req-b7 + shot-b7; database deadlock confirmed.
- Justificação EN original: The HTTP error and unchanged stock do not establish a database deadlock. A hypothesis must not be presented as a confirmed cause without supporting evidence.
- Justificação EN proposta: The HTTP error and unchanged stock do not establish a database deadlock. A hypothesis must not be presented as a confirmed cause without supporting evidence.

### Explicação geral

**PT original:** Manter os campos QA/versão verificados. Registar o papel stock-clerk, SKU-4 com stock inicial 20, criação do rascunho T-91 com quantidade 2 e uma ação Confirmar. A alteração de stock acordada é 20−2=18 com estado Confirmed; a observação obtida é stock 20, Draft e HTTP 409. Anexar req-b7 e shot-b7; a causa continua não estabelecida. Selecionar uma correção aplica regras de preparação de relatórios, mas não substitui escrever um relatório de forma autónoma.

**PT proposta:** A pré-condição documentada é a inexistência da transferência T-91 antes de criar o seu rascunho; T-91 é um identificador de transferência, não um caso de teste. Registar a função stock-clerk, stock 20 de SKU-4, T-91 inexistente, criação do rascunho T-91 com quantidade 2 e Confirmar uma vez. Esperado: 20 − 2 = 18 e Confirmed. Observado: stock 20, Draft e HTTP 409. Referenciar req-b7 e shot-b7; nenhum anexo estabelece a causa. Selecionar uma correção aplica regras de preparação de relatórios, mas não substitui a redação independente de um relatório.

**EN original:** Keep the verified QA/build fields. Record role stock-clerk, initial SKU-4 stock 20, creation of draft T-91 quantity 2 and one Confirm action. The agreed stock change is 20−2=18 with status Confirmed; the actual observation is stock 20, Draft and HTTP 409. Attach req-b7 and shot-b7; the cause remains unestablished. Selecting a repair applies report preparation rules, but does not replace independently writing a report.

**EN proposta:** The documented precondition is that transfer T-91 does not exist before creating its draft; T-91 is a transfer identifier, not a test case. Record the stock-clerk role, SKU-4 stock 20, no existing T-91, creation of draft T-91 quantity 2 and Confirm once. Expected: 20 − 2 = 18 and Confirmed. Actual: stock 20, Draft and HTTP 409. Cite req-b7 and shot-b7; neither attachment establishes the cause. Selecting a repair applies report preparation rules, but does not replace independently writing a report.

### Decisão humana independente

- Decisão: **PENDENTE**.
- Revisor/data/fundamentação: por preencher pelo revisor humano.
- Aceitar/rejeitar enunciado, equivalência EN/PT, explicações e alinhamento LO/K; chave permanece publicada. Qualquer proposta de mudar a chave exige autorização explícita adicional.
- Testes e evidência: [verification.md](verification.md); hashes dos objetos antes/depois em [records.json](records.json).
