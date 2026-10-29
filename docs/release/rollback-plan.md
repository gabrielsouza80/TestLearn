# Rollback e incidentes

Antes do primeiro deploy autorizado: guardar o artefacto estático completo, inventário de hashes, source SHA, headers e regras do host, bem como um candidato anterior compatível. Não depender só de reconstruir fontes mais tarde. A retenção das URLs antigas deve ser testada no host.

Restaurar aplicação/HTML/assets/política compatível como operação de alojamento autorizada; manter a união dos assets com hash de releases anteriores e posteriores que páginas abertas ainda possam pedir. Nunca remover uma URL de chunk usada por sessões abertas ou reescrever bytes sob um hash existente. Se o host não permite isto, a estratégia não está validada e a publicação fica bloqueada.

Não executar LocalStorage.clear, Clear-Site-Data ou migração automática como parte de rollback. Reverter ficheiros não reverte o estado do cliente. Escolher como destino uma versão que reconheça **.1–.9** e o schema atual; uma versão demasiado antiga pode recusar sessões mais novas. Recusa deve preservar raw e explicar recuperação, nunca reinterpretar com outras chaves. Para esta primeira beta, manter um artefacto de recuperação compatível .9; não prometer que um commit antigo qualquer pode restaurar todas as sessões.

Smoke após rollback: HTTP de HTML/assets antigos e atuais, headers/404, estudo e exame guardados .9 e históricos, flags/ordens/prazos/respostas, pontuação original, conclusão uma vez e erro de chunk com retry. Usar fixtures sintéticos, não progresso pessoal. Uma página velha deve poder pedir um chunk velho após a troca; este teste depende do host real e permanece NOT_TESTED remotamente.

Triagem: P0 scoring/dados/segredos/identidade falsa → suspender release e preservar evidência sem dados pessoais; P1 barreira ou falha importante → corrigir ou obter exceção explícita documentada do responsável; P2 refinação → backlog sem impedir indefinidamente uma beta segura. Relatos devem conter revisão/ID/idioma/browser/passos, sem LocalStorage completo. O canal real de incidentes/contacto ainda é obrigação do responsável antes da publicação.
