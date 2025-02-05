export function formatDate(dateString: any) {
  const date = new Date(dateString);

  // Get the individual components
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();

  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const amPm = hours >= 12 ? "PM" : "AM";

  // Convert 24-hour time to 12-hour time
  hours = hours % 12 || 12; // '0' should be '12'

  return `${month}/${day}/${year} ${String(hours).padStart(2, "0")}:${minutes} ${amPm}`;
}
