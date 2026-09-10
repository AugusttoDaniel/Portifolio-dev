import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { AnimatePresence, m, useReducedMotion } from 'framer-motion';
import { useLenis } from 'lenis/react';
import {
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaExternalLinkAlt,
  FaGithub,
  FaCheck,
} from 'react-icons/fa';
import { getProjectGallery } from '../../utils/projectImages';
import { useIsPhone } from '../../hooks/useIsPhone';

const Overlay = styled(m.div)`
  position: fixed;
  inset: 0;
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px 20px;
  background: rgba(15, 23, 42, 0.55);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);

  @media (max-width: 900px) {
    padding: 24px 16px;
  }

  /* Abaixo disso o modal vira uma folha colada na base da tela. */
  @media (max-width: 720px) {
    padding: 0;
    align-items: flex-end;
  }
`;

const Panel = styled(m.div)`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1040px;
  /* dvh acompanha a barra de endereço do celular, que entra e sai durante o
     scroll. O vh fica como reserva para navegadores sem suporte. */
  max-height: 90vh;
  max-height: 90dvh;
  overflow: hidden;
  background-color: ${(props) => props.theme.colors.surface};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 20px;
  box-shadow: 0 2px 6px rgba(15, 23, 42, 0.08), 0 40px 80px rgba(15, 23, 42, 0.28);

  &:focus {
    outline: none;
  }

  @media (max-width: 720px) {
    max-width: 100%;
    max-height: 92vh;
    max-height: 92dvh;
    border-radius: 20px 20px 0 0;
    border-bottom: none;
  }

  /* Celular deitado e janelas baixas: aproveita quase toda a altura. */
  @media (max-height: 560px) {
    max-height: 96vh;
    max-height: 96dvh;
  }
`;

const TopBar = styled.div`
  position: relative;
  z-index: 3;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 14px 20px;
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  background: rgba(255, 255, 255, 0.88);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 2px;
    width: 100%;
    background: linear-gradient(
      to right,
      transparent,
      ${(props) => props.theme.colors.brand1},
      ${(props) => props.theme.colors.brand2},
      transparent
    );
  }

  @media (max-width: 560px) {
    padding: 12px 16px;
  }

  @media (max-height: 560px) {
    padding: 10px 16px;
  }
`;

const TopBarTitle = styled.span`
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
  font-size: 0.95rem;
  font-weight: 600;
  color: ${(props) => props.theme.colors.text};

  span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &::before {
    content: "";
    flex-shrink: 0;
    width: 8px;
    height: 8px;
    border-radius: ${(props) => props.theme.radius.circle};
    background: ${(props) => props.theme.colors.brand1};
    box-shadow: 0 0 0 4px ${(props) => props.theme.colors.surfaceTint};
  }
`;

const IconButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 38px;
  height: 38px;
  padding: 0;
  cursor: pointer;
  color: ${(props) => props.theme.colors.textMuted};
  background-color: ${(props) => props.theme.colors.surface};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: ${(props) => props.theme.radius.circle};
  transition: all 0.2s ease;

  svg {
    width: 16px;
    height: 16px;
  }

  &:hover {
    color: ${(props) => props.theme.colors.accentHover};
    background-color: ${(props) => props.theme.colors.surfaceTint};
    border-color: ${(props) => props.theme.colors.brand2};
  }

  &:focus-visible {
    outline: 2px solid ${(props) => props.theme.colors.brand1};
    outline-offset: 2px;
  }
`;

const Body = styled.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  overscroll-behavior: contain;

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.colors.border};
    border: 3px solid ${(props) => props.theme.colors.surface};
    border-radius: ${(props) => props.theme.radius.pill};
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: ${(props) => props.theme.colors.brand2};
  }
`;

const Stage = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  /* Em telas baixas a imagem não pode comer o modal inteiro: o texto precisa
     aparecer logo abaixo para indicar que há mais conteúdo. */
  max-height: 52vh;
  max-height: 52dvh;
  background:
    radial-gradient(circle at 50% 0%, ${(props) => props.theme.colors.surfaceTint} 0%, transparent 70%),
    ${(props) => props.theme.colors.bgAlt};
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  overflow: hidden;

  /* Só no celular em pé a proporção mais alta compensa: no tablet ela deixaria
     a imagem gigante antes do texto. */
  @media (max-width: 560px) {
    aspect-ratio: 4 / 3;
  }

  @media (max-height: 560px) {
    max-height: 45vh;
    max-height: 45dvh;
  }
