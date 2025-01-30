function analyzeAndExtractSlugs() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  // Rename column headers
  const headers = [
    "Page Link", 
    "First Slug", 
    "Second Slug", 
    "Third Slug", 
    "Fourth Slug", 
    "Fifth Slug", 
    "Sixth Slug", 
    "Seventh Slug"
  ];
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);

  // Clear contents of columns B to H
  sheet.getRange(2, 2, sheet.getLastRow() - 1, headers.length - 1).clearContent();

  // Get all URLs from column A
  const dataRange = sheet.getRange(2, 1, sheet.getLastRow() - 1, 1);
  const urls = dataRange.getValues();

  const slugs = urls.map(row => {
    const url = row[0];
    if (url) {
      // Extract slugs using regex for 1st to 7th slug
      const firstSlugMatch = url.match(/^https?:\/\/[^/]+\/([^/]+)/);
      const secondSlugMatch = url.match(/^https?:\/\/[^/]+\/[^/]+\/([^/]+)/);
      const thirdSlugMatch = url.match(/^https?:\/\/[^/]+\/[^/]+\/[^/]+\/([^/]+)/);
      const fourthSlugMatch = url.match(/^https?:\/\/[^/]+\/[^/]+\/[^/]+\/[^/]+\/([^/]+)/);
      const fifthSlugMatch = url.match(/^https?:\/\/[^/]+\/[^/]+\/[^/]+\/[^/]+\/[^/]+\/([^/]+)/);
      const sixthSlugMatch = url.match(/^https?:\/\/[^/]+\/[^/]+\/[^/]+\/[^/]+\/[^/]+\/[^/]+\/([^/]+)/);
      const seventhSlugMatch = url.match(/^https?:\/\/[^/]+\/[^/]+\/[^/]+\/[^/]+\/[^/]+\/[^/]+\/[^/]+\/([^/]+)/);
      
      return [
        firstSlugMatch ? firstSlugMatch[1] : "",
        secondSlugMatch ? secondSlugMatch[1] : "",
        thirdSlugMatch ? thirdSlugMatch[1] : "",
        fourthSlugMatch ? fourthSlugMatch[1] : "",
        fifthSlugMatch ? fifthSlugMatch[1] : "",
        sixthSlugMatch ? sixthSlugMatch[1] : "",
        seventhSlugMatch ? seventhSlugMatch[1] : ""
      ];
    }
    return ["", "", "", "", "", "", ""]; // Empty slugs if URL is blank
  });

  // Populate columns B to H with slugs
  const slugRange = sheet.getRange(2, 2, slugs.length, headers.length - 1);
  slugRange.setValues(slugs);
}
