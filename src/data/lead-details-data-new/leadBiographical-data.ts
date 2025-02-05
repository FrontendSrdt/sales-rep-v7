import * as Yup from "yup";

interface BiographicalInfo {
  name: string;
  email: string;
  phone: string;
  careerId: string;
  programId: string;
  leadSourceId: string;
  stateId: string;
  cityId: string;
  categoryId: string;
  admitTypeId: string;
  gender: string;
  fatherName: string;
  motherName: string;
}

export const biographicalFormInput = [
  // {
  //   id: 0,
  //   name: "name",
  //   label: "Name",
  //   type: "text",
  //   isrequired: true,
  // },
  // {
  //   id: 1,
  //   name: "email",
  //   label: "Email",
  //   type: "text",
  //   isrequired: true,
  // },
  // {
  //   id: 2,
  //   name: "phone",
  //   label: "Phone",
  //   type: "text",
  //   isrequired: true,
  // },
  // {
  //   id: 3,
  //   name: "academicCareerId",
  //   label: "Academic Career",
  //   type: "select",
  //   isrequired: true,
  // },
  // {
  //   id: 4,
  //   name: "academicProgramId",
  //   label: "Academic Program",
  //   type: "select",
  //   isrequired: true,
  // },
  // {
  //   id: 5,
  //   name: "leadSourceId",
  //   label: "Lead Source",
  //   type: "select",
  //   isrequired: true,
  // },
  // {
  //   id: 6,
  //   name: "currentCoreStateId",
  //   label: "State",
  //   type: "select",
  //   isrequired: true,
  // },
  // {
  //   id: 7,
  //   name: "currentCoreCityId",
  //   label: "City",
  //   type: "select",
  //   isrequired: true,
  // },
  {
    id: 8,
    name: "categoryId",
    label: "Category",
    type: "select",
    isrequired: true,
  },
  {
    id: 9,
    name: "admitTypeId",
    label: "Admit Type",
    type: "select",
    isrequired: true,
  },
  {
    id: 10,
    name: "gender",
    label: "Gender",
    type: "select",
    isrequired: true,
  },
  {
    id: 11,
    name: "fatherName",
    label: "Father's Name",
    type: "text",
    isrequired: true,
  },
  {
    id: 12,
    name: "motherName",
    label: "Mother's Name",
    type: "text",
    isrequired: true,
  },
];

export const getInitialValuesForBiographicalInfo = (data: BiographicalInfo, leadCaptureId: number | undefined | string) => {
  let initialValues = {
    // name: data.name,
    // email: data.email,
    // phone: data.phone,
    // academicCareerId: data.careerId,
    // academicProgramId: data.programId,
    // leadSourceId: data.leadSourceId,
    // currentCoreStateId: data.stateId,
    // currentCoreCityId: data.cityId,
    categoryId: data.categoryId || "",
    admitTypeId: data.admitTypeId || "",
    gender: data.gender,
    fatherName: data.fatherName || "",
    motherName: data.motherName || "",
    leadCaptureId: leadCaptureId,
  };
  return initialValues;
};

export const validationSchemaForBiographicalInfo = Yup.object({
  // name: Yup.string().required("Name is required"),
  // email: Yup.string().email("Invalid email format").required("Email is required"),
  // phone: Yup.string()
  //   .matches(/^\d{10}$/, "Phone number must be 10 digits")
  //   .required("Phone is required"),
  // academicCareerId: Yup.string().required("Academic Career is required"),
  // academicProgramId: Yup.string().required("Academic Program is required"),
  // leadSourceId: Yup.string().required("Lead Source is required"),
  // currentCoreStateId: Yup.string().required("State is required"),
  // currentCoreCityId: Yup.string().required("City is required"),
  categoryId: Yup.string().required("Category is required"),
  admitTypeId: Yup.string().required("Admit Type is required"),
  gender: Yup.string().required("Gender is required"),
  fatherName: Yup.string()
    .matches(/^[A-Za-z\s]+$/, "Only characters are allowed")
    .required("Father's Name is required"),
  motherName: Yup.string()
    .matches(/^[A-Za-z\s]+$/, "Only characters are allowed")
    .required("Mother's Name is required"),
});
