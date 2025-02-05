import React from "react";
import { leftViewData } from "../../../data/manage-leads/leadDetails-data";
import { useSelector } from "react-redux";
import store, { RootState } from "../../../store";
import { addSpacesToCamelCase } from "../genral/CapitalizeName";
import profile from "../../../assets/profile.png";
import { IoCall, IoLogoWhatsapp } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { makeCallRequest } from "../../../store/lead-contact-phone/make-call-slice";
import toast from "react-hot-toast";

const LeftView: React.FC = () => {
  const { heading } = leftViewData[0];
  const { leadPropertiesDataById } = useSelector((state: RootState) => state.getLeadPropertiesDataById);
  const { maxActiveAppStatusResponse } = useSelector((state: RootState) => state.getMaxActiveAppStatusResponse);
  const { userDetails } = useSelector((state: RootState) => state.getLoggedInUserData);
  const { phone: executiveNum } = userDetails;

  // console.log("maxActiveAppStatusResponse", maxActiveAppStatusResponse);
  const { leadCaptureId, phone, salesrepId, salesrepName, ...rest } = leadPropertiesDataById;
  const transformedObject: any = {
    Owner: salesrepName,
    ...rest,
  };

  const onCallHandler = () => {
    const leadSourceId = leadCaptureId;
    const leadStageId = 1;
    const leadNum = phone;
    if (leadStageId) {
      store.dispatch(makeCallRequest({ executiveNum, leadNum, leadSourceId, leadStageId }));
    } else {
      toast("Sorry 😔,This Lead is not able to make call.", {
        duration: 6000,
      });
    }
  };

  return (
    <>
      <div className="rounded-md bg-white border py-4  ">
        {/* Profile Part */}
        <div className="flex gap-x-4 px-4">
          <div className="w-20 h-20 min-w-20 min-h-20 border-2 rounded-full p-2">
            <img src={profile} alt="profile" />
          </div>
          <div className="mt-">
            <h2 className=" font-semibold ">{transformedObject.leadName}</h2>
            <h2 className="font-semibold break-all">{`Applied for ${transformedObject.programName}`}</h2>
            <div className="flex gap-x-8 mt-2">
              <IoCall size={22} className="text-[#3b82F6] cursor-pointer" onClick={onCallHandler} />
              <IoLogoWhatsapp size={22} />
              <MdEmail size={22} />
            </div>
          </div>
        </div>

        <div className="py-2 mt-2">
          <div>
            {Object.entries(transformedObject)
              .slice(0, 1)
              .map((data: any, index: any) => {
                return (
                  <div className=" flex items-start px-4 pb-2" key={index}>
                    <div className=" font-semibold text-sm text-nowrap mt-[1px]">{addSpacesToCamelCase(data[0])} :</div>
                    <div className=" text-sm  break-words ml-1 mt-0.5">{data[1]}</div>
                  </div>
                );
              })}
          </div>

          {transformedObject.leadStageName && (
            <div className=" flex items-start px-4 pb-2">
              <h1 className=" font-semibold text-sm text-nowrap mt-[1px]">Lead Stage :</h1>
              <h1 className=" text-sm  break-words ml-1 mt-0.5 ">{transformedObject.leadStageName}</h1>
            </div>
          )}

          <div className=" flex items-start px-4 pb-2">
            <h1 className=" font-semibold text-sm text-nowrap mt-[1px]">Application Status :</h1>
            <h1 className="text-sm font-medium break-words ml-1 mt-0.5 text-green-600">
              {maxActiveAppStatusResponse
                ? typeof maxActiveAppStatusResponse === "string"
                  ? maxActiveAppStatusResponse + " (Completed)"
                  : JSON.stringify(maxActiveAppStatusResponse)
                : "Pending"}
            </h1>
          </div>
        </div>

        <div className="flex justify-between items-center mb-4">
          <div className="font-medium flex items-center gap-x-2 bg-[#dbeafe] w-full px-4 py-1 ">{heading}</div>
        </div>
        {Object.entries(transformedObject)
          .slice(1, Object.entries(transformedObject).length - 1)
          .filter(([_, value]) => value) // Filter out entries with no data
          .map(([key, value]: any, index) => (
            <div className=" flex flex-col text-sm mb-3 px-4" key={index}>
              <div className="text-gray-400 mb-0.5">{addSpacesToCamelCase(key)}</div>
              <div className={`font-medium  break-words ml-5 `}>{value}</div>
            </div>
          ))}
      </div>
    </>
  );
};

export default LeftView;
