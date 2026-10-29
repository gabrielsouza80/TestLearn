import { Component, type ReactNode } from 'react';
/** Recoverable display failure; never reset or expose saved content in an error. */
export default class ApplicationBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    if (this.state.failed)
      return (
        <main>
          <h1>TestLearn — Public Beta</h1>
          <div role="alert">
            <p>
              Não foi possível apresentar a aplicação. Os dados guardados não
              foram apagados. Recarregue a página; não limpe o armazenamento
              para resolver este erro. / Could not display the application.
              Saved data has not been deleted. Reload the page; do not clear
              storage to fix this error.
            </p>
            <button onClick={() => window.location.reload()}>
              Recarregar / Reload
            </button>
          </div>
        </main>
      );
    return this.props.children;
  }
}
