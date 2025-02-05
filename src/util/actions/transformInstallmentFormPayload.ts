export function transformInstallmentTypePayload(feeResponse: any, formPayload: any, leadCaptureId: any, leadScholarshipDetailsId: any) {
  console.log(leadScholarshipDetailsId)
  // Map API response keys to final payload schema keys
  const mappedfeeResponse = {
    yearlyTuitionFee: feeResponse.programTuitionFee,
    yearlyOtherFee: feeResponse.otherFee,
    yearlyCourseFee: feeResponse.totalCourseFee,
    discountPercentage: feeResponse.percentageDiscount,
    scholarshipDiscount: feeResponse.applicableDiscount,
    specialDiscount: feeResponse.additionalDiscount,
    totalDiscount: feeResponse.totalDiscount,
    netFee: feeResponse.courseFeeAfterDiscount,
    status: "validated", // Assuming this is constant
    applicableOn: feeResponse.scholarshipApplicableOn || "S", // Default "S" if not provided
  };

  // Construct the final payload
  const finalPayload = {
    leadFeeDetailsDTO: {
      leadCaptureId: leadCaptureId || null,
      leadScholarshipDetailsId: leadScholarshipDetailsId || null,
      leadFeeInstallmentDetails: formPayload, // Using the form payload for installments
      ...mappedfeeResponse, // Merged mapped API response
    },
  };

  return finalPayload;
}
