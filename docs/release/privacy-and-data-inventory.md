# Privacidade e inventário de dados

Avisos PT-PT/EN e textos de uso estão em src/PublicInformation.tsx, acessíveis pelo rodapé em qualquer ecrã normal. São preparação local, não informação jurídica final aprovada. Identidade/contacto, fornecedor/logs e revisão pelo responsável estão por concluir: **P0 externo, publicação bloqueada**.

| Campo local                             | Uso e limites                                                                                                                                 |
| --------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| testlearn.v1 / version                  | Envelope versionado; só esta chave é alterada pela aplicação.                                                                                 |
| active, history                         | Uma sessão ativa e até 500 concluídas; excesso é recusado sem cortar histórico. Backup JSON manual, sem conta/cloud/sincronização automática. |
| contentRevision, id, mode               | Revisão do conteúdo, UUID local da tentativa, exame/prática. UUID não é identidade verificada.                                                |
| questionIds, optionOrder                | Ordem de perguntas e IDs estáveis de alternativas; permite reconstruir apresentação.                                                          |
| answers                                 | Escolhas por pergunta. Score calculado localmente com a revisão certa, não guardado como certificado.                                         |
| visitedIds, flagged, index, feedbackIds | Visitas, marcações, posição e feedback de estudo confirmado.                                                                                  |
| startedAt, deadline, completedAt        | Datas e prazo absoluto; reload não reinicia o relógio.                                                                                        |
| responseMs, lastInteractionAt           | Tempo entre interações; pode incluir inatividade e não mede atenção nem apenas raciocínio.                                                    |
| Idioma, seed de seleção                 | Não são persistidos explicitamente. Não inferir de timestamps.                                                                                |
| Filtros, navegação, minutos escolhidos  | Estado React em memória; não novas preferências persistentes.                                                                                 |

Não há cookies criados pela aplicação, contas, fontes remotas, SDKs de analytics, fingerprinting ou envio de respostas para servidor. Há pedidos de HTML/JS/CSS/favicon/robots e chunks históricos ao host. Uma ligação oficial externa só é aberta por ação do utilizador. Logs do servidor/CDN podem incluir IP, user-agent, data e URI: fornecedor, finalidades, fundamento, retenção, acesso e localização devem ser confirmados, sem alegar que nenhum dado é processado pelo host.

Apagar progresso exige confirmação, afeta só testlearn.v1 e não limpa outros dados da origem. Cancelar/Escape preserva tudo. O reset guarda estado vazio e não implica apagar ficheiros noutros serviços. Limpar dados/perfil, mudar origem/domínio ou bloquear storage pode perder acesso ao progresso; não existe backup ou recuperação na cloud. A fase 9.3 reserva escrita a um separador e recusa alterações que não possam ser guardadas; mudanças externas inesperadas bloqueiam a página. Exportar cria um ficheiro privado, sob controlo do utilizador, sem alterar o storage nem enviar o conteúdo a serviços. Importar valida e acrescenta apenas tentativas novas sem conflito após confirmação. Detalhes, limites e autenticidade: [formato de backup](phase9.3-backup-format.md).

Os materiais de piloto/revisão em tmp permanecem separados e com checksums. Não foram recebidos participantes reais nem acrescentado botão público de exportação; o método manual opcional da fase 8 não faz parte do build. Relatórios de QA só usam contextos de browser isolados e fixtures sintéticos.

Antes de publicar: responsável real e contacto operacional, política do host/logs, revisão dos avisos/termos e direitos de distribuição. Não publicar a mensagem de preparação atual como aviso final nem inserir contactos fictícios. Não se afirma conformidade RGPD. Referência de orientação geral: [Comissão Europeia — informação sobre proteção de dados](https://commission.europa.eu/law/law-topic/data-protection/information-individuals_en); aplicação concreta exige revisão responsável/aconselhamento qualificado quando necessário.
