import { ActionOptionDataType } from "../../../types/general/action-option-data-type";

export const PhoneConversationData = [
  {
    heading: "Phone Conversation Activity",
    time: "Updated less than a min ago",
    refresh: "refresh",
    searchResult: "Search Result 202",
    filter: "Filters",
    filterNumber: "3",
    clearFilter: "Clear Filters",
    addButton: "Add Had a Phone",
    selectDropdown: [
      {
        id: 1,
        name: "New Lead",
      },
      {
        id: 2,
        name: "Contacted",
      },
      {
        id: 3,
        name: "Qualified",
      },
    ],
  },
];
export const PhoneConversationTableHeaders = [
  {
    label: "Lead Name",
    hasCheckbox: true,
  },
  {
    label: "Action",

    minWidth: "150px",
  },
  {
    label: "Notes",
  },
  {
    label: "Activity Date",
  },
  {
    label: "Owner",
  },
  {
    label: "Status",
  },
];

export const PhoneConversationTableData = [
  {
    id: 1,
    leadName: "NITIN",
    notes: "ALREADY VISITED CAMPUS, FATHER SAYI...",
    activityDateTime: "06-09-2024 10:27 AM",
    owner: "Anjali Kanoujiya",
    status: "",
  },
  {
    id: 2,
    leadName: "[No Name]",
    notes: "AS PER MANUAL CALL...COURSE NOT AV...",
    activityDateTime: "06-09-2024 10:24 AM",
    owner: "Annupoorima Gupta",
    status: "",
  },
  {
    id: 3,
    leadName: "Ajeet Pratap Singh",
    notes: "ALREADY VISITED CAMPUS, SAYING TAK...",
    activityDateTime: "06-09-2024 10:31 PM",
    owner: "Anjali Kanoujiya",
    status: "",
  },
  {
    id: 4,
    leadName: "[No Name]",
    notes: "AS PER MANUAL ...N NOT ANSWERED..",
    activityDateTime: "06-09-2024 10:34 PM",
    owner: "Annupoorima Gupta",
    status: "",
  },
  {
    id: 5,
    leadName: "Mahek Tiwari",
    notes: "REFUND CASE",
    activityDateTime: "06-09-2024 11:03 PM",
    owner: "Sita Kori",
    status: "",
  },
  {
    id: 6,
    leadName: "Shashank",
    notes: "NOT ANSWERED",
    activityDateTime: "06-09-2024 09:34 PM",
    owner: "Anjali Kanoujiya",
    status: "",
  },
  {
    id: 7,
    leadName: "[No Name]",
    notes: "NOT ANSWERED",
    activityDateTime: "06-09-2024 09:39 PM",
    owner: "Anjali Kanoujiya",
    status: "",
  },
  {
    id: 8,
    leadName: "[No Name]",
    notes: "NOT ANSWERED",
    activityDateTime: "06-09-2024 09:42 PM",
    owner: "Anjali Kanoujiya",
    status: "",
  },
  {
    id: 9,
    leadName: "[No Name]",
    notes: "NOT ANSWERED",
    activityDateTime: "06-09-2024 09:44 PM",
    owner: "Anjali Kanoujiya",
    status: "",
  },
  {
    id: 10,
    leadName: "[No Name]",
    notes: "NOT ANSWERED",
    activityDateTime: "06-09-2024 09:49 PM",
    owner: "Anjali Kanoujiya",
    status: "",
  },
  {
    id: 11,
    leadName: "[No Name]",
    notes: "NOT ANSWERED",
    activityDateTime: "06-09-2024 09:49 PM",
    owner: "Anjali Kanoujiya",
    status: "",
  },
  {
    id: 12,
    leadName: "TUSHAR VISHWAKARMA",
    notes: "ALREADY VISITED CAMPUS, CALL NOT A...",
    activityDateTime: "06-09-2024 10:39 PM",
    owner: "Anjali Kanoujiya",
    status: "",
  },
  {
    id: 13,
    leadName: "[No Name]",
    notes: "AS PER MANUAL CALL...NOT ANSWERED..",
    activityDateTime: "06-09-2024 10:39 PM",
    owner: "Annupoorima Gupta",
    status: "",
  },
  {
    id: 14,
    leadName: "AKASH YADAV",
    notes: "CUT THE CALL",
    activityDateTime: "06-09-2024 10:43 PM",
    owner: "Shivam Sharma",
    status: "",
  },
  {
    id: 15,
    leadName: "aasthayadav0102@gamil.com",
    notes: "AS PER MANUAL CALL...BUSY ON ANOT...",
    activityDateTime: "06-09-2024 10:46 PM",
    owner: "Annupoorima Gupta",
    status: "",
  },
  {
    id: 16,
    leadName: "Satyam Singh",
    notes: "NOT ANSWERED",
    activityDateTime: "06-09-2024 10:47 PM",
    owner: "Shivam Sharma",
    status: "",
  },
  {
    id: 17,
    leadName: "[No Name]",
    notes: "MANUAL CALL...INQUIRY FOR CLASSES",
    activityDateTime: "06-09-2024 10:48 PM",
    owner: "Anjali Kanoujiya",
    status: "",
  },
];
export const PhoneConversationTableEditData: ActionOptionDataType[] = [
  { id: 1, textName: "Edit" },
  { id: 2, textName: "Delete" },
];

export const PhoneConversationFormData = [
  {
    type: "select",
    name: "activityType",
    label: "Activity Type",

    options: [
      { value: "", label: "Select Activity Type" },
      { value: "phoneCall", label: "Had a Phone Conversation" },
      { value: "email", label: "Sent an Email" },
    ],
  },

  {
    type: "select",
    name: "leadName",
    label: "Associated Lead",
    options: [
      { value: "", label: "Select Lead" },
      { value: "lead1", label: "Anupam Sharma" },
      { value: "lead2", label: "Nitin", name: "NITIN" },
    ],
  },
  {
    type: "textarea",
    name: "notes",
    label: "Notes",
    value: "",
  },
  {
    type: "select",
    name: "outcomes",
    label: "Outcomes",
    options: [
      { value: "", label: "Select Outcome" },
      { value: "NA_NR", label: "NA/NR" },
      { value: "positive", label: "Positive Outcome" },
    ],
  },
  // {
  //   type: "dateTime",
  //   name: "nextFollowUp",
  //   label: "Next Follow-up Date",
  // },
  {
    type: "dateTime",
    label: "Next Follow up Date/Time",
    splits: [
      {
        type: "date",
        name: "nextDate",
        value: "",
      },
      {
        type: "time",
        name: "nextTime",
        value: "",
      },
    ],
  },

  {
    type: "select",
    name: "owner",
    label: "Owner",
    options: [
      { value: "", label: "Select Owner" },
      { value: "owner1", label: "Aquil Anis Khan" },
      { value: "owner2", label: "Anjali Kanoujiya" },
    ],
  },

  {
    type: "dateTime",
    label: "Activity Date-Time",
    splits: [
      {
        type: "date",
        name: "activityDate",
        label: "Activity Date-Time",
        value: "",
      },
      {
        type: "time",
        name: "activityTime",
        value: "",
      },
    ],
  },
];
