/**
 * Bildungsweg: die Station in der Bildschirmmitte leuchtet auf.
 * Einstieg: script.js. Die Initialisierung erfolgt nach dem HTML-Laden.
 */
export function initEducation() {
  const educationEntries = [...document.querySelectorAll('.education-entry')];
  const educationObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => entry.target.classList.toggle('is-active', entry.isIntersecting));
  }, { rootMargin: '-42% 0px -42% 0px', threshold: .01 });

  educationEntries.forEach((entry) => educationObserver.observe(entry));
}
