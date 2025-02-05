import React from "react";
import ViewDeclineCasesTable from "./ViewDeclineCasesTable";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import LoadingSpinner from "../../util/custom/ui/LoadingSpinner";

const ViewDeclineCases: React.FC = () => {
  const { responseForLeadWithDeclineOffer, isLoading } = useSelector((state: RootState) => state.coreLeadWithDeclineOffer);
  return (
    <>
      {isLoading ? <LoadingSpinner size={35} mainLoading={true} message={"Hold On!"} centered={true} /> : <ViewDeclineCasesTable dataForTable={responseForLeadWithDeclineOffer}  />}
    </>
  );
};

export default ViewDeclineCases;
