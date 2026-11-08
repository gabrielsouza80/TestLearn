# Fase 10I — preparação do primeiro ciclo controlado

Data: 08-11-2026. Estado: **PLANO, NÃO EXECUTADO**. Não autoriza publicação, recrutamento automático ou recolha de dados. Não encerra a Fase 10H.

## Decisão do proprietário e limites

Na instrução desta execução, Gabriel decidiu adiar a análise por especialista humano. Regista-se esse adiamento como risco aceite **para preparar o piloto**, sem alterar as aceitações anteriores, os pareceres académicos ou `humanApproval: PENDING`. Não é `HUMAN_APPROVED`, certificação SME, aceitação de qualquer nova redação ou autorização de produção.

- `tl-038`: mantém `BLOCKED_HUMAN_DECISION`, FL-5.5.1/K3, chave `o1`. A dúvida é a operação cognitiva exigida, não um erro demonstrado na chave. O aviso público solicitado é uma medida de transparência na apresentação, não resolução do bloqueio.
- `tl-078`: atenção interna à calibração K3 e comparação com `tl-038`; sem bloqueio equivalente ou aviso público autorizado.
- `tl-011` e `tl-090`: correções assistidas por IA e aceites de âmbito exato anteriores preservados; validação académica humana independente pendente.
- Os 90 objetos continuam com aprovação humana pendente. A revisão técnica de 16 lotes não substitui validação pedagógica humana.
- O P1 de JavaScript histórico/404 referido pelo proprietário permanece um risco técnico separado. Não foi novamente consultada a produção nesta execução. Resultados locais não demonstram retenção no domínio público. O aviso não corrige cache, retenção, recuperação nem o P1.

## Âmbito e preparação executável

Reutilizar o [protótipo local existente](advanced-interpretation/prototype-local.md), a [especificação](advanced-interpretation/spec.md) e o [piloto original de dez itens](advanced-interpretation/pilot-v1.json). Os IDs `exp-ai-*` são experimentais e separados do banco de 90 questões e da estrutura do exame. Não são questões oficiais ISTQB nem itens humanamente aprovados. As descrições antigas nesses documentos são checkpoints históricos; este plano regista a situação atual sem os reescrever.

O ciclo 1 é de usabilidade e calibração exploratória, não validação de eficácia pedagógica ou psicométrica. Não adicionar persistência ao protótipo nem habilitar funcionalidades experimentais no build de produção.

Antes de executar, o responsável deve:

1. Fixar branch, HEAD, diff permitido, revisão `.10` e hashes do banco, nove históricos e `pilot-v1.json`. O código pode estar não commitado: HEAD isolado não identifica a versão testada; guardar também o inventário do diff e hashes dos ficheiros alterados.
2. Executar `npm run typecheck`, `npm run lint`, `npm test`, `npm run build`, `node scripts/check-release.mjs`, `node scripts/check-retained-assets.mjs`, `node scripts/check-advanced-isolation.mjs` e os testes Playwright relevantes. Para o treino local, executar adicionalmente `node node_modules/@playwright/test/cli.js test --config playwright.advanced.config.ts`, após ler a configuração. São requisitos futuros do ciclo, não resultados desta execução.
3. Verificar a referência congelada dos 90 objetos, as nove revisões e o isolamento dos dez itens experimentais. Não usar o guard académico legado de âmbito antigo como se aceitasse automaticamente estes novos ficheiros; manter esse guard intacto e documentar o contrato aplicável.
4. Confirmar que nenhuma sessão real, backup privado ou perfil pessoal será utilizado. Abrir perfis de navegador de teste, sem importar dados existentes, e criar exclusivamente sessões sintéticas. Não limpar LocalStorage de perfis reais.
5. Obter confirmação explícita para executar o ciclo e para os participantes escolhidos. O adiamento académico já registado permite esta preparação, não presume aceite dos participantes, publicação ou aprovação de itens.
6. Iniciar apenas em localhost com `npm run dev`; entrar no treino por `/?training=advanced`. A rota existe no desenvolvimento; o build de produção deve continuar a excluí-la. Não partilhar uma URL de produção ou criar um deployment.

## Participantes e duração proposta

Um facilitador QA e cinco participantes adultos voluntários: Gabriel como P01 e quatro aprendentes P02–P05. Procurar pelo menos dois que consigam comparar PT/EN, sem exigir certificação. Um especialista académico será necessário para adjudicar conteúdo posteriormente; não inventar a sua participação agora.

Primeiro realizar um ensaio técnico do facilitador com dados sintéticos; só depois agendar os cinco participantes. Cada sessão: 35–45 minutos, com possibilidade de pausa, sem ranking ou pressão por velocidade. É uma amostra pequena de conveniência, incapaz de demonstrar ganhos generalizáveis.

## Roteiro de cada sessão

