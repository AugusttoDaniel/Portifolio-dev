import { useEffect, useState } from 'react';

/**
 * Media query reativa.
 *
 * Ler window.matchMedia direto no render congela o resultado: se a capacidade
 * do dispositivo mudar depois (conectar um mouse, sair do modo dispositivo do
 * devtools, encaixar um tablet no teclado), o componente continua com a
 * resposta antiga até re-renderizar por outro motivo. Assinar o evento change
 * resolve isso.
 */
export const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const handleChange = (event) => setMatches(event.matches);

    setMatches(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [query]);

  return matches;
};
