import React from "react";
import ManageLeadsTable from "./table/ManageLeadsTable";

interface LeadsType {
  data: any;
}
const ManageLeads: React.FC<LeadsType> = (data: any) => {
  return (
    <>
      <ManageLeadsTable dataForTable={data} />
    </>
  );
};

export default ManageLeads;
