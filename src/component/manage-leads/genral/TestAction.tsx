import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

const TestAction: React.FC = () => {
  const { getAllCheckSelectedDataFormCustomTable } = useSelector((state: RootState) => state.ui);

  return (
    <div>
    
      <table className="w-full border-collapse bg-white">
        <thead>
          <tr>
            <th className="border p-2 text-left">Lead Capture ID</th>
            <th className="border p-2 text-left">Name</th>
            <th className="border p-2 text-left">Email</th>
            <th className="border p-2 text-left">Phone</th>
          </tr>
        </thead>
        <tbody>
          {getAllCheckSelectedDataFormCustomTable?.map((row:any, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="border p-2">{row.leadCaptureId}</td>
              <td className="border p-2">{row.name}</td>
              <td className="border p-2">{row.email}</td>
              <td className="border p-2">{row.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TestAction;
