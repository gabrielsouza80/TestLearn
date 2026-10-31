# Limites conhecidos — Beta pública

- Chaves e algoritmos existem no cliente; pontuações podem ser manipuladas e não verificam identidade/competência.
- Perguntas/traduções revistas por IA; humanApproval=PENDING, sem revisão humana independente recebida, sem piloto real ou calibração psicométrica.
- A fase 9.3 remove a fila de gravação: alterações só são aplicadas após write síncrono confirmado. A garantia é aceitação pelo navegador, não durabilidade de disco/energia ou recuperação após apagar storage. Backup JSON local é manual; não há cloud, sync automático ou garantia offline.
- Web Locks coordena páginas cooperantes da mesma origem. A fase 9.3 exige uma reserva exclusiva por separador e bloqueia edição sem a API; não existe fallback otimista. Scripts externos que ignorem a coordenação não são escritores seguros. O limite de 500 concluídas recusa excesso, sem eliminar automaticamente as mais antigas.
- Carregamento histórico depende da disponibilidade dos assets. Dados são preservados numa falha, mas o host deve manter URLs antigas; essa capacidade remota ainda não foi verificada.
- Chromium, Firefox e WebKit são exercitados na matriz da fase 9.3; resultados em phase9.3-release-gates.md. Emulação/WebKit Windows não são iPhone/Safari físico. Zoom real, leitor de ecrã e conformidade WCAG integral continuam por verificar.
- A identidade pública (Gabriel Souza), o contacto e o host Vercel estão definidos. Revisão jurídica dos avisos e direitos de terceiros, aprovação académica humana, ensaio A→B remoto e proteção obrigatória da `main` continuam pendentes para o processo de releases seguintes.
- Material interno de revisão/piloto é local e confidencial; o código cliente legítimo contém as soluções e metadados académicos necessários, não documentos reservados ou participantes.

Para o estado operativo atual, consulte [current-production-state.md](current-production-state.md). O checklist antigo é histórico e não autoriza saltar verificações futuras.
