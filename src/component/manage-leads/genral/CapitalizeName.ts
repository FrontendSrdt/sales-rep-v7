export const capitalizeName = (name: string | null | undefined) => {
  if (!name) return ""; // Return an empty string if name is null or undefined

  return name
    .split(" ") // Split the name by spaces into an array
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize the first letter and make the rest lowercase
    .join(" "); // Join the array back into a string
};

export function addSpacesToCamelCase(input: any) {
  // Insert spaces before uppercase letters
  const spacedString = input.replace(/([A-Z])/g, " $1").trim();

  // Capitalize the first letter
  return spacedString.charAt(0).toUpperCase() + spacedString.slice(1);
}
