import Select from "react-select";
import { useEffect, useState } from "react";
import { InputDataType } from "../../../../data/manage-leads/filter-head-data";
import { useSelector } from "react-redux";
import store, { RootState } from "../../../../store";
import { getleadSubStagesById } from "../../../../store/lead-capturing/get-allLeadSubStages-byId-slice";
import { getLeadCaptureByFullName } from "../../../../store/lead-capture/get-allLeadCapture-By-fullName-slice";
import { transformDataForLeadStagesAndSource, transformDataForLeadSubStages } from "../../../../util/actions/transformFilterApiData";
import CustomModal from "../../../../util/custom/ui/CustomModal";
import ManageHamburgerColumn from "./ManageHamburgerColumn";
import { hamburgerModalData } from "../../../../data/manage-leads/ManageLeadsData";
import { onDisableModalForHamburger, onShowModalForHamburger } from "../../../../store/ui/ui-slice";
import { Tooltip } from "react-tooltip";
import { PiColumnsPlusRightThin } from "react-icons/pi";

interface PropsType {
  inputData: InputDataType[];
}

const FilterHeadV1: React.FC<PropsType> = ({ inputData }) => {
  const [filterpayload, setFilterPayload] = useState<Record<string, { key: string; value: string }>>({});
  const [selectedValues, setSelectedValues] = useState<Record<string, any>>({});
  const { responseForLeadStage: leadStageData } = useSelector((state: RootState) => state.leadStageValues);
  const { responseForLeadSource } = useSelector((state: RootState) => state.leadSourceValues);
  const { userDetails } = useSelector((state: RootState) => state.getLoggedInUserData);
  const { leadSubStagesDataById } = useSelector((state: RootState) => state.getleadSubStagesDataById);
  const { responseForOwner } = useSelector((state: RootState) => state.getAllOwner);
  const { responseForApplicationStatus } = useSelector((state: RootState) => state.getAllApplicationStatus);
  const { isHamburgerModalOpen } = useSelector((state: RootState) => state.ui);

  const fullName = userDetails?.fullName;
  const optionForLeadStages = transformDataForLeadStagesAndSource(leadStageData);
  const optionForLeadSource = transformDataForLeadStagesAndSource(responseForLeadSource);
  const optionForLeadSubStages = transformDataForLeadSubStages(leadSubStagesDataById);

  const handleFilterChange = (name: string, selectedOption: { value: string; label: string } | null) => {
    setFilterPayload((prev: any) => {
      if (!selectedOption) {
        const updatedPayload = { ...prev };
        delete updatedPayload[name];
        return updatedPayload;
      }
      return { ...prev, [name]: selectedOption ? selectedOption.label : null };
    });
    setSelectedValues((prev) => ({ ...prev, [name]: selectedOption }));

    if (selectedOption && name === "current_lead_stage_display_name") {
      store.dispatch(getleadSubStagesById(selectedOption.value));
    }
  };

  const handleDateChange = (name: string, value: string) => {
    setFilterPayload((prev: any) => {
      if (!value) {
        const updatedPayload = { ...prev };
        delete updatedPayload[name];
        return updatedPayload;
      }
      return { ...prev, [name]: value || null };
    });
    setSelectedValues((prev) => ({ ...prev, [name]: value }));
  };

  const resetFilters = () => {
    setFilterPayload({});
    setSelectedValues({});
  };

  // console.log("Filter Payload:", filterpayload);
  useEffect(() => {
    if (Object.keys(filterpayload).length > 0) {
      store.dispatch(getLeadCaptureByFullName(filterpayload));
    }
    if (Object.keys(filterpayload).length === 0) {
      const payload = {
        current_salesrep_full_name: fullName,
      };
      store.dispatch(getLeadCaptureByFullName(payload));
    }
  }, [filterpayload]);

  const closeModalForHamburger = () => {
    store.dispatch(onDisableModalForHamburger());
  };

  return (
    <div className="flex justify-between items-center  px-3 py-2">
      <div className="flex gap-3">
        {inputData.map((field: InputDataType) =>
          field.type === "select" ? (
            <div key={field.id} className=" flex  gap-y-1 items-start flex-col">
              <label className="text-sm font-medium pl-[1px]">{field.label}</label>
              <Select
                className="min-w-[212px]"
                options={
                  field.name === "current_lead_stage_display_name"
                    ? optionForLeadStages
                    : field.name === "current_lead_sub_stage_display_name"
                    ? optionForLeadSubStages.length > 0
                      ? optionForLeadSubStages
                      : [{ label: "No data found for this Lead Stage", value: "" }]
                    : field.name === "lead_source_description"
                    ? optionForLeadSource
                    : field.name === "current_salesrep_full_name"
                    ? responseForOwner
                    : field.name === "application_status_name"
                    ? responseForApplicationStatus
                    : null
                }
                value={selectedValues[field.name] || null}
                onChange={(selectedOption) => handleFilterChange(field.name, selectedOption)}
                isClearable
                isDisabled={field.name === "current_salesrep_full_name" && !userDetails?.authority?.some((role: string) => role === "ROLE_ADMIN" || role === "ROLE_MANAGER")}
                styles={{
                  control: (provided) => ({
                    ...provided,
                    minHeight: "27px",
                    height: "27px",
                    padding: "0 5px",
                  }),
                  placeholder: (provided) => ({
                    ...provided,
                    fontSize: "14px", // Reduce placeholder font size
                  }),
                  valueContainer: (provided) => ({
                    ...provided,
                    padding: "0 5px",
                  }),
                  input: (provided) => ({
                    ...provided,
                    margin: "0px",
                    padding: "0px",
                  }),
                  indicatorsContainer: (provided) => ({
                    ...provided,
                    height: "27px",
                  }),
                }}
              />
            </div>
          ) : field.type === "date" ? (
            <div key={field.id} className="flex  gap-y-1 items-start flex-col">
              <label className="text-sm font-medium pl-[1px]">{field.label}</label>
              <input
                type="date"
                className="border border-[#c9cccd] focus:outline-none focus:border-gray-400 rounded-[0.26rem] px-[6px] py-[1.7px] text-gray-600 text-sm min-w-[212px]"
                name={field.name}
                value={selectedValues[field.name] || ""}
                onChange={(e) => handleDateChange(field.name, e.target.value)}
              />
            </div>
          ) : null
        )}
      </div>
      {Object.keys(filterpayload).length > 0 && (
        <button onClick={resetFilters} className="bg-red-500 text-white px-[9px] py-[2px] mt-[21px] rounded">
          Reset Filters
        </button>
      )}

      {/* <i className="fa fa-bars cursor-pointer text-gray-500 text-[20px] mt-[20px] column" aria-hidden="true" onClick={() => store.dispatch(onShowModalForHamburger())}></i> */}
      <div className=" cursor-pointer text-[25px] mt-[20px] column" onClick={() => store.dispatch(onShowModalForHamburger())}>
        <PiColumnsPlusRightThin />
      </div>
      <Tooltip anchorSelect=".column" place="left" className="custom-tooltip">
        <div className="tooltip-content">
          Click to manage table columns. <br />
          Select checkboxes to add or remove columns dynamically.
        </div>
      </Tooltip>
      {isHamburgerModalOpen && (
        <CustomModal isMode="testAction" isShowModal={isHamburgerModalOpen} onHideModal={closeModalForHamburger} data={hamburgerModalData}>
          <ManageHamburgerColumn />
        </CustomModal>
      )}
    </div>
  );
};

export default FilterHeadV1;
