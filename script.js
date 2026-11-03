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


/* Featured projects bento interactions */
const projectSection = document.querySelector('[data-projects]');
const projectTiles = [...document.querySelectorAll('.bento-project')];
const roleButtons = [...document.querySelectorAll('[data-claim-role]')];
const caseView = document.querySelector('[data-case-study]');
const caseBack = document.querySelector('[data-case-back]');
const caseNext = document.querySelector('[data-case-next]');
let activeProjectIndex = 0;
let caseReturnTarget = null;

const caseProjects = [
  {key:'underwriting',label:'01 · Insurance analytics',title:'Aegis Underwriting Command Center',description:'A multi-line P&C platform that automates risk scoring, pricing and expected-loss analysis while connecting underwriting decisions to portfolio performance.',url:'https://aegis-underwriting-command-center.vercel.app',image:'/underwriting-preview.png',alt:'Synthetic Aegis underwriting dashboard showing line-of-business filters and disposition analysis.'},
  {key:'claims',label:'02 · Claims operations',title:'Aegis Claims Intelligence Center',description:'An operational claims workspace for monitoring severity, reserve adequacy, aging pressure, fraud indicators and leakage exposure across personal and commercial lines.',url:'https://aegis-claims-intelligence-center-ge9zymxtq-aegis-da54.vercel.app/',image:'/claims-preview.png',alt:'Synthetic Aegis claims intelligence dashboard showing the operational claims queue.'},
  {key:'evidence',label:'03 · Governance & compliance',title:'Aegis Evidence Studio',description:'An audit-ready evidence platform connecting underwriting decisions, rule versions, cloud controls and policy-as-code mappings across major regulatory frameworks.',url:'https://aegis-evidence-studio-tppi.vercel.app',image:'/aegis-evidence-cover.png',alt:'Synthetic Aegis Evidence Studio interface supporting the four-step evidence chain.'}
];

function renderCaseStudy(index) {
  const item = caseProjects[index];
  activeProjectIndex = index;
  caseView.querySelector('[data-case-label]').textContent = item.label + ' · Synthetic data';
  caseView.querySelector('[data-case-title]').textContent = item.title;
  caseView.querySelector('[data-case-description]').textContent = item.description;
  caseView.querySelector('[data-case-live]').href = item.url;
  const stage = caseView.querySelector('[data-case-stage]');
  stage.dataset.caseProject = item.key;
  if (item.key === 'evidence') {
    stage.innerHTML = '<div class="monitoring"><i aria-hidden="true"></i> Monitoring Active</div><ol class="evidence-chain" aria-label="Evidence lifecycle"><li><span>1</span>Decision Captured</li><li><span>2</span>Rule Version Bound</li><li><span>3</span>Controls Evaluated</li><li><span>4</span>Evidence Sealed</li></ol><div class="frameworks"><span>NIST</span><span>SOC 2</span><span>ISO 27001</span></div>';
  } else {
    stage.innerHTML = '<img src="' + item.image + '" alt="' + item.alt + '">';
  }
}

function openCaseStudy(tile) {
  const index = caseProjects.findIndex(item => item.key === tile.dataset.project);
  if (index < 0) return;
  caseReturnTarget = tile;
  renderCaseStudy(index);
  caseView.hidden = false;
  document.body.classList.add('has-case-open');
  caseBack.focus();
}

function closeCaseStudy() {
  caseView.hidden = true;
  document.body.classList.remove('has-case-open');
  if (caseReturnTarget) caseReturnTarget.focus();
}

