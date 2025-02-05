import * as Yup from "yup";

// For Combined Payload

export const validationSchemaForAll = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email format").required("Email is required"),
  phone: Yup.string()
    .matches(/^[0-9]+$/, "Phone number must contain only digits")
    .length(10, "Phone number must be exactly 10 digits")
    .required("Phone is required"),
  leadSourceId: Yup.string().required("Lead source is required"),
  currentCoreStateId: Yup.string().required("State is required"),
  currentCoreCityId: Yup.string().required("City is required"),
  academicCareerId: Yup.string().required("Academic Career is required"),
  academicProgramId: Yup.string().required("Program is required"),
  categoryId: Yup.string().required("Category is required"),
  admitTypeId: Yup.string().required("Admit Type is required"),
  gender: Yup.string().required("Gender is required"),
  parentGuardianName: Yup.string().required("Parent Guardian Name is required"),
  parentGuardianContact: Yup.string()
    .matches(/^[0-9]+$/, "Phone number must contain only digits")
    .length(10, "Phone number must be exactly 10 digits")
    .required("Parent Guardian Contact Name is required"),
  contact: Yup.array().of(
    Yup.object({
      contactName: Yup.string()
        .nullable() // Allow empty values to be treated as nullable
        .required("Contact Name is required")
        .test("contact_name-required", "Contact Name is required", function (value) {
          const { contactNumber } = this.parent; // Access the current object (contact_name, contact_number)
          if (value || contactNumber) {
            return true; // If either contact_name or contact_number is filled, don't trigger error
          }
          return false; // Trigger error if neither is filled
        }),
      contactRelation: Yup.string().required("Relation is required"),
      contactNumber: Yup.string()
        .nullable() // Allow empty values to be treated as nullable
        .required("Contact Number is required")
        .test("contact_number-required", "Contact Number is required", function (value) {
          const { contactNumber } = this.parent; // Access the current object (contact_name, contact_number)
          if (value || contactNumber) {
            return true; // If either contact_name or contact_number is filled, don't trigger error
          }
          return false; // Trigger error if neither is filled
        }),
      primary: Yup.boolean().required("Primary is required"),
    })
  ),
  country: Yup.string().required("Country is Required"),
  coreStateId: Yup.string().required("State is Required"),
  coreCityId: Yup.string().required("City is Required"),
  address: Yup.string().required("Address is Required"),
  country2: Yup.string().required("Country is Required"),
  coreStateId2: Yup.string().required("State is Required"),
  coreCityId2: Yup.string().required("City is Required"),
  address2: Yup.string().required("Address is Required"),
  school: Yup.string().required("10th is required"),
  coreTenthBoardId: Yup.string().required("10th_board is required"),
  coreTenthMarkingSchemeId: Yup.string().required("10th_marketing_scheme is required"),
  tenthMarksOrGrade: Yup.string().required("10th_marks_grade is required"),
  tenth_plus_2_type: Yup.string().required("10th_plus_2_type is required"),
});

export const initialValueForAll = {
  name: "",
  email: "",
  phone: "",
  leadSourceId: "",
  currentCoreStateId: "",
  currentCoreCityId: "",
  academicCareerId: "",
  academicProgramId: "",
  categoryId: "",
  admitTypeId: "",
  gender: "",
  fatherName: "",
  motherName: "",
  contact: [
    {
      contactName: "",
      contactRelation: "",
      contactNumber: "",
      primary: false,
    },
  ],
  country: "India",
  coreStateId: "",
  coreCityId: "",
  addressLine1: "",
  addressLine2: "",
  pin1: "",
  country2: "India",
  coreStateId2: "",
  coreCityId2: "",
  addressLine21: "",
  addressLine22: "",
  pin2: "",
  school: "",
  coreTenthBoardId: "",
  coreTenthMarkingSchemeId: "",
  tenthMarksOrGrade: "",
  tenth_plus_2_type: "",
  twelfthSchool: "",
  coreTwelfthBoardId: "",
  coreTwelfthResultStatus: "",
  coreTwelfthMarkingSchemeId: "",
  TwelfthMarksOrGrade: "",
  diplomaSchool: "",
  coreDiplomaBoardId: "",
  coreDiplomaResultStatus: "",
  coreDiplomaMarks: "",
  ugSchool: "",
  coreUgResultStatus: "",
  coreUgMarks: "",
};

