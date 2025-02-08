import * as Yup from "yup";

export const getValidationSchemaForScholarship = (isEnableForadditionalDiscount: boolean) => {
  let schema: Record<string, any> = {
    scholarshipCategory: Yup.string().required("Please select a Scholarship Category."),
    scholarshipScheme: Yup.string().required("Please select a Scholarship Scheme."),
    scholarshipSlab: Yup.string().required("Please select a Scholarship Slab."),
  };

  if (isEnableForadditionalDiscount) {
    schema.discountReason = Yup.string().required("Please select a Discount Reason.");
    schema.additionalDiscount = Yup.number()
      .required("Please select an additional discount or specify 0.")
      .max(5000, "Additional discount cannot exceed 5000")
      .typeError("Additional discount must be a number");
  }

  return Yup.object(schema);
};

export const initialValuesForScholarship = {
  scholarshipCategory: "",
  scholarshipScheme: "",
  scholarshipSlab: "",
  additionalDiscount: "0",
  discountReason: "",
};
