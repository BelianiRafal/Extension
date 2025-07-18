const node = document.querySelector(".htmlCodeValidation");
if (node) {
  const url = new URLSearchParams(window.location.search);
  const id = url.get("id");

  function createBackButton(id) {
    const a = document.createElement("a");
    a.style = "font-size: 11px; position: fixed; top: 2rem; left: 18rem;";
    a.textContent = "Back to newsletter";
    a.href = "/news_email.php?id=" + id;
    document.body.appendChild(a);
  }

  createBackButton(id);
} else {
  const url = new URL(window.location.href);
  window.location.href =
    url.origin +
    url.pathname +
    "?id=" +
    new URL(window.location.href).searchParams.get("id");
}
