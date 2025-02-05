import { useEffect, useState } from "react";

const usePortal = (id: string) => {
  const [container, setContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const element = document.getElementById(id);
    if (element) {
      setContainer(element);
    } else {
      
    }
  }, [id]);

  return container;
};

export default usePortal;
