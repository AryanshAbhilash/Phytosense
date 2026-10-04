// =========================================================
// PhytoSense — Shared behaviour
// =========================================================

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initScrollReveal();
  initContactForm();
});

/* ---------- Navigation ---------- */
function initNav(){
  const nav = document.querySelector('.site-nav');
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');

  if (toggle && links){
    toggle.addEventListener('click', () => {
      const isOpen = links.classList.toggle('is-open');
      toggle.classList.toggle('is-open', isOpen);
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        links.classList.remove('is-open');
        toggle.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Sticky shadow on scroll
  if (nav){
    const onScroll = () => {
      nav.classList.toggle('is-scrolled', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive:true });
  }

  // Active link highlight based on current page
  const current = (location.pathname.split('/').pop() || 'index.html');
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === current || (current === '' && href === 'index.html')){
      a.classList.add('active');
    }
  });
}

/* ---------- Scroll reveal ---------- */
function initScrollReveal(){
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  if (!('IntersectionObserver' in window)){
    items.forEach(el => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  items.forEach(el => observer.observe(el));
}

/* ---------- Contact form ---------- */
function initContactForm(){
  const form = document.getElementById('contact-form');
  if (!form) return;

  const status = document.getElementById('form-status');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('#name').value.trim();
    const email = form.querySelector('#email').value.trim();
    const message = form.querySelector('#message').value.trim();

    if (!name || !email || !message){
      status.textContent = 'Please fill in every field before sending.';
      status.style.color = '#B4472F';
      status.classList.add('is-visible');
      return;
    }

    // Simulated send (no backend wired up yet)
    status.textContent = `Thanks, ${name.split(' ')[0]} — we've received your message and will reply at ${email} within two working days.`;
    status.style.color = '';
    status.classList.add('is-visible');
    form.reset();
  });
}