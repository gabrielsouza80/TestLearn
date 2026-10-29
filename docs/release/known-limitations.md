# Limites conhecidos — candidato local

- Chaves e algoritmos existem no cliente; pontuações podem ser manipuladas e não verificam identidade/competência.
- Perguntas/traduções revistas por IA; humanApproval=PENDING, sem revisão humana independente recebida, sem piloto real ou calibração psicométrica.
- Aplicação não promete backup, sync, offline ou durabilidade de uma alteração ainda na fila de gravação. Storage pode estar bloqueado/cheio; o aviso pede manter a página aberta.
- Web Locks coordena apenas páginas cooperantes da mesma origem; fallback otimista e versões antigas/scripts externos exigem uso de um separador.
- Carregamento histórico depende da disponibilidade dos assets. Dados são preservados numa falha, mas o host deve manter URLs antigas; essa capacidade remota ainda não foi verificada.
- Só Chromium desktop/emulação móvel foi exercitado. Não é evidência de iPhone/Safari real, Firefox ou todos os dispositivos. Acessibilidade automatizada e revisão visual/teclado parcial não são conformidade WCAG integral.
- Sem identidade/contacto/host/direitos finais aprovados: publicação bloqueada, apesar de o software poder ser candidato técnico válido.
- Material interno de revisão/piloto é local e confidencial; o código cliente legítimo contém as soluções e metadados académicos necessários, não documentos reservados ou participantes.

Classificação, responsabilidades e condições de avanço estão no release-checklist.md; não existe exceção silenciosa para P0.
