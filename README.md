## LIBRARIES IN USE
[Linkify JS](https://linkify.js.org/) \
[Papa Parse](https://www.papaparse.com/docs) \
[Mustache](https://github.com/janl/mustache.js)
[Dexie](https://dexie.org/)

## HOW EXTENSION WORK
1. In manifest.json file need to define content_scripts.
```
    {
      "matches": [
        "https://www.prologistics.info/saved_details.php?filter_id=*"
      ],
      "js": [
        "./content/isActive.js",
        "./content/fetchProducts.js",
        "./content/download.js",
        "./content/selectProductsNew.js",
        "./content/selectProduct.js"
      ]
    }
```
2. Define content script.
```
{
  "author": {
    "email": "demczenko@beliani.co.uk"
  },
  "name": "Prolo power tools",
  "version": "2.0.0",
  "manifest_version": 3,
  "description": "Make prolo great again!",
  "default_locale": "en",
  "icons": {
    "32": "./icons/copy-32.png",
    "64": "./icons/copy-64.png",
    "128": "./icons/copy-128.png"
  },
  "content_scripts": []
}
```
3. When URL matched content script will be executed. 
```
{
  "author": {
    "email": "demczenko@beliani.co.uk"
  },
  "name": "Prolo power tools",
  "version": "2.0.0",
  "manifest_version": 3,
  "description": "Make prolo great again!",
  "default_locale": "en",
  "icons": {
    "32": "./icons/copy-32.png",
    "64": "./icons/copy-64.png",
    "128": "./icons/copy-128.png"
  },
  "content_scripts": [
    {
      "matches": [
        "https://www.prologistics.info/saved_details.php?filter_id=*"
      ],
      "js": [
        "./content/isActive.js",
        "./content/fetchProducts.js",
        "./content/download.js",
        "./content/selectProductsNew.js",
        "./content/selectProduct.js"
      ]
    }
  ]
}
```
4. Files ordering in ```js array``` matter.
```
"js": [
    "./content/isActive.js",
    "./content/fetchProducts.js",
    "./content/download.js",
    "./content/selectProductsNew.js",
    "./content/selectProduct.js"
]
```

## PRODUCTS
#### path:
- ./content/isActive.js           -> helper function
- ./content/fetchProducts.js      -> fetch products when button in src/build/index.html clicked (builded react application) (raw application located in ui folder: ui/src/App.jsx, function handleProductsDownload responsible for executing call to extension.)
- ./content/download.js           -> helper function
- ./content/selectProductsNew.js  -> content script that will be executed once UI Button in React will we clicked
- ./content/selectProduct.js      -> add Button to each SA Detail product to download particular product on click

## HOW TO CREATE COMPONENT/NEWSLETTER/LANDING/BANNER TEMPLATE
> ### Component
### Path:
```src/content/components/index.js```
### Properties:
```
{
  title: STRING,
  description: STRING,
  is_active: BOOLEAN,
  fallback: {
    "VARIABLE NAME": "VARIABLE VALUE",
    "VARIABLE NAME": "VARIABLE VALUE",
    "VARIABLE NAME": "VARIABLE VALUE",
    "VARIABLE NAME": "VARIABLE VALUE",
    "VARIABLE NAME": "VARIABLE VALUE",
  },
  data: {
    "SLUG_SELLER + SLUG_LANGUAGE": {
      "VARIABLE NAME": "VARIABLE VALUE",
      "VARIABLE NAME": "VARIABLE VALUE",
      "VARIABLE NAME": "VARIABLE VALUE",
      "VARIABLE NAME": "VARIABLE VALUE",
      "VARIABLE NAME": "VARIABLE VALUE",
    },
    "SLUG_SELLER + SLUG_LANGUAGE": {
      "VARIABLE NAME": "VARIABLE VALUE",
      "VARIABLE NAME": "VARIABLE VALUE",
      "VARIABLE NAME": "VARIABLE VALUE",
      "VARIABLE NAME": "VARIABLE VALUE",
      "VARIABLE NAME": "VARIABLE VALUE",
    },
  },
  html: STRING
}
```
### Example:
```
{
company_details: {
    title: "Company details",
    description: "Company details template",
    fallback: {
      "Company Details": "Company Details",
      Address: "Beliani (UK) GmbH 6340 Baar Switzerland",
      "Mobile number": "Phone: 020 3318 8222;",
      "Email address": "E-mail:",
      "Mail to": "mailto:mail@beliani.co.uk",
      Email: "mail@beliani.co.uk",
      "Commercial register":
        "Commercial Register: Commercial Register of the Canton of Zug, CH-170.4.008.869-6",
      VAT: "VAT ID: CHE-114.825.869 VAT",
    },
    is_active: true,
    html: '<table\n            cellspacing="0"\n            cellpadding="0"\n            border="0"\n            align="center"\n            id="newsletter"\n          >\n            <tbody>\n              <tr>\n                <td align="center" class="newsletterFooterCompanyDetails">\n                  <span\n                    style="color: #000000; text-align: center; font-size: 11px"\n                  >\n                    <b\n                      ><span style="font-size: 10px"\n                        >{{Company Details}}</span\n                      ></b\n                    >\n                    <br />{{Address}}<br />{{Mobile number}} {{Email address}}\n                    <a href="{{{Mail to}}}">{{Email}}</a>\n                    <br />{{Commercial register}}<br />{{VAT}}\n                  </span>\n                </td>\n              </tr>\n            </tbody>\n          </table>',
    data: {
      ptpt: {
        "Company Details": "Detalhes da Empresa",
        Address: "Beliani (DE) GmbH CH 6340 Baar Suíça",
        "Mobile number": "Telefone: +351 22 145 07 45;",
        "Email address": "E-mail:",
        "Mail to": "mailto:mail@beliani.pt",
        Email: "mail@beliani.pt",
        "Commercial register":
          "Registo Comercial: Reg. comercial do cantão ZUG, CHE-115.695.894",
        VAT: "USt-IDNr: DE 276156472",
      },
    },
    html: `<table\n            cellspacing="0"\n            cellpadding="0"\n            border="0"\n            align="center"\n            id="newsletter"\n          >\n            <tbody>\n              <tr>\n                <td align="center" class="newsletterFooterCompanyDetails">\n                  <span\n                    style="color: #000000; text-align: center; font-size: 11px"\n                  >\n                    <b\n                      ><span style="font-size: 10px"\n                        >{{Company Details}}</span\n                      ></b\n                    >\n                    <br />{{Address}}<br />{{Mobile number}} {{Email address}}\n                    <a href="{{{Mail to}}}">{{Email}}</a>\n                    <br />{{Commercial register}}<br />{{VAT}}\n                  </span>\n                </td>\n              </tr>\n            </tbody>\n          </table>`
  }
}
```

> ### Newsletter
### Path:
```src/content/templates/newsletters.js```

### Properties:

### Example:

> ### Langing
### Path:
```src/content/templates/landing.js```

### Properties:

### Example:

> ### BANNER
### Path:
```src/content/templates/banners.js```

### Properties:
```
{
  title: STRING,
  description: STRING,
  is_active: BOOLEAN,
  fallback: {
    "VARIABLE NAME": "VARIABLE VALUE",
    "VARIABLE NAME": "VARIABLE VALUE",
    "VARIABLE NAME": "VARIABLE VALUE",
    "VARIABLE NAME": "VARIABLE VALUE",
    "VARIABLE NAME": "VARIABLE VALUE",
  },
  html: STRING
}
```

### Example:
```
{
    title: "Mobile Cgb offer part",
    description:
      "Mobile banner with:\n2 columns.\nLeft side text.\nRight side graphic.",
    is_active: false,
    fallback: {
      Offert_part_1: "Up to 50% off",
      Offert_part_2: "all blankets & throws",
      Offert_part_3: "until 11th November",
      Cta: "Shop now",
      category_href: "sofas",
      video_src:
        "https://www.pictureserver.net/pic_storage/pic/d8/1e/english_src_banner_picid_11256_image.mp4?ver=1",
      bg_color: "#ffffff",
    },
    html: '<style>\n          #cgb.xyzGridContainer {\n            display: flex;\n            align-items: start;\n            padding-left: 20px;\n            flex-direction: column;\n            width: fit-content;\n          }\n\n          #cgb .cgbContainer a {\n            color: #000000;\n          }\n        \n          #cgb .xyCTA {\n            text-decoration-thickness: 1px;\n            font-weight: 500;\n            font-size: 11px;\n          }\n        \n          #cgb .xyHeader1 {\n            font-size: 25px;\n            line-height: 36px;\n            margin: 0 0 5px 0;\n          }\n          #cgb .xyHeader3 {\n            font-size: 11px;\n            text-decoration: none;\n            margin: 0 0 3px 0;\n          }\n          </style>\n\n<div id="cgb" class="xyzGridContainer" style="background-color:{{{bg_color}}}">\n  <div style="padding: 10px 5px 10px 0px;">\n      <p class="xyHeader1">\n        {{{Offert_part_1}}}\n      </br>\n        {{{Offert_part_2}}}\n      </p>\n      <p class="xyHeader3">\n        {{{Offert_part_3}}}\n      </p>\n      <a href="/{{{category_href}}}"  class="xyCTA">\n        {{{Cta}}}\n      </a>\n  </div>\n  <div>\n      <a href="/{{{category_href}}}"><video playsinline autoplay loop muted disableremoteplayback="true" style="max-width: 100%; vertical-align: middle;" >\n          <source\n              src="{{{video_src}}}"\n              type="video/mp4">\n      </video></a>\n  </div>\n</div>',
  }
```

## DEFINE VARIABLES IN TEMPLATE
Variable should be defined tihs way: ```{{{name}}}```
It is important to use 3 brackets before and after

## ACCESS TO GLOBAL VARIABLES
Such variables accessible in newsletter and landing page textareas.
Variable value depends from shop id, seller, language page.
- slug
- origin
- id
- utm
- picture_server_url
```
const DEFAULT_VARIABLES = {
  slug: "uk",
  origin: "https://www.beliani.co.uk",
  id: new URLSearchParams(window.location.search).get("id"),
  utm: "?utm_source=newsletter&utm_medium=email&utm_campaign=",
  picture_server_url: "https://upload.pictureserver.net/static/2024/",
}
```

## COMPONENTS
#### path: src/content/components/index.js
Each time extension executed and components file path added to scripts in matched object,
components will be added to context.
```
    {
      "matches": ["https://www.prologistics.info/news_email.php?id=*"],
      "exclude_matches": [
        "https://www.prologistics.info/news_email.php?id=*&validate_message=*"
      ],
      "js": [
        "./content/components/index.js"
      ]
    }
```

## SELECT CGB TEMPLATE
#### path:
- src/content/templates/banners.js \
There should be defined 2 variables. 
SELECTOR and TEMPLATES 
- ./content/mustache/index.js \
Library to parse variable in template 
- ./content/papaParse/papaparse.min.js \
Library to parse CSV file content 
- ./libraries/dexie.js \
Library to add indexed DB to project (not in use) 
- ./content/handlers/handleSelectBannerTemplate.js \
Function to handle select banner 
- ./content/cgb_templates/index.js \
Main function that initialize all stuff above.

## SELECT NEWSLETTER TEMPLATE
#### path:
- ./content/mustache/index.js \
Library to parse variable in template 

- ./content/papaParse/papaparse.min.js \
Library to parse CSV file content 

- ./content/context/index.js \
File to initialize context globally. (for LP and Newsletter) 

- ./content/components/index.js \
Add components to context. 

- ./content/handlers/handleSelectNewsletterTemplate.js \
Function to handle newsletter select. 

- ./content/templates/newsletters.js \
This file should contain 2 variables TEMPLATES and SELECTOR 

- ./content/select_template/index.js \
Functionality to add button select template and dialog interfaces 

- ./content/select_context/index.js \
Functionality to select context 

- ./content/fulfill_NS/index.js \
Functionality to fulfill Newsletter 

- ./content/helpers/CSVfns.js \
Functionality to convert, parse CSV 

- ./content/fulFillServer.js \
Functionality to fulfill servers for newsletter campaign 

- ./content/sendEmailToMe.js \
Functionality to send newsletter by clicking on button 

- ./content/svg.js \
SVG graphic 

- ./content/newsletter_family/handleButtonSubjectUpdate.js \
Functionality to update Subject line for newsletter campaign in Newsletter Family Table 

- ./content/newsletter_family/copyCampaignNumber.js \
Functionality to copy Campaign Number in Newsletter Family Table 

- ./content/newsletter_family/handleButtonBodyUpdate.js \
Function to handle Update Body 

- ./content/newsletter_family/features/updateBody.js \
Functionality to copy Body value in Newsletter Family Table 

- ./content/newsletter_family/features/fulfillBody.js \
Functionality to copy Body value in Newsletter Family Table 

- ./content/newsletter_family/NewsletterFamilyTable.js \
Main file to initialize functionality above

## SELECT LANDING TEMPLATE
#### path:
- ./content/mustache/index.js \

- ./content/papaParse/papaparse.min.js \

- ./content/context/index.js \

- ./content/components/index.js \

- ./content/templates/landing.js \

- ./content/handlers/handleSelectLandingTemplate.js \

- ./content/select_templates/index.js \

- ./content/select_context/index.js \

- ./content/fulfill_LP/index.js

## CONTEXT/SLUG CONTEXT
#### path:
- src/content/context/index.js \
Functionality to add context for Newsletter and Landing pages

## ISSUES
#### path:
- src/content/issue.js \
Functionality to render issues on https://www.prologistics.info/start.php page

## MULTISELECT
#### path:
- ./content/multiselect.js \
Multiselect for Mailing templates page. Click + Shift Click will select campaigns range

## CSV PUSH
#### path:
- ./content/uploadCSV.js \
Functionality to upload CSV file on page https://www.prologistics.info/push_notifications.php in order to automate PUSH messages
