const STORAGE_KEY = "judo-programmplaner-v1";

async function loadData() {
  const response = await fetch("data.json");
  if (!response.ok) throw new Error("Daten konnten nicht geladen werden.");
  const data = await response.json();
  if (data?.schema !== "judo-programmplaner-data" || !Array.isArray(data.techniques) || !Array.isArray(data.degrees)) {
    throw new Error("Ungültige Datenbasis.");
  }
  return data;
}

function showStartupError() {
  const main = document.querySelector("main");
  if (!main) return;
  main.innerHTML = '<section class="empty-state"><strong>Die Programm-Daten konnten nicht geladen werden.</strong><br />Bitte die statische Seite über ihren Hosting-Pfad öffnen.</section>';
}

async function bootstrap() {
  let data;
  try {
    data = await loadData();
  } catch {
    showStartupError();
    return;
  }

  const rules = window.JudoRules?.createRules(data);
  if (!rules) {
    showStartupError();
    return;
  }

  const {
    version: DATA_VERSION,
    degrees,
    pools,
    groupInfo,
    techniques,
    comicSprites,
    comicFrames,
    danPrograms,
    notices,
    fallTechniquesByDegree,
    gradeNotes,
  } = data;
  const { techniqueById, standardSituationIds, isValidSituationSolution } = rules;

  function defaultState() { return rules.defaultState(); }
  function normaliseState(candidate) { return rules.normaliseState(candidate); }
  function danCardsForDegree(degreeId = state?.degree) { return rules.danCardsForDegree(degreeId); }
  function validDanOption(degreeId, key, value) { return rules.validDanOption(degreeId, key, value); }

  function readState() {
    try {
      const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY));
      return normaliseState(parsed);
    } catch {
      return defaultState();
    }
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
  function selectedTechniques() { return rules.selectedTechniques(state); }
  function degree() { return rules.degree(state.degree); }
  function isSelectableForCurrentDegree(item) { return rules.isSelectableForDegree(item, state.degree); }
  function pruneUnavailableSelections() { return rules.pruneUnavailableSelections(state); }
  function pruneAutomaticSelections() { return rules.pruneAutomaticSelections(state); }
  function ensureMandatorySelections() { return rules.ensureMandatorySelections(state); }
  function situationsForCurrentDegree() { return rules.situationsForDegree(state.degree); }
  function solutionOptionsForSituation(key) { return rules.solutionOptionsForSituation(key, state.degree); }
  function isSituationSelected(id) { return Boolean(state.situations[id]); }
  function selectedSituationCount() { return situationsForCurrentDegree().filter((situation) => isSituationSelected(situation.id)).length; }
  function pruneUnavailableSituations() { return rules.pruneUnavailableSituations(state); }
  function showSideSelection(item) { return rules.showSideSelection(state, item); }
  function requiredForCurrentDegree(item) { return rules.requiredForDegree(item, state.degree); }
  function requirementDefinitions() { return rules.requirementDefinitions(state); }

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
    ? "Für jede Lage eine passende Katame-waza als Situationslösung planen; Ober- und Unterlage getrennt berücksichtigen. Die Vorschläge sind auf die für diesen Grad wählbaren Pools begrenzt."
    : "Für jede Anwendungsaufgabe eine Lösung auswählen. Vorschläge erscheinen nur, wenn ihre Technik aus einem für diesen Grad wählbaren Pool stammt.";
  elements.situationsGrid.innerHTML = situations.map((situation) => {
    const selectedSolution = state.situations[situation.id] || "";
    const solutions = solutionOptionsForSituation(situation.key);
    const solutionsMarkup = solutions.length
      ? `<div class="situation-solutions" role="radiogroup" aria-label="Lösung für ${situation.title}"><span class="situation-solutions-label">Lösung auswählen</span><div class="situation-solution-list">${solutions.map((solution) => {
        const isSelected = selectedSolution === solution.id;
        const techniqueName = solution.techniqueId ? techniqueById.get(solution.techniqueId)?.name : solution.label;
        return `<button class="situation-solution ${isSelected ? "is-selected" : ""}" type="button" role="radio" aria-checked="${isSelected}" data-situation-solution="${situation.id}" data-solution-id="${solution.id}"><strong>${techniqueName || "Musterlösung"}</strong><small>${solution.detail}</small></button>`;
      }).join("")}</div></div>`
      : `<p class="situation-no-solutions">Für diese Anwendungsaufgabe ist im für diesen Grad zulässigen Pool keine Musterlösung hinterlegt.</p>`;
    return `<article class="situation-card ${selectedSolution ? "is-selected" : ""}">
      <div class="situation-content"><strong>${situation.title}</strong><small>${situation.detail}</small>${solutionsMarkup}</div>
    </article>`;
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
    // Handlungsketten sind zum 2. und 3. Dan verpflichtend. Der Link wird
    // deshalb über den Karten-Schlüssel abgesichert und nicht allein über eine
    // optionale Konfigurationsangabe eingeblendet.
    const showPlannerLink = card.key === "handlungsketten" || card.plannerLinkWhen?.includes(value);
    return `<article class="dan-option-card ${value ? "is-selected" : ""}">
      <p class="dan-option-kind">${card.kind}</p>
      <h3>${card.title}</h3>
      ${showPlannerLink ? '<p class="dan-planner-note">Für die Ausarbeitung: <a class="dan-planner-link" href="https://j0m2.github.io/Handlungsketten_judo/" target="_blank" rel="noopener noreferrer">Handlungsketten-Planer öffnen&nbsp;↗</a></p>' : ""}
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
    <div class="card-top"><span class="card-pool">${pool.label}</span><button class="select-toggle" type="button" data-toggle="${item.id}" ${required ? "disabled" : ""} aria-label="${required ? `${item.name} ist für diesen Grad verbindlich ausgewählt` : `${item.name} ${selected ? "abwählen" : "auswählen"}`}" title="${required ? "Für diesen Grad verbindlich" : ""}">✓</button></div>
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
    ? `Auswahl zurückgesetzt · ${addedMandatory} verbindliche Technik${addedMandatory === 1 ? " bleibt" : "en bleiben"} gesetzt.`
    : "Auswahl zurückgesetzt.");
}

function updateSituationSolution(id, solutionId) {
  if (!standardSituationIds.has(id) || !isValidSituationSolution(id, solutionId)) return;
  state.situations[id] = solutionId;
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
      if (addedMandatory) messages.push(`${addedMandatory} verbindliche Technik${addedMandatory === 1 ? " wurde" : "en wurden"} gesetzt`);
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
    const button = event.target.closest("[data-situation-solution]");
    if (button) updateSituationSolution(button.dataset.situationSolution, button.dataset.solutionId);
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

}

bootstrap();
