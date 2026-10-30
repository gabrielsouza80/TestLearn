# TestLearn

Plataforma independente, gratuita e local de aprendizagem de testes de software, prática CTFL 4.0 e inglês para QA. React + TypeScript estrito + Vite. Sem conta, backend, analytics ou serviços pagos. As soluções estão no código do cliente; não são secretas.

**TestLearn — Beta pública experimental, disponível em [testlearn-ctfl.vercel.app](https://testlearn-ctfl.vercel.app/):** as 90 questões são originais e foram revistas por IA contra os PDFs locais ISTQB/PSTQB. O banco cobre os 64 LO examináveis do syllabus 4.0.1; essa cobertura nominal não implica profundidade ou variedade suficiente em cada LO. As simulações selecionam 40 perguntas segundo os 29 grupos de LO da tabela v1.19, com os totais por capítulo e K-level verificados. Todas as questões e traduções PT-PT continuam a aguardar aprovação humana independente. Alinhamento estrutural não significa dificuldade equivalente ou calibração psicométrica. Não são questões oficiais. TestLearn não é afiliado, acreditado ou aprovado pelo ISTQB® ou PSTQB. Os resultados não são uma previsão validada de certificação.

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

`npm run format` formata os ficheiros. Apenas `dist/` pode ser distribuída: nunca alojar a raiz do repositório. A beta pública está alojada na Vercel em `testlearn-ctfl.vercel.app`. Os Previews e URLs individuais de deployment mantêm proteção. O plano, headers, cache e gates estão em [docs/release/deployment-plan.md](docs/release/deployment-plan.md). Vite preview é apenas validação local, não servidor de produção. A navegação é interna, sem rotas de URL: servir `/` e `/index.html`, assets existentes e 404 para caminhos desconhecidos. `base: './'` mantém caminhos relativos; testar separadamente qualquer subdiretório no host escolhido. A workflow `Quality` valida QA; a integração GitHub → Vercel faz deploy automático de `main`. CI por si só não impede que um commit com falhas chegue a Production: é necessário proteger `main` com Pull Requests e o check obrigatório `verify`. Consultar [operações da beta pública](docs/release/phase10g-public-beta-operations.md).

Os E2E fazem um build e iniciam um preview exclusivo em `127.0.0.1:4174`; essa porta deve estar livre. Não reutilizam o servidor de desenvolvimento. As revisões históricas são carregadas apenas quando necessárias para recuperar sessões ou calcular as suas métricas; uma falha preserva o progresso e oferece recarregamento para tentar novamente. Medições e limites estão na [validação da fase 5C](docs/blueprint-validation.md#fase-5c--carregamento-histórico-e-estabilidade-e2e-28-10-2026).

## Utilização

- **Praticar:** filtrar capítulo, tema, objetivo de aprendizagem, nível cognitivo, quantidade e histórico. Confirmar cada resposta para ver explicações de todas as alternativas.
- **Simulação alinhada ao blueprint:** seleção de 40 questões únicas por grupo de LO, com objetivos distintos conforme a tabela v1.19, 60 minutos ou opção de prática de 75 minutos. O tempo adicional não determina elegibilidade num exame oficial. Navegar, alterar respostas, marcar para revisão e submeter com confirmação. Sem soluções durante o exame.
- **Revisão:** resultados exatos, alternativas corretas e filtros de erros/sem resposta. Seleção múltipla exige o conjunto exato; não há pontos parciais.
- **Progresso:** histórico, questões distintas/repetidas, recomendações por capítulo e eliminação confirmada.
- **Idioma:** português de Portugal, inglês ou EN + PT. O modo bilingue apresenta traduções revistas por IA, ainda pendentes de aprovação humana.
- **Inglês para QA:** vocabulário, exemplos e perguntas de entrevista com respostas sugeridas. Sem processamento de voz ou IA em execução.

## Privacidade e fiabilidade

O progresso fica no LocalStorage deste navegador (`testlearn.v1`). O código da aplicação não envia respostas/resultados a um servidor; o alojamento pode processar IP e logs técnicos ao servir os assets, a confirmar pelo responsável. O site não inclui telemetria, fontes remotas ou APIs de questões. Apagar os dados do navegador elimina o progresso. O histórico suporta até 500 sessões concluídas; quando atinge o limite, não elimina automaticamente as mais antigas. Não existe sincronização entre dispositivos. A aplicação compara o valor guardado e coordena gravações com Web Locks quando disponíveis; se outro separador alterar o progresso, interrompe gravações nessa página e permite recarregar o estado mais recente. Use um separador de cada vez; versões antigas ou scripts externos não cooperam necessariamente com esse lock.

O exame guarda um prazo absoluto: recarregar ou fechar a página não reinicia o relógio; ao reabrir um exame expirado, a aplicação termina-o e guarda-o uma única vez. Tentativas concluídas só podem ser revistas. Respostas, opções baralhadas, marcações, posição e feedback confirmado da prática persistem. O tempo por questão é tempo decorrido enquanto a questão é a atual, incluindo períodos sem interação; não mede atenção.

Schemas versionados validam dados ao ler e guardar. Dados corrompidos, versões desconhecidas ou conteúdo incompatível produzem aviso e estado vazio, preservando o valor bruto até uma ação que grave novo progresso. As tentativas anteriores não são migradas para o conteúdo atual: são resolvidas pela revisão original. Alterações académicas incrementam `CONTENT_REVISION` e preservam o banco anterior. As revisões `.1`–`.8` resolvem o conteúdo e as chaves originais por carregamento diferido; a revisão atual é **2026-10-27.9**, com 90 perguntas e snapshot imutável. Não há migração de tentativas ou fallback para perguntas atuais. Os textos das fases anteriores e todos os arquivos permanecem intactos. O estudo suporta todo o banco, sem limite arbitrário de 40. Falhas de armazenamento produzem aviso; mantenha a página aberta se houver respostas ainda não guardadas. A obtenção do Web Lock é assíncrona; quando a aplicação anuncia gravação confirmada, o navegador aceitou a escrita síncrona, não havendo garantia contra falhas de disco ou eliminação de dados. Um erro inesperado de renderização oferece recarregamento sem apagar dados.

O conteúdo é apresentado como texto React e tabelas, sem HTML arbitrário ou execução de código. O banco público contém as soluções: a ausência de soluções na interface de exame é pedagógica, não um mecanismo de segurança ou exame supervisionado.

## Arquitetura e conteúdo

- `src/domain/`: modelos/validação Zod, seleção determinística, pontuação, sessões, relógio, seleção por grupos de LO e diagnóstico de quotas.
- `src/data/questions.ts`: banco original bilingue, IDs estáveis, LO, K-level, proveniência, versão e revisão pendente.
- `src/storage/`: adaptação LocalStorage substituível e validação das sessões.
- `src/PublicInformation.tsx`: Sobre, Privacidade, Termos e Ajuda PT-PT/EN, com Gabriel Souza como responsável, `testlearn808005@gmail.com` para contacto e informação sobre alojamento Vercel. A revisão jurídica completa continua pendente.
- `src/App.tsx`: ecrãs e coordenação dos fluxos; `EnglishLearning.tsx`: inglês para QA; `i18n.ts`: capítulos e seleção de idioma.
- `src/styles.css`: identidade independente, foco visível, grelhas responsivas, leitura e movimento reduzido.
- `tests/`: domínio/persistência, integração React e E2E Playwright com axe.

Optou-se por CSS simples e LocalStorage pelo tamanho reduzido dos dados. Não há router ou dependência de backend. O motor não depende de React. O ecrã principal ainda beneficia de futura extração dos ecrãs de exame/resultados; não são necessárias abstrações empresariais.

Consulte a [validação do blueprint, cobertura completa e resultados da regressão](docs/blueprint-validation.md), a [auditoria académica por pergunta e fontes locais](docs/academic-audit.md), as [regras e contribuição de conteúdo](docs/content.md) e o [relatório histórico da implementação inicial](docs/implementation.md).

## Candidato de lançamento

A [decisão de release](docs/release/release-readiness-report.md) separa qualidade técnica de autorização de publicação. Não há domínio, responsável/contacto público ou alojamento definidos. Esses elementos, logs do host, direitos de distribuição e revisão da informação pública exigem ação real do responsável antes do lançamento. Aprovação académica humana e calibração psicométrica continuam pendentes; não se promete equivalência ao exame oficial.

`node scripts/check-release.mjs` verifica o inventário de dist e recusa assets inesperados, PDFs, documentos privados, dados de piloto, source maps e chunks históricos em falta. `node --test scripts/check-release.test.mjs` testa essa proteção com fixtures sintéticos locais. `config/security-headers.json` é a política aplicada ao preview e a transpor para o host autorizado, não prova de configuração remota. `robots.txt`, meta robots e X-Robots-Tag mantêm noindex nesta preparação. HTTPS, retenção dos assets antigos e rollback só podem ser verificados num alojamento efetivamente escolhido.

Os materiais académicos e de piloto em tmp são confidenciais/locais e não integram a aplicação nem um pacote de publicação. Nenhuma pergunta foi alterada na fase 9 e não foi criada revisão .10.
