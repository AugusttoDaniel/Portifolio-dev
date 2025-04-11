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
  SiExpress
} from 'react-icons/si';
import { fetchSkillsData } from '../../mocks/apiMock';
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
  SiExpress: SiExpress
};

const SkillsSection = styled.section`
  background-color: #020617;
  color: #fff;
  padding: 60px 20px;
    position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 1px;
    width: 100%;
    background: linear-gradient(to right, transparent, #22d3ee, transparent);
    opacity: 0.5;
    z-index: 0;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 10px;
  color: #ccd6f6;
`;

const Subtitle = styled.p`
  font-size: 1rem;
  color: #8892b0;
`;

const SearchBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const SearchInput = styled.div`
  position: relative;
  width: 300px;
  
  input {
    width: 100%;
    padding: 12px 20px 12px 40px;
    border-radius: 6px;
    border: none;
    background-color: #172a45;
    color: #fff;
    font-size: 0.9rem;
    
    &:focus {
      outline: none;
      box-shadow: 0 0 0 2px #64ffda;
    }
    
    &::placeholder {
      color: #8892b0;
    }
  }
  
  svg {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: #8892b0;
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
  background-color: #172a45;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  
  &:hover {
    background-color: #1f3a60;
  }
`;

const FilterDropdown = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  width: 220px;
  background-color: #172a45;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
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
  border-bottom: 1px solid #293d5a;
`;

const FilterOptions = styled.div`
  max-height: 300px;
  overflow-y: auto;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: #1e3151;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #3a5079;
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
    background-color: #1e3151;
  }
  
  svg {
    color: #64ffda;
  }
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
`;

const SkillCard = styled.div`
  background-color: #0F172A;
  border-radius: 8px;
  padding: 24px;
  height: 100%;
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
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.bgColor || '#0F172A'};
  margin-right: 16px;
  
  svg {
    font-size: 20px;
    color: #fff;
  }
`;

const SkillName = styled.div`
  flex: 1;
  
  h3 {
    font-size: 1.1rem;
    margin: 0 0 4px 0;
    color: #ccd6f6;
  }
  
  span {
    font-size: 0.8rem;
    color: #64ffda;
  }
`;

const Description = styled.p`
  font-size: 0.9rem;
  line-height: 1.5;
  color: #8892b0;
  margin-bottom: 16px;
`;

const Experience = styled.div`
  font-size: 0.8rem;
  color: #8892b0;
  
  span {
    color: #64ffda;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 40px;
  color: #8892b0;
  
  h3 {
    font-size: 1.2rem;
    margin-bottom: 10px;
    color: #ccd6f6;
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
  background-color: #1e3151;
  border-radius: 4px;
  font-size: 0.8rem;
  
  button {
    background: none;
    border: none;
    color: #64ffda;
    cursor: pointer;
    padding: 0;
    display: flex;
    align-items: center;
    
    &:hover {
      color: #fff;
    }
  }
`;

// Novo componente para a paginação
const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;
`;

const PageInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #8892b0;
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
  background-color: ${props => props.disabled ? '#172a45' : '#1e3151'};
  border: none;
  color: ${props => props.disabled ? '#4d5b78' : '#64ffda'};
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.2s ease;
  
  &:hover:not(:disabled) {
    background-color: #2a4a7a;
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

  // Estados para a paginação
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // Exibir 9 itens por página
  //isPhone 
  const isPhone = window.innerWidth <= 768;
  const [skills, setSkills] = useState([]);

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
    'framework': ['React', 'Next.js', 'Tailwind', 'FastAPI', 'Node.js', 'Prisma'],
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
    <SkillsSection id='stack'>
      <Container>
        <Header>
          <Title>Habilidades & Experiência</Title>
          <Subtitle>Meus conhecimentos que adquiri ao longo da minha jornada</Subtitle>
        </Header>

        <SearchBar>
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
            <FilterButton onClick={() => setShowFilterDropdown(!showFilterDropdown)}>
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
        )}

        {filteredSkills.length > 0 ? (
          <>
            <SkillsGrid>
              {currentItems.map((skill, index) => (
                <SkillCard key={index}>
                  <CardHeader>
                    <IconWrapper bgColor={skill.bgColor}>
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
              ))}
            </SkillsGrid>

            {/* Componente de paginação */}
            {totalPages > 1 && (
              <PaginationContainer>
                <PageButton
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
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
                >
                  <FaArrowRight />
                </PageButton>
              </PaginationContainer>
            )}
          </>
        ) : (
          <EmptyState>
            <h3>Nenhuma habilidade encontrada</h3>
            <p>Tente ajustar seus filtros ou termos de busca</p>
          </EmptyState>
        )}
      </Container>
    </SkillsSection>
  );
};

export default SkillsAndExperience;