document.addEventListener('DOMContentLoaded', () => {
  const progressBar = document.querySelector('.progress-bar');
  const backToTop = document.querySelector('.back-to-top');
  const accordionItems = document.querySelectorAll('.accordion-item');
  const compareButtons = document.querySelectorAll('.compare-item button');
  const galleryImages = document.querySelectorAll('.gallery-thumbs img');
  const lightbox = document.querySelector('.modal');

  accordionItems.forEach((item) => {
    const button = item.querySelector('.accordion-header');
    if (!button) return;
    button.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      accordionItems.forEach((entry) => entry.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  compareButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const current = button.textContent;
      button.textContent = current === 'Compare' ? 'Added' : 'Compare';
      button.classList.toggle('btn-primary', current === 'Compare');
      button.classList.toggle('btn-secondary', current !== 'Compare');
    });
  });

  galleryImages.forEach((image) => {
    image.addEventListener('click', () => {
      const src = image.getAttribute('src');
      if (!src || !lightbox) return;
      const modalImage = lightbox.querySelector('img');
      if (modalImage) {
        modalImage.setAttribute('src', src);
      }
      lightbox.classList.add('show');
    });
  });

  lightbox?.querySelector('.close-modal')?.addEventListener('click', () => lightbox.classList.remove('show'));

  if (progressBar) {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const progress = height > 0 ? (scrollTop / height) * 100 : 0;
      progressBar.style.width = `${Math.min(progress, 100)}%`;
      backToTop?.classList.toggle('visible', scrollTop > 700);
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
  }

  document.querySelectorAll('[data-scroll]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const targetId = anchor.getAttribute('href')?.replace('#', '');
      if (!targetId) return;
      const target = document.getElementById(targetId);
      if (target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  const revealItems = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.16 });

  revealItems.forEach((item) => observer.observe(item));

  const cookieBanner = document.querySelector('.cookie-banner');
  if (cookieBanner) {
    const accepted = localStorage.getItem('luxury-cookie-consent');
    if (!accepted) {
      cookieBanner.classList.add('show');
    }
    cookieBanner.querySelectorAll('button').forEach((button) => {
      button.addEventListener('click', () => {
        localStorage.setItem('luxury-cookie-consent', 'true');
        cookieBanner.classList.remove('show');
      });
    });
  }

  const popup = document.querySelector('.newsletter-popup');
  if (popup) {
    setTimeout(() => popup.classList.add('show'), 2200);
    popup.querySelector('.close-popup')?.addEventListener('click', () => popup.classList.remove('show'));
  }
});
