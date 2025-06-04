function isActive(products) {
  let isInactiveProducts = false;
  const inActiveProducts = [];
  for (const product of products) {
    if ("data" in product) {
      if (product.data.inactive === "1") {
        inActiveProducts.push(product);
        isInactiveProducts = true;
      }
    }
  }
  return {
    isInactiveProducts,
    inActiveProducts,
  };
}
