async function fetchProducts(ids) {
  // getProductName - return product name
  // getShopAliases - returns aliases for every shop
  // getSlavesForMasterId - return slaves for master id
  // getPrice - return price for passed id

  const apiRoutes = {
    getProductName: (master_id) =>
      `https://www.prologistics.info/api/condensedSA/get/?id=${master_id}&block=article_name`,
    getSlavesForMasterId: (master_id) =>
      `https://www.prologistics.info/api/condensedList/getList?saved_id=${master_id}`,
    getPrice: (slave_id) =>
      `https://www.prologistics.info/api/condensedSA/getSlave/?id=${slave_id}&block=saved_params`,
    getShopAliases: (master_id) =>
      `https://www.prologistics.info/api/condensedSA/get/?id=${master_id}&block=ShopSAAlias`,
    getPriceAndIsActive: (slave_id) =>
      `https://www.prologistics.info/api/condensedSA/getSlave/?id=${slave_id}&block=buttons`,
  };

  async function parse_response(responses, cbs) {
    const responses_json = [];

    for (let index = 0; index < responses.length; index++) {
      const response = responses[index];
      if (response.status === "fulfilled") {
        if (response.value.ok) {
          const response_json = await response.value.json();
          responses_json.push(
            Array.isArray(cbs) ? cbs[index](response_json) : cbs(response_json),
          );
        } else {
          console.log(
            "Response value is not ok while parsing slaves response.",
          );
        }
      }

      if (response.status === "rejected") {
        console.log("Rejected 2");
      }
    }

    return responses_json;
  }

  async function parse_response_prices(slave_responses) {
    const json_data = [];
    for (const slave_response of slave_responses) {
      if (slave_response.status === "fulfilled") {
        if (slave_response.value.ok) {
          const response_json = await slave_response.value.json();
          json_data.push(response_json.sa);
        } else {
          json_data.push(slave_response.value);
        }
      }

      if (slave_response.status === "rejected") {
        json_data.push(slave_response.value);
      }
    }

    return json_data;
  }

  async function getProductData(product) {
    // 1.1 Get names for each id.
    // 1.2 Get slaves id's
    // 1.3 Get shop aliases
    const parsed_response_slaves = await parse_response(
      await Promise.allSettled([
        fetch(apiRoutes.getProductName(product.main_id)),
        fetch(apiRoutes.getSlavesForMasterId(product.main_id)),
      ]),
      [
        // 2.1 Array of callbacks.
        // 2.2 Call callback and for each of:
        // 1.1 Get names for each id. -> (response) => response.sa.article_name

        // 1.2 Get slaves id's -> response.saCollection.list.filter((item) => {
        //   if (item.master_sa === product.main_id || item.master_sa === "0") {
        //     return true;
        //   }
        //   return false;
        // })
        (response) => response.sa.article_name,
        (response) => response.saCollection.list,
      ],
    );
    const [name, slaves_ids] = parsed_response_slaves;

    // ENTER models slave.js
    const slaves_prices = await parse_response_prices(
      await Promise.allSettled(
        slaves_ids.map((slave) =>
          fetch(apiRoutes.getPriceAndIsActive(slave.id)),
        ),
      ),
    );
    // EXIT models getPriceAndIsActive.js

    return slaves_prices.map((item) => {
      return {
        ...item,
        article_name: name,
      };
    });
  }

  // Iterate over each main_id and create Promise.
  const ids_response = await Promise.allSettled(
    ids.map((product) => getProductData(product)),
  );

  return ids_response.map((item) => item.value).flat();
}
