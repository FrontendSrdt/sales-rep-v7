import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import store, { RootState } from "../../../../store";
import { transformData } from "../../genral/transformPayloadForPreview";
import { sectionsConfigForLeadUpdate } from "../../../../data/manage-leads/ManageLeadsData";
import { onGetHeaderTabIconsName, uiSliceAction } from "../../../../store/ui/ui-slice";
import CustomSideDrawer from "../../../../util/custom/ui/CustomSideDrawer";
import UpdateLeadDetails from "./UpdateLeadDetails";
import { getAllCityByStateId } from "../../../../store/get/get-allCity-byStateId-slice";
import { getApByCareerId } from "../../../../store/get/get-all-academic-program-by-academic-career-id-slice";

const LeadDetail = () => {
  const dispatch = store.dispatch;
  const { isDrawerOpen, getHeaderTabIconsName } = useSelector((state: RootState) => state.ui);
  const { leadAdditionalDetailsDataById } = useSelector((state: RootState) => state.getLeadAdditionalDetailsDataById);
  const tranformedData = transformData(leadAdditionalDetailsDataById, sectionsConfigForLeadUpdate);

  console.log("leadAdditionalDetailsDataById", leadAdditionalDetailsDataById);
  console.log("tranformedData", tranformedData);
  // State for search term
  const [searchTerm, setSearchTerm] = useState("");

  // Filter transformed data based on search term
  const filteredData = useMemo(() => {
    if (!searchTerm) return tranformedData;

    return tranformedData
      .map((section: any) => {
        const filteredItems = section.previewConfigItems.filter((item: any) => {
          const itemName = item.name?.toLowerCase() || "";
          const itemValue = typeof item.value === "string" ? item.value.toLowerCase() : "";

          return itemName.includes(searchTerm.toLowerCase()) || itemValue.includes(searchTerm.toLowerCase());
        });
        return { ...section, previewConfigItems: filteredItems };
      })
      .filter((section: any) => section.previewConfigItems.length > 0);
  }, [tranformedData, searchTerm]);

  // this is for getting length of all data

  const singleArrayData = filteredData.map((item: any) => item.previewConfigItems).flat();
  const dataLength = singleArrayData.length;

  // for opening side drawer for update form
  const handleEditClick = () => {
    dispatch(uiSliceAction.onDrawrOpenHandler());
    dispatch(onGetHeaderTabIconsName("Edit"));
  };

  const getCityHandler = (StateId: any) => {
    dispatch(getAllCityByStateId(StateId));
  };

  const getAcademicProgramHandler = (careerId: any) => {
    dispatch(getApByCareerId(careerId));
  };

  return (
    <>
      <div className="flex items-center justify-between bg-white pt-4 py-[12px] px-3 w-full">
        <div className="px-3 py-[7px] border bg-white rounded-sm text-nowrap  text-gray-700">{`All (${dataLength})`}</div>
        <div className="w-[60%]">
          <input
            className="w-full px-4 py-2 border border-stroke focus:border-stroke rounded-sm outline-none dark:bg-form-input dark:border-strokedark"
            type="text"
            placeholder="Search...."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="px-4 py-[7px] border bg-white rounded-sm cursor-pointer" onClick={handleEditClick}>
          Edit
        </div>
      </div>

      {filteredData !== null && (
        <>
          {filteredData.map((section: any, index: number) => (
            <div key={index} className="mb-3 bg-white mx-2 shadow-md pb-4 rounded-b-md">
              <span key={index} className="block py-2 px-2 border-b border-gray-300 text-base bg-[#edf4fc] rounded-t-md my-2 font-semibold">
                {section.title}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 px-3 gap-x-5 gap-y-2">
                {section.previewConfigItems.map((item: any) => (
                  <p className="text-gray-500 text-sm border-b border-stone-300 py-1" key={item.id}>
                    <span className="mr-2 text-gray-600 font-semibold inline-block 2xl:min-w-[200px]">{item.name}:</span>
                    <span className={`${item.id === 1 && index === 0 ? "" : ""}`}> {item.value}</span>
                  </p>
                ))}
              </div>
            </div>
          ))}
        </>
      )}
      {isDrawerOpen && getHeaderTabIconsName === "Edit" && (
        <CustomSideDrawer>
          <UpdateLeadDetails onGetCity={getCityHandler} onGetAcademicProgram={getAcademicProgramHandler} />
        </CustomSideDrawer>
      )}
    </>
  );
};

export default LeadDetail;
