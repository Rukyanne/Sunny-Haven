document.addEventListener('DOMContentLoaded', () => {
  const slides = Array.from(document.querySelectorAll('[data-slider] .slider-slide'));
  const dots = Array.from(document.querySelectorAll('[data-slider-dots] button'));
  let activeIndex = 0;

  const updateSlider = () => {
    slides.forEach((slide, index) => {
      slide.classList.toggle('active', index === activeIndex);
    });
    dots.forEach((dot, index) => dot.classList.toggle('active', index === activeIndex));
  };

  if (slides.length) {
    setInterval(() => {
      activeIndex = (activeIndex + 1) % slides.length;
      updateSlider();
    }, 5000);

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        activeIndex = index;
        updateSlider();
      });
    });

    updateSlider();
  }
});
