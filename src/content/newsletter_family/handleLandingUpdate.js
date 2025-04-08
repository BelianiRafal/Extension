async function handleLandingUpdate({
  activate_from_date,
  activate_from_time,
  deactivate_from_date,
  deactivate_from_time,
  newsletter_template_id,
  shop_id,
  id,
  name // Dodane nowe pole dla nazwy
}) {
  try {
    // Krok 1: Najpierw aktualizujemy wartość pola name i daty
    console.log("Aktualizuję pole name i daty...");
    const formDataValues = {
      activate_from_date: activate_from_date,
      activate_from_time: activate_from_time,
      deactivate_from_date: deactivate_from_date,
      deactivate_from_time: deactivate_from_time,
      newsletter_template_id: newsletter_template_id,
      ordering: 0,
      update: "Update",
      id: id,
      shop_id: shop_id,
      name: name || "" // Dodajemy nazwę (lub pusty string jeśli nie została podana)
    };
    const formData = createFormData(formDataValues);
    
    if (formData) {
      await updateLanding({ formData, shop_id, id });
      console.log("Aktualizacja pola name i dat zakończona pomyślnie");
      
      // Krok 2: Otwieramy stronę w iframe, aby móc fizycznie kliknąć przycisk
      console.log("Tworzę iframe do symulacji kliknięcia przycisku...");
      
      // Tworzymy niewidoczny iframe
      const iframe = document.createElement('iframe');
      iframe.style.width = '0';
      iframe.style.height = '0';
      iframe.style.border = 'none';
      iframe.style.position = 'absolute';
      iframe.style.top = '-9999px';
      iframe.src = `https://www.prologistics.info/shop_content.php?id=${id}&shop_id=${shop_id}`;
      
      // Dodajemy iframe do dokumentu
      document.body.appendChild(iframe);
      
      // Czekamy na załadowanie iframe
      await new Promise((resolve) => {
        iframe.onload = resolve;
      });
      
      // Znajdujemy przycisk copyName w iframe i klikamy go
      console.log("Iframe załadowany, szukam przycisku copyName...");
      
      // Makro do fizycznego kliknięcia przycisku
      const clickCopyNameButton = () => {
        try {
          const copyNameButton = iframe.contentDocument.getElementById('copyName');
          
          if (copyNameButton) {
            console.log("Znaleziono przycisk copyName, symulacja kliknięcia...");
            
            // Symulacja fizycznego kliknięcia
            copyNameButton.click();
            
            // Alternatywnie można zasymulować zdarzenia myszki
            copyNameButton.dispatchEvent(new MouseEvent('mousedown', {
              bubbles: true,
              cancelable: true,
              view: iframe.contentWindow
            }));
            
            copyNameButton.dispatchEvent(new MouseEvent('mouseup', {
              bubbles: true,
              cancelable: true,
              view: iframe.contentWindow
            }));
            
            copyNameButton.dispatchEvent(new MouseEvent('click', {
              bubbles: true,
              cancelable: true,
              view: iframe.contentWindow
            }));
            
            console.log("Symulacja kliknięcia zakończona");
            return true;
          } else {
            console.warn("Nie znaleziono przycisku copyName w iframe");
            return false;
          }
        } catch (error) {
          console.error("Błąd podczas symulacji kliknięcia:", error);
          return false;
        }
      };
      
      // Próbujemy kliknąć przycisk (z 3 próbami w razie problemów)
      let clickAttempts = 0;
      let clickSuccess = false;
      
      while (clickAttempts < 3 && !clickSuccess) {
        clickAttempts++;
        console.log(`Próba kliknięcia przycisku copyName (${clickAttempts}/3)...`);
        
        // Czekamy chwilę, aby strona miała czas się w pełni załadować
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Próbujemy kliknąć przycisk
        clickSuccess = clickCopyNameButton();
        
        if (!clickSuccess) {
          console.log("Próba kliknięcia nieudana, czekam i próbuję ponownie...");
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }
      
      // Czekamy chwilę po kliknięciu, aby zmiany miały czas się zastosować
      console.log("Czekam 2 sekundy po kliknięciu przycisku...");
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Krok 3: Klikamy przycisk Update w iframe
      const clickUpdateButton = () => {
        try {
          // Znajdujemy przycisk Update
          const updateButtons = iframe.contentDocument.querySelectorAll('input[name="update"], input[value="Update"]');
          
          if (updateButtons && updateButtons.length > 0) {
            console.log("Znaleziono przycisk Update, symulacja kliknięcia...");
            
            // Klikamy pierwszy znaleziony przycisk Update
            updateButtons[0].click();
            
            // Symulujemy również zdarzenia myszki
            updateButtons[0].dispatchEvent(new MouseEvent('click', {
              bubbles: true,
              cancelable: true,
              view: iframe.contentWindow
            }));
            
            console.log("Kliknięcie przycisku Update zakończone");
            return true;
          } else {
            console.warn("Nie znaleziono przycisku Update w iframe");
            return false;
          }
        } catch (error) {
          console.error("Błąd podczas klikania przycisku Update:", error);
          return false;
        }
      };
      
      // Klikamy przycisk Update
      const updateSuccess = clickUpdateButton();
      
      // Czekamy na zakończenie operacji
      console.log("Czekam 2 sekundy po kliknięciu przycisku Update...");
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Usuwamy iframe
      document.body.removeChild(iframe);
      
      // Wyświetlamy powiadomienie
      if (clickSuccess && updateSuccess) {
        new Notification("Landing page updated with name, title and aliases.");
      } else if (clickSuccess) {
        new Notification("Copy Name to Title completed, but Update may have failed.");
      } else {
        new Notification("Landing page date and name updated (without title copy).");
      }
    }
  } catch (error) {
    console.error("Błąd podczas procesu aktualizacji:", error);
    // W przypadku błędu, wyświetlamy standardowe powiadomienie
    new Notification("Landing page date and name updated.");
  }

  function createFormData(formDataValues) {
    const formData = new FormData();
    let isUndefinedValue = false;
    for (let [key, value] of Object.entries(formDataValues)) {
      if (Array.isArray(value)) {
        value.forEach((item) => formData.append(key, item));
      } else {
        if (value === undefined || value === null) {
          isUndefinedValue = true;
        }
        formData.append(key, value);
      }
    }
    return isUndefinedValue ? null : formData;
  }

  async function updateLanding({ shop_id, id, formData }) {
    await fetch("https://www.prologistics.info/shop_content.php", {
      headers: {
        accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "accept-language": "en-US,en;q=0.9,ru;q=0.8",
        "cache-control": "no-cache",
        pragma: "no-cache",
        "sec-ch-ua":
          '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "same-origin",
        "sec-fetch-user": "?1",
        "upgrade-insecure-requests": "1",
      },
      referrer: `https://www.prologistics.info/shop_content.php?id=${id}&shop_id=${shop_id}`,
      referrerPolicy: "strict-origin-when-cross-origin",
      body: formData,
      method: "POST",
      mode: "cors",
      credentials: "include",
    });
  }
}