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


/* Featured projects bento interactions and deep-linked case studies */
const projectSection = document.querySelector('[data-projects]');
const projectTiles = [...document.querySelectorAll('.bento-project')];
const caseView = document.querySelector('[data-case-study]');
const caseBackButtons = [...document.querySelectorAll('[data-case-back], [data-case-back-bottom]')];
const caseNextButtons = [...document.querySelectorAll('[data-case-next], [data-case-next-bottom]')];
let activeProjectIndex = 0;
let caseReturnTarget = null;
let savedProjectScroll = 0;
let caseSectionObserver;

const caseProjects = [
  {
    key: 'underwriting',
    slug: 'aegis-underwriting',
    accent: '#f07a50',
    label: 'Aegis case study',
    title: 'Aegis Underwriting Command Center',
    role: 'Designer and Developer',
    domain: 'Property and Casualty Underwriting',
    status: 'Live',
    data: 'Synthetic',
    url: 'https://aegis-underwriting-command-center.vercel.app',
    overview: 'A multi-line underwriting platform that scores, prices, and decides risks, and connects each decision to portfolio performance.',
    challenge: 'Underwriting decisions carry the most financial weight in an insurer, yet the reasoning behind them is often scattered across spreadsheets, emails, and individual judgment. Similar risks can receive different outcomes, and the rationale is hard to retrieve later.',
    objectives: [
      'Apply consistent, line-specific risk criteria to every submission',
      'Show expected loss and pricing before a risk is bound',
      'Route borderline risks to human judgment instead of forcing a yes or no',
      'Make every decision explainable and visible at portfolio level'
    ],
    approach: [
      'Built five line-specific engines (Auto, Home, Property, Liability, Workers’ Compensation), because a single generic model misprices risk across lines',
      'Designed three outcomes (Approve, Refer, Decline) so referral is a first-class result',
      'Retained the score, class, pricing indication, and leading referral factor for every decision',
      'Placed portfolio metrics beside individual decisions so the effect of each choice on the book is visible'
    ],
    solution: 'A command-center interface combining a decision queue, risk distribution, pricing and expected-loss views, and portfolio concentration monitoring.',
    learnings: [
      'Referral reasons mattered as much as scores, because they let underwriters act on a result'
    ],
    next: 'Add pricing what-if analysis and calibration monitoring for each engine'
  },
  {
    key: 'claims',
    slug: 'aegis-claims',
    accent: '#60a5fa',
    label: 'Aegis case study',
    title: 'Aegis Claims Intelligence Center',
    role: 'Designer and Developer',
    domain: 'Claims Operations',
    status: 'Live',
    data: 'Synthetic',
    url: 'https://aegis-claims-intelligence-center-ge9zymxtq-aegis-da54.vercel.app/',
    overview: 'An operational claims workspace that monitors severity, reserve adequacy, aging pressure, fraud indicators, and leakage exposure across personal and commercial lines.',
    challenge: 'Claims leakage rarely comes from one big mistake. It is built through reserves that lag real exposure, files that age past their window, and patterns that only look suspicious in context. By the time it shows in the financials, it is costly to reverse.',
    objectives: [
      'Surface the claims that need attention while there is still time to act',
      'Combine related signals instead of showing them in isolation',
      'Give adjusters and managers a clear answer to “what should I work on next?”',
      'Explain every flag so people can judge whether to act'
    ],
    approach: [
      'Combined severity, reserve, and aging signals into one prioritized queue, since a high-severity, under-reserved, aging file should outrank any single signal',
      'Kept personal and commercial lines in one view with the ability to separate them',
      'Attached plain-language reasons to fraud indicators',
      'Designed around the daily workflow of an adjuster and a claims manager'
    ],
    solution: 'A claims workspace with a ranked queue, severity and reserve views, aging pressure monitoring, fraud indicators, and leakage exposure.',
    learnings: [
      'Prioritization depends on combining signals, not scoring them separately'
    ],
    next: 'Add anomaly explanations per claim and a role-based view for adjusters, managers, and executives'
  },
  {
    key: 'evidence',
    slug: 'aegis-evidence',
    accent: '#a78bfa',
    label: 'Aegis case study',
    title: 'Aegis Evidence Studio',
    role: 'Designer and Developer',
    domain: 'Governance, Risk, and Compliance',
    status: 'Live',
    data: 'Synthetic',
    url: 'https://aegis-evidence-studio-tppi.vercel.app',
    overview: 'An audit-ready evidence platform that connects underwriting decisions, rule versions, controls, and policy-as-code mappings across major regulatory frameworks.',
    challenge: 'Auditors and regulators ask which rules made a decision, what controls checked it, and whether it can be reproduced. In many organizations those answers are reconstructed after the fact, if at all.',
    objectives: [
      'Make every underwriting decision reproducible and attributable',
      'Generate evidence as decisions happen, not months later',
      'Measure control health continuously instead of annually',
      'Map evidence to the frameworks reviewers already use'
    ],
    approach: [
      'Designed a four-step evidence chain: Decision Captured, Rule Version Bound, Controls Evaluated, Evidence Sealed',
      'Versioned every underwriting engine so past decisions trace to the exact rules in force',
      'Tracked control assurance, exceptions, and evidence freshness as live metrics',
      'Mapped controls to NIST, ISO 27001, SOC 2, SOX, HIPAA, GDPR, and COBIT'
    ],
    solution: 'An assurance workspace with decision lineage, a control health trend, exception tracking, and an evidence record for every decision.',
    learnings: [
      'Defensibility depends on linking the decision, the rule version, and the controls in one record'
    ],
    next: 'Add exportable audit packages and exception aging'
  }
];

