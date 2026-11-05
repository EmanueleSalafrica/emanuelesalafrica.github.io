/**
 * Endlose Werkzeugleisten; die Bewegung selbst übernimmt CSS.
 * Einstieg: script.js. Die Initialisierung erfolgt nach dem HTML-Laden.
 */
export function initTicker() {
  // Zwei vollständige Wiederholungen pro Bahn sorgen dafür, dass das Ende nie leer wird.
  document.querySelectorAll('.ticker-track').forEach((track) => {
    track.insertAdjacentHTML('beforeend', track.innerHTML);
  });
}
