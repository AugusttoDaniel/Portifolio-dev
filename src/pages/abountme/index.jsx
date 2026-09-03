import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { FaDownload } from 'react-icons/fa';
import foto from '../../assets/Foto.webp';
import { m, useScroll, useTransform } from "framer-motion";
import RevealText from '../../components/revealText';
import TiltCard from '../../components/tiltCard';
import MagneticButton from '../../components/magneticButton';
import { triggerDownloadFly } from '../../utils/downloadFlyEffect';

const PageContainer = styled(m.div)`
  display: flex;
  align-items: center;
  margin: auto;
  background-color: ${(props) => props.theme.colors.bgAlt};
  color: ${(props) => props.theme.colors.text};
  min-height: 100vh;
  font-family: ${(props) => props.theme.typography.fontFamily};
  padding: 20px;
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
  top: 60px;
  right: -30px;
  font-family: ${(props) => props.theme.typography.fontFamily};
  font-weight: 700;
  font-size: 260px;
  line-height: 1;
  letter-spacing: -6px;
  color: rgba(15, 23, 42, 0.04);
  z-index: 0;
  user-select: none;

  @media (max-width: 900px) {
    display: none;
  }
`;

const ContentContainer = styled.div`
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const Header = styled(m.header)`
  text-align: center;
  margin-bottom: 50px;
`;

const Title = styled.h1`
  font-size: ${(props) => props.theme.typography.fontSize.xxl};
  font-weight: 700;
  margin-bottom: 10px;
`;

const Subtitle = styled.h2`
  font-size: ${(props) => props.theme.typography.fontSize.sm};
  font-weight: normal;
  color: ${(props) => props.theme.colors.textMuted};
  margin-bottom: 60px;
`;

const MainSection = styled(m.div)`
  display: flex;
  flex-direction: row;
  gap: 40px;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ProfileImageContainer = styled(m.div)`
  flex: 1;
  max-width: 350px;
  margin-bottom: 20px;
`;

const ProfileImage = styled(m.img)`
  width: 100%;
  border-radius: ${(props) => props.theme.radius.md};
  box-shadow: 0 2px 4px rgba(15, 23, 42, 0.05), 0 20px 40px rgba(15, 23, 42, 0.12);
`;

const InfoSection = styled(m.div)`
  flex: 2;
`;

const Greeting = styled(m.h3)`
  font-size: 2rem;
  margin-bottom: 20px;
  color: ${(props) => props.theme.colors.text};
`;

const Bio = styled(m.p)`
  font-size: 1rem;
  line-height: 1.7;
  margin-bottom: 20px;
  color: ${(props) => props.theme.colors.textMuted};
`;

const Emphasis = styled.span`
  font-size: 1rem;
  line-height: 1.7;
  color: ${(props) => props.theme.colors.accentHover};
  font-weight: bold;
`;

const StatsSection = styled(m.div)`
  display: flex;
  gap: 30px;
  margin: 40px 0;
`;

const StatBox = styled(m.div)`
  display: flex;
  align-items: baseline;
`;

const StatNumber = styled(m.span)`
  font-size: 3rem;
  font-weight: bold;
  color: ${(props) => props.theme.colors.text};
`;

const StatLabel = styled(m.div)`
  display: flex;
  flex-direction: column;
  margin-left: 10px;

  span {
    color: ${(props) => props.theme.colors.textMuted};
    font-size: 0.9rem;
  }
`;

const ButtonContainer = styled(m.div)`
  margin-top: 20px;

  @media (max-width: 768px) {
    display: flex;
    justify-content: center;
  }
`;

const Button = styled(m.a)`
  display: inline-flex;
  align-items: center;
  background-color: ${(props) => props.theme.colors.brand1};
  color: ${(props) => props.theme.colors.white};
  padding: 12px 24px;
  border-radius: ${(props) => props.theme.radius.md};
  text-decoration: none;
  font-weight: 500;
  box-shadow: 0 8px 20px rgba(27, 163, 232, 0.28);
  transition: all 0.3s ease;

  &:hover {
    background-color: ${(props) => props.theme.colors.accentHover};
    transform: translateY(-2px);
  }

  svg {
    margin-right: 8px;
  }
`;

