function createCalendarButton() {
  let loop = document.querySelectorAll("div");

  let issueHeading;

  loop.forEach((el) => {
    // console.log(`Element: `, el);
    if (el.className.includes("issue-subject-module__titleContainer__")) {
      issueHeading = el;
    }
  });

  const button = document.createElement("button");
  button.style.marginLeft = "12px";
  button.style.fontSize = "12px";
  button.style.border = "1px solid gray;";
  button.style.backgroundColor = "#f1f1f1";
  button.style.borderRadius = "8px";
  button.style.padding = "4px 8px";

  const img = document.createElement("img");

  img.src = chrome.runtime.getURL("content/issue/googleCalendar.svg");
  img.alt = "Google Calendar";
  img.style.width = "16px";
  img.style.height = "16px";
  img.style.verticalAlign = "middle";
  img.style.marginRight = "4px";
  button.appendChild(img);

  button.onclick = function () {
    const id = window.location.href.split("/").pop();
    const subject = document
      .querySelector("h1[data-variant='h1 bold'][class='typography-module__heading__Rs-hd']")
      .innerHTML.split("<br>")[0]
      .trim();

    const date = subject.trim().match(/\d{4}.\d{2}.\d{2}/);
    const subject_with_id = `${subject} (${id})`;

    if (!date) {
      return window.open(
        `https://calendar.google.com/calendar/r/eventedit?text=${subject_with_id}&details=${window.location.href}`
      );
    }

    const [year, month, day] = date[0].split(/[-./]/);
    const formattedDate = `${year}${month}${day}`;

    //prettier-ignore
    window.open(`https://calendar.google.com/calendar/r/eventedit?text=${subject_with_id}&details=${window.location.href}&dates=${formattedDate}/${formattedDate}`);
  };

  const text = document.createTextNode(" Add to Calendar");
  button.appendChild(text);
  issueHeading?.appendChild(button);
}

function wait(ms = 100) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function init() {
  await wait(2000);
  createCalendarButton();
}

init();
