import { AiOutlinePhone } from "react-icons/ai";
// import { FcCellPhone } from "react-icons/fc";
import { PiPhoneCallFill } from "react-icons/pi";

import { callingType, TabForCreateLeads } from "../../types/manage-leads/manage-leads-type";
import { ActionOptionDataType } from "../../types/general/action-option-data-type";
import {
  initialValueForAcademicDetails,
  initialValueForAddress,
  initialValueForBI,
  initialValueForContact,
  validationSchemaForAcademicDetails,
  validationSchemaForAddress,
  validationSchemaForBi,
  validationSchemaForContact,
} from "./create-leads-data";

export const tableColumnForLeads = [
  {
    id: 1,
    name: "Lead Name",
  },
  {
    id: 2,
    name: "Lead Score",
  },
  {
    id: 3,
    name: "Lead Stage",
  },
  {
    id: 4,
    name: "Owner",
  },
  {
    id: 5,
    name: "Modified On",
  },
  {
    id: 6,
    name: "Lead Source",
  },
  {
    id: 7,
    name: "OTP Amount",
  },
  {
    id: 8,
    name: "Roll No",
  },
  {
    id: 9,
    name: "Actions ",
  },
];

export const filterDataForTable = [
  {
    name: "Lead Stage",
    value: "leadStage",
    type: "select",
    options: [
      {
        id: 1,
        label: "Lead Stage",
        name: "Lead Stage",
        value: "lead_stage",
      },
      {
        id: 2,
        name: "New Lead",
        value: "new_lead",
      },
      {
        id: 3,
        name: "Contacted",
        value: "contacted",
      },
      {
        id: 4,
        name: "Qualified",
        value: "Qualified",
      },
    ],
  },
  {
    name: "Lead Source",
    value: "leadSource",
    type: "select",
    options: [
      {
        id: 1,
        label: "Lead Source",
        name: "Lead Source",
        value: "lead_source",
      },
      {
        id: 2,
        name: "New Lead",
        value: "new_lead",
      },
      {
        id: 3,
        name: "Contacted",
        value: "contacted",
      },
      {
        id: 4,
        name: "Qualified",
        value: "Qualified",
      },
    ],
  },
  {
    name: "Owner",
    value: "owner",
    type: "select",
    options: [
      {
        id: 1,
        label: "Owner",
        name: "Owner",
        value: "owner",
      },
      {
        id: 2,
        name: "New Lead",
        value: "new_lead",
      },
      {
        id: 3,
        name: "Contacted",
        value: "contacted",
      },
      {
        id: 4,
        name: "Qualified",
        value: "Qualified",
      },
    ],
  },
  {
    name: "Date Range",
    value: "dateRangeFilterType",
    type: "select",
    options: [
      {
        id: 1,
        name: "Last Activity",
        value: "last_activity",
      },
      {
        id: 2,
        label: "Date Range",
        name: "Modified On",
        value: "modifiedOn",
      },
      {
        id: 3,
        name: "Created On",
        value: "createdOn",
      },
    ],
  },
  {
    name: "Custom",
    value: "customDateOption",
    type: "select",
    isRequired: true,
    options: [
      {
        id: 1,
        name: "Today",
        value: "Today",
      },
      {
        id: 2,
        name: "Yesterday",
        value: "Yesterday",
      },
      {
        id: 3,
        name: "Last Week",
        value: "Last Week",
      },
      {
        id: 4,
        name: "This Week",
        value: "This Week",
      },
      {
        id: 5,
        name: "Last Month",
        value: "Last Month",
      },
      {
        id: 6,
        name: "This Month",
        value: "This Month",
      },
      {
        id: 7,
        name: "All Time",
        value: "All Time",
      },
      {
        id: 8,
        name: "Custom",
        value: "custom",
      },
    ],
  },

  {
    name: "Custom Date",
    value: "custom_date",
    type: "select",
    inputs: [
      {
        id: 1,
        name: "customStartDate",
        type: "date",
      },
      {
        id: 2,
        name: "customEndDate",
        type: "date",
      },
    ],
  },
];