`;

const StageImage = styled(m.img)`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const StageArrow = styled(IconButton)`
  position: absolute;
  top: 50%;
  ${(props) => (props.$side === 'left' ? 'left: 14px;' : 'right: 14px;')}
  transform: translateY(-50%);
  width: 42px;
  height: 42px;
  background-color: rgba(255, 255, 255, 0.92);
  box-shadow: 0 6px 16px rgba(15, 23, 42, 0.14);

  @media (max-width: 560px) {
    width: 36px;
    height: 36px;
    ${(props) => (props.$side === 'left' ? 'left: 8px;' : 'right: 8px;')}

    svg {
      width: 13px;
      height: 13px;
    }
  }
`;

const Counter = styled.span`
  position: absolute;
  right: 14px;
  bottom: 14px;
  padding: 4px 10px;
  font-family: ${(props) => props.theme.typography.fontFamilyMono};
  font-size: 0.72rem;
  color: ${(props) => props.theme.colors.textMuted};
  background-color: rgba(255, 255, 255, 0.92);
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: ${(props) => props.theme.radius.pill};
`;

const Caption = styled.p`
  padding: 12px 32px 0;
  font-size: 0.82rem;
  line-height: 1.5;
  color: ${(props) => props.theme.colors.textMuted};

  @media (max-width: 720px) {
    padding: 12px 20px 0;
  }

  @media (max-width: 400px) {
    padding: 10px 16px 0;
  }
`;

const Thumbs = styled.div`
  display: flex;
  gap: 10px;
  padding: 14px 32px 0;
  overflow-x: auto;
  overscroll-behavior-x: contain;
  scrollbar-width: thin;
  -webkit-overflow-scrolling: touch;

  @media (max-width: 720px) {
    padding: 14px 20px 0;
  }

  @media (max-width: 400px) {
    padding: 12px 16px 0;
    gap: 8px;
  }
`;

const Thumb = styled.button`
  flex-shrink: 0;
  width: 84px;
  height: 56px;
  padding: 0;
  overflow: hidden;
  cursor: pointer;
  background-color: ${(props) => props.theme.colors.bgAlt};
  border: 1px solid ${(props) => (props.$active ? props.theme.colors.brand1 : props.theme.colors.border)};
  border-radius: ${(props) => props.theme.radius.sm};
  box-shadow: ${(props) => (props.$active ? `0 0 0 2px ${props.theme.colors.brand1}33` : 'none')};
  opacity: ${(props) => (props.$active ? 1 : 0.65)};
  transition: all 0.2s ease;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  &:hover {
    opacity: 1;
    border-color: ${(props) => props.theme.colors.brand2};
  }

  &:focus-visible {
    outline: 2px solid ${(props) => props.theme.colors.brand1};
    outline-offset: 2px;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 28px 32px 36px;

  @media (max-width: 720px) {
    padding: 24px 20px 32px;
    gap: 26px;
  }

  @media (max-width: 400px) {
    padding: 20px 16px 28px;
    gap: 22px;
  }

  @media (max-height: 560px) {
    padding-top: 18px;
    gap: 20px;
  }
`;

const Intro = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Kicker = styled.span`
  font-family: ${(props) => props.theme.typography.fontFamilyMono};
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 1.6px;
  text-transform: uppercase;
  color: ${(props) => props.theme.colors.accentHover};
`;

const ProjectName = styled.h2`
  margin: 0;
  font-size: ${(props) => props.theme.typography.fontSize.xl};
  font-weight: 700;
  line-height: 1.2;
  color: ${(props) => props.theme.colors.text};
  overflow-wrap: anywhere;

  @media (max-width: 720px) {
    font-size: ${(props) => props.theme.typography.fontSize.lg};
  }

  @media (max-width: 400px) {
    font-size: 22px;
  }
`;

const Tagline = styled.p`
  max-width: 68ch;
  font-size: 1.05rem;
  font-weight: 400;
  line-height: 1.6;
  color: ${(props) => props.theme.colors.textMuted};

  @media (max-width: 560px) {
    font-size: 0.97rem;
  }
`;

const MetaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 4px;
`;

const MetaChip = styled.div`
  display: flex;
  align-items: baseline;
  gap: 6px;
  padding: 6px 12px;
  background-color: ${(props) => props.theme.colors.bgAlt};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: ${(props) => props.theme.radius.pill};

  strong {
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.8px;
    text-transform: uppercase;
    color: ${(props) => props.theme.colors.textMuted};
  }

  span {
    font-size: 0.85rem;
    color: ${(props) => props.theme.colors.text};
  }
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const SectionLabel = styled.h3`
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 1.6px;
  text-transform: uppercase;
  color: ${(props) => props.theme.colors.accentDeep};

  &::before {
    content: "";
    width: 20px;
    height: 2px;
    border-radius: ${(props) => props.theme.radius.pill};
    background: linear-gradient(
      to right,
      ${(props) => props.theme.colors.brand1},
      ${(props) => props.theme.colors.brand2}
    );
  }
`;

const Paragraph = styled.p`
  max-width: 74ch;
  font-size: 0.98rem;
  font-weight: 400;
  line-height: 1.75;
  color: ${(props) => props.theme.colors.text};

  & + & {
    margin-top: 12px;
  }
`;

const HighlightGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 14px;
`;

const HighlightCard = styled.div`
  display: flex;
  gap: 12px;
  padding: 16px;
  background-color: ${(props) => props.theme.colors.surface};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: ${(props) => props.theme.radius.md};
  transition: all 0.25s ease;

  &:hover {
    border-color: ${(props) => props.theme.colors.brand2};
    transform: translateY(-2px);
    box-shadow: 0 12px 24px rgba(15, 23, 42, 0.08);
  }
`;

const HighlightIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 26px;
  height: 26px;
  color: ${(props) => props.theme.colors.accentHover};
  background-color: ${(props) => props.theme.colors.surfaceTint};
  border-radius: ${(props) => props.theme.radius.circle};

  svg {
    width: 12px;
    height: 12px;
  }
`;

const HighlightTitle = styled.h4`
  margin: 0 0 4px;
  font-size: 0.95rem;
  font-weight: 600;
  color: ${(props) => props.theme.colors.text};
`;

const HighlightText = styled.p`
  font-size: 0.87rem;
  font-weight: 400;
  line-height: 1.6;
  color: ${(props) => props.theme.colors.textMuted};
`;

const StackGroups = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const StackGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
`;

const StackGroupName = styled.span`
  min-width: 110px;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  color: ${(props) => props.theme.colors.textMuted};

  /* Em telas estreitas o nome do grupo ocupa a linha inteira, para as tags
     começarem alinhadas embaixo dele em vez de quebrarem no meio. */
  @media (max-width: 560px) {
    min-width: 100%;
  }
`;

const TechItem = styled.span`
  font-size: 0.8rem;
  color: ${(props) => props.theme.colors.accentHover};
  background-color: ${(props) => props.theme.colors.surfaceTint};
  padding: 5px 12px;
  border-radius: ${(props) => props.theme.radius.pill};
`;

const NoteList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0;
  margin: 0;
  list-style: none;
`;

const NoteItem = styled.li`
  position: relative;
  padding-left: 20px;
  max-width: 74ch;
  font-size: 0.92rem;
  line-height: 1.65;
  color: ${(props) => props.theme.colors.textMuted};

  &::before {
    content: "";
    position: absolute;
    top: 0.62em;
    left: 0;
    width: 7px;
    height: 7px;
    border-radius: 2px;
    background: linear-gradient(
      135deg,
      ${(props) => props.theme.colors.brand1},
      ${(props) => props.theme.colors.brand2}
    );
  }
`;

const Footer = styled.div`
  flex-shrink: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 12px;
  padding: 16px 24px;
  border-top: 1px solid ${(props) => props.theme.colors.border};
  background-color: ${(props) => props.theme.colors.bgAlt};

  @media (max-width: 720px) {
    padding: 14px 20px;

    a {
      flex: 1;
      justify-content: center;
    }
  }

  @media (max-width: 400px) {
    padding: 12px 16px;
    gap: 8px;
  }
`;

const FooterLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  font-size: 0.9rem;
  font-weight: 500;
  white-space: nowrap;
  text-decoration: none;
  border-radius: ${(props) => props.theme.radius.sm};
  transition: all 0.25s ease;

  svg {
    width: 14px;
    height: 14px;
    flex-shrink: 0;
  }

  @media (max-width: 400px) {
    padding: 10px 12px;
    font-size: 0.83rem;
    gap: 6px;
  }

  ${(props) => (props.$primary
    ? `
      color: ${props.theme.colors.white};
      background: linear-gradient(135deg, ${props.theme.colors.brand1}, ${props.theme.colors.accentHover});
      border: 1px solid transparent;

      &:hover {
        box-shadow: 0 10px 20px ${props.theme.colors.brand1}3D;
        transform: translateY(-1px);
      }
    `
    : `
      color: ${props.theme.colors.accentHover};
      background-color: ${props.theme.colors.surface};
      border: 1px solid ${props.theme.colors.brand1};

      &:hover {
        background-color: ${props.theme.colors.surfaceTint};
      }
    `)}

  &:focus-visible {
    outline: 2px solid ${(props) => props.theme.colors.brand1};
    outline-offset: 2px;
  }
