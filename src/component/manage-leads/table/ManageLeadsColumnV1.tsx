import { Column } from "react-table";
import ActionOptions from "../genral/ActionOption";
import { ManageLeadV1Type } from "../../../types/manage-leads/manage-leads-type";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

export const getManageLeadsColumnV1 = () => {
  const selectedColumnToDisplay = useSelector((state: RootState) => state.ui.selectedColumnToDisplay);

  let columns: Column<ManageLeadV1Type>[] = [];

  selectedColumnToDisplay.forEach((item: any) => {
    const label = item.label;
    const ColumnName: keyof ManageLeadV1Type = item.name;

    columns.push({
      Header: label,
      accessor: ColumnName,
      Cell: ({ row }: { row: { original: ManageLeadV1Type } }) => (
        <span>{ColumnName === "application_status_name" ? row.original[ColumnName] || "Pending" : row.original[ColumnName]}</span>
      ),
    });
  });

  columns.push({
    Header: "Action",
    Cell: ({ row }: { row: { original: ManageLeadV1Type; index: number } }) => {
      return <ActionOptions pageFlag="details/" rowIndex={row.index} leadId={row.original.lead_capture_id} leadNum={row.original.phone} />;
    },
  });

  return columns;
};
