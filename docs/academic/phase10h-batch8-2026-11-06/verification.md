# TestLearn — Fase10H Lote8: verificação / Batch8 verification

Data2026-11-06; workspaceC:/TestLearn/tmp/develop-workspace; develop; HEAD3fd0a85d95ecb79539515833ee3cbe7869c58049; banco2026-10-27.10.

## Preflight atual / Fresh preflight

Consultadogit status--untracked-files=all:55documentos pendentes dosLotes2–7, nenhum difftracked/staged. Os269ficheiros existentes correspondem a214tracked e55untracked. Não houve divergência inesperada/concorrrência detetada. Todos osLotes1–7presentes:66documentos (55pendentes+11tracked). Não se presumiu igualdade: hashes e banco foram comparados.

ZIP7confirmadoSHA-256967612cb998efbb64ad032672ff42e0372487cecf555488a472ddae0f4c8a334;130ficheiros/129hashes,CRC e extração limpaPASS. ScriptsVERIFY-PACKAGE.py/BATCH7-RULES.pyinspecionados antes de executar; verificador portátil anteriorPASS. Foram comparadas104cópias de origem com oworkspace,260hashes do preflight anterior e todos os90objetos do banco atual. Só depois se criaram evidências/documentos novos.

## Verificações novas / Fresh checks

Comandos de shell usamrtk proxy. Argv, timestampsUTC,exitcode e logs por comando emevidence/checks. Resultados anteriores não são apresentados como execuções novas.

| Comando subjacente                                                                                                                                                         | Resultado                    | Alcance e limite                                                                                                                                 |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| python .../verify.py integrity                                                                                                                                             | PASS,exit0                   | 269ficheiros anteriores,55pendentes,66documentosLotes1–7;90objetos/IDs/chaves/versões/explicações;9arquivos;7ficheiros recuperados iguais aoZIP7 |
| python .../verify.py batch8-specific                                                                                                                                       | PASS,exit0                   | 8registos novos,32alternativas,33pares críticos,cardinalidade2detl-001,contraevidência,candidatos opcionais e12adulterações rejeitadas           |
| python .../verify.py multiple-answer-scoring                                                                                                                               | PASS,exit0                   | 8seleções sintéticas no motorTypeScriptatual, sem armazenamento ou dados reais; não são8testesVitestadicionais                                   |
| node scripts/check-academic-deliverables.mjs --phase10h-batch2                                                                                                             | PASS,exit0                   | Guard legado/contextualdosLotes1/2; NÃO aprovação académica nem validação específica doLote8                                                     |
| node node_modules/vitest/vitest.mjs run tests/unit/academic-audit.test.ts tests/unit/quality-maintenance.test.ts tests/unit/bank-history.test.ts tests/unit/backup.test.ts | 60/60PASS,4/4ficheiros,exit0 | Integridade/explicações/histórico/backup; sem falhas/skips reportados; não prova automática de semântica                                         |

Vitest decorreu2026-11-06T13:36:43.152254UTC–13:36:47.523322UTC. Os testes existentes de checkpoints anteriores são regressão contextual, não revisão académica nova de outros itens. A igualdade do banco atual é demonstrada separadamente. O guard legado reporta90questões/364alternativas/64LO,13casos negativos e status históricos88AI_PENDING/2NEEDS_FIX; esses checkpoints não foram reescritos nem confundidos com os registos posteriores ou novos aceites.

## Verificações específicas e prevenção de falsos positivos

SoluçõesAIregistadas às2026-11-06T13:27:40.028021UTC antes de consultar chaves/justificações. Projeção com enunciados/opçõesPT/ENsem respostas ou explicações; ordenação determinística porSHA-256. Pistas do pedido eram conhecidas; não é certificaçãoSMEhumana nem experiência controlada de ausência de conhecimento prévio do modelo.

tl-001: DOIS/TWO,required=2 e conjunto{o1,o4}concordam. No motor atual foram verificadas:nenhuma seleção,apenaso1,apenaso4,conjunto correto,inversão de ordem,opção extra,conjunto incorreto e duplicação. Só os dois conjuntos exatos em ordens diferentes passam. NenhumLocalStorage foi usado.

Os checks próprios validam identidade/canonicalSHA,LO/K,versão,cardinalidade,32alternativas avaliadas,33pares de termos realmente presentes,parágrafosPT/ENde raciocínio/contraevidência/ensino/risco,fonte/páginas e diferenças opcionais restritas ao campo declarado. Em tl-015só o texto de o2é candidato; nas outras6propostas só a explicação geral; tl-001não tem proposta. Objetos completos antes/candidatos e hashes estão emoptional-candidates.json. IDs,chaves,LO,K,opções não afetadas,metadados e persistência não são alterados pelos candidatos.

