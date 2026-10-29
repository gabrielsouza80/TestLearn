# Fase 9.3 — durabilidade do progresso

29-10-2026. Conteúdo `2026-10-27.9`. A fase começou em `main`, HEAD `e42f4533398e346b2c156b5063581fd1c27e2d2e`, com o trabalho local da fase 9.2 preservado. Baseline novamente executada: 165 testes unitários/integração, 100 E2E e oito testes do guard; build inicial 671 699 B / 202 402 B gzip. Banco real: 90 perguntas, 364 alternativas, 64 LO, 29 grupos; nove snapshots íntegros.

## Falha reproduzida

A versão anterior atualizava React primeiro. Um efeito enfileirava `writer.save`, que só mais tarde adquiria o Web Lock e executava `localStorage.setItem`. A seleção visível podia, portanto, anteceder a gravação. Mantendo o lock ocupado de forma determinística, selecionou-se uma resposta e recarregou-se sem esperar pelo storage: a seleção desapareceu. Evidência: `tmp/phase93/race-before.json` e `reproduce.log`. A gravidade é de integridade de dados, não uma limitação P2 aceitável.

## Correção e ordem dos acontecimentos

1. A página pede uma reserva exclusiva de escrita na origem, `testlearn-progress`, com `ifAvailable`; não fica em fila para tomar posse mais tarde de um estado antigo.
2. Enquanto não a obtém, apresenta estado de espera/indisponibilidade e não permite mutações. Um segundo separador fica sem edição; fechar o proprietário e recarregar o outro é a transferência explícita de acesso.
3. O handler calcula a alteração, valida o estado e compara o raw atual com o snapshot esperado.
4. Executa **sincronamente** `localStorage.setItem` sob a reserva exclusiva.
5. Só após sucesso atualiza a referência em memória, React e a indicação «Guardado neste navegador».
6. Falha de leitura, validação ou quota mantém o estado anterior; a alteração é recusada e o aviso explica isso. Alteração externa inesperada bloqueia a página e oferece recuperação por reload.

Não há fila de respostas pendentes, gravação em efeito React, sleeps, escrita assíncrona no unload ou dependência de `beforeunload`. `pagehide` liberta apenas a coordenação; um regresso por bfcache volta a pedir a reserva e verifica o snapshot. O motor de respostas, pontuação, prazos e revisão académica não foi alterado. A conclusão usa a sessão mais recente em memória, não uma cópia antiga de um timer.

O idioma continua a ser preferência de apresentação não persistida. Navegação entre perguntas, marcações, feedback, seleção/desseleção, início e conclusão passam pela mesma gravação antes de aplicar. A navegação entre páginas sem alterar a sessão não exige gravação.

## Fronteira da garantia

«Guardado» significa que o navegador aceitou a escrita síncrona e a aplicação a confirmou antes de aplicar a interação. Não significa `fsync`, recuperação após avaria de disco/energia, autenticação, armazenamento permanente ou recuperação de dados que o utilizador/navegador já apagou. Um backup descarregado continua a ser necessário para portabilidade e recuperação fora da origem.

A exclusão protege páginas cooperantes da mesma origem; as versões anteriores que usam o mesmo lock também ficam impedidas de escrever durante a reserva. Código externo/malicioso que ignore a coordenação não é um concorrente seguro. A comparação do raw mantém a proteção adicional contra alterações inesperadas. Sem Web Locks, ou se a aquisição falhar, a edição falha fechada; não se oferece fallback otimista que prometa segurança entre separadores.

Dados malformados/incompatíveis ficam intactos e bloqueiam novos writes normais. A recuperação não troca uma revisão histórica pelo conteúdo atual. O reset continua explícito e limitado à chave TestLearn; nunca é usado `localStorage.clear()` em produção. Falha de importação não provoca reset.

Foi removido o corte automático `slice(-500)`: exceder 500 sessões concluídas agora recusa a gravação com aviso, sem eliminar as mais antigas. O limite permanece; a aplicação não inventa capacidade ilimitada. Uma sessão ativa com o histórico cheio pode exigir exportar e gerir o perfil explicitamente antes de a concluir.

## Evidência e regressão

Os testes de durabilidade selecionam uma opção e fazem reload **sem polling de persistência**, substituem rapidamente uma resposta, navegam, marcam, desmarcam uma resposta múltipla e fecham/reabrem o separador. Verificam os dados reais restaurados. Outros casos verificam exclusão de escrita, falha de quota, ausência/rejeição de Web Locks, mudanças inesperadas e recuperação histórica. Não se terminou nenhum processo alheio para obter PASS.

Os testes anteriores de reload continuam a verificar o storage e os resultados; os novos casos, sem essa espera, impedem que o bug original volte a ser escondido por polling. O modelo de Web Locks usado em jsdom é determinístico e identificado como fixture; a exclusão real foi exercitada nos três motores de browser.

Resultados consolidados, falhas intermédias, métricas e gates: [release da fase 9.3](phase9.3-release-gates.md). Nenhuma aprovação académica humana, commit, push ou deploy é conferida por estes testes.

## Correção adicional do histórico grande

O ensaio sintético de 500 sessões revelou trabalho repetido que impedia o download de responder: o helper reconstruía visitas anteriores para cada pergunta e o timer renderizava páginas passivas a cada segundo. O conjunto anterior é agora construído uma vez por contagem; só exames com prazo mantêm ticks. O tempo apresentado é atualizado ao iniciar um exame. A semântica de visitas, pontuação e prazos não mudou. Há regressão de 500 sessões e repetição da matriz completa após estas correções.
