import uiSliceReducer from "../ui/ui-slice";
import authReducer from "../auth/auth-Slice";
import callRequestReducer from "../lead-contact-phone/make-call-slice";
import paginationReducer from "../ui/pagination-slice";
import { tableReducer } from "../ui/table-slice";

import leadsFilterReducer from "../lead-capturing/filter-data-slice";
import { loggedInUserReducer } from "../auth/loggedIn-user-slice";
import leadStagesReducer from "../lead-capturing/get-allLeadStage-slice";
import leadSourceReducer from "../lead-capturing/get-allLeadSource-slice";
import { AddLeadCaptureReducer } from "../lead-capturing/create-lead-capture-slice";
import { getLeadCaptureByIdReducer } from "../lead-capturing/get-lead-capture-byId-slice";

import { createLeadApplicationStatusReducer } from "../lead-applicationStatus/create-leadApplicationStatus-slice";
import { getLeadApplicationStatusByIdReducer } from "../lead-applicationStatus/get-leadApplicationStatusById-slice";

import { getLeadAcadDetailsUGByIdReducer } from "../lead-academicDetailsForUG/get-acadDetailsUGById-slice";
import { createLeadAcadDetailsUGReducer } from "../lead-academicDetailsForUG/create-acadDetailsUG-slice";
import { addLeadContactPhoneReducer } from "../lead-contact-phone/create-lead-contact-slice";
import { leadContactPhoneByIdReducer } from "../lead-contact-phone/get-lead-contact-by-id-slice";
import { addLeadAcademicDetailsForTenthReducer } from "../lead-academic-details-for-tenth/create-lead-academic-details-for-tenth-slice";
import { leadAcademicDetailsForTenthByIdReducer } from "../lead-academic-details-for-tenth/get-all-lead-academic-details-for-tenth-by-id-slice";
import { createLeadAcadDetailsTwelfthReducer } from "../lead-academicDetailsForTwelfth/create-leadAcadDetailsTwelfth-slice";
import { getLeadAcadDetailsTwelfthByIdReducer } from "../lead-academicDetailsForTwelfth/get-leadAcadDetailsTwelfthById-slice";
import { AddLeadAddressDetailReducer } from "../lead-address-detail/create-lead-address-detail-slice";
import { getLeadAddressDetailByIdReducer } from "../lead-address-detail/get-lead-address-detail-byId-slice";
import { getAllAcademicCareerReducer } from "../get/get-all-academic-career-slice";
import { getAcDataByCareerIdReducer } from "../get/get-all-academic-program-by-academic-career-id-slice";
import { getAllAcademicProgramReducer } from "../get/get-all-academic-program-slice";
import { getAllAdmitTypeReducer } from "../get/get-all-admit-type-slice";
import { getAllCategoryReducer } from "../get/get-all-category-slice";
import { getAllCityReducer } from "../get/get-all-city-slice";
import { getAllStateReducer } from "../get/get-all-state-slice";
import { getAllTwelfthBoardReducer } from "../get/get-all-twelfth-board-slice";
import { getAllCityByStateIdReducer } from "../get/get-allCity-byStateId-slice";
import { getAllTenthBoardReducer } from "../get/get-all10th-slice";
import { getAllTenthMarkingSchemeReducer } from "../get/get-all10thScheme-slice";
import { getAllLeadSourceReducer } from "../get/get-all-leadSource-slice";
import { getAllTwelfthMarkingSchemeReducer } from "../get/get-all-twelfthMarkingScheme-slice";
import { getAllTwelfthResultStatusReducer } from "../get/get-all-twelfthResultStatus-slice";
import { getAllUgResultStatusReducer } from "../get/get-all-ugResultStatus-slice";
import { getAcademicCareerByIdReducer } from "../get/get-academic-career-by-id-slice";
import { getAcademicProgramByIdReducer } from "../get/get-academicProgram-byId-slice";
import { getAdmitTypeServiceDataByIdReducer } from "../get/get-admitTypeService-byId-slice";
import { getCityByIdReducer } from "../get/get-all-city-by-id-slice";
import { getTenthBoardByIdReducer } from "../get/get-all-tenth-board-by-id-slice";
import { getTenthMarkingSchemeByIdReducer } from "../get/get-all-tenth-marking-scheme-by-Id-slice";
import { getTwelfthBoardByIdReducer } from "../get/get-all-twelfth-board-by-id-slice";
import { getUgResultStatusByIdReducer } from "../get/get-all-Ug-result-status-by-id-slice";
import { getCategoryByIdReducer } from "../get/get-category-by-id-slice";
import { getCoreStateByStateIdReducer } from "../get/get-state-byStateId-slice";
import { getTwelfthMarkingSchemeByIdReducer } from "../get/get-twelfthMarkingScheme-by-id-slice";
import { getTwelveResultByIdReducer } from "../get/get-twelveResult-by-id-slice";
import { getAllLeadOwnerReducer } from "../sales-rep-details(changeOwner)/get-all-lead-owner-slice";
import { AddLeadAdditionalDetailsReducer } from "../lead-capturing/create-lead-with-additional-details-slice";
import { getleadDetailsByIdReducer } from "../view-leads-details/get-leadDetails-byId-slice";
import { getLeadActivityByTrackingIdReducer } from "../view-leads-details/get-leadActivity-byTrackingId-slice";
import { getLeadPropertiesByIdReducer } from "../view-leads-details/get-leadProperties-byLeadId-slice";
import { getleadAdditionalDetailsByIdReducer } from "../lead-capturing/get-leadAdditionalDetails-byId-slice";
import { updateLeadAdditionalDetailsReducer } from "../lead-capturing/update-leadAdditionalDetails-slice";
import { taskTypesReducer } from "../task/get-taskType-slice";
import { leadNamesReducer } from "../task/get-allLeadName-slice";
import { AddNewLeadTaskReducer } from "../task/create-leadTask-slice";
import { leadScheduledTasksReducer } from "../task/get-allLeadscheduledTask";
import { AddNewLeadNotesReducer } from "../notes/create-leadNotes-slice";
import { getDocumentsByIdReducer } from "../notes/get-documents-by-CaptureId-slice";
import { leadScheduledNotesReducer } from "../notes/get-leadScheduledNotes-by-CaptureId-slice";
import { getAllAttachmentTypeReducer } from "../notes/get-all-coreDocAttachmentType-slice";
import { getLeadScheduleTaskByIdReducer } from "../task/get-allLeadScheduleTaskById-slice";
import { leadTaskDetailsByTasksIdReducer } from "../task/get-taskDetails-by-taskTypeId-slice";
import { updateLeadTaskReducer } from "../task/update-leadTask-slice";
import { updateLeadCompletionStatusReducer } from "../task/update-leadscheduleTaskCompletionStatus-slice";
import { assignSalesRepToManagerReducer } from "../sales-rep-details(changeOwner)/assign-salesRepToManager-slice";
import { AddNewNotesReducer } from "../notes/create-notes-slice";
import { downloadDocReducer } from "../task/download-doc-slice";
import { getLeadNotesByNoteIdReducer } from "../notes/get-leadNote-by-leadNoteId-slice";
import { uploadDocsReducer } from "../upload-docs/upload-docs-slice";
import { AddLeadCaptureByQuickAddFormReducer } from "../lead-capture/create-lead-capture-byQuickAddForm-slice";
import { updateLeadNotesReducer } from "../notes/update-leadNotes-byNoteId-slice";
import { updateLeadOwnerReducer } from "../sales-rep-details(changeOwner)/update-lead-owner-by-id-slice";
import { getLeadCaptureByUserEmailReducer } from "../lead-capture/get-all-lead-capture-by-userEmail-slice";
import { updateUserPasswordReducer } from "../profile-update/update-userPassword-slice";
import { updateUserPhoneReducer } from "../profile-update/update-userPhone-slice";
import { getMaxActiveAppStatusReducer } from "../scholarship-services/get-max-active-application-status-slice";
import { getProgramTutionFeeByProgramIdReducer } from "../offer-analysis/get-programTutionFee-byprogramId-slice";
import { getMaxLeadScholarshipDetailsReducer } from "../scholarship-services/get-max-lead-scholarship-details-by-leadCapture-id-slice";
import { updateLeadScholarshipDetailsByScholarIdReducer } from "../scholarship-services/update-lead-scholarship-details-by-lead-scholar-detail-id-slice";
import { findLeadScholarshipDetailsReducer } from "../scholarship-services/find-lead-scholarship-details-by-lead-id-slice";
import { getLeadApplicationStatusByLeadIdReducer } from "../lead-applicationStatus/get-lead-application-status-by-lead-capture-id-slice";
import { getFeeCalculationByProgramIdReducer } from "../offer-analysis/get-FeeCalculation-byProgramId-slice";
import { LockLeadOfferReducer } from "../offer-details/lead-offer-lock-slice";
import { getAllLeadWithDeclineOfferReducer } from "../lead-with-decline-offer/get-leadWithDeclineOffer-slice";
import { getLeadOfferByLeadIdReducer } from "../offer-analysis/get-lead-offers-by-leadId-slice";
import { getLeadOfferHistoryByOfferIdReducer } from "../offer-analysis/find-leadOfferHistory-by-offerId-and-leadCaptureId-slice";
import { getFeeCalculationForDeclineByIdReducer } from "../lead-with-decline-offer/get-feeCalculationForDecline-byId-slice";
import { getLeadScholarshipDetailsForDeclineByIdSliceReducer } from "../lead-with-decline-offer/get-ScholarshipDetailsForDecline-byId-slice";
import { reissueContractByIdReducer } from "../lead-with-decline-offer/save-ReissueContract-byid-slice";
import { getStudentDocsByLeadCaptureIdReducer } from "../student-documets/get-studentDocs-byId-slice";
import { verifyStudentDocsReducer } from "../student-documets/verify-studentDocs-slice";
import { getConfirmationForAllDocsByLeadCaptureIdReducer } from "../student-documets/get-confirmation-all-docs-by-lead-id-slice";
import { studentDocsStatusReducer } from "../student-documets/get-studentDocsStatus-slice";
import { getPackageDealByLeadCaptureIdReducer } from "../package-deal/get-package-deal-by-programId-leadCaptureId-slice";
import { updateLeadBiograficalInfoReducer } from "../lead-attribute-update/update-leadBiograficalInfo-slice";
import { updateLeadContactReducer } from "../lead-attribute-update/update-contact-slice";
import { updateLeadAddressReducer } from "../lead-attribute-update/update-leadAddress-slice";
import { getBiographicalInfoByIdReducer } from "../lead-attribute-update/get-leadBiographicalInfo-slice";
import { getLeadAddressByIdReducer } from "../lead-attribute-update/get-leadAddress-byId-slice";
import { getLeadContactDetailsByIdReducer } from "../lead-attribute-update/get-leadContactDetails-byId-slice";
import { getLeadAcademicDetailsByIdReducer } from "../lead-attribute-update/get-leadAcademicDetails-slice";
import { updateLeadAcademicDetailsReducer } from "../lead-attribute-update/update-leadAcademicDetails-slice";
import { getLeadOfferDeclineReasonByOfferIdSliceReducer } from "../lead-with-decline-offer/get-leadOfferdeclineReason-by-offerId-slice";
import { getLeadCaptureByFullNameReducer } from "../lead-capture/get-allLeadCapture-By-fullName-slice";
import { getleadSubStagesByIdReducer } from "../lead-capturing/get-allLeadSubStages-byId-slice";
import { OwnersReducer } from "../lead-capturing/get-allOwner-slice";
import { ApplicationStatusReducer } from "../lead-capturing/get-allApplicationStatus-slice";
import { getLeadEnquiryDetailsByIdReducer } from "../lead-attribute-update/get-leadEnquiryDetails-slice";
import { getAcDataRowWiseByCareerIdReducer } from "../lead-attribute-update/get-academicProgramRowWise-byCareerId-slice";
import { getCityDataRowWiseByStateIdReducer } from "../lead-attribute-update/get-CityRowWise-byStateId-slice";
import { createLeadEnquirySliceReducer } from "../lead-attribute-update/create-leadEnquiry-slice";
import { getAdditionalInfoByIdReducer } from "../lead-attribute-update/get-leadAdditionalDetails-slice";
import { updateLeadAdditionalInfoReducer } from "../lead-attribute-update/update-leadAdditionalDetails-slice";
import { AddAdditionalDetailsReducer } from "../lead-attribute-update/create-leadAdditionalDetails-slice";
import { getAllActiveScholarCategoryReducer } from "../scholarship-get/get-all-scholarship-category-slice";
import { getScholarshipSchemeByCategIdReducer } from "../scholarship-get/get-all-scholarshipScheme-by-categoryId-slice";
import { getScholarshipSlabBySchemeIdReducer } from "../scholarship-get/get-all-scholarshipSlab-by-schemeId-slice";
import { getScholarshipPercentageDiscountBySlabIdReducer } from "../scholarship-get/get-scholarshipPercentageDiscount-by-slabId-slice";
import { getFeeDetailsV2Reducer } from "../leadFeeDetailsV2/get-lead-feeDetailsV2-slice";
import { getAllDiscountReasonReducer } from "../scholarship-get/get-all-discountReason-slice";
import { getAllActiveScholarshipOptionReducer } from "../scholarship-get/get-all-scholarshipData-slice";
import { exportLeadReducer } from "../actions/export-lead-slice";
import { BulkChangeStageReducer } from "../actions/bulk-change-stage-slice";
import leadReportSlice from "../home/get-followUp-details-slice"

