import React from "react";
import TableHead from "../manage-leads/table/heads/TableHead";
import LoadingSpinner from "../../util/custom/ui/LoadingSpinner";
import { CustomDetailsTable } from "../../util/custom/leadsFormat/CustomDetailsTable";
import { ViewDeclineCasesColumn } from "./ViewDeclineCasesColumn";
import { RootState } from "../../store";
import { useSelector } from "react-redux";

interface LeadsDataType {
  dataForTable: any;
}

const ViewDeclineCasesTable: React.FC<LeadsDataType> = ({ dataForTable }) => {
  const { isLoading } = useSelector((state: RootState) => state.coreLeadWithDeclineOffer);

  return (
    <div>
      <div className="my-8 mx-3 sm:mx-5 px-3 py-3 sm:px-6 sm:py-6 shadow-md rounded-md bg-white">
        <div className="overflow-x-auto">
          {/* <SectionHead sectionHeadData={sectionHeadData} /> */}
          <div className="relative -mt-8 top-8 ">
            <TableHead />
          </div>
          <div className="overflow-x-auto  pt-10">
            <div className="w-full  __fliter_gradient">
              {/* <FilterHead applyFilters={applyFilters} resetFilters={resetFilters} formRef={formRef} /> */}
              <div className="w-full __fliter_gradient">
                {isLoading ? (
                  // <p className="px-3">Loading....</p>
                  <LoadingSpinner size={20} mainLoading={false} message="Fetching Leads!" centered={false} />
                ) : dataForTable && dataForTable.length > 0 ? (
                  <CustomDetailsTable columns={ViewDeclineCasesColumn} data={dataForTable} isMode="viewDecline" />
                ) : (
                  // <CustomTableSSR columns={ManageLeadsColumn} data={currentData} />
                  <p className="px-3">No data found!!</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDeclineCasesTable;
