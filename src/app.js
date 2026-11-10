const DATA_VERSION = 4;
const STORAGE_KEY = "judo-programmplaner-v1";

const degrees = [
  { id: "8", label: "8. Kyu · weiß-gelb", short: "8. Kyu", color: "#e4d9a9", description: "Einstieg: Grundverständnis, Werte, Fallen und erste Judoerfahrungen. Kein Technikpool-Umfang vorgegeben." },
  { id: "7", label: "7. Kyu · gelb", short: "7. Kyu", color: "#e7c74a", description: "Fallen, Werfen, Halten · 3 Wurftechniken aus dem Grundprogramm." },
  { id: "6", label: "6. Kyu · gelb-orange", short: "6. Kyu", color: "#e5a543", description: "Vertiefung und Variation · 6 Wurftechniken aus dem Grundprogramm." },
  { id: "5", label: "5. Kyu · orange", short: "5. Kyu", color: "#d97837", description: "Anwenden und Befreien · 9 Wurftechniken aus dem Grundprogramm." },
  { id: "4", label: "4. Kyu · orange-grün", short: "4. Kyu", color: "#88a64c", description: "Werfen auf einem Bein · 12 Wurftechniken aus dem Grundprogramm." },
  { id: "3", label: "3. Kyu · grün", short: "3. Kyu", color: "#3e7b56", description: "Sensationelle Technikwelten · 15 Würfe, davon 3 aus dem Erweiterungsprogramm." },
  { id: "2", label: "2. Kyu · blau", short: "2. Kyu", color: "#477d9b", description: "Judo-Taktik · 18 Würfe, davon 6 aus dem Erweiterungsprogramm." },
  { id: "1", label: "1. Kyu · braun", short: "1. Kyu", color: "#725034", description: "Das eigene Judoprofil · 20 Würfe, davon 9 aus dem Erweiterungsprogramm." },
  { id: "dan1", label: "1. Dan · schwarz", short: "1. Dan", color: "#252825", description: "Obligatorik: vollständige Gokyo-no-waza und Katame-waza aus Grund- und Erweiterungsprogramm." },
  { id: "dan2", label: "2. Dan · schwarz", short: "2. Dan", color: "#252825", description: "Obligatorik: Gokyo-no-waza, 12 weitere Würfe, Katame-waza sowie Nage-no-kata." },
  { id: "dan3", label: "3. Dan · schwarz", short: "3. Dan", color: "#252825", description: "Obligatorik: Gokyo, 12 weitere Würfe, Katame-waza, Theorie und Katame-no-kata." },
  { id: "dan4", label: "4. Dan · schwarz", short: "4. Dan", color: "#252825", description: "Exemplarische Prüfung: Te-, Koshi- und Ashi-waza sowie Osaekomi-waza, Kata und Theorie." },
  { id: "dan5", label: "5. Dan · schwarz", short: "5. Dan", color: "#252825", description: "Exemplarische Prüfung: Sutemi-waza sowie Kansetsu- und Shime-waza, Kata und Theorie." },
  { id: "dan6", label: "6. Dan · schwarz", short: "6. Dan", color: "#252825", description: "Prüfungserwerb: vollständige Nage- und Katame-waza, zwei Kata-Demonstrationen, Theorie und Engagement." },
];

const pools = {
  grund: { label: "Grundprogramm", color: "#d97837" },
  erweiterung: { label: "Erweiterungsprogramm", color: "#3e7b56" },
  master: { label: "Masterprogramm", color: "#477d9b" },
  historisch: { label: "Historisches Programm", color: "#7a6554" },
};

const groupInfo = {
  "stand-te": { title: "Stand · Te-waza", area: "stand", order: 1 },
  "stand-koshi": { title: "Stand · Koshi-waza", area: "stand", order: 2 },
  "stand-ashi": { title: "Stand · Ashi-waza", area: "stand", order: 3 },
  "stand-ma": { title: "Stand · Ma-sutemi-waza", area: "stand", order: 4 },
  "stand-yoko": { title: "Stand · Yoko-sutemi-waza", area: "stand", order: 5 },
  "boden-osae": { title: "Boden · Osaekomi-waza", area: "boden", order: 6 },
  "boden-kansetsu": { title: "Boden · Kansetsu-waza", area: "boden", order: 7 },
  "boden-shime": { title: "Boden · Shime-waza", area: "boden", order: 8 },
};

function technique(id, name, group, pool, options = {}) {
  return {
    id, name, group, pool,
    area: groupInfo[group].area,
    category: groupInfo[group].title.split(" · ")[1],
    turn: false,
    gokyo: null,
    counterOnly: false,
    ...options,
  };
}

