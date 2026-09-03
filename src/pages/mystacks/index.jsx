import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { FaReact, FaSearch, FaArrowRight, FaFilter, FaCheck, FaArrowLeft, FaNode, FaGithub } from 'react-icons/fa';
import {
  SiTailwindcss,
  SiTypescript,
  SiJavascript,
  SiMysql,
  SiPostgresql,
  SiHtml5,
  SiCss3,
  SiVercel,
  SiFastapi,
  SiExpress,
  SiNestjs
} from 'react-icons/si';
import { fetchSkillsData } from '../../mocks/apiMock';
import { m, useScroll, useTransform } from "framer-motion";
import RevealText from '../../components/revealText';
import TiltCard from '../../components/tiltCard';
const iconMapping = {
  FaReact: FaReact,
  SiTailwindcss: SiTailwindcss,
  SiTypescript: SiTypescript,
  SiJavascript: SiJavascript,
  SiMysql: SiMysql,
  SiPostgresql: SiPostgresql,
  FaGithub: FaGithub,
  SiHtml5: SiHtml5,
  SiCss3: SiCss3,
  SiVercel: SiVercel,
  SiFastapi: SiFastapi,
  FaNode: FaNode,
  SiExpress: SiExpress,
  SiNestjs: SiNestjs
};

const SkillsSection = styled.section`
  background-color: ${(props) => props.theme.colors.bg};
  color: ${(props) => props.theme.colors.text};
  padding: 60px 20px;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 1px;
    width: 100%;
    background: linear-gradient(to right, transparent, ${(props) => props.theme.colors.brand1}, transparent);
    opacity: 0.5;
    z-index: 0;
  }
`;

const Blob = styled(m.div)`
  position: absolute;
  filter: blur(${(props) => props.$blur || '110px'});
  opacity: ${(props) => props.$opacity || 0.2};
  z-index: 0;
  pointer-events: none;
`;

const Watermark = styled.div`
  position: absolute;
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
  font-family: ${(props) => props.theme.typography.fontFamily};
  font-weight: 700;
  font-size: 280px;
  line-height: 1;
  letter-spacing: -8px;
  color: rgba(15, 23, 42, 0.035);
  z-index: 0;
  user-select: none;
  white-space: nowrap;

  @media (max-width: 900px) {
    display: none;
  }
`;

const Container = styled.div`
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled(m.div)`
  text-align: center;
  margin-bottom: 40px;
`;

const Title = styled.h2`
  font-size: ${(props) => props.theme.typography.fontSize.xxl};
  font-weight: 700;
  margin-bottom: 10px;
  color: ${(props) => props.theme.colors.text};
`;

const Subtitle = styled.p`
  font-size: ${(props) => props.theme.typography.fontSize.sm};
  color: ${(props) => props.theme.colors.textMuted};
`;

const SearchBar = styled(m.div)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  flex-wrap: wrap;
  gap: 12px;
`;

const SearchInput = styled.div`
  position: relative;
  width: 300px;

  input {
    width: 100%;
    padding: 12px 20px 12px 40px;
    border-radius: ${(props) => props.theme.radius.sm};
    border: 1px solid ${(props) => props.theme.colors.border};
    background-color: ${(props) => props.theme.colors.surface};
    color: ${(props) => props.theme.colors.text};
    font-size: 0.9rem;

    &:focus {
      outline: none;
      border-color: ${(props) => props.theme.colors.brand1};
      box-shadow: 0 0 0 2px ${(props) => props.theme.colors.brand1}33;
    }

    &::placeholder {
      color: ${(props) => props.theme.colors.textMuted};
    }
  }

  svg {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: ${(props) => props.theme.colors.textMuted};
  }
`;

const FilterContainer = styled.div`
  position: relative;
`;

const FilterButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background-color: ${(props) => props.theme.colors.surface};
  color: ${(props) => props.theme.colors.text};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: ${(props) => props.theme.radius.sm};
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.colors.surfaceTint};
  }
`;

const FilterDropdown = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  width: 220px;
  background-color: ${(props) => props.theme.colors.surface};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: ${(props) => props.theme.radius.sm};
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.12);
  z-index: 10;
  overflow: hidden;
  animation: dropdown 0.2s ease;

  @keyframes dropdown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const FilterHeader = styled.div`
  padding: 12px 16px;
  font-weight: 500;
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
`;

const FilterOptions = styled.div`
  max-height: 300px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: ${(props) => props.theme.colors.surfaceTint};
  }

  &::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.colors.border};
    border-radius: 3px;
  }
`;

const FilterOption = styled.div`
  padding: 10px 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${(props) => props.theme.colors.surfaceTint};
  }

  svg {
    color: ${(props) => props.theme.colors.brand1};
  }
`;

const SkillsGrid = styled(m.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
`;

