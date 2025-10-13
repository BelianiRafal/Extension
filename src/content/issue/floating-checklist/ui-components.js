// UI component creation functions
window.FloatingChecklistUIComponents = {
  
  // Helper function to check if a string is a URL
  isUrl: function(string) {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  },

  // Helper function to create a link chip
  createLinkChip: function(url, fieldName) {
    const chip = document.createElement("button");
    chip.classList.add("link-chip");
    
    // Add special classes based on field name
    if (fieldName.toLowerCase().includes('spreadsheet')) {
      chip.classList.add("spreadsheet");
      chip.textContent = "📊 " + fieldName.replace(/spreadsheet|newsletter/gi, '').trim();
    } else if (fieldName.toLowerCase().includes('figma')) {
      chip.classList.add("figma");
      chip.textContent = "🎨 Figma";
    } else if (fieldName.toLowerCase().includes('dropbox')) {
      chip.classList.add("dropbox");
      chip.textContent = "📁 Dropbox";
    } else if (fieldName.toLowerCase().includes('testing')) {
      chip.classList.add("testing");
      chip.textContent = "🧪 Testing";
    } else if (fieldName.toLowerCase().includes('banner')) {
      chip.textContent = "🖼️ Banners";
    } else if (fieldName.toLowerCase().includes('details')) {
      chip.textContent = "📋 Details";
    } else {
      chip.textContent = "🔗 " + fieldName.replace(/link|url/gi, '').trim();
    }
    
    chip.addEventListener("click", (e) => {
      e.preventDefault();
      window.open(url, '_blank');
    });
    
    return chip;
  },

  createPanelHeader: function (floating, issueTitle = null, issueStatus = null) {
    const header = document.createElement("div");
    header.classList.add("checklist-header");

    const title = document.createElement("div");
    title.classList.add("checklist-title");
    
    if (issueTitle && issueStatus) {
      // Create title text
      const titleText = document.createElement("span");
      titleText.textContent = issueTitle;
      title.appendChild(titleText);
      
      // Create status chip
      const statusChip = document.createElement("span");
      statusChip.classList.add("status-chip");
      statusChip.textContent = issueStatus;
      
      // Set color based on status
      if (issueStatus.toLowerCase() === 'open') {
        statusChip.classList.add("status-open");
      } else if (issueStatus.toLowerCase() === 'close') {
        statusChip.classList.add("status-closed");
      } else {
        statusChip.classList.add("status-other");
      }
      
      title.appendChild(statusChip);
    } else {
      title.textContent = "Checklists";
    }

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
        chip.title = `Click to request translation & mention ${s} in the comment`;

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
        console.log(
          "[checklist-debug] Partial/failure saving for slug",
          s,
          results
        );
      }
      console.log("[checklist-debug] RESULTS for slug", s, results);
    };
  },

  createNewsletterInfoSection: async function() {
    const infoSection = document.createElement("div");
    infoSection.classList.add("newsletter-info");
    
    let path = window.location.pathname;

    if (path.endsWith("/")) path = path.slice(0, -1);

    const issue_id = path.split("/").pop();
    
    try {
      // Fetch issue data from API
      const response = await fetch(
        `https://${window.location.hostname}/api/issueLog/list/?page_id=${issue_id}&show_with_inactive=1`
      );
      
      const data = await response.json();
      const issueData = data.issue_list?.[0];
      
      if (issueData) {
        // Issue Types
        if (issueData.issue_type && issueData.issue_type.length > 0) {
          const typesSection = document.createElement("div");
          typesSection.classList.add("info-section");
          
          const typesLabel = document.createElement("div");
          typesLabel.classList.add("info-label");
          typesLabel.textContent = "Issue Types:";
          
          const typesValue = document.createElement("div");
          typesValue.classList.add("info-value");
          typesValue.textContent = issueData.issue_type.map(t => t.name).join(", ");
          
          typesSection.appendChild(typesLabel);
          typesSection.appendChild(typesValue);
          infoSection.appendChild(typesSection);
        }
        
        // Board and Column
        const boardSection = document.createElement("div");
        boardSection.classList.add("info-section");
        
        const boardLabel = document.createElement("div");
        boardLabel.classList.add("info-label");
        boardLabel.textContent = "Board:";
        
        const boardValue = document.createElement("div");
        boardValue.classList.add("info-value");
        boardValue.textContent = `${issueData.issue_board_name || "Unknown"} → ${issueData.issue_board_column_name || "Unknown"}`;
        
        boardSection.appendChild(boardLabel);
        boardSection.appendChild(boardValue);
        infoSection.appendChild(boardSection);
        
        // Departments
        if (issueData.department_id && issueData.department_id.length > 0) {
          const deptSection = document.createElement("div");
          deptSection.classList.add("info-section");
          
          const deptLabel = document.createElement("div");
          deptLabel.classList.add("info-label");
          deptLabel.textContent = "Departments:";
          
          const deptValue = document.createElement("div");
          deptValue.classList.add("info-value");
          deptValue.textContent = issueData.department_id.map(d => d.label).join(", ");
          
          deptSection.appendChild(deptLabel);
          deptSection.appendChild(deptValue);
          infoSection.appendChild(deptSection);
        }
        
        // Solving Person
        if (issueData.solving_user_name) {
          const solvingSection = document.createElement("div");
          solvingSection.classList.add("info-section");
          
          const solvingLabel = document.createElement("div");
          solvingLabel.classList.add("info-label");
          solvingLabel.textContent = "Solving Person:";
          
          const solvingValue = document.createElement("div");
          solvingValue.classList.add("info-value");
          
          // Get current logged user from logout link
          const logoutLink = document.querySelector('a[href="/logout.php"]');
          let currentUser = null;
          if (logoutLink) {
            const logoutText = logoutLink.innerText || logoutLink.textContent;
            currentUser = logoutText.replace("Logout ", "").trim();
          }
          
          // Compare solving person with current user
          const solvingPerson = issueData.solving_user_name.trim();
          const isCurrentUser = currentUser && currentUser === solvingPerson;
          
          // Create solving person display with status indicator
          const solvingContainer = document.createElement("div");
          solvingContainer.style.display = "flex";
          solvingContainer.style.alignItems = "center";
          solvingContainer.style.gap = "6px";
          
          const solvingText = document.createElement("span");
          solvingText.textContent = solvingPerson;
          
          const statusIndicator = document.createElement("span");
          statusIndicator.style.fontSize = "14px";
          statusIndicator.style.fontWeight = "bold";
          
          if (isCurrentUser) {
            statusIndicator.textContent = "✔";
            statusIndicator.style.color = "#4caf50";
            statusIndicator.title = "You are assigned to solve this issue";
          } else {
            statusIndicator.textContent = "❌";
            statusIndicator.style.color = "#f44336";
            statusIndicator.title = "Someone else is assigned to solve this issue";
          }
          
          solvingContainer.appendChild(solvingText);
          solvingContainer.appendChild(statusIndicator);
          solvingValue.appendChild(solvingContainer);
          
          solvingSection.appendChild(solvingLabel);
          solvingSection.appendChild(solvingValue);
          infoSection.appendChild(solvingSection);
        }
        
        // Additional Fields - collect links first, display text fields normally
        const links = [];
        
        if (issueData.additional_fields) {
          for (const [fieldType, fields] of Object.entries(issueData.additional_fields)) {
            if (fields && Array.isArray(fields)) {
              for (const field of fields) {
                if (field.value && field.value.trim()) {
                  // Check if the field value is a URL
                  if (this.isUrl(field.value)) {
                    // Collect links for later display
                    links.push({ url: field.value, name: field.name });
                  } else {
                    // Display non-URL fields normally
                    const fieldSection = document.createElement("div");
                    fieldSection.classList.add("info-section");
                    
                    const fieldLabel = document.createElement("div");
                    fieldLabel.classList.add("info-label");
                    fieldLabel.textContent = `${field.name}:`;
                    
                    const fieldValue = document.createElement("div");
                    fieldValue.classList.add("info-value");
                    fieldValue.textContent = field.value;
                    
                    fieldSection.appendChild(fieldLabel);
                    fieldSection.appendChild(fieldValue);
                    infoSection.appendChild(fieldSection);
                  }
                }
              }
            }
          }
        }
        
        // Display all links in one row at the end
        if (links.length > 0) {
          const linksSection = document.createElement("div");
          linksSection.classList.add("info-section");
          
          const linksContainer = document.createElement("div");
          linksContainer.classList.add("links-container");
          
          links.forEach(linkData => {
            const linkChip = this.createLinkChip(linkData.url, linkData.name);
            linksContainer.appendChild(linkChip);
          });
          
          linksSection.appendChild(linksContainer);
          infoSection.appendChild(linksSection);
        }

        const goToLastCommentBtn = document.createElement("button");
        
        goToLastCommentBtn.textContent = "Last Comment";
        goToLastCommentBtn.className = "link-chip";

        goToLastCommentBtn.addEventListener("click", function() {
          let issuelog_table = document.querySelectorAll(".issuelog_table");

          if (issuelog_table.length > 0) {
            let tr = issuelog_table[0].querySelectorAll("tr");
            
            if (tr.length > 0) {
              tr[tr.length - 1].scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
          }
        });
        
        infoSection.appendChild(goToLastCommentBtn);


        const goToChecklistsBtn = document.createElement("button");

        goToChecklistsBtn.textContent = "Checklists";
        goToChecklistsBtn.className = "link-chip go-to-checklists-btn";

        goToChecklistsBtn.addEventListener("click", function() {
          let panel_group = document.querySelectorAll(".panel-group")[2];
          
          if (panel_group) {
            panel_group.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        });

        infoSection.appendChild(goToChecklistsBtn);

        // Return both the info section and the issue data for header
        return {
          infoSection: infoSection,
          issueTitle: issueData.issue || null,
          issueStatus: issueData.status || null
        };

      } else {
        // Fallback: show error
        const errorSection = document.createElement("div");
        errorSection.classList.add("info-section");
        
        const errorLabel = document.createElement("div");
        errorLabel.classList.add("info-label");
        errorLabel.textContent = "Error:";
        
        const errorValue = document.createElement("div");
        errorValue.classList.add("info-value");
        errorValue.textContent = "No issue data found";
        
        errorSection.appendChild(errorLabel);
        errorSection.appendChild(errorValue);
        infoSection.appendChild(errorSection);
        
        return {
          infoSection: infoSection,
          issueTitle: null,
          issueStatus: null
        };
      }
      
    } catch (error) {
      console.error("Error fetching issue data:", error);
      
      // Fallback: show error
      const errorSection = document.createElement("div");
      errorSection.classList.add("info-section");
      
      const errorLabel = document.createElement("div");
      errorLabel.classList.add("info-label");
      errorLabel.textContent = "Error:";
      
      const errorValue = document.createElement("div");
      errorValue.classList.add("info-value");
      errorValue.textContent = "Failed to fetch issue data";
      
      errorSection.appendChild(errorLabel);
      errorSection.appendChild(errorValue);
      infoSection.appendChild(errorSection);
      
      return {
        infoSection: infoSection,
        issueTitle: null,
        issueStatus: null
      };
    }
  }
};
