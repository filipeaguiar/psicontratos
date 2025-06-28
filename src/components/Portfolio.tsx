import React from 'react';
import { useNavigate } from 'react-router-dom';

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
            className="bg-cover bg-fixed relative"
            style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/dark-matter.png')"}}
        >
            {/* Overlay escuro para garantir a legibilidade do texto */}
            <div className="absolute inset-0 bg-[#111111]/95" />

            <div className="container mx-auto py-20 px-4 sm:px-6 lg:px-8 relative z-10">
                {/* --- Título da Seção --- */}
                <div className="text-center mb-20">
                    <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                        Uma jornada de cuidado guiada por uma <span className="text-[#C9A979]">profissional qualificada</span>
                    </h2>
                    <p className="mt-6 text-xl text-gray-400 max-w-3xl mx-auto">
                        Conheça a base de conhecimento e experiência que sustenta minha prática clínica.
                    </p>
                </div>

                {/* --- Grade de Qualificações --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {qualifications.map((qual, index) => (
                        <div key={index} className="bg-[#1C1C1C] rounded-lg overflow-hidden shadow-2xl shadow-black/30 border border-transparent hover:border-[#C9A979]/30 transition-all duration-300 ease-in-out flex flex-col group">
                            <div className="overflow-hidden">
                                <img
                                    src={qual.imageUrl}
                                    alt={`Imagem ilustrativa de ${qual.title}`}
                                    className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.onerror = null;
                                        target.src='https://placehold.co/600x400/1A1A1A/C9A979?text=Imagem+Indisponível';
                                    }}
                                />
                            </div>
                            <div className="p-8 flex flex-col flex-grow">
                                <div>
                                    <h3 className="text-2xl font-bold text-white mb-4">{qual.title}</h3>
                                    <p className="text-gray-400 mb-6 flex-grow">{qual.description}</p>
                                    <div className="mb-8">
                                        {qual.tags.map(tag => (
                                            <span key={tag} className="inline-block bg-[#C9A979]/10 text-[#C9A979] rounded-full px-3 py-1 text-sm font-medium mr-2 mb-2">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className="mt-auto">
                                    <button
                                        onClick={() => handleNavigate(qual.ctaUrl)}
                                        className="shine-button inline-flex items-center justify-center w-full px-6 py-3 bg-[#C9A979] text-black font-bold rounded-md transition-colors duration-300 text-center group"
                                    >
                                        <span className="relative z-10 flex items-center">{qual.buttonText} <ArrowRightIcon/></span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* --- Botão Flutuante para Gerador de Contrato --- */}
            <button
                onClick={() => handleNavigate('/contract-form')}
                title="Gerador de Contrato para Psicólogos"
                className="fixed bottom-8 right-8 bg-[#C9A979] text-black w-16 h-16 rounded-full shadow-lg flex items-center justify-center hover:bg-amber-300 transition-colors duration-300 z-50 group"
            >
                <DocumentIcon />
                <span className="absolute bottom-1/2 translate-y-1/2 right-full mr-4 px-3 py-1.5 bg-[#1C1C1C] text-white text-sm font-medium rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Gerador de Contrato
                </span>
            </button>
        </section>
    );
};

export default Portfolio;