const SkillCard = styled.div`
  background-color: ${(props) => props.theme.colors.surface};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: ${(props) => props.theme.radius.md};
  padding: 24px;
  height: 100%;
  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04), 0 10px 24px rgba(15, 23, 42, 0.06);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const IconWrapper = styled.div`
  width: 40px;
  height: 40px;
  border-radius: ${(props) => props.theme.radius.md};
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.$bgColor || props.theme.colors.surfaceTint};
  margin-right: 16px;

  svg {
    font-size: 20px;
    color: ${(props) => props.$iconColor || props.theme.colors.accentHover};
  }
`;

const SkillName = styled.div`
  flex: 1;

  h3 {
    font-size: 1.1rem;
    margin: 0 0 4px 0;
    color: ${(props) => props.theme.colors.text};
  }

  span {
    font-size: 0.8rem;
    color: ${(props) => props.theme.colors.accentHover};
  }
`;

const Description = styled.p`
  font-size: 0.9rem;
  line-height: 1.5;
  color: ${(props) => props.theme.colors.textMuted};
  margin-bottom: 16px;
`;

const Experience = styled.div`
  font-size: 0.8rem;
  color: ${(props) => props.theme.colors.textMuted};

  span {
    color: ${(props) => props.theme.colors.accentHover};
    font-weight: 600;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 40px;
  color: ${(props) => props.theme.colors.textMuted};

  h3 {
    font-size: 1.2rem;
    margin-bottom: 10px;
    color: ${(props) => props.theme.colors.text};
  }

  p {
    font-size: 0.9rem;
  }
`;

const ActiveFilters = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
`;

const FilterTag = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  background-color: ${(props) => props.theme.colors.surfaceTint};
  border-radius: ${(props) => props.theme.radius.sm};
  font-size: 0.8rem;
  color: ${(props) => props.theme.colors.accentHover};

  button {
    background: none;
    border: none;
    color: ${(props) => props.theme.colors.accentHover};
    cursor: pointer;
    padding: 0;
    display: flex;
    align-items: center;
    font-size: 1rem;

    &:hover {
      color: ${(props) => props.theme.colors.brand1};
    }
  }
`;

// Novo componente para a paginação
const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
`;

const PageInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.colors.textMuted};
  font-size: 0.9rem;
  margin: 0 20px;
`;

const PageButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.colors.surface};
  border: 1px solid ${(props) => props.theme.colors.border};
  color: ${props => props.disabled ? props.theme.colors.textMuted : props.theme.colors.accentHover};
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.2s ease;
  opacity: ${props => props.disabled ? 0.5 : 1};

  &:hover:not(:disabled) {
    background-color: ${(props) => props.theme.colors.surfaceTint};
    transform: translateY(-2px);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }
`;

