chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // sendData to service worker
  // sendResponse("data")
class ProductListFilter {
  constructor(products) {
    this.products = products; 
  }
  processShopSAAlias(item) {
    const processedAlias = {};
    if (item && item.ShopSAAlias) {
      for (const langKey in item.ShopSAAlias) {
        if (item.ShopSAAlias.hasOwnProperty(langKey)) {
          const aliasData = item.ShopSAAlias[langKey];
          processedAlias[langKey] = {
            language: aliasData.language,
            id: aliasData.id,
            value: aliasData.value,
          };
        }
      }
    }
    return processedAlias; 
  }
  processAllProducts() {
    return this.products.map((item) => {
      const savedParams = item.saved_params || {};
      const data = item.data || {};
      const processedProduct = {
        saved_params: {
          master_sa: savedParams.master_sa,
          username: savedParams.username,
          ShopPrice: savedParams.ShopPrice,
          ShopHPrice: savedParams.ShopHPrice,
        },
        data: {
          id: data.id,
          username: data.username,
          master_sa: data.master_sa,
        },
        id: item.id,
        article_name: item.article_name,
      };
      if (data.username === "Beliani") {
        processedProduct.ShopSAAlias = this.processShopSAAlias(item);
      }
      return processedProduct;
    });
  }
}

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

        const active_filter_products = new ProductListFilter(products).processAllProducts();
        const inActive_filter_products = new ProductListFilter(inActiveProducts).processAllProducts();

        if (isInactiveProducts) {
          if (confirm("Inactive products found. Would you like to continue?")) {
            downloadJSON({ data: products, name: "products.json" });
            downloadJSON({
              data: inActive_filter_products,
              name: "inactive_products.json",
            });
            return;
          } else {
            downloadJSON({
              data: inActive_filter_products,
              name: "inactive_products.json",
            });
            return;
          }
        }
        downloadJSON({ data: active_filter_products, name: "products.json" });
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
