# TestLearn

Plataforma independente, gratuita e local de aprendizagem de testes de software, prática CTFL 4.0 e inglês para QA. React + TypeScript estrito + Vite. Sem conta, backend, analytics ou serviços pagos. As soluções estão no código do cliente; não são secretas.

**TestLearn — Beta pública em [testlearn-ctfl.vercel.app](https://testlearn-ctfl.vercel.app/):** as 90 questões são originais e foram revistas por IA contra os PDFs locais ISTQB/PSTQB. O banco cobre os 64 LO examináveis do syllabus 4.0.1; essa cobertura nominal não implica profundidade ou variedade suficiente em cada LO. As simulações selecionam 40 perguntas segundo os 29 grupos de LO da tabela v1.19, com os totais por capítulo e K-level verificados. Todas as questões e traduções PT-PT continuam a aguardar aprovação humana independente. Alinhamento estrutural não significa dificuldade equivalente ou calibração psicométrica. Não são questões oficiais. TestLearn não é afiliado, acreditado ou aprovado pelo ISTQB® ou PSTQB. Os resultados não são uma previsão validada de certificação.

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

`npm run format` formata os ficheiros. Apenas `dist/` pode ser distribuída: nunca alojar a raiz do repositório. O alojamento Production está na Vercel, em https://testlearn-ctfl.vercel.app/, com HTTPS e publicação automática a partir da branch `main`. O estado atual, os bloqueios e os passos de release estão em [docs/release/current-production-state.md](docs/release/current-production-state.md); o [plano anterior ao lançamento](docs/release/deployment-plan.md) é conservado por razões históricas. Vite preview é apenas validação local, não servidor de produção. A navegação é interna, sem rotas de URL: servir `/` e `/index.html`, assets existentes e 404 para caminhos desconhecidos. `base: './'` mantém caminhos relativos; testar separadamente qualquer subdiretório no host escolhido. A workflow `Quality` valida QA, mas não impede por si só o deploy automático da Vercel: configurar proteção obrigatória de `main` é essencial.

Os E2E fazem um build e iniciam um preview exclusivo em `127.0.0.1:4174`; essa porta deve estar livre. Não reutilizam o servidor de desenvolvimento. As revisões históricas são carregadas apenas quando necessárias para recuperar sessões ou calcular as suas métricas; uma falha preserva o progresso e oferece recarregamento para tentar novamente. Medições e limites estão na [validação da fase 5C](docs/blueprint-validation.md#fase-5c--carregamento-histórico-e-estabilidade-e2e-28-10-2026).

## Utilização

- **Praticar:** filtrar capítulo, tema, objetivo de aprendizagem, nível cognitivo, quantidade e histórico. Confirmar cada resposta para ver explicações de todas as alternativas.
- **Simulação alinhada ao blueprint:** seleção de 40 questões únicas por grupo de LO, com objetivos distintos conforme a tabela v1.19, 60 minutos ou opção de prática de 75 minutos. O tempo adicional não determina elegibilidade num exame oficial. Navegar, alterar respostas, marcar para revisão e submeter com confirmação. Sem soluções durante o exame.
- **Revisão:** resultados exatos, alternativas corretas e filtros de erros/sem resposta. Seleção múltipla exige o conjunto exato; não há pontos parciais.
- **Progresso:** histórico, questões distintas/repetidas, recomendações por capítulo e eliminação confirmada.
- **Idioma:** português de Portugal, inglês ou EN + PT. O modo bilingue apresenta traduções revistas por IA, ainda pendentes de aprovação humana.
- **Inglês para QA:** vocabulário, exemplos e perguntas de entrevista com respostas sugeridas. Sem processamento de voz ou IA em execução.

## Privacidade e fiabilidade

O progresso fica no LocalStorage deste navegador (`testlearn.v1`). O código da aplicação não envia respostas/resultados a um servidor; o alojamento Vercel pode processar IP e registos técnicos ao servir os assets. A finalidade, o fundamento e os prazos aplicáveis devem ser avaliados e comunicados pelo responsável. O site não inclui telemetria, fontes remotas ou APIs de questões. Apagar os dados do navegador elimina o progresso. O histórico tem um limite de 500 sessões concluídas, sem eliminação automática das mais antigas; se o limite for alcançado, é recusado novo progresso até à intervenção do utilizador. Não existe sincronização entre dispositivos. A aplicação compara o valor guardado e coordena gravações com Web Locks quando disponíveis; se outro separador alterar o progresso, interrompe gravações nessa página e permite recarregar o estado mais recente. Use um separador de cada vez; versões antigas ou scripts externos não cooperam necessariamente com esse lock.

O exame guarda um prazo absoluto: recarregar ou fechar a página não reinicia o relógio; ao reabrir um exame expirado, a aplicação termina-o e guarda-o uma única vez. Tentativas concluídas só podem ser revistas. Respostas, opções baralhadas, marcações, posição e feedback confirmado da prática persistem. O tempo por questão é tempo decorrido enquanto a questão é a atual, incluindo períodos sem interação; não mede atenção.

Schemas versionados validam dados ao ler e guardar. Dados corrompidos, versões desconhecidas ou conteúdo incompatível produzem aviso e estado vazio, preservando o valor bruto até uma ação que grave novo progresso. As tentativas anteriores não são migradas para o conteúdo atual: são resolvidas pela revisão original. Alterações académicas incrementam `CONTENT_REVISION` e preservam o banco anterior. As revisões `.1`–`.8` resolvem o conteúdo e as chaves originais por carregamento diferido; a revisão atual é **2026-10-27.9**, com 90 perguntas e snapshot imutável. Não há migração de tentativas ou fallback para perguntas atuais. Os textos das fases anteriores e todos os arquivos permanecem intactos. O estudo suporta todo o banco, sem limite arbitrário de 40. Falhas de armazenamento produzem aviso; mantenha a página aberta se houver respostas ainda não guardadas. A alteração só é aplicada na interface após escrita síncrona confirmada em LocalStorage, mas isso não garante durabilidade física perante falhas de energia, disco ou limpeza de dados. Um erro inesperado de renderização oferece recarregamento sem apagar dados.

O conteúdo é apresentado como texto React e tabelas, sem HTML arbitrário ou execução de código. O banco público contém as soluções: a ausência de soluções na interface de exame é pedagógica, não um mecanismo de segurança ou exame supervisionado.

## Arquitetura e conteúdo

- `src/domain/`: modelos/validação Zod, seleção determinística, pontuação, sessões, relógio, seleção por grupos de LO e diagnóstico de quotas.
- `src/data/questions.ts`: banco original bilingue, IDs estáveis, LO, K-level, proveniência, versão e revisão pendente.
- `src/storage/`: adaptação LocalStorage substituível e validação das sessões.
- `src/PublicInformation.tsx`: Sobre, Privacidade, Termos e Ajuda PT-PT/EN; responsável público Gabriel Souza e contacto testlearn808005@gmail.com. Revisão jurídica independente ainda não certificada.
- `src/App.tsx`: ecrãs e coordenação dos fluxos; `EnglishLearning.tsx`: inglês para QA; `i18n.ts`: capítulos e seleção de idioma.
- `src/styles.css`: identidade independente, foco visível, grelhas responsivas, leitura e movimento reduzido.
- `tests/`: domínio/persistência, integração React e E2E Playwright com axe.

Optou-se por CSS simples e LocalStorage pelo tamanho reduzido dos dados. Não há router ou dependência de backend. O motor não depende de React. O ecrã principal ainda beneficia de futura extração dos ecrãs de exame/resultados; não são necessárias abstrações empresariais.

Consulte a [validação do blueprint, cobertura completa e resultados da regressão](docs/blueprint-validation.md), a [auditoria académica por pergunta e fontes locais](docs/academic-audit.md), as [regras e contribuição de conteúdo](docs/content.md) e o [relatório histórico da implementação inicial](docs/implementation.md).

## Retenção de assets entre publicações

O histórico de ficheiros JS/CSS com hash deve continuar acessível na origem pública após alterações do site. A fase 10I mantém um inventário append-only de bundles anteriores (`config/retained-assets.json`) e cópias binárias em `public/assets/`, verificadas por SHA-256. O build consulta o domínio Production para confirmar que os assets que estão atualmente publicados também existem, byte a byte, no candidato. Esta verificação falha de forma fechada em vez de aceitar um novo deploy que elimine os ficheiros antigos. Consulte [o procedimento de retenção e as limitações](docs/release/phase10i-retained-assets.md). Não alterar os bundles minificados preservados, mesmo para os formatar.

## Candidato de lançamento

A [decisão histórica de pré-lançamento](docs/release/release-readiness-report.md) separava qualidade técnica de autorização. A versão Beta foi entretanto publicada no domínio indicado acima; o estado operativo atual está em [docs/release/current-production-state.md](docs/release/current-production-state.md). Gabriel Souza é o responsável público e testlearn808005@gmail.com o contacto. Mantêm-se pendentes a revisão humana académica, a revisão completa dos direitos e uma avaliação jurídica específica da política de privacidade e do tratamento operacional do alojamento. Aprovação académica humana e calibração psicométrica continuam pendentes; não se promete equivalência ao exame oficial.

`node scripts/check-release.mjs` verifica o inventário de dist e recusa assets inesperados, PDFs, documentos privados, dados de piloto, source maps e chunks históricos em falta. `node --test scripts/check-release.test.mjs` testa essa proteção com fixtures sintéticos locais. `config/security-headers.json` aplica-se ao preview local e `vercel.json` define a política de headers do alojamento. Os testes e a inspeção remota confirmam os guards exercitados; a compatibilidade real após atualizações A→B e a retenção de assets anteriores ainda requerem ensaio. O site mantém deliberadamente `noindex` em robots.txt, no HTML e nos headers HTTP durante a Beta.

Os materiais académicos e de piloto em tmp são confidenciais/locais e não integram a aplicação nem um pacote de publicação. A preparação da versão 0.1.1 não altera perguntas nem a revisão de conteúdo `2026-10-27.9`.
