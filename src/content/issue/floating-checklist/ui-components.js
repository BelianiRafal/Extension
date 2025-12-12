// UI component creation functions
window.FloatingChecklistUIComponents = {
  // Helper function to check if a string is a URL
  isUrl: function (string) {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  },

  // Helper function to create a link chip
  createLinkChip: function (url, fieldName) {
    const chip = document.createElement("button");
    chip.classList.add("link-chip");

    // Add special classes based on field name
    if (fieldName.toLowerCase().includes("spreadsheet")) {
      chip.classList.add("spreadsheet");
      chip.textContent =
        "📊 " + fieldName.replace(/spreadsheet|newsletter/gi, "").trim();
    } else if (fieldName.toLowerCase().includes("figma")) {
      chip.classList.add("figma");
      chip.textContent = "🎨 Figma";
    } else if (fieldName.toLowerCase().includes("dropbox")) {
      chip.classList.add("dropbox");
      chip.textContent = "📁 Dropbox";
    } else if (fieldName.toLowerCase().includes("testing")) {
      chip.classList.add("testing");
      chip.textContent = "🧪 Testing";
    } else if (fieldName.toLowerCase().includes("banner")) {
      chip.textContent = "🖼️ Banners";
    } else if (fieldName.toLowerCase().includes("details")) {
      chip.textContent = "📋 Details";
    } else {
      chip.textContent = "🔗 " + fieldName.replace(/link|url/gi, "").trim();
    }

    chip.addEventListener("click", (e) => {
      e.preventDefault();
      window.open(url, "_blank");
    });

    return chip;
  },

  createPanelHeader: function (
    floating,
    issueTitle = null,
    issueStatus = null
  ) {
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
      if (issueStatus.toLowerCase() === "open") {
        statusChip.classList.add("status-open");
      } else if (issueStatus.toLowerCase() === "close") {
        statusChip.classList.add("status-closed");
      } else {
        statusChip.classList.add("status-other");
      }

      let processing = false;

      statusChip.onclick = async (e) => {
        e.stopPropagation();
        if (processing) return;

        statusChip.classList.add("status-processing");
        statusChip.textContent = "Changing status...";
        processing = true;
        // alert(`Issue Status: ${issueStatus}`);

        let formData = new FormData();
        formData.append("fn", "changeIssueState");
        formData.append(
          "issue_state",
          issueStatus.toLowerCase() === "open" ? "close" : "open"
        );
        formData.append("page_id", window.location.pathname.split("/").pop());

        let response = await fetch(
          "https://www.prologistics.info/js_backend.php",
          {
            body: formData,
            method: "post",
          }
        );


        processing = false;
        window.location.reload();
      };

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
      // Mark Test Sent row with a special attribute for styling
      if (/^Test Sent$/i.test(listName)) {
        row.setAttribute("data-test-sent", "1");
      }
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
        // For Translations row, color the CELL background to indicate
        // freshness (green/yellow/orange/grey) while the chip itself shows
        // the approval status (✔ / ✕ / -).
        if (isTranslationsRow) {
          if (!entry || typeof entry !== 'object') {
            cell.classList.add('translations-cell-empty');
          } else {
            try {
              const items = Array.isArray(entry.items) ? entry.items : [];
              let bestColor = 'grey';
              if (items.length > 0) {
                let best = items[0];
                let bestTs = Number(best.changed_at) || 0;
                for (const it of items) {
                  const ts = Number(it.changed_at) || 0;
                  if (ts > bestTs) {
                    best = it;
                    bestTs = ts;
                  }
                }
                bestColor = (best && best.color) || 'grey';
              }
              cell.classList.add(`translations-fresh-${bestColor}`);
            } catch (err) {
              cell.classList.add('translations-cell-empty');
            }
          }
        }
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

    // For translations we do not style the chip itself here. Cell-level
    // background will be applied in `createTableBody` for readability.

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

  createNewsletterInfoSection: async function () {
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
          typesValue.textContent = issueData.issue_type
            .map((t) => t.name)
            .join(", ");

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
        boardValue.textContent = `${
          issueData.issue_board_name || "Unknown"
        } → ${issueData.issue_board_column_name || "Unknown"}`;

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
          deptValue.textContent = issueData.department_id
            .map((d) => d.label)
            .join(", ");

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
            statusIndicator.title =
              "Someone else is assigned to solve this issue";
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
          for (const [fieldType, fields] of Object.entries(
            issueData.additional_fields
          )) {
            if (fields && Array.isArray(fields)) {
              for (const field of fields) {
                // console.log(field)
                if (field.value && String(field.value).trim()) {
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

          links.forEach((linkData) => {
            const linkChip = this.createLinkChip(linkData.url, linkData.name);
            linksContainer.appendChild(linkChip);
          });

          linksSection.appendChild(linksContainer);
          infoSection.appendChild(linksSection);
        }

        const goToLastCommentBtn = document.createElement("button");

        // in https://www.figma.com/design/OgmvlhPPGeZyNe8AnO59QH/
        goToLastCommentBtn.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.42285 2.01025C10.2501 1.25339 12.2614 1.05607 14.2012 1.44189C16.1409 1.82779 17.9228 2.77977 19.3213 4.17822C20.7197 5.57667 21.6717 7.35867 22.0576 9.29834C22.4434 11.2381 22.2461 13.2495 21.4893 15.0767C21.2692 15.6079 21.0031 16.1157 20.6982 16.5972C20.4339 16.4797 20.1481 16.4044 19.8496 16.3813V13.7466C20.2788 12.441 20.366 11.0434 20.0967 9.68896C19.788 8.13714 19.026 6.7111 17.9072 5.59229C16.7884 4.47347 15.3624 3.71151 13.8105 3.40283C12.2588 3.09425 10.6502 3.25343 9.18848 3.85889C7.72686 4.46441 6.4776 5.48973 5.59863 6.80518C4.71969 8.12071 4.25 9.66737 4.25 11.2495C4.25004 12.5742 4.56998 13.82 5.1377 14.9165C5.24291 15.1198 5.2755 15.3534 5.22949 15.5776L4.53418 18.9644L7.92188 18.27L8.09082 18.2505C8.26071 18.245 8.43041 18.2828 8.58301 18.3618C9.10738 18.6333 9.66691 18.8453 10.252 18.9956C10.2551 19.6383 10.4931 20.2717 10.9482 20.7622L10.9492 20.7642L11.3633 21.2095C10.1668 21.1041 9.02855 20.7887 7.98828 20.2974L3.45117 21.229C3.12199 21.2965 2.78059 21.1941 2.54297 20.9565C2.30536 20.7189 2.20305 20.3775 2.27051 20.0483L3.20215 15.5103C2.59109 14.2163 2.25004 12.7716 2.25 11.2495C2.25 9.2718 2.83684 7.33828 3.93555 5.69385C5.03429 4.0495 6.59577 2.76714 8.42285 2.01025Z" fill="black"/>
<path d="M12.2994 18.7422C12.2044 18.9656 12.2494 19.2246 12.4144 19.4023L15.8144 23.0586C15.9269 23.1805 16.0844 23.249 16.2494 23.249C16.4144 23.249 16.5719 23.1805 16.6844 23.0586L20.0844 19.4023C20.2494 19.2246 20.2944 18.9656 20.1994 18.7422C20.1044 18.5187 19.8869 18.374 19.6494 18.374H17.8494V11.0615C17.8494 10.6121 17.4919 10.249 17.0494 10.249H15.4494C15.0069 10.249 14.6494 10.6121 14.6494 11.0615V18.374H12.8494C12.6094 18.374 12.3944 18.5187 12.2994 18.7422Z" fill="black"/>
</svg>
`;
        goToLastCommentBtn.className = "go-to-last-comment-btn";

        goToLastCommentBtn.addEventListener("click", function () {
          let issuelog_table = document.querySelectorAll(".issuelog_table");

          if (issuelog_table.length > 0) {
            let tr = issuelog_table[0].querySelectorAll("tr");

            if (tr.length > 0) {
              tr[tr.length - 1].scrollIntoView({
                behavior: "smooth",
                block: "center",
              });
            }
          }
        });

        document.body.appendChild(goToLastCommentBtn);

        const goToChecklistsBtn = document.createElement("button");

        // in https://www.figma.com/design/OgmvlhPPGeZyNe8AnO59QH/
        goToChecklistsBtn.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.25 1.75C19.116 1.75 22.25 4.88401 22.25 8.75V15.25C22.25 16.3376 22.0012 17.3669 21.5586 18.2852C21.1715 17.7044 20.5634 17.2968 19.8672 17.1689C20.1131 16.5779 20.25 15.9301 20.25 15.25V8.75C20.25 5.98858 18.0114 3.75 15.25 3.75H8.75C5.98858 3.75 3.75 5.98858 3.75 8.75V15.25C3.75 18.0114 5.98858 20.25 8.75 20.25H10.0527C10.1457 20.7131 10.3628 21.1523 10.6982 21.5137L10.6992 21.5156L11.3818 22.25H8.75C4.88401 22.25 1.75 19.116 1.75 15.25V8.75C1.75 4.88401 4.88401 1.75 8.75 1.75H15.25ZM8.22559 14.502C8.543 14.5334 8.84411 14.6582 9.09082 14.8604L9.20898 14.9678L9.31641 15.0859C9.55235 15.3737 9.68262 15.7359 9.68262 16.1113C9.68253 16.54 9.51213 16.9507 9.20898 17.2539C8.90583 17.5571 8.49512 17.7274 8.06641 17.7275C7.63755 17.7275 7.2261 17.5572 6.92285 17.2539C6.65751 16.9885 6.49372 16.6407 6.45703 16.2705L6.44922 16.1113L6.45703 15.9512C6.49379 15.581 6.65752 15.2331 6.92285 14.9678L7.04102 14.8604C7.32878 14.6245 7.69107 14.4941 8.06641 14.4941L8.22559 14.502ZM12.3994 17.1113H11.6924C11.1402 17.1113 10.6926 16.6635 10.6924 16.1113C10.6924 15.559 11.1401 15.1113 11.6924 15.1113H12.3994V17.1113ZM8.06641 15.7275C7.96485 15.7275 7.86674 15.768 7.79492 15.8398C7.72309 15.9117 7.68262 16.0098 7.68262 16.1113L7.69043 16.1865C7.70519 16.2599 7.74122 16.3281 7.79492 16.3818C7.86675 16.4537 7.96483 16.4941 8.06641 16.4941C8.14239 16.4941 8.216 16.4712 8.27832 16.4297L8.33691 16.3818C8.39065 16.3281 8.42663 16.2599 8.44141 16.1865L8.44922 16.1113L8.44141 16.0361C8.43161 15.987 8.41256 15.9401 8.38477 15.8984L8.33691 15.8398C8.28296 15.7859 8.21436 15.75 8.14062 15.7354L8.06641 15.7275ZM8.22559 10.3906C8.59572 10.4273 8.94362 10.5912 9.20898 10.8564C9.51223 11.1597 9.68262 11.5711 9.68262 12C9.68262 12.4289 9.51223 12.8403 9.20898 13.1436C8.90586 13.4465 8.49498 13.6171 8.06641 13.6172C7.63765 13.6172 7.22608 13.4467 6.92285 13.1436C6.65759 12.8783 6.49385 12.5302 6.45703 12.1602L6.44922 12L6.45703 11.8398C6.49385 11.4698 6.65759 11.1217 6.92285 10.8564L7.04102 10.749C7.32876 10.5132 7.69114 10.3828 8.06641 10.3828L8.22559 10.3906ZM12.5186 11C12.4408 11.2584 12.3994 11.5314 12.3994 11.8125V13H11.6924C11.1401 13 10.6924 12.5523 10.6924 12C10.6924 11.4477 11.1401 11 11.6924 11H12.5186ZM8.06641 11.6172C7.96493 11.6172 7.86673 11.6568 7.79492 11.7285V11.7295C7.72327 11.8013 7.68262 11.8986 7.68262 12C7.68262 12.1014 7.72327 12.1987 7.79492 12.2705C7.86675 12.3423 7.96483 12.3828 8.06641 12.3828C8.1677 12.3827 8.26423 12.3421 8.33594 12.2705H8.33691C8.39063 12.2167 8.42669 12.1487 8.44141 12.0752L8.44922 12L8.44141 11.9248C8.43157 11.8757 8.41258 11.8288 8.38477 11.7871L8.33691 11.7295L8.33594 11.7285C8.28206 11.6749 8.21408 11.6386 8.14062 11.624L8.06641 11.6172ZM8.22559 6.28027C8.54306 6.31176 8.84409 6.43643 9.09082 6.63867L9.20898 6.74609L9.31641 6.86426C9.55219 7.15194 9.68254 7.51347 9.68262 7.88867C9.68262 8.31752 9.51223 8.72898 9.20898 9.03223C8.90584 9.3353 8.49506 9.50575 8.06641 9.50586C7.63757 9.50586 7.2261 9.33545 6.92285 9.03223C6.65752 8.76689 6.49379 8.41899 6.45703 8.04883L6.44922 7.88867L6.45703 7.72949C6.49372 7.35927 6.65751 7.01149 6.92285 6.74609L7.04102 6.63867C7.32881 6.40273 7.691 6.27246 8.06641 6.27246L8.22559 6.28027ZM16.2119 6.88867C16.7641 6.88867 17.2117 7.33654 17.2119 7.88867C17.2119 8.44096 16.7642 8.88867 16.2119 8.88867H11.6924C11.1401 8.88867 10.6924 8.44096 10.6924 7.88867C10.6926 7.33654 11.1402 6.88867 11.6924 6.88867H16.2119ZM8.06641 7.50586C7.96483 7.50586 7.86675 7.54634 7.79492 7.61816C7.72325 7.6899 7.6827 7.78727 7.68262 7.88867C7.68262 7.99025 7.72309 8.08833 7.79492 8.16016C7.86674 8.23196 7.96485 8.27246 8.06641 8.27246C8.14233 8.27238 8.21603 8.24947 8.27832 8.20801L8.33691 8.16016C8.39082 8.10625 8.42671 8.03755 8.44141 7.96387L8.44922 7.88867L8.44141 7.81348C8.43158 7.76466 8.41236 7.71821 8.38477 7.67676L8.33691 7.61816C8.28295 7.5642 8.21439 7.52834 8.14062 7.51367L8.06641 7.50586Z" fill="black"/>
<path d="M12.0492 19.4932C11.9542 19.7166 11.9992 19.9756 12.1642 20.1533L15.5642 23.8096C15.6767 23.9314 15.8342 24 15.9992 24C16.1642 24 16.3217 23.9314 16.4342 23.8096L19.8342 20.1533C19.9992 19.9756 20.0442 19.7166 19.9492 19.4932C19.8542 19.2697 19.6367 19.125 19.3992 19.125H17.5992V11.8125C17.5992 11.3631 17.2417 11 16.7992 11H15.1992C14.7567 11 14.3992 11.3631 14.3992 11.8125V19.125H12.5992C12.3592 19.125 12.1442 19.2697 12.0492 19.4932Z" fill="black"/>
</svg>
`;

        goToChecklistsBtn.className = "go-to-checklists-btn";

        goToChecklistsBtn.addEventListener("click", function () {
          let panel_group = document.querySelectorAll(".panel-group")[2];

          if (panel_group) {
            panel_group.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        });

        document.body.appendChild(goToChecklistsBtn);

        // Return both the info section and the issue data for header
        return {
          infoSection: infoSection,
          issueTitle: issueData.issue || null,
          issueStatus: issueData.status || null,
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
          issueStatus: null,
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
        issueStatus: null,
      };
    }
  },
};
