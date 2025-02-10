import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import store, { RootState } from "../../../../store";
import { sectionsConfigForLeadUpdate } from "../../../../data/manage-leads/ManageLeadsData";
import { transformData } from "../../genral/transformPayloadForPreview";
import LoadingSpinner from "../../../../util/custom/ui/LoadingSpinner";
// import InstallmentAndOfferAnalysis from "./InstallmentAndOfferAnalysis";
import { CustomDetailsTable } from "../../../../util/custom/leadsFormat/CustomDetailsTable";
import { OfferAnalysisColumn } from "./OfferAnalysisColumn";
import HistoryInstallmentAndOfferAnalysis from "./HistoryInstallmentAndOfferAnalysis";
import InstallmentAndOfferAnalysisNew from "./re-calculate/InstallmentAndOfferAnalysisNew";
import Scholarship from "./re-calculate/Scholarship";
import { getAllDiscountReason } from "../../../../store/scholarship-get/get-all-discountReason-slice";

// Interf
// import { resetPackageDealByLeadCaptureIdResponse } from "../../../../store/package-deal/get-package-deal-by-programId-leadCaptureId-slice";

// Interface to define props for the OfferAnalysis component
interface OfferAnalysisProps {
  isEnablePackageDeal: boolean;
  onEnableOfferGrantHandler: (val: any) => void; // Function to handle to enable grant the offer
  handleLockOffer: () => void; // Function to handle locking the offer
  ongetLeadOfferHistory: any; // Function to get lead offer history
}

// Interface to define the structure of scholarship details
interface ScholarshipDetails {
  leadScholarshipDetailsId: number;
  leadCaptureId: number;
  coreScholarshipSlabId: number;
  percentageDiscount: number;
  applicableOn: string;
  status: string;
  scholarshipSchemeId: number;
  scholarshipCategoryId: number;
  scholarshipSlabDescription: string;
  scholarshipSchemeDescription: string;
  scholarshipCategoryDescription: string;
}

