import { useEffect } from "react";

const useClickOutside = (refs: React.RefObject<HTMLElement>[], callbacks: (() => void)[]) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const clickedInside = refs.some((ref) => ref.current && ref.current.contains(event.target as Node));

      // If clicked outside all refs, execute callbacks
      if (!clickedInside) {
        callbacks.forEach((callback) => callback());
      }
    };

    // Attach the mouseup event listener
    document.addEventListener("mouseup", handleClickOutside);

    return () => {
      // Clean up event listener
      document.removeEventListener("mouseup", handleClickOutside);
    };
  }, [refs, callbacks]);
};

export default useClickOutside;
