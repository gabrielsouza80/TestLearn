# Acessibilidade — âmbito e evidência

> Atualização: resultados e preparação atuais em [fase 9.3](phase9.3-release-gates.md). O detalhe abaixo conserva a evidência/contrato anterior; não representa uma nova validação remota ou manual.

Revisão local sobre Chromium, com axe e percursos de teclado automatizados/observados pelo agente. Não houve avaliação humana com leitor de ecrã, certificação WCAG ou auditoria integral WCAG 2.2 AA.

Verificados: PT-PT por defeito, lang en ao mudar idioma, spans EN/PT no modo bilingue e blocos públicos com lang correto; títulos e foco ao navegar; nomes acessíveis de radios/checkboxes, cardinalidade e desmarcação; foco visível; diálogo com foco inicial, Escape, trap e regresso; sem depender só de cor para selecionadas/marcadas; estrutura de tabelas/caption/th; áreas de tabela focáveis com nomes distintos por ID e deslocação horizontal; contraste dos ecrãs exercitados sem violações axe; informação pública acessível no rodapé.

Temporizador: role timer, nome bilingue e aria-live off para não anunciar cada segundo; avisos de cinco/um minuto em status; prazo e 60/75 explicados antes de iniciar, estudo sem temporizador disponível. Isto não é uma declaração de que todos os requisitos temporais ou anúncios funcionam em todas as tecnologias assistivas.

Uma regressão introduzida na primeira passagem deu o mesmo nome às regiões de duas tabelas na revisão final. A suite completa detetou landmark-unique em desktop/mobile; corrigiu-se o nome com o ID, mantendo todas as assertions. A execução final completa passou. Não foram desligadas regras axe.

Reflow sem overflow horizontal da página a 320, 390, 768, 1280 e 1920 px, incluindo cinco alternativas K3 e informação pública. Tabelas podem deslocar-se dentro de região própria. A captura móvel foi inspecionada visualmente pelo agente; não é aprovação humana independente. Estilos existentes de reduced-motion mantidos; não foram introduzidas animações. Botões principais têm min-height 44px; grelha de perguntas 36px e labels abrangentes, sem assumir que tamanho CSS sozinho prova toda a usabilidade tátil.

**Não verificado integralmente:** zoom real do browser/OS a 200%/400%, leitores de ecrã e combinações de alto contraste, todos os tamanhos de texto/situações de foco, dispositivos táteis físicos, todas as combinações de conteúdo e critérios WCAG. Viewport de 320px é evidência de reflow, não prova de zoom real. Nenhuma barreira crítica confirmada ficou por corrigir; manter revisão manual antes de qualquer alegação de conformidade.
