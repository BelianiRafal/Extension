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
  const daysToMonday = (day === 0 ? 6 : day - 1); // ile dni cofnąć do poniedziałku
  cutoff.setDate(cutoff.getDate() - daysToMonday);

  const yyyy = cutoff.getFullYear();
  const mm = String(cutoff.getMonth() + 1).padStart(2, '0');
  const dd = String(cutoff.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

// Funkcja tworząca UI narzędzia
function addRemovalToolUI() {
  if (document.getElementById('spam-removal-tool')) return;

  const container = document.createElement('div');
  container.id = 'spam-removal-tool';

  // Styl panelu
  container.style.position = 'fixed';
  container.style.top = '10px';
  container.style.right = '10px';
  container.style.zIndex = '9999';
  container.style.width = '320px';
  container.style.padding = '14px 10px 10px 10px';
  container.style.backgroundColor = '#f1f1f1';
  container.style.border = '1px solid #ddd';
  container.style.borderRadius = '4px';
  container.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
  container.style.fontFamily = 'sans-serif';
  container.style.fontSize = '15px';

  // Nagłówek
  const title = document.createElement('h3');
  title.textContent = 'Narzędzie do usuwania starych wpisów';
  title.style.margin = '0 0 10px 0';
  title.style.fontSize = '17px';
  container.appendChild(title);

  // Informacja o dacie granicznej
  const cutoffDate = getCutoffDate();
  const infoLabel = document.createElement('div');
  infoLabel.innerHTML =
    `<b>Usuwane będą wszystkie wpisy z datą ≤ <span style="color:#e53935;">${cutoffDate}</span></b><br><span style="font-size:13px;">(wszystko starsze niż 2 tygodnie, dopełnione do poniedziałku)</span>`;
  infoLabel.style.marginBottom = '10px';
  container.appendChild(infoLabel);

  // Kontenery na przyciski
  const buttonContainer = document.createElement('div');
  buttonContainer.style.display = 'flex';
  buttonContainer.style.justifyContent = 'space-between';
  buttonContainer.style.marginBottom = '10px';

  // Przycisk testowy
  const testButton = document.createElement('button');
  testButton.textContent = 'Testuj';
  testButton.style.flex = '1';
  testButton.style.marginRight = '5px';
  testButton.style.padding = '6px 12px';
  testButton.style.backgroundColor = '#4CAF50';
  testButton.style.color = 'white';
  testButton.style.border = 'none';
  testButton.style.borderRadius = '4px';
  testButton.style.cursor = 'pointer';
  testButton.onclick = () => findAndRemoveEntries(true);
  buttonContainer.appendChild(testButton);

  // Przycisk wykonawczy
  const executeButton = document.createElement('button');
  executeButton.textContent = 'Usuń wpisy';
  executeButton.style.flex = '1';
  executeButton.style.padding = '6px 12px';
  executeButton.style.backgroundColor = '#f44336';
  executeButton.style.color = 'white';
  executeButton.style.border = 'none';
  executeButton.style.borderRadius = '4px';
  executeButton.style.cursor = 'pointer';
  executeButton.onclick = () => findAndRemoveEntries(false);
  buttonContainer.appendChild(executeButton);

  container.appendChild(buttonContainer);

  // Log toggle
  const logToggle = document.createElement('a');
  logToggle.textContent = 'Pokaż logi';
  logToggle.href = '#';
  logToggle.style.display = 'block';
  logToggle.style.textAlign = 'center';
  logToggle.style.marginBottom = '5px';
  logToggle.style.color = '#0066cc';
  logToggle.style.textDecoration = 'none';

  const logArea = document.createElement('div');
  logArea.id = 'removal-log';
  logArea.style.display = 'none';
  logArea.style.padding = '10px';
  logArea.style.backgroundColor = '#fff';
  logArea.style.border = '1px solid #ddd';
  logArea.style.borderRadius = '4px';
  logArea.style.maxHeight = '200px';
  logArea.style.overflowY = 'auto';
  logArea.style.fontFamily = 'monospace';
  logArea.style.fontSize = '12px';

  logToggle.onclick = function(e) {
    e.preventDefault();
    if (logArea.style.display === 'none') {
      logArea.style.display = 'block';
      logToggle.textContent = 'Ukryj logi';
    } else {
      logArea.style.display = 'none';
      logToggle.textContent = 'Pokaż logi';
    }
  };

  container.appendChild(logToggle);
  container.appendChild(logArea);

  // Przycisk zamykania
  const closeButton = document.createElement('button');
  closeButton.textContent = '×';
  closeButton.title = 'Zamknij panel';
  closeButton.style.position = 'absolute';
  closeButton.style.top = '5px';
  closeButton.style.right = '5px';
  closeButton.style.background = 'none';
  closeButton.style.border = 'none';
  closeButton.style.fontSize = '20px';
  closeButton.style.cursor = 'pointer';
  closeButton.style.color = '#999';
  closeButton.onclick = function() {
    container.style.display = 'none';
  };
  container.appendChild(closeButton);

  document.body.appendChild(container);
}

// Funkcja do logowania komunikatów
function logMessage(message, isError = false) {
  const logArea = document.getElementById('removal-log');
  if (logArea) {
    if (logArea.style.display === 'none') {
      document.querySelector('#spam-removal-tool a').textContent = 'Ukryj logi';
      logArea.style.display = 'block';
    }
    const logEntry = document.createElement('div');
    logEntry.textContent = message;
    if (isError) logEntry.style.color = 'red';
    logArea.appendChild(logEntry);
    logArea.scrollTop = logArea.scrollHeight;
  } else {
    isError ? console.error(message) : console.log(message);
  }
}

// Główna funkcja kasowania
function findAndRemoveEntries(dryRun = true) {
  const cutoffDate = getCutoffDate();
  logMessage(`${dryRun ? 'Tryb testowy' : 'Wykonywanie usuwania'} dla daty granicznej: ${cutoffDate}`);

  const rows = document.querySelectorAll('tr');
  logMessage(`Znaleziono ${rows.length} wierszy w tabeli.`);

  const buttonsToClick = [];

  rows.forEach((row, rowIndex) => {
    const cells = row.querySelectorAll('td');
    if (cells.length < 3) return;

    let dateText = '';
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
          row: rowIndex
        });
        logMessage(`Wiersz ${rowIndex}: Znaleziono przycisk "Inactive" dla daty ${dateText}`);
      }
    }
  });

  if (buttonsToClick.length === 0) {
    logMessage('Nie znaleziono żadnych wpisów spełniających kryteria dat.');
    return;
  }

  logMessage(`Znaleziono ${buttonsToClick.length} wpisów do usunięcia:`);
  buttonsToClick.forEach(item => {
    logMessage(`- Wiersz ${item.row}: Wpis z datą ${item.date}`);
  });

  if (dryRun) {
    logMessage('Tryb testowy - przyciski nie zostały kliknięte.');
    return;
  }

  if (!confirm(`Czy na pewno chcesz usunąć ${buttonsToClick.length} wpisów z datą ≤ ${cutoffDate}?`)) {
    logMessage('Operacja anulowana przez użytkownika.');
    return;
  }

  const delay = 500;
  buttonsToClick.forEach((item, index) => {
    setTimeout(() => {
      try {
        item.button.click();
        logMessage(`Kliknięto przycisk dla wiersza ${item.row} z datą ${item.date} (${index + 1} z ${buttonsToClick.length})`);
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
  if (window.location.href.includes('spam_plan.php')) {
    console.log('Extension: Wykryto stronę spam_plan.php - inicjalizacja narzędzia do usuwania wpisów');
    addRemovalToolUI();
  }
}

window.addEventListener('load', handleSpamPlanPage);

// Obsługa SPA (np. jeśli tabela się ładuje asynchronicznie)
if (typeof MutationObserver !== 'undefined') {
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.type === 'childList' && !document.getElementById('spam-removal-tool')) {
        handleSpamPlanPage();
      }
    });
  });
  observer.observe(document.body, { childList: true, subtree: true });
}
