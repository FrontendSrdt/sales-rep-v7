import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";

const ActivityTable: React.FC = () => {
  const { leadActivityDataByTrackingId } = useSelector((state: RootState) => state.getleadActivityDataByTrackingId);
  {
    leadActivityDataByTrackingId;
  }
  if (Object.keys(leadActivityDataByTrackingId).length === 0) {
    return <p className="ml-5 text-gray-700">No data found for activity table</p>;
  }

  return (
    <div className="p-4">
      <div className="bg-blue-50 border border-gray-300 rounded-md shadow-md p-4">
        {/* <div className="text-blue-700 font-semibold mb-2">Phone Conversation</div> */}
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 ">
              <th className="pl-[17px] text-left">Field</th>

              <th className="pl-[17px] text-left">Value</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(leadActivityDataByTrackingId).length !== 0 &&
              Object.entries(leadActivityDataByTrackingId).map(([key, value]: any) => (
                <tr key={key}>
                  {key === "fileName" ? (
                    <>
                      <td className="px-4 py-2 border">Recording</td>
                      <td className="px-4 py-2 border">
                        <Link className=" text-blue-500 underline underline-offset-2 " to={value} target="blank" download>
                          Click here to listen recoding
                        </Link>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-4 py-2 border">{key}</td>
                      <td className="px-4 py-2 border">{value}</td>
                    </>
                  )}
                </tr>
              ))}
          </tbody>
        </table>
        {/* <div className="text-blue-700 mt-2 cursor-pointer">{activityHeading}</div>
        <div className="text-gray-600 text-sm mt-1">{activityDesc}</div> */}
      </div>
    </div>
  );
};

export default ActivityTable;
