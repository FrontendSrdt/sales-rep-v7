import { FaCaretDown, FaCaretUp, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { RiArrowDropDownFill } from "react-icons/ri";
import { TotallCallsData } from "../../data/smart-view/TotalCalls/TotallCalls";

function TotalCalls() {
  return (
    <>
      <div className="lg:flex justify-between items-end mt-3 sm:mt-5 w-full">
        {/* =========================Left Part================================ */}
        <div className="w-full">
          <div className="flex flex-wrap w-full gap-3 items-center">
            <div>
              <span className="text-base font-semibold">total call</span>
              <i className="fa fa-exclamation-circle text-gray-500 text-[12px] sm:text-sm ml-1" aria-hidden="true"></i>
            </div>
            <div className="flex items-center text-[12px] sm:text-sm bg-gray-100 gap-x-2 px-2   rounded">
              <div className="flex items-center py-1 ">
                <span className="w-3 h-3 bg-green-600 rounded-full block mr-2"></span> update just now
              </div>
              <div className="flex items-center gap-x-1 pl-2 py-1 border-l  cursor-pointer text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                  <path
                    fill="blue"
                    d="M12.079 2.25c-4.794 0-8.734 3.663-9.118 8.333H2a.75.75 0 0 0-.528 1.283l1.68 1.666a.75.75 0 0 0 1.056 0l1.68-1.666a.75.75 0 0 0-.528-1.283h-.893c.38-3.831 3.638-6.833 7.612-6.833a7.66 7.66 0 0 1 6.537 3.643a.75.75 0 1 0 1.277-.786A9.16 9.16 0 0 0 12.08 2.25m8.761 8.217a.75.75 0 0 0-1.054 0L18.1 12.133a.75.75 0 0 0 .527 1.284h.899c-.382 3.83-3.651 6.833-7.644 6.833a7.7 7.7 0 0 1-6.565-3.644a.75.75 0 1 0-1.277.788a9.2 9.2 0 0 0 7.842 4.356c4.808 0 8.765-3.66 9.15-8.333H22a.75.75 0 0 0 .527-1.284z"
                  />
                </svg>
                <span>refresh</span>
              </div>
            </div>
          </div>
          <div className="w-full mt-3 sm:mt-5 flex flex-wrap items-center gap-3">
            <span className="bg-gray-100 text-[12px]  px-2 py-[6px] rounded-md text-nowrap sm:mb-2">Search Result 116</span>
            <label className="w-full flex max-w-[150px]  justify-between items-center   border border-gray-200 px-2 py-[3px]  rounded-md ">
              <input type="text" className="border-none max-w-[100px] focus:outline-none placeholder:text-[12px]" placeholder="Search Leads" />
              <i className="fa fa-search text-gray-400 cursor-pointer" aria-hidden="true"></i>
            </label>
            <button className="border text-[12px]  py-1 px-2 rounded font-medium  relative cursor-pointer  sm:mb-2">
              Filters
              <span className="  absolute top-[-6px] right-[-8px] w-4 h-4 rounded-full bg-green-700 text-white text-[10px] flex justify-center items-center ">3</span>
            </button>
            <span className="text-[12px]  text-gray-500 text-nowrap cursor-pointer sm:mb-2">Clear Filters</span>
          </div>
        </div>
        {/* ==========================Right Part============================== */}
        <div className="flex w-full items-center justify-end gap-x-3 mt-3 sm:mt-5 lg:mt-0">
          <button className="border py-[5px] px-2 sm:px-4 rounded  bg-blue-700 text-white cursor-pointer text-[12px] ">Add had a pho...</button>
          <div className="flex justify-center items-center gap-x-2">
            <div className="select-container">
              <select className="__custom-select">
                <option defaultValue="">More Action</option>
                <option>New Lead</option>
                <option>Contacted</option>
                <option>Qualified</option>
              </select>
              {/* <i className="fas fa-chevron-down dropdown-icon text-[14px]"></i> */}
              <RiArrowDropDownFill size={20} className="dropdown-icon" />
            </div>
          </div>
          <span className="border-2 border-[#c9c9c9] text-gray-500 rounded px-2 py-[1px] flex items-center cursor-pointer">
            <i className="fa fa-cog text-sm" aria-hidden="true"></i>
          </span>
        </div>
      </div>
      {/* ================================Table Part============================= */}
      <div className="w-full overflow-x-auto">
        <table className="w-full bg-white mt-4 border border-gray-300">
          <thead>
            <tr className="__fliter_gradient">
              <th className="border p-2 text-left text-gray-500 text-[12px] text-nowrap w-[240px] min-w-[240px]  ">
                <div className="flex justify-between items-center">
                  <div>Lead Name</div>
                  <div className="text-gray-500">
                    <FaCaretUp className=" cursor-pointer " />
                    <FaCaretDown className=" cursor-pointer " />
                  </div>
                </div>
              </th>
              <th className="border p-2 text-left text-gray-500 text-[12px] text-nowrap w-[150px] min-w-[150px] ">Actions</th>

              <th className="border p-2 text-left text-gray-500 text-[12px] text-nowrap w-[190px] min-w-[190px] ">
                <div className="flex justify-between items-center">
                  <div>Notes</div>
                </div>
              </th>
              <th className="border p-2 text-left text-gray-500 text-[12px] text-nowrap w-[170px] min-w-[170px] ">
                <div className="flex justify-between items-center">
                  <div>Activity Date</div>
                  <div className="text-gray-500">
                    <FaCaretUp className=" cursor-pointer " />
                    <FaCaretDown className=" cursor-pointer " />
                  </div>
                </div>
              </th>
              <th className="border p-2 text-left text-gray-500 text-[12px] text-nowrap w-[170px] min-w-[170px] ">
                <div className="flex justify-between items-center">
                  <div>Owner</div>
                </div>
              </th>

              <th className="border p-2 text-left text-gray-500 text-[12px] text-nowrap  min-w-[200px]">
                <div className="flex justify-between items-center">
                  <div>Status</div>
                  <div className="text-gray-500">
                    <FaCaretUp className=" cursor-pointer " />
                    <FaCaretDown className=" cursor-pointer " />
                  </div>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {TotallCallsData.map((lead, index) => (
              <tr key={index} className="border-b border-gray-200">
                <td className="py-1 px-2 text-[12px] font-medium text-left text-blue-500">
                  <input type="checkbox" className="mr-2" />
                  {lead.name}
                </td>
                <td className="py-1 px-2 text-[12px] text-gray-600 font-medium text-left">
                  <i className="fas fa-pen mr-4 text-gray-400 cursor-pointer"></i>
                  <i className="fas fa-trash mr-4 text-gray-400 cursor-pointer"></i>
                  <i className="fas fa-ellipsis-h text-gray-400 cursor-pointer"></i>
                </td>
                <td className="py-1 px-2 text-[12px] text-gray-600 font-medium text-left">{lead.notes}</td>
                <td className="py-1 px-2 text-[12px] text-gray-600 font-medium text-left">{lead.date}</td>
                <td className="py-1 px-2 text-[12px] text-gray-600 font-medium text-left">{lead.owner}</td>
                <td className="py-1 px-2 text-[12px] text-gray-600 font-medium text-left">{lead.status}</td>
              </tr>
            ))}
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

export default TotalCalls;
