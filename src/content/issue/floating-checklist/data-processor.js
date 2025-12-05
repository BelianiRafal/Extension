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

    // compute changed timestamp + color from cp.changed_by (fallback to null)
    const changedByRaw = cp?.changed_by || null;
    const parsed = this._parseChangedBy(changedByRaw);

    if (
      !obj[slug].items.find(
        (it) => `${it.checklist_id}::${it.checkpoint_id}` === itemKey
      )
    ) {
      obj[slug].items.push({
        checklist_id,
        checklist_title,
        checkpoint_id,
        changed_by_raw: changedByRaw,
        changed_at: parsed.changed_at,
        color: parsed.color,
      });
    }
  },

  // parse a `changed_by` string like "Name 2025-11-18 08:33:47" and
  // return { changed_at: <ms since epoch> | null, color: 'green'|'yellow'|'orange'|'grey' }
  _parseChangedBy: function (changedByStr) {
    if (!changedByStr) return { changed_at: null, color: 'grey' };

    const s = String(changedByStr);
    const m = s.match(/(\d{4}-\d{2}-\d{2})\s+(\d{2}:\d{2}:\d{2})/);
    
    if (!m) return { changed_at: null, color: 'grey' };
    
    // build ISO-like string; treat as UTC to avoid ambiguous local parsing
    const iso = `${m[1]}T${m[2]}Z`;
    const ts = Date.parse(iso);

    if (isNaN(ts)) return { changed_at: null, color: 'grey' };
    
    const hoursAgo = (Date.now() - ts) / (1000 * 60 * 60);
    
    let color = 'gray';
    
    if (hoursAgo <= 12) color = 'green';
    
    else if (hoursAgo <= 24) color = 'yellow';
    
    return { changed_at: ts, color };
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
          
            const existingItem = existing.items.find(
              (e) => `${e.checklist_id}::${e.checkpoint_id}` === key
            );
          
            if (existingItem) {
              // prefer the item with newer changed_at when available
              const incomingTs = Number(it.changed_at) || 0;
              const existingTs = Number(existingItem.changed_at) || 0;
          
              if (incomingTs > existingTs) {
                existingItem.changed_at = it.changed_at || existingItem.changed_at;
                existingItem.color = it.color || existingItem.color;
                existingItem.changed_by_raw = it.changed_by_raw || existingItem.changed_by_raw;
                existingItem.checklist_title = it.checklist_title || existingItem.checklist_title;
              }
          
            } else {
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
    let path = window.location.pathname;

    if (path.endsWith("/")) path = path.slice(0, -1);

    const issue_id = path.split("/").pop();

    console.log("🔥🔥🔥 Fetching checklist for issue ID:", issue_id);

    const response = await fetch(
      `https://${window.location.hostname}/api/issueLog/checklist/?issue_id=${issue_id}`
    );

    const data = await response.json();
    const checklistsData = Array.isArray(data?.checklists)
      ? data.checklists
      : [];

    // Dynamically create result object with all checklist titles as keys
    const result = {};

    // Process each checklist
    for (const cl of checklistsData) {
      const title = String(cl.title || "").trim();
      const titleL = title.toLowerCase();
      const checkpoints = Array.isArray(cl.checkpoints) ? cl.checkpoints : [];

      // Initialize this checklist category in result if not exists
      if (!result[title]) {
        result[title] = {};
      }

      // Process all checkpoints for this checklist
      for (const cp of checkpoints) {
        this.setList(result[title], cp, cl);
      }
    }

    const processed = this.postProcess(result);

    // Filter out empty checklists (with no items)
    const filtered = Object.fromEntries(
      Object.entries(processed).filter(([, v]) => v && Object.keys(v).length > 0)
    );

    console.log("📋 [FLOATING CHECKLIST] Zaciągnięte checklisty:", Object.keys(filtered));
    console.log("📊 [FLOATING CHECKLIST] Przefiltrowane listy:", filtered);

    return filtered;
  },
};
