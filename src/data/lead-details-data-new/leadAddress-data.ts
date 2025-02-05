import * as Yup from "yup";

export const addressFormInput = [
  {
    id: 1,
    heading: "Address (Permanent)",
    inputFields: [
      {
        id: 0,
        name: "addressLine11",
        label: "Address Line 1",
        type: "text",
        isrequired: true,
      },
      {
        id: 2,
        name: "addressLine12",
        label: "Address Line 2",
        type: "text",
        isrequired: true,
      },
      {
        id: 3,
        name: "country1",
        label: "Country",
        type: "text",
        isrequired: true,
        isReadOnly: true,
      },
      {
        id: 4,
        name: "coreStateId",
        label: "State",
        type: "select",
        isrequired: true,
      },
      {
        id: 5,
        name: "coreCityId",
        label: "City",
        type: "select",
        isrequired: true,
      },
      {
        id: 6,
        name: "pin1",
        label: "Pin",
        type: "text",
        isrequired: true,
      },
      {
        id: 7,
        type: "checkbox",
        name: "corresponding",
        label: "Corresponding Address same as  Permanent",
        isrequired: true,
      },
    ],
  },
  {
    id: 2,
    groupLabel: "Address (Correspondance)",
    inputFields: [
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
];

export const getInitialValuesForAddress = (data: any, leadCaptureId: any) => {
  let getInitialValuesForAddress = {
    leadCaptureId:leadCaptureId,
    addressLine11: "",
    addressLine12: "",
    country1: "",
    coreStateId: "",
    coreCityId: "",
    pin1: "",
    corresponding: false,

    addressLine21: "",
    addressLine22: "",
    country2: "",
    coreStateId2: "",
    coreCityId2: "",
    pin2: "",
  };

  data.forEach((address: any) => {
    if (address.addressType === "PERMANENT") {
      getInitialValuesForAddress.addressLine11 = address.addressLine1;
      getInitialValuesForAddress.addressLine12 = address.addressLine2;
      getInitialValuesForAddress.country1 = address.country;
      getInitialValuesForAddress.coreStateId = address.coreStateId.toString();
      getInitialValuesForAddress.coreCityId = address.coreCityId.toString();
      getInitialValuesForAddress.pin1 = address.pin;
    } else if (address.addressType === "CORRESPONDENCE") {
      getInitialValuesForAddress.addressLine21 = address.addressLine1;
      getInitialValuesForAddress.addressLine22 = address.addressLine2;
      getInitialValuesForAddress.country2 = address.country;
      getInitialValuesForAddress.coreStateId2 = address.coreStateId.toString();
      getInitialValuesForAddress.coreCityId2 = address.coreCityId.toString();
      getInitialValuesForAddress.pin2 = address.pin;
    }
  });

  return getInitialValuesForAddress;
};

export const validationSchemaForAddress = Yup.object({
  addressLine11: Yup.string().required("Address Line 1 is required"),
  addressLine12: Yup.string().required("Address Line 2 is required"),
  country1: Yup.string().required("Country is required"),
  coreStateId: Yup.string().required("State is required"),
  coreCityId: Yup.string().required("City is required"),
  pin1: Yup.string()
    .matches(/^\d{6}$/, "Pin must be 6 digits")
    .required("Pin is required"),
  addressLine21: Yup.string().required("Address Line 1 is required"),
  addressLine22: Yup.string().required("Address Line 2 is required"),
  country2: Yup.string().required("Country is required"),
  coreStateId2: Yup.string().required("State is required"),
  coreCityId2: Yup.string().required("City is required"),
  pin2: Yup.string()
    .matches(/^\d{6}$/, "Pin must be 6 digits")
    .required("Pin is required"),
});
