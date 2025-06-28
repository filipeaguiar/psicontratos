import React, { useState, useEffect } from 'react'; // Added useState for hover effects
import { useNavigate } from 'react-router-dom';

// --- Style Definitions ---

const styles: { [key: string]: React.CSSProperties } = {
  // Icons
  arrowRightIcon: {
    width: '1.25rem', // w-5
    height: '1.25rem', // h-5
    marginLeft: '0.5rem', // ml-2
    transitionProperty: 'transform',
    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
    transitionDuration: '150ms', // transition-transform
    zIndex: 10, // z-10
  },
  arrowRightIconHover: { // For group-hover:translate-x-1
    transform: 'translateX(0.25rem)',
  },
  documentIcon: {
    width: '1.5rem', // w-6
    height: '1.5rem', // h-6
  },

  // Portfolio Section
  portfolioSection: {
    backgroundSize: 'cover', // bg-cover
    backgroundAttachment: 'fixed', // bg-fixed
    position: 'relative', // relative
    // backgroundImage is set inline via style prop
  },
  portfolioOverlay: {
    position: 'absolute', // absolute
    top: 0, right: 0, bottom: 0, left: 0, // inset-0
    backgroundColor: 'rgba(17, 17, 17, 0.95)', // bg-[#111111]/95
  },
  portfolioContainer: {
    // For 'container': Typically max-width with auto margins.
    // Tailwind's container also has responsive padding, handled by px-*, sm:px-*, lg:px-*
    // Using a common desktop-first approach for max-width:
    maxWidth: '1280px', // Example, Tailwind's default is breakpoint-dependent
    marginLeft: 'auto', // mx-auto
    marginRight: 'auto', // mx-auto
    paddingTop: '5rem', // py-20
    paddingBottom: '5rem', // py-20
    paddingLeft: '1rem', // px-4. Base padding.
    paddingRight: '1rem', // px-4. Base padding.
    // sm:px-6 would be @media (min-width: 640px) { paddingLeft: 1.5rem; paddingRight: 1.5rem; }
    // lg:px-8 would be @media (min-width: 1024px) { paddingLeft: 2rem; paddingRight: 2rem; }
    position: 'relative', // relative
    zIndex: 10, // z-10
  },
  titleSection: {
    textAlign: 'center', // text-center
    marginBottom: '5rem', // mb-20
  },
  mainTitle: {
    fontSize: '2.25rem', // text-4xl
    lineHeight: '2.5rem',
    fontWeight: 700, // font-bold
    letterSpacing: '-0.025em', // tracking-tight
    color: '#ffffff', // text-white
    // sm:text-5xl would be @media (min-width: 640px) { fontSize: 3rem; lineHeight: 1; }
  },
  mainTitleSpan: {
    color: '#C9A979', // text-[#C9A979]
  },
  subTitle: {
    marginTop: '1.5rem', // mt-6
    fontSize: '1.25rem', // text-xl
    lineHeight: '1.75rem',
    color: '#9ca3af', // text-gray-400
    maxWidth: '48rem', // max-w-3xl
    marginLeft: 'auto', // mx-auto
    marginRight: 'auto', // mx-auto
  },

  // Qualifications Grid
  qualificationsGrid: {
    display: 'grid', // grid
    gridTemplateColumns: 'repeat(1, minmax(0, 1fr))', // grid-cols-1
    // md:grid-cols-2 would be @media (min-width: 768px) { gridTemplateColumns: 'repeat(2, minmax(0, 1fr))'; }
    // lg:grid-cols-3 would be @media (min-width: 1024px) { gridTemplateColumns: 'repeat(3, minmax(0, 1fr))'; }
    gap: '2.5rem', // gap-10
  },
  qualificationCard: {
    backgroundColor: '#1C1C1C', // bg-[#1C1C1C]
    borderRadius: '0.5rem', // rounded-lg
    overflow: 'hidden', // overflow-hidden
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.30)', // shadow-2xl shadow-black/30
    borderWidth: '1px', // border
    borderStyle: 'solid', // Assuming solid border
    borderColor: 'transparent', // border-transparent
    transitionProperty: 'all', // transition-all
    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)', // ease-in-out
    transitionDuration: '300ms', // duration-300
    display: 'flex', // flex
    flexDirection: 'column', // flex-col
    // hover:border-[#C9A979]/30 needs JS for inline or separate CSS
  },
  qualificationCardHover: { // For hover:border-[#C9A979]/30
    borderColor: 'rgba(201, 169, 121, 0.3)',
  },
  cardImageContainer: {
    overflow: 'hidden', // overflow-hidden
  },
  cardImage: {
    width: '100%', // w-full
    height: '14rem', // h-56
    objectFit: 'cover', // object-cover
    transitionProperty: 'transform', // transition-transform
    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
    transitionDuration: '500ms', // duration-500
    // group-hover:scale-105 needs JS for inline or separate CSS
  },
  cardImageHover: { // For group-hover:scale-105
     transform: 'scale(1.05)',
  },
  cardTextContent: {
    padding: '2rem', // p-8
    display: 'flex', // flex
    flexDirection: 'column', // flex-col
    flexGrow: 1, // flex-grow
  },
  cardTitle: {
    fontSize: '1.5rem', // text-2xl
    lineHeight: '2rem',
    fontWeight: 700, // font-bold
    color: '#ffffff', // text-white
    marginBottom: '1rem', // mb-4
  },
  cardDescription: {
    color: '#9ca3af', // text-gray-400
    marginBottom: '1.5rem', // mb-6
    flexGrow: 1, // flex-grow
  },
  tagsContainer: {
    marginBottom: '2rem', // mb-8
  },
  tagSpan: {
    display: 'inline-block', // inline-block
    backgroundColor: 'rgba(201, 169, 121, 0.1)', // bg-[#C9A979]/10
    color: '#C9A979', // text-[#C9A979]
    borderRadius: '9999px', // rounded-full
    paddingLeft: '0.75rem', // px-3
    paddingRight: '0.75rem', // px-3
    paddingTop: '0.25rem', // py-1
    paddingBottom: '0.25rem', // py-1
    fontSize: '0.875rem', // text-sm
    lineHeight: '1.25rem',
    fontWeight: 500, // font-medium
    marginRight: '0.5rem', // mr-2
    marginBottom: '0.5rem', // mb-2
  },
  cardButtonContainer: {
    marginTop: 'auto', // mt-auto
  },
  ctaButton: {
    // 'shine-button' is a custom class, will be kept as className
    display: 'inline-flex', // inline-flex
    alignItems: 'center', // items-center
    justifyContent: 'center', // justify-center
    width: '100%', // w-full
    paddingLeft: '1.5rem', // px-6
    paddingRight: '1.5rem', // px-6
    paddingTop: '0.75rem', // py-3
    paddingBottom: '0.75rem', // py-3
    backgroundColor: '#C9A979', // bg-[#C9A979]
    color: '#000000', // text-black
    fontWeight: 700, // font-bold
    borderRadius: '0.375rem', // rounded-md
    transitionProperty: 'color, background-color, border-color, text-decoration-color, fill, stroke', // transition-colors
    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
    transitionDuration: '300ms', // duration-300 (overrides default 150ms)
    textAlign: 'center', // text-center
    textDecoration: 'none', // In case it's an anchor styled as button
    border: 'none', // Assuming it's a button
    cursor: 'pointer',
  },
  ctaButtonSpan: {
    position: 'relative', // relative
    zIndex: 10, // z-10
    display: 'flex', // flex
    alignItems: 'center', // items-center
  },

  // Floating Action Button
  fab: {
    position: 'fixed', // fixed
    bottom: '2rem', // bottom-8
    right: '2rem', // right-8
    backgroundColor: '#C9A979', // bg-[#C9A979]
    color: '#000000', // text-black
    width: '4rem', // w-16
    height: '4rem', // h-16
    borderRadius: '9999px', // rounded-full
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)', // shadow-lg
    display: 'flex', // flex
    alignItems: 'center', // items-center
    justifyContent: 'center', // justify-center
    transitionProperty: 'color, background-color, border-color, text-decoration-color, fill, stroke', // transition-colors
    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
    transitionDuration: '300ms', // duration-300
    zIndex: 50, // z-50
    border: 'none',
    cursor: 'pointer',
  },
  fabHover: { // For hover:bg-amber-300
    backgroundColor: '#fcd34d', // amber-300
  },
  fabTooltip: {
    position: 'absolute', // absolute
    bottom: '50%', // bottom-1/2
    transform: 'translateY(50%)', // translate-y-1/2
    right: '100%', // right-full
    marginRight: '1rem', // mr-4
    paddingLeft: '0.75rem', // px-3
    paddingRight: '0.75rem', // px-3
    paddingTop: '0.375rem', // py-1.5
    paddingBottom: '0.375rem', // py-1.5
    backgroundColor: '#1C1C1C', // bg-[#1C1C1C]
    color: '#ffffff', // text-white
    fontSize: '0.875rem', // text-sm
    lineHeight: '1.25rem',
    fontWeight: 500, // font-medium
    borderRadius: '0.375rem', // rounded-md
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)', // shadow-lg
    opacity: 0, // opacity-0
    transitionProperty: 'opacity', // transition-opacity
    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
    transitionDuration: '150ms',
    whiteSpace: 'nowrap', // whitespace-nowrap
    // group-hover:opacity-100 needs JS
  },
  fabTooltipHover: { // For group-hover:opacity-100
    opacity: 1,
  },
};

