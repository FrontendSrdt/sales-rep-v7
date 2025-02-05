import { useState, useEffect } from "react";

const useResponsiveView = () => {
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const updateView = () => {
      setIsMobileView(window.innerWidth <= 768); // Adjust breakpoint as needed
    };

    updateView();
    window.addEventListener("resize", updateView);
    return () => {
      window.removeEventListener("resize", updateView);
    };
  }, []);

  return isMobileView;
};

export default useResponsiveView;
