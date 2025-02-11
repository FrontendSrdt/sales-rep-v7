import React from "react";
import StudentDocuments from "../../component/manage-leads/leads-details/student-documets/StudentDocuments";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import LoadingSpinner from "../../util/custom/ui/LoadingSpinner";
const StudentDocumentsPage: React.FC = () => {
  const { isLoading, leadApplicationStatusByLeadId } = useSelector((state: RootState) => state.getLeadApplicationStatusDataByLeadId);

  // const { ConfirmationForAllDocsByLeadCaptureIdResponse, isError } = useSelector((state: RootState) => state.getConfirmationForAllDocsByLeadCaptureId);

  // const { leadCaptureId } = useParams();

  // useEffect(() => {
  //   if (!isError && ConfirmationForAllDocsByLeadCaptureIdResponse) {
  //     const leadDetails = {
  //       leadCaptureId: leadCaptureId,
  //       displayName: "Documents Review",
  //     };
  //     store.dispatch(getStudentDocsStatusType(leadDetails));
  //     store.dispatch(resetResponseForGetConfirmationForAllDocs());
  //   }
  // }, [ConfirmationForAllDocsByLeadCaptureIdResponse]);

  return (
    <>
      {isLoading && <LoadingSpinner centered={false} mainLoading={false} size={25} message="Loading" />}
      {!isLoading && leadApplicationStatusByLeadId.length !== 0 && <StudentDocuments />}
    </>
  );
};

export default StudentDocumentsPage;
