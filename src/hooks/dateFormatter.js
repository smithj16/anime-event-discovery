import { format, isValid } from "date-fns";

const dateFormats = new Map([
    ["format1", "yyyy-MM-dd HH:mm:ss"], // Full date and time
    ["format2", "MMMM do, yyyy"], // Month day, Year
    ["format3", "dd MMMM yyyy"], // Day Month Year
    ["format4", "MM/dd/yyyy"], // Short date
    ["format5", "dd-MM-yyyy HH:mm"], // Day-Month-Year Time
    ["default", "yyyy-MM-dd'T'HH:mm:ssXXX"], // Default ISO format
  ]);
  
  const dateFormatter = (isoDateString, formatType = "default") => {
    const date = new Date(isoDateString);
  
    // Check if the date is valid
    if (!isValid(date)) {
      throw new Error("Invalid date string");
    }
  
    // Get the format string from the map
    const dateFormat = dateFormats.get(formatType) || dateFormats.get("default");
  
    // Format the date
    return format(date, dateFormat);
  };

  export default dateFormatter;