| Etapa                    | Ação                                                                                                                            | Evidência mínima                                                          |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| Introdução, 5 min        | Explicar caráter experimental, revisão humana adiada, liberdade de parar e feedback sem dados pessoais                          | Consentimento para a sessão; código P01–P05                               |
| Transparência, 5 min     | Abrir prática sintética com `tl-038`, alternar PT/EN, ler o aviso e responder; comparar com `tl-078` sem aviso                  | Compreensão do aviso, eventual confusão, navegação e pontuação observadas |
| Treino guiado, 15–20 min | Executar os dez itens originais `exp-ai-*` no protótipo existente; alternar idioma em dois itens; usar teclado em pelo menos um | Confirmações, dificuldades e assistência, por ID e revisão                |
| Restrições, 5 min        | Pausar/retomar, mudar foco e regressar, quando suportado; consultar feedback apenas após confirmação                            | Comportamento observado versus funcionalidades realmente existentes       |
| Encerramento, 5–10 min   | Perguntar o que tornou uma alternativa plausível e onde o texto foi ambíguo; terminar sem exportar armazenamento pessoal        | Dois exemplos concretos, avaliação de clareza e confiança opcional        |

Se uma ação não existir no protótipo, registar a limitação e não improvisar uma alteração funcional. Repetições do mesmo item devem ser marcadas como repetição; não servem de prova de transferência de aprendizagem. Não comparar diretamente resultados dos itens originais com os experimentais como se fossem instrumentos equivalentes.

## Recolha mínima e conservação

Sem instalar analytics ou enviar telemetria. O facilitador mantém uma folha local de acesso restrito, fora de Git, com: código de participante, ID/revisão do item, idioma, primeira exposição/repetição, assistência, resposta/resultado sintético quando necessário, tempo observado aproximado, problema descrito e gravidade. Atribuição de causa (leitura/conceito/cálculo/tempo/não sei) é autorrelato opcional, não diagnóstico.

Não recolher nomes, emails, contas, tokens, gravações, perfis de navegador ou backups reais. Não chamar a tempo de browser “tempo de compreensão”. Se o protótipo não exporta uma métrica, não afirmar que a recolheu automaticamente. Eliminar as notas individuais após 30 dias; conservar somente um resumo agregado sem identificação. Não executar eliminação automática nesta tarefa.

## Critérios de avanço do ciclo

- Zero perda de dados, alteração de banco/históricos, revelação prematura de respostas ou fuga de conteúdo experimental para produção.
- Todos os cinco participantes que concluírem conseguem identificar que o aviso não altera resposta/pontuação e não representa aprovação académica. Se houver desistência, registar denominadores reais; não inventar cinco conclusões.
- Pelo menos quatro dos cinco concluem o percurso guiado e a alternância de idioma sem intervenção técnica; apoio pedagógico e apoio técnico são registados separadamente.
- Nenhum problema de acessibilidade bloqueante ou layout que impeça ler/selecionar em 320 px e com texto a 200%; teclado e nome/descrição do aviso acessíveis.
- Todas as dúvidas sobre gabaritos, tradução, unicidade e K3 entram num registo por ID/hash para decisão humana. Não exigir percentagem de acerto para aceitar uma interface nem aceitar conteúdo porque a maioria concordou.
- O responsável revê o resumo e decide explicitamente o próximo ciclo. Um ciclo tecnicamente satisfatório permite planear nova iteração; não encerra a Fase 10H nem autoriza produção.

## Paragem e resposta a incidentes

Parar imediatamente perante: mudança de qualquer objeto/histórico; pontuação diferente para a mesma seleção; resposta exposta antes de confirmação; perda de sessão/dados; acesso a dados reais; regressão que impeça teclado/leitor de ecrã; erro técnico impeditivo; fuga de itens `exp-ai-*` para build de produção; falha crítica de guard; fonte essencial indisponível sem referência local autenticada.

Suspender o item e registar para especialista se surgir uma segunda resposta tecnicamente defensável ou contradição com a fonte. Não corrigir a chave durante a sessão. Interromper o ciclo para reavaliação se dois participantes independentes apontarem a mesma ambiguidade decisiva. Uma queixa não é automaticamente um defeito académico, mas exige investigação com evidência.

Guardar horário, versão/hash, passos sintéticos, erro e logs mínimos. Não apagar dados, não executar rollback, merge ou deployment. Solicitar orientação/autorização para qualquer recuperação ou alteração de âmbito. Se for proposto acesso remoto ou produção, exigir nova avaliação dos riscos P1 de retenção/cache; os resultados deste ciclo local não satisfazem esse gate.

## Implementado nesta execução versus planeado

Implementado: aviso de apresentação exclusivamente para `tl-038`, com testes e preservação do banco.

Planeado: recrutamento, execução humana, recolha de feedback e critérios do ciclo acima. Não foram executados; o protótipo experimental existente não foi alterado. Os riscos académicos continuam pendentes e as aprovações anteriores mantêm o seu âmbito.
