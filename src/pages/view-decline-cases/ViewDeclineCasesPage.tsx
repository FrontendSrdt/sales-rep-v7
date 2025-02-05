import React, { useEffect } from "react";
import ViewDeclineCases from "../../component/view-decline-cases/ViewDeclineCases";
import store, { RootState } from "../../store";
import { getLeadWithDeclineOfferValues } from "../../store/lead-with-decline-offer/get-leadWithDeclineOffer-slice";
import useForLocation from "../../hooks/useForLocation";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const ViewDeclineCasesPage: React.FC = () => {
  const { isRun: isRunForReissueContract } = useSelector((state: RootState) => state.saveReissueContract);
  const { currentURL } = useForLocation();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Dispatch the action to fetch the declined offer values
    store.dispatch(getLeadWithDeclineOfferValues());
  }, [isRunForReissueContract]);

  useEffect(() => {
    const handlePopState = () => {
      if (location.pathname === "/view-decline-cases") {
        // Prevent navigating to previous pages
        window.history.pushState(null, document.title, window.location.href);
      } else if (location.pathname.startsWith("/view-decline-cases/manage-contract")) {
        // Navigate back to /view-decline-cases if coming from manage-contract
        navigate("/view-decline-cases", { replace: true });
      }
    };

    // Push the current state to history
    window.history.pushState(null, document.title, window.location.href);

    // Add the popstate listener
    window.addEventListener("popstate", handlePopState);

    return () => {
      // Cleanup the event listener
      window.removeEventListener("popstate", handlePopState);
    };
  }, [location.pathname, navigate]);

  return (
    <>
      {currentURL === "/view-decline-cases" && <ViewDeclineCases />}
      <Outlet />
    </>
  );
};

export default ViewDeclineCasesPage;
