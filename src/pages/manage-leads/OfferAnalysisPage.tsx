import React, { useEffect, useState } from "react";
import OfferAnalysis from "../../component/manage-leads/leads-details/offer-analysis/OfferAnalysis";
import store, { RootState } from "../../store";
import { useSelector } from "react-redux";
import { getFeeCalculationByProgramId } from "../../store/offer-analysis/get-FeeCalculation-byProgramId-slice";
import { useParams } from "react-router-dom";

import { getLeadOfferByLeadId } from "../../store/offer-analysis/get-lead-offers-by-leadId-slice";
import { leadOfferHistoryByOfferId, resetLeadOfferHistoryByOfferIdResponse } from "../../store/offer-analysis/find-leadOfferHistory-by-offerId-and-leadCaptureId-slice";
import LoadingSpinner from "../../util/custom/ui/LoadingSpinner";
import { resetPackageDealByLeadCaptureIdResponse } from "../../store/package-deal/get-package-deal-by-programId-leadCaptureId-slice";
import useForLocation from "../../hooks/useForLocation";
import { getAllScholarshipOption } from "../../store/scholarship-get/get-all-scholarshipData-slice";

const OfferAnalysisPage: React.FC = () => {
  const dispatch = store.dispatch;
  const { leadCaptureId } = useParams();
  const [isEnablePackageDeal, setIsEnablePackageDeal] = useState<boolean>(false);
  const { leadAdditionalDetailsDataById } = useSelector((state: RootState) => state.getLeadAdditionalDetailsDataById);
  const { getOfferAndInstallmentPayload: lockLeadOfferData } = useSelector((state: RootState) => state.ui);
  const { isLoading } = useSelector((state: RootState) => state.findLeadScholarshipDetails);
  const { isLoading:isLoadingForStatus, leadApplicationStatusByLeadId } = useSelector((state: RootState) => state.getLeadApplicationStatusDataByLeadId);
  const { responseOfLeadEnquiryDetailsById } = useSelector((state: RootState) => state.getLeadEnquiryDetailsDataById);
  const activeEnquiry = Array.isArray(responseOfLeadEnquiryDetailsById) ? responseOfLeadEnquiryDetailsById.filter((item: any) => item.status === "ACTIVE") : [];
  const leadEnquiryId = activeEnquiry[0].leadEnquiryId;
  const [offerId, setOfferId] = useState(null);
  const [leadStatus, setLeadStatus] = useState<string>("");
  const { currentURL } = useForLocation();
  const { isRun: isrunForLockOffer } = useSelector((state: RootState) => state.lockLeadOffer);
  const registrationFeeObject = !isLoadingForStatus && leadApplicationStatusByLeadId.length !== 0 && leadApplicationStatusByLeadId.find((item: any) => item.name === "Registration Fee");

  useEffect(() => {
    store.dispatch(resetLeadOfferHistoryByOfferIdResponse());
  }, [currentURL]);

  const [displayOfferAnalysis, setDisplayOfferAnalysis] = useState(false);

  useEffect(() => {
    console.log("inside effect");
    const shouldDisplayOfferAnalysis = registrationFeeObject.status === true;
    setDisplayOfferAnalysis(shouldDisplayOfferAnalysis);
  }, [leadApplicationStatusByLeadId]);

  const programId = leadAdditionalDetailsDataById?.academicProgramId;

  // effect to fetch the fee details at the first time when sales rep will lock the offer at very first after the scholarship step from student has been completed
  useEffect(() => {
    if (programId !== undefined && leadCaptureId !== undefined) {
      store.dispatch(getFeeCalculationByProgramId({ programId, leadCaptureId }));
    }

    const payload = {
      leadCaptureId: leadCaptureId,
      leadEnquiryId: leadEnquiryId,
    };
    store.dispatch(getLeadOfferByLeadId(payload));
  }, [programId, leadCaptureId, isrunForLockOffer]);

  // function to dispatch the lead offer lock
  const handleLockOffer = () => {
    if (Object.keys(lockLeadOfferData).length > 0) {
      // store.dispatch(lockLeadOffer(lockLeadOfferData));
    } else {
      console.error("leadScholarId is undefined or invalid");
    }
  };

  // funnction to get the offerId in case of history (if lead has any offer history)
  const ongetLeadOfferHistory = (selectedRowData: any) => {
    if (!selectedRowData) {
      return;
    }

    const { offerId, leadStatus } = selectedRowData;
    if (offerId !== undefined && leadCaptureId !== undefined) {
      console.log("offerId= ", offerId);
      console.log("leadStatus= ", leadStatus);
      setOfferId(offerId);
      setLeadStatus(leadStatus);
      setIsEnablePackageDeal(false);
      dispatch(resetPackageDealByLeadCaptureIdResponse());
    }
  };

  const enableOfferGrantHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsEnablePackageDeal(e.target.checked);
    dispatch(resetPackageDealByLeadCaptureIdResponse());
  };

  // effect to fetch the lead offer history when offerId changes on click and on first load
  useEffect(() => {
    if (offerId !== null) {
      store.dispatch(leadOfferHistoryByOfferId({ offerId, leadCaptureId }));
    }
    if (leadStatus !== "") {
      const payload = {
        leadCaptureId: leadCaptureId,
        leadEnquiryId: leadEnquiryId,
        status: leadStatus,
      };
      store.dispatch(getAllScholarshipOption(payload));
    }
  }, [leadStatus, offerId, leadCaptureId]);

  return (
    <div>
      {isLoading && <LoadingSpinner centered={false} mainLoading={false} message="Loading" size={25} />}

      {/* if is not loading for scholarship details response call the offer analysis componemt */}
      {!isLoading && displayOfferAnalysis && (
        <OfferAnalysis
          handleLockOffer={handleLockOffer}
          ongetLeadOfferHistory={ongetLeadOfferHistory}
          isEnablePackageDeal={isEnablePackageDeal}
          onEnableOfferGrantHandler={enableOfferGrantHandler}
        />
      )}
    </div>
  );
};

export default OfferAnalysisPage;
