function setup() {
  const urlsTextarea = document.querySelector('textarea[name="urls"]');
  const domainSelect = document.querySelector('select[name="domain"]');
  const purgeButton = document.querySelector(
    'input[name="purge"][type="submit"]'
  );

  if (!urlsTextarea) return logger.error("Textarea for URLs not found.");
  if (!domainSelect) return logger.error("Domain select not found.");
  if (!purgeButton) return logger.error("Purge button not found.");

  // Tworzenie przycisku
  const purgeAllShopsButton = document.createElement("input");
  purgeAllShopsButton.type = "submit";
  purgeAllShopsButton.name = "PurgeAllShops";
  purgeAllShopsButton.value = "Purge All Shops";
  purgeAllShopsButton.id = "purgeAllShopsButton";
  purgeButton.insertAdjacentElement("afterend", purgeAllShopsButton);

  // Tworzenie tabeli logów na dole strony
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

    // Czyścimy stare logi
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

<<<<<<< HEAD
setup();
=======
setup();
>>>>>>> 1b0f885f8d9825b06daa4522ca874e6c3d96aba0