const caseSectionNames = [
  ['overview', 'Overview'],
  ['challenge', 'The Challenge'],
  ['objectives', 'Objectives'],
  ['approach', 'Approach'],
  ['solution', 'Solution'],
  ['learnings-next', 'Key Learnings and Next Steps']
];

function caseBulletList(items) {
  return '<ul class="case-study-list">' + items.map(item => '<li>' + item + '</li>').join('') + '</ul>';
}

function renderCaseStudy(index) {
  const item = caseProjects[index];
  if (!item || !caseView) return;
  activeProjectIndex = index;
  caseView.style.setProperty('--case-accent', item.accent);
  caseView.querySelector('[data-case-label]').textContent = item.label;
  caseView.querySelector('[data-case-title]').textContent = item.title;
  caseView.querySelectorAll('[data-case-live], [data-case-live-bottom]').forEach(link => link.href = item.url);

  caseView.querySelector('[data-case-meta]').innerHTML =
    '<div class="case-meta-chip"><span>Role</span><strong>' + item.role + '</strong></div>' +
    '<div class="case-meta-chip"><span>Domain</span><strong>' + item.domain + '</strong></div>' +
    '<div class="case-meta-chip"><span>Status</span><strong><i aria-hidden="true"></i>' + item.status + '</strong></div>' +
    '<div class="case-meta-chip"><span>Data</span><strong>' + item.data + '</strong></div>';

  caseView.querySelector('[data-case-body]').innerHTML =
    '<section class="case-content-section" id="case-overview"><p class="case-section-label">Overview</p><h3>Overview</h3><p class="case-lead">' + item.overview + '</p></section>' +
    '<section class="case-content-section" id="case-challenge"><p class="case-section-label">The Challenge</p><h3>The Challenge</h3><div class="case-challenge-callout"><p>' + item.challenge + '</p></div></section>' +
    '<section class="case-content-section" id="case-objectives"><p class="case-section-label">Objectives</p><h3>Objectives</h3>' + caseBulletList(item.objectives) + '</section>' +
    '<section class="case-content-section" id="case-approach"><p class="case-section-label">Approach</p><h3>Approach</h3>' + caseBulletList(item.approach) + '</section>' +
    '<section class="case-content-section" id="case-solution"><p class="case-section-label">Solution</p><h3>Solution</h3><p>' + item.solution + '</p></section>' +
    '<section class="case-content-section" id="case-learnings-next"><p class="case-section-label">Key Learnings and Next Steps</p><h3>Key Learnings and Next Steps</h3>' + caseBulletList(item.learnings) + '<div class="case-next-step"><span>Next</span><p>' + item.next + '</p></div></section>';

  const toc = caseView.querySelector('[data-case-toc]');
  toc.innerHTML = '<button class="case-toc-toggle" type="button" aria-expanded="false">On this page <span>+</span></button><div class="case-toc-links">' +
    caseSectionNames.map(([id, name]) => '<a href="#case-' + id + '" data-case-section="' + id + '">' + name + '</a>').join('') +
    '</div>';

  toc.querySelector('.case-toc-toggle').addEventListener('click', event => {
    const open = toc.classList.toggle('is-open');
    event.currentTarget.setAttribute('aria-expanded', String(open));
  });
  toc.querySelectorAll('a').forEach(link => link.addEventListener('click', () => toc.classList.remove('is-open')));

  if (caseSectionObserver) caseSectionObserver.disconnect();
  const sections = [...caseView.querySelectorAll('.case-content-section')];
  if (reduceMotion) {
    sections.forEach(section => section.classList.add('is-visible'));
  } else {
    caseSectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          const id = entry.target.id.replace('case-', '');
          toc.querySelectorAll('a').forEach(link => link.classList.toggle('is-active', link.dataset.caseSection === id));
        }
      });
    }, { root: caseView, rootMargin: '-18% 0px -62% 0px', threshold: 0 });
    sections.forEach(section => caseSectionObserver.observe(section));
  }
}

