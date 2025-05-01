import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import Timeline from '../../components/timeline';
import { fetchEducationalData } from '../../mocks/apiMock';
import { FaGraduationCap } from "react-icons/fa";
import { GrCertificate } from "react-icons/gr";
import { MdWork } from "react-icons/md";
import LoadingSpinner from '../../components/loadingspinner';
import { motion } from "framer-motion";


const Container = styled.section`
  background: #0F172A;
  min-height: 100vh;
  padding: 2rem;
  font-family: 'Inter', sans-serif;
  color: white;
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


const Header = styled(motion.header)`
  text-align: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  font-size: 1rem;
  opacity: 0.8;
`;

const NavContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const NavButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: ${props => props.$active ? 'rgba(78, 115, 223, 0.9)' : 'rgba(30, 41, 82, 0.7)'};
  color: white;
  border: none;
  border-radius: 2rem;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: rgba(78, 115, 223, 0.9);
  }
`;

const TimelineContainer = styled(motion.div)`
  width: 100%;
`;

// Main Component
const EducationalJourney = () => {
    // ver se é telefone 
    const isPhone = window.innerWidth < 760;
    const [active, setActive] = useState('academic');
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        fetchEducationalData()
            .then((response) => {
                setData(response);
                setIsLoading(false);
            })
            .catch((error) => {
                setError(error);
                setIsLoading(false);
            });
    }, []);

    const handleNavClick = (type) => {
        setActive(type);
    };

    const getActiveData = useMemo(() => {
        return data ? data[active] : [];
    }, [data, active]);

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

    if (isLoading) return <LoadingSpinner />;
    if (error) return <ErrorDisplay message="Failed to load educational data" />;

    const timelineStyles = {
        container: {
            maxWidth: "800px",
            fontFamily: "'Inter', sans-serif"
        },
        title: {
            titleColor: "white",
            titleDotColor: "white"
        },
        line: {
            lineColor: "rgba(255, 255, 255, 0.3)",
            lineWidth: "2px"
        }
    };

    return (
        <Container id="certificados">
            <Header
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeInUp}
            >
                <Title>Jornada Educacional</Title>
                <Subtitle>Explore minha trajetória de aprendizado e crescimento profissional</Subtitle>
            </Header>

            <NavContainer
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeInUp}
            >
                <NavButton
                    $active={active === 'academic'}
                    onClick={() => handleNavClick('academic')}
                >
                    {isPhone ? (
                        <FaGraduationCap style={{ fontSize: "1rem" }} />
                    ) : (
                        <>
                            <FaGraduationCap style={{ fontSize: "1rem", marginRight: "0.5rem" }} />
                            Formação
                        </>
                    )}
                </NavButton>
                <NavButton
                    $active={active === 'courses'}
                    onClick={() => handleNavClick('courses')}
                >
                    {isPhone ? (
                        <GrCertificate style={{ fontSize: "1rem" }} />
                    ) : (
                        <>
                            <GrCertificate style={{ fontSize: "1rem", marginRight: "0.5rem" }} />
                            Certificados e Cursos
                        </>
                    )}

                </NavButton>
                <NavButton
                    $active={active === 'job'}
                    onClick={() => handleNavClick('job')}
                >
                    {isPhone ? (
                        <MdWork style={{ fontSize: "1rem" }} />
                    ) : (
                        <>
                            <MdWork style={{ fontSize: "1rem", marginRight: "0.5rem" }} />
                            Experiência
                        </>
                    )}
                </NavButton>
            </NavContainer>

            <TimelineContainer
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.8}}
              variants={fadeInUp}
            >
              <Timeline 
                  $items={getActiveData}
                  $styleProps={timelineStyles}
              />
            </TimelineContainer>
        </Container>
    );
};

export default EducationalJourney;