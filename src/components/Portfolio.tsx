import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Portfolio.css';

// --- Ícones ---
const ArrowRightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1 z-10">
        <line x1="5" y1="12" x2="19" y2="12"></line>
        <polyline points="12 5 19 12 12 19"></polyline>
    </svg>
);

const DocumentIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline>
    </svg>
);

// --- Dados das Qualificações Profissionais ---
const qualifications = [
  {
    title: 'Formação Acadêmica',
    description: 'Graduada em Psicologia pela [Nome da Universidade], com especialização em Terapia Cognitivo-Comportamental (TCC). Contínuo aprimoramento em cursos sobre ansiedade, depressão e dinâmicas de relacionamento.',
    imageUrl: 'https://placehold.co/600x400/1A1A1A/C9A979?text=Formação',
    tags: ['Psicologia', 'TCC', 'Especialização'],
    buttonText: 'Agendar consulta',
    ctaUrl: '/client-contact',
  },
  {
    title: 'Experiência Clínica',
    description: 'Atuação em clínica particular com foco no atendimento de adultos e casais. Experiência no tratamento de transtornos de ansiedade, estresse, questões de autoestima e conflitos interpessoais.',
    imageUrl: 'https://placehold.co/600x400/2B2B2B/C9A979?text=Experiência',
    tags: ['Clínica Particular', 'Adultos', 'Casais'],
    buttonText: 'Agendar consulta',
    ctaUrl: '/client-contact',
  },
  {
    title: 'Abordagem Terapêutica',
    description: 'Minha prática é baseada na empatia e na construção de um espaço seguro e acolhedor. Utilizo técnicas da TCC para ajudar os clientes a identificar padrões e desenvolver novas perspectivas e habilidades.',
    imageUrl: 'https://placehold.co/600x400/3C3C3C/C9A979?text=Abordagem',
    tags: ['Empatia', 'Acolhimento', 'Resultados'],
    buttonText: 'Agendar consulta',
    ctaUrl: '/client-contact',
  },
];

const Portfolio: React.FC = () => {
    // Hook do react-router-dom para navegar entre as rotas
    const navigate = useNavigate();

    const handleNavigate = (path: string) => {
        navigate(path);
    };

    return (
        <section 
            id="qualificacoes" 
            className="portfolio-section"
            style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/dark-matter.png')"}}
        >
            {/* Overlay escuro para garantir a legibilidade do texto */}
            <div className="portfolio-overlay" />

            <div className="portfolio-container">
                {/* --- Título da Seção --- */}
                <div className="portfolio-title-section">
                    <h2 className="portfolio-title">
                        Uma jornada de cuidado guiada por uma <span className="portfolio-title-highlight">profissional qualificada</span>
                    </h2>
                    <p className="portfolio-subtitle">
                        Conheça a base de conhecimento e experiência que sustenta minha prática clínica.
                    </p>
                </div>

                {/* --- Grade de Qualificações --- */}
                <div className="qualifications-grid">
                    {qualifications.map((qual, index) => (
                        <div key={index} className="qualification-card group">
                            <div className="qualification-image-wrapper">
                                <img 
                                    src={qual.imageUrl} 
                                    alt={`Imagem ilustrativa de ${qual.title}`}
                                    className="qualification-image" 
                                    onError={(e) => { 
                                        const target = e.target as HTMLImageElement;
                                        target.onerror = null; 
                                        target.src='https://placehold.co/600x400/1A1A1A/C9A979?text=Imagem+Indisponível';
                                    }}
                                />
                            </div>
                            <div className="qualification-content">
                                <div>
                                    <h3 className="qualification-title">{qual.title}</h3>
                                    <p className="qualification-description">{qual.description}</p>
                                    <div className="qualification-tags">
                                        {qual.tags.map(tag => (
                                            <span key={tag} className="qualification-tag">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className="qualification-button-wrapper">
                                    <button 
                                        onClick={() => handleNavigate(qual.ctaUrl)}
                                        className="qualification-button group"
                                    >
                                        <span className="shine-effect"></span>
                                        <span className="qualification-button-content">{qual.buttonText} <ArrowRightIcon/></span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
            {/* --- Botão Flutuante para Gerador de Contrato --- */}
            <button
                onClick={() => handleNavigate('/gerar-contrato')}
                title="Gerador de Contrato para Psicólogos"
                className="floating-button group"
            >
                <DocumentIcon />
                <span className="floating-button-tooltip">
                    Gerador de Contrato
                </span>
            </button>
        </section>
    );
};

export default Portfolio;
