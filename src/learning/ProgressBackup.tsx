import { useEffect, useRef, useState } from 'react';
import { label, type Language } from '../i18n';
import type { State } from '../storage/store';
import {
  BackupError,
  exportBackup,
  MAX_BACKUP_BYTES,
  parseBackup,
  planImport,
} from '../storage/backup';
type Preview = ReturnType<typeof planImport> & { local: State };
export default function ProgressBackup({
  state,
  language,
  canImport,
  canExport,
  isCurrent,
  onApply,
}: {
  state: State;
  language: Language;
  canImport: boolean;
  canExport: boolean;
  isCurrent: () => boolean;
  onApply: (next: State, expected: State) => 'saved' | 'changed' | 'write';
}) {
  const [candidate, setPreview] = useState<Preview | null>(null),
    [pendingFor, setPendingFor] = useState<State | null>(null),
    [message, setMessage] = useState(''),
    [failed, setFailed] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);
  const dialog = useRef<HTMLElement>(null);
  const operation = useRef({ generation: 0, alive: true });
  const preview = candidate?.local === state ? candidate : null;
  const busy = pendingFor === state;
  const t = (pt: string, en: string) => label(language, pt, en);
  useEffect(() => {
    const task = operation.current;
    task.alive = true;
    task.generation++;
    return () => {
      task.alive = false;
      task.generation++;
    };
  }, [state]);
  useEffect(() => {
    if (!preview) return;
    const buttons =
      dialog.current?.querySelectorAll<HTMLButtonElement>('button');
    const input = fileInput.current;
    buttons?.[0]?.focus();
    return () => {
      input?.focus();
    };
  }, [preview]);
  function error(reason: unknown) {
    setFailed(true);
    setMessage(reason instanceof BackupError ? reason.code : 'invalid');
  }
  function download() {
    try {
      if (!isCurrent()) throw new BackupError('changed');
      const text = exportBackup(state),
        url = URL.createObjectURL(
          new Blob([text], { type: 'application/json' }),
        );
      const link = document.createElement('a');
      link.href = url;
      link.download = 'testlearn-backup-v1.json';
      document.body.append(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 0);
      setFailed(false);
      setMessage('exported');
    } catch (reason) {
      error(reason);
    }
  }
  async function inspect(file: File | undefined) {
    if (!file) return;
    const task = operation.current;
    const token = ++task.generation,
      local = state;
    setPreview(null);
    setPendingFor(local);
    setMessage('');
    try {
      if (file.size > MAX_BACKUP_BYTES) throw new BackupError('size');
      const text = new TextDecoder('utf-8', { fatal: true }).decode(
        await file.arrayBuffer(),
      );
      const backup = await parseBackup(text),
        plan = planImport(local, backup);
      if (!task.alive || token !== task.generation) return;
      setPreview({ ...plan, local });
      setFailed(false);
    } catch (reason) {
      if (task.alive && token === task.generation) error(reason);
    } finally {
      if (task.alive && token === task.generation) setPendingFor(null);
    }
  }
  const messages: Record<string, [string, string]> = {
    size: [
      'O ficheiro excede o limite de 8 MiB. Nenhum dado foi alterado.',
      'The file exceeds the 8 MiB limit. No data was changed.',
    ],
    invalid: [
      'Backup inválido ou incompatível: verifique o formato, as revisões, as respostas e os resultados. Nenhum dado foi alterado.',
      'Invalid or incompatible backup: check format, revisions, answers and results. No data was changed.',
    ],
    historical: [
      'Não foi possível carregar uma revisão histórica. O progresso foi preservado; tente novamente.',
      'A historical revision could not be loaded. Progress was preserved; try again.',
    ],
    changed: [
      'O progresso mudou desde a leitura do backup. Volte a selecionar o ficheiro. Nenhum dado foi substituído.',
      'Progress changed since the backup was read. Select the file again. No data was replaced.',
    ],
    capacity: [
      'A importação excederia 500 sessões concluídas. Exporte o progresso; nenhum histórico foi removido.',
      'Import would exceed 500 completed sessions. Export progress; no history was removed.',
    ],
    exported: [
      'Backup preparado para descarregar. Confirme que o navegador guardou o ficheiro.',
      'Backup prepared for download. Confirm that the browser saved the file.',
    ],
    imported: [
      'Importação guardada neste navegador. Os registos locais existentes foram preservados.',
      'Import saved in this browser. Existing local records were preserved.',
    ],
    write: [
      'Não foi possível aplicar a importação. Os dados anteriores foram preservados.',
      'Could not apply the import. Previous data was preserved.',
    ],
  };
  return (
    <section className="panel progress-backup" aria-labelledby="backup-title">
      <h2 id="backup-title">
        {t('Cópia local do progresso', 'Local progress backup')}
      </h2>
      <p>
        {t(
          'O progresso fica neste navegador, que pode apagar dados do site. Exporte um ficheiro JSON para o guardar ou transferir manualmente entre dispositivos. Não há conta, envio para serviços ou sincronização automática.',
          'Progress stays in this browser, which may erase site data. Export a JSON file to keep it or transfer it manually between devices. There is no account, upload to services or automatic synchronization.',
        )}
      </p>
      <p>
        {t(
          'O ficheiro contém histórico de estudo: mantenha-o privado e guarde-o em segurança. Pode ser editado; não é um comprovativo de certificação.',
          'The file contains study history: keep it private and store it securely. It can be edited; it is not evidence of certification.',
        )}
      </p>
      <button onClick={download} disabled={!canExport}>
        {t('Exportar progresso', 'Export progress')}
      </button>
      <label className="backup-file">
        {t(
          'Importar progresso — ficheiro JSON (máximo 8 MiB)',
          'Import progress — JSON file (maximum 8 MiB)',
        )}
        <input
          type="file"
          ref={fileInput}
          accept=".json,application/json"
          disabled={!canImport || busy}
          onChange={(event) => {
            void inspect(event.target.files?.[0]);
            event.target.value = '';
          }}
        />
      </label>
      <p aria-live="polite" aria-atomic="true">
        {busy
          ? t('A validar o backup…', 'Validating backup…')
          : !failed && message
            ? t(...messages[message])
            : ''}
      </p>
      {failed && message && <p role="alert">{t(...messages[message])}</p>}
      {preview && (
        <div className="dialog-backdrop">
          <section
            ref={dialog}
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="import-title"
            aria-describedby="import-description"
            className="dialog"
            onKeyDown={(event) => {
              if (event.key === 'Escape') {
                setPreview(null);
                event.stopPropagation();
              }
              if (event.key === 'Tab') {
                const buttons =
                  dialog.current!.querySelectorAll<HTMLButtonElement>(
                    'button:not(:disabled)',
                  );
                const first = buttons[0],
                  last = buttons[buttons.length - 1];
                if (event.shiftKey && document.activeElement === first) {
                  event.preventDefault();
                  last.focus();
                } else if (!event.shiftKey && document.activeElement === last) {
                  event.preventDefault();
                  first.focus();
                }
              }
            }}
          >
            <h2 id="import-title">
              {t(
                'Confirmar importação de progresso?',
                'Confirm progress import?',
              )}
            </h2>
            <p id="import-description">
              {t(
                'Exporte primeiro o progresso atual. Só serão acrescentadas sessões novas e sem conflito. Duplicados e conflitos serão ignorados; nenhuma tentativa local será substituída.',
                'Export current progress first. Only new sessions without conflicts will be added. Duplicates and conflicts will be skipped; no local attempt will be replaced.',
              )}
            </p>
            <dl>
              <dt>{t('Válidas no backup', 'Valid in backup')}</dt>
              <dd>{preview.valid}</dd>
              <dt>{t('Novas a importar', 'New to import')}</dt>
              <dd>{preview.added}</dd>
              <dt>{t('Duplicadas exatas', 'Exact duplicates')}</dt>
              <dd>{preview.duplicates}</dd>
              <dt>{t('Conflitos ignorados', 'Conflicts skipped')}</dt>
              <dd>{preview.conflicts}</dd>
              <dt>{t('Rejeitadas', 'Rejected')}</dt>
              <dd>{preview.rejected}</dd>
            </dl>
            <div className="actions">
              <button onClick={() => setPreview(null)}>
                {t('Cancelar', 'Cancel')}
              </button>
              <button
                className="primary"
                disabled={!preview.added || !canImport}
                onClick={() => {
                  const status = onApply(preview.state, preview.local);
                  if (status !== 'saved') {
                    error(new BackupError(status));
                    setPreview(null);
                    return;
                  }
                  setPreview(null);
                  setMessage('imported');
                  setFailed(false);
                }}
              >
                {t('Confirmar importação', 'Confirm import')}
              </button>
            </div>
          </section>
        </div>
      )}
    </section>
  );
}
