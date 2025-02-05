import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MdOutlineEdit } from "react-icons/md";
import { getInitialValuesForInterestShown, validationSchemaForInterestShown } from "../../../../data/lead-details-data-new/interestShow-data";
import InterestShownForm from "./InterestShownForm";
import { useSelector } from "react-redux";
import store, { RootState } from "../../../../store";
import { transformPayloadForInterestShown } from "../../../../util/actions/lead-attribute-transformation/transformLeadDetailsPayloadData";
import { createLeadEnquiry, resetResponseForLeadEnquiry } from "../../../../store/lead-attribute-update/create-leadEnquiry-slice";
import { getApRowWiseByCareerId } from "../../../../store/lead-attribute-update/get-academicProgramRowWise-byCareerId-slice";
import { getCityRowWiseByStateId } from "../../../../store/lead-attribute-update/get-CityRowWise-byStateId-slice";

const InterestShownInfo: React.FC = () => {
  const { leadCaptureId } = useParams();
  const [isEditing, setEditing] = useState(false);
  const [isRowAdded, setIsRowAdded] = useState(false);
  const { isLoading, responseOfLeadEnquiryDetailsById } = useSelector((state: RootState) => state.getLeadEnquiryDetailsDataById);
  const { isError, responseOfLeadEnquiry } = useSelector((state: RootState) => state.addLeadEnquiry);

  const initialValues = getInitialValuesForInterestShown(responseOfLeadEnquiryDetailsById, leadCaptureId);


  // to dispatch for the pre selected program and city

  useEffect(() => {
    if (Array.isArray(responseOfLeadEnquiryDetailsById)) {
      responseOfLeadEnquiryDetailsById.forEach((item: any, index: number) => {
        const careerId = item.academicCareerId;
        const stateId = item.coreStateId;

        if (careerId !== "" && careerId !== null) {
          store.dispatch(getApRowWiseByCareerId({ careerId, index }));
        }
        if (stateId !== "" && stateId !== null) {
          store.dispatch(getCityRowWiseByStateId({ stateId: stateId, index }));
        }
      });
    }
  }, [responseOfLeadEnquiryDetailsById]);

  const onUpdateLeadHandler = (data: any) => {
    const { values } = data;
    const newLeadEnquiry = transformPayloadForInterestShown(values);
    console.log(newLeadEnquiry);

    store.dispatch(createLeadEnquiry(newLeadEnquiry));
  };

  useEffect(() => {
    if (!isError && responseOfLeadEnquiry) {
      setIsRowAdded(false);
      setEditing(false);
      store.dispatch(resetResponseForLeadEnquiry());
    }
  }, []);

  const handleEditClick = () => {
    setEditing(true);
  };

  return (
    <>
      {responseOfLeadEnquiryDetailsById !== null && !isLoading && (
        <div className="bg-white relative  mt-5  pb-1">
          <div className="flex justify-between items-center  h-[50px] relative mb-5 px-4 bg-blue-100 ">
            <h1 className="text-lg font-semibold">Course Interested</h1>
            {!isEditing && (
              <button className=" px-6 py-1.5  font-medium rounded-lg" onClick={handleEditClick}>
                <MdOutlineEdit size={20} />
              </button>
            )}
          </div>

          <div className="px-4">
            <InterestShownForm
              btnText={"Save"}
              btnType={"submit"}
              initialValues={initialValues}
              validationschema={validationSchemaForInterestShown}
              isEnableForAction={true}
              onSaveAndAddHandler={onUpdateLeadHandler}
              isEditing={isEditing}
              setEditing={setEditing}
              setIsRowAdded={setIsRowAdded}
              isRowAdded={isRowAdded}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default InterestShownInfo;