const OfferAnalysis: React.FC<OfferAnalysisProps> = ({ ongetLeadOfferHistory, isEnablePackageDeal, onEnableOfferGrantHandler }) => {
  // const dispatch = store.dispatch;
  // const [isEnablePackageDeal, setIsEnablePackageDeal] = useState<boolean>(false);

  // Retrieve necessary data from the Redux store
  const { findLeadScholarshipDetailsResponse } = useSelector((state: RootState) => state.findLeadScholarshipDetails);
  const { leadAdditionalDetailsDataById } = useSelector((state: RootState) => state.getLeadAdditionalDetailsDataById);
  const { isLoading: isLoadingForLeadOfferByLeadId, getLeadOfferByLeadIdResponse } = useSelector((state: RootState) => state.getLeadOfferByLeadId);
  const { isLoading: isLoadingForLeadOfferDetails, leadOfferHistoryByOfferIdResponse } = useSelector((state: RootState) => state.leadOfferHistoryByOfferId);
  const { isLoading: IsLoadingForFeeDetailsV2, FeeDetailsV2Response } = useSelector((state: RootState) => state.getFeeDetailsV2);
  const { isLoading: isLoadingForLeadScholarship } = useSelector((state: RootState) => state.getAllScholarshipOption);

  // console.log("leadOfferHistoryByOfferIdResponse========", leadOfferHistoryByOfferIdResponse);
  // console.log("isEnablePackageDeal", isEnablePackageDeal);
  // Transform lead details data for preview
  const transformedData = transformData(leadAdditionalDetailsDataById, sectionsConfigForLeadUpdate);

  // Extract the first card data for display
  const cardsData = transformedData.slice(0, 1);

  // Map the scholarship details to display items
  const findleadScholarDetailsData: ScholarshipDetails = findLeadScholarshipDetailsResponse;
  const scholarshipItems = [
    { name: "Scholarship Category Description", value: findleadScholarDetailsData.scholarshipCategoryDescription },
    { name: "Scholarship Scheme Description", value: findleadScholarDetailsData.scholarshipSchemeDescription },
    { name: "Scholarship Slab Description", value: findleadScholarDetailsData.scholarshipSlabDescription },
    {
      name: "Percentage Discount",
      value: `${findleadScholarDetailsData.percentageDiscount}% Discount on ${findleadScholarDetailsData.applicableOn === "Y" ? "Yearly Tution Fee" : "Semester Tution Fee"}`,
    },
    {
      name: "Applicable On",
      value: findleadScholarDetailsData.applicableOn === "Y" ? "Yearly Tution Fee" : "Semester Tution Fee",
    },
  ];

  useEffect(() => {
    store.dispatch(getAllDiscountReason());
  }, [store.dispatch]);
  return (
    <>
      {/* Show loading spinner while fetching fee calculation details */}
      {/* {isLoadingForFeeCalculation && <LoadingSpinner size={35} mainLoading={true} message="Fetching Details.." centered={true} />} */}
      {/* Main content section */}

      <div className="py-3 px-3">
        {/* Offer analysis table */}
        {getLeadOfferByLeadIdResponse.length > 0 && (
          <div cred-500ame="bg-white rounded-md p-5 w-full">
            <div className="w-full overflow-x-auto">
              <CustomDetailsTable columns={OfferAnalysisColumn} data={getLeadOfferByLeadIdResponse} onRowClick={ongetLeadOfferHistory} />
            </div>
          </div>
        )}

        {/* Scholarship and general info sections */}
        <div className="mt-4">
          <div className="w-full rounded-md bg-white">
            <div className="w-full handle-table-box p-5">
              {/* General info section */}
              <div className="w-full">
                <h2 className="text-[20px] font-semibold text-[#3b82f6] mb-2">General Info Selected by Lead</h2>
                {cardsData.map((card: any) => (
                  <div className="w-full overflow-x-auto" key={card.id}>
                    <table className="border w-full">
                      <tbody>
                        {card.previewConfigItems.map((item: any) => (
                          <tr key={item.id} className="border">
                            <td className="font-semibold border w-1/2 px-4 py-1 text-nowrap">{item.name} :</td>
                            <td className="border w-1/2 px-4 py-1 text-nowrap">{item.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ))}
              </div>

              {/* Scholarship details section */}
              <div className="w-full mt-5 lg:mt-0">
                <h2 className="text-[20px] font-semibold text-[#3b82f6] mb-2">Scholarship Options Selected by Lead</h2>
                <div className="w-full overflow-x-auto">
                  <table className="w-full border">
                    <tbody className="border">
                      {scholarshipItems.map((item, index) => (
                        <tr key={index} className="">
                          <td className="px-4 py-1 font-semibold border w-1/2 text-nowrap">{item.name} :</td>
                          <td className="px-4 py-1 border w-1/2 text-nowrap">{item.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* {isEnablePackageDeal && (
              <div className="mt-4">
                <ReCalculateInput />
              </div>
            )} */}

          {/* scholarship none section */}

          <>
            {/* <div className="bg-white rounded-md w-full mt-4">
              <div className="flex items-center p-5">
                <input
                  type="checkbox"
                  id="pckg"
                  name="pckg"
                  checked={isEnablePackageDeal} // Bind the state to the checkbox
                  onChange={onEnableOfferGrantHandler} // Update state on change
                  className="mr-2"
                />
                <label htmlFor="pckg" className="text-gray-700 cursor-pointer">
                  Grant Package Deal
                </label>
              </div>
              {isEnablePackageDeal && (
                <div className="px-5 pb-5">
                  <ReCalculateInput />
                </div>
              )}
            </div> */}
            {isLoadingForLeadScholarship && <LoadingSpinner centered={false} mainLoading={false} message="Loading Scholarship Data" size={25} />}
            {!isLoadingForLeadOfferDetails && !isLoadingForLeadOfferByLeadId && !isLoadingForLeadScholarship && (
              <Scholarship isEnablePackageDeal={isEnablePackageDeal} onEnableOfferGrantHandler={onEnableOfferGrantHandler} />
            )}
            {/* {isLoading && <p className="mt-4 px-5">Loading......</p>} */}
            {/*  when scholarship is  selected as nove of the above then rest will come  */}
            {/* {!isLoading && Object.keys(packageDealByLeadCaptureIdResponse).length > 0 && isEnablePackageDeal && <ReCalculateInstallment />} */}
          </>

          {/* when scholarship is not selected as nove of the above then rest will come  */}
          {findLeadScholarshipDetailsResponse.scholarshipCategoryId !== 7 &&
            findLeadScholarshipDetailsResponse.scholarshipSchemeId !== 24 &&
            findLeadScholarshipDetailsResponse.coreScholarshipSlabId !== 74 && (
              <>
                {/* loading spinnner for the table data */}

                {isLoadingForLeadOfferDetails && isLoadingForLeadOfferByLeadId && <LoadingSpinner centered={false} mainLoading={false} message="Loading Fee Data" size={25} />}

                {/* Installment and offer analysis section in case of status submitted and when the table doesn't have any rows that is when leadOfferHistoryByOfferIdResponse length is 0 then we will call the installment section with first fee details data  */}
                {/* this component will be called when first time the student has locked its scholarship option and sales rep have to give the student a offer */}
                {!isLoadingForLeadOfferDetails &&
                  !isLoadingForLeadOfferByLeadId &&
                  Object.keys(leadOfferHistoryByOfferIdResponse).length === 0 &&
                  Object.keys(FeeDetailsV2Response).length !== 0 &&
                  !IsLoadingForFeeDetailsV2 &&
                  getLeadOfferByLeadIdResponse.length === 0 && <InstallmentAndOfferAnalysisNew />}

                {/* History Installment and offer analysis section in case of status submitted, declined and accepted and when the table has rows that is when leadOfferHistoryByOfferIdResponse length is not 0 then we will call the history installment section with lead offer history data  */}

                {/* this component will be called when student has rejected the offer and autority has confirmed to reissue the offer the in this component sales rep can again give some offer to student] */}
                {!isLoadingForLeadOfferDetails &&
                  !isLoadingForLeadOfferByLeadId &&
                  Object.keys(leadOfferHistoryByOfferIdResponse).length !== 0 &&
                  getLeadOfferByLeadIdResponse.length !== 0 && <HistoryInstallmentAndOfferAnalysis />}
              </>
            )}

          {/* {!isLoadingForLeadOfferDetails && (leadStatus === "re-issued" || leadStatus === "accepted") && Object.keys(leadOfferHistoryByOfferIdResponse).length !== 0 && (
              <HistoryInstallmentAndOfferAnalysis />
            )} */}
        </div>
      </div>
    </>
  );
};

export default OfferAnalysis;
