const root=document.documentElement;
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const saved=localStorage.getItem('ryan-theme');
const preferred=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';
root.dataset.theme=saved||preferred;

const themeButton=document.querySelector('[data-theme-toggle]');
function syncTheme(){
  const dark=root.dataset.theme==='dark';
  themeButton?.setAttribute('aria-pressed',String(dark));
  themeButton?.setAttribute('aria-label',dark?'Switch to light mode':'Switch to dark mode');
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content',dark?'#0d1627':'#f6f4ef');
}
syncTheme();
themeButton?.addEventListener('click',()=>{root.dataset.theme=root.dataset.theme==='dark'?'light':'dark';localStorage.setItem('ryan-theme',root.dataset.theme);syncTheme()});

document.querySelector('[data-headshot]')?.addEventListener('error',e=>{e.currentTarget.hidden=true});

const reveals=[...document.querySelectorAll('.reveal')];
if(reduce){reveals.forEach(el=>el.classList.add('in-view'))}else{
  const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(entry.isIntersecting){
      const siblings=[...entry.target.parentElement.children].filter(el=>el.classList.contains('reveal'));
      entry.target.style.transitionDelay=`${Math.min(siblings.indexOf(entry.target),5)*70}ms`;
      entry.target.classList.add('in-view');revealObserver.unobserve(entry.target)
    }
  }),{threshold:.12,rootMargin:'0px 0px -40px'});
  reveals.forEach(el=>revealObserver.observe(el));
}

const counters=[...document.querySelectorAll('[data-count]')];
const countObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(!entry.isIntersecting)return;
  const el=entry.target,target=Number(el.dataset.count),suffix=el.dataset.suffix||'';
  if(reduce){el.textContent=target+suffix}else{
    const start=performance.now(),duration=1050;
    const tick=now=>{const p=Math.min((now-start)/duration,1);el.textContent=Math.round(target*(1-Math.pow(1-p,3)))+suffix;if(p<1)requestAnimationFrame(tick)};
    requestAnimationFrame(tick)
  }
  countObserver.unobserve(el)
}),{threshold:.65});
counters.forEach(el=>countObserver.observe(el));

const header=document.querySelector('[data-header]');
const progress=document.querySelector('[data-progress]');
const backTop=document.querySelector('[data-back-top]');
const sections=[...document.querySelectorAll('[data-section]')];
const navLinks=[...document.querySelectorAll('.nav-shell nav a')];
function onScroll(){
  const y=scrollY,max=document.documentElement.scrollHeight-innerHeight;
  header?.classList.toggle('scrolled',y>24);
  backTop?.classList.toggle('visible',y>650);
  if(progress)progress.style.width=`${max>0?(y/max)*100:0}%`;
  let current='home';sections.forEach(section=>{if(section.getBoundingClientRect().top<=innerHeight*.38)current=section.id});
  navLinks.forEach(link=>link.classList.toggle('active',link.getAttribute('href')===`#${current}`));
}
addEventListener('scroll',onScroll,{passive:true});onScroll();

document.querySelectorAll('video').forEach(video=>{
  video.addEventListener('error',()=>video.classList.add('video-unavailable'));
  const mediaObserver=new IntersectionObserver(entries=>entries.forEach(({isIntersecting,target})=>{
    if(isIntersecting&&!reduce)target.play().catch(()=>{});else target.pause()
  }),{threshold:.35});
  mediaObserver.observe(video)
});

if(!reduce&&matchMedia('(pointer:fine)').matches){
  const cursor=document.querySelector('.cursor');
  addEventListener('pointermove',e=>{cursor.style.transform=`translate(${e.clientX}px,${e.clientY}px) translate(-50%,-50%)`});
  document.querySelectorAll('a,button').forEach(el=>{el.addEventListener('pointerenter',()=>cursor.classList.add('active'));el.addEventListener('pointerleave',()=>cursor.classList.remove('active'))});
  document.querySelectorAll('.magnetic').forEach(el=>{
    el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect();el.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.08}px,${(e.clientY-r.top-r.height/2)*.08}px)`});
    el.addEventListener('pointerleave',()=>el.style.transform='')
  })
}

document.body.classList.add('is-loading');
addEventListener('load',()=>requestAnimationFrame(()=>document.body.classList.remove('is-loading')),{once:true});
