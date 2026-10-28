# Relatório de implementação — 27-10-2026

> Registo histórico da fase 1. Para o estado académico, as correções, compatibilidade histórica e testes da fase 2, consultar [academic-audit.md](academic-audit.md). As limitações aqui descritas correspondem à entrega inicial.

## Estado: parcialmente concluído, aplicação funcional provisória

A implementação local está utilizável e os checks executados passaram. Não se declara o cumprimento integral dos critérios de aceitação: faltam revisão humana das questões/traduções e validação integral dos grupos de LO do blueprint. Não houve push, deploy público, alterações de visibilidade ou alterações em repositórios KAVTRIS.

| Área                                                    | Estado                             | Evidência / limite                                                        |
| ------------------------------------------------------- | ---------------------------------- | ------------------------------------------------------------------------- |
| React, TypeScript, Vite e CSS responsivo                | IMPLEMENTED / VERIFIED             | Build de produção e ecrãs desktop/móvel                                   |
| Painel e estados vazios sem métricas inventadas         | IMPLEMENTED / VERIFIED             | Integração e E2E; só questões visitadas contam como vistas                |
| Prática com filtros, feedback e revisão                 | IMPLEMENTED / VERIFIED             | Integração e Playwright                                                   |
| Simulação de 40 perguntas, 60/75 minutos                | IMPLEMENTED / VERIFIED             | Quotas de capítulo/K-level; 26 pontos de aprovação                        |
| Regras completas por grupo de LO                        | DEFERRED                           | Tabela localizada; transcrição/auditoria integral ainda pendente          |
| Seleção múltipla sem pontos parciais                    | IMPLEMENTED / VERIFIED             | Testes de conjunto exato, duplicações e omissões                          |
| Retoma e expiração após recarregamento                  | IMPLEMENTED / VERIFIED             | Prazo absoluto; expiração arquiva uma vez                                 |
| Histórico e progresso no dispositivo                    | IMPLEMENTED / VERIFIED             | LocalStorage validado; máximo 500 sessões                                 |
| PT-PT, inglês e apresentação bilingue                   | IMPLEMENTED / VERIFIED             | Alternância e conteúdo pré-armazenado                                     |
| Traduções tecnicamente revistas por pessoa independente | NOT IMPLEMENTED                    | 40 pendentes; aviso visível                                               |
| Banco original                                          | IMPLEMENTED / VERIFIED (estrutura) | 40 perguntas, 6 capítulos, 40 LO, K1=8/K2=24/K3=8                         |
| Aprovação académica independente                        | NOT IMPLEMENTED                    | 40 perguntas pendentes; testes não provam correção académica              |
| Inglês técnico para QA                                  | IMPLEMENTED                        | Vocabulário, frases e respostas de entrevista; revisão editorial pendente |
| Importação autorizada por ficheiro na interface         | DEFERRED                           | Modelo e validador disponíveis; sem carregador público                    |
| Sincronização entre separadores/dispositivos            | NOT IMPLEMENTED                    | Usar um separador; sem servidor                                           |
| Voz, IA externa, autenticação e integração KAVTRIS      | DEFERRED                           | Fora do âmbito desta versão                                               |
| Workflow CI                                             | IMPLEMENTED                        | Execução remota não observada; não houve push                             |

## Verificação executada

- Node v24.19.0, npm 11.17.0, Git 2.51.1.windows.1.
- `npm run typecheck`: passou.
- `npm run lint`: passou.
- `npm run format:check`: passou.
- `npm test`: **32 testes passaram** em 5 ficheiros — **24 unitários** e **8 de integração**.
- `npm run test:e2e`: **12 testes passaram**, 6 cenários em Chromium desktop e em viewport móvel iPhone 13 (emulação Chromium, não Safari real).
- `npm run build`: passou; JavaScript ~382 kB (~119 kB gzip), CSS ~13 kB. Rollup emitiu avisos de comentários de otimização da dependência Zod; removeu os comentários e concluiu o build.
- `npm audit`: zero vulnerabilidades reportadas no momento da execução. O Vitest inicial foi atualizado para eliminar os alertas encontrados.
- `git diff --check`: sem erros de whitespace (apenas avisos Git de normalização LF/CRLF).
- Axe: sem violações reportadas nos ecrãs de painel e prática/feedback testados, em desktop e móvel. Não constitui certificação de conformidade WCAG.
- Revisão visual: passou a 1440, 768 e 375 px; screenshots E2E finais desktop e móvel em `test-results/`. Sem overflow horizontal no cenário verificado. O avaliador disponível era do mesmo fornecedor; não foi possível a avaliação externa por outro fornecedor prevista na skill de design.

