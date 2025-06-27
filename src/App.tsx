import { useEffect } from 'react';
import ContractForm from './components/ContractForm';

function App() {
  useEffect(() => {
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.setAttribute('data-bs-theme', prefersDarkMode ? 'dark' : 'light');

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      document.documentElement.setAttribute('data-bs-theme', e.matches ? 'dark' : 'light');
    });
  }, []);

  return (
    <div className="container py-4">
      <h1 className="display-4 fw-bold mb-4 text-center">Gerador de Contratos</h1>
      <ContractForm />
    </div>
  );
}

export default App;