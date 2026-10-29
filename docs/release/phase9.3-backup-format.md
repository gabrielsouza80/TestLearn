# Fase 9.3 — backup local v1

Controlos em **Progresso → Exportar progresso / Importar progresso**, em PT-PT e EN. Exportação por ação explícita, ficheiro `testlearn-backup-v1.json`, JSON UTF-8 compacto. Sem conta, upload, backend, sincronização, analytics ou novos serviços/dependências. Não são incluídos PDFs, enunciados, traduções, explicações, banco académico, chaves de correção, IP, fingerprint ou chaves de storage alheias.

## Envelope

Exemplo válido de perfil vazio:

```json
{
  "format": "testlearn-backup",
  "version": 1,
  "exportedAt": "2026-10-29T12:00:00.000Z",
  "source": { "app": "TestLearn", "contentRevision": "2026-10-27.9" },
  "state": { "version": 1, "active": null, "history": [] },
  "results": []
}
```

`state` mantém o contrato de persistência existente. Cada tentativa conserva `version`, `contentRevision`, `id`, `mode`, `questionIds`, `visitedIds`, `optionOrder`, `answers`, `flagged`, `feedbackIds` quando presente, `index`, `startedAt`, `deadline`, `completedAt`, `responseMs` e `lastInteractionAt`. Arrays mantêm a ordem; a ordem das propriedades JSON não é significativa. Só são aceites revisões suportadas `.1`–`.9`. Não há migração para `.9`.

`results` contém uma entrada por sessão concluída, na ordem do histórico: `sessionId`, `correct`, `total`, `unanswered`, `passed`. É um resumo calculado, não uma credencial persistida no esquema da sessão. A importação recalcula-o com as chaves da revisão histórica correta e rejeita divergências. Prática por tópico tem `passed: null`. Os IDs internos das opções são seleções/ordens, não uma identificação das respostas corretas.

O idioma não faz parte do backup porque a aplicação não o persiste como configuração essencial. A mudança de idioma conserva a tentativa e as letras pela ordem guardada; não se promete repor automaticamente o idioma ao abrir outro browser.

## Validação antes de qualquer write

Limite **8 MiB**, verificado antes de ler o ficheiro e novamente no parser. É um teto defensivo para os limites existentes de 500 sessões e até 90 perguntas por prática, não uma promessa de quota de storage. Exportação compacta reduz duplicação; o navegador pode recusar um perfil válido por falta de espaço.

Descodificação UTF-8 estrita e `JSON.parse`, sem execução. Esquemas estritos de envelope, origem, estado, sessões e resultados; campos desconhecidos são rejeitados. Chaves `__proto__`, `prototype` e `constructor`, bem como estruturas excessivamente profundas, são rejeitadas em qualquer posição. Depois validam-se:

- Versões e revisões conhecidas, antes de carregar os respetivos arquivos.
- IDs de pergunta contra o banco da revisão; ordem completa e única de perguntas/opções.
- IDs, unicidade e cardinalidade das respostas; respostas parciais ainda em curso são permitidas, excesso de escolhas é rejeitado.
- Visitas, marcações, feedback e tempos referem apenas perguntas da tentativa; estados e cronologia são coerentes.
- Sessão ativa não concluída, histórico concluído, IDs de tentativa únicos e ausência de sobreposição de IDs entre ativo/histórico.
- Exames alinhados conservam as quotas existentes; prática não recebe o limite artificial de 40.
- Resultados completos recalculados, incluindo conjunto exato nas respostas múltiplas.

Se um arquivo histórico falhar, não há fallback para a revisão atual. O erro preserva o perfil e permite tentar novamente/recarregar. Um ficheiro inválido é rejeitado **inteiramente**; não se tenta aproveitar silenciosamente os registos que parecem bons. A mensagem declara que nenhum dado foi alterado. Não se renderizam strings importadas como HTML.

## Política conservadora de conflitos

A pré-visualização mostra válidas, novas, duplicadas exatas, conflitos ignorados e rejeitadas. Num ficheiro totalmente validado, rejeitadas é zero; uma rejeição de ficheiro não inventa contagens fiáveis de sessões inválidas.

| Situação                                                           | Aplicação após confirmação                                     |
| ------------------------------------------------------------------ | -------------------------------------------------------------- |
| ID novo, tentativa concluída                                       | Acrescentar no fim do histórico, conservando a ordem importada |
| ID novo, tentativa ativa, sem ativo local                          | Repor como ativo                                               |
| Mesmo ID e conteúdo canónico igual                                 | Duplicado: não escrever uma segunda tentativa                  |
| Mesmo ID e qualquer diferença                                      | Conflito: conservar o registo local                            |
| Ativo importado diferente, já existe ativo local                   | Conflito: conservar o ativo local                              |
| Tentativas com IDs diferentes, ainda que partilhem perguntas/datas | Tentativas distintas; não fazer fusão aproximada               |
| Resultado excederia 500 concluídas                                 | Recusar o plano; não cortar o histórico                        |

Confirmar só acrescenta registos inequivocamente novos. Se nada é novo, a confirmação fica desativada. Não há substituição global automática nem motor de merge complexo. O estado local usado na pré-visualização tem de continuar a ser o mesmo no momento de aplicar; o writer verifica também o raw e a reserva de escrita. A aplicação faz um único `setItem` do perfil validado, antes de atualizar a UI. Uma falha conserva os bytes anteriores e mostra erro.

Recomenda-se exportar o perfil atual antes de confirmar. Não há undo automático da adição. Para regressar integralmente a uma cópia anterior, é necessário conservar backups, confirmar o reset existente e importar essa cópia para um perfil vazio, sabendo que isso remove os registos locais posteriores; a aplicação não executa esse procedimento por iniciativa própria.

## Privacidade e autenticidade

O ficheiro contém histórico de estudo e timestamps: deve ser mantido privado, guardado em segurança e transferido manualmente pelo utilizador. O aviso «preparado para descarregar» não afirma que o browser já gravou o ficheiro em disco. Exportar não altera a chave de origem.

Um JSON pode ser editado. Uma falsificação estruturalmente coerente pode passar na validação; não existe prova de autoria, identidade, duração real ou competência. Não há chave secreta no frontend, assinatura, cifra ou alegação de inviolabilidade. A pontuação continua a ser autoavaliação.

Testes unitários cobrem round-trip de todas as nove revisões e rejeições. Testes de browser usam download real, perfis vazios/existentes, reimportação, conflitos, falha atómica, múltiplas e EN/PT. Resultados finais e portabilidade entre motores constam do [relatório de gates](phase9.3-release-gates.md).
