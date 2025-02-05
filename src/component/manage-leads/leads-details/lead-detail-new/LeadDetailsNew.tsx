import React, { useEffect } from "react";
import BiographicalInfo from "./BiographicalInfo";
import AddressInfo from "./AddressInfo";
import store, { RootState } from "../../../../store";
import { useParams } from "react-router-dom";
import { getLeadAddressById } from "../../../../store/lead-attribute-update/get-leadAddress-byId-slice";
import { getLeadContactDetailsById } from "../../../../store/lead-attribute-update/get-leadContactDetails-byId-slice";
import { getLeadAcademicDetailsById } from "../../../../store/lead-attribute-update/get-leadAcademicDetails-slice";
import AcademicInfo from "./AcademicDetailsInfo";
import { useSelector } from "react-redux";
import ContactDetailsInfo from "./ContactDetailsInfo";
import LoadingSpinner from "../../../../util/custom/ui/LoadingSpinner";
import InterestShownInfo from "./InterestShownInfo";
import { getLeadEnquiryDetailsById } from "../../../../store/lead-attribute-update/get-leadEnquiryDetails-slice";
import { getAdditionalInfoById } from "../../../../store/lead-attribute-update/get-leadAdditionalDetails-slice";

const LeadDetailsNew: React.FC = () => {
  const { leadCaptureId } = useParams();
  const { isLoading: isLoadingForBiographical } = useSelector((state: RootState) => state.getAdditionalInfoByIdData);
  const { isRun: isRunForAddress } = useSelector((state: RootState) => state.LeadAddressUpdate);
  const { isRun: isRunForContact } = useSelector((state: RootState) => state.LeadContactUpdate);
  const { isRun: isRunForAcademic } = useSelector((state: RootState) => state.LeadAcademicDetailsUpdate);
  const { isLoading: isLoadingForContact } = useSelector((state: RootState) => state.getLeadContactDetailsDataById);
  const { isLoading: isLoadingForAddress } = useSelector((state: RootState) => state.getLeadAddressDataById);
  const { isLoading: isLoadingForAcademic } = useSelector((state: RootState) => state.getLeadAcademicDetailsDataById);
  const { isRun: isRunForInterestShown } = useSelector((state: RootState) => state.addLeadEnquiry);
  const { isLoading: isLoadingForInterestShown } = useSelector((state: RootState) => state.getLeadEnquiryDetailsDataById);
  const { isRun } = useSelector((state: RootState) => state.LeadAdditionalInfoUpdate);

  useEffect(() => {
    store.dispatch(getLeadAcademicDetailsById(leadCaptureId));
  }, [leadCaptureId, isRunForAcademic]);

  useEffect(() => {
    store.dispatch(getLeadContactDetailsById(leadCaptureId));
  }, [isRunForContact, leadCaptureId]);

  useEffect(() => {
    store.dispatch(getAdditionalInfoById(leadCaptureId));
  }, [isRun, leadCaptureId]);

  useEffect(() => {
    store.dispatch(getLeadAddressById(leadCaptureId));
  }, [isRunForAddress, leadCaptureId]);

  useEffect(() => {
    store.dispatch(getLeadEnquiryDetailsById(leadCaptureId));
  }, [leadCaptureId, isRunForInterestShown]);

  const isLoading = isLoadingForBiographical || isLoadingForContact || isLoadingForAddress || isLoadingForAcademic || isLoadingForInterestShown;

  return (
    <>
      {isLoading && <LoadingSpinner size={20} mainLoading={false} message="Fetching Lead Details" centered={false} />}
      {!isLoading && (
        <>
          <InterestShownInfo />
          <BiographicalInfo />
          <ContactDetailsInfo />
          <AddressInfo />
          <AcademicInfo />
        </>
      )}
    </>
  );
};

export default LeadDetailsNew;
