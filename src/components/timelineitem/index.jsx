import React from 'react';
import styled from 'styled-components';
import { FaGraduationCap } from "react-icons/fa"; // Importe os ícones necessários
import { GrCertificate } from "react-icons/gr";

// Styled Components específicos do Item
const TimelineItemContainer = styled.div`
  display: flex;
  justify-content: ${props => props.position === 'left' ? 'flex-end' : 'flex-start'};
  margin-bottom: ${props => props.marginBottom || '2rem'};
  padding-left: ${props => props.position === 'right' ? 'calc(50% + 15px)' : '0'};
  padding-right: ${props => props.position === 'left' ? 'calc(50% + 15px)' : '0'};
`;

const TimelineCard = styled.div`
  width: 100%;
  background-color: ${props => props.backgroundColor || 'rgba(30, 41, 82, 0.7)'};
  border-radius: ${props => props.borderRadius || '0.5rem'};
  padding: ${props => props.padding || '1.5rem'};
  box-shadow: ${props => props.boxShadow || '0 4px 6px rgba(0, 0, 0, 0.1)'};
  color: ${props => props.textColor || 'white'};
  max-width: ${props => props.maxWidth || '100%'};
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: ${props => props.hoverEffect ? 'translateY(-5px)' : 'none'};
    box-shadow: ${props => props.hoverEffect ? '0 10px 15px rgba(0, 0, 0, 0.15)' : props.boxShadow || '0 4px 6px rgba(0, 0, 0, 0.1)'};
  }
  @media (max-width: 768px) {
    padding: ${props => props.mobilePadding || '1rem'};
    max-width: ${props => props.mobileMaxWidth || '100%'};
  }
  
`;

const TimelineDate = styled.div`
  font-size: ${props => props.fontSize || '0.8rem'};
  opacity: ${props => props.opacity || '0.7'};
  margin-bottom: ${props => props.marginBottom || '0.25rem'};
  color: ${props => props.color || 'inherit'};
`;

const TimelineHeader = styled.div`
  display: flex;
  align-items: ${props => props.alignItems || 'center'};
  margin-bottom: ${props => props.marginBottom || '1rem'};
`;

const TimelineIcon = styled.div`
  width: ${props => props.size || '40px'};
  height: ${props => props.size || '40px'};
  background-color: ${props => props.backgroundColor || '#4e73df'};
  border-radius: ${props => props.borderRadius || '8px'};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: ${props => props.marginRight || '1rem'};
  color: ${props => props.iconColor || 'white'};
  font-size: ${props => props.iconSize || '1.2rem'};
`;

const TimelineTitle2 = styled.h3`
  font-size: ${props => props.fontSize || '1.1rem'};
  margin-bottom: ${props => props.marginBottom || '0.25rem'};
  color: ${props => props.color || 'inherit'};
  font-weight: ${props => props.fontWeight || '600'};
`;

const TimelineSubtitle = styled.div`
  font-size: ${props => props.fontSize || '0.9rem'};
  opacity: ${props => props.opacity || '0.8'};
  color: ${props => props.color || 'inherit'};
  font-weight: ${props => props.fontWeight || 'normal'};
`;

const TimelineContent = styled.div`
  font-size: ${props => props.fontSize || '0.9rem'};
  line-height: ${props => props.lineHeight || '1.4'};
  margin: ${props => props.margin || '1rem 0'};
  color: ${props => props.color || 'inherit'};
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${props => props.gap || '0.5rem'};
  margin-top: ${props => props.marginTop || '1rem'};
`;

const Tag = styled.span`
  font-size: ${props => props.fontSize || '0.75rem'};
  padding: ${props => props.padding || '0.25rem 0.5rem'};
  background-color: ${props => props.backgroundColor || 'rgba(255, 255, 255, 0.1)'};
  border-radius: ${props => props.borderRadius || '1rem'};
  color: ${props => props.color || 'inherit'};
`;

const Button = styled.button`
  width: ${props => props.width || '100%'};
  background-color: ${props => props.backgroundColor || 'rgba(78, 115, 223, 0.9)'};
  color: ${props => props.color || 'white'};
  border: none;
  border-radius: ${props => props.borderRadius || '0.25rem'};
  padding: ${props => props.padding || '0.5rem'};
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${props => props.fontSize || '0.9rem'};
  margin-top: ${props => props.marginTop || '1rem'};
  
  &:hover {
    background-color: ${props => props.hoverBackgroundColor || 'rgba(98, 135, 243, 0.9)'};
  }
`;

const iconMap = {
  FaGraduationCap: FaGraduationCap,
  FaCertificate: GrCertificate,
};

// Componente TimelineItem
const TimelineItem = ({
  position = 'right',
  date,
  title,
  subtitle,
  icon,
  description,
  tags = [],
  button,
  cardStyles = {},
  onCardClick,
}) => {
  // verifica se é telefone 
  const isPhone = window.innerWidth <= 768;


  const IconComponent = typeof icon === 'string' ? iconMap[icon] : icon;
  return (

    <TimelineItemContainer position={position}>
      <TimelineCard
        onClick={onCardClick}
        style={{ cursor: onCardClick ? 'pointer' : 'default' }}
        {...cardStyles}
      >
        {date && <TimelineDate>{date}</TimelineDate>}

        <TimelineHeader>
          {!isPhone && icon &&
            <TimelineIcon {...(cardStyles.iconStyles || {})}>
              <IconComponent />
            </TimelineIcon>

          }

          <div>
            {title && <TimelineTitle2 {...(cardStyles.titleStyles || {})}>{title}</TimelineTitle2>}
            {subtitle && <TimelineSubtitle {...(cardStyles.subtitleStyles || {})}>{subtitle}</TimelineSubtitle>}
          </div>
        </TimelineHeader>

        {!isPhone && description && 
        <TimelineContent {...(cardStyles.contentStyles || {})}>{description}</TimelineContent>
        }
        {!isPhone && tags.length > 0 && (
          <TagsContainer {...(cardStyles.tagsContainerStyles || {})}>
            {tags.map((tag, index) => (
              <Tag key={index} {...(cardStyles.tagStyles || {})}>{tag}</Tag>
            ))}
          </TagsContainer>
        )}

        {button && (
          <Button
            onClick={(e) => {
              e.stopPropagation();
              button.onClick && button.onClick();
            }}
            {...(cardStyles.buttonStyles || {})}
          >
            {button.text || "Ver Mais"} {button.showArrow && "→"}
          </Button>
        )}
      </TimelineCard>
    </TimelineItemContainer>
  );
};

export default TimelineItem;