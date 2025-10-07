const SELECTORS = "textarea[name^=html]";
const SELECTOR = SELECTORS;

const TEMPLATES = [
  {
    title: "Sunday LP with:",
    description: "Timer \n3 categories \nWithout CTA's",
    is_active: true,
    fallback: {
      Newsletter_bg_color: "#fbf5f5",
      Timer_bg_color: "#750000",
      Timer_color: "#fff",

      Top_image_src: "https://pictureserver.net/static/2025/uk240150_01.jpg",

      Timer_href: "/lp24-10-25",
      Timer_src: "https://gen.sendtric.com/countdown/akikmw4bkt",

      Campaign_src_1: 20241025,
      Campaign_src_2: 20241023,
      Campaign_src_3: 20241024,
      Banner_href_1: "/lp24-10-25",
      Banner_href_2: "/lp24-10-23",
      Banner_href_3: "/lp24-10-24",

      Conditions_title: "Conditions title",
      Conditions_description: "Condition description",
      Conditions_unsubscribe: "Conditions unsubscribe",
    },
    html: `
      CREATE YOUR TEMPLATE IN /src/content/templates/landing.js
    `,
  },
  {
    title: "Sunday LP with:",
    description: "Timer \n4 categories \nWithout CTA's",
    is_active: true,
    fallback: {
      Newsletter_bg_color: "#fbf5f5",
      Timer_bg_color: "#750000",
      Timer_color: "#fff",

      Top_image_src: "https://pictureserver.net/static/2025/uk240150_01.jpg",

      Timer_href: "/lp24-10-25",
      Timer_src: "https://gen.sendtric.com/countdown/akikmw4bkt",

      Campaign_src_1: 20241025,
      Campaign_src_2: 20241023,
      Campaign_src_3: 20241024,
      Campaign_src_4: 20241023,
      Banner_href_1: "/lp24-10-25",
      Banner_href_2: "/lp24-10-23",
      Banner_href_3: "/lp24-10-24",
      Banner_href_4: "/lp24-10-23",

      Conditions_title: "Conditions title",
      Conditions_description: "Condition description",
      Conditions_unsubscribe: "Conditions unsubscribe",
    },
    html: `
    CREATE YOUR TEMPLATE IN /src/content/templates/landing.js
    `,
  },
  {
    title: "Monday LP with:",
    description:
      "Top image title\mOffer part\nFreebies: x4\nIntro\nCategories: x4 \nSoon ending\nFooter",
    is_active: true,
    fallback: {
      Campaign_name: "20241209",
      Campaign_Background: "#FFCCB7",
      Campaign_alias: "lp24-12-09",

      Offer_part_Background: "#FFCCB7",
      Offer_part_Color: "#000000",

      Offer_part_1: "Choose a FREE wall decor from 4 options.",
      Offer_part_2:
        "To claim your FREE wall decor, use the code at the checkout when you spend a minimum of XX.",
      Code_href: "https://www.beliani.co.uk/",
      Code_text: "Get code",
      Offer_part_3: "The offer is valid until the 15th of December.",
      Offer_part_4: "Choose from:",

      Freebie_Background: "#FFCCB7",
      Freebie_Color: "#00000",

      JSON_Freebie_product_1: {
        name: "DEMRE",
        main_id: "63927",
        href: "https://www.beliani.co.uk/shaggy-area-rug-80-x-150-cm-light-grey-demre.html",
        lowPrice: "$49.99",
        highPrice: "$89.99",
      },
      Freebie_product_src_1: "https://placehold.co/205x185",

      JSON_Freebie_product_2: {
        name: "DEMRE",
        main_id: "63927",
        href: "https://www.beliani.co.uk/shaggy-area-rug-80-x-150-cm-light-grey-demre.html",
        lowPrice: "$49.99",
        highPrice: "$89.99",
      },
      Freebie_product_src_2: "https://placehold.co/205x185",

      JSON_Freebie_product_3: {
        name: "DEMRE",
        main_id: "63927",
        href: "https://www.beliani.co.uk/shaggy-area-rug-80-x-150-cm-light-grey-demre.html",
        lowPrice: "$49.99",
        highPrice: "$89.99",
      },
      Freebie_product_src_3: "https://placehold.co/205x185",

      JSON_Freebie_product_4: {
        name: "DEMRE",
        main_id: "63927",
        href: "https://www.beliani.co.uk/shaggy-area-rug-80-x-150-cm-light-grey-demre.html",
        lowPrice: "$49.99",
        highPrice: "$89.99",
      },
      Freebie_product_src_4: "https://placehold.co/205x185",

      Intro_Background: "#750000",
      Intro_Color: "#ffffff",

      Intro_title: "Find your perfect bed",
      Intro_description:
        "Discover the perfect bed for your needs, we have a wide range to help you create your dream bedroom.",

      Category_Color_1: "#ffffff",
      Category_Background_1: "#750000",
      Category_href_1: "/storage",
      Category_CTA_1: "Shop now",
      Category_title_1: "Storage beds",

      JSON_Product_11: {
        name: "DEMRE",
        main_id: "63927",
        href: "https://www.beliani.co.uk/shaggy-area-rug-80-x-150-cm-light-grey-demre.html",
        lowPrice: "$49.99",
        highPrice: "$89.99",
      },
      Product_src_11: "https://placehold.co/295x295",

      JSON_Product_12: {
        name: "DEMRE",
        main_id: "63927",
        href: "https://www.beliani.co.uk/shaggy-area-rug-80-x-150-cm-light-grey-demre.html",
        lowPrice: "$49.99",
        highPrice: "$89.99",
      },
      Product_src_12: "https://placehold.co/295x295",

      JSON_Product_13: {
        name: "DEMRE",
        main_id: "63927",
        href: "https://www.beliani.co.uk/shaggy-area-rug-80-x-150-cm-light-grey-demre.html",
        lowPrice: "$49.99",
        highPrice: "$89.99",
      },
      Product_src_13: "https://placehold.co/295x295",

      JSON_Product_14: {
        name: "DEMRE",
        main_id: "63927",
        href: "https://www.beliani.co.uk/shaggy-area-rug-80-x-150-cm-light-grey-demre.html",
        lowPrice: "$49.99",
        highPrice: "$89.99",
      },
      Product_src_14: "https://placehold.co/295x295",

      Category_Color_2: "#000000",
      Category_Background_2: "#FFCCB7",
      Category_href_2: "/beds",
      Category_CTA_2: "Shop now",
      Category_title_2: "Fabric beds",

      JSON_Product_21: {
        name: "DEMRE",
        main_id: "63927",
        href: "https://www.beliani.co.uk/shaggy-area-rug-80-x-150-cm-light-grey-demre.html",
        lowPrice: "$49.99",
        highPrice: "$89.99",
      },
      Product_src_21: "https://placehold.co/295x295",

      JSON_Product_22: {
        name: "DEMRE",
        main_id: "63927",
        href: "https://www.beliani.co.uk/shaggy-area-rug-80-x-150-cm-light-grey-demre.html",
        lowPrice: "$49.99",
        highPrice: "$89.99",
      },
      Product_src_22: "https://placehold.co/295x295",

      JSON_Product_23: {
        name: "DEMRE",
        main_id: "63927",
        href: "https://www.beliani.co.uk/shaggy-area-rug-80-x-150-cm-light-grey-demre.html",
        lowPrice: "$49.99",
        highPrice: "$89.99",
      },
      Product_src_23: "https://placehold.co/295x295",

      JSON_Product_24: {
        name: "DEMRE",
        main_id: "63927",
        href: "https://www.beliani.co.uk/shaggy-area-rug-80-x-150-cm-light-grey-demre.html",
        lowPrice: "$49.99",
        highPrice: "$89.99",
      },
      Product_src_24: "https://placehold.co/295x295",

      Category_Color_3: "#ffffff",
      Category_Background_3: "#750000",
      Category_href_3: "/beds",
      Category_CTA_3: "Shop now",
      Category_title_3: "Metal beds",

      JSON_Product_31: {
        name: "DEMRE",
        main_id: "63927",
        href: "https://www.beliani.co.uk/shaggy-area-rug-80-x-150-cm-light-grey-demre.html",
        lowPrice: "$49.99",
        highPrice: "$89.99",
      },
      Product_src_31: "https://placehold.co/295x295",

      JSON_Product_32: {
        name: "DEMRE",
        main_id: "63927",
        href: "https://www.beliani.co.uk/shaggy-area-rug-80-x-150-cm-light-grey-demre.html",
        lowPrice: "$49.99",
        highPrice: "$89.99",
      },
      Product_src_32: "https://placehold.co/295x295",

      JSON_Product_33: {
        name: "DEMRE",
        main_id: "63927",
        href: "https://www.beliani.co.uk/shaggy-area-rug-80-x-150-cm-light-grey-demre.html",
        lowPrice: "$49.99",
        highPrice: "$89.99",
      },
      Product_src_33: "https://placehold.co/295x295",

      JSON_Product_34: {
        name: "DEMRE",
        main_id: "63927",
        href: "https://www.beliani.co.uk/shaggy-area-rug-80-x-150-cm-light-grey-demre.html",
        lowPrice: "$49.99",
        highPrice: "$89.99",
      },
      Product_src_34: "https://placehold.co/295x295",

      Category_Color_4: "#000000",
      Category_Background_4: "#FFCCB7",
      Category_href_4: "/beds",
      Category_CTA_4: "Shop now",
      Category_title_4: "Leather beds",

      JSON_Product_41: {
        name: "DEMRE",
        main_id: "63927",
        href: "https://www.beliani.co.uk/shaggy-area-rug-80-x-150-cm-light-grey-demre.html",
        lowPrice: "$49.99",
        highPrice: "$89.99",
      },
      Product_src_41: "https://placehold.co/295x295",

      JSON_Product_42: {
        name: "DEMRE",
        main_id: "63927",
        href: "https://www.beliani.co.uk/shaggy-area-rug-80-x-150-cm-light-grey-demre.html",
        lowPrice: "$49.99",
        highPrice: "$89.99",
      },
      Product_src_42: "https://placehold.co/295x295",

      JSON_Product_43: {
        name: "DEMRE",
        main_id: "63927",
        href: "https://www.beliani.co.uk/shaggy-area-rug-80-x-150-cm-light-grey-demre.html",
        lowPrice: "$49.99",
        highPrice: "$89.99",
      },
      Product_src_43: "https://placehold.co/295x295",

      JSON_Product_44: {
        name: "DEMRE",
        main_id: "63927",
        href: "https://www.beliani.co.uk/shaggy-area-rug-80-x-150-cm-light-grey-demre.html",
        lowPrice: "$49.99",
        highPrice: "$89.99",
      },
      Product_src_44: "https://placehold.co/295x295",

      Soonending_title: "Shop limited-time deals",

      Soonending_banner_href_1: "https://www.beliani.co.uk/content/lp24-11-20/",
      Soonending_banner_src_1:
        "https://upload.pictureserver.net/static/2024/uk20241120b.png",

      Soonending_banner_href_2: "https://www.beliani.co.uk/content/lp24-11-18/",
      Soonending_banner_src_2:
        "https://upload.pictureserver.net/static/2024/uk20241118b.png",

      Conditions_title: "Conditions title",
      Conditions_description: "Conditions description",
    },
    html: `
    CREATE YOUR TEMPLATE IN /src/content/templates/landing.js
    `,
  },
  {
    title: "Monday LP with:",
    description:
      "Top image title\mOffer part\nFreebies: x6\nIntro\nCategories: x4 \nSoon ending\nFooter",
    is_active: true,
    fallback: {
      Campaign_name: "20241209",
      Campaign_Background: "#FFCCB7",
      Campaign_alias: "lp24-12-09",

      Offer_part_Background: "#FFCCB7",
      Offer_part_Color: "#000000",

      Offer_part_1: "Choose a FREE wall decor from 4 options.",
      Offer_part_2:
        "To claim your FREE wall decor, use the code at the checkout when you spend a minimum of XX.",
      Code_href: "https://www.beliani.co.uk/",
      Code_text: "Get code",
      Offer_part_3: "The offer is valid until the 15th of December.",
      Offer_part_4: "Choose from:",

      Freebie_Background: "#FFCCB7",
      Freebie_Color: "#00000",

      JSON_Freebie_product_1: {
        name: "DEMRE",
        main_id: "63927",
        href: "https://www.beliani.co.uk/shaggy-area-rug-80-x-150-cm-light-grey-demre.html",
        lowPrice: "$49.99",
        highPrice: "$89.99",
      },
      Freebie_product_src_1: "https://placehold.co/205x185",

      JSON_Freebie_product_2: {
        name: "DEMRE",
        main_id: "63927",
        href: "https://www.beliani.co.uk/shaggy-area-rug-80-x-150-cm-light-grey-demre.html",
        lowPrice: "$49.99",
        highPrice: "$89.99",
      },
      Freebie_product_src_2: "https://placehold.co/205x185",

      JSON_Freebie_product_3: {
        name: "DEMRE",
        main_id: "63927",
        href: "https://www.beliani.co.uk/shaggy-area-rug-80-x-150-cm-light-grey-demre.html",
        lowPrice: "$49.99",
        highPrice: "$89.99",
      },
      Freebie_product_src_3: "https://placehold.co/205x185",

      JSON_Freebie_product_4: {
        name: "DEMRE",
        main_id: "63927",
        href: "https://www.beliani.co.uk/shaggy-area-rug-80-x-150-cm-light-grey-demre.html",
        lowPrice: "$49.99",
        highPrice: "$89.99",
      },
      Freebie_product_src_4: "https://placehold.co/205x185",

      JSON_Freebie_product_5: {
        name: "DEMRE",
        main_id: "63927",
        href: "https://www.beliani.co.uk/shaggy-area-rug-80-x-150-cm-light-grey-demre.html",
        lowPrice: "$49.99",
        highPrice: "$89.99",
      },
      Freebie_product_src_5: "https://placehold.co/205x185",

      JSON_Freebie_product_6: {
        name: "DEMRE",
        main_id: "63927",
        href: "https://www.beliani.co.uk/shaggy-area-rug-80-x-150-cm-light-grey-demre.html",
        lowPrice: "$49.99",
        highPrice: "$89.99",
      },
      Freebie_product_src_6: "https://placehold.co/205x185",

      Intro_Background: "#750000",
      Intro_Color: "#ffffff",

      Intro_title: "Find your perfect bed",
      Intro_description:
        "Discover the perfect bed for your needs, we have a wide range to help you create your dream bedroom.",

      Category_Color_1: "#ffffff",
      Category_Background_1: "#750000",
      Category_href_1: "/storage",
      Category_CTA_1: "Shop now",
      Category_title_1: "Storage beds",

      JSON_Product_11: {
        name: "DEMRE",
        main_id: "63927",
        href: "https://www.beliani.co.uk/shaggy-area-rug-80-x-150-cm-light-grey-demre.html",
        lowPrice: "$49.99",
        highPrice: "$89.99",
      },
      Product_src_11: "https://placehold.co/295x295",

      JSON_Product_12: {
        name: "DEMRE",
        main_id: "63927",
        href: "https://www.beliani.co.uk/shaggy-area-rug-80-x-150-cm-light-grey-demre.html",
        lowPrice: "$49.99",
        highPrice: "$89.99",
      },
      Product_src_12: "https://placehold.co/295x295",

      JSON_Product_13: {
        name: "DEMRE",
        main_id: "63927",
        href: "https://www.beliani.co.uk/shaggy-area-rug-80-x-150-cm-light-grey-demre.html",
        lowPrice: "$49.99",
        highPrice: "$89.99",
      },
      Product_src_13: "https://placehold.co/295x295",

      JSON_Product_14: {
        name: "DEMRE",
        main_id: "63927",
        href: "https://www.beliani.co.uk/shaggy-area-rug-80-x-150-cm-light-grey-demre.html",
        lowPrice: "$49.99",
        highPrice: "$89.99",
      },
      Product_src_14: "https://placehold.co/295x295",

      Category_Color_2: "#000000",
      Category_Background_2: "#FFCCB7",
      Category_href_2: "/beds",
      Category_CTA_2: "Shop now",
      Category_title_2: "Fabric beds",

      JSON_Product_21: {
        name: "DEMRE",
        main_id: "63927",
        href: "https://www.beliani.co.uk/shaggy-area-rug-80-x-150-cm-light-grey-demre.html",
        lowPrice: "$49.99",
        highPrice: "$89.99",
      },
      Product_src_21: "https://placehold.co/295x295",

      JSON_Product_22: {
        name: "DEMRE",
        main_id: "63927",
        href: "https://www.beliani.co.uk/shaggy-area-rug-80-x-150-cm-light-grey-demre.html",
        lowPrice: "$49.99",
        highPrice: "$89.99",
      },
      Product_src_22: "https://placehold.co/295x295",

      JSON_Product_23: {
        name: "DEMRE",
        main_id: "63927",
        href: "https://www.beliani.co.uk/shaggy-area-rug-80-x-150-cm-light-grey-demre.html",
        lowPrice: "$49.99",
        highPrice: "$89.99",
      },
      Product_src_23: "https://placehold.co/295x295",

      JSON_Product_24: {
        name: "DEMRE",
        main_id: "63927",
        href: "https://www.beliani.co.uk/shaggy-area-rug-80-x-150-cm-light-grey-demre.html",
        lowPrice: "$49.99",
        highPrice: "$89.99",
      },
      Product_src_24: "https://placehold.co/295x295",

      Category_Color_3: "#ffffff",
      Category_Background_3: "#750000",
      Category_href_3: "/beds",
      Category_CTA_3: "Shop now",
      Category_title_3: "Metal beds",

      JSON_Product_31: {
        name: "DEMRE",
        main_id: "63927",
        href: "https://www.beliani.co.uk/shaggy-area-rug-80-x-150-cm-light-grey-demre.html",
        lowPrice: "$49.99",
        highPrice: "$89.99",
      },
      Product_src_31: "https://placehold.co/295x295",

      JSON_Product_32: {
        name: "DEMRE",
        main_id: "63927",
        href: "https://www.beliani.co.uk/shaggy-area-rug-80-x-150-cm-light-grey-demre.html",
        lowPrice: "$49.99",
        highPrice: "$89.99",
      },
      Product_src_32: "https://placehold.co/295x295",

      JSON_Product_33: {
        name: "DEMRE",
        main_id: "63927",
        href: "https://www.beliani.co.uk/shaggy-area-rug-80-x-150-cm-light-grey-demre.html",
        lowPrice: "$49.99",
        highPrice: "$89.99",
      },
      Product_src_33: "https://placehold.co/295x295",

      JSON_Product_34: {
        name: "DEMRE",
        main_id: "63927",
        href: "https://www.beliani.co.uk/shaggy-area-rug-80-x-150-cm-light-grey-demre.html",
        lowPrice: "$49.99",
        highPrice: "$89.99",
      },
      Product_src_34: "https://placehold.co/295x295",

      Category_Color_4: "#000000",
      Category_Background_4: "#FFCCB7",
      Category_href_4: "/beds",
      Category_CTA_4: "Shop now",
      Category_title_4: "Leather beds",

      JSON_Product_41: {
        name: "DEMRE",
        main_id: "63927",
        href: "https://www.beliani.co.uk/shaggy-area-rug-80-x-150-cm-light-grey-demre.html",
        lowPrice: "$49.99",
        highPrice: "$89.99",
      },
      Product_src_41: "https://placehold.co/295x295",

      JSON_Product_42: {
        name: "DEMRE",
        main_id: "63927",
        href: "https://www.beliani.co.uk/shaggy-area-rug-80-x-150-cm-light-grey-demre.html",
        lowPrice: "$49.99",
        highPrice: "$89.99",
      },
      Product_src_42: "https://placehold.co/295x295",

      JSON_Product_43: {
        name: "DEMRE",
        main_id: "63927",
        href: "https://www.beliani.co.uk/shaggy-area-rug-80-x-150-cm-light-grey-demre.html",
        lowPrice: "$49.99",
        highPrice: "$89.99",
      },
      Product_src_43: "https://placehold.co/295x295",

      JSON_Product_44: {
        name: "DEMRE",
        main_id: "63927",
        href: "https://www.beliani.co.uk/shaggy-area-rug-80-x-150-cm-light-grey-demre.html",
        lowPrice: "$49.99",
        highPrice: "$89.99",
      },
      Product_src_44: "https://placehold.co/295x295",

      Soonending_title: "Shop limited-time deals",

      Soonending_banner_href_1: "https://www.beliani.co.uk/content/lp24-11-20/",
      Soonending_banner_src_1:
        "https://upload.pictureserver.net/static/2024/uk20241120b.png",

      Soonending_banner_href_2: "https://www.beliani.co.uk/content/lp24-11-18/",
      Soonending_banner_src_2:
        "https://upload.pictureserver.net/static/2024/uk20241118b.png",

      Conditions_title: "Conditions title",
      Conditions_description: "Conditions description",
    },
    html: `
    CREATE YOUR TEMPLATE IN /src/content/templates/landing.js
    `,
  },
];
