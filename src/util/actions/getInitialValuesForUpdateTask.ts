export const getInitialValuesForUpdateTask = (responseData: any) => {
  return {
    leadCapture: [
      {
        label: responseData.leadCaptureName,
        value: responseData.leadCaptureId,
      },
    ],
    coreTask: [
      {
        label: responseData.coreTaskTypeName, // Use coreTaskTypeName as the label
        value: responseData.coreTaskTypeId, // Use coreTaskTypeId as the value
      },
    ],
    salesRep: [
      {
        label: responseData.salesrpDetailsName, // Use salesrpDetailsName as the label
        value: responseData.salesrpDetailsId, // Use salesrpDetailsId as the value
      },
    ],
    salesrpDetailsId: responseData.salesrpDetailsId,
    leadCaptureId: responseData.leadCaptureId,
    leadScheduledTaskId: responseData.leadScheduledTaskId,
    subject: responseData.subject,
    taskDetails: responseData.taskDetails,
    organizer: responseData.organizer,
    createdAt: responseData.createdAt, // Convert to moment
    completed: responseData.completed,
    scheduledDate: responseData.scheduledDate, // Convert to moment (optional: you can use a string here)
    scheduledTime: responseData.scheduledTime, // Convert to moment
    location: responseData.location,
  };
};