export const callingData = {
  title: "WhatsApp",
  iconHeader: <PiPhoneCallFill size={24} />,
  iconBtn: <AiOutlinePhone size={20} />,
  cancelButton: "Cancel",
  saveButton: "Call",
};

export const callingContent: callingType[] = [
  {
    id: 1,
    text: "From",
    name: "userPhone",
    icon: <AiOutlinePhone size={20} />,
  },

  {
    id: 2,
    text: "To",
    name: "leadPhone",
    icon: <AiOutlinePhone size={20} />,
  },
];

export const changeOwnerData = {
  title: "Change Owner",
  subTitle: "Update lead field with new value for the selected lead",
  cancelButton: "Cancel",
  saveButton: "Save",
};

export const ManageLeadsActionsData: ActionOptionDataType[] = [
  { id: 1, textName: "View", action: "View" },
  { id: 2, textName: "Call", action: "Call" },
  { id: 3, textName: "WhatsApp", action: "WhatsApp" },
  { id: 4, textName: "Change Owner", action: "ChangeOwner" },
];

export const tabsDataForCreateLeads: TabForCreateLeads[] = [
  {
    id: 0,
    label: "Biographical Information",
    icon: "homeIcon",
    contentId: "biContent",
    contentForInput: [
      {
        id: 1,
        groupLabel: "Personal",
        groupInputsConfig: [
          {
            id: 1,
            type: "text",
            name: "name",
            label: "Name",
            isrequired: true,
          },
          {
            id: 2,
            type: "text",
            name: "email",
            label: "Email",
            isrequired: true,
          },
          {
            id: 3,
            type: "text",
            name: "phone",
            label: "Phone",
            isrequired: true,
          },
        ],
      },

      {
        id: 2,
        groupLabel: "Program",
        groupInputsConfig: [
          {
            id: 1,
            type: "select",
            name: "academicCareerId",
            label: "Academic Career",
            options: [],
            isrequired: true,
          },
          {
            id: 2,
            type: "select",
            name: "academicProgramId",
            label: "Program",
            options: [],
            isrequired: true,
          },
        ],
      },
      {
        id: 3,
        groupLabel: "Genral",
        groupInputsConfig: [
          {
            id: 1,
            type: "select",
            name: "leadSourceId",
            label: "Lead Source",
            isrequired: true,
          },
          {
            id: 2,
            type: "select",
            name: "currentCoreStateId",
            label: "State",
            options: [],
            isrequired: true,
          },
          {
            id: 3,
            type: "select",
            name: "currentCoreCityId",
            label: "City",
            options: [],
            isrequired: true,
          },
        ],
      },
      {
        id: 4,
        groupLabel: "Additional",
        groupInputsConfig: [
          {
            id: 1,
            type: "select",
            name: "categoryId",
            label: "Category",
            isrequired: true,
          },
          {
            id: 2,
            type: "select",
            name: "admitTypeId",
            label: "Admit Type",
            isrequired: true,
          },
          {
            id: 3,
            type: "select",
            name: "gender",
            label: "Gender",
            isrequired: true,
          },
          {
            id: 4,
            type: "text",
            name: "fatherName",
            label: "Father's Name",
            isrequired: true,
          },
          {
            id: 5,
            type: "text",
            name: "motherName",
            label: "Mother's Name",
            isrequired: true,
          },
        ],
      },
    ],
    initialValues: initialValueForBI,
    validationSchema: validationSchemaForBi,
  },
  {
    id: 1,
    label: "Related Contact Number",
    icon: "settingsIcon",
    contentId: "cnContent",
    contentForInput: [
      {
        id: 1,
        tableInputsConfig: [
          {
            id: 1,
            heading: "Contact Name",
            tableInputs: [
              {
                id: 1,
                name: "contactName",
                type: "text",
              },
            ],
          },
          {
            id: 2,
            heading: "Relation",
            tableInputs: [
              {
                id: 1,
                name: "contactRelation",
                type: "text",
              },
            ],
          },
          {
            id: 3,
            heading: "Contact Number",
            tableInputs: [
              {
                id: 1,
                name: "contactNumber",
                type: "text",
              },
            ],
          },
          {
            id: 4,
            heading: "Primary",
            tableInputs: [
              {
                id: 1,
                name: "primary",
                type: "radio",
              },
            ],
          },
        ],
      },
    ],
    initialValues: initialValueForContact,
    validationSchema: validationSchemaForContact,
  },
  {
    id: 2,
    label: "Address",
    icon: "userIcon",
    contentId: "addressContent",
    contentForInput: [
      {
        id: 1,
        groupLabel: "Address (Permanent)",
        groupInputsConfig: [
          {
            id: 1,
            type: "text",
            name: "addressLine1",
            label: "Address Line 1",
            isrequired: true,
          },
          {
            id: 2,
            type: "text",
            name: "addressLine2",
            label: "Address Line 2",
            isrequired: true,
          },
          {
            id: 3,
            type: "text",
            name: "country",
            label: "Country",
            isrequired: true,
            isReadOnly: true,
          },
          {
            id: 4,
            type: "select",
            name: "coreStateId",
            label: "State",
            options: [],
            isrequired: true,
          },
          {
            id: 5,
            type: "select",
            name: "coreCityId",
            label: "City",
            options: [],
            isrequired: true,
          },
          {
            id: 6,
            type: "text",
            name: "pin1",
            label: "Pin",
            isrequired: true,
          },
          {
            id: 7,
            type: "checkbox",
            name: "corresponding",
            label: "Corresponding Address same as  Permanent",
          },
        ],
      },

      {
        id: 2,
        groupLabel: "Address (Corresponding)",
        groupInputsConfig: [
          {
            id: 1,
            type: "text",
            name: "addressLine21",
            label: "Address Line 1",
            isrequired: true,
          },
          {
            id: 2,
            type: "text",
            name: "addressLine22",
            label: "Address Line 2",
            isrequired: true,
          },
          {
            id: 3,
            type: "text",
            name: "country2",
            label: "Country",
            isrequired: true,
            isReadOnly: true,
          },
          {
            id: 4,
            type: "select",
            name: "coreStateId2",
            label: "State",
            options: [],
            isrequired: true,
          },
          {
            id: 5,
            type: "select",
            name: "coreCityId2",
            label: "City",
            options: [],
            isrequired: true,
          },
          {
            id: 6,
            type: "text",
            name: "pin2",
            label: "Pin",
            isrequired: true,
          },
        ],
      },
    ],
    initialValues: initialValueForAddress,
    validationSchema: validationSchemaForAddress,
  },
  {
    id: 3,
    label: "Academic Details",
    icon: "inboxIcon",
    contentId: "academicContent",
    contentForInput: [
      {
        id: 1,
        groupLabel: "10th",
        groupInputsConfig: [
          {
            id: 1,
            type: "text",
            name: "school", // tenth
            label: "10th School",
            isrequired: true,
          },
          {
            id: 2,
            type: "select",
            name: "coreTenthBoardId", //tenth_borad
            label: "10th Board",
            isrequired: true,
          },
          {
            id: 3,
            type: "select",
            name: "coreTenthMarkingSchemeId", //tenth_marketing_scheme
            label: "10th Marking Scheme",
          },
          {
            id: 4,
            type: "text",
            name: "tenthMarksOrGrade", //tenth_marks_grade
            label: "10th Marks or  Grade",
            isrequired: true,
          },
          {
            id: 5,
            type: "select",
            name: "tenth_plus_2_type",
            label: "10 plus 2 type",
            isrequired: true,
          },
        ],
      },
      {
        id: 2,
        groupLabel: "12th",
        groupInputsConfig: [
          {
            id: 1,
            type: "text",
            name: "twelfthSchool",
            label: "12th School",
            isrequired: true,
          },
          {
            id: 2,
            type: "select",
            name: "coreTwelfthBoardId",
            label: "12th Board",
            isrequired: true,
          },
          {
            id: 3,
            type: "select",
            name: "coreTwelfthResultStatus",
            label: "12th Result Status",
            isrequired: true,
          },
          {
            id: 4,
            type: "select",
            name: "coreTwelfthMarkingSchemeId",
            label: "12th Marking Scheme",
          },
          {
            id: 5,
            type: "text",
            name: "TwelfthMarksOrGrade",
            label: "12th Marks Or Grade",
            isrequired: true,
          },
        ],
      },

      {
        id: 3,
        groupLabel: "Diploma",
        groupInputsConfig: [
          {
            id: 1,
            type: "text",
            name: "diplomaSchool",
            label: "Diploma School",
            isrequired: true,
          },
          {
            id: 2,
            type: "text",
            name: "coreDiplomaBoardId",
            label: "Diploma Board",
            isrequired: true,
          },
          {
            id: 3,
            type: "select",
            name: "coreDiplomaResultStatus",
            label: "Diploma Result Status",
            isrequired: true,
          },
          {
            id: 4,
            type: "text",
            name: "coreDiplomaMarks",
            label: "Diploma Marks",
            isrequired: true,
          },
        ],
      },
      {
        id: 4,
        groupLabel: "UG",
        groupInputsConfig: [
          {
            id: 1,
            type: "text",
            name: "ugSchool",
            label: "UG School",
            isrequired: true,
          },
          {
            id: 2,
            type: "select",
            name: "coreUgResultStatus",
            label: "UG Result Status",
            isrequired: true,
          },
          {
            id: 3,
            type: "text",
            name: "coreUgMarks",
            label: "UG Marks",
            isrequired: true,
          },
        ],
      },
    ],
    initialValues: initialValueForAcademicDetails,
    validationSchema: validationSchemaForAcademicDetails,
  },
  {
    id: 4,
    label: "Preview",
    icon: "settingsIcon",
    contentId: "previewContent",
  },
];

