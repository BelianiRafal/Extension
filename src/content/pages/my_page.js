const PAGE_STYLE = `
<style>
  * {
    box-sizing: border-box;
    font-family: "Open Sans", "sans-serif";
  }

  html,
  body {
    height: 100%;
    margin: 0;
  }

  h3 {
    margin-block: 1rem;
  }

  .container {
    height: 100%;
    width: 100%;
    max-width: 1440px;
    margin: 0 auto;
    padding-inline: 1rem;
    display: flex;
    flex-direction: column;
  }

  .title {
    font-size: 2rem;
  }

  #newsletter {
    height: 100%;
    width: 100%;
    overflow-y: auto;
    border: none;
  }
</style>
`;

const LOADING = `
<div class="container">
  <h3 class="title">Loading...</h3>
  <iframe id="newsletter" >
</div>
`;
document.head.innerHTML = PAGE_STYLE;
document.body.innerHTML = LOADING;
setTimeout(() => {
  try {
    const query = new URLSearchParams(location.search);
    const id = query.get("id");
    // const tableId = query.get("tableId");
    // if (!tableId) {
    //   new Notification("Table Id Required");
    //   document.querySelector(".title").textContent = "Table Id Required";
    //   return;
    // }
    const content = query.get("content");
    if (!content) {
      new Notification("content Required");
      document.querySelector(".title").textContent = "content Required";
      return;
    }

    const JSON_Content = JSON.parse(content);
    for (const key of Object.keys(JSON_Content)) {
      const value = JSON_Content[key];
      JSON_Content[key] = typeof value === "string" ? value.replaceAll("\n", "<br/>") : value
    }

    if (id) {
      chrome.runtime.sendMessage(
        {
          type: "newsletter_preview",
          id: id,
        },
        async function ({ html }) {
          document.body.innerHTML = Mustache.render(html, JSON_Content);
          document.querySelector("#campaign_id").href =
            "https://www.prologistics.info/news_email.php?id=" + id;
          document.title = "Newsletter preview";
        }
      );
    }
  } catch (error) {
    console.log(error);
    document.querySelector(".title").textContent = "Error happen.";
    new Notification("Error happen.");
  }
}, 1000);
