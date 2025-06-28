import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import ContractForm from './components/ContractForm';
import ClientForm from './components/ClientForm';
import Portfolio from './components/Portfolio';

function App() {
  const location = useLocation();

  useEffect(() => {
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.setAttribute('data-bs-theme', prefersDarkMode ? 'dark' : 'light');

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      document.documentElement.setAttribute('data-bs-theme', e.matches ? 'dark' : 'light');
    });
  }, []);

  useEffect(() => {
    const currentUrl = window.location.origin + location.pathname;
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', currentUrl);
    document.querySelector('meta[name="twitter:url"]')?.setAttribute('content', currentUrl);
  }, [location.pathname]);

  return (
    <Router basename="/">
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/gerar-contrato" element={<ContractForm />} />
        <Route path="/client-contact" element={<ClientForm />} />
      </Routes>
    </Router>
  );
}

export default App;