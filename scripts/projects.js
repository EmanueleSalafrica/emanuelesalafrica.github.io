/**
 * Projektvorschauen: Poster, Auf-/Zuklappen, Videos und GIF-Wechsel.
 * Einstieg: script.js. Die Initialisierung erfolgt nach dem HTML-Laden.
 */
export function initProjects() {
  const interactiveProjects = [...document.querySelectorAll('.interactive-project')];

  interactiveProjects.forEach((project) => {
    const preview = project.querySelector('.project-preview');
    const media = [...project.querySelectorAll('.project-preview-media')];
    if (!preview || !media.length) return;

    // Jede Projektkarte verwaltet ihren eigenen Zustand und Medienwechsel.
    let activeMedia = 0;
    let isPreviewing = false;
    let cycleTimer;

    // CSS blendet 480 ms über; das vorherige Video stoppt nach 600 ms.
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
        // GIFs besitzen kein ended-Ereignis: Wechsel deshalb alle 4,2 Sekunden.
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

    // Videos wechseln nach ihrem tatsächlichen Ende, nicht über einen Timer.
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

    // Ausschließlich Klick, Enter oder Leertaste öffnet die Vorschau.
    preview.addEventListener('click', togglePreview);
    preview.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        togglePreview();
      }
    });
  });
}
