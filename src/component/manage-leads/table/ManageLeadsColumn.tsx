import { Column } from "react-table";
import ActionOptions from "../genral/ActionOption";
import { ManageLeadType } from "../../../types/manage-leads/manage-leads-type";
import { extractDateTime } from "../../../util/actions/extractDateAndTime";

export const ManageLeadsColumn: Column<ManageLeadType>[] = [

  {
    Header: "Lead Name",
    accessor: (row) => row.name, // Preprocess data for both search and display
    Cell: ({ value }: { value: string }) => (
      <>
        {value}
      </>
    ),
  },
  {
    Header: "Email",
    accessor: "email",
    Cell: ({ row }: { row: { original: ManageLeadType } }) => <span>{row.original.email}</span>,
  },
  {
    Header: "Phone",
    accessor: "phone",
    Cell: ({ row }: { row: { original: ManageLeadType } }) => <span>{row.original.phone}</span>,
  },
  {
    Header: "Academic Career",
    accessor: "careerName",
    Cell: ({ row }: { row: { original: ManageLeadType } }) => <span>{row.original.careerName}</span>,
  },
  {
    Header: "Academic Program",
    accessor: "programName",
    Cell: ({ row }: { row: { original: ManageLeadType } }) => <span>{row.original.programName}</span>,
  },
  {
    Header: "Lead Stage",
    accessor: "leadStageName",
    Cell: ({ row }: { row: { original: ManageLeadType } }) => <span>{row.original.leadStageDescription}</span>,
  },
  {
    Header: "Lead Sub Stage",
    accessor: "leadSubStageDescription",
    Cell: ({ row }: { row: { original: ManageLeadType } }) => <span>{row.original.leadSubStageDescription}</span>,
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
      console.log("dateFormattedinaccessorrrrr",dateFormatted ,timeFormatted)

      return `${dateFormatted} ${timeFormatted}`; // Preprocess for sorting/filtering
    },
    Cell: ({ value }: { value: string }) => {
      const [dateFormatted, timeFormatted] = value.split(" "); // Split the combined string
      console.log("dateFormatted",dateFormatted ,timeFormatted)
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
    accessor: (row) => row.leadSourceName,
    Cell: ({ value }: { value: string }) => <span>{value}</span>,
  },
  {
    Header: "Action",
    Cell: ({ row }: { row: { original: ManageLeadType; index: number } }) => {
      return (
        <ActionOptions
          pageFlag="details/"
          rowIndex={row.index}
          leadId={row.original.leadCaptureId}
          leadNum={row.original.phone}
          leadStageId={row.original.coreLeadStageId}
        />
      );
    },
  },
];
