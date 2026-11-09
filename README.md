# Judo Programmplaner

Eine statische, GitHub-Pages-fähige Anwendung zum Zusammenstellen individueller Judo-Graduierungsprogramme für 8.–1. Kyu und 1. Dan.

## Start

Voraussetzung: Node.js 20+ und `make`.

```sh
make build
```

Für einen Versionsstand beim Bauen:

```sh
make build VERSION=0.1.1
```

`make check` baut die Seite und prüft die JavaScript-Syntax. Der Build erzeugt ausschließlich die statischen Dateien in `dist/`; ein lokaler Webserver ist nicht Teil des Projekts und für GitHub Pages nicht erforderlich.

## GitHub Pages

Die Workflow-Datei `.github/workflows/pages.yml` baut beim Push auf `main` und veröffentlicht das Artefakt über GitHub Pages. Im Repository einmal unter **Settings → Pages → Build and deployment → GitHub Actions** aktivieren. Danach liefert der Workflow die öffentliche URL.

## Datenbasis

- [DJB: Anforderungen für Kyu-Grade, Stand 17. Februar 2025](https://www.judobund.de/fileadmin/user_upload/judobund.de/Downloads/Downloadcenter/Kyu-Graduierungen/Anforderungen_fuer_Kyu-Grade_2025_V2.pdf)
- [DJB: Anforderungen für Dan-Grade, Stand 1. Februar 2024](https://www.judobund.de/fileadmin/user_upload/judobund.de/Downloads/Regeln_und_Ordnungen/Anforderungen_fuer_Dan-Grade_2024.pdf)
- [DJB: Technik-Pools, Stand 1. Juni 2022](https://www.judobund.de/fileadmin/user_upload/judobund.de/Downloads/Downloadcenter/Kyu-Graduierungen/Kyu_Graduierungsstem_Technik_Pools_fuer_das_Graduierungssystem_des_DJB.pdf)
- [DJB: Kyu-Materialien und Poster](https://www.judobund.de/bildung/graduierungssystem/kyu-graduierungssystem/materialien)

Die Anwendung nutzt eigene schematische SVG-Piktogramme; DJB-Poster und deren Grafiken werden nicht eingebunden oder kopiert. Quellenabweichungen und Unsicherheiten stehen sichtbar im Bereich „Hinweise zur Datenbasis“. Es handelt sich nicht um eine offizielle DJB-Anwendung und ersetzt keine fachliche Prüfung durch die zuständige Person bzw. den Landesverband.
