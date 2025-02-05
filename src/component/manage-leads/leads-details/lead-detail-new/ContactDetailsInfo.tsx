import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import store, { RootState } from "../../../../store";
import ContactDetailsForm from "./ContactDetailsForm";
import { getInitialValuesForContact, validationSchemaForContact } from "../../../../data/lead-details-data-new/leadContact-data";
import { useParams } from "react-router-dom";
import { resetResponseForUpdateLeadContact, takeActionsForUpdateLeadContact, updateLeadContact } from "../../../../store/lead-attribute-update/update-contact-slice";
import { MdOutlineEdit } from "react-icons/md";
 
const ContactDetailsInfo: React.FC = () => {
  const { isLoading, responseOfLeadContactDetailsById } = useSelector((state: RootState) => state.getLeadContactDetailsDataById);
  const { isError, resetActions, responseOfUpdateLeadContact } = useSelector((state: RootState) => state.LeadContactUpdate);
  const { leadCaptureId } = useParams();
  const [isEditing, setEditing] = useState(false);
 
  const initialValues = getInitialValuesForContact(responseOfLeadContactDetailsById, leadCaptureId);
 
 
  const onUpdateLeadHandler = (data: any) => {
    const { values, actions } = data;
    store.dispatch(updateLeadContact(values));
    store.dispatch(takeActionsForUpdateLeadContact(actions));
  };
 
  useEffect(() => {
    if (!isError && responseOfUpdateLeadContact) {
      setEditing(false);
      resetActions.resetForm();
      store.dispatch(resetResponseForUpdateLeadContact());
    }
  }, [responseOfUpdateLeadContact]);
 
  const handleEditClick = () => {
    setEditing(true);
  };
 
  return (
    <>
      {responseOfLeadContactDetailsById !== null && !isLoading && (
        <div className="bg-white relative  mt-5  pb-1">
          <div className="flex justify-between items-center  h-[50px] relative mb-5 px-4 bg-blue-100 ">
            <h1 className="text-lg font-semibold">Additional Contacts</h1>
            {!isEditing && (
              <button className=" px-6 py-1.5  font-medium rounded-lg" onClick={handleEditClick}>
                <MdOutlineEdit size={20} />
              </button>
            )}
          </div>
 
          <div className="px-4">
            <ContactDetailsForm
              btnText={"Save"}
              btnType={"submit"}
              initialValues={initialValues}
              validationschema={validationSchemaForContact}
              isEnableForAction={true}
              onSaveAndAddHandler={onUpdateLeadHandler}
              isEditing={isEditing}
              setEditing={setEditing}
            />
          </div>
        </div>
      )}
    </>
  );
};
 
export default ContactDetailsInfo;
 