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
#### Path:
- ./content/isActive.js           -> helper function
- ./content/fetchProducts.js      -> fetch products when button in src/build/index.html clicked (builded react application) (raw application located in ui folder: ui/src/App.jsx, function handleProductsDownload responsible for executing call to extension.)
- ./content/download.js           -> helper function
- ./content/selectProductsNew.js  -> content script that will be executed once UI Button in React will be clicked
- ./content/selectProduct.js      -> add Button to each SA Detail product to download particular product on click. Thus feature use the same function selectProductsNew to download products.

#### Description:
1. Main function that is responsible for products fetching is ```fetchProducts```.
2. Entry point in function located in row: 112. Ids that function receives on the row 1, comes from function ```selectProductsNew.js``` row 12.
3. Next we will iterate over provided **IDS** and call for each **MASTER_ID**  function ```getProductData```.
4. Inside this function should be handled responses for **LINKS**, **NAME**, **SLAVES** for **MASTER_ID**.
5. Function ```parse_response``` responsible for parsing response for both: **NAME**, **SLAVES**.
6. Iterate over ```slaves_ids``` from parsed ```parse_response``` function.
7. Function ```parse_response_prices``` responsible for parsing response price for particular **SLAVE_ID**.
8. Function ```getAllSAId``` responsible for selecting all **MASTER_ID** from SA page. Function for located inside file ```selectProduct```.

## HOW TO CREATE COMPONENT/NEWSLETTER/LANDING/CGB BANNER TEMPLATE
1. Create object with predefined properties.
2. Add to:
- TEMPLATES ARRAY in case of Newsletter, Landing, Banner.
- COMPONENTS OBJECT in case of Components.
3. App will automatically render everything.

