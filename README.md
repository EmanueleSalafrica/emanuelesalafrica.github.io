# Emanuele Salafrica – Portfolio

Statische Portfolio-Website für GitHub Pages. Sie ist bewusst ohne Framework gebaut, damit sie direkt, schnell und kostenlos deploybar ist.

## Lokal ansehen

Einfach `index.html` im Browser öffnen oder im Projektordner einen lokalen Server starten:

```powershell
python -m http.server 8080
```

Danach `http://localhost:8080` öffnen.

## Auf GitHub Pages veröffentlichen

1. Einen neuen GitHub-Repository anlegen, z. B. `portfolio`.
2. Den Inhalt dieses Ordners in das Repository pushen.
3. Unter **Settings → Pages → Build and deployment** bei Source **GitHub Actions** auswählen.
4. Der Workflow in `.github/workflows/deploy-pages.yml` veröffentlicht die Seite automatisch bei jedem Push auf `main`.

## Eigene Domain später verbinden

Sobald `emanuelesalafrica.de` gekauft ist:

1. In `CNAME.example` den Text in `CNAME` umbenennen.
2. Bei GitHub Pages die Custom Domain `emanuelesalafrica.de` eintragen.
3. Beim Domainanbieter die von GitHub angezeigten DNS-Einträge setzen.

## Noch ergänzen

- GitHub-Profil-Link im Footer
- Screenshots / Videos für die Projektkarten
- Links zu spielbaren Demos oder Repositories
- optional: eigenes Foto oder 3D-Render im Hero
