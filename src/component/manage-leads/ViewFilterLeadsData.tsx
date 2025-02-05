import { useEffect } from "react";
import { useSelector } from "react-redux";
import store, { RootState } from "../../store";
import useForLocation from "../../hooks/useForLocation";
import { getManageLeadsColumnV1 } from "./table/ManageLeadsColumnV1";
import { CustomDetailsTable } from "../../util/custom/leadsFormat/CustomDetailsTable";
import { getLeadCaptureByFullName } from "../../store/lead-capture/get-allLeadCapture-By-fullName-slice";

const ViewFilterLeadsData: React.FC = () => {
  const { currentURL } = useForLocation();
  const { userDetails } = useSelector((state: RootState) => state.getLoggedInUserData);
  const { isRun: isRunForOwnerUpdate } = useSelector((state: RootState) => state.updateLeadOwner);
  const { isRun: isRunForQuickAddLead } = useSelector((state: RootState) => state.addLeadCaptureByQuickAddForm);
  const { isRun: isRunForAddLeadAdditionalDetails } = useSelector((state: RootState) => state.addLeadAdditionalDetails);
  const { leadCaptureByFullName: data, isLoading: isLoadingForLeadByFullname } = useSelector((state: RootState) => state.getLeadCaptureByFullName);
  const fullName = userDetails?.fullName;
  const userEmail = userDetails.email;

  const manageLeadsV1Column = getManageLeadsColumnV1();

  useEffect(() => {
    if (fullName) {
      const payload = {
        current_salesrep_full_name: fullName,
      };
      store.dispatch(getLeadCaptureByFullName(payload));
    }
  }, [userEmail, currentURL, isRunForQuickAddLead, isRunForAddLeadAdditionalDetails, isRunForOwnerUpdate]);

  return (
    <div className="w-full __fliter_gradient">
      {isLoadingForLeadByFullname ? (
        <p className="px-3">Loading....</p>
      ) : // <LoadingSpinner size={20} mainLoading={false} message="Fetching Leads!" centered={false} />
      data && data.length > 0 ? (
        <CustomDetailsTable columns={manageLeadsV1Column} data={data} isMode="manageLeads" />
      ) : (
        // <CustomTableSSR columns={ManageLeadsColumn} data={currentData} />
        <p className="px-3">No data found!!</p>
      )}
    </div>
  );
};

export default ViewFilterLeadsData;
