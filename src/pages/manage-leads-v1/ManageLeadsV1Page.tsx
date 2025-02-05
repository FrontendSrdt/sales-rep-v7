import React, { useEffect } from "react";
import useForLocation from "../../hooks/useForLocation";
import { Outlet } from "react-router-dom";
import { dispatchAllApis } from "../../util/actions/dispatchAllApis";
import { useSelector } from "react-redux";
import store, { RootState } from "../../store";
import ManageLeadsV1 from "../../component/manage-leads/ManageLeadsV1";
import { getLeadCaptureByFullName } from "../../store/lead-capture/get-allLeadCapture-By-fullName-slice";

const ManageLeadsV1Page: React.FC = () => {


  const { userDetails } = useSelector((state: RootState) => state.getLoggedInUserData);

  const { isRun: isRunForQuickAddLead } = useSelector((state: RootState) => state.addLeadCaptureByQuickAddForm);
  const { isRun: isRunForAddLeadAdditionalDetails } = useSelector((state: RootState) => state.addLeadAdditionalDetails);
  const { isRun: isRunForOwnerUpdate } = useSelector((state: RootState) => state.updateLeadOwner);

  const userEmail = userDetails.email;
  const fullName = userDetails?.fullName;
  const { currentURL } = useForLocation();

  useEffect(() => {
    if (fullName) {
      const payload = {
        current_salesrep_full_name: fullName,
      };
      store.dispatch(getLeadCaptureByFullName(payload));
    }
  }, [userEmail, currentURL, isRunForQuickAddLead, isRunForAddLeadAdditionalDetails, isRunForOwnerUpdate]);

  useEffect(() => {
    dispatchAllApis();
  }, [dispatchAllApis]);



  return (
    <>
      {currentURL === "/manage-leads-v1" && (

        <ManageLeadsV1 />
      )}
      <Outlet />
    </>
  );
};

export default ManageLeadsV1Page;
