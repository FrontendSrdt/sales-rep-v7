import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import store, { RootState } from "../../../../store";
import { onDrawrCloseHandler } from "../../../../store/ui/ui-slice";
import CustomFormForLeadOperations from "../CustomFormForLeadOperations";
import { CreateNotesFormData, initialValuesForAddNotes, validationSchemaForAddNotes } from "../../../../data/manage-leads/notes/createNotes-data";
import { resetResponseForUpdateLeadNotes, updateLeadNotes } from "../../../../store/notes/update-leadNotes-byNoteId-slice";
import { resetResposneforNewLeadNotes } from "../../../../store/notes/create-leadNotes-slice";
import { AddNewNotes, takeActionForNewNotes } from "../../../../store/notes/create-notes-slice";

const AddNotes: React.FC = () => {
  const { getHeaderTabIconsName } = useSelector((state: RootState) => state.ui);
  const { leadNotesByNoteId } = useSelector((state: RootState) => state.getLeadNotesDataByNoteId);
  const { responseForAttachmentType } = useSelector((state: RootState) => state.coreAttachementType);
  const { isRun, isLoading, responseOfNewNotes, resetActions } = useSelector((state: RootState) => state.addNewNotes);
  const { isError, responseOfUpdateLeadNotes } = useSelector((state: RootState) => state.leadNotesUpdate);

  const { leadCaptureId } = useParams();

  const formattedData = responseForAttachmentType.map((item: any) => ({
    label: item.name,
    value: item.value,
  }));

  const getOptionsForSelect = () => {
    return formattedData;
  };

  const submitHandler = (values: any, actions: any) => {
    console.log(actions);
    try {
      // Create a new FormData object
      const formData = new FormData();
      formData.append("leadCaptureId", String(Number(leadCaptureId))); // Convert to number, then to string
      formData.append("noteText", values.note); // Add the note text (supports HTML)
      formData.append("coreDocAttachmentTypeId", String(Number(values.coreDocAttachmentTypeId))); // Convert to number, then to string

      if (values.name) {
        formData.append("multipartFile", values.name); // Attach file if provided
      }

      for (let [key, value] of formData.entries()) {
        if (value instanceof File) {
          console.log(key, value.name); // For file, log the file name
        } else {
          console.log(key, value);
        }
      }

      //for notes update
      if (getHeaderTabIconsName === "NotesEdit") {
        const leadNoteId = leadNotesByNoteId.leadNotesId;
        store.dispatch(updateLeadNotes({ leadNoteId, formData }));
      } else {
        // Dispatch the FormData using the thunk
        store.dispatch(AddNewNotes(formData));
        store.dispatch(takeActionForNewNotes(actions));
      }
    } catch (error) {
      console.error("Error during submission:", error);
    }
  };

  const updatedInitialValues = {
    note: leadNotesByNoteId.note,
    coreDocAttachmentTypeId: 21,
    name: leadNotesByNoteId.leadDocAttachmentDTO || null,
  };

  useEffect(() => {
    if (!isLoading && responseOfNewNotes) {
      store.dispatch(onDrawrCloseHandler());
      store.dispatch(resetResposneforNewLeadNotes());
       resetActions.resetForm();
    } else if (responseOfUpdateLeadNotes && !isError) {
      store.dispatch(onDrawrCloseHandler());
      store.dispatch(resetResponseForUpdateLeadNotes());
    }
  }, [isRun, responseOfNewNotes, responseOfUpdateLeadNotes, isError]);

  // console.log("Notes Data ", NotesData);

  return (
    <div className=" mx-4 p-4 bg-white rounded-md">
      <h2 className="text-2xl font-semibold mb-4">{getHeaderTabIconsName === "Note" ? "Add Notes" : "Edit Notes"}</h2>
      <hr className="mb-4" />
      <CustomFormForLeadOperations
        // initialValues={initialValuesForAddNotes}
        initialValues={getHeaderTabIconsName === "NotesEdit" ? updatedInitialValues : initialValuesForAddNotes}
        validationSchema={validationSchemaForAddNotes}
        getOptionsForSelect={getOptionsForSelect}
        // inputsData={CreateNotesFormData}
        isMode="Notes"
        formInputForcreate={CreateNotesFormData}
        // onAction={
        //   getHeaderTabIconsName === "NotesEdit"
        //     ? updateNotesHandler
        //     : submitHandler
        // }
        onAction={submitHandler}
      />
    </div>
  );
};

export default AddNotes;
