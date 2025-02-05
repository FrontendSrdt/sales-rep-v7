import React from "react";
import TopIconHeader from "./TopIconHeader";
import ProfileHeader from "./ProfileHeader";
import TopHeaderTabsActions from "./TopHeaderTabsActions";

const ManageLeadDetailsHead: React.FC = () => {
  // const navigate = useNavigate();
  // const handlebackClick = () => {
  //   navigate(-1);
  // };
  return (
    <>
      <div className="flex flex-col sm:flex-row sm:gap-x-5 justify-between  items-start p-4 border-b border-gray-300 bg-white sticky top-[72px] z-40">
        <ProfileHeader />
        <TopIconHeader />
      </div>
      <TopHeaderTabsActions />
    </>
  );
};

export default ManageLeadDetailsHead;