export const tabsDataForUpdateLeads: TabForCreateLeads[] = [
  {
    id: 0,
    label: "Biographical Information",
    icon: "homeIcon",
    contentId: "biContent",
    contentForInput: [
      {
        id: 1,
        groupLabel: "Personal",
        groupInputsConfig: [
          {
            id: 1,
            type: "text",
            name: "name",
            label: "Name",
            isrequired: true,
          },
          {
            id: 2,
            type: "text",
            name: "email",
            label: "Email",
            isrequired: true,
          },
          {
            id: 3,
            type: "text",
            name: "phone",
            label: "Phone",
            isrequired: true,
          },
        ],
      },

      {
        id: 2,
        groupLabel: "Program",
        groupInputsConfig: [
          {
            id: 1,
            type: "select",
            name: "academicCareerId",
            label: "Academic Career",
            options: [],
            isrequired: true,
          },
          {
            id: 2,
            type: "select",
            name: "academicProgramId",
            label: "Program",
            options: [],
            isrequired: true,
          },
        ],
      },
      {
        id: 3,
        groupLabel: "Genral",
        groupInputsConfig: [
          {
            id: 1,
            type: "select",
            name: "leadSourceId",
            label: "Lead Source",
            isrequired: true,
          },
          {
            id: 2,
            type: "select",
            name: "currentCoreStateId",
            label: "State",
            options: [],
            isrequired: true,
          },
          {
            id: 3,
            type: "select",
            name: "currentCoreCityId",
            label: "City",
            options: [],
            isrequired: true,
          },
        ],
      },
      {
        id: 4,
        groupLabel: "Additional",
        groupInputsConfig: [
          {
            id: 1,
            type: "select",
            name: "categoryId",
            label: "Category",
            isrequired: true,
          },
          {
            id: 2,
            type: "select",
            name: "admitTypeId",
            label: "Admit Type",
            isrequired: true,
          },
          {
            id: 3,
            type: "select",
            name: "gender",
            label: "Gender",
            isrequired: true,
          },
          {
            id: 4,
            type: "text",
            name: "fatherName",
            label: "Father's Name",
            // isrequired: true,
          },
          {
            id: 5,
            type: "text",
            name: "motherName",
            label: "Mother's Name",
            // isrequired: true,
          },
        ],
      },
    ],
    initialValues: initialValueForBI,
    validationSchema: validationSchemaForBi,
  },
  {
    id: 1,
    label: "Related Contact Number",
    icon: "settingsIcon",
    contentId: "cnContent",
    contentForInput: [
      {
        id: 1,
        tableInputsConfig: [
          {
            id: 1,
            heading: "Contact Name",
            tableInputs: [
              {
                id: 1,
                name: "contactName",
                type: "text",
              },
            ],
          },
          {
            id: 2,
            heading: "Relation",
            tableInputs: [
              {
                id: 1,
                name: "contactRelation",
                type: "text",
              },
            ],
          },
          {
            id: 3,
            heading: "Contact Number",
            tableInputs: [
              {
                id: 1,
                name: "contactNumber",
                type: "text",
              },
            ],
          },
          {
            id: 4,
            heading: "Primary",
            tableInputs: [
              {
                id: 1,
                name: "primary",
                type: "radio",
              },
            ],
          },
        ],
      },
    ],
    initialValues: initialValueForContact,
    validationSchema: validationSchemaForContact,
  },
  {
    id: 2,
    label: "Address",
    icon: "userIcon",
    contentId: "addressContent",
    contentForInput: [
      {
        id: 1,
        groupLabel: "Address (Permanent)",
        groupInputsConfig: [
          {
            id: 1,
            type: "text",
            name: "addressLine1",
            label: "Address Line 1",
            isrequired: true,
          },
          {
            id: 2,
            type: "text",
            name: "addressLine2",
            label: "Address Line 2",
            isrequired: true,
          },
          {
            id: 3,
            type: "text",
            name: "country",
            label: "Country",
            isrequired: true,
            isReadOnly: true,
          },
          {
            id: 4,
            type: "select",
            name: "coreStateId",
            label: "State",
            options: [],
            isrequired: true,
          },
          {
            id: 5,
            type: "select",
            name: "coreCityId",
            label: "City",
            options: [],
            isrequired: true,
          },
          {
            id: 6,
            type: "text",
            name: "pin1",
            label: "Pin",
            isrequired: true,
          },
          {
            id: 7,
            type: "checkbox",
            name: "corresponding",
            label: "Corresponding Address same as  Permanent",
          },
        ],
      },

      {
        id: 2,
        groupLabel: "Address (Corresponding)",
        groupInputsConfig: [
          {
            id: 1,
            type: "text",
            name: "addressLine21",
            label: "Address Line 1",
            isrequired: true,
          },
          {
            id: 2,
            type: "text",
            name: "addressLine22",
            label: "Address Line 2",
            isrequired: true,
          },
          {
            id: 3,
            type: "text",
            name: "country2",
            label: "Country",
            isrequired: true,
            isReadOnly: true,
          },
          {
            id: 4,
            type: "select",
            name: "coreStateId2",
            label: "State",
            options: [],
            isrequired: true,
          },
          {
            id: 5,
            type: "select",
            name: "coreCityId2",
            label: "City",
            options: [],
            isrequired: true,
          },
          {
            id: 6,
            type: "text",
            name: "pin2",
            label: "Pin",
            isrequired: true,
          },
        ],
      },
    ],
    initialValues: initialValueForAddress,
    validationSchema: validationSchemaForAddress,
  },
  {
    id: 3,
    label: "Academic Details",
    icon: "inboxIcon",
    contentId: "academicContent",
    contentForInput: [
      {
        id: 1,
        groupLabel: "10th",
        groupInputsConfig: [
          {
            id: 1,
            type: "text",
            name: "school", // tenth
            label: "10th School",
            isrequired: true,
          },
          {
            id: 2,
            type: "select",
            name: "coreTenthBoardId", //tenth_borad
            label: "10th Board",
            isrequired: true,
          },
          {
            id: 3,
            type: "select",
            name: "coreTenthMarkingSchemeId", //tenth_marketing_scheme
            label: "10th Marking Scheme",
          },
          {
            id: 4,
            type: "text",
            name: "tenthMarksOrGrade", //tenth_marks_grade
            label: "10th Marks or  Grade",
            isrequired: true,
          },
          {
            id: 5,
            type: "select",
            name: "tenth_plus_2_type",
            label: "10 plus 2 type",
            isrequired: true,
          },
        ],
      },
      {
        id: 2,
        groupLabel: "12th",
        groupInputsConfig: [
          {
            id: 1,
            type: "text",
            name: "twelfthSchool",
            label: "12th School",
            isrequired: true,
          },
          {
            id: 2,
            type: "select",
            name: "coreTwelfthBoardId",
            label: "12th Board",
            isrequired: true,
          },
          {
            id: 3,
            type: "select",
            name: "coreTwelfthResultStatus",
            label: "12th Result Status",
            isrequired: true,
          },
          {
            id: 4,
            type: "select",
            name: "coreTwelfthMarkingSchemeId",
            label: "12th Marking Scheme",
          },
          {
            id: 5,
            type: "text",
            name: "TwelfthMarksOrGrade",
            label: "12th Marks Or Grade",
            isrequired: true,
          },
        ],
      },

      {
        id: 3,
        groupLabel: "Diploma",
        groupInputsConfig: [
          {
            id: 1,
            type: "text",
            name: "diplomaSchool",
            label: "Diploma School",
            isrequired: true,
          },
          {
            id: 2,
            type: "text",
            name: "coreDiplomaBoardId",
            label: "Diploma Board",
            isrequired: true,
          },
          {
            id: 3,
            type: "select",
            name: "coreDiplomaResultStatus",
            label: "Diploma Result Status",
            isrequired: true,
          },
          {
            id: 4,
            type: "text",
            name: "coreDiplomaMarks",
            label: "Diploma Marks",
            isrequired: true,
          },
        ],
      },
      {
        id: 4,
        groupLabel: "UG",
        groupInputsConfig: [
          {
            id: 1,
            type: "text",
            name: "ugSchool",
            label: "UG School",
            isrequired: true,
          },
          {
            id: 2,
            type: "select",
            name: "coreUgResultStatus",
            label: "UG Result Status",
            isrequired: true,
          },
          {
            id: 3,
            type: "text",
            name: "coreUgMarks",
            label: "UG Marks",
            isrequired: true,
          },
        ],
      },
    ],
    initialValues: initialValueForAcademicDetails,
    validationSchema: validationSchemaForAcademicDetails,
  },
];

