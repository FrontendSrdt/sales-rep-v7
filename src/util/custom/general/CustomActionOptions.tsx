import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
import { uiSliceAction } from "../../../store/ui/ui-slice";
import useClickOutside from "../../../hooks/useClickOutside";
import { resetResponseForLeadPropertiesDataById } from "../../../store/view-leads-details/get-leadProperties-byLeadId-slice";

interface CustomActionType {
  leadId: number;
  options: any;
  pageFlag?: string; // route name
  isContent?: string;
  actionHandlers: { [key: string]: () => void };
}

const CustomActionOptions: React.FC<CustomActionType> = ({ pageFlag, leadId, isContent, options, actionHandlers }) => {
  const dispatch = useDispatch();
  const optRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { userDetails } = useSelector((state: RootState) => state.getLoggedInUserData);
  const { isLastThreeRows } = useSelector((state: RootState) => state.ui);

  const closeSettingHandler = () => {
    dispatch(uiSliceAction.onDisabledDropdownHandler());
  };

  useClickOutside([optRef], [closeSettingHandler]);

  // const onNavClickHandler = () => {
  //   closeSettingHandler();
  //   dispatch(resetResponseForLeadPropertiesDataById());
  // };

  const handleNavigation = (pageFlag: string | undefined, leadId: number) => {
    const path = `${pageFlag}${leadId}`;
    navigate(path, { state: { viaButton: true } });
    closeSettingHandler();
    dispatch(resetResponseForLeadPropertiesDataById());
  };

  return (
    <div
      ref={optRef}
      className={`absolute ${isContent === "ManageLead" ? "manage_icons" : ""} ${isLastThreeRows ? "bottom-[1.8rem] pb-1" : "top-[1.70rem] pt-1"
        } right-[7.33rem] bg-[#f3f4f5] border border-gray-400 z-[9999] ${isLastThreeRows
          ? "after:content['111'] after:w-[22px] after:h-1 after:bg-[#f3f4f5] after:absolute after:-bottom-0.5 after:right-0"
          : "after:content['111'] after:w-[22px] after:h-1 after:bg-[#f3f4f5] after:absolute after:-top-0.5 after:right-0"
        }`}
    >

      {options.map((item: any) => {
        // Exclude "Change Owner" only if the user does NOT have valid roles
        if (item.textName === "Change Owner" && !userDetails?.authority?.some((role: string) => role === "ROLE_ADMIN" || role === "ROLE_AUTHORITY" || role === "ROLE_MANAGER")) {
          return null; // Exclude "Change Owner"
        }

        return (
          <div key={item.id} className="cursor-pointer">
            {item.textName === "View" ? (
              <div onClick={() => handleNavigation(pageFlag, leadId)} className="text-[12px] w-full block hover:bg-blue-500 hover:text-white px-1">
                {item.textName}
              </div>
            ) : (
              <div onClick={actionHandlers[item.action]} className="px-1 text-[12px] w-full hover:bg-blue-500 hover:text-white">
                <button>{item.textName}</button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CustomActionOptions;