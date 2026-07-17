document.addEventListener('DOMContentLoaded', () => {
  const parallaxItems = document.querySelectorAll('.parallax-layer');
  if (!parallaxItems.length) return;

  const handleParallax = () => {
    const scrollY = window.scrollY;
    parallaxItems.forEach((item, index) => {
      const speed = 0.12 + index * 0.02;
      item.style.transform = `translate3d(0, ${scrollY * speed}px, 0)`;
    });
  };

  handleParallax();
  window.addEventListener('scroll', handleParallax, { passive: true });
});