export const sectionsConfig = [
  {
    id: 1,
    title: "Personal",
    fields: [
      { id: 1, name: "Name", key: "name" },
      { id: 2, name: "Email", key: "email" },
      { id: 3, name: "Phone", key: "phone" },
    ],
  },
  {
    id: 2,
    title: "Program",
    fields: [
      { id: 1, name: "Academic Career", key: "academicCareerId" },
      { id: 2, name: "Program", key: "academicProgramId" },
    ],
  },
  {
    id: 3,
    title: "General",
    fields: [
      { id: 1, name: "Lead Source", key: "leadSourceId" },
      { id: 2, name: "State", key: "currentCoreStateId" },
      { id: 3, name: "City", key: "currentCoreCityId" },
    ],
  },
  {
    id: 4,
    title: "Additional",
    fields: [
      { id: 1, name: "Category", key: "categoryId" },
      { id: 2, name: "Admit Type", key: "admitTypeId" },
      { id: 3, name: "Gender", key: "gender" },
      { id: 4, name: "Father's Name", key: "fatherName" },
      { id: 5, name: "Mother's Name", key: "motherName" },
    ],
  },
  {
    id: 5,
    title: "Related Contacts",
    fields: [
      { id: 1, name: "Contact Name", key: "contactName" },
      { id: 2, name: "Contact Relation", key: "contactRelation" },
      { id: 3, name: "Contact Number", key: "contactNumber" },
      { id: 4, name: "Primary Contact", key: "primary" },
    ],
  },
  {
    id: 6,
    title: "Address (Permanent)",
    fields: [
      { id: 1, name: "Address Line 1", key: "addressLine1" },
      { id: 2, name: "Address Line 2", key: "addressLine2" },
      { id: 3, name: "Country", key: "country" },
      { id: 4, name: "State", key: "coreStateId" },
      { id: 5, name: "City", key: "coreCityId" },
      { id: 6, name: "Pin", key: "pin1" },
    ],
  },
  {
    id: 7,
    title: "Address (Corresponding)",
    fields: [
      { id: 1, name: "Address Line 1", key: "addressLine21" },
      { id: 2, name: "Address Line 2", key: "addressLine22" },
      { id: 3, name: "Country", key: "country2" },
      { id: 4, name: "State", key: "coreStateId2" },
      { id: 5, name: "City", key: "coreCityId2" },
      { id: 6, name: "Pin", key: "pin2" },
    ],
  },
  {
    id: 8,
    title: "Academic Details (10th)",
    fields: [
      { id: 1, name: "School", key: "school" },
      { id: 2, name: "Board", key: "coreTenthBoardId" },
      { id: 3, name: "Marking Scheme", key: "coreTenthMarkingSchemeId" },
      { id: 4, name: "Marks or Grade", key: "tenthMarksOrGrade" },
      { id: 5, name: "10 plus 2 Type", key: "tenth_plus_2_type" },
    ],
  },
  {
    id: 9,
    title: "Academic Details (12th)",
    fields: [
      { id: 1, name: "School", key: "twelfthSchool" },
      { id: 2, name: "Board", key: "coreTwelfthBoardId" },
      { id: 3, name: "Result Status", key: "coreTwelfthResultStatus" },
      { id: 4, name: "Marking Scheme", key: "coreTwelfthMarkingSchemeId" },
      { id: 5, name: "Marks or Grade", key: "TwelfthMarksOrGrade" },
    ],
  },
  {
    id: 10,
    title: "Academic Details (Diploma)",
    fields: [
      { id: 1, name: "Diploma School", key: "diplomaSchool" },
      { id: 2, name: "Diploma Board", key: "coreDiplomaBoardId" },
      { id: 3, name: "Diploma Result Status", key: "coreDiplomaResultStatus" },
      { id: 4, name: "Marks or Grade", key: "coreDiplomaMarks" },
    ],
  },
  {
    id: 11,
    title: "Academic Details UG",
    fields: [
      { id: 1, name: "UG School", key: "ugSchool" },
      { id: 2, name: "UG Result Status", key: "coreUgResultStatus" },
      { id: 3, name: "UG Marks or Grade", key: "coreUgMarks" },
    ],
  },
];

