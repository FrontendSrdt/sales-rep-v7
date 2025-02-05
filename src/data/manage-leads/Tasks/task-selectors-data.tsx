import * as Yup from "yup";

export const singleSchema = Yup.object({
  subject: Yup.string().required("Subject is required"),
});

export const singleInitalValue = {
  subject: "",
};

export const singleInput = [
  {
    id: 3,
    name: "subject",
    label: "Subject",
    type: "text",
  },
];

export const validationSchema = Yup.object({
  salesrpDetailsId: Yup.string().required("Declaration owner is required"),
  subject: Yup.string().required("Subject is required"),
  leadCaptureId: Yup.string().required("Associated lead is required"),
  organizer: Yup.string().required("Organizer is required"),
  taskDetails: Yup.string().required("Description is required"),
});

export const initalValue = {
  subject: "",
  salesrpDetailsId: "",
  leadCaptureId: "",
  organizer: "",
  taskDetails: "",
};

export const formInputsTemp = [
  {
    id: 1,
    name: "salesrpDetailsId",
    label: "Owner",
    type: "select",
  },
  {
    id: 2,
    name: "leadCaptureId",
    label: "Associated Lead",
    type: "select",
  },
  {
    id: 3,
    name: "subject",
    label: "Subject",
    type: "text",
  },

  {
    id: 5,
    name: "taskDetails",
    label: "Description",
    type: "textarea",
  },
  {
    id: 6,
    name: "organizer",
    label: "Organizer",
    type: "select",
  },
];

export const getValidationSchemaForTask = (selectedOption: string | undefined) => {
  let schema: Record<string, Yup.Schema<any>> = {};

  if (selectedOption === "Declaration Form Fill") {
    schema = {
      salesrpDetailsId: Yup.string().required("Declaration owner is required"),
      leadCaptureId: Yup.string().required("Associated lead is required"),
      subject: Yup.string().required("Subject is required"),
      scheduledDate: Yup.string().required("Scheduled Date is required"),
      taskDetails: Yup.string().required("Description is required"),
      scheduledTime: Yup.string().required("Scheduled Time is required"),
      organizer: Yup.string().required("Organizer is required"),
    };
  }

  if (selectedOption === "Phone Call") {
    schema = {
      salesrpDetailsId: Yup.string().required("Declaration owner is required"),
      leadCaptureId: Yup.string().required("Associated lead is required"),
      subject: Yup.string().required("Subject is required"),
      scheduledDate: Yup.string().required("Scheduled Date is required"),
      taskDetails: Yup.string().required("Description is required"),
      scheduledTime: Yup.string().required("Scheduled Time is required"),
      organizer: Yup.string().required("Organizer is required"),
    };
  }

  if (selectedOption === "Follow-Up") {
    schema = {
      salesrpDetailsId: Yup.string().required("Declaration owner is required"),
      leadCaptureId: Yup.string().required("Associated lead is required"),
      subject: Yup.string().required("Subject is required"),
      scheduledDate: Yup.string().required("Scheduled Date is required"),
      taskDetails: Yup.string().required("Description is required"),
      scheduledTime: Yup.string().required("Scheduled Time is required"),
      organizer: Yup.string().required("Organizer is required"),
    };
  }

  if (selectedOption === "Meeting") {
    schema = {
      salesrpDetailsId: Yup.string().required("Declaration owner is required"),
      leadCaptureId: Yup.string().required("Associated lead is required"),
      subject: Yup.string().required("Subject is required"),
      scheduledDate: Yup.string().required("Scheduled Date is required"),
      taskDetails: Yup.string().required("Description is required"),
      scheduledTime: Yup.string().required("Scheduled Time is required"),
      organizer: Yup.string().required("Organizer is required"),
      location: Yup.string().required("Location is required"),
    };
  }

  return Yup.object(schema);
};

