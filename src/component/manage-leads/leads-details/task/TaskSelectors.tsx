import React, { useEffect } from "react";
import CustomFormForLeadOperations from "../CustomFormForLeadOperations";
import { getFormInputsForTask, getInitialValuesForTask, getValidationSchemaForTask } from "../../../../data/manage-leads/Tasks/task-selectors-data";
import { useSelector } from "react-redux";
import store, { RootState } from "../../../../store";
import { AddNewLeadTask, resetResposneforNewLeadTask } from "../../../../store/task/create-leadTask-slice";
import { updateLeadTask } from "../../../../store/task/update-leadTask-slice";
import LoadingSpinner from "../../../../util/custom/ui/LoadingSpinner";
import { uiSliceAction } from "../../../../store/ui/ui-slice";

const TaskSelectors: React.FC = () => {
  const { responseForLeadOwner } = useSelector((state: RootState) => state.getAllLeadOwner);
  const { responseForLeadName } = useSelector((state: RootState) => state.getLeadName);
  const { userDetails } = useSelector((state: RootState) => state.getLoggedInUserData);
  const { fullName } = userDetails;
  // const [selectedOption, setSelectedOption] = useState(null);
  const { getHeaderTabIconsName, selectedOption } = useSelector((state: RootState) => state.ui);
  const { isLoading: isLoadingForupdateTask, responseOfUpdateLeadTask } = useSelector((state: RootState) => state.leadTaskUpdate);
  const { isLoading: isLoadingForAddTask, responseOfNewLeadTask } = useSelector((state: RootState) => state.addNewLeadTask);

  const { isLoading, responseForLeadTaskDetailsByTaskId } = useSelector((state: RootState) => state.getLeadTaskDetailsByTaskId);
  const { leadPropertiesDataById } = useSelector((state: RootState) => state.getLeadPropertiesDataById);

  // console.log("isLoading", responseOfUpdateLeadTask);

  // console.log("leadPropertiesDataById====>>", leadPropertiesDataById);
  const organizerOptions = {
    value: 3,
    label: fullName,
  };

  // console.log("organizerOptions", organizerOptions);

  // const formattedData = responseForLeadOwner.map((item: any) => ({
  //   label: item.name,
  //   value: item.value,
  // }));

  const { value: coreTaskTypeId, label } = selectedOption ?? {};
  // If selectedOption is null or undefined, this will default to an empty object

  const getOptionsForSelect = (name: string) => {
    switch (name) {
      case "salesrpDetailsId":
        return responseForLeadOwner;
      case "leadCaptureId":
        return responseForLeadName;
      default:
        return null;
    }
  };

  const addLeadTaskHandler = (value: any) => {
    value["coreTaskTypeId"] = coreTaskTypeId;
    store.dispatch(AddNewLeadTask(value));
  };

  const updateTaskHandler = (value: any) => {
    const id = responseForLeadTaskDetailsByTaskId.leadScheduledTaskId;

    // Clone the object to ensure it's mutable
    const updatedData = { ...value };

    // Safely delete the properties
    delete updatedData["salesrpDetailsName"];
    delete updatedData["leadCaptureName"];

    // Dispatch actions
    store.dispatch(updateLeadTask({ id, updatedData }));
  };

  useEffect(() => {
    if (!isLoadingForupdateTask && responseOfUpdateLeadTask) {
      console.log("Update form response received");
      store.dispatch(uiSliceAction.onDrawrCloseHandler());
    } else if (!isLoadingForAddTask && responseOfNewLeadTask) {
      store.dispatch(resetResposneforNewLeadTask());
      console.log("Add form response received");
      store.dispatch(uiSliceAction.onDrawrCloseHandler());
    }
  }, [isLoadingForupdateTask, responseOfUpdateLeadTask, isLoadingForAddTask, responseOfNewLeadTask]);

  // created new object to prefilled owner , assosiate lead ,organizer , subject  in create task's initials value
  const initialOptionsForCreateTask = {
    salesrpDetailsId: leadPropertiesDataById.salesrepId,
    leadCaptureId: leadPropertiesDataById.leadCaptureId,
    organizer: 3,
    leadName: leadPropertiesDataById.leadName,
  };

  // console.log("selectedOption====", selectedOption);
  return (
    <>
      {isLoading && getHeaderTabIconsName === "taskEdit" && <LoadingSpinner size={20} mainLoading={false} message="Fetching Task!" centered={true} />}
      <div className="bg-[#F7F7F7] py-5 px-5 border-b ">
        <h2 className="text-lg font-bold">{getHeaderTabIconsName === "taskEdit" ? `Edit ${selectedOption.label} : ${leadPropertiesDataById.leadName}` : `Tasks`}</h2>
      </div>
      <div className="px-5 py-3 overflow-auto h-[calc(100vh-70px)]">
        {
          <CustomFormForLeadOperations
            organizerOptions={organizerOptions}
            getOptionsForSelect={getOptionsForSelect}
            onAction={getHeaderTabIconsName === "taskEdit" ? updateTaskHandler : addLeadTaskHandler}
            // initialValues={getHeaderTabIconsName === "taskEdit" ? responseForLeadTaskDetailsByTaskId : getInitialValuesForTask(label, 3)}
            initialValues={getHeaderTabIconsName === "taskEdit" ? responseForLeadTaskDetailsByTaskId : getInitialValuesForTask(label, initialOptionsForCreateTask)}
            validationSchema={getValidationSchemaForTask(label)}
            formInputForcreate={getFormInputsForTask(label)}
            isMode="updateTask"
          />
        }
      </div>
    </>
  );
};

export default TaskSelectors;
