const DATA_VERSION = 2;
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
// dieser Anwendung. Spalten und Zeilen beziehen sich auf die jeweilige Sprite-Tafel.
const comicSprites = {
  grundStand: { src: "assets/illustrations/grund-stand-comic.png", columns: 4, rows: 4, ratio: 1.01 },
  erweiterungStand: { src: "assets/illustrations/erweiterung-stand-comic.png", columns: 3, rows: 4, ratio: 2 },
  grundBoden: { src: "assets/illustrations/grund-boden-comic.png", columns: 4, rows: 4, ratio: 1.5 },
  erweiterungBoden: { src: "assets/illustrations/erweiterung-boden-comic.png", columns: 3, rows: 4, ratio: 1.78 },
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
const danGroundIds = techniques.filter((item) => item.area === "boden" && ["grund", "erweiterung"].includes(item.pool)).map((item) => item.id);

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
};

const sideRequirementsByDegree = { "7": 1, "6": 2, "5": 3, "4": 3 };

const danKataOptions = [
  ["nage-1-3", "Nage-no-kata · Gruppen 1–3"],
  ["ju-1-2", "Ju-no-kata · Gruppen 1–2"],
];

const danWahlbereichOptions = [
  ["lizenz", "Lizenzen · gültige Trainer-C-Lizenz des DJB"],
  ["wettkampf", "Wettkampf · 10 Kampfpunkte und individuelle Kampfkonzeption"],
  ["kata-uke", "Kata · als Uke: Kodokan-Kata nach Wahl mit mindestens 15 Techniken"],
  ["kata-alternative", "Kata · als Tori: nicht gewählte Alternative der Obligatorik"],
  ["kata-nage-4-5", "Kata · als Tori: Nage-no-kata Gruppen 4–5"],
  ["kata-ju-3", "Kata · als Tori: Ju-no-kata Gruppe 3"],
  ["kata-katame-osae", "Kata · als Tori: Katame-no-kata · Osaekomi-waza"],
  ["kata-goshinjutsu-1-2", "Kata · als Tori: Kodokan Goshinjutsu Gruppen 1–2 (ohne Waffen)"],
  ["selbstverteidigung", "Selbstverteidigung · Nahdistanz sowie Schläge und Tritte"],
  ["taiso", "Taiso · Sportabzeichen, Tandoku-renshu und Seiryoku-zenyo-kokumin-taiiku"],
];

const danKataOptionIds = new Set(danKataOptions.map(([id]) => id));
const danWahlbereichOptionIds = new Set(danWahlbereichOptions.map(([id]) => id));

const notices = [
  { type: "Widerspruch", title: "Zählweise der Nage-waza", text: "Die Pool-Übersicht zählt 16 + 12 + 32 + 9 = 69 Nage-waza, während ihr Anhang „Nage-waza, 68“ ausweist. Alle in der Übersicht namentlich aufgeführten Techniken bleiben hier sichtbar; Zählwerte werden nicht als Prüfungsanforderung verwendet." },
  { type: "Widerspruch", title: "Abweichende Technikbezeichnungen", text: "Die Pool-Übersicht nennt „Ko-soko-gari“ und „Okure-ashi-harai“. Das Grundprogramm-Poster bezeichnet die gezeigte Technik dagegen als „Ko-soto-gake“, das Erweiterungsprogramm-Poster als „Okuri-ashi-barai“. Die Anwendung führt Ko-soto-gari bzw. Okuri-ashi-barai; beim Ko-soto-Eintrag bleibt die Posterreferenz deshalb ausdrücklich als Quellenabweichung markiert." },
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
};

function defaultState() {
  return { version: DATA_VERSION, name: "Mein Prüfungsprogramm", degree: "1", selected: {}, situations: {}, danOptions: { kata: "", wahlbereich: "" } };
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
      selected[id] = { side };
    }
  }
  const situations = {};
  if (candidate.situations && typeof candidate.situations === "object") {
    for (const id of Object.keys(candidate.situations)) {
      if (standardSituationIds.has(id)) situations[id] = true;
    }
  }
  const danOptions = {
    kata: danKataOptionIds.has(candidate.danOptions?.kata) ? candidate.danOptions.kata : "",
    wahlbereich: danWahlbereichOptionIds.has(candidate.danOptions?.wahlbereich) ? candidate.danOptions.wahlbereich : "",
  };
  return { version: DATA_VERSION, name: String(candidate.name || fallback.name).slice(0, 80), degree, selected, situations, danOptions };
}

let state = readState();
let activeFilter = "all";
let searchTerm = "";
let previousTechniqueView = null;

