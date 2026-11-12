# Judo Programmplaner

Eine statische, GitHub-Pages-fähige Anwendung zum Zusammenstellen individueller Judo-Graduierungsprogramme für 8.–1. Kyu sowie 1.–6. Dan.

## Quellstruktur

- `src/data.json`: fachliche Daten – Grade, Pools, Techniken, Pflichtvorgaben, Standardsituationen, Musterlösungen und Texte.
- `src/rules.js`: reine Fachlogik – Poolfreigaben, Pflichtauswahl, Fortschrittsprüfung, Import-Normalisierung und Situationsfilter.
- `src/app.js`: Anwendungsschicht – JSON laden, Browserzustand, Rendering, Import/Export und Bedienung.
- `src/index.html` und `src/style.css`: Struktur und Gestaltung.

Die Seite lädt `data.json` zur Laufzeit über den statischen Hosting-Pfad. Deshalb ist kein lokaler Webserver Teil des Builds nötig.

## Build

```sh
make build
make check
```

## Datenbasis

- [DJB: Anforderungen für Kyu-Grade, Stand 17. Februar 2025](https://www.judobund.de/fileadmin/user_upload/judobund.de/Downloads/Downloadcenter/Kyu-Graduierungen/Anforderungen_fuer_Kyu-Grade_2025_V2.pdf)
- [DJB: Anforderungen für Dan-Grade, Stand 1. Februar 2024](https://www.judobund.de/fileadmin/user_upload/judobund.de/Downloads/Regeln_und_Ordnungen/Anforderungen_fuer_Dan-Grade_2024.pdf)
- [DJB: Technik-Pools, Stand 1. Juni 2022](https://www.judobund.de/fileadmin/user_upload/judobund.de/Downloads/Downloadcenter/Kyu-Graduierungen/Kyu_Graduierungsstem_Technik_Pools_fuer_das_Graduierungssystem_des_DJB.pdf)
- [DJB: Kyu-Materialien und Poster](https://www.judobund.de/bildung/graduierungssystem/kyu-graduierungssystem/materialien)
- [Judo-Handlungsketten](https://github.com/j0m2/Handlungsketten_judo): Judo-spezifische Ausgangssituationen und Ausführungsideen für die Anwendungsaufgaben; nichtjudo-spezifische Aliasse werden nicht übernommen.

Es handelt sich nicht um eine offizielle DJB-Anwendung und ersetzt keine fachliche Prüfung durch die zuständige Person bzw. den Landesverband.
