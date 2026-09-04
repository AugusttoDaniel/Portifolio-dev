export const scrollToId = (lenis, id) => {
  const element = document.getElementById(id);
  if (!element || !lenis) return;

  const header = document.querySelector('header');
  const headerHeight = header ? header.offsetHeight : 0;

  lenis.scrollTo(element, { offset: -headerHeight });
};
