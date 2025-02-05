import { useSelector } from "react-redux";
import store, { RootState } from "../../../../store";
import { transformTaskData } from "../../../../util/actions/transformTaskData";
import ProgressStep from "../activity-history/ProgressStep";
import { onDrawrOpenHandler, uiSliceAction } from "../../../../store/ui/ui-slice";
import { getLeadTaskDetailsByTaskIdValues } from "../../../../store/task/get-taskDetails-by-taskTypeId-slice";
import LoadingSpinner from "../../../../util/custom/ui/LoadingSpinner";
import Fallback from "../../../../util/custom/ui/Fallback";
import { emptyDataIcon } from "../../../../data/savgIcons";

const TaskDetail: React.FC = () => {
  // const { dropdown1, dropdown2 } = ActiveHistoryData[0];
  const { isLoading: isLoadingForTaskDetailsById, leadScheduleTaskDataById } = useSelector((state: RootState) => state.getLeadScheduleTaskDataById);

  // console.log("leadScheduleTaskDataByIdrespone", leadScheduleTaskDataById);
  const dispatch = store.dispatch;
  // Transform the task data for (today, yesterday and month type) using the utility function
  const transformedTaskData = transformTaskData(leadScheduleTaskDataById);
  // console.log(transformedTaskData);
  const handleEditClick = (id: number | string, coreTaskTypeId: string | number) => {
    dispatch(onDrawrOpenHandler());
    dispatch(uiSliceAction.onGetHeaderTabIconsName("taskEdit"));
    const leadScheduledTaskId = id;
    dispatch(
      getLeadTaskDetailsByTaskIdValues({
        leadScheduledTaskId,
        coreTaskTypeId,
      })
    );
  };

  if (transformedTaskData.length === 0) {
    return <Fallback errorInfo="No Tasks Found !!" icon={emptyDataIcon} />;
  }

  return (
    <>
      {/* <div className="border-b px-3 py-2 flex gap-x-3">
        <div className="select-container">
          <select className="__custom-select rounded-none  min-w-[250px]">
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
      {isLoadingForTaskDetailsById && <LoadingSpinner size={20} mainLoading={false} message="Fetching Task Details!" centered={true} />}
      {!isLoadingForTaskDetailsById &&
        transformedTaskData.map((data: any, index: number) => (
          <div className="px-1 sm:px-3" key={index}>
            <div className="text-sm font-medium text-gray-500 py-1">{data.key}</div>
            <div className="w-full py-4 bg-white px-4 mb-[12px]">
              {data.tasks.map((step: any, taskIndex: number) => (
                <ProgressStep
                  isMode="task"
                  key={taskIndex}
                  title={step?.subject}
                  status={step?.completed}
                  date={step?.scheduledDate}
                  createdBy={step?.organizer}
                  createdAt={step?.createdAt}
                  id={step?.leadScheduledTaskId}
                  timestamp={step?.scheduledTime}
                  description={step?.taskDetails}
                  owner={step?.salesrpDetailsName}
                  onHandleEditClick={handleEditClick}
                  coreTaskTypeId={step?.coreTaskTypeId}
                />
              ))}
            </div>
          </div>
        ))}
    </>
  );
};

export default TaskDetail;
