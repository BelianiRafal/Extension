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

  console.log('🔍 [CHECKLIST HIGHLIGHTER] Skrypt został załadowany!');
  console.log('🔍 [CHECKLIST HIGHLIGHTER] Aktualna data:', new Date().toISOString());

  // Edytuj poniżej selektor jeśli wiersze checklisty mają inną klasę
  // Szukamy li które mają link do change_log.php (to są wiersze checklisty)
  const checklistRowSelector = '.issue_log_checklist_row, [id*="checklist"]';

  const colorToday = '#d0f5c7';      // dziś
  const colorYesterday = '#f6fac8';  // wczoraj
  const colorDay2 = '#faedc8';       // przedwczoraj
  const colorDay3 = '#ecd7b4';       // 3 dni temu

  const daysColors = [colorToday, colorYesterday, colorDay2, colorDay3];

  // Funkcja do parsowania i kolorowania checklisty na stronie
  function highlightRows() {
    console.log('🎨 [CHECKLIST HIGHLIGHTER] Funkcja highlightRows() wywołana!');
    console.log('🎨 [CHECKLIST HIGHLIGHTER] Używany selektor:', checklistRowSelector);
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    console.log('🎨 [CHECKLIST HIGHLIGHTER] Dzisiejsza data (normalized):', today.toISOString());

    // Sprawdź wszystkie możliwe elementy na stronie
    console.log('🔎 [DEBUG] Wszystkie elementy <li>:', document.querySelectorAll('li').length);
    console.log('🔎 [DEBUG] Linki do change_log.php:', document.querySelectorAll('a[href*="change_log.php"]').length);
    
    // NOWE PODEJŚCIE: Znajdź wszystkie <li> które zawierają link do change_log.php
    const allListItems = document.querySelectorAll('li');
    const checklistRows = Array.from(allListItems).filter(li => {
      return li.querySelector('a[href*="change_log.php"]') !== null;
    });
    
    console.log(`🔎 [DEBUG] Znaleziono ${checklistRows.length} elementów <li> z linkiem do change_log.php`);

    const rows = checklistRows.length > 0 ? checklistRows : document.querySelectorAll(checklistRowSelector);
    
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
      
      return;
    }

    let processedCount = 0;
    let highlightedCount = 0;

    rows.forEach((row, index) => {
      // Sprawdź, czy już był podświetlony
      const rowId = row.id || `row-${index}`;
      if (highlightedElements.has(rowId)) {
        console.log(`⏭️ [ROW ${index + 1}] Już podświetlony, pomijam`);
        return;
      }

      // SZUKAJ DATY W CAŁYM TEKŚCIE WIERSZA
      const rowText = row.textContent || row.innerText || '';
      console.log(`📝 [ROW ${index + 1}] Tekst wiersza (pierwsze 200 znaków): "${rowText.substring(0, 200)}"`);
      
      let dateStr = null;
      
      // Format: "by Name YYYY-MM-DD HH:MM:SS" lub samo "YYYY-MM-DD HH:MM:SS"
      const dateMatch = rowText.match(/(\d{4})-(\d{2})-(\d{2})\s+(\d{2}):(\d{2}):(\d{2})/);
      
      if (dateMatch) {
        dateStr = `${dateMatch[1]}-${dateMatch[2]}-${dateMatch[3]}`;
        console.log(`📅 [ROW ${index + 1}] Znaleziono datę w tekście: ${dateMatch[0]} → ${dateStr}`);
      } else {
        console.log(`❌ [ROW ${index + 1}] Brak daty w formacie YYYY-MM-DD HH:MM:SS w tekście wiersza`);
        
        // DEBUG: Pokaż wszystkie linki w tym wierszu
        const allLinks = row.querySelectorAll('a');
        console.log(`🔗 [ROW ${index + 1}] Znaleziono ${allLinks.length} linków w wierszu`);
        allLinks.forEach((link, i) => {
          console.log(`   Link ${i + 1}: href="${link.href}" text="${link.textContent}"`);
        });
      }
      
      if (dateStr) {
        const rowDate = new Date(dateStr);
        rowDate.setHours(0, 0, 0, 0);
        const diffDays = Math.floor((today - rowDate) / (1000 * 60 * 60 * 24));
        
        console.log(`📅 [ROW ${index + 1}] Data wiersza: ${dateStr}, różnica dni: ${diffDays}`);
        
        if (diffDays >= 0 && diffDays < daysColors.length) {
          row.style.setProperty('background-color', daysColors[diffDays], 'important');
          row.style.setProperty('font-weight', 'bold', 'important');
          highlightedElements.add(rowId);
          highlightedCount++;
          console.log(`✨ [ROW ${index + 1}] PODŚWIETLONO kolorem: ${daysColors[diffDays]}`);
        } else {
          console.log(`⏭️ [ROW ${index + 1}] Pominięto (różnica dni: ${diffDays})`);
        }
        processedCount++;
      } else {
        console.log(`❌ [ROW ${index + 1}] Nie znaleziono daty w linku change_log.php`);
      }
    });

    console.log(`🎉 [CHECKLIST HIGHLIGHTER] Zakończono! Przetworzono: ${processedCount}, Podświetlono: ${highlightedCount}`);
  }

  let isHighlighting = false; // Flaga zapobiegająca zapętleniu
  let highlightedElements = new Set(); // Zapamiętaj podświetlone elementy

  // Funkcja wrapper zapobiegająca zapętleniu
  function safeHighlightRows() {
    if (isHighlighting) {
      console.log('⏸️ [CHECKLIST HIGHLIGHTER] Pomijam - funkcja już działa');
      return;
    }
    
    isHighlighting = true;
    try {
      highlightRows();
    } finally {
      isHighlighting = false;
    }
  }

  // Inicjalna próba podświetlenia
  setTimeout(safeHighlightRows, 500);

  // Czekaj na pełne załadowanie strony
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', safeHighlightRows);
  }

  window.addEventListener('load', () => {
    setTimeout(safeHighlightRows, 1000);
  });

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

  // Rozpocznij obserwację po krótkim opóźnieniu
  setTimeout(() => {
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: false // Ignoruj zmiany atrybutów!
    });
    console.log('👀 [CHECKLIST HIGHLIGHTER] Obserwator DOM uruchomiony (tylko childList)');
  }, 2000);

  // Udostępnij funkcje globalnie dla debugowania
  window.highlightChecklistByDate = safeHighlightRows;
  window.clearHighlightedElements = () => {
    highlightedElements.clear();
    console.log('🧹 [CHECKLIST HIGHLIGHTER] Wyczyszczono cache podświetlonych elementów');
  };
  
  console.log('✅ [CHECKLIST HIGHLIGHTER] Funkcje dostępne globalnie:');
  console.log('   - window.highlightChecklistByDate() - uruchom podświetlanie');
  console.log('   - window.clearHighlightedElements() - wyczyść cache');

})();
