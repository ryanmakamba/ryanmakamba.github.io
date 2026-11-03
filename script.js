const root = document.documentElement;
const toggle = document.querySelector('[data-theme-toggle]');
const savedTheme = localStorage.getItem('theme');
const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

function setTheme(theme) {
  root.dataset.theme = theme;
  const dark = theme === 'dark';
  toggle.setAttribute('aria-pressed', String(dark));
  toggle.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
  document.querySelector('meta[name="theme-color"]').setAttribute('content', dark ? '#0d1728' : '#f4f1ea');
}

setTheme(savedTheme || (systemDark ? 'dark' : 'light'));
toggle.addEventListener('click', () => {
  const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('theme', next);
  setTheme(next);
});

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const header = document.querySelector('[data-header]');
const navLinks = [...document.querySelectorAll('nav a')];
const sections = [...document.querySelectorAll('[data-section]')];

function updateHeader() {
  header.classList.toggle('is-compact', window.scrollY > 48);
  let active = 'home';
  for (const section of sections) {
    if (section.getBoundingClientRect().top <= 150) active = section.id;
  }
  navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${active}`));
}

window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

const revealItems = [...document.querySelectorAll('.reveal')];
if (reduceMotion) {
  revealItems.forEach(item => item.classList.add('is-visible'));
} else {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.13 });
  revealItems.forEach(item => revealObserver.observe(item));
}

const counters = [...document.querySelectorAll('[data-count]')];
function countUp(el) {
  const end = Number(el.dataset.count);
  const suffix = el.dataset.suffix || '';
  if (reduceMotion) { el.textContent = `${end}${suffix}`; return; }
  const start = performance.now();
  const duration = 950;
  function frame(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = `${Math.round(end * eased)}${suffix}`;
    if (progress < 1) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

const countObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      countUp(entry.target);
      countObserver.unobserve(entry.target);
    }
  });
}, { threshold: .65 });
counters.forEach(counter => countObserver.observe(counter));

const track = document.querySelector('.marquee-track');
if (track && !reduceMotion) track.innerHTML += track.innerHTML;
