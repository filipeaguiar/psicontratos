import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="container py-4 text-center">
      <h1 className="display-4 fw-bold mb-5">Gerador de Contratos</h1>
      <div className="d-grid gap-3 col-md-6 mx-auto">
        <Link to="/gerar-contrato" className="btn btn-primary btn-lg">Gerar Contrato</Link>
        <Link to="/client-contact" className="btn btn-secondary btn-lg">Contato Cliente</Link>
      </div>
    </div>
  );
};

export default Home;
