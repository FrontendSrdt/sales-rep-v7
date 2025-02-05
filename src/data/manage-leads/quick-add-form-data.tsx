import * as Yup from "yup";

export const validationSchemaForQuickAddForm = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email format").required("Email is required"),
  phone: Yup.string()
    .matches(/^[0-9]+$/, "Phone number must contain only digits")
    .length(10, "Phone number must be exactly 10 digits")
    .required("Phone is required"),
  academicCareerId: Yup.string().required("Academic Career is required"),
  academicProgramId: Yup.string().required("Program is required"),
  currentCoreStateId: Yup.string().required("State is required"),
  currentCoreCityId: Yup.string().required("City is required"),
});

export const initialValueForQuickAddForm = {
  name: "",
  email: "",
  phone: "",
  academicCareerId: "",
  academicProgramId: "",
  currentCoreStateId: "",
  currentCoreCityId: "",
  leadSourceId: "175",
  // coreSessionId: "",
  // leadStages: [
  //   {
  //     leadStageId: 1,
  //   },
  // ],
};

export const quickAddFormInputs = [
  {
    id: 0,
    name: "name",
    type: "text",
    label: "Candidate Name",
    isReadOnly: false,
    isrequired: true,
  },
  {
    id: 1,
    name: "email",
    type: "text",
    label: "Email",
    isReadOnly: false,
    isrequired: true,
  },
  {
    id: 2,
    name: "phone",
    type: "text",
    label: "Phone Number",
    isReadOnly: false,
    isrequired: true,
  },
  {
    id: 3,
    name: "academicCareerId",
    type: "select",
    label: "Academic Career",
    isReadOnly: false,
    isrequired: true,
  },
  {
    id: 4,
    name: "academicProgramId",
    type: "select",
    label: "Course Intrested In",
    isReadOnly: false,
    isrequired: true,
  },
  {
    id: 5,
    name: "leadSourceId",
    type: "select",
    label: "Lead Source",
    isReadOnly: true,
  },
  {
    id: 6,
    name: "currentCoreStateId",
    type: "select",
    label: "State",
    isReadOnly: false,
    isrequired: true,
  },
  {
    id: 7,
    name: "currentCoreCityId",
    type: "select",
    label: "City",
    isReadOnly: false,
    isrequired: true,
  },
];

export const quickAddLeadFormData = {
  title: "Quick Add Form",
  cancelButton: "Cancel",
  saveButton: "Save",
};

export const testActionData = {
  title: "Test Action",
  cancelButton: "Cancel",
  saveButton: "Save",
};