// Biographical Information configuration

export const validationSchemaForBi = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email format").required("Email is required"),
  phone: Yup.string()
    .matches(/^[0-9]+$/, "Phone number must contain only digits")
    .length(10, "Phone number must be exactly 10 digits")
    .required("Phone is required"),
  leadSourceId: Yup.string().required("Lead Source is required"),
  coreStateId: Yup.string().required("State is required"),
  coreCityId: Yup.string().required("City is required"),
  fatherName: Yup.string().required("Parent Guardian Name"),
  motherName: Yup.string().required("Parent Guardian Name"),
  academicCareerId: Yup.string().required("Academic Career is required"),
  academicProgramId: Yup.string().required("Program is required"),
  categoryId: Yup.string().required("Category is required"),
  admitTypeId: Yup.string().required("Admit Type is required"),
  gender: Yup.string().required("Gender is required"),
});

export const initialValueForBI = {
  name: "",
  email: "",
  phone: "",
  leadSourceId: "",
  coreStateId: "",
  coreCityId: "",
  parentGuardianName: "",
  parentGuardianContact: "",
  academicCareerId: "",
  academicProgramId: "",
  categoryId: "",
  admitTypeId: "",
  gender: "",
  leadStages: [],
};

// Related Contact Number

export const validationSchemaForContact = Yup.object({
  contact: Yup.array().of(
    Yup.object().shape({
      contact_name: Yup.string().required("Contact Name is required"),
      relation: Yup.string().required("Relation is required"),
      contact_number: Yup.string().required("Contact Number is required"),
      is_primary: Yup.boolean().required("Primary is required"),
    })
  ),
});

export const initialValueForContact = {
  contact: [
    {
      contact_name: "",
      relation: "",
      contact_number: "",
      is_primary: false,
    },
  ],
};

// Address configuration

export const validationSchemaForAddress = Yup.object({
  country: Yup.string().required("Country is Required"),
  stateId: Yup.string().required("State is Required"),
  cityId: Yup.string().required("City is Required"),
  address: Yup.string().required("Address is Required"),
  country2: Yup.string().required("Country is Required"),
  stateId2: Yup.string().required("State is Required"),
  cityId2: Yup.string().required("City is Required"),
  address2: Yup.string().required("Address is Required"),
});

export const initialValueForAddress = {
  country: "India",
  stateId: "",
  cityId: "",
  address: "",
  country2: "",
  stateId2: "",
  cityId2: "",
  address2: "",
};

// Academic Details configuration

export const validationSchemaForAcademicDetails = Yup.object({
  tenth: Yup.string().required("10th is required"),
  tenth_board: Yup.string().required("10th board is required"),
  tenth_marking_scheme: Yup.string().required("10th Marking Scheme is required"),
  tenth_marks_grade: Yup.string().required("10th Marks Grade is required"),
  tenth_plus_2_type: Yup.string().required("10th Plus 2 Type is required"),
  twelfth_school: Yup.string().required("12th School is required"),
  twelfth_board: Yup.string().required("12th Board is required"),
  twelfth_result_status: Yup.string().required("12th Result is required"),
  twelfth_marking_scheme: Yup.string().required("12th Marking Scheme is required"),
  twelfth_marks_or_grade: Yup.string().required("12th Marks or Grade is required"),
});

export const initialValueForAcademicDetails = {
  tenth: "",
  tenth_board: "",
  tenth_marking_scheme: "",
  tenth_marks_grade: "",
  tenth_plus_2_type: "",
  twelfth_school: "",
  twelfth_board: "",
  twelfth_result_status: "",
  twelfth_marking_scheme: "",
  twelfth_marks_or_grade: "",
};

// statc Options

export const genderOptions = [
  {
    id: 1,
    value: "MALE",
    name: "Male",
  },
  {
    id: 2,
    value: "FEMALE",
    name: "Female",
  },
  {
    id: 3,
    value: "OTHERS",
    name: "Others",
  },
];

export const resultStatusOptions = [
  {
    id: 1,
    value: "DECLARED",
    name: "Declared",
  },
  {
    id: 2,
    value: "AWAITED",
    name: "Awaited",
  },
];

export const typesForSectionOptions = [
  {
    id: 1,
    value: "TWELFTH",
    name: "12th",
  },
  {
    id: 2,
    value: "DIPLOMA",
    name: "Diploma",
  },
];

