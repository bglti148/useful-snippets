function importXMLSitemap() {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    sheet.clear(); // Clears the current sheet
    
    var url = "https://cheyney.edu/sitemap.xml"; // URL of the sitemap
    var xml = UrlFetchApp.fetch(url).getContentText();
    var document = XmlService.parse(xml);
    var root = document.getRootElement();
    
    var namespace = XmlService.getNamespace("http://www.sitemaps.org/schemas/sitemap/0.9");
    var urls = root.getChildren("url", namespace);
    
    var data = [["Location", "Last Modified", "Change Frequency", "Priority"]]; // Header row
    
    for (var i = 0; i < urls.length; i++) {
      var loc = urls[i].getChild("loc", namespace).getText();
      var lastmod = urls[i].getChild("lastmod", namespace) ? urls[i].getChild("lastmod", namespace).getText() : "";
      var changefreq = urls[i].getChild("changefreq", namespace) ? urls[i].getChild("changefreq", namespace).getText() : "";
      var priority = urls[i].getChild("priority", namespace) ? urls[i].getChild("priority", namespace).getText() : "";
      
      data.push([loc, lastmod, changefreq, priority]);
    }
    
    sheet.getRange(1, 1, data.length, 4).setValues(data); // Write data to the sheet
  }