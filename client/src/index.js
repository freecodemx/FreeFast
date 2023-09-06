import { BrowserRouter as Router } from 'react-router-dom';
import { createRoot } from 'react-dom'; // Importa createRoot desde react-dom
import './index.css';
import App from './App';

// Utiliza createRoot en lugar de ReactDOM.render
createRoot(document.getElementById('root')).render(
  <Router>
    <App />
  </Router>
);