// --- Ícones ---
// Note: For group-hover effects on icons within buttons/cards,
// state management on the parent 'group' element is needed.

const ArrowRightIcon: React.FC<{isGroupHovered?: boolean}> = ({ isGroupHovered }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24" height="24"
        viewBox="0 0 24 24"
        fill="none" stroke="currentColor"
        strokeWidth="2" strokeLinecap="round"
        strokeLinejoin="round"
        style={{
            ...styles.arrowRightIcon,
            ...(isGroupHovered ? styles.arrowRightIconHover : {})
        }}
    >
        <line x1="5" y1="12" x2="19" y2="12"></line>
        <polyline points="12 5 19 12 12 19"></polyline>
    </svg>
);

const DocumentIcon: React.FC = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24" height="24"
        viewBox="0 0 24 24"
        fill="none" stroke="currentColor"
        strokeWidth="2" strokeLinecap="round"
        strokeLinejoin="round"
        style={styles.documentIcon}
    >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline>
    </svg>
);

// --- Dados das Qualificações Profissionais ---
const qualifications = [
  {
    title: 'Formação Acadêmica',
    description: 'Graduada em Psicologia pela Universidade Federal de Alagoas, com Pós-Graduação em Neuropsicologia e em TEA (Transtorno do Espectro Autista).',
    imageUrl: 'https://placehold.co/600x400/1A1A1A/C9A979?text=Formação',
    tags: ['Psicologia', 'Neuropsicologia', 'Autismo'],
    buttonText: 'Agendar consulta',
    ctaUrl: '/client-contact',
  },
  {
    title: 'Experiência Clínica',
    description: 'Atualmente na AACD, com mais de 5 anos de experiência no atendimento de crianças com Espectro Autista, Síndrome de Down, TDAH e outras deficiências.',
    imageUrl: 'https://placehold.co/600x400/2B2B2B/C9A979?text=Experiência',
    tags: ['AACD', 'Crianças', 'TEA'],
    buttonText: 'Agendar consulta',
    ctaUrl: '/client-contact',
  },
  {
    title: 'Abordagem Terapêutica',
    description: 'Foco na Gestalt-terapia, com capacitação no método TEACCH e no programa ABA para crianças e adolescentes com desenvolvimento atípico.',
    imageUrl: 'https://placehold.co/600x400/3C3C3C/C9A979?text=Abordagem',
    tags: ['Gestalt', 'TEACCH', 'ABA'],
    buttonText: 'Agendar consulta',
    ctaUrl: '/client-contact',
  },
];

