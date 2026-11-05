/**
 * Klickbarer Tech Stack: Auswahl, Erklärung und Stromimpuls im SVG.
 * Einstieg: script.js. Die Initialisierung erfolgt nach dem HTML-Laden.
 */
export function initTechStack(reduceMotion) {
  const techReadout = document.querySelector('.stack-readout');
  const techNodes = [...document.querySelectorAll('.stack-card')];
  const energyPulse = document.querySelector('.energy-pulse');
  let energyFrame;
  let pulseHideTimer;

  // data-wire im HTML verweist auf die ID eines SVG-Pfades.
  // getPointAtLength bewegt den Lichtpunkt exakt entlang dieser Leitung.
  function runEnergyPulse(wireId) {
    const wire = document.querySelector(`#${wireId}`);
    if (!wire || !energyPulse) return;

    // Ein neuer Klick beendet den vorherigen Impuls und dessen Aufräumtimer.
    cancelAnimationFrame(energyFrame);
    clearTimeout(pulseHideTimer);
    document.querySelectorAll('.wire-base path.is-energized').forEach((path) => path.classList.remove('is-energized'));
    wire.classList.add('is-energized');

    const length = wire.getTotalLength();
    // Dauer in Millisekunden; der CSS-Glow liegt in styles.css.
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
}
