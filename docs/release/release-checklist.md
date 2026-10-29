# Checklist de lançamento e ações do responsável

O candidato é local. Nenhuma linha abaixo constitui autorização de publicar. Não avançar com P0 pendente; qualquer exceção P1 exige decisão explícita com impacto documentado.

## Evidência técnica a anexar

- [x] Banco .9 sem alterações; 90 perguntas/364 opções/64 LO e nove snapshots íntegros.
- [x] 29 grupos e 1.000 seeds, quotas 40 / capítulos 8/6/4/11/9/2 / K 8/24/8.
- [x] QA local e inventário do build; consultar release-readiness-report.md e JSON para números finais reais.
- [x] Public Beta e avisos PT-PT/EN; sem alegações oficiais/humanas/psicométricas.
- [x] Recuperação histórica 404/retry, falhas de storage, seleção múltipla, reset confirmado e proteção entre separadores.
- [x] Artefactos privados fora de dist; guard verificado e acrescentado à workflow de QA, sem deployment.
- [x] Rollback com retenção das URLs antigas e sem apagar LocalStorage está documentado.

## P0 externos — OWNER_ACTION_REQUIRED antes de publicar

- [ ] **Responsável/titular real:** [OWNER_REQUIRED, preencher apenas aqui até revisão].
- [ ] **Contacto público operacional e procedimento de privacidade/erros:** [OWNER_REQUIRED]. Não há email ou canal inventado na aplicação.
- [ ] **Host/domínio/origem final:** [OWNER_REQUIRED]. Confirmar ausência de analytics/cookies injetados pelo fornecedor, logs, categorias/finalidades/fundamento/retenção/acesso/localização e condições contratuais aplicáveis.
- [ ] **Texto público final:** rever privacidade/termos com o responsável e apoio jurídico quando necessário; substituir a informação de preparação, sem publicar placeholders ou promessas não verificadas.
- [ ] **Direitos/titularidade/licença de uso:** confirmar autorização de distribuição do conteúdo/código/assets e limites do uso pessoal gratuito. Originalidade declarada não substitui revisão de direitos.
- [ ] **HTTPS/headers/404/cache/retention:** confirmar o contrato do host e demonstrar que um asset antigo ainda carrega após novo deploy e após rollback. Não confiar apenas no TTL.
- [ ] **Source e artefacto identificados:** rever trabalho não commitado, autorizar commit/identificador exato e inventário; não publicar a raiz.
- [ ] **Autorização explícita de publicação:** responsável aprova source SHA, artefacto, host e avisos finais. Até aí PUBLICATION_AUTHORIZED=NO e PUBLIC_BETA_READY=BLOCKED.

## P1

Nenhum defeito técnico P1 confirmado ficou por corrigir no âmbito exercitado. Se teste remoto/browser/manual revelar barreira, perda de dados, falha recorrente ou regressão material, abrir P1 e corrigir ou obter exceção explícita; o PASS local não a autoriza. Uma proteção cooperante de separadores não defende contra código antigo/malicioso do próprio utilizador.

## P2 / limites divulgados

- Bundle inicial continua acima do aviso Vite de 500 kB; não foi mascarado.
- Firefox/WebKit e equipamentos físicos não testados; não anunciar compatibilidade validada nesses browsers.
- Revisão completa com leitor de ecrã/zoom real e WCAG integral por fazer, sem alegar conformidade AA.
- Revisão académica humana e piloto real pendentes, e ausência de calibração; não bloqueiam automaticamente uma beta bem identificada, mas impedem ACADEMICALLY_VALIDATED_RELEASE.
- Perfil de histórico com 500 sessões e dispositivos modestos ainda não foi objeto de benchmark de longo prazo.

## Depois de um deploy autorizado

Smoke remoto e rollback ensaiado com fixtures sintéticos, retenção de assets, headers/TLS, idiomas, privacidade/contacto reais e persistência. Documentar observações verdadeiras, triagem e responsável. Não publicar dados individuais de piloto nem tratar um resultado simulado como certificado. Ajustar canonical/robots apenas por decisão consciente sobre o domínio final; noindex pode continuar durante a beta.
