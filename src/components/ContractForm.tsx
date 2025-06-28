import React, { useState, useEffect } from 'react';
import { parseTemplate, fillTemplate } from '../utils/templateParser';
import { generatePdf } from '../utils/pdfGenerator';


interface FormData {
  [key: string]: string;
}

const ContractForm: React.FC = () => {
  useEffect(() => {
    document.title = 'Gerar Contrato';
  }, []);
  const [templateContent, setTemplateContent] = useState<string>('');
  const [templateFields, setTemplateFields] = useState<any[]>([]);
  const [formData, setFormData] = useState<FormData>(() => {
    const savedData = localStorage.getItem('contractFormData');
    const initialData = savedData ? JSON.parse(savedData) : {};

    if (!initialData.contractCity) {
      initialData.contractCity = 'Recife';
    }
    if (!initialData.contractDate) {
      const today = new Date();
      const day = String(today.getDate()).padStart(2, '0');
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const year = today.getFullYear();
      initialData.contractDate = `${day}/${month}/${year}`;
    }

    return initialData;
  });
  
  

  useEffect(() => {
    const loadTemplate = async () => {
      const { templateContent, fields } = await parseTemplate();
      setTemplateContent(templateContent);
      setTemplateFields(fields);
      console.log("Loaded Template Fields:", fields); // Debugging log
    };
    loadTemplate();
  }, []);

  useEffect(() => {
    localStorage.setItem('contractFormData', JSON.stringify(formData));
  }, [formData]);

  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const filledContract = fillTemplate(templateContent, formData);
    const parser = new DOMParser();
    const doc = parser.parseFromString(filledContract, 'text/html');
    const titleElement = doc.querySelector('title');
    const pdfTitle = titleElement ? titleElement.textContent || "Contrato" : "Contrato";
    console.log("Extracted PDF Title:", pdfTitle); // Debugging log

    await generatePdf(filledContract, 'contrato.pdf', { top: 25, right: 20, bottom: 25, left: 20 }, pdfTitle);
  };

  

  const findField = (key: string) => {
    return templateFields.find((f: any) => f.key === key);
  };

  const renderField = (field: any) => {
    if (!field) return null;
    const isOtherSelected = field.type === 'select' && formData[field.key] === 'Outro';

    return (
      <div className="mb-3">
        <label htmlFor={field.key} className="form-label">
          {field.label}
        </label>
        {field.type === 'select' ? (
          <>
            <select
              id={field.key}
              name={field.key}
              value={formData[field.key] || ''}
              onChange={handleChange}
              className="form-select"
            >
              <option value="">Selecione...</option>
              {field.options?.map((option: string) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {isOtherSelected && (
              <input
                type="text"
                id={`${field.key}-other`}
                name={`${field.key}-other`}
                value={formData[`${field.key}-other`] || ''}
                onChange={handleChange}
                className="form-control mt-2"
                placeholder="Especifique outro..."
              />
            )}
          </>
        ) : (
          <input
            type={field.type}
            id={field.key}
            name={field.key}
            value={formData[field.key] || ''}
            onChange={handleChange}
            className="form-control"
          />
        )}
      </div>
    );
  };

  return (
    <div className="p-3">
      <form onSubmit={handleSubmit}>
        <div className="card mb-3">
          <div className="card-header d-flex align-items-center bg-body-tertiary">
            <i className="fas fa-user me-2" style={{ color: 'var(--ctp-blue)' }}></i>
            <h3 className="card-title h5 mb-0" style={{ color: 'var(--ctp-blue)' }}>Dados do Paciente</h3>
          </div>
          <div className="card-body">
            <div className="mb-3">
              <label htmlFor="isMinor" className="form-label">
                O paciente é menor de idade?
              </label>
              <select
                id="isMinor"
                name="isMinor"
                value={formData.isMinor || 'false'}
                onChange={handleChange}
                className="form-select"
              >
                <option value="false">Não</option>
                <option value="true">Sim</option>
              </select>
            </div>
            <div className="row">
              <div className="col-md-6">
                {renderField(findField('clientFullName'))}
              </div>
              <div className="col-md-6">
                {renderField(findField('clientCPF'))}
              </div>
              <div className="col-md-6">
                {renderField(findField('clientRG'))}
              </div>
              <div className="col-md-6">
                {renderField(findField('clientAddress'))}
              </div>
              <div className="col-md-6">
                {renderField(findField('clientEmail'))}
              </div>
              <div className="col-md-6">
                {renderField(findField('clientPhone'))}
              </div>
            </div>
          </div>
        </div>

        <div className="card mb-3">
          <div className="card-header d-flex align-items-center bg-body-tertiary">
            <i className="fas fa-user-tie me-2" style={{ color: 'var(--ctp-blue)' }}></i>
            <h3 className="card-title h5 mb-0" style={{ color: 'var(--ctp-blue)' }}>Dados do Psicólogo(a)</h3>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                {renderField(findField('psychologistFullName'))}
              </div>
              <div className="col-md-6">
                {renderField(findField('psychologistCRP'))}
              </div>
              <div className="col-md-6">
                {renderField(findField('psychologistCPF'))}
              </div>
              <div className="col-md-6">
                {renderField(findField('psychologistAddress'))}
              </div>
              <div className="col-md-6">
                {renderField(findField('psychologistEmail'))}
              </div>
              <div className="col-md-6">
                {renderField(findField('psychologistPhone'))}
              </div>
            </div>
          </div>
        </div>

        <div className="card mb-3">
          <div className="card-header d-flex align-items-center bg-body-tertiary">
            <i className="fas fa-handshake me-2" style={{ color: 'var(--ctp-blue)' }}></i>
            <h3 className="card-title h5 mb-0" style={{ color: 'var(--ctp-blue)' }}>Detalhes do Atendimento</h3>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                {renderField(findField('servicePlatform'))}
              </div>
              <div className="col-md-6">
                {renderField(findField('serviceType'))}
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                {renderField(findField('sessionDuration'))}
              </div>
              <div className="col-md-6">
                {renderField(findField('sessionFrequency'))}
              </div>
              <div className="col-md-6">
                {renderField(findField('schedulingMethod'))}
              </div>
            </div>
          </div>
        </div>

        <div className="card mb-3">
          <div className="card-header d-flex align-items-center bg-body-tertiary">
            <i className="fas fa-dollar-sign me-2" style={{ color: 'var(--ctp-blue)' }}></i>
            <h3 className="card-title h5 mb-0" style={{ color: 'var(--ctp-blue)' }}>Condições de Pagamento</h3>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                {renderField(findField('sessionValue'))}
              </div>
              <div className="col-md-6">
                {renderField(findField('paymentMethod'))}
              </div>
              <div className="col-md-6">
                {renderField(findField('paymentPeriodicity'))}
              </div>
            </div>
          </div>
        </div>

        <div className="card mb-3">
          <div className="card-header d-flex align-items-center bg-body-tertiary">
            <i className="fas fa-file-alt me-2" style={{ color: 'var(--ctp-blue)' }}></i>
            <h3 className="card-title h5 mb-0" style={{ color: 'var(--ctp-blue)' }}>Informações do Contrato</h3>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                {renderField(findField('contractCity'))}
              </div>
              <div className="col-md-6">
                {renderField(findField('contractDate'))}
              </div>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-primary w-100 d-flex align-items-center justify-content-center"
        >
          <i className="fas fa-file-contract me-2"></i>
          Gerar Contrato
        </button>
      </form>

      
      
    </div>
  );
};

export default ContractForm;
