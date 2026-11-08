# Verificação nova do Lote 10

Estas execuções pertencem ao Lote 10; resultados dos Lotes 1–9 são históricos e não foram apresentados como novos.

| Execução                                                                                                                                                                   | Data UTC                         | Exit | Resultado                                                                                                         |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- | ---- | ----------------------------------------------------------------------------------------------------------------- |
| `node node_modules/vitest/vitest.mjs run tests/unit/academic-audit.test.ts tests/unit/bank-history.test.ts tests/unit/backup.test.ts tests/unit/syllabus-coverage.test.ts` | 2026-11-06T15:52:50.795535+00:00 | 0    | 62/62 testes em 4 ficheiros; sem falhas ou skips reportados                                                       |
| `node C:\TestLearn\tmp\phase10h-batch10-20261106\check-multiple-answer.cjs C:\TestLearn\tmp\develop-workspace`                                                             | 2026-11-06T15:52:50.795535+00:00 | 0    | 8/8 seleções sintéticas no motor atual; nenhuma leitura de dados reais                                            |
| `python verify.py integrity`                                                                                                                                               | 2026-11-06T15:52:52.425339+00:00 | 0    | 303 ficheiros anteriores byte-idênticos; 89 pendentes; 100 documentos anteriores; 90 objetos e chaves; 9 arquivos |
| `python verify.py batch10-specific`                                                                                                                                        | 2026-11-06T15:52:40.999056+00:00 | 0    | tl-062, 4 alternativas, 8 pares críticos, 42 blocos literais, 12 adulterações rejeitadas                          |

Integridade: banco completo reavaliado do TypeScript atual e comparado ao snapshot e ao ZIP final do Lote 9. São 90 questões, 364 alternativas e 64 objetivos. IDs, versões, explicações e contratos permanecem iguais. Arquivos .1–.9 são iguais aos bytes de HEAD. tl-062 está ausente em .1–.3 e presente sem alteração em .4–.9; não se inventaram versões anteriores.

Pontuação: tl-001 conserva exatamente o conjunto [o1,o4], exigindo 2 respostas; seleção parcial, extra ou duplicada é rejeitada. A verificação usa apenas objetos e seleções sintéticas em memória, sem LocalStorage real. Os testes de backup/histórico usam fixtures sintéticas existentes.

Formato: Prettier --check nos 11 documentos novos e git diff --check são executados após esta redação, com comandos e saídas em evidence/checks. git diff não inclui ficheiros não rastreados; estes são cobertos pelo Prettier, pelo guard próprio e pelo manifesto.

Fontes consultadas nesta execução: EN 4.0.1, 5.1.2 páginas 48–49, LO 47; PT 4.0 tradução 1.0, 5.1.2 páginas 53–54, LO 52. Apoio de funções/colaboração: EN 21–22/PT 23–24. Todas as páginas físicas foram verificadas. EN web acessível; fetch PT falhou; cópias oficiais locais lidas com hash. Não há afirmação de identidade textual entre edições nem de novo download PT.

A geração inicial de espaçamento introduziu espaços dentro de identificadores no novo Markdown. A inspeção detetou o problema e a normalização dos novos documentos preservou o4, K1, hashes e timestamps. Não foi modificado qualquer documento histórico. Este foi um problema de apresentação do helper, não uma falha do banco ou dos testes do projeto.

Guard legado --phase10h-batch2 não executado neste lote: o guard específico de tl-062 substitui a necessidade contextual, sem fingir aprovação académica. TypeScript, ESLint, build e suíte E2E completa não executados porque apenas se acrescentaram documentos, sem alteração de código/dados funcionais. O carregamento de TS para integridade não é um typecheck completo.

Limites: guards, testes e hashes confirmam consistência e preservação, não demonstram automaticamente equivalência semântica, aprendizagem, qualificação profissional ou aprovação académica humana. Julgamento académico é por IA. Não houve novos OWNER_ACCEPTED/HUMAN_APPROVED. Não se cria .11. Fase 10H aberta.

Exportação: manifesto de todas as cargas, mapeamento dos 219 membros do ZIP 9 final, CRC, extração nova e execução do verificador Python padrão. Casos negativos incluem payload alterado, ausência de ficheiro e caminho inseguro. Resultados finais são publicados com o SHA-256 do ZIP; o pacote é dossiê de revisão, não repositório executável completo.

O guard de apresentação teve uma execução exit 1 em 2026-11-06T15:56:13Z: a normalização deixara palavras encostadas a números no novo relatório (Versão1, revisão2026, tradução1.0 e como1). A inspeção localizou cada ocorrência, o texto foi corrigido e a reexecução de 15:56:48Z terminou com exit 0, mantendo o mesmo guard. Os testes do projeto não foram alterados. Os logs finais são distintos deste registo de falha intermédia.