`;

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

const ProjectModalContent = ({ project, onClose }) => {
  const lenis = useLenis();
  const isPhone = useIsPhone(720);
  const reducedMotion = useReducedMotion();
  const panelRef = useRef(null);
  const touchStart = useRef(null);
  const [activeImage, setActiveImage] = useState(0);

  const details = project.details ?? {};
  const gallery = useMemo(() => getProjectGallery(project), [project]);
  const hasGallery = gallery.length > 1;
  const current = gallery[activeImage];

  const overview = details.overview ?? (project.description ? [project.description] : []);
  const stack = details.stack ?? (project.tech?.length ? [{ group: '', items: project.tech }] : []);
  const meta = details.meta ?? [];
  const highlights = details.highlights ?? [];
  const notes = details.notes ?? [];
  const hasLinks = Boolean(project.demoLink || project.codeLink);

  const goTo = useCallback((direction) => {
    setActiveImage((prev) => (prev + direction + gallery.length) % gallery.length);
  }, [gallery.length]);

  const handleTouchStart = (event) => {
    const touch = event.touches[0];
    touchStart.current = { x: touch.clientX, y: touch.clientY };
  };

  // Arrastar o dedo na imagem troca de foto, mas só quando o gesto é mais
  // horizontal que vertical: caso contrário quem manda é o scroll do modal.
  const handleTouchEnd = (event) => {
    if (!touchStart.current || !hasGallery) return;
    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - touchStart.current.x;
    const deltaY = touch.clientY - touchStart.current.y;
    touchStart.current = null;

    if (Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY)) {
      goTo(deltaX < 0 ? 1 : -1);
    }
  };

  // O Lenis controla o scroll da página: pausar enquanto o modal está aberto evita
  // que a página role atrás dele. O corpo do modal carrega data-lenis-prevent para
  // continuar rolando nativamente por dentro.
  useEffect(() => {
    lenis?.stop();
    return () => lenis?.start();
  }, [lenis]);

  useEffect(() => {
    const previouslyFocused = document.activeElement;
    panelRef.current?.focus({ preventScroll: true });
    return () => previouslyFocused?.focus?.({ preventScroll: true });
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key === 'Tab') {
        const focusables = panelRef.current?.querySelectorAll(FOCUSABLE);
        if (!focusables?.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = document.activeElement;
        // Clicar num trecho de texto do modal joga o foco para o body: sem isso,
        // o Tab seguinte escaparia para o header em vez de circular no modal.
        const inside = panelRef.current.contains(active) && active !== panelRef.current;

        if (!inside) {
          event.preventDefault();
          (event.shiftKey ? last : first).focus();
        } else if (event.shiftKey && active === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && active === last) {
          event.preventDefault();
          first.focus();
        }
        return;
      }

      if (!hasGallery) return;
      if (event.key === 'ArrowLeft') goTo(-1);
      if (event.key === 'ArrowRight') goTo(1);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goTo, hasGallery, onClose]);

  const panelMotion = reducedMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : isPhone
      ? {
        initial: { y: '6%', opacity: 0 },
        animate: { y: 0, opacity: 1 },
        exit: { y: '8%', opacity: 0 },
      }
      : {
        initial: { y: 24, scale: 0.97, opacity: 0 },
        animate: { y: 0, scale: 1, opacity: 1 },
        exit: { y: 16, scale: 0.98, opacity: 0 },
      };

  return (
    <Overlay
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <Panel
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`projeto-${project.id}-titulo`}
        tabIndex={-1}
        {...panelMotion}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        <TopBar>
          <TopBarTitle><span>{project.title}</span></TopBarTitle>
          <IconButton type="button" onClick={onClose} aria-label="Fechar detalhes do projeto">
            <FaTimes />
          </IconButton>
        </TopBar>

        <Body data-lenis-prevent>
          {current && (
            <>
              <Stage onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
                <AnimatePresence initial={false} mode="wait">
                  <StageImage
                    key={current.url}
                    src={current.url}
                    alt={current.caption || project.title}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: reducedMotion ? 0 : 0.28 }}
                    decoding="async"
                  />
                </AnimatePresence>

                {hasGallery && (
                  <>
                    <StageArrow
                      type="button"
                      $side="left"
                      onClick={() => goTo(-1)}
                      aria-label="Imagem anterior"
                    >
                      <FaChevronLeft />
                    </StageArrow>
                    <StageArrow
                      type="button"
                      $side="right"
                      onClick={() => goTo(1)}
                      aria-label="Próxima imagem"
                    >
                      <FaChevronRight />
                    </StageArrow>
                    <Counter aria-hidden="true">
                      {activeImage + 1} / {gallery.length}
                    </Counter>
                  </>
                )}
              </Stage>

              {current.caption && <Caption>{current.caption}</Caption>}

              {hasGallery && (
                <Thumbs>
                  {gallery.map((image, index) => (
                    <Thumb
                      key={image.url}
                      type="button"
                      $active={index === activeImage}
                      onClick={() => setActiveImage(index)}
                      aria-label={`Ver imagem ${index + 1} de ${gallery.length}`}
                      aria-current={index === activeImage}
                    >
                      <img src={image.url} alt="" loading="lazy" decoding="async" />
                    </Thumb>
                  ))}
                </Thumbs>
              )}
            </>
          )}

          <Content>
            <Intro>
              {details.kicker && <Kicker>{details.kicker}</Kicker>}
              <ProjectName id={`projeto-${project.id}-titulo`}>{project.title}</ProjectName>
              {(details.tagline || project.description) && (
                <Tagline>{details.tagline || project.description}</Tagline>
              )}
              {meta.length > 0 && (
                <MetaRow>
                  {meta.map((item) => (
                    <MetaChip key={item.label}>
                      <strong>{item.label}</strong>
                      <span>{item.value}</span>
                    </MetaChip>
                  ))}
                </MetaRow>
              )}
            </Intro>

            {overview.length > 0 && (
              <Section>
                <SectionLabel>Sobre o projeto</SectionLabel>
                <div>
                  {overview.map((paragraph) => (
                    <Paragraph key={paragraph.slice(0, 40)}>{paragraph}</Paragraph>
                  ))}
                </div>
              </Section>
            )}

            {highlights.length > 0 && (
              <Section>
                <SectionLabel>O que ele faz</SectionLabel>
                <HighlightGrid>
                  {highlights.map((highlight) => (
                    <HighlightCard key={highlight.title}>
                      <HighlightIcon aria-hidden="true"><FaCheck /></HighlightIcon>
                      <div>
                        <HighlightTitle>{highlight.title}</HighlightTitle>
                        <HighlightText>{highlight.text}</HighlightText>
                      </div>
                    </HighlightCard>
                  ))}
                </HighlightGrid>
              </Section>
            )}

            {stack.length > 0 && (
              <Section>
                <SectionLabel>Stack</SectionLabel>
                <StackGroups>
                  {stack.map((group) => (
                    <StackGroup key={group.group || 'stack'}>
                      {group.group && <StackGroupName>{group.group}</StackGroupName>}
                      {group.items.map((item) => (
                        <TechItem key={item}>{item}</TechItem>
                      ))}
                    </StackGroup>
                  ))}
                </StackGroups>
              </Section>
            )}

            {notes.length > 0 && (
              <Section>
                <SectionLabel>Decisões técnicas</SectionLabel>
                <NoteList>
                  {notes.map((note) => (
                    <NoteItem key={note.slice(0, 40)}>{note}</NoteItem>
                  ))}
                </NoteList>
              </Section>
            )}
          </Content>
        </Body>

        {hasLinks && (
          <Footer>
            {project.codeLink && (
              <FooterLink href={project.codeLink} target="_blank" rel="noopener noreferrer">
                <FaGithub /> Ver código
              </FooterLink>
            )}
            {project.demoLink && (
              <FooterLink $primary href={project.demoLink} target="_blank" rel="noopener noreferrer">
                <FaExternalLinkAlt /> Abrir demo
              </FooterLink>
            )}
          </Footer>
        )}
      </Panel>
    </Overlay>
  );
};

const ProjectModal = ({ project, onClose }) => {
  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {project && (
        <ProjectModalContent key={project.id} project={project} onClose={onClose} />
      )}
    </AnimatePresence>,
    document.body,
  );
};

export default ProjectModal;
