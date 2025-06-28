import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faMapMarkerAlt, faGraduationCap, faBriefcase, faLightbulb, faAward, faBookOpen, faWhatsapp } from '@fortawesome/free-solid-svg-icons';

const Portfolio: React.FC = () => {
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.name}>Fernanda Maria Albuquerque Mota</h1>
        <p style={styles.title}>Psicóloga | CRP 02/21789</p>
        <div style={styles.contactInfo}>
          <p><FontAwesomeIcon icon={faMapMarkerAlt} style={styles.icon} /> Rua Mateus Tartaruga, n° 45, Hipódromo, Recife/PE</p>
          <p><FontAwesomeIcon icon={faPhone} style={styles.icon} /> (81) 98129-7306</p>
          <p><FontAwesomeIcon icon={faEnvelope} style={styles.icon} /> psicofernanda85@gmail.com</p>
        </div>
        <div style={styles.buttonContainer}>
          <Link to="/gerar-contrato" style={styles.buttonPrimary}>Gerar Contrato</Link>
          <Link to="/client-contact" style={styles.buttonSecondary}><FontAwesomeIcon icon={faWhatsapp} style={styles.icon} /> Contato Cliente</Link>
        </div>
      </header>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}><FontAwesomeIcon icon={faGraduationCap} style={styles.icon} /> Formação</h2>
        <ul style={styles.list}>
          <li>Graduada em Psicologia pela Universidade Federal de Alagoas – Campus Arapiraca/ Unidade Palmeira dos Índios.</li>
          <li>Formação Clínica em Gestalt.</li>
          <li>Pós-Graduação em Neuropsicologia pela Faculdade Unyleya.</li>
          <li>Pós-Graduação em TEA (Transtorno do Espectro Autista) pelo Grupo CEFAPP – Em fase de conclusão.</li>
        </ul>
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}><FontAwesomeIcon icon={faBriefcase} style={styles.icon} /> Experiência Profissional</h2>
        <ul style={styles.list}>
          <li>**2021 – Atualmente:** Psicóloga na AACD Associação de Assistência à Criança Deficiente.</li>
          <li>**2021-2024:** Psicóloga na Clínica Espaço Sensoré.</li>
          <li>**2017-2021:** Psicóloga na Fundação Giacomo e Lucia Perrone.</li>
          <li>**2019-2021:** Psicóloga na Clínica Espaço Metamorfosis.</li>
          <li>**2018 - Atualmente:** Atendimento Clínico de Crianças e Adolescentes com TEA.</li>
          <li>**2015-2016:** Diretora Administrativa no Memorial da Mulher Ceci Cunha.</li>
          <li>**2013-2014:** Coordenadora de Articulação Institucional na Secretaria Municipal de Políticas para as Mulheres.</li>
        </ul>
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}><FontAwesomeIcon icon={faLightbulb} style={styles.icon} /> Habilidades e Competências</h2>
        <ul style={styles.list}>
          <li>Facilidade em trabalhar com grupos terapêuticos com pacientes.</li>
          <li>Proativa em trabalhos com equipe multidisciplinar.</li>
          <li>Responsável, dinâmica e hábil em lidar com mudanças no ambiente de trabalho.</li>
          <li>Habilidade em coordenar equipes.</li>
          <li>Experiência de 5 anos com crianças no Espectro Autista, com Síndrome de Down, Transtorno do Déficit de Atenção e Hiperatividade, Paralisia cerebral e outras deficiências.</li>
        </ul>
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}><FontAwesomeIcon icon={faBookOpen} style={styles.icon} /> Cursos e Certificações</h2>
        <ul style={styles.list}>
          <li>Capacitação em Intervenção Precoce em Crianças com Autismo – Modelo Denver.</li>
          <li>Treinamento de Pais Para Profissionais – CIA do Saber.</li>
          <li>Curso sobre Sofrimento Psíquico Grave, Intervenção Precoce nas Psicoses e Saúde Mental.</li>
          <li>Capacitação para profissionais de Atendimento à Mulher em Situação de Violência.</li>
          <li>Capacitação na Lei Maria da Penha.</li>
        </ul>
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}><FontAwesomeIcon icon={faAward} style={styles.icon} /> Premiações</h2>
        <ul style={styles.list}>
          <li>Mérito Acadêmico (2011 e 2012).</li>
        </ul>
      </section>

      <footer style={styles.footer}>
        <p>&copy; {new Date().getFullYear()} Fernanda Maria Albuquerque Mota. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    fontFamily: "'Georgia', serif",
    lineHeight: '1.6',
    color: '#333',
    maxWidth: '900px',
    margin: '20px auto',
    padding: '20px',
    background: '#fff',
    boxShadow: '0 0 15px rgba(0,0,0,0.1)',
    borderRadius: '8px',
  },
  header: {
    textAlign: 'center',
    marginBottom: '40px',
    paddingBottom: '20px',
    borderBottom: '2px solid #eee',
  },
  name: {
    fontSize: '2.8em',
    margin: '0',
    color: '#2c3e50',
  },
  title: {
    fontSize: '1.4em',
    color: '#7f8c8d',
    marginBottom: '20px',
  },
  contactInfo: {
    fontSize: '1.1em',
    color: '#555',
  },
  icon: {
    marginRight: '8px',
    color: '#3498db',
  },
  buttonContainer: {
    marginTop: '30px',
    display: 'flex',
    justifyContent: 'center',
    gap: '15px',
  },
  buttonPrimary: {
    display: 'inline-block',
    padding: '12px 25px',
    backgroundColor: '#3498db',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '5px',
    fontSize: '1.1em',
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease',
    border: 'none',
    cursor: 'pointer',
  },
  buttonSecondary: {
    display: 'inline-block',
    padding: '12px 25px',
    backgroundColor: '#2ecc71',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '5px',
    fontSize: '1.1em',
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease',
    border: 'none',
    cursor: 'pointer',
  },
  section: {
    marginBottom: '30px',
    padding: '20px',
    background: '#f9f9f9',
    borderRadius: '8px',
    borderLeft: '5px solid #3498db',
  },
  sectionTitle: {
    fontSize: '1.8em',
    color: '#2c3e50',
    marginBottom: '15px',
    borderBottom: '1px solid #eee',
    paddingBottom: '10px',
  },
  list: {
    listStyleType: 'none',
    padding: '0',
  },
  listItem: {
    marginBottom: '8px',
    color: '#444',
  },
  footer: {
    textAlign: 'center',
    marginTop: '40px',
    paddingTop: '20px',
    borderTop: '1px solid #eee',
    color: '#7f8c8d',
    fontSize: '0.9em',
  },
};

export default Portfolio;
