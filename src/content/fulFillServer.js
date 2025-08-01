if (
  window.location.href.includes(
    "https://www.prologistics.info/news_email.php?id=",
  )
) {
  init();
}
function init() {
  const rootNode = document.querySelector("[name='update']");
  if (!rootNode) return;
  rootNode.insertAdjacentElement(
    "afterend",
    createBtn({
      onClick: () => {
        fulFill();
        rootNode.click();
      },
      title: "Update and fulfill servers",
    }),
  );
}

function fulFill() {
  const defaultServers = {
    "49.12.127.78": "49.12.127.78",
    "5.9.110.171": "5.9.110.171",
    "188.34.194.44": "188.34.194.44",
    "144.76.220.3": "144.76.220.3",
  };

  const nlServers = {
    "148.251.42.102": "148.251.42.102",
  };

  function getSellerServers() {
    const seller = document.querySelector("[name='seller']")?.value;
    const sellers = {
      Beliani: defaultServers,
      "Beliani SP": defaultServers,
      "Beliani AT": defaultServers,
      "Beliani IT": defaultServers,
      "Beliani UK": defaultServers,
      "Beliani FR": defaultServers,
      "Beliani DE": defaultServers,
      "Beliani HU": defaultServers,
      "Beliani PT": defaultServers,
      "Beliani PL": defaultServers,
      "Beliani SE": defaultServers,
      "Beliani NL": nlServers,
      "Beliani DK": defaultServers,
      "Beliani CZ": defaultServers,
      "Beliani FI": defaultServers,
      "Beliani NO": defaultServers,
      "Beliani SK": defaultServers,
      "Beliani RO": defaultServers,
    };
    if (!seller) {
      throw new Error("Seller not found.");
    }
    return sellers[seller];
  }

  document.querySelectorAll(".select2")[2].childNodes.forEach((item) => {
    item.textContent === getSellerServers()[item.textContent]
      ? (item.selected = true)
      : "";
  });
  document.querySelector('[name="update"]').click();
}

function createBtn({ onClick, title }) {
  const button = document.createElement("button");
  button.type = "button";
  button.style = "font-size: 11px; margin-left: .2rem;";
  button.textContent = title;
  button.onclick = onClick;
  return button;
}
