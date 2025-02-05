export function transformApiResponse(response: any) {
  console.log("transform fee calculation data============ ", response);
  const FeeDetailsData = [
    {
      id: 1,
      title: "Program Tution Fee (Yearly)",
      value: response.programTuitionFee,
    },
    {
      id: 2,
      title: "Other Fee",
      value: response.otherFee,
    },
    {
      id: 3,
      title: "Total Course Fee",
      value: response.totalCourseFee,
    },
    {
      id: 4,
      title: "Applicable Scholarship Discount ",
      value: `${response.percentageDiscount}% Discount on ${response.scholarshipApplicableOn === "S" ? "Semester Tuition Fee" : "Yearly Tuition Fee"}`,
    },
    {
      id: 5,
      title: "Applicable Discount",
      value: response.applicableDiscount,
    },
    {
      id: 6,
      title: "Additional Discount",
      value: response.additionalDiscount,
    },
    {
      id: 7,
      title: "Total Previous Discount",
      value: response.totalDiscount - response.applicableDiscount - response.additionalDiscount,
    },
    {
      id: 8,
      title: "Total Discount",
      value: response.totalDiscount,
    },
    {
      id: 9,
      title: "Fee Payable After Discount",
      value: response.totalCourseFee - response.totalDiscount,
    },
    {
      id: 10,
      title: "Adjusted Fee (Registration)",
      value: response.registrationAmount,
    },
    {
      id: 11,
      title: "Net Fee",
      value: response.courseFeeAfterDiscount,
    },
  ];

  return FeeDetailsData;
}

// export function formatNumber(num: any) {
//   return Number(num).toLocaleString("en-IN", {
//     minimumFractionDigits: 2,
//     maximumFractionDigits: 2,
//   });
// }