const SkillsAndExperience = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const filterRef = useRef(null);
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const yBlob1 = useTransform(scrollYProgress, [0, 1], [-90, 90]);
  const yBlob2 = useTransform(scrollYProgress, [0, 1], [70, -70]);

  // Estados para a paginação
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // Exibir 9 itens por página
  //isPhone
  const isPhone = window.innerWidth <= 768;
  const [skills, setSkills] = useState([]);

  // Configurações de animação
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const reponse = await fetchSkillsData();
      setSkills(reponse.data);
    };

    fetchData();
  }, []);

  const categories = [
    { id: 'todos', name: 'Todos' },
    { id: 'database', name: 'Banco de Dados' },
    { id: 'tools', name: 'Ferramentas' },
    { id: 'language', name: 'Linguagens' },
    { id: 'framework', name: 'Framework' },
    { id: 'library', name: 'Bibliotecas' },
    { id: 'devops', name: 'DevOps' },
    { id: 'design', name: 'Design' },
    { id: 'cloud', name: 'Cloud' },
    { id: 'versionamento', name: 'Versionamento' }
  ];

  // Map categories to skills
  const categoryMapping = {
    'database': ['MySQL', 'PostgreSQL'],
    'tools': ['Git', 'GitHub', 'Figma'],
    'language': ['JavaScript', 'TypeScript', 'Python'],
    'framework': ['React', 'Next.js', 'Tailwind', 'FastAPI', 'Node.js', 'Prisma', 'Nest.js'],
    'devops': ['GitHub'],
    'design': ['Figma'],
    'cloud': ['AWS', 'Vercel'],
    'versionamento': ['Git', 'GitHub']
  };



  // Handle clicks outside of filter dropdown to close it
  useEffect(() => {
    function handleClickOutside(event) {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setShowFilterDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [filterRef]);

  // Toggle category selection
  const toggleCategory = (categoryId) => {
    if (categoryId === 'todos') {
      setSelectedCategories([]);
      setCurrentPage(1); // Reinicia a paginação ao limpar filtros
      return;
    }

    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(selectedCategories.filter(id => id !== categoryId));
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
    setCurrentPage(1); // Reinicia a paginação ao mudar filtros
  };

  // Remove specific filter
  const removeFilter = (categoryId) => {
    setSelectedCategories(selectedCategories.filter(id => id !== categoryId));
    setCurrentPage(1); // Reinicia a paginação ao remover filtros
  };

  // Filter skills by search term and selected categories
  const filterSkills = () => {
    return skills.filter(skill => {
      // Match search term
      const matchesSearch =
        skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        skill.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        skill.description.toLowerCase().includes(searchTerm.toLowerCase());

      // Match categories
      const matchesCategory = selectedCategories.length === 0 ||
        selectedCategories.some(categoryId =>
          categoryMapping[categoryId]?.includes(skill.name)
        );

      return matchesSearch && matchesCategory;
    });
  };

  const filteredSkills = filterSkills();

  // Calcular a paginação
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredSkills.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredSkills.length / itemsPerPage);

  // Handlers para paginação
  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  // Resetar página ao mudar o termo de busca
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  return (
    <SkillsSection id='stack' ref={sectionRef}>
      <Blob style={{ y: yBlob1, top: '-200px', left: '-120px', width: 560, height: 560, borderRadius: '50% 50% 40% 60% / 55% 45% 55% 45%', background: 'radial-gradient(circle at 40% 40%, #085C87 0%, transparent 72%)' }} $opacity={0.26} />
      <Blob style={{ y: yBlob2, bottom: '-160px', right: '-140px', width: 480, height: 480, borderRadius: '45% 55% 60% 40% / 50% 50% 50% 50%', background: 'radial-gradient(circle at 60% 50%, #1BA3E8 0%, transparent 70%)' }} $opacity={0.2} $blur="100px" />
      <Watermark>STACK</Watermark>

      <Container>
        <Header
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
        >
          <Title><RevealText text="Habilidades & Experiência" /></Title>
          <Subtitle>Meus conhecimentos que adquiri ao longo da minha jornada</Subtitle>
        </Header>

        <SearchBar
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
        >
          <SearchInput>
            <FaSearch />
            <input
              type="text"
              placeholder="Buscar habilidades..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchInput>
          <FilterContainer ref={filterRef}>
            <FilterButton onClick={() => setShowFilterDropdown(!showFilterDropdown)} aria-label="Abrir menu de filtro">
              <FaFilter />
              {isPhone ? "" : "Filtrar"}
            </FilterButton>
            {showFilterDropdown && (
              <FilterDropdown>
                <FilterHeader>Filtrar por categoria</FilterHeader>
                <FilterOptions>
                  {categories.map((category) => (
                    <FilterOption
                      key={category.id}
                      onClick={() => toggleCategory(category.id)}
                    >
                      {category.name}
                      {(category.id === 'todos' && selectedCategories.length === 0) ||
                        selectedCategories.includes(category.id) ? (
                        <FaCheck size={14} />
                      ) : null}
                    </FilterOption>
                  ))}
                </FilterOptions>
              </FilterDropdown>
            )}
          </FilterContainer>
        </SearchBar>

        {selectedCategories.length > 0 && (
          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
          >
            <ActiveFilters>
              {selectedCategories.map(categoryId => {
                const category = categories.find(c => c.id === categoryId);
                return (
                  <FilterTag key={categoryId}>
                    {category.name}
                    <button onClick={() => removeFilter(categoryId)}>×</button>
                  </FilterTag>
                );
              })}
            </ActiveFilters>
          </m.div>
        )}

        {filteredSkills.length > 0 ? (
          <>
            <SkillsGrid
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={staggerContainer}
            >
              {currentItems.map((skill, index) => (
                <m.div key={index} variants={cardVariants}>
                  <TiltCard maxTilt={5} scale={1.02}>
                    <SkillCard>
                      <CardHeader>
                        <IconWrapper $bgColor={skill.bgColor} $iconColor={skill.bgColor ? skill.bgColor.slice(0, 7) : undefined}>
                          {React.createElement(iconMapping[skill.icon], {
                            size: 24,
                          })}
                        </IconWrapper>

                        <SkillName>
                          <h3>{skill.name}</h3>
                          <span>{skill.category}</span>
                        </SkillName>
                      </CardHeader>
                      <Description>{skill.description}</Description>
                      <Experience>
                        Experiência: <span>{skill.experience}</span>
                      </Experience>
                    </SkillCard>
                  </TiltCard>
                </m.div>
              ))}
            </SkillsGrid>

            {/* Componente de paginação */}
            {totalPages > 1 && (
              <m.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={fadeInUp}
              >
                <PaginationContainer>
                  <PageButton
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    aria-label="Ir para página anterior"
                  >
                    <FaArrowLeft />
                  </PageButton>

                  <PageInfo>
                    Página {currentPage} de {totalPages}
                    {filteredSkills.length > 0 && ` (${filteredSkills.length} habilidades)`}
                  </PageInfo>

                  <PageButton
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    aria-label="Ir para próxima página"
                  >
                    <FaArrowRight />
                  </PageButton>
                </PaginationContainer>
              </m.div>
            )}
          </>
        ) : (
          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
          >
            <EmptyState>
              <h3>Nenhuma habilidade encontrada</h3>
              <p>Tente ajustar seus filtros ou termos de busca</p>
            </EmptyState>
          </m.div>
        )}
      </Container>
    </SkillsSection>
  );
};

export default SkillsAndExperience;
