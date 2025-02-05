/**
 * Extracts the name (first word) from a given string, if a space is present.
 * @param str - The input string.
 * @returns The substring before the first space, or the original string if no space is found.
 */
const extractFirstName = (str?: string): string => {
  // Check if input is a valid string, else return an empty string
  if (typeof str !== "string") {
    return "";
  }

  // Trim leading and trailing spaces for accurate extraction
  const trimmedStr = str.trim();
  // Check if there's a space in the string
  if (trimmedStr.includes(" ")) {
    // Return the substring before the first space
    return trimmedStr.split(" ")[0];
  }
  // Return the entire string if there's no space
  return trimmedStr;
};

export default extractFirstName;
