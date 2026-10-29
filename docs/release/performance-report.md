# Desempenho — artefacto final

> Atualização: resultados e preparação atuais em [fase 9.3](phase9.3-release-gates.md). O detalhe abaixo conserva a evidência/contrato anterior; não representa uma nova validação remota ou manual.

> Medição histórica da fase 9. A comparação da fase 9.2, com o catálogo e revisão educativos, está em [Fase 9.2](phase9.2-educational-ux.md) e no JSON de release.

29-10-2026. Chromium 156.0.8078.4, Node v24.19.0; AMD Ryzen Z1 Extreme, 16 CPUs lógicos; sem throttling. Build real e grafo observados; evidência local tmp/phase9/performance.json. Não é benchmark de dispositivo móvel físico.

| Medida       | Baseline reconstruída |                 Final |                     Diferença |
| ------------ | --------------------: | --------------------: | ----------------------------: |
| JS inicial   |              614765 B |              629032 B |             +14267 B (+2.32%) |
| Gzip inicial |              188116 B |              193417 B |              +5301 B (+2.82%) |
| Total JS     |             1816572 B |             1830839 B |                      +14267 B |
| CSS          | 13376 B / 3500 B gzip | 13854 B / 3624 B gzip | textos/foco/navegação pública |

Entrada assets/index-DKtbpw9f.js, SHA-256 1aa3f7f07403fbdbc5b6977c4b22ad8957c888fb6b9fc1d9fab9418e22d4bf32. Oito chunks históricos separados, mesmos bytes/nomes hash da baseline; zero módulos de archive no entry e zero imports de tmp/docs/tests/config no cliente. Um pedido JS inicial e CSS local, além do HTML; favicon local se o browser o pedir. Os cenários históricos pedem só um chunk correspondente, a frio/reload; o painel novo pede zero arquivos. Nenhum pacote privado da fase 8 é asset adicional.

O aumento corresponde à informação pública bilingue, tratamento de erros e proteção de gravação. O aviso Vite >500kB permanece visível; não se mudou chunkSizeWarningLimit nem se reestruturou a aplicação. PURE do Zod e avisos NO_COLOR/FORCE_COLOR também foram conservados.

## Tempo observado

Cenários: três contextos frios e três reloads por caso; a criação do exame foi medida em cada painel novo. Primeira medição de script falhou num seletor com acentos corrompidos; foi corrigido. A primeira amostra bem-sucedida coincidiu com QA paralelo e foi retida como performance-concurrent.json, não usada como comparação controlada. Medição final do artefacto atual em performance.json; não foram descartados os tempos lentos do primeiro contexto.

- fresh: média fria 348.1 ms; reload 65.7 ms.
- 2026-10-27.7-exam: média fria 281 ms; reload 84.1 ms.
- 2026-10-27.8-exam: média fria 281.7 ms; reload 90.1 ms.
- 2026-10-27.8-practice: média fria 388.5 ms; reload 100.4 ms.
- 2026-10-27.8-history: média fria 339.1 ms; reload 91.5 ms.

Criação de exame após painel: 106/77.2/87/66.2/78.1/70.2 ms (seis observações). Os snapshots de heap são observações locais, não teste de fuga de memória ou stress com 500 sessões.

Comparação adicional com seis contextos por build, ordem before/after alternada e os mesmos headers, sem suite paralela (controlled-startup.json):

| Mediana   |    Antes |   Depois |
| --------- | -------: | -------: |
| cold      | 283.3 ms | 290.3 ms |
| warm      |  59.3 ms |  58.7 ms |
| startExam |  76.2 ms |  82.7 ms |

O aumento de bytes é real; as distribuições locais têm variação e outliers. Não se demonstrou uma regressão material de arranque nestes ensaios nem se alega melhoria, equivalência entre dispositivos ou ausência geral de regressão. Rever dispositivos modestos, histórico longo e host real antes de prometer desempenho.
