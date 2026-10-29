# Decisão de release — fase 9

> Registo histórico da fase 9. A validação posterior e os números atuais estão em [Fase 9.3](phase9.3-release-gates.md), com a [Fase 9.2](phase9.2-educational-ux.md) preservada e `release-readiness.json`. A autorização anterior de commits/push foi executada antes da fase 9.2; nesta fase não houve commit, push ou deploy.

29-10-2026. **TECHNICAL_RELEASE_CANDIDATE_READY = PASS** no âmbito técnico local exercitado. **PUBLICATION_AUTHORIZED = NO**. **PUBLIC_BETA_READY = BLOCKED** por ações externas P0 listadas no checklist. **ACADEMICALLY_VALIDATED_RELEASE = BLOCKED**, sem revisão humana recebida. Não houve deploy, push, commit, instalação ou ligação de domínio.

## Resultados reais

| Verificação                                | Resultado                                                    | Exit |
| ------------------------------------------ | ------------------------------------------------------------ | ---: |
| npm run typecheck                          | PASS                                                         |    0 |
| npm run lint                               | PASS                                                         |    0 |
| npm run format:check                       | PASS após documentação final                                 |    0 |
| npm test                                   | **147/147**, 18 ficheiros; 19,40 s                           |    0 |
| npm run build                              | PASS; inventário completo com hashes                         |    0 |
| npm run test:e2e                           | **86/86**, oito workers, sem retries locais; 1,5 min         |    0 |
| node scripts/check-release.mjs             | PASS; oito arquivos lazy, zero privados/source maps          |    0 |
| node --test scripts/check-release.test.mjs | **8/8**, fixtures sintéticos                                 |    0 |
| npm audit --json                           | zero vulnerabilidades reportadas                             |    0 |
| Integridade e seeds                        | .1–.9, 90/364/64, igualdade profunda e 1.000 seeds/29 grupos |    0 |

A fonte de perguntas, domínio, chaves, LO/K, versões, arquivos, package/lock e configuração Playwright mantêm os hashes do preflight. Todas as chaves e estados humanos estão intactos. A única alteração num teste anterior espera pela gravação assíncrona real, preservando a verificação de todos os grupos e campos. Metadados da aplicação/avisos e coordenação de persistência não criam .10. As alterações anteriores não commitadas foram preservadas. O source HEAD sozinho não identifica o working tree; o responsável deve autorizar um snapshot exato antes de publicar.

## Gate por área

Funcionalidade/conteúdo/histórico: PASS. Segurança local: PASS nos controlos exercitados; host remoto/TLS: NOT_TESTED. Privacidade e informação legal/contacto: OWNER_ACTION_REQUIRED. Acessibilidade axe/teclado/reflow: PASS nos casos exercitados; WCAG integral/leitor de ecrã/zoom real: NOT_TESTED. Chromium: PASS; Firefox/WebKit/físicos: NOT_TESTED. Performance: aumento inicial moderado medido, lazy preservado; sem benchmark físico. Deployment: OWNER_ACTION_REQUIRED. Académico: aprovação humana PENDING, calibração NOT_TESTED. Piloto real: NOT_TESTED, zero participantes recebidos. O JSON ao lado conserva estes estados separadamente.

## Alterações e evidência

PublicInformation.tsx e navegação/badge/metadados explicam a beta e os limites; store/App comparam o raw e coordenam Web Locks, sem merge ou migração; boundary oferece recuperação genérica; temporizador tem semântica/avisos e regiões de tabelas são focáveis e únicas. Política HTTP é testada no preview; mpa devolve 404 para rotas não suportadas em vez de HTML 200. scripts/check-release recusa ficheiros inesperados e também foi acrescentado à workflow QA. O deploy distribui só dist, nunca documentação/participantes.

Evidência completa em tmp/phase9: baseline-files/before, nove pins, logs/JSON de unidades, E2E, npm audit, performance/grafo, comparação de arranque, integridade e inventários. Os materiais da fase 8 mantêm checksums e estão fora do grafo de produção. Os documentos release não entram nos assets. Plano de publicação e rollback mantém URLs antigas e a compatibilidade .9, sem apagar o histórico do utilizador.

## Falhas intermédias, sem omissões

- Initial artifact audit caught old HTML title: corrected beta/noindex metadata and added explicit E2E assertions
- First full E2E:83 pass/3 fail; one stale immediate LocalStorage read after async write, two duplicate table region labels; fixed polling actual storage and unique question labels, kept all assertions
- First performance script failed due to corrupted accented selector; fixed role/prefix selector and repeated; noisy concurrent measurement retained separately, followed by isolated/alternating final measurements

A segunda suite completa já passou 86/86 antes da última salvaguarda de leitura; sobre o código final repetiram-se unidades (147) e a suite completa (86), com os mesmos oito workers e timeouts. Não se desativaram testes, reduziram assertions ou aumentaram retries para obter PASS. Warnings anteriores do build continuam documentados.

## Próxima ação

O responsável completa identidade/contacto/host/logs/direitos e aprova os textos finais; confirma retenção de assets e rollback real; revê o working tree e autoriza source/artefacto exatos. Só então poderá autorizar publicação e smoke remoto. Revisão académica humana e piloto real seguem o pacote da fase 8, sem inventar aprovação nem tratar a beta como avaliação calibrada.

O recibo final teve ainda um erro de leitura de JSON redirecionado pelo PowerShell (UTF-16LE interpretado como UTF-8). O decoder passou a reconhecer o BOM e a geração do recibo foi repetida; não houve alteração do runtime, das perguntas ou do resultado da QA.

## Entrega em controlo de versões

Após esta avaliação local, o utilizador autorizou expressamente commits e push na main. O commit de código do candidato é 94d278ccf6d497c3fcf2f9649f11f71898580020. As referências a HEAD e trabalho não commitado acima/JSON descrevem o preflight da avaliação, preservado como histórico. Esta autorização de controlo de versões não autoriza deploy ou publicação da beta; os gates legais, de contacto e alojamento mantêm-se.
