/* ============================================
   ANUÁRIO JH 2026 — Script
   ============================================ */

// ⚠️ COLE AQUI A URL DO SEU GOOGLE APPS SCRIPT
// (instruções no README.md)
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyrJ0xd-2eZy1keuEP_dfEDP8m33n27hA5bNU1KW9kkh90Yoq-yYTnZeodFMP3AfUuE0g/exec';


// ============================================
// Topbar shadow on scroll
// ============================================
const topbar = document.querySelector('.topbar');
const handleScroll = () => {
  if (window.scrollY > 40) topbar.classList.add('is-scrolled');
  else topbar.classList.remove('is-scrolled');
};
window.addEventListener('scroll', handleScroll, { passive: true });
handleScroll();


// ============================================
// Mobile menu toggle
// ============================================
const navToggle = document.getElementById('nav-toggle');
const topnav    = document.getElementById('topnav');

if (navToggle && topnav) {
  navToggle.addEventListener('click', () => {
    const isOpen = topnav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Fechar ao clicar em qualquer link do menu
  topnav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      topnav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
}


// ============================================
// Footer year
// ============================================
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();


// ============================================
// Form submission → Google Apps Script
// ============================================
const form       = document.getElementById('lead-form');
const submitBtn  = document.getElementById('submit-btn');
const feedback   = document.getElementById('form-feedback');

const showFeedback = (message, type) => {
  feedback.textContent = message;
  feedback.classList.remove('is-success', 'is-error');
  feedback.classList.add('is-visible', `is-${type}`);
};

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nome    = form.nome.value.trim();
    const email   = form.email.value.trim();
    const empresa = form.empresa.value.trim();
    const consent = form.consent.checked;

    // Validation
    if (!nome) {
      showFeedback('Por favor, preencha seu nome.', 'error');
      form.nome.focus();
      return;
    }

    if (!isValidEmail(email)) {
      showFeedback('Informe um e-mail válido.', 'error');
      form.email.focus();
      return;
    }

    if (!consent) {
      showFeedback('Você precisa aceitar os termos para continuar.', 'error');
      return;
    }

    if (APPS_SCRIPT_URL === 'COLE_AQUI_A_URL_DO_SEU_APPS_SCRIPT') {
      showFeedback('⚙ Configure a URL do Apps Script em script.js', 'error');
      console.warn('Configure APPS_SCRIPT_URL em script.js (veja o README.md)');
      return;
    }

    // Loading state
    submitBtn.classList.add('is-loading');
    submitBtn.disabled = true;
    showFeedback('Enviando...', 'success');

    try {
      const payload = new FormData();
      payload.append('nome',    nome);
      payload.append('email',   email);
      payload.append('empresa', empresa);
      payload.append('origem',  'Site Anuário JH 2026');
      payload.append('data',    new Date().toISOString());

      // Google Apps Script aceita FormData via POST
      // mode: 'no-cors' por simplicidade — Apps Script ainda recebe e processa
      await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        body: payload,
      });

      showFeedback('✓ Tudo certo! Em instantes você receberá o anuário no seu e-mail.', 'success');
      form.reset();

    } catch (err) {
      console.error('Erro ao enviar formulário:', err);
      showFeedback('Algo deu errado. Tente novamente em instantes.', 'error');
    } finally {
      submitBtn.classList.remove('is-loading');
      submitBtn.disabled = false;
    }
  });
}
