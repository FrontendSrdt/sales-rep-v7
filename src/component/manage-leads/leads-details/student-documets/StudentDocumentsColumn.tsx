import { Column } from "react-table";
import { StudentDocsType } from "../../../../types/manage-leads/student-docs-type";
import { BiDownload } from "react-icons/bi";
import store from "../../../../store";
import { downloadDocForNotes } from "../../../../store/task/download-doc-slice";
import VerifyAndRejectButton from "./VerifyAndRejectButton";

export const StudentDocumentsColumn: Column<StudentDocsType>[] = [
  {
    Header: "S. No.", // Serial Number Column Header
    Cell: ({ row }: { row: { index: number } }) => {
      return <span>{row.index + 1}</span>; // Adding 1 since index starts at 0
    },
  },
  {
    Header: "Attached to",
    accessor: (row: StudentDocsType) => row.coreDocAttachmentTypeName,
    Cell: ({ row }: { row: { original: StudentDocsType } }) => {
      // console.log(row.original.leadDocAttachmentDTO);
      return <span>{row.original.coreDocAttachmentTypeName}</span>;
    },
  },
  {
    Header: "Download Docs",
    Cell: ({ row }: { row: { original: StudentDocsType } }) => {
      const handleDownload = (docName: string, leadCaptureId: number, docTypeId: number | undefined) => {
        console.log("docName, leadCaptureId: , docTypeId:", docName, leadCaptureId, docTypeId);
        store.dispatch(downloadDocForNotes({ leadCaptureId, docName, docTypeId }));
      };

      return (
        <span className="cursor-pointer " onClick={() => handleDownload(row.original.name, row.original.leadCaptureId, row.original.coreDocAttachmentTypeId)}>
          <BiDownload size={22} />
        </span>
      );
    },
  },
  {
    Header: "Actions",
    Cell: ({ row }: { row: { original: StudentDocsType } }) => {
      return <VerifyAndRejectButton row={row} />;
    },
  },
];
