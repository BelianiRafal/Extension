// Main entry point for floating checklist
window.FloatingChecklistMain = {
  existingPanel: null,

  displayChecklists: async function (checklists) {
    console.log("[display] Rendering checklists:", checklists);

    // Remove existing panel if present
    if (this.existingPanel) {
      this.existingPanel.remove();
      this.existingPanel = null;
    }

    // Check if we have valid data - but still show panel even if no checklists
    if (!checklists || typeof checklists !== "object") {
      console.error("[display] Invalid checklists data");
      checklists = {}; // Create empty object to continue
    }

    const keys = Object.keys(checklists);
    const hasChecklists = keys.length > 0;

    if (!hasChecklists) {
      console.log(
        "[display] No checklists to display, showing issue info only"
      );
    }

    // Fetch newsletter info first to get issue title and status
    let issueTitle = null;
    let issueStatus = null;
    let newsletterInfoResult = null;

    try {
      newsletterInfoResult =
        await window.FloatingChecklistUIComponents.createNewsletterInfoSection();
      issueTitle = newsletterInfoResult.issueTitle;
      issueStatus = newsletterInfoResult.issueStatus;
    } catch (error) {
      console.error("[display] Error creating newsletter info section:", error);
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

    // Create header with issue title and status
    const header = window.FloatingChecklistUIComponents.createPanelHeader(
      floating,
      issueTitle,
      issueStatus
    );
    floating.appendChild(header);

    // Create content container
    const content = document.createElement("div");
    content.classList.add("checklist-content");

    // Display each checklist as a separate table with its own header
    if (hasChecklists) {
      for (const checklistName of keys) {
        const checklistData = checklists[checklistName] || {};
        const slugsInChecklist = Object.keys(checklistData).sort();

        // Only display if checklist has items
        if (slugsInChecklist.length > 0) {
          // Create section header for this checklist
          const sectionHeader = document.createElement("h4");
          sectionHeader.style.cssText = `
            margin: 16px 0 8px 0;
            padding: 8px 12px;
            background-color: #f0f0f0;
            border-left: 4px solid #4a90e2;
            font-weight: bold;
            color: #333;
          `;
          sectionHeader.textContent = checklistName;
          content.appendChild(sectionHeader);

          // Create table container for this checklist
          const tableContainer = document.createElement("div");
          tableContainer.classList.add("table-container");

          // Create table
          const table = document.createElement("table");
          table.classList.add("checklist-table");

          // Create table parts with all slugs from this checklist
          const thead = window.FloatingChecklistUIComponents.createTableHeader(slugsInChecklist);
          const tbody = window.FloatingChecklistUIComponents.createTableBody(
            checklists,
            [checklistName],  // Only this checklist
            slugsInChecklist
          );

          table.appendChild(thead);
          table.appendChild(tbody);
          tableContainer.appendChild(table);
          content.appendChild(tableContainer);
        }
      }
    }

    // Show message if no checklists at all
    if (!hasChecklists) {
      const noChecklistsMsg = document.createElement("div");
      noChecklistsMsg.style.padding = "12px";
      noChecklistsMsg.style.textAlign = "center";
      noChecklistsMsg.style.color = "#666";
      noChecklistsMsg.style.fontStyle = "italic";
      noChecklistsMsg.textContent = "No checklists available for this issue";
      content.appendChild(noChecklistsMsg);
    }

    // Add newsletter info section below tables
    if (newsletterInfoResult && newsletterInfoResult.infoSection) {
      content.appendChild(newsletterInfoResult.infoSection);
    } else {
      // Add fallback info section
      const fallbackInfo = document.createElement("div");
      fallbackInfo.classList.add("newsletter-info");
      fallbackInfo.textContent = "Failed to load newsletter information";
      content.appendChild(fallbackInfo);
    }

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
      await this.displayChecklists(checklists);
    } catch (error) {
      console.error("[init] Failed to initialize floating checklist:", error);
    }
  },
};

// Auto-initialize when script loads
window.FloatingChecklistMain.initializeFloatingChecklist();
