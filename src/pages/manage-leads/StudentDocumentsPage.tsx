import React, { useEffect } from "react";
import StudentDocuments from "../../component/manage-leads/leads-details/student-documets/StudentDocuments";
import { useSelector } from "react-redux";
import store, { RootState } from "../../store";
import { getStudentDocsStatusType } from "../../store/student-documets/get-studentDocsStatus-slice";
import { resetResponseForGetConfirmationForAllDocs } from "../../store/student-documets/get-confirmation-all-docs-by-lead-id-slice";
import { useParams } from "react-router-dom";

const StudentDocumentsPage: React.FC = () => {
  const { ConfirmationForAllDocsByLeadCaptureIdResponse, isError } = useSelector((state: RootState) => state.getConfirmationForAllDocsByLeadCaptureId);

  const { leadCaptureId } = useParams();

  useEffect(() => {
    if (!isError && ConfirmationForAllDocsByLeadCaptureIdResponse) {
      const leadDetails = {
        leadCaptureId: leadCaptureId,
        displayName: "Documents Review",
      };
      store.dispatch(getStudentDocsStatusType(leadDetails));
      store.dispatch(resetResponseForGetConfirmationForAllDocs());
    }
  }, [ConfirmationForAllDocsByLeadCaptureIdResponse]);

  return <StudentDocuments />;
};

export default StudentDocumentsPage;
