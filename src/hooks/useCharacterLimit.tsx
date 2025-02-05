import { useState } from "react";

export const useCharacterLimit = (maxLimit: number) => {
  const [charCount, setCharCount] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const updateCharCount = (text: string) => {
    const currentLength = text.length;
    if (currentLength > maxLimit) {
      setError(`Character Limit of ${maxLimit} exceeded`);
      setCharCount(maxLimit);
      return { isValid: false, validText: text.slice(0, maxLimit) };
    } else {
      setError(null);
      setCharCount(currentLength);
      return { isValid: true, validText: text };
    }
  };
  return { charCount, error, updateCharCount };
};
