// Zmodyfikowany plik ./content/issue/content.js
(function () {
  // 1. Użyj selektora CSS zamiast getElementsByClassName
  function applyStyleOverride() {
    // Próbuj zarówno z klasą jak i z selektorem zawierającym część nazwy klasy
    const targetElements = document.querySelectorAll(
      '.issue-module__container__2JAbV, [class*="issue-module__container"]',
    );

    if (targetElements.length > 0) {
      console.log("Znaleziono elementy do modyfikacji:", targetElements.length);

      for (let i = 0; i < targetElements.length; i++) {
        // Ustaw styl z !important aby przebić inne reguły
        targetElements[i].style.setProperty("display", "block", "important");

        // Dodaj też klasę własną, żeby łatwiej debugować
        targetElements[i].classList.add("style-override-applied");

        // Wypisz informację do konsoli o zmienionym elemencie
        console.log("Zmieniono styl dla:", targetElements[i]);
      }
    } else {
      // Jeśli nie znajduje elementów, spróbuj innego podejścia
      // console.log(
      //   "Nie znaleziono elementów z dokładną klasą, szukam alternatywnie...",
      // );

      // Szukaj elementów które mają w nazwie klasy fragment "issue-module__container"
      const alternativeTargets = document.querySelectorAll(
        '[class*="issue-module__container"]',
      );
      if (alternativeTargets.length > 0) {
        console.log(
          "Znaleziono alternatywne elementy:",
          alternativeTargets.length,
        );
        for (let i = 0; i < alternativeTargets.length; i++) {
          alternativeTargets[i].style.setProperty(
            "display",
            "block",
            "important",
          );
          alternativeTargets[i].classList.add("style-override-applied");
          console.log(
            "Zmieniono styl dla alternatywnego elementu:",
            alternativeTargets[i],
          );
        }
      }
    }
  }

  // 2. Popraw obserwator DOM - zastosuj konkretne opcje i zoptymalizuj wykonanie
  function setupMutationObserver() {
    // Zdefiniuj callback, który będzie używał debounce (zoptymalizowany)
    let timeoutId = null;
    const observer = new MutationObserver(() => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      // Użyj debounce aby nie wykonywać zbyt często
      timeoutId = setTimeout(() => {
        // console.log("Wykryto zmiany w DOM - próba nadpisania stylu");
        applyStyleOverride();
      }, 100);
    });

    // Obserwuj zmiany z konkretnymi opcjami
    observer.observe(document, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["class", "style"],
    });

    return observer;
  }

  // 3. Dodaj CSS do document.head jako alternatywne podejście
  function injectCSS() {
    const styleElement = document.createElement("style");
    styleElement.textContent = `
        .issue-module__container__2JAbV,
        [class*="issue-module__container"] {
          display: block !important;
        }
        
        /* Badge animation */
        .checklist-badge {
          animation: badgePulse 2s ease-in-out infinite;
        }
        
        @keyframes badgePulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
      `;
    document.head.appendChild(styleElement);
    console.log("Wstrzyknięto CSS do head dokumentu");
  }

  // 4. Zaimplementuj opóźnione próby na wypadek, gdyby elementy ładowały się później
  function attemptWithDelay() {
    const delays = [10, 100, 500, 1000, 2000, 5000]; // milisekundy

    delays.forEach((delay) => {
      setTimeout(() => {
        console.log(`Próba zmiany stylu po ${delay}ms`);
        applyStyleOverride();
      }, delay);
    });
  }

  // Uruchom wszystkie metody, aby zwiększyć szanse powodzenia
  function initialize() {
    console.log("Inicjalizacja skryptu zmiany stylu display");

    // Spróbuj natychmiast
    applyStyleOverride();

    // Wstrzyknij CSS jako alternatywę
    injectCSS();

    // Uruchom obserwator DOM
    setupMutationObserver();

    // Spróbuj z opóźnieniami
    attemptWithDelay();

    // Nasłuchuj na pełne załadowanie
    window.addEventListener("load", () => {
      console.log("Strona w pełni załadowana - próba zmiany stylu");
      applyStyleOverride();
    });

    // Sprawdź też po interakcji użytkownika
    document.addEventListener("click", () => {
      setTimeout(applyStyleOverride, 100);
    });
  }

  // 5. Uruchom inicjalizację
  initialize();
})();

