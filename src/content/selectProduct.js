getAllSAIdNodes();

function getAllSAIdNodes() {
  const nodes = document.querySelectorAll("tr[id^='row-']");
  if (nodes) {
    return [...nodes].forEach((item) => {
      const id = item.getAttribute("id").split("-")[1];
      const column = createColumn(
        createButton({
          title: "Download " + id,
          id,
        }),
      );
      item.appendChild(column);
    });
  } else {
    throw new Notification("SA Nodes not found.");
  }
}

function createColumn(children) {
  const td = document.createElement("td");
  td.appendChild(children);
  return td;
}

function createButton({ title, id }) {
  const btn = document.createElement("button");
  btn.textContent = title;
  btn.addEventListener("click", async () => {
    btn.disabled = true;
    btn.textContent = "Loading...";
    const products = await fetchProducts([{ main_id: id }]);
    const { inActiveProducts, isInactiveProducts } = isActive(products);
    if (isInactiveProducts) {
      if (confirm("Inactive products found. Would you like to continue?")) {
        downloadJSON({ data: products, name: "products.json" });
        downloadJSON({
          data: inActiveProducts,
          name: "inactive_products.json",
        });
        return;
      } else {
        downloadJSON({
          data: inActiveProducts,
          name: "inactive_products.json",
        });
        return;
      }
    }
    downloadJSON({ data: products, name: "products.json" });
    btn.textContent = title;
    btn.disabled = false;
  });
  return btn;
}
