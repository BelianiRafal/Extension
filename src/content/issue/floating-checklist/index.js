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

    // Checklisty do pogrupowania w jedną tabelę
    const GROUPED_CHECKLISTS = [
      "Newsletter Translations",
      "Newsletter Testing approved",
      "LPs approved"
    ];

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

    // Display checklists
    if (hasChecklists) {
      // Zbierz dane dla checklisty grupowanej
      const groupedChecklistsData = {};
      const groupedChecklistsSlugs = new Set();
      const otherChecklistsKeys = [];

      for (const checklistName of keys) {
        if (GROUPED_CHECKLISTS.includes(checklistName)) {
          const checklistData = checklists[checklistName] || {};
          groupedChecklistsData[checklistName] = checklistData;
          Object.keys(checklistData).forEach(slug => groupedChecklistsSlugs.add(slug));
        } else {
          otherChecklistsKeys.push(checklistName);
        }
      }

      // Wyświetl pogrupowaną tabelę jeśli ma dane
      if (Object.keys(groupedChecklistsData).length > 0) {
        const sectionHeader = document.createElement("h4");
        sectionHeader.style.cssText = `
          margin: 16px 0 8px 0;
          padding: 8px 12px;
          background-color: #f0f0f0;
          border-left: 4px solid #4a90e2;
          font-weight: bold;
          color: #333;
        `;
        sectionHeader.textContent = "Main Checklists";
        content.appendChild(sectionHeader);

        const tableContainer = document.createElement("div");
        tableContainer.classList.add("table-container");

        const table = document.createElement("table");
        table.classList.add("checklist-table");
        table.style.fontSize = "12px";

        // Wszystkie slugs z tych checklisty
        const allGroupedSlugs = Array.from(groupedChecklistsSlugs).sort();

        // Header z kolumnami: ChecklistName + Slugs
        const thead = document.createElement("thead");
        const headerRow = document.createElement("tr");
        
        const checklistNameTh = document.createElement("th");
        checklistNameTh.style.cssText = `
          width: 130px;
          word-wrap: break-word;
          overflow-wrap: break-word;
          white-space: normal;
          padding: 8px;
          text-align: left;
          font-weight: bold;
          border: 1px solid #ddd;
          background-color: #f9f9f9;
        `;
        checklistNameTh.textContent = "Checklist";
        headerRow.appendChild(checklistNameTh);

        // Dodaj headers dla każdego slug
        for (const slug of allGroupedSlugs) {
          const th = document.createElement("th");
          th.style.cssText = `
            width: 130px;
            word-wrap: break-word;
            overflow-wrap: break-word;
            white-space: normal;
            padding: 8px;
            text-align: center;
            font-weight: bold;
            border: 1px solid #ddd;
            background-color: #f9f9f9;
          `;
          th.textContent = slug;
          headerRow.appendChild(th);
        }
        thead.appendChild(headerRow);
        table.appendChild(thead);

        // Body - dla każdej checklisty z grupy
        const tbody = document.createElement("tbody");
        for (const checklistName of GROUPED_CHECKLISTS) {
          if (!groupedChecklistsData[checklistName]) continue;

          const checklistData = groupedChecklistsData[checklistName];
          const tr = document.createElement("tr");

          // Nazwa checklisty
          const nameTd = document.createElement("td");
          nameTd.style.cssText = `
            width: 130px;
            word-wrap: break-word;
            overflow-wrap: break-word;
            white-space: normal;
            padding: 8px;
            border: 1px solid #ddd;
            font-weight: bold;
            background-color: #fafafa;
          `;
          nameTd.textContent = checklistName;
          tr.appendChild(nameTd);

          // Komórki dla każdego slug
          for (const slug of allGroupedSlugs) {
            const td = document.createElement("td");
            td.style.cssText = `
              width: 130px;
              word-wrap: break-word;
              overflow-wrap: break-word;
              white-space: normal;
              padding: 8px;
              border: 1px solid #ddd;
              text-align: center;
            `;

            if (checklistData[slug]) {
              // Zaimplementuj logikę renderowania jak w ui-components
              const cellContent = window.FloatingChecklistUIComponents.createTableCell(
                checklistData[slug],
                slug
              );
              td.appendChild(cellContent);
            }
            tr.appendChild(td);
          }
          tbody.appendChild(tr);
        }
        table.appendChild(tbody);
        tableContainer.appendChild(table);
        content.appendChild(tableContainer);
      }

      // Wyświetl inne checklisty osobno
      for (const checklistName of otherChecklistsKeys) {
        const checklistData = checklists[checklistName] || {};
        const slugsInChecklist = Object.keys(checklistData).sort();

        if (slugsInChecklist.length > 0) {
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

          const tableContainer = document.createElement("div");
          tableContainer.classList.add("table-container");

          const table = document.createElement("table");
          table.classList.add("checklist-table");
          table.style.fontSize = "12px";

          const thead = window.FloatingChecklistUIComponents.createTableHeader(slugsInChecklist);
          const tbody = window.FloatingChecklistUIComponents.createTableBody(
            { [checklistName]: checklistData },
            [checklistName],
            slugsInChecklist
          );

          // Dodaj style do th elementów
          const ths = thead.querySelectorAll("th");
          ths.forEach(th => {
            th.style.width = "130px";
            th.style.wordWrap = "break-word";
            th.style.overflowWrap = "break-word";
            th.style.whiteSpace = "normal";
          });

          // Dodaj style do td elementów
          const tds = tbody.querySelectorAll("td");
          tds.forEach(td => {
            td.style.width = "130px";
            td.style.wordWrap = "break-word";
            td.style.overflowWrap = "break-word";
            td.style.whiteSpace = "normal";
          });

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
