import React from "react";
import MobileView from "./MobileView";
import { RootState } from "../../store";
import DesktopView from "./DesktopView";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import useForLocation from "../../hooks/useForLocation";
import { dashboardItems, leadsItems, profileItems } from "../../data/navbar-data";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { currentURL } = useForLocation();
  const { isMobileMenu } = useSelector((state: RootState) => state.ui);
  const { userDetails } = useSelector((state: RootState) => state.getLoggedInUserData);

  const handlebackClick = () => {
    if (userDetails?.authority?.includes("ROLE_AUTHORITY")) {
      navigate("/");
    } else {
      navigate(-1);
    }
  };
  if (isMobileMenu) {
    document.body.style.overflow = "hidden";
    document.body.style.height = "100vh";
  } else {
    document.body.style.overflow = "auto";
    document.body.style.height = "100%";
  }

  return (
    <>
      {/* ================Desktop Veiw========================== */}
      <div className="sticky top-0 w-full left-0 z-50">
        <DesktopView dashboardItems={dashboardItems} leadsItems={leadsItems} profileItems={profileItems} />
        {/* {currentURL !== "/" && (currentURL !== "/manage-leads") && currentURL !== "/view-decline-cases" && ( */}


        {currentURL !== "/" && currentURL !== "/manage-leads" && (
          <div className=" w-full flex items-center h-[20px] py-0.5 px-3 sm:px-6 bg-[rgb(244,246,248)] fixed top-[56px] border-[1px] border-[rbg(223,227,232)]">
            <button type="button" className=" flex items-center justify-center gap-1 text-[12px] text-[rgb(99,115,129)] hover:text-black " onClick={handlebackClick}>
              <FaArrowLeftLong /> Back
            </button>
          </div>
        )}
      </div>
      {/* ==================Mobile Veiw================= */}
      <MobileView dashboardItems={dashboardItems} leadsItems={leadsItems} />
    </>
  );
};

export default Navbar;
