// ===== ACTIVE NAV LINK =====
const path = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-link').forEach(link => {
  if (link.getAttribute('href') === path) link.classList.add('nav-active');
});

// ===== MOBILE NAV TOGGLE =====
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('nav-open');
  });
  // Close nav when clicking a link on mobile
  navMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('nav-open');
    });
  });
}

// ===== TAB SYSTEM (Grundlagen) =====
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    tabBtns.forEach(b => b.classList.remove('active'));
    tabContents.forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    const target = document.getElementById('tab-' + btn.dataset.tab);
    if (target) target.classList.add('active');
  });
});

// ===== RESULTS TAB SYSTEM =====
const rtabBtns = document.querySelectorAll('.rtab-btn');
const rtabContents = document.querySelectorAll('.rtab-content');

rtabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    rtabBtns.forEach(b => b.classList.remove('active'));
    rtabContents.forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    const target = document.getElementById('rtab-' + btn.dataset.rtab);
    if (target) {
      target.classList.add('active');
      animateBars(target);
    }
  });
});

// ===== BAR ANIMATION =====
function animateBars(container) {
  const bars = container.querySelectorAll('.bar-fill');
  bars.forEach(bar => {
    const target = bar.style.width;
    bar.style.transition = 'none';
    bar.style.width = '0%';
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        bar.style.transition = '';
        bar.style.width = target;
      });
    });
  });
}

window.addEventListener('load', () => {
  const activeRtab = document.querySelector('.rtab-content.active');
  if (activeRtab) animateBars(activeRtab);
});

// ===== SCROLL FADE-IN =====
const fadeEls = document.querySelectorAll('.card, .chapter-card, .glossar-card, .method-card, .disc-card, .study-card, .takeaway, .source-card, .def-card');

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = entry.target.style.transform.replace('translateY(20px)', 'translateY(0)');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

fadeEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = (el.style.transform || '') + ' translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease, box-shadow 0.25s ease';
  fadeObserver.observe(el);
});

// ===== PROGRESS BAR =====
const progressBar = document.getElementById('progressBar');
if (progressBar) {
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = progress + '%';
  });
}

// ===== BACK TO TOP =====
const backToTop = document.getElementById('backToTop');
if (backToTop) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

