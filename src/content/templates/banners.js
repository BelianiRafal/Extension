const TEMPLATES = [
  {
    title: "Mobile Cgb offer part",
    description: "Mobile banner with:\n2 columns.\nLeft side text.\nRight side graphic.",
    is_active: false,
    fallback: {
      Offert_part_1: "Up to 50% off",
      Offert_part_2: "all blankets & throws",
      Offert_part_3: "until 11th November",
      Cta: "Shop now",
      category_href: "sofas ",
      video_src: "https://www.pictureserver.net/pic_storage/pic/d8/1e/english_src_banner_picid_11256_image.mp4?ver=1",
      bg_color: "#ffffff",
    },
    html: '<style>\n          #cgb.xyzGridContainer {\n            display: flex;\n            align-items: start;\n            padding-left: 20px;\n            flex-direction: column;\n            width: fit-content;\n          }\n\n          #cgb .cgbContainer a {\n            color: #000000;\n          }\n        \n          #cgb .xyCTA {\n            text-decoration-thickness: 1px;\n            font-weight: 500;\n            font-size: 11px;\n          }\n        \n          #cgb .xyHeader1 {\n            font-size: 25px;\n            line-height: 36px;\n            margin: 0 0 5px 0;\n          }\n          #cgb .xyHeader3 {\n            font-size: 11px;\n            text-decoration: none;\n            margin: 0 0 3px 0;\n          }\n          </style>\n\n<div id="cgb" class="xyzGridContainer" style="background-color:{{{bg_color}}}">\n  <div style="padding: 10px 5px 10px 0px;">\n      <p class="xyHeader1">\n        {{{Offert_part_1}}}\n      </br>\n        {{{Offert_part_2}}}\n      </p>\n      <p class="xyHeader3">\n        {{{Offert_part_3}}}\n      </p>\n      <a href="/{{{category_href}}}"  class="xyCTA">\n        {{{Cta}}}\n      </a>\n  </div>\n  <div>\n      <a href="/{{{category_href}}}"><video playsinline autoplay loop muted disableremoteplayback="true" style="max-width: 100%; vertical-align: middle;" >\n          <source\n              src="{{{video_src}}}"\n              type="video/mp4">\n      </video></a>\n  </div>\n</div>',
  },
  {
    title: "Desktop Cgb offer part",
    description: "Desktop banner with:\n2 columns.\nLeft side text.\nRight side graphic.",
    is_active: false,
    fallback: {
      Offert_part_1: "Up to 50% off",
      Offert_part_2: "all blankets & throws",
      Offert_part_3: "until 11th November",
      Cta: "Shop now",
      category_href: "sofas",
      video_src: "https://www.pictureserver.net/pic_storage/pic/d8/1e/english_src_banner_picid_11256_image.mp4?ver=1",
      bg_color: "#ffffff",
    },
    html: '<style>\n#cgb.cgbContainer{\n  justify-content: center;\n  display: flex;\n  align-items: center;\n  width: 100%;\n}\n\n#cgb .cgbContainer a {\n  color: #000000;\n}\n\n#cgb .xyCTA{\n  text-decoration: none;\n  text-decoration: underline;\n  text-underline-position: under;\n  text-decoration-thickness: 1px;\n  font-weight: 500;\n  font-size: 20px;\n}\n#cgb .xyHeader1{\n  font-size: 45px;\n  line-height: 1.25;\n  margin: 0 0 12px 0;\n}\n#cgb .xyHeader3{\n  font-size: 20px;\n  margin: 0 0 18px 0;\n}\n\n#cgb .textContainer1 {\n  padding-left: min(24px, 2vw);\n  min-width: 37%;\n  flex: 0 1 37%;\n}\n\n@media screen and (max-width: 1200px){\n  #cgb .xyHeader1{\n    font-size: 32px;\n  }\n  #cgb .xyHeader3{\n    font-size: 18px;\n  }\n  #cgb .xyCTA{\n    font-size: 18px;\n  }\n}\n@media screen and (max-width: 800px){\n  #cgb .xyHeader1{\n    font-size: 30px;\n  }\n  #cgb .xyHeader3{\n    font-size: 14px;\n  }\n  #cgb .xyCTA{\n    font-size: 14px;\n  }\n}\n@media screen and (max-width: 650px){\n  #cgb .xyHeader1{\n    font-size: 20px;\n  }\n}</style>\n<div id="cgb" class="cgbContainer" style="background-color:{{{bg_color}}}">\n<div class="textContainer1">\n  <p class="xyHeader1">\n    {{{Offert_part_1}}}\n    </br>\n    {{{Offert_part_2}}}\n  </p>\n  <p class="xyHeader3">{{{Offert_part_3}}}</p>\n  <a class="xyCTA" href="/{{{category_href}}}">\n    {{Cta}}\n  </a>\n</div>\n  <a href="/{{{category_href}}}"><video style="max-width: 100%; vertical-align: middle;" autoplay="" loop="" muted="" playsinline="" disableremoteplayback="true" >\n    <source src="{{{video_src}}}" type="video/mp4">\n    </video>\n  </a>\n</div>',
  },
  {
    title: "Desktop Offer",
    description: "Desktop banner with:\n2 rows.\nTitle first row\nGraphic second row.",
    is_active: false,
    fallback: {
      Offer_text: "Offer_text",
      category_href: "sofas",
      bg_color: "#ffffff",
      video_src: "https://www.pictureserver.net/pic_storage/pic/d8/1e/english_src_banner_picid_11256_image.mp4?ver=1",
    },
    html: '<style> \n#cgb.xyGContainer {\n  max-width: 1440px !important;\n}\n#cgb .textBanner {\n  font-size: min(19px, 2.6vw);\n  font-weight: 600;\n}\n\n#cgb .textBannerContainer {\n  padding-top: min(24px, 4vw);\n  padding-bottom: min(24px, 4vw);\n  padding-left: min(12px, 2vw);\n}\n</style>\n<div id="cgb" class="xyGContainer">\n  <div class="textBannerContainer" style="background-color:{{{bg_color}}};">\n    <p class="textBanner" style="margin: 0;">\n      {{{Offer_text}}}\n    </p>\n  </div>\n  <a href="/{{{category_href}}}">\n    <video style="max-width: 100%; vertical-align: middle;" autoplay="" loop="" muted="" playsinline="" disableremoteplayback="true" >\n      <source src="{{{video_src}}}" type="video/mp4">\n    </video>\n  </a>\n</div>',
  },
  {
    title: "Mobile Offer",
    description: "Mobile banner with:\n2 rows.\nTitle first row\nGraphic second row.",
    is_active: false,
    fallback: {
      Offer_text: "Offer_text",
      category_href: "sofas",
      bg_color: "#ffffff",
      video_src: "https://www.pictureserver.net/pic_storage/pic/d8/1e/english_src_banner_picid_11256_image.mp4?ver=1",
    },
    html: '<style> \n#cgb.xyGContainer {\n  max-width: 1440px !important;\n}\n#cgb .textBanner {\n  font-size: min(19px, 2.6vw);\n  font-weight: 600;\n}\n\n#cgb .textBannerContainer {\n  padding-top: min(24px, 4vw);\n  padding-bottom: min(24px, 4vw);\n  padding-left: min(12px, 2vw);\n}\n</style>\n<div id="cgb" class="xyGContainer">\n  <div class="textBannerContainer" style="background-color:{{{bg_color}}};">\n    <p class="textBanner" style="margin: 0;">\n      {{{Offer_text}}}\n    </p>\n  </div>\n  <a href="/{{{category_href}}}">\n    <video style="max-width: 100%; vertical-align: middle;" autoplay="" loop="" muted="" playsinline="" disableremoteplayback="true" >\n      <source src="{{{video_src}}}" type="video/mp4">\n    </video>\n  </a>\n</div>',
  },
  {
    title: "Desktop Offer row x1 MP4",
    description: "Desktop banner with:\n2 rows.\nTitle first row\nGraphic second row.",
    is_active: true,
    x1DesktopMp4: true,
    fallback: {
      Offer_text: "Offer_text",
      category_href: "sofas",
      bg_color: "#ffffff",
    },
    html: `
      <style> 
      #cgb.xyGContainer {
        max-width: 1696px !important;
        overflow: hidden;
        padding:0 min(20px, 2vw);
      }
      #cgb .textBanner {
        font-size: min(18px, 2.6vw);
        font-weight: 600;
      }

      #cgb .textBannerContainer {
        padding-top: min(23px, 2vw);
        padding-bottom: min(23px, 2vw);
      }
      </style>
        <a target="_blank" style="text-decoration: none;" href="[[banner_category_url]]">
          <div id="cgb" class="xyGContainer" style="background-color:[[banner_background_desktop]];">
            <div class="textBannerContainer">
              [[banner_text]]
            </div>
            <video style="max-width: 100%; vertical-align: middle;" autoplay="" loop="" muted="" playsinline="" disableremoteplayback="true" >
              <source src="{imageurl src="banner" picid=$banner->id ext=$banner->ext}" type="video/mp4">
            </video>
          </div>
        </a>`,
    banner_text: `<p class="textBanner" style="margin: 0;">{{Offer_text}}</p>`,
  },
  {
    title: "Mobile Offer row x1 MP4",
    description: "Mobile banner with:\n2 rows.\nTitle first row\nGraphic second row.",
    is_active: true,
    x1MobileMp4: true,
    fallback: {
      Offer_text: "Offer_text",
      category_href: "sofas",
      bg_color: "#ffffff",
    },
    html: `
    <style> 
      #cgb.xyGContainer {
        max-width: 1696px !important;
      }
      #cgb .textBanner {
        font-size: min(19px, 3.6vw);
        font-weight: 600;
      }

      #cgb .textBannerContainer {
        padding-top: min(24px, 4vw);
        padding-bottom: min(24px, 4vw);
      }
      </style>
      <a target="_blank" style="text-decoration: none;" href="[[banner_category_url]]">
        <div id="cgb" class="xyGContainer" style="background-color:[[banner_background_mobile]];">
          <div class="textBannerContainer">
            [[banner_text]]
          </div>
          <video style="max-width: 100%; vertical-align: middle;" autoplay="" loop="" muted="" playsinline="" disableremoteplayback="true" >
            <source src="{imageurl src="mobilebanner" picid=$banner->id ext=$banner->ext}" type="video/mp4">
          </video>
        </div>
      </a>`,
    banner_text: `<p class="textBanner" style="margin: 0;">{{Offer_text}}</p>`,
  },
  {
    title: "Cgb desktop row x3 MP4",
    is_active: true,
    x3DesktopMp4: true,
    fallback: {
      Offert_part_1: "Up to 50% off",
      Offert_part_2: "all blankets & throws",
      Offert_part_3: "until 11th November",
      Cta: "Shop now",
      category_href: "sofas",
      bg_color: "#ffffff",
    },
    html: `
    <style> 
        #cgb.cgbContainer{ justify-content: center; display: flex; align-items: center; width: 100%; overflow:hidden; max-height: 590px; } 
        #cgb .xyCTA{ text-decoration: underline; text-underline-position: under; text-decoration-thickness: 1px; font-weight: 400; font-size: 20px; } 
        #cgb .xyHeader1{ font-size: 45px; line-height: 1.25; margin: 0 0 12px 0; } 
        #cgb .xyHeader3{ font-size: 20px; margin: 0 0 18px 0; } 
        #cgb .textContainer1 { padding-left: min(24px, 2vw); min-width: 37%; flex: 0 1 37%; } 
        @media screen and (max-width: 1200px){ #cgb .xyHeader1{ font-size: 32px; } #cgb .xyHeader3{ font-size: 18px; } #cgb .xyCTA{ font-size: 18px; } } 
        @media screen and (max-width: 800px){ #cgb .xyHeader1{ font-size: 30px; } #cgb .xyHeader3{ font-size: 14px; } #cgb .xyCTA{ font-size: 14px; } } 
        @media screen and (max-width: 650px){ #cgb .xyHeader1{ font-size: 20px; } } 
        </style> 
        <a target="_blank" style="text-decoration: none;" href="[[banner_category_url]]"> 
          <div id="cgb" class="cgbContainer" style="background-color:[[banner_background_desktop]];">
            <div class="textContainer1" style="color:[[banner_text_color]];"> 
             [[banner_text]] 
            </div> 
              <video style="max-width: 100%; vertical-align: middle; min-width: 62%;" autoplay="" loop="" muted="" playsinline="" disableremoteplayback="true"> 
              <source src="{imageurl src="banner" picid=$banner->id ext=$banner->ext}" type="video/mp4"> 
              </video>
          </div> 
        </a>`,
    banner_text: `
      <p class="xyHeader1">{{{Offert_part_1}}}</br>{{{Offert_part_2}}}</p>
      <p class="xyHeader3">{{{Offert_part_3}}}</p>
      <span class="xyCTA">{{Cta}}</span>
    `,
  },
  {
    title: "Cgb mobile row x3 MP4",
    is_active: true,
    x3MobileMp4: true,
    fallback: {
      Offert_part_1: "Up to 50% off",
      Offert_part_2: "all blankets & throws",
      Offert_part_3: "until 11th November",
      Cta: "Shop now",
      category_href: "sofas",
      bg_color: "#ffffff",
    },

    html: `
    <style> 
      #cgb.xyzGridContainer { display: flex; align-items: start; padding-left: 20px; flex-direction: column; width: 100%; } 
      #cgb .xyCTA { text-decoration: underline; text-underline-position: under; text-decoration-thickness: 1px; font-weight: 400; font-size: 12px; } 
      #cgb .xyHeader1 { font-size: 26px; line-height: 1.2; margin: 0 0 5px 0; } 
      #cgb .xyHeader3 { font-size: 12px; text-decoration: none; margin: 0 0 3px 0; } 
    </style> 


      <a href="[[banner_category_url]]" target="_blank" class="xyCTA" style="display: block; text-decoration: none; color: [[banner_text_color]];"> 
      <div id="cgb" class="xyzGridContainer" style="background-color:[[banner_background_mobile]];"> 
      <div style="padding: 10px 5px 10px 0px;"> 
      [[banner_text]]
      </div> 
      <div style="width:100%"> 
      <video playsinline autoplay loop muted disableremoteplayback="true" style="max-width: 100%; vertical-align: middle;"> 
      <source src="{imageurl src='mobilebanner' picid=$banner->id ext=$banner->ext}" type="video/mp4"> 
      </video> 
      </div> 
      </div> 
      </a> `,
    banner_text: `
      <p class="xyHeader1">{{{Offert_part_1}}}</br>{{{Offert_part_2}}}</p>
      <p class="xyHeader3">{{{Offert_part_3}}}</p>
      <span class="xyCTA">{{Cta}}</span>
    `,
  },

  //TEMPLATE FOR BANNER IMG====================================
  {
    title: "Desktop Offer row x1 IMG",
    description: "Desktop banner with:\n2 rows.\nTitle first row\nGraphic second row.",
    is_active: true,
    x1DesktopImg: true,
    fallback: {
      Offer_text: "Offer_text",
      category_href: "sofas",
      bg_color: "#ffffff",
    },
    html: `
    <style> 
      #cgb.xyGContainer {
        max-width: 1696px !important;
        padding:0 min(20px, 2vw);
      }
      #cgb .textBanner {
        font-size: min(18px, 2.6vw);
        font-weight: 600;
      }

      #cgb .textBannerContainer {
        padding-top: min(23px, 2vw);
        padding-bottom: min(23px, 2vw);
      }
      </style>
        <a href="[[banner_category_url]]" target="_blank" style="display: block; text-decoration: none; color: [[banner_text_color]];">
        <div id="cgb" class="xyGContainer" style="background-color:[[banner_background_desktop]];">
          <div class="textBannerContainer">
          [[banner_text]]
          </div>
          <img style="max-width: 100%; vertical-align: middle;" src="{imageurl src="banner" picid=$banner->id ext=$banner->ext}" />
        </div>
      </a>`,
      banner_text: `<p class="textBanner" style="margin: 0;">{{Offer_text}}</p>`,
  },
  {
    title: "Mobile Offer row x1 IMG",
    description: "Mobile banner with:\n2 rows.\nTitle first row\nGraphic second row.",
    is_active: true,
    x1MobileImg: true,
    fallback: {
      Offer_text: "Offer_text",
      category_href: "sofas",
      bg_color: "#ffffff",
    },
    html: `
    <style> 
      #cgb.xyGContainer {
        max-width: 1696px !important;
        padding:0 min(12px, 2vw);
      }
      #cgb .textBanner {
        font-size: min(19px, 3.6vw);
        font-weight: 600;
      }

      #cgb .textBannerContainer {
        padding-top: min(24px, 4vw);
        padding-bottom: min(24px, 4vw);
      }
      </style>
      <a href="[[banner_category_url]]" target="_blank" style="display: block; text-decoration: none; color: [[banner_text_color]];">
        <div id="cgb" class="xyGContainer" style="background-color:[[banner_background_mobile]];">
          <div class="textBannerContainer">
           [[banner_text]]
          </div>
          <img style="max-width: 100%; vertical-align: middle;" src="{imageurl src="mobilebanner" picid=$banner->id ext=$banner->ext}" />
        </div>
      </a>`,
      banner_text: `<p class="textBanner" style="margin: 0;">{{Offer_text}}</p>`,
  },


  {
    title: "Cgb desktop row x3 IMG",
    is_active: true,
    x3DesktopImg: true,
    fallback: {
      Offert_part_1: "Up to 50% off",
      Offert_part_2: "all blankets & throws",
      Offert_part_3: "until 11th November",
      Cta: "Shop now",
      category_href: "sofas",
      bg_color: "#ffffff",
    },
    html: `
    <style> 
        #cgb.cgbContainer{ justify-content: center; display: flex; align-items: center; width: 100%; overflow:hidden; max-height: 590px; } 
        #cgb .xyCTA{ text-decoration: underline; text-underline-position: under; text-decoration-thickness: 1px; font-weight: 400; font-size: 20px; } 
        #cgb .xyHeader1{ font-size: 45px; line-height: 1.25; margin: 0 0 12px 0; } 
        #cgb .xyHeader3{ font-size: 20px; margin: 0 0 18px 0; } 
        #cgb .textContainer1 { padding-left: min(24px, 2vw); min-width: 37%; flex: 0 1 37%; } 
        @media screen and (max-width: 1200px){ #cgb .xyHeader1{ font-size: 32px; } #cgb .xyHeader3{ font-size: 18px; } #cgb .xyCTA{ font-size: 18px; } } 
        @media screen and (max-width: 800px){ #cgb .xyHeader1{ font-size: 30px; } #cgb .xyHeader3{ font-size: 14px; } #cgb .xyCTA{ font-size: 14px; } } 
        @media screen and (max-width: 650px){ #cgb .xyHeader1{ font-size: 20px; } } 
        </style> 
        <a target="_blank" style="text-decoration: none;" href="[[banner_category_url]]"> 
            <div id="cgb" class="cgbContainer" style="background-color:[[banner_background_desktop]];">
              <div class="textContainer1" style="color:[[banner_text_color]];"> 
               [[banner_text]]
            </div> 
            <img style="max-width: 100%; vertical-align: middle; min-width: 62%;" src="{imageurl src="banner" picid=$banner->id ext=$banner->ext}" />
          </div> 
        </a>`,
        banner_text: `
          <p class="xyHeader1">{{{Offert_part_1}}}</br>{{{Offert_part_2}}}</p>
          <p class="xyHeader3">{{{Offert_part_3}}}</p>
          <span class="xyCTA">{{Cta}}</span>
    `,
  },
  {
    title: "Cgb mobile row x3 IMG",
    is_active: true,
    x3MobileImg: true,
    fallback: {
      Offert_part_1: "Up to 50% off",
      Offert_part_2: "all blankets & throws",
      Offert_part_3: "until 11th November",
      Cta: "Shop now",
      category_href: "sofas",
      bg_color: "#ffffff",
    },

    html: `
      <style> 
        #cgb.xyzGridContainer { display: flex; align-items: start; padding-left: 20px; flex-direction: column; width: 100%; } 
        #cgb .xyCTA { text-decoration: underline; text-underline-position: under; text-decoration-thickness: 1px; font-weight: 400; font-size: 12px; } 
        #cgb .xyHeader1 { font-size: 26px; line-height: 1.2; margin: 0 0 5px 0; } 
        #cgb .xyHeader3 { font-size: 12px; text-decoration: none; margin: 0 0 3px 0; } 
        </style> 


        <a href="[[banner_category_url]]" target="_blank" class="xyCTA" style="display: block; text-decoration: none; color: [[banner_text_color]];"> 
          <div id="cgb" class="xyzGridContainer" style="background-color:[[banner_background_mobile]];"> 
            <div style="padding: 10px 5px 10px 0px;"> 
              [[banner_text]]
            </div> 
            <div style="width:100%"> 
              <img style="max-width: 100%; vertical-align: middle;" src="{imageurl src="mobilebanner" picid=$banner->id ext=$banner->ext}" />
            </div> 
          </div> 
        </a> `,
        banner_text: `
          <p class="xyHeader1">{{{Offert_part_1}}}</br>{{{Offert_part_2}}}</p>
          <p class="xyHeader3">{{{Offert_part_3}}}</p>
          <span class="xyCTA">{{Cta}}</span>
    `,
  },
  {
    title: "Cgb desktop BW",
    is_active: false,
    fallback: {
      "Up to": "Up to 50% off",
      "BW second": "All blankets & throws",
      Cta: "Shop now",
      category_href: "sofas",
      bg_color: "#ffffff",
    },
    value:
      '<style>\n#cgb.cgbContainer{\n  justify-content: center;\n  display: flex;\n  align-items: center;\n  width: 100%;\n}\n\n#cgb .cgbContainer a {\n  color: #000000;\n}\n\n#cgb .xyCTA{\n  text-decoration: underline;\n  text-underline-position: under;\n  text-decoration-thickness: 1px;\n  font-weight: 300;\n  font-size: 20px;\n  color:#fff;\n}\n#cgb .xyHeader1{\n  font-size: 45px;\n  line-height: 1.25;\n  margin: 0;\n  color:#fff;\n}\n#cgb .xyHeader2{\n  font-size: 30px;\n  line-height: 1.25;\n  margin: 0 0 20px 0;\n  color:#fff;\n}\n#cgb .textContainer1 {\n  padding-left: min(24px, 2vw);\n  min-width: 37%;\n  flex: 0 1 37%;\n}\n\n@media screen and (max-width: 1200px){\n  #cgb .xyHeader1{\n    font-size: 32px;\n  }\n  #cgb .xyHeader2{\n    font-size: 22px;\n  }\n  #cgb .xyCTA{\n    font-size: 18px;\n  }\n}\n@media screen and (max-width: 800px){\n  #cgb .xyHeader1{\n    font-size: 30px;\n  }\n  #cgb .xyHeader2{\n    font-size: 20px;\n  }\n  #cgb .xyCTA{\n    font-size: 14px;\n  }\n}\n@media screen and (max-width: 650px){\n  #cgb .xyHeader1{\n    font-size: 20px;\n  }\n}</style>\n<div id="cgb" class="cgbContainer" style="background-color:{{{bg_color}}}">\n<div class="textContainer1">\n  <p class="xyHeader1">\n    {{{Up to}}}\n  </p>\n  <p class="xyHeader2">{{{BW second}}}</p>\n  <a class="xyCTA" href="/{{{category_href}}}">\n    {{Cta}}\n  </a>\n</div>\n  <a href="/{{{category_href}}}"><video style="max-width: 100%; vertical-align: middle;" autoplay="" loop="" muted="" playsinline="" disableremoteplayback="true" >\n    <source src="{imageurl src="banner" picid=$banner->id ext=$banner->ext}" type="video/mp4">\n    </video>\n  </a>\n</div>',
  },
  {
    title: "Cgb mobile BW",
    is_active: false,
    fallback: {
      "Up to mobile": "Up to 50% off",
      "BW second": "All blankets & throws",
      Cta: "Shop now",
      category_href: "sofas",
      video_src: "https://www.pictureserver.net/pic_storage/pic/d8/1e/english_src_banner_picid_11256_image.mp4?ver=1",
      bg_color: "#ffffff",
    },
    value:
      '<style>\n          #cgb.xyzGridContainer {\n            display: flex;\n            align-items: start;\n            padding-left: 20px;\n            flex-direction: column;\n            width: 100%;\n          }\n\n          #cgb .cgbContainer a {\n            color: #000000;\n          }\n        \n          #cgb .xyCTA {\n            font-weight: 300;\n            font-size: 12px;\n            color:#fff;\n            text-decoration: underline;\n            text-underline-position: under;\n          }\n        \n          #cgb .xyHeader1 {\n            font-size: 25px;\n            line-height: 36px;\n            margin: 0;\n            color:#fff;\n          }\n          #cgb .xyHeader2 {\n            font-size: 17px;\n            line-height: 25px;\n            margin: 0 0 10px 0;\n            font-weight: 300;\n            color:#fff;\n          }\n          </style>\n\n<div id="cgb" class="xyzGridContainer" style="background-color:{{{bg_color}}}">\n  <div style="padding: 10px 5px 10px 0px;">\n      <p class="xyHeader1">\n        {{{Up to mobile}}}\n      </p>\n      <p class="xyHeader2">\n        {{{BW second}}}\n      </p>\n      <a href="/{{{category_href}}}"  class="xyCTA">\n        {{{Cta}}}\n      </a>\n  </div>\n  <div>\n      <a style="display: block; width: 100%;" href="/{{{category_href}}}" class="video"><video playsinline autoplay loop muted disableremoteplayback="true" style="max-width: 100%; vertical-align: middle;" >\n          <source\n              src="{imageurl src="mobilebanner" picid=$banner->id ext=$banner->ext}" type="video/mp4">\n      </video></a>\n  </div>\n</div>',
  },
];
const SELECTOR = "textarea[name=body]";
