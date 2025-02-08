export function transformInstallmentTypePayload(feeResponse: any, formPayload: any, leadCaptureId: any, leadEnquiryId: any, scholarshipData: any, scholarshipDetailsId: any) {
  // Map API response keys to final payload schema keys
  const mappedfeeResponse = {
    leadScholarshipDetailsSalesRepId: scholarshipDetailsId || "",
    yearlyTuitionFee: feeResponse.programTuitionFee,
    yearlyOtherFee: feeResponse.otherFee,
    yearlyCourseFee: feeResponse.totalCourseFee,
    discountPercentage: feeResponse.percentageDiscount,
    scholarshipDiscount: feeResponse.applicableDiscount,
    specialDiscount: feeResponse.specialDiscount,
    totalDiscount: feeResponse.totalDiscount,
    netFee: feeResponse.courseFeeAfterDiscount,
    status: "validated", // Assuming this is constant
    applicableOn: feeResponse.scholarshipApplicableOn || "S",
    // Default "S" if not provided
    leadEnquiryId: leadEnquiryId,
    additional_discount: scholarshipData.additionalDiscount,
    additional_discount_reason: scholarshipData.discountReason,
  };

  const scholarshipResponse = {
    leadScholarshipDetailsSalesRepDTO: {
      leadCaptureId: leadCaptureId || null,
      coreScholarshipSlabId: scholarshipData.scholarshipSlab,
      scholarshipSchemeId: scholarshipData.scholarshipScheme,
      scholarshipCategoryId: scholarshipData.scholarshipCategory,
      leadEnquiryId: leadEnquiryId,
      applicableOn: feeResponse.scholarshipApplicableOn || "S",
    },
  };

  // Construct the final payload
  const finalPayload = {
    leadFeeDetailsDTO: {
      leadCaptureId: leadCaptureId || null,
      leadFeeInstallmentDetails: formPayload, // Using the form payload for installments
      ...mappedfeeResponse, // Merged mapped API response
    },
    ...scholarshipResponse,
  };

  return finalPayload;
}
