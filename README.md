# TestLearn

Plataforma independente, gratuita e local de aprendizagem de testes de software, prática CTFL 4.0 e inglês para QA. React + TypeScript estrito + Vite. Sem conta, backend, chaves, analytics ou serviços pagos.

**Versão provisória para prática:** as 82 questões são originais e foram revistas por IA contra os PDFs locais ISTQB/PSTQB. O banco cobre os 64 LO examináveis do syllabus 4.0.1; essa cobertura nominal não implica profundidade ou variedade suficiente em cada LO. As simulações selecionam 40 perguntas segundo os 29 grupos de LO da tabela v1.19, com os totais por capítulo e K-level verificados. Todas as questões e traduções PT-PT continuam a aguardar aprovação humana independente. Alinhamento estrutural não significa dificuldade equivalente ou calibração psicométrica. Não são questões oficiais. TestLearn não é afiliado, acreditado ou aprovado pelo ISTQB® ou PSTQB. Os resultados não são uma previsão validada de certificação.

## Executar

Requisitos: Node.js 24 e npm. O lockfile está incluído.

```sh
npm ci
npm run dev
```

Abrir http://127.0.0.1:5173. Para verificar e produzir o site:

```sh
npm run typecheck
npm run lint
npm run format:check
npm test
npm run build
npx playwright install chromium
npm run test:e2e
```

`npm run format` formata os ficheiros. `dist/` contém a aplicação estática, com caminhos relativos para alojamento em subdiretórios. Pode ser alojada em Vercel (`npm run build`, saída `dist`) ou GitHub Pages. Nenhuma publicação foi efetuada. A workflow GitHub Actions valida tipos, lint, formatação, testes, build e Chromium desktop/móvel. A execução remota da CI ainda não foi observada.

Os E2E fazem um build e iniciam um preview exclusivo em `127.0.0.1:4174`; essa porta deve estar livre. Não reutilizam o servidor de desenvolvimento. As revisões históricas são carregadas apenas quando necessárias para recuperar sessões ou calcular as suas métricas; uma falha preserva o progresso e oferece recarregamento para tentar novamente. Medições e limites estão na [validação da fase 5C](docs/blueprint-validation.md#fase-5c--carregamento-histórico-e-estabilidade-e2e-28-10-2026).

## Utilização

- **Praticar:** filtrar capítulo, tema, objetivo de aprendizagem, nível cognitivo, quantidade e histórico. Confirmar cada resposta para ver explicações de todas as alternativas.
- **Simulação alinhada ao blueprint:** seleção de 40 questões únicas por grupo de LO, com objetivos distintos conforme a tabela v1.19, 60 minutos ou opção de prática de 75 minutos. O tempo adicional não determina elegibilidade num exame oficial. Navegar, alterar respostas, marcar para revisão e submeter com confirmação. Sem soluções durante o exame.
- **Revisão:** resultados exatos, alternativas corretas e filtros de erros/sem resposta. Seleção múltipla exige o conjunto exato; não há pontos parciais.
- **Progresso:** histórico, questões distintas/repetidas, recomendações por capítulo e eliminação confirmada.
- **Idioma:** português de Portugal, inglês ou EN + PT. O modo bilingue apresenta traduções revistas por IA, ainda pendentes de aprovação humana.
- **Inglês para QA:** vocabulário, exemplos e perguntas de entrevista com respostas sugeridas. Sem processamento de voz ou IA em execução.

## Privacidade e fiabilidade

O progresso fica no LocalStorage deste navegador (`testlearn.v1`). Nenhum dado é enviado para um servidor. O site não inclui telemetria, fontes remotas ou APIs de questões. Apagar os dados do navegador elimina o progresso. O histórico é limitado às 500 sessões mais recentes. Não existe sincronização entre dispositivos nem coordenação de alterações entre separadores: use um separador de cada vez.

O exame guarda um prazo absoluto: recarregar ou fechar a página não reinicia o relógio; ao reabrir um exame expirado, a aplicação termina-o e guarda-o uma única vez. Tentativas concluídas só podem ser revistas. Respostas, opções baralhadas, marcações, posição e feedback confirmado da prática persistem. O tempo por questão é tempo decorrido enquanto a questão é a atual, incluindo períodos sem interação; não mede atenção.

Schemas versionados validam dados ao ler e guardar. Dados corrompidos, versões desconhecidas ou conteúdo incompatível produzem aviso e estado vazio, preservando o valor bruto até uma ação que grave novo progresso. As tentativas anteriores não são migradas para o conteúdo atual: são resolvidas pela revisão original. Alterações académicas incrementam `CONTENT_REVISION` e preservam o banco anterior. As revisões `2026-10-27.1`, `2026-10-27.2`, `2026-10-27.3`, `2026-10-27.4`, `2026-10-27.5` e `2026-10-27.6` são suportadas: tentativas antigas mantêm texto, opções, explicações e pontuação originais, com aviso de revisão anterior. Exames .3, .4, .5 e .6 conservam o rótulo de estrutura alinhada; .3 mostra aviso de banco anterior à cobertura completa. A revisão .5 contém apenas cinco correções bilingues face à .4; tentativas .4 mantêm os textos anteriores. A revisão atual .6 acrescenta 16 alternativas, sem alterar os 66 itens anteriores. O estudo .6 suporta 82 perguntas; o estudo .4/.5 conserva 66 e o estudo .3 continua a recuperar os seus 47 itens. Revisões desconhecidas não são convertidas para a atual. Falhas de armazenamento produzem aviso; mantenha a página aberta se o navegador impedir gravações.

O conteúdo é apresentado como texto React e tabelas, sem HTML arbitrário ou execução de código. O banco público contém as soluções: a ausência de soluções na interface de exame é pedagógica, não um mecanismo de segurança ou exame supervisionado.

## Arquitetura e conteúdo

- `src/domain/`: modelos/validação Zod, seleção determinística, pontuação, sessões, relógio, seleção por grupos de LO e diagnóstico de quotas.
- `src/data/questions.ts`: banco original bilingue, IDs estáveis, LO, K-level, proveniência, versão e revisão pendente.
- `src/storage/`: adaptação LocalStorage substituível e validação das sessões.
- `src/App.tsx`: ecrãs e coordenação dos fluxos; `EnglishLearning.tsx`: inglês para QA; `i18n.ts`: capítulos e seleção de idioma.
- `src/styles.css`: identidade independente, foco visível, grelhas responsivas, leitura e movimento reduzido.
- `tests/`: domínio/persistência, integração React e E2E Playwright com axe.

Optou-se por CSS simples e LocalStorage pelo tamanho reduzido dos dados. Não há router ou dependência de backend. O motor não depende de React. O ecrã principal ainda beneficia de futura extração dos ecrãs de exame/resultados; não são necessárias abstrações empresariais.

Consulte a [validação do blueprint, cobertura completa e resultados da regressão](docs/blueprint-validation.md), a [auditoria académica por pergunta e fontes locais](docs/academic-audit.md), as [regras e contribuição de conteúdo](docs/content.md) e o [relatório histórico da implementação inicial](docs/implementation.md).
