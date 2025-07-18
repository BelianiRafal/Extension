chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // sendData to service worker
  // sendResponse("data")

  (async () => {
    if (message.action === "download_products") {
      // setSubjectLine();
      try {
        // Get all main_id nodes.
        const SA_IDS = getAllSAId();
        // Fetch products data for main_ids
        const products = await fetchProducts(SA_IDS);
        downloadProducts(products);
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

function downloadProducts(products) {
  const stringifuProducts = JSON.stringify(products);
  const blob = new Blob([stringifuProducts], { type: "application/json" });
  const urlBlob = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.download = "products.json";
  a.href = urlBlob;
  a.click();
  a.remove();
}