export const sectionsConfigForLeadUpdate = [
  {
    id: 1,
    title: "Personal",
    fields: [
      { id: 1, name: "Name", key: "name" },
      { id: 2, name: "Email", key: "email" },
      { id: 3, name: "Phone", key: "phone" },
      { id: 4, name: "Academic Career", key: "academicCareerName" },
      { id: 5, name: "Program", key: "academicProgramName" },
    ],
  },
  // {
  //   id: 2,
  //   title: "Program",
  //   fields: [
  //     { id: 1, name: "Academic Career", key: "academicCareerName" },
  //     { id: 2, name: "Program", key: "academicProgramName" },
  //   ],
  // },
  {
    id: 3,
    title: "General",
    fields: [
      { id: 1, name: "Lead Source", key: "leadSourceName" },
      { id: 2, name: "State", key: "currentCoreStateName" },
      { id: 3, name: "City", key: "currentCoreCityName" },
    ],
  },
  {
    id: 4,
    title: "Additional",
    fields: [
      { id: 1, name: "Category", key: "categoryName" },
      { id: 2, name: "Admit Type", key: "admitTypeName" },
      { id: 3, name: "Gender", key: "gender" },
      { id: 4, name: "Parent Guardian Name", key: "parentGuardianName" },
      { id: 5, name: "Parent Guardian Contact", key: "parentGuardianContact" },
    ],
  },
  {
    id: 5,
    title: "Related Contacts",
    fields: [
      { id: 1, name: "Contact Name", key: "contactName" },
      { id: 2, name: "Contact Relation", key: "contactRelation" },
      { id: 3, name: "Contact Number", key: "contactNumber" },
      { id: 4, name: "Primary Contact", key: "primary" },
    ],
  },
  {
    id: 6,
    title: "Permanent Address",
    fields: [
      { id: 1, name: "Address Line 1", key: "addressLine1" },
      { id: 2, name: "Address Line 2", key: "addressLine2" },
      { id: 3, name: "Country", key: "country1" },
      { id: 4, name: "State", key: "coreStateName1" },
      { id: 5, name: "City", key: "coreCityName1" },
      { id: 6, name: "Pin", key: "pin1" },
    ],
  },
  {
    id: 7,
    title: "Correspondence Address",
    fields: [
      { id: 1, name: "Address Line 1", key: "addressLine21" },
      { id: 2, name: "Address Line 2", key: "addressLine22" },
      { id: 3, name: "Country", key: "country2" },
      { id: 4, name: "State", key: "coreStateName2" },
      { id: 5, name: "City", key: "coreCityName2" },
      { id: 6, name: "Pin", key: "pin2" },
    ],
  },
  {
    id: 8,
    title: "Academic Details (10th)",
    fields: [
      { id: 1, name: "School", key: "school" },
      { id: 2, name: "Board", key: "coreTenthBoardName" },
      { id: 3, name: "Marking Scheme", key: "coreTenthmarkingSchemeName" },
      { id: 4, name: "Marks or Grade", key: "tenthMarksOrGrade" },
      { id: 5, name: "10 plus 2 Type", key: "tenth_plus_2_type" },
    ],
  },
  {
    id: 9,
    title: "Academic Details (12th)",
    fields: [
      { id: 1, name: "School", key: "twelfthSchool" },
      { id: 2, name: "Board", key: "coreTwelfthBoardName" },
      { id: 3, name: "Result Status", key: "coreTwelfthResultStatus" },
      { id: 4, name: "Marking Scheme", key: "coreTwelfthmarkingSchemeName" },
      { id: 5, name: "Marks or Grade", key: "TwelfthMarksOrGrade" },
    ],
  },
  {
    id: 10,
    title: "Academic Details (Diploma)",
    fields: [
      { id: 1, name: "Diploma School", key: "diplomaSchool" },
      { id: 2, name: "Diploma Board", key: "coreDiplomaBoard" },
      { id: 3, name: "Diploma Result Status", key: "coreDiplomaResultStatus" },
      { id: 4, name: "Marks or Grade", key: "coreDiplomaMarks" },
    ],
  },
  {
    id: 11,
    title: "Academic Details UG",
    fields: [
      { id: 1, name: "UG School", key: "ugSchool" },
      { id: 2, name: "UG Result Status", key: "coreUgResultStatus" },
      { id: 3, name: "UG Marks or Grade", key: "coreUgMarks" },
    ],
  },
];

