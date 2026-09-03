import React, { useRef } from 'react';
import styled from 'styled-components';
import { FaArrowRight, FaDownload } from 'react-icons/fa';
import { m, useScroll, useTransform } from "framer-motion";
import RevealText from '../../components/revealText';
import TiltCard from '../../components/tiltCard';
import MagneticButton from '../../components/magneticButton';

const Container = styled.section`
  position: relative;
  overflow: hidden;
  background-color: ${(props) => props.theme.colors.bgdev};
  color: ${(props) => props.theme.colors.text};
  min-height: 100vh;
  padding: 7rem 4rem 3rem;
  box-sizing: border-box;
  display: flex;
  align-items: center;

  @media (max-width: 900px) {
    padding: 6rem 1.5rem 3rem;
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
  right: -40px;
  font-family: ${(props) => props.theme.typography.fontFamily};
  font-weight: 800;
  font-size: 230px;
  line-height: 0.9;
  letter-spacing: -6px;
  color: rgba(15, 23, 42, 0.045);
  z-index: 0;
  user-select: none;
  text-align: right;
  white-space: nowrap;

  @media (max-width: 900px) {
    display: none;
  }
`;

const ContentRow = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 4rem;
  width: 100%;
  max-width: 1312px;
  margin: 0 auto;

  @media (max-width: 900px) {
    flex-direction: column;
    gap: 2.5rem;
  }
`;

const LeftColumn = styled.div`
  flex: 1;
  min-width: 0;
`;

const Eyebrow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 22px;
`;

const EyebrowDot = styled.span`
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: ${(props) => props.theme.colors.brand1};
  box-shadow: 0 0 12px ${(props) => props.theme.colors.brand1};
`;

const EyebrowLabel = styled.span`
  font-family: ${(props) => props.theme.typography.fontFamilyMono};
  font-size: 13px;
  letter-spacing: 0.12em;
  color: ${(props) => props.theme.colors.accentHover};
  text-transform: uppercase;
`;

const Headline = styled.h1`
  font-family: ${(props) => props.theme.typography.fontFamily};
  font-weight: 800;
  font-size: 58px;
  line-height: 1.14;
  letter-spacing: -0.02em;
  margin: 0 0 26px;

  @media (max-width: 900px) {
    font-size: 38px;
  }
`;

const HeadlineGradient = styled.div`
  background: linear-gradient(90deg, ${(props) => props.theme.colors.accentHover}, ${(props) => props.theme.colors.brand1} 60%, ${(props) => props.theme.colors.brand2});
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

const Paragraph = styled.p`
  font-size: 17px;
  line-height: 1.6;
  color: ${(props) => props.theme.colors.textMuted};
  max-width: 460px;
  margin: 0 0 20px;

  strong {
    color: ${(props) => props.theme.colors.text};
    font-weight: 500;
  }
`;

const TechPills = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  margin-bottom: 32px;
`;

const TechPill = styled.span`
  font-size: 12px;
  font-weight: 600;
  padding: 6px 13px;
  border-radius: ${(props) => props.theme.radius.pill};
  background: ${(props) => props.theme.colors.surfaceTint};
  color: ${(props) => props.theme.colors.accentHover};
`;

const ButtonsRow = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
`;

const PrimaryButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: ${(props) => props.theme.colors.brand1};
  color: ${(props) => props.theme.colors.white};
  font-weight: 600;
  font-size: 15px;
  padding: 15px 30px;
  border-radius: ${(props) => props.theme.radius.md};
  text-decoration: none;
  box-shadow: 0 8px 20px rgba(27, 163, 232, 0.28);
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

const SecondaryButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: 1px solid ${(props) => props.theme.colors.border};
  color: ${(props) => props.theme.colors.text};
  font-weight: 600;
  font-size: 15px;
  padding: 15px 30px;
  border-radius: ${(props) => props.theme.radius.md};
  text-decoration: none;
  transition: border-color 0.2s ease;

  &:hover {
    border-color: ${(props) => props.theme.colors.brand1};
  }
`;

const RightColumn = styled.div`
  flex: 0 0 460px;
  position: relative;
  width: 100%;
  max-width: 460px;

  @media (max-width: 900px) {
    flex: 1;
  }
`;

const CodeGlow = styled.div`
  position: absolute;
  inset: -30px;
  background: radial-gradient(ellipse at 50% 40%, ${(props) => props.theme.colors.brand1} 0%, transparent 68%);
  filter: blur(50px);
  opacity: 0.3;
  z-index: 0;
`;

const CodeCard = styled.div`
  position: relative;
  z-index: 1;
  border-radius: ${(props) => props.theme.radius.md};
  background: ${(props) => props.theme.colors.navy};
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(15, 23, 42, 0.06), 0 30px 60px rgba(15, 23, 42, 0.22);
`;

const CodeCardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 14px 16px;
  background: ${(props) => props.theme.colors.navySoft};
`;

const TrafficDot = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${(props) => props.$color};
`;

const FileName = styled.span`
  margin-left: 8px;
  font-family: ${(props) => props.theme.typography.fontFamilyMono};
  font-size: 12px;
  color: #5b6b84;
`;

const CodeCardBody = styled.div`
  padding: 28px 26px;
  font-family: ${(props) => props.theme.typography.fontFamilyMono};
  font-size: 15px;
  line-height: 2;
  color: #94a3b8;

  @media (max-width: 480px) {
    font-size: 12.5px;
    padding: 20px 18px;
  }
`;