// Funkcja do podświetlania wierszy checklisty według daty
(function() {
  'use strict';

  // TEST: Ten log MUSI się pokazać!
  console.log('🚀🚀🚀 [VERSION 2.1 - FIXED] CONTENT SCRIPT ZOSTAŁ ZAŁADOWANY! 🚀🚀🚀');
  console.log('🚀 [TEST] URL:', window.location.href);
  console.log('🚀 [TEST] Data:', new Date().toString());
  console.log('🚀 [TEST] Ten plik został zaktualizowany:', '2025-11-25 14:00');
  
  // ALERT TEST - to się MUSI pokazać jeśli plik jest ładowany
  if (window.location.href.includes('issue_logs')) {
    console.error('🔴🔴🔴 UWAGA: NOWY PLIK JEST ZAŁADOWANY! 🔴🔴🔴');
    setTimeout(() => {
      alert('Extension załadowany! Nowa wersja: 2.1');
    }, 1000);
  }
  
  console.log('🔍 [CHECKLIST HIGHLIGHTER] Skrypt został załadowany!');
  console.log('🔍 [CHECKLIST HIGHLIGHTER] Aktualna data:', new Date().toISOString());

  // === API INTEGRATION ===
  const API = {
    checklist: (id) => `https://www.prologistics.info/api/issueLog/checklist/?issue_id=${id}`,
  };
  
  const jget = async (url) => {
    try {
      const r = await fetch(url, {credentials:'include'});
      if (!r.ok) throw new Error(`${url} -> ${r.status}`);
      return r.json();
    } catch(e) {
      console.error('[CHECKLIST API] Błąd fetch:', e);
      return null;
    }
  };
  
  // Wyciągnij issue ID z URL
  function getCurrentIssueId() {
    const match = window.location.href.match(/issue_logs\/(\d+)/);
    return match ? match[1] : null;
  }
  
  // Pobierz dane checklisty z API
  async function getChecklistDataFromAPI(issueId) {
    console.log(`📡 [CHECKLIST API] Pobieranie danych dla issue #${issueId}`);
    const data = await jget(API.checklist(issueId));
    if (!data || !data.checklists) {
      console.warn('[CHECKLIST API] Brak danych checklisty');
      return null;
    }
    
    // Znajdź Newsletter Translations
    const nlChecklist = data.checklists.find(c => 
      (c.name || '').toLowerCase().includes('newsletter') && 
      (c.name || '').toLowerCase().includes('translation')
    );
    
    if (!nlChecklist) {
      console.warn('[CHECKLIST API] Nie znaleziono checklisty "Newsletter Translations"');
      return null;
    }
    
    console.log(`✅ [CHECKLIST API] Znaleziono checklistę: ${nlChecklist.name}, items: ${nlChecklist.items?.length || 0}`);

  // === API HELPERS ===
  const API = {
    checklist: (id) => `https://www.prologistics.info/api/issueLog/checklist/?issue_id=${id}`,
  };
  
  const jget = async (url) => {
    try {
      const r = await fetch(url, {credentials:'include'});
      if (!r.ok) throw new Error(`${url} -> ${r.status}`);
      return r.json();
    } catch(e) {
      console.error('[CHECKLIST API] Błąd fetch:', e);
      return null;
    }
  };
  
  // === END API INTEGRATION ===

  // Edytuj poniżej selektor jeśli wiersze checklisty mają inną klasę
  // Szukamy li które mają link do change_log.php (to są wiersze checklisty)
  const checklistRowSelector = '.issue_log_checklist_row, [id*="checklist"]';

  const colorToday = '#d0f5c7';      // dziś
  const colorYesterday = '#f6fac8';  // wczoraj
  const colorDay2 = '#faedc8';       // przedwczoraj
  const colorDay3 = '#ecd7b4';       // 3 dni temu

  const daysColors = [colorToday, colorYesterday, colorDay2, colorDay3];

  // Funkcja do parsowania i kolorowania checklisty na stronie (używa API)
  async function highlightRows() {
    console.log('🎨 [CHECKLIST HIGHLIGHTER] Funkcja highlightRows() wywołana!');
    console.log('🎨 [CHECKLIST HIGHLIGHTER] Szukam checklisty: "Newsletter Translations"');
    
    // Pobierz issue ID
    const issueId = getCurrentIssueId();
    if (!issueId) {
      console.warn('[CHECKLIST HIGHLIGHTER] Nie można wykryć issue ID z URL');
      return 0;
    }
    
    // Pobierz dane z API
    const checklistData = await getChecklistDataFromAPI(issueId);
    if (!checklistData || !checklistData.items) {
      console.warn('[CHECKLIST HIGHLIGHTER] Brak danych checklisty z API');
      return 0;
    }
    
    // Używaj lokalnej daty, nie UTC
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const todayStr = `${year}-${month}-${day}`;
    
    console.log('🎨 [CHECKLIST HIGHLIGHTER] Dzisiejsza data (lokalna):', todayStr);
    console.log('🎨 [CHECKLIST HIGHLIGHTER] Dane z API:', checklistData.items.length, 'items');
    
    // Stwórz obiekt daty dla porównań
    const todayDate = new Date(year, today.getMonth(), today.getDate(), 0, 0, 0, 0);

    // KROK 1: Znajdź checklistę o nazwie "Newsletter Translations"
    let newsletterChecklistContainer = null;
    
    console.log('🔍 [CHECKLIST HIGHLIGHTER] Szukam wszystkich divów na stronie...');
    // Szukaj wszystkich divów które mogą być tytułami checklisty
    const allDivs = document.querySelectorAll('div');
    console.log(`🔍 [CHECKLIST HIGHLIGHTER] Znaleziono ${allDivs.length} divów`);
    
    let foundTitle = false;
    for (const div of allDivs) {
      const text = div.textContent || '';
      if (text.includes('Newsletter Translations')) {
        foundTitle = true;
        console.log('📋 [CHECKLIST HIGHLIGHTER] Znaleziono tytuł "Newsletter Translations"');
        console.log('📋 [CHECKLIST HIGHLIGHTER] Div z tytułem:', div);
        // Znajdź najbliższy kontener rodzica (panel)
        newsletterChecklistContainer = div.closest('.panel, [class*="panel"], [role="tabpanel"]');
        if (newsletterChecklistContainer) {
          console.log('✅ [CHECKLIST HIGHLIGHTER] Znaleziono kontener checklisty Newsletter Translations');
          break;
        } else {
          console.warn('⚠️ [CHECKLIST HIGHLIGHTER] Znaleziono tytuł ale nie znaleziono kontenera rodzica');
        }
      }
    }
    
    if (!foundTitle) {
      console.warn('⚠️ [CHECKLIST HIGHLIGHTER] Nie znaleziono tytułu "Newsletter Translations" w żadnym divie');
    }
    
    if (!newsletterChecklistContainer) {
      console.warn('⚠️ [CHECKLIST HIGHLIGHTER] Nie znaleziono checklisty "Newsletter Translations"');
      return 0;
    }

    // KROK 2: Wewnątrz tego kontenera znajdź wszystkie <li> z linkiem do change_log.php
    const allListItems = newsletterChecklistContainer.querySelectorAll('li');
    const checklistRows = Array.from(allListItems).filter(li => {
      return li.querySelector('a[href*="change_log.php"]') !== null;
    });
    
    console.log(`🔎 [DEBUG] Znaleziono ${checklistRows.length} wierszy w checkliście "Newsletter Translations"`);
    
    // Stwórz mapę tableid -> item z API
    const apiItemsMap = new Map();
    checklistData.items.forEach(item => {
      if (item.id) {
        apiItemsMap.set(String(item.id), item);
      }
    });
    console.log(`📊 [API] Mapa items z API: ${apiItemsMap.size} elementów`);

    const rows = checklistRows;
    
    console.log(`✅ [CHECKLIST HIGHLIGHTER] Znaleziono ${rows.length} wierszy do przetworzenia`);
    
    if (rows.length === 0) {
      console.warn('⚠️ [CHECKLIST HIGHLIGHTER] Nie znaleziono żadnych wierszy checklisty!');
      console.log('💡 [CHECKLIST HIGHLIGHTER] Sprawdź strukturę DOM i dostosuj selektor');
      
      // Pokaż przykładowe elementy na stronie
      const allElements = document.querySelectorAll('*');
      const checklistRelated = Array.from(allElements).filter(el => {
        const className = el.className || '';
        const id = el.id || '';
        return (className.toString().toLowerCase().includes('checklist') || 
                id.toString().toLowerCase().includes('checklist'));
      });
      console.log('🔍 [DEBUG] Znalezione elementy z "checklist":', checklistRelated);
      
      return 0;
    }

    let processedCount = 0;
    let highlightedCount = 0;
    let todayCount = 0; // Licznik wierszy z dzisiejszą datą

    rows.forEach((row, index) => {
      // Wyciągnij tableid z linku change_log.php
      const link = row.querySelector('a[href*="change_log.php"]');
      if (!link) {
        console.log(`⏭️ [ROW ${index + 1}] Brak linku change_log.php, pomijam`);
        return;
      }
      
      const href = link.getAttribute('href') || '';
      const tableIdMatch = href.match(/tableid=(\d+)/);
      if (!tableIdMatch) {
        console.log(`⏭️ [ROW ${index + 1}] Nie znaleziono tableid w linku, pomijam`);
        return;
      }
      
      const tableId = tableIdMatch[1];
      const apiItem = apiItemsMap.get(tableId);
      
      if (!apiItem) {
        console.log(`⏭️ [ROW ${index + 1}] Brak danych w API dla tableid=${tableId}, pomijam`);
        return;
      }
      
      console.log(`📝 [ROW ${index + 1}] tableid=${tableId}, text="${apiItem.text || ''}".substring(0, 50)`);
      
      // Sprawdź czy już był podświetlony
      const rowId = `row-${tableId}`;
      if (highlightedElements.has(rowId)) {
        console.log(`⏭️ [ROW ${index + 1}] Już podświetlony, pomijam`);
        return;
      }
      
      // Użyj daty z API (checked_at lub updated_at)
      let dateStr = null;
      if (apiItem.checked_at) {
        dateStr = apiItem.checked_at.split(' ')[0]; // YYYY-MM-DD
      } else if (apiItem.updated_at) {
        dateStr = apiItem.updated_at.split(' ')[0];
      }
      
      if (dateStr) {
        const rowDate = new Date(dateStr);
        rowDate.setHours(0, 0, 0, 0);
        const diffDays = Math.floor((todayDate - rowDate) / (1000 * 60 * 60 * 24));
        
        console.log(`📅 [ROW ${index + 1}] Data z API: ${dateStr}, dzisiaj: ${todayStr}, różnica dni: ${diffDays}`);
        
        if (diffDays >= 0 && diffDays < daysColors.length) {
          row.style.setProperty('background-color', daysColors[diffDays], 'important');
          row.style.setProperty('font-weight', 'bold', 'important');
          highlightedElements.add(rowId);
          highlightedCount++;
          
          // Jeśli to dzisiejsza data (diffDays === 0), zwiększ licznik
          if (diffDays === 0) {
            todayCount++;
            console.log(`🎯 [ROW ${index + 1}] TO JEST DZISIEJSZA DATA! todayCount teraz: ${todayCount}`);
          }
          
          console.log(`✨ [ROW ${index + 1}] PODŚWIETLONO kolorem: ${daysColors[diffDays]} (diffDays: ${diffDays})`);
        } else {
          console.log(`⏭️ [ROW ${index + 1}] Pominięto (różnica dni: ${diffDays})`);
        }
        processedCount++;
      } else {
        console.log(`❌ [ROW ${index + 1}] Nie znaleziono daty w linku change_log.php`);
      }
    });

    console.log(`🎉 [CHECKLIST HIGHLIGHTER] Zakończono! Przetworzono: ${processedCount}, Podświetlono: ${highlightedCount}`);
    console.log(`📅 [CHECKLIST HIGHLIGHTER] Wierszy z dzisiejszą datą: ${todayCount}`);
    
    // Zaktualizuj badge na buttonie
    updateButtonBadge(todayCount);
    
    return todayCount;
  }

  // Funkcja do aktualizacji badge'a na buttonie go-to-checklists-btn
  function updateButtonBadge(count) {
    if (isUpdatingBadge) {
      console.log('⏸️ [BADGE] Aktualizacja już trwa, pomijam');
      return;
    }
    
    isUpdatingBadge = true;
    console.log(`🔔 [BADGE] Aktualizacja badge'a: ${count}`);
    
    // Spróbuj różne selektory
    let button = document.getElementById('go-to-checklists-btn');
    if (!button) {
      button = document.querySelector('.go-to-checklists-btn');
      console.log('🔍 [BADGE] Szukam buttona po klasie .go-to-checklists-btn');
    }
    if (!button) {
      button = document.querySelector('[class*="go-to-checklists"]');
      console.log('🔍 [BADGE] Szukam buttona po klasie zawierającej "go-to-checklists"');
    }
    
    if (!button) {
      console.log('⚠️ [BADGE] Nie znaleziono buttona go-to-checklists-btn');
      console.log('🔍 [BADGE] Wszystkie buttony na stronie:', document.querySelectorAll('button').length);
      const allButtons = document.querySelectorAll('button');
      allButtons.forEach((btn, i) => {
        const btnClass = btn.className || 'brak klasy';
        const btnId = btn.id || 'brak id';
        const btnText = btn.textContent?.substring(0, 30) || 'brak tekstu';
        console.log(`   Button ${i + 1}: class="${btnClass}", id="${btnId}", text="${btnText}"`);
      });
      return;
    }
    
    console.log('✅ [BADGE] Znaleziono button:', button);
    
    // Sprawdź czy badge już istnieje
    const oldBadge = button.querySelector('.checklist-badge');
    if (oldBadge) {
      const oldValue = parseInt(oldBadge.textContent) || 0;
      if (oldValue === count) {
        console.log(`ℹ️ [BADGE] Badge już istnieje z wartością ${count}, pomijam aktualizację`);
        return;
      }
      console.log(`🔄 [BADGE] Aktualizuję badge z ${oldValue} na ${count}`);
      oldBadge.remove();
    }
    
    // Jeśli count >= 0, dodaj nowy badge (nawet jeśli 0, dla debugowania)
    if (count >= 0) {
      const badge = document.createElement('span');
      badge.className = 'checklist-badge';
      badge.textContent = count;
      badge.style.cssText = `
        position: absolute;
        top: -8px;
        right: -8px;
        background-color: ${count > 0 ? '#ff4444' : '#999999'};
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
      
      // Upewnij się, że button ma position: relative
      const buttonPosition = getComputedStyle(button).position;
      console.log('🔍 [BADGE] Obecna pozycja buttona:', buttonPosition);
      if (buttonPosition === 'static') {
        button.style.position = 'relative';
        console.log('✏️ [BADGE] Zmieniono pozycję buttona na relative');
      }
      
      button.appendChild(badge);
      console.log(`✅ [BADGE] Dodano badge z liczbą: ${count}`);
    } else {
      console.log('ℹ️ [BADGE] Brak dzisiejszych wierszy, badge nie został dodany');
    }
    } // Zamknięcie if (count >= 0)
    
    isUpdatingBadge = false;
  }

  let isHighlighting = false; // Flaga zapobiegająca zapętleniu
  let highlightedElements = new Set(); // Zapamiętaj podświetlone elementy
  let lastTodayCount = 0; // Zapamiętaj ostatnią liczbę
  let isUpdatingBadge = false; // Flaga aktualizacji badge'a

  // Funkcja wrapper zapobiegająca zapętleniu
  async function safeHighlightRows() {
    if (isHighlighting) {
      console.log('⏸️ [CHECKLIST HIGHLIGHTER] Pomijam - funkcja już działa');
      return;
    }
    
    isHighlighting = true;
    try {
      const todayCount = await highlightRows();
      console.log(`📊 [CHECKLIST HIGHLIGHTER] Funkcja zwróciła todayCount: ${todayCount}`);
      
      if (todayCount !== undefined) {
        const changed = lastTodayCount !== todayCount;
        lastTodayCount = todayCount;
        console.log(`💾 [CHECKLIST HIGHLIGHTER] Zapisano lastTodayCount: ${lastTodayCount}${changed ? ' (zmiana!)' : ' (bez zmian)'}`);
        
        // BEZPOŚREDNIO aktualizuj badge
        console.log(`🎯 [CHECKLIST HIGHLIGHTER] Wywołuję updateButtonBadge z wartością: ${lastTodayCount}`);
        setTimeout(() => updateButtonBadge(lastTodayCount), 200);
      }
    } catch (error) {
      console.error('❌ [CHECKLIST HIGHLIGHTER] Błąd w safeHighlightRows:', error);
    } finally {
      isHighlighting = false;
    }
  }
  
  // Funkcja do sprawdzenia i aktualizacji badge'a (na wypadek późnego załadowania buttona)
  function checkAndUpdateBadge() {
    console.log(`🔄 [BADGE] Sprawdzam dostępność buttona... (lastTodayCount: ${lastTodayCount})`);
    let button = document.getElementById('go-to-checklists-btn');
    if (!button) {
      button = document.querySelector('.go-to-checklists-btn');
    }
    if (!button) {
      button = document.querySelector('[class*="go-to-checklists"]');
    }
    
    if (button && lastTodayCount > 0) {
      const existingBadge = button.querySelector('.checklist-badge');
      if (!existingBadge) {
        console.log('🔄 [BADGE] Button znaleziony później, aktualizuję badge');
        updateButtonBadge(lastTodayCount);
      }
    } else if (!button) {
      console.log('⚠️ [BADGE] Button nadal nie znaleziony');
    }
  }

  // Czekaj na pełne załadowanie strony
  if (document.readyState === 'complete') {
    // Strona już załadowana, uruchom natychmiast
    console.log('📄 [CHECKLIST HIGHLIGHTER] Strona już załadowana, uruchamiam...');
    setTimeout(safeHighlightRows, 1000);
    setTimeout(checkAndUpdateBadge, 2000);
    setTimeout(checkAndUpdateBadge, 3500);
  } else {
    // Strona jeszcze się ładuje, czekaj na event load
    console.log('⏳ [CHECKLIST HIGHLIGHTER] Czekam na pełne załadowanie strony...');
    window.addEventListener('load', () => {
      console.log('✅ [CHECKLIST HIGHLIGHTER] Strona załadowana!');
      setTimeout(safeHighlightRows, 1000);
      // Dodatkowe próby aktualizacji badge'a
      setTimeout(checkAndUpdateBadge, 2000);
      setTimeout(checkAndUpdateBadge, 3500);
      setTimeout(checkAndUpdateBadge, 5000);
    });
  }

  // Obserwator DOM z debounce i ignorowaniem zmian stylu
  let observerTimeout = null;
  const observer = new MutationObserver((mutations) => {
    // Ignoruj zmiany atrybutów (np. style)
    const hasNewNodes = mutations.some(mutation => 
      mutation.type === 'childList' && mutation.addedNodes.length > 0
    );
    
    if (!hasNewNodes) {
      return;
    }
    
    // Debounce - czekaj 500ms bez zmian przed uruchomieniem
    if (observerTimeout) {
      clearTimeout(observerTimeout);
    }
    
    observerTimeout = setTimeout(() => {
      console.log('🔄 [CHECKLIST HIGHLIGHTER] Wykryto nowe elementy DOM');
      safeHighlightRows();
    }, 500);
  });

  // Rozpocznij obserwację dopiero po pełnym załadowaniu
  const startObserver = () => {
    if (!document.body) {
      console.warn('⚠️ [CHECKLIST HIGHLIGHTER] document.body nie istnieje, odkładam obserwator');
      setTimeout(startObserver, 1000);
      return;
    }
    
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: false // Ignoruj zmiany atrybutów!
    });
    console.log('👀 [CHECKLIST HIGHLIGHTER] Obserwator DOM uruchomiony (tylko childList)');
  };
  
  if (document.readyState === 'complete') {
    setTimeout(startObserver, 2000);
  } else {
    window.addEventListener('load', () => {
      setTimeout(startObserver, 2000);
    });
  }

  // Udostępnij funkcje globalnie dla debugowania
  window.highlightChecklistByDate = safeHighlightRows;
  window.clearHighlightedElements = () => {
    highlightedElements.clear();
    console.log('🧹 [CHECKLIST HIGHLIGHTER] Wyczyszczono cache podświetlonych elementów');
  };
  
  console.log('✅ [CHECKLIST HIGHLIGHTER] Funkcje dostępne globalnie:');
  console.log('   - window.highlightChecklistByDate() - uruchom podświetlanie');
  console.log('   - window.clearHighlightedElements() - wyczyść cache');
  
  // NATYCHMIASTOWE uruchomienie dla testu
  console.log('🔥 [TEST] Uruchamiam highlightRows natychmiast dla testu...');
  setTimeout(() => {
    console.log('🔥 [TEST] Wykonuję safeHighlightRows...');
    safeHighlightRows();
  }, 3000);

})();
