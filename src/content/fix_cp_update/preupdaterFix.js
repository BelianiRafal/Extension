// Ten skrypt dodaje nowy przycisk "realUpdate" obok przycisku "Update"
// Po kliknięciu tego przycisku, najpierw zostaną kliknięte przyciski dla odpowiednich języków,
// a następnie po 3 sekundach zostanie kliknięty oryginalny przycisk "Update"

// Mapowanie shop_id na odpowiednie języki
const shopLanguageMap = {
    "1": ["german", "french"],
    "2": ["english"],
    "3": ["germanDE"],
    "7": ["french"],
    "8": ["germanDE"],
    "10": ["spanish"],
    "12": ["polish"],
    "17": ["dutch"],
    "19": ["dutch", "french"],
    "21": ["italian"],
    "22": ["portugal"],
    "23": ["swedish"],
    "24": ["Hungarian"],
    "25": ["danish"],
    "26": ["czech"],
    "27": ["finnish"],
    "28": ["norsk"],
    "29": ["slovak"],
    "30": ["romanian"]
  };
  
  // Funkcja do uzyskania shop_id z URL
  function getShopIdFromUrl() {
    const url = window.location.href;
    const match = url.match(/shop_id=(\d+)/);
    return match ? match[1] : null;
  }
  
  // Funkcja do kliknięcia przycisków dla konkretnych języków
  function clickLanguageButtons(shopId) {
    const languages = shopLanguageMap[shopId];
    if (!languages) return;
  
    console.log(`Klikanie przycisków dla języków w shop_id=${shopId}: ${languages.join(', ')}`);
    
    languages.forEach(language => {
      const buttons = document.querySelectorAll(`input[type="button"][onclick="updateHtml(this, '${language}');"][value="Update"]`);
      buttons.forEach(button => {
        console.log(`Kliknięcie przycisku dla języka: ${language}`);
        button.click();
      });
    });
  }
  
  // Funkcja do kliknięcia głównego przycisku Update
  function clickMainUpdateButton() {
    const updateButtons = document.querySelectorAll('input.update-btn[type="button"][value="Update"]');
    if (updateButtons.length > 0) {
      console.log("Kliknięcie głównego przycisku Update");
      updateButtons[0].click();
    } else {
      console.log("Nie znaleziono głównego przycisku Update");
    }
  }
  
  // Funkcja do dodania nowego przycisku "realUpdate"
  function addRealUpdateButton() {
    const shopId = getShopIdFromUrl();
    if (!shopId) {
      console.log('Nie można znaleźć shop_id w URL');
      return;
    }
    
    // Znajdujemy oryginalny przycisk Update
    const updateButtons = document.querySelectorAll('input.update-btn[type="button"][value="Update"]');
    if (updateButtons.length === 0) {
      console.log("Nie znaleziono głównego przycisku Update");
      return;
    }
    
    // Dla każdego znalezionego przycisku Update dodajemy nasz przycisk realUpdate
    updateButtons.forEach(updateButton => {
      // Tworzymy nowy przycisk "realUpdate"
      const realUpdateButton = document.createElement('input');
      realUpdateButton.type = 'button';
      realUpdateButton.value = 'realUpdate';
      realUpdateButton.className = 'real-update-btn';
      realUpdateButton.style.marginLeft = '5px';
      realUpdateButton.style.backgroundColor = '#4CAF50';
      realUpdateButton.style.color = 'white';
      realUpdateButton.style.border = '1px solid #4CAF50';
      realUpdateButton.style.borderRadius = '3px';
      realUpdateButton.style.padding = '3px 10px';
      realUpdateButton.style.cursor = 'pointer';
      realUpdateButton.title = 'Automatycznie aktualizuj wszystkie języki';
      
      // Dodajemy przycisk obok oryginalnego przycisku Update
      updateButton.parentNode.insertBefore(realUpdateButton, updateButton.nextSibling);
      
      // Dodajemy obsługę zdarzenia kliknięcia na nowy przycisk
      realUpdateButton.addEventListener('click', function() {
        // Wyłączamy przycisk na czas procesu aktualizacji
        realUpdateButton.disabled = true;
        realUpdateButton.value = 'Aktualizuję...';
        
        // Najpierw klikamy przyciski dla języków
        clickLanguageButtons(shopId);
        
        // Następnie po 3 sekundach klikamy główny przycisk
        console.log("Czekam 3 sekundy...");
        setTimeout(() => {
          clickMainUpdateButton();
          
          // Resetujemy przycisk
          setTimeout(() => {
            realUpdateButton.disabled = false;
            realUpdateButton.value = 'realUpdate';
          }, 1000);
        }, 3000);
      });
    });
  }
  
  // Uruchamiamy skrypt po pełnym załadowaniu strony
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addRealUpdateButton);
  } else {
    addRealUpdateButton();
  }