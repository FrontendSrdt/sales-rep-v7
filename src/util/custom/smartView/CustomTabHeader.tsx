import { FaListUl } from "react-icons/fa";
import { FaCalendarDays } from "react-icons/fa6";
import { RiArrowDropDownFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import store, { RootState } from "../../../store";
import CustomRefresh from "./CustomRefresh";
import { onToggleCardhandler } from "../../../store/ui/ui-slice";
import { useState } from "react";

const CustomTabHeader = ({ data, setListView = "", listView = "" }: any) => {
  const [seed, setSeed] = useState(1);
  const { heading, searchResult, filter, addButton, selectDropdown, flag = false } = data[0];
  const { filterCount } = useSelector((state: RootState) => state.ui);

  const handleRefresh = () => {
    setSeed(Math.random());
  };

  return (
    <div className="lg:flex justify-between items-end mt-3 sm:mt-5 w-full">
      {/* =========================Left Part================================ */}
      <div className="w-full">
        <div className="flex w-full gap-3 items-center flex-wrap">
          <div>
            <span className="text-base font-semibold">{heading}</span>
            <i className="fa fa-exclamation-circle text-gray-500 text-[12px] sm:text-sm ml-1" aria-hidden="true"></i>
          </div>
          <CustomRefresh key={seed} onRefresh={handleRefresh} />
        </div>
        <div className="w-full mt-3 sm:mt-5 flex flex-wrap items-center gap-2 sm:gap-3">
          <span className="bg-gray-100 text-[12px] sm:text-sm px-2 py-[6px] rounded-md text-nowrap sm:mb-2">{searchResult}</span>
          <label className="w-full flex max-w-[150px] sm:max-w-[200px]  justify-between items-center sm:mb-2   border border-gray-200 px-2 py-[3px]  rounded-md ">
            <input type="text" className="border-none max-w-[100px] focus:outline-none placeholder:text-[12px] placeholder:sm:text-sm" placeholder="Search Leads" />
            <i className="fa fa-search text-gray-400 cursor-pointer" aria-hidden="true"></i>
          </label>
          <button onClick={() => store.dispatch(onToggleCardhandler())} className="border text-[12px] sm:text-sm py-1 px-2 rounded font-medium  relative cursor-pointer sm:mb-2">
            {filter}
            <span className="  absolute top-[-6px] right-[-8px] w-4 h-4 rounded-full bg-green-700 text-white text-[10px] flex justify-center items-center ">
              {/* {filterNumber} */}
              {filterCount}
            </span>
          </button>
        </div>
      </div>
      {/* ==========================Right Part============================== */}
      <div className="flex w-full items-center justify-end gap-x-3 mt-3 sm:mt-5 lg:mt-0">
        {flag && (
          <div className="flex gap-x-2">
            <button
              onClick={() => setListView(true)}
              className={`border py-[7px] px-2 rounded  bg-gray-100  ${listView ? "text-blue-500 border-blue-500" : "text-gray-500"}  cursor-pointer text-[12px] sm:text-sm`}
            >
              <FaListUl />
            </button>
            <button
              onClick={() => setListView(false)}
              className={`border py-[7px] px-2 rounded  bg-gray-100  ${listView ? "text-gray-500  " : " text-blue-500 border-blue-500"}  cursor-pointer text-[12px] sm:text-sm`}
            >
              <FaCalendarDays />
            </button>
          </div>
        )}
        <button className="border py-[5px] px-2 sm:px-4 rounded  bg-blue-700 text-white cursor-pointer text-[12px] ">{addButton}</button>
        <div className="flex justify-center items-center gap-x-2">
          <div className="select-container">
            <select className="__custom-select">
              <option disabled>More Action</option>
              {selectDropdown.map((item: any) => (
                <option key={item.id} value={item.name}>
                  {item.name}
                </option>
              ))}
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
  );
};
export default CustomTabHeader;
