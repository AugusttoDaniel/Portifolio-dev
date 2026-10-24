// Junta itens com " · " colando o ponto ao item anterior (espaço não separável antes dele),
// para que uma quebra de linha nunca comece com "·".
export const joinWithDots = (items) => items.join(' · ');