const RootReducer = {
  auth: authReducer,
  ui: uiSliceReducer,
  table: tableReducer,
  callReq: callRequestReducer,
  paginationForLeads: paginationReducer,
  getLeadCaptureByFullName: getLeadCaptureByFullNameReducer,
  getLoggedInUserData: loggedInUserReducer,
  filterLeadsData: leadsFilterReducer,
  leadStageValues: leadStagesReducer,
  leadSourceValues: leadSourceReducer,
  getAllApplicationStatus: ApplicationStatusReducer,
  getAllOwner: OwnersReducer,
  getleadSubStagesDataById: getleadSubStagesByIdReducer,
  getLeadCaptureById: getLeadCaptureByIdReducer,
  addLeadCapture: AddLeadCaptureReducer,
  addLeadAdditionalDetails: AddLeadAdditionalDetailsReducer,
  getLeadAdditionalDetailsDataById: getleadAdditionalDetailsByIdReducer,
  addLeadCaptureByQuickAddForm: AddLeadCaptureByQuickAddFormReducer,
  updateLeadOwner: updateLeadOwnerReducer,
  getLeadCaptureByUserEmail: getLeadCaptureByUserEmailReducer,
  getMaxActiveAppStatusResponse: getMaxActiveAppStatusReducer,

  //lead applicaiton status
  addLeadApplicationStatus: createLeadApplicationStatusReducer,
  getLeadApplicationStatusDataById: getLeadApplicationStatusByIdReducer, // do not know where is using

  //lead academic detials for 12th
  addLeadAcadDetailsTwelfth: createLeadAcadDetailsTwelfthReducer,
  getLeadAcadDetailsTwelfthDataById: getLeadAcadDetailsTwelfthByIdReducer,

  //lead academic details for UG
  addLeadAcadDetailsUG: createLeadAcadDetailsUGReducer,
  getLeadAcadDetailsUGDataById: getLeadAcadDetailsUGByIdReducer,
  addLeadContactPhone: addLeadContactPhoneReducer,
  getLeadContactPhoneById: leadContactPhoneByIdReducer,
  addLeadAcademicDetailsForTenth: addLeadAcademicDetailsForTenthReducer,
  getLeadAcademicDetailsForTenthById: leadAcademicDetailsForTenthByIdReducer,

  //*******************************  Lead Address Detail *********************************
  addLeadAddressDetail: AddLeadAddressDetailReducer,
  getLeadAddressDetail: getLeadAddressDetailByIdReducer,

  //*********************get********************************
  getAllAcademicCareer: getAllAcademicCareerReducer,
  getAllAcademicProgramByCareer: getAcDataByCareerIdReducer,
  coreAcademicProgram: getAllAcademicProgramReducer,
  getAllAdmitType: getAllAdmitTypeReducer,
  getAllCategory: getAllCategoryReducer,
  cityByStateId: getAllCityByStateIdReducer,
  coreTenthBoard: getAllTenthBoardReducer,
  coreTenthMarkingScheme: getAllTenthMarkingSchemeReducer,
  getAllTwelfthMarkingSchemeData: getAllTwelfthMarkingSchemeReducer,
  getAllTwelfthBoardData: getAllTwelfthBoardReducer,
  getAllTwelfthResultStatusData: getAllTwelfthResultStatusReducer,
  getAllStatesData: getAllStateReducer,
  getAllCityData: getAllCityReducer,
  getAllTenthBoardData: getAllTenthBoardReducer,
  getAllCityDataByStateId: getAllCityByStateIdReducer,
  getAllTenthMarkingSchemeData: getAllTenthMarkingSchemeReducer,
  getAllLeadSource: getAllLeadSourceReducer,
  getAllUgResultStatusData: getAllUgResultStatusReducer,

  //############## getById ##########################
  getAcademicCareerById: getAcademicCareerByIdReducer,
  getAcademicProgramById: getAcademicProgramByIdReducer,
  getAdmitTypeServiceDataById: getAdmitTypeServiceDataByIdReducer,
  getCityById: getCityByIdReducer,
  getTenthBoardByIdReducer: getTenthBoardByIdReducer,
  getTenthMarkingSchemeById: getTenthMarkingSchemeByIdReducer,
  getTwelfthBoardById: getTwelfthBoardByIdReducer,
  getUgResultStatusById: getUgResultStatusByIdReducer,
  getCategoryById: getCategoryByIdReducer,
  getCoreStateByStateId: getCoreStateByStateIdReducer,
  getTwelfthMarkingSchemeById: getTwelfthMarkingSchemeByIdReducer,
  getTwelveResultById: getTwelveResultByIdReducer,
  getLeadCaptureDataById: getLeadCaptureByIdReducer,
  getAllLeadOwner: getAllLeadOwnerReducer,
  assignSalesRepToManager: assignSalesRepToManagerReducer,

  //*******************************  Lead Activity Details *********************************
  getleadDetailsDataById: getleadDetailsByIdReducer,
  getleadActivityDataByTrackingId: getLeadActivityByTrackingIdReducer,
  getLeadPropertiesDataById: getLeadPropertiesByIdReducer,
  leadAdditionalDetailsUpdate: updateLeadAdditionalDetailsReducer,

  //*******************************  Task *********************************
  getTaskType: taskTypesReducer,
  getLeadName: leadNamesReducer,
  addNewLeadTask: AddNewLeadTaskReducer,
  getLeadScheduledTask: leadScheduledTasksReducer,
  getLeadScheduleTaskDataById: getLeadScheduleTaskByIdReducer,
  getLeadTaskDetailsByTaskId: leadTaskDetailsByTasksIdReducer,
  leadTaskUpdate: updateLeadTaskReducer,
  leadCompletionStatusUpdate: updateLeadCompletionStatusReducer,
  //*******************************  Notes *********************************
  addNewLeadNotes: AddNewLeadNotesReducer, //this slice is no longer in use
  getDocumentsDataById: getDocumentsByIdReducer,
  getLeadScheduledNotes: leadScheduledNotesReducer,
  coreAttachementType: getAllAttachmentTypeReducer,
  addNewNotes: AddNewNotesReducer,
  downloadNotes: downloadDocReducer,
  getLeadNotesDataByNoteId: getLeadNotesByNoteIdReducer,
  leadNotesUpdate: updateLeadNotesReducer,

  //*******************************  docs upload *********************************
  docsUpload: uploadDocsReducer,

  //*******************************  profile update *********************************
  userPasswordUpdate: updateUserPasswordReducer,
  userPhoneUpdate: updateUserPhoneReducer,

  //*******************************  offer Analysis *********************************
  getProgramTutionFeeByProgramIdResponse: getProgramTutionFeeByProgramIdReducer,
  getFeeCalculationByProgramIdResponse: getFeeCalculationByProgramIdReducer,
  getLeadOfferByLeadId: getLeadOfferByLeadIdReducer,
  lockLeadOffer: LockLeadOfferReducer,
  leadOfferHistoryByOfferId: getLeadOfferHistoryByOfferIdReducer,
  packageDealByLeadCaptureId: getPackageDealByLeadCaptureIdReducer,

  //*******************************  student documents *********************************

  getStudentDocsByLeadCaptureIdResponse: getStudentDocsByLeadCaptureIdReducer,
  verifyStudentDocsResponse: verifyStudentDocsReducer,
  getConfirmationForAllDocsByLeadCaptureId: getConfirmationForAllDocsByLeadCaptureIdReducer,
  studentDocsStatus: studentDocsStatusReducer,

  //*******************************  scholarship details *********************************
  // updateLeadScholarshipDetails: updateLeadScholarshipDetailsReducer,
  // getLeadScholarshipDetails: getLeadScholarshipDetailsReducer,
  getMaxLeadScholarshipDetails: getMaxLeadScholarshipDetailsReducer,
  updateLeadScholarshipDetailsByScholarId: updateLeadScholarshipDetailsByScholarIdReducer,
  findLeadScholarshipDetails: findLeadScholarshipDetailsReducer,

  getLeadApplicationStatusDataByLeadId: getLeadApplicationStatusByLeadIdReducer,

  //*******************************  authority decline cases *********************************
  coreLeadWithDeclineOffer: getAllLeadWithDeclineOfferReducer,
  getFeeCalculationForDeclineById: getFeeCalculationForDeclineByIdReducer,
  getLeadScholarshipDetailsForDeclineById: getLeadScholarshipDetailsForDeclineByIdSliceReducer,
  saveReissueContract: reissueContractByIdReducer,
  getLeadOfferDeclineReasonByOfferId: getLeadOfferDeclineReasonByOfferIdSliceReducer,

  //*******************************  Lead Attribute Update *********************************

  getBiographicalInfoByIdData: getBiographicalInfoByIdReducer,
  LeadBiograficalInfoUpdate: updateLeadBiograficalInfoReducer,
  LeadContactUpdate: updateLeadContactReducer,
  LeadAddressUpdate: updateLeadAddressReducer,
  getLeadAddressDataById: getLeadAddressByIdReducer,
  getLeadContactDetailsDataById: getLeadContactDetailsByIdReducer,
  getLeadAcademicDetailsDataById: getLeadAcademicDetailsByIdReducer,
  LeadAcademicDetailsUpdate: updateLeadAcademicDetailsReducer,
  getLeadEnquiryDetailsDataById: getLeadEnquiryDetailsByIdReducer,
  getAcademicProgramRowWiseByCareerId: getAcDataRowWiseByCareerIdReducer,
  getCityRowWiseByStateId: getCityDataRowWiseByStateIdReducer,
  addLeadEnquiry: createLeadEnquirySliceReducer,
  getAdditionalInfoByIdData: getAdditionalInfoByIdReducer,
  LeadAdditionalInfoUpdate: updateLeadAdditionalInfoReducer,
  addAdditionalDetails: AddAdditionalDetailsReducer,

  //**************Scholarship Get************************************ */
  getAllActiveScholarCategory: getAllActiveScholarCategoryReducer,
  getAllScholarshipSchemeByCategoryId: getScholarshipSchemeByCategIdReducer,
  getAllScholarshipSlabBySchemeId: getScholarshipSlabBySchemeIdReducer,
  getScholarshipPercentageDiscountBySlabId: getScholarshipPercentageDiscountBySlabIdReducer,
  getAllDiscountReason: getAllDiscountReasonReducer,
  getAllScholarshipOption: getAllActiveScholarshipOptionReducer,

  // ***************Fee Details V2 ****************************
  getFeeDetailsV2: getFeeDetailsV2Reducer,

  // *******************Export lead ********************
  ExportLead: exportLeadReducer,
  BulkChangeStage: BulkChangeStageReducer,

  // **********************Home**********************
  getFollowUpDetails: leadReportSlice,
};

export default RootReducer;
