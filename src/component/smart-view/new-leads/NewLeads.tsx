import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import Card from "../../../util/custom/ui/Card";
import CustomTabHeader from "../../../util/custom/smartView/CustomTabHeader";
import FilterContainer from "../../../util/custom/smartView/CustomFilterContainer";
import { FaCaretDown, FaCaretUp, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { NewLeadFilterData, NewLeadsData } from "../../../data/smart-view/new-leads/NewLeadsData";

function NewLeads() {
  const { isCardShow } = useSelector((state: RootState) => state.ui);
  return (
    <>
      <CustomTabHeader data={NewLeadsData} />
      <Card isCardShow={isCardShow}>
        <FilterContainer filterData={NewLeadFilterData} />
      </Card>
      {/* ================================Table Part============================= */}
      <div className="w-full overflow-x-auto">
        <table className="w-full bg-white mt-4">
          <thead>
            <tr className="__fliter_gradient">
              <th className="border p-2 text-left text-gray-500 text-[12px] text-nowrap w-[170px] min-w-[170px]  ">
                <div className="flex justify-between items-center">
                  <div>
                    <input type="checkbox" className="mr-3" name="" id="" />
                    Lead Name
                  </div>
                  <div className="text-gray-500">
                    <FaCaretUp className=" cursor-pointer " />
                    <FaCaretDown className=" cursor-pointer " />
                  </div>
                </div>
              </th>
              <th className="border p-2 text-left text-gray-500 text-[12px] text-nowrap w-[170px] min-w-[170px] ">Action</th>

              <th className="border p-2 text-left text-gray-500 text-[12px] text-nowrap w-[170px] min-w-[170px] ">
                <div className="flex justify-between items-center">
                  <div> Lead Score</div>
                  <div className="text-gray-500">
                    <FaCaretUp className=" cursor-pointer " />
                    <FaCaretDown className=" cursor-pointer " />
                  </div>
                </div>
              </th>
              <th className="border p-2 text-left text-gray-500 text-[12px] text-nowrap w-[170px] min-w-[170px] ">
                <div className="flex justify-between items-center">
                  <div> Lead Stage</div>
                  <div className="text-gray-500">
                    <FaCaretUp className=" cursor-pointer " />
                    <FaCaretDown className=" cursor-pointer " />
                  </div>
                </div>
              </th>
              <th className="border p-2 text-left text-gray-500 text-[12px] text-nowrap w-[170px] min-w-[170px] ">
                <div className="flex justify-between items-center">
                  <div>Lead Owner</div>
                  <div className="text-gray-500">
                    <FaCaretUp className=" cursor-pointer " />
                    <FaCaretDown className=" cursor-pointer " />
                  </div>
                </div>
              </th>
              <th className="border p-2 text-left text-gray-500 text-[12px] text-nowrap  ">
                <div className="flex justify-between items-center">
                  <div> Modified On</div>
                  <div className="text-gray-500">
                    <FaCaretUp className=" cursor-pointer " />
                    <FaCaretDown className=" cursor-pointer " />
                  </div>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={6} className="border p-2 text-center text-sm text-nowrap py-4">
                No records
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* =============================Pagination================================ */}
      <div className="sm:flex justify-between mt-3 sm:mt-5">
        <div className="flex items-center gap-x-2 text-[12px]">
          <div>
            <span>Items per page</span>
            <div className="select-container pl-2">
              <select className="__custom-select">
                <option defaultValue="">25</option>
                <option>50</option>
                <option>75</option>
                <option>100</option>
              </select>
              <i className="fas fa-chevron-down dropdown-icon text-[14px]"></i>
            </div>
          </div>
          <div className="border-l pl-2">
            <span>Showing 0-0 of items</span>
          </div>
        </div>
        <div className="text-[12px] flex gap-x-1 items-center mt-3 sm:mt-0">
          <div>
            <div className="select-container sm:pl-2  mr-2">
              <select className="__custom-select">
                <option defaultValue="">1</option>
                <option>5</option>
                <option>10</option>
                <option>15</option>
              </select>
              <i className="fas fa-chevron-down dropdown-icon text-[12px]"></i>
            </div>
            <span>of 1 page</span>
          </div>
          <div className="flex items-center gap-x-1">
            <span className="bg-gray-100 px-1 py-1 text-gray-500 border border-gray-200 cursor-pointer">
              <FaChevronLeft />
            </span>
            <span className="bg-gray-100 px-1 py-1 text-gray-500 border border-gray-200 cursor-pointer">
              <FaChevronRight />
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default NewLeads;
