const createButton = (title, callback) => {
  const button = document.createElement("button");
  button.name = title;
  button.value = title;
  button.className = "largerButton";
  button.innerText = title;
  button.addEventListener("click", callback);

  return button;
};

const findNewsletterFamilyTableTbody = () => {
  const h3List = document.querySelectorAll("h3");
  let headingBeforeNsltFamilyTable;

  h3List.forEach((h3) => {
    h3Text = h3.innerText;
    if (!h3Text.startsWith("Newsletter family")) return;

    return (headingBeforeNsltFamilyTable = h3);
  });

  return headingBeforeNsltFamilyTable.nextElementSibling.querySelector("tbody");
};
