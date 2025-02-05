import { useSelector } from "react-redux";
import store, { RootState } from "../../../store";
import React, { useEffect, useState } from "react";
import { tabs } from "../../../data/manage-leads/active-history-data";
import { onGetRightSectionTabname } from "../../../store/ui/ui-slice";
import LoadingSpinner from "../../../util/custom/ui/LoadingSpinner";
import { getleadDetailsById } from "../../../store/view-leads-details/get-leadDetails-byId-slice";
import { getLeadScheduledNotesValuesById } from "../../../store/notes/get-leadScheduledNotes-by-CaptureId-slice";
import { getLeadScheduleTaskById } from "../../../store/task/get-allLeadScheduleTaskById-slice";
import { getleadAdditionalDetailsById } from "../../../store/lead-capturing/get-leadAdditionalDetails-byId-slice";
import { getDocumentsById } from "../../../store/notes/get-documents-by-CaptureId-slice";
import TopIconHeader from "./manage-lead-details-head/TopIconHeader";
import TopHeaderTabsActions from "./manage-lead-details-head/TopHeaderTabsActions";
import { getFeeCalculationByProgramId } from "../../../store/offer-analysis/get-FeeCalculation-byProgramId-slice";
import { getStudentDocsByLeadCaptureId } from "../../../store/student-documets/get-studentDocs-byId-slice";

const RightView: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const { rightSectionTabname } = useSelector((state: RootState) => state.ui);
  const { isLoading: isLoadingForLeadDetails, leadAdditionalDetailsDataById } = useSelector((state: RootState) => state.getLeadAdditionalDetailsDataById);
  const { StudentDocsByLeadCaptureIdResponse } = useSelector((state: RootState) => state.getStudentDocsByLeadCaptureIdResponse);
  const { isLoading: isLoadingForActivityHistory } = useSelector((state: RootState) => state.getleadDetailsDataById);
  const { isLoading: isLoadingForTask } = useSelector((state: RootState) => state.getLeadScheduleTaskDataById);
  const { isLoading: isLoadingForNotes } = useSelector((state: RootState) => state.getLeadScheduledNotes);
  const { isLoading: isLoadingForDocs } = useSelector((state: RootState) => state.getDocumentsDataById);
  const { leadApplicationStatusByLeadId } = useSelector((state: RootState) => state.getLeadApplicationStatusDataByLeadId);
  const { findLeadScholarshipDetailsResponse } = useSelector((state: RootState) => state.findLeadScholarshipDetails);

  const [displayOfferAnalysis, setDisplayOfferAnalysis] = useState(false);

  useEffect(() => {
    // console.log("inside effect");
    // console.log("findLeadScholarshipDetailsResponse= ", findLeadScholarshipDetailsResponse)
    // console.log("leadApplicationStatusByLeadId?.[4]?.status= ", leadApplicationStatusByLeadId?.[4]?.status)
    const shouldDisplayOfferAnalysis = leadApplicationStatusByLeadId?.[3]?.status === true && findLeadScholarshipDetailsResponse.status !== "validated";
    setDisplayOfferAnalysis(shouldDisplayOfferAnalysis);

    if (!shouldDisplayOfferAnalysis) {
      setActiveTab(0);
    }
  }, [leadApplicationStatusByLeadId, findLeadScholarshipDetailsResponse.status]);

  const programId = leadAdditionalDetailsDataById?.academicProgramId;
  const leadCaptureId = leadAdditionalDetailsDataById.leadCaptureId;

  useEffect(() => {
    store.dispatch(onGetRightSectionTabname(tabs[activeTab].label));
  }, [activeTab]);

  const handleRefresh = function () {
    if (rightSectionTabname === "Activity History") {
      store.dispatch(getleadDetailsById(leadCaptureId));
    } else if (rightSectionTabname === "Lead Details") {
      store.dispatch(getleadAdditionalDetailsById(leadCaptureId));
    } else if (rightSectionTabname === "Tasks") {
      store.dispatch(getLeadScheduleTaskById(leadCaptureId));
    } else if (rightSectionTabname === "Notes") {
      store.dispatch(getLeadScheduledNotesValuesById(leadCaptureId));
    } else if (rightSectionTabname === "Documents") {
      store.dispatch(getDocumentsById(leadCaptureId));
    } else if (rightSectionTabname === "Offer Analysis") {
      store.dispatch(getFeeCalculationByProgramId({ programId, leadCaptureId }));
    } else if (rightSectionTabname === "Student's Documents") {
      store.dispatch(getStudentDocsByLeadCaptureId(leadCaptureId));
    }
  };

  // useEffect(() => {
  //   if (!shouldDisplayOfferAnalysis) {
  //     Modal.info({
  //       title: "Incomplete Steps",
  //       content: "Previous steps are not completed. Please complete them before proceeding.",
  //       onOk: () => {
  //         console.log("Modal closed");
  //       },
  //     });
  //   }
  // }, [shouldDisplayOfferAnalysis]);

  // useEffect(() => {
  //   if (leadCaptureId !== undefined) {
  //     store.dispatch(getStudentDocsByLeadCaptureId(leadCaptureId));
  //   }
  // }, [leadCaptureId]);

  return (
    <>
      <div className="border-b border-gray-200 bg-white text-sm  ">
        <div className="flex justify-end border-b py-2 px-3">
          <TopIconHeader />
          <TopHeaderTabsActions />
        </div>
        <div className="flex gap-x-5 justify-between items-center px-3">
          <ul className="flex space-x-4 text-gray-500 overflow-x-auto remove_scroll_bar overflow-y-hidden">
            {tabs.slice(0, 6).map((tab, i) => (
              <li
                key={tab.id}
                className={`cursor-pointer relative text-nowrap block text-[13px]  py-2 font-semibold ${activeTab === i ? "active" : ""}`}
                onClick={() => {
                  setActiveTab(i);
                }}
              >
                {displayOfferAnalysis || tab.label !== "Offer Analysis" ? tab.label : ""}
              </li>
            ))}
            {StudentDocsByLeadCaptureIdResponse &&
              StudentDocsByLeadCaptureIdResponse.length > 0 &&
              tabs.slice(6, 7).map((tab, i) => (
                <li
                  key={i}
                  className={`cursor-pointer relative text-nowrap block text-[13px]  py-2 font-semibold ${activeTab === 6 ? "active" : ""}`}
                  onClick={() => {
                    setActiveTab(6);
                  }}
                >
                  {tab.label}
                </li>
              ))}
          </ul>

          <div className="flex space-x-2 ml-auto">
            {/* <i className="fas fa-cog text-gray-500"></i> */}
            <button type="button" onClick={handleRefresh}>
              <i className="fas fa-sync-alt text-gray-500"></i>
            </button>
          </div>
        </div>
      </div>
      {(isLoadingForActivityHistory || isLoadingForLeadDetails || isLoadingForTask || isLoadingForNotes || isLoadingForDocs) && (
        <LoadingSpinner
          size={20}
          mainLoading={false}
          message={
            isLoadingForActivityHistory
              ? `Fetching Activity History !`
              : isLoadingForLeadDetails
                ? "Fetching Lead Details !"
                : isLoadingForTask
                  ? "Fetching Task !"
                  : isLoadingForNotes
                    ? "Fetching Notes !"
                    : isLoadingForDocs
                      ? "Fetching Documents !"
                      : ""
          }
          centered={true}
        />
      )}
      {tabs[activeTab].content}
    </>
  );
};

export default RightView;
