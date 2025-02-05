import React, { useEffect } from "react";
import ManageContract from "../../component/view-decline-cases/ManageContract";
import { useParams } from "react-router-dom";
import store, { RootState } from "../../store";
import { getLeadPropertiesById } from "../../store/view-leads-details/get-leadProperties-byLeadId-slice";
import { getFeeCalculationForDeclineById } from "../../store/lead-with-decline-offer/get-feeCalculationForDecline-byId-slice";
import { getLeadScholarshipDetailsForDeclineById } from "../../store/lead-with-decline-offer/get-ScholarshipDetailsForDecline-byId-slice";
import { useSelector } from "react-redux";
import { getLeadOfferDeclineReasonByOfferId } from "../../store/lead-with-decline-offer/get-leadOfferdeclineReason-by-offerId-slice";

const ManageContractPage: React.FC = () => {
  const { leadCaptureId } = useParams();
  const { FeeCalculationForDeclineByIdResponse } = useSelector((state: RootState) => state.getFeeCalculationForDeclineById);

  const offerId = FeeCalculationForDeclineByIdResponse.leadOfferId;

  useEffect(() => {
    store.dispatch(getLeadPropertiesById(leadCaptureId));
    store.dispatch(getFeeCalculationForDeclineById(leadCaptureId));
    store.dispatch(getLeadScholarshipDetailsForDeclineById(leadCaptureId));
    if (offerId !== undefined && offerId !== null) {
      store.dispatch(getLeadOfferDeclineReasonByOfferId(offerId));
    }
  }, [leadCaptureId]);

  useEffect(() => {
    if (offerId !== undefined && offerId !== null) {
      store.dispatch(getLeadOfferDeclineReasonByOfferId(offerId));
    }
  }, [leadCaptureId, offerId]);

  return <ManageContract />;
};

export default ManageContractPage;
