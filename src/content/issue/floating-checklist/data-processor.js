// Data processing functions for checklist data
window.FloatingChecklistDataProcessor = {
  setList: function (obj, cp, cl) {
    const desc = typeof cp === "string" ? cp : String(cp.description || "");
    const slug = window.FloatingChecklistUtils.extractSlug(desc);
    const done =
      cp && typeof cp === "object"
        ? cp.done === 1 || cp.done === "1" || cp.done === true
        : false;
    if (!slug) return;
    if (!obj[slug]) obj[slug] = { done: false, items: [] };
    obj[slug].done = obj[slug].done || done;

    // resolve ids defensively
    const checklist_id = cl?.id || cl?.checklist_id || cl?.checklistId || null;
    const checklist_title = String(cl?.title || "");
    const checkpoint_id =
      cp?.id || cp?.checkpoint_id || cp?.checkpointId || null;
    const itemKey = `${checklist_id}::${checkpoint_id}`;

    if (
      !obj[slug].items.find(
        (it) => `${it.checklist_id}::${it.checkpoint_id}` === itemKey
      )
    ) {
      obj[slug].items.push({ checklist_id, checklist_title, checkpoint_id });
    }
  },

  postProcess: function (res) {
    const out = {};
    const alias = window.FloatingChecklistConfig.SLUG_CANONICAL_ALIAS;

    for (const cat of Object.keys(res)) {
      const map = {};
      for (const [slug, val] of Object.entries(res[cat] || {})) {
        const norm = String(slug || "")
          .replace(/\s+/g, "")
          .toUpperCase();
        const canon = alias[norm] || norm;
        if (!norm) continue;

        // compute boolean done correctly (val may be object with .done)
        const baseDone =
          typeof val === "object" ? Boolean(val.done) : Boolean(val);

        // expand DACH: set baseline only if country not already present
        if (canon === "DACH") {
          for (const t of ["CHDE", "DE", "AT"]) {
            if (!Object.prototype.hasOwnProperty.call(map, t)) {
              map[t] = {
                done: baseDone,
                items: val?.items ? [...val.items] : [],
              };
            }
          }
          continue;
        }

        // Ensure we store objects { done, items }
        const existing = map[canon] || { done: false, items: [] };
        const incomingDone =
          typeof val === "object" ? Boolean(val.done) : Boolean(val);

        // explicit country entries should override any previous DACH baseline
        existing.done = incomingDone;
        if (val && typeof val === "object" && Array.isArray(val.items)) {
          for (const it of val.items) {
            const key = `${it.checklist_id}::${it.checkpoint_id}`;
            if (
              !existing.items.find(
                (e) => `${e.checklist_id}::${e.checkpoint_id}` === key
              )
            ) {
              existing.items.push(it);
            }
          }
        }
        map[canon] = existing;
      }

      // sort keys
      const sorted = Object.keys(map)
        .sort((a, b) => a.localeCompare(b))
        .reduce((acc, k) => {
          acc[k] = map[k];
          return acc;
        }, {});
      out[cat] = sorted;
    }
    return out;
  },

  getChecklists: async function () {
    const issue_id = window.location.pathname.split("/").pop();

    const response = await fetch(
      `https://${window.location.hostname}/api/issueLog/checklist/?issue_id=${issue_id}`
    );

    const data = await response.json();
    const checklistsData = Array.isArray(data?.checklists)
      ? data.checklists
      : [];

    const result = {
      Translations: {},
      "Testing [NSLT]": {},
      "Testing [LPs]": {},
    };
    const perTitleRaw = {};

    for (const cl of checklistsData) {
      const title = String(cl.title || "").trim();
      const titleL = title.toLowerCase();
      const checkpoints = Array.isArray(cl.checkpoints) ? cl.checkpoints : [];

      if (!perTitleRaw[title]) perTitleRaw[title] = {};

      const isTranslations = titleL.includes("newsletter translations");
      const isTestingApproved = titleL.includes("newsletter testing approved");
      const isLP = /\bLPs?\b/i.test(title);

      for (const cp of checkpoints) {
        if (titleL.includes("newsletter") && !isTranslations) {
          this.setList(perTitleRaw[title], cp, cl);
        }

        if (isTranslations) this.setList(result.Translations, cp, cl);
        if (isTestingApproved) this.setList(result["Testing [NSLT]"], cp, cl);
        if (isLP) this.setList(result["Testing [LPs]"], cp, cl);
      }
    }

    const processed = this.postProcess(result);
    let processedByTitle = this.postProcess(perTitleRaw);

    // filter per-title to only include newsletter-containing titles
    processedByTitle = Object.fromEntries(
      Object.entries(processedByTitle).filter(([k]) =>
        k.toLowerCase().includes("newsletter")
      )
    );

    // If aggregated Testing [NSLT] exists, remove any per-title "Newsletter Testing Approved" entries
    if (
      processed["Testing [NSLT]"] &&
      Object.keys(processed["Testing [NSLT]"]).length > 0
    ) {
      processedByTitle = Object.fromEntries(
        Object.entries(processedByTitle).filter(
          ([k]) => !k.toLowerCase().includes("newsletter testing approved")
        )
      );
    }

    // Merge aggregated and per-title maps, but don't return empty objects
    const merged = { ...processed, ...processedByTitle };
    const filtered = Object.fromEntries(
      Object.entries(merged).filter(([, v]) => v && Object.keys(v).length > 0)
    );

    console.log(filtered);
    return filtered;
  },
};