export const hamburgerModalData = {
  title: "Manage Columns",
  cancelButton: "Cancel",
  saveButton: "Save",
};

export const hamburgerModalcolumnData = [
  {
    id: 0,
    name: "lead_capture_id",
    label: "Lead Capture Id",
    isReadOnly: true,
  },
  {
    id: 1,
    name: "created_at",
    label: "Created At",
    isReadOnly: false,
  },
  {
    id: 2,
    name: "email",
    label: "Email",
    isReadOnly: false,
  },
  {
    id: 3,
    name: "name",
    label: "Lead Name",
    isReadOnly: true,
  },
  {
    id: 4,
    name: "phone",
    label: "Phone",
    isReadOnly: true,
  },
  {
    id: 5,
    name: "academic_career_description",
    label: "Academic Career",
    isReadOnly: true,
  },
  {
    id: 6,
    name: "academic_program_description",
    label: "Academic Program",
    isReadOnly: true,
  },
  {
    id: 7,
    name: "city_name",
    label: "City",
    isReadOnly: false,
  },
  {
    id: 8,
    name: "state_name",
    label: "State",
    isReadOnly: false,
  },
  {
    id: 9,
    name: "lead_source_description",
    label: "Lead Source",
    isReadOnly: false,
  },
  {
    id: 10,
    name: "session_name",
    label: "Session",
    isReadOnly: false,
  },
  {
    id: 11,
    name: "current_salesrep_full_name",
    label: "Current Salesrep",
    isReadOnly: false,
  },
  {
    id: 12,
    name: "current_lead_stage_display_name",
    label: "Current Lead Stage",
    isReadOnly: false,
  },
  {
    id: 13,
    name: "current_lead_sub_stage_display_name",
    label: "Current Lead Sub Stage",
    isReadOnly: false,
  },
  {
    id: 14,
    name: "application_status_name",
    label: "Application Status",
    isReadOnly: false,
  },
];
