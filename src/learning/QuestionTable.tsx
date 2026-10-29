import { label, type Language } from '../i18n';
import type { Question } from '../domain/engine';
export default function QuestionTable({
  table,
  language,
  questionId,
}: {
  questionId: string;
  table: Question['table'];
  language: Language;
}) {
  if (!table) return null;
  return (
    <div
      className="table-scroll"
      role="region"
      tabIndex={0}
      aria-label={`${questionId}: ${label(language, 'Dados da tabela; deslocação horizontal se necessária', 'Table data; scroll horizontally if needed')}`}
    >
      <table>
        <caption>
          {label(language, 'Dados da questão', 'Question data')}
        </caption>
        <thead>
          <tr>
            {table.headers.map((cell, index) => (
              <th key={index} scope="col">
                {cell}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, index) => (
            <tr key={index}>
              {row.map((cell, i) =>
                i === 0 ? (
                  <th key={i} scope="row">
                    {cell}
                  </th>
                ) : (
                  <td key={i}>{cell}</td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