-------------
> ### Component
### Path:
```src/content/components/index.js```
### Properties:
```
"COMPONENT NAME": {
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
--------------

> ### Newsletter
### Path:
```src/content/templates/newsletters.js```

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
    title: "Sunday NS with:",
    description: "Header\nTimer \n3 categories \nWithout CTA's\nFooter",
    is_active: true,
    fallback: {
      Newsletter_bg_color: "#fbf5f5",
      Timer_bg_color: "#750000",
      Timer_color: "#fff",

      Top_image_src: "https://beliani.info/newsletter/2022/uk240150_01.jpg",

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
      Conditions_unsubscribe: "Conditions unsubscribe"
    },
    html: '<!DOCTYPE html PUBLIC"-//W3C//DTD XHTML 1.0 Transitional//EN""http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">\n<html\n  xmlns="http://www.w3.org/1999/xhtml"\n  xmlns:o="urn:schemas-microsoft-com:office:office"\n  xmlns:v="urn:schemas-microsoft-com:vml"\n>\n  <head>\n    <title>Beliani</title>\n    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />\n    <meta name="x-apple-disable-message-reformatting" />\n    <meta name="viewport"\n      content="width=device-width, initial-scale=1, user-scalable=yes"\n    />\n    <meta name="color-scheme" content="light only" />\n    <meta name="supported-color-schemes" content="light only" />\n    <link\n      href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700&amp;subset=cyrillic-ext,latin-ext"\n    />\n    <style>\n      table,\n      td {\n        mso-table-lspace: 0pt;\n        mso-table-rspace: 0pt;\n      }\n      img {\n        -ms-interpolation-mode: bicubic;\n      }\n      .title-advantages {\n        text-align: center;\n        font-size: 11px;\n        color: #8c8278;\n        padding-bottom: 10px;\n        padding-top: 10px;\n        margin: 0;\n      }\n      .title-advantages-item {\n        margin-left: 4px;\n      }\n      .newsletterRecommendationHeader {\n        text-align: center;\n        font-size: 11px;\n        color: #8c8278;\n        margin-bottom: 10px;\n        margin-top: 10px;\n      }\n      .newsletterFreebieContainer {\n        padding-left: 10px;\n      }\n      .newsletterBottom80px {\n        padding-bottom: 80px;\n      }\n      .newsletterBottom10px {\n        padding-bottom: 10px;\n      }\n      .newsletterContainer {\n        padding-left: 20px;\n        padding-right: 20px;\n      }\n      .newsletterCta {\n        font-size: 20px;\n        line-height: 1.2;\n        font-family: "Open Sans", sans-serif;\n      }\n      .newsletterCode {\n        font-size: 20px;\n        line-height: 1.2;\n        font-family: "Open Sans", sans-serif;\n      }\n      .newsletterBottom20px {\n        padding-bottom: 20px;\n      }\n      .newsletterBottom35px {\n        padding-bottom: 35px;\n      }\n      .newsletterBottom60px {\n        padding-bottom: 60px;\n      }\n      .newsletterParagraph {\n        font-size: 18px;\n        font-family: "Open Sans", sans-serif;\n        line-height: 1.2;\n      }\n      .newsletterTitleOfferPart {\n        font-size: 30px;\n        font-family: "Open Sans", sans-serif;\n        line-height: 1.2;\n      }\n      .newsletterTitle {\n        font-size: 30px;\n        font-family: "Open Sans", sans-serif;\n        line-height: 1.2;\n      }\n      .newsletterProductTitle {\n        font-size: 20px;\n        font-family: "Open Sans", sans-serif;\n        line-height: 1.2;\n      }\n      .newsletterProductLowPrice {\n        font-size: 18px;\n        font-family: "Open Sans", sans-serif;\n        line-height: 1.2;\n        font-weight: 600;\n      }\n      .newsletterProductHightPrice {\n        font-size: 14px;\n        font-family: "Open Sans", sans-serif;\n        line-height: 1.2;\n        text-decoration: line-through;\n      }\n      .newsletterRight10px {\n        padding-right: 10px;\n      }\n      .newsletterLeft10px {\n        padding-left: 10px;\n      }\n      .newsletterFooter {\n        padding-left: 20px !important;\n        padding-right: 20px !important;\n      }\n      .newsletterConditions {\n        color: black;\n        font-family: "Open Sans", sans-serif;\n        font-size: 8px;\n      }\n      .newsletterFooterCompanyDetails {\n        vertical-align: middle;\n        padding-top: 20px;\n        padding-right: 0px;\n        padding-bottom: 20px;\n        font-size: 11px;\n        font-family: "Open Sans", sans-serif !important;\n        color: #000000;\n        background: #ececec;\n        width: 100%;\n      }\n      .newsletterFooterTitle {\n        text-align: left;\n        color: #000000;\n        font-family: "Open Sans", sans-serif;\n        font-size: 20px;\n      }\n      .newsletterProductTitleFreebie {\n        text-align: center;\n        font-family: "Open Sans", sans-serif;\n        font-size: 20px;\n      }\n      .newsletterFooterCategoryLEFT {\n        padding-bottom: 20px !important;\n        padding-right: 10px !important;\n      }\n      .newsletterFooterCategoryRIGHT {\n        padding-bottom: 20px !important;\n        padding-left: 10px !important;\n      }\n      .newsletterFooterCategoryLEFTBottom {\n        padding-right: 10px !important;\n      }\n      .newsletterFooterCategoryRIGHTBottom {\n        padding-left: 10px !important;\n      }\n      .newsletterSocialIcon {\n        padding-left: 25px !important;\n      }\n      .newsletterTopBottomContainer {\n        padding-top: 35px !important;\n        padding-bottom: 35px !important;\n      }\n      .newsletterKlarnaBannerContainer {\n        padding-top: 35px !important;\n        padding-bottom: 35px !important;\n      }\n      @media screen and (max-width: 768px) {\n        .newsletterFooterCategoryLEFTBottom {\n          padding-right: 5px !important;\n        }\n        .newsletterFooterCategoryRIGHTBottom {\n          padding-left: 5px !important;\n        }\n        .newsletterFooterCategoryLEFT {\n          padding-bottom: 10px !important;\n          padding-right: 5px !important;\n        }\n        .newsletterFooterCategoryRIGHT {\n          padding-bottom: 10px !important;\n          padding-left: 5px !important;\n        }\n        .newsletterSocialIcon {\n          padding-left: 13px !important;\n        }\n        .newsletterTopBottomContainer {\n          padding-top: 20px !important;\n          padding-bottom: 20px !important;\n        }\n        .newsletterFooterTitle {\n          font-size: 18px;\n        }\n        .newsletterProductTitleFreebie {\n          font-size: 18px;\n        }\n        .newsletterProductTitle {\n          font-size: 18px;\n        }\n        .newsletterProductLowPrice {\n          font-size: 16px;\n        }\n        .newsletterProductHightPrice {\n          display: block;\n        }\n        .newsletterProductTitleContainer {\n          padding-top: 10px;\n        }\n        .newsletterTitle {\n          font-size: 25px;\n        }\n        .newsletterTitleOfferPart {\n          font-size: 25px;\n        }\n        .newsletterContainer {\n          padding-left: 10px;\n          padding-right: 10px;\n        }\n        .newsletterFreebieContainer {\n          padding-left: 10px;\n          padding-right: 0px !important;\n        }\n        .newsletterBottom35px {\n          padding-bottom: 20px;\n        }\n        .newsletterBottom60px {\n          padding-bottom: 40px;\n        }\n        .newsletterParagraph {\n          font-size: 16px;\n        }\n        .newsletterLeft10px {\n          padding-left: 5px;\n        }\n        .newsletterRight10px {\n          padding-right: 5px;\n        }\n        .newsletterBottom20px {\n          padding-bottom: 10px;\n        }\n        .newsletterBottom80px {\n          padding-bottom: 50px;\n        }\n      }\n      @media screen and (max-width: 570px) {\n        .newsletterProductTitleFreebie {\n          font-size: 16px;\n        }\n      }\n      @media screen and (max-width: 460px) {\n        .newsletterProductTitleFreebie {\n          font-size: 14px;\n        }\n      }\n      @media screen and (max-width: 370px) {\n        .newsletterProductTitleFreebie {\n          font-size: 12px;\n        }\n      }\n    </style>\n  </head>\n  <body\n    class="body"\n    style="\n      width: 100% !important;\n      padding: 0 !important;\n      margin: 0 auto !important;\n      font-family: \'Open Sans\', sans-serif !important;\n      font-size: 13px;\n      color: #000000;\n      text-align: left;\n      background-color: #ececec;\n    "\n    width="100%"\n  >\n    {{{header}}}\n    <table\n      align="center"\n      border="0"\n      cellpadding="0"\n      cellspacing="0"\n      id="newsletter"\n      style="max-width:650px;width:100%;background-color:{{Newsletter_bg_color}};color:#000"\n      width="100%"\n    >\n      <tbody>\n        <tr>\n          <td align="center">\n            <table border="0" cellpadding="0" cellspacing="0" width="100%">\n              <tbody>\n                <tr>\n                  <td>\n                    <a href="{{origin}}{{utm}}{{id}}"\n                      ><img\n                        alt=""\n                        loading="lazy"\n                        src="{{Top_image_src}}"\n                        style="vertical-align: middle; max-width: 100%"\n                    /></a>\n                  </td>\n                </tr>\n              </tbody>\n            </table>\n          </td>\n        </tr>\n        <tr>\n          <td align="center" style="background-color:{{Newsletter_bg_color}}">\n            <table\n              align="center"\n              border="0"\n              cellpadding="0"\n              cellspacing="0"\n              width="100%"\n            >\n              <tbody>\n                <tr>\n                  <td align="center">\n                    <table\n                      border="0"\n                      cellpadding="0"\n                      cellspacing="0"\n                      width="100%"\n                    >\n                      <tbody>\n                        <tr>\n                          <td>\n                            <a href="{{origin}}/content{{Banner_href_1}}{{utm}}{{id}}"\n                              ><img\n                                alt=""\n                                loading="lazy"\n                                src="{{picture_server_url}}{{slug}}{{Campaign_src_1}}_mb.png"\n                                style="vertical-align: middle; max-width: 100%"\n                            /></a>\n                          </td>\n                        </tr>\n                      </tbody>\n                    </table>\n                  </td>\n                </tr>\n              </tbody>\n            </table>\n          </td>\n        </tr>\n        <tr>\n          <td style="background-color:{{Timer_bg_color}}; color: {{Timer_color}};">\n            <table border="0" cellpadding="0" cellspacing="0" width="100%">\n              <tbody>\n                <tr>\n                  <td class="newsletterBottom20px"></td>\n                </tr>\n              </tbody>\n            </table>\n          </td>\n        </tr>\n        <tr>\n          <td align="center" style="background-color:{{Timer_bg_color}}">\n            <a href="{{origin}}/content{{Timer_href}}{{utm}}{{id}}"\n              ><img\n                alt="Timer gif"\n                loading="lazy"\n                src="{{Timer_src}}"\n                style="vertical-align: middle; max-width: 100%"\n            /></a>\n          </td>\n        </tr>\n        <tr>\n          <td style="background-color:{{Timer_bg_color}}">\n            <table border="0" cellpadding="0" cellspacing="0" width="100%">\n              <tbody>\n                <tr>\n                  <td class="newsletterBottom20px"></td>\n                </tr>\n              </tbody>\n            </table>\n          </td>\n        </tr>\n        <tr>\n          <td style="background-color:{{Newsletter_bg_color}}">\n            <table border="0" cellpadding="0" cellspacing="0" width="100%">\n              <tbody>\n                <tr>\n                  <td class="newsletterBottom35px"></td>\n                </tr>\n              </tbody>\n            </table>\n          </td>\n        </tr>\n        <tr>\n          <td align="center" style="background-color:{{Newsletter_bg_color}}">\n            <table\n              align="center"\n              border="0"\n              cellpadding="0"\n              cellspacing="0"\n              width="100%"\n            >\n              <tbody>\n                <tr>\n                  <td align="center">\n                    <table\n                      border="0"\n                      cellpadding="0"\n                      cellspacing="0"\n                      width="100%"\n                    >\n                      <tbody>\n                        <tr>\n                          <td>\n                            <a href="{{origin}}/content{{Banner_href_2}}{{utm}}{{id}}"\n                              ><img\n                                alt=""\n                                loading="lazy"\n                                src="{{picture_server_url}}{{slug}}{{Campaign_src_2}}_mb.png"\n                                style="vertical-align: middle; max-width: 100%"\n                            /></a>\n                          </td>\n                        </tr>\n                      </tbody>\n                    </table>\n                  </td>\n                </tr>\n              </tbody>\n            </table>\n          </td>\n        </tr>\n        <tr>\n          <td style="background-color:{{Newsletter_bg_color}}">\n            <table border="0" cellpadding="0" cellspacing="0" width="100%">\n              <tbody>\n                <tr>\n                  <td class="newsletterBottom35px"></td>\n                </tr>\n              </tbody>\n            </table>\n          </td>\n        </tr>\n        <tr>\n          <td align="center" style="background-color:{{Newsletter_bg_color}}">\n            <table\n              align="center"\n              border="0"\n              cellpadding="0"\n              cellspacing="0"\n              width="100%"\n            >\n              <tbody>\n                <tr>\n                  <td align="center">\n                    <table\n                      border="0"\n                      cellpadding="0"\n                      cellspacing="0"\n                      width="100%"\n                    >\n                      <tbody>\n                        <tr>\n                          <td>\n                            <a href="{{origin}}/content{{Banner_href_3}}{{utm}}{{id}}"\n                              ><img\n                                alt=""\n                                loading="lazy"\n                                src="{{picture_server_url}}{{slug}}{{Campaign_src_3}}_mb.png"\n                                style="vertical-align: middle; max-width: 100%"\n                            /></a>\n                          </td>\n                        </tr>\n                      </tbody>\n                    </table>\n                  </td>\n                </tr>\n              </tbody>\n            </table>\n          </td>\n        </tr>\n        <tr>\n          <td style="background-color:{{Newsletter_bg_color}}">\n            <table border="0" cellpadding="0" cellspacing="0" width="100%">\n              <tbody>\n                <tr>\n                  <td class="newsletterBottom80px"></td>\n                </tr>\n              </tbody>\n            </table>\n          </td>\n        </tr>\n      </tbody>\n    </table>\n    <table\n      align="center"\n      border="0"\n      cellpadding="0"\n      cellspacing="0"\n      class="newsletterContainer"\n      style="max-width: 650px; width: 100%; background-color: #ffffff"\n    >\n      <tbody>\n        <tr>\n          <td class="newsletterBottom35px">\n {{{services_banner}}} {{{footer_categories}}} {{{klarna}}} {{{socials}}} {{{advantages}}}\n    <table\n      align="center"\n      border="0"\n      cellpadding="0"\n      cellspacing="0"\n      class="newsletterContainer"\n      style="max-width: 650px; width: 100%; background-color: #ffffff"\n      width="650"\n    >\n      <tbody>\n        <tr>\n          <td>\n            <img\n              alt=""\n              loading="lazy"\n              src="https://beliani.info/newsletter/2022/line.jpg"\n              style="display: block; max-width: 100%"\n            />\n          </td>\n        </tr>\n        <tr>\n          <td align="left" class="newsletterTopBottomContainer">\n            <span class="newsletterConditions" style="color: #000000"\n              >{{Conditions_title}}: {{Conditions_description}} {{Conditions_unsubscribe}}\n          </td>\n        </tr>\n      </tbody>\n    </table>\n    {{{company_details}}}\n  </body>\n</html>\n',
}
```
--------------

> ### Langing
### Path:
```src/content/templates/landing.js```

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
    title: "Sunday LP with:",
    description: "Timer \n3 categories \nWithout CTA's",
    is_active: true,
    fallback: {
      Newsletter_bg_color: "#fbf5f5",
      Timer_bg_color: "#750000",
      Timer_color: "#fff",

      Top_image_src: "https://beliani.info/newsletter/2022/uk240150_01.jpg",

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
      Conditions_unsubscribe: "Conditions unsubscribe"
    },
    html: `
      CREATE YOUR TEMPLATE IN /src/content/templates/landing.js
    `,
  }
```
--------------
> ### CGB BANNER
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
