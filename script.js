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
    bar.style.width = '0%';
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        bar.style.width = target;
      });
    });
  });
}

window.addEventListener('load', () => {
  const activeRtab = document.querySelector('.rtab-content.active');
  if (activeRtab) animateBars(activeRtab);
});

// ===== INTERSECTION OBSERVER – animate bars when section enters viewport =====
const resultsSection = document.getElementById('ergebnisse');
if (resultsSection) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const activeTab = document.querySelector('.rtab-content.active');
        if (activeTab) animateBars(activeTab);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  observer.observe(resultsSection);
}

// ===== SCROLL FADE-IN =====
const fadeEls = document.querySelectorAll('.card, .method-card, .disc-card, .study-card, .takeaway');

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

