import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import store, { RootState } from "../../store";
import { useNavigate, useParams } from "react-router-dom";
import { ReissueContractById } from "../../store/lead-with-decline-offer/save-ReissueContract-byid-slice";
import LoadingSpinner from "../../util/custom/ui/LoadingSpinner";

const ViewInstallmentFee: React.FC = () => {
  const navigate = useNavigate();
  const { isLoading: isLoadingForFeeDetails, FeeCalculationForDeclineByIdResponse } = useSelector((state: RootState) => state.getFeeCalculationForDeclineById);
  const { isError, responseOfReissueContract } = useSelector((state: RootState) => state.saveReissueContract);
  const { isLoading: isLoadingForLeadDeclineOfferReason, LeadOfferDeclineReasonByOfferIdResponse } = useSelector((state: RootState) => state.getLeadOfferDeclineReasonByOfferId);

  const { leadCaptureId } = useParams();

  const { yearlyTuitionFee, yearlyOtherFee, yearlyCourseFee, totalDiscount, scholarshipDiscount, specialDiscount, netFee, discountPercentage, registrationAmount } =
    FeeCalculationForDeclineByIdResponse;

  const [discount, setDiscount] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleSubmit = () => {
    if (!discount) {
      setValidationError("Special discount is required.");
      return;
    }

    const discountValue = parseFloat(discount);
    const netFeeValue = parseFloat(netFee || "0");

    if (isNaN(discountValue)) {
      setValidationError("Please enter a valid discount amount.");
      return;
    }

    if (discountValue > netFeeValue) {
      setValidationError("Special discount cannot exceed the net fee amount.");
      return;
    }

    setValidationError(null); // Clear validation error if all checks pass

    const payload = {
      leadCaptureId,
      updatedAmount: discountValue,
    };

    console.log("Payload submitted:", payload);
    store.dispatch(ReissueContractById(payload));
    setDiscount("");
  };
  useEffect(() => {
    if (!isError && Object.keys(responseOfReissueContract).length > 0) {
      setTimeout(() => {
        if (responseOfReissueContract) {
          console.log("inisde the redirect-IF");
          navigate("/view-decline-cases");
        }
      }, 500);
    }
  }, [isError, responseOfReissueContract]);

  const FeeDetailsData = [
    { id: 1, title: "Program Tution Fee", value: yearlyTuitionFee || "0" },
    { id: 2, title: "Other Fee", value: yearlyOtherFee || "0" },
    { id: 3, title: "Total Course Fee", value: yearlyCourseFee || "" },
    { id: 4, title: "Scholarship Applicable Fee", value: discountPercentage || "0 " },
    { id: 5, title: "Applicable Discount", value: scholarshipDiscount || "0" },
    { id: 6, title: "Additional Discount", value: specialDiscount || "0" },
    { id: 7, title: "Total Previous Discount", value: totalDiscount - scholarshipDiscount - specialDiscount || "0" },
    { id: 8, title: "Total Discount", value: totalDiscount || "0" },
    { id: 9, title: "Fee Payable After Discount", value: yearlyCourseFee - totalDiscount || "0" },
    { id: 10, title: "Adjusted Fee (Registration)", value: registrationAmount || "0" },
    { id: 11, title: "Net Fee", value: netFee || "0" },
  ];

  return (
    <div className="bg-white rounded-ms h-full mt-4 lg:mt-0">
      <div className=" w-full handle-table-box h-full ">
        <div className="w-full h-full">
          <h2 className="text-[20px] font-semibold text-[#3b82f6] mb-1 relative bottom-1">Fee Details</h2>

          <div className="w-full h-[calc(100%-67px)] border">
            <div className="w-full">
              {FeeDetailsData.slice(0, 3).map((ele) => (
                <div className={`w-full flex items-start`} key={ele.id}>
                  <p
                    className={` md:w-1/2 w-full max-w-[155px]  sm:max-w-[190px] md:max-w-full  px-2 sm:px-4 py-1  text-right ${
                      ele.title === "Total Course Fee" ? "font-semibold " : ""
                    }`}
                  >
                    {ele.title} :{" "}
                  </p>

                  {ele.title === "Total Course Fee" ? (
                    <div className="px-2 sm:px-4 py-1 md:w-1/2 flex justify-end w-full max-w-[125px] sm:max-w-[155px] md:max-w-full">
                      <div className="flex justify-between w-full  max-w-[100px]  sm:max-w-[130px] font-semibold">
                        <span>₹</span>
                        <p>{ele.value}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="px-2 sm:px-4 py-1 md:w-1/2 flex justify-end w-full max-w-[125px] sm:max-w-[155px] md:max-w-full">
                      <div className="flex justify-between w-full  max-w-[100px]  sm:max-w-[130px]">
                        <span>₹</span>
                        <p>{ele.value}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-4">
              {FeeDetailsData.slice(3, 8).map((ele) => (
                <div className="flex items-start" key={ele.id}>
                  <p
                    className={`md:w-1/2 w-full max-w-[155px]  sm:max-w-[190px] md:max-w-full  px-2 sm:px-4 py-1  text-right ${
                      ele.title === "Total Discount" ? "font-semibold " : ""
                    }`}
                  >
                    {ele.title} :{" "}
                  </p>

                  {ele.title === "Total Discount" ? (
                    <div className="px-2 sm:px-4 py-1 md:w-1/2 flex justify-end w-full max-w-[125px] sm:max-w-[155px] md:max-w-full">
                      <div className="flex justify-between w-full  max-w-[100px]  sm:max-w-[130px] font-semibold">
                        <span>₹</span>
                        <p>{ele.value}</p>
                      </div>
                    </div>
                  ) : ele.title === "Scholarship Applicable Fee" ? (
                    <p className="px-2 sm:px-4 py-1 md:w-1/2 flex justify-end w-full max-w-[125px] sm:max-w-[155px] md:max-w-full">
                      {ele.title !== "Scholarship Applicable Fee" && "₹"} {ele.value}% discount on tution fee
                    </p>
                  ) : (
                    <div className="px-2 sm:px-4 py-1 md:w-1/2 flex justify-end w-full max-w-[125px] sm:max-w-[155px] md:max-w-full">
                      <div className="flex justify-between w-full  max-w-[100px]  sm:max-w-[130px]">
                        <span>₹</span>
                        <p>{ele.value}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* <div>
              {FeeDetailsData.slice(7, 8).map((ele) => (
                <div className="flex items-start" key={ele.id}>
                  <p
                    className={`md:w-1/2 px-2 sm:px-4 py-1 w-full max-w-[155px]  sm:max-w-[190px] md:max-w-full text-right ${ele.title === "Total Discount" ? "font-semibold " : ""
                      }`}
                  >
                    {ele.title} :{" "}
                  </p>
                  <div className="px-2 sm:px-4 py-1 md:w-1/2 flex justify-end w-full max-w-[125px] sm:max-w-[155px] md:max-w-full ">
                    <div className="flex justify-between w-full  max-w-[100px]  sm:max-w-[130px]">
                      <span>₹</span>
                      <p>{ele.value}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div> */}

            <div className="mt-4">
              {FeeDetailsData.slice(8, FeeDetailsData.length).map((ele) => (
                <div className="flex items-start" key={ele.id}>
                  <p className="font-semibold md:w-1/2 w-full max-w-[155px]  sm:max-w-[190px] md:max-w-full  px-2 sm:px-4 py-1  text-right">{ele.title} : </p>
                  <div className="px-2 sm:px-4 py-1 md:w-1/2 flex justify-end w-full max-w-[125px] sm:max-w-[155px] md:max-w-full">
                    <div className="flex justify-between w-full  max-w-[100px]  sm:max-w-[130px] font-semibold">
                      <span>₹</span>
                      <p>{ele.value}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 border-t pt-4 ">
              <div className="flex items-start">
                <p className="font-semibold md:w-1/2 w-full max-w-[155px]  sm:max-w-[190px] md:max-w-full  px-2 sm:px-4 py-1  text-right">Declined Reason : </p>
                <div className="px-2 sm:px-4 py-1 md:w-1/2 flex flex-col items-end w-full max-w-[125px] sm:max-w-[155px] md:max-w-full">
                  <div className="flex justify-between gap-x-2 w-full items-center  max-w-[100px]  sm:max-w-[130px]">
                    <div className="-mt-5">
                      {isLoadingForLeadDeclineOfferReason && !isLoadingForFeeDetails && <LoadingSpinner size={10} centered={false} mainLoading={false} message="Loading!" />}
                    </div>
                    {!isLoadingForLeadDeclineOfferReason && !isLoadingForFeeDetails && <p className="font-semibold">{LeadOfferDeclineReasonByOfferIdResponse.declineReason}</p>}
                  </div>
                </div>
              </div>
              <div className="flex items-start">
                <p className="font-semibold md:w-1/2 w-full max-w-[155px]  sm:max-w-[190px] md:max-w-full  px-2 sm:px-4 py-1  text-right">Give Special Discount : </p>
                <div className="px-2 sm:px-4 py-1 md:w-1/2 flex flex-col items-end w-full max-w-[125px] sm:max-w-[155px] md:max-w-full">
                  <div className="flex justify-between gap-x-2 w-full  max-w-[100px]  sm:max-w-[130px]">
                    <span>₹</span>
                    <div>
                      <input
                        type="text"
                        id="specialDiscount"
                        value={discount}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDiscount(e.target.value)}
                        placeholder="Enter discount"
                        className="w-full px-1  text-gray-700  border-b-2 border-gray-300 focus:ring-0 focus:border-blue-500 focus:outline-none placeholder-gray-400"
                      />
                    </div>
                  </div>
                  {validationError && <p className="text-red-500 text-sm mt-1">{validationError}</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 flex justify-end">
        <button className="bg-[#3b82f6] px-2 sm:px-4 py-1.5 text-white rounded-md " onClick={() => handleSubmit()}>
          Reissue Contract
        </button>
      </div>
    </div>
  );
};

export default ViewInstallmentFee;
