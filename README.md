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

## CONTEXT
#### path: src/content

## SLUG CONTEXT
#### path: src/content

## UPDATE BODY
#### path: src/content

## UPDATE SUBJECT
#### path: src/content

## ISSUES
#### path: src/content

## LIBRARIES
#### path: src/content

## CSV PPUSH
#### path: src/content