// Techniken aus den vier Technik-Pools (DJB, Stand 01.06.2022) plus die
// Kyu-/Dan-relevanten Katame-waza. Schreibweisen folgen vorrangig dem Kyu-PDF 2025.
const techniques = [
  // Grundprogramm · Nage-waza
  technique("morote-seoi-nage", "Morote-seoi-nage", "stand-te", "grund", { turn: true, gokyo: "seoi-nage" }),
  technique("ippon-seoi-nage", "Ippon-seoi-nage", "stand-te", "grund", { turn: true, gokyo: "seoi-nage" }),
  technique("tai-otoshi", "Tai-otoshi", "stand-te", "grund", { turn: true, gokyo: "tai-otoshi" }),
  technique("o-goshi", "O-goshi", "stand-koshi", "grund", { turn: true, gokyo: "o-goshi" }),
  technique("uki-goshi", "Uki-goshi", "stand-koshi", "grund", { turn: true, gokyo: "uki-goshi" }),
  technique("koshi-guruma", "Koshi-guruma", "stand-koshi", "grund", { turn: true, gokyo: "koshi-guruma" }),
  technique("tsurikomi-goshi", "Tsurikomi-goshi", "stand-koshi", "grund", { turn: true, gokyo: "tsurikomi-goshi" }),
  technique("sode-tsurikomi-goshi", "Sode-tsurikomi-goshi", "stand-koshi", "grund", { turn: true }),
  technique("harai-goshi", "Harai-goshi", "stand-koshi", "grund", { turn: true, gokyo: "harai-goshi" }),
  technique("de-ashi-barai", "De-ashi-barai", "stand-ashi", "grund", { gokyo: "de-ashi-barai" }),
  technique("sasae-tsurikomi-ashi", "Sasae-tsurikomi-ashi", "stand-ashi", "grund", { gokyo: "sasae-tsurikomi-ashi" }),
  technique("o-soto-gari", "O-soto-gari", "stand-ashi", "grund", { gokyo: "o-soto-gari" }),
  technique("o-uchi-gari", "O-uchi-gari", "stand-ashi", "grund", { gokyo: "o-uchi-gari" }),
  technique("ko-soto-gari", "Ko-soto-gari", "stand-ashi", "grund", { gokyo: "ko-soto-gari" }),
  technique("ko-uchi-gari", "Ko-uchi-gari", "stand-ashi", "grund", { gokyo: "ko-uchi-gari" }),
  technique("uchi-mata", "Uchi-mata", "stand-ashi", "grund", { turn: true, gokyo: "uchi-mata" }),

  // Erweiterungsprogramm · Nage-waza
  technique("kata-guruma", "Kata-guruma", "stand-te", "erweiterung", { turn: true, gokyo: "kata-guruma" }),
  technique("uki-otoshi", "Uki-otoshi", "stand-te", "erweiterung", { gokyo: "uki-otoshi" }),
  technique("tsuri-goshi", "Tsuri-goshi", "stand-koshi", "erweiterung", { turn: true, gokyo: "tsuri-goshi" }),
  technique("utsuri-goshi", "Utsuri-goshi", "stand-koshi", "erweiterung", { gokyo: "utsuri-goshi" }),
  technique("okuri-ashi-barai", "Okuri-ashi-barai", "stand-ashi", "erweiterung", { gokyo: "okuri-ashi-barai" }),
  technique("ashi-guruma", "Ashi-guruma", "stand-ashi", "erweiterung", { turn: true, gokyo: "ashi-guruma" }),
  technique("tomoe-nage", "Tomoe-nage", "stand-ma", "erweiterung", { gokyo: "tomoe-nage" }),
  technique("sumi-gaeshi", "Sumi-gaeshi", "stand-ma", "erweiterung", { gokyo: "sumi-gaeshi" }),
  technique("ura-nage", "Ura-nage", "stand-ma", "erweiterung", { gokyo: "ura-nage" }),
  technique("ko-uchi-makikomi", "Ko-uchi-makikomi", "stand-yoko", "erweiterung"),
  technique("tani-otoshi", "Tani-otoshi", "stand-yoko", "erweiterung", { gokyo: "tani-otoshi" }),
  technique("soto-makikomi", "Soto-makikomi", "stand-yoko", "erweiterung", { turn: true, gokyo: "soto-makikomi" }),

  // Masterprogramm · Nage-waza
  technique("kuchiki-daoshi", "Kuchiki-daoshi", "stand-te", "master"),
  technique("morote-gari", "Morote-gari", "stand-te", "master"),
  technique("sukui-nage", "Sukui-nage", "stand-te", "master", { gokyo: "sukui-nage" }),
  technique("uchi-mata-sukashi", "Uchi-mata-sukashi", "stand-te", "master", { gokyo: "uchi-mata-sukashi" }),
  technique("ko-uchi-gaeshi", "Ko-uchi-gaeshi", "stand-te", "master", { counterOnly: true }),
  technique("seoi-otoshi", "Seoi-otoshi", "stand-te", "master", { turn: true }),
  technique("sumi-otoshi", "Sumi-otoshi", "stand-te", "master"),
  technique("obi-tori-gaeshi", "Obi-tori-gaeshi", "stand-te", "master"),
  technique("kibisu-gaeshi", "Kibisu-gaeshi", "stand-te", "master"),
  technique("obi-otoshi", "Obi-otoshi", "stand-te", "master"),
  technique("yama-arashi", "Yama-arashi", "stand-te", "master"),
  technique("hane-goshi", "Hane-goshi", "stand-koshi", "master", { turn: true, gokyo: "hane-goshi" }),
  technique("ushiro-goshi", "Ushiro-goshi", "stand-koshi", "master"),
  technique("hiza-guruma", "Hiza-guruma", "stand-ashi", "master", { gokyo: "hiza-guruma" }),
  technique("ko-soto-gake", "Ko-soto-gake", "stand-ashi", "master", { gokyo: "ko-soto-gake" }),
  technique("harai-tsurikomi-ashi", "Harai-tsurikomi-ashi", "stand-ashi", "master", { gokyo: "harai-tsurikomi-ashi" }),
  technique("o-guruma", "O-guruma", "stand-ashi", "master", { turn: true, gokyo: "o-guruma" }),
  technique("o-soto-guruma", "O-soto-guruma", "stand-ashi", "master", { gokyo: "o-soto-guruma" }),
  technique("o-soto-otoshi", "O-soto-otoshi", "stand-ashi", "master", { gokyo: "o-soto-otoshi" }),
  technique("o-soto-gaeshi", "O-soto-gaeshi", "stand-ashi", "master", { counterOnly: true }),
  technique("tsubame-gaeshi", "Tsubame-gaeshi", "stand-ashi", "master", { counterOnly: true }),
  technique("hane-goshi-gaeshi", "Hane-goshi-gaeshi", "stand-ashi", "master", { counterOnly: true }),
  technique("harai-goshi-gaeshi", "Harai-goshi-gaeshi", "stand-ashi", "master", { counterOnly: true }),
  technique("uchi-mata-gaeshi", "Uchi-mata-gaeshi", "stand-ashi", "master", { counterOnly: true }),
  technique("o-uchi-gaeshi", "O-uchi-gaeshi", "stand-ashi", "master", { counterOnly: true }),
  technique("hikikomi-gaeshi", "Hikikomi-gaeshi", "stand-ma", "master"),
  technique("harai-makikomi", "Harai-makikomi", "stand-yoko", "master"),
  technique("uchi-mata-makikomi", "Uchi-mata-makikomi", "stand-yoko", "master", { turn: true }),
  technique("hane-makikomi", "Hane-makikomi", "stand-yoko", "master", { turn: true, gokyo: "hane-makikomi" }),
  technique("o-soto-makikomi", "O-soto-makikomi", "stand-yoko", "master"),
  technique("yoko-otoshi", "Yoko-otoshi", "stand-yoko", "master", { gokyo: "yoko-otoshi" }),
  technique("uki-waza", "Uki-waza", "stand-yoko", "master", { gokyo: "uki-waza" }),
  technique("yoko-guruma", "Yoko-guruma", "stand-yoko", "master", { gokyo: "yoko-guruma" }),
  technique("yoko-gake", "Yoko-gake", "stand-yoko", "master", { gokyo: "yoko-gake" }),
  technique("yoko-wakare", "Yoko-wakare", "stand-yoko", "master", { gokyo: "yoko-wakare" }),

  // Historisches Programm · Nage-waza
  technique("daki-age", "Daki-age", "stand-koshi", "historisch"),
  technique("tawara-gaeshi", "Tawara-gaeshi", "stand-ma", "historisch"),
  technique("uchi-makikomi", "Uchi-makikomi", "stand-yoko", "historisch"),
  technique("daki-wakare", "Daki-wakare", "stand-yoko", "historisch"),
  technique("kani-basami", "Kani-basami", "stand-yoko", "historisch"),
  technique("kawazu-gake", "Kawazu-gake", "stand-yoko", "historisch"),

  // Grundprogramm · Katame-waza
  technique("kuzure-kesa-gatame", "Kuzure-kesa-gatame", "boden-osae", "grund"),
  technique("kesa-gatame", "Kesa-gatame", "boden-osae", "grund"),
  technique("yoko-shiho-gatame", "Yoko-shiho-gatame", "boden-osae", "grund"),
  technique("kami-shiho-gatame", "Kami-shiho-gatame", "boden-osae", "grund"),
  technique("tate-shiho-gatame", "Tate-shiho-gatame", "boden-osae", "grund"),
  technique("juji-gatame", "Juji-gatame", "boden-kansetsu", "grund"),
  technique("ude-garami", "Ude-garami (am gebeugten Arm)", "boden-kansetsu", "grund"),
  technique("gyaku-juji-jime", "Gyaku-juji-jime", "boden-shime", "grund"),
  technique("okuri-eri-jime", "Okuri-eri-jime", "boden-shime", "grund"),

  // Erweiterungsprogramm · Katame-waza
  technique("ushiro-kesa-gatame", "Ushiro-kesa-gatame", "boden-osae", "erweiterung"),
  technique("kata-gatame", "Kata-gatame", "boden-osae", "erweiterung"),
  technique("kuzure-kami-shiho-gatame", "Kuzure-kami-shiho-gatame", "boden-osae", "erweiterung"),
  technique("ura-gatame", "Ura-gatame", "boden-osae", "erweiterung"),
  technique("uki-gatame", "Uki-gatame", "boden-osae", "erweiterung"),
  technique("waki-gatame", "Waki-gatame", "boden-kansetsu", "erweiterung"),
  technique("ude-gatame", "Ude-gatame", "boden-kansetsu", "erweiterung"),
  technique("hiza-gatame", "Hiza-gatame", "boden-kansetsu", "erweiterung"),
  technique("sankaku-gatame", "Sankaku-gatame", "boden-kansetsu", "erweiterung"),
  technique("katate-jime", "Katate-jime", "boden-shime", "erweiterung"),
  technique("kataha-jime", "Kataha-jime", "boden-shime", "erweiterung"),
  technique("hadaka-jime", "Hadaka-jime", "boden-shime", "erweiterung"),
  technique("sankaku-jime", "Sankaku-jime", "boden-shime", "erweiterung"),
  technique("sode-guruma-jime", "Sode-guruma-jime", "boden-shime", "erweiterung"),
  technique("tsukkomi-jime", "Tsukkomi-jime", "boden-shime", "erweiterung"),

  // Masterprogramm · Katame-waza
  technique("ashi-gatame", "Ashi-gatame", "boden-kansetsu", "master"),
  technique("hara-gatame", "Hara-gatame", "boden-kansetsu", "master"),
  technique("te-gatame", "Te-gatame", "boden-kansetsu", "master"),
  technique("nami-juji-jime", "Nami-juji-jime", "boden-shime", "master"),
  technique("kata-juji-jime", "Kata-juji-jime", "boden-shime", "master"),
  technique("ryote-jime", "Ryo-te-jime", "boden-shime", "master"),
  technique("do-jime", "Do-jime", "boden-shime", "historisch"),
];

// Eigene Comic-Neuillustrationen. Die Körperhaltungen der abgedeckten Techniken
// wurden anhand der DJB-Poster nachvollzogen; die Poster selbst sind keine Assets
// dieser Anwendung. Die Tafelbilder werden als gepolsterte Einzeldateien ausgeliefert,
// damit sich keine Figur aus einem benachbarten Rasterfeld in die Karte schiebt.
const comicSprites = {
  grundStand: { columns: 4, rows: 4 },
  erweiterungStand: { columns: 3, rows: 4 },
  grundBoden: { columns: 4, rows: 4 },
  erweiterungBoden: { columns: 3, rows: 4 },
};

const comicFrames = {
  // Grundprogramm Stand: Raster wie das Poster, von oben links nach unten rechts.
  "morote-seoi-nage": ["grundStand", 0, 0], "tai-otoshi": ["grundStand", 1, 0], "tsurikomi-goshi": ["grundStand", 2, 0], "uchi-mata": ["grundStand", 3, 0],
  "o-goshi": ["grundStand", 0, 1], "ippon-seoi-nage": ["grundStand", 1, 1], "sode-tsurikomi-goshi": ["grundStand", 2, 1], "koshi-guruma": ["grundStand", 3, 1],
  "de-ashi-barai": ["grundStand", 0, 2], "o-uchi-gari": ["grundStand", 1, 2], "ko-uchi-gari": ["grundStand", 2, 2], "o-soto-gari": ["grundStand", 3, 2],
  "uki-goshi": ["grundStand", 0, 3], "ko-soto-gari": ["grundStand", 1, 3], "sasae-tsurikomi-ashi": ["grundStand", 2, 3], "harai-goshi": ["grundStand", 3, 3],

  // Erweiterungsprogramm Stand.
  "tomoe-nage": ["erweiterungStand", 0, 0], "sumi-gaeshi": ["erweiterungStand", 1, 0], "ura-nage": ["erweiterungStand", 2, 0],
  "tani-otoshi": ["erweiterungStand", 0, 1], "soto-makikomi": ["erweiterungStand", 1, 1], "ko-uchi-makikomi": ["erweiterungStand", 2, 1],
  "okuri-ashi-barai": ["erweiterungStand", 0, 2], "ashi-guruma": ["erweiterungStand", 1, 2], "uki-otoshi": ["erweiterungStand", 2, 2],
  "tsuri-goshi": ["erweiterungStand", 0, 3], "utsuri-goshi": ["erweiterungStand", 1, 3], "kata-guruma": ["erweiterungStand", 2, 3],

  // Grundprogramm Boden: nur die auf der 4 × 4-Tafel eindeutig abgebildeten Techniken.
  "kesa-gatame": ["grundBoden", 0, 1], "yoko-shiho-gatame": ["grundBoden", 0, 2], "tate-shiho-gatame": ["grundBoden", 0, 3],
  "ushiro-kesa-gatame": ["grundBoden", 1, 1], "kuzure-kami-shiho-gatame": ["grundBoden", 1, 2], "uki-gatame": ["grundBoden", 1, 3],
  "juji-gatame": ["grundBoden", 3, 1], "ude-garami": ["grundBoden", 3, 2], "waki-gatame": ["grundBoden", 3, 3],

  // Erweiterungsprogramm Boden.
  "hiza-gatame": ["erweiterungBoden", 0, 0], "gyaku-juji-jime": ["erweiterungBoden", 1, 0], "okuri-eri-jime": ["erweiterungBoden", 2, 0],
  "sankaku-gatame": ["erweiterungBoden", 0, 1], "sode-guruma-jime": ["erweiterungBoden", 2, 1],
  "ashi-gatame": ["erweiterungBoden", 0, 2], "hadaka-jime": ["erweiterungBoden", 1, 2], "sankaku-jime": ["erweiterungBoden", 2, 2],
  "hara-gatame": ["erweiterungBoden", 0, 3], "kataha-jime": ["erweiterungBoden", 1, 3], "tsukkomi-jime": ["erweiterungBoden", 2, 3],
};

