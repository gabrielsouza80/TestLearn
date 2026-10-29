# Fase 9.3 — browsers e acessibilidade

Engines Playwright locais: Chromium **156.0.8078.4**, Firefox **157.0**, WebKit **27.2**. As versões Firefox/WebKit previamente instaladas não correspondiam ao pacote Playwright atual; foram descarregados apenas os dois motores necessários. Sem dependências npm novas, alterações de definições do sistema ou utilização de perfis reais.

A configuração executa os mesmos testes em Chromium desktop, Firefox desktop, WebKit desktop e emulação móvel Chromium/iPhone 13. WebKit no Windows **não** é Safari num iPhone físico. A primeira matriz completa com oito workers sofreu falhas de alocação de memória/encerramento de browsers; a máquina foi observada com cerca de 240 MiB de RAM livre. O limite foi reduzido para dois workers para a matriz inteira. Não se aumentaram timeouts, desligaram assertions, omitiram motores ou acrescentaram retries locais. A execução final passou **268/268**, dois workers e zero retries locais, após os últimos ajustes; os resultados efetivos estão no [relatório consolidado](phase9.3-release-gates.md).

Âmbito exercitado: dashboard/filtros, 40 perguntas e quotas, cinco opções, escolhas múltiplas, temporizador/conclusão, gravação imediata, reload/fecho/retoma, resultados, históricos, exportação/importação, mudança de idioma, erros de storage e exclusão entre separadores. O ensaio de portabilidade adicional usa os mesmos bytes de um download Chromium para restauro noutros motores; o restauro Chromium → Firefox/WebKit passou com igualdade profunda dos IDs, escolhas, timestamps e revisões `.4`/`.9`, e os resultados são registados separadamente, sem confundir perfis separados com browsers diferentes.

## Acessibilidade

Controlos nativos de ficheiro com label e limite explícitos; botões e erros bilingues; estados de gravação numa região `aria-live` atómica; erros com `role=alert`. A confirmação da importação tem nome/descrição, foco inicial em cancelar, ciclo de Tab/Shift+Tab, Escape e regresso do foco ao campo do ficheiro. Foi corrigido um defeito real: desativar o input durante a leitura retirava-lhe o foco antes de abrir a confirmação; o regresso usa agora o input conhecido. A confirmação tem altura limitada ao viewport e scroll interno.

São mantidos nomes e descrições das opções, seleção por teclado, cardinalidade, estados correta/incorreta/sem resposta com texto/ícones além de cor, títulos focáveis, regiões de tabelas e atributos de idioma. Axe é evidência de apoio nos cenários exercitados, não prova de conformidade WCAG integral. Reflow a 1280/640/320 px não substitui zoom real. A sonda de aumento CSS do texto mediu 14,4 para 28,8 px (200%) nesses três tamanhos. Detetou e levou à correção de overflow no cabeçalho, no link de salto e na grelha de navegação; a execução final ficou sem overflow. Os testes repetem o download e a interação a 200% de texto. Control+= manteve viewport/DPR iguais: não foi demonstrado zoom nativo.

**Leitor de ecrã: NOT_TESTED. Zoom real 200%/400%: NOT_TESTED até execução manual fiável. Dispositivos físicos: NOT_TESTED.** Não se convertem screenshots, emulação, CSS zoom ou CDP page scale em falsas provas de testes manuais.

### Checklist executável pelo responsável (NVDA ou equivalente)

1. Num perfil de teste, abrir o build validado e navegar sem rato. Confirmar título, idioma, landmarks e foco visível/ordenado.
2. Selecionar/desselecionar uma resposta múltipla; ouvir texto, letra, estado e cardinalidade. Confirmar anúncio de guardado; simular storage bloqueado e confirmar ausência de falso sucesso.
3. Abrir Progresso, exportar e confirmar a existência do ficheiro. Ouvir o label do import e selecionar um ficheiro válido.
4. Confirmar que o diálogo anuncia título, finalidade e contagens, mantém Tab/Shift+Tab no diálogo e regressa ao input com Escape/cancelar. Repetir com JSON inválido e confirmar anúncio do erro sem alterar o perfil.
5. Rever corretas/incorretas/brancos, explicações expansíveis, letras e numeração original. Navegar tabelas por cabeçalhos e região de scroll.
6. Usar zoom **real do browser** a 200% e 400% e aumento de texto, registando browser/OS/tecnologia assistiva. Confirmar controlos alcançáveis, texto legível e ausência de overflow da página; scroll de tabelas pode ficar limitado à respetiva região.
7. Repetir EN e PT-PT. Anotar qualquer barreira com passos e captura sem histórico pessoal. Uma barreira crítica confirmada reabre o gate; não alegar WCAG 2.2 AA antes da revisão integral.
