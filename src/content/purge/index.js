function setupPurge() {
  const urlsTextarea = document.querySelector('textarea[name="urls"]');
  const domainSelect = document.querySelector('select[name="domain"]');
  const purgeButton = document.querySelector(
    'input[name="purge"][type="submit"]'
  );

  if (!urlsTextarea) return logger.error("Textarea for URLs not found.");
  if (!domainSelect) return logger.error("Domain select not found.");
  if (!purgeButton) return logger.error("Purge button not found.");

  urlsTextarea.style = `min-height: 200px; min-width: 300px;`;

  const purgeAllShopsButton = document.createElement("input");
	purgeAllShopsButton.style.marginLeft = "0.5rem";
  purgeAllShopsButton.type = "submit";
  purgeAllShopsButton.name = "PurgeAllShops";
  purgeAllShopsButton.value = "Purge All Shops";
  purgeAllShopsButton.id = "purgeAllShopsButton";
  purgeButton.insertAdjacentElement("afterend", purgeAllShopsButton);

  const saveUrlsButton = document.createElement("button");
  saveUrlsButton.textContent = "Save URL(s)";
	// prevents the button from submitting the form
	saveUrlsButton.type = "button";
  saveUrlsButton.style = `
		margin-left: 0.5rem;
    font-family: Arial;
    font-size: 11px;`;

  purgeAllShopsButton.insertAdjacentElement("afterend", saveUrlsButton);

  saveUrlsButton.addEventListener("click", function () {
    const urlsValue = urlsTextarea.value.trim();
    if (!urlsValue) return alert("No URLs to save.");
    let savedUrls = JSON.parse(localStorage.getItem("purgeSavedUrls") || "[]");
    const urlsArr = urlsValue
      .split(/\r?\n/)
      .map((u) => u.trim())
      .filter(Boolean);
    let added = 0;
    urlsArr.forEach((url) => {
      if (!savedUrls.includes(url)) {
        savedUrls.push(url);
        added++;
      }
    });
    if (added > 0) {
      localStorage.setItem("purgeSavedUrls", JSON.stringify(savedUrls));
      alert(`Saved ${added} new URL(s)!`);
      renderSavedUrlsSelect();
    } else {
      alert("These URL(s) are already saved.");
    }
  });

  let savedUrlsSelect;
  function renderSavedUrlsSelect() {
    if (savedUrlsSelect) savedUrlsSelect.remove();
    if (window._insertBtn) window._insertBtn.remove();
    const savedUrls = JSON.parse(
      localStorage.getItem("purgeSavedUrls") || "[]"
    );

    savedUrlsSelect = document.createElement("select");
    savedUrlsSelect.multiple = true;
    savedUrlsSelect.size = 0;
    savedUrlsSelect.style = `height: 100%; width: 100%;`;
    savedUrls.forEach((url) => {
      const opt = document.createElement("option");
      opt.value = url;
      opt.textContent = url.length > 80 ? url.slice(0, 80) + "..." : url;
      savedUrlsSelect.appendChild(opt);
    });
    savedUrlsSelect.addEventListener("dblclick", insertSelectedUrls);

    function createBtn(text, onClick) {
      const btn = document.createElement("button");
      btn.textContent = text;

			// prevents the button from submitting the form
			btn.type = "button";
      btn.style = `
				width: 100%;
				margin-top: 0.5rem;
				height: 100%;
				font-family: Arial;
				display: block;
				font-size: 11px;`;
      btn.addEventListener("click", onClick);
      return btn;
    }

    const insertBtn = createBtn("Insert Selected URL(s)", insertSelectedUrls);
    window._insertBtn = insertBtn;
    const removeSelectedBtn = createBtn(
      "Delete selected from saved",
      function () {
        if (!savedUrlsSelect) return;
        const selected = Array.from(savedUrlsSelect.selectedOptions).map(
          (opt) => opt.value
        );
        if (!selected.length) return alert("Select URLs to delete.");
        let savedUrls = JSON.parse(
          localStorage.getItem("purgeSavedUrls") || "[]"
        );
        savedUrls = savedUrls.filter((url) => !selected.includes(url));
        localStorage.setItem("purgeSavedUrls", JSON.stringify(savedUrls));
        alert("Deleted selected URLs.");
        renderSavedUrlsSelect();
      }
    );
    const clearBtn = createBtn("Clear Saved URLs", function () {
      if (confirm("Are you sure you want to remove all saved URLs?")) {
        localStorage.removeItem("purgeSavedUrls");
        renderSavedUrlsSelect();
      }
    });

    if (savedUrls.length === 0) {
      clearBtn.disabled = true;
      removeSelectedBtn.disabled = true;
      insertBtn.disabled = true;
    }

    const controls = [savedUrlsSelect, insertBtn, removeSelectedBtn, clearBtn];

    const textareaTd = urlsTextarea.closest("td");
    if (textareaTd && textareaTd.parentElement) {
      let nextTd = textareaTd.nextElementSibling;
      if (nextTd && nextTd.classList.contains("multiselect-td")) {
        nextTd.innerHTML = "";
        controls.forEach((ctrl) => nextTd.appendChild(ctrl));
      } else {
        const multiTd = document.createElement("td");
        multiTd.className = "multiselect-td";
        multiTd.style = `
					vertical-align: top;
					height: 100%`;

        controls.forEach((ctrl) => multiTd.appendChild(ctrl));
        textareaTd.parentElement.insertBefore(multiTd, textareaTd.nextSibling);
      }
    } else {
      saveUrlsButton.insertAdjacentElement("afterend", savedUrlsSelect);
      controls.slice(1).reduce((prev, curr) => {
        prev.insertAdjacentElement("afterend", curr);
        return curr;
      }, savedUrlsSelect);
    }
  }

  function insertSelectedUrls() {
    if (!savedUrlsSelect) return;
    const selected = Array.from(savedUrlsSelect.selectedOptions).map(
      (opt) => opt.value
    );
    if (selected.length) {
      let current = urlsTextarea.value.trim();
      let toAppend = selected.join("\n");
      if (current) {
        const currentSet = new Set(
          current
            .split(/\r?\n/)
            .map((u) => u.trim())
            .filter(Boolean)
        );
        selected.forEach((url) => {
          if (!currentSet.has(url)) {
            current += "\n" + url;
          }
        });
        urlsTextarea.value = current;
      } else {
        urlsTextarea.value = toAppend;
      }
    }
  }

  renderSavedUrlsSelect();

  let logTable = document.getElementById("purge-log-table");
  if (!logTable) {
    logTable = document.createElement("table");
    logTable.id = "purge-log-table";
    logTable.style.marginTop = "40px";
    logTable.style.width = "100%";
    logTable.innerHTML = `
      <thead>
        <tr>
          <th>#</th>
          <th>Domain</th>
          <th>URLs</th>
          <th>Status</th>
          <th>Details</th>
        </tr>
      </thead>
      <tbody></tbody>
    `;
    purgeButton.parentElement.appendChild(logTable);
  }
  const logTbody = logTable.querySelector("tbody");

  function addLogRow(index, domain, urls, status, details) {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index}</td>
      <td>${domain}</td>
      <td><pre style="white-space:pre-wrap;max-width:300px;">${urls}</pre></td>
      <td>${status}</td>
      <td><pre style="white-space:pre-wrap;max-width:300px;">${details}</pre></td>
    `;
    logTbody.appendChild(row);
  }

  purgeAllShopsButton.addEventListener("click", async function (event) {
    event.preventDefault();

    const urlsValue = urlsTextarea.value.trim();
    if (!urlsValue) return logger.error("No URLs provided.");

    logTbody.innerHTML = "";

    const domains = Array.from(domainSelect.options).map((opt) => opt.value);
    const requestURL = "https://www.prologistics.info/purge.php";

    let index = 1;
    for (const domain of domains) {
      const formData = new FormData();
      formData.append("domain", domain);
      formData.append("prio", "1");
      formData.append("urls", urlsValue);
      formData.append("purge", "Purge");

      let status = "";
      let details = "";

      try {
        const response = await fetch(requestURL, {
          method: "POST",
          body: formData,
        });
        logger.debug("Wyslano request:", { table: Array.from(formData) });

        if (response.ok) {
          status = `OK (${response.status})`;
          details = "Success";
          logger.info(
            `Request for ${domain} successful! Status: ${response.status}`
          );
        } else {
          status = `Error (${response.status})`;
          details = await response.text();
          logger.error(
            `Request for ${domain} failed! Status: ${response.status}`
          );
          logger.error(`Error details for ${domain}:`, details);
        }
      } catch (error) {
        status = "Fetch error";
        details = error.toString();
        logger.error(`An error occurred for ${domain}:`, error);
      }

      addLogRow(index++, domain, urlsValue, status, details);
    }
  });
}

setupPurge();
