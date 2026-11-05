import type { Question } from '../domain/question';

const restorePrecondition = (
  text: string,
  before: string,
  after: string,
): string => {
  if (text.split(before).length !== 2)
    throw new Error('Incompatible defect report alternative');
  return text.replace(before, after);
};

// Phase 10H Batch 1. AI-reviewed corrections, still awaiting human approval.
// The published .9 snapshot remains immutable for existing attempts/backups.
export function applyAcademicBatch1(item: Question): Question {
  if (item.id !== 'tl-011' && item.id !== 'tl-090') return item;
  const previousVersion = item.id === 'tl-011' ? 2 : 1;
  const key = item.id === 'tl-011' ? 'o1' : 'o2';
  if (
    item.version !== previousVersion ||
    item.correct.join(',') !== key ||
    !item.academicReview
  )
    throw new Error(`Incompatible academic correction: ${item.id}`);
  const reviewed = {
    ...item,
    version: previousVersion + 1,
    academicReview: {
      ...item.academicReview,
      reviewedAt: '2026-11-05',
      report: `docs/academic/phase10h-batch1-2026-11-05/decisions.md#${item.id}`,
    },
  };
  if (item.id === 'tl-011') {
    const explanation = {
      en: 'The first check is confirmation testing: it verifies that the original defect was fixed. The second is regression testing: it checks for adverse consequences of the change. Regression can concern the changed component, other components, connected systems or the environment; unchanged implementation does not guarantee unaffected behavior.',
      pt: 'A primeira verificação é teste de confirmação: verifica se o defeito original foi corrigido. A segunda é teste de regressão: procura consequências adversas da alteração. A regressão pode abranger o componente alterado, outros componentes, sistemas interligados ou o ambiente; uma implementação não alterada não garante um comportamento sem efeitos adversos.',
    };
    return {
      ...reviewed,
      text: {
        en: 'After fixing a discount defect, the team reruns the test that previously failed to verify the fix. It also tests payment flows whose implementation was not changed, to check for adverse effects of the fix. What are these checks respectively?',
        pt: 'Após corrigir um defeito num desconto, a equipa repete o teste que falhou anteriormente para verificar a correção. Testa também fluxos de pagamento cuja implementação não foi alterada, para procurar efeitos adversos da correção. Que testes são, respetivamente?',
      },
      explanation,
      options: item.options.map((option) =>
        option.id === 'o1'
          ? { ...option, explanation }
          : option.id === 'o4'
            ? {
                ...option,
                explanation: {
                  en: 'The first check verifies the original defect fix, so it is confirmation testing. The second checks for adverse consequences of the change, so it is regression testing.',
                  pt: 'A primeira verificação verifica a correção do defeito original, pelo que é teste de confirmação. A segunda procura consequências adversas da alteração, pelo que é teste de regressão.',
                },
              }
            : option,
      ),
    };
  }
  return {
    ...reviewed,
    explanation: {
      en: 'The documented precondition is that transfer T-91 does not exist before creating its draft; T-91 is a transfer identifier, not a test case. Record the stock-clerk role, SKU-4 stock 20, no existing T-91, creation of draft T-91 quantity 2 and Confirm once. Expected: 20 − 2 = 18 and Confirmed. Actual: stock 20, Draft and HTTP 409. Cite req-b7 and shot-b7; neither attachment establishes the cause. Selecting a repair applies report preparation rules, but does not replace independently writing a report.',
      pt: 'A pré-condição documentada é a inexistência da transferência T-91 antes de criar o seu rascunho; T-91 é um identificador de transferência, não um caso de teste. Registar a função stock-clerk, stock 20 de SKU-4, T-91 inexistente, criação do rascunho T-91 com quantidade 2 e Confirmar uma vez. Esperado: 20 − 2 = 18 e Confirmed. Observado: stock 20, Draft e HTTP 409. Referenciar req-b7 e shot-b7; nenhum anexo estabelece a causa. Selecionar uma correção aplica regras de preparação de relatórios, mas não substitui a redação independente de um relatório.',
    },
    options: item.options.map((option) => ({
      ...option,
      text: {
        en: restorePrecondition(
          option.text.en,
          'SKU-4 stock 20, create draft',
          'SKU-4 stock 20, no existing T-91, create draft',
        ),
        pt: restorePrecondition(
          option.text.pt,
          'SKU-4 com stock 20, criar rascunho',
          'SKU-4 com stock 20, T-91 inexistente, criar rascunho',
        ),
      },
      ...(option.id === 'o2'
        ? {
            explanation: {
              en: 'This restores the role, initial stock and absence of T-91 before creating the draft, preserves the single confirmation step, derives expected stock 18 from 20 − 2, and reports the actual stock 20, Draft and HTTP 409 with the available evidence, without asserting a cause.',
              pt: 'Repõe a função, o stock inicial e a inexistência de T-91 antes de criar o rascunho, preserva o único passo de confirmação, deriva o stock esperado 18 de 20 − 2 e regista o stock observado 20, Draft e HTTP 409 com as evidências disponíveis, sem afirmar uma causa.',
            },
          }
        : {}),
    })),
  };
}
