// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== MOBILE MENU =====
const hamburger = document.getElementById('hamburger');
const navLinksEl = document.getElementById('nav-links');
const navOverlay = document.getElementById('nav-overlay');

function closeMenu() {
  hamburger.classList.remove('open');
  navLinksEl.classList.remove('open');
  navOverlay.classList.remove('active');
}

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinksEl.classList.toggle('open');
  navOverlay.classList.toggle('active');
});
navOverlay.addEventListener('click', closeMenu);

// ===== REVEAL ON SCROLL =====
function initReveal() {
  const els = document.querySelectorAll('.reveal:not(.visible)');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  els.forEach(el => observer.observe(el));
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  initReveal();
});

(function(){
  var el = document.getElementById('waFloat');
  if (!el) return;
  var collapsed = false;
  window.addEventListener('scroll', function(){
    if (window.scrollY > 280 && !collapsed) {
      el.classList.add('wa-collapsed'); collapsed = true;
    } else if (window.scrollY <= 280 && collapsed) {
      el.classList.remove('wa-collapsed'); collapsed = false;
    }
  }, { passive: true });
})();
