// == Spam Plan Removal Tool – wersja: kasowanie wpisów starszych niż 2 tygodnie (pełne tygodnie) == //

// Funkcja wyliczająca datę graniczną (poniedziałek, dwa tygodnie wstecz)
function getCutoffDate() {
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  // Cofnij o 14 dni
  const cutoff = new Date(now);
  cutoff.setDate(cutoff.getDate() - 14);

  // Zaokrągl do poniedziałku (jeśli dziś np. środa, cofamy do najbliższego wcześniejszego poniedziałku)
  // getDay(): 0 (niedziela), 1 (pon), ..., 6 (sob)
  const day = cutoff.getDay();
  const daysToMonday = day === 0 ? 6 : day - 1; // ile dni cofnąć do poniedziałku
  cutoff.setDate(cutoff.getDate() - daysToMonday);

  const yyyy = cutoff.getFullYear();
  const mm = String(cutoff.getMonth() + 1).padStart(2, "0");
  const dd = String(cutoff.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

// Funkcja tworząca UI narzędzia
function addRemovalToolUI() {
  if (document.getElementById("spam-removal-tool")) return;

  const container = document.createElement("div");
  container.id = "spam-removal-tool";

  // Nagłówek
  const title = document.createElement("h3");
  title.textContent = "Narzędzie do usuwania starych wpisów";
  title.style.margin = "0 0 10px 0";
  title.style.fontSize = "17px";
  container.appendChild(title);

  // Informacja o dacie granicznej
  const cutoffDate = getCutoffDate();
  const infoLabel = document.createElement("div");
  infoLabel.innerHTML = `<b>Usuwane będą wszystkie wpisy z datą ≤ <span style="color:#e53935;">${cutoffDate}</span></b><br><span style="font-size:13px;">(wszystko starsze niż 2 tygodnie, dopełnione do poniedziałku)</span>`;
  infoLabel.style.marginBottom = "10px";
  container.appendChild(infoLabel);

  // Kontenery na przyciski
  const buttonContainer = document.createElement("div");
  buttonContainer.className = 'container-button';

  // Przycisk testowy
  const testButton = document.createElement("button");
  testButton.className = 'test-button';
  testButton.textContent = "Testuj";
  testButton.onclick = () => findAndRemoveEntries(true);
  buttonContainer.appendChild(testButton);

  // Przycisk wykonawczy
  const executeButton = document.createElement("button");
  executeButton.className = 'execute-button'
  executeButton.textContent = "Usuń wpisy";
  executeButton.onclick = () => findAndRemoveEntries(false);
  buttonContainer.appendChild(executeButton);

  container.appendChild(buttonContainer);

  // Log toggle
  const logToggle = document.createElement("a");
  logToggle.className = 'log-button';
  logToggle.textContent = "Pokaż logi";
  logToggle.href = "#";

  const logArea = document.createElement("div");
  logArea.className = 'logarea';
  logArea.id = "removal-log";


  logToggle.onclick = function (e) {
    e.preventDefault();
    if (logArea.style.display === "none") {
      logArea.style.display = "block";
      logToggle.textContent = "Ukryj logi";
    } else {
      logArea.style.display = "none";
      logToggle.textContent = "Pokaż logi";
    }
  };

  container.appendChild(logToggle);
  container.appendChild(logArea);

  const openButton = document.createElement("button");
  openButton.textContent = "Open Remove tool";
  openButton.className = 'open-button';

  openButton.addEventListener("click", () => {
    container.classList.add("active");
    openButton.style.display = 'none';
  })

  // Przycisk zamykania
  const closeButton = document.createElement("button");
  closeButton.textContent = "×";
  closeButton.title = "Zamknij panel";
  closeButton.className = 'close-button';
  closeButton.onclick = function () {
    container.classList.remove('active');
    setTimeout(() => {
      openButton.style.display = 'block';
    }, 400);
  };  
  container.appendChild(closeButton);

  document.body.appendChild(container);
  document.body.appendChild(openButton);
}

// Funkcja do logowania komunikatów
function logMessage(message, isError = false) {
  const logArea = document.getElementById("removal-log");
  if (logArea) {
    if (logArea.style.display === "none") {
      document.querySelector("#spam-removal-tool a").textContent = "Ukryj logi";
      logArea.style.display = "block";
    }
    const logEntry = document.createElement("div");
    logEntry.textContent = message;
    if (isError) logEntry.style.color = "red";
    logArea.appendChild(logEntry);
    logArea.scrollTop = logArea.scrollHeight;
  } else {
    isError ? console.error(message) : console.log(message);
  }
}

// Główna funkcja kasowania
function findAndRemoveEntries(dryRun = true) {
  const cutoffDate = getCutoffDate();
  logMessage(`${dryRun ? "Tryb testowy" : "Wykonywanie usuwania"} dla daty granicznej: ${cutoffDate}`);

  const rows = document.querySelectorAll("tr");
  logMessage(`Znaleziono ${rows.length} wierszy w tabeli.`);

  const buttonsToClick = [];

  rows.forEach((row, rowIndex) => {
    const cells = row.querySelectorAll("td");
    if (cells.length < 3) return;

    let dateText = "";
    for (let i = 0; i < cells.length; i++) {
      const match = cells[i].textContent.match(/(\d{4}-\d{2}-\d{2})/);
      if (match) {
        dateText = match[1];
        break;
      }
    }
    if (!dateText) return;

    if (dateText <= cutoffDate) {
      const inactiveButton = row.querySelector('input[value="Inactive"]');
      if (inactiveButton) {
        buttonsToClick.push({
          button: inactiveButton,
          date: dateText,
          row: rowIndex,
        });
        logMessage(`Wiersz ${rowIndex}: Znaleziono przycisk "Inactive" dla daty ${dateText}`);
      }
    }
  });

  if (buttonsToClick.length === 0) {
    logMessage("Nie znaleziono żadnych wpisów spełniających kryteria dat.");
    return;
  }

  logMessage(`Znaleziono ${buttonsToClick.length} wpisów do usunięcia:`);
  buttonsToClick.forEach((item) => {
    logMessage(`- Wiersz ${item.row}: Wpis z datą ${item.date}`);
  });

  if (dryRun) {
    logMessage("Tryb testowy - przyciski nie zostały kliknięte.");
    return;
  }

  if (!confirm(`Czy na pewno chcesz usunąć ${buttonsToClick.length} wpisów z datą ≤ ${cutoffDate}?`)) {
    logMessage("Operacja anulowana przez użytkownika.");
    return;
  }

  const delay = 500;
  buttonsToClick.forEach((item, index) => {
    setTimeout(() => {
      try {
        item.button.click();
        logMessage(
          `Kliknięto przycisk dla wiersza ${item.row} z datą ${item.date} (${index + 1} z ${buttonsToClick.length})`
        );
      } catch (error) {
        logMessage(`Błąd podczas klikania przycisku w wierszu ${item.row}: ${error.message}`, true);
      }
      if (index === buttonsToClick.length - 1) {
        logMessage('Zakończono klikanie wszystkich przycisków "Inactive" dla wybranych dat.');
      }
    }, index * delay);
  });
}

// Inicjalizacja na stronie spam_plan.php
function handleSpamPlanPage() {
  if (window.location.href.includes("spam_plan.php")) {
    console.log("Extension: Wykryto stronę spam_plan.php - inicjalizacja narzędzia do usuwania wpisów");
    addRemovalToolUI();
  }
}

window.addEventListener("load", handleSpamPlanPage);

// Obsługa SPA (np. jeśli tabela się ładuje asynchronicznie)
if (typeof MutationObserver !== "undefined") {
  const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (mutation.type === "childList" && !document.getElementById("spam-removal-tool")) {
        handleSpamPlanPage();
      }
    });
  });
  observer.observe(document.body, { childList: true, subtree: true });
}
