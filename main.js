/* Elegancia — interactions */

// Preloader
window.addEventListener('load', () => {
  const p = document.getElementById('preloader');
  if (p) setTimeout(() => p.classList.add('hidden'), 500);
});

// Header scroll
const header = document.getElementById('siteHeader');
const toTop = document.getElementById('toTop');
const onScroll = () => {
  if (window.scrollY > 60) header.classList.add('scrolled');
  else header.classList.remove('scrolled');
  if (window.scrollY > 500) toTop.classList.add('show');
  else toTop.classList.remove('show');
  updateActiveNav();
};
window.addEventListener('scroll', onScroll, { passive: true });

// Mobile nav
const navToggle = document.getElementById('navToggle');
const navMain = document.getElementById('navMain');
navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('open');
  navMain.classList.toggle('open');
});
navMain.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navToggle.classList.remove('open');
    navMain.classList.remove('open');
  });
});

// Active nav highlight
const sections = Array.from(document.querySelectorAll('section[id]'));
const navLinks = Array.from(document.querySelectorAll('.nav-main a'));
function updateActiveNav() {
  const y = window.scrollY + 120;
  let current = sections[0]?.id;
  for (const s of sections) {
    if (s.offsetTop <= y) current = s.id;
  }
  navLinks.forEach(l => {
    l.classList.toggle('active', l.getAttribute('href') === '#' + current);
  });
}

// Menu tabs
const tabs = document.querySelectorAll('#menuTabs .tab');
const panes = document.querySelectorAll('#menuGrid .menu-pane');
tabs.forEach(t => {
  t.addEventListener('click', () => {
    tabs.forEach(x => x.classList.remove('active'));
    panes.forEach(p => p.classList.remove('active'));
    t.classList.add('active');
    const target = t.dataset.tab;
    document.querySelector(`.menu-pane[data-pane="${target}"]`)?.classList.add('active');
  });
});

// Reservation (demo submit)
function submitReservation(e) {
  e.preventDefault();
  const form = e.target;
  const note = document.getElementById('formNote');
  const data = new FormData(form);
  const name = data.get('name');
  note.textContent = `Thank you, ${name}. We will confirm your reservation shortly.`;
  form.reset();
  setTimeout(() => { note.textContent = ''; }, 8000);
  return false;
}
window.submitReservation = submitReservation;

// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach(en => {
    if (en.isIntersecting) {
      en.target.style.opacity = '1';
      en.target.style.transform = 'none';
      io.unobserve(en.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.section-head, .col-text, .col-img, .menu-item, .review-card, .feature, .gal-item')
  .forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity .7s ease, transform .7s ease';
    io.observe(el);
  });
