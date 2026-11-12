// Fachliche Regeln des Programmplaners. Dieses Modul kennt keine DOM-Elemente
// und keine Speicherung im Browser; es arbeitet ausschließlich mit data.json
// und dem übergebenen Programmzustand.
(function registerJudoRules(global) {
  function createRules(data) {
    const {
      version: dataVersion,
      degrees,
      techniques,
      mandatoryByDegree,
      sideRequirementsByDegree,
      danPrograms,
      standardSituationsByDegree,
      applicationTaskDescriptions,
      situationSolutionOptions,
      situationSolutionAliases,
      requirementsByDegree,
      conditionalRequirements,
    } = data;
    const techniqueById = new Map(techniques.map((item) => [item.id, item]));
    const gokyoKeys = [...new Set(techniques.filter((item) => item.gokyo).map((item) => item.gokyo))];
    const danGroundIds = techniques.filter((item) => item.area === "boden" && ["grund", "erweiterung"].includes(item.pool)).map((item) => item.id);
    const allKatameExceptDoJimeIds = techniques.filter((item) => item.area === "boden" && item.id !== "do-jime").map((item) => item.id);
    const dan6TechniqueIds = techniques.filter((item) => !["kani-basami", "kawazu-gake"].includes(item.id)).map((item) => item.id);
    const standardSituationIds = new Set(
      Object.entries(standardSituationsByDegree).flatMap(([degreeId, situations]) => situations.map(([id]) => `${degreeId}:${id}`)),
    );

    function defaultState() {
      return { version: dataVersion, name: "Mein Prüfungsprogramm", degree: "8", selected: {}, situations: {}, danOptions: {} };
    }

    function danCardsForDegree(degreeId) {
      return danPrograms[degreeId]?.cards || [];
    }

    function validDanOption(degreeId, key, value) {
      return danCardsForDegree(degreeId).some((card) => card.key === key && card.options.some(([id]) => id === value));
    }

    function isSelectableForDegree(item, degreeId) {
      if (degreeId === "8") return false;
      if (["7", "6", "5", "4"].includes(degreeId)) return item.pool === "grund";
      if (["3", "2", "1"].includes(degreeId)) return ["grund", "erweiterung"].includes(item.pool);
      if (degreeId === "dan1") return Boolean(item.gokyo) || (item.area === "boden" && ["grund", "erweiterung"].includes(item.pool));
      if (["dan2", "dan3"].includes(degreeId)) return item.area === "stand" || (item.area === "boden" && item.id !== "do-jime");
      if (degreeId === "dan4") return ["stand-te", "stand-koshi", "stand-ashi", "boden-osae"].includes(item.group);
      if (degreeId === "dan5") return ["stand-ma", "stand-yoko", "boden-kansetsu", "boden-shime"].includes(item.group)
        && !["kani-basami", "kawazu-gake"].includes(item.id);
      if (degreeId === "dan6") return !["kani-basami", "kawazu-gake"].includes(item.id);
      return false;
    }

    function normaliseState(candidate) {
      const fallback = defaultState();
      if (!candidate || typeof candidate !== "object") return fallback;
      const degreeId = degrees.some((item) => item.id === candidate.degree) ? candidate.degree : fallback.degree;
      const selected = {};
      if (candidate.selected && typeof candidate.selected === "object") {
        for (const [id, value] of Object.entries(candidate.selected)) {
          const technique = techniqueById.get(id);
          if (!technique) continue;
          const side = technique.turn && ["main", "opposite"].includes(value?.side) ? value.side : "neutral";
          const manual = typeof value?.manual === "boolean" ? value.manual : !(mandatoryByDegree[degreeId] || []).includes(id);
          selected[id] = { side, manual };
        }
      }
      const situations = {};
      if (candidate.situations && typeof candidate.situations === "object") {
        for (const [id, solutionId] of Object.entries(candidate.situations)) {
          if (standardSituationIds.has(id) && isValidSituationSolution(id, solutionId)) situations[id] = solutionId;
        }
      }
      const danOptions = {};
      for (const card of danCardsForDegree(degreeId)) {
        const value = candidate.danOptions?.[card.key];
        danOptions[card.key] = validDanOption(degreeId, card.key, value) ? value : "";
      }
      return { version: dataVersion, name: String(candidate.name || fallback.name).slice(0, 80), degree: degreeId, selected, situations, danOptions };
    }

    function selectedTechniques(state) {
      return techniques.filter((item) => state.selected[item.id]);
    }

    function selectedRequired(state, ids) {
      return ids.filter((id) => state.selected[id]).length;
    }

    function degree(degreeId) {
      return degrees.find((item) => item.id === degreeId);
    }

    function pruneUnavailableSelections(state) {
      let removed = 0;
      for (const id of Object.keys(state.selected)) {
        const item = techniqueById.get(id);
        if (!item || !isSelectableForDegree(item, state.degree)) {
          delete state.selected[id];
          removed += 1;
        }
      }
      return removed;
    }

    function pruneAutomaticSelections(state) {
      let removed = 0;
      for (const [id, selection] of Object.entries(state.selected)) {
        if (selection?.manual) continue;
        delete state.selected[id];
        removed += 1;
      }
      return removed;
    }

    function ensureMandatorySelections(state) {
      let added = 0;
      for (const id of mandatoryByDegree[state.degree] || []) {
        const item = techniqueById.get(id);
        if (!item || state.selected[id]) continue;
        state.selected[id] = { side: item.turn ? "main" : "neutral", manual: false };
        added += 1;
      }
      return added;
    }

    function situationsForDegree(degreeId) {
      return (standardSituationsByDegree[degreeId] || []).map(([id, title, detail]) => {
        const description = applicationTaskDescriptions[id] || {};
        return {
          id: `${degreeId}:${id}`,
          key: id,
          title: description.title || title,
          detail: description.detail || detail,
          context: description.context || "",
        };
      });
    }

    function solutionOptionsForSituation(key, degreeId) {
      return (situationSolutionOptions[situationSolutionAliases[key] || key] || [])
        .map(([techniqueId, detail, label], index) => ({ id: techniqueId || `action-${index}`, techniqueId, detail, label }))
        .filter(({ techniqueId }) => {
          if (!techniqueId) return true;
          const item = techniqueById.get(techniqueId);
          return Boolean(item && isSelectableForDegree(item, degreeId));
        });
    }

    function isValidSituationSolution(situationId, solutionId) {
      if (typeof solutionId !== "string") return false;
      const separator = situationId.indexOf(":");
      if (separator < 1) return false;
      const degreeId = situationId.slice(0, separator);
      const key = situationId.slice(separator + 1);
      return solutionOptionsForSituation(key, degreeId).some((solution) => solution.id === solutionId);
    }

    function pruneUnavailableSituations(state) {
      let removed = 0;
      const valid = new Set(situationsForDegree(state.degree).map((situation) => situation.id));
      for (const [id, solutionId] of Object.entries(state.situations)) {
        if (!valid.has(id) || !isValidSituationSolution(id, solutionId)) {
          delete state.situations[id];
          removed += 1;
        }
      }
      return removed;
    }

    function showSideSelection(state, item) {
      const kyuRequirement = Boolean(sideRequirementsByDegree[state.degree]);
      const danCompetitionRequirement = state.degree === "dan2" && state.danOptions.wahlbereich === "wettkampf";
      return (kyuRequirement || danCompetitionRequirement) && item.turn && Boolean(state.selected[item.id]);
    }

    function requiredForDegree(item, degreeId) {
      return (mandatoryByDegree[degreeId] || []).includes(item.id);
    }

    function resolveTechniqueIds(source, state) {
      if (Array.isArray(source)) return source;
      const ids = {
        "degree-mandatory": mandatoryByDegree[state.degree] || [],
        "dan-ground": danGroundIds,
        "katame-without-do": allKatameExceptDoJimeIds,
        "dan6-stand": dan6TechniqueIds.filter((id) => techniqueById.get(id)?.area === "stand"),
        "dan6-boden": dan6TechniqueIds.filter((id) => techniqueById.get(id)?.area === "boden"),
      };
      return ids[source] || [];
    }

    function resolveTarget(value, state) {
      if (typeof value === "number") return value;
      const targets = {
        "gokyo-count": gokyoKeys.length,
        "dan-ground-count": danGroundIds.length,
        "katame-without-do-count": allKatameExceptDoJimeIds.length,
        "dan6-stand-count": resolveTechniqueIds("dan6-stand", state).length,
        "dan6-boden-count": resolveTechniqueIds("dan6-boden", state).length,
      };
      return targets[value] ?? 0;
    }

    function requirementTarget(definition, state) {
      const techniquesTarget = (filter) => ({ section: "techniken", filter });
      switch (definition.metric) {
        case "zero": return { section: "programm" };
        case "stand": return techniquesTarget("stand");
        case "turns": return techniquesTarget("turns");
        case "foot": return techniquesTarget("group:stand-ashi");
        case "extension-throws": return techniquesTarget("extension-throws");
        case "holds": return techniquesTarget("group:boden-osae");
        case "levers":
        case "extension-levers": return techniquesTarget("group:boden-kansetsu");
        case "chokes": return techniquesTarget("group:boden-shime");
        case "gokyo": return techniquesTarget("gokyo");
        case "outside-gokyo-throws": return techniquesTarget("outside-gokyo-throws");
        case "group": return techniquesTarget(`group:${definition.group}`);
        case "required": {
          const ids = resolveTechniqueIds(definition.ids, state);
          const items = ids.map((id) => techniqueById.get(id)).filter(Boolean);
          const groups = new Set(items.map((item) => item.group));
          const areas = new Set(items.map((item) => item.area));
          if (groups.size === 1) return techniquesTarget(`group:${[...groups][0]}`);
          if (areas.size === 1) return techniquesTarget([...areas][0]);
          return techniquesTarget(`ids:${ids.join(",")}`);
        }
        default: return techniquesTarget("all");
      }
    }

    function requirementDefinitions(state) {
      const selected = selectedTechniques(state);
      const countSelected = (predicate) => selected.filter(predicate).length;
      const metricValue = (definition) => {
        switch (definition.metric) {
          case "zero": return 0;
          case "stand": return countSelected((item) => item.area === "stand");
          case "turns": return countSelected((item) => item.area === "stand" && item.turn && state.selected[item.id]?.side === definition.side);
          case "foot": return countSelected((item) => item.group === "stand-ashi");
          case "extension-throws": return countSelected((item) => item.area === "stand" && item.pool === "erweiterung");
          case "holds": return countSelected((item) => item.group === "boden-osae");
          case "levers": return countSelected((item) => item.group === "boden-kansetsu");
          case "extension-levers": return countSelected((item) => item.pool === "erweiterung" && item.group === "boden-kansetsu");
          case "chokes": return countSelected((item) => item.group === "boden-shime");
          case "gokyo": return new Set(selected.filter((item) => item.gokyo).map((item) => item.gokyo)).size;
          case "outside-gokyo-throws": return countSelected((item) => item.area === "stand" && !item.gokyo);
          case "group": return countSelected((item) => item.group === definition.group);
          case "required": return selectedRequired(state, resolveTechniqueIds(definition.ids, state));
          default: return 0;
        }
      };
      const toRequirement = (definition) => [
        definition.title,
        () => metricValue(definition),
        resolveTarget(definition.needed, state),
        definition.detail,
        requirementTarget(definition, state),
      ];
      const requirements = (requirementsByDegree[state.degree] || []).map(toRequirement);
      const danOptionRequirements = danCardsForDegree(state.degree).map((card) => [
        card.requirement[0],
        () => state.danOptions[card.key] ? 1 : 0,
        1,
        card.requirement[1],
        { section: "dan-optionen" },
      ]);
      requirements.push(...danOptionRequirements);

      const situationCount = situationsForDegree(state.degree).length;
      if (situationCount) requirements.push([
        "Standardsituationen",
        () => situationsForDegree(state.degree).filter((situation) => state.situations[situation.id]).length,
        situationCount,
        state.degree.startsWith("dan") ? "Situationslösungen für diesen Dan-Grad" : "Situationslösungen für diesen Grad",
        { section: "situationen" },
      ]);

      for (const definition of conditionalRequirements[state.degree] || []) {
        const { option, equals } = definition.when || {};
        if (state.danOptions[option] === equals) requirements.push(toRequirement(definition));
      }
      return requirements;
    }

    return {
      techniqueById,
      standardSituationIds,
      defaultState,
      normaliseState,
      degree,
      selectedTechniques,
      selectedRequired,
      isSelectableForDegree,
      pruneUnavailableSelections,
      pruneAutomaticSelections,
      ensureMandatorySelections,
      situationsForDegree,
      solutionOptionsForSituation,
      isValidSituationSolution,
      pruneUnavailableSituations,
      showSideSelection,
      requiredForDegree,
      danCardsForDegree,
      validDanOption,
      requirementDefinitions,
    };
  }

  global.JudoRules = { createRules };
})(window);