const techniqueById = new Map(techniques.map((item) => [item.id, item]));
const gokyoKeys = [...new Set(techniques.filter((item) => item.gokyo).map((item) => item.gokyo))];
const gokyoTechniqueIds = techniques.filter((item) => item.gokyo).map((item) => item.id);
const danGroundIds = techniques.filter((item) => item.area === "boden" && ["grund", "erweiterung"].includes(item.pool)).map((item) => item.id);
const allKatameExceptDoJimeIds = techniques.filter((item) => item.area === "boden" && item.id !== "do-jime").map((item) => item.id);
const dan6TechniqueIds = techniques.filter((item) => !["kani-basami", "kawazu-gake"].includes(item.id)).map((item) => item.id);

const mandatoryByDegree = {
  "7": ["kesa-gatame", "tate-shiho-gatame", "yoko-shiho-gatame", "kami-shiho-gatame"],
  "4": ["o-soto-gari", "harai-goshi", "uchi-mata", "juji-gatame", "ude-garami"],
  "3": ["tomoe-nage", "tani-otoshi", "hiza-gatame", "sankaku-gatame"],
  "2": ["sumi-gaeshi", "soto-makikomi", "gyaku-juji-jime", "okuri-eri-jime"],
  "1": ["ura-nage", "ko-uchi-makikomi", "sode-guruma-jime", "okuri-eri-jime"],
  "dan1": [...new Set([
    ...techniques.filter((item) => item.gokyo).map((item) => item.id),
    ...danGroundIds,
  ])],
  // Beim 2. und 3. Dan sind Gokyo und sämtliche Katame-waza (außer Do-jime;
  // Ashi-garami ist in den DJB-Pools nicht enthalten) verbindlich. Die zwölf
  // Shinmeisho-/Habukareta-waza bleiben eine individuelle Auswahl.
  "dan2": [...new Set([...gokyoTechniqueIds, ...allKatameExceptDoJimeIds])],
  "dan3": [...new Set([...gokyoTechniqueIds, ...allKatameExceptDoJimeIds])],
  // Zum 6. Dan fordert die Ordnung alle Nage- und Katame-waza; ausdrücklich
  // ausgenommen sind nur Kawazu-gake und Kani-basami.
  "dan6": dan6TechniqueIds,
};

const sideRequirementsByDegree = { "7": 1, "6": 2, "5": 3, "4": 3 };

const danPrograms = {
  dan1: {
    intro: "Diese Nachweise gehören zusätzlich zu den ausgewählten Technik- und Situationskarten zum 1. Dan.",
    cards: [
      { key: "kata", kind: "Obligatorische Kata", title: "Kata-Teil auswählen", label: "Vorgabe zum 1. Dan", requirement: ["Kata", "Nage-no-kata 1–3 oder Ju-no-kata 1–2"], options: [["nage-1-3", "Nage-no-kata · Gruppen 1–3"], ["ju-1-2", "Ju-no-kata · Gruppen 1–2"]] },
      { key: "wahlbereich", kind: "Ein Wahlbereich", title: "Schwerpunkt auswählen", label: "Nachweis zum 1. Dan", requirement: ["Wahlbereich", "Lizenz · Wettkampf · Kata · Selbstverteidigung oder Taiso"], options: [["lizenz", "Lizenzen · gültige Trainer-C-Lizenz des DJB"], ["wettkampf", "Wettkampf · 10 Kampfpunkte und individuelle Kampfkonzeption"], ["kata-uke", "Kata · als Uke: Kodokan-Kata nach Wahl mit mindestens 15 Techniken"], ["kata-alternative", "Kata · als Tori: nicht gewählte Alternative der Obligatorik"], ["kata-nage-4-5", "Kata · als Tori: Nage-no-kata Gruppen 4–5"], ["kata-ju-3", "Kata · als Tori: Ju-no-kata Gruppe 3"], ["kata-katame-osae", "Kata · als Tori: Katame-no-kata · Osaekomi-waza"], ["kata-goshinjutsu-1-2", "Kata · als Tori: Kodokan Goshinjutsu Gruppen 1–2 (ohne Waffen)"], ["selbstverteidigung", "Selbstverteidigung · Nahdistanz sowie Schläge und Tritte"], ["taiso", "Taiso · Sportabzeichen, Tandoku-renshu und Seiryoku-zenyo-kokumin-taiiku"]] },
    ],
  },
  dan2: {
    intro: "Zum 2. Dan kommen zum Technikprogramm Nage-no-kata und ein Wahlbereich hinzu.",
    cards: [
      { key: "kata", kind: "Obligatorische Kata", title: "Kata vormerken", label: "Vorgabe zum 2. Dan", requirement: ["Kata", "Nage-no-kata"], options: [["nage", "Nage-no-kata"]] },
      { key: "handlungsketten", kind: "Katame-waza", title: "Handlungsketten planen", label: "Vorgabe", requirement: ["Handlungsketten", "2 verzweigte Ketten aus Oberlage mit je 3 Abschlüssen"], options: [["oberlage-2", "2 verzweigte Handlungsketten aus Oberlage · je mindestens 3 Abschlüsse"]] },
      { key: "wahlbereich", kind: "Ein Wahlbereich", title: "Schwerpunkt auswählen", label: "Nachweis zum 2. Dan", requirement: ["Wahlbereich", "Lizenz · Wettkampf · Kata · Selbstverteidigung oder Taiso"], options: [["lizenz", "Lizenzen · Trainer-C, Landes-Kampfrichter oder Landes-Kata-Wertungsrichter"], ["wettkampf", "Wettkampf · 10 Kampfpunkte und Uchi-komi mit zwei Eindrehtechniken beidseitig"], ["kata", "Kata · Uke oder Katame-no-kata / Goshinjutsu / Kime-no-kata Idori als Tori"], ["selbstverteidigung", "Selbstverteidigung · Programm 1. Dan plus Schlagwaffen"], ["taiso", "Taiso · Sportabzeichen Silber und Seiryoku-zenyo-kokumin-taiiku"]] },
    ],
  },
  dan3: {
    intro: "Der 3. Dan ergänzt das Technikprogramm um Theorie, Katame-no-kata und einen Wahlbereich.",
    cards: [
      { key: "kata", kind: "Obligatorische Kata", title: "Kata vormerken", label: "Vorgabe zum 3. Dan", requirement: ["Kata", "Katame-no-kata"], options: [["katame", "Katame-no-kata"]] },
      { key: "theorie", kind: "Theorie", title: "Thema auswählen", label: "Themenbereich", requirement: ["Theorie", "eine Wahlaufgabe"], options: [["kuzushi-tsukuri", "Kanos Konzept von Kuzushi und Tsukuri"], ["uke-lernen", "Bedeutung des Uke-Verhaltens für den Lernprozess"], ["judo-werte", "Judo-Werte im Kinder- und Jugendtraining"]] },
      { key: "handlungsketten", kind: "Katame-waza", title: "Zusatznachweise planen", label: "Vorgaben", requirement: ["Katame-Nachweise", "Ketten in Ober- und Unterlage sowie Umdrehprinzipien"], options: [["vollstaendig", "2 Ketten Oberlage · 2 Ketten Unterlage · Umdrehprinzipien geplant"]] },
      { key: "nage-nachweise", kind: "Nage-waza", title: "Kombinationen und Konter", label: "Vorgaben", requirement: ["Nage-Nachweise", "6 Kombinationen/Finten und 6 Kontertechniken"], options: [["vollstaendig", "6 Kombinationen oder Finten und 6 Kontertechniken geplant"]] },
      { key: "wahlbereich", kind: "Ein Wahlbereich", title: "Schwerpunkt auswählen", label: "Nachweis zum 3. Dan", requirement: ["Wahlbereich", "Lizenz · Wettkampf · Kata · Selbstverteidigung oder Taiso"], options: [["lizenz", "Lizenzen · Trainer-B oder Landeslizenz mit Erfahrung"], ["wettkampf", "Wettkampf · 10 Kampfpunkte, Uchi-komi und Griffkampfstrategien"], ["kata", "Kata · Uke oder Ju-no-kata / Goshinjutsu / Kime-no-kata / Koshiki-no-kata"], ["selbstverteidigung", "Selbstverteidigung · Programm 2. Dan plus Schnitt-/Stichwaffen"], ["taiso", "Taiso · Sportabzeichen Gold und Taiso-Programm"]] },
    ],
  },
  dan4: {
    intro: "Für den 4. Dan werden vom Prüfer gewählte Beispiele aus den unten freigeschalteten Bereichen demonstriert und erläutert.",
    cards: [
      { key: "kata", kind: "Obligatorische Kata", title: "Kata auswählen", label: "Vorgabe zum 4. Dan", requirement: ["Kata", "Ju-no-kata oder Kodokan Goshinjutsu"], options: [["ju", "Ju-no-kata"], ["goshinjutsu", "Kodokan Goshinjutsu"]] },
      { key: "theorie", kind: "Theorie", title: "Thema auswählen", label: "Themenbereich", requirement: ["Theorie", "eine Wahlaufgabe"], options: [["hebel", "Hebelwirkungen und Rotationen um Körperachsen"], ["uebungsreihen", "Übungsreihen nach Funktionsphasen"], ["kano", "Kanos Erziehungskonzept Ende des 19. Jahrhunderts"]] },
      { key: "wahlbereich", kind: "Ein Wahlbereich", title: "Schwerpunkt auswählen", label: "Nachweis zum 4. Dan", requirement: ["Wahlbereich", "Lizenz · Wettkampf oder Kata"], options: [["lizenz", "Lizenzen · Trainer-B oder Bundes-B-Lizenz"], ["wettkampf", "Wettkampf · 10 Kampfpunkte und vier Trainingsformen"], ["kata", "Kata · Uke oder Tori nach den zugelassenen Alternativen"]] },
    ],
  },
  dan5: {
    intro: "Für den 5. Dan werden vom Prüfer gewählte Beispiele aus den unten freigeschalteten Bereichen demonstriert und erläutert.",
    cards: [
      { key: "kata", kind: "Obligatorische Kata", title: "Kata-Kombination auswählen", label: "Vorgabe zum 5. Dan", requirement: ["Kata", "Kata als Uke plus Koshiki- oder Kime-no-kata"], options: [["itsutsu-koshiki", "Itsutsu-no-kata als Uke + Koshiki-no-kata"], ["itsutsu-kime", "Itsutsu-no-kata als Uke + Kime-no-kata"], ["andere-koshiki", "andere Dan-Kata als Uke + Koshiki-no-kata"], ["andere-kime", "andere Dan-Kata als Uke + Kime-no-kata"]] },
      { key: "theorie", kind: "Theorie", title: "Thema auswählen", label: "Themenbereich", requirement: ["Theorie", "eine Wahlaufgabe"], options: [["rumpf", "Rumpfstabilität, Gelenkwinkel und Kraftübertragung"], ["offene-aufgaben", "Technikvermittlung durch offene Aufgabenstellungen"], ["seiryoku", "Seiryoku-zenyo und Jita-kyoei ab ca. 1920"]] },
      { key: "wahlbereich", kind: "Ein Wahlbereich", title: "Schwerpunkt auswählen", label: "Nachweis zum 5. Dan", requirement: ["Wahlbereich", "Lizenz · Wettkampf oder Kata"], options: [["lizenz", "Lizenzen · Trainer-A oder Bundes-A-Lizenz"], ["wettkampf", "Wettkampf · 10 Kampfpunkte, Handlungsketten und Periodisierung"], ["kata", "Kata · Uke oder Tori nach den zugelassenen Alternativen"]] },
    ],
  },
  dan6: {
    intro: "Der 6. Dan kann durch Prüfung erworben werden. Neben dem Technikprogramm sind zwei Kata-Demonstrationen, Theorie, Engagement und ein Wahlbereich nachzuweisen.",
    cards: [
      { key: "kata", kind: "Bewertete Kata", title: "Prüfungs-Kata auswählen", label: "Als Tori · mindestens 75 %", requirement: ["Bewertete Kata", "eine Kata als Tori in Prüfungssituation"], options: [["nage", "Nage-no-kata"], ["katame", "Katame-no-kata"], ["ju", "Ju-no-kata"], ["kime", "Kime-no-kata"], ["goshinjutsu", "Kodokan Goshinjutsu"], ["koshiki", "Koshiki-no-kata"]] },
      { key: "kata-oeffentlich", kind: "Öffentliche Kata", title: "Demonstration auswählen", label: "Als Tori bei einer DJB-Veranstaltung", requirement: ["Öffentliche Kata", "eine Kata als Tori bei DJB-Veranstaltung"], options: [["nage", "Nage-no-kata"], ["katame", "Katame-no-kata"], ["ju", "Ju-no-kata"], ["kime", "Kime-no-kata"], ["goshinjutsu", "Kodokan Goshinjutsu"], ["koshiki", "Koshiki-no-kata"]] },
      { key: "theorie", kind: "Theorie", title: "Nachweis auswählen", label: "Vorab von der Kommission akzeptieren lassen", requirement: ["Theorie", "Veröffentlichung oder nachhaltiges Judo-Projekt"], options: [["veroeffentlichung", "Veröffentlichung zur Theoriebildung des Judo"], ["projekt", "Projekt zur nachhaltigen Förderung des Judo"]] },
      { key: "engagement", kind: "Engagement", title: "Nachweis vormerken", label: "Vorgabe", requirement: ["Engagement", "besonderes Engagement nach DJB-Ehrenordnung"], options: [["nachweis", "Besonderes Engagement im Sinne der DJB-Ehrenordnung"]] },
      { key: "wahlbereich", kind: "Ein Wahlbereich", title: "Schwerpunkt auswählen", label: "Nachweis zum 6. Dan", requirement: ["Wahlbereich", "Lizenz · Wettkampf oder Kata"], options: [["lizenz", "Lizenzen · Diplomtrainer oder EJU/IJF-Lizenz"], ["wettkampf", "Wettkampf · internationale Erfolge oder Kämpferprofil"], ["kata", "Kata · internationale Medaille oder zwei Kata-Analysen"]] },
    ],
  },
};