const Portfolio: React.FC = () => {
    useEffect(() => {
        document.title = 'Atendimento Psicológico';
    }, []);
    const navigate = useNavigate();
    const [hoveredCardIndex, setHoveredCardIndex] = useState<number | null>(null);
    const [fabHovered, setFabHovered] = useState(false);
    const [ctaButtonHovered, setCtaButtonHovered] = useState<number | null>(null);



    const handleNavigate = (path: string) => {
        navigate(path);
    };

    const combinedPortfolioContainerStyle = {
        ...styles.portfolioContainer,
        // Manually add responsive padding here if needed, or use a more robust solution
        // This is just illustrative for px-4 sm:px-6 lg:px-8
        // A better way would be CSS classes and media queries.
        // For now, base px-4 is in styles.portfolioContainer.
        // This example doesn't dynamically change padding based on viewport width.
    };

    const combinedMainTitleStyle = {
        ...styles.mainTitle,
        // Add sm:text-5xl equivalent if window width matches 'sm' breakpoint
    };


    return (
        <section
            id="qualificacoes"
            style={{
                ...styles.portfolioSection,
                backgroundImage: "url('https://www.transparenttextures.com/patterns/dark-matter.png')"
            }}
        >
            <div style={styles.portfolioOverlay} />

            <div style={combinedPortfolioContainerStyle}>
                <div style={styles.titleSection}>
                    <h2 style={combinedMainTitleStyle}>
                        Uma jornada de cuidado guiada por uma <span style={styles.mainTitleSpan}>profissional qualificada</span>
                    </h2>
                    <p style={styles.subTitle}>
                        Conheça a base de conhecimento e experiência que sustenta minha prática clínica.
                    </p>
                </div>

                <div style={styles.qualificationsGrid}>
                    {qualifications.map((qual, index) => (
                        <div
                            key={index}
                            style={{
                                ...styles.qualificationCard,
                                ...(hoveredCardIndex === index ? styles.qualificationCardHover : {})
                            }}
                            onMouseEnter={() => setHoveredCardIndex(index)}
                            onMouseLeave={() => setHoveredCardIndex(null)}
                        >
                            <div style={styles.cardImageContainer}>
                                <img
                                    src={qual.imageUrl}
                                    alt={`Imagem ilustrativa de ${qual.title}`}
                                    style={{
                                        ...styles.cardImage,
                                        ...(hoveredCardIndex === index ? styles.cardImageHover : {})
                                    }}
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.onerror = null;
                                        target.src='https://placehold.co/600x400/1A1A1A/C9A979?text=Imagem+Indisponível';
                                    }}
                                />
                            </div>
                            <div style={styles.cardTextContent}>
                                <div>
                                    <h3 style={styles.cardTitle}>{qual.title}</h3>
                                    <p style={styles.cardDescription}>{qual.description}</p>
                                    <div style={styles.tagsContainer}>
                                        {qual.tags.map(tag => (
                                            <span key={tag} style={styles.tagSpan}>
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div style={styles.cardButtonContainer}>
                                    <button
                                        onClick={() => handleNavigate(qual.ctaUrl)}
                                        className="shine-button" // Preserving custom class
                                        style={styles.ctaButton}
                                        onMouseEnter={() => setCtaButtonHovered(index)}
                                        onMouseLeave={() => setCtaButtonHovered(null)}
                                    >
                                        <span style={styles.ctaButtonSpan}>
                                            {qual.buttonText} <ArrowRightIcon isGroupHovered={ctaButtonHovered === index} />
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <button
                onClick={() => handleNavigate('/contract-form')}
                title="Gerador de Contrato para Psicólogos"
                style={{
                    ...styles.fab,
                    ...(fabHovered ? styles.fabHover : {})
                }}
                onMouseEnter={() => setFabHovered(true)}
                onMouseLeave={() => setFabHovered(false)}
            >
                <DocumentIcon />
                <span style={{
                    ...styles.fabTooltip,
                    ...(fabHovered ? styles.fabTooltipHover : {})
                }}>
                    Gerador de Contrato
                </span>
            </button>
        </section>
    );
};

export default Portfolio;
// Note on responsive styles (sm:, lg:):
// The Tailwind classes like sm:px-6, lg:grid-cols-3, etc., are designed for CSS media queries.
// Replicating them perfectly with only inline styles in React is cumbersome and not ideal.
// The styles object above includes comments where these would apply.
// For a production scenario without Tailwind, these would typically be in a separate CSS
// file or handled by a CSS-in-JS library that supports media queries.
// Hover effects for 'group-hover' have been simulated using React state (useState)
// for elements like icons within buttons or cards.
// Direct hover effects on the element itself (e.g., button hover changing its own background)
// are also handled by React state for inline styles.
// The 'container' class behavior is approximated; true Tailwind container behavior is responsive.
// The 'shine-button' class is preserved as it's likely custom CSS not from Tailwind.
// Consider this conversion a best-effort for inline styles. A full conversion might
// involve creating actual CSS classes and media queries in a .css file.