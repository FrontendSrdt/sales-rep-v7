import * as Yup from "yup";

export const uploadDocsFormData = [
  { id: 1, type: "select", label: "Attachment Type", name: "coreDocAttachmentTypeId", isRequired: true },
  { id: 2, type: "file", label: "Add Attachments", name: "name", isRequired: true },
];

export const initialValuesForUploadDocs = {
  coreDocAttachmentTypeId: "",
  name: "",
};
export const validationSchemaForUploadDocs = Yup.object({
  coreDocAttachmentTypeId: Yup.mixed().required("Attachment Type is required"),
  name: Yup.mixed().required("File is required"),
});
