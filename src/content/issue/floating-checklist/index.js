// Main entry point for floating checklist
window.FloatingChecklistMain = {
  existingPanel: null,

  displayChecklists: async function (checklists) {
    console.log('[display] Rendering checklists:', checklists);

    // Remove existing panel if present
    if (this.existingPanel) {
      this.existingPanel.remove();
      this.existingPanel = null;
    }

    // Check if we have valid data - but still show panel even if no checklists
    if (!checklists || typeof checklists !== 'object') {
      console.error('[display] Invalid checklists data');
      checklists = {}; // Create empty object to continue
    }

    const keys = Object.keys(checklists);
    console.log('keys', keys);
    const hasChecklists = keys.length > 0;

    // Extract all unique slugs only if we have checklists
    let slugs = [];
    if (hasChecklists) {
      const allSlugs = new Set();
      for (const listName of keys) {
        const map = checklists[listName] || {};
        for (const slug of Object.keys(map)) {
          allSlugs.add(slug);
        }
      }
      slugs = Array.from(allSlugs).sort();
    }

    if (!hasChecklists) {
      console.log(
        '[display] No checklists to display, showing issue info only'
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
      console.error('[display] Error creating newsletter info section:', error);
    }

    // Create floating panel
    const floating = document.createElement('div');
    floating.classList.add('checklist-floating');

    // Apply collapsed state
    const { UI_CONFIG } = window.FloatingChecklistConfig;
    const isCollapsed = localStorage.getItem(UI_CONFIG.COLLAPSED_KEY) === '1';
    if (isCollapsed) {
      floating.classList.add('collapsed');
    }

    // Create header with issue title and status
    const header = window.FloatingChecklistUIComponents.createPanelHeader(
      floating,
      issueTitle,
      issueStatus
    );
    floating.appendChild(header);

    // Create content container
    const content = document.createElement('div');
    content.classList.add('checklist-content');

    console.log('hasChecklists and slugs.length', hasChecklists, slugs.length);

    // Only create table if we have checklists
    if (hasChecklists && slugs.length > 0) {
      // Create table container for horizontal scroll
      const tableContainer = document.createElement('div');
      tableContainer.classList.add('table-container');

      // Create table
      const table = document.createElement('table');
      table.classList.add('checklist-table');

      // check if it is newsletter or cgb
      let path = window.location.pathname;

      if (path.endsWith('/')) path = path.slice(0, -1);

      const issue_id = path.split('/').pop();
      const url = `https://${window.location.hostname}/api/issueLog/list/?page_id=${issue_id}&show_with_inactive=1`;

      const data = await fetch(url);
      const dataJson = await data.json();
      const isCGB =
        dataJson.issue_list[0].issue_board_column_name ===
        'CENTRAL GRID BANNERS';

      // Create table parts
      const thead =
        window.FloatingChecklistUIComponents.createTableHeader(slugs);
      const tbody = window.FloatingChecklistUIComponents.createTableBody(
        checklists,
        keys,
        slugs,
        isCGB
      );

      table.appendChild(thead);
      table.appendChild(tbody);
      tableContainer.appendChild(table);
      content.appendChild(tableContainer);
    } else {
      // Show message when no checklists
      const noChecklistsMsg = document.createElement('div');
      noChecklistsMsg.style.padding = '12px';
      noChecklistsMsg.style.textAlign = 'center';
      noChecklistsMsg.style.color = '#666';
      noChecklistsMsg.style.fontStyle = 'italic';
      noChecklistsMsg.textContent = 'No checklists available for this issue';
      content.appendChild(noChecklistsMsg);
    }

    // Add newsletter info section below table
    if (newsletterInfoResult && newsletterInfoResult.infoSection) {
      content.appendChild(newsletterInfoResult.infoSection);
    } else {
      // Add fallback info section
      const fallbackInfo = document.createElement('div');
      fallbackInfo.classList.add('newsletter-info');
      fallbackInfo.textContent = 'Failed to load newsletter information';
      content.appendChild(fallbackInfo);
    }

    floating.appendChild(content);

    // Add to DOM
    document.body.appendChild(floating);
    this.existingPanel = floating;

    console.log('[display] Floating checklist panel created successfully');
  },

  initializeFloatingChecklist: async function () {
    console.log('[init] Starting floating checklist initialization');

    try {
      const checklists =
        await window.FloatingChecklistDataProcessor.getChecklists();
      await this.displayChecklists(checklists);
    } catch (error) {
      console.error('[init] Failed to initialize floating checklist:', error);
    }
  },
};

// Auto-initialize when script loads
window.FloatingChecklistMain.initializeFloatingChecklist();
