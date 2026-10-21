const canvas = document.querySelector('#constellation');
const context = canvas.getContext('2d');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let particles = [];
let frame;

function sizeCanvas() {
  const scale = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = window.innerWidth * scale;
  canvas.height = window.innerHeight * scale;
  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;
  context.setTransform(scale, 0, 0, scale, 0, 0);
  const count = Math.min(56, Math.max(26, Math.floor(window.innerWidth / 27)));
  particles = Array.from({ length: count }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    vx: (Math.random() - .5) * .18,
    vy: (Math.random() - .5) * .18,
    r: Math.random() * 1.6 + .35,
  }));
}

function draw() {
  context.clearRect(0, 0, window.innerWidth, window.innerHeight);
  for (const point of particles) {
    point.x += point.vx;
    point.y += point.vy;
    if (point.x < -20 || point.x > window.innerWidth + 20) point.vx *= -1;
    if (point.y < -20 || point.y > window.innerHeight + 20) point.vy *= -1;
  }
  for (let a = 0; a < particles.length; a += 1) {
    for (let b = a + 1; b < particles.length; b += 1) {
      const dx = particles[a].x - particles[b].x;
      const dy = particles[a].y - particles[b].y;
      const distance = Math.hypot(dx, dy);
      if (distance < 138) {
        context.beginPath();
        context.strokeStyle = `rgba(98, 243, 178, ${.12 * (1 - distance / 138)})`;
        context.lineWidth = .6;
        context.moveTo(particles[a].x, particles[a].y);
        context.lineTo(particles[b].x, particles[b].y);
        context.stroke();
      }
    }
  }
  particles.forEach((point) => {
    context.beginPath();
    context.fillStyle = 'rgba(151, 255, 214, .72)';
    context.arc(point.x, point.y, point.r, 0, Math.PI * 2);
    context.fill();
  });
  if (!reduceMotion) frame = requestAnimationFrame(draw);
}

sizeCanvas();
draw();
window.addEventListener('resize', () => { cancelAnimationFrame(frame); sizeCanvas(); draw(); });

document.querySelector('#year').textContent = new Date().getFullYear();
const header = document.querySelector('.site-header');
window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 18), { passive: true });

const sections = [...document.querySelectorAll('main section[id]')];
const links = [...document.querySelectorAll('.nav-link')];
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    links.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
  });
}, { rootMargin: '-45% 0px -45% 0px' });
sections.forEach((section) => observer.observe(section));
