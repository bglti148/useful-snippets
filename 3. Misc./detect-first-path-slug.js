function extractFirstSlug() {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const dataRange = sheet.getRange(2, 1, sheet.getLastRow() - 1, 1); // Column A from row 2 onwards
    const urls = dataRange.getValues(); // Get all URLs in column A
    
    const extractedSlugs = urls.map(row => {
      const url = row[0];
      if (url) {
        const match = url.match(/^https?:\/\/[^/]+\/([^/]+)/); // Regex for the first slug
        return [match ? match[1] : ""]; // Extract slug or leave blank if not found
      }
      return [""];
    });
  
    // Write the extracted slugs into column B
    const outputRange = sheet.getRange(2, 2, extractedSlugs.length, 1);
    outputRange.setValues(extractedSlugs);
  }