function danCardsForDegree(degreeId = state?.degree) {
  return danPrograms[degreeId]?.cards || [];
}

function validDanOption(degreeId, key, value) {
  return danCardsForDegree(degreeId).some((card) => card.key === key && card.options.some(([id]) => id === value));
}

const notices = [
  { type: "Widerspruch", title: "Zählweise der Nage-waza", text: "Die Pool-Übersicht zählt 16 + 12 + 32 + 9 = 69 Nage-waza, während ihr Anhang „Nage-waza, 68“ ausweist. Alle in der Übersicht namentlich aufgeführten Techniken bleiben hier sichtbar; Zählwerte werden nicht als Prüfungsanforderung verwendet." },
  { type: "Widerspruch", title: "Abweichende Technikbezeichnungen", text: "Die Pool-Übersicht nennt „Ko-soko-gari“ und „Okure-ashi-harai“. Das Grundprogramm-Poster bezeichnet die gezeigte Technik dagegen als „Ko-soto-gake“, das Erweiterungsprogramm-Poster als „Okuri-ashi-barai“. Die Anwendung führt Ko-soto-gari bzw. Okuri-ashi-barai; beim Ko-soto-Eintrag bleibt die Posterreferenz deshalb ausdrücklich als Quellenabweichung markiert." },
  { type: "Widerspruch", title: "Hara-gatame: Poster vs. Pool", text: "Das DJB-Poster zum Erweiterungsprogramm Boden zeigt Hara-gatame. In der offiziellen Pool-Tabelle ist Hara-gatame jedoch den Kansetsu-waza des Masterprogramms zugeordnet; das historische Programm enthält dort ausschließlich Do-jime. Hara-gatame wird deshalb in dieser Anwendung nicht als Kyu-Technik auswählbar gemacht." },
];

const fallTechniquesByDegree = {
  "8": {
    intro: "Für den Einstiegsgürtel ist kein festes Ukemi-Repertoire vorgegeben. Die sichere Grundidee bleibt: fallen lernen, ohne sich zu verletzen.",
    items: [["Sicher fallen", "Grundverständnis: verletzungsfrei fallen lernen."]],
  },
  "7": {
    intro: "Aus dem Stand; bei der Lernzielkontrolle ist jeweils eine Seite gefordert.",
    items: [
      ["Rückwärts", "Eine Seite"],
      ["Seitwärts", "Eine Seite"],
      ["Rolle", "Eine Seite"],
    ],
  },
  "6": {
    intro: "Aus dem Stand und jeweils zu beiden Seiten.",
    items: [
      ["Rückwärts mit Rolle", "Beide Seiten"],
      ["Seitwärts", "Beide Seiten"],
      ["Rolle vorwärts", "Beide Seiten"],
    ],
  },
  "5": {
    intro: "Aus dem Gehen und jeweils rechts wie links.",
    items: [
      ["Rückwärts", "Aus dem Gehen · rechts und links"],
      ["Seitwärts", "Aus dem Gehen · rechts und links"],
      ["Rolle", "Aus dem Gehen · rechts und links"],
    ],
  },
  "4": {
    intro: "Aus der zügigen Bewegung und jeweils zu beiden Seiten.",
    items: [
      ["Rückwärts", "Zügige Bewegung · beide Seiten"],
      ["Seitwärts", "Zügige Bewegung · beide Seiten"],
      ["Rolle", "Zügige Bewegung · beide Seiten"],
    ],
  },
  "3": {
    intro: "Alle bisherigen Ukemi werden aus der zügigen Bewegung beidseitig verlangt; der freie Fall kommt hinzu.",
    items: [
      ["Rückwärts", "Zügige Bewegung · beide Seiten"],
      ["Seitwärts", "Zügige Bewegung · beide Seiten"],
      ["Rolle", "Zügige Bewegung · beide Seiten"],
      ["Freier Fall", "Zusätzliche Falltechnik"],
    ],
  },
  "2": {
    intro: "Alle bisher erlernten Ukemi sind gefordert.",
    items: [["Alle bisherigen Ukemi", "Rückwärts, seitwärts, Rollen und freier Fall sicher beherrschen."]],
  },
  "1": {
    intro: "Alle bisher erlernten Ukemi sind gefordert.",
    items: [["Alle bisherigen Ukemi", "Rückwärts, seitwärts, Rollen und freier Fall sicher beherrschen."]],
  },
  dan1: {
    intro: "Für den 1. Dan weist das Anforderungsprofil keine zusätzliche, eigenständige Ukemi-Anforderung aus.",
    items: [["Keine zusätzliche Vorgabe", "Die Ukemi-Anforderungen werden im 1.-Dan-Profil nicht gesondert aufgeführt."]],
  },
  dan2: {
    intro: "Für den 2. Dan weist das Anforderungsprofil keine zusätzliche, eigenständige Ukemi-Anforderung aus.",
    items: [["Keine zusätzliche Vorgabe", "Die Ukemi-Anforderungen werden im 2.-Dan-Profil nicht gesondert aufgeführt."]],
  },
  dan3: {
    intro: "Für den 3. Dan weist das Anforderungsprofil keine zusätzliche, eigenständige Ukemi-Anforderung aus.",
    items: [["Keine zusätzliche Vorgabe", "Die Ukemi-Anforderungen werden im 3.-Dan-Profil nicht gesondert aufgeführt."]],
  },
  dan4: {
    intro: "Für den 4. Dan weist das Anforderungsprofil keine zusätzliche, eigenständige Ukemi-Anforderung aus.",
    items: [["Keine zusätzliche Vorgabe", "Die Ukemi-Anforderungen werden im 4.-Dan-Profil nicht gesondert aufgeführt."]],
  },
  dan5: {
    intro: "Für den 5. Dan weist das Anforderungsprofil keine zusätzliche, eigenständige Ukemi-Anforderung aus.",
    items: [["Keine zusätzliche Vorgabe", "Die Ukemi-Anforderungen werden im 5.-Dan-Profil nicht gesondert aufgeführt."]],
  },
  dan6: {
    intro: "Für den 6. Dan weist das Anforderungsprofil keine zusätzliche, eigenständige Ukemi-Anforderung aus.",
    items: [["Keine zusätzliche Vorgabe", "Die Ukemi-Anforderungen werden im 6.-Dan-Profil nicht gesondert aufgeführt."]],
  },
};

