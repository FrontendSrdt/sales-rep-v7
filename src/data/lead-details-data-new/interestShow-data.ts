import * as Yup from "yup";

export const formInputsForInterestShown = [
  {
    id: 1,
    heading: "Interest Shown",
    inputFields: [
      {
        id: 1,
        tableInputsConfig: [
          {
            id: 1,
            heading: "Academic Career",
            tableInputs: [
              {
                id: 1,
                name: "academicCareerId",
                type: "select",
              },
            ],
          },
          {
            id: 2,
            heading: "Academic Program",
            tableInputs: [
              {
                id: 1,
                name: "academicProgramId",
                type: "text",
              },
            ],
          },
          {
            id: 3,
            heading: "State",
            tableInputs: [
              {
                id: 1,
                name: "currentCoreStateId",
                type: "select",
              },
            ],
          },
          {
            id: 4,
            heading: "City",
            tableInputs: [
              {
                id: 1,
                name: "currentCoreCityId",
                type: "select",
              },
            ],
          },
          {
            id: 5,
            heading: "Lead Source",
            tableInputs: [
              {
                id: 1,
                name: "leadSourceId",
                type: "select",
              },
            ],
          },
          {
            id: 6,
            heading: "Active",
            tableInputs: [
              {
                id: 1,
                name: "active",
                type: "radio",
              },
            ],
          },
        ],
      },
    ],
  },
];

export const getInitialValuesForInterestShown = (interest: any, leadCaptureId: any) => {
  let getInitialValuesForInterestShown = {
    interest: Array.isArray(interest)
      ? interest.map((item) => ({
          leadCaptureId: leadCaptureId,
          academicCareerId: item?.academicCareerId || "",
          academicProgramId: item?.academicProgramId || "",
          currentCoreStateId: item?.coreStateId || "",
          currentCoreCityId: item?.coreCityId || "",
          leadSourceId: item?.leadSourceId || "",
          active: item?.status === "ACTIVE" ? true : false,
        }))
      : [],
  };

  return getInitialValuesForInterestShown;
};

export const validationSchemaForInterestShown = Yup.object({
  interest: Yup.array().of(
    Yup.object().shape({
      academicCareerId: Yup.string().required("Academic Career is required"),
      academicProgramId: Yup.string().required("Academic Program is required"),
      leadSourceId: Yup.string().required("Lead Source is required"),
      currentCoreStateId: Yup.string().required("State is required"),
      currentCoreCityId: Yup.string().required("City is required"),
      active: Yup.boolean(),
    })
  ),
});
