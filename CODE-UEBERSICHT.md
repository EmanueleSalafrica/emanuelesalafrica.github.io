# Wegweiser durch den Portfolio-Code

## Projektordner auf deinem PC

```text
C:\Users\Lorz\Documents\Codex\2026-09-17\ich-x20\portfolio
│
├── index.html                 Texte, Struktur, Karten, Links und SVG-Leitungen
├── impressum.html             Name, Anschrift und E-Mail
├── legal.css                  Gestaltung der Impressumsseite
├── styles.css                 Farben, Layout und CSS-Animationen
├── script.js                  Einstiegspunkt für JavaScript
├── scripts/
│   ├── background.js          Bewegte Punkte und Linien im Hintergrund
│   ├── navigation.js          Aktiver Menüpunkt, Kopfzeile und Jahreszahl
│   ├── ticker.js              Kopien für die endlose Werkzeugleiste
│   ├── tech-stack.js          Klick-Auswahl und Stromimpuls auf SVG-Leitungen
│   ├── projects.js            Projekt öffnen/schließen und Medien wechseln
│   └── education.js           Bildungsstation beim Scrollen hervorheben
├── assets/
│   ├── profile/               Originalfoto und freigestelltes Porträt
│   ├── neon-escape/           Poster und drei MP4-Clips
│   └── semesterplan/          THM-Poster und drei GIFs
├── .github/workflows/
│   └── deploy-pages.yml       Veröffentlicht bei einem Push auf main
└── CNAME                      emanuelesalafrica.de
```

## Wie die Teile zusammenarbeiten

`index.html` liefert die Inhalte. `styles.css` gestaltet sie. `script.js` importiert die Module aus `scripts/` und ruft deren `init…()`-Funktionen auf. Browser laden Module erst nach dem Parsen der Seite. Dafür die Seite über einen lokalen HTTP-Server oder die Domain öffnen.

Klassen wie `.is-active`, `.is-open` und `.is-previewing` verbinden JavaScript mit CSS: JavaScript setzt den Zustand, CSS bestimmt Leuchten, Einblenden oder Aufklappen. Kommentare erklären diese Verbindungen im Quellcode.

## Animationen finden und ändern

| Effekt | Datei / Suchbegriff | Einstellmöglichkeiten |
| --- | --- | --- |
| Bewegte Punkte und Linien | `scripts/background.js`: `sizeCanvas`, `draw` | Anzahl (`count`), Geschwindigkeit (`vx`, `vy`), Verbindungsabstand (`138`), Linienfarbe |
| Glow und Scrollpfeil | `styles.css`: `breathe`, `bob`, `.hero-glow`, `.scroll-hint` | Dauer, Deckkraft, Bewegungsweite |
| Werkzeugleisten nach links/rechts | `scripts/ticker.js`; CSS: `tool-drift-left`, `tool-drift-right`, `.ticker-track` | Dauer 36/42 Sekunden; mobil teilweise 29/34 Sekunden. Größere Dauer = langsamer. Hover pausiert. |
| Menü folgt dem Scrollen | `scripts/navigation.js`: `IntersectionObserver` | `rootMargin` definiert den aktiven Bereich um die Bildschirmmitte |
| Bildungsstation leuchtet | `scripts/education.js`; CSS: `.education-entry.is-active` | Aktivierungsbereich, Farbe, Schatten, Anhebung |
| Stromsignal beim Klick | `scripts/tech-stack.js`: `runEnergyPulse` | `duration` aktuell 320 ms; Nachleuchten 80 ms |
| Stromsignal flackert | `styles.css`: `lightning-flash`, `energy-surge`, `.is-energized` | Farbe, Schatten, Ein-/Aus-Schritte |
| Projekt öffnet/schließt | `scripts/projects.js`: `togglePreview`; CSS: `.neon-details` | Klick/Enter/Leertaste; CSS bestimmt Aufklappen und Dauer |
| Projektclips blenden über | `scripts/projects.js`: `showMedia`; CSS: `.project-preview-media` | Übergang 480 ms, vorheriges Video stoppt nach 600 ms |
| THM-GIFs wechseln | `scripts/projects.js`: `cycleTimer` | 4.200 ms je GIF; MP4s wechseln beim tatsächlichen Videoende |

### Endlose Werkzeugleiste

Die HTML-Leisten enthalten Wiederholungen; `ticker.js` dupliziert den gesamten Inhalt noch einmal. CSS verschiebt die Bahn um die halbe Breite und beginnt wieder von vorn. Beide Hälften müssen gleich bleiben. Die Bewegung benötigt keine Animationsbibliothek.

### Stromimpuls und Leitungen