const standardSituationsByDegree = {
  "7": [
    ["stand-boden", "Übergang Stand → Boden", "Nach einem Wurfansatz kontrolliert zum Halten übergehen."],
  ],
  "6": [
    ["stand-boden", "Übergang Stand → Boden", "Wiederholung der Lösung aus dem 7. Kyu."],
    ["bauchlage-osae", "Bauchlage → Osaekomi", "Uke aus der Bauchlage in eine Haltetechnik umdrehen."],
  ],
  "5": [
    ["stand-boden", "Übergang Stand → Boden", "Wiederholung der bisherigen Lösung."],
    ["bauchlage-osae", "Bauchlage → Osaekomi", "Uke aus der Bauchlage kontrollieren."],
    ["beinklammer-loesen", "Beinklammer lösen", "Die Beinklammer funktional auflösen."],
    ["bank-angriff", "Angriff gegen die Bank", "Eine Lösung gegen Ukes Bankposition erarbeiten."],
  ],
  "4": [
    ["stand-boden", "Übergang Stand → Boden", "Wiederholung der bisherigen Lösung."],
    ["bauchlage-osae", "Bauchlage → Osaekomi", "Uke aus der Bauchlage kontrollieren."],
    ["beinklammer-loesen", "Beinklammer lösen", "Die Beinklammer funktional auflösen."],
    ["bank-angriff", "Angriff gegen die Bank", "Eine Lösung gegen Ukes Bankposition erarbeiten."],
    ["eigene-rueckenlage", "Angriff aus eigener Rückenlage", "Aus der Unterlage eine günstige Angriffsposition schaffen."],
    ["gegner-rueckenlage", "Angriff gegen gegnerische Rückenlage", "Gegner in Rückenlage kontrollieren oder angreifen."],
  ],
  "3": [
    ["stand-boden", "Übergang Stand → Boden", "Wiederholung der bisherigen Lösung."],
    ["bauchlage-osae", "Bauchlage → Osaekomi", "Uke aus der Bauchlage kontrollieren."],
    ["beinklammer-loesen", "Beinklammer lösen", "Die Beinklammer funktional auflösen."],
    ["bank-angriff", "Angriff gegen die Bank", "Eine Lösung gegen Ukes Bankposition erarbeiten."],
    ["eigene-rueckenlage", "Angriff aus eigener Rückenlage", "Aus der Unterlage eine günstige Angriffsposition schaffen."],
    ["gegner-rueckenlage", "Angriff gegen gegnerische Rückenlage", "Gegner in Rückenlage kontrollieren oder angreifen."],
    ["positionswechsel", "Positionswechsel", "Von einer Verteidigungsposition in eine günstige Angriffsposition wechseln."],
  ],
  "2": [
    ["stand-boden", "Übergang Stand → Boden", "Wiederholung der bisherigen Lösung."],
    ["bauchlage-osae", "Bauchlage → Osaekomi", "Uke aus der Bauchlage kontrollieren."],
    ["beinklammer-loesen", "Beinklammer lösen", "Die Beinklammer funktional auflösen."],
    ["bank-angriff", "Angriff gegen die Bank", "Eine Lösung gegen Ukes Bankposition erarbeiten."],
    ["eigene-rueckenlage", "Angriff aus eigener Rückenlage", "Aus der Unterlage eine günstige Angriffsposition schaffen."],
    ["gegner-rueckenlage", "Angriff gegen gegnerische Rückenlage", "Gegner in Rückenlage kontrollieren oder angreifen."],
    ["positionswechsel-1", "Positionswechsel · 1", "Von einer Verteidigungsposition in eine günstige Angriffsposition wechseln."],
    ["positionswechsel-2", "Positionswechsel · 2", "Einen zweiten Positionswechsel mit anderer Ausgangslage planen."],
  ],
  "1": [
    ["stand-boden-ai", "Übergang Stand → Boden · Ai-yotsu", "Eine Situationslösung aus Gleichgriff planen."],
    ["stand-boden-kenka", "Übergang Stand → Boden · Kenka-yotsu", "Eine Situationslösung aus Gegengriff planen."],
    ["stand-boden", "Übergang Stand → Boden", "Wiederholung einer früheren Situationslösung."],
    ["bauchlage-osae", "Bauchlage → Osaekomi", "Uke aus der Bauchlage kontrollieren."],
    ["beinklammer-loesen", "Beinklammer lösen", "Die Beinklammer funktional auflösen."],
    ["bank-angriff", "Angriff gegen die Bank", "Eine Lösung gegen Ukes Bankposition erarbeiten."],
    ["eigene-rueckenlage", "Angriff aus eigener Rückenlage", "Aus der Unterlage eine günstige Angriffsposition schaffen."],
    ["gegner-rueckenlage", "Angriff gegen gegnerische Rückenlage", "Gegner in Rückenlage kontrollieren oder angreifen."],
    ["positionswechsel-1", "Positionswechsel · 1", "Von einer Verteidigungsposition in eine günstige Angriffsposition wechseln."],
    ["positionswechsel-2", "Positionswechsel · 2", "Einen zweiten Positionswechsel mit anderer Ausgangslage planen."],
    ["positionswechsel-3", "Positionswechsel · 3", "Einen dritten Positionswechsel mit anderer Ausgangslage planen."],
  ],
  "dan1": [
    ["bank-bauch-ober", "Bank-/Bauchlage · Oberlage", "Mindestens eine Lösung aus der Oberlage demonstrieren."],
    ["bank-bauch-unter", "Bank-/Bauchlage · Unterlage", "Mindestens eine Lösung aus der Unterlage demonstrieren."],
    ["beinklammer-ober", "Beinklammer · Oberlage", "Mindestens eine Lösung aus der Oberlage demonstrieren."],
    ["beinklammer-unter", "Beinklammer · Unterlage", "Mindestens eine Lösung aus der Unterlage demonstrieren."],
    ["rueckenlage-ober", "Rückenlage · Oberlage", "Partner zwischen den Beinen: mindestens eine Lösung aus der Oberlage."],
    ["rueckenlage-unter", "Rückenlage · Unterlage", "Partner zwischen den Beinen: mindestens eine Lösung aus der Unterlage."],
    ["stand-boden", "Übergang Stand → Boden", "Eine Katame-waza als Abschluss eines Übergangs planen."],
  ],
  "dan2": [
    ["bank-bauch", "Bank-/Bauchlage", "Katame-waza als Lösung einer Standardsituation einplanen."],
    ["beinklammer", "Beinklammer", "Katame-waza als Lösung einer Standardsituation einplanen."],
    ["rueckenlage", "Rückenlage", "Katame-waza als Lösung einer Standardsituation einplanen."],
    ["stand-boden", "Übergang Stand → Boden", "Katame-waza als Lösung einer Standardsituation einplanen."],
  ],
  "dan3": [
    ["bank-bauch-ober", "Bank-/Bauchlage · Oberlage", "Zwei verzweigte Handlungsketten aus Oberlage ergänzen."],
    ["bank-bauch-unter", "Bank-/Bauchlage · Unterlage", "Zwei verzweigte Handlungsketten aus Unterlage ergänzen."],
    ["eigene-rueckenlage", "Eigene Rückenlage", "Prinzipien der Umdrehtechniken erläutern."],
  ],
};

const standardSituationIds = new Set(
  Object.entries(standardSituationsByDegree).flatMap(([degree, situations]) => situations.map(([id]) => `${degree}:${id}`)),
);

const gradeNotes = {
  "8": "Der 8. Kyu ist ein Einstiegsgürtel; die aktuelle Kyu-Anforderung schreibt keinen Auswahlumfang aus dem Technikpool vor.",
  "7": "Die drei Würfe sollen aus dem Grundprogramm kommen; Kesa-, Tate-shiho-, Yoko-shiho- und Kami-shiho-gatame sind konkret benannt.",
  "6": "Vier weitere Haltetechniken können eigenständige Kodokan/IJF-Techniken oder Varianten sein. Die Karte zählt deshalb nur die Technik-Planung, nicht Variantenwechsel.",
  "5": "Die vier Befreiungs- und vier Situationslösungen sind Aufgaben, keine fest vorgegebenen Einzeltechniken. Sie stehen nicht als auswählbare Karte im Raster.",
  "4": "Neben zwölf Würfen sind O-soto-gari, Harai-goshi und Uchi-mata verbindlich. Bei den Hebeln sind Juji-gatame und Ude-garami verbindlich plus eine Wahltechnik.",
  "3": "15 Würfe, davon drei aus dem Erweiterungsprogramm; Tomoe-nage und Tani-otoshi sowie Hiza- und Sankaku-gatame sind verbindlich.",
  "2": "18 Würfe, davon sechs aus dem Erweiterungsprogramm; Sumi-gaeshi und Soto-makikomi sowie Gyaku-juji- und Okuri-eri-jime sind verbindlich.",
  "1": "20 Würfe, davon neun aus dem Erweiterungsprogramm; Ura-nage und Ko-uchi-makikomi sowie Sode-guruma- und Okuri-eri-jime sind verbindlich. Zusätzlich ca. 10 Aktionen aus einem individuellen Schwerpunkt.",
  "dan1": "Zum 1. Dan sind alle Gokyo-no-waza aus freien Interaktionen gefordert. Bei Katame-waza je eine Variante jeder Technik aus Grund- und Erweiterungsprogramm als Situationslösung; Kata und ein Wahlbereich bleiben zusätzlich erforderlich.",
  "dan2": "Zum 2. Dan sind alle Gokyo-no-waza, zwölf Shinmeisho-/Habukareta-waza sowie alle Katame-waza außer Ashi-garami und Do-jime gefordert. Die zwölf zusätzlichen Würfe werden individuell zusammengestellt.",
  "dan3": "Zum 3. Dan gelten Gokyo, zwölf Shinmeisho-/Habukareta-waza und alle Katame-waza außer Ashi-garami und Do-jime. Zusätzlich werden Kombinationen/Finten, Kontertechniken, Handlungsketten, Kata, Theorie und ein Wahlbereich nachgewiesen.",
  "dan4": "Zum 4. Dan werden Te-, Koshi- und Ashi-waza sowie Osaekomi-waza aus dem Gesamtprogramm des Kodokan an vom Prüfer gewählten Beispielen demonstriert und erläutert. Die Auswahlkarten dienen der individuellen Vorbereitung, nicht einer fest vorgeschriebenen Technikanzahl.",
  "dan5": "Zum 5. Dan werden Ma- und Yoko-sutemi-waza (außer Kawazu-gake und Kani-basami) sowie Kansetsu- und Shime-waza an vom Prüfer gewählten Beispielen demonstriert und erläutert.",
  "dan6": "Beim 6. Dan durch Prüfung sind alle Nage-waza außer Kawazu-gake und Kani-basami sowie alle Katame-waza gefordert. Die Technik-Pflichtauswahl wird deshalb vollständig gesetzt.",
};

function defaultState() {
  return { version: DATA_VERSION, name: "Mein Prüfungsprogramm", degree: "1", selected: {}, situations: {}, danOptions: {} };
}