Cobertura inclui limites 0/25/26/40, perguntas insuficientes/banco vazio, duplicação de IDs, cardinalidade múltipla, respostas inválidas, versões incompatíveis, dados corrompidos, falha de armazenamento, retenção de 500 sessões, pontuação exata de 26/40 pela interface, navegação/marcações/recarregamento, expiração, confirmação de eliminação e teclado nos diálogos.

Falhas encontradas e resolvidas: seletores E2E inicialmente incorretos; rótulos implícitos com nomes demasiado extensos; contraste dos números de capítulos; nome acessível da marca; feedback perdido ao recarregar; risco de sobrescrever dados corrompidos na montagem; atribuição de tempo à pergunta seguinte; perguntas selecionadas contadas como vistas sem visita; limite de histórico que poderia impedir gravações futuras.

Não executado: Firefox/WebKit/Safari real, leitores de ecrã reais, auditoria manual WCAG integral, CI remota, deployment e instalação a partir de um checkout limpo independente. A suite usa o servidor Vite local; o artefacto de produção foi compilado, mas não foi publicado nem submetido à suite E2E num alojamento real.

## Decisões, segurança e ficheiros

O repositório identificado foi `C:\TestLearn`, branch `main`, remoto `gabrielsouza80/TestLearn`. Estava limpo e continha apenas README e `.gitignore`; `C:\TECH\testlearn` não existia. Não se substituiu uma aplicação existente.

Motor separado do React, IDs de opção imutáveis, baralhamento com semente, Zod em conteúdo/persistência, versão de conteúdo explícita, CSS sem framework e LocalStorage são suficientes para este âmbito. `src/App.tsx` ainda é grande; a extração dos ecrãs de sessão/resultados é uma melhoria de manutenção recomendada.

Principais alterações: configuração npm/TypeScript/Vite/ESLint/Prettier; interface em `src/`; banco e motor em `src/data` e `src/domain`; armazenamento em `src/storage`; testes em `tests`; CI em `.github/workflows/quality.yml`; favicon em `public`; README e documentação em `docs`. O lockfile foi incluído; não foram criados commits.

Não há backend, segredos, analytics, APIs de questões ou renderização HTML arbitrária. Não se incorporaram PDFs, logótipos, código ou perguntas oficiais/de terceiros. Os documentos ISTQB e respetivos autores são reconhecidos em `content.md`. Não foi atribuída uma licença ao repositório sem decisão do proprietário.

## Limitações e próximo passo

O banco pequeno repete o mesmo conjunto de 40 perguntas e usa sobretudo três alternativas, pelo que não oferece equivalência a exames oficiais. O registo de LO suporta os 40 objetivos usados; novos LO exigem ampliar o registo com verificação do syllabus. O schema inicial exige texto bilingue em cada entrada; o carregamento de bancos apenas em inglês fica para uma evolução, embora a apresentação tenha mensagem de tradução indisponível. O histórico mostra revisão por pergunta e recomendações por capítulo; não existe ainda um painel detalhado de tendências por LO/K-level ou contagem dedicada de erros recorrentes. Resultados locais podem ser alterados pelo utilizador e não são uma certificação ou instrumento psicométrico.

**Próxima ação recomendada:** uma pessoa com domínio do syllabus CTFL deve rever as 40 questões e traduções usando a checklist de `content.md`, começando pelos oito itens K3. Resolver qualquer ambiguidade antes de apresentar esta versão como material editorialmente validado. A seguir, completar a auditoria de grupos de LO e ampliar o banco com material original revisto.

Instruções exatas de instalação, desenvolvimento, build e testes estão no README. O servidor local desta sessão foi iniciado em http://127.0.0.1:5173.
