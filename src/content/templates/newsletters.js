// todo: import .html templates using fetch() -> convert to text using <html>.text()

const SELECTOR = "input[name=subject]";
const TEMPLATES = [
  {
    title: "Clear contnet:",
    description: "Just cleaner",
    is_active: true,
    fallback: {},
    html: `<html><head><title></title></head><body></body></html>
`,
  },
  {
    title: "Sunday NS with:",
    description:
      "Header\nTimer + Freebies Pic \n4 categories \nTimer in 2nd banner\nWithout CTA's\nFooter",
    is_active: false,
    fallback: {
      Newsletter_bg_color: "#fbf5f5",
      Timer_bg_color: "#750000",
      Timer_color: "#fff",

      Top_image_src: "https://beliani.info/newsletter/2022/uk240150_01.jpg",

      Timer_href: "/lp24-10-25",
      Timer_src: "https://gen.sendtric.com/countdown/akikmw4bkt",
      Timer_freebie_src: 20241108,

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
    html: `<!DOCTYPE html PUBLIC"-//W3C//DTD XHTML 1.0 Transitional//EN""http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml">
  <head>
    <title>Beliani</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="x-apple-disable-message-reformatting" />
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=yes" />
    <meta name="color-scheme" content="light only" />
    <meta name="supported-color-schemes" content="light only" />
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700&amp;subset=cyrillic-ext,latin-ext" />
    <style>
      table,
      td {
        mso-table-lspace: 0pt;
        mso-table-rspace: 0pt;
      }
      img {
        -ms-interpolation-mode: bicubic;
      }
      .title-advantages {
        text-align: center;
        font-size: 11px;
        color: #8c8278;
        padding-bottom: 10px;
        padding-top: 10px;
        margin: 0;
      }
      .title-advantages-item {
        margin-left: 4px;
      }
      .newsletterRecommendationHeader {
        text-align: center;
        font-size: 11px;
        color: #8c8278;
        margin-bottom: 10px;
        margin-top: 10px;
      }
      .newsletterFreebieContainer {
        padding-left: 10px;
      }
      .newsletterBottom80px {
        padding-bottom: 80px;
      }
      .newsletterBottom10px {
        padding-bottom: 10px;
      }
      .newsletterContainer {
        padding-left: 20px;
        padding-right: 20px;
      }
      .newsletterCta {
        font-size: 20px;
        line-height: 1.2;
        font-family: "Open Sans", sans-serif;
      }
      .newsletterCode {
        font-size: 20px;
        line-height: 1.2;
        font-family: "Open Sans", sans-serif;
      }
      .newsletterBottom20px {
        padding-bottom: 20px;
      }
      .newsletterBottom35px {
        padding-bottom: 35px;
      }
      .newsletterBottom60px {
        padding-bottom: 60px;
      }
      .newsletterParagraph {
        font-size: 18px;
        font-family: "Open Sans", sans-serif;
        line-height: 1.2;
      }
      .newsletterTitleOfferPart {
        font-size: 30px;
        font-family: "Open Sans", sans-serif;
        line-height: 1.2;
      }
      .newsletterTitle {
        font-size: 30px;
        font-family: "Open Sans", sans-serif;
        line-height: 1.2;
      }
      .newsletterProductTitle {
        font-size: 20px;
        font-family: "Open Sans", sans-serif;
        line-height: 1.2;
      }
      .newsletterProductLowPrice {
        font-size: 18px;
        font-family: "Open Sans", sans-serif;
        line-height: 1.2;
        font-weight: 600;
      }
      .newsletterProductHightPrice {
        font-size: 14px;
        font-family: "Open Sans", sans-serif;
        line-height: 1.2;
        text-decoration: line-through;
      }
      .newsletterRight10px {
        padding-right: 10px;
      }
      .newsletterLeft10px {
        padding-left: 10px;
      }
      .newsletterFooter {
        padding-left: 20px !important;
        padding-right: 20px !important;
      }
      .newsletterConditions {
        color: black;
        font-family: "Open Sans", sans-serif;
        font-size: 8px;
      }
      .newsletterFooterCompanyDetails {
        vertical-align: middle;
        padding-top: 20px;
        padding-right: 0px;
        padding-bottom: 20px;
        font-size: 11px;
        font-family: "Open Sans", sans-serif !important;
        color: #000000;
        background: #ececec;
        width: 100%;
      }
      .newsletterFooterTitle {
        text-align: left;
        color: #000000;
        font-family: "Open Sans", sans-serif;
        font-size: 20px;
      }
      .newsletterProductTitleFreebie {
        text-align: center;
        font-family: "Open Sans", sans-serif;
        font-size: 20px;
      }
      .newsletterFooterCategoryLEFT {
        padding-bottom: 20px !important;
        padding-right: 10px !important;
      }
      .newsletterFooterCategoryRIGHT {
        padding-bottom: 20px !important;
        padding-left: 10px !important;
      }
      .newsletterFooterCategoryLEFTBottom {
        padding-right: 10px !important;
      }
      .newsletterFooterCategoryRIGHTBottom {
        padding-left: 10px !important;
      }
      .newsletterSocialIcon {
        padding-left: 25px !important;
      }
      .newsletterTopBottomContainer {
        padding-top: 35px !important;
        padding-bottom: 35px !important;
      }
      .newsletterKlarnaBannerContainer {
        padding-top: 35px !important;
        padding-bottom: 35px !important;
      }
      @media screen and (max-width: 768px) {
        .newsletterFooterCategoryLEFTBottom {
          padding-right: 5px !important;
        }
        .newsletterFooterCategoryRIGHTBottom {
          padding-left: 5px !important;
        }
        .newsletterFooterCategoryLEFT {
          padding-bottom: 10px !important;
          padding-right: 5px !important;
        }
        .newsletterFooterCategoryRIGHT {
          padding-bottom: 10px !important;
          padding-left: 5px !important;
        }
        .newsletterSocialIcon {
          padding-left: 13px !important;
        }
        .newsletterTopBottomContainer {
          padding-top: 20px !important;
          padding-bottom: 20px !important;
        }
        .newsletterFooterTitle {
          font-size: 18px;
        }
        .newsletterProductTitleFreebie {
          font-size: 18px;
        }
        .newsletterProductTitle {
          font-size: 18px;
        }
        .newsletterProductLowPrice {
          font-size: 16px;
        }
        .newsletterProductHightPrice {
          display: block;
        }
        .newsletterProductTitleContainer {
          padding-top: 10px;
        }
        .newsletterTitle {
          font-size: 25px;
        }
        .newsletterTitleOfferPart {
          font-size: 25px;
        }
        .newsletterContainer {
          padding-left: 10px;
          padding-right: 10px;
        }
        .newsletterFreebieContainer {
          padding-left: 10px;
          padding-right: 0px !important;
        }
        .newsletterBottom35px {
          padding-bottom: 20px;
        }
        .newsletterBottom60px {
          padding-bottom: 40px;
        }
        .newsletterParagraph {
          font-size: 16px;
        }
        .newsletterLeft10px {
          padding-left: 5px;
        }
        .newsletterRight10px {
          padding-right: 5px;
        }
        .newsletterBottom20px {
          padding-bottom: 10px;
        }
        .newsletterBottom80px {
          padding-bottom: 50px;
        }
      }
      @media screen and (max-width: 570px) {
        .newsletterProductTitleFreebie {
          font-size: 16px;
        }
      }
      @media screen and (max-width: 460px) {
        .newsletterProductTitleFreebie {
          font-size: 14px;
        }
      }
      @media screen and (max-width: 370px) {
        .newsletterProductTitleFreebie {
          font-size: 12px;
        }
      }
    </style>
  </head>
  <body aria-readonly="false" class="body" style="width: 100% !important; padding: 0 !important; margin: 0 auto !important; font-family: 'Open Sans', sans-serif !important; font-size: 13px; color: #000000; text-align: left; background-color: #ececec" width="100%">
    {{{header}}}
    <table align="center" border="0" cellpadding="0" cellspacing="0" id="newsletter" style="max-width:650px;width:100%;background-color:{{Newsletter_bg_color}};color:#000" width="100%">
      <tbody>
        <tr>
          <td align="center">
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
              <tbody>
                <tr>
                  <td>
                    <a href="{{origin}}{{utm}}{{id}}"><img alt="" loading="lazy" src="{{Top_image_src}}" style="vertical-align: middle; max-width: 100%" /></a>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td align="center" style="background-color:{{Newsletter_bg_color}}">
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%">
              <tbody>
                <tr>
                  <td align="center">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                      <tbody>
                        <tr>
                          <td>
                            <a href="{{origin}}/content{{Banner_href_1}}{{utm}}{{id}}"><img alt="" loading="lazy" src="{{picture_server_url}}{{slug}}{{Campaign_src_1}}_mb.png?ver=4" style="vertical-align: middle; max-width: 100%" /></a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td style="background-color:{{Newsletter_bg_color}}">
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
              <tbody>
                <tr>
                  <td class="newsletterBottom35px"></td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td align="center" style="background-color:{{Newsletter_bg_color}}">
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%">
              <tbody>
                <tr>
                  <td align="center">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                      <tbody>
                        <tr>
                          <td>
                            <a href="{{origin}}/content{{Banner_href_2}}{{utm}}{{id}}"><img alt="" loading="lazy" src="{{picture_server_url}}{{slug}}{{Campaign_src_2}}_mb.png?ver=4" style="vertical-align: middle; max-width: 100%" /></a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
            <td style="background-color:{{Timer_bg_color}};color:{{Timer_color}};">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tbody>
                  <tr>
                    <td class="newsletterBottom20px"></td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td align="center" style="background-color:{{Timer_bg_color}}">
              <a href="{{origin}}/content{{Timer_href}}{{utm}}{{id}}"><img alt="Timer gif" loading="lazy" src="{{Timer_src}}" style="vertical-align: middle; max-width: 100%" /></a>
            </td>
          </tr>
          <tr>
            <td style="background-color:{{Timer_bg_color}}">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tbody>
                  <tr>
                    <td class="newsletterBottom20px"></td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td align="center" style="background-color:{{Timer_bg_color}}">
              <a href="{{origin}}/content{{Timer_href}}{{utm}}{{id}}"><img alt="Freebies picture" loading="lazy" src="{{picture_server_url}}{{Timer_freebie_src}}free.png?ver=4" style="vertical-align: middle; max-width: 100%" /></a>
            </td>
          </tr>
        <tr>
          <td style="background-color:{{Newsletter_bg_color}}">
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
              <tbody>
                <tr>
                  <td class="newsletterBottom35px"></td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td align="center" style="background-color:{{Newsletter_bg_color}}">
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%">
              <tbody>
                <tr>
                  <td align="center">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                      <tbody>
                        <tr>
                          <td>
                            <a href="{{origin}}/content{{Banner_href_3}}{{utm}}{{id}}"><img alt="" loading="lazy" src="{{picture_server_url}}{{slug}}{{Campaign_src_3}}_mb.png?ver=4" style="vertical-align: middle; max-width: 100%" /></a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td style="background-color:{{Newsletter_bg_color}}">
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
              <tbody>
                <tr>
                  <td class="newsletterBottom35px"></td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td align="center" style="background-color:{{Newsletter_bg_color}}">
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%">
              <tbody>
                <tr>
                  <td align="center">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                      <tbody>
                        <tr>
                          <td>
                            <a href="{{origin}}/content{{Banner_href_4}}{{utm}}{{id}}"><img alt="" loading="lazy" src="{{picture_server_url}}{{slug}}{{Campaign_src_4}}_mb.png?ver=4" style="vertical-align: middle; max-width: 100%" /></a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td style="background-color:{{Newsletter_bg_color}}">
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
              <tbody>
                <tr>
                  <td class="newsletterBottom80px"></td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
    {{{services_banner}}} {{{footer_categories}}} {{{klarna}}} {{{socials}}} {{{advantages}}}
    <table align="center" border="0" cellpadding="0" cellspacing="0" class="newsletterContainer" style="max-width: 650px; width: 100%; background-color: #ffffff" width="650">
      <tbody>
        <tr>
          <td><img alt="" loading="lazy" src="https://beliani.info/newsletter/2022/line.jpg" style="display: block; max-width: 100%" /></td>
        </tr>
        <tr>
          <td align="left" class="newsletterTopBottomContainer"><span class="newsletterConditions" style="color: #000000">{{Conditions_title}} {{Conditions_description}} {{{Conditions_unsubscribe}}} </span></td>
        </tr>
      </tbody>
    </table>
    {{{company_details}}}
  </body>
</html>
`,
  },
  {
    title: "Sunday NS NO Timer:",
    description: "Header\n4 categories\nWithout Timer\nWithout CTA's\nFooter",
    is_active: true,
    fallback: {
      Newsletter_bg_color: "#fbf5f5",

      Top_image_src: "https://beliani.info/newsletter/2022/uk240150_01.jpg",

      Campaign_src_1: 20250120,
      Campaign_src_2: 20250122,
      Campaign_src_3: 20250123,
      Campaign_src_4: 20250124,
      Banner_href_1: "/lp25-01-20",
      Banner_href_2: "/lp25-01-22",
      Banner_href_3: "/lp25-01-23",
      Banner_href_4: "/lp25-01-24",

      Conditions_title: "Conditions title",
      Conditions_description: "Condition description",
      Conditions_unsubscribe: "Conditions unsubscribe",
    },
    html: `<!DOCTYPE html PUBLIC"-//W3C//DTD XHTML 1.0 Transitional//EN""http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml">
  <head>
    <title>Beliani</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="x-apple-disable-message-reformatting" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, user-scalable=yes"
    />
    <meta name="color-scheme" content="light only" />
    <meta name="supported-color-schemes" content="light only" />
    <link
      href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700&amp;subset=cyrillic-ext,latin-ext"
    />
    <style>
      table,
      td {
        mso-table-lspace: 0pt;
        mso-table-rspace: 0pt;
      }
      img {
        -ms-interpolation-mode: bicubic;
      }
      .title-advantages {
        text-align: center;
        font-size: 11px;
        color: #8c8278;
        padding-bottom: 10px;
        padding-top: 10px;
        margin: 0;
      }
      .title-advantages-item {
        margin-left: 4px;
      }
      .newsletterRecommendationHeader {
        text-align: center;
        font-size: 11px;
        color: #8c8278;
        margin-bottom: 10px;
        margin-top: 10px;
      }
      .newsletterFreebieContainer {
        padding-left: 10px;
      }
      .newsletterBottom80px {
        padding-bottom: 80px;
      }
      .newsletterBottom10px {
        padding-bottom: 10px;
      }
      .newsletterContainer {
        padding-left: 20px;
        padding-right: 20px;
      }
      .newsletterCta {
        font-size: 20px;
        line-height: 1.2;
        font-family: "Open Sans", sans-serif;
      }
      .newsletterCode {
        font-size: 20px;
        line-height: 1.2;
        font-family: "Open Sans", sans-serif;
      }
      .newsletterBottom20px {
        padding-bottom: 20px;
      }
      .newsletterBottom35px {
        padding-bottom: 35px;
      }
      .newsletterBottom60px {
        padding-bottom: 60px;
      }
      .newsletterParagraph {
        font-size: 18px;
        font-family: "Open Sans", sans-serif;
        line-height: 1.2;
      }
      .newsletterTitleOfferPart {
        font-size: 30px;
        font-family: "Open Sans", sans-serif;
        line-height: 1.2;
      }
      .newsletterTitle {
        font-size: 30px;
        font-family: "Open Sans", sans-serif;
        line-height: 1.2;
      }
      .newsletterProductTitle {
        font-size: 20px;
        font-family: "Open Sans", sans-serif;
        line-height: 1.2;
      }
      .newsletterProductLowPrice {
        font-size: 18px;
        font-family: "Open Sans", sans-serif;
        line-height: 1.2;
        font-weight: 600;
      }
      .newsletterProductHightPrice {
        font-size: 14px;
        font-family: "Open Sans", sans-serif;
        line-height: 1.2;
        text-decoration: line-through;
      }
      .newsletterRight10px {
        padding-right: 10px;
      }
      .newsletterLeft10px {
        padding-left: 10px;
      }
      .newsletterFooter {
        padding-left: 20px !important;
        padding-right: 20px !important;
      }
      .newsletterConditions {
        color: black;
        font-family: "Open Sans", sans-serif;
        font-size: 8px;
      }
      .newsletterFooterCompanyDetails {
        vertical-align: middle;
        padding-top: 20px;
        padding-right: 0px;
        padding-bottom: 20px;
        font-size: 11px;
        font-family: "Open Sans", sans-serif !important;
        color: #000000;
        background: #ececec;
        width: 100%;
      }
      .newsletterFooterTitle {
        text-align: left;
        color: #000000;
        font-family: "Open Sans", sans-serif;
        font-size: 20px;
      }
      .newsletterProductTitleFreebie {
        text-align: center;
        font-family: "Open Sans", sans-serif;
        font-size: 20px;
      }
      .newsletterFooterCategoryLEFT {
        padding-bottom: 20px !important;
        padding-right: 10px !important;
      }
      .newsletterFooterCategoryRIGHT {
        padding-bottom: 20px !important;
        padding-left: 10px !important;
      }
      .newsletterFooterCategoryLEFTBottom {
        padding-right: 10px !important;
      }
      .newsletterFooterCategoryRIGHTBottom {
        padding-left: 10px !important;
      }
      .newsletterSocialIcon {
        padding-left: 25px !important;
      }
      .newsletterTopBottomContainer {
        padding-top: 35px !important;
        padding-bottom: 35px !important;
      }
      .newsletterKlarnaBannerContainer {
        padding-top: 35px !important;
        padding-bottom: 35px !important;
      }
      @media screen and (max-width: 768px) {
        .newsletterFooterCategoryLEFTBottom {
          padding-right: 5px !important;
        }
        .newsletterFooterCategoryRIGHTBottom {
          padding-left: 5px !important;
        }
        .newsletterFooterCategoryLEFT {
          padding-bottom: 10px !important;
          padding-right: 5px !important;
        }
        .newsletterFooterCategoryRIGHT {
          padding-bottom: 10px !important;
          padding-left: 5px !important;
        }
        .newsletterSocialIcon {
          padding-left: 13px !important;
        }
        .newsletterTopBottomContainer {
          padding-top: 20px !important;
          padding-bottom: 20px !important;
        }
        .newsletterFooterTitle {
          font-size: 18px;
        }
        .newsletterProductTitleFreebie {
          font-size: 18px;
        }
        .newsletterProductTitle {
          font-size: 18px;
        }
        .newsletterProductLowPrice {
          font-size: 16px;
        }
        .newsletterProductHightPrice {
          display: block;
        }
        .newsletterProductTitleContainer {
          padding-top: 10px;
        }
        .newsletterTitle {
          font-size: 25px;
        }
        .newsletterTitleOfferPart {
          font-size: 25px;
        }
        .newsletterContainer {
          padding-left: 10px;
          padding-right: 10px;
        }
        .newsletterFreebieContainer {
          padding-left: 10px;
          padding-right: 0px !important;
        }
        .newsletterBottom35px {
          padding-bottom: 20px;
        }
        .newsletterBottom60px {
          padding-bottom: 40px;
        }
        .newsletterParagraph {
          font-size: 16px;
        }
        .newsletterLeft10px {
          padding-left: 5px;
        }
        .newsletterRight10px {
          padding-right: 5px;
        }
        .newsletterBottom20px {
          padding-bottom: 10px;
        }
        .newsletterBottom80px {
          padding-bottom: 50px;
        }
      }
      @media screen and (max-width: 570px) {
        .newsletterProductTitleFreebie {
          font-size: 16px;
        }
      }
      @media screen and (max-width: 460px) {
        .newsletterProductTitleFreebie {
          font-size: 14px;
        }
      }
      @media screen and (max-width: 370px) {
        .newsletterProductTitleFreebie {
          font-size: 12px;
        }
      }
    </style>
  </head>
  <body aria-readonly="false" class="body" style="width: 100% !important; padding: 0 !important; margin: 0 auto !important; font-family: 'Open Sans', sans-serif !important; font-size: 13px; color: #000000; text-align: left; background-color: #ececec;" width="100%">
    {{{header}}}
    <table align="center" border="0" cellpadding="0" cellspacing="0" id="newsletter" style="max-width:650px;width:100%; background-color:{{Newsletter_bg_color}}; color:#000;" width="100%">
      <tbody>
        <tr>
          <td align="center">
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
              <tbody>
                <tr>
                  <td>
                    <a href="{{origin}}{{utm}}{{id}}"
                      ><img
                        alt=""
                        loading="lazy"
                        src="{{Top_image_src}}"
                        style="vertical-align: middle; max-width: 100%"
                    /></a>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td align="center" style="background-color:{{Newsletter_bg_color}}">
            <table
              align="center"
              border="0"
              cellpadding="0"
              cellspacing="0"
              width="100%"
            >
              <tbody>
                <tr>
                  <td align="center">
                    <table
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      width="100%"
                    >
                      <tbody>
                        <tr>
                          <td>
                            <a
                              href="{{origin}}/content{{Banner_href_1}}{{utm}}{{id}}"
                              ><img
                                alt=""
                                loading="lazy"
                                src="{{picture_server_url}}{{slug}}{{Campaign_src_1}}_mb.png?ver=4"
                                style="vertical-align: middle; max-width: 100%"
                            /></a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td style="background-color:{{Newsletter_bg_color}}">
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
              <tbody>
                <tr>
                  <td class="newsletterBottom35px"></td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td align="center" style="background-color:{{Newsletter_bg_color}}">
            <table
              align="center"
              border="0"
              cellpadding="0"
              cellspacing="0"
              width="100%"
            >
              <tbody>
                <tr>
                  <td align="center">
                    <table
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      width="100%"
                    >
                      <tbody>
                        <tr>
                          <td>
                            <a
                              href="{{origin}}/content{{Banner_href_2}}{{utm}}{{id}}"
                              ><img
                                alt=""
                                loading="lazy"
                                src="{{picture_server_url}}{{slug}}{{Campaign_src_2}}_mb.png?ver=4"
                                style="vertical-align: middle; max-width: 100%"
                            /></a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td style="background-color:{{Newsletter_bg_color}}">
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
              <tbody>
                <tr>
                  <td class="newsletterBottom35px"></td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td align="center" style="background-color:{{Newsletter_bg_color}}">
            <table
              align="center"
              border="0"
              cellpadding="0"
              cellspacing="0"
              width="100%"
            >
              <tbody>
                <tr>
                  <td align="center">
                    <table
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      width="100%"
                    >
                      <tbody>
                        <tr>
                          <td>
                            <a
                              href="{{origin}}/content{{Banner_href_3}}{{utm}}{{id}}"
                              ><img
                                alt=""
                                loading="lazy"
                                src="{{picture_server_url}}{{slug}}{{Campaign_src_3}}_mb.png?ver=4"
                                style="vertical-align: middle; max-width: 100%"
                            /></a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td style="background-color:{{Newsletter_bg_color}}">
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
              <tbody>
                <tr>
                  <td class="newsletterBottom35px"></td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td align="center" style="background-color:{{Newsletter_bg_color}}">
            <table
              align="center"
              border="0"
              cellpadding="0"
              cellspacing="0"
              width="100%"
            >
              <tbody>
                <tr>
                  <td align="center">
                    <table
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      width="100%"
                    >
                      <tbody>
                        <tr>
                          <td>
                            <a
                              href="{{origin}}/content{{Banner_href_4}}{{utm}}{{id}}"
                              ><img
                                alt=""
                                loading="lazy"
                                src="{{picture_server_url}}{{slug}}{{Campaign_src_4}}_mb.png?ver=4"
                                style="vertical-align: middle; max-width: 100%"
                            /></a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td style="background-color:{{Newsletter_bg_color}}">
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
              <tbody>
                <tr>
                  <td class="newsletterBottom80px"></td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
    
      {{{services_banner}}} {{{footer_categories}}} {{{klarna}}} {{{socials}}}
      {{{advantages}}}
    
    <table
      align="center"
      border="0"
      cellpadding="0"
      cellspacing="0"
      class="newsletterContainer"
      style="max-width: 650px; width: 100%; background-color: #ffffff"
      width="650"
    >
      <tbody>
        <tr>
          <td>
            <img
              alt=""
              loading="lazy"
              src="https://beliani.info/newsletter/2022/line.jpg"
              style="display: block; max-width: 100%"
            />
          </td>
        </tr>
        <tr>
          <td align="left" class="newsletterTopBottomContainer">
            <span class="newsletterConditions" style="color: #000000"
              >{{Conditions_title}} {{Conditions_description}}
              {{{Conditions_unsubscribe}}}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
    {{{company_details}}}
  </body>
</html>
`,
  },
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
      Conditions_unsubscribe: "Conditions unsubscribe",
    },
    html: `<!DOCTYPE html PUBLIC"-//W3C//DTD XHTML 1.0 Transitional//EN""http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html
      xmlns="http://www.w3.org/1999/xhtml"
      xmlns:o="urn:schemas-microsoft-com:office:office"
      xmlns:v="urn:schemas-microsoft-com:vml"
    >
      <head>
        <title>Beliani</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="x-apple-disable-message-reformatting" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, user-scalable=yes"
        />
        <meta name="color-scheme" content="light only" />
        <meta name="supported-color-schemes" content="light only" />
        <link
          href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700&amp;subset=cyrillic-ext,latin-ext"
        />
        <style>
          table,
          td {
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
          }
          img {
            -ms-interpolation-mode: bicubic;
          }
          .title-advantages {
            text-align: center;
            font-size: 11px;
            color: #8c8278;
            padding-bottom: 10px;
            padding-top: 10px;
            margin: 0;
          }
          .title-advantages-item {
            margin-left: 4px;
          }
          .newsletterRecommendationHeader {
            text-align: center;
            font-size: 11px;
            color: #8c8278;
            margin-bottom: 10px;
            margin-top: 10px;
          }
          .newsletterFreebieContainer {
            padding-left: 10px;
          }
          .newsletterBottom80px {
            padding-bottom: 80px;
          }
          .newsletterBottom10px {
            padding-bottom: 10px;
          }
          .newsletterContainer {
            padding-left: 20px;
            padding-right: 20px;
          }
          .newsletterCta {
            font-size: 20px;
            line-height: 1.2;
            font-family: "Open Sans", sans-serif;
          }
          .newsletterCode {
            font-size: 20px;
            line-height: 1.2;
            font-family: "Open Sans", sans-serif;
          }
          .newsletterBottom20px {
            padding-bottom: 20px;
          }
          .newsletterBottom35px {
            padding-bottom: 35px;
          }
          .newsletterBottom60px {
            padding-bottom: 60px;
          }
          .newsletterParagraph {
            font-size: 18px;
            font-family: "Open Sans", sans-serif;
            line-height: 1.2;
          }
          .newsletterTitleOfferPart {
            font-size: 30px;
            font-family: "Open Sans", sans-serif;
            line-height: 1.2;
          }
          .newsletterTitle {
            font-size: 30px;
            font-family: "Open Sans", sans-serif;
            line-height: 1.2;
          }
          .newsletterProductTitle {
            font-size: 20px;
            font-family: "Open Sans", sans-serif;
            line-height: 1.2;
          }
          .newsletterProductLowPrice {
            font-size: 18px;
            font-family: "Open Sans", sans-serif;
            line-height: 1.2;
            font-weight: 600;
          }
          .newsletterProductHightPrice {
            font-size: 14px;
            font-family: "Open Sans", sans-serif;
            line-height: 1.2;
            text-decoration: line-through;
          }
          .newsletterRight10px {
            padding-right: 10px;
          }
          .newsletterLeft10px {
            padding-left: 10px;
          }
          .newsletterFooter {
            padding-left: 20px !important;
            padding-right: 20px !important;
          }
          .newsletterConditions {
            color: black;
            font-family: "Open Sans", sans-serif;
            font-size: 8px;
          }
          .newsletterFooterCompanyDetails {
            vertical-align: middle;
            padding-top: 20px;
            padding-right: 0px;
            padding-bottom: 20px;
            font-size: 11px;
            font-family: "Open Sans", sans-serif !important;
            color: #000000;
            background: #ececec;
            width: 100%;
          }
          .newsletterFooterTitle {
            text-align: left;
            color: #000000;
            font-family: "Open Sans", sans-serif;
            font-size: 20px;
          }
          .newsletterProductTitleFreebie {
            text-align: center;
            font-family: "Open Sans", sans-serif;
            font-size: 20px;
          }
          .newsletterFooterCategoryLEFT {
            padding-bottom: 20px !important;
            padding-right: 10px !important;
          }
          .newsletterFooterCategoryRIGHT {
            padding-bottom: 20px !important;
            padding-left: 10px !important;
          }
          .newsletterFooterCategoryLEFTBottom {
            padding-right: 10px !important;
          }
          .newsletterFooterCategoryRIGHTBottom {
            padding-left: 10px !important;
          }
          .newsletterSocialIcon {
            padding-left: 25px !important;
          }
          .newsletterTopBottomContainer {
            padding-top: 35px !important;
            padding-bottom: 35px !important;
          }
          .newsletterKlarnaBannerContainer {
            padding-top: 35px !important;
            padding-bottom: 35px !important;
          }
          @media screen and (max-width: 768px) {
            .newsletterFooterCategoryLEFTBottom {
              padding-right: 5px !important;
            }
            .newsletterFooterCategoryRIGHTBottom {
              padding-left: 5px !important;
            }
            .newsletterFooterCategoryLEFT {
              padding-bottom: 10px !important;
              padding-right: 5px !important;
            }
            .newsletterFooterCategoryRIGHT {
              padding-bottom: 10px !important;
              padding-left: 5px !important;
            }
            .newsletterSocialIcon {
              padding-left: 13px !important;
            }
            .newsletterTopBottomContainer {
              padding-top: 20px !important;
              padding-bottom: 20px !important;
            }
            .newsletterFooterTitle {
              font-size: 18px;
            }
            .newsletterProductTitleFreebie {
              font-size: 18px;
            }
            .newsletterProductTitle {
              font-size: 18px;
            }
            .newsletterProductLowPrice {
              font-size: 16px;
            }
            .newsletterProductHightPrice {
              display: block;
            }
            .newsletterProductTitleContainer {
              padding-top: 10px;
            }
            .newsletterTitle {
              font-size: 25px;
            }
            .newsletterTitleOfferPart {
              font-size: 25px;
            }
            .newsletterContainer {
              padding-left: 10px;
              padding-right: 10px;
            }
            .newsletterFreebieContainer {
              padding-left: 10px;
              padding-right: 0px !important;
            }
            .newsletterBottom35px {
              padding-bottom: 20px;
            }
            .newsletterBottom60px {
              padding-bottom: 40px;
            }
            .newsletterParagraph {
              font-size: 16px;
            }
            .newsletterLeft10px {
              padding-left: 5px;
            }
            .newsletterRight10px {
              padding-right: 5px;
            }
            .newsletterBottom20px {
              padding-bottom: 10px;
            }
            .newsletterBottom80px {
              padding-bottom: 50px;
            }
          }
          @media screen and (max-width: 570px) {
            .newsletterProductTitleFreebie {
              font-size: 16px;
            }
          }
          @media screen and (max-width: 460px) {
            .newsletterProductTitleFreebie {
              font-size: 14px;
            }
          }
          @media screen and (max-width: 370px) {
            .newsletterProductTitleFreebie {
              font-size: 12px;
            }
          }
        </style>
      </head>
      <body
        aria-readonly="false"
        class="body"
        style="
          width: 100% !important;
          padding: 0 !important;
          margin: 0 auto !important;
          font-family: 'Open Sans', sans-serif !important;
          font-size: 13px;
          color: #000000;
          text-align: left;
          background-color: #ececec;
        "
        width="100%"
      >
        {{{header}}}
        <table
          align="center"
          border="0"
          cellpadding="0"
          cellspacing="0"
          id="newsletter"
          style="max-width:650px;width:100%;background-color:{{Newsletter_bg_color}};color:#000"
          width="100%"
        >
          <tbody>
            <tr>
              <td align="center">
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                  <tbody>
                    <tr>
                      <td>
                        <a href="{{origin}}{{utm}}{{id}}"
                          ><img
                            alt=""
                            loading="lazy"
                            src="{{Top_image_src}}"
                            style="vertical-align: middle; max-width: 100%"
                        /></a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td align="center" style="background-color:{{Newsletter_bg_color}}">
                <table
                  align="center"
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  width="100%"
                >
                  <tbody>
                    <tr>
                      <td align="center">
                        <table
                          border="0"
                          cellpadding="0"
                          cellspacing="0"
                          width="100%"
                        >
                          <tbody>
                            <tr>
                              <td>
                                <a
                                  href="{{origin}}/content{{Banner_href_1}}{{utm}}{{id}}"
                                  ><img
                                    alt=""
                                    loading="lazy"
                                    src="{{picture_server_url}}{{slug}}{{Campaign_src_1}}_mb.png?ver=3"
                                    style="vertical-align: middle; max-width: 100%"
                                /></a>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td
                style="background-color:{{Timer_bg_color}};color:{{Timer_color}};"
              >
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                  <tbody>
                    <tr>
                      <td class="newsletterBottom20px"></td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td align="center" style="background-color:{{Timer_bg_color}}">
                <a href="{{origin}}/content{{Timer_href}}{{utm}}{{id}}"
                  ><img
                    alt="Timer gif"
                    loading="lazy"
                    src="{{Timer_src}}"
                    style="vertical-align: middle; max-width: 100%"
                /></a>
              </td>
            </tr>
            <tr>
              <td style="background-color:{{Timer_bg_color}}">
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                  <tbody>
                    <tr>
                      <td class="newsletterBottom20px"></td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td style="background-color:{{Newsletter_bg_color}}">
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                  <tbody>
                    <tr>
                      <td class="newsletterBottom35px"></td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td align="center" style="background-color:{{Newsletter_bg_color}}">
                <table
                  align="center"
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  width="100%"
                >
                  <tbody>
                    <tr>
                      <td align="center">
                        <table
                          border="0"
                          cellpadding="0"
                          cellspacing="0"
                          width="100%"
                        >
                          <tbody>
                            <tr>
                              <td>
                                <a
                                  href="{{origin}}/content{{Banner_href_2}}{{utm}}{{id}}"
                                  ><img
                                    alt=""
                                    loading="lazy"
                                    src="{{picture_server_url}}{{slug}}{{Campaign_src_2}}_mb.png?ver=4"
                                    style="vertical-align: middle; max-width: 100%"
                                /></a>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td style="background-color:{{Newsletter_bg_color}}">
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                  <tbody>
                    <tr>
                      <td class="newsletterBottom35px"></td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td align="center" style="background-color:{{Newsletter_bg_color}}">
                <table
                  align="center"
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  width="100%"
                >
                  <tbody>
                    <tr>
                      <td align="center">
                        <table
                          border="0"
                          cellpadding="0"
                          cellspacing="0"
                          width="100%"
                        >
                          <tbody>
                            <tr>
                              <td>
                                <a
                                  href="{{origin}}/content{{Banner_href_3}}{{utm}}{{id}}"
                                  ><img
                                    alt=""
                                    loading="lazy"
                                    src="{{picture_server_url}}{{slug}}{{Campaign_src_3}}_mb.png?ver=4"
                                    style="vertical-align: middle; max-width: 100%"
                                /></a>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td style="background-color:{{Newsletter_bg_color}}">
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                  <tbody>
                    <tr>
                      <td class="newsletterBottom80px"></td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
          {{{services_banner}}} {{{footer_categories}}} {{{klarna}}} {{{socials}}}
          {{{advantages}}}
        <table
          align="center"
          border="0"
          cellpadding="0"
          cellspacing="0"
          class="newsletterContainer"
          style="max-width: 650px; width: 100%; background-color: #ffffff"
          width="650"
        >
          <tbody>
            <tr>
              <td>
                <img
                  alt=""
                  loading="lazy"
                  src="https://beliani.info/newsletter/2022/line.jpg"
                  style="display: block; max-width: 100%"
                />
              </td>
            </tr>
            <tr>
              <td align="left" class="newsletterTopBottomContainer">
                <span class="newsletterConditions" style="color: #000000"
                  >{{Conditions_title}} {{Conditions_description}}
                  {{{Conditions_unsubscribe}}}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
        {{{company_details}}}
      </body>
      <div style="all: initial"></div>
    </html>
    `,
  },
  {
    title: "Sunday NS with:",
    description: "Header\nTimer \n4 categories \nWithout CTA's\nFooter",
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
      Campaign_src_4: 20241023,
      Banner_href_1: "/lp24-10-25",
      Banner_href_2: "/lp24-10-23",
      Banner_href_3: "/lp24-10-24",
      Banner_href_4: "/lp24-10-23",

      Conditions_title: "Conditions title",
      Conditions_description: "Condition description",
      Conditions_unsubscribe: "Conditions unsubscribe",
    },
    html: '<!DOCTYPE html PUBLIC"-//W3C//DTD XHTML 1.0 Transitional//EN""http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">\n<html\n  xmlns="http://www.w3.org/1999/xhtml"\n  xmlns:o="urn:schemas-microsoft-com:office:office"\n  xmlns:v="urn:schemas-microsoft-com:vml"\n>\n  <head>\n    <title>Beliani</title>\n    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />\n    <meta name="x-apple-disable-message-reformatting" />\n    <meta\n      name="viewport"\n      content="width=device-width, initial-scale=1, user-scalable=yes"\n    />\n    <meta name="color-scheme" content="light only" />\n    <meta name="supported-color-schemes" content="light only" />\n    <link\n      href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700&amp;subset=cyrillic-ext,latin-ext"\n    />\n    <style>\n      table,\n      td {\n        mso-table-lspace: 0pt;\n        mso-table-rspace: 0pt;\n      }\n      img {\n        -ms-interpolation-mode: bicubic;\n      }\n      .title-advantages {\n        text-align: center;\n        font-size: 11px;\n        color: #8c8278;\n        padding-bottom: 10px;\n        padding-top: 10px;\n        margin: 0;\n      }\n      .title-advantages-item {\n        margin-left: 4px;\n      }\n      .newsletterRecommendationHeader {\n        text-align: center;\n        font-size: 11px;\n        color: #8c8278;\n        margin-bottom: 10px;\n        margin-top: 10px;\n      }\n      .newsletterFreebieContainer {\n        padding-left: 10px;\n      }\n      .newsletterBottom80px {\n        padding-bottom: 80px;\n      }\n      .newsletterBottom10px {\n        padding-bottom: 10px;\n      }\n      .newsletterContainer {\n        padding-left: 20px;\n        padding-right: 20px;\n      }\n      .newsletterCta {\n        font-size: 20px;\n        line-height: 1.2;\n        font-family: "Open Sans", sans-serif;\n      }\n      .newsletterCode {\n        font-size: 20px;\n        line-height: 1.2;\n        font-family: "Open Sans", sans-serif;\n      }\n      .newsletterBottom20px {\n        padding-bottom: 20px;\n      }\n      .newsletterBottom35px {\n        padding-bottom: 35px;\n      }\n      .newsletterBottom60px {\n        padding-bottom: 60px;\n      }\n      .newsletterParagraph {\n        font-size: 18px;\n        font-family: "Open Sans", sans-serif;\n        line-height: 1.2;\n      }\n      .newsletterTitleOfferPart {\n        font-size: 30px;\n        font-family: "Open Sans", sans-serif;\n        line-height: 1.2;\n      }\n      .newsletterTitle {\n        font-size: 30px;\n        font-family: "Open Sans", sans-serif;\n        line-height: 1.2;\n      }\n      .newsletterProductTitle {\n        font-size: 20px;\n        font-family: "Open Sans", sans-serif;\n        line-height: 1.2;\n      }\n      .newsletterProductLowPrice {\n        font-size: 18px;\n        font-family: "Open Sans", sans-serif;\n        line-height: 1.2;\n        font-weight: 600;\n      }\n      .newsletterProductHightPrice {\n        font-size: 14px;\n        font-family: "Open Sans", sans-serif;\n        line-height: 1.2;\n        text-decoration: line-through;\n      }\n      .newsletterRight10px {\n        padding-right: 10px;\n      }\n      .newsletterLeft10px {\n        padding-left: 10px;\n      }\n      .newsletterFooter {\n        padding-left: 20px !important;\n        padding-right: 20px !important;\n      }\n      .newsletterConditions {\n        color: black;\n        font-family: "Open Sans", sans-serif;\n        font-size: 8px;\n      }\n      .newsletterFooterCompanyDetails {\n        vertical-align: middle;\n        padding-top: 20px;\n        padding-right: 0px;\n        padding-bottom: 20px;\n        font-size: 11px;\n        font-family: "Open Sans", sans-serif !important;\n        color: #000000;\n        background: #ececec;\n        width: 100%;\n      }\n      .newsletterFooterTitle {\n        text-align: left;\n        color: #000000;\n        font-family: "Open Sans", sans-serif;\n        font-size: 20px;\n      }\n      .newsletterProductTitleFreebie {\n        text-align: center;\n        font-family: "Open Sans", sans-serif;\n        font-size: 20px;\n      }\n      .newsletterFooterCategoryLEFT {\n        padding-bottom: 20px !important;\n        padding-right: 10px !important;\n      }\n      .newsletterFooterCategoryRIGHT {\n        padding-bottom: 20px !important;\n        padding-left: 10px !important;\n      }\n      .newsletterFooterCategoryLEFTBottom {\n        padding-right: 10px !important;\n      }\n      .newsletterFooterCategoryRIGHTBottom {\n        padding-left: 10px !important;\n      }\n      .newsletterSocialIcon {\n        padding-left: 25px !important;\n      }\n      .newsletterTopBottomContainer {\n        padding-top: 35px !important;\n        padding-bottom: 35px !important;\n      }\n      .newsletterKlarnaBannerContainer {\n        padding-top: 35px !important;\n        padding-bottom: 35px !important;\n      }\n      @media screen and (max-width: 768px) {\n        .newsletterFooterCategoryLEFTBottom {\n          padding-right: 5px !important;\n        }\n        .newsletterFooterCategoryRIGHTBottom {\n          padding-left: 5px !important;\n        }\n        .newsletterFooterCategoryLEFT {\n          padding-bottom: 10px !important;\n          padding-right: 5px !important;\n        }\n        .newsletterFooterCategoryRIGHT {\n          padding-bottom: 10px !important;\n          padding-left: 5px !important;\n        }\n        .newsletterSocialIcon {\n          padding-left: 13px !important;\n        }\n        .newsletterTopBottomContainer {\n          padding-top: 20px !important;\n          padding-bottom: 20px !important;\n        }\n        .newsletterFooterTitle {\n          font-size: 18px;\n        }\n        .newsletterProductTitleFreebie {\n          font-size: 18px;\n        }\n        .newsletterProductTitle {\n          font-size: 18px;\n        }\n        .newsletterProductLowPrice {\n          font-size: 16px;\n        }\n        .newsletterProductHightPrice {\n          display: block;\n        }\n        .newsletterProductTitleContainer {\n          padding-top: 10px;\n        }\n        .newsletterTitle {\n          font-size: 25px;\n        }\n        .newsletterTitleOfferPart {\n          font-size: 25px;\n        }\n        .newsletterContainer {\n          padding-left: 10px;\n          padding-right: 10px;\n        }\n        .newsletterFreebieContainer {\n          padding-left: 10px;\n          padding-right: 0px !important;\n        }\n        .newsletterBottom35px {\n          padding-bottom: 20px;\n        }\n        .newsletterBottom60px {\n          padding-bottom: 40px;\n        }\n        .newsletterParagraph {\n          font-size: 16px;\n        }\n        .newsletterLeft10px {\n          padding-left: 5px;\n        }\n        .newsletterRight10px {\n          padding-right: 5px;\n        }\n        .newsletterBottom20px {\n          padding-bottom: 10px;\n        }\n        .newsletterBottom80px {\n          padding-bottom: 50px;\n        }\n      }\n      @media screen and (max-width: 570px) {\n        .newsletterProductTitleFreebie {\n          font-size: 16px;\n        }\n      }\n      @media screen and (max-width: 460px) {\n        .newsletterProductTitleFreebie {\n          font-size: 14px;\n        }\n      }\n      @media screen and (max-width: 370px) {\n        .newsletterProductTitleFreebie {\n          font-size: 12px;\n        }\n      }\n    </style>\n  </head>\n  <body\n    class="body"\n    style="\n      width: 100% !important;\n      padding: 0 !important;\n      margin: 0 auto !important;\n      font-family: \'Open Sans\', sans-serif !important;\n      font-size: 13px;\n      color: #000000;\n      text-align: left;\n      background-color: #ececec;\n    "\n    width="100%"\n  >\n    {{{header}}}\n    <table\n      align="center"\n      border="0"\n      cellpadding="0"\n      cellspacing="0"\n      id="newsletter"\n      style="max-width:650px;width:100%;background-color:{{Newsletter_bg_color}};color:#000"\n      width="100%"\n    >\n      <tbody>\n        <tr>\n          <td align="center">\n            <table border="0" cellpadding="0" cellspacing="0" width="100%">\n              <tbody>\n                <tr>\n                  <td>\n                    <a href="{{origin}}{{utm}}{{id}}"\n                      ><img\n                        alt=""\n                        loading="lazy"\n                        src="{{Top_image_src}}"\n                        style="vertical-align: middle; max-width: 100%"\n                    /></a>\n                  </td>\n                </tr>\n              </tbody>\n            </table>\n          </td>\n        </tr>\n        <tr>\n          <td align="center" style="background-color:{{Newsletter_bg_color}}">\n            <table\n              align="center"\n              border="0"\n              cellpadding="0"\n              cellspacing="0"\n              width="100%"\n            >\n              <tbody>\n                <tr>\n                  <td align="center">\n                    <table\n                      border="0"\n                      cellpadding="0"\n                      cellspacing="0"\n                      width="100%"\n                    >\n                      <tbody>\n                        <tr>\n                          <td>\n                            <a href="{{origin}}/content{{Banner_href_1}}{{utm}}{{id}}"\n                              ><img\n                                alt=""\n                                loading="lazy"\n                                src="{{picture_server_url}}{{slug}}{{Campaign_src_1}}_mb.png?ver=4"\n                                style="vertical-align: middle; max-width: 100%"\n                            /></a>\n                          </td>\n                        </tr>\n                      </tbody>\n                    </table>\n                  </td>\n                </tr>\n              </tbody>\n            </table>\n          </td>\n        </tr>\n        <tr>\n          <td style="background-color:{{Timer_bg_color}}; color: {{Timer_color}};">\n            <table border="0" cellpadding="0" cellspacing="0" width="100%">\n              <tbody>\n                <tr>\n                  <td class="newsletterBottom20px"></td>\n                </tr>\n              </tbody>\n            </table>\n          </td>\n        </tr>\n        <tr>\n          <td align="center" style="background-color:{{Timer_bg_color}}">\n            <a href="{{origin}}/content{{Timer_href}}{{utm}}{{id}}"\n              ><img\n                alt="Timer gif"\n                loading="lazy"\n                src="{{Timer_src}}"\n                style="vertical-align: middle; max-width: 100%"\n            /></a>\n          </td>\n        </tr>\n        <tr>\n          <td style="background-color:{{Timer_bg_color}}">\n            <table border="0" cellpadding="0" cellspacing="0" width="100%">\n              <tbody>\n                <tr>\n                  <td class="newsletterBottom20px"></td>\n                </tr>\n              </tbody>\n            </table>\n          </td>\n        </tr>\n        <tr>\n          <td style="background-color:{{Newsletter_bg_color}}">\n            <table border="0" cellpadding="0" cellspacing="0" width="100%">\n              <tbody>\n                <tr>\n                  <td class="newsletterBottom35px"></td>\n                </tr>\n              </tbody>\n            </table>\n          </td>\n        </tr>\n        <tr>\n          <td align="center" style="background-color:{{Newsletter_bg_color}}">\n            <table\n              align="center"\n              border="0"\n              cellpadding="0"\n              cellspacing="0"\n              width="100%"\n            >\n              <tbody>\n                <tr>\n                  <td align="center">\n                    <table\n                      border="0"\n                      cellpadding="0"\n                      cellspacing="0"\n                      width="100%"\n                    >\n                      <tbody>\n                        <tr>\n                          <td>\n                            <a href="{{origin}}/content{{Banner_href_2}}{{utm}}{{id}}"\n                              ><img\n                                alt=""\n                                loading="lazy"\n                                src="{{picture_server_url}}{{slug}}{{Campaign_src_2}}_mb.png?ver=4"\n                                style="vertical-align: middle; max-width: 100%"\n                            /></a>\n                          </td>\n                        </tr>\n                      </tbody>\n                    </table>\n                  </td>\n                </tr>\n              </tbody>\n            </table>\n          </td>\n        </tr>\n        <tr>\n          <td style="background-color:{{Newsletter_bg_color}}">\n            <table border="0" cellpadding="0" cellspacing="0" width="100%">\n              <tbody>\n                <tr>\n                  <td class="newsletterBottom35px"></td>\n                </tr>\n              </tbody>\n            </table>\n          </td>\n        </tr>\n        <tr>\n          <td align="center" style="background-color:{{Newsletter_bg_color}}">\n            <table\n              align="center"\n              border="0"\n              cellpadding="0"\n              cellspacing="0"\n              width="100%"\n            >\n              <tbody>\n                <tr>\n                  <td align="center">\n                    <table\n                      border="0"\n                      cellpadding="0"\n                      cellspacing="0"\n                      width="100%"\n                    >\n                      <tbody>\n                        <tr>\n                          <td>\n                            <a href="{{origin}}/content{{Banner_href_3}}{{utm}}{{id}}"\n                              ><img\n                                alt=""\n                                loading="lazy"\n                                src="{{picture_server_url}}{{slug}}{{Campaign_src_3}}_mb.png?ver=4"\n                                style="vertical-align: middle; max-width: 100%"\n                            /></a>\n                          </td>\n                        </tr>\n                      </tbody>\n                    </table>\n                  </td>\n                </tr>\n              </tbody>\n            </table>\n          </td>\n        </tr>\n     <tr>\n          <td style="background-color:{{Newsletter_bg_color}}">\n            <table border="0" cellpadding="0" cellspacing="0" width="100%">\n              <tbody>\n                <tr>\n                  <td class="newsletterBottom35px"></td>\n                </tr>\n              </tbody>\n            </table>\n          </td>\n        </tr>\n        <tr>\n          <td align="center" style="background-color:{{Newsletter_bg_color}}">\n            <table\n              align="center"\n              border="0"\n              cellpadding="0"\n              cellspacing="0"\n              width="100%"\n            >\n              <tbody>\n                <tr>\n                  <td align="center">\n                    <table\n                      border="0"\n                      cellpadding="0"\n                      cellspacing="0"\n                      width="100%"\n                    >\n                      <tbody>\n                        <tr>\n                          <td>\n                            <a href="{{origin}}/content{{Banner_href_4}}{{utm}}{{id}}"\n                              ><img\n                                alt=""\n                                loading="lazy"\n                                src="{{picture_server_url}}{{slug}}{{Campaign_src_4}}_mb.png?ver=4"\n                                style="vertical-align: middle; max-width: 100%"\n                            /></a>\n                          </td>\n                        </tr>\n                      </tbody>\n                    </table>\n                  </td>\n                </tr>\n              </tbody>\n            </table>\n          </td>\n        </tr>\n    <tr>\n          <td style="background-color:{{Newsletter_bg_color}}">\n            <table border="0" cellpadding="0" cellspacing="0" width="100%">\n              <tbody>\n                <tr>\n                  <td class="newsletterBottom80px"></td>\n                </tr>\n              </tbody>\n            </table>\n          </td>\n        </tr>\n      </tbody>\n    </table>\n {{{services_banner}}}    {{{footer_categories}}} {{{klarna}}} {{{socials}}} {{{advantages}}}\n    <table\n      align="center"\n      border="0"\n      cellpadding="0"\n      cellspacing="0"\n      class="newsletterContainer"\n      style="max-width: 650px; width: 100%; background-color: #ffffff"\n      width="650"\n    >\n      <tbody>\n        <tr>\n          <td>\n            <img\n              alt=""\n              loading="lazy"\n              src="https://beliani.info/newsletter/2022/line.jpg"\n              style="display: block; max-width: 100%"\n            />\n          </td>\n        </tr>\n        <tr>\n          <td align="left" class="newsletterTopBottomContainer">\n            <span class="newsletterConditions" style="color: #000000"\n              >{{Conditions_title}} {{Conditions_description}} {{{Conditions_unsubscribe}}}\n          </td>\n        </tr>\n      </tbody>\n    </table>\n    {{{company_details}}}\n  </body>\n</html>\n',
  },
  {
    title: "Sunday NS with:",
    description:
      "Header\nTimer + Freebies Pic \n4 categories \nWithout CTA's\nFooter",
    is_active: true,
    fallback: {
      Newsletter_bg_color: "#fbf5f5",
      Timer_bg_color: "#750000",
      Timer_color: "#fff",

      Top_image_src: "https://beliani.info/newsletter/2022/uk240150_01.jpg",

      Timer_href: "/lp24-10-25",
      Timer_src: "https://gen.sendtric.com/countdown/akikmw4bkt",
      Timer_freebie_src: 20241108,

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
    html: '<!DOCTYPE html PUBLIC"-//W3C//DTD XHTML 1.0 Transitional//EN""http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">\n<html\n  xmlns="http://www.w3.org/1999/xhtml"\n  xmlns:o="urn:schemas-microsoft-com:office:office"\n  xmlns:v="urn:schemas-microsoft-com:vml"\n>\n  <head>\n    <title>Beliani</title>\n    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />\n    <meta name="x-apple-disable-message-reformatting" />\n    <meta\n      name="viewport"\n      content="width=device-width, initial-scale=1, user-scalable=yes"\n    />\n    <meta name="color-scheme" content="light only" />\n    <meta name="supported-color-schemes" content="light only" />\n    <link\n      href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700&amp;subset=cyrillic-ext,latin-ext"\n    />\n    <style>\n      table,\n      td {\n        mso-table-lspace: 0pt;\n        mso-table-rspace: 0pt;\n      }\n      img {\n        -ms-interpolation-mode: bicubic;\n      }\n      .title-advantages {\n        text-align: center;\n        font-size: 11px;\n        color: #8c8278;\n        padding-bottom: 10px;\n        padding-top: 10px;\n        margin: 0;\n      }\n      .title-advantages-item {\n        margin-left: 4px;\n      }\n      .newsletterRecommendationHeader {\n        text-align: center;\n        font-size: 11px;\n        color: #8c8278;\n        margin-bottom: 10px;\n        margin-top: 10px;\n      }\n      .newsletterFreebieContainer {\n        padding-left: 10px;\n      }\n      .newsletterBottom80px {\n        padding-bottom: 80px;\n      }\n      .newsletterBottom10px {\n        padding-bottom: 10px;\n      }\n      .newsletterContainer {\n        padding-left: 20px;\n        padding-right: 20px;\n      }\n      .newsletterCta {\n        font-size: 20px;\n        line-height: 1.2;\n        font-family: "Open Sans", sans-serif;\n      }\n      .newsletterCode {\n        font-size: 20px;\n        line-height: 1.2;\n        font-family: "Open Sans", sans-serif;\n      }\n      .newsletterBottom20px {\n        padding-bottom: 20px;\n      }\n      .newsletterBottom35px {\n        padding-bottom: 35px;\n      }\n      .newsletterBottom60px {\n        padding-bottom: 60px;\n      }\n      .newsletterParagraph {\n        font-size: 18px;\n        font-family: "Open Sans", sans-serif;\n        line-height: 1.2;\n      }\n      .newsletterTitleOfferPart {\n        font-size: 30px;\n        font-family: "Open Sans", sans-serif;\n        line-height: 1.2;\n      }\n      .newsletterTitle {\n        font-size: 30px;\n        font-family: "Open Sans", sans-serif;\n        line-height: 1.2;\n      }\n      .newsletterProductTitle {\n        font-size: 20px;\n        font-family: "Open Sans", sans-serif;\n        line-height: 1.2;\n      }\n      .newsletterProductLowPrice {\n        font-size: 18px;\n        font-family: "Open Sans", sans-serif;\n        line-height: 1.2;\n        font-weight: 600;\n      }\n      .newsletterProductHightPrice {\n        font-size: 14px;\n        font-family: "Open Sans", sans-serif;\n        line-height: 1.2;\n        text-decoration: line-through;\n      }\n      .newsletterRight10px {\n        padding-right: 10px;\n      }\n      .newsletterLeft10px {\n        padding-left: 10px;\n      }\n      .newsletterFooter {\n        padding-left: 20px !important;\n        padding-right: 20px !important;\n      }\n      .newsletterConditions {\n        color: black;\n        font-family: "Open Sans", sans-serif;\n        font-size: 8px;\n      }\n      .newsletterFooterCompanyDetails {\n        vertical-align: middle;\n        padding-top: 20px;\n        padding-right: 0px;\n        padding-bottom: 20px;\n        font-size: 11px;\n        font-family: "Open Sans", sans-serif !important;\n        color: #000000;\n        background: #ececec;\n        width: 100%;\n      }\n      .newsletterFooterTitle {\n        text-align: left;\n        color: #000000;\n        font-family: "Open Sans", sans-serif;\n        font-size: 20px;\n      }\n      .newsletterProductTitleFreebie {\n        text-align: center;\n        font-family: "Open Sans", sans-serif;\n        font-size: 20px;\n      }\n      .newsletterFooterCategoryLEFT {\n        padding-bottom: 20px !important;\n        padding-right: 10px !important;\n      }\n      .newsletterFooterCategoryRIGHT {\n        padding-bottom: 20px !important;\n        padding-left: 10px !important;\n      }\n      .newsletterFooterCategoryLEFTBottom {\n        padding-right: 10px !important;\n      }\n      .newsletterFooterCategoryRIGHTBottom {\n        padding-left: 10px !important;\n      }\n      .newsletterSocialIcon {\n        padding-left: 25px !important;\n      }\n      .newsletterTopBottomContainer {\n        padding-top: 35px !important;\n        padding-bottom: 35px !important;\n      }\n      .newsletterKlarnaBannerContainer {\n        padding-top: 35px !important;\n        padding-bottom: 35px !important;\n      }\n      @media screen and (max-width: 768px) {\n        .newsletterFooterCategoryLEFTBottom {\n          padding-right: 5px !important;\n        }\n        .newsletterFooterCategoryRIGHTBottom {\n          padding-left: 5px !important;\n        }\n        .newsletterFooterCategoryLEFT {\n          padding-bottom: 10px !important;\n          padding-right: 5px !important;\n        }\n        .newsletterFooterCategoryRIGHT {\n          padding-bottom: 10px !important;\n          padding-left: 5px !important;\n        }\n        .newsletterSocialIcon {\n          padding-left: 13px !important;\n        }\n        .newsletterTopBottomContainer {\n          padding-top: 20px !important;\n          padding-bottom: 20px !important;\n        }\n        .newsletterFooterTitle {\n          font-size: 18px;\n        }\n        .newsletterProductTitleFreebie {\n          font-size: 18px;\n        }\n        .newsletterProductTitle {\n          font-size: 18px;\n        }\n        .newsletterProductLowPrice {\n          font-size: 16px;\n        }\n        .newsletterProductHightPrice {\n          display: block;\n        }\n        .newsletterProductTitleContainer {\n          padding-top: 10px;\n        }\n        .newsletterTitle {\n          font-size: 25px;\n        }\n        .newsletterTitleOfferPart {\n          font-size: 25px;\n        }\n        .newsletterContainer {\n          padding-left: 10px;\n          padding-right: 10px;\n        }\n        .newsletterFreebieContainer {\n          padding-left: 10px;\n          padding-right: 0px !important;\n        }\n        .newsletterBottom35px {\n          padding-bottom: 20px;\n        }\n        .newsletterBottom60px {\n          padding-bottom: 40px;\n        }\n        .newsletterParagraph {\n          font-size: 16px;\n        }\n        .newsletterLeft10px {\n          padding-left: 5px;\n        }\n        .newsletterRight10px {\n          padding-right: 5px;\n        }\n        .newsletterBottom20px {\n          padding-bottom: 10px;\n        }\n        .newsletterBottom80px {\n          padding-bottom: 50px;\n        }\n      }\n      @media screen and (max-width: 570px) {\n        .newsletterProductTitleFreebie {\n          font-size: 16px;\n        }\n      }\n      @media screen and (max-width: 460px) {\n        .newsletterProductTitleFreebie {\n          font-size: 14px;\n        }\n      }\n      @media screen and (max-width: 370px) {\n        .newsletterProductTitleFreebie {\n          font-size: 12px;\n        }\n      }\n    </style>\n  </head>\n  <body\n    class="body"\n    style="\n      width: 100% !important;\n      padding: 0 !important;\n      margin: 0 auto !important;\n      font-family: \'Open Sans\', sans-serif !important;\n      font-size: 13px;\n      color: #000000;\n      text-align: left;\n      background-color: #ececec;\n    "\n    width="100%"\n  >\n    {{{header}}}\n    <table\n      align="center"\n      border="0"\n      cellpadding="0"\n      cellspacing="0"\n      id="newsletter"\n      style="max-width:650px;width:100%;background-color:{{Newsletter_bg_color}};color:#000"\n      width="100%"\n    >\n      <tbody>\n        <tr>\n          <td align="center">\n            <table border="0" cellpadding="0" cellspacing="0" width="100%">\n              <tbody>\n                <tr>\n                  <td>\n                    <a href="{{origin}}{{utm}}{{id}}"\n                      ><img\n                        alt=""\n                        loading="lazy"\n                        src="{{Top_image_src}}"\n                        style="vertical-align: middle; max-width: 100%"\n                    /></a>\n                  </td>\n                </tr>\n              </tbody>\n            </table>\n          </td>\n        </tr>\n        <tr>\n          <td align="center" style="background-color:{{Newsletter_bg_color}}">\n            <table\n              align="center"\n              border="0"\n              cellpadding="0"\n              cellspacing="0"\n              width="100%"\n            >\n              <tbody>\n                <tr>\n                  <td align="center">\n                    <table\n                      border="0"\n                      cellpadding="0"\n                      cellspacing="0"\n                      width="100%"\n                    >\n                      <tbody>\n                        <tr>\n                          <td>\n                            <a href="{{origin}}/content{{Banner_href_1}}{{utm}}{{id}}"\n                              ><img\n                                alt=""\n                                loading="lazy"\n                                src="{{picture_server_url}}{{slug}}{{Campaign_src_1}}_mb.png?ver=4"\n                                style="vertical-align: middle; max-width: 100%"\n                            /></a>\n                          </td>\n                        </tr>\n                      </tbody>\n                    </table>\n                  </td>\n                </tr>\n              </tbody>\n            </table>\n          </td>\n        </tr>\n        <tr>\n          <td style="background-color:{{Timer_bg_color}}; color: {{Timer_color}};">\n            <table border="0" cellpadding="0" cellspacing="0" width="100%">\n              <tbody>\n                <tr>\n                  <td class="newsletterBottom20px"></td>\n                </tr>\n              </tbody>\n            </table>\n          </td>\n        </tr>\n        <tr>\n          <td align="center" style="background-color:{{Timer_bg_color}}">\n            <a href="{{origin}}/content{{Timer_href}}{{utm}}{{id}}"\n              ><img\n                alt="Timer gif"\n                loading="lazy"\n                src="{{Timer_src}}"\n                style="vertical-align: middle; max-width: 100%"\n            /></a>\n          </td>\n        </tr>\n        <tr>\n          <td style="background-color:{{Timer_bg_color}}">\n            <table border="0" cellpadding="0" cellspacing="0" width="100%">\n              <tbody>\n                <tr>\n                  <td class="newsletterBottom20px"></td>\n                </tr>\n              </tbody>\n            </table>\n          </td>\n        </tr>\n    <tr><td align="center" style="background-color:{{Timer_bg_color}}"><a href="{{origin}}/content{{Timer_href}}{{utm}}{{id}}" ><img   alt="Freebies picture"   loading="lazy"   src="{{picture_server_url}}{{Timer_freebie_src}}free.png?ver=4"  style="vertical-align: middle; max-width: 100%"/></a> </td></tr>    <tr>\n          <td style="background-color:{{Newsletter_bg_color}}">\n            <table border="0" cellpadding="0" cellspacing="0" width="100%">\n              <tbody>\n                <tr>\n                  <td class="newsletterBottom35px"></td>\n                </tr>\n              </tbody>\n            </table>\n          </td>\n        </tr>\n        <tr>\n          <td align="center" style="background-color:{{Newsletter_bg_color}}">\n            <table\n              align="center"\n              border="0"\n              cellpadding="0"\n              cellspacing="0"\n              width="100%"\n            >\n              <tbody>\n                <tr>\n                  <td align="center">\n                    <table\n                      border="0"\n                      cellpadding="0"\n                      cellspacing="0"\n                      width="100%"\n                    >\n                      <tbody>\n                        <tr>\n                          <td>\n                            <a href="{{origin}}/content{{Banner_href_2}}{{utm}}{{id}}"\n                              ><img\n                                alt=""\n                                loading="lazy"\n                                src="{{picture_server_url}}{{slug}}{{Campaign_src_2}}_mb.png?ver=4"\n                                style="vertical-align: middle; max-width: 100%"\n                            /></a>\n                          </td>\n                        </tr>\n                      </tbody>\n                    </table>\n                  </td>\n                </tr>\n              </tbody>\n            </table>\n          </td>\n        </tr>\n        <tr>\n          <td style="background-color:{{Newsletter_bg_color}}">\n            <table border="0" cellpadding="0" cellspacing="0" width="100%">\n              <tbody>\n                <tr>\n                  <td class="newsletterBottom35px"></td>\n                </tr>\n              </tbody>\n            </table>\n          </td>\n        </tr>\n        <tr>\n          <td align="center" style="background-color:{{Newsletter_bg_color}}">\n            <table\n              align="center"\n              border="0"\n              cellpadding="0"\n              cellspacing="0"\n              width="100%"\n            >\n              <tbody>\n                <tr>\n                  <td align="center">\n                    <table\n                      border="0"\n                      cellpadding="0"\n                      cellspacing="0"\n                      width="100%"\n                    >\n                      <tbody>\n                        <tr>\n                          <td>\n                            <a href="{{origin}}/content{{Banner_href_3}}{{utm}}{{id}}"\n                              ><img\n                                alt=""\n                                loading="lazy"\n                                src="{{picture_server_url}}{{slug}}{{Campaign_src_3}}_mb.png?ver=4"\n                                style="vertical-align: middle; max-width: 100%"\n                            /></a>\n                          </td>\n                        </tr>\n                      </tbody>\n                    </table>\n                  </td>\n                </tr>\n              </tbody>\n            </table>\n          </td>\n        </tr>\n     <tr>\n          <td style="background-color:{{Newsletter_bg_color}}">\n            <table border="0" cellpadding="0" cellspacing="0" width="100%">\n              <tbody>\n                <tr>\n                  <td class="newsletterBottom35px"></td>\n                </tr>\n              </tbody>\n            </table>\n          </td>\n        </tr>\n        <tr>\n          <td align="center" style="background-color:{{Newsletter_bg_color}}">\n            <table\n              align="center"\n              border="0"\n              cellpadding="0"\n              cellspacing="0"\n              width="100%"\n            >\n              <tbody>\n                <tr>\n                  <td align="center">\n                    <table\n                      border="0"\n                      cellpadding="0"\n                      cellspacing="0"\n                      width="100%"\n                    >\n                      <tbody>\n                        <tr>\n                          <td>\n                            <a href="{{origin}}/content{{Banner_href_4}}{{utm}}{{id}}"\n                              ><img\n                                alt=""\n                                loading="lazy"\n                                src="{{picture_server_url}}{{slug}}{{Campaign_src_4}}_mb.png?ver=4"\n                                style="vertical-align: middle; max-width: 100%"\n                            /></a>\n                          </td>\n                        </tr>\n                      </tbody>\n                    </table>\n                  </td>\n                </tr>\n              </tbody>\n            </table>\n          </td>\n        </tr>\n    <tr>\n          <td style="background-color:{{Newsletter_bg_color}}">\n            <table border="0" cellpadding="0" cellspacing="0" width="100%">\n              <tbody>\n                <tr>\n                  <td class="newsletterBottom80px"></td>\n                </tr>\n              </tbody>\n            </table>\n          </td>\n        </tr>\n      </tbody>\n    </table>\n {{{services_banner}}}    {{{footer_categories}}} {{{klarna}}} {{{socials}}} {{{advantages}}}\n    <table\n      align="center"\n      border="0"\n      cellpadding="0"\n      cellspacing="0"\n      class="newsletterContainer"\n      style="max-width: 650px; width: 100%; background-color: #ffffff"\n      width="650"\n    >\n      <tbody>\n        <tr>\n          <td>\n            <img\n              alt=""\n              loading="lazy"\n              src="https://beliani.info/newsletter/2022/line.jpg"\n              style="display: block; max-width: 100%"\n            />\n          </td>\n        </tr>\n        <tr>\n          <td align="left" class="newsletterTopBottomContainer">\n            <span class="newsletterConditions" style="color: #000000"\n              >{{Conditions_title}} {{Conditions_description}} {{{Conditions_unsubscribe}}}\n          </td>\n        </tr>\n      </tbody>\n    </table>\n    {{{company_details}}}\n  </body>\n</html>\n',
  },
  {
    title: "Sunday NS with:",
    description:
      "Header\nTimer\nTimer + Freebies Pic\n4 categories \nWithout CTA's\nFooter",
    is_active: true,
    fallback: {
      Newsletter_bg_color: "#fbf5f5",
      Timer_bg_color: "#750000",
      Timer_color: "#fff",

      Top_image_src: "https://beliani.info/newsletter/2022/uk240150_01.jpg",

      Timer_href: "/lp24-10-25",
      Timer_src: "https://gen.sendtric.com/countdown/akikmw4bkt",
      Timer_freebie_src: 20241108,

      Timer2_href: "/lp24-10-25",
      Timer2_src: "https://gen.sendtric.com/countdown/akikmw4bkt",
      Timer2_freebie_src: 20241108,
      Timer2_bg_color: "#750000",
      Timer2_color: "#fff",

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
    html: `<!DOCTYPE html PUBLIC"-//W3C//DTD XHTML 1.0 Transitional//EN""http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html  xmlns="http://www.w3.org/1999/xhtml"  xmlns:o="urn:schemas-microsoft-com:office:office"  xmlns:v="urn:schemas-microsoft-com:vml">
   <head>
      <title>Beliani</title>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="x-apple-disable-message-reformatting" />
      <meta      name="viewport"      content="width=device-width, initial-scale=1, user-scalable=yes"    />
      <meta name="color-scheme" content="light only" />
      <meta name="supported-color-schemes" content="light only" />
      <link      href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700&amp;subset=cyrillic-ext,latin-ext"    />
      <style>      table,      td {        mso-table-lspace: 0pt;        mso-table-rspace: 0pt;      }      img {        -ms-interpolation-mode: bicubic;      }      .title-advantages {        text-align: center;        font-size: 11px;        color: #8c8278;        padding-bottom: 10px;        padding-top: 10px;        margin: 0;      }      .title-advantages-item {        margin-left: 4px;      }      .newsletterRecommendationHeader {        text-align: center;        font-size: 11px;        color: #8c8278;        margin-bottom: 10px;        margin-top: 10px;      }      .newsletterFreebieContainer {        padding-left: 10px;      }      .newsletterBottom80px {        padding-bottom: 80px;      }      .newsletterBottom10px {        padding-bottom: 10px;      }      .newsletterContainer {        padding-left: 20px;        padding-right: 20px;      }      .newsletterCta {        font-size: 20px;        line-height: 1.2;        font-family: "Open Sans", sans-serif;      }      .newsletterCode {        font-size: 20px;        line-height: 1.2;        font-family: "Open Sans", sans-serif;      }      .newsletterBottom20px {        padding-bottom: 20px;      }      .newsletterBottom35px {        padding-bottom: 35px;      }      .newsletterBottom60px {        padding-bottom: 60px;      }      .newsletterParagraph {        font-size: 18px;        font-family: "Open Sans", sans-serif;        line-height: 1.2;      }      .newsletterTitleOfferPart {        font-size: 30px;        font-family: "Open Sans", sans-serif;        line-height: 1.2;      }      .newsletterTitle {        font-size: 30px;        font-family: "Open Sans", sans-serif;        line-height: 1.2;      }      .newsletterProductTitle {        font-size: 20px;        font-family: "Open Sans", sans-serif;        line-height: 1.2;      }      .newsletterProductLowPrice {        font-size: 18px;        font-family: "Open Sans", sans-serif;        line-height: 1.2;        font-weight: 600;      }      .newsletterProductHightPrice {        font-size: 14px;        font-family: "Open Sans", sans-serif;        line-height: 1.2;        text-decoration: line-through;      }      .newsletterRight10px {        padding-right: 10px;      }      .newsletterLeft10px {        padding-left: 10px;      }      .newsletterFooter {        padding-left: 20px !important;        padding-right: 20px !important;      }      .newsletterConditions {        color: black;        font-family: "Open Sans", sans-serif;        font-size: 8px;      }      .newsletterFooterCompanyDetails {        vertical-align: middle;        padding-top: 20px;        padding-right: 0px;        padding-bottom: 20px;        font-size: 11px;        font-family: "Open Sans", sans-serif !important;        color: #000000;        background: #ececec;        width: 100%;      }      .newsletterFooterTitle {        text-align: left;        color: #000000;        font-family: "Open Sans", sans-serif;        font-size: 20px;      }      .newsletterProductTitleFreebie {        text-align: center;        font-family: "Open Sans", sans-serif;        font-size: 20px;      }      .newsletterFooterCategoryLEFT {        padding-bottom: 20px !important;        padding-right: 10px !important;      }      .newsletterFooterCategoryRIGHT {        padding-bottom: 20px !important;        padding-left: 10px !important;      }      .newsletterFooterCategoryLEFTBottom {        padding-right: 10px !important;      }      .newsletterFooterCategoryRIGHTBottom {        padding-left: 10px !important;      }      .newsletterSocialIcon {        padding-left: 25px !important;      }      .newsletterTopBottomContainer {        padding-top: 35px !important;        padding-bottom: 35px !important;      }      .newsletterKlarnaBannerContainer {        padding-top: 35px !important;        padding-bottom: 35px !important;      }      @media screen and (max-width: 768px) {        .newsletterFooterCategoryLEFTBottom {          padding-right: 5px !important;        }        .newsletterFooterCategoryRIGHTBottom {          padding-left: 5px !important;        }        .newsletterFooterCategoryLEFT {          padding-bottom: 10px !important;          padding-right: 5px !important;        }        .newsletterFooterCategoryRIGHT {          padding-bottom: 10px !important;          padding-left: 5px !important;        }        .newsletterSocialIcon {          padding-left: 13px !important;        }        .newsletterTopBottomContainer {          padding-top: 20px !important;          padding-bottom: 20px !important;        }        .newsletterFooterTitle {          font-size: 18px;        }        .newsletterProductTitleFreebie {          font-size: 18px;        }        .newsletterProductTitle {          font-size: 18px;        }        .newsletterProductLowPrice {          font-size: 16px;        }        .newsletterProductHightPrice {          display: block;        }        .newsletterProductTitleContainer {          padding-top: 10px;        }        .newsletterTitle {          font-size: 25px;        }        .newsletterTitleOfferPart {          font-size: 25px;        }        .newsletterContainer {          padding-left: 10px;          padding-right: 10px;        }        .newsletterFreebieContainer {          padding-left: 10px;          padding-right: 0px !important;        }        .newsletterBottom35px {          padding-bottom: 20px;        }        .newsletterBottom60px {          padding-bottom: 40px;        }        .newsletterParagraph {          font-size: 16px;        }        .newsletterLeft10px {          padding-left: 5px;        }        .newsletterRight10px {          padding-right: 5px;        }        .newsletterBottom20px {          padding-bottom: 10px;        }        .newsletterBottom80px {          padding-bottom: 50px;        }      }      @media screen and (max-width: 570px) {        .newsletterProductTitleFreebie {          font-size: 16px;        }      }      @media screen and (max-width: 460px) {        .newsletterProductTitleFreebie {          font-size: 14px;        }      }      @media screen and (max-width: 370px) {        .newsletterProductTitleFreebie {          font-size: 12px;        }      }    </style>
   </head>
   <body    class="body"    style="      width: 100% !important;      padding: 0 !important;      margin: 0 auto !important;      font-family: \'Open Sans\', sans-serif !important;      font-size: 13px;      color: #000000;      text-align: left;      background-color: #ececec;    "    width="100%"  >
      {{{header}}}    
      <table      align="center"      border="0"      cellpadding="0"      cellspacing="0"      id="newsletter"      style="max-width:650px;width:100%;background-color:{{Newsletter_bg_color}};color:#000"      width="100%"    >
         <tbody>
            <tr>
               <td align="center">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%">
                     <tbody>
                        <tr>
                           <td>                    <a href="{{origin}}{{utm}}{{id}}"                      ><img                        alt=""                        loading="lazy"                        src="{{Top_image_src}}"                        style="vertical-align: middle; max-width: 100%"                    /></a>                  </td>
                        </tr>
                     </tbody>
                  </table>
               </td>
            </tr>
            <tr>
               <td align="center" style="background-color:{{Newsletter_bg_color}}">
                  <table              align="center"              border="0"              cellpadding="0"              cellspacing="0"              width="100%"            >
                     <tbody>
                        <tr>
                           <td align="center">
                              <table                      border="0"                      cellpadding="0"                      cellspacing="0"                      width="100%"                    >
                                 <tbody>
                                    <tr>
                                       <td>                            <a href="{{origin}}/content{{Banner_href_1}}{{utm}}{{id}}"                              ><img                                alt=""                                loading="lazy"                                src="{{picture_server_url}}{{slug}}{{Campaign_src_1}}_mb.png?ver=4"                                style="vertical-align: middle; max-width: 100%"                            /></a>                          </td>
                                    </tr>
                                 </tbody>
                              </table>
                           </td>
                        </tr>
                     </tbody>
                  </table>
               </td>
            </tr>
            <tr>
               <td style="background-color:{{Timer_bg_color}}; color: {{Timer_color}};">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%">
                     <tbody>
                        <tr>
                           <td class="newsletterBottom20px"></td>
                        </tr>
                     </tbody>
                  </table>
               </td>
            </tr>
            <tr>
               <td align="center" style="background-color:{{Timer_bg_color}}">            <a href="{{origin}}/content{{Timer_href}}{{utm}}{{id}}"              ><img                alt="Timer gif"                loading="lazy"                src="{{Timer_src}}"                style="vertical-align: middle; max-width: 100%"            /></a>          </td>
            </tr>
            <tr>
               <td style="background-color:{{Timer_bg_color}}; color: {{Timer_color}};">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%">
                     <tbody>
                        <tr>
                           <td class="newsletterBottom20px"></td>
                        </tr>
                     </tbody>
                  </table>
               </td>
            </tr>
           
            <tr>
               <td style="background-color:{{Newsletter_bg_color}}">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%">
                     <tbody>
                        <tr>
                           <td class="newsletterBottom35px"></td>
                        </tr>
                     </tbody>
                  </table>
               </td>
            </tr>
                        <tr>
               <td align="center" style="background-color:{{Newsletter_bg_color}}">
                  <table              align="center"              border="0"              cellpadding="0"              cellspacing="0"              width="100%"            >
                     <tbody>
                        <tr>
                           <td align="center">
                              <table                      border="0"                      cellpadding="0"                      cellspacing="0"                      width="100%"                    >
                                 <tbody>
                                    <tr>
                                       <td>                            <a href="{{origin}}/content{{Banner_href_2}}{{utm}}{{id}}"                              ><img                                alt=""                                loading="lazy"                                src="{{picture_server_url}}{{slug}}{{Campaign_src_2}}_mb.png?ver=4"                                style="vertical-align: middle; max-width: 100%"                            /></a>                          </td>
                                    </tr>
                                 </tbody>
                              </table>
                           </td>
                        </tr>
                     </tbody>
                  </table>
               </td>
            </tr>
            <tr>
               <td style="background-color:{{Timer2_bg_color}}; color: {{Timer2_color}};">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%">
                     <tbody>
                        <tr>
                           <td class="newsletterBottom20px"></td>
                        </tr>
                     </tbody>
                  </table>
               </td>
            </tr>
            <tr>
               <td align="center" style="background-color:{{Timer2_bg_color}}">            <a href="{{origin}}/content{{Timer2_href}}{{utm}}{{id}}"              ><img                alt="Timer gif"                loading="lazy"                src="{{Timer2_src}}"                style="vertical-align: middle; max-width: 100%"            /></a>          </td>
            </tr>
            <tr>
               <td style="background-color:{{Timer2_bg_color}}">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%">
                     <tbody>
                        <tr>
                           <td class="newsletterBottom20px"></td>
                        </tr>
                     </tbody>
                  </table>
               </td>
            </tr>
            <tr>
               <td align="center" style="background-color:{{Timer2_bg_color}}"><a href="{{origin}}/content{{Timer2_href}}{{utm}}{{id}}" ><img   alt="Freebies picture"   loading="lazy"   src="{{picture_server_url}}{{Timer2_freebie_src}}free.png?ver=4"  style="vertical-align: middle; max-width: 100%"/></a> </td>
            </tr>
            <tr>
               <td style="background-color:{{Newsletter_bg_color}}">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%">
                     <tbody>
                        <tr>
                           <td class="newsletterBottom35px"></td>
                        </tr>
                     </tbody>
                  </table>
               </td>
            </tr>
            <tr>
               <td align="center" style="background-color:{{Newsletter_bg_color}}">
                  <table              align="center"              border="0"              cellpadding="0"              cellspacing="0"              width="100%"            >
                     <tbody>
                        <tr>
                           <td align="center">
                              <table                      border="0"                      cellpadding="0"                      cellspacing="0"                      width="100%"                    >
                                 <tbody>
                                    <tr>
                                       <td>                            <a href="{{origin}}/content{{Banner_href_3}}{{utm}}{{id}}"                              ><img                                alt=""                                loading="lazy"                                src="{{picture_server_url}}{{slug}}{{Campaign_src_3}}_mb.png?ver=4"                                style="vertical-align: middle; max-width: 100%"                            /></a>                          </td>
                                    </tr>
                                 </tbody>
                              </table>
                           </td>
                        </tr>
                     </tbody>
                  </table>
               </td>
            </tr>
            <tr>
               <td style="background-color:{{Newsletter_bg_color}}">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%">
                     <tbody>
                        <tr>
                           <td class="newsletterBottom35px"></td>
                        </tr>
                     </tbody>
                  </table>
               </td>
            </tr>
            <tr>
               <td align="center" style="background-color:{{Newsletter_bg_color}}">
                  <table              align="center"              border="0"              cellpadding="0"              cellspacing="0"              width="100%"            >
                     <tbody>
                        <tr>
                           <td align="center">
                              <table                      border="0"                      cellpadding="0"                      cellspacing="0"                      width="100%"                    >
                                 <tbody>
                                    <tr>
                                       <td>                            <a href="{{origin}}/content{{Banner_href_4}}{{utm}}{{id}}"                              ><img                                alt=""                                loading="lazy"                                src="{{picture_server_url}}{{slug}}{{Campaign_src_4}}_mb.png?ver=4"                                style="vertical-align: middle; max-width: 100%"                            /></a>                          </td>
                                    </tr>
                                 </tbody>
                              </table>
                           </td>
                        </tr>
                     </tbody>
                  </table>
               </td>
            </tr>
            <tr>
               <td style="background-color:{{Newsletter_bg_color}}">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%">
                     <tbody>
                        <tr>
                           <td class="newsletterBottom80px"></td>
                        </tr>
                     </tbody>
                  </table>
               </td>
            </tr>
         </tbody>
      </table>
      {{{services_banner}}}    {{{footer_categories}}} {{{klarna}}} {{{socials}}} {{{advantages}}}    
      <table      align="center"      border="0"      cellpadding="0"      cellspacing="0"      class="newsletterContainer"      style="max-width: 650px; width: 100%; background-color: #ffffff"      width="650"    >
         <tbody>
            <tr>
               <td>            <img              alt=""              loading="lazy"              src="https://beliani.info/newsletter/2022/line.jpg"              style="display: block; max-width: 100%"            />          </td>
            </tr>
            <tr>
               <td align="left" class="newsletterTopBottomContainer">            <span class="newsletterConditions" style="color: #000000"              >{{Conditions_title}} {{Conditions_description}} {{{Conditions_unsubscribe}}}          </td>
            </tr>
         </tbody>
      </table>
      {{{company_details}}}  
   </body>
</html>`,
  },
  {
    title: "Sunday NS with:",
    description:
      "Header\nTimer + Freebies Pic \n5 categories \nWithout CTA's\nFooter",
    is_active: true,
    fallback: {
      Newsletter_bg_color: "#fbf5f5",
      Timer_bg_color: "#750000",
      Timer_color: "#fff",

      Top_image_src: "https://beliani.info/newsletter/2022/uk240150_01.jpg",

      Timer_href: "/lp25-02-17",
      Timer_src: "https://gen.sendtric.com/countdown/akikmw4bkt",
      Timer_freebie_src: 2025,

      Campaign_src_1: 20250217,
      Campaign_src_2: 20250218,
      Campaign_src_3: 20250219,
      Campaign_src_4: 20250220,
      Campaign_src_5: 20250221,
      Banner_href_1: "/lp25-02-17",
      Banner_href_2: "/lp25-02-18",
      Banner_href_3: "/lp25-02-19",
      Banner_href_4: "/lp25-02-20",
      Banner_href_5: "/lp25-02-21",

      Conditions_title: "Conditions title",
      Conditions_description: "Condition description",
      Conditions_unsubscribe: "Conditions unsubscribe",
    },
    html: `<!DOCTYPE html PUBLIC"-//W3C//DTD XHTML 1.0 Transitional//EN""http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html
  xmlns="http://www.w3.org/1999/xhtml"
  xmlns:o="urn:schemas-microsoft-com:office:office"
  xmlns:v="urn:schemas-microsoft-com:vml"
>
  <head>
    <title>Beliani</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="x-apple-disable-message-reformatting" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, user-scalable=yes"
    />
    <meta name="color-scheme" content="light only" />
    <meta name="supported-color-schemes" content="light only" />
    <link
      href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700&amp;subset=cyrillic-ext,latin-ext"
    />
    <style>
      table,
      td {
        mso-table-lspace: 0pt;
        mso-table-rspace: 0pt;
      }
      img {
        -ms-interpolation-mode: bicubic;
      }
      .title-advantages {
        text-align: center;
        font-size: 11px;
        color: #8c8278;
        padding-bottom: 10px;
        padding-top: 10px;
        margin: 0;
      }
      .title-advantages-item {
        margin-left: 4px;
      }
      .newsletterRecommendationHeader {
        text-align: center;
        font-size: 11px;
        color: #8c8278;
        margin-bottom: 10px;
        margin-top: 10px;
      }
      .newsletterFreebieContainer {
        padding-left: 10px;
      }
      .newsletterBottom80px {
        padding-bottom: 80px;
      }
      .newsletterBottom10px {
        padding-bottom: 10px;
      }
      .newsletterContainer {
        padding-left: 20px;
        padding-right: 20px;
      }
      .newsletterCta {
        font-size: 20px;
        line-height: 1.2;
        font-family: "Open Sans", sans-serif;
      }
      .newsletterCode {
        font-size: 20px;
        line-height: 1.2;
        font-family: "Open Sans", sans-serif;
      }
      .newsletterBottom20px {
        padding-bottom: 20px;
      }
      .newsletterBottom35px {
        padding-bottom: 35px;
      }
      .newsletterBottom60px {
        padding-bottom: 60px;
      }
      .newsletterParagraph {
        font-size: 18px;
        font-family: "Open Sans", sans-serif;
        line-height: 1.2;
      }
      .newsletterTitleOfferPart {
        font-size: 30px;
        font-family: "Open Sans", sans-serif;
        line-height: 1.2;
      }
      .newsletterTitle {
        font-size: 30px;
        font-family: "Open Sans", sans-serif;
        line-height: 1.2;
      }
      .newsletterProductTitle {
        font-size: 20px;
        font-family: "Open Sans", sans-serif;
        line-height: 1.2;
      }
      .newsletterProductLowPrice {
        font-size: 18px;
        font-family: "Open Sans", sans-serif;
        line-height: 1.2;
        font-weight: 600;
      }
      .newsletterProductHightPrice {
        font-size: 14px;
        font-family: "Open Sans", sans-serif;
        line-height: 1.2;
        text-decoration: line-through;
      }
      .newsletterRight10px {
        padding-right: 10px;
      }
      .newsletterLeft10px {
        padding-left: 10px;
      }
      .newsletterFooter {
        padding-left: 20px !important;
        padding-right: 20px !important;
      }
      .newsletterConditions {
        color: black;
        font-family: "Open Sans", sans-serif;
        font-size: 8px;
      }
      .newsletterFooterCompanyDetails {
        vertical-align: middle;
        padding-top: 20px;
        padding-right: 0px;
        padding-bottom: 20px;
        font-size: 11px;
        font-family: "Open Sans", sans-serif !important;
        color: #000000;
        background: #ececec;
        width: 100%;
      }
      .newsletterFooterTitle {
        text-align: left;
        color: #000000;
        font-family: "Open Sans", sans-serif;
        font-size: 20px;
      }
      .newsletterProductTitleFreebie {
        text-align: center;
        font-family: "Open Sans", sans-serif;
        font-size: 20px;
      }
      .newsletterFooterCategoryLEFT {
        padding-bottom: 20px !important;
        padding-right: 10px !important;
      }
      .newsletterFooterCategoryRIGHT {
        padding-bottom: 20px !important;
        padding-left: 10px !important;
      }
      .newsletterFooterCategoryLEFTBottom {
        padding-right: 10px !important;
      }
      .newsletterFooterCategoryRIGHTBottom {
        padding-left: 10px !important;
      }
      .newsletterSocialIcon {
        padding-left: 25px !important;
      }
      .newsletterTopBottomContainer {
        padding-top: 35px !important;
        padding-bottom: 35px !important;
      }
      .newsletterKlarnaBannerContainer {
        padding-top: 35px !important;
        padding-bottom: 35px !important;
      }
      @media screen and (max-width: 768px) {
        .newsletterFooterCategoryLEFTBottom {
          padding-right: 5px !important;
        }
        .newsletterFooterCategoryRIGHTBottom {
          padding-left: 5px !important;
        }
        .newsletterFooterCategoryLEFT {
          padding-bottom: 10px !important;
          padding-right: 5px !important;
        }
        .newsletterFooterCategoryRIGHT {
          padding-bottom: 10px !important;
          padding-left: 5px !important;
        }
        .newsletterSocialIcon {
          padding-left: 13px !important;
        }
        .newsletterTopBottomContainer {
          padding-top: 20px !important;
          padding-bottom: 20px !important;
        }
        .newsletterFooterTitle {
          font-size: 18px;
        }
        .newsletterProductTitleFreebie {
          font-size: 18px;
        }
        .newsletterProductTitle {
          font-size: 18px;
        }
        .newsletterProductLowPrice {
          font-size: 16px;
        }
        .newsletterProductHightPrice {
          display: block;
        }
        .newsletterProductTitleContainer {
          padding-top: 10px;
        }
        .newsletterTitle {
          font-size: 25px;
        }
        .newsletterTitleOfferPart {
          font-size: 25px;
        }
        .newsletterContainer {
          padding-left: 10px;
          padding-right: 10px;
        }
        .newsletterFreebieContainer {
          padding-left: 10px;
          padding-right: 0px !important;
        }
        .newsletterBottom35px {
          padding-bottom: 20px;
        }
        .newsletterBottom60px {
          padding-bottom: 40px;
        }
        .newsletterParagraph {
          font-size: 16px;
        }
        .newsletterLeft10px {
          padding-left: 5px;
        }
        .newsletterRight10px {
          padding-right: 5px;
        }
        .newsletterBottom20px {
          padding-bottom: 10px;
        }
        .newsletterBottom80px {
          padding-bottom: 50px;
        }
      }
      @media screen and (max-width: 570px) {
        .newsletterProductTitleFreebie {
          font-size: 16px;
        }
      }
      @media screen and (max-width: 460px) {
        .newsletterProductTitleFreebie {
          font-size: 14px;
        }
      }
      @media screen and (max-width: 370px) {
        .newsletterProductTitleFreebie {
          font-size: 12px;
        }
      }
    </style>
  </head>
  <body
    aria-readonly="false"
    class="body"
    style="
      width: 100% !important;
      padding: 0 !important;
      margin: 0 auto !important;
      font-family: 'Open Sans', sans-serif !important;
      font-size: 13px;
      color: #000000;
      text-align: left;
      background-color: #ececec;
    "
    width="100%"
  >
    {{{header}}}
    <table
      align="center"
      border="0"
      cellpadding="0"
      cellspacing="0"
      id="newsletter"
      style="max-width:650px;width:100%;background-color:{{Newsletter_bg_color}};color:#000"
      width="100%"
    >
      <tbody>
        <tr>
          <td align="center">
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
              <tbody>
                <tr>
                  <td>
                    <a href="{{origin}}{{utm}}{{id}}"
                      ><img
                        alt=""
                        loading="lazy"
                        src="{{Top_image_src}}"
                        style="vertical-align: middle; max-width: 100%"
                    /></a>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td align="center" style="background-color:{{Newsletter_bg_color}}">
            <table
              align="center"
              border="0"
              cellpadding="0"
              cellspacing="0"
              width="100%"
            >
              <tbody>
                <tr>
                  <td align="center">
                    <table
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      width="100%"
                    >
                      <tbody>
                        <tr>
                          <td>
                            <a
                              href="{{origin}}/content{{Banner_href_1}}{{utm}}{{id}}"
                              ><img
                                alt=""
                                loading="lazy"
                                src="{{picture_server_url}}{{slug}}{{Campaign_src_1}}_mb.png?ver=4"
                                style="vertical-align: middle; max-width: 100%"
                            /></a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td
            style="background-color:{{Timer_bg_color}};color:{{Timer_color}};"
          >
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
              <tbody>
                <tr>
                  <td class="newsletterBottom20px"></td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td align="center" style="background-color:{{Timer_bg_color}}">
            <a href="{{origin}}/content{{Timer_href}}{{utm}}{{id}}"
              ><img
                alt="Timer gif"
                loading="lazy"
                src="{{Timer_src}}"
                style="vertical-align: middle; max-width: 100%"
            /></a>
          </td>
        </tr>
        <tr>
          <td style="background-color:{{Timer_bg_color}}">
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
              <tbody>
                <tr>
                  <td class="newsletterBottom20px"></td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td align="center" style="background-color:{{Timer_bg_color}}">
            <a href="{{origin}}/content{{Timer_href}}{{utm}}{{id}}"
              ><img
                alt="Freebies picture"
                loading="lazy"
                src="{{picture_server_url}}{{Timer_freebie_src}}free.png?ver=4"
                style="vertical-align: middle; max-width: 100%"
            /></a>
          </td>
        </tr>
        <tr>
          <td style="background-color:{{Newsletter_bg_color}}">
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
              <tbody>
                <tr>
                  <td class="newsletterBottom35px"></td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td align="center" style="background-color:{{Newsletter_bg_color}}">
            <table
              align="center"
              border="0"
              cellpadding="0"
              cellspacing="0"
              width="100%"
            >
              <tbody>
                <tr>
                  <td align="center">
                    <table
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      width="100%"
                    >
                      <tbody>
                        <tr>
                          <td>
                            <a
                              href="{{origin}}/content{{Banner_href_2}}{{utm}}{{id}}"
                              ><img
                                alt=""
                                loading="lazy"
                                src="{{picture_server_url}}{{slug}}{{Campaign_src_2}}_mb.png?ver=4"
                                style="vertical-align: middle; max-width: 100%"
                            /></a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td style="background-color:{{Newsletter_bg_color}}">
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
              <tbody>
                <tr>
                  <td class="newsletterBottom35px"></td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td align="center" style="background-color:{{Newsletter_bg_color}}">
            <table
              align="center"
              border="0"
              cellpadding="0"
              cellspacing="0"
              width="100%"
            >
              <tbody>
                <tr>
                  <td align="center">
                    <table
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      width="100%"
                    >
                      <tbody>
                        <tr>
                          <td>
                            <a
                              href="{{origin}}/content{{Banner_href_3}}{{utm}}{{id}}"
                              ><img
                                alt=""
                                loading="lazy"
                                src="{{picture_server_url}}{{slug}}{{Campaign_src_3}}_mb.png?ver=4"
                                style="vertical-align: middle; max-width: 100%"
                            /></a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td style="background-color:{{Newsletter_bg_color}}">
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
              <tbody>
                <tr>
                  <td class="newsletterBottom35px"></td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td align="center" style="background-color:{{Newsletter_bg_color}}">
            <table
              align="center"
              border="0"
              cellpadding="0"
              cellspacing="0"
              width="100%"
            >
              <tbody>
                <tr>
                  <td align="center">
                    <table
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      width="100%"
                    >
                      <tbody>
                        <tr>
                          <td>
                            <a
                              href="{{origin}}/content{{Banner_href_4}}{{utm}}{{id}}"
                              ><img
                                alt=""
                                loading="lazy"
                                src="{{picture_server_url}}{{slug}}{{Campaign_src_4}}_mb.png?ver=4"
                                style="vertical-align: middle; max-width: 100%"
                            /></a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td style="background-color:{{Newsletter_bg_color}}">
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
              <tbody>
                <tr>
                  <td class="newsletterBottom35px"></td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td align="center" style="background-color:{{Newsletter_bg_color}}">
            <table
              align="center"
              border="0"
              cellpadding="0"
              cellspacing="0"
              width="100%"
            >
              <tbody>
                <tr>
                  <td align="center">
                    <table
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      width="100%"
                    >
                      <tbody>
                        <tr>
                          <td>
                            <a
                              href="{{origin}}/content{{Banner_href_5}}{{utm}}{{id}}"
                              ><img
                                alt=""
                                loading="lazy"
                                src="{{picture_server_url}}{{slug}}{{Campaign_src_5}}_mb.png?ver=4"
                                style="vertical-align: middle; max-width: 100%"
                            /></a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td style="background-color:{{Newsletter_bg_color}}">
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
              <tbody>
                <tr>
                  <td class="newsletterBottom80px"></td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
    
      {{{services_banner}}} {{{footer_categories}}} {{{klarna}}} {{{socials}}}
      {{{advantages}}}
    
    <table
      align="center"
      border="0"
      cellpadding="0"
      cellspacing="0"
      class="newsletterContainer"
      style="max-width: 650px; width: 100%; background-color: #ffffff"
      width="650"
    >
      <tbody>
        <tr>
          <td>
            <img
              alt=""
              loading="lazy"
              src="https://beliani.info/newsletter/2022/line.jpg"
              style="display: block; max-width: 100%"
            />
          </td>
        </tr>
        <tr>
          <td align="left" class="newsletterTopBottomContainer">
            <span class="newsletterConditions" style="color: #000000"
              >{{Conditions_title}} {{Conditions_description}}
              {{{Conditions_unsubscribe}}}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
    {{{company_details}}}
  </body>
</html>
`,
  },
  {
    title: "Sunday NS with:",
    description:
      "Header\nTimer + Freebies Pic \nTimer\n 5 categories \nWithout CTA's\nFooter",
    is_active: true,
    fallback: {
      Newsletter_bg_color: "#fbf5f5",
      Timer_bg_color: "#750000",
      Timer_color: "#fff",
      Timer2_bg_color: "#750000",
      Timer2_color: "#fff",

      Top_image_src: "https://beliani.info/newsletter/2022/uk240150_01.jpg",

      Timer_href: "/lp25-02-17",
      Timer_src: "https://gen.sendtric.com/countdown/akikmw4bkt",
      Timer_freebie_src: 2025,

      Timer2_href: "/lp25-02-17",
      Timer2_src: "https://gen.sendtric.com/countdown/akikmw4bkt",

      Campaign_src_1: 20250217,
      Campaign_src_2: 20250219,
      Campaign_src_3: 20250219,
      Campaign_src_4: 20250220,
      Campaign_src_5: 20250221,
      Banner_href_1: "/lp25-02-17",
      Banner_href_2: "/lp25-02-18",
      Banner_href_3: "/lp25-02-19",
      Banner_href_4: "/lp25-02-20",
      Banner_href_5: "/lp25-02-21",

      Conditions_title: "Conditions title",
      Conditions_description: "Condition description",
      Conditions_unsubscribe: "Conditions unsubscribe",
    },
    html: `<!DOCTYPE html PUBLIC"-//W3C//DTD XHTML 1.0 Transitional//EN""http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html
  xmlns="http://www.w3.org/1999/xhtml"
  xmlns:o="urn:schemas-microsoft-com:office:office"
  xmlns:v="urn:schemas-microsoft-com:vml"
>
  <head>
    <title>Beliani</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="x-apple-disable-message-reformatting" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, user-scalable=yes"
    />
    <meta name="color-scheme" content="light only" />
    <meta name="supported-color-schemes" content="light only" />
    <link
      href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700&amp;subset=cyrillic-ext,latin-ext"
    />
    <style>
      table,
      td {
        mso-table-lspace: 0pt;
        mso-table-rspace: 0pt;
      }
      img {
        -ms-interpolation-mode: bicubic;
      }
      .title-advantages {
        text-align: center;
        font-size: 11px;
        color: #8c8278;
        padding-bottom: 10px;
        padding-top: 10px;
        margin: 0;
      }
      .title-advantages-item {
        margin-left: 4px;
      }
      .newsletterRecommendationHeader {
        text-align: center;
        font-size: 11px;
        color: #8c8278;
        margin-bottom: 10px;
        margin-top: 10px;
      }
      .newsletterFreebieContainer {
        padding-left: 10px;
      }
      .newsletterBottom80px {
        padding-bottom: 80px;
      }
      .newsletterBottom10px {
        padding-bottom: 10px;
      }
      .newsletterContainer {
        padding-left: 20px;
        padding-right: 20px;
      }
      .newsletterCta {
        font-size: 20px;
        line-height: 1.2;
        font-family: "Open Sans", sans-serif;
      }
      .newsletterCode {
        font-size: 20px;
        line-height: 1.2;
        font-family: "Open Sans", sans-serif;
      }
      .newsletterBottom20px {
        padding-bottom: 20px;
      }
      .newsletterBottom35px {
        padding-bottom: 35px;
      }
      .newsletterBottom60px {
        padding-bottom: 60px;
      }
      .newsletterParagraph {
        font-size: 18px;
        font-family: "Open Sans", sans-serif;
        line-height: 1.2;
      }
      .newsletterTitleOfferPart {
        font-size: 30px;
        font-family: "Open Sans", sans-serif;
        line-height: 1.2;
      }
      .newsletterTitle {
        font-size: 30px;
        font-family: "Open Sans", sans-serif;
        line-height: 1.2;
      }
      .newsletterProductTitle {
        font-size: 20px;
        font-family: "Open Sans", sans-serif;
        line-height: 1.2;
      }
      .newsletterProductLowPrice {
        font-size: 18px;
        font-family: "Open Sans", sans-serif;
        line-height: 1.2;
        font-weight: 600;
      }
      .newsletterProductHightPrice {
        font-size: 14px;
        font-family: "Open Sans", sans-serif;
        line-height: 1.2;
        text-decoration: line-through;
      }
      .newsletterRight10px {
        padding-right: 10px;
      }
      .newsletterLeft10px {
        padding-left: 10px;
      }
      .newsletterFooter {
        padding-left: 20px !important;
        padding-right: 20px !important;
      }
      .newsletterConditions {
        color: black;
        font-family: "Open Sans", sans-serif;
        font-size: 8px;
      }
      .newsletterFooterCompanyDetails {
        vertical-align: middle;
        padding-top: 20px;
        padding-right: 0px;
        padding-bottom: 20px;
        font-size: 11px;
        font-family: "Open Sans", sans-serif !important;
        color: #000000;
        background: #ececec;
        width: 100%;
      }
      .newsletterFooterTitle {
        text-align: left;
        color: #000000;
        font-family: "Open Sans", sans-serif;
        font-size: 20px;
      }
      .newsletterProductTitleFreebie {
        text-align: center;
        font-family: "Open Sans", sans-serif;
        font-size: 20px;
      }
      .newsletterFooterCategoryLEFT {
        padding-bottom: 20px !important;
        padding-right: 10px !important;
      }
      .newsletterFooterCategoryRIGHT {
        padding-bottom: 20px !important;
        padding-left: 10px !important;
      }
      .newsletterFooterCategoryLEFTBottom {
        padding-right: 10px !important;
      }
      .newsletterFooterCategoryRIGHTBottom {
        padding-left: 10px !important;
      }
      .newsletterSocialIcon {
        padding-left: 25px !important;
      }
      .newsletterTopBottomContainer {
        padding-top: 35px !important;
        padding-bottom: 35px !important;
      }
      .newsletterKlarnaBannerContainer {
        padding-top: 35px !important;
        padding-bottom: 35px !important;
      }
      @media screen and (max-width: 768px) {
        .newsletterFooterCategoryLEFTBottom {
          padding-right: 5px !important;
        }
        .newsletterFooterCategoryRIGHTBottom {
          padding-left: 5px !important;
        }
        .newsletterFooterCategoryLEFT {
          padding-bottom: 10px !important;
          padding-right: 5px !important;
        }
        .newsletterFooterCategoryRIGHT {
          padding-bottom: 10px !important;
          padding-left: 5px !important;
        }
        .newsletterSocialIcon {
          padding-left: 13px !important;
        }
        .newsletterTopBottomContainer {
          padding-top: 20px !important;
          padding-bottom: 20px !important;
        }
        .newsletterFooterTitle {
          font-size: 18px;
        }
        .newsletterProductTitleFreebie {
          font-size: 18px;
        }
        .newsletterProductTitle {
          font-size: 18px;
        }
        .newsletterProductLowPrice {
          font-size: 16px;
        }
        .newsletterProductHightPrice {
          display: block;
        }
        .newsletterProductTitleContainer {
          padding-top: 10px;
        }
        .newsletterTitle {
          font-size: 25px;
        }
        .newsletterTitleOfferPart {
          font-size: 25px;
        }
        .newsletterContainer {
          padding-left: 10px;
          padding-right: 10px;
        }
        .newsletterFreebieContainer {
          padding-left: 10px;
          padding-right: 0px !important;
        }
        .newsletterBottom35px {
          padding-bottom: 20px;
        }
        .newsletterBottom60px {
          padding-bottom: 40px;
        }
        .newsletterParagraph {
          font-size: 16px;
        }
        .newsletterLeft10px {
          padding-left: 5px;
        }
        .newsletterRight10px {
          padding-right: 5px;
        }
        .newsletterBottom20px {
          padding-bottom: 10px;
        }
        .newsletterBottom80px {
          padding-bottom: 50px;
        }
      }
      @media screen and (max-width: 570px) {
        .newsletterProductTitleFreebie {
          font-size: 16px;
        }
      }
      @media screen and (max-width: 460px) {
        .newsletterProductTitleFreebie {
          font-size: 14px;
        }
      }
      @media screen and (max-width: 370px) {
        .newsletterProductTitleFreebie {
          font-size: 12px;
        }
      }
    </style>
  </head>
  <body
    aria-readonly="false"
    class="body"
    style="
      width: 100% !important;
      padding: 0 !important;
      margin: 0 auto !important;
      font-family: 'Open Sans', sans-serif !important;
      font-size: 13px;
      color: #000000;
      text-align: left;
      background-color: #ececec;
    "
    width="100%"
  >
    {{{header}}}
    <table
      align="center"
      border="0"
      cellpadding="0"
      cellspacing="0"
      id="newsletter"
      style="max-width:650px;width:100%;background-color:{{Newsletter_bg_color}};color:#000"
      width="100%"
    >
      <tbody>
        <tr>
          <td align="center">
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
              <tbody>
                <tr>
                  <td>
                    <a href="{{origin}}{{utm}}{{id}}"
                      ><img
                        alt=""
                        loading="lazy"
                        src="{{Top_image_src}}"
                        style="vertical-align: middle; max-width: 100%"
                    /></a>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td align="center" style="background-color:{{Newsletter_bg_color}}">
            <table
              align="center"
              border="0"
              cellpadding="0"
              cellspacing="0"
              width="100%"
            >
              <tbody>
                <tr>
                  <td align="center">
                    <table
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      width="100%"
                    >
                      <tbody>
                        <tr>
                          <td>
                            <a
                              href="{{origin}}/content{{Banner_href_1}}{{utm}}{{id}}"
                              ><img
                                alt=""
                                loading="lazy"
                                src="{{picture_server_url}}{{slug}}{{Campaign_src_1}}_mb.png?ver=4"
                                style="vertical-align: middle; max-width: 100%"
                            /></a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td
            style="background-color:{{Timer_bg_color}};color:{{Timer_color}};"
          >
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
              <tbody>
                <tr>
                  <td class="newsletterBottom20px"></td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td align="center" style="background-color:{{Timer_bg_color}}">
            <a href="{{origin}}/content{{Timer_href}}{{utm}}{{id}}"
              ><img
                alt="Timer gif"
                loading="lazy"
                src="{{Timer_src}}"
                style="vertical-align: middle; max-width: 100%"
            /></a>
          </td>
        </tr>
        <tr>
          <td style="background-color:{{Timer_bg_color}}">
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
              <tbody>
                <tr>
                  <td class="newsletterBottom20px"></td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td align="center" style="background-color:{{Timer_bg_color}}">
            <a href="{{origin}}/content{{Timer_href}}{{utm}}{{id}}"
              ><img
                alt="Freebies picture"
                loading="lazy"
                src="{{picture_server_url}}{{Timer_freebie_src}}free.png?ver=4"
                style="vertical-align: middle; max-width: 100%"
            /></a>
          </td>
        </tr>
        <tr>
          <td style="background-color:{{Newsletter_bg_color}}">
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
              <tbody>
                <tr>
                  <td class="newsletterBottom35px"></td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td align="center" style="background-color:{{Newsletter_bg_color}}">
            <table
              align="center"
              border="0"
              cellpadding="0"
              cellspacing="0"
              width="100%"
            >
              <tbody>
                <tr>
                  <td align="center">
                    <table
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      width="100%"
                    >
                      <tbody>
                        <tr>
                          <td>
                            <a
                              href="{{origin}}/content{{Banner_href_2}}{{utm}}{{id}}"
                              ><img
                                alt=""
                                loading="lazy"
                                src="{{picture_server_url}}{{slug}}{{Campaign_src_2}}_mb.png?ver=4"
                                style="vertical-align: middle; max-width: 100%"
                            /></a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
         <tr>
          <td
            style="background-color:{{Timer2_bg_color}};color:{{Timer2_color}};"
          >
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
              <tbody>
                <tr>
                  <td class="newsletterBottom20px"></td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td align="center" style="background-color:{{Timer2_bg_color}}">
            <a href="{{origin}}/content{{Timer2_href}}{{utm}}{{id}}"
              ><img
                alt="Timer gif"
                loading="lazy"
                src="{{Timer2_src}}"
                style="vertical-align: middle; max-width: 100%"
            /></a>
          </td>
        </tr>
        <tr>
          <td style="background-color:{{Timer2_bg_color}}">
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
              <tbody>
                <tr>
                  <td class="newsletterBottom20px"></td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td style="background-color:{{Newsletter_bg_color}}">
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
              <tbody>
                <tr>
                  <td class="newsletterBottom35px"></td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td align="center" style="background-color:{{Newsletter_bg_color}}">
            <table
              align="center"
              border="0"
              cellpadding="0"
              cellspacing="0"
              width="100%"
            >
              <tbody>
                <tr>
                  <td align="center">
                    <table
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      width="100%"
                    >
                      <tbody>
                        <tr>
                          <td>
                            <a
                              href="{{origin}}/content{{Banner_href_3}}{{utm}}{{id}}"
                              ><img
                                alt=""
                                loading="lazy"
                                src="{{picture_server_url}}{{slug}}{{Campaign_src_3}}_mb.png?ver=4"
                                style="vertical-align: middle; max-width: 100%"
                            /></a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td style="background-color:{{Newsletter_bg_color}}">
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
              <tbody>
                <tr>
                  <td class="newsletterBottom35px"></td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td align="center" style="background-color:{{Newsletter_bg_color}}">
            <table
              align="center"
              border="0"
              cellpadding="0"
              cellspacing="0"
              width="100%"
            >
              <tbody>
                <tr>
                  <td align="center">
                    <table
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      width="100%"
                    >
                      <tbody>
                        <tr>
                          <td>
                            <a
                              href="{{origin}}/content{{Banner_href_4}}{{utm}}{{id}}"
                              ><img
                                alt=""
                                loading="lazy"
                                src="{{picture_server_url}}{{slug}}{{Campaign_src_4}}_mb.png?ver=4"
                                style="vertical-align: middle; max-width: 100%"
                            /></a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td style="background-color:{{Newsletter_bg_color}}">
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
              <tbody>
                <tr>
                  <td class="newsletterBottom35px"></td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td align="center" style="background-color:{{Newsletter_bg_color}}">
            <table
              align="center"
              border="0"
              cellpadding="0"
              cellspacing="0"
              width="100%"
            >
              <tbody>
                <tr>
                  <td align="center">
                    <table
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      width="100%"
                    >
                      <tbody>
                        <tr>
                          <td>
                            <a
                              href="{{origin}}/content{{Banner_href_5}}{{utm}}{{id}}"
                              ><img
                                alt=""
                                loading="lazy"
                                src="{{picture_server_url}}{{slug}}{{Campaign_src_5}}_mb.png?ver=4"
                                style="vertical-align: middle; max-width: 100%"
                            /></a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td style="background-color:{{Newsletter_bg_color}}">
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
              <tbody>
                <tr>
                  <td class="newsletterBottom80px"></td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
    
      {{{services_banner}}} {{{footer_categories}}} {{{klarna}}} {{{socials}}}
      {{{advantages}}}
    
    <table
      align="center"
      border="0"
      cellpadding="0"
      cellspacing="0"
      class="newsletterContainer"
      style="max-width: 650px; width: 100%; background-color: #ffffff"
      width="650"
    >
      <tbody>
        <tr>
          <td>
            <img
              alt=""
              loading="lazy"
              src="https://beliani.info/newsletter/2022/line.jpg"
              style="display: block; max-width: 100%"
            />
          </td>
        </tr>
        <tr>
          <td align="left" class="newsletterTopBottomContainer">
            <span class="newsletterConditions" style="color: #000000"
              >{{Conditions_title}} {{Conditions_description}}
              {{{Conditions_unsubscribe}}}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
    {{{company_details}}}
  </body>
</html>
`,
  },
  {
    title: "Sunday NS with:",
    description:
      "Header\nTimer + Freebies Pic in 2'nd cat\nTimer\n 5 categories \nWithout CTA's\nFooter",
    is_active: true,
    fallback: {
      Newsletter_bg_color: "#fbf5f5",
      Timer_bg_color: "#750000",
      Timer_color: "#fff",
      Timer2_bg_color: "#750000",
      Timer2_color: "#fff",

      Top_image_src: "https://beliani.info/newsletter/2022/uk240150_01.jpg",

      Timer_href: "/lp25-02-17",
      Timer_src: "https://gen.sendtric.com/countdown/akikmw4bkt",
      Timer_freebie_src: 2025,

      Timer2_href: "/lp25-02-17",
      Timer2_src: "https://gen.sendtric.com/countdown/akikmw4bkt",

      Campaign_src_1: 20250217,
      Campaign_src_2: 20250219,
      Campaign_src_3: 20250219,
      Campaign_src_4: 20250220,
      Campaign_src_5: 20250221,
      Banner_href_1: "/lp25-02-17",
      Banner_href_2: "/lp25-02-18",
      Banner_href_3: "/lp25-02-19",
      Banner_href_4: "/lp25-02-20",
      Banner_href_5: "/lp25-02-21",

      Conditions_title: "Conditions title",
      Conditions_description: "Condition description",
      Conditions_unsubscribe: "Conditions unsubscribe",
    },
    html: `<!DOCTYPE html PUBLIC"-//W3C//DTD XHTML 1.0 Transitional//EN""http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html
  xmlns="http://www.w3.org/1999/xhtml"
  xmlns:o="urn:schemas-microsoft-com:office:office"
  xmlns:v="urn:schemas-microsoft-com:vml"
>
  <head>
    <title>Beliani</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="x-apple-disable-message-reformatting" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, user-scalable=yes"
    />
    <meta name="color-scheme" content="light only" />
    <meta name="supported-color-schemes" content="light only" />
    <link
      href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700&amp;subset=cyrillic-ext,latin-ext"
    />
    <style>
      table,
      td {
        mso-table-lspace: 0pt;
        mso-table-rspace: 0pt;
      }
      img {
        -ms-interpolation-mode: bicubic;
      }
      .title-advantages {
        text-align: center;
        font-size: 11px;
        color: #8c8278;
        padding-bottom: 10px;
        padding-top: 10px;
        margin: 0;
      }
      .title-advantages-item {
        margin-left: 4px;
      }
      .newsletterRecommendationHeader {
        text-align: center;
        font-size: 11px;
        color: #8c8278;
        margin-bottom: 10px;
        margin-top: 10px;
      }
      .newsletterFreebieContainer {
        padding-left: 10px;
      }
      .newsletterBottom80px {
        padding-bottom: 80px;
      }
      .newsletterBottom10px {
        padding-bottom: 10px;
      }
      .newsletterContainer {
        padding-left: 20px;
        padding-right: 20px;
      }
      .newsletterCta {
        font-size: 20px;
        line-height: 1.2;
        font-family: "Open Sans", sans-serif;
      }
      .newsletterCode {
        font-size: 20px;
        line-height: 1.2;
        font-family: "Open Sans", sans-serif;
      }
      .newsletterBottom20px {
        padding-bottom: 20px;
      }
      .newsletterBottom35px {
        padding-bottom: 35px;
      }
      .newsletterBottom60px {
        padding-bottom: 60px;
      }
      .newsletterParagraph {
        font-size: 18px;
        font-family: "Open Sans", sans-serif;
        line-height: 1.2;
      }
      .newsletterTitleOfferPart {
        font-size: 30px;
        font-family: "Open Sans", sans-serif;
        line-height: 1.2;
      }
      .newsletterTitle {
        font-size: 30px;
        font-family: "Open Sans", sans-serif;
        line-height: 1.2;
      }
      .newsletterProductTitle {
        font-size: 20px;
        font-family: "Open Sans", sans-serif;
        line-height: 1.2;
      }
      .newsletterProductLowPrice {
        font-size: 18px;
        font-family: "Open Sans", sans-serif;
        line-height: 1.2;
        font-weight: 600;
      }
      .newsletterProductHightPrice {
        font-size: 14px;
        font-family: "Open Sans", sans-serif;
        line-height: 1.2;
        text-decoration: line-through;
      }
      .newsletterRight10px {
        padding-right: 10px;
      }
      .newsletterLeft10px {
        padding-left: 10px;
      }
      .newsletterFooter {
        padding-left: 20px !important;
        padding-right: 20px !important;
      }
      .newsletterConditions {
        color: black;
        font-family: "Open Sans", sans-serif;
        font-size: 8px;
      }
      .newsletterFooterCompanyDetails {
        vertical-align: middle;
        padding-top: 20px;
        padding-right: 0px;
        padding-bottom: 20px;
        font-size: 11px;
        font-family: "Open Sans", sans-serif !important;
        color: #000000;
        background: #ececec;
        width: 100%;
      }
      .newsletterFooterTitle {
        text-align: left;
        color: #000000;
        font-family: "Open Sans", sans-serif;
        font-size: 20px;
      }
      .newsletterProductTitleFreebie {
        text-align: center;
        font-family: "Open Sans", sans-serif;
        font-size: 20px;
      }
      .newsletterFooterCategoryLEFT {
        padding-bottom: 20px !important;
        padding-right: 10px !important;
      }
      .newsletterFooterCategoryRIGHT {
        padding-bottom: 20px !important;
        padding-left: 10px !important;
      }
      .newsletterFooterCategoryLEFTBottom {
        padding-right: 10px !important;
      }
      .newsletterFooterCategoryRIGHTBottom {
        padding-left: 10px !important;
      }
      .newsletterSocialIcon {
        padding-left: 25px !important;
      }
      .newsletterTopBottomContainer {
        padding-top: 35px !important;
        padding-bottom: 35px !important;
      }
      .newsletterKlarnaBannerContainer {
        padding-top: 35px !important;
        padding-bottom: 35px !important;
      }
      @media screen and (max-width: 768px) {
        .newsletterFooterCategoryLEFTBottom {
          padding-right: 5px !important;
        }
        .newsletterFooterCategoryRIGHTBottom {
          padding-left: 5px !important;
        }
        .newsletterFooterCategoryLEFT {
          padding-bottom: 10px !important;
          padding-right: 5px !important;
        }
        .newsletterFooterCategoryRIGHT {
          padding-bottom: 10px !important;
          padding-left: 5px !important;
        }
        .newsletterSocialIcon {
          padding-left: 13px !important;
        }
        .newsletterTopBottomContainer {
          padding-top: 20px !important;
          padding-bottom: 20px !important;
        }
        .newsletterFooterTitle {
          font-size: 18px;
        }
        .newsletterProductTitleFreebie {
          font-size: 18px;
        }
        .newsletterProductTitle {
          font-size: 18px;
        }
        .newsletterProductLowPrice {
          font-size: 16px;
        }
        .newsletterProductHightPrice {
          display: block;
        }
        .newsletterProductTitleContainer {
          padding-top: 10px;
        }
        .newsletterTitle {
          font-size: 25px;
        }
        .newsletterTitleOfferPart {
          font-size: 25px;
        }
        .newsletterContainer {
          padding-left: 10px;
          padding-right: 10px;
        }
        .newsletterFreebieContainer {
          padding-left: 10px;
          padding-right: 0px !important;
        }
        .newsletterBottom35px {
          padding-bottom: 20px;
        }
        .newsletterBottom60px {
          padding-bottom: 40px;
        }
        .newsletterParagraph {
          font-size: 16px;
        }
        .newsletterLeft10px {
          padding-left: 5px;
        }
        .newsletterRight10px {
          padding-right: 5px;
        }
        .newsletterBottom20px {
          padding-bottom: 10px;
        }
        .newsletterBottom80px {
          padding-bottom: 50px;
        }
      }
      @media screen and (max-width: 570px) {
        .newsletterProductTitleFreebie {
          font-size: 16px;
        }
      }
      @media screen and (max-width: 460px) {
        .newsletterProductTitleFreebie {
          font-size: 14px;
        }
      }
      @media screen and (max-width: 370px) {
        .newsletterProductTitleFreebie {
          font-size: 12px;
        }
      }
    </style>
  </head>
  <body
    aria-readonly="false"
    class="body"
    style="
      width: 100% !important;
      padding: 0 !important;
      margin: 0 auto !important;
      font-family: 'Open Sans', sans-serif !important;
      font-size: 13px;
      color: #000000;
      text-align: left;
      background-color: #ececec;
    "
    width="100%"
  >
    {{{header}}}
    <table
      align="center"
      border="0"
      cellpadding="0"
      cellspacing="0"
      id="newsletter"
      style="max-width:650px;width:100%;background-color:{{Newsletter_bg_color}};color:#000"
      width="100%"
    >
      <tbody>
        <tr>
          <td align="center">
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
              <tbody>
                <tr>
                  <td>
                    <a href="{{origin}}{{utm}}{{id}}"
                      ><img
                        alt=""
                        loading="lazy"
                        src="{{Top_image_src}}"
                        style="vertical-align: middle; max-width: 100%"
                    /></a>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td align="center" style="background-color:{{Newsletter_bg_color}}">
            <table
              align="center"
              border="0"
              cellpadding="0"
              cellspacing="0"
              width="100%"
            >
              <tbody>
                <tr>
                  <td align="center">
                    <table
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      width="100%"
                    >
                      <tbody>
                        <tr>
                          <td>
                            <a
                              href="{{origin}}/content{{Banner_href_1}}{{utm}}{{id}}"
                              ><img
                                alt=""
                                loading="lazy"
                                src="{{picture_server_url}}{{slug}}{{Campaign_src_1}}_mb.png?ver=4"
                                style="vertical-align: middle; max-width: 100%"
                            /></a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td style="background-color:{{Newsletter_bg_color}}">
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
              <tbody>
                <tr>
                  <td class="newsletterBottom35px"></td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td align="center" style="background-color:{{Newsletter_bg_color}}">
            <table
              align="center"
              border="0"
              cellpadding="0"
              cellspacing="0"
              width="100%"
            >
              <tbody>
                <tr>
                  <td align="center">
                    <table
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      width="100%"
                    >
                      <tbody>
                        <tr>
                          <td>
                            <a
                              href="{{origin}}/content{{Banner_href_2}}{{utm}}{{id}}"
                              ><img
                                alt=""
                                loading="lazy"
                                src="{{picture_server_url}}{{slug}}{{Campaign_src_2}}_mb.png?ver=4"
                                style="vertical-align: middle; max-width: 100%"
                            /></a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
         <tr>
          <td
            style="background-color:{{Timer_bg_color}};color:{{Timer_color}};"
          >
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
              <tbody>
                <tr>
                  <td class="newsletterBottom20px"></td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td align="center" style="background-color:{{Timer_bg_color}}">
            <a href="{{origin}}/content{{Timer2_href}}{{utm}}{{id}}"
              ><img
                alt="Timer gif"
                loading="lazy"
                src="{{Timer_src}}"
                style="vertical-align: middle; max-width: 100%"
            /></a>
          </td>
        </tr>
        <tr>
          <td style="background-color:{{Timer_bg_color}}">
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
              <tbody>
                <tr>
                  <td class="newsletterBottom20px"></td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td align="center" style="background-color:{{Timer_bg_color}}">
            <a href="{{origin}}/content{{Timer_href}}{{utm}}{{id}}"
              ><img
                alt="Freebies picture"
                loading="lazy"
                src="{{picture_server_url}}{{Timer_freebie_src}}free.png?ver=4"
                style="vertical-align: middle; max-width: 100%"
            /></a>
          </td>
        </tr>
        <tr>
          <td style="background-color:{{Newsletter_bg_color}}">
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
              <tbody>
                <tr>
                  <td class="newsletterBottom35px"></td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td align="center" style="background-color:{{Newsletter_bg_color}}">
            <table
              align="center"
              border="0"
              cellpadding="0"
              cellspacing="0"
              width="100%"
            >
              <tbody>
                <tr>
                  <td align="center">
                    <table
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      width="100%"
                    >
                      <tbody>
                        <tr>
                          <td>
                            <a
                              href="{{origin}}/content{{Banner_href_3}}{{utm}}{{id}}"
                              ><img
                                alt=""
                                loading="lazy"
                                src="{{picture_server_url}}{{slug}}{{Campaign_src_3}}_mb.png?ver=4"
                                style="vertical-align: middle; max-width: 100%"
                            /></a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td style="background-color:{{Newsletter_bg_color}}">
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
              <tbody>
                <tr>
                  <td class="newsletterBottom35px"></td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td align="center" style="background-color:{{Newsletter_bg_color}}">
            <table
              align="center"
              border="0"
              cellpadding="0"
              cellspacing="0"
              width="100%"
            >
              <tbody>
                <tr>
                  <td align="center">
                    <table
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      width="100%"
                    >
                      <tbody>
                        <tr>
                          <td>
                            <a
                              href="{{origin}}/content{{Banner_href_4}}{{utm}}{{id}}"
                              ><img
                                alt=""
                                loading="lazy"
                                src="{{picture_server_url}}{{slug}}{{Campaign_src_4}}_mb.png?ver=4"
                                style="vertical-align: middle; max-width: 100%"
                            /></a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td style="background-color:{{Newsletter_bg_color}}">
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
              <tbody>
                <tr>
                  <td class="newsletterBottom35px"></td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td align="center" style="background-color:{{Newsletter_bg_color}}">
            <table
              align="center"
              border="0"
              cellpadding="0"
              cellspacing="0"
              width="100%"
            >
              <tbody>
                <tr>
                  <td align="center">
                    <table
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      width="100%"
                    >
                      <tbody>
                        <tr>
                          <td>
                            <a
                              href="{{origin}}/content{{Banner_href_5}}{{utm}}{{id}}"
                              ><img
                                alt=""
                                loading="lazy"
                                src="{{picture_server_url}}{{slug}}{{Campaign_src_5}}_mb.png?ver=4"
                                style="vertical-align: middle; max-width: 100%"
                            /></a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td style="background-color:{{Newsletter_bg_color}}">
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
              <tbody>
                <tr>
                  <td class="newsletterBottom80px"></td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
    
      {{{services_banner}}} {{{footer_categories}}} {{{klarna}}} {{{socials}}}
      {{{advantages}}}
    
    <table
      align="center"
      border="0"
      cellpadding="0"
      cellspacing="0"
      class="newsletterContainer"
      style="max-width: 650px; width: 100%; background-color: #ffffff"
      width="650"
    >
      <tbody>
        <tr>
          <td>
            <img
              alt=""
              loading="lazy"
              src="https://beliani.info/newsletter/2022/line.jpg"
              style="display: block; max-width: 100%"
            />
          </td>
        </tr>
        <tr>
          <td align="left" class="newsletterTopBottomContainer">
            <span class="newsletterConditions" style="color: #000000"
              >{{Conditions_title}} {{Conditions_description}}
              {{{Conditions_unsubscribe}}}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
    {{{company_details}}}
  </body>
</html>
`,
  },
  {
    title: "Sunday NS with:",
    description:
      "Header\nTimer + Freebies Pic \nTimer\n 4 categories \nWithout CTA's\nFooter",
    is_active: true,
    fallback: {
      Newsletter_bg_color: "#fbf5f5",
      Timer_bg_color: "#750000",
      Timer_color: "#fff",
      Timer2_bg_color: "#750000",
      Timer2_color: "#fff",

      Top_image_src: "https://beliani.info/newsletter/2022/uk240150_01.jpg",

      Timer_href: "/lp25-02-17",
      Timer_src: "https://gen.sendtric.com/countdown/akikmw4bkt",
      Timer_freebie_src: 2025,

      Timer2_href: "/lp25-02-17",
      Timer2_src: "https://gen.sendtric.com/countdown/akikmw4bkt",

      Campaign_src_1: 20250217,
      Campaign_src_2: 20250219,
      Campaign_src_3: 20250219,
      Campaign_src_4: 20250220,

      Banner_href_1: "/lp25-02-17",
      Banner_href_2: "/lp25-02-18",
      Banner_href_3: "/lp25-02-19",
      Banner_href_4: "/lp25-02-20",

      Conditions_title: "Conditions title",
      Conditions_description: "Condition description",
      Conditions_unsubscribe: "Conditions unsubscribe",
    },
    html: `<!DOCTYPE html PUBLIC"-//W3C//DTD XHTML 1.0 Transitional//EN""http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html
  xmlns="http://www.w3.org/1999/xhtml"
  xmlns:o="urn:schemas-microsoft-com:office:office"
  xmlns:v="urn:schemas-microsoft-com:vml"
>
  <head>
    <title>Beliani</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="x-apple-disable-message-reformatting" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, user-scalable=yes"
    />
    <meta name="color-scheme" content="light only" />
    <meta name="supported-color-schemes" content="light only" />
    <link
      href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700&amp;subset=cyrillic-ext,latin-ext"
    />
    <style>
      table,
      td {
        mso-table-lspace: 0pt;
        mso-table-rspace: 0pt;
      }
      img {
        -ms-interpolation-mode: bicubic;
      }
      .title-advantages {
        text-align: center;
        font-size: 11px;
        color: #8c8278;
        padding-bottom: 10px;
        padding-top: 10px;
        margin: 0;
      }
      .title-advantages-item {
        margin-left: 4px;
      }
      .newsletterRecommendationHeader {
        text-align: center;
        font-size: 11px;
        color: #8c8278;
        margin-bottom: 10px;
        margin-top: 10px;
      }
      .newsletterFreebieContainer {
        padding-left: 10px;
      }
      .newsletterBottom80px {
        padding-bottom: 80px;
      }
      .newsletterBottom10px {
        padding-bottom: 10px;
      }
      .newsletterContainer {
        padding-left: 20px;
        padding-right: 20px;
      }
      .newsletterCta {
        font-size: 20px;
        line-height: 1.2;
        font-family: "Open Sans", sans-serif;
      }
      .newsletterCode {
        font-size: 20px;
        line-height: 1.2;
        font-family: "Open Sans", sans-serif;
      }
      .newsletterBottom20px {
        padding-bottom: 20px;
      }
      .newsletterBottom35px {
        padding-bottom: 35px;
      }
      .newsletterBottom60px {
        padding-bottom: 60px;
      }
      .newsletterParagraph {
        font-size: 18px;
        font-family: "Open Sans", sans-serif;
        line-height: 1.2;
      }
      .newsletterTitleOfferPart {
        font-size: 30px;
        font-family: "Open Sans", sans-serif;
        line-height: 1.2;
      }
      .newsletterTitle {
        font-size: 30px;
        font-family: "Open Sans", sans-serif;
        line-height: 1.2;
      }
      .newsletterProductTitle {
        font-size: 20px;
        font-family: "Open Sans", sans-serif;
        line-height: 1.2;
      }
      .newsletterProductLowPrice {
        font-size: 18px;
        font-family: "Open Sans", sans-serif;
        line-height: 1.2;
        font-weight: 600;
      }
      .newsletterProductHightPrice {
        font-size: 14px;
        font-family: "Open Sans", sans-serif;
        line-height: 1.2;
        text-decoration: line-through;
      }
      .newsletterRight10px {
        padding-right: 10px;
      }
      .newsletterLeft10px {
        padding-left: 10px;
      }
      .newsletterFooter {
        padding-left: 20px !important;
        padding-right: 20px !important;
      }
      .newsletterConditions {
        color: black;
        font-family: "Open Sans", sans-serif;
        font-size: 8px;
      }
      .newsletterFooterCompanyDetails {
        vertical-align: middle;
        padding-top: 20px;
        padding-right: 0px;
        padding-bottom: 20px;
        font-size: 11px;
        font-family: "Open Sans", sans-serif !important;
        color: #000000;
        background: #ececec;
        width: 100%;
      }
      .newsletterFooterTitle {
        text-align: left;
        color: #000000;
        font-family: "Open Sans", sans-serif;
        font-size: 20px;
      }
      .newsletterProductTitleFreebie {
        text-align: center;
        font-family: "Open Sans", sans-serif;
        font-size: 20px;
      }
      .newsletterFooterCategoryLEFT {
        padding-bottom: 20px !important;
        padding-right: 10px !important;
      }
      .newsletterFooterCategoryRIGHT {
        padding-bottom: 20px !important;
        padding-left: 10px !important;
      }
      .newsletterFooterCategoryLEFTBottom {
        padding-right: 10px !important;
      }
      .newsletterFooterCategoryRIGHTBottom {
        padding-left: 10px !important;
      }
      .newsletterSocialIcon {
        padding-left: 25px !important;
      }
      .newsletterTopBottomContainer {
        padding-top: 35px !important;
        padding-bottom: 35px !important;
      }
      .newsletterKlarnaBannerContainer {
        padding-top: 35px !important;
        padding-bottom: 35px !important;
      }
      @media screen and (max-width: 768px) {
        .newsletterFooterCategoryLEFTBottom {
          padding-right: 5px !important;
        }
        .newsletterFooterCategoryRIGHTBottom {
          padding-left: 5px !important;
        }
        .newsletterFooterCategoryLEFT {
          padding-bottom: 10px !important;
          padding-right: 5px !important;
        }
        .newsletterFooterCategoryRIGHT {
          padding-bottom: 10px !important;
          padding-left: 5px !important;
        }
        .newsletterSocialIcon {
          padding-left: 13px !important;
        }
        .newsletterTopBottomContainer {
          padding-top: 20px !important;
          padding-bottom: 20px !important;
        }
        .newsletterFooterTitle {
          font-size: 18px;
        }
        .newsletterProductTitleFreebie {
          font-size: 18px;
        }
        .newsletterProductTitle {
          font-size: 18px;
        }
        .newsletterProductLowPrice {
          font-size: 16px;
        }
        .newsletterProductHightPrice {
          display: block;
        }
        .newsletterProductTitleContainer {
          padding-top: 10px;
        }
        .newsletterTitle {
          font-size: 25px;
        }
        .newsletterTitleOfferPart {
          font-size: 25px;
        }
        .newsletterContainer {
          padding-left: 10px;
          padding-right: 10px;
        }
        .newsletterFreebieContainer {
          padding-left: 10px;
          padding-right: 0px !important;
        }
        .newsletterBottom35px {
          padding-bottom: 20px;
        }
        .newsletterBottom60px {
          padding-bottom: 40px;
        }
        .newsletterParagraph {
          font-size: 16px;
        }
        .newsletterLeft10px {
          padding-left: 5px;
        }
        .newsletterRight10px {
          padding-right: 5px;
        }
        .newsletterBottom20px {
          padding-bottom: 10px;
        }
        .newsletterBottom80px {
          padding-bottom: 50px;
        }
      }
      @media screen and (max-width: 570px) {
        .newsletterProductTitleFreebie {
          font-size: 16px;
        }
      }
      @media screen and (max-width: 460px) {
        .newsletterProductTitleFreebie {
          font-size: 14px;
        }
      }
      @media screen and (max-width: 370px) {
        .newsletterProductTitleFreebie {
          font-size: 12px;
        }
      }
    </style>
  </head>
  <body
    aria-readonly="false"
    class="body"
    style="
      width: 100% !important;
      padding: 0 !important;
      margin: 0 auto !important;
      font-family: 'Open Sans', sans-serif !important;
      font-size: 13px;
      color: #000000;
      text-align: left;
      background-color: #ececec;
    "
    width="100%"
  >
    {{{header}}}
    <table
      align="center"
      border="0"
      cellpadding="0"
      cellspacing="0"
      id="newsletter"
      style="max-width:650px;width:100%;background-color:{{Newsletter_bg_color}};color:#000"
      width="100%"
    >
      <tbody>
        <tr>
          <td align="center">
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
              <tbody>
                <tr>
                  <td>
                    <a href="{{origin}}{{utm}}{{id}}"
                      ><img
                        alt=""
                        loading="lazy"
                        src="{{Top_image_src}}"
                        style="vertical-align: middle; max-width: 100%"
                    /></a>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td align="center" style="background-color:{{Newsletter_bg_color}}">
            <table
              align="center"
              border="0"
              cellpadding="0"
              cellspacing="0"
              width="100%"
            >
              <tbody>
                <tr>
                  <td align="center">
                    <table
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      width="100%"
                    >
                      <tbody>
                        <tr>
                          <td>
                            <a
                              href="{{origin}}/content{{Banner_href_1}}{{utm}}{{id}}"
                              ><img
                                alt=""
                                loading="lazy"
                                src="{{picture_server_url}}{{slug}}{{Campaign_src_1}}_mb.png?ver=4"
                                style="vertical-align: middle; max-width: 100%"
                            /></a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td
            style="background-color:{{Timer_bg_color}};color:{{Timer_color}};"
          >
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
              <tbody>
                <tr>
                  <td class="newsletterBottom20px"></td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td align="center" style="background-color:{{Timer_bg_color}}">
            <a href="{{origin}}/content{{Timer_href}}{{utm}}{{id}}"
              ><img
                alt="Timer gif"
                loading="lazy"
                src="{{Timer_src}}"
                style="vertical-align: middle; max-width: 100%"
            /></a>
          </td>
        </tr>
        <tr>
          <td style="background-color:{{Timer_bg_color}}">
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
              <tbody>
                <tr>
                  <td class="newsletterBottom20px"></td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td align="center" style="background-color:{{Timer_bg_color}}">
            <a href="{{origin}}/content{{Timer_href}}{{utm}}{{id}}"
              ><img
                alt="Freebies picture"
                loading="lazy"
                src="{{picture_server_url}}{{Timer_freebie_src}}free.png?ver=4"
                style="vertical-align: middle; max-width: 100%"
            /></a>
          </td>
        </tr>
        <tr>
          <td style="background-color:{{Newsletter_bg_color}}">
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
              <tbody>
                <tr>
                  <td class="newsletterBottom35px"></td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td align="center" style="background-color:{{Newsletter_bg_color}}">
            <table
              align="center"
              border="0"
              cellpadding="0"
              cellspacing="0"
              width="100%"
            >
              <tbody>
                <tr>
                  <td align="center">
                    <table
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      width="100%"
                    >
                      <tbody>
                        <tr>
                          <td>
                            <a
                              href="{{origin}}/content{{Banner_href_2}}{{utm}}{{id}}"
                              ><img
                                alt=""
                                loading="lazy"
                                src="{{picture_server_url}}{{slug}}{{Campaign_src_2}}_mb.png?ver=4"
                                style="vertical-align: middle; max-width: 100%"
                            /></a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
         <tr>
          <td
            style="background-color:{{Timer2_bg_color}};color:{{Timer2_color}};"
          >
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
              <tbody>
                <tr>
                  <td class="newsletterBottom20px"></td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td align="center" style="background-color:{{Timer2_bg_color}}">
            <a href="{{origin}}/content{{Timer2_href}}{{utm}}{{id}}"
              ><img
                alt="Timer gif"
                loading="lazy"
                src="{{Timer2_src}}"
                style="vertical-align: middle; max-width: 100%"
            /></a>
          </td>
        </tr>
        <tr>
          <td style="background-color:{{Timer2_bg_color}}">
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
              <tbody>
                <tr>
                  <td class="newsletterBottom20px"></td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td style="background-color:{{Newsletter_bg_color}}">
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
              <tbody>
                <tr>
                  <td class="newsletterBottom35px"></td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td align="center" style="background-color:{{Newsletter_bg_color}}">
            <table
              align="center"
              border="0"
              cellpadding="0"
              cellspacing="0"
              width="100%"
            >
              <tbody>
                <tr>
                  <td align="center">
                    <table
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      width="100%"
                    >
                      <tbody>
                        <tr>
                          <td>
                            <a
                              href="{{origin}}/content{{Banner_href_3}}{{utm}}{{id}}"
                              ><img
                                alt=""
                                loading="lazy"
                                src="{{picture_server_url}}{{slug}}{{Campaign_src_3}}_mb.png?ver=4"
                                style="vertical-align: middle; max-width: 100%"
                            /></a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td style="background-color:{{Newsletter_bg_color}}">
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
              <tbody>
                <tr>
                  <td class="newsletterBottom35px"></td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td align="center" style="background-color:{{Newsletter_bg_color}}">
            <table
              align="center"
              border="0"
              cellpadding="0"
              cellspacing="0"
              width="100%"
            >
              <tbody>
                <tr>
                  <td align="center">
                    <table
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      width="100%"
                    >
                      <tbody>
                        <tr>
                          <td>
                            <a
                              href="{{origin}}/content{{Banner_href_4}}{{utm}}{{id}}"
                              ><img
                                alt=""
                                loading="lazy"
                                src="{{picture_server_url}}{{slug}}{{Campaign_src_4}}_mb.png?ver=4"
                                style="vertical-align: middle; max-width: 100%"
                            /></a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        
        
        <tr>
          <td style="background-color:{{Newsletter_bg_color}}">
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
              <tbody>
                <tr>
                  <td class="newsletterBottom80px"></td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
    
      {{{services_banner}}} {{{footer_categories}}} {{{klarna}}} {{{socials}}}
      {{{advantages}}}
    
    <table
      align="center"
      border="0"
      cellpadding="0"
      cellspacing="0"
      class="newsletterContainer"
      style="max-width: 650px; width: 100%; background-color: #ffffff"
      width="650"
    >
      <tbody>
        <tr>
          <td>
            <img
              alt=""
              loading="lazy"
              src="https://beliani.info/newsletter/2022/line.jpg"
              style="display: block; max-width: 100%"
            />
          </td>
        </tr>
        <tr>
          <td align="left" class="newsletterTopBottomContainer">
            <span class="newsletterConditions" style="color: #000000"
              >{{Conditions_title}} {{Conditions_description}}
              {{{Conditions_unsubscribe}}}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
    {{{company_details}}}
  </body>
</html>
`,
  },
  {
    title: "Monday NS with:",
    description:
      "Header\nOffer part\nFreebies: x6\nIntro\nCategories: x4 \nSoon ending\nFooter",
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
    <!DOCTYPE html PUBLIC"-//W3C//DTD XHTML 1.0 Transitional//EN""http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">\n<html\n  xmlns="http://www.w3.org/1999/xhtml"\n  xmlns:o="urn:schemas-microsoft-com:office:office"\n  xmlns:v="urn:schemas-microsoft-com:vml"\n>\n  <head>\n    <title>Beliani</title>\n    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />\n    <meta name="x-apple-disable-message-reforfmatting" />\n    <meta\n      name="viewport"\n      content="width=device-width, initial-scale=1, user-scalable=yes"\n    />\n    <meta name="color-scheme" content="light only" />\n    <meta name="supported-color-schemes" content="light only" />\n    <link\n      href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700&amp;subset=cyrillic-ext,latin-ext"\n    />\n    <style>\n      table,\n      td {\n        mso-table-lspace: 0pt;\n        mso-table-rspace: 0pt;\n      }\n      img {\n        -ms-interpolation-mode: bicubic;\n      }\n      .title-advantages {\n        text-align: center;\n        font-size: 11px;\n        color: #8c8278;\n        padding-bottom: 10px;\n        padding-top: 10px;\n        margin: 0;\n      }\n      .title-advantages-item {\n        margin-left: 4px;\n      }\n      .newsletterRecommendationHeader {\n        text-align: center;\n        font-size: 11px;\n        color: #8c8278;\n        margin-bottom: 10px;\n        margin-top: 10px;\n      }\n      .newsletterFreebieContainer {\n        padding-left: 10px;\n      }\n      .newsletterBottom80px {\n        padding-bottom: 80px;\n      }\n      .newsletterBottom10px {\n        padding-bottom: 10px;\n      }\n      .newsletterContainer {\n        padding-left: 20px;\n        padding-right: 20px;\n      }\n      .newsletterCta {\n        font-size: 20px;\n        line-height: 1.2;\n        font-family: "Open Sans", sans-serif;\n      }\n      .newsletterCode {\n        font-size: 20px;\n        line-height: 1.2;\n        font-family: "Open Sans", sans-serif;\n      }\n      .newsletterBottom20px {\n        padding-bottom: 20px;\n      }\n      .newsletterBottom35px {\n        padding-bottom: 35px;\n      }\n      .newsletterBottom60px {\n        padding-bottom: 60px;\n      }\n      .newsletterParagraph {\n        font-size: 18px;\n        font-family: "Open Sans", sans-serif;\n        line-height: 1.2;\n      }\n      .newsletterTitleOfferPart {\n        font-size: 30px;\n        font-family: "Open Sans", sans-serif;\n        line-height: 1.2;\n      }\n      .newsletterTitle {\nfont-weight: 600;        font-size: 30px;\n        font-family: "Open Sans", sans-serif;\n        line-height: 1.2;\n      }\n      .newsletterProductTitle {\n        font-size: 20px;\n        font-family: "Open Sans", sans-serif;\n        line-height: 1.2;\n      }\n      .newsletterProductLowPrice {\n        font-size: 18px;\n        font-family: "Open Sans", sans-serif;\n        line-height: 1.2;\n        font-weight: 600;\n      }\n      .newsletterProductHightPrice {\n        font-size: 14px;\n        font-family: "Open Sans", sans-serif;\n        line-height: 1.2;\n        text-decoration: line-through;\n      }\n      .newsletterRight10px {\n        padding-right: 10px;\n      }\n      .newsletterLeft10px {\n        padding-left: 10px;\n      }\n      .newsletterFooter {\n        padding-left: 20px !important;\n        padding-right: 20px !important;\n      }\n      .newsletterConditions {\n        color: black;\n        font-family: "Open Sans", sans-serif;\n        font-size: 8px;\n      }\n      .newsletterFooterCompanyDetails {\n        vertical-align: middle;\n        padding-top: 20px;\n        padding-right: 0px;\n        padding-bottom: 20px;\n        font-size: 11px;\n        font-family: "Open Sans", sans-serif !important;\n        color: #000000;\n        background: #ececec;\n        width: 100%;\n      }\n      .newsletterFooterTitle {\n        text-align: left;\n        color: #000000;\n        font-family: "Open Sans", sans-serif;\n        font-size: 20px;\n      }\n      .newsletterProductTitleFreebie {\n        text-align: center;\n        font-family: "Open Sans", sans-serif;\n        font-size: 20px;\n      }\n      .newsletterFooterCategoryLEFT {\n        padding-bottom: 20px !important;\n        padding-right: 10px !important;\n      }\n      .newsletterFooterCategoryRIGHT {\n        padding-bottom: 20px !important;\n        padding-left: 10px !important;\n      }\n      .newsletterFooterCategoryLEFTBottom {\n        padding-right: 10px !important;\n      }\n      .newsletterFooterCategoryRIGHTBottom {\n        padding-left: 10px !important;\n      }\n      .newsletterSocialIcon {\n        padding-left: 25px !important;\n      }\n      .newsletterTopBottomContainer {\n        padding-top: 35px !important;\n        padding-bottom: 35px !important;\n      }\n      .newsletterKlarnaBannerContainer {\n        padding-top: 35px !important;\n        padding-bottom: 35px !important;\n      }\n      @media screen and (max-width: 768px) {\n        .newsletterFooterCategoryLEFTBottom {\n          padding-right: 5px !important;\n        }\n        .newsletterFooterCategoryRIGHTBottom {\n          padding-left: 5px !important;\n        }\n        .newsletterFooterCategoryLEFT {\n          padding-bottom: 10px !important;\n          padding-right: 5px !important;\n        }\n        .newsletterFooterCategoryRIGHT {\n          padding-bottom: 10px !important;\n          padding-left: 5px !important;\n        }\n        .newsletterSocialIcon {\n          padding-left: 13px !important;\n        }\n        .newsletterTopBottomContainer {\n          padding-top: 20px !important;\n          padding-bottom: 20px !important;\n        }\n        .newsletterFooterTitle {\n          font-size: 18px;\n        }\n        .newsletterProductTitleFreebie {\n          font-size: 18px;\n        }\n        .newsletterProductTitle {\n          font-size: 18px;\n        }\n        .newsletterProductLowPrice {\n          font-size: 16px;\n        }\n        .newsletterProductHightPrice {\n          display: block;\n        }\n        .newsletterProductTitleContainer {\n          padding-top: 10px;\n        }\n        .newsletterTitle {\n          font-size: 25px;\n        }\n        .newsletterTitleOfferPart {\n          font-size: 25px;\n        }\n        .newsletterContainer {\n          padding-left: 10px;\n          padding-right: 10px;\n        }\n        .newsletterFreebieContainer {\n          padding-left: 10px;\n          padding-right: 0px !important;\n        }\n        .newsletterBottom35px {\n          padding-bottom: 20px;\n        }\n        .newsletterBottom60px {\n          padding-bottom: 40px;\n        }\n        .newsletterParagraph {\n          font-size: 16px;\n        }\n        .newsletterLeft10px {\n          padding-left: 5px;\n        }\n        .newsletterRight10px {\n          padding-right: 5px;\n        }\n        .newsletterBottom20px {\n          padding-bottom: 10px;\n        }\n        .newsletterBottom80px {\n          padding-bottom: 50px;\n        }\n      }\n      @media screen and (max-width: 570px) {\n        .newsletterProductTitleFreebie {\n          font-size: 16px;\n        }\n      }\n      @media screen and (max-width: 460px) {\n        .newsletterProductTitleFreebie {\n          font-size: 14px;\n        }\n      }\n      @media screen and (max-width: 370px) {\n        .newsletterProductTitleFreebie {\n          font-size: 12px;\n        }\n      }\n    </style>\n  </head>\n  <body\n    class="body"\n    style="\n      width: 100% !important;\n      padding: 0 !important;\n      margin: 0 auto !important;\n      font-family: \'Open Sans\', sans-serif !important;\n      font-size: 13px;\n      color: #000000;\n      text-align: left;\n      background-color: #ececec;\n    "\n    width="100%"\n  >
    {{{header}}}
      <table cellspacing="0" cellpadding="0" border="0" align="center" width="650" style="background-color: {{Campaign_Background}}; max-width: 650px; width: 100%;" id="newsletter">
        <tbody>
          <tr>
            <td>
                <table border="0" cellspacing="0" cellpadding="0" width="100%" >
                  <tbody>
                      <tr>
                          <td>
                            <a href="{{origin}}/content/lp{{Campaign_alias}}{{utm}}{{id}}">
                              <img alt="" src="{{picture_server_url}}{{slug}}{{Campaign_name}}_01.png" style="vertical-align: middle; max-width: 100%;" loading="lazy">
                            </a>
                          </td>
                      </tr>
                  </tbody>
                </table>
                  <table border="0" cellspacing="0" cellpadding="0" width="100%" >
                    <tbody>
                        <tr>
                            <td>
                              <a href="{{origin}}/content/lp{{Campaign_alias}}{{utm}}{{id}}">
                                <img alt="" src="{{picture_server_url}}{{slug}}{{Campaign_name}}_TopImage.png" style="vertical-align: middle; max-width: 100%;" loading="lazy">
                              </a>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <table class="newsletterContainer" cellspacing="0" cellpadding="0" border="0" align="center" width="100%" style="background-color: {{Offer_part_Background}}">
                  <tbody>
                    <tr>
                      <td class="newsletterBottom35px"></td>
                    </tr>
                    <tr>
                      <td align="center">
                        <span class="newsletterParagraph" style="color: {{Offer_part_Color}}">
                          {{Offer_part_1}}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td class="newsletterBottom35px"></td>
                    </tr>
                    <tr>
                      <td align="center">
                        <span class="newsletterParagraph" style="color: {{Offer_part_Color}}">
                          {{Offer_part_2}}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td class="newsletterBottom35px"></td>
                    </tr>
                    <tr>
                        <td align="center">
                          <a href={{Code_href}} style="text-decoration:underline!important; color: {{Offer_part_Color}};">
                            <span class="newsletterCode" style="color: {{Offer_part_Color}}">
                              {{Code_text}}
                            </span>
                          </a>
                        </td>
                    </tr>
                    <tr>
                      <td class="newsletterBottom35px"></td>
                    </tr>
                    <tr>
                      <td align="center">
                        <span class="newsletterParagraph" style="color: {{Offer_part_Color}}">
                          {{Offer_part_3}}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td class="newsletterBottom35px"></td>
                    </tr>
                    <tr>
                      <td align="center">
                        <span class="newsletterParagraph" style="color: {{Offer_part_Color}}">
                          {{Offer_part_4}}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td class="newsletterBottom35px"></td>
                    </tr>
                  </tbody>
                </table>
                
                <table class="newsletterContainer" cellspacing="0" cellpadding="0" border="0" align="center" width="100%" style="background-color: {{Freebie_Background}}">
                  <tbody>
                    <tr>
                      <td>
                        <table align="center" border="0" cellpadding="0" cellspacing="0">
                          <tbody>
                            <tr>
                              <td style="vertical-align:top;width:33.33%;">
                              <table align="center" cellpadding="0" cellspacing="0">
                                <tbody>
                                  <tr>
                                    <td style="padding-right:5px;padding-left:5px;">
                                      <table align="center" cellpadding="0" cellspacing="0">
                                        <tbody>
                                          <tr>
                                            <td align="center"><a href="{{JSON_Freebie_product_1.href}}"><img alt="{{JSON_Freebie_product_1.name}}" loading="lazy" src="{{Freebie_product_src_1}}" style="vertical-align:middle;max-width:100%;"></a></td>
                                          </tr>
                                          <tr>
                                            <td>
                                              <table align="center" cellpadding="0" cellspacing="0" style="color: {{Freebie_Color}};">
                                                <tbody>
                                                  <tr>
                                                    <td class="newsletterBottom20px"></td>
                                                  </tr>
                                                  <tr>
                                                    <td align="center"><span class="newsletterProductTitleFreebie">{{JSON_Freebie_product_1.name}}</span></td>
                                                  </tr>
                                                  <tr>
                                                    <td align="center" ><span class="newsletterProductLowPrice">{{JSON_Freebie_product_1.lowPrice}} </span><span class="newsletterProductHightPrice">{{JSON_Freebie_product_1.highPrice}}</span></td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              </td>
                              <td style="vertical-align:top;width:33.33%;">
                              <table align="center" cellpadding="0" cellspacing="0">
                                <tbody>
                                  <tr>
                                    <td style="padding-right:5px;padding-left:5px;">
                                      <table align="center" cellpadding="0" cellspacing="0">
                                        <tbody>
                                          <tr>
                                            <td align="center"><a href="{{JSON_Freebie_product_2.href}}"><img alt="{{JSON_Freebie_product_2.name}}" loading="lazy" src="{{Freebie_product_src_2}}" style="vertical-align:middle;max-width:100%;"></a></td>
                                          </tr>
                                          <tr>
                                            <td>
                                              <table align="center" cellpadding="0" cellspacing="0" style="color: {{Freebie_Color}};">
                                                <tbody>
                                                  <tr>
                                                    <td class="newsletterBottom20px"></td>
                                                  </tr>
                                                  <tr>
                                                    <td align="center"><span class="newsletterProductTitleFreebie">{{JSON_Freebie_product_2.name}}</span></td>
                                                  </tr>
                                                  <tr>
                                                    <td align="center" ><span class="newsletterProductLowPrice">{{JSON_Freebie_product_2.lowPrice}} </span><span class="newsletterProductHightPrice">{{JSON_Freebie_product_2.highPrice}}</span></td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              </td>
                              <td style="vertical-align:top;width:33.33%;">
                              <table align="center" cellpadding="0" cellspacing="0">
                                <tbody>
                                  <tr>
                                    <td style="padding-right:5px;padding-left:5px;">
                                      <table align="center" cellpadding="0" cellspacing="0">
                                        <tbody>
                                          <tr>
                                            <td align="center"><a href="{{JSON_Freebie_product_3.href}}"><img alt="{{JSON_Freebie_product_3.name}}" loading="lazy" src="{{Freebie_product_src_3}}" style="vertical-align:middle;max-width:100%;"></a></td>
                                          </tr>
                                          <tr>
                                            <td>
                                              <table align="center" cellpadding="0" cellspacing="0" style="color: {{Freebie_Color}};">
                                                <tbody>
                                                  <tr>
                                                    <td class="newsletterBottom20px"></td>
                                                  </tr>
                                                  <tr>
                                                    <td align="center"><span class="newsletterProductTitleFreebie">{{JSON_Freebie_product_3.name}}</span></td>
                                                  </tr>
                                                  <tr>
                                                    <td align="center" ><span class="newsletterProductLowPrice">{{JSON_Freebie_product_3.lowPrice}} </span><span class="newsletterProductHightPrice">{{JSON_Freebie_product_3.highPrice}}</span></td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                    <tr>
                    <tr>
                      <td class="newsletterBottom20px"></td>
                    </tr>
                    <tr>
                      <td>
                      <table align="center" border="0" cellpadding="0" cellspacing="0">
                        <tbody>
                          <tr>
                            <td style="vertical-align:top;width:33.33%;">
                            <table align="center" cellpadding="0" cellspacing="0">
                              <tbody>
                                <tr>
                                  <td style="padding-right:5px;padding-left:5px;">
                                      <table align="center" cellpadding="0" cellspacing="0">
                                        <tbody>
                                          <tr>
                                            <td align="center"><a href="{{JSON_Freebie_product_4.href}}"><img alt="{{JSON_Freebie_product_4.name}}" loading="lazy" src="{{Freebie_product_src_4}}" style="vertical-align:middle;max-width:100%;"></a></td>
                                          </tr>
                                          <tr>
                                            <td>
                                              <table align="center" cellpadding="0" cellspacing="0" style="color: {{Freebie_Color}};">
                                                <tbody>
                                                  <tr>
                                                    <td class="newsletterBottom20px"></td>
                                                  </tr>
                                                  <tr>
                                                    <td align="center"><span class="newsletterProductTitleFreebie">{{JSON_Freebie_product_4.name}}</span></td>
                                                  </tr>
                                                  <tr>
                                                    <td align="center" ><span class="newsletterProductLowPrice">{{JSON_Freebie_product_4.lowPrice}} </span><span class="newsletterProductHightPrice">{{JSON_Freebie_product_4.highPrice}}</span></td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            </td>
                            <td style="vertical-align:top;width:33.33%;">
                            <table align="center" cellpadding="0" cellspacing="0">
                              <tbody>
                                <tr>
                                  <td style="padding-right:5px;padding-left:5px;">
                                  <table align="center" cellpadding="0" cellspacing="0">
                                      <table align="center" cellpadding="0" cellspacing="0">
                                        <tbody>
                                          <tr>
                                            <td align="center"><a href="{{JSON_Freebie_product_5.href}}"><img alt="{{JSON_Freebie_product_5.name}}" loading="lazy" src="{{Freebie_product_src_5}}" style="vertical-align:middle;max-width:100%;"></a></td>
                                          </tr>
                                          <tr>
                                            <td>
                                              <table align="center" cellpadding="0" cellspacing="0" style="color: {{Freebie_Color}};">
                                                <tbody>
                                                  <tr>
                                                    <td class="newsletterBottom20px"></td>
                                                  </tr>
                                                  <tr>
                                                    <td align="center"><span class="newsletterProductTitleFreebie">{{JSON_Freebie_product_5.name}}</span></td>
                                                  </tr>
                                                  <tr>
                                                    <td align="center" ><span class="newsletterProductLowPrice">{{JSON_Freebie_product_5.lowPrice}} </span><span class="newsletterProductHightPrice">{{JSON_Freebie_product_5.highPrice}}</span></td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            </td>
                            <td style="vertical-align:top;width:33.33%;">
                            <table align="center" cellpadding="0" cellspacing="0">
                              <tbody>
                                <tr>
                                  <td style="padding-right:5px;padding-left:5px;">
                                      <table align="center" cellpadding="0" cellspacing="0">
                                        <tbody>
                                          <tr>
                                            <td align="center"><a href="{{JSON_Freebie_product_6.href}}"><img alt="{{JSON_Freebie_product_6.name}}" loading="lazy" src="{{Freebie_product_src_6}}" style="vertical-align:middle;max-width:100%;"></a></td>
                                          </tr>
                                          <tr>
                                            <td>
                                              <table align="center" cellpadding="0" cellspacing="0" style="color: {{Freebie_Color}};">
                                                <tbody>
                                                  <tr>
                                                    <td class="newsletterBottom20px"></td>
                                                  </tr>
                                                  <tr>
                                                    <td align="center"><span class="newsletterProductTitleFreebie">{{JSON_Freebie_product_6.name}}</span></td>
                                                  </tr>
                                                  <tr>
                                                    <td align="center" ><span class="newsletterProductLowPrice">{{JSON_Freebie_product_6.lowPrice}} </span><span class="newsletterProductHightPrice">{{JSON_Freebie_product_6.highPrice}}</span></td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      </td>
                    </tr>
                    <tr>
                      <td class="newsletterBottom80px"></td>
                    </tr>
                  </tbody>
                </table>

                <table class="newsletterContainer" cellspacing="0" cellpadding="0" border="0" align="center" width="100%" style="background-color: {{Intro_Background}}">
                  <tbody>
                    <tr>
                      <td class="newsletterBottom35px"></td>
                    </tr>
                    <tr>
                      <td>
                        <table cellspacing="0" cellpadding="0" border="0" align="center" width="100%">
                          <tbody>
                            <tr>
                              <td align="left">
                                <span class="newsletterTitle" style="color: {{Intro_Color}}">
                                  {{Intro_title}}
                                </span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td class="newsletterBottom35px"></td>
                    </tr>
                    <tr>
                      <td>
                        <table cellspacing="0" cellpadding="0" border="0" align="center" width="100%">
                          <tbody>
                            <tr>
                              <td align="left" >
                                <span class="newsletterParagraph" style="color: {{Intro_Color}}">
                                  {{Intro_description}}
                                </span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td class="newsletterBottom35px"></td>
                    </tr>
                  </tbody>
                </table>
                

                <table border="0" cellspacing="0" cellpadding="0" width="100%" style="background-color: {{Category_Background_1}}">
                  <thead>
                    <tr>
                      <td class="newsletterBottom35px"></td>
                    </tr>
                    <tr>
                      <td class="newsletterContainer">
                        <span class="newsletterTitle" style="color: {{Category_Color_1}}">
                          {{Category_title_1}}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td class="newsletterBottom35px"></td>
                    </tr>
                    <tr>
                      <td>
                        <a href="{{origin}}{{Category_href_1}}{{utm}}{{id}}">
                          <img alt="{{Category_title_1}}" src="{{picture_server_url}}{{Campaign_name}}Category1.png" style="vertical-align: middle; max-width: 100%;" loading="lazy">
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td class="newsletterBottom35px"></td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="newsletterContainer">
                        <table cellspacing="0" cellpadding="0" style="width: 100%; ">
                          <tr>
                            <td class="newsletterBottom20px">
                              <!-- 1-2 Products table -->
                              <table cellspacing="0" cellpadding="0" style="width: 100%; ">
                                <tr>
                                  <!-- vertical align top added for reason when product have only 1 price on mobile product grid will differ for another one-->
                                  <td style="padding-top: 0px; padding-left: 0px; vertical-align: top; width: 50%" class="newsletterRight10px">
                                    <table cellpadding="0" cellspacing="0" style="width:100%;">
                                      <tbody>
                                        <tr>
                                          <td style="padding-top:0px;padding-bottom:0px;padding-left:0px;padding-right:0px;">
                                            <table cellpadding="0" cellspacing="0" style="width:100%;">
                                              <tbody>
                                                <tr>
                                                  <td align="left" class="newsletterBottom20px" style="padding-top:0px;padding-left:0px;padding-right:0px;">
                                                  <table cellpadding="0" cellspacing="0" style="max-width:650px;width:100%;">
                                                    <tbody>
                                                      <tr>
                                                        <td><a href="{{JSON_Product_11.href}}"><img alt="{{JSON_Product_11.name}}" loading="lazy" src="{{Product_src_11}}" style="vertical-align:middle;max-width:100%;"></a></td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>

                                            <table cellpadding="0" cellspacing="0" style="width:100%; color: {{Category_Color_1}};" >
                                              <tbody>
                                                <tr>
                                                  <td align="left" style="padding-top:0px;padding-left:0px;padding-right:0px;padding-bottom:0px;"><span class="newsletterProductTitle">{{JSON_Product_11.name}}</span></td>
                                                </tr>
                                                <tr>
                                                  <td align="left" style="padding-top:0px;padding-bottom:8px;padding-left:0px;padding-right:0px;"><span class="newsletterProductLowPrice">{{JSON_Product_11.lowPrice}} </span><span class="newsletterProductHightPrice">{{JSON_Product_11.highPrice}}</span></td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                  <!-- vertical align top added for reason when product have only 1 price on mobile product grid will differ for another one-->
                                  <td style="padding-top: 0px; padding-right: 0px; vertical-align: top; width: 50%" class="newsletterLeft10px">
                                    <table cellpadding="0" cellspacing="0" style="width:100%;">
                                      <tbody>
                                        <tr>
                                          <td style="padding-top:0px;padding-bottom:0px;padding-left:0px;padding-right:0px;">
                                            <table cellpadding="0" cellspacing="0" style="width:100%;">
                                              <tbody>
                                                <tr>
                                                  <td align="left" class="newsletterBottom20px" style="padding-top:0px;padding-left:0px;padding-right:0px;">
                                                  <table cellpadding="0" cellspacing="0" style="max-width:650px;width:100%;">
                                                    <tbody>
                                                      <tr>
                                                        <td><a href="{{JSON_Product_12.href}}"><img alt="{{JSON_Product_12.name}}" loading="lazy" src="{{Product_src_11}}" style="vertical-align:middle;max-width:100%;"></a></td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>

                                            <table cellpadding="0" cellspacing="0" style="width:100%; color: {{Category_Color_1}};" >
                                              <tbody>
                                                <tr>
                                                  <td align="left" style="padding-top:0px;padding-left:0px;padding-right:0px;padding-bottom:0px;"><span class="newsletterProductTitle">{{JSON_Product_12.name}}</span></td>
                                                </tr>
                                                <tr>
                                                  <td align="left" style="padding-top:0px;padding-bottom:8px;padding-left:0px;padding-right:0px;"><span class="newsletterProductLowPrice">{{JSON_Product_12.lowPrice}} </span><span class="newsletterProductHightPrice">{{JSON_Product_12.highPrice}}</span></td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <!-- 3-4 Products table -->
                              <table cellspacing="0" cellpadding="0" style="width: 100%; ">
                                <tr>
                                  <!-- vertical align top added for reason when product have only 1 price on mobile product grid will differ for another one-->
                                  <td style="padding-top: 0px; padding-left: 0px; vertical-align: top; width: 50%" class="newsletterRight10px">
                                    <table cellpadding="0" cellspacing="0" style="width:100%;">
                                      <tbody>
                                        <tr>
                                          <td style="padding-top:0px;padding-bottom:0px;padding-left:0px;padding-right:0px;">
                                            <table cellpadding="0" cellspacing="0" style="width:100%;">
                                              <tbody>
                                                <tr>
                                                  <td align="left" class="newsletterBottom20px" style="padding-top:0px;padding-left:0px;padding-right:0px;">
                                                  <table cellpadding="0" cellspacing="0" style="max-width:650px;width:100%;">
                                                    <tbody>
                                                      <tr>
                                                        <td><a href="{{JSON_Product_13.href}}"><img alt="{{JSON_Product_13.name}}" loading="lazy" src="{{Product_src_11}}" style="vertical-align:middle;max-width:100%;"></a></td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>

                                            <table cellpadding="0" cellspacing="0" style="width:100%; color: {{Category_Color_1}};" >
                                              <tbody>
                                                <tr>
                                                  <td align="left" style="padding-top:0px;padding-left:0px;padding-right:0px;padding-bottom:0px;"><span class="newsletterProductTitle">{{JSON_Product_13.name}}</span></td>
                                                </tr>
                                                <tr>
                                                  <td align="left" style="padding-top:0px;padding-bottom:8px;padding-left:0px;padding-right:0px;"><span class="newsletterProductLowPrice">{{JSON_Product_13.lowPrice}} </span><span class="newsletterProductHightPrice">{{JSON_Product_13.highPrice}}</span></td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                  <!-- vertical align top added for reason when product have only 1 price on mobile product grid will differ for another one-->
                                  <td style="padding-top: 0px; padding-right: 0px; vertical-align: top; width: 50%" class="newsletterLeft10px">
                                    <table cellpadding="0" cellspacing="0" style="width:100%;">
                                      <tbody>
                                        <tr>
                                          <td style="padding-top:0px;padding-bottom:0px;padding-left:0px;padding-right:0px;">
                                            <table cellpadding="0" cellspacing="0" style="width:100%;">
                                              <tbody>
                                                <tr>
                                                  <td align="left" class="newsletterBottom20px" style="padding-top:0px;padding-left:0px;padding-right:0px;">
                                                  <table cellpadding="0" cellspacing="0" style="max-width:650px;width:100%;">
                                                    <tbody>
                                                      <tr>
                                                        <td><a href="{{JSON_Product_14.href}}"><img alt="{{JSON_Product_14.name}}" loading="lazy" src="{{Product_src_11}}" style="vertical-align:middle;max-width:100%;"></a></td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>

                                            <table cellpadding="0" cellspacing="0" style="width:100%; color: {{Category_Color_1}};" >
                                              <tbody>
                                                <tr>
                                                  <td align="left" style="padding-top:0px;padding-left:0px;padding-right:0px;padding-bottom:0px;"><span class="newsletterProductTitle">{{JSON_Product_14.name}}</span></td>
                                                </tr>
                                                <tr>
                                                  <td align="left" style="padding-top:0px;padding-bottom:8px;padding-left:0px;padding-right:0px;"><span class="newsletterProductLowPrice">{{JSON_Product_14.lowPrice}} </span><span class="newsletterProductHightPrice">{{JSON_Product_14.highPrice}}</span></td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td class="newsletterBottom35px">
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td align="center" class="newsletterBottom80px">
                        <a href="{{origin}}{{Category_href_1}}{{utm}}{{id}}" style="color: {{Category_Color_1}}; text-decoration: underline;">
                          <span class="newsletterCta">{{Category_CTA_1}}</span>
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>

                
                <table border="0" cellspacing="0" cellpadding="0" width="100%" style="background-color: {{Category_Background_2}}">
                  <thead>
                    <tr>
                      <td class="newsletterBottom35px"></td>
                    </tr>
                    <tr>
                      <td class="newsletterContainer">
                        <span class="newsletterTitle" style="color: {{Category_Color_2}}">
                          {{Category_title_2}}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td class="newsletterBottom35px"></td>
                    </tr>
                    <tr>
                      <td>
                        <a href="{{origin}}{{Category_href_2}}{{utm}}{{id}}">
                          <img alt="{{Category_title_2}}" src="{{picture_server_url}}{{Campaign_name}}Category1.png" style="vertical-align: middle; max-width: 100%;" loading="lazy">
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td class="newsletterBottom35px"></td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="newsletterContainer">
                        <table cellspacing="0" cellpadding="0" style="width: 100%; ">
                          <tr>
                            <td class="newsletterBottom20px">
                              <!-- 1-2 Products table -->
                              <table cellspacing="0" cellpadding="0" style="width: 100%; ">
                                <tr>
                                  <!-- vertical align top added for reason when product have only 1 price on mobile product grid will differ for another one-->
                                  <td style="padding-top: 0px; padding-left: 0px; vertical-align: top; width: 50%" class="newsletterRight10px">
                                    <table cellpadding="0" cellspacing="0" style="width:100%;">
                                      <tbody>
                                        <tr>
                                          <td style="padding-top:0px;padding-bottom:0px;padding-left:0px;padding-right:0px;">
                                            <table cellpadding="0" cellspacing="0" style="width:100%;">
                                              <tbody>
                                                <tr>
                                                  <td align="left" class="newsletterBottom20px" style="padding-top:0px;padding-left:0px;padding-right:0px;">
                                                  <table cellpadding="0" cellspacing="0" style="max-width:650px;width:100%;">
                                                    <tbody>
                                                      <tr>
                                                        <td><a href="{{JSON_Product_21.href}}"><img alt="{{JSON_Product_21.name}}" loading="lazy" src="{{Product_src_11}}" style="vertical-align:middle;max-width:100%;"></a></td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>

                                            <table cellpadding="0" cellspacing="0" style="width:100%; color: {{Category_Color_1}};" >
                                              <tbody>
                                                <tr>
                                                  <td align="left" style="padding-top:0px;padding-left:0px;padding-right:0px;padding-bottom:0px;"><span class="newsletterProductTitle">{{JSON_Product_21.name}}</span></td>
                                                </tr>
                                                <tr>
                                                  <td align="left" style="padding-top:0px;padding-bottom:8px;padding-left:0px;padding-right:0px;"><span class="newsletterProductLowPrice">{{JSON_Product_21.lowPrice}} </span><span class="newsletterProductHightPrice">{{JSON_Product_21.highPrice}}</span></td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                  <!-- vertical align top added for reason when product have only 1 price on mobile product grid will differ for another one-->
                                  <td style="padding-top: 0px; padding-right: 0px; vertical-align: top; width: 50%" class="newsletterLeft10px">
                                    <table cellpadding="0" cellspacing="0" style="width:100%;">
                                      <tbody>
                                        <tr>
                                          <td style="padding-top:0px;padding-bottom:0px;padding-left:0px;padding-right:0px;">
                                            <table cellpadding="0" cellspacing="0" style="width:100%;">
                                              <tbody>
                                                <tr>
                                                  <td align="left" class="newsletterBottom20px" style="padding-top:0px;padding-left:0px;padding-right:0px;">
                                                  <table cellpadding="0" cellspacing="0" style="max-width:650px;width:100%;">
                                                    <tbody>
                                                      <tr>
                                                        <td><a href="{{JSON_Product_22.href}}"><img alt="{{JSON_Product_22.name}}" loading="lazy" src="{{Product_src_11}}" style="vertical-align:middle;max-width:100%;"></a></td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>

                                            <table cellpadding="0" cellspacing="0" style="width:100%; color: {{Category_Color_1}};" >
                                              <tbody>
                                                <tr>
                                                  <td align="left" style="padding-top:0px;padding-left:0px;padding-right:0px;padding-bottom:0px;"><span class="newsletterProductTitle">{{JSON_Product_22.name}}</span></td>
                                                </tr>
                                                <tr>
                                                  <td align="left" style="padding-top:0px;padding-bottom:8px;padding-left:0px;padding-right:0px;"><span class="newsletterProductLowPrice">{{JSON_Product_22.lowPrice}} </span><span class="newsletterProductHightPrice">{{JSON_Product_22.highPrice}}</span></td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <!-- 3-4 Products table -->
                              <table cellspacing="0" cellpadding="0" style="width: 100%; ">
                                <tr>
                                  <!-- vertical align top added for reason when product have only 1 price on mobile product grid will differ for another one-->
                                  <td style="padding-top: 0px; padding-left: 0px; vertical-align: top; width: 50%" class="newsletterRight10px">
                                    <table cellpadding="0" cellspacing="0" style="width:100%;">
                                      <tbody>
                                        <tr>
                                          <td style="padding-top:0px;padding-bottom:0px;padding-left:0px;padding-right:0px;">
                                            <table cellpadding="0" cellspacing="0" style="width:100%;">
                                              <tbody>
                                                <tr>
                                                  <td align="left" class="newsletterBottom20px" style="padding-top:0px;padding-left:0px;padding-right:0px;">
                                                  <table cellpadding="0" cellspacing="0" style="max-width:650px;width:100%;">
                                                    <tbody>
                                                      <tr>
                                                        <td><a href="{{JSON_Product_23.href}}"><img alt="{{JSON_Product_23.name}}" loading="lazy" src="{{Product_src_11}}" style="vertical-align:middle;max-width:100%;"></a></td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>

                                            <table cellpadding="0" cellspacing="0" style="width:100%; color: {{Category_Color_1}};" >
                                              <tbody>
                                                <tr>
                                                  <td align="left" style="padding-top:0px;padding-left:0px;padding-right:0px;padding-bottom:0px;"><span class="newsletterProductTitle">{{JSON_Product_23.name}}</span></td>
                                                </tr>
                                                <tr>
                                                  <td align="left" style="padding-top:0px;padding-bottom:8px;padding-left:0px;padding-right:0px;"><span class="newsletterProductLowPrice">{{JSON_Product_23.lowPrice}} </span><span class="newsletterProductHightPrice">{{JSON_Product_23.highPrice}}</span></td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                  <!-- vertical align top added for reason when product have only 1 price on mobile product grid will differ for another one-->
                                  <td style="padding-top: 0px; padding-right: 0px; vertical-align: top; width: 50%" class="newsletterLeft10px">
                                    <table cellpadding="0" cellspacing="0" style="width:100%;">
                                      <tbody>
                                        <tr>
                                          <td style="padding-top:0px;padding-bottom:0px;padding-left:0px;padding-right:0px;">
                                            <table cellpadding="0" cellspacing="0" style="width:100%;">
                                              <tbody>
                                                <tr>
                                                  <td align="left" class="newsletterBottom20px" style="padding-top:0px;padding-left:0px;padding-right:0px;">
                                                  <table cellpadding="0" cellspacing="0" style="max-width:650px;width:100%;">
                                                    <tbody>
                                                      <tr>
                                                        <td><a href="{{JSON_Product_24.href}}"><img alt="{{JSON_Product_24.name}}" loading="lazy" src="{{Product_src_11}}" style="vertical-align:middle;max-width:100%;"></a></td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>

                                            <table cellpadding="0" cellspacing="0" style="width:100%; color: {{Category_Color_1}};" >
                                              <tbody>
                                                <tr>
                                                  <td align="left" style="padding-top:0px;padding-left:0px;padding-right:0px;padding-bottom:0px;"><span class="newsletterProductTitle">{{JSON_Product_24.name}}</span></td>
                                                </tr>
                                                <tr>
                                                  <td align="left" style="padding-top:0px;padding-bottom:8px;padding-left:0px;padding-right:0px;"><span class="newsletterProductLowPrice">{{JSON_Product_24.lowPrice}} </span><span class="newsletterProductHightPrice">{{JSON_Product_24.highPrice}}</span></td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td class="newsletterBottom35px">
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td align="center" class="newsletterBottom80px">
                        <a href="{{origin}}{{Category_href_2}}{{utm}}{{id}}" style="color: {{Category_Color_2}}; text-decoration: underline;">
                          <span class="newsletterCta">{{Category_CTA_2}}</span>
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>

                
                <table border="0" cellspacing="0" cellpadding="0" width="100%" style="background-color: {{Category_Background_3}}">
                  <thead>
                    <tr>
                      <td class="newsletterBottom35px"></td>
                    </tr>
                    <tr>
                      <td class="newsletterContainer">
                        <span class="newsletterTitle" style="color: {{Category_Color_3}}">
                          {{Category_title_3}}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td class="newsletterBottom35px"></td>
                    </tr>
                    <tr>
                      <td>
                        <a href="{{origin}}{{Category_href_3}}{{utm}}{{id}}">
                          <img alt="{{Category_title_3}}" src="{{picture_server_url}}{{Campaign_name}}Category1.png" style="vertical-align: middle; max-width: 100%;" loading="lazy">
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td class="newsletterBottom35px"></td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="newsletterContainer">
                        <table cellspacing="0" cellpadding="0" style="width: 100%; ">
                          <tr>
                            <td class="newsletterBottom20px">
                              <!-- 1-2 Products table -->
                              <table cellspacing="0" cellpadding="0" style="width: 100%; ">
                                <tr>
                                  <!-- vertical align top added for reason when product have only 1 price on mobile product grid will differ for another one-->
                                  <td style="padding-top: 0px; padding-left: 0px; vertical-align: top; width: 50%" class="newsletterRight10px">
                                    <table cellpadding="0" cellspacing="0" style="width:100%;">
                                      <tbody>
                                        <tr>
                                          <td style="padding-top:0px;padding-bottom:0px;padding-left:0px;padding-right:0px;">
                                            <table cellpadding="0" cellspacing="0" style="width:100%;">
                                              <tbody>
                                                <tr>
                                                  <td align="left" class="newsletterBottom20px" style="padding-top:0px;padding-left:0px;padding-right:0px;">
                                                  <table cellpadding="0" cellspacing="0" style="max-width:650px;width:100%;">
                                                    <tbody>
                                                      <tr>
                                                        <td><a href="{{JSON_Product_31.href}}"><img alt="{{JSON_Product_31.name}}" loading="lazy" src="{{Product_src_11}}" style="vertical-align:middle;max-width:100%;"></a></td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>

                                            <table cellpadding="0" cellspacing="0" style="width:100%; color: {{Category_Color_1}};" >
                                              <tbody>
                                                <tr>
                                                  <td align="left" style="padding-top:0px;padding-left:0px;padding-right:0px;padding-bottom:0px;"><span class="newsletterProductTitle">{{JSON_Product_31.name}}</span></td>
                                                </tr>
                                                <tr>
                                                  <td align="left" style="padding-top:0px;padding-bottom:8px;padding-left:0px;padding-right:0px;"><span class="newsletterProductLowPrice">{{JSON_Product_31.lowPrice}} </span><span class="newsletterProductHightPrice">{{JSON_Product_31.highPrice}}</span></td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                  <!-- vertical align top added for reason when product have only 1 price on mobile product grid will differ for another one-->
                                  <td style="padding-top: 0px; padding-right: 0px; vertical-align: top; width: 50%" class="newsletterLeft10px">
                                    <table cellpadding="0" cellspacing="0" style="width:100%;">
                                      <tbody>
                                        <tr>
                                          <td style="padding-top:0px;padding-bottom:0px;padding-left:0px;padding-right:0px;">
                                            <table cellpadding="0" cellspacing="0" style="width:100%;">
                                              <tbody>
                                                <tr>
                                                  <td align="left" class="newsletterBottom20px" style="padding-top:0px;padding-left:0px;padding-right:0px;">
                                                  <table cellpadding="0" cellspacing="0" style="max-width:650px;width:100%;">
                                                    <tbody>
                                                      <tr>
                                                        <td><a href="{{JSON_Product_32.href}}"><img alt="{{JSON_Product_32.name}}" loading="lazy" src="{{Product_src_11}}" style="vertical-align:middle;max-width:100%;"></a></td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>

                                            <table cellpadding="0" cellspacing="0" style="width:100%; color: {{Category_Color_1}};" >
                                              <tbody>
                                                <tr>
                                                  <td align="left" style="padding-top:0px;padding-left:0px;padding-right:0px;padding-bottom:0px;"><span class="newsletterProductTitle">{{JSON_Product_32.name}}</span></td>
                                                </tr>
                                                <tr>
                                                  <td align="left" style="padding-top:0px;padding-bottom:8px;padding-left:0px;padding-right:0px;"><span class="newsletterProductLowPrice">{{JSON_Product_32.lowPrice}} </span><span class="newsletterProductHightPrice">{{JSON_Product_32.highPrice}}</span></td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <!-- 3-4 Products table -->
                              <table cellspacing="0" cellpadding="0" style="width: 100%; ">
                                <tr>
                                  <!-- vertical align top added for reason when product have only 1 price on mobile product grid will differ for another one-->
                                  <td style="padding-top: 0px; padding-left: 0px; vertical-align: top; width: 50%" class="newsletterRight10px">
                                    <table cellpadding="0" cellspacing="0" style="width:100%;">
                                      <tbody>
                                        <tr>
                                          <td style="padding-top:0px;padding-bottom:0px;padding-left:0px;padding-right:0px;">
                                            <table cellpadding="0" cellspacing="0" style="width:100%;">
                                              <tbody>
                                                <tr>
                                                  <td align="left" class="newsletterBottom20px" style="padding-top:0px;padding-left:0px;padding-right:0px;">
                                                  <table cellpadding="0" cellspacing="0" style="max-width:650px;width:100%;">
                                                    <tbody>
                                                      <tr>
                                                        <td><a href="{{JSON_Product_33.href}}"><img alt="{{JSON_Product_33.name}}" loading="lazy" src="{{Product_src_11}}" style="vertical-align:middle;max-width:100%;"></a></td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>

                                            <table cellpadding="0" cellspacing="0" style="width:100%; color: {{Category_Color_1}};" >
                                              <tbody>
                                                <tr>
                                                  <td align="left" style="padding-top:0px;padding-left:0px;padding-right:0px;padding-bottom:0px;"><span class="newsletterProductTitle">{{JSON_Product_33.name}}</span></td>
                                                </tr>
                                                <tr>
                                                  <td align="left" style="padding-top:0px;padding-bottom:8px;padding-left:0px;padding-right:0px;"><span class="newsletterProductLowPrice">{{JSON_Product_33.lowPrice}} </span><span class="newsletterProductHightPrice">{{JSON_Product_33.highPrice}}</span></td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                  <!-- vertical align top added for reason when product have only 1 price on mobile product grid will differ for another one-->
                                  <td style="padding-top: 0px; padding-right: 0px; vertical-align: top; width: 50%" class="newsletterLeft10px">
                                    <table cellpadding="0" cellspacing="0" style="width:100%;">
                                      <tbody>
                                        <tr>
                                          <td style="padding-top:0px;padding-bottom:0px;padding-left:0px;padding-right:0px;">
                                            <table cellpadding="0" cellspacing="0" style="width:100%;">
                                              <tbody>
                                                <tr>
                                                  <td align="left" class="newsletterBottom20px" style="padding-top:0px;padding-left:0px;padding-right:0px;">
                                                  <table cellpadding="0" cellspacing="0" style="max-width:650px;width:100%;">
                                                    <tbody>
                                                      <tr>
                                                        <td><a href="{{JSON_Product_34.href}}"><img alt="{{JSON_Product_34.name}}" loading="lazy" src="{{Product_src_11}}" style="vertical-align:middle;max-width:100%;"></a></td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>

                                            <table cellpadding="0" cellspacing="0" style="width:100%; color: {{Category_Color_1}};" >
                                              <tbody>
                                                <tr>
                                                  <td align="left" style="padding-top:0px;padding-left:0px;padding-right:0px;padding-bottom:0px;"><span class="newsletterProductTitle">{{JSON_Product_34.name}}</span></td>
                                                </tr>
                                                <tr>
                                                  <td align="left" style="padding-top:0px;padding-bottom:8px;padding-left:0px;padding-right:0px;"><span class="newsletterProductLowPrice">{{JSON_Product_34.lowPrice}} </span><span class="newsletterProductHightPrice">{{JSON_Product_34.highPrice}}</span></td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td class="newsletterBottom35px">
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td align="center" class="newsletterBottom80px">
                        <a href="{{origin}}{{Category_href_3}}{{utm}}{{id}}" style="color: {{Category_Color_3}}; text-decoration: underline;">
                          <span class="newsletterCta">{{Category_CTA_3}}</span>
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>

                
                <table border="0" cellspacing="0" cellpadding="0" width="100%" style="background-color: {{Category_Background_4}}">
                  <thead>
                    <tr>
                      <td class="newsletterBottom35px"></td>
                    </tr>
                    <tr>
                      <td class="newsletterContainer">
                        <span class="newsletterTitle" style="color: {{Category_Color_4}}">
                          {{Category_title_4}}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td class="newsletterBottom35px"></td>
                    </tr>
                    <tr>
                      <td>
                        <a href="{{origin}}{{Category_href_4}}{{utm}}{{id}}">
                          <img alt="{{Category_title_4}}" src="{{picture_server_url}}{{Campaign_name}}Category1.png" style="vertical-align: middle; max-width: 100%;" loading="lazy">
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td class="newsletterBottom35px"></td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="newsletterContainer">
                        <table cellspacing="0" cellpadding="0" style="width: 100%; ">
                          <tr>
                            <td class="newsletterBottom20px">
                              <!-- 1-2 Products table -->
                              <table cellspacing="0" cellpadding="0" style="width: 100%; ">
                                <tr>
                                  <!-- vertical align top added for reason when product have only 1 price on mobile product grid will differ for another one-->
                                  <td style="padding-top: 0px; padding-left: 0px; vertical-align: top; width: 50%" class="newsletterRight10px">
                                    <table cellpadding="0" cellspacing="0" style="width:100%;">
                                      <tbody>
                                        <tr>
                                          <td style="padding-top:0px;padding-bottom:0px;padding-left:0px;padding-right:0px;">
                                            <table cellpadding="0" cellspacing="0" style="width:100%;">
                                              <tbody>
                                                <tr>
                                                  <td align="left" class="newsletterBottom20px" style="padding-top:0px;padding-left:0px;padding-right:0px;">
                                                  <table cellpadding="0" cellspacing="0" style="max-width:650px;width:100%;">
                                                    <tbody>
                                                      <tr>
                                                        <td><a href="{{JSON_Product_41.href}}"><img alt="{{JSON_Product_41.name}}" loading="lazy" src="{{Product_src_11}}" style="vertical-align:middle;max-width:100%;"></a></td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>

                                            <table cellpadding="0" cellspacing="0" style="width:100%; color: {{Category_Color_1}};" >
                                              <tbody>
                                                <tr>
                                                  <td align="left" style="padding-top:0px;padding-left:0px;padding-right:0px;padding-bottom:0px;"><span class="newsletterProductTitle">{{JSON_Product_41.name}}</span></td>
                                                </tr>
                                                <tr>
                                                  <td align="left" style="padding-top:0px;padding-bottom:8px;padding-left:0px;padding-right:0px;"><span class="newsletterProductLowPrice">{{JSON_Product_41.lowPrice}} </span><span class="newsletterProductHightPrice">{{JSON_Product_41.highPrice}}</span></td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                  <!-- vertical align top added for reason when product have only 1 price on mobile product grid will differ for another one-->
                                  <td style="padding-top: 0px; padding-right: 0px; vertical-align: top; width: 50%" class="newsletterLeft10px">
                                    <table cellpadding="0" cellspacing="0" style="width:100%;">
                                      <tbody>
                                        <tr>
                                          <td style="padding-top:0px;padding-bottom:0px;padding-left:0px;padding-right:0px;">
                                            <table cellpadding="0" cellspacing="0" style="width:100%;">
                                              <tbody>
                                                <tr>
                                                  <td align="left" class="newsletterBottom20px" style="padding-top:0px;padding-left:0px;padding-right:0px;">
                                                  <table cellpadding="0" cellspacing="0" style="max-width:650px;width:100%;">
                                                    <tbody>
                                                      <tr>
                                                        <td><a href="{{JSON_Product_42.href}}"><img alt="{{JSON_Product_42.name}}" loading="lazy" src="{{Product_src_11}}" style="vertical-align:middle;max-width:100%;"></a></td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>

                                            <table cellpadding="0" cellspacing="0" style="width:100%; color: {{Category_Color_1}};" >
                                              <tbody>
                                                <tr>
                                                  <td align="left" style="padding-top:0px;padding-left:0px;padding-right:0px;padding-bottom:0px;"><span class="newsletterProductTitle">{{JSON_Product_42.name}}</span></td>
                                                </tr>
                                                <tr>
                                                  <td align="left" style="padding-top:0px;padding-bottom:8px;padding-left:0px;padding-right:0px;"><span class="newsletterProductLowPrice">{{JSON_Product_42.lowPrice}} </span><span class="newsletterProductHightPrice">{{JSON_Product_42.highPrice}}</span></td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <!-- 3-4 Products table -->
                              <table cellspacing="0" cellpadding="0" style="width: 100%; ">
                                <tr>
                                  <!-- vertical align top added for reason when product have only 1 price on mobile product grid will differ for another one-->
                                  <td style="padding-top: 0px; padding-left: 0px; vertical-align: top; width: 50%" class="newsletterRight10px">
                                    <table cellpadding="0" cellspacing="0" style="width:100%;">
                                      <tbody>
                                        <tr>
                                          <td style="padding-top:0px;padding-bottom:0px;padding-left:0px;padding-right:0px;">
                                            <table cellpadding="0" cellspacing="0" style="width:100%;">
                                              <tbody>
                                                <tr>
                                                  <td align="left" class="newsletterBottom20px" style="padding-top:0px;padding-left:0px;padding-right:0px;">
                                                  <table cellpadding="0" cellspacing="0" style="max-width:650px;width:100%;">
                                                    <tbody>
                                                      <tr>
                                                        <td><a href="{{JSON_Product_43.href}}"><img alt="{{JSON_Product_43.name}}" loading="lazy" src="{{Product_src_11}}" style="vertical-align:middle;max-width:100%;"></a></td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>

                                            <table cellpadding="0" cellspacing="0" style="width:100%; color: {{Category_Color_1}};" >
                                              <tbody>
                                                <tr>
                                                  <td align="left" style="padding-top:0px;padding-left:0px;padding-right:0px;padding-bottom:0px;"><span class="newsletterProductTitle">{{JSON_Product_43.name}}</span></td>
                                                </tr>
                                                <tr>
                                                  <td align="left" style="padding-top:0px;padding-bottom:8px;padding-left:0px;padding-right:0px;"><span class="newsletterProductLowPrice">{{JSON_Product_43.lowPrice}} </span><span class="newsletterProductHightPrice">{{JSON_Product_43.highPrice}}</span></td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                  <!-- vertical align top added for reason when product have only 1 price on mobile product grid will differ for another one-->
                                  <td style="padding-top: 0px; padding-right: 0px; vertical-align: top; width: 50%" class="newsletterLeft10px">
                                    <table cellpadding="0" cellspacing="0" style="width:100%;">
                                      <tbody>
                                        <tr>
                                          <td style="padding-top:0px;padding-bottom:0px;padding-left:0px;padding-right:0px;">
                                            <table cellpadding="0" cellspacing="0" style="width:100%;">
                                              <tbody>
                                                <tr>
                                                  <td align="left" class="newsletterBottom20px" style="padding-top:0px;padding-left:0px;padding-right:0px;">
                                                  <table cellpadding="0" cellspacing="0" style="max-width:650px;width:100%;">
                                                    <tbody>
                                                      <tr>
                                                        <td><a href="{{JSON_Product_44.href}}"><img alt="{{JSON_Product_44.name}}" loading="lazy" src="{{Product_src_11}}" style="vertical-align:middle;max-width:100%;"></a></td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>

                                            <table cellpadding="0" cellspacing="0" style="width:100%; color: {{Category_Color_1}};" >
                                              <tbody>
                                                <tr>
                                                  <td align="left" style="padding-top:0px;padding-left:0px;padding-right:0px;padding-bottom:0px;"><span class="newsletterProductTitle">{{JSON_Product_44.name}}</span></td>
                                                </tr>
                                                <tr>
                                                  <td align="left" style="padding-top:0px;padding-bottom:8px;padding-left:0px;padding-right:0px;"><span class="newsletterProductLowPrice">{{JSON_Product_44.lowPrice}} </span><span class="newsletterProductHightPrice">{{JSON_Product_44.highPrice}}</span></td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td class="newsletterBottom35px">
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td align="center" class="newsletterBottom80px">
                        <a href="{{origin}}{{Category_href_4}}{{utm}}{{id}}" style="color: {{Category_Color_4}}; text-decoration: underline;">
                          <span class="newsletterCta">{{Category_CTA_4}}</span>
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <table align="center" border="0" cellpadding="0" cellspacing="0" class="newsletterContainer" style="max-width: 650px; width: 100%; color: #000000; background-color:#ffffff;" id="newsletter">
                  <tbody>
                    <tr>
                      <td>
                        <img src="https://beliani.info/newsletter/2022/line.jpg" style="display:block" width="100%" alt="">
                      </td>
                    </tr>
                    <tr>
                      <td class="newsletterBottom35px" >
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span class="newsletterFooterTitle">{{Soonending_title}}</span>
                      </td>
                    </tr>
                    <tr>
                      <td class="newsletterBottom35px" >
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <a href="{{Soonending_banner_href_1}}">
                          <img loading="lazy" src="{{Soonending_banner_src_1}}" style="display: block; max-width: 100%;">
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td class="newsletterBottom20px" >
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <a href="{{Soonending_banner_href_2}}">
                          <img loading="lazy" src="{{Soonending_banner_src_2}}" style="display: block; max-width: 100%;">
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td class="newsletterBottom35px" >
                      </td>
                    </tr>
                  </tbody>
                </table>

                {{{footer_categories}}}
                {{{klarna}}}
                {{{socials}}}
                {{{advantages}}}
                </td>
              </tr>
          </tbody>
      </table>
      <table align="center" border="0" cellpadding="0" cellspacing="0" class="newsletterContainer" style="max-width: 650px; width: 100%; color: #000000; background-color:#ffffff;" id="newsletter">
        <tbody>
          <tr>
            <td>
              <img
                alt=""
                loading="lazy"
                src="https://beliani.info/newsletter/2022/line.jpg"
                style="display: block; max-width: 100%"
              />
            </td>
          </tr>
          <tr>
            <td align="left" class="newsletterTopBottomContainer">
              <span class="newsletterConditions" style="color: #000000">{{Conditions_title}} {{Conditions_description}}</span>
            </td>
          </tr>
        </tbody>
      </table>
      {{{company_details}}}
    </body>
  </html>
  `,
  },
];