function readState() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return normaliseState(parsed);
  } catch {
    return defaultState();
  }
}

function normaliseState(candidate) {
  const fallback = defaultState();
  if (!candidate || typeof candidate !== "object") return fallback;
  const degree = degrees.some((item) => item.id === candidate.degree) ? candidate.degree : fallback.degree;
  const selected = {};
  if (candidate.selected && typeof candidate.selected === "object") {
    for (const [id, value] of Object.entries(candidate.selected)) {
      const technique = techniqueById.get(id);
      if (!technique) continue;
      const side = technique.turn && ["main", "opposite"].includes(value?.side) ? value.side : "neutral";
      // Ältere Programmdateien kannten die Herkunft der Auswahl nicht. Bereits
      // für den gespeicherten Grad verpflichtende Techniken werden deshalb als
      // automatisch behandelt; alle anderen gelten als bewusste Auswahl.
      const manual = typeof value?.manual === "boolean"
        ? value.manual
        : !(mandatoryByDegree[degree] || []).includes(id);
      selected[id] = { side, manual };
    }
  }
  const situations = {};
  if (candidate.situations && typeof candidate.situations === "object") {
    for (const id of Object.keys(candidate.situations)) {
      if (standardSituationIds.has(id)) situations[id] = true;
    }
  }
  const danOptions = {};
  for (const card of danCardsForDegree(degree)) {
    const value = candidate.danOptions?.[card.key];
    danOptions[card.key] = validDanOption(degree, card.key, value) ? value : "";
  }
  return { version: DATA_VERSION, name: String(candidate.name || fallback.name).slice(0, 80), degree, selected, situations, danOptions };
}

let state = readState();
let activeFilter = "all";
let searchTerm = "";
let previousTechniqueView = null;

const elements = {
  degreeSelect: document.querySelector("#degree-select"),
  resetSelection: document.querySelector("#reset-selection"),
  name: document.querySelector("#program-name"),
  degreeCard: document.querySelector("#degree-card"),
  requirements: document.querySelector("#requirements"),
  completion: document.querySelector("#completion"),
  note: document.querySelector("#program-note"),
  notices: document.querySelector("#notices"),
  printDegreeName: document.querySelector("#print-degree-name"),
  fallSection: document.querySelector("#falltechniken"),
  fallIntro: document.querySelector("#fall-intro"),
  fallGrid: document.querySelector("#fall-grid"),
  situationsSection: document.querySelector("#situationen"),
  situationsIntro: document.querySelector("#situations-intro"),
  situationsGrid: document.querySelector("#situation-grid"),
  situationsSummary: document.querySelector("#situations-summary"),
  danOptionsSection: document.querySelector("#dan-optionen"),
  danOptionsLabel: document.querySelector("#dan-options-label"),
  danOptionsTitle: document.querySelector("#dan-options-title"),
  danOptionsIntro: document.querySelector("#dan-options-intro"),
  danOptionGrid: document.querySelector("#dan-option-grid"),
  groups: document.querySelector("#technique-groups"),
  selectedSummary: document.querySelector("#selected-summary"),
  search: document.querySelector("#search-input"),
  feedback: document.querySelector("#feedback"),
  importInput: document.querySelector("#import-input"),
  printExit: document.querySelector("#print-exit"),
};

function persist() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch { /* private browser mode */ }
}

function isSelected(id) { return Boolean(state.selected[id]); }
function selectedTechniques() { return techniques.filter((item) => isSelected(item.id)); }
function countSelected(predicate) { return selectedTechniques().filter(predicate).length; }
function selectedRequired(ids) { return ids.filter(isSelected).length; }
function degree() { return degrees.find((item) => item.id === state.degree); }

function isSelectableForCurrentDegree(item) {
  if (state.degree === "8") return false;
  if (["7", "6", "5", "4"].includes(state.degree)) return item.pool === "grund";
  if (["3", "2", "1"].includes(state.degree)) return ["grund", "erweiterung"].includes(item.pool);
  if (state.degree === "dan1") {
    return Boolean(item.gokyo) || (item.area === "boden" && ["grund", "erweiterung"].includes(item.pool));
  }
  if (["dan2", "dan3"].includes(state.degree)) {
    return item.area === "stand" || (item.area === "boden" && item.id !== "do-jime");
  }
  if (state.degree === "dan4") {
    return ["stand-te", "stand-koshi", "stand-ashi", "boden-osae"].includes(item.group);
  }
  if (state.degree === "dan5") {
    return ["stand-ma", "stand-yoko", "boden-kansetsu", "boden-shime"].includes(item.group)
      && !["kani-basami", "kawazu-gake"].includes(item.id);
  }
  if (state.degree === "dan6") return !["kani-basami", "kawazu-gake"].includes(item.id);
  return false;
}

function pruneUnavailableSelections() {
  let removed = 0;
  for (const id of Object.keys(state.selected)) {
    const item = techniqueById.get(id);
    if (!item || !isSelectableForCurrentDegree(item)) {
      delete state.selected[id];
      removed += 1;
    }
  }
  return removed;
}

function pruneAutomaticSelections() {
  let removed = 0;
  for (const [id, selection] of Object.entries(state.selected)) {
    if (selection?.manual) continue;
    delete state.selected[id];
    removed += 1;
  }
  return removed;
}

function ensureMandatorySelections() {
  let added = 0;
  for (const id of mandatoryByDegree[state.degree] || []) {
    const item = techniqueById.get(id);
    if (!item || state.selected[id]) continue;
    state.selected[id] = { side: item.turn ? "main" : "neutral", manual: false };
    added += 1;
  }
  return added;
}

function situationsForCurrentDegree() {
  return (standardSituationsByDegree[state.degree] || []).map(([id, title, detail]) => ({
    id: `${state.degree}:${id}`,
    title,
    detail,
  }));
}

function isSituationSelected(id) { return Boolean(state.situations[id]); }

function selectedSituationCount() {
  return situationsForCurrentDegree().filter((situation) => isSituationSelected(situation.id)).length;
}

function pruneUnavailableSituations() {
  let removed = 0;
  const valid = new Set(situationsForCurrentDegree().map((situation) => situation.id));
  for (const id of Object.keys(state.situations)) {
    if (!valid.has(id)) {
      delete state.situations[id];
      removed += 1;
    }
  }
  return removed;
}

function showSideSelection(item) {
  const kyuRequirement = Boolean(sideRequirementsByDegree[state.degree]);
  const danCompetitionRequirement = state.degree === "dan2" && state.danOptions.wahlbereich === "wettkampf";
  return (kyuRequirement || danCompetitionRequirement) && item.turn && isSelected(item.id);
}

function requiredForCurrentDegree(item) {
  return (mandatoryByDegree[state.degree] || []).includes(item.id);
}

