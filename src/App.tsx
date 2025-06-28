import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ContractForm from './components/ContractForm';
import ClientForm from './components/ClientForm';

function App() {
  useEffect(() => {
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.setAttribute('data-bs-theme', prefersDarkMode ? 'dark' : 'light');

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      document.documentElement.setAttribute('data-bs-theme', e.matches ? 'dark' : 'light');
    });
  }, []);

  return (
    <Router basename="/psicontratos/">
      <div className="container py-4">
        <h1 className="display-4 fw-bold mb-4 text-center">Gerador de Contratos</h1>
        <nav className="mb-4">
          <ul className="nav nav-pills justify-content-center">
            <li className="nav-item">
              <Link className="nav-link" to="/">Gerar Contrato</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/client-contact">Contato Cliente</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<ContractForm />} />
          <Route path="/client-contact" element={<ClientForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;