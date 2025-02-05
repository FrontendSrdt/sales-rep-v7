import React from "react";
import { profileHeaderData } from "../../../../data/manage-leads/leadDetails-data";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import Classes from "../../../../util/Global.module.css";


const ProfileHeader: React.FC = () => {
  const { icons } = profileHeaderData[0];
  const { leadPropertiesDataById } = useSelector((state: RootState) => state.getLeadPropertiesDataById);
  const fullName = leadPropertiesDataById.leadName;
  const firstLetter = fullName?.charAt(0).toUpperCase();

  if (Object.keys(leadPropertiesDataById).length === 0) {
    return null;
  }

  return (
    <div className="flex items-start">
      <div
        className={`w-10 h-10 min-w-10 min-h-10 lg:w-14 lg:h-14 lg:min-w-14 lg:min-h-14 z-5 flex items-center justify-center rounded-full text-xl font-normal text-white ${Classes["shadowInCircle"]}`}
      >
        <div className="text-2xl">{firstLetter}</div>
      </div>

      <div className="ml-2 lg:ml-4">
        <div className="flex items-center gap-x-1">
          <span className="lg:text-xl font-bold tracking-widest text-nowrap">{leadPropertiesDataById.leadName}</span>
          {leadPropertiesDataById.leadStageName && <span className="bg-purple-500 text-white text-xs px-2 py-1 rounded">{leadPropertiesDataById.leadStageName}</span>}
          {icons.map((item: any) => (
            <span className="bg-gray-100 py-1 px-1" key={item.id}>
              {item.icon}
            </span>
          ))}
        </div>

        <div className="text-sm text-gray-600 mt-3">
          <Link className="text-blue-500 mr-2" to={`mailto:${leadPropertiesDataById.email}`}>
            {leadPropertiesDataById.email}
          </Link>
          - Ph: <span className="text-blue-500 mr-2">{leadPropertiesDataById.phone}</span>
          {leadPropertiesDataById.cityName}, {leadPropertiesDataById.stateName}
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