function requirementDefinitions() {
  const selectedStand = () => countSelected((item) => item.area === "stand");
  const selectedTurns = (side) => countSelected((item) => item.area === "stand" && item.turn && state.selected[item.id]?.side === side);
  const selectedFoot = () => countSelected((item) => item.group === "stand-ashi");
  const extensionThrows = () => countSelected((item) => item.area === "stand" && item.pool === "erweiterung");
  const selectedHolds = () => countSelected((item) => item.group === "boden-osae");
  const selectedLevers = () => countSelected((item) => item.group === "boden-kansetsu");
  const selectedChokes = () => countSelected((item) => item.group === "boden-shime");
  const required = (ids) => ({ current: selectedRequired(ids), needed: ids.length });
  const totalGokyo = () => new Set(selectedTechniques().filter((item) => item.gokyo).map((item) => item.gokyo)).size;
  const selectedOutsideGokyoThrows = () => countSelected((item) => item.area === "stand" && !item.gokyo);
  const selectedSituations = () => selectedSituationCount();
  const danOptionRequirements = () => danCardsForDegree(state.degree).map((card) => [
    card.requirement[0],
    () => state.danOptions[card.key] ? 1 : 0,
    1,
    card.requirement[1],
  ]);

  const basics = {
    "7": [
      ["Würfe", selectedStand, 3, "aus dem Grundprogramm"],
      ["Hauptseite", () => selectedTurns("main"), 1, "Eindrehtechnik"],
      ["Gegenseite", () => selectedTurns("opposite"), 1, "Eindrehtechnik"],
      ["Fußtechnik", selectedFoot, 1, "Ashi-waza"],
      ["Halten", () => required(mandatoryByDegree["7"]).current, 4, "4 konkret benannte Osaekomi-waza"],
    ],
    "6": [["Würfe", selectedStand, 6, "aus dem Grundprogramm"], ["Hauptseite", () => selectedTurns("main"), 2, "Eindrehtechniken"], ["Gegenseite", () => selectedTurns("opposite"), 2, "Eindrehtechniken"], ["Fußtechniken", selectedFoot, 2, "Ashi-waza"], ["Halten", selectedHolds, 4, "weitere Haltegriffe / Varianten"]],
    "5": [["Würfe", selectedStand, 9, "aus dem Grundprogramm"], ["Hauptseite", () => selectedTurns("main"), 3, "Eindrehtechniken"], ["Gegenseite", () => selectedTurns("opposite"), 3, "Eindrehtechniken"], ["Fußtechniken", selectedFoot, 3, "Ashi-waza"]],
    "4": [["Würfe", selectedStand, 12, "aus dem Grundprogramm"], ["Hauptseite", () => selectedTurns("main"), 3, "Eindrehtechniken"], ["Gegenseite", () => selectedTurns("opposite"), 3, "Eindrehtechniken"], ["Pflichtwürfe", () => required(["o-soto-gari", "harai-goshi", "uchi-mata"]).current, 3, "O-soto-gari · Harai-goshi · Uchi-mata"], ["Hebel", selectedLevers, 3, "inkl. Juji- & Ude-garami"]],
    "3": [["Würfe", selectedStand, 15, "gesamt"], ["Erweiterung", extensionThrows, 3, "Würfe aus dem Erweiterungsprogramm"], ["Pflichtwürfe", () => required(["tomoe-nage", "tani-otoshi"]).current, 2, "Tomoe-nage · Tani-otoshi"], ["Erweiterungshebel", () => countSelected((item) => item.pool === "erweiterung" && item.group === "boden-kansetsu"), 4, "inkl. Hiza- & Sankaku-gatame"], ["Pflichthebel", () => required(["hiza-gatame", "sankaku-gatame"]).current, 2, "Hiza- & Sankaku-gatame"]],
    "2": [["Würfe", selectedStand, 18, "gesamt"], ["Erweiterung", extensionThrows, 6, "Würfe aus dem Erweiterungsprogramm"], ["Pflichtwürfe", () => required(["sumi-gaeshi", "soto-makikomi"]).current, 2, "Sumi-gaeshi · Soto-makikomi"], ["Würgetechniken", selectedChokes, 3, "aus Grund- & Erweiterungsprogramm"], ["Pflichtwürgen", () => required(["gyaku-juji-jime", "okuri-eri-jime"]).current, 2, "Gyaku-juji- & Okuri-eri-jime"]],
    "1": [["Würfe", selectedStand, 20, "gesamt"], ["Erweiterung", extensionThrows, 9, "Würfe aus dem Erweiterungsprogramm"], ["Pflichtwürfe", () => required(["ura-nage", "ko-uchi-makikomi"]).current, 2, "Ura-nage · Ko-uchi-makikomi"], ["Würgetechniken", selectedChokes, 4, "aus Grund- & Erweiterungsprogramm"], ["Pflichtwürgen", () => required(["sode-guruma-jime", "okuri-eri-jime"]).current, 2, "Sode-guruma- & Okuri-eri-jime"]],
    "dan1": [
      ["Gokyo-no-waza", totalGokyo, gokyoKeys.length, "jede Gokyo-Familie aus freier Interaktion"],
      ["Katame-waza", () => selectedRequired(danGroundIds), danGroundIds.length, "je eine Variante aus Grund- & Erweiterungsprogramm"],
      ...danOptionRequirements(),
    ],
    "dan2": [
      ["Gokyo-no-waza", totalGokyo, gokyoKeys.length, "jede Gokyo-Technik aus freien Interaktionen"],
      ["Weitere Würfe", selectedOutsideGokyoThrows, 12, "12 Shinmeisho-/Habukareta-waza"],
      ["Katame-waza", () => selectedRequired(allKatameExceptDoJimeIds), allKatameExceptDoJimeIds.length, "alle außer Do-jime; Ashi-garami ist nicht im Pool"],
      ...danOptionRequirements(),
    ],
    "dan3": [
      ["Gokyo-no-waza", totalGokyo, gokyoKeys.length, "jede Gokyo-Technik aus freien Interaktionen"],
      ["Weitere Würfe", selectedOutsideGokyoThrows, 12, "12 Shinmeisho-/Habukareta-waza"],
      ["Katame-waza", () => selectedRequired(allKatameExceptDoJimeIds), allKatameExceptDoJimeIds.length, "alle außer Do-jime; Ashi-garami ist nicht im Pool"],
      ...danOptionRequirements(),
    ],
    "dan4": [
      ["Te-waza", () => countSelected((item) => item.group === "stand-te"), 1, "mindestens ein Beispiel für die individuelle Vorbereitung"],
      ["Koshi-waza", () => countSelected((item) => item.group === "stand-koshi"), 1, "mindestens ein Beispiel für die individuelle Vorbereitung"],
      ["Ashi-waza", () => countSelected((item) => item.group === "stand-ashi"), 1, "mindestens ein Beispiel für die individuelle Vorbereitung"],
      ["Osaekomi-waza", () => countSelected((item) => item.group === "boden-osae"), 1, "mindestens ein Beispiel einschließlich Befreiung"],
      ...danOptionRequirements(),
    ],
    "dan5": [
      ["Ma-sutemi-waza", () => countSelected((item) => item.group === "stand-ma"), 1, "mindestens ein Beispiel für die individuelle Vorbereitung"],
      ["Yoko-sutemi-waza", () => countSelected((item) => item.group === "stand-yoko"), 1, "mindestens ein Beispiel; Kawazu-gake und Kani-basami ausgeschlossen"],
      ["Kansetsu-waza", () => countSelected((item) => item.group === "boden-kansetsu"), 1, "mindestens ein Beispiel einschließlich Verteidigung"],
      ["Shime-waza", () => countSelected((item) => item.group === "boden-shime"), 1, "mindestens ein Beispiel einschließlich Verteidigung"],
      ...danOptionRequirements(),
    ],
    "dan6": [
      ["Nage-waza", () => selectedRequired(dan6TechniqueIds.filter((id) => techniqueById.get(id)?.area === "stand")), dan6TechniqueIds.filter((id) => techniqueById.get(id)?.area === "stand").length, "alle außer Kawazu-gake und Kani-basami"],
      ["Katame-waza", () => selectedRequired(dan6TechniqueIds.filter((id) => techniqueById.get(id)?.area === "boden")), dan6TechniqueIds.filter((id) => techniqueById.get(id)?.area === "boden").length, "alle Katame-waza"],
      ...danOptionRequirements(),
    ],
  };
  if (state.degree === "8") return [["Einstieg", () => 0, 0, "kein Technikpool-Umfang festgelegt"]];
  const situationCount = situationsForCurrentDegree().length;
  if (situationCount) {
    basics[state.degree].push([
      "Standardsituationen",
      selectedSituations,
      situationCount,
      state.degree.startsWith("dan") ? "Situationslösungen für diesen Dan-Grad" : "Situationslösungen für diesen Grad",
    ]);
  }
  if (state.degree === "dan2" && state.danOptions.wahlbereich === "wettkampf") {
    basics[state.degree].push(
      ["Hauptseite", () => selectedTurns("main"), 2, "zwei Eindrehtechniken im Wahlbereich Wettkampf"],
      ["Gegenseite", () => selectedTurns("opposite"), 2, "zwei Eindrehtechniken im Wahlbereich Wettkampf"],
    );
  }
  return basics[state.degree] || [];
}

function renderDegreeSelect() {
  elements.degreeSelect.innerHTML = degrees.map((item) => `<option value="${item.id}">${item.label}</option>`).join("");
  elements.degreeSelect.value = state.degree;
  elements.name.value = state.name;
}

function renderDegreeCard() {
  const current = degree();
  elements.degreeCard.style.setProperty("--degree-color", current.color);
  elements.degreeCard.innerHTML = `<strong>${current.short}</strong><span>${current.description}</span>`;
  elements.printDegreeName.textContent = current.label;
}

function renderFallTechniques() {
  const requirement = fallTechniquesByDegree[state.degree];
  elements.fallSection.hidden = !requirement;
  if (!requirement) return;
  elements.fallIntro.textContent = requirement.intro;
  elements.fallGrid.innerHTML = requirement.items.map(([title, detail]) => `<article class="fall-card">
    <span class="fall-card-kind">Ukemi</span>
    <strong>${title}</strong>
    <small>${detail}</small>
  </article>`).join("");
}

function renderRequirements() {
  const definitions = requirementDefinitions();
  const countable = definitions.filter(([, , needed]) => needed > 0);
  const complete = countable.filter(([, getCurrent, needed]) => getCurrent() >= needed).length;
  elements.completion.innerHTML = `${complete}/${countable.length} <small>erfüllt</small>`;
  elements.requirements.innerHTML = definitions.map(([title, getCurrent, needed, detail]) => {
    const current = getCurrent();
    const isComplete = needed === 0 || current >= needed;
    return `<article class="requirement ${isComplete ? "is-complete" : "is-alert"}">
      <span class="requirement-title">${title}</span>
      <span class="requirement-value">${needed === 0 ? "—" : `${current} / ${needed}`}</span>
      <span class="requirement-detail">${detail}</span>
    </article>`;
  }).join("");
  elements.note.textContent = gradeNotes[state.degree];
}

function renderSituations() {
  const situations = situationsForCurrentDegree();
  elements.situationsSection.hidden = situations.length === 0;
  if (!situations.length) return;
  const selected = selectedSituationCount();
  elements.situationsSummary.textContent = `${selected} / ${situations.length} geplant`;
  elements.situationsIntro.textContent = state.degree === "dan1"
    ? "Für jede Lage eine passende Katame-waza als Situationslösung planen; Ober- und Unterlage getrennt berücksichtigen."
    : "Jede Karte steht für eine geforderte Situationslösung. Erst mit dem Häkchen ist sie Teil deines Programms.";
  elements.situationsGrid.innerHTML = situations.map((situation) => {
    const isSelected = isSituationSelected(situation.id);
    return `<button class="situation-card ${isSelected ? "is-selected" : ""}" type="button" data-situation-toggle="${situation.id}" aria-pressed="${isSelected}">
      <span class="situation-check" aria-hidden="true">✓</span>
      <span class="situation-content"><strong>${situation.title}</strong><small>${situation.detail}</small></span>
    </button>`;
  }).join("");
}

function renderDanOptions() {
  const program = danPrograms[state.degree];
  elements.danOptionsSection.hidden = !program;
  if (!program) return;
  const current = degree();
  elements.danOptionsLabel.textContent = `${current.short} · Ergänzungen`;
  elements.danOptionsTitle.textContent = "Dan-Nachweise festlegen";
  elements.danOptionsIntro.textContent = program.intro;
  elements.danOptionGrid.innerHTML = program.cards.map((card) => {
    const value = state.danOptions[card.key] || "";
    const options = `<option value="">Bitte auswählen …</option>${card.options.map(([id, label]) => `<option value="${id}" ${value === id ? "selected" : ""}>${label}</option>`).join("")}`;
    const selectId = `dan-option-${card.key}`;
    return `<article class="dan-option-card ${value ? "is-selected" : ""}">
      <p class="dan-option-kind">${card.kind}</p>
      <h3>${card.title}</h3>
      <label for="${selectId}">${card.label}</label>
      <select id="${selectId}" name="${selectId}" data-dan-option="${card.key}">${options}</select>
    </article>`;
  }).join("");
}

function renderNotices() {
  elements.notices.innerHTML = notices.map((notice) => `<article class="notice">
    <span class="notice-tag">${notice.type}</span><h3>${notice.title}</h3><p>${notice.text}</p>
  </article>`).join("");
}

function fallbackPictogram() {
  return '<span class="comic-illustration comic-illustration--fallback" aria-hidden="true"><img src="assets/illustrations/technik-ohne-vorlage-comic.png" alt="" /></span>';
}

function comicIllustration(item) {
  const frame = comicFrames[item.id];
  if (!frame) return fallbackPictogram(item);
  const [spriteId, column, row] = frame;
  const sprite = comicSprites[spriteId];
  if (!sprite || column >= sprite.columns || row >= sprite.rows) return fallbackPictogram();
  const file = `${spriteId}-${String(row).padStart(2, "0")}-${String(column).padStart(2, "0")}.png`;
  return `<span class="comic-illustration comic-illustration--${spriteId}" aria-hidden="true"><img src="assets/illustrations/frames/${file}" alt="" /></span>`;
}

