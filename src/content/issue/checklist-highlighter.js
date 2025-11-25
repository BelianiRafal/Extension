// Checklist Highlighter - Kolorowanie wierszy checklisty według daty
// Pattern based on floating-checklist for better scope management

window.ChecklistHighlighter = {
  // Configuration
  config: {
    colors: {
      today: '#d0f5c7',
      yesterday: '#f6fac8',
      day2: '#faedc8',
      day3: '#ecd7b4',
    }
  },
  
  // State management
  state: {
    isHighlighting: false,
    highlightedElements: new Set(),
    lastTodayCount: 0,
    isUpdatingBadge: false,
    observerTimeout: null,
  },
  
  // API helper
  jget: async function(url) {
    try {
      const r = await fetch(url, {credentials:'include'});
      if (!r.ok) throw new Error(`${url} -> ${r.status}`);
      return r.json();
    } catch(e) {
      console.error('[CHECKLIST API] Błąd fetch:', e);
      return null;
    }
  },
  
  // Get current issue ID from URL
  getCurrentIssueId: function() {
    const match = window.location.href.match(/issue_logs\/(\d+)/);
    return match ? match[1] : null;
  },
  
  // Fetch checklist data from API
  getChecklistDataFromAPI: async function(issueId) {
    console.log(`📡 [CHECKLIST API] Pobieranie danych dla issue #${issueId}`);
    const url = `https://www.prologistics.info/api/issueLog/checklist/?issue_id=${issueId}`;
    const data = await this.jget(url);
    
    if (!data || !data.checklists) {
      console.warn('[CHECKLIST API] Brak danych checklisty');
      return null;
    }
    
    // Find "Newsletter Translations" checklist
    const translationsChecklist = data.checklists.find(cl => 
      cl.title && cl.title.toLowerCase().includes('newsletter translations')
    );
    
    if (!translationsChecklist) {
      console.warn('[CHECKLIST API] Nie znaleziono checklisty "Newsletter Translations"');
      return null;
    }
    
    return {
      items: translationsChecklist.checkpoints || []
    };
  },
  
  // Main highlighting logic
  highlightRows: async function() {
    console.log('🎨 [CHECKLIST HIGHLIGHTER] Funkcja highlightRows() wywołana!');
    
    const issueId = this.getCurrentIssueId();
    if (!issueId) {
      console.warn('[CHECKLIST HIGHLIGHTER] Nie można wykryć issue ID');
      return 0;
    }
    
    const checklistData = await this.getChecklistDataFromAPI(issueId);
    if (!checklistData || !checklistData.items) {
      console.warn('[CHECKLIST HIGHLIGHTER] Brak danych z API');
      return 0;
    }
    
    // Today's date
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const todayStr = `${year}-${month}-${day}`;
    const todayDate = new Date(year, today.getMonth(), today.getDate(), 0, 0, 0, 0);
    
    console.log('🎨 [CHECKLIST HIGHLIGHTER] Dzisiejsza data:', todayStr);
    console.log('🎨 [CHECKLIST HIGHLIGHTER] Dane z API:', checklistData.items.length, 'items');
    
    // Find Newsletter Translations container in DOM
    let newsletterChecklistContainer = null;
    const allDivs = document.querySelectorAll('div');
    
    for (const div of allDivs) {
      const text = div.textContent || '';
      if (text.includes('Newsletter Translations')) {
        newsletterChecklistContainer = div.closest('.panel, [class*="panel"], [role="tabpanel"]');
        if (newsletterChecklistContainer) {
          console.log('✅ [CHECKLIST HIGHLIGHTER] Znaleziono kontener Newsletter Translations');
          break;
        }
      }
    }
    
    if (!newsletterChecklistContainer) {
      console.warn('⚠️ [CHECKLIST HIGHLIGHTER] Nie znaleziono kontenera Newsletter Translations');
      return 0;
    }
    
    // Find all list items with change_log.php links
    const allListItems = newsletterChecklistContainer.querySelectorAll('li');
    const checklistRows = Array.from(allListItems).filter(li => 
      li.querySelector('a[href*="change_log.php"]') !== null
    );
    
    console.log(`✅ [CHECKLIST HIGHLIGHTER] Znaleziono ${checklistRows.length} wierszy`);
    
    if (checklistRows.length === 0) {
      return 0;
    }
    
    // Create map: tableid -> item
    const apiItemsMap = new Map();
    checklistData.items.forEach(item => {
      if (item.id) {
        apiItemsMap.set(String(item.id), item);
      }
    });
    
    let todayCount = 0;
    
    checklistRows.forEach((row, index) => {
      const link = row.querySelector('a[href*="change_log.php"]');
      if (!link) return;
      
      const href = link.getAttribute('href') || '';
      const tableIdMatch = href.match(/tableid=(\d+)/);
      
      if (!tableIdMatch) {
        console.log(`⏭️ [ROW ${index + 1}] Brak tableid w linku`);
        return;
      }
      
      const tableid = tableIdMatch[1];
      const apiItem = apiItemsMap.get(tableid);
      
      if (!apiItem) {
        console.log(`⏭️ [ROW ${index + 1}] Brak danych API dla tableid=${tableid}`);
        return;
      }
      
      // Get date from API (checked_at or updated_at)
      const dateStr = apiItem.checked_at || apiItem.updated_at;
      if (!dateStr) {
        console.log(`⏭️ [ROW ${index + 1}] Brak daty w API dla tableid=${tableid}`);
        return;
      }
      
      // Parse date
      const dateMatch = dateStr.match(/^(\d{4}-\d{2}-\d{2})/);
      if (!dateMatch) {
        console.log(`⏭️ [ROW ${index + 1}] Nieprawidłowy format daty: ${dateStr}`);
        return;
      }
      
      const itemDateStr = dateMatch[1];
      const [y, m, d] = itemDateStr.split('-').map(Number);
      const itemDate = new Date(y, m - 1, d, 0, 0, 0, 0);
      
      // Calculate difference in days
      const diffMs = todayDate - itemDate;
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      
      // Apply color
      let color = null;
      if (diffDays === 0) {
        color = this.config.colors.today;
        todayCount++;
      } else if (diffDays === 1) {
        color = this.config.colors.yesterday;
      } else if (diffDays === 2) {
        color = this.config.colors.day2;
      } else if (diffDays === 3) {
        color = this.config.colors.day3;
      }
      
      if (color) {
        row.style.backgroundColor = color;
        this.state.highlightedElements.add(row);
        console.log(`✅ [ROW ${index + 1}] Podświetlono: tableid=${tableid}, data=${itemDateStr}, diffDays=${diffDays}`);
      }
    });
    
    console.log(`📊 [CHECKLIST HIGHLIGHTER] Zakończono: ${todayCount} wierszy z dzisiaj`);
    return todayCount;
  },
  
  // Update badge on button
  updateButtonBadge: function(count) {
    if (this.state.isUpdatingBadge) {
      console.log('⏸️ [BADGE] Aktualizacja już trwa');
      return;
    }
    
    this.state.isUpdatingBadge = true;
    console.log(`🔔 [BADGE] Aktualizacja: ${count}`);
    
    let button = document.getElementById('go-to-checklists-btn');
    if (!button) button = document.querySelector('.go-to-checklists-btn');
    if (!button) button = document.querySelector('[class*="go-to-checklists"]');
    
    if (!button) {
      console.log('⚠️ [BADGE] Nie znaleziono buttona');
      this.state.isUpdatingBadge = false;
      return;
    }
    
    // Remove old badge
    const oldBadge = button.querySelector('.checklist-badge');
    if (oldBadge) {
      const oldValue = parseInt(oldBadge.textContent) || 0;
      if (oldValue === count) {
        this.state.isUpdatingBadge = false;
        return;
      }
      oldBadge.remove();
    }
    
    // Add new badge
    if (count > 0) {
      const badge = document.createElement('span');
      badge.className = 'checklist-badge';
      badge.textContent = count;
      badge.style.cssText = `
        position: absolute;
        top: -8px;
        right: -8px;
        background-color: #ff4444;
        color: white;
        border-radius: 50%;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 11px;
        font-weight: bold;
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        z-index: 1000;
      `;
      
      if (getComputedStyle(button).position === 'static') {
        button.style.position = 'relative';
      }
      
      button.appendChild(badge);
      console.log(`✅ [BADGE] Dodano badge: ${count}`);
    }
    
    this.state.isUpdatingBadge = false;
  },
  
  // Safe wrapper with mutex
  safeHighlightRows: async function() {
    if (this.state.isHighlighting) {
      console.log('⏸️ [CHECKLIST HIGHLIGHTER] Pomijam - funkcja już działa');
      return;
    }
    
    this.state.isHighlighting = true;
    try {
      const todayCount = await this.highlightRows();
      console.log(`📊 [CHECKLIST HIGHLIGHTER] Zwrócono todayCount: ${todayCount}`);
      
      if (todayCount !== undefined) {
        this.state.lastTodayCount = todayCount;
        setTimeout(() => this.updateButtonBadge(todayCount), 200);
      }
    } catch (error) {
      console.error('❌ [CHECKLIST HIGHLIGHTER] Błąd:', error);
    } finally {
      this.state.isHighlighting = false;
    }
  },
  
  // Initialize observers and listeners
  init: function() {
    console.log('🚀 [CHECKLIST HIGHLIGHTER] Inicjalizacja...');
    
    // Create MutationObserver
    const observer = new MutationObserver((mutations) => {
      if (this.state.observerTimeout) {
        clearTimeout(this.state.observerTimeout);
      }
      
      this.state.observerTimeout = setTimeout(() => {
        console.log('🔄 [CHECKLIST HIGHLIGHTER] Wykryto zmiany DOM');
        this.safeHighlightRows();
      }, 500);
    });
    
    // Start observer
    const startObserver = () => {
      if (!document.body) {
        setTimeout(startObserver, 1000);
        return;
      }
      
      observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: false
      });
      
      console.log('👀 [CHECKLIST HIGHLIGHTER] Obserwator uruchomiony');
    };
    
    if (document.readyState === 'complete') {
      setTimeout(startObserver, 2000);
      setTimeout(() => this.safeHighlightRows(), 1000);
    } else {
      window.addEventListener('load', () => {
        setTimeout(startObserver, 2000);
        setTimeout(() => this.safeHighlightRows(), 1000);
      });
    }
    
    // Expose globally for debugging
    window.highlightChecklistByDate = () => this.safeHighlightRows();
    console.log('✅ [CHECKLIST HIGHLIGHTER] Gotowe! Użyj: window.highlightChecklistByDate()');
  }
};

// Auto-initialize
window.ChecklistHighlighter.init();
