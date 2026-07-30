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

// ===== COUNTER ANIMATION =====
let countersStarted = false;

function initCounters() {
  if (countersStarted) return;
  const counters = document.querySelectorAll('.stat-number[data-target]');
  if (!counters.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target);
        const duration = 1800;
        let startTime = null;

        function step(timestamp) {
          if (!startTime) startTime = timestamp;
          const progress = Math.min((timestamp - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.floor(eased * target);
          if (progress < 1) {
            requestAnimationFrame(step);
          } else {
            el.textContent = target;
          }
        }
        requestAnimationFrame(step);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
  countersStarted = true;
}

// ===== HERO PHRASE CYCLE =====
const heroPhrases = [
  { prefix: '',  word: 'pierde'      },
  { prefix: '',      word: 'no se ve.'  },
  { prefix: '',  word: 'no destaca.'   },
  { prefix: '',  word: 'no crece'     },
  { prefix: '',      word: 'no vende' },
  { prefix: '',  word: 'no impacta.'    },
];
let heroPhraseIndex = 0;
const heroPhraseEl = document.getElementById('hero-phrase');
const heroPrefixEl = document.getElementById('hero-prefix');
const heroWordEl   = document.getElementById('hero-word');

if (heroPhraseEl) {
  setInterval(() => {
    heroPhraseEl.classList.add('word-out');
    setTimeout(() => {
      heroPhraseIndex = (heroPhraseIndex + 1) % heroPhrases.length;
      heroPrefixEl.textContent = heroPhrases[heroPhraseIndex].prefix;
      heroWordEl.textContent   = heroPhrases[heroPhraseIndex].word;
      heroPhraseEl.classList.remove('word-out');
      heroPhraseEl.classList.add('word-in');
      setTimeout(() => heroPhraseEl.classList.remove('word-in'), 450);
    }, 350);
  }, 2800);
}

// ===== HERO IMAGE SLIDER =====
const heroSlides = document.querySelectorAll('.hero-slide');
const heroDots   = document.querySelectorAll('.hero-slider-dots .dot');
let currentHeroSlide = 0;

if (heroSlides.length) {
  setInterval(() => {
    const prev = currentHeroSlide;
    currentHeroSlide = (currentHeroSlide + 1) % heroSlides.length;

    heroSlides[prev].classList.remove('active');
    heroSlides[prev].classList.add('exiting');
    setTimeout(() => heroSlides[prev].classList.remove('exiting'), 650);

    heroSlides[currentHeroSlide].classList.add('active');
    heroDots[prev].classList.remove('active');
    heroDots[currentHeroSlide].classList.add('active');
  }, 3500);
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  initReveal();
  initCounters();
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
