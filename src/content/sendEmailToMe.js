function getUserEmail() {
  const scriptData = [...document.body.querySelectorAll("script")].find(
    (item) => item.textContent.includes("pushHost"),
  );
  try {
    const user_data = JSON.parse(
      scriptData.textContent.split(";")[3].split("=")[1],
    );
    return user_data.email;
  } catch (error) {
    console.error(error.message);
    return document.cookie.split(";")[2].split("=")[1];
  }
}

const click = document.querySelector("[name='sendtest']");
const rootNode = document.querySelector("#test_customer");

if (
  window.location.href.includes(
    "https://www.prologistics.info/news_email.php?id=",
  )
) {
  fetchAvailableIds();
}

function fetchAvailableIds() {
  fetch(
    `https://www.prologistics.info/getCustomer.php?input=${getUserEmail()}`,
    {
      headers: {
        accept: "*/*",
        "accept-language": "en-US,en;q=0.9,ru;q=0.8",
        "sec-ch-ua":
          '"Google Chrome";v="123", "Not:A-Brand";v="8", "Chromium";v="123"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
      },
      referrer: "https://www.prologistics.info/news_email.php?id=22892",
      referrerPolicy: "strict-origin-when-cross-origin",
      body: null,
      method: "GET",
      mode: "cors",
      credentials: "include",
    },
  )
    .then((data) => data.text())
    .then((response) => {
      const data = new DOMParser().parseFromString(response, "text/xml");
      const item = data.querySelector("rs");
      const user_data = {
        id: item.getAttribute("id"),
        title: item.textContent,
      };
      if (!rootNode) return;
      const emails = user_data.title.split(" ");
      const email = emails[emails.length - 1];
      rootNode.insertAdjacentElement(
        "afterend",
        createSendEmailBtn({
          onClick: () => {
            const mailTo = `Shop#${user_data.id.replace("-", "")}:${email}`;
            document.querySelector("#test_customer").value = mailTo;
            document.querySelector("#test_customer_id").value = user_data.id;
            click.click();
          },
          title: "Send to: " + email,
        }),
      );
			// @TODO: add check if user !== "rafal" ? rafal mail : justyna mail
      rootNode.insertAdjacentElement(
        "afterend",
        createSendEmailBtn({
          onClick: () => {
            const mailTo = `Shop#4280939: Rafał Kobus rafal.kobus@beliani.net`;
            document.querySelector("#test_customer").value = mailTo;
            document.querySelector("#test_customer_id").value = "-4280939";
            click.click();
          },
          title: "Send to: rafal.kobus@beliani.net",
        }),
      );
    });
}

function createSendEmailBtn({ onClick, title }) {
  const button = document.createElement("button");
  button.type = "button";
  button.style = "font-size: 11px; margin-left: 1rem;";
  button.textContent = title;
  button.onclick = onClick;
  return button;
}
