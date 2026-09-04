import React, { useRef } from 'react';
import { m, useMotionValue, useSpring, useTransform } from 'framer-motion';

const TiltCard = ({ children, className, style, maxTilt = 8, scale = 1.02 }) => {
  const ref = useRef(null);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const springX = useSpring(x, { stiffness: 250, damping: 20 });
  const springY = useSpring(y, { stiffness: 250, damping: 20 });

  const rotateX = useTransform(springY, [0, 1], [maxTilt, -maxTilt]);
  const rotateY = useTransform(springX, [0, 1], [-maxTilt, maxTilt]);

  const reducedMotion = typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canHover = typeof window === 'undefined'
    || window.matchMedia('(any-hover: hover)').matches;

  if (reducedMotion || !canHover) {
    return <div className={className} style={style}>{children}</div>;
  }

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <m.div
      ref={ref}
      className={className}
      style={{
        ...style,
        rotateX,
        rotateY,
        transformPerspective: 800,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale }}
      transition={{ scale: { duration: 0.25, ease: 'easeOut' } }}
    >
      {children}
    </m.div>
  );
};

export default TiltCard;
