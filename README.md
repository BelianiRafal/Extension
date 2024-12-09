## LIBRARIES IN USE
[Linkify JS](https://linkify.js.org/) \
[Papa Parse](https://www.papaparse.com/docs) \
[Mustache](https://github.com/janl/mustache.js)

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
#### path: src/content

## SELECT NEWSLETTER TEMPLATE
#### path: src/content

## SELECT LANDING TEMPLATE
#### path: src/content

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

