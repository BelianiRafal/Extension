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
      console.log(
        "Nie znaleziono elementów z dokładną klasą, szukam alternatywnie...",
      );

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
        console.log("Wykryto zmiany w DOM - próba nadpisania stylu");
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