Doze corrupções rejeitadas:chave múltipla parcial,cardinalidade errada,aprovação humana inventada,aceite de proprietário inventado,distrator não revisto,resposta extra suportada,contraevidência omitida,candidato marcado aplicado,página inventada,LOWusado automaticamente,âncora modal inventada e chave vazada na projeção. Estes são testes dos registos/verificador, não prova da verdade linguística e não testesVitestcontabilizados de novo.

## Fontes e limites académicos

ReferênciasEN4.0.1:LOpp.14/24/32/38;§1.1.1p.15;§1.3pp.17–18;§1.4.1pp.18–19;§2.1.5p.27;§2.3p.31;§3.1.1p.33;§3.1.3p.34;§1.2.3p.17;§4.1p.39;§4.4.2p.44.

ReferênciasPSTQBPT4.0/v1.0:LOpp.15/26/35/41;§1.1.1pp.16–17;§1.3p.19;§1.4.1pp.20–21;§2.1.5pp.29–30;§2.3pp.33–34;§3.1.1p.36;§3.1.3p.37;§1.2.3pp.18–19;§4.1p.42;§4.4.2p.48. Páginas físicas contam a capa; não se pressupõe offset fixo entre edições.

PDFs locais lidos novamente com hashes explícitos;ENoficial aberto naweb;fetchPToficialtimeout. Não se inventa download bem-sucedido nem identidade debytesremotos novos. PT4.0/v1.0não é afirmada como tradução de todas aserrataEN4.0.1. Não se redistribuemPDFs/páginas integrais protegidas. Textos propostos são do revisor, não citações oficiais. Dificuldade e suficiência pedagógica são juízoAIqualitativo, sem calibração empírica.

O helper de apresentação de fonte falhou uma vez ao pedir página fora do conjunto inicialmente extraído. Seleção explícita e reconhecimento de títulos em linha corrigiram a ferramenta; as páginas reais foram lidas com sucesso. Essa falha está registada emhelper-failures.json, não é divergência doworkspaceou teste de projeto falhado. Nenhum teste desativado; nenhum falso alarme semântico.

## Preservação e âmbito técnico

Banco atual reavaliado em memória e idêntico ao snapshot:90objetos completos,90IDsúnicos,chaves,versões,explicações e revisão.10. Arquivos.1–.9iguais embytesaoHEAD. As únicas diferenças entre.9e.10continuam a sertl-011/tl-090anteriores; nenhum item de outro lote foi revisto academicamente nesta execução. Contratosstore/backup e todos os269ficheiros existentes preservados. Dados reais não acedidos.

OZIPmantém todos os104ficheiros de origem do pacote anterior, com mesmosbytes, além dos16documentos novos. Os sete ficheiros recuperados continuam incluídos:src/data/syllabus-questions.ts,src/data/variability-questions.ts,src/domain/blueprint.ts,tests/unit/academic-audit.test.ts,tests/unit/blueprint.test.ts,tests/unit/quality-maintenance.test.ts,tests/unit/variability.test.ts. Um inventário de continuidade distingue referências preservadas de artefactos gerados novamente paraLote8; nada é omitido silenciosamente.

Prettier dos16documentos e git diff--check têm logs próprios; difftrackednão cobreuntracked, pelo que formatação,hashes e verificador portátil cobrem explicitamente os documentos novos. TypeScript,ESLint,build eE2Ecompleto não foram repetidos porque só há documentação; o check de scoring usa o motor atual em memória, não é umtypecheckcompleto. Se alterações ao banco forem futuramente autorizadas, será necessário versionamento,arquivo.10,contratos/testes de persistência e regressão proporcional. Nada disso está autorizado ou implementado agora.

## Decisões e gate final

8ACCEPT_AS_IS,0PROPOSE_CORRECTION,0BLOCKED. Nenhum defeito académico obrigatório ou ambiguidade que mude a resposta demonstrados. Sete melhorias editoriais opcionais são documentação de possibilidades, não aplicação automática deLOW. Seis expandem explicações gerais; uma torna o2detl-015uma ação de medir em vez de um resultado já medido. Em tl-001mantêm-se enunciado,opções e dificuldade.

Não há revisão.11,alteração de questões,versões,chaves,contratos ou documentos anteriores. OWNER_ACCEPTED/HUMAN_APPROVEDnovos=0. Fase10Haberta;Lote9não iniciado. Aguardar auditoria externa doZIP. Verificação portátil prova integridade/consistência, não equivalência semântica automática nem aprovação humana.

CRC,hashes,extração limpa e execução do verificador portátil são exigidos pelo exportador. O resultado real eSHAdoZIPficam no relatório externo de exportação, evitando circularidade. O pacote é autocontido para revisãoPython, não umcheckoutcompleto executável.
