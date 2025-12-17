const SELECTOR = "input[name=subject]";

const DEFAULT_FALLBACK = {
  Newsletter_bg_color: "#FBF5F5",

  Top_image_src: "https://pictureserver.net/static/2025/chde240150_01.jpg",
  picture_server_url: "https://pictureserver.net/static/2025/",
  img_version: "?ver=8",

  campaigns: [
    {
      src: 20250929,
      href: "/lp25-09-29",
      timer_url: "https://gen.sendtric.com/countdown/sk95yji1lu",
      timer_bg: "#750000",
      timer_color: "#FFFFFF",
      hasTimer: true,
      freebie: "20250929",
    },
    {
      src: 20251001,
      href: "/lp25-10-01",
      timer_url: "https://gen.sendtric.com/countdown/s5yslcx850",
      timer_bg: "#FF6B6B",
      timer_color: "#FFFFFF",
      hasTimer: true,
      freebie: "",
    },
    {
      src: 20251003,
      href: "/lp25-10-03",
      timer_url: "",
      timer_bg: "",
      timer_color: "",
      hasTimer: false,
      freebie: "",
    },
  ],

  Conditions_title: "Bedingungen:",
  Conditions_description:
    "Alle Artikel unterliegen der Verfügbarkeit. Alle Preise können ohne Vorankündigung geändert werden.",
  Conditions_unsubscribe:
    'Um unseren Newsletter abzubestellen, klicke einfach auf <a href="[[newsunassignurl]]"style="text-decoration:none;color:#000000;">Abbestellen</a>.',
};

let TEMPLATES = {
  clean: {
    html: null,
    title: "Clear content",
    description: "Just cleaner - 0 text, 0 placeholders",
  },

  "universal-sunday": {
    html: null,
    title: "Universal Sunday",
    description:
      "Up to 6 banners with optional timers and freebies",
  },

};

async function importTemplates() {
  await Promise.all(
    Object.keys(TEMPLATES).map(async (template) => {
      try {
        const response = await fetch(
          chrome.runtime.getURL(
            `content/templates/newsletters/${template}.html`
          )
        );
        const html = await response.text();

        TEMPLATES[template]["html"] = html;
      } catch (error) {
        console.log("Error loading template:", template, error);
      }
    })
  );

  console.log("Templates imported:", Object.keys(TEMPLATES).toString());
}

console.log("Importing templates...");
importTemplates();
