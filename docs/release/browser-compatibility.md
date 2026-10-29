# Política de browser e lacunas

A fase 9.3 substitui a limitação anterior a Chromium: estão instalados os motores Playwright Chromium 156.0.8078.4, Firefox 157.0 e WebKit 27.2. A configuração cobre os três motores desktop e emulação móvel Chromium. Resultados, counts, falhas e âmbito atuais: [fase 9.3](phase9.3-cross-browser-accessibility.md) e [gates](phase9.3-release-gates.md).

WebKit Windows não é Safari/iPhone físico; nenhuma versão mínima de browser ou compatibilidade universal é deduzida do target Vite. Dispositivos físicos, todos os OS e tecnologias assistivas continuam por verificar.

A edição exige contexto seguro e Web Locks: há um único separador com reserva exclusiva. Sem a API ou quando outro separador detém a reserva, a edição fica bloqueada; não há fallback otimista que prometa transações seguras. Fechar o separador proprietário e recarregar o outro permite transferência explícita. Não existe Service Worker nem garantia offline; portabilidade usa backup JSON manual, sem cloud/sincronização automática.
