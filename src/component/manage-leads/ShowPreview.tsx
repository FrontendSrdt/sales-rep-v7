import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
interface propsType {
  isModeUpdate: boolean | undefined;
}
const ShowPreview: React.FC<propsType> = ({ isModeUpdate }) => {
  const { submittedFormData } = useSelector((state: RootState) => state.ui);

  return (
    <>
      {submittedFormData !== null &&
        submittedFormData.contentForPreview.map((items: any, ind: any) => (
          <div key={ind} className="border bg-white border-gray-300 rounded-md shadow-md  pb-3">
            <span key={ind} className={`block  py-2 px-2 border-b border-gray-300 text-base ${isModeUpdate ? "bg-gray-100" : "bg-[#edf4fc] "} rounded-t-md    font-semibold`}>
              {items.title}
            </span>
            <div className="grid grid-cols-2 gap-4 px-2 mt-3">
              {items &&
                items.previewConfigItems.map((items: any) => (
                  <p className="text-gray-500 text-sm" key={items.id}>
                    <span className="mr-2 text-gray-600 font-semibold">{items.name}:</span>
                    {items.value}
                  </p>
                ))}
            </div>
          </div>
        ))}
    </>
  );
};

export default ShowPreview;