const elements = {
  degreeSelect: document.querySelector("#degree-select"),
  name: document.querySelector("#program-name"),
  degreeCard: document.querySelector("#degree-card"),
  requirements: document.querySelector("#requirements"),
  completion: document.querySelector("#completion"),
  note: document.querySelector("#program-note"),
  notices: document.querySelector("#notices"),
  fallSection: document.querySelector("#falltechniken"),
  fallIntro: document.querySelector("#fall-intro"),
  fallGrid: document.querySelector("#fall-grid"),
  situationsSection: document.querySelector("#situationen"),
  situationsIntro: document.querySelector("#situations-intro"),
  situationsGrid: document.querySelector("#situation-grid"),
  situationsSummary: document.querySelector("#situations-summary"),
  danOptionsSection: document.querySelector("#dan-optionen"),
  danKataCard: document.querySelector("#dan-kata-card"),
  danWahlbereichCard: document.querySelector("#dan-wahlbereich-card"),
  danKataSelect: document.querySelector("#dan-kata-select"),
  danWahlbereichSelect: document.querySelector("#dan-wahlbereich-select"),
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

function ensureMandatorySelections() {
  let added = 0;
  for (const id of mandatoryByDegree[state.degree] || []) {
    const item = techniqueById.get(id);
    if (!item || state.selected[id]) continue;
    state.selected[id] = { side: item.turn ? "main" : "neutral" };
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
  return Boolean(sideRequirementsByDegree[state.degree]) && item.turn && isSelected(item.id);
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
  const selectedSituations = () => selectedSituationCount();

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
    "dan1": [["Gokyo-no-waza", totalGokyo, gokyoKeys.length, "jede Gokyo-Familie aus freier Interaktion"], ["Katame-waza", () => selectedRequired(danGroundIds), danGroundIds.length, "je eine Variante aus Grund- & Erweiterungsprogramm"], ["Kata", () => state.danOptions.kata ? 1 : 0, 1, "Nage-no-kata 1–3 oder Ju-no-kata 1–2"], ["Wahlbereich", () => state.danOptions.wahlbereich ? 1 : 0, 1, "Lizenz · Wettkampf · Kata · Selbstverteidigung oder Taiso"]],
  };
  if (state.degree === "8") return [["Einstieg", () => 0, 0, "kein Technikpool-Umfang festgelegt"]];
  const situationCount = situationsForCurrentDegree().length;
  basics[state.degree].push([
    "Standardsituationen",
    selectedSituations,
    situationCount,
    state.degree === "dan1" ? "Bodenlagen und Übergang Stand → Boden" : "Situationslösungen für diesen Grad",
  ]);
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
  const isDan = state.degree === "dan1";
  elements.danOptionsSection.hidden = !isDan;
  if (!isDan) return;
  const optionMarkup = (options, placeholder) => `<option value="">${placeholder}</option>${options.map(([id, label]) => `<option value="${id}">${label}</option>`).join("")}`;
  elements.danKataSelect.innerHTML = optionMarkup(danKataOptions, "Bitte auswählen …");
  elements.danWahlbereichSelect.innerHTML = optionMarkup(danWahlbereichOptions, "Bitte auswählen …");
  elements.danKataSelect.value = state.danOptions.kata;
  elements.danWahlbereichSelect.value = state.danOptions.wahlbereich;
  elements.danKataCard.classList.toggle("is-selected", Boolean(state.danOptions.kata));
  elements.danWahlbereichCard.classList.toggle("is-selected", Boolean(state.danOptions.wahlbereich));
}

function renderNotices() {
  elements.notices.innerHTML = notices.map((notice) => `<article class="notice">
    <span class="notice-tag">${notice.type}</span><h3>${notice.title}</h3><p>${notice.text}</p>
  </article>`).join("");
}

function fallbackPictogram() {
  return '<span class="comic-illustration comic-illustration--fallback" aria-hidden="true" style="width:43px;background-image:url(\'assets/illustrations/technik-ohne-vorlage-comic.png\');background-size:contain;background-position:center;"></span>';
}

function comicIllustration(item) {
  const frame = comicFrames[item.id];
  if (!frame) return fallbackPictogram(item);
  const [spriteId, column, row] = frame;
  const sprite = comicSprites[spriteId];
  const x = sprite.columns === 1 ? 0 : (column / (sprite.columns - 1)) * 100;
  const y = sprite.rows === 1 ? 0 : (row / (sprite.rows - 1)) * 100;
  return `<span class="comic-illustration" aria-hidden="true" style="width:${Math.round(64 * sprite.ratio)}px;background-image:url('${sprite.src}');background-size:${sprite.columns * 100}% ${sprite.rows * 100}%;background-position:${x}% ${y}%;"></span>`;
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
  else state.selected[id] = { side: item.turn ? "main" : "neutral" };
  persist();
  rerender();
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
    const removedTechniques = pruneUnavailableSelections();
    const addedMandatory = ensureMandatorySelections();
    const removedSituations = pruneUnavailableSituations();
    persist();
    rerender();
    const removed = removedTechniques + removedSituations;
    if (removed || addedMandatory) {
      const messages = [];
      if (removed) messages.push(`${removed} nicht zum Grad passende Auswahl${removed === 1 ? " wurde" : "en wurden"} entfernt`);
      if (addedMandatory) messages.push(`${addedMandatory} Pflichttechnik${addedMandatory === 1 ? " wurde" : "en wurden"} automatisch ausgewählt`);
      setFeedback(`${messages.join(" · ")}.`);
    }
  });
  elements.name.addEventListener("input", (event) => {
    state.name = event.target.value.slice(0, 80);
    persist();
  });
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
  elements.danKataSelect.addEventListener("change", (event) => {
    state.danOptions.kata = danKataOptionIds.has(event.target.value) ? event.target.value : "";
    persist();
    renderRequirements();
    renderDanOptions();
  });
  elements.danWahlbereichSelect.addEventListener("change", (event) => {
    state.danOptions.wahlbereich = danWahlbereichOptionIds.has(event.target.value) ? event.target.value : "";
    persist();
    renderRequirements();
    renderDanOptions();
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
renderNotices();
rerender();
bindEvents();