Jeder Tech-Stack-Button hat `data-wire="wire-…"`. Das verweist auf einen `<path id="wire-…">` im SVG in `index.html`. Die `d`-Angabe enthält die Leitungskoordinaten. `getTotalLength()` ermittelt die Länge, `getPointAtLength()` die Position. Pro Bildschirmframe wird `.energy-pulse` dorthin gesetzt. Ein neuer Klick beendet den vorherigen Impuls.

Beim Verschieben von Karten **SVG-Pfad und Kartenposition gemeinsam ändern**. Responsive CSS blendet auf kleinen Displays die Leitungen aus und ordnet die Karten als Raster an; die Auswahl mit Erklärung bleibt bedienbar.

### Clips und Poster austauschen

Neon Escape: `assets/neon-escape/neon-escape-loop-01.mp4` bis `-03.mp4`. Poster: `neon-escape-poster.png`.

THM Semesterplan: `assets/semesterplan/semesterplan-loop-01.gif` bis `-03.gif`. Poster: `thm-semesterplan-poster.png`.

Datei ersetzen oder den `src`-Pfad in `index.html` anpassen. Titel, Beschreibung, Tags und GitHub-Links stehen jeweils direkt unter der Vorschau. Beide Karten verwenden denselben Ablauf. Videos pausieren beim Schließen. GIFs werden über Sichtbarkeit gewechselt; eingebundene GIF-Dateien können im Browser auch unsichtbar weiterlaufen.

## CSS lesen und pflegen

In `:root` stehen Farben (`--mint`, `--ink`, `--text`) und Schriften. Danach folgen Basislayout, Navigation und Komponenten. Kommentierte Abschnitte präzisieren Profil, Werkzeugleisten, Bildungsroute, Tech Stack, Flächen und Projektvorschauen. `legal.css` gestaltet ausschließlich das Impressum.

Die bestehende Regelreihenfolge wurde beim Formatieren erhalten, damit das Layout gleich bleibt. Einige Selektoren werden später nochmals präzisiert: Es gelten Spezifität und bei Gleichstand die spätere Regel. Suche daher nach **allen** Vorkommen eines Selektors. Historische Regeln sind nicht pauschal gelöscht, da sie teilweise noch gemeinsame Eigenschaften liefern.

`@media (max-width: …)` passt die Darstellung an kleinere Bildschirme an. Die mobile Porträt-Verschiebung findest du beispielsweise über `.profile-dossier h2#about-title img` im 860-Pixel-Abschnitt. `@keyframes` beschreibt den Ablauf einer CSS-Animation.

`prefers-reduced-motion` berücksichtigt die Bewegungseinstellung des Betriebssystems. CSS reduziert Animationen; JavaScript zeichnet den Hintergrund statisch und verkürzt den Stromimpuls. Vorschauen starten weiterhin erst auf bewussten Klick.

## Tatsächlich verwendete Technik

Die Website verwendet HTML/CSS/JavaScript. Canvas zeichnet den Hintergrund, SVG beschreibt die Stromleitungen. `requestAnimationFrame` und `IntersectionObserver` steuern Bewegung und Sichtbarkeit. **React, GSAP und Tailwind sind im Portfolio aktuell nicht importiert.** Ihre Logos sind Inhalte der Werkzeug-/Tech-Stack-Darstellung; der THM-Projektcode liegt im separaten verlinkten Repository.

Die Hauptseite lädt Schriften von Google Fonts. Mehrere Logos kommen von Simple Icons beziehungsweise jsDelivr/Devicon. Fotos, Poster und Clips liegen im Projekt. Das Impressum lädt nur lokale Styles und keine Animationsmodule. Eine separate Datenschutzerklärung müsste die externen Ressourcen und das GitHub-Pages-Hosting zusätzlich beschreiben; das Impressum ersetzt sie nicht.

## Impressum und Veröffentlichung

Die öffentliche Anschrift und E-Mail stehen in `impressum.html`, der Link dazu im Footer von `index.html`. Grundlage für die Basisangaben: [§ 18 Abs. 1 MStV](https://www.gesetze-bayern.de/Content/Document/MStV-18); je nach Nutzung zusätzlich [§ 5 DDG](https://www.gesetze-im-internet.de/ddg/__5.html). Weitere Angaben richten sich nach der tatsächlichen Tätigkeit; Register-/Steuerdaten wurden nicht erfunden.

Lokal: im Portfolio-Ordner `python -m http.server 8080` ausführen und `http://127.0.0.1:8080/` öffnen. Ein Push auf `main` startet `.github/workflows/deploy-pages.yml`. `CNAME` verbindet die Veröffentlichung mit der Domain. Nach Änderungen bei Bedarf die Versionskennung im CSS-/Script-Link erhöhen, damit Browser neue Dateien laden.
