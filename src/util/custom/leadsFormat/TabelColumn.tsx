import { Column } from "react-table";

export const leadsColumns: Column<any>[] = [
  //   {
  //     Header: "Sr. No",
  //     Cell: ({ row }: { row: { index: number } }) => <span>{row.index + 1}</span>,
  //   },
  {
    Header: "Lead Name",
    accessor: "name",
    Cell: ({ row }: { row: { original: any } }) => {
      return (
        <>
          <input className="relative top-[2px] mr-1  " type="checkbox" />
          <i className="fa fa-star text-[#c9c9c9] text-sm mr-1" aria-hidden="true"></i>
          <i className="fa fa-circle text-sm mr-1 text-[#c9c9c9]" aria-hidden="true"></i> {row.original.name}
        </>
      );
    },
  },
  {
    Header: "Lead Score",
    accessor: "score",
    Cell: ({ row }: { row: { original: any } }) => <span>{row.original.score}</span>,
  },
  {
    Header: "Lead Stage",
    accessor: "stage",
    Cell: ({ row }: { row: { original: any } }) => <span>{row.original.stage}</span>,
  },
  {
    Header: "Owner",
    accessor: "owner",
    Cell: ({ row }: { row: { original: any } }) => <span>{row.original.owner}</span>,
  },
  {
    Header: "Modified On",
    accessor: "modified",
    Cell: ({ row }: { row: { original: any } }) => <span>{row.original.modified}</span>,
  },
  {
    Header: "Lead Source",
    accessor: "source",
    Cell: ({ row }: { row: { original: any } }) => <span>{row.original.source}</span>,
  },
  {
    Header: "OTP Amount",
    accessor: "",
    Cell: () => <span></span>,
  },
  {
    Header: "Roll No",
    accessor: "",
    Cell: () => <span></span>,
  },
  {
    Header: "Action",
    accessor: "",
    Cell: () => (
      <span>
        <i className="fas fa-cog text-gray-500"></i>
      </span>
    ),
  },
];
