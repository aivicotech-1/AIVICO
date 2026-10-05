import { StrictMode } from 'react'; import { createRoot } from 'react-dom/client'; import './styles.css'; import './layout-updates.css'; import './motion.css'; import './service-cycle.css'; import App from './App';
createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>);
