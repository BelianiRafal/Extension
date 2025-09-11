// UI component creation functions
window.FloatingChecklistUIComponents = {
  createPanelHeader: function (floating) {
    const header = document.createElement("div");
    header.classList.add("checklist-header");

    const title = document.createElement("div");
    title.classList.add("checklist-title");
    title.textContent = "Checklists";

    const toggle = document.createElement("button");
    toggle.classList.add("toggle-btn");
    const { UI_CONFIG } = window.FloatingChecklistConfig;
    toggle.innerHTML =
      localStorage.getItem(UI_CONFIG.COLLAPSED_KEY) === "1"
        ? "&#9650;"
        : "&#9660;";

    // Toggle handler
    toggle.addEventListener("click", () => {
      const isCollapsed = floating.classList.toggle("collapsed");
      localStorage.setItem(UI_CONFIG.COLLAPSED_KEY, isCollapsed ? "1" : "0");
      toggle.innerHTML = isCollapsed ? "&#9650;" : "&#9660;";
    });

    header.appendChild(title);
    header.appendChild(toggle);
    return header;
  },

  createTableHeader: function (slugs) {
    const thead = document.createElement("thead");
    const headRow = document.createElement("tr");

    const firstTh = document.createElement("th");
    firstTh.style.position = "relative";
    firstTh.style.height = "50px";
    firstTh.innerHTML = `
      <span class="lb" style="position: absolute; bottom: 2px; left: 8px;">Checklist Title</span>
      <span class="rt" style="position: absolute; top: 8px; right: 8px;">Slug</span>
      <div class="line" style="position: absolute;height: 1px;left: 0;width: 100%;border-top: 1px solid #e2e2e2;-webkit-transform: rotate(16deg);-ms-transform: rotate(16deg);transform: rotate(16deg);overflow: hidden;"></div>
    `;
    headRow.appendChild(firstTh);

    for (const s of slugs) {
      const th = document.createElement("th");
      th.textContent = s;
      headRow.appendChild(th);
    }

    thead.appendChild(headRow);
    return thead;
  },

  createTableBody: function (checklists, keys, slugs) {
    const tbody = document.createElement("tbody");

    // Regular checklist rows
    for (const listName of keys) {
      const row = document.createElement("tr");
      const nameCell = document.createElement("td");
      nameCell.textContent = listName;
      row.appendChild(nameCell);

      const map = checklists[listName] || {};
      const isTranslationsRow = /\btranslations\b/i.test(listName);

      for (const s of slugs) {
        const cell = document.createElement("td");
        const entry = Object.prototype.hasOwnProperty.call(map, s)
          ? map[s]
          : null;
        const chip = this.createChip(entry, s, isTranslationsRow);
        cell.appendChild(chip);
        row.appendChild(cell);
      }
      tbody.appendChild(row);
    }

    // Testing Request row
    const testRow = this.createTestingRow(keys, checklists, slugs);
    tbody.appendChild(testRow);

    return tbody;
  },

  createTestingRow: function (keys, checklists, slugs) {
    const testRow = document.createElement("tr");
    const testNameCell = document.createElement("td");
    testNameCell.textContent = "Testing Request";
    testRow.appendChild(testNameCell);

    for (const s of slugs) {
      const cell = document.createElement("td");
      const needsTesting = keys.some(
        (ln) =>
          !/\btranslations\b/i.test(ln) &&
          checklists[ln] &&
          checklists[ln][s] &&
          checklists[ln][s].done === false
      );

      const tchip = document.createElement("span");
      tchip.classList.add("chip");

      if (needsTesting) {
        tchip.textContent = "🛠";
        tchip.title = `Click to request test & mention ${s} in the comment`;
        tchip.style.background = "linear-gradient(180deg,#8e44ad,#6f2f91)";
        tchip.style.cursor = "pointer";
        tchip.setAttribute("role", "button");
        tchip.tabIndex = 0;

        const handler = this.createTestingHandler(s);
        tchip.addEventListener("click", handler);
        tchip.addEventListener("keydown", (ev) => {
          if (ev.key === "Enter" || ev.key === " ") handler(ev);
        });
      } else {
        tchip.classList.add("chip-missing");
        tchip.textContent = "-";
        tchip.title = "Testing already done or not needed!";
        tchip.style.cursor = "default";
      }

      cell.appendChild(tchip);
      testRow.appendChild(cell);
    }

    return testRow;
  },

  createChip: function (entry, s, isTranslationsRow) {
    const chip = document.createElement("span");
    chip.classList.add("chip");

    const isPresent = entry && typeof entry === "object";
    const doneState = isPresent ? Boolean(entry.done) : null;

    if (!isPresent) {
      chip.classList.add("chip-missing");
      chip.textContent = "-";
      chip.title = "Not Found";
      return chip;
    }

    // Set chip state and appearance
    if (doneState) {
      chip.classList.add("chip-true");
      chip.textContent = "✔";
      chip.title = "Click to mark as not done/not approved";
    } else {
      chip.classList.add("chip-false");
      chip.textContent = "✕";
      chip.title = "Click to mark as done/approved";
    }

    // Configure interactivity
    if (isTranslationsRow) {
      if (!doneState) {
        chip.setAttribute("role", "button");
        chip.tabIndex = 0;
        chip.style.cursor = "pointer";

        const handler = this.createTranslationHandler(s);
        chip.addEventListener("click", handler);
        chip.addEventListener("keydown", (ev) => {
          if (ev.key === "Enter" || ev.key === " ") handler(ev);
        });
      } else {
        chip.style.cursor = "default";
        chip.title = "Translation done!";
      }
    } else {
      chip.setAttribute("role", "button");
      chip.tabIndex = 0;
      chip.style.cursor = "pointer";

      const handler = this.createCheckpointSaveHandler(entry, s);
      chip.addEventListener("click", handler);
      chip.addEventListener("keydown", (ev) => {
        if (ev.key === "Enter" || ev.key === " ") handler(ev);
      });
    }

    return chip;
  },

  createTranslationHandler: function (s) {
    return (ev) => {
      ev?.preventDefault?.();
      const isSelected =
        window.FloatingChecklistState.toggleTranslationSelection(s);
      ev.target.classList.toggle("chip-active", isSelected);
      console.log(
        `[translation-request] Translation ${
          isSelected ? "selected" : "deselected"
        } for ${s}`
      );
    };
  },

  createTestingHandler: function (s) {
    return (ev) => {
      ev?.preventDefault?.();
      const isSelected = window.FloatingChecklistState.toggleTestSelection(s);
      ev.target.classList.toggle("chip-active", isSelected);
      console.log(
        `[testing-request] Testing ${
          isSelected ? "selected" : "deselected"
        } for ${s}`
      );
    };
  },

  createCheckpointSaveHandler: function (entry, s) {
    return async (ev) => {
      ev?.preventDefault?.();
      const desiredDone = !Boolean(entry.done);
      const chip = ev.target;
      const issueId = window.location.pathname.split("/").pop();
      const host = window.location.hostname;

      // Update UI to pending
      chip.classList.remove("chip-true", "chip-false");
      chip.classList.add("chip-pending");
      chip.textContent = "⏱";
      chip.title = "Pending...";

      if (!Array.isArray(entry.items) || entry.items.length === 0) {
        console.log("[checklist-debug] no checkpoint items for", s);
        chip.classList.remove("chip-pending");
        chip.classList.add("chip-missing");
        chip.textContent = "-";
        chip.title = "Not Found!";
        return;
      }

      const requests = entry.items.map(async (it) => {
        const checklist_id = it.checklist_id || it.checklistId || null;
        const checkpoint_id = it.checkpoint_id || it.checkpointId || null;
        const doneParam = desiredDone ? 1 : 0;
        const url = `https://${host}/api/issueLog/saveCheckpoint/?issue_id=${issueId}&checkpoint_id=${checkpoint_id}&checklist_id=${checklist_id}&done=${doneParam}`;
        console.log("[checklist-debug] SENDING:", url);

        try {
          const res = await fetch(url, {
            method: "POST",
            credentials: "include",
          });
          const text = await res.text().catch(() => "<no-body>");
          console.log(
            "[checklist-debug] RESPONSE for",
            checkpoint_id,
            res.status,
            text
          );
          return { ok: res.ok, status: res.status, body: text };
        } catch (err) {
          console.error("[checklist-debug] ERROR for", checkpoint_id, err);
          return { ok: false, error: String(err) };
        }
      });

      const results = await Promise.all(requests);
      const allOk = results.length > 0 && results.every((r) => r && r.ok);
      const prevDone = Boolean(entry.done);

      if (allOk) {
        entry.done = desiredDone;
      } else {
        entry.done = prevDone;
      }

      // Update UI based on results
      chip.classList.remove("chip-pending");
      if (allOk) {
        if (desiredDone) {
          chip.classList.add("chip-true");
          chip.textContent = "✔";
          chip.title = "Click to mark as not done/not approved";
        } else {
          chip.classList.add("chip-false");
          chip.textContent = "✕";
          chip.title = "Click to mark as done/approved";
        }
      } else {
        chip.classList.add(prevDone ? "chip-true" : "chip-false");
        chip.textContent = prevDone ? "✔" : "✕";
        chip.title = "Motyla noga, coś poszło not yes!";
        console.warn(
          "[checklist-debug] Partial/failure saving for slug",
          s,
          results
        );
      }
      console.log("[checklist-debug] RESULTS for slug", s, results);
    };
  },
};
