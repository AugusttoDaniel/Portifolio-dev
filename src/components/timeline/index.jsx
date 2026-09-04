import React from 'react';
import styled from 'styled-components';
import { m } from 'framer-motion';
import TimelineItem from '../timelineitem';
import { useIsPhone } from '../../hooks/useIsPhone';

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.25,
      duration: 0.6,
      ease: 'easeOut',
    },
  }),
};

const TimelineContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: ${props => props.$maxWidth || '1200px'};
  margin: 0 auto;
  padding: 2rem 0;
  font-family: ${props => props.$fontFamily || 'Inter, sans-serif'};
`;

const TimelineTitle = styled.h2`
  text-align: center;
  font-size: 1.25rem;
  margin-bottom: 2rem;
  color: ${props => props.$titleColor || 'white'};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TimelineLine = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  width: ${props => props.$lineWidth || '2px'};
  background-color: ${props => props.$lineColor || 'rgba(255, 255, 255, 0.3)'};
  transform: translateX(-50%);
  transition: all 0.3s ease; 
  @media (max-width: 760px) {
    left: 80%;
  }
`;

const TimelineDot = styled(m.div)`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: ${props => props.$size || '16px'};
  height: ${props => props.$size || '16px'};
  border-radius: 50%;
  background-color: ${props => props.$backgroundColor || props.theme.colors.brand1};
  border: ${props => props.$borderWidth || '3px'} solid ${props => props.$borderColor || props.theme.colors.bgAlt};
  top: ${props => props.$top || '0'};
  z-index: 2;
  @media (max-width: 760px) {
    left: 80%;
  }
`;

const Timeline = ({
  $items = [],
  showTitleDot = true,
  $styleProps = {},
}) => {
  const totalItems = $items.length;
  const isPhone = useIsPhone();

  return (
    <TimelineContainer 
      $maxWidth={$styleProps.container?.maxWidth}
      $fontFamily={$styleProps.container?.fontFamily}
    >
      <TimelineTitle 
        $showTitleDot={showTitleDot} 
        $titleColor={$styleProps.title?.titleColor}
      />
      <TimelineLine 
        $lineWidth={$styleProps.line?.lineWidth}
        $lineColor={$styleProps.line?.lineColor} 
      />

      {$items.map((item, index) => {
        const percentage = ((index + 1) / (totalItems + 1)) * 100;
        return (
          <TimelineDot
            key={`dot-${item.title}-${item.date}`}
            $top={`${percentage}%`}
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={itemVariants}
          />
        );
      })}

      {$items.map((item, index) => (
        <m.div
          key={`item-${item.title}-${item.date}`}
          custom={index}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={itemVariants}
        >
          <TimelineItem
            $position={isPhone ? 'left' : index % 2 === 0 ? 'right' : 'left'}
            {...item}
          />
        </m.div>
      ))}
    </TimelineContainer>
  );
};

export default Timeline;