function showCaseStudy(index, historyMode = 'push') {
  const item = caseProjects[index];
  if (!item || !caseView) return;
  caseReturnTarget = document.activeElement;
  if (caseView.hidden) savedProjectScroll = window.scrollY;
  renderCaseStudy(index);
  caseView.hidden = false;
  document.body.classList.add('has-case-open');
  caseView.scrollTop = 0;
  if (historyMode === 'push') history.pushState({ caseStudy: item.slug }, '', '#project/' + item.slug);
  if (historyMode === 'replace') history.replaceState({ caseStudy: item.slug }, '', '#project/' + item.slug);
  caseView.querySelector('[data-case-back]').focus();
}

function hideCaseStudy() {
  if (!caseView || caseView.hidden) return;
  caseView.hidden = true;
  document.body.classList.remove('has-case-open');
  window.scrollTo(0, savedProjectScroll);
  if (caseReturnTarget instanceof HTMLElement) caseReturnTarget.focus();
}

function requestCaseClose() {
  if (location.hash.startsWith('#project/')) history.back();
  else hideCaseStudy();
}

function showNextCaseStudy() {
  const next = (activeProjectIndex + 1) % caseProjects.length;
  showCaseStudy(next, 'replace');
}

function caseIndexFromHash() {
  if (!location.hash.startsWith('#project/')) return -1;
  const slug = location.hash.slice('#project/'.length);
  return caseProjects.findIndex(item => item.slug === slug);
}

projectTiles.forEach(tile => {
  if (!reduceMotion) {
    tile.addEventListener('pointermove', event => {
      const rect = tile.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - .5;
      const y = (event.clientY - rect.top) / rect.height - .5;
      tile.style.setProperty('--ry', (x * 5).toFixed(2) + 'deg');
      tile.style.setProperty('--rx', (-y * 5).toFixed(2) + 'deg');
    });
    tile.addEventListener('pointerleave', () => {
      tile.style.removeProperty('--ry');
      tile.style.removeProperty('--rx');
    });
  }
});

document.querySelectorAll('[data-case-action]').forEach(button => {
  button.addEventListener('click', event => {
    event.stopPropagation();
    const tile = button.closest('.bento-project');
    const index = caseProjects.findIndex(item => item.key === tile?.dataset.project);
    if (index >= 0) showCaseStudy(index, 'push');
  });
});

caseBackButtons.forEach(button => button.addEventListener('click', requestCaseClose));
caseNextButtons.forEach(button => button.addEventListener('click', showNextCaseStudy));

if (projectSection && !reduceMotion) {
  projectSection.addEventListener('pointermove', event => {
    const rect = projectSection.getBoundingClientRect();
    projectSection.style.setProperty('--spot-x', ((event.clientX - rect.left) / rect.width * 100).toFixed(1) + '%');
    projectSection.style.setProperty('--spot-y', ((event.clientY - rect.top) / rect.height * 100).toFixed(1) + '%');
  });
}

caseView?.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    event.preventDefault();
    requestCaseClose();
    return;
  }
  if (event.key !== 'Tab') return;
  const focusable = [...caseView.querySelectorAll('a[href],button:not([disabled])')].filter(el => el.offsetParent !== null);
  if (!focusable.length) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
});

window.addEventListener('popstate', () => {
  const index = caseIndexFromHash();
  if (index >= 0) showCaseStudy(index, 'none');
  else hideCaseStudy();
});

const initialCaseIndex = caseIndexFromHash();
if (initialCaseIndex >= 0) {
  const slug = caseProjects[initialCaseIndex].slug;
  history.replaceState({ caseBase: true }, '', location.pathname + location.search + '#projects');
  history.pushState({ caseStudy: slug }, '', '#project/' + slug);
  showCaseStudy(initialCaseIndex, 'none');
}

/* Branded countdown before opening an Aegis dashboard */
const launchOverlay = document.querySelector('[data-project-launch]');
const launchCount = document.querySelector('[data-launch-count]');
const launchName = document.querySelector('[data-launch-name]');
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
  const projectName = caseView && !caseView.hidden
    ? caseView.querySelector('[data-case-title]')?.textContent?.trim()
    : link.closest('.bento-project')?.querySelector('h3')?.textContent?.trim() || 'Aegis dashboard';

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

document.addEventListener('click', event => {
  const link = event.target.closest('.projects-dark a[href*="aegis-"]');
  if (!link) return;
  event.preventDefault();
  event.stopPropagation();
  startProjectLaunch(link);
});