export const getValidationSchema = ({
  isOpenFor12th,
  isOpenForDiploma,
  isNotUndergraduate,
}: {
  isOpenFor12th: boolean;
  isOpenForDiploma: boolean;
  isNotUndergraduate: boolean;
}) => {
  let schema: Record<string, Yup.Schema<any>> = {
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    phone: Yup.string()
      .matches(/^[0-9]+$/, "Phone number must contain only digits")
      .length(10, "Phone number must be exactly 10 digits")
      .required("Phone is required"),
    leadSourceId: Yup.string().required("Lead source is required"),
    currentCoreStateId: Yup.string().required("State is required"),
    currentCoreCityId: Yup.string().required("City is required"),
    academicCareerId: Yup.string().required("Academic Career is required"),
    academicProgramId: Yup.string().required("Program is required"),
    categoryId: Yup.string().required("Category is required"),
    admitTypeId: Yup.string().required("Admit Type is required"),
    gender: Yup.string().required("Gender is required"),
    // fatherName: Yup.string().required("Father's Name is required"),
    // motherName: Yup.string().required("Mother's Name is required"),
    contact: Yup.array().of(
      Yup.object().shape({
        contactName: Yup.string().required("Contact Name is required"),
        contactRelation: Yup.string().required("Relation is required"),
        contactNumber: Yup.string().required("Contact Number is required"),
        primary: Yup.boolean(),
      })
    ),
    country: Yup.string().required("Country is Required"),
    coreStateId: Yup.string().required("State is Required"),
    coreCityId: Yup.string().required("City is Required"),
    addressLine1: Yup.string().required("Address Line 1 is Required"),
    addressLine2: Yup.string().required("Address Line 2 is Required"),
    pin1: Yup.string()
      .matches(/^\d{6}$/, "Pincode must be a 6-digit number")
      .required("Pincode is required"),
    country2: Yup.string().required("Country is Required"),
    coreStateId2: Yup.string().required("State is Required"),
    coreCityId2: Yup.string().required("City is Required"),
    addressLine21: Yup.string().required("Address Line 1 is Required"),
    addressLine22: Yup.string().required("Address Line 2 is Required"),
    pin2: Yup.string()
      .matches(/^\d{6}$/, "Pincode must be a 6-digit number")
      .required("Pincode is required"),
    school: Yup.string().required("10th is required"),
    coreTenthBoardId: Yup.string().required("10th board is required"),
    coreTenthMarkingSchemeId: Yup.string().required("10th marking scheme is required"),
    tenthMarksOrGrade: Yup.string()
      .required("10th marks/grade is required")
      .matches(/^\d{1,4}$/, "10th marks/grade should be a numeric value with a maximum of 4 digits"),
    tenth_plus_2_type: Yup.string().required("10th Type is required"),
  };

  // Add 12th section fields if `isOpenFor12th` is true
  if (isOpenFor12th) {
    schema = {
      ...schema,
      twelfthSchool: Yup.string().required("12th School is required"),
      coreTwelfthBoardId: Yup.string().required("12th Board is required"),
      coreTwelfthResultStatus: Yup.string().required("12th Board Result is required"),
      coreTwelfthMarkingSchemeId: Yup.string().required("12th Scheme is required"),
      TwelfthMarksOrGrade: Yup.string().required("12th Grade is required."),
    };
  }

  // Add Diploma section fields if `isOpenForDiploma` is true
  if (isOpenForDiploma) {
    schema = {
      ...schema,
      diplomaSchool: Yup.string().required("Diploma School is required"),
      coreDiplomaBoardId: Yup.string().required("Diploma Board is required"),
      coreDiplomaResultStatus: Yup.string().required("Diploma Result is required"),
      coreDiplomaMarks: Yup.string().required("Diploma Marks are required."),
    };
  }

  // Add UG section fields if UG should be open and it’s not undergraduate-specific
  if (isOpenForDiploma && isNotUndergraduate !== false) {
    schema = {
      ...schema,
      ugSchool: Yup.string().required("UG School is required"),
      coreUgResultStatus: Yup.string().required("UG Result is required"),
      coreUgMarks: Yup.string().required("UG Marks are required"),
    };
  }

  return Yup.object(schema);
};
