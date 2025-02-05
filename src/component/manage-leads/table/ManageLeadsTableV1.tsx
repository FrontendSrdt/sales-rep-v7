import TableHead from "./heads/TableHead";
// import FilterHead from "./heads/FilterHead";
import SectionHead from "./heads/SectionHead";
import store from "../../../store";
import React, { useEffect } from "react";
import { sectionHeadData } from "../../../data/manage-leads/sectionHeadData";
// import { fetchFilterData } from "../../../store/lead-capturing/filter-data-slice";
import { getLeadStageValues } from "../../../store/lead-capturing/get-allLeadStage-slice";
import { getLeadSourceValues } from "../../../store/lead-capturing/get-allLeadSource-slice";
import { filterInputData } from "../../../data/manage-leads/filter-head-data";
import FilterHeadV1 from "./heads/FilterHeadV1";
import ViewFilterLeadsData from "../ViewFilterLeadsData";
import { getApplicationStatusValues } from "../../../store/lead-capturing/get-allApplicationStatus-slice";
import { getOwnerValues } from "../../../store/lead-capturing/get-allOwner-slice";

const ManageLeadsTableV1: React.FC = () => {
  useEffect(() => {
    store.dispatch(getLeadStageValues());
    store.dispatch(getLeadSourceValues());
    store.dispatch(getApplicationStatusValues());
    store.dispatch(getOwnerValues());
  }, [store.dispatch]);

  return (
    <div>
      <div className="my-4 mx-3 sm:mx-5 px-3 py-3 sm:px-6 sm:py-6 shadow-md rounded-md bg-white">
        <div className="overflow-x-auto">
          <SectionHead sectionHeadData={sectionHeadData} />
          <div className="relative -mt-8 top-8 ">
            <TableHead />
          </div>
          <div className="overflow-x-auto  pt-10">
            <div className="w-full  __fliter_gradient">
              <FilterHeadV1 inputData={filterInputData} />
              <ViewFilterLeadsData />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageLeadsTableV1;
