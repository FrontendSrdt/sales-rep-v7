import React, { useEffect, useState } from "react";
import ReCalculateInput from "./ReCalculateInput";
import ScholarshipForm from "./ScholarshipForm";
import store, { RootState } from "../../../../../store";
import { getAllScholarshipCategory } from "../../../../../store/scholarship-get/get-all-scholarship-category-slice";
import { useSelector } from "react-redux";
import { getScholarSlabBySchemeId } from "../../../../../store/scholarship-get/get-all-scholarshipSlab-by-schemeId-slice";
import { getScholarSchemeByCategId } from "../../../../../store/scholarship-get/get-all-scholarshipScheme-by-categoryId-slice";
import { useParams } from "react-router-dom";
import { getFeeDetailsV2 } from "../../../../../store/leadFeeDetailsV2/get-lead-feeDetailsV2-slice";
import { onSetScholarshipData } from "../../../../../store/ui/ui-slice";

interface scholarshipPropsType {
  isEnablePackageDeal: boolean;
  onEnableOfferGrantHandler: any;
}

const Scholarship: React.FC<scholarshipPropsType> = ({ isEnablePackageDeal, onEnableOfferGrantHandler }) => {
  const dispatch = store.dispatch;
  const { leadCaptureId } = useParams();
  const { responseForAllScholarshipCateg } = useSelector((state: RootState) => state.getAllActiveScholarCategory);
  const { scholarshipPercentageDiscountBySlabId } = useSelector((state: RootState) => state.getScholarshipPercentageDiscountBySlabId);
  const { responseOfLeadEnquiryDetailsById } = useSelector((state: RootState) => state.getLeadEnquiryDetailsDataById);
  const { isLoading: isLoadingForLeadOfferByLeadId, getLeadOfferByLeadIdResponse } = useSelector((state: RootState) => state.getLeadOfferByLeadId);
  const { isLoading: isLoadingForLeadOfferDetails, leadOfferHistoryByOfferIdResponse } = useSelector((state: RootState) => state.leadOfferHistoryByOfferId);

  const activeEnquiry = Array.isArray(responseOfLeadEnquiryDetailsById) ? responseOfLeadEnquiryDetailsById.filter((item: any) => item.status === "ACTIVE") : [];
  const programId = activeEnquiry[0].academicProgramId;

  const [grantAdditionaDiscount, setGrantAdditionalDiscount] = useState(false);

  const { responseForAllScholarshipOptions } = useSelector((state: RootState) => state.getAllScholarshipOption);
  console.log(responseForAllScholarshipOptions);

  const scholershipCategory = (value: any) => {
    const categoryId = value;
    if (categoryId !== undefined) {
      dispatch(getScholarSchemeByCategId(categoryId));
    }
  };

  const scholershipScheme = (val: any) => {
    const categoryId = val;
    if (categoryId !== undefined) {
      dispatch(getScholarSlabBySchemeId(categoryId));
    }
  };

  const handleModalOk = (values: any) => {
    const payload = {
      leadCaptureId: leadCaptureId,
      scholarshipApplicableOn: scholarshipPercentageDiscountBySlabId.applicableOn,
      percentageDiscount: scholarshipPercentageDiscountBySlabId.percentageDiscount,
      coreAcademicProgramId: programId,
      // discountReason: values.discountReason,
      additionalDiscount: values.additionalDiscount,
    };

    store.dispatch(onSetScholarshipData(values));

    console.log("Final Submit Payload:", payload);
    store.dispatch(getFeeDetailsV2(payload));
  };
  useEffect(() => {
    dispatch(getAllScholarshipCategory());
  }, [dispatch]);

  //   useEffect(() => {
  //     if (!isError && responseOfLeadScholarshipDetails) {
  //       store.dispatch(onSetCloseDialogForScolarship());
  //       store.dispatch(resetResponseForScholarshipPercentageDiscount());
  //       store.dispatch(resetResposneforLeadScholarshipDetails());
  //       navigate("/");
  //       resetForm();
  //     }
  //   }, [isError, responseOfLeadScholarshipDetails, resetForm]);

  const isEnabledCheckbox =
    !isLoadingForLeadOfferDetails && !isLoadingForLeadOfferByLeadId && Object.keys(leadOfferHistoryByOfferIdResponse).length === 0 && getLeadOfferByLeadIdResponse.length === 0;

  return (
    <div className="bg-white rounded-md  mt-5 w-full">
      <div className="flex items-center p-5">
        <input
          type="checkbox"
          id="pckg"
          name="pckg"
          disabled={!isEnabledCheckbox}
          checked={isEnablePackageDeal} // Bind the state to the checkbox
          onChange={onEnableOfferGrantHandler} // Update state on change
          className="mr-2"
        />
        <label htmlFor="pckg" className="text-gray-700 cursor-pointer">
          Grant Package Deal
        </label>
      </div>
      <div className="flex justify-between w-full">
        <div className="w-[50%]">
          <ScholarshipForm
            responseForAllScholarshipCateg={responseForAllScholarshipCateg}
            onAction={handleModalOk}
            onScholershipScheme={scholershipScheme}
            onScholershipCategory={scholershipCategory}
            grantAdditionaDiscount={grantAdditionaDiscount}
            setGrantAdditionalDiscount={setGrantAdditionalDiscount}
            isDisabled={isEnablePackageDeal}
          />
        </div>
        <div className="w-[50%]">
          <div className="px-5 pb-5">
            <ReCalculateInput isDisabled={!isEnablePackageDeal} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scholarship;
