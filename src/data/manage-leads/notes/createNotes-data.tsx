import * as Yup from "yup";

export const CreateNotesFormData = [
  { id: 1, type: "texteditor", label: "Text Editor", name: "note", isRequired: true },
  { id: 2, type: "select", label: "Attachment Type", name: "coreDocAttachmentTypeId", isRequired: true },
  { id: 3, type: "file", label: "Add Attachments", name: "name", isRequired: true },
];

export const initialValuesForAddNotes = {
  // leadCaptureId: "",
  note: "",
  coreDocAttachmentTypeId: 21,
  name: "",
  path: "",
};
export const validationSchemaForAddNotes = Yup.object({
  note: Yup.string().min(10, "Content must be at least 10 characters").required("Text editor content is required"),
  coreDocAttachmentTypeId: Yup.mixed().required("Attachment Type is required"),
  // name: Yup.mixed().required("File is required"),
  // .test("fileSize", "File is too large", (value) => {
  //   return value ? value.size <= 10 * 1024 * 1024 : true; // 10MB file size limit
  // })
});
