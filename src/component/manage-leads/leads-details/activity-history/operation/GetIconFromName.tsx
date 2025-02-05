import { PiUsersThreeFill } from "react-icons/pi";
import { RiAdminLine } from "react-icons/ri";
import { PiPhoneCallFill } from "react-icons/pi";
import { MdMessage } from "react-icons/md";
import { GrNotes } from "react-icons/gr";
import { BiTask } from "react-icons/bi";
import { TbUserEdit } from "react-icons/tb";
import detailsIcon from "../../../../../assets/activity-history-icons/basic-detail.png";
import contractIcon from "../../../../../assets/activity-history-icons/contract.png";
import documentUploadIcon from "../../../../../assets/activity-history-icons/document-upload.png";
import feeIcon from "../../../../../assets/activity-history-icons/fee.png";
import scholarshipIcon from "../../../../../assets/activity-history-icons/scholarship_evaluation.png";
import offerIcon from "../../../../../assets/activity-history-icons/offer.png";
// import documentReviewIcon from "../../../../../assets/activity-history-icons/document-review.png";
import documentReviewIcon from "../../../../../assets/activity-history-icons/business.png";

type IconName = "PiUsersThreeFill" | "RiAdminLine" | "PiPhoneCallFill" | "MdMessage" | "TbUserEdit";

// Mapping icon names to their respective components
export const renderIcon = (iconName: string) => {
  const iconMap = {
    PiUsersThreeFill: <PiUsersThreeFill />,
    RiAdminLine: <RiAdminLine />,
    PiPhoneCallFill: <PiPhoneCallFill />,
    MdMessage: <MdMessage />,
    GrNotes: <GrNotes className="text-[16px]" />,
    BiTask: <BiTask />,
    TbUserEdit: <TbUserEdit />,
    GeneralInfo: <img src={detailsIcon} alt="general-info-icon" className="w-8 h-8 object-contain white-filter" />,
    PayApplicationFee: <img src={feeIcon} alt="pay-application-fee-icon" className="w-8 h-8 object-contain white-filter" />,
    BasicDetails: <img src={detailsIcon} alt="basic-details-icon" className="w-8 h-8 object-contain white-filter" />,
    PayRegistrationFee: <img src={feeIcon} alt="pay-registration-fee-icon" className="w-8 h-8 object-contain white-filter" />,
    ScholarshipEvaluation: <img src={scholarshipIcon} alt="scholarship-evaluation-icon" className="w-8 h-8 object-contain white-filter" />,
    OfferAnalysis: <img src={offerIcon} alt="offer-analysis-icon" className="w-8 h-8 object-contain white-filter" />,
    ContractAcceptance: <img src={contractIcon} alt="contract-acceptance-icon" className="w-8 h-8 object-contain white-filter" />,
    DocumentsUpload: <img src={documentUploadIcon} alt="documents-upload-icon" className="w-8 h-8 object-contain white-filter" />,
    DocumentsReview: <img src={documentReviewIcon} alt="documents-review-icon" className=" ml-[2px] p-[1px] w-6 h-7 object-contain white-filter" />,
    PayCourseFee: <img src={feeIcon} alt="pay-course-fee-icon" className="w-8 h-8 object-contain white-filter" />,
    // Add more icon mappings as needed
  };

  if (iconName !== undefined) {
    const icon = iconMap[iconName as IconName];
    // Return the corresponding icon or a fallback (null)
    return icon;
  }

  return null;
};
