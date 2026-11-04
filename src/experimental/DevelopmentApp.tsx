import App from '../App';
import AdvancedTraining from './AdvancedTraining';
import './advanced-training.css';

// Only imported by the DEV branch of main.tsx; production never imports pilots.
export default function DevelopmentApp() {
  if (
    new URLSearchParams(window.location.search).get('training') === 'advanced'
  )
    return <AdvancedTraining />;
  return (
    <>
      <div className="development-access">
        <a href="/?training=advanced">
          Treino experimental · Advanced training (local)
        </a>
      </div>
      <App />
    </>
  );
}
