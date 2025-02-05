import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store";

import { transformRecalculateFee } from "../../../../../util/actions/transformReCalculateFeeData";

interface FeeDetail {
  id: number;
  title: string;
  value: string | number;
}

const ReCalculateFee: React.FC = () => {
  const { isLoading, packageDealByLeadCaptureIdResponse } = useSelector((state: RootState) => state.packageDealByLeadCaptureId);

  const [feeDetailsdata, setFeeDetailsData] = useState<FeeDetail[]>([]);

  useEffect(() => {
    let data: FeeDetail[] = [];
    if (!isLoading && packageDealByLeadCaptureIdResponse) {
      data = transformRecalculateFee(packageDealByLeadCaptureIdResponse);
    }
    setFeeDetailsData(data);
  }, [packageDealByLeadCaptureIdResponse, isLoading]);

  return (
    <div className="w-full">
      <h2 className="text-[20px] font-semibold text-[#3b82f6] mb-2">Fee Details</h2>
      <div className="border w-full">
        <div>
          {feeDetailsdata.slice(0, 3).map((ele) => (
            <div className="flex items-start" key={ele.id}>
              <p className={`w-1/2 px-4 py-1 text-right ${ele.title === "Total Course Fee" ? "font-semibold" : ""}`}>{ele.title} :</p>
              <div className="px-4 py-1 w-1/2 flex justify-end">
                <div className="flex justify-between w-full max-w-[110px]">
                  <span>₹</span>
                  <p className={`${ele.title === "Total Course Fee" ? "font-semibold" : ""}`}>{ele.value}</p>

                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4">
          {feeDetailsdata.slice(3, 8).map((ele) => (
            <div className="flex items-start" key={ele.id}>
              <p className={`w-1/2 px-4 py-1 text-right ${ele.title === "Total Discount" ? "font-semibold" : ""}`}>{ele.title}:</p>
              <div className="px-4 py-1 w-1/2 flex justify-end">
                <div className={`flex  ${ele.id !== 4 ? "justify-between" : " justify-end gap-x-2"}  w-full  ${ele.id !== 4 ? "max-w-[110px]" : ""} `}>
                  {ele.id !== 4 && <span>₹</span>}
                  <p className={`${ele.title === "Total Discount" ? "font-semibold" : ""}`}>{ele.value}</p>

                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4">
          {feeDetailsdata.slice(8).map((ele) => (
            <div className="flex items-start" key={ele.id}>
              <p className="font-semibold w-1/2 px-4 py-1 text-right">{ele.title} :</p>
              <div className="px-4 py-1 w-1/2 flex justify-end">
                <div className="flex justify-between w-full max-w-[110px] font-semibold">
                  <span>₹</span>
                  <p>{ele.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReCalculateFee;
