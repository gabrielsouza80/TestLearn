# Segurança e modelo de ameaças — beta independente

Âmbito: aplicação educativa anónima no navegador, sem conta/backend/credenciais de exame. Não é uma auditoria completa de segurança. O resultado local não certifica a configuração de um host ainda inexistente.

| Situação                                               | Classificação e tratamento                                                                                                                                                                                                                             |
| ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Chaves no JavaScript; scores/LocalStorage manipuláveis | Limitação arquitetural aceite para autoestudo, explicitada na interface. Não é um exame inviolável, prova de identidade ou credencial verificável.                                                                                                     |
| Dois separadores substituem progresso                  | Risco demonstrado no código anterior. Novo writer compara o valor bruto, usa Web Locks entre separadores cooperantes e serializa as alterações da página. Um conflito interrompe gravações e oferece recarregar o estado guardado, sem merge/migração. |
| Escritas de versões antigas ou scripts externos        | Não obedecem necessariamente ao Web Lock. Fallback sem Web Locks é comparação otimista, não transação atómica entre processos. Recomenda-se um separador e não se promete proteção contra manipulação do próprio cliente.                              |
| JSON local malformado/versão desconhecida              | Schema versionado, listas de revisões e validação de IDs/opções/ordem/prazos. Preserva o valor original até ação explícita. Propriedades extra não são executadas; teste de **proto** confirma ausência de poluição e de overwrite na leitura.         |
| Conteúdo malicioso/renderização                        | Texto e tabelas React, sem HTML arbitrário, eval ou URLs de dados fornecidos pelo utilizador. Apenas ligação oficial externa fixa; noreferrer e política no-referrer.                                                                                  |
| Imports históricos                                     | URLs literais por revisão autorizada; sem imports derivados de input arbitrário. Falha nunca substitui pelo banco atual. 404, interrupção, reload e retry exercitados.                                                                                 |
| Atualização remove chunks antigos                      | Risco real dependente do host. Conservar a união dos assets imutáveis de todos os releases; nunca confiar só na cache do browser. Plano de deploy/rollback e gate externo obrigatório.                                                                 |
| Exposição de documentos/piloto/segredos                | Apenas dist; allowlist de artefactos, grafo de módulos e pedidos HTTP. Não há import de tmp/docs/tests. Testes negativos recusam PDF/CSV/JSON privado/Markdown/source maps.                                                                            |
| Alojamento/TLS/logs/headers                            | Ainda não verificado num host real. Bloqueia publicação até configuração, contrato/processamento e smoke remoto serem revistos.                                                                                                                        |
| Dependências e cadeia de fornecimento                  | Lock preservado, npm audit reportou zero vulnerabilidades em 29-10-2026, exit0. Não é garantia contra vulnerabilidades desconhecidas ou compromisso da registry. Não foram instalados pacotes.                                                         |
| Falha inesperada de renderização                       | Boundary com mensagem genérica bilingue e reload; não mostra detalhes internos nem apaga progresso.                                                                                                                                                    |

## Headers e configuração

config/security-headers.json é a política aplicada **ao preview local**. CSP self para scripts/styles/imagens/fonts/connect, sem unsafe-inline/eval; base/object/form/frame/worker bloqueados conforme a política. Testado carregamento React/CSS, imports históricos e bloqueio real de script inline por securitypolicyviolation. X-Content-Type-Options nosniff, Referrer-Policy no-referrer, Permissions-Policy restritiva, X-Frame-Options DENY, robots noindex e Cache-Control no-cache. Não enfraquecer CSP para acomodar analytics ou testes.

O host deve aplicar esses headers como respostas HTTP, incluindo erros; frame-ancestors não se resolve com uma meta tag. HTTPS/redirect/HSTS exigem verificação no domínio real; não se inventou domínio nem se configurou preload. Nenhum sourcemap no build. Nenhuma variável de ambiente de aplicação é necessária ou referenciada; CI usa CI apenas no runner. Nenhum segredo foi copiado para relatórios. Só o favicon existente e robots foram usados; sem logótipos ISTQB/PSTQB.

A aplicação não recolhe eventos novos. O lock e o listener storage protegem a persistência existente, sem analytics. A gravação coordenada é assíncrona; fechar a página imediatamente pode perder alterações ainda não persistidas. Nunca garantir durabilidade se o browser bloquear armazenamento.

## Referências consultadas

- [Vite — deployment estático](https://vite.dev/guide/static-deploy): preview é apenas local, não servidor de produção.
- [MDN — CSP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy).
- [MDN — Web Locks](https://developer.mozilla.org/en-US/docs/Web/API/Web_Locks_API): coordenação de recursos da mesma origem em contextos seguros.
- [MDN — Cache-Control](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Cache-Control): HTML revalidado e URLs versionados imutáveis. Cache não garante retenção de assets no servidor.
