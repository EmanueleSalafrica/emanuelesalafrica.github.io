document.documentElement.classList.add('js');

// Zwei vollständige Wiederholungen pro Bahn sorgen dafür, dass das Ende nie leer wird.
document.querySelectorAll('.ticker-track').forEach((track) => {
  track.insertAdjacentHTML('beforeend', track.innerHTML);
});

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

const techReadout = document.querySelector('.stack-readout');
const techNodes = [...document.querySelectorAll('.stack-card')];
const energyPulse = document.querySelector('.energy-pulse');
let energyFrame;
let pulseHideTimer;

function runEnergyPulse(wireId) {
  const wire = document.querySelector(`#${wireId}`);
  if (!wire || !energyPulse) return;

  cancelAnimationFrame(energyFrame);
  clearTimeout(pulseHideTimer);
  document.querySelectorAll('.wire-base path.is-energized').forEach((path) => path.classList.remove('is-energized'));
  wire.classList.add('is-energized');

  const length = wire.getTotalLength();
  const duration = reduceMotion ? 1 : 320;
  const startedAt = performance.now();
  energyPulse.classList.add('is-firing');
  energyPulse.setAttribute('visibility', 'visible');

  const movePulse = (now) => {
    const progress = Math.min((now - startedAt) / duration, 1);
    const point = wire.getPointAtLength(length * progress);
    energyPulse.setAttribute('cx', point.x);
    energyPulse.setAttribute('cy', point.y);

    if (progress < 1) {
      energyFrame = requestAnimationFrame(movePulse);
      return;
    }

    pulseHideTimer = window.setTimeout(() => {
      energyPulse.setAttribute('visibility', 'hidden');
      energyPulse.classList.remove('is-firing');
      wire.classList.remove('is-energized');
    }, 80);
  };

  energyFrame = requestAnimationFrame(movePulse);
}

techNodes.forEach((node) => {
  node.addEventListener('click', () => {
    techNodes.forEach((item) => item.classList.toggle('is-active', item === node));
    if (techReadout) techReadout.textContent = node.dataset.tip;
    runEnergyPulse(node.dataset.wire);
  });
});

const interactiveProjects = [...document.querySelectorAll('.interactive-project')];

interactiveProjects.forEach((project) => {
  const preview = project.querySelector('.project-preview');
  const media = [...project.querySelectorAll('.project-preview-media')];
  if (!preview || !media.length) return;

  let activeMedia = 0;
  let isPreviewing = false;
  let cycleTimer;

  const showMedia = (nextIndex) => {
    if (!isPreviewing || nextIndex === activeMedia) return;
    const previous = media[activeMedia];
    const next = media[nextIndex];
    if (!next) return;

    if (next instanceof HTMLVideoElement) {
      next.currentTime = 0;
      next.play().catch(() => {});
    }
    next.classList.add('is-active');
    previous.classList.remove('is-active');

    if (previous instanceof HTMLVideoElement) {
      window.setTimeout(() => {
        previous.pause();
        previous.currentTime = 0;
      }, 600);
    }
    activeMedia = nextIndex;
  };

  const startPreview = () => {
    if (isPreviewing) return;
    isPreviewing = true;
    activeMedia = 0;
    media.forEach((item, index) => {
      item.classList.toggle('is-active', index === 0);
      if (item instanceof HTMLVideoElement) {
        item.currentTime = 0;
        if (index === 0) item.play().catch(() => {});
      }
    });
    preview.classList.add('is-previewing');
    project.classList.add('is-open');
    if (!(media[0] instanceof HTMLVideoElement) && media.length > 1) {
      cycleTimer = window.setInterval(() => showMedia((activeMedia + 1) % media.length), 4200);
    }
  };

  const stopPreview = () => {
    isPreviewing = false;
    window.clearInterval(cycleTimer);
    preview.classList.remove('is-previewing');
    project.classList.remove('is-open');
    media.forEach((item) => {
      item.classList.remove('is-active');
      if (item instanceof HTMLVideoElement) {
        item.pause();
        item.currentTime = 0;
      }
    });
  };

  media.forEach((item, index) => {
    if (item instanceof HTMLVideoElement) {
      item.addEventListener('ended', () => {
        if (index === activeMedia) showMedia((index + 1) % media.length);
      });
    }
  });

  const togglePreview = () => {
    const shouldOpen = !isPreviewing;
    preview.setAttribute('aria-expanded', String(shouldOpen));
    if (shouldOpen) startPreview();
    else stopPreview();
  };

  preview.addEventListener('click', togglePreview);
  preview.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      togglePreview();
    }
  });
});

const educationEntries = [...document.querySelectorAll('.education-entry')];
const educationObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => entry.target.classList.toggle('is-active', entry.isIntersecting));
}, { rootMargin: '-42% 0px -42% 0px', threshold: .01 });

educationEntries.forEach((entry) => educationObserver.observe(entry));
