import React, { useRef } from "react";
import { useSelector } from "react-redux";
import store, { RootState } from "../../store";
import { Link } from "react-router-dom";
import {
  onDashboardOpenHandlerForMobile,
  onLeadsOpenForMobileHandler,
  onMobileMenuCloseHandler,
  onMobileMenuOpenHandler,
} from "../../store/ui/ui-slice";

interface Type {
  dashboardItems: any;
  leadsItems: any;
}

const MobileView: React.FC<Type> = ({ dashboardItems, leadsItems }) => {
  const leadsRef: any = useRef("");

  const { isMobileMenu, isDashboardOpenForMobile, isLeadsOpenForMobile } = useSelector((state: RootState) => state.ui);

  return (
    <div>
      <div
        onClick={() => store.dispatch(onMobileMenuOpenHandler())}
        className={`absolute transition-all duration-100 top-[56px] h-screen z-[9999] md:w-0 ${
          isMobileMenu ? "w-full right-0" : "right-[0px] w-0 "
        } bg-[#000000b7] overflow-hidden`}
      ></div>
      <header
        className={`absolute transition-all duration-300 top-[56px] h-screen z-[9999] md:w-0 ${
          isMobileMenu ? "w-56 right-0" : "right-[0px] w-0 "
        } bg-white shadow-md overflow-hidden`}
      >
        <nav className={`flex flex-col w-full mt-[20px] transition-all duration-300 ${isMobileMenu ? "opacity-100" : "opacity-0"}`}>
          <div className="bg-[#d581a1] ml-5 mb-3 text-[#fad2e0] cursor-pointer w-[40px] h-[40px] rounded-full flex justify-center items-center">
            <i className="fas fa-user"></i>
          </div>
          <div className="relative">
            <span
              className="text-[#545454] font-medium w-full flex items-center justify-between gap-x-1 px-2 py-2 border-b border-gray-200"
              onClick={() => store.dispatch(onDashboardOpenHandlerForMobile())}
            >
              DASHBOARD
              <i
                className={`fa fa-chevron-down w-3 inline-block ${
                  isDashboardOpenForMobile
                    ? "transition-all duration-500 rotate-[180deg] relative mt-[2px]"
                    : "transition-all duration-500  rotate-[0deg] mt-[2px]"
                } `}
                aria-hidden="true"
              ></i>
            </span>

            <div className={`transition-all duration-800 overflow-hidden ${isDashboardOpenForMobile ? "max-h-[500px]" : "max-h-0"}`}>
              {dashboardItems.map((item: any, index: number) => (
                <a key={index} href={item.href} className="block text-sm px-3 py-1 text-gray-500 font-medium text-nowrap border-b border-gray-200">
                  {item.label}
                </a>
              ))}
            </div>
          </div>
          <div className="relative" ref={leadsRef}>
            <span
              className="text-[#545454] font-medium w-full flex items-center justify-between gap-x-1 px-2 py-2 border-b border-gray-200"
              onClick={() => store.dispatch(onLeadsOpenForMobileHandler())}
            >
              LEADS
              <i
                className={`fa fa-chevron-down w-3 inline-block ${
                  isLeadsOpenForMobile
                    ? "transition-all duration-500 rotate-[180deg] relative mt-[2px]"
                    : "transition-all duration-500 rotate-[0deg] mt-[2px]"
                } `}
                aria-hidden="true"
              ></i>
            </span>

            <div className={`transition-all duration-800 overflow-hidden ${isLeadsOpenForMobile ? "max-h-[500px]" : "max-h-0"}`}>
              {leadsItems.map((item: any, index: number) => (
                <Link
                  key={index}
                  onClick={() => {
                    store.dispatch(onMobileMenuCloseHandler());
                  }}
                  to={item.href}
                  className="block text-sm px-3 py-1 text-gray-500 font-medium text-nowrap border-b border-gray-200"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default MobileView;