export const getInitialValuesForTask = (selectedOption: string | undefined, initialOptionsForCreateTask: any) => {
  let initialValues = {};
  let { organizer, salesrpDetailsId, leadCaptureId, leadName } = initialOptionsForCreateTask;
  if (selectedOption === "Declaration Form Fill") {
    initialValues = {
      salesrpDetailsId: salesrpDetailsId,
      leadCaptureId: leadCaptureId,
      subject: `${selectedOption} : ${leadName}`,
      scheduledDate: "",
      scheduledTime: "",
      taskDetails: "",
      organizer: organizer,
    };
  }

  if (selectedOption === "Phone Call") {
    initialValues = {
      salesrpDetailsId: salesrpDetailsId,
      leadCaptureId: leadCaptureId,
      subject: `${selectedOption} : ${leadName}`,
      scheduledDate: "",
      scheduledTime: "",
      taskDetails: "",
      organizer: organizer,
    };
  }

  if (selectedOption === "Follow-Up") {
    initialValues = {
      salesrpDetailsId: salesrpDetailsId,
      leadCaptureId: leadCaptureId,
      subject: `${selectedOption} : ${leadName}`,
      scheduledDate: "",
      scheduledTime: "",
      taskDetails: "",
      organizer: organizer,
    };
  }

  if (selectedOption === "Meeting") {
    initialValues = {
      salesrpDetailsId: salesrpDetailsId,
      leadCaptureId: leadCaptureId,
      subject: `${selectedOption} : ${leadName}`,
      scheduledDate: "",
      scheduledTime: "",
      taskDetails: "",
      organizer: organizer,
      location: "",
    };
  }

  return initialValues;
};

export const getFormInputsForTask = (selectedOption: string | undefined) => {
  let formInputs: any = [];
  // console.log(selectedOption);

  if (selectedOption === "Declaration Form Fill") {
    formInputs = [
      {
        id: 1,
        name: "salesrpDetailsId",
        label: "Owner",
        type: "select",
      },
      {
        id: 2,
        name: "leadCaptureId",
        label: "Associated Lead",
        type: "select",
      },
      {
        id: 3,
        name: "subject",
        label: "Subject",
        type: "text",
      },
      {
        id: 4,
        name: "schedule",
        label: "Schedule",
        subInputs: [
          {
            id: 1,
            name: "scheduledDate",
            type: "date",
          },
          {
            id: 2,
            name: "scheduledTime",
            type: "time",
          },
        ],
      },
      {
        id: 5,
        name: "taskDetails",
        label: "Description",
        type: "textarea",
      },
      {
        id: 6,
        name: "organizer",
        label: "Organizer",
        type: "select",
      },
    ];
  }

  if (selectedOption === "Phone Call") {
    formInputs = [
      {
        id: 1,
        name: "salesrpDetailsId",
        label: "Owner",
        type: "select",
      },
      {
        id: 2,
        name: "leadCaptureId",
        label: "Associated Lead",
        type: "select",
      },
      {
        id: 3,
        name: "subject",
        label: "Subject",
        type: "text",
      },
      {
        id: 4,
        name: "schedule",
        label: "Schedule",
        subInputs: [
          {
            id: 1,
            name: "scheduledDate",
            type: "date",
          },
          {
            id: 2,
            name: "scheduledTime",
            type: "time",
          },
        ],
      },
      {
        id: 5,
        name: "taskDetails",
        label: "Description",
        type: "textarea",
      },
      {
        id: 6,
        name: "organizer",
        label: "Organizer",
        type: "select",
      },
    ];
  }

  if (selectedOption === "Follow-Up") {
    formInputs = [
      {
        id: 1,
        name: "salesrpDetailsId",
        label: "Owner",
        type: "select",
      },
      {
        id: 2,
        name: "leadCaptureId",
        label: "Associated Lead",
        type: "select",
      },
      {
        id: 3,
        name: "subject",
        label: "Subject",
        type: "text",
      },
      {
        id: 4,
        name: "schedule",
        label: "Schedule",
        subInputs: [
          {
            id: 1,
            name: "scheduledDate",
            type: "date",
          },
          {
            id: 2,
            name: "scheduledTime",
            type: "time",
          },
        ],
      },
      {
        id: 5,
        name: "taskDetails",
        label: "Description",
        type: "textarea",
      },
      {
        id: 6,
        name: "organizer",
        label: "Organizer",
        type: "select",
      },
    ];
  }

  if (selectedOption === "Meeting") {
    formInputs = [
      {
        id: 1,
        name: "salesrpDetailsId",
        label: "Owner",
        type: "select",
      },
      {
        id: 2,
        name: "leadCaptureId",
        label: "Associated Lead",
        type: "select",
      },
      {
        id: 3,
        name: "subject",
        label: "Subject",
        type: "text",
      },
      {
        id: 4,
        name: "location",
        label: "Location",
        type: "text",
      },
      {
        id: 5,
        name: "schedule",
        label: "Schedule",
        subInputs: [
          {
            id: 1,
            name: "scheduledDate",
            type: "date",
          },
          {
            id: 2,
            name: "scheduledTime",
            type: "time",
          },
        ],
      },
      {
        id: 6,
        name: "taskDetails",
        label: "Description",
        type: "textarea",
      },
      {
        id: 7,
        name: "organizer",
        label: "Organizer",
        type: "select",
      },
    ];
  }

  return formInputs;
};

