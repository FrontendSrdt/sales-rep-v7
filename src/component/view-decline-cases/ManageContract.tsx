import React from "react";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import { FaFileContract } from "react-icons/fa";
import Classes from "../../util/Global.module.css";
import ViewInstallmentFee from "./ViewInstallmentFee";

export interface TableData {
  id: number;
  name: string;
  value: string;
}
const ManageContract: React.FC = () => {
  const { leadPropertiesDataById } = useSelector((state: RootState) => state.getLeadPropertiesDataById);
  const { LeadScholarshipDetailsForDeclineByIdResponse } = useSelector((state: RootState) => state.getLeadScholarshipDetailsForDeclineById);

  const tableData1: TableData[] = [
    { id: 1, name: "Name", value: leadPropertiesDataById.leadName || "" },
    { id: 2, name: "Email", value: leadPropertiesDataById.email || "" },
    { id: 3, name: "Phone No.", value: leadPropertiesDataById.phone || "" },
    { id: 4, name: "Academic Career", value: leadPropertiesDataById.careerName || "" },
    { id: 5, name: "Program", value: leadPropertiesDataById.programName || "" },
    { id: 5, name: "Lead Owner", value: leadPropertiesDataById.salesrepName || "" },
  ];
  const tableData2: TableData[] = [
    { id: 1, name: "Scholarship Category Name", value: LeadScholarshipDetailsForDeclineByIdResponse.scholarshipCategoryDescription || "" },
    { id: 2, name: "Scholarship Scheme Name", value: LeadScholarshipDetailsForDeclineByIdResponse.scholarshipSchemeDescription || "" },
    { id: 3, name: "Scholarship Slab Name", value: LeadScholarshipDetailsForDeclineByIdResponse.scholarshipSlabDescription || "" },
    {
      id: 4,
      name: "Percentage Discount",
      value:
        `${LeadScholarshipDetailsForDeclineByIdResponse.percentageDiscount}% Discount on ${
          LeadScholarshipDetailsForDeclineByIdResponse.applicableOn === "Y" ? "Yearly Tution Fee" : "Semester Tution Fee"
        } ` || "",
    },
    { id: 5, name: "Applicable on", value: LeadScholarshipDetailsForDeclineByIdResponse.applicableOn === "Y" ? "Yearly Tution Fee" : "Semester Tution Fee" },
  ];

  return (
    <section className={`${Classes["container"]} mt-4 px-3 sm:px-6`}>
      <div className={`rounded-md bg-white`}>
        <div className="border-b border-slate-200 px-5 py-3 flex gap-x-2 mt-0.5 items-center">
          <span className="border-2 border-blue-500 w-8 h-8 min-w-8 min-h-8 flex justify-center items-center rounded-full">
            <FaFileContract />
          </span>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold">Manage Contract</h2>
        </div>

        <div className="p-5">
          <div className="w-full rounded-md bg-white pb-12">
            <div className="w-full handle-table-box mt-4">
              <div>
                <div className="w-full ">
                  <h2 className="text-base sm:text-[20px] font-semibold text-[#3b82f6] mb-2">General Info Selected by Lead</h2>
                  <div className="w-full overflow-x-auto">
                    <table className="border w-full">
                      <tbody>
                        {tableData1.map((item: any) => (
                          <tr key={item.id} className="border">
                            <td className="font-semibold border w-1/2 px-4 py-1 text-nowrap">{item.name} : </td>
                            <td className="border w-1/2 px-4 py-1 text-nowrap">{item.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="w-full mt-4">
                  <h2 className="text-base sm:text-[20px] font-semibold text-[#3b82f6] mb-2">Scholarship Options Selected by Lead</h2>
                  <div className="w-full overflow-x-auto ">
                    <table className="w-full border">
                      <tbody className="border">
                        {tableData2.map((item, index) => (
                          <tr key={index} className=" ">
                            <td className=" px-4 py-1 font-semibold   border w-1/2 text-nowrap">{item.name} :</td>
                            <td className="px-4 py-1 border   w-1/2 text-nowrap">{item.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <ViewInstallmentFee />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ManageContract;
