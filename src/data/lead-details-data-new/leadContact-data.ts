import * as Yup from "yup";

export const formInputsForContact = [
  {
    id: 1,
    heading: "Contacts",
    inputFields: [
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
  },
];

export const getInitialValuesForContact = (contact: any, leadCaptureId: any) => {
  let getInitialValuesForContact = {
    contact: Array.isArray(contact)
      ? contact.map((c) => ({
          leadCaptureId: leadCaptureId,
          contactName: c?.contactName || "",
          contactRelation: c?.contactRelation || "",
          contactNumber: c?.contactNumber || "",
          primary: c?.primary || false,
        }))
      : [],
  };

  return getInitialValuesForContact;
};

export const validationSchemaForContact = Yup.object({
  contact: Yup.array().of(
    Yup.object().shape({
      contactName: Yup.string().required("Contact Name is required"),
      contactRelation: Yup.string().required("Relation is required"),
      contactNumber: Yup.string().required("Contact Number is required"),
      primary: Yup.boolean(),
    })
  ),
});
