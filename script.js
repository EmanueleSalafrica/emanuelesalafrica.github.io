/**
 * Einstiegspunkt des Portfolios. Keine Frameworks oder Build-Schritte nötig.
 * Jedes Modul kümmert sich um genau eine Funktion; Details: CODE-UEBERSICHT.md.
 * type="module" lädt automatisch erst nach dem Parsen des HTML-Dokuments.
 */
import { initBackground } from './scripts/background.js';
import { initNavigation } from './scripts/navigation.js';
import { initTicker } from './scripts/ticker.js';
import { initTechStack } from './scripts/tech-stack.js';
import { initProjects } from './scripts/projects.js';
import { initEducation } from './scripts/education.js';

document.documentElement.classList.add('js');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

initTicker();
initBackground(reduceMotion);
initNavigation();
initTechStack(reduceMotion);
initProjects();
initEducation();
