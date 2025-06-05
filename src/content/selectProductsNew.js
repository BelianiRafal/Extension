chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // sendData to service worker
  // sendResponse("data")

  (async () => {
    if (message.action === "download_products") {
      // Get all main_id nodes.
      const SA_IDS = getAllSAId();
      // Fetch products data for main_ids
      let products;
      try {
        products = await fetchProducts(SA_IDS);
      } catch (error) {
        alert("Something went wrong while fetching products. " + error.message);
        return;
      }
      try {
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
        sendResponse({ status: "success" });
      } catch (error) {
        alert(
          "Something went wrong. Try fetch product 1 by 1. " + error.message,
        );
      }
    }
  })();

  return true;
});

function getAllSAId() {
  const nodes = document.querySelectorAll("tr[id^='row-']");
  if (nodes) {
    return [...nodes].map((item) => ({
      main_id: item.getAttribute("id").split("-")[1],
    }));
  } else {
    throw new Error("SA Nodes not found.");
  }
}
