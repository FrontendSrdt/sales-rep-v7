import { useSelector } from "react-redux";
import TableHead from "./heads/TableHead";
// import FilterHead from "./heads/FilterHead";
import SectionHead from "./heads/SectionHead";
import store, { RootState } from "../../../store";
import { ManageLeadsColumn } from "./ManageLeadsColumn";
import React, { useEffect, useState } from "react";
import { uiSliceAction } from "../../../store/ui/ui-slice";
import LoadingSpinner from "../../../util/custom/ui/LoadingSpinner";
import { sectionHeadData } from "../../../data/manage-leads/sectionHeadData";
// import { fetchFilterData } from "../../../store/lead-capturing/filter-data-slice";
import { getLeadStageValues } from "../../../store/lead-capturing/get-allLeadStage-slice";
import { getLeadSourceValues } from "../../../store/lead-capturing/get-allLeadSource-slice";
import { CustomDetailsTable } from "../../../util/custom/leadsFormat/CustomDetailsTable";

interface LeadsDataType {
  dataForTable: any;
}

const ManageLeadsTable: React.FC<LeadsDataType> = ({ dataForTable }) => {
  const { data } = dataForTable;
  // const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    store.dispatch(getLeadStageValues());
    store.dispatch(getLeadSourceValues());
  }, []);

  const { loading, filterData: filteredData } = useSelector((state: RootState) => state.filterLeadsData);

  const [currentData, setCurrentData] = useState(data);
  // @ts-ignore
  const [filtersApplied, setFiltersApplied] = useState(false);

  useEffect(() => {
    // Ensure that filtered data is applied after loading completes
    if (filtersApplied && !loading) {
      setCurrentData(filteredData);
      store.dispatch(uiSliceAction.onManageFilterDropdownHandler(true));
    } else if (!filtersApplied && !loading) {
      // Apply original data when no filters are applied
      setCurrentData(data);
    }
  }, [filteredData, filtersApplied, loading, data]);

  // const applyFilters = (filters: Record<string, any>) => {
  //   setFiltersApplied(true); // Set filtersApplied before dispatch
  //   store.dispatch(fetchFilterData(filters));
  // };

  // const resetFilters = () => {
  //   setCurrentData(data);
  //   setFiltersApplied(false);
  //   store.dispatch(uiSliceAction.onManageFilterDropdownHandler(false));
  //   store.dispatch(uiSliceAction.onSelectedDateRange(false));
  //   store.dispatch(uiSliceAction.onCustomDateChange(false));

  //   if (formRef.current) {
  //     formRef.current.reset();
  //   }
  // };

  return (
    <div>
      <div className="my-4 mx-3 sm:mx-5 px-3 py-3 sm:px-6 sm:py-6 shadow-md rounded-md bg-white">
        <div className="overflow-x-auto">
          <SectionHead sectionHeadData={sectionHeadData} />
          <div className="relative -mt-8 top-8 pb-5">
            <TableHead />
          </div>
          <div className="overflow-x-auto  pt-10">
            <div className="w-full  __fliter_gradient">
              {/* <FilterHead applyFilters={applyFilters} resetFilters={resetFilters} formRef={formRef} /> */}
              <div className="w-full __fliter_gradient">
                {loading ? (
                  // <p className="px-3">Loading....</p>
                  <LoadingSpinner size={20} mainLoading={false} message="Fetching Leads!" centered={false} />
                ) : currentData && currentData.length > 0 ? (
                  <CustomDetailsTable columns={ManageLeadsColumn} data={currentData} isMode="manageLeads" />
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

export default ManageLeadsTable;
