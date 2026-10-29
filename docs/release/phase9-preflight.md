# Fase 9 — preflight e âmbito

Data: 29-10-2026. Projeto C:\TestLearn; branch main, HEAD 9623e96239c75dadfd66b20cb8265980b6e2fbc7. Existia trabalho não commitado das fases 6C/7/8; foi inventariado e preservado antes das alterações. Não se fizeram commits, push, deploy, instalações, alterações KAVTRIS ou limpeza destrutiva.

A verificação read-only da fase 8 passou antes de editar: 90 perguntas, 364 alternativas, 64 LO, 10 tabelas, 29 grupos, quatro perguntas de duas respostas e quatro de cinco alternativas. Fonte executável profundamente igual ao snapshot .9, SHA-256 **89a0d7b2483afbbd279f7a1d9ac707d1ce9b4e049225be88a59c0dd30cd42bb2**; nove snapshots com hashes conferidos. Metadados humanos continuam PENDING. O banco materializado da fase 8 tem hash f1a8174e78645ff320d3b79fafe82308b26879464f8247ad07c1399b0fc3e062.

Baseline: 139 unitários/integração, 72 E2E, JS inicial 614.765 B /188.116 B gzip. Os 139 testes foram novamente executados após a primeira alteração e passaram; depois foram acrescentados testes específicos. A baseline do bundle foi reconstruída em diretório separado a partir das cópias do preflight de App/store/styles/index e main HEAD cujo hash coincidiu com o preflight; reproduziu exatamente index-DsgzLD-J.js, 614.765/188.116 B. Nenhum ficheiro de trabalho foi revertido para construir essa baseline.

Inspecionados: App/navegação, temporizador, pontuação, validação/persistência, lazy loader, testes, Vite, assets públicos, package/lock, workflow quality, auditorias e prontidão 8A/8B. Não existe configuração de host, projeto Vercel/Netlify, domínio ou licença geral de distribuição confirmados. Apenas favicon.svg existia em public. CI valida e não publica; a sua execução remota não foi observada.

Não podem integrar o deploy: tmp, docs internos, PDFs oficiais, fontes TS, testes, .git, .env, relatórios Playwright, CSV/JSON de piloto e documentos de chaves reservados. Apenas dist validada deve sair. Os dados de perguntas/chaves necessários ao cliente e os oito chunks históricos são intencionalmente parte do produto e não são secretos.

Evidência local: tmp/phase9/baseline-files.json, before/, baseline-build.json, npm-audit.json e logs. Os ficheiros de fase 8 mantêm os seus próprios checksums; a sua comparação de código anterior é um registo histórico, não um gate a repetir contra um runtime legitimamente atualizado.