export const taskData = {
  "2024-11-29": [
    {
      leadScheduledTaskId: 1,
      subject: "Today Task 1",
      scheduledDate: "2024-11-29",
      scheduledTime: "09:00:00",
      location: "Office",
      taskDetails: "Details of today's task",
      organizer: "John Doe",
      completed: false,
    },
  ],
  "2024-11-28": [
    {
      leadScheduledTaskId: 2,
      subject: "Yesterday Task 1",
      scheduledDate: "2024-11-28",
      scheduledTime: "11:00:00",
      location: "Client Office",
      taskDetails: "Details of yesterday's task",
      organizer: "Jane Doe",
      completed: true,
    },
  ],
  "2024-11-26": [
    {
      leadScheduledTaskId: 3,
      subject: "Earlier This Week Task 1",
      scheduledDate: "2024-11-26",
      scheduledTime: "15:00:00",
      location: "Zoom",
      taskDetails: "Earlier this week meeting",
      organizer: "Alice",
      completed: false,
    },
    {
      leadScheduledTaskId: 6,
      subject: "Earlier This Week Task 1",
      scheduledDate: "2024-11-26",
      scheduledTime: "15:00:00",
      location: "Zoom",
      taskDetails: "Earlier this week meeting",
      organizer: "Alice",
      completed: false,
    },
  ],
  "2024-11-10": [
    {
      leadScheduledTaskId: 4,
      subject: "This Month Task 1",
      scheduledDate: "2024-11-10",
      scheduledTime: "13:00:00",
      location: "Cafe",
      taskDetails: "Task within this month",
      organizer: "Bob",
      completed: true,
    },
  ],
  "2023-12-28": [
    {
      leadScheduledTaskId: 6,
      subject: "Older Task 2",
      scheduledDate: "2023-03-28",
      scheduledTime: "10:00:00",
      location: "Online",
      taskDetails: "An older task from Mar 2023",
      organizer: "David222",
      completed: true,
    },
  ],
  "2024-10-15": [
    {
      leadScheduledTaskId: 5,
      subject: "Older Task 1",
      scheduledDate: "2024-10-15",
      scheduledTime: "09:30:00",
      location: "Office",
      taskDetails: "An older task from last month",
      organizer: "Charlie",
      completed: false,
    },
  ],
  "2023-03-28": [
    {
      leadScheduledTaskId: 6,
      subject: "Older Task 2",
      scheduledDate: "2023-03-28",
      scheduledTime: "10:00:00",
      location: "Online",
      taskDetails: "An older task from Mar 2023",
      organizer: "David",
      completed: true,
    },
  ],
  "2023-06-28": [
    {
      leadScheduledTaskId: 6,
      subject: "Older Task 2",
      scheduledDate: "2023-03-28",
      scheduledTime: "10:00:00",
      location: "Online",
      taskDetails: "An older task from Mar 2023",
      organizer: "David222",
      completed: true,
    },
  ],
};