const Divider = styled(m.hr)`
  width: 60px;
  height: 4px;
  background-color: ${(props) => props.theme.colors.brand1};
  border: none;
  margin: 0 auto 30px;
`;
const AnimatedNumber = ({ targetValue, duration = 2 }) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = targetValue;
    const totalFrames = Math.ceil(duration * 60);
    const increment = (end - start) / totalFrames;

    const interval = setInterval(() => {
      start += increment;
      setValue(Math.min(start, end));

      if (start >= end) {
        clearInterval(interval);
      }
    }, 16);

    return () => clearInterval(interval);
  }, [targetValue, duration]);

  return <span>{Math.floor(value)}</span>;
};

const AboutMe = () => {
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

  const fadeInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'], layoutEffect: false });
  const yBlob1 = useTransform(scrollYProgress, [0, 1], [-80, 80]);
  const yBlob2 = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <PageContainer id='about' ref={sectionRef}>
      <Blob style={{ y: yBlob1, top: '-160px', left: '420px', width: 520, height: 520, borderRadius: '38% 62% 55% 45% / 48% 40% 60% 52%', background: 'radial-gradient(circle at 40% 40%, #085C87 0%, transparent 72%)' }} $opacity={0.26} />
      <Blob style={{ y: yBlob2, bottom: '-200px', right: '-160px', width: 600, height: 600, borderRadius: '55% 45% 40% 60% / 45% 55% 45% 55%', background: 'radial-gradient(circle at 60% 50%, #1BA3E8 0%, transparent 70%)' }} $opacity={0.22} $blur="120px" />
      <Watermark>SOBRE</Watermark>

      <ContentContainer>
        <Header
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
        >
          <Title>
            <RevealText text="Sobre mim" />
          </Title>
          <Divider />
          <Subtitle>
            Trajetória, stack e o que me move como desenvolvedor
          </Subtitle>
        </Header>

        <MainSection>
          <ProfileImageContainer
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInLeft}
          >
            <TiltCard maxTilt={7}>
              <ProfileImage src={foto} alt="Uma foto minha Daniel Augusto" />
            </TiltCard>
          </ProfileImageContainer>

          <InfoSection
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInRight}
          >
            <Greeting>
              <RevealText text="Prazer, eu sou o Daniel." />
            </Greeting>

            <Bio>
              Me chamo Daniel Augusto, sou um desenvolvedor em formação, com foco em <Emphasis>Front-end</Emphasis> e <Emphasis>Back-end</Emphasis>, buscando oportunidades para aplicar e expandir meus conhecimentos em projetos desafiadores. Atualmente, tenho experiência com tecnologias como <Emphasis>JavaScript</Emphasis>, <Emphasis>Node.js</Emphasis>, <Emphasis>TypeScript</Emphasis>, <Emphasis>React</Emphasis> e <Emphasis>MySQL</Emphasis>, e estou sempre em busca de aprimoramento profissional para me manter atualizado com as melhores práticas do mercado.
            </Bio>

            <Bio>
              Estou em busca de uma vaga como <Emphasis>trainee</Emphasis> ou <Emphasis>júnior</Emphasis>, onde possa contribuir com minha dedicação, aprendizado contínuo e habilidades técnicas. Tenho experiência em <Emphasis>desenvolvimento back-end</Emphasis>, onde atuei na manutenção e implementação de funcionalidades para otimizar sistemas, além de habilidades em manutenção de hardware e suporte técnico, que me deram uma base sólida para entender o funcionamento de sistemas como um todo.
            </Bio>

            <StatsSection>
              <StatBox>
                <StatNumber>
                  <AnimatedNumber targetValue={2} duration={2} />+
                </StatNumber>
                <StatLabel>
                  <span>Anos</span>
                  <span>de experiência</span>
                </StatLabel>
              </StatBox>

              <StatBox>
                <StatNumber>
                  <AnimatedNumber targetValue={3} duration={2} />+
                </StatNumber>
                <StatLabel>
                  <span>Projetos</span>
                  <span>no GitHub</span>
                </StatLabel>
              </StatBox>
            </StatsSection>
            <ButtonContainer>
              <MagneticButton>
                <Button
                  href="https://drive.google.com/uc?export=download&id=1IA3T5Ks_PnpFMjxy-W0H58_g3QC28N9w"
                  download
                  aria-label="Baixar CV"
                  onClick={(e) => triggerDownloadFly(e.currentTarget)}
                >
                  <FaDownload /> Baixar CV
                </Button>
              </MagneticButton>
            </ButtonContainer>
          </InfoSection>
        </MainSection>
      </ContentContainer>
    </PageContainer>
  );
};

export default AboutMe;
