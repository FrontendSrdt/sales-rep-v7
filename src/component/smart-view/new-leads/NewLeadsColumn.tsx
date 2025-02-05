import { Column } from "react-table";
import { formatDate } from "../../../util/helper";

export const NewLeadsColumn: Column<any>[] = [
  {
    Header: "Lead Name",
    accessor: "name",
    Cell: ({ row }: { row: { original: any } }) => {
      return (
        <>
          <input className="relative top-[2px] mr-1  " type="checkbox" />
          {row.original.name}
        </>
      );
    },
  },
  {
    Header: "Action",
    // Cell: ({ row }: { row: { original: any } }) => <span></span>,
  },

  {
    Header: "Lead Score",
    accessor: "leadScoreName",
    Cell: ({ row }: { row: { original: any } }) => <span>{row.original.leadScoreName}</span>,
  },

  {
    Header: "Lead Stage",
    accessor: "leadStageName",
    Cell: ({ row }: { row: { original: any } }) => <span>{row.original.leadStageName}</span>,
  },
  {
    Header: "Lead Owner",
    accessor: "leadOwner",
    Cell: ({ row }: { row: { original: any } }) => <span>{row.original.leadOwner}</span>,
  },
  {
    Header: "Modified On",
    accessor: "modifiedOn",
    Cell: ({ row }: { row: { original: any } }) => <span>{formatDate(row.original.modifiedOn)}</span>,
  },
];
