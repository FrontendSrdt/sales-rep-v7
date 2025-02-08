import { Column } from "react-table";
 
export const TableColumn: Column<any>[] = [
  {
    Header: "Lead Id",
    accessor: "leadCaptureId",
    Cell: ({ row }: { row: { original: any } }) => <span>{row.original.leadCaptureId} </span>
  },
  {
    Header: "Name",
    accessor: "name",
    Cell: ({ row }: { row: { original: any } }) => <span>{row.original.name}</span>,
  },
  {
    Header: "Email",
    accessor: "email",
    Cell: ({ row }: { row: { original: any } }) => <span>{row.original.email}</span>,
  },
  {
    Header: "Phone",
    accessor: "phone",
    Cell: ({ row }: { row: { original: any } }) => <span>{row.original.phone}</span>,
  },
 
];