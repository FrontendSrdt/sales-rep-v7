import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import store, { RootState } from "../../../../store";
import { onDrawrCloseHandler } from "../../../../store/ui/ui-slice";
import CustomFormForLeadOperations from "../CustomFormForLeadOperations";
import { uploadDocs } from "../../../../store/upload-docs/upload-docs-slice";
import { initialValuesForUploadDocs, uploadDocsFormData, validationSchemaForUploadDocs } from "../../../../data/manage-leads/upload-docs-data";

const UploadDocs: React.FC = () => {
  const { leadCaptureId } = useParams();
  const { responseForAttachmentType } = useSelector((state: RootState) => state.coreAttachementType);
  const { isRun, isLoading, responseOfUploadDocs } = useSelector((state: RootState) => state.docsUpload);

  const formattedData = responseForAttachmentType.map((item: any) => ({
    label: item.name,
    value: item.value,
  }));
  // THIS FUNCTION IS CREATED ONLY FOR THE SUPPORT TO PROPS TYPE
  const getOptionsForSelect = () => {
    return formattedData;
  };

  const submitHandler = (values: any) => {
    try {
      // Create a new FormData object
      const formData = new FormData();
      formData.append("leadCaptureId", String(Number(leadCaptureId))); // Convert to number, then to string
      formData.append("coreDocAttachmentTypeId", String(Number(values.coreDocAttachmentTypeId))); // Convert to number, then to string
      formData.append("uploadedBy", "R");
      if (values.name) {
        formData.append("multipartFile", values.name); // Attach file if provided
      }
      //   // Dispatch the FormData using the thunk
      store.dispatch(uploadDocs(formData));
    } catch (error) {
      console.error("Error during submission:", error);
    }
  };

  useEffect(() => {
    if (!isLoading && responseOfUploadDocs) {
      store.dispatch(onDrawrCloseHandler());
    }
  }, [isRun]);

  return (
    <div className=" mx-4 p-4 bg-white rounded-md">
      <h2 className="text-2xl font-semibold mb-4">Upload Documents</h2>
      <hr className="mb-4" />
      <CustomFormForLeadOperations
        initialValues={initialValuesForUploadDocs}
        validationSchema={validationSchemaForUploadDocs}
        getOptionsForSelect={getOptionsForSelect}
        // inputsData={CreateNotesFormData}
        isMode="Notes"
        formInputForcreate={uploadDocsFormData}
        onAction={submitHandler}
      />
    </div>
  );
};

export default UploadDocs;
