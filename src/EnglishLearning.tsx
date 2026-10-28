import { label, type Language } from './i18n';
export default function EnglishLearning({ language }: { language: Language }) {
  const t = (pt: string, en: string) => label(language, pt, en);
  return (
    <>
      <section className="panel">
        <span className="section-number">ENGLISH / QA</span>
        <h2>
          {t(
            'Pequenas frases. Conversas mais claras.',
            'Small sentences. Clearer conversations.',
          )}
        </h2>
        <p>
          {t(
            'Leia em voz alta e adapte os exemplos à sua experiência. Material original; traduções pendentes de revisão.',
            'Read aloud and adapt examples to your experience. Original material; translations pending review.',
          )}
        </p>
        <dl className="vocabulary">
          {[
            [
              'Test planning',
              'Planeamento de testes',
              'We agree on the test objectives before testing.',
              'We decide what to test, how and when.',
            ],
            [
              'Test analysis',
              'Análise de teste',
              'I analyse the requirements to identify what to test.',
              'Identify test conditions from the test basis.',
            ],
            [
              'Test design',
              'Conceção de teste',
              'I design test cases for the identified test conditions.',
              'Decide how to test.',
            ],
            [
              'Test execution',
              'Execução de teste',
              'I run the tests and compare actual and expected results.',
              'Run tests and record the results.',
            ],
            [
              'Defect',
              'Defeito',
              'The defect is in the discount calculation.',
              'A flaw in a work product.',
            ],
            [
              'Failure',
              'Falha',
              'The application displays an incorrect total.',
              'Observed behaviour that does not meet expectations.',
            ],
            [
              'Error',
              'Erro',
              'A misunderstanding led to the wrong calculation.',
              'A human action that produces an incorrect result.',
            ],
            [
              'Root cause',
              'Causa raiz',
              'We investigate why the requirement was misunderstood.',
              'A fundamental reason for a problem.',
            ],
            [
              'Equivalence partitioning',
              'Particionamento por equivalências',
              'I choose one representative value from each partition.',
              'Group inputs expected to be processed in the same way.',
            ],
            [
              'Boundary value analysis',
              'Análise de valor fronteira',
              'I test values at the edges of the partitions.',
              'Focus testing on partition boundaries.',
            ],
            [
              'Decision table testing',
              'Teste de tabelas de decisão',
              'I list condition combinations and their expected actions.',
              'Represent combinations of conditions and outcomes.',
            ],
            [
              'Expected / actual result',
              'Resultado esperado / obtido',
              'I expected a confirmation, but an error appeared.',
              'Compare the specified outcome with the observed outcome.',
            ],
          ].map(([term, translation, example, definition]) => (
            <div key={term}>
              <dt lang="en">
                {term}
                <span lang="pt-PT">{translation}</span>
              </dt>
              <dd>
                <p lang="en">{definition}</p>
                <blockquote lang="en">{example}</blockquote>
              </dd>
            </div>
          ))}
        </dl>
      </section>
      <section className="panel">
        <h2>{t('Praticar uma entrevista', 'Practise an interview')}</h2>
        {[
          [
            'Tell me about yourself.',
            'I am learning software testing. I enjoy investigating problems and communicating clear findings.',
          ],
          [
            'What is software testing?',
            'Testing evaluates software and related work products to discover defects and provide information about quality.',
          ],
          [
            'How do you report a bug?',
            'I describe the steps, the environment, the expected result and the actual result. I include useful evidence.',
          ],
          [
            'What is a test case?',
            'A test case describes preconditions, inputs, actions and expected results for a test objective.',
          ],
          [
            'What is regression testing?',
            'Regression testing checks whether a change has caused adverse effects in existing behaviour.',
          ],
          [
            'How do you use Playwright?',
            'I use Playwright to automate browser interactions and assert observable outcomes. I use stable locators and isolated test data.',
          ],
          [
            'How do you use equivalence partitioning?',
            'I divide data into groups expected to behave similarly and select representative values from each group.',
          ],
        ].map(([question, response]) => (
          <details key={question}>
            <summary lang="en">{question}</summary>
            <p lang="en">{response}</p>
          </details>
        ))}
      </section>
    </>
  );
}
