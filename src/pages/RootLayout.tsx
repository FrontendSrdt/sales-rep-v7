import { url } from "../data/genral-Data";
import { MdError } from "react-icons/md";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import store, { RootState } from "../store";
import Navbar from "../component/navbar/Navbar";
import React, { Fragment, useEffect } from "react";
import useForLocation from "../hooks/useForLocation";
import { onSetErrorHandler } from "../store/ui/ui-slice";
import useNetworkStatus from "../hooks/useNetworkStatus";
import Fallback from "../util/custom/ui/Fallback";
import { fetchUserDetails } from "../store/auth/loggedIn-user-slice";
import { resetResposneforReissueContract } from "../store/lead-with-decline-offer/save-ReissueContract-byid-slice";

const RootLayout: React.FC = () => {
  const { currentURL } = useForLocation();
  const { isConnectionRefused } = useNetworkStatus();
  const { resetFilters } = useSelector((state: RootState) => state.ui);
  const { isAuthenticated, accessToken: token } = useSelector((state: RootState) => state.auth);
  const { isRun } = useSelector((state: RootState) => state.saveReissueContract);
  const { isError, responseOfReissueContract } = useSelector((state: RootState) => state.saveReissueContract);

  useEffect(() => {
    // console.log("accessToken= ", token);
    if (!isAuthenticated) {
      // navigate("/login");
      window.location.replace(url);
      console.log("Redirect");
    }
    if (token) {
      // console.log(token);
      store.dispatch(fetchUserDetails(token));
    }
    if (typeof resetFilters === "function") {
      resetFilters();
    }

    store.dispatch(onSetErrorHandler(false));
    if (!isError && responseOfReissueContract) store.dispatch(resetResposneforReissueContract());
  }, [isAuthenticated, currentURL, token, isRun]);

  return (
    <Fragment>
      {!isConnectionRefused && (
        <>
          <Navbar />
          {isAuthenticated && (
            <main>
              <Outlet />
            </main>
          )}
        </>
      )}

      {isConnectionRefused && (
        <>
          <Fallback icon={<MdError color="red" size={40} />} errorInfo="Please check your Connection or try again" />
        </>
      )}
    </Fragment>
  );
};

export default RootLayout;
