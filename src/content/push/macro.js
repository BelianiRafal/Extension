(function () {
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));
  const escKeyEvent = new KeyboardEvent("keydown", {
    key: "Escape",
    keyCode: 27,
    which: 27,
    bubbles: true,
  });

  // Helper do szukania selecta językowego
  function getLangSelect() {
    const selects = Array.from(document.querySelectorAll("select"));
    for (let s of selects) {
      const opts = Array.from(s.options);
      if (opts.length > 5 && opts.some((o) => o.value === "pl") && opts.some((o) => o.value === "de")) {
        return s;
      }
    }
    return null;
  }

  // Helper do filtrowania opcji językowych (pomija puste)
  function getLangOptions(select) {
    return Array.from(select.options).filter((opt) => opt.value);
  }

  // UI: Dodaj oba buttony
  function addMacroButtons() {
    if (document.getElementById("push-macro-btn")) return;

    // Wspólna animacja SVG
    const spinnerSVG = `
      <span class="macro-spinner" style="display:none; margin-left:8px; vertical-align:middle;">
        <svg width="18" height="18" viewBox="0 0 50 50">
          <circle cx="25" cy="25" r="20" fill="none" stroke="#fff" stroke-width="5" 
          stroke-linecap="round" stroke-dasharray="31.415, 31.415" transform="rotate(-90 25 25)">
            <animateTransform attributeName="transform" type="rotate" from="0 25 25" to="360 25 25"
              dur="1s" repeatCount="indefinite"/>
          </circle>
        </svg>
      </span>`;

    // Button SEND
    const btnSend = document.createElement("button");
    btnSend.id = "push-macro-btn";
    btnSend.innerHTML = `<span class="btnText">Start sending</span>${spinnerSVG}`;
    Object.assign(btnSend.style, styleBase, styleGreen, {
      // bottom: "32px",
      // right: "32px",
      top: "120px",
      right: "20px",
    });

    if (btnSend) {
      disabledButton(btnSend, true);
    }

    // Button TEST
    const btnTest = document.createElement("button");
    btnTest.id = "push-test-btn";
    btnTest.innerHTML = `<span class="btnText">Start testing</span>${spinnerSVG}`;
    Object.assign(btnTest.style, styleBase, styleBlue, {
      // bottomt: "90px",
      // right: "32px",
      top: "60px",
      right: "20px",
    });

    const btnContainer = document.createElement("div");
    btnContainer.className = "btn-container";

    // Obsługa kliknięcia SEND
    btnSend.onclick = async function () {
      Swal.fire({
        title: "Woooow",
        text: "Did you send yourself the test?",
        icon: "question",
        showCancelButton: true,
      }).then(async (result) => {
        if (result.isConfirmed) {
          toggleBtnState(btnSend, true, "Wysyłanie...");
          await runPushMacro({
            getButton: () => document.querySelector("input[type='submit'][name='submit'][value='Send']"),
            getStatusEl: () => btnSend.querySelector(".btnText"),
            getSpinnerEl: () => btnSend.querySelector(".macro-spinner"),
            onlyRandom: false,
          });
          toggleBtnState(btnSend, false, "Gotowe!");
        }
      });
    };

    // Obsługa kliknięcia TEST
    btnTest.onclick = async function () {
      await toggleBtnState(btnTest, true, "Testuję...");
      disabledButton(btnSend, false);
      await runPushMacro({
        getButton: () => document.querySelector("input#test[value='Test']"),
        getStatusEl: () => btnTest.querySelector(".btnText"),
        getSpinnerEl: () => btnTest.querySelector(".macro-spinner"),
        onlyRandom: true,
      });
      toggleBtnState(btnTest, false, "Gotowe!");
    };

    btnContainer.append(btnSend);
    btnContainer.append(btnTest);

    document.body.append(btnContainer);
  }

  async function disabledButton(btn, isDisabled) {
    if (isDisabled) {
      btn.disabled = isDisabled;
      btn.style.opacity = "0.5";
      btn.style.pointerEvents = "none";
    } else {
      btn.disabled = isDisabled;
      btn.style.opacity = "1";
      btn.style.pointerEvents = "auto";
    }
  }

  // Styl wspólny + warianty
  const styleBase = {
    position: "fixed",
    padding: "16px 32px",
    color: "#fff",
    fontWeight: "bold",
    fontSize: "1.2rem",
    border: "none",
    borderRadius: "2em",
    boxShadow: "0 4px 16px rgba(0,0,0,0.09)",
    zIndex: 9999,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    transition: "background 0.2s",
  };
  const styleGreen = {
    background: "linear-gradient(90deg, #34d399 0%, #059669 100%)",
  };
  const styleBlue = {
    background: "linear-gradient(90deg, #60a5fa 0%, #2563eb 100%)",
  };

  // Blokuje/odblokowuje button, animuje, zmienia napis
  async function toggleBtnState(btn, disabled, msg) {
    btn.disabled = disabled;
    btn.querySelector(".btnText").textContent = msg;
    btn.querySelector(".macro-spinner").style.display = disabled ? "inline-block" : "none";
    if (!disabled)
      setTimeout(
        () =>
          (btn.querySelector(".btnText").textContent = btn.id === "push-macro-btn" ? "Start sending" : "Start testing"),
        2000
      );
  }

  // MAKRO: logika główna (uniwersalna dla obu przycisków)
  async function runPushMacro({ getButton, getStatusEl, getSpinnerEl, onlyRandom }) {
    const select = getLangSelect();
    if (!select) {
      alert("Nie znaleziono selecta z językami.");
      getStatusEl().textContent = "Błąd: brak selecta";
      return;
    }
    const options = getLangOptions(select);

    let toProcess = options;
    if (onlyRandom) {
      // Wybierz random 3 różne opcje
      toProcess = shuffle(options).slice(0, 3);
    }
    const total = toProcess.length;

    for (let i = 0; i < total; i++) {
      const option = toProcess[i];
      select.value = option.value;
      select.dispatchEvent(new Event("change"));
      getStatusEl().textContent = `${option.textContent} (${i + 1}/${total})`;

      await delay(1000);

      const button = getButton();
      if (!button) {
        alert("Nie znaleziono przycisku akcji.");
        getStatusEl().textContent = "Błąd: brak przycisku";
        return;
      }
      button.click();

      await delay(500);
      document.dispatchEvent(escKeyEvent);
      await delay(500);
    }
    getStatusEl().textContent = "Zakończono!";
  }

  // Utility: Fisher–Yates shuffle
  function shuffle(array) {
    let arr = array.slice();
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  window.addEventListener("load", () => {
    setTimeout(addMacroButtons, 1500);
  });
})();
