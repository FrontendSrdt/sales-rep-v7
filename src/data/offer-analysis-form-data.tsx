import * as Yup from "yup";

export const formInputForOfferAnalysis = [
  {
    feeDetails: [
      {
        id: 0,
        label: "Program Tution Fee",
        type: "text",
        name: "yearlyTuitionFee",
        isReadOnly: true,
      },
      {
        id: 1,
        label: "Other Fee",
        type: "text",
        name: "yearlyOtherFee",
        isReadOnly: true,
      },
      {
        id: 2,
        label: "Total Course Fee",
        type: "text",
        name: "yearlyCourseFee",
        isReadOnly: true,
      },
      {
        id: 3,
        label: "Scholarship Applicable Fee",
        type: "text",
        name: "discountPercentage",
        isReadOnly: true,
      },
      {
        id: 4,
        label: "Applicable Discount",
        type: "text",
        name: "scholarshipDiscount",
        isReadOnly: true,
      },
      {
        id: 5,
        label: "Additional Discount",
        type: "text",
        name: "specialDiscount",
        isReadOnly: true,
      },
      {
        id: 6,
        label: "Total Discount",
        type: "text",
        name: "totalDiscount",
        isReadOnly: true,
      },
      {
        id: 7,
        label: "Course Fee after Discount",
        type: "text",
        name: "netFee",
        isReadOnly: true,
      },
    ],
    installmentDetails: [
      {
        id: 0,
        label: "Program Installment",
        type: "text",
        name: "yearlyInstallment",
      },
      {
        id: 1,
        label: "Other Installment",
        type: "text",
        name: "yearlyOtherInstallment",
      },
      {
        id: 2,
        label: "Total Installment",
        type: "text",
        name: "yearlyCourseInstallment",
      },
    ],
  },
];

export const getInitialValuesForOfferDetails = (FeeCalculationByProgramIdResponse: any) => {
  let initialValues = {
    yearlyTuitionFee: FeeCalculationByProgramIdResponse.programTuitionFee,
    yearlyOtherFee: FeeCalculationByProgramIdResponse.otherFee,
    yearlyCourseFee: FeeCalculationByProgramIdResponse.totalCourseFee,
    discountPercentage: FeeCalculationByProgramIdResponse.percentageDiscount,
    scholarshipDiscount: FeeCalculationByProgramIdResponse.percentageDiscount,
    specialDiscount: FeeCalculationByProgramIdResponse.additionalDiscount,
    totalDiscount: FeeCalculationByProgramIdResponse.totalDiscount,
    netFee: FeeCalculationByProgramIdResponse.courseFeeAfterDiscount,
    yearlyInstallment: "",
    yearlyOtherInstallment: "",
    yearlyCourseInstallment: "",
  };

  return initialValues;
};

export const validationSchemaForOfferAnalysis = Yup.object().shape({
  yearlyTuitionFee: Yup.number().typeError("Yearly Tuition Fee must be a number").required("Yearly Tuition Fee is required"),
  yearlyOtherFee: Yup.number().typeError("Yearly Other Fee must be a number").required("Yearly Other Fee is required"),
  yearlyCourseFee: Yup.number().typeError("Total Course Fee must be a number").required("Total Course Fee is required"),
  discountPercentage: Yup.number().typeError("Scholarship Applicable Fee must be a number").required("Scholarship Applicable Fee is required"),
  scholarshipDiscount: Yup.number().typeError("Applicable Discount must be a number").required("Applicable Discount is required"),
  specialDiscount: Yup.number().typeError("Additional Discount must be a number").required("Additional Discount is required"),
  totalDiscount: Yup.number().typeError("Total Discount must be a number").required("Total Discount is required"),
  netFee: Yup.number().typeError("Course Fee after Discount must be a number").required("Course Fee after Discount is required"),
  yearlyInstallment: Yup.number().typeError("Program Installment must be a number").required("Program Installment is required"),
  yearlyOtherInstallment: Yup.number().typeError("Other Installment must be a number").required("Other Installment is required"),
  yearlyCourseInstallment: Yup.number().typeError("Total Installment must be a number").required("Total Installment is required"),
});
