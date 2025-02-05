export function extractDateTime(timestamp: any) {
  // Validate the timestamp
  if (!timestamp || isNaN(new Date(timestamp).getTime())) {
    return { dateFormatted: "no record found!", timeFormatted: ""}; // Return null values for invalid timestamp
  }

  // Create a new Date object from the timestamp
  const dateObj = new Date(timestamp);

  // Extract the date components
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const day = String(dateObj.getDate()).padStart(2, "0");

  // Extract the time components
  let hours = dateObj.getHours();
  const minutes = String(dateObj.getMinutes()).padStart(2, "0");
  const amPm = hours >= 12 ? "PM" : "AM";

  // Convert hours to 12-hour format
  hours = hours % 12 || 12; // Converts 0 to 12 for midnight

  // Format time with AM/PM
  const timeFormatted = `${String(hours).padStart(2, "0")}:${minutes} ${amPm}`;

  // Format date
  const dateFormatted = `${year}-${month}-${day}`;

  return { dateFormatted, timeFormatted };
}


export function convertTo24HourFormat(time12Hour: any) {
  // Validate and destructure the time format using regex
  const match = time12Hour.match(/^(\d{1,2}):(\d{2})\s?(AM|PM)$/i);

  // if (!match) {
  //   throw new Error("Invalid 12-hour time format. Please use 'hh:mm AM/PM'.");
  // }

  let [_, hours, minutes, period] = match;

  // Convert to numbers for manipulation
  hours = parseInt(hours, 10);

  // Adjust hours for 24-hour format
  if (period.toUpperCase() === "PM" && hours !== 12) {
    hours += 12;
  } else if (period.toUpperCase() === "AM" && hours === 12) {
    hours = 0;
  }

  // Return formatted time in HH:mm:ss
  return `${hours.toString().padStart(2, "0")}:${minutes}:00`;
}

export function formatTime(timeString: any) {
  if (timeString !== undefined) {
    const [hourString, minute] = timeString.split(":");
    const hour = +hourString % 24;
    return (hour % 12 || 12) + ":" + minute + " " + (hour < 12 ? "AM" : "PM");
  }
}

// function extractDateAndTime(datetimeString: string) {
//   const dateObj = new Date(datetimeString); // Convert to Date object

//   // Extract the date in "YYYY-MM-DD" format
//   const date = dateObj.toISOString().split("T")[0];

//   // Extract the time in "HH:MM:SS" format
//   const time = dateObj.toTimeString().split(" ")[0];

//   return { date, time };
// }
