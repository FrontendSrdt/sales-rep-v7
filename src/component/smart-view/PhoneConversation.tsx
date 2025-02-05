import { FaCaretDown, FaCaretUp, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import {
  PhoneConversationData,
  PhoneConversationTableData,
  PhoneConversationTableEditData,
  PhoneConversationTableHeaders,
} from "../../data/smart-view/phone-conversation/PhoneConversationData";
import CustomTabHeader from "../../util/custom/smartView/CustomTabHeader";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { uiSliceAction } from "../../store/ui/ui-slice";
import { BsThreeDots } from "react-icons/bs";

import useClickOutside from "../../hooks/useClickOutside";
import { useRef, useState } from "react";
import SideDrawerForPhoneConversation from "./PhoneConversationSideDrawer";
import CustomSideDrawer from "../../util/custom/ui/CustomSideDrawer";
function PhoneConversation() {
  const dispatch = useDispatch();
  const { isDrawerOpen } = useSelector((state: RootState) => state.ui);
  const optRef = useRef<HTMLDivElement>(null);
  const { settingId } = useSelector((state: RootState) => state.ui);
  const [selectedData, setSelectedData] = useState<any>(null);
  const closeSettingHandler = () => {
    dispatch(uiSliceAction.onDisabledDropdownHandler());
  };

  useClickOutside([optRef], [closeSettingHandler]);

  const handleIconClick = (lead: any) => {
    // If the same icon is clicked again, close it

    if (settingId === lead.id) {
      dispatch(uiSliceAction.onDisabledDropdownHandler());
      setSelectedData(null);
    } else {
      // Otherwise, open the panel for the clicked icon
      dispatch(uiSliceAction.onDropDownOpenHandler(lead.id));
      setSelectedData(lead);
    }
  };
  const handleEditClick = () => {
    dispatch(uiSliceAction.onDrawrOpenHandler());
    closeSettingHandler();
  };

  console.log("selectedData::", selectedData);
  return (
    <>
      <CustomTabHeader data={PhoneConversationData} />
      {/* ================================Table Part============================= */}
      <div className="w-full overflow-x-auto">
        <table className="w-full bg-white mt-4 border border-gray-300">
          <thead>
            <tr className="__fliter_gradient">
              {PhoneConversationTableHeaders.map((header, index) => (
                <th key={index} className="border p-2 text-left text-gray-500 text-[12px] text-nowrap">
                  <div className="flex justify-between items-center">
                    {header.hasCheckbox ? (
                      <div>
                        <input type="checkbox" className="mr-3" />
                        {header.label}
                      </div>
                    ) : (
                      <div>{header.label}</div>
                    )}
                    <div className="text-gray-500">
                      <FaCaretUp className="cursor-pointer" />
                      <FaCaretDown className="cursor-pointer" />
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PhoneConversationTableData.map((lead, index) => (
              <tr key={index} className="border-b border-gray-300">
                <td className="py-1 px-2 text-[12px]  font-medium text-left text-blue-800">
                  <input type="checkbox" className="mr-3" name="" id="" /> {lead.leadName}
                </td>
                <td className="py-1 px-2 relative text-[12px] text-gray-600 font-medium text-left">
                  <BsThreeDots
                    onClick={() => {
                      handleIconClick(lead);
                    }}
                  />

                  {settingId === lead.id && (
                    <div ref={optRef} className="absolute top-[4px]  left-[3rem] bg-white shadow-md rounded-sm border border-gray-200 z-50 ">
                      {PhoneConversationTableEditData.map((item) => {
                        return (
                          <div key={item.id} className="py-1 border-b px-5">
                            {item.textName === "Edit" ? (
                              <div onClick={() => handleEditClick()}>
                                <button>{item.textName}</button>
                              </div>
                            ) : (
                              <div>
                                <button>{item.textName}</button>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </td>
                <td className="py-1 px-2 text-[12px] text-gray-600 font-medium text-left">{lead.notes}</td>
                <td className="py-1 px-2 text-[12px] text-gray-600 font-medium text-left">{lead.activityDateTime}</td>
                <td className="py-1 px-2 text-[12px] text-gray-600 font-medium text-left">{lead.owner}</td>
                <td className="py-1 px-2 text-[12px] text-gray-600 font-medium text-left">{lead.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isDrawerOpen && selectedData && (
        <CustomSideDrawer>
          <SideDrawerForPhoneConversation selectedData={selectedData} />
        </CustomSideDrawer>
      )}
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

export default PhoneConversation;
