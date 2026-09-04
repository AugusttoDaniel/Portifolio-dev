import { useState, useEffect } from 'react';

export const useIsPhone = (breakpoint = 768) => {
  const [isPhone, setIsPhone] = useState(
    () => typeof window !== 'undefined' && window.innerWidth <= breakpoint
  );

  useEffect(() => {
    const handleResize = () => setIsPhone(window.innerWidth <= breakpoint);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint]);

  return isPhone;
};
