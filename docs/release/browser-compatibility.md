# Política de browser e lacunas

Evidência local: Playwright 1.64.1, Chromium 156.0.8078.4, desktop e emulação móvel Chromium. Percursos de exame, prática, reload, seleção múltipla, cinco alternativas, idiomas, storage, falhas/retry e acessibilidade cobertos pela suite completa. Não é teste de iPhone/Safari real nem de telemóvel físico.

Os executáveis Firefox e WebKit foram procurados via executablePath e **não estão disponíveis**. Não foram instalados. Estados: Chromium PASS no âmbito exercitado; Firefox NOT_TESTED; WebKit NOT_TESTED; dispositivos/OS físicos NOT_TESTED. Não alegar suporte validado de Safari/Firefox/Edge ou de versões mínimas específicas a partir apenas do build target Vite.

Para a beta, a única evidência automatizada de compatibilidade é este Chromium atual. Antes de anunciar uma lista mais ampla, instalar/autorizar browsers relevantes em ambiente de QA e correr os mesmos testes de produção, incluindo Web Locks/fallback, storage privado, imports dinâmicos e tabelas. Testar também um dispositivo modesto real. Ausência de binário é lacuna de evidência, não uma falha comprovada do produto.

Web Locks exige contexto seguro; produção deve usar HTTPS. Sem essa API, a comparação otimista continua a preservar conflitos observados, mas não é um CAS transacional entre processos. Um separador de trabalho continua recomendado. Não há Service Worker, garantia offline nem sincronização de dispositivos.
