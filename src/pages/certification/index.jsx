import React, { useState, useEffect, useMemo, useRef } from 'react';
import styled from 'styled-components';
import Timeline from '../../components/timeline';
import { fetchEducationalData } from '../../mocks/apiMock';
import { FaGraduationCap } from "react-icons/fa";
import { GrCertificate } from "react-icons/gr";
import { MdWork } from "react-icons/md";
import LoadingSpinner from '../../components/loadingspinner';
import { m, useScroll, useTransform } from "framer-motion";
import RevealText from '../../components/revealText';


const Container = styled.section`
  background: ${(props) => props.theme.colors.bgAlt};
  min-height: 100vh;
  padding: 2rem;
  font-family: ${(props) => props.theme.typography.fontFamily};
  color: ${(props) => props.theme.colors.text};
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
  filter: blur(110px);
  opacity: 0.26;
  z-index: 0;
  pointer-events: none;
  top: -180px;
  right: -140px;
  width: 560px;
  height: 560px;
  border-radius: 42% 58% 65% 35% / 41% 44% 56% 59%;
  background: radial-gradient(circle at 40% 40%, #085C87 0%, transparent 72%);
`;

const Watermark = styled.div`
  position: absolute;
  top: 56px;
  left: -20px;
  font-family: ${(props) => props.theme.typography.fontFamily};
  font-weight: 700;
  font-size: 240px;
  line-height: 1;
  letter-spacing: -6px;
  color: rgba(15, 23, 42, 0.035);
  z-index: 0;
  user-select: none;
  white-space: nowrap;

  @media (max-width: 900px) {
    display: none;
  }
`;


const Header = styled(m.header)`
  position: relative;
  z-index: 2;
  text-align: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: ${(props) => props.theme.typography.fontSize.xxl};
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  font-size: ${(props) => props.theme.typography.fontSize.sm};
  opacity: 0.8;
`;

const NavContainer = styled(m.div)`
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const NavButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: ${props => props.$active ? props.theme.colors.brand1 : props.theme.colors.surface};
  color: ${props => props.$active ? props.theme.colors.white : props.theme.colors.text};
  border: 1px solid ${props => props.$active ? 'transparent' : props.theme.colors.border};
  border-radius: ${(props) => props.theme.radius.pill};
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${props => props.$active ? props.theme.colors.accentHover : props.theme.colors.surfaceTint};
  }
`;

const TimelineContainer = styled(m.div)`
  position: relative;
  z-index: 2;
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

    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'], layoutEffect: false });
    const yBlob = useTransform(scrollYProgress, [0, 1], [-90, 90]);

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
            fontFamily: "'Plus Jakarta Sans', sans-serif"
        },
        title: {
            titleColor: "#0F172A",
            titleDotColor: "#0F172A"
        },
        line: {
            lineColor: "#E2E8F0",
            lineWidth: "2px"
        }
    };

    return (
        <Container id="certificados" ref={sectionRef}>
            <Blob style={{ y: yBlob }} />
            <Watermark>JORNADA</Watermark>
            <Header
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeInUp}
            >
                <Title><RevealText text="Jornada Educacional" /></Title>
                <Subtitle>Formação, certificações e experiência profissional</Subtitle>
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
              viewport={{ once: true, amount: 0.2 }}
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