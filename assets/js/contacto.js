// ===== NAVBAR SCROLL =====
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 50);
});

// ===== MOBILE MENU =====
const hamburger = document.getElementById("hamburger");
const navLinksEl = document.getElementById("nav-links");
const navOverlay = document.getElementById("nav-overlay");

function closeMenu() {
  hamburger.classList.remove("open");
  navLinksEl.classList.remove("open");
  navOverlay.classList.remove("active");
}

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("open");
  navLinksEl.classList.toggle("open");
  navOverlay.classList.toggle("active");
});
navOverlay.addEventListener("click", closeMenu);

// ===== REVEAL ON SCROLL =====
function initReveal() {
  const els = document.querySelectorAll(".reveal:not(.visible)");
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

// ===== CONTACT FORM =====
(function () {
  const form = document.getElementById("contactForm");
  if (!form) return;

  const submitBtn = document.getElementById("cf-submit");
  const btnText = submitBtn.querySelector(".cf-btn-text");
  const btnLoading = submitBtn.querySelector(".cf-btn-loading");
  const feedback = document.getElementById("cf-feedback");

  function showFeedback(ok, msg) {
    feedback.className = "cf-feedback " + (ok ? "cf-success" : "cf-error");
    feedback.innerHTML =
      (ok
        ? '<i class="fas fa-circle-check"></i> '
        : '<i class="fas fa-circle-xmark"></i> ') + msg;
    feedback.style.display = "flex";
    feedback.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function validateForm() {
    const required = form.querySelectorAll("[required]");
    for (const field of required) {
      if (!field.value.trim()) {
        showFeedback(false, "Por favor completa todos los campos requeridos.");
        field.focus();
        return false;
      }
    }
    const emailField = form.querySelector('[type="email"]');
    if (
      emailField &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value.trim())
    ) {
      showFeedback(false, "Ingresa un correo electrónico válido.");
      emailField.focus();
      return false;
    }
    return true;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    feedback.style.display = "none";

    if (!validateForm()) return;

    btnText.style.display = "none";
    btnLoading.style.display = "inline-flex";
    submitBtn.disabled = true;

    try {
      const res = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { "X-Requested-With": "XMLHttpRequest" },
      });
      const data = await res.json();

      if (data.ok) {
        window.location.href = "https://sitelege.com/gracias/";
        return;
      } else {
        showFeedback(
          false,
          data.message ||
            "Ocurrió un error. Intenta de nuevo o escríbenos por WhatsApp.",
        );
      }
    } catch {
      showFeedback(
        false,
        "No se pudo enviar. Escríbenos directamente por WhatsApp.",
      );
    } finally {
      btnText.style.display = "inline-flex";
      btnLoading.style.display = "none";
      submitBtn.disabled = false;
    }
  });
})();

// ===== INIT =====
document.addEventListener("DOMContentLoaded", () => {
  initReveal();
});

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

// EMAILJS
document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contactForm");

  if (!contactForm) return;

  const submitBtn = document.getElementById("cf-submit");
  const btnText = submitBtn.querySelector(".cf-btn-text");
  const btnLoading = submitBtn.querySelector(".cf-btn-loading");
  const feedback = document.getElementById("cf-feedback");

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // 1. Mostrar estado de carga (muy pro)
    btnText.style.display = "none";
    btnLoading.style.display = "inline-block";
    submitBtn.disabled = true;
    feedback.style.display = "none";

    // 2. Recoger los datos de tus inputs
    const templateParams = {
      from_name: document.getElementById("cf-name").value,
      phone: document.getElementById("cf-phone").value,
      email: document.getElementById("cf-email").value,
      service: document.getElementById("cf-service").value,
      message: document.getElementById("cf-message").value,
    };

    // 3. Enviar a través de EmailJS
    emailjs.send("service_5vp127o", "template_rklgjnr", templateParams).then(
      function () {
        // ÉXITO
        btnLoading.style.display = "none";
        btnText.style.display = "inline-block";
        submitBtn.disabled = false;

        feedback.style.display = "block";
        feedback.style.background = "#d4edda";
        feedback.style.color = "#155724";
        feedback.style.padding = "12px";
        feedback.style.borderRadius = "8px";
        feedback.style.marginTop = "15px";
        feedback.innerHTML =
          '<i class="fas fa-check-circle"></i> ¡Mensaje enviado con éxito! Te contactaré en menos de 24 horas.';

        contactForm.reset();

        setTimeout(() => {
          feedback.style.display = "none";
        }, 6000);
      },
      function (error) {
        // ERROR
        btnLoading.style.display = "none";
        btnText.style.display = "inline-block";
        submitBtn.disabled = false;

        feedback.style.display = "block";
        feedback.style.background = "#f8d7da";
        feedback.style.color = "#721c24";
        feedback.style.padding = "12px";
        feedback.style.borderRadius = "8px";
        feedback.style.marginTop = "15px";
        feedback.innerHTML =
          '<i class="fas fa-exclamation-circle"></i> Hubo un error. Escríbeme mejor directo por WhatsApp.';
      },
    );
  });
});
