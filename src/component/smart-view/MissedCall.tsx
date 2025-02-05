import { FaCaretDown, FaCaretUp, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import CustomTabHeader from "../../util/custom/smartView/CustomTabHeader";
import { MissedCallHeaderData } from "../../data/smart-view/missed-call/MissedCallHeaderData";

function MissedCall() {
  return (
    <>
      <CustomTabHeader data={MissedCallHeaderData} />
      {/* ================================Table Part============================= */}
      <div className="w-full overflow-x-auto">
        <table className="w-full bg-white mt-4">
          <thead>
            <tr className="__fliter_gradient">
              <th className="border p-2 text-left text-gray-500 text-[12px] text-nowrap w-[170px] min-w-[170px]  ">
                <div className="flex justify-between items-center">
                  <div>Lead Name</div>
                </div>
              </th>
              <th className="border p-2 text-left text-gray-500 text-[12px] text-nowrap w-[170px] min-w-[170px] ">Action</th>

              <th className="border p-2 text-left text-gray-500 text-[12px] text-nowrap w-[170px] min-w-[170px] ">
                <div className="flex justify-between items-center">
                  <div> Start time</div>
                  <div className="text-gray-500">
                    <FaCaretUp className=" cursor-pointer " />
                    <FaCaretDown className=" cursor-pointer " />
                  </div>
                </div>
              </th>
              <th className="border p-2 text-left text-gray-500 text-[12px] text-nowrap w-[170px] min-w-[170px] ">
                <div className="flex justify-between items-center">
                  <div> Status</div>
                  <div className="text-gray-500">
                    <FaCaretUp className=" cursor-pointer " />
                    <FaCaretDown className=" cursor-pointer " />
                  </div>
                </div>
              </th>
              <th className="border p-2 text-left text-gray-500 text-[12px] text-nowrap w-[170px] min-w-[170px] ">
                <div className="flex justify-between items-center">
                  <div>Call Duration</div>
                  <div className="text-gray-500">
                    <FaCaretUp className=" cursor-pointer " />
                    <FaCaretDown className=" cursor-pointer " />
                  </div>
                </div>
              </th>
              <th className="border p-2 text-left text-gray-500 text-[12px] text-nowrap  w-[170px] min-w-[170px] ">
                <div className="flex justify-between items-center">
                  <div> Call Recording URL</div>
                </div>
              </th>
              <th className="border p-2 text-left text-gray-500 text-[12px] text-nowrap">
                <div className="flex justify-between items-center">
                  <div> Owner</div>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={7} className="border p-2 text-center text-sm text-nowrap py-4">
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

export default MissedCall;
