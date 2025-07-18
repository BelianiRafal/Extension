const copyLandingDate = {
  activate_from_date: null,
  activate_from_time: null,
  deactivate_from_date: null,
  deactivate_from_time: null,
  copy_button: null,
  shopId: null,
  sellerToshopId: {
    Beliani: "1",
    "Beliani DE": "3",
    "Beliani UK": "2",
    "Beliani FR": "7",
    "Beliani AT": "8",
    "Beliani SP": "10",
    "Beliani PL": "12",
    "Beliani NL": "17",
    "Beliani BE": "19",
    "Beliani IT": "21",
    "Beliani PT": "22",
    "Beliani SE": "23",
    "Beliani HU": "24",
    "Beliani DK": "25",
    "Beliani CZ": "26",
    "Beliani FI": "27",
    "Beliani NO": "28",
    "Beliani SK": "29",
    "Beliani RO": "30",
  },

  init(ui) {
    const copyLanding = ui.createTh({
      title: "Copy Landing Date & Name",
      description: "Copy landing page date and name from current landing page.",
    });
    ui.header.append(copyLanding);

    this.activate_from_date = document.querySelector("#activate_from_date");
    this.activate_from_time = document.querySelector("#activate_from_time");
    this.deactivate_from_date = document.querySelector("#deactivate_from_date");
    this.deactivate_from_time = document.querySelector("#deactivate_from_time");

    const nameInputs = []; // Tablica do przechowywania wszystkich pól input
    
    const rows = ui.tbody.querySelectorAll("tr");
    rows.forEach((row, index) => {
      const hrefs = row.querySelectorAll("a");
      const id = row.querySelector("a");
      if (!id) {
        new Notification("Newsletter Id page not found.");
        return;
      }
      const _id = id.textContent.trim();
      const href_lp = (hrefs && [...hrefs]).filter((item) => {
        return item.href.includes("/shop_content.php?id");
      });
      
      // Tworzenie pola input dla nazwy
      const nameInput = document.createElement("input");
      nameInput.type = "text";
      nameInput.className = "lp-name-input";
      nameInput.placeholder = "Landing page name";
      nameInput.style.marginRight = "5px";
      nameInput.style.padding = "3px";
      nameInput.style.width = "150px";
      
      // Dodajemy input do tablicy
      nameInputs.push(nameInput);
      
      // Dla pierwszego pola dodajemy nasłuchiwacz zdarzeń
      if (index === 0) {
        nameInput.addEventListener("input", function() {
          // Aktualizujemy wszystkie pozostałe pola
          const value = this.value;
          nameInputs.forEach((input, i) => {
            if (i !== 0) { // Pomijamy pierwsze pole (to, które edytujemy)
              input.value = value;
            }
          });
        });
      }
      
      const button = ui.createButton({
        title: "Copy LP date",
        onClick: () => {
          // Newsletter can have empty Content page
          if (href_lp.length < 1) {
            new Notification("Landing page not found.");
            return;
          }
          const ID = new URL(
            location.origin + href_lp[0].href
          ).searchParams.get("id");
          const SHOP_ID = new URL(
            location.origin + href_lp[0].href
          ).searchParams.get("shop_id");
          if (
            !this.activate_from_date.value ||
            !this.activate_from_time.value ||
            !this.deactivate_from_date.value ||
            !this.deactivate_from_time.value
          ) {
            new Notification("Landing page date is not valid.");
            return;
          }
          const payload = {
            id: ID,
            shop_id: SHOP_ID,
            activate_from_date: this.activate_from_date.value,
            activate_from_time: this.activate_from_time.value,
            deactivate_from_date: this.deactivate_from_date.value,
            deactivate_from_time: this.deactivate_from_time.value,
            newsletter_template_id: _id,
            name: nameInput.value // Dodajemy wartość nazwy z inputa
          };
          handleLandingUpdate(payload);
        },
      });
      
      // Tworzenie kontenera dla inputa i przycisku
      const container = document.createElement("div");
      container.style.display = "flex";
      container.style.alignItems = "center";
      
      // Dodanie inputa i przycisku do kontenera
      container.appendChild(nameInput);
      container.appendChild(button);
      
      // Dodanie kontenera do kolumny
      row.append(ui.createColumn([container]));
    });
  },
};