import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPhone, faEnvelope, faPaperPlane, faWhatsapp } from '@fortawesome/free-solid-svg-icons';

const ClientForm: React.FC = () => {
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Olá! Gostaria de entrar em contato. Meu nome é ${clientName}, meu telefone é ${clientPhone} e meu e-mail é ${clientEmail}.`;
    const whatsappLink = `https://wa.me/5581981297306?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, '_blank');
  };

  return (
    <div className="container py-4">
      <h2 className="text-center mb-4 display-6">Formulário de Contato do Cliente</h2>
      <div className="card p-4 shadow-lg rounded-lg">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="clientName" className="form-label"><FontAwesomeIcon icon={faUser} className="me-2" />Nome Completo</label>
            <input
              type="text"
              className="form-control"
              id="clientName"
              placeholder="Seu nome completo"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="clientPhone" className="form-label"><FontAwesomeIcon icon={faPhone} className="me-2" />Telefone/WhatsApp</label>
            <input
              type="tel"
              className="form-control"
              id="clientPhone"
              placeholder="Ex: (81) 98129-7306"
              value={clientPhone}
              onChange={(e) => setClientPhone(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="clientEmail" className="form-label"><FontAwesomeIcon icon={faEnvelope} className="me-2" />E-mail</label>
            <input
              type="email"
              className="form-control"
              id="clientEmail"
              placeholder="seuemail@example.com"
              value={clientEmail}
              onChange={(e) => setClientEmail(e.target.value)}
              required
            />
          </div>
          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-success btn-lg">
              <FontAwesomeIcon icon={faWhatsapp} className="me-2" />Enviar via WhatsApp
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClientForm;
