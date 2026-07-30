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
  }, { threshold: 0.1 });
  els.forEach(el => observer.observe(el));
}

// ===== PORTFOLIO FILTER & SEARCH =====
(function () {
  const cards      = Array.from(document.querySelectorAll('.pf-card'));
  const wideCards  = new Set(document.querySelectorAll('.pf-card-wide'));
  const pills      = document.querySelectorAll('.fp');
  const searchEl   = document.getElementById('portfolioSearch');
  const clearBtn   = document.getElementById('filterClear');
  const emptyEl    = document.getElementById('pfEmpty');
  const emptyReset = document.getElementById('pfEmptyReset');

  let activeFilter = 'all';
  let searchQuery  = '';

  function applyFilters() {
    const q          = searchQuery.toLowerCase().trim();
    const isFiltered = activeFilter !== 'all' || q !== '';
    let visible      = 0;

    // Mega cards: wide when showing all, normal when filtering
    wideCards.forEach(card => {
      if (isFiltered) {
        card.classList.remove('pf-card-wide');
      } else {
        card.classList.add('pf-card-wide');
      }
    });

    cards.forEach(card => {
      const cat  = card.dataset.category || '';
      const name = (card.dataset.name || '').toLowerCase();
      const text = card.textContent.toLowerCase();

      const matchFilter = activeFilter === 'all' || cat === activeFilter;
      const matchSearch = !q || name.includes(q) || text.includes(q);

      if (matchFilter && matchSearch) {
        card.classList.remove('pf-hidden');
        card.classList.add('visible');
        visible++;
      } else {
        card.classList.add('pf-hidden');
      }
    });

    emptyEl.style.display = visible === 0 ? 'flex' : 'none';
  }

  // Pill clicks
  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeFilter = pill.dataset.filter;
      applyFilters();
    });
  });

  // Search input
  searchEl.addEventListener('input', () => {
    searchQuery = searchEl.value;
    clearBtn.classList.toggle('visible', searchQuery.length > 0);
    applyFilters();
  });

  // Clear button
  clearBtn.addEventListener('click', () => {
    searchEl.value = '';
    searchQuery = '';
    clearBtn.classList.remove('visible');
    applyFilters();
    searchEl.focus();
  });

  // "Ver todos" from empty state
  emptyReset.addEventListener('click', () => {
    searchEl.value = '';
    searchQuery = '';
    clearBtn.classList.remove('visible');
    activeFilter = 'all';
    pills.forEach(p => p.classList.remove('active'));
    document.querySelector('.fp[data-filter="all"]').classList.add('active');
    applyFilters();
  });
})();

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  initReveal();
});

// ===== WHATSAPP COLLAPSE =====
(function () {
  var el = document.getElementById('waFloat');
  if (!el) return;
  var collapsed = false;
  window.addEventListener('scroll', function () {
    if (window.scrollY > 280 && !collapsed) {
      el.classList.add('wa-collapsed'); collapsed = true;
    } else if (window.scrollY <= 280 && collapsed) {
      el.classList.remove('wa-collapsed'); collapsed = false;
    }
  }, { passive: true });
})();
