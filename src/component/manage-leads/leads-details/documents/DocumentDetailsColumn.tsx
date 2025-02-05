import { Column } from "react-table";
import { LeadNotesType } from "../../../../types/manage-leads/notes-type";

export const DocumentDetailsColumn: Column<LeadNotesType>[] = [
  {
    Header: "Name",
    accessor: (row: LeadNotesType) => row.name,
    Cell: ({ row }: { row: { original: LeadNotesType } }) => {
      return <span>{row.original.name !== null ? row.original.name : "N/A"}</span>;
    },
  },
  {
    Header: "Attached to",
    accessor: (row: LeadNotesType) => row.coreDocAttachmentTypeName,
    Cell: ({ row }: { row: { original: LeadNotesType } }) => {
      // console.log(row.original.leadDocAttachmentDTO);
      return <span>{row.original.coreDocAttachmentTypeName}</span>;
    },
  },
  // {
  //   Header: "Modified On",
  //   accessor: "updatedAt",
  //   Cell: ({ row }: { row: { original: LeadNotesType } }) => <span>{formatDate(row.original.updatedAt)}</span>,
  // },
  {
    Header: "Created By",
    accessor: "modifiedBy",
    Cell: ({ row }: { row: { original: LeadNotesType } }) => <span>{row.original.modifiedBy}</span>,
  },
];