projectTiles.forEach(tile => {
  tile.addEventListener('click', event => {
    if (event.target.closest('a,button')) return;
    openCaseStudy(tile);
  });
  tile.addEventListener('keydown', event => {
    if ((event.key === 'Enter' || event.key === ' ') && !event.target.closest('a,button')) {
      event.preventDefault();
      openCaseStudy(tile);
    }
  });
  if (!reduceMotion) {
    tile.addEventListener('pointermove', event => {
      const rect = tile.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - .5;
      const y = (event.clientY - rect.top) / rect.height - .5;
      tile.style.setProperty('--ry', (x * 5).toFixed(2) + 'deg');
      tile.style.setProperty('--rx', (-y * 5).toFixed(2) + 'deg');
      tile.querySelectorAll('[data-depth]').forEach(chip => {
        const depth = Number(chip.dataset.depth || 1);
        chip.style.setProperty('--chip-x', (x * 12 * depth).toFixed(1) + 'px');
        chip.style.setProperty('--chip-y', (y * 12 * depth).toFixed(1) + 'px');
      });
    });
    tile.addEventListener('pointerleave', () => {
      tile.style.removeProperty('--ry'); tile.style.removeProperty('--rx');
      tile.querySelectorAll('[data-depth]').forEach(chip => { chip.style.removeProperty('--chip-x'); chip.style.removeProperty('--chip-y'); });
    });
  }
});

if (projectSection && !reduceMotion) {
  projectSection.addEventListener('pointermove', event => {
    const rect = projectSection.getBoundingClientRect();
    projectSection.style.setProperty('--spot-x', ((event.clientX - rect.left) / rect.width * 100).toFixed(1) + '%');
    projectSection.style.setProperty('--spot-y', ((event.clientY - rect.top) / rect.height * 100).toFixed(1) + '%');
  });
}

roleButtons.forEach(button => button.addEventListener('click', event => {
  event.stopPropagation();
  const role = button.dataset.claimRole;
  roleButtons.forEach(item => {
    const selected = item === button;
    item.classList.toggle('is-active', selected);
    item.setAttribute('aria-pressed', String(selected));
  });
  document.querySelectorAll('[data-role-view]').forEach(view => { view.hidden = view.dataset.roleView !== role; });
}));

caseBack?.addEventListener('click', closeCaseStudy);
caseNext?.addEventListener('click', () => renderCaseStudy((activeProjectIndex + 1) % caseProjects.length));
caseView?.addEventListener('click', event => { if (event.target === caseView) closeCaseStudy(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape' && caseView && !caseView.hidden) closeCaseStudy(); });


document.querySelectorAll('[data-case-action]').forEach(button => {
  button.addEventListener('click', event => {
    event.stopPropagation();
    const tile = button.closest('.bento-project');
    if (tile) openCaseStudy(tile);
  });
});


/* Branded countdown before opening an Aegis dashboard */
const launchOverlay = document.querySelector('[data-project-launch]');
const launchCount = document.querySelector('[data-launch-count]');
const launchName = document.querySelector('[data-launch-name]');
const launchLinks = [...document.querySelectorAll('.projects-dark a[href*="aegis-"]')];
let launchTimer;

function replayCountAnimation() {
  if (reduceMotion || !launchCount) return;
  launchCount.style.animation = 'none';
  void launchCount.offsetWidth;
  launchCount.style.animation = '';
}

function startProjectLaunch(link) {
  if (!launchOverlay || !launchCount) return;
  const destination = link.href;
  const projectCard = link.closest('.bento-project');
  const projectName = projectCard?.querySelector('h3')?.textContent?.trim()
    || document.querySelector('[data-case-title]')?.textContent?.trim()
    || 'Aegis dashboard';

  clearInterval(launchTimer);
  launchName.textContent = projectName;
  launchCount.textContent = '3';
  launchOverlay.hidden = false;
  document.body.classList.add('is-launching');
  replayCountAnimation();

  let value = 3;
  launchTimer = window.setInterval(() => {
    value -= 1;
    if (value > 0) {
      launchCount.textContent = String(value);
      replayCountAnimation();
      return;
    }
    window.clearInterval(launchTimer);
    window.location.assign(destination);
  }, 1000);
}

launchLinks.forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
    event.stopPropagation();
    startProjectLaunch(link);
  });
});
