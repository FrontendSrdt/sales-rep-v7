import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import store, { RootState } from "../../store";
import { onGetLeadCaptureId } from "../../store/ui/ui-slice";
import LoadingSpinner from "../../util/custom/ui/LoadingSpinner";
import { getTaskTypeValues } from "../../store/task/get-taskType-slice";
import { getLeadNameValues } from "../../store/task/get-allLeadName-slice";
import { getLeadScheduleTaskById } from "../../store/task/get-allLeadScheduleTaskById-slice";
import { getleadDetailsById } from "../../store/view-leads-details/get-leadDetails-byId-slice";
import { getLeadPropertiesById } from "../../store/view-leads-details/get-leadProperties-byLeadId-slice";
import { getleadAdditionalDetailsById } from "../../store/lead-capturing/get-leadAdditionalDetails-byId-slice";
import { getDocumentsById } from "../../store/notes/get-documents-by-CaptureId-slice";
import { getLeadScheduledNotesValuesById } from "../../store/notes/get-leadScheduledNotes-by-CaptureId-slice";
import { getAttachmentTypeValues } from "../../store/notes/get-all-coreDocAttachmentType-slice";
import ManageLeadsDetails from "../../component/manage-leads/leads-details/ManageLeadsDetails";
import { getLeadScheduledTaskValues } from "../../store/task/get-allLeadscheduledTask";
import { getMaxLeadScholarshipDetailsById } from "../../store/scholarship-services/get-max-lead-scholarship-details-by-leadCapture-id-slice";
import { findLeadScholarshipDetailsById } from "../../store/scholarship-services/find-lead-scholarship-details-by-lead-id-slice";
import { getLeadApplicationStatusByLeadId } from "../../store/lead-applicationStatus/get-lead-application-status-by-lead-capture-id-slice";
import { getMaxActiveAppStatus } from "../../store/scholarship-services/get-max-active-application-status-slice";
import { getStudentDocsByLeadCaptureId } from "../../store/student-documets/get-studentDocs-byId-slice";
import { getLeadEnquiryDetailsById } from "../../store/lead-attribute-update/get-leadEnquiryDetails-slice";

const ViewManageLeadsPage: React.FC = () => {
  const { leadCaptureId } = useParams();
  const dispatch = store.dispatch;
  const location = useLocation();
  // let isDataAvailable: boolean | null = null;
  const { isRun: isRunForCreate } = useSelector((state: RootState) => state.addNewLeadTask);
  const { isRun: isRunForUpdate } = useSelector((state: RootState) => state.leadTaskUpdate);
  const { isRun: isRunForCompletionStatus } = useSelector((state: RootState) => state.leadCompletionStatusUpdate);
  const { isLoading: isLoadingDetails } = useSelector((state: RootState) => state.getleadDetailsDataById);
  const { isLoading: isLoadingProperties } = useSelector((state: RootState) => state.getLeadPropertiesDataById);
  const { isRun: isRunForDocs } = useSelector((state: RootState) => state.docsUpload);

  // const { responseForAttachmentType } = useSelector((state: RootState) => state.coreAttachementType);
  const { isRun: isRunUpdateLeadAditionalDetails } = useSelector((state: RootState) => state.leadAdditionalDetailsUpdate);
  const { isRun: isRunForCreateNote } = useSelector((state: RootState) => state.addNewNotes);
  const { isRun: isRunForUpdateNote } = useSelector((state: RootState) => state.leadNotesUpdate);
  const { isRun: isRunForLeadOfferLock } = useSelector((state: RootState) => state.lockLeadOffer);
  const { isRun: isRunForVerify } = useSelector((state: RootState) => state.verifyStudentDocsResponse);
  const { isRun: isRunForAllDocsConfirmation } = useSelector((state: RootState) => state.getConfirmationForAllDocsByLeadCaptureId);

  const { responseOfLeadEnquiryDetailsById } = useSelector((state: RootState) => state.getLeadEnquiryDetailsDataById);
  const activeEnquiry = Array.isArray(responseOfLeadEnquiryDetailsById) ? responseOfLeadEnquiryDetailsById.filter((item: any) => item.status === "ACTIVE") : [];

  const navigate = useNavigate();
  const isViaButton = location.state?.viaButton;

  useEffect(() => {
    store.dispatch(getLeadEnquiryDetailsById(leadCaptureId));
  }, [leadCaptureId]);

  useEffect(() => {
    if (!isViaButton) {
      navigate("/manage-leads");
    }
  }, [location.state, navigate]);

  useEffect(() => {
    if (leadCaptureId) {
      dispatch(onGetLeadCaptureId(leadCaptureId));
      dispatch(getTaskTypeValues());
      // dispatch(getLeadOwnerValues());
      dispatch(getLeadNameValues());
      dispatch(getLeadScheduledTaskValues());
      // dispatch(getDocumentsById(leadCaptureId));
      dispatch(getLeadScheduledNotesValuesById(leadCaptureId));
      dispatch(getAttachmentTypeValues());
      dispatch(getLeadPropertiesById(leadCaptureId));
      dispatch(getMaxActiveAppStatus(leadCaptureId));
      dispatch(getMaxLeadScholarshipDetailsById(leadCaptureId));
    }
  }, [leadCaptureId, dispatch]);

  // ###################
  useEffect(() => {
    if (activeEnquiry.length !== 0) {
      const leadEnquiryId = activeEnquiry[0].leadEnquiryId;
      const payloadForScholarship = {
        leadCaptureId: leadCaptureId,
        leadEnquiryId: leadEnquiryId,
      };
      const payloadForApplicationStatus = {
        leadCaptureId: leadCaptureId,
        leadEnquiryId: leadEnquiryId,
      };
      dispatch(findLeadScholarshipDetailsById(payloadForScholarship));
      dispatch(getLeadApplicationStatusByLeadId(payloadForApplicationStatus));
    }
  }, [leadCaptureId, isRunForLeadOfferLock, isRunForAllDocsConfirmation, responseOfLeadEnquiryDetailsById]);

  useEffect(() => {
    dispatch(getStudentDocsByLeadCaptureId(leadCaptureId));
  }, [leadCaptureId, isRunForVerify]);

  useEffect(() => {
    dispatch(getleadDetailsById(leadCaptureId));
  }, [leadCaptureId, isRunForCreate, isRunForCreateNote]);

  useEffect(() => {
    dispatch(getleadAdditionalDetailsById(leadCaptureId));
  }, [leadCaptureId, isRunUpdateLeadAditionalDetails]);

  useEffect(() => {
    dispatch(getLeadScheduleTaskById(leadCaptureId));
  }, [leadCaptureId, isRunForCreate, isRunForUpdate, isRunForCompletionStatus]);

  useEffect(() => {
    dispatch(getDocumentsById(leadCaptureId));
  }, [isRunForDocs, isRunForCreateNote, isRunForUpdateNote]);
  useEffect(() => {
    dispatch(getLeadScheduledNotesValuesById(leadCaptureId));
  }, [isRunForCreateNote, isRunForUpdateNote]);

  // console.log(leadDetailsDataById);

  // Consolidated loading and data availability checks
  const isLoading = isLoadingDetails && isLoadingProperties;

  return (
    <>
      {isLoading && <LoadingSpinner size={20} mainLoading={false} message="Loading..." centered={true} />}
      {!isLoading && <ManageLeadsDetails />}
    </>
  );
};

export default ViewManageLeadsPage;
