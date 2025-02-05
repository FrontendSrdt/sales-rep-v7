import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { DocumentDetailsColumn } from "./DocumentDetailsColumn";
import Search from "../../../../util/custom/customSearchPagination/Search";
import { CustomDetailsTable } from "../../../../util/custom/leadsFormat/CustomDetailsTable";
import Fallback from "../../../../util/custom/ui/Fallback";
import { emptyDataIcon } from "../../../../data/savgIcons";
import Pagination from "../../../../util/custom/customSearchPagination/Pagination";

const DocumentDetails: React.FC = () => {
  const { leadDocumentsById } = useSelector((state: RootState) => state.getDocumentsDataById);

  console.log("leadDocumentsById===================================================>", leadDocumentsById);
  if (Object.keys(leadDocumentsById).length === 0) {
    return <Fallback errorInfo="No Documents Found !!" icon={emptyDataIcon} />;
  }
  return (
    <>
      <div className=" px-3 pt-[9px] flex justify-between gap-10 items-center">
        <Search />
        <Pagination />
      </div>
      <div className="px-3 pt-[9px] pb-[12px] overflow-x-auto">
        <CustomDetailsTable columns={DocumentDetailsColumn} data={leadDocumentsById} isMode="documents" />
      </div>
    </>
  );
};

export default DocumentDetails;
