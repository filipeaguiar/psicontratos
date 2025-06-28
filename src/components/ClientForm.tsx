import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPhone, faEnvelope, faAddressCard, faIdCard, faBriefcaseMedical } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

const ClientForm: React.FC = () => {
  const [clientFullName, setClientFullName] = useState('');
  const [clientCPF, setClientCPF] = useState('');
  const [clientRG, setClientRG] = useState('');
  const [clientAddress, setClientAddress] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [serviceType, setServiceType] = useState('');

  const serviceTypeOptions = ['Psicoterapia individual', 'Aconselhamento psicológico', 'Orientação psicológica', 'Atendimento em grupo', 'Outro'];

  useEffect(() => {
    setClientFullName(localStorage.getItem('clientFullName') || '');
    setClientCPF(localStorage.getItem('clientCPF') || '');
    setClientRG(localStorage.getItem('clientRG') || '');
    setClientAddress(localStorage.getItem('clientAddress') || '');
    setClientEmail(localStorage.getItem('clientEmail') || '');
    setClientPhone(localStorage.getItem('clientPhone') || '');
    setServiceType(localStorage.getItem('serviceType') || '');
  }, []);

  useEffect(() => {
    localStorage.setItem('clientFullName', clientFullName);
    localStorage.setItem('clientCPF', clientCPF);
    localStorage.setItem('clientRG', clientRG);
    localStorage.setItem('clientAddress', clientAddress);
    localStorage.setItem('clientEmail', clientEmail);
    localStorage.setItem('clientPhone', clientPhone);
    localStorage.setItem('serviceType', serviceType);
  }, [clientFullName, clientCPF, clientRG, clientAddress, clientEmail, clientPhone, serviceType]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Olá! Gostaria de entrar em contato.
Nome Completo: ${clientFullName}
CPF: ${clientCPF}
RG: ${clientRG}
Endereço: ${clientAddress}
E-mail: ${clientEmail}
Telefone/WhatsApp: ${clientPhone}
Tipo de Atendimento Desejado: ${serviceType}`;
    const whatsappLink = `https://wa.me/5581981297306?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, '_blank');
  };

  return (
    <div className="container py-4">
      <h2 className="text-center mb-4 display-6">Formulário de Contato do Cliente</h2>
      <div className="card p-4 shadow-lg rounded-lg">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="clientFullName" className="form-label"><FontAwesomeIcon icon={faUser} className="me-2" />Nome Completo</label>
            <input
              type="text"
              className="form-control"
              id="clientFullName"
              placeholder="Seu nome completo"
              value={clientFullName}
              onChange={(e) => setClientFullName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="clientCPF" className="form-label"><FontAwesomeIcon icon={faIdCard} className="me-2" />CPF</label>
            <input
              type="text"
              className="form-control"
              id="clientCPF"
              placeholder="Ex: 123.456.789-00"
              value={clientCPF}
              onChange={(e) => setClientCPF(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="clientRG" className="form-label"><FontAwesomeIcon icon={faIdCard} className="me-2" />RG</label>
            <input
              type="text"
              className="form-control"
              id="clientRG"
              placeholder="Ex: 12.345.678-9"
              value={clientRG}
              onChange={(e) => setClientRG(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="clientAddress" className="form-label"><FontAwesomeIcon icon={faAddressCard} className="me-2" />Endereço Completo</label>
            <input
              type="text"
              className="form-control"
              id="clientAddress"
              placeholder="Rua, Número, Bairro, Cidade, Estado, CEP"
              value={clientAddress}
              onChange={(e) => setClientAddress(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
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
            <label htmlFor="serviceType" className="form-label"><FontAwesomeIcon icon={faBriefcaseMedical} className="me-2" />Tipo de Atendimento Desejado</label>
            <select
              className="form-select"
              id="serviceType"
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value)}
              required
            >
              <option value="">Selecione...</option>
              {serviceTypeOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
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
