import React, { useEffect } from "react";
import store, { RootState } from "../../store";
import { useSelector } from "react-redux";
import { fetchLeadReports } from "../../store/home/get-followUp-details-slice";
import { TableColumn } from "./TableColumn";
import { AllDocumentsColumnData } from "../../data/home/homeTable-data";
import { CustomTable } from "./CustomTable";
import PieChart from "./PieChart";
import VerticalBarChart from "./VerticalBarChart";
import HorizontalBarChart from "./HorizontalBarChart";

const Home: React.FC = () => {
  const { userDetails } = useSelector((state: RootState) => state.getLoggedInUserData);
  const { responseOfFlowUpDetails } = useSelector((state: RootState) => state.getFollowUpDetails);
  console.log("responseOfFlowUpDetails", responseOfFlowUpDetails);
  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];
    console.log(formattedDate);
    // const payload = {
    //     taskTypeId: 2,
    //     taskName: ["Follow-Up", "Meeting"],
    //     date: formattedDate
    // }
    store.dispatch(fetchLeadReports({ taskTypeId: 2, taskNames: ["Follow-Up", "Meeting"], date: formattedDate }));
  }, [userDetails]);

  console.log("==============responseOfFlowUpDetails", responseOfFlowUpDetails);
  return (
    <div className="w-full min-h-[calc(100vh-56px)]  bg-gray-50">
      <div className="auto-grid-card  px-3 sm:px-6">
        <div className="w-full bg-white shadow-md h-96 rounded-md  p-3 overflow-auto">
          <CustomTable columns={TableColumn} data={responseOfFlowUpDetails["Follow-Up"] || []} />
        </div>
        <div className="w-full bg-white shadow-md h-96 rounded-md  p-3  overflow-auto">
          <CustomTable columns={TableColumn} data={responseOfFlowUpDetails["Meeting"] || []} />
        </div>
        <div className="w-full bg-white shadow-md h-96 rounded-md flex justify-center items-center p-3">
          <PieChart />
        </div>
        <div className="w-full bg-white shadow-md h-96 rounded-md flex justify-center items-center p-3">
          <VerticalBarChart />
        </div>
        <div className="w-full bg-white shadow-md h-96 rounded-md flex justify-center items-center p-3">
          <HorizontalBarChart />
        </div>
        <div className="w-full bg-white shadow-md h-96 rounded-md flex justify-center items-center overflow-auto">
          <CustomTable columns={TableColumn} data={AllDocumentsColumnData} />
        </div>
      </div>
    </div>
  );
};

export default Home;
