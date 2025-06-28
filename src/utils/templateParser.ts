interface TemplateField {
  key: string;
  label: string;
  type: string;
  options?: string[];
}

// parseTemplate will now return the full template content and all fields found within it.
export const parseTemplate = async () => {
  const response = await fetch('/template.html');
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const templateContent = await response.text();

  const fields = extractFields(templateContent);

  return { templateContent, fields };
};

const extractFields = (text: string): TemplateField[] => {
  const fieldRegex = /\{\{(.*?)(?::\s*\[(.*?)\])?\}\}/g;
  const matches = [...text.matchAll(fieldRegex)];
  const fields: TemplateField[] = [];

  const labelMap: { [key: string]: string } = {
    clientFullName: 'Nome Completo do Cliente',
    clientCPF: 'CPF do Cliente',
    clientRG: 'RG do Cliente',
    clientAddress: 'Endereço Completo do Cliente',
    clientEmail: 'E-mail do Cliente',
    clientPhone: 'Telefone/WhatsApp do Cliente',
    psychologistFullName: 'Nome Completo do(a) Psicólogo(a)',
    psychologistCRP: 'Número de Registro no CRP e Estado',
    psychologistCPF: 'CPF do(a) Psicólogo(a)',
    psychologistAddress: 'Endereço Profissional Completo',
    psychologistEmail: 'E-mail Profissional',
    psychologistPhone: 'Telefone Profissional',
    servicePlatform: 'Plataforma Digital de Atendimento',
    serviceType: 'Tipo de Atendimento',
    sessionDuration: 'Duração das Sessões',
    sessionFrequency: 'Frequência das Sessões',
    schedulingMethod: 'Forma de Agendamento',
    sessionValue: 'Valor por Sessão',
    paymentMethod: 'Forma de Pagamento',
    paymentPeriodicity: 'Periodicidade do Pagamento',
    contractCity: 'Cidade do Contrato',
    contractDate: 'Data do Contrato',
  };

  matches.forEach(match => {
    let key = match[1].trim();
    let label = labelMap[key] || key;
    let type = 'text';
    let options: string[] | undefined;

    if (match[2]) {
      type = 'select';
      options = match[2].split(',').map(opt => opt.trim());
    }

    if (key === 'sessionFrequency' && !options) {
      options = ['Semanal', 'Quinzenal', 'Mensal', 'Outro'];
      type = 'select';
    } else if (key === 'schedulingMethod' && !options) {
      options = ['E-mail', 'WhatsApp', 'Telefone', 'Outro'];
      type = 'select';
    } else if (key === 'paymentMethod' && !options) {
      options = ['PIX', 'Transferência Bancária', 'Cartão de Crédito', 'Boleto', 'Outro'];
      type = 'select';
    } else if (key === 'paymentPeriodicity' && !options) {
      options = ['Por Sessão', 'Mensal', 'Outro'];
      type = 'select';
    } else if (key === 'serviceType' && !options) {
      options = ['Psicoterapia individual', 'Aconselhamento psicológico', 'Orientação psicológica', 'Atendimento em grupo', 'Outro'];
      type = 'select';
    }

    if (key && !fields.some(f => f.key === key)) {
      fields.push({ key, label, type, options });
    }
  });
  return fields;
};

// fillTemplate will now take the full template content and replace placeholders.
export const fillTemplate = (templateContent: string, data: Record<string, string>) => {
  let filledContent = templateContent;

  if (data.sessionValue && !data.sessionValue.includes('.') && !data.sessionValue.includes(',')) {
    data.sessionValue = `${data.sessionValue},00`;
  }

  // Handle the minor block removal
  if (data["isMinor"] !== "true") {
    // This regex targets the specific blockquote for minor note
    filledContent = filledContent.replace(/<blockquote>Nota: Para atendimentos a menores de idade[^<]*<\/blockquote>/s, '');
  }

  // Replace all fields
  for (const key in data) {
    const escapedKey = key.replace(/[.*+?^${}()|\[\]\\]/g, '\\$&');
    const regex = new RegExp(`\{\{${escapedKey}(?::[^\}]*)?\}\}`, 'g');
    filledContent = filledContent.replace(regex, data[key] || `\{\{${key}\}\}`);
  }

  return filledContent;
};