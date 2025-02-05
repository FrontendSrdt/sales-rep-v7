import { Column } from "react-table";
import { declineLeadCases } from "../../types/view-decline-cases-type";
import { extractDateTime } from "../../util/actions/extractDateAndTime";
import { capitalizeName } from "../manage-leads/genral/CapitalizeName";
import { Link } from "react-router-dom";
import { FaRegEye } from "react-icons/fa6";


export const ViewDeclineCasesColumn: Column<declineLeadCases>[] = [
  // {
  //   Header: "Lead Capture Id",
  //   accessor: "leadCaptureId",
  //   Cell: ({ row }: { row: { original: declineLeadCases } }) => <span>{row.original.leadCaptureId}</span>,
  // },
  {
    Header: "Lead Name",
    accessor: "name", // Preprocess data for both search and display
    Cell: ({ row }: { row: { original: declineLeadCases } }) => <span>{row.original.name}</span>,
  },
  {
    Header: "Email",
    accessor: "email",
    Cell: ({ row }: { row: { original: declineLeadCases } }) => <span>{row.original.email}</span>,
  },
  {
    Header: "Phone",
    accessor: "phone",
    Cell: ({ row }: { row: { original: declineLeadCases } }) => <span>{row.original.phone}</span>,
  },
  {
    Header: "Academic Career",
    accessor: "careerName",
    Cell: ({ row }: { row: { original: declineLeadCases } }) => <span>{row.original.careerName}</span>,
  },
  {
    Header: "Academic Program",
    accessor: "programName",
    Cell: ({ row }: { row: { original: declineLeadCases } }) => <span>{row.original.programName}</span>,
  },
  {
    Header: "Lead Sub Stage",
    accessor: "leadSubStageDescription",
    Cell: ({ row }: { row: { original: declineLeadCases } }) => <span>{row.original.leadSubStageDescription}</span>,
  },
  {
    Header: "Modified On",
    accessor: (row) => {
      const { dateFormatted, timeFormatted } = extractDateTime(row.modifiedOn);
      return `${dateFormatted} ${timeFormatted}`; // Preprocess for sorting/filtering
    },
    Cell: ({ value }: { value: string }) => {
      const [dateFormatted, timeFormatted] = value.split(" "); // Split the combined string
      return (
        <div style={{ display: "flex", gap: "10px" }}>
          <span>{dateFormatted}</span>
          <br />
          <span>{timeFormatted}</span>
        </div>
      );
    },
  },
  {
    Header:"Created At",
    accessor: (row) => {
      const { dateFormatted, timeFormatted } = extractDateTime(row.createdAt);
      return `${dateFormatted} ${timeFormatted}`; // Preprocess for sorting/filtering
    },
    Cell: ({ value }: { value: string }) => {
      const [dateFormatted, timeFormatted] = value.split(" "); // Split the combined string
      return (
        <div style={{ display: "flex", gap: "10px" }}>
          <span>{dateFormatted}</span>
          <br />
          <span>{timeFormatted}</span>
        </div>
      );
    },
  },
  {
    Header: "Lead Source",
    accessor: (row) => capitalizeName(row.leadSourceName),
    Cell: ({ value }: { value: string }) => <span>{value}</span>,
  },
  {
    Header: "Lead Owner",
    accessor: (row) => capitalizeName(row.leadOwner),
    Cell: ({ value }: { value: string }) => <span>{value}</span>,
  },
  {
    Header: "Status",
    accessor: (row) => capitalizeName(row.status),
    Cell: ({ value }: { value: string }) => <span>{value}</span>,
  },
  {
    Header: "Action",
    Cell: ({ row }: { row: { original: declineLeadCases } }) => (
      <Link to={`/view-decline-cases/manage-contract/${row.original.leadCaptureId}`}>
        <span className="cursor-pointer">
          <FaRegEye />
        </span>
      </Link>
    ),
  },
];
