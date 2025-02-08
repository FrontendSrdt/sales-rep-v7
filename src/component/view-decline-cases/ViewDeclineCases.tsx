import React from "react";
import ViewDeclineCasesTable from "./ViewDeclineCasesTable";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import LoadingSpinner from "../../util/custom/ui/LoadingSpinner";

const ViewDeclineCases: React.FC = () => {
  // const { responseForLeadWithDeclineOffer, isLoading } = useSelector((state: RootState) => state.coreLeadWithDeclineOffer);
  const { leadCaptureByFullName: data, isLoading: isLoadingForLeadByFullname } = useSelector((state: RootState) => state.getLeadCaptureByFullName);
  return <>{isLoadingForLeadByFullname ? <LoadingSpinner size={35} mainLoading={true} message={"Hold On!"} centered={true} /> : <ViewDeclineCasesTable dataForTable={data} />}</>;
};

export default ViewDeclineCases;
