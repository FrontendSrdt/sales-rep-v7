import React, { useRef } from "react";
import { FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";
import store, { RootState } from "../../../store";
import { uiSliceAction } from "../../../store/ui/ui-slice";
interface propsType {
  children: React.ReactNode;
}
const CustomSideDrawer: React.FC<propsType> = ({ children }) => {
  const { isDrawerOpen } = useSelector((state: RootState) => state.ui);
  const refClose = useRef<HTMLDivElement | null>(null);
  const closeDrawer = () => {
    store.dispatch(uiSliceAction.onDrawrCloseHandler());
  };

  return (
    <>
      {isDrawerOpen && <div className="overlay bg-black bg-opacity-55  fixed top-0 left-0 w-full h-screen z-50"></div>}
      <div
        ref={refClose}
        className={`w-full   ${
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        }  tansition-all duration-700  md:max-w-[500px] lg:max-w-[900px]  bg-white shadow-md fixed top-0 left-auto right-0 min-h-screen z-[9999] h-full`}
      >
        <div className="flex relative ">
          {isDrawerOpen && (
            <div onClick={closeDrawer} className="absolute left-[-2.7rem] top-[1.4rem] cursor-pointer bg-[#272727] text-white rounded-[50%]  p-2">
              <FaTimes />
            </div>
          )}
        </div>
        <div>{children}</div>
      </div>
    </>
  );
};

export default CustomSideDrawer;
