# Verificação nova da reconciliação

Execução UTC: 2026-11-08T00:30:03.024932+00:00 → 2026-11-08T00:30:08.130747+00:00.

- `rtk proxy python C:/TestLearn/tmp/phase10h-reconciliation-20261108/prepare_checks.py`: exit 0. Controlo intacto aprovado; 113/113 mutações rejeitadas, incluindo 90 alterações individuais de texto, gabarito, LO/K, omissão/duplicação, histórico, referência, fonte, parecer, correção e aprovações.
- Fonte dos 90 objetos: referência fixa do ZIP autenticado do Lote 16, não derivada do candidato. Extração atual do banco igual à referência; 90/364/64 e nove arquivos preservados.
- 421/421 ficheiros anteriores byte-idênticos; 218 documentos dos 16 lotes presentes. 90 linhas únicas e coerentes com registos originais, incluindo formatos distintos dos Lotes 1–3.
- 64/64 LO/K em ambas as edições oficiais conferidos por extração local; não prova semântica automática. 88 respostas independentes documentadas coincidem; duas ausências de registo cego autónomo não foram preenchidas.
- `git diff --check`: exit 0; nenhum diff tracked/staged. Branch/HEAD preservados.
- `rtk proxy node node_modules/prettier/bin/prettier.cjs --write docs/academic/phase10h-reconciliation-2026-11-08`: exit 0, somente documentos novos formatados. A verificação final de formato é executada abaixo pelo exportador e inclui este documento.
- Verificador portátil novo foi inspecionado antes de execução, sem rede/escritas; controlo intacto e 8/8 casos negativos do pacote aprovados/rejeitados conforme esperado. Evidência completa em reconciliation-evidence/package-negative-tests.json.
- CRC, extração limpa final e SHA-256 independente serão medidos depois da escrita do ZIP e registados no recibo externo final. A continuidade compara os 564 membros diretamente com os bytes do ZIP autenticado; os metadados históricos constam de EXPORT-CONTINUITY.json.

## Execuções históricas e limites

85 testes unitários, seleção múltipla, build e E2E dos lotes anteriores não foram reexecutados nesta reconciliação documental. Não são apresentados como resultados novos. Não houve alteração funcional que justifique repetir suítes amplas. Os casos atuais são de integridade e evidência, não provas de correção académica.

As duas falhas exploratórias de import/schema, e a correção de metadados de preflight, estão explicitamente documentadas em exceptions-conflicts.json e execution-history.json. Nenhum guard existente foi alterado e nenhum teste negativo foi enfraquecido. As falhas históricas dos Lotes 12/13 permanecem preservadas.

Estado condicionado à validação final do arquivo: RECONCILIATION_TECHNICALLY_VERIFIED — HUMAN_ACADEMIC_REVIEW_PENDING — PHASE10H_OPEN. Zero novas aceitações ou aprovações.
