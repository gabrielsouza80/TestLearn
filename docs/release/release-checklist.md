# Checklist de lançamento e ações do responsável

Este documento preserva o checklist da fase local pré-publicação; as tarefas abaixo foram levantadas antes da Beta pública e não são o estado operativo atual. Consulte [o estado de Production e o procedimento de release](current-production-state.md). Uma atualização posterior necessita de revisão própria, evidência técnica e decisão explícita.

## Evidência técnica a anexar

- [x] Banco .9 sem alterações; 90 perguntas/364 opções/64 LO e nove snapshots íntegros.
- [x] 29 grupos e 1.000 seeds, quotas 40 / capítulos 8/6/4/11/9/2 / K 8/24/8.
- [x] QA local e inventário do build; consultar release-readiness-report.md e JSON para números finais reais.
- [x] Public Beta e avisos PT-PT/EN; sem alegações oficiais/humanas/psicométricas.
- [x] Recuperação histórica 404/retry, falhas de storage, seleção múltipla, reset confirmado e proteção entre separadores.
- [x] Artefactos privados fora de dist; guard verificado e acrescentado à workflow de QA, sem deployment.
- [x] Rollback com retenção das URLs antigas e sem apagar LocalStorage está documentado.

## P0 identificados antes do primeiro lançamento — registo histórico

- [x] **Identificação pública:** Gabriel Souza (não equivale a certificação de conformidade jurídica).
- [x] **Contacto público:** testlearn808005@gmail.com, presente na aplicação PT-PT e EN.
- [x] **Host/domínio/origem:** Vercel; https://testlearn-ctfl.vercel.app/. Continua por rever a informação jurídica e operacional de logs, prazos de retenção, localização e contratos aplicáveis.
- [ ] **Revisão jurídica final:** as páginas públicas já incluem operador e contacto, mas o responsável deve validar privacidade, bases legais, direitos e eventuais obrigações com apoio adequado; evitar promessas não verificadas.
- [ ] **Direitos/titularidade/licença de uso:** confirmar autorização de distribuição do conteúdo/código/assets e limites do uso pessoal gratuito. Originalidade declarada não substitui revisão de direitos.
- [ ] **HTTPS/headers/404/cache/retention:** confirmar o contrato do host e demonstrar que um asset antigo ainda carrega após novo deploy e após rollback. Não confiar apenas no TTL.
- [ ] **Source e artefacto identificados:** rever trabalho não commitado, autorizar commit/identificador exato e inventário; não publicar a raiz.
- [x] **Primeira autorização de publicação:** a Beta pública inicial foi expressamente autorizada pelo proprietário. **Não confere aprovação automática para futuras versões**; cada promoção deve cumprir o procedimento atual.

## P1

Nenhum defeito técnico P1 confirmado ficou por corrigir no âmbito exercitado. Se teste remoto/browser/manual revelar barreira, perda de dados, falha recorrente ou regressão material, abrir P1 e corrigir ou obter exceção explícita; o PASS local não a autoriza. Uma proteção cooperante de separadores não defende contra código antigo/malicioso do próprio utilizador.

## P2 / limites divulgados

- Bundle inicial continua acima do aviso Vite de 500 kB; não foi mascarado.
- Firefox e WebKit estão abrangidos pelo CI E2E; equipamentos físicos, Safari em iPhone, leitor de ecrã e zoom real não foram validados integralmente.
- Revisão completa com leitor de ecrã/zoom real e WCAG integral por fazer, sem alegar conformidade AA.
- Revisão académica humana e piloto real pendentes, e ausência de calibração; não bloqueiam automaticamente uma beta bem identificada, mas impedem ACADEMICALLY_VALIDATED_RELEASE.
- Perfil de histórico com 500 sessões e dispositivos modestos ainda não foi objeto de benchmark de longo prazo.

## Depois de um deploy autorizado

Smoke remoto e rollback ensaiado com fixtures sintéticos, retenção de assets, headers/TLS, idiomas, privacidade/contacto reais e persistência. Documentar observações verdadeiras, triagem e responsável. Não publicar dados individuais de piloto nem tratar um resultado simulado como certificado. Ajustar canonical/robots apenas por decisão consciente sobre o domínio final; noindex pode continuar durante a beta.
