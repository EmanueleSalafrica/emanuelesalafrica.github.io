/**
 * Jahreszahl, transparente Kopfzeile und aktive Abschnittsnavigation.
 * Einstieg: script.js. Die Initialisierung erfolgt nach dem HTML-Laden.
 */
export function initNavigation() {
  const year = document.querySelector('#year');
  if (year) year.textContent = new Date().getFullYear();
  const header = document.querySelector('.site-header');
  if (header) window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 18), { passive: true });

  const sections = [...document.querySelectorAll('main section[id]')];
  const links = [...document.querySelectorAll('.nav-link')];
  // Das schmale Beobachtungsfenster liegt in der Bildschirmmitte.
  // Sobald ein Abschnitt dort sichtbar wird, erhält sein Menülink .active.
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      links.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
    });
  }, { rootMargin: '-45% 0px -45% 0px' });
  sections.forEach((section) => observer.observe(section));
}