function techniqueCard(item) {
  const selected = isSelected(item.id);
  const side = state.selected[item.id]?.side || "neutral";
  const required = requiredForCurrentDegree(item);
  const chooseSide = showSideSelection(item);
  const pool = pools[item.pool];
  const detail = item.counterOnly ? "reine Kontertechnik" : item.gokyo ? "Gokyo-no-waza" : item.category;
  return `<article class="technique-card ${selected ? "is-selected" : ""} ${required ? "is-required" : ""}" style="--pool-color:${pool.color}" data-id="${item.id}">
    <div class="card-top"><span class="card-pool">${pool.label}</span><button class="select-toggle" type="button" data-toggle="${item.id}" ${required ? "disabled" : ""} aria-label="${required ? `${item.name} ist für diesen Grad verpflichtend` : `${item.name} ${selected ? "abwählen" : "auswählen"}`}" title="${required ? "Pflichttechnik für diesen Grad" : ""}">✓</button></div>
    ${comicIllustration(item)}
    <h4>${item.name}</h4>
    <p class="technique-meta">${detail}</p>
    <div class="card-bottom"><span class="category-chip">${item.category}</span>
      ${chooseSide ? `<select class="side-select" data-side="${item.id}" aria-label="Seite für ${item.name}">
        <option value="main" ${side === "main" ? "selected" : ""}>Hauptseite</option>
        <option value="opposite" ${side === "opposite" ? "selected" : ""}>Gegenseite</option>
      </select>` : ""}
    </div>
  </article>`;
}

function filterTechniques(items) {
  const needle = searchTerm.trim().toLocaleLowerCase("de");
  return items.filter((item) => {
    if (!isSelectableForCurrentDegree(item)) return false;
    const filterMatches = activeFilter === "all" || (activeFilter === "stand" && item.area === "stand") || (activeFilter === "boden" && item.area === "boden") || (activeFilter === "required" && requiredForCurrentDegree(item)) || (activeFilter === "selected" && isSelected(item.id));
    const textMatches = !needle || `${item.name} ${item.category} ${pools[item.pool].label}`.toLocaleLowerCase("de").includes(needle);
    return filterMatches && textMatches;
  });
}

function renderTechniqueGrid() {
  const matching = filterTechniques(techniques);
  const buckets = new Map(Object.keys(groupInfo).map((key) => [key, []]));
  matching.forEach((item) => buckets.get(item.group).push(item));
  const html = [...buckets.entries()]
    .filter(([, items]) => items.length)
    .sort(([a], [b]) => groupInfo[a].order - groupInfo[b].order)
    .map(([group, items]) => `<section class="technique-group"><div class="group-header"><h3>${groupInfo[group].title}</h3><span>${items.length} Technik${items.length === 1 ? "" : "en"}</span></div><div class="technique-grid">${items.map(techniqueCard).join("")}</div></section>`)
    .join("");
  elements.groups.innerHTML = html || `<div class="empty-state">${state.degree === "8" ? "Für den 8. Kyu ist kein Technikpool-Umfang vorgegeben." : "Keine für diesen Grad wählbare Technik entspricht diesem Filter."}</div>`;
  elements.selectedSummary.textContent = `${selectedTechniques().length} Technik${selectedTechniques().length === 1 ? "" : "en"} ausgewählt`;
}

function rerender() {
  renderDegreeCard();
  renderRequirements();
  renderDanOptions();
  renderFallTechniques();
  renderTechniqueGrid();
  renderSituations();
}

function updateSelection(id) {
  const item = techniqueById.get(id);
  if (!item) return;
  if (requiredForCurrentDegree(item)) return;
  if (isSelected(id)) delete state.selected[id];
  else state.selected[id] = { side: item.turn ? "main" : "neutral", manual: true };
  persist();
  rerender();
}

function resetSelection() {
  state.selected = {};
  state.situations = {};
  state.danOptions = {};
  const addedMandatory = ensureMandatorySelections();
  persist();
  rerender();
  setFeedback(addedMandatory
    ? `Auswahl zurückgesetzt · ${addedMandatory} Pflichttechnik${addedMandatory === 1 ? " bleibt" : "en bleiben"} automatisch gesetzt.`
    : "Auswahl zurückgesetzt.");
}

function updateSituation(id) {
  if (!standardSituationIds.has(id)) return;
  if (isSituationSelected(id)) delete state.situations[id];
  else state.situations[id] = true;
  persist();
  renderRequirements();
  renderSituations();
}

function setFeedback(message) {
  elements.feedback.textContent = message;
  window.setTimeout(() => { if (elements.feedback.textContent === message) elements.feedback.textContent = ""; }, 4800);
}

function syncFilterButtons() {
  document.querySelectorAll(".filter").forEach((button) => button.classList.toggle("active", button.dataset.filter === activeFilter));
}

function enterPrintView() {
  if (!selectedTechniques().length) {
    setFeedback("Für die Druckansicht zuerst mindestens eine Technik auswählen.");
    return;
  }
  previousTechniqueView = { filter: activeFilter, search: searchTerm };
  activeFilter = "selected";
  searchTerm = "";
  elements.search.value = "";
  syncFilterButtons();
  elements.printDegreeName.textContent = degree().label;
  renderTechniqueGrid();
  document.body.classList.add("print-view");
  elements.printExit.focus();
  window.scrollTo(0, 0);
}

function leavePrintView() {
  document.body.classList.remove("print-view");
  if (previousTechniqueView) {
    activeFilter = previousTechniqueView.filter;
    searchTerm = previousTechniqueView.search;
    elements.search.value = searchTerm;
    previousTechniqueView = null;
  }
  syncFilterButtons();
  renderTechniqueGrid();
}

function safeFilename(name) {
  return (name || "judo-programm").toLocaleLowerCase("de").replace(/[^a-z0-9äöüß]+/gi, "-").replace(/^-+|-+$/g, "").slice(0, 48) || "judo-programm";
}

function exportProgram() {
  const payload = {
    schema: "judo-programmplaner",
    version: DATA_VERSION,
    exportedAt: new Date().toISOString(),
    program: state,
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${safeFilename(state.name)}.json`;
  document.body.append(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 0);
  setFeedback("JSON-Export erstellt.");
}

async function importProgram(file) {
  try {
    const parsed = JSON.parse(await file.text());
    const program = parsed?.schema === "judo-programmplaner" ? parsed.program : parsed;
    if (!program || typeof program !== "object" || !("degree" in program) || !("selected" in program)) throw new Error("Ungültig");
    const candidate = normaliseState(program);
    state = candidate;
    pruneUnavailableSelections();
    ensureMandatorySelections();
    pruneUnavailableSituations();
    persist();
    renderDegreeSelect();
    rerender();
    setFeedback("Programm importiert.");
  } catch {
    setFeedback("Import nicht möglich: Bitte eine JSON-Datei aus diesem Planer wählen.");
  } finally {
    elements.importInput.value = "";
  }
}

function bindEvents() {
  elements.degreeSelect.addEventListener("change", (event) => {
    state.degree = event.target.value;
    state.danOptions = {};
    const removedAutomatic = pruneAutomaticSelections();
    const removedUnavailable = pruneUnavailableSelections();
    const addedMandatory = ensureMandatorySelections();
    const removedSituations = pruneUnavailableSituations();
    persist();
    rerender();
    if (removedAutomatic || removedUnavailable || removedSituations || addedMandatory) {
      const messages = [];
      if (removedAutomatic) messages.push(`${removedAutomatic} automatische Auswahl${removedAutomatic === 1 ? " wurde" : "en wurden"} entfernt`);
      const removedUnavailableTotal = removedUnavailable + removedSituations;
      if (removedUnavailableTotal) messages.push(`${removedUnavailableTotal} nicht zum Grad passende Auswahl${removedUnavailableTotal === 1 ? " wurde" : "en wurden"} entfernt`);
      if (addedMandatory) messages.push(`${addedMandatory} Pflichttechnik${addedMandatory === 1 ? " wurde" : "en wurden"} automatisch ausgewählt`);
      setFeedback(`${messages.join(" · ")}.`);
    }
  });
  elements.name.addEventListener("input", (event) => {
    state.name = event.target.value.slice(0, 80);
    persist();
  });
  elements.resetSelection.addEventListener("click", resetSelection);
  document.querySelectorAll(".filter").forEach((button) => button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    syncFilterButtons();
    renderTechniqueGrid();
  }));
  elements.search.addEventListener("input", (event) => { searchTerm = event.target.value; renderTechniqueGrid(); });
  elements.groups.addEventListener("click", (event) => {
    const button = event.target.closest("[data-toggle]");
    if (button) updateSelection(button.dataset.toggle);
  });
  elements.groups.addEventListener("change", (event) => {
    const select = event.target.closest("[data-side]");
    if (!select || !isSelected(select.dataset.side)) return;
    state.selected[select.dataset.side].side = select.value;
    persist();
    renderRequirements();
  });
  elements.situationsGrid.addEventListener("click", (event) => {
    const button = event.target.closest("[data-situation-toggle]");
    if (button) updateSituation(button.dataset.situationToggle);
  });
  elements.danOptionGrid.addEventListener("change", (event) => {
    const select = event.target.closest("[data-dan-option]");
    if (!select) return;
    const key = select.dataset.danOption;
    state.danOptions[key] = validDanOption(state.degree, key, select.value) ? select.value : "";
    persist();
    renderRequirements();
    renderDanOptions();
    renderTechniqueGrid();
  });
  document.querySelector("#export-button").addEventListener("click", exportProgram);
  document.querySelector("#import-button").addEventListener("click", () => elements.importInput.click());
  elements.importInput.addEventListener("change", (event) => { if (event.target.files?.[0]) importProgram(event.target.files[0]); });
  [document.querySelector("#print-button"), document.querySelector("#print-button-bottom")].forEach((button) => button.addEventListener("click", enterPrintView));
  elements.printExit.addEventListener("click", leavePrintView);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && document.body.classList.contains("print-view")) leavePrintView();
  });
}

renderDegreeSelect();
pruneUnavailableSelections();
ensureMandatorySelections();
pruneUnavailableSituations();
persist();
renderNotices();
rerender();
bindEvents();
