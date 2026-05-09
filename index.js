// ----- Navbar scroll state -----
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 30);
});

// ----- Mobile nav toggle -----
const toggle = document.getElementById('navToggle');
const links = document.getElementById('navLinks');
toggle.addEventListener('click', () => links.classList.toggle('open'));
links.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => links.classList.remove('open'))
);

// ----- Reveal-on-scroll animations -----
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// ----- Testimonial carousel -----
const track = document.getElementById('track');
const dotsWrap = document.getElementById('dots');
const slides = track.children.length;
let current = 0;

for (let i = 0; i < slides; i++) {
  const b = document.createElement('button');
  b.className = 'dot' + (i === 0 ? ' active' : '');
  b.addEventListener('click', () => go(i));
  dotsWrap.appendChild(b);
}
function go(i) {
  current = i;
  track.style.transform = `translateX(-${i * 100}%)`;
  dotsWrap.querySelectorAll('.dot').forEach((d, idx) =>
    d.classList.toggle('active', idx === i)
  );
}
setInterval(() => go((current + 1) % slides), 6000);

// ----- Contact form (demo handler) -----
document.getElementById('contactForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = e.target.querySelector('button');
  const original = btn.textContent;
  btn.textContent = 'Message Sent ✓';
  btn.disabled = true;
  e.target.reset();
  setTimeout(() => {
    btn.textContent = original;
    btn.disabled = false;
  }, 2500);
});

// ----- Hero animated network background -----
(function () {
  const canvas = document.getElementById('heroCanvas');
  const ctx = canvas.getContext('2d');
  const NODE_COUNT = 60;
  let w, h, nodes;

  function resize() {
    w = canvas.width = canvas.offsetWidth * devicePixelRatio;
    h = canvas.height = canvas.offsetHeight * devicePixelRatio;
  }
  function init() {
    resize();
    nodes = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 2 + 1
    }));
  }
  function draw() {
    ctx.clearRect(0, 0, w, h);
    // links between nearby nodes
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const d = Math.hypot(dx, dy);
        if (d < 140 * devicePixelRatio) {
          ctx.strokeStyle = `rgba(0,212,255,${(1 - d / (140 * devicePixelRatio)) * 0.25})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }
    }
    // nodes
    nodes.forEach(n => {
      n.x += n.vx; n.y += n.vy;
      if (n.x < 0 || n.x > w) n.vx *= -1;
      if (n.y < 0 || n.y > h) n.vy *= -1;
      ctx.fillStyle = 'rgba(0,212,255,0.85)';
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r * devicePixelRatio, 0, Math.PI * 2);
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  init();
  draw();
  window.addEventListener('resize', init);
})();
