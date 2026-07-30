// ===== NAVBAR SCROLL =====
const navbar = document.getElementById("navbar");
if (navbar) {
  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 50);
  });
}

// ===== MOBILE MENU =====
const hamburger = document.getElementById("hamburger");
const navLinksEl = document.getElementById("nav-links");
const navOverlay = document.getElementById("nav-overlay");

function closeMenu() {
  if (hamburger) hamburger.classList.remove("open");
  if (navLinksEl) navLinksEl.classList.remove("open");
  if (navOverlay) navOverlay.classList.remove("active");
}

if (hamburger) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("open");
    if (navLinksEl) navLinksEl.classList.toggle("open");
    if (navOverlay) navOverlay.classList.toggle("active");
  });
}
if (navOverlay) navOverlay.addEventListener("click", closeMenu);

// ===== REVEAL ON SCROLL =====
function initReveal() {
  const els = document.querySelectorAll(".reveal:not(.visible)");
  if (els.length === 0) return;
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );
  els.forEach((el) => observer.observe(el));
}

// ===== WHATSAPP FLOAT =====
(function () {
  var el = document.getElementById("waFloat");
  if (!el) return;
  var collapsed = false;
  window.addEventListener(
    "scroll",
    function () {
      if (window.scrollY > 280 && !collapsed) {
        el.classList.add("wa-collapsed");
        collapsed = true;
      } else if (window.scrollY <= 280 && collapsed) {
        el.classList.remove("wa-collapsed");
        collapsed = false;
      }
    },
    { passive: true },
  );
})();

// ===== EMAILJS CONTACT FORM =====
document.addEventListener("DOMContentLoaded", function () {
  initReveal();

  if (typeof emailjs !== "undefined") {
    emailjs.init("QGyx5vVQEfGfYPIZh");
  }

  const contactForm = document.getElementById("contactForm");
  if (!contactForm) return;

  const submitBtn = document.getElementById("cf-submit");
  if (!submitBtn) return;

  const btnText = submitBtn.querySelector(".cf-btn-text");
  const btnLoading = submitBtn.querySelector(".cf-btn-loading");
  const feedback = document.getElementById("cf-feedback");

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    if (feedback) feedback.style.display = "none";

    const required = contactForm.querySelectorAll("[required]");
    for (const field of required) {
      if (!field.value.trim()) {
        if (feedback) {
          feedback.className = "cf-feedback cf-error";
          feedback.innerHTML =
            '<i class="fas fa-circle-xmark"></i> Por favor completa todos los campos requeridos.';
          feedback.style.display = "flex";
          feedback.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
        field.focus();
        return;
      }
    }

    if (btnText) btnText.style.display = "none";
    if (btnLoading) btnLoading.style.display = "inline-flex";
    submitBtn.disabled = true;

    const templateParams = {
      from_name: document.getElementById("cf-name")?.value || "",
      phone: document.getElementById("cf-phone")?.value || "",
      email: document.getElementById("cf-email")?.value || "",
      service: document.getElementById("cf-service")?.value || "",
      message: document.getElementById("cf-message")?.value || "",
    };

    emailjs
      .send("service_5vp127o", "template_rklgjnr", templateParams)
      .then(function () {
        if (btnLoading) btnLoading.style.display = "none";
        if (btnText) btnText.style.display = "inline-flex";
        submitBtn.disabled = false;

        if (feedback) {
          feedback.className = "cf-feedback cf-success";
          feedback.innerHTML =
            '<i class="fas fa-circle-check"></i> ¡Mensaje enviado con éxito! Te contactaré en menos de 24 horas.';
          feedback.style.display = "flex";
          feedback.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }

        contactForm.reset();

        setTimeout(() => {
          if (feedback) feedback.style.display = "none";
        }, 6000);
      })
      .catch(function (error) {
        if (btnLoading) btnLoading.style.display = "none";
        if (btnText) btnText.style.display = "inline-flex";
        submitBtn.disabled = false;

        if (feedback) {
          feedback.className = "cf-feedback cf-error";
          feedback.innerHTML =
            '<i class="fas fa-circle-xmark"></i> Hubo un error al enviar. Escríbenos por WhatsApp.';
          feedback.style.display = "flex";
          feedback.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
      });
  });
});
