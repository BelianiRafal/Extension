// ProLogistics Emoji & Layout Extension - główny plik content.js
(function () {
  console.log("ProLogistics Emoji & Layout Extension uruchomione");

  // ======== CZĘŚĆ ODPOWIEDZIALNA ZA NAPRAWĘ UKŁADU ISSUE ========

  // Główna funkcja zmieniająca styl
  function fixContainerLayout() {
    // Wyszukaj elementy po dokładnej klasie
    const targetElements = document.getElementsByClassName(
      "issue-module__container__2JAbV",
    );

    if (targetElements.length > 0) {
      console.log(
        "Znaleziono elementy do modyfikacji układu:",
        targetElements.length,
      );

      for (let i = 0; i < targetElements.length; i++) {
        targetElements[i].style.setProperty("display", "block", "important");
        console.log("Zmieniono styl dla elementu layout:", targetElements[i]);
      }
    } else {
      // Szukanie elementów po częściowej nazwie klasy
      const alternativeTargets = document.querySelectorAll(
        '[class*="issue-module__container"]',
      );
      if (alternativeTargets.length > 0) {
        console.log(
          "Znaleziono alternatywne elementy do modyfikacji układu:",
          alternativeTargets.length,
        );
        for (let i = 0; i < alternativeTargets.length; i++) {
          alternativeTargets[i].style.setProperty(
            "display",
            "block",
            "important",
          );
          console.log(
            "Zmieniono styl dla alternatywnego elementu layout:",
            alternativeTargets[i],
          );
        }
      }
    }
  }

  // Wstrzyknięcie CSS do dokumentu (działa nawet przed pełnym załadowaniem DOM)
  function injectLayoutCSS() {
    const styleElement = document.createElement("style");
    styleElement.textContent = `
        .issue-module__container__2JAbV,
        [class*="issue-module__container"] {
          display: block !important;
        }
      `;
    document.head.appendChild(styleElement);
    console.log("Wstrzyknięto CSS dla naprawy układu issue");
  }

  // Funkcja inicjalizująca skrypt naprawy układu
  function initializeLayoutFix() {
    // Najpierw wstrzyknij CSS jako najbardziej niezawodną metodę
    injectLayoutCSS();

    // Próba natychmiastowej zmiany stylu
    fixContainerLayout();

    // Ustaw opóźnione próby
    const delays = [50, 200, 500, 1000, 2000];
    delays.forEach((delay) => {
      setTimeout(fixContainerLayout, delay);
    });

    // Ustaw interwał sprawdzający co 1s przez pierwsze 10s
    let count = 0;
    const checkInterval = setInterval(() => {
      fixContainerLayout();
      count++;
      if (count >= 10) {
        clearInterval(checkInterval);
      }
    }, 1000);
  }

  // ======== CZĘŚĆ ODPOWIEDZIALNA ZA EMOJI ========

  // Sprawdzaj co 500ms, czy można dodać przycisk emoji
  const interval = setInterval(checkAndAddButton, 500);

  // Obserwator zmian w DOM - obsługuje zarówno emoji jak i układ
  const observer = new MutationObserver(function (mutations) {
    checkAndAddButton();
    fixContainerLayout(); // Dodano obsługę naprawy układu
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["class", "style"],
  });

  // Główna funkcja sprawdzająca i dodająca przycisk
  function checkAndAddButton() {
    // Sprawdź czy jesteśmy na właściwej stronie
    if (
      !window.location.href.includes("prologistics.info/react/logs/issue_logs/")
    ) {
      return;
    }

    // Sprawdź czy przycisk już istnieje
    if (document.querySelector(".emoji-button")) {
      return;
    }

    // Znajdujemy nowy kontener przycisków
    const buttonContainer = document.querySelector(
      ".new-comment-module__buttons__3jd4H",
    );
    if (!buttonContainer) {
      return;
    }

    // Sprawdźmy przyciski w nowym kontenerze
    const addCommentBtn = buttonContainer.querySelector(
      'button[data-full-width="true"]:first-child',
    );
    const corrActionBtn = buttonContainer.querySelector(
      'button[data-full-width="true"]:last-child',
    );

    if (!addCommentBtn || !corrActionBtn) {
      return;
    }

    // Utworzenie przycisku emoji w tym samym stylu co inne przyciski
    const emojiButton = document.createElement("button");

    // Ustaw te same klasy i atrybuty co inne przyciski
    emojiButton.className = "button-module__root__YgbqR emoji-button";
    emojiButton.setAttribute("color", "primary");
    emojiButton.setAttribute("data-color", "primary");
    emojiButton.setAttribute("data-variant", "mui-0");
    emojiButton.setAttribute("data-full-width", "true");
    emojiButton.textContent = "Add emoji";

    // Dodajemy własny styl dla przycisku emoji
    emojiButton.style.margin = "0 10px";

    emojiButton.onclick = function (e) {
      e.preventDefault();
      e.stopPropagation();
      toggleEmojiPicker(emojiButton);
      return false;
    };

    // Dodaj przycisk pomiędzy dwa istniejące przyciski
    // Najpierw usuwamy przycisk corrAction
    buttonContainer.removeChild(corrActionBtn);

    // Dodajemy przycisk emoji
    buttonContainer.appendChild(emojiButton);

    // Dodajemy z powrotem przycisk corrAction
    buttonContainer.appendChild(corrActionBtn);

    console.log("Dodano przycisk emoji w nowym układzie!");
  }

  // Zarządzanie selektorem emoji
  function toggleEmojiPicker(button) {
    let picker = document.getElementById("emoji-picker");

    // Jeśli picker nie istnieje, utwórz go
    if (!picker) {
      picker = createEmojiPicker();
    }

    // Pokaż/ukryj picker
    if (picker.style.display === "none" || !picker.style.display) {
      // Pozycjonowanie względem przycisku
      const buttonRect = button.getBoundingClientRect();
      picker.style.top = buttonRect.bottom + window.scrollY + 5 + "px";
      picker.style.left = buttonRect.left + window.scrollX + "px";
      picker.style.display = "block";
    } else {
      picker.style.display = "none";
    }
  }

  // Tworzenie ulepszonego pickera emoji z kategoriami
  function createEnhancedEmojiPicker() {
    const picker = document.createElement("div");
    picker.id = "emoji-picker";

    // Kategorie emoji
    const categories = [
      {
        name: "Twarze",
        emojis: [
          { visual: "😀", html: "&#128512;" },
          { visual: "😃", html: "&#128515;" },
          { visual: "😄", html: "&#128516;" },
          { visual: "😁", html: "&#128513;" },
          { visual: "😆", html: "&#128518;" },
          { visual: "😅", html: "&#128517;" },
          { visual: "🤣", html: "&#129315;" },
          { visual: "😂", html: "&#128514;" },
          { visual: "🙂", html: "&#128578;" },
          { visual: "🙃", html: "&#128579;" },
          { visual: "😉", html: "&#128521;" },
          { visual: "😊", html: "&#128522;" },
          { visual: "😇", html: "&#128519;" },
        ],
      },
      {
        name: "Gesty",
        emojis: [
          { visual: "👍", html: "&#128077;" },
          { visual: "👎", html: "&#128078;" },
          { visual: "👏", html: "&#128079;" },
          { visual: "🙌", html: "&#128080;" },
          { visual: "🤝", html: "&#129309;" },
          { visual: "👌", html: "&#128076;" },
        ],
      },
      {
        name: "Symbole",
        emojis: [
          { visual: "❤️", html: "&#10084;&#65039;" },
          { visual: "💯", html: "&#128175;" },
          { visual: "🔥", html: "&#128293;" },
          { visual: "⚠️", html: "&#9888;&#65039;" },
          { visual: "⛔", html: "&#9940;" },
          { visual: "✅", html: "&#9989;" },
          { visual: "❌", html: "&#10060;" },
        ],
      },
      {
        name: "Headers",
        class: "emoji-head",
        emojis: [
          {
            visual: "Head Trans",
            html: '<h4 style="color:#fff; background-color:#000; text-align:center; padding:20px;">PLS MAKE A TRANSLATIONS &#128512;<h4>',
          },
          {
            visual: "Head Test",
            html: '<h4 style="color:#fff; background-color:#000; text-align:center; padding:20px;">PLS TEST NSLT & LP &#128512;<h4>',
          },
          { visual: "Mass User", html: "@Newsletter translation(4527)" },
          { visual: "UK|PL Trans", html: "@Content Team(3703)" },
          { visual: "DACH Trans", html: "@DACH translation(4487)" },
          { visual: "CZ Trans", html: "@CZ translation(4497)" },
          { visual: "DK Trans", html: "@DK translation(4495)" },
          { visual: "ES Trans", html: "@ES translation(4491)" },
          { visual: "FI Trans", html: "@FI translation(4493)" },
          { visual: "FR Trans", html: "@FR translation(4489)" },
          { visual: "HU Trans", html: "@HU translation(4499)" },
          { visual: "IT Trans", html: "@IT translation(4490)" },
          { visual: "NL Trans", html: "@NL translation(4488)" },
          { visual: "NO Trans", html: "@NO translation(4496)" },
          { visual: "PT Trans", html: "@PT translation(4492)" },
          { visual: "RO Trans", html: "@RO translation(4688)" },
          { visual: "SE Trans", html: "@SE translation(4494)" },
          { visual: "SK Trans", html: "@SK translation(4498)" },
        ],
      },
    ];

    // Nawigacja kategorii
    const tabs = document.createElement("div");
    tabs.className = "emoji-tabs";

    categories.forEach((category, index) => {
      const tab = document.createElement("button");
      tab.className = "emoji-tab";
      tab.textContent = category.name;
      tab.dataset.index = index;

      tab.addEventListener("click", () => {
        // Usuń aktywną klasę ze wszystkich zakładek
        document
          .querySelectorAll(".emoji-tab")
          .forEach((t) => t.classList.remove("active"));
        // Dodaj aktywną klasę do klikniętej zakładki
        tab.classList.add("active");

        // Ukryj wszystkie kontenery kategorii
        document
          .querySelectorAll(".emoji-category")
          .forEach((c) => (c.style.display = "none"));
        // Pokaż kontener wybranej kategorii
        document.querySelector(
          `.emoji-category[data-index="${index}"]`,
        ).style.display = "block";
      });

      // Ustaw pierwszą zakładkę jako aktywną
      if (index === 0) {
        tab.classList.add("active");
      }

      tabs.appendChild(tab);
    });

    picker.appendChild(tabs);

    // Kontener dla emoji
    const emojiContainer = document.createElement("div");
    emojiContainer.className = "emoji-container";

    // Utwórz kontenery dla każdej kategorii
    categories.forEach((category, index) => {
      const categoryContainer = document.createElement("div");
      categoryContainer.className = "emoji-category";
      categoryContainer.dataset.index = index;
      categoryContainer.style.display = index === 0 ? "block" : "none";

      category.emojis.forEach((emoji) => {
        const emojiElement = document.createElement("span");
        // Dodaj podstawową klasę emoji-item
        emojiElement.className = "emoji-item";

        // Dodaj dodatkową klasę jeśli kategoria ją posiada
        if (category.class) {
          emojiElement.className += " " + category.class;
        }

        emojiElement.innerHTML = emoji.visual;
        emojiElement.dataset.html = emoji.html;
        emojiElement.onclick = function () {
          insertEmoji(emoji.html);
        };
        categoryContainer.appendChild(emojiElement);
      });

      emojiContainer.appendChild(categoryContainer);
    });

    picker.appendChild(emojiContainer);

    // Pole wyszukiwania emoji
    const searchContainer = document.createElement("div");
    searchContainer.className = "emoji-search-container";

    const searchInput = document.createElement("input");
    searchInput.className = "emoji-search";
    searchInput.type = "text";
    searchInput.placeholder = "Szukaj emoji...";
    searchInput.addEventListener("input", function () {
      const searchTerm = this.value.toLowerCase();
      const allEmojis = document.querySelectorAll(".emoji-item");

      // Jeśli pole jest puste, przywróć widok kategorii
      if (searchTerm === "") {
        document
          .querySelectorAll(".emoji-category")
          .forEach((category, index) => {
            category.style.display = index === 0 ? "block" : "none";
          });
        document.querySelector(".emoji-tabs").style.display = "flex";
        return;
      }

      // Ukryj zakładki podczas wyszukiwania
      document.querySelector(".emoji-tabs").style.display = "none";

      // Pokaż wszystkie kategorie podczas wyszukiwania
      document.querySelectorAll(".emoji-category").forEach((category) => {
        category.style.display = "block";
      });

      // Filtruj emoji
      allEmojis.forEach((emoji) => {
        const emojiChar = emoji.innerHTML;
        // Ukryj lub pokaż emoji w zależności od dopasowania
        if (emojiChar.toLowerCase().includes(searchTerm)) {
          emoji.style.display = "inline-block";
        } else {
          emoji.style.display = "none";
        }
      });
    });

    searchContainer.appendChild(searchInput);
    picker.insertBefore(searchContainer, emojiContainer);

    // Dodaj przycisk zamknięcia
    const closeBtn = document.createElement("button");
    closeBtn.textContent = "Zamknij";
    closeBtn.className = "emoji-close-btn";
    closeBtn.onclick = function () {
      picker.style.display = "none";
    };
    picker.appendChild(closeBtn);

    // Nasłuchuj kliknięć poza pickerem aby go zamknąć
    document.addEventListener("click", function (e) {
      if (
        picker.style.display === "block" &&
        !picker.contains(e.target) &&
        !e.target.classList.contains("emoji-button")
      ) {
        picker.style.display = "none";
      }
    });

    document.body.appendChild(picker);
    return picker;
  }

  // Funkcja createEmojiPicker, która używa ulepszonej wersji
  function createEmojiPicker() {
    return createEnhancedEmojiPicker();
  }

  // Wstawianie emoji do pola tekstowego w miejscu kursora
  function insertEmoji(htmlEntity) {
    // Szukanie pola komentarza na różne sposoby
    let textarea = document.querySelector('textarea[id="new_comment"]');
    if (!textarea) {
      textarea = document.querySelector("textarea");
    }

    if (!textarea) {
      console.error("Nie znaleziono pola komentarza");
      return;
    }

    // Zapamiętaj pozycję kursora
    const startPos = textarea.selectionStart;
    const endPos = textarea.selectionEnd;
    const text = textarea.value;

    // Wstawianie kodu HTML emoji w miejscu kursora
    textarea.value =
      text.substring(0, startPos) + htmlEntity + text.substring(endPos);

    // Ustaw kursor za wstawionym emoji
    textarea.selectionStart = startPos + htmlEntity.length;
    textarea.selectionEnd = startPos + htmlEntity.length;

    // Przywróć fokus na textarea
    textarea.focus();

    // Ukryj picker po wybraniu emoji
    const picker = document.getElementById("emoji-picker");
    if (picker) {
      picker.style.display = "none";
    }

    // Wyzwól zdarzenie input, aby poinformować system o zmianie zawartości
    // To może być potrzebne, jeśli strona używa listenerów na zdarzenie input
    const event = new Event("input", { bubbles: true });
    textarea.dispatchEvent(event);
  }

  // ======== INICJALIZACJA OBU FUNKCJONALNOŚCI ========

  // Inicjalizacja funkcji naprawy układu
  initializeLayoutFix();

  // Dodatkowe nasłuchiwacze zdarzeń dla obu funkcjonalności
  window.addEventListener("load", () => {
    fixContainerLayout();
    checkAndAddButton();
  });

  // Nasłuchiwacze zdarzeń nawigacji (dla aplikacji SPA)
  window.addEventListener("popstate", () => {
    fixContainerLayout();
    checkAndAddButton();
  });

  window.addEventListener("hashchange", () => {
    fixContainerLayout();
    checkAndAddButton();
  });
})();
