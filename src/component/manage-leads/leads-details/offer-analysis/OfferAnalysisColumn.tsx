import { Column } from "react-table";
import { extractDateTime } from "../../../../util/actions/extractDateAndTime";

export const OfferAnalysisColumn: Column<any>[] = [
  {
    Header: "Date",
    accessor: (row) => {
      const { dateFormatted, timeFormatted } = extractDateTime(row.createdAt);
      // console.log("date===", dateFormatted, timeFormatted);
      return `${dateFormatted} ${timeFormatted}`; // Preprocess for sorting/filtering
    },
    // accessor: "createdAt",
    Cell: ({ value }: { value: string }) => {
      const [dateFormatted, timeFormatted] = value.split(" "); // Split the combined string
      // console.log("timememememem===", dateFormatted);
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
    Header: "Status",
    accessor: "status",
    Cell: ({ row }: { row: { original: any } }) => <span>{row.original.status}</span>,
  },
  {
    Header: "Declined Reason",
    accessor: "declinedReason",
    Cell: ({ row }: { row: { original: any } }) => <span>{row.original.declinedReason !== null ? row.original.declinedReason : "N/A"}</span>,
  },
  {
    Header: "Scholarship Discount %",
    accessor: "discountPercentage",
    Cell: ({ row }: { row: { original: any } }) => <span>{row.original.discountPercentage}%</span>,
  },
  {
    Header: "Total Discount",
    accessor: "totalDiscount",
    Cell: ({ row }: { row: { original: any } }) => <span>{row.original.totalDiscount}</span>,
  },
  {
    Header: "Net Fee",
    accessor: "netFee",
    Cell: ({ row }: { row: { original: any } }) => <span>{row.original.netFee}</span>,
  },
  {
    Header: "Updated By",
    accessor: "updatedBy",
    Cell: ({ row }: { row: { original: any } }) => <span>{row.original.leadStageDescription}</span>,
  },
];
