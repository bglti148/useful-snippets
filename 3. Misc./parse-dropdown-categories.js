function cloneSheetForAllDropdownOptions() {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sourceSheet = ss.getActiveSheet(); // Assumes the active sheet is the source
    var dropdownColumn = 2; // Set to column 2 as requested
  
    // Retrieve dropdown options from the specified column
    var optionsRange = sourceSheet.getRange(2, dropdownColumn, sourceSheet.getLastRow() - 1); // Assumes options start from row 2
    var optionsValues = optionsRange.getValues();
    var dropdownOptions = optionsValues.map(function (row) { return row[0]; })
                                        .filter(function (value, index, self) { return self.indexOf(value) === index && value !== ""; });
  
    dropdownOptions.forEach(function(option) {
      var cloneName = option.toString(); // Naming the cloned sheet after the dropdown option
      var clone = sourceSheet.copyTo(ss).setName(cloneName);
      filterSheetByOption(clone, dropdownColumn, option);
    });
  }
  
  function filterSheetByOption(sheet, column, option) {
    var range = sheet.getDataRange();
    var values = range.getValues();
    
    // Filter out rows that do not match the current option
    var filteredValues = values.filter(function(row) {
      return row[column - 1] === option;
    });
    
    // Clear the cloned sheet before writing filtered data
    sheet.clear();
    
    // If filteredValues has data, write it back to the sheet
    if(filteredValues.length > 0) {
      sheet.getRange(1, 1, filteredValues.length, filteredValues[0].length).setValues(filteredValues);
    } else {
      // If no data matches the filter, indicate this in the cloned sheet
      sheet.getRange(1, 1).setValue("No data found for " + option);
    }
  }