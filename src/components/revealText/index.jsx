import React from 'react';
import { m } from 'framer-motion';

const container = {
  hidden: {},
  visible: (staggerChildren) => ({
    transition: { staggerChildren, delayChildren: 0.02 },
  }),
};

const word = {
  hidden: { opacity: 0, y: '0.5em' },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
};

const RevealText = ({
  text,
  as = 'span',
  className,
  style,
  viewportAmount = 0.6,
  stagger = 0.04,
}) => {
  const Wrapper = m[as] || m.span;
  const words = text.split(' ');

  return (
    <Wrapper
      className={className}
      style={{ overflow: 'hidden', ...style }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: viewportAmount }}
      variants={container}
      custom={stagger}
    >
      {words.map((w, i) => (
        <m.span
          key={i}
          variants={word}
          style={{ display: 'inline-block', marginRight: '0.28em' }}
        >
          {w}
        </m.span>
      ))}
    </Wrapper>
  );
};

export default RevealText;