const AvailabilityBadge = styled.div`
  position: absolute;
  z-index: 2;
  bottom: -18px;
  right: 24px;
  display: flex;
  align-items: center;
  gap: 9px;
  background: ${(props) => props.theme.colors.white};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: ${(props) => props.theme.radius.pill};
  padding: 10px 18px 10px 14px;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.16);

  @media (max-width: 900px) {
    position: static;
    margin-top: 16px;
    width: fit-content;
  }
`;

const PulseDot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #22c55e;
  box-shadow: 0 0 10px #22c55e;
`;

const AvailabilityText = styled.span`
  font-size: 13px;
  font-weight: 500;
  color: ${(props) => props.theme.colors.text};
  white-space: nowrap;
`;

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const DeveloperProfile = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'], layoutEffect: false });

  const yBlob1 = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const yBlob2 = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const yBlob3 = useTransform(scrollYProgress, [0, 1], [0, 160]);

  return (
    <Container id="home" ref={sectionRef}>
      <Blob style={{ y: yBlob1, top: '-220px', right: '-200px', width: 600, height: 600, borderRadius: '44% 56% 62% 38% / 41% 44% 56% 59%', background: 'radial-gradient(circle at 35% 30%, #1BA3E8 0%, transparent 70%)' }} $opacity={0.24} />
      <Blob style={{ y: yBlob2, bottom: '-260px', left: '-180px', width: 520, height: 520, borderRadius: '58% 42% 39% 61% / 55% 48% 52% 45%', background: 'radial-gradient(circle at 60% 60%, #5CCBF5 0%, transparent 70%)' }} $opacity={0.18} $blur="120px" />
      <Blob style={{ y: yBlob3, top: '220px', right: '120px', width: 420, height: 420, borderRadius: '50%', background: 'radial-gradient(circle, #1BA3E8 0%, transparent 72%)' }} $opacity={0.16} $blur="90px" />

      <Watermark>DEV JR<br />FULL STACK</Watermark>

      <ContentRow>
        <LeftColumn>
          <Eyebrow>
            <EyebrowDot />
            <EyebrowLabel>Desenvolvedor Full Stack</EyebrowLabel>
          </Eyebrow>

          <Headline>
            <RevealText as="div" text="Eu construo" />
            <RevealText as="div" text="produtos full stack" />
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.6 }}
              variants={fadeInUp}
            >
              <HeadlineGradient>que funcionam.</HeadlineGradient>
            </m.div>
          </Headline>

          <m.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeInUp}>
            <Paragraph>
              Júnior com foco em <strong>React</strong>, <strong>Node.js</strong> e <strong>Nest.js</strong>. Já levei projetos do zero à produção.
            </Paragraph>

            <TechPills>
              <TechPill>React</TechPill>
              <TechPill>Node.js</TechPill>
              <TechPill>Nest.js</TechPill>
              <TechPill>TypeScript</TechPill>
            </TechPills>

            <ButtonsRow>
              <MagneticButton>
                <PrimaryButton href="#projetos">
                  Ver Projetos
                  <FaArrowRight size={14} />
                </PrimaryButton>
              </MagneticButton>
              <MagneticButton>
                <SecondaryButton
                  href="https://drive.google.com/uc?export=download&id=1IA3T5Ks_PnpFMjxy-W0H58_g3QC28N9w"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaDownload size={14} />
                  Baixar CV
                </SecondaryButton>
              </MagneticButton>
            </ButtonsRow>
          </m.div>
        </LeftColumn>

        <m.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeInUp} style={{ width: '100%', maxWidth: 460 }}>
          <RightColumn>
            <CodeGlow />
            <TiltCard maxTilt={6} scale={1.015}>
              <CodeCard>
                <CodeCardHeader>
                  <TrafficDot $color="#FF5F57" />
                  <TrafficDot $color="#FEBC2E" />
                  <TrafficDot $color="#28C840" />
                  <FileName>daniel.dev.js</FileName>
                </CodeCardHeader>
                <CodeCardBody>
                  <div><span style={{ color: '#5CCBF5' }}>const</span> <span style={{ color: '#F1F5F9' }}>dev</span> = {'{'}</div>
                  <div>&nbsp;&nbsp;nome: <span style={{ color: '#A5E8C4' }}>'Daniel'</span>,</div>
                  <div>&nbsp;&nbsp;cargo: <span style={{ color: '#A5E8C4' }}>'Full Stack Júnior'</span>,</div>
                  <div>&nbsp;&nbsp;stack: [<span style={{ color: '#A5E8C4' }}>'React'</span>, <span style={{ color: '#A5E8C4' }}>'Node'</span>, <span style={{ color: '#A5E8C4' }}>'Nest'</span>],</div>
                  <div>&nbsp;&nbsp;experiencia: <span style={{ color: '#FBBF6B' }}>2</span>, <span style={{ color: '#5B6B84' }}>// anos</span></div>
                  <div>&nbsp;&nbsp;disponivel: <span style={{ color: '#5CCBF5' }}>true</span></div>
                  <div>{'};'}</div>
                </CodeCardBody>
              </CodeCard>
            </TiltCard>
            <AvailabilityBadge>
              <PulseDot />
              <AvailabilityText>Disponível para vaga de dev!</AvailabilityText>
            </AvailabilityBadge>
          </RightColumn>
        </m.div>
      </ContentRow>
    </Container>
  );
};

export default DeveloperProfile;
