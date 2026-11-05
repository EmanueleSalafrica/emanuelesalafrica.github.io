# Emanuele Salafrica — Portfolio

Website: https://emanuelesalafrica.de/

Repository: https://github.com/EmanueleSalafrica/emanuelesalafrica.github.io

Statische Website mit HTML, CSS, JavaScript, Canvas und SVG. Kein Build-Schritt nötig.

**Alle Dateien, Animationen und Einstellmöglichkeiten: [CODE-UEBERSICHT.md](CODE-UEBERSICHT.md).**

## Lokal starten

Im Portfolio-Ordner ein Terminal öffnen:

```powershell
python -m http.server 8080
```

Danach http://127.0.0.1:8080/ öffnen. Ein HTTP-Server ist für die JavaScript-Module nötig; beim Doppelklick auf die HTML-Datei kann deren Laden blockiert werden.

## Veröffentlichen

Ein Push auf `main` startet `.github/workflows/deploy-pages.yml`. Dieser lädt die statischen Dateien zu GitHub Pages. `CNAME` enthält bereits die Domain; die DNS-Konfiguration muss bei normalen Inhaltsänderungen nicht geändert werden.

Vorher `node --check script.js`, `node --check scripts/<datei>.js` und `git diff --check` ausführen und die betroffenen Funktionen im Browser prüfen.
