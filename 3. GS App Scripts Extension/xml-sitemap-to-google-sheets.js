function importXMLSitemap() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  sheet.clear();

  var url = "https://cheyney.edu/sitemap.xml"; // Change to your sitemap URL

  try {
      // Alternative method using Google Translate (sometimes works when URLFetchApp is blocked)
      var fetchUrl = "https://translate.google.com/translate?sl=auto&tl=en&u=" + encodeURIComponent(url);
      var response = UrlFetchApp.fetch(fetchUrl, {
          muteHttpExceptions: true,
          headers: {
              "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
          }
      });

      if (response.getResponseCode() !== 200) {
          throw new Error("Request failed with status code: " + response.getResponseCode());
      }

      var xml = response.getContentText();
      
      // Sometimes, the Google Translate URL wraps the content. We need to clean it up.
      if (xml.includes("<html")) {
          throw new Error("The response is not XML. The site may be blocking automated requests.");
      }

      var document = XmlService.parse(xml);
      var root = document.getRootElement();

      var namespace = XmlService.getNamespace("http://www.sitemaps.org/schemas/sitemap/0.9");
      var urls = root.getChildren("url", namespace);

      var data = [["Location", "Last Modified", "Change Frequency", "Priority"]];

      for (var i = 0; i < urls.length; i++) {
          var loc = urls[i].getChild("loc", namespace).getText();
          var lastmod = urls[i].getChild("lastmod", namespace) ? urls[i].getChild("lastmod", namespace).getText() : "";
          var changefreq = urls[i].getChild("changefreq", namespace) ? urls[i].getChild("changefreq", namespace).getText() : "";
          var priority = urls[i].getChild("priority", namespace) ? urls[i].getChild("priority", namespace).getText() : "";

          data.push([loc, lastmod, changefreq, priority]);
      }

      sheet.getRange(1, 1, data.length, 4).setValues(data);

  } catch (error) {
      sheet.getRange(1, 1).setValue("Error: " + error.message);
  }
}
