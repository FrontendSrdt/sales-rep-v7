import { CiStar } from "react-icons/ci";
import { FaCaretDown, FaCaretUp, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { leads } from "../../data/smart-view/UntouchedLeads/UntouchedLeadsData";
import CustomTabHeader from "../../util/custom/smartView/CustomTabHeader";
import { UntouchedLeadsHeaderData } from "../../data/smart-view/UntouchedLeads/UntouchedLeadsHeaderData";

function UntouchedLeads() {
  return (
    <>
      {/* UntouchedLeadsHeaderData */}
      <CustomTabHeader data={UntouchedLeadsHeaderData} />
      {/* ================================Table Part============================= */}
      <div className="w-full overflow-x-auto">
        <table className="w-full bg-white mt-4 border border-gray-300">
          <thead>
            <tr className="__fliter_gradient">
              <th className="border p-2 text-left text-gray-500 text-[12px] text-nowrap w-[240px] min-w-[240px]  ">
                <div className="flex justify-between items-center">
                  <div>
                    <input type="checkbox" className="mr-3" /> Lead Name
                  </div>
                  <div className="text-gray-500">
                    <FaCaretUp className=" cursor-pointer " />
                    <FaCaretDown className=" cursor-pointer " />
                  </div>
                </div>
              </th>
              <th className="border p-2 text-left text-gray-500 text-[12px] text-nowrap w-[150px] min-w-[150px] ">Action</th>

              <th className="border p-2 text-left text-gray-500 text-[12px] text-nowrap w-[190px] min-w-[190px] ">
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
            {leads.map((lead, index) => (
              <tr key={index} className="border-b border-gray-200">
                <td className="py-1 px-2 text-sm text-left text-blue-800">
                  <div className="flex items-center">
                    <input type="checkbox" className="mr-3" name="" id="" />
                    <span className="text-gray-500 mr-1">
                      <CiStar size={20} />
                    </span>
                    {lead.name}
                  </div>
                </td>
                <td className="py-1 px-2 text-[12px] text-gray-600 font-medium text-left">{lead.actions}</td>
                <td className="py-1 px-2 text-[12px] text-gray-600 font-medium text-left">{lead.score}</td>
                <td className="py-1 px-2 text-[12px] text-gray-600 font-medium text-left">{lead.stage}</td>
                <td className="py-1 px-2 text-[12px] text-gray-600 font-medium text-left">{lead.owner}</td>
                <td className="py-1 px-2 text-[12px] text-gray-600 font-medium text-left">{lead.modified}</td>
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

export default UntouchedLeads;
