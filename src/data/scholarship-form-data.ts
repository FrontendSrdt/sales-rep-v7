import * as Yup from "yup";

export const getValidationSchemaForScholarship = (isEnableForadditionalDiscount: boolean) => {
  let schema: Record<string, any> = {
    scholarshipCategory: Yup.string().required("Please select a Scholarship Category."),
    scholarshipScheme: Yup.string().required("Please select a Scholarship Scheme."),
    scholarshipSlab: Yup.string().required("Please select a Scholarship Slab."),
  };

  if (isEnableForadditionalDiscount) {
    schema.discountReason = Yup.string().required("Please select a Discount Reason.");
    schema.additionalDiscount= Yup.number()
    .typeError('Additional Discount must be a number')
    .max(5000, 'Additional Discount cannot be greater than 5000')
    .positive('Additional Discount must be a positive number')
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
