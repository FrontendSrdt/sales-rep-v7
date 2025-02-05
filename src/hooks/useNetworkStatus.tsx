import axios from "axios";
import { useState, useEffect } from "react";

import coreLeadCaptureApi from "../interceptor/coreLeadCaptureApi";

const useNetworkStatus = () => {
  const [isConnectionRefused, setIsConnectionRefused] = useState(false);

  useEffect(() => {
    const requestInterceptor = coreLeadCaptureApi.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.message === "Network Error" && error.code === "ERR_NETWORK") {
          setIsConnectionRefused(true);
        } else {
          setIsConnectionRefused(false);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(requestInterceptor);
    };
  }, []);

  return { isConnectionRefused };
};

export default useNetworkStatus;
