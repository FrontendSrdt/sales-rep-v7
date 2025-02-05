export interface StudentDocsType {
  leadDocAttachmentId: number;
  coreDocAttachmentTypeId: number;
  coreDocAttachmentTypeName: string;
  name: string;
  leadCaptureId: number;
  modifiedBy: string;
  status: string | null; // Allows for `null` or a string value
}
