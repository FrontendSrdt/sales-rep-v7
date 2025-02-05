// Helper function to highlight matching text
export const highlightText = (text: string, query: string) => {
  if (!query) return text; // No highlight if there's no search query
  const regex = new RegExp(`(${query})`, "gi");
  return (
    <span>
      {text.split(regex).map((part, index) =>
        regex.test(part) ? (
          <span key={index} className="bg-yellow-200">
            {part}
          </span>
        ) : (
          part
        )
      )}
    </span>
  );
};
