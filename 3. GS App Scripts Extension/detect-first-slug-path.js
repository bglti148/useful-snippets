function analyzeAndExtractSlugs() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  // Rename column headers
  sheet.getRange(1, 1).setValue("Page Link");
  sheet.getRange(1, 2).setValue("First Slug");
  sheet.getRange(1, 3).setValue("Second Slug");
  sheet.getRange(1, 4).setValue("Third Slug");

  // Clear contents of columns B, C, and D
  sheet.getRange(2, 2, sheet.getLastRow() - 1, 3).clearContent();

  // Get all URLs from column A
  const dataRange = sheet.getRange(2, 1, sheet.getLastRow() - 1, 1);
  const urls = dataRange.getValues();

  const slugs = urls.map(row => {
    const url = row[0];
    if (url) {
      // Extract slugs using regex
      const firstSlugMatch = url.match(/^https?:\/\/[^/]+\/([^/]+)/);
      const secondSlugMatch = url.match(/^https?:\/\/[^/]+\/[^/]+\/([^/]+)/);
      const thirdSlugMatch = url.match(/^https?:\/\/[^/]+\/[^/]+\/[^/]+\/([^/]+)/);
      
      return [
        firstSlugMatch ? firstSlugMatch[1] : "",
        secondSlugMatch ? secondSlugMatch[1] : "",
        thirdSlugMatch ? thirdSlugMatch[1] : ""
      ];
    }
    return ["", "", ""]; // Empty slugs if URL is blank
  });

  // Populate columns B, C, and D with slugs
  const firstSlugRange = sheet.getRange(2, 2, slugs.length, 1);
  firstSlugRange.setValues(slugs.map(row => [row[0]]));

  const secondSlugRange = sheet.getRange(2, 3, slugs.length, 1);
  secondSlugRange.setValues(slugs.map(row => [row[1]]));

  const thirdSlugRange = sheet.getRange(2, 4, slugs.length, 1);
  thirdSlugRange.setValues(slugs.map(row => [row[2]]));
}
