import React, { useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import store, { RootState } from "../../store";
import { useSelector } from "react-redux";

import useClickOutside from "../../hooks/useClickOutside";
import useForLocation from "../../hooks/useForLocation";
import extractFirstName from "../../util/actions/extractFirstName";

import {
  onDashboardCloseHandler,
  onDashboardOpenHandler,
  onLeadsCloseHandler,
  onLeadsOpenHandler,
  onMobileMenuOpenHandler,
  onProfileCloseHandler,
  onToggleProfileHandler,
} from "../../store/ui/ui-slice";
import { RiSettings5Fill } from "react-icons/ri";
import { logoutUser, resetAuth } from "../../store/auth/auth-Slice";

interface Type {
  dashboardItems: any;
  leadsItems: any;
  profileItems: any;
}

const DesktopView: React.FC<Type> = ({ dashboardItems, leadsItems, profileItems }) => {
  const navigate = useNavigate();
  const desktopRef: any = useRef();
  const dispatch = store.dispatch;

  const { userDetails } = useSelector((state: RootState) => state.getLoggedInUserData);
  // console.log("isLoading= ", isLoading);
  const { email } = userDetails;

  const closeLeadsHandler = () => dispatch(onLeadsCloseHandler());
  const closeDashboardHandler = () => dispatch(onDashboardCloseHandler());
  const closeProfileHandler = () => dispatch(onProfileCloseHandler());

  useClickOutside([desktopRef], [closeLeadsHandler, closeDashboardHandler, closeProfileHandler]);

  const { isDashboardOpen, isLeadsOpen } = useSelector((state: RootState) => state.ui);

  const { isProfileOpen } = useSelector((state: RootState) => state.ui);

  const { currentURL } = useForLocation();

  const handleProfileDropdown = (label: string) => {
    dispatch(onProfileCloseHandler());
    if (label === "Log out") {
      dispatch(onProfileCloseHandler());
      dispatch(logoutUser({ email, navigate }));
      dispatch(resetAuth());
    }
  };

  return (
    <header className="__header_gradient py-2 px-3 sm:px-6 flex justify-between items-center " ref={desktopRef}>
      <Link
        to={"/"}
        onClick={() => {
          closeLeadsHandler();
          closeDashboardHandler();
          closeProfileHandler();
        }}
      >
        <img src="/logo.png" alt="Company Logo" className="h-10" />
      </Link>
      <div className="flex gap-x-7 items-center">
        <nav className="hidden md:flex gap-x-7">
          <div className="relative">
            <span
              className={`text-[#545454] font-medium flex items-center gap-x-1 cursor-pointer
              }`}
              onClick={() => store.dispatch(onDashboardOpenHandler(), store.dispatch(onLeadsCloseHandler()), store.dispatch(onProfileCloseHandler()))}
            >
              <span>Dashboard</span>
              <i
                className={`fa fa-chevron-down w-3 inline-block ${
                  isDashboardOpen ? "transition-all duration-500 rotate-[180deg] relative mt-[2px]" : "transition-all duration-500 rotate-[0deg] mt-[2px]"
                } `}
                aria-hidden="true"
              ></i>
            </span>
            {isDashboardOpen && (
              <div className="absolute left-[-50p] top-[42px] z-50 min-w-[140px] bg-blue-100 border border-gray-200 shadow-lg">
                {dashboardItems.map((item: any, index: number) => (
                  // <NavLink
                  //   key={index}
                  //   // to={item.href}
                  //   className={({ isActive }) => `block text-sm px-4 py-2 text-gray-700 font-medium text-nowrap ${isActive ? "underline underline-offset-2" : ""} ${index % 2 === 0 ? "bg-gray-100 hover:bg-white" : "bg-blue-100 hover:bg-white"}`}                 >
                  //   {item.label}
                  // </NavLink>
                  <span
                    className={`block text-sm px-4 py-2 text-gray-700 font-medium text-nowrap cursor-pointer  ${
                      index % 2 === 0 ? "bg-gray-100 hover:bg-white" : "bg-blue-100 hover:bg-white"
                    }`}
                  >
                    {item.label}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className="relative">
            <div
              className={`text-[#545454] font-medium flex items-center gap-x-1 cursor-pointer
              }`}
              onClick={() => store.dispatch(onLeadsOpenHandler(), store.dispatch(onDashboardCloseHandler()), store.dispatch(onProfileCloseHandler()))}
            >
              <span className={leadsItems.some((item: any) => item.href === currentURL) ? "underline underline-offset-2" : ""}>LEADS</span>
              <i
                className={`fa fa-chevron-down w-3 inline-block ${
                  isLeadsOpen ? "transition-all duration-500 rotate-[180deg] relative mt-[2px]" : "transition-all duration-500 rotate-[0deg] mt-[2px]"
                } `}
                aria-hidden="true"
              ></i>
            </div>
            {isLeadsOpen && (
              <div className="absolute left-[-50p] top-[42px] z-50 min-w-[140px] bg-blue-100 border border-gray-200 shadow-lg rounded">
                {leadsItems.slice(0, 2).map((item: any, index: number) => (
                  <NavLink
                    to={item.href}
                    key={index}
                    onClick={() => store.dispatch(onLeadsCloseHandler())}
                    className={({ isActive }) =>
                      `block text-sm px-4 py-2 text-gray-700 font-medium border-b text-nowrap cursor-pointer ${isActive ? "underline underline-offset-2" : ""} ${
                        index % 2 === 0 ? "bg-gray-100 hover:bg-white" : "bg-gray-100 hover:bg-white"
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
                {userDetails?.authority?.includes("ROLE_AUTHORITY") &&
                  leadsItems.slice(2, 3).map((item: any, index: number) => (
                    <NavLink
                      to={item.href}
                      key={index}
                      onClick={() => store.dispatch(onLeadsCloseHandler())}
                      className={({ isActive }) =>
                        `block text-sm px-4 py-2 text-gray-700 font-medium border-b text-nowrap cursor-pointer ${isActive ? "underline underline-offset-2" : ""} ${
                          index % 2 === 0 ? "bg-gray-100 hover:bg-white" : "bg-gray-100 hover:bg-white"
                        }`
                      }
                    >
                      {item.label}
                    </NavLink>
                  ))}
              </div>
            )}
          </div>
        </nav>
        <div className="flex gap-x-2 sm:gap-x-7 items-center">
          {/* Conditionally render settings icon if user has ROLE_ADMIN */}
          {userDetails?.authority?.includes("ROLE_ADMIN") && (
            <Link to={"http://10.8.20.38:4176/"}>
              <RiSettings5Fill className="text-[1.3em] sm:text-[1.5em]" />
            </Link>
          )}
          {/* <IoHelpCircle className="text-[1.5em] sm:text-[1.7em]" /> */}
          {/* <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 1024 1024">
            <path
              fill="#374151"
              d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448s448-200.6 448-448S759.4 64 512 64m0 708c-22.1 0-40-17.9-40-40s17.9-40 40-40s40 17.9 40 40s-17.9 40-40 40m62.9-219.5a48.3 48.3 0 0 0-30.9 44.8V620c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8v-21.5c0-23.1 6.7-45.9 19.9-64.9c12.9-18.6 30.9-32.8 52.1-40.9c34-13.1 56-41.6 56-72.7c0-44.1-43.1-80-96-80s-96 35.9-96 80v7.6c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V420c0-39.3 17.2-76 48.4-103.3C430.4 290.4 470 276 512 276s81.6 14.5 111.6 40.7C654.8 344 672 380.7 672 420c0 57.8-38.1 109.8-97.1 132.5"
            />
          </svg> */}
          <span className={` text-sm sm:text-base ${Object.keys(userDetails).length !== 0 ? "" : ""} text-[#545454] font-medium`}>
            {Object.keys(userDetails).length !== 0 ? " Welcome " + extractFirstName(userDetails.fullName) : "loading..."}
          </span>
          <div
            className="bg-[#d581a1] relative cursor-pointer text-[#fad2e0] w-[30px] h-[30px] rounded-full justify-center items-center hidden md:flex"
            onClick={() => dispatch(onToggleProfileHandler(), dispatch(onDashboardCloseHandler()), dispatch(onLeadsCloseHandler()))}
          >
            <i className="fas fa-user"></i>
            {isProfileOpen && (
              <div className="absolute top-[45px] -right-4 z-50 min-w-[140px] bg-blue-100 border border-gray-200 shadow-lg rounded">
                {profileItems.map((item: any, index: number) => (
                  <Link
                    to={item.href}
                    key={index}
                    onClick={() => {
                      handleProfileDropdown(item.label);
                    }}
                    className={`block text-sm px-4 py-2 text-gray-700 font-medium border-b text-nowrap cursor-pointer ${
                      index % 2 === 0 ? "bg-gray-100 hover:bg-white" : "bg-gray-100 hover:bg-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <i onClick={() => store.dispatch(onMobileMenuOpenHandler())} className="fa fa-bars text-xl cursor-pointer block md:hidden" aria-hidden="true"></i>
        </div>
      </div>
    </header>
  );
};

export default DesktopView;
