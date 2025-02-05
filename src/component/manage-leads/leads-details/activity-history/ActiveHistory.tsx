import { activeHistoryStep1 } from "../../../../data/manage-leads/active-history-data";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import ProgressStep from "./ProgressStep";
import { transformActivityData } from "../../../../util/actions/transformActivityData";
import { emptyDataIcon } from "../../../../data/savgIcons";
import Fallback from "../../../../util/custom/ui/Fallback";

const ActiveHistory: React.FC = () => {
  // const { dropdown1, dropdown2 } = ActiveHistoryData[0];
  const { leadDetailsDataById } = useSelector((state: RootState) => state.getleadDetailsDataById);

  if (leadDetailsDataById.length === 0) {
    return <Fallback errorInfo="No activity History Found !!" icon={emptyDataIcon} />;
  }

  // Transform the activity data for (today, yesterday and month type) using the utility function
  const transformedTaskData = transformActivityData(leadDetailsDataById);
  return (
    <>
      {/* <div className="border-b px-3 py-2 flex gap-x-3 items-start">
        <div className="select-container">
          <select className="__custom-select rounded-none min-w[100px] sm:min-w-[250px]">
            {dropdown1.map((item: any) => (
              <option key={item.id}>{item.option}</option>
            ))}
          </select>
          <RiArrowDropDownFill size={20} className="dropdown-icon" />
        </div>
        <div className="select-container">
          <select className="__custom-select">
            {dropdown2.map((item: any) => (
              <option key={item.id}>{item.option}</option>
            ))}
          </select>
          <RiArrowDropDownFill size={20} className="dropdown-icon" />
        </div>
        <button className="text-sm text-gray-500 cursor-pointer">Clear Filters here</button>
      </div> */}

      {transformedTaskData.map((data: any, index: number) => (
        <div className="px-1 sm:px-3" key={index}>
          <div className="text-sm font-medium text-gray-500 py-1">{data.key}</div>
          <div className="w-full py-4 bg-white px-4 mb-[12px]">
            {data.activities.map((step: any, taskIndex: number) => (
              <ProgressStep
                key={taskIndex}
                id={step?.actionTrackId}
                timestamp={step?.actionTimestamp}
                title={step?.actionName}
                icon={step?.iconName}
                isLast={index === activeHistoryStep1.length - 1}
                createdBy={step?.createdBy}
                isMode="activity"
              />
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default ActiveHistory;
