import React, { useEffect, useState } from "react";
import store, { RootState } from "../../../../store";
 
import { useSelector } from "react-redux";
import LoadingSpinner from "../../../../util/custom/ui/LoadingSpinner";
import { academicDetailsFormInput, getInitialValuesForAcademicDetails, getValidationSchemaForAcademicDeatils } from "../../../../data/lead-details-data-new/leadAcademic-data";
import AcademicInfoForm from "./AcademicDetailsForm";
import { onSetEnableForDiplomaInputFields, onSetEnableForTwefthInputFields, onSetEnableForUGInputFields } from "../../../../store/ui/ui-slice";
import { transformPayloadForAcademicData } from "../../../../util/actions/lead-attribute-transformation/transformLeadDetailsPayloadData";
import { useParams } from "react-router-dom";
import {
  resetResponseForUpdateLeadAcademicDetails,
  takeActionsForUpdateLeadAcademicDetails,
  updateLeadAcademicDetails,
} from "../../../../store/lead-attribute-update/update-leadAcademicDetails-slice";
import { MdOutlineEdit } from "react-icons/md";
 
const AcademicInfo: React.FC = () => {
  const { leadCaptureId } = useParams();
  const { isLoading, responseOfLeadAcademicDetailsById } = useSelector((state: RootState) => state.getLeadAcademicDetailsDataById);
  const { responseofLeadBiographicalInfo } = useSelector((state: RootState) => state.getBiographicalInfoByIdData);
 
  const { isEnableForDiplomaInputFields, isEnableForTwelfthInputFields, isEnableForUGInputFields } = useSelector((state: RootState) => state.ui as any);
 
  const { isError, resetActions, responseOfLeadAcademicDetails } = useSelector((state: RootState) => state.LeadAcademicDetailsUpdate);
  const [isEditing, setEditing] = useState(false);
 
  const onUpdateLeadHandler = (data: any) => {
    const updatedData = transformPayloadForAcademicData(data.values, isEnableForTwelfthInputFields, isEnableForDiplomaInputFields, leadCaptureId);
    store.dispatch(updateLeadAcademicDetails(updatedData));
    store.dispatch(takeActionsForUpdateLeadAcademicDetails(data.actions));
  };
 
  const initialValuesForAcademicInfo = responseOfLeadAcademicDetailsById !== null ? getInitialValuesForAcademicDetails(responseOfLeadAcademicDetailsById) : null;
 
  const Tenth_plus_2_type = initialValuesForAcademicInfo?.tenth_plus_2_type;
  const careerId = responseofLeadBiographicalInfo.careerId;
 
  useEffect(() => {
    if (Tenth_plus_2_type === "TWELFTH") {
      store.dispatch(onSetEnableForTwefthInputFields());
    }
 
    if (Tenth_plus_2_type === "DIPLOMA") {
      store.dispatch(onSetEnableForDiplomaInputFields());
    }
 
    if (careerId == "46") {
      store.dispatch(onSetEnableForUGInputFields());
    }
  }, [initialValuesForAcademicInfo?.tenth_plus_2_type, responseofLeadBiographicalInfo.careerId]);
 
  useEffect(() => {
    if (!isError && responseOfLeadAcademicDetails) {
      setEditing(false)
      resetActions.resetForm();
      store.dispatch(resetResponseForUpdateLeadAcademicDetails());
    }
  }, [responseOfLeadAcademicDetails]);
 
  const handleEditClick = () => {
    setEditing(true);
  };
 
  return (
    <>
      {isLoading && <LoadingSpinner size={20} mainLoading={false} message="Loading Details" centered={false} />}
      {initialValuesForAcademicInfo !== null && !isLoading && (
        <div className="bg-white  mt-5  pb-1 relative">
          <div className="flex justify-between items-center h-[50px]  mb-5 px-4 bg-blue-100">
            <h1 className="text-lg font-semibold">Academic Info</h1>
            {!isEditing && (
              <button className=" px-6 py-1.5  font-medium rounded-lg" onClick={handleEditClick}>
                <MdOutlineEdit size={20} />
              </button>
            )}
          </div>
          <div className="px-4">
            <AcademicInfoForm
              btnText={"Save"}
              btnType={"submit"}
              initialValues={initialValuesForAcademicInfo}
              validationSchema={getValidationSchemaForAcademicDeatils(isEnableForTwelfthInputFields, isEnableForDiplomaInputFields, isEnableForUGInputFields)}
              inputData={academicDetailsFormInput}
              isEnableForAction={true}
              onSaveAndAddHandler={onUpdateLeadHandler}
              isEnableForTwelfth={isEnableForTwelfthInputFields}
              isEnableForDiploma={isEnableForDiplomaInputFields}
              isEnableForUg={isEnableForUGInputFields}
              isEditing={isEditing}
              setEditing={setEditing}
            />
          </div>
        </div>
      )}
    </>
    // <div>hello</div>
  );
};
 
export default AcademicInfo;