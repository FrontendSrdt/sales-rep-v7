import { useLocation } from "react-router-dom";

const useForLocation = () => {
  const location = useLocation();
  const pathParts = location.pathname.split("/");
  const lastName = pathParts[pathParts.length - 1] || "";

  return {
    currentURL: location.pathname,
    lastName,
  };
};

export default useForLocation;

export function useQuery() {
  const searchParams = new URLSearchParams(useLocation().search);

  // Extracting the value after &= in the query string
  const valueAfterEqualSign = searchParams.get("") || null;

  return {
    searchParams,
    valueAfterEqualSign,
  };
}
