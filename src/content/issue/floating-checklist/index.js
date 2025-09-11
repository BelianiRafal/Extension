// Main entry point for floating checklist
window.FloatingChecklistMain = {
  existingPanel: null,

  displayChecklists: function (checklists) {
    console.log("[display] Rendering checklists:", checklists);

    // Remove existing panel if present
    if (this.existingPanel) {
      this.existingPanel.remove();
      this.existingPanel = null;
    }

    // Check if we have valid data
    if (!checklists || typeof checklists !== "object") {
      console.error("[display] Invalid checklists data");
      return;
    }

    const keys = Object.keys(checklists);
    if (keys.length === 0) {
      console.warn("[display] No checklists to display");
      return;
    }

    // Extract all unique slugs
    const allSlugs = new Set();
    for (const listName of keys) {
      const map = checklists[listName] || {};
      for (const slug of Object.keys(map)) {
        allSlugs.add(slug);
      }
    }
    const slugs = Array.from(allSlugs).sort();

    if (slugs.length === 0) {
      console.warn("[display] No slugs found in checklists");
      return;
    }

    // Create floating panel
    const floating = document.createElement("div");
    floating.classList.add("checklist-floating");

    // Apply collapsed state
    const { UI_CONFIG } = window.FloatingChecklistConfig;
    const isCollapsed = localStorage.getItem(UI_CONFIG.COLLAPSED_KEY) === "1";
    if (isCollapsed) {
      floating.classList.add("collapsed");
    }

    // Create header
    const header =
      window.FloatingChecklistUIComponents.createPanelHeader(floating);
    floating.appendChild(header);

    // Create content container
    const content = document.createElement("div");
    content.classList.add("checklist-content");

    // Create table
    const table = document.createElement("table");
    table.classList.add("checklist-table");

    // Create table parts
    const thead = window.FloatingChecklistUIComponents.createTableHeader(slugs);
    const tbody = window.FloatingChecklistUIComponents.createTableBody(
      checklists,
      keys,
      slugs
    );

    table.appendChild(thead);
    table.appendChild(tbody);
    content.appendChild(table);

    floating.appendChild(content);

    // Add to DOM
    document.body.appendChild(floating);
    this.existingPanel = floating;

    console.log("[display] Floating checklist panel created successfully");
  },

  initializeFloatingChecklist: async function () {
    console.log("[init] Starting floating checklist initialization");

    try {
      const checklists =
        await window.FloatingChecklistDataProcessor.getChecklists();
      this.displayChecklists(checklists);
    } catch (error) {
      console.error("[init] Failed to initialize floating checklist:", error);
    }
  },
};

// Auto-initialize when script loads
window.FloatingChecklistMain.initializeFloatingChecklist();
