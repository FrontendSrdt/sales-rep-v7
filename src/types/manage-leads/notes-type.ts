export interface LeadNotesType {
  coreDocAttachmentTypeName?: string;
  leadCaptureId?: number;
  leadNotesId?: number;
  note?: string;
  updatedAt?: string;
  updatedBy?: string;
  modifiedBy?: string;
  name?: string;
  path?: string;
  leadDocAttachmentDTO?: typeForDoc;
  leadDocAttachmentId?: number;
  coreDocAttachmentTypeId?: number;
}

interface typeForDoc {
  leadDocAttachmentId: number;
  leadNotesId: number;
  coreDocAttachmentTypeId: number;
  name: string;
  path: string;
}
