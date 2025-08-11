// function getUserEmail() {

//   const scriptData = [...document.body.querySelectorAll("script")].find(
//     (item) => item.textContent.includes("pushHost")
//   );

//   try {
//     const user_data = JSON.parse(
//       scriptData.textContent.split(";")[3].split("=")[1]
//     );

// 		console.log("user_data parsed", user_data, user_data.email);
//     return user_data.email;
//   } catch (error) {
//     console.error(error.message);
//     return document.cookie.split(";")[2].split("=")[1];
//   }
// }


function getUserData() {
  const script = [...document.querySelectorAll('script')].find(
    s => s.textContent.includes('var LOGGED_USER')
  );
  if (!script) return null;

  // extract everything between the first {}
  const match = script.textContent.match(/var\s+LOGGED_USER\s*=\s*({[\s\S]*?});/);
	let user_data = JSON.parse(match[1]);

  return user_data;
}

function getUserEmail() {
	return getUserData().email;
}

const sendTestButton = document.querySelector("[name='sendtest']");
const testCustomerInput = document.querySelector("#test_customer");

if (
  window.location.href.includes(
    "https://www.prologistics.info/news_email.php?id="
  )
) {
  fetchAvailableIds();
}

function fetchAvailableIds() {

	console.log(getUserEmail())

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
      referrer: "https://www.prologistics.info/news_email.php?id=35743",
      referrerPolicy: "strict-origin-when-cross-origin",
      body: null,
      method: "GET",
      mode: "cors",
      credentials: "include",
    }
  )
    .then((data) => data.text())
    .then((response) => {
      const data = new DOMParser().parseFromString(response, "text/xml");
      const item = data.querySelector("rs");
      const user_data = {
        id: item.getAttribute("id"),
        title: item.textContent,
      };
      if (!testCustomerInput) return;
      const emails = user_data.title.split(" ");
      const email = emails[emails.length - 1];

      const sendToUsersObject = {
        "TL+Managers": {
          JChmielewska:
            "Shop#2478629: Justyna Chmielewska chmielewska@beliani.fr",
          RKobus: "Shop#4280939: Rafał Kobus rafal.kobus@beliani.net",
					NHrehorowicz: "Shop#2927041: Natalia Hrehorowicz natalia.hrehorowicz@beliani.it"
        },

        HTML: {
          KOrliński: "Shop#2684834: Kamil Orliński orlinski@beliani.fr",

          MJurgowiak: "Shop#3046437:   michal.jurgowiak@beliani.com",

          OHrytsaienko:
            "Shop#6239531: Oleksander Hrytsaienko oleksander.hrytsaienko@beliani.net",

          KKazaniecki:
            "Shop#6239524: Kamil Kazaniecki kamil.kazaniecki@beliani.net",
        },

        "Marketing+Graphics": {
          DRojek: "Shop#3183799: Dominika Rojek dominika.rojek@beliani.com",
        },
      };

      const flexContainer = document.createElement("div");
      flexContainer.style = `
        display: flex;
        align-items: center;
        background: rgb(210, 210, 210);
        gap: 0.5rem;
        padding: 1rem;
        box-shadow: 2px 2px black;
        border-radius: .5rem;
        margin-top: 0.5rem;
        justify-content: center;
      `;

      const selectLabel = document.createElement("label");
      selectLabel.textContent = "Send to: ";

      const selectUserToSendEmail = document.createElement("select");

      flexContainer.appendChild(selectLabel);
      flexContainer.appendChild(selectUserToSendEmail);

      Object.entries(sendToUsersObject).forEach(([groupName, usersObj]) => {
        const optgroup = document.createElement("optgroup");
        optgroup.label = groupName;
        Object.entries(usersObj).forEach(([userKey, userValue]) => {
          const option = document.createElement("option");
          option.value = userValue;

          const optionEmail = userValue.trim().split(" ").pop();
          option.textContent = optionEmail;
          optgroup.appendChild(option);
        });
        selectUserToSendEmail.appendChild(optgroup);
      });

      selectUserToSendEmail.addEventListener("change", function (e) {
        const selected = e.target.value;
        let customerId = "-" + selected.split(":")[0].replace("Shop#", "");
        const emailMatch = selected.trim().split(" ").pop();
        if (emailMatch && emailMatch.includes("@")) {
          if (
            !confirm(`Are you sure you want to send test to ${emailMatch}?`)
          ) {
            return;
          }
        }
        setTestCustomerAndSend(selected, customerId);
      });

      testCustomerInput.insertAdjacentElement("afterend", flexContainer);

			// console.log(getUserEmail(), item, user_data);

      flexContainer.insertAdjacentElement(
        "beforeend",
        createSendEmailBtn({
          onClick: () => {
            const mailTo = `Shop#${user_data.id.replace("-", "")}:${email}`;
            setTestCustomerAndSend(mailTo, user_data.id);
          },
					// title: "nie klikaj"
          title: `${email}`,
        })
      );

      function setTestCustomerAndSend(mailTo, customerId) {
        testCustomerInput.value = mailTo;
        document.querySelector("#test_customer_id").value = customerId;
        sendTestButton.click();
      }
    });
}

function createSendEmailBtn({ onClick, title }) {
  const button = document.createElement("button");
  button.type = "button";
  button.textContent = title;
  button.onclick = onClick;
  return button;
}
