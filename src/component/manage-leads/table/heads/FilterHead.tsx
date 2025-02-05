import { Fragment, useEffect } from "react";
import { filterDataForTable } from "../../../../data/manage-leads/ManageLeadsData";
import SelectInput from "../../../../util/custom/FormInputs/SelectInput";
import { useSelector } from "react-redux";
import store, { RootState } from "../../../../store";
import { getDate } from "../../../../util/actions/Date";
import { getResetFunctionForFilter, onSetErrorHandler, uiSliceAction } from "../../../../store/ui/ui-slice";
import { dateRangeChangehandler, disabledCustomDateHandelr, disabledSelectedDateRangeHandler, handleCustomDate } from "../../genral/FilterHeadDropdowns";
import { validateFormValues } from "../../genral/validateFormValues";
import { getLeadCaptureByUserEmail } from "../../../../store/lead-capture/get-all-lead-capture-by-userEmail-slice";
import { Tooltip } from "react-tooltip";

interface typeFilterHead {
  applyFilters: (data: any) => void;
  resetFilters: () => void;
  formRef: React.RefObject<HTMLFormElement>;
}
const FilterHead: React.FC<typeFilterHead> = ({ applyFilters, resetFilters, formRef }) => {
  const { isError } = useSelector((state: RootState) => state.ui);

  const { isLoading: isLoadingForStage, responseForLeadStage: leadStageData } = useSelector((state: RootState) => state.leadStageValues);
  const { isLoading: isLoadingForSource, responseForLeadSource: leadSourceData } = useSelector((state: RootState) => state.leadSourceValues);
  const { isSelectedDateRange, isCustomDate, isFilterDropdown } = useSelector((state: RootState) => state.ui);

  const { userDetails } = useSelector((state: RootState) => state.getLoggedInUserData);
  const userEmail = userDetails.email;

  const { startDate, endDate } = getDate();

  useEffect(() => {
    store.dispatch(getResetFunctionForFilter(resetFilters));
  }, [resetFilters]);

  // Submit handler
  const submitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const formValues: Record<string, string | number> | any = {};

    for (let [key, value] of formData.entries()) {
      formValues[key] = value;
    }
    delete formValues["owner"];

    if (!formValues["customDateOption"]) {
      formValues["customDateOption"] = "All Time";
    }

    if (formValues["customDateOption"] === "custom" && formValues["customStartDate"] === "" && formValues["customEndDate"] === "") {
      formValues["customStartDate"] = startDate;
      formValues["customEndDate"] = endDate;
    }

    formValues["leadSource"] = 172;

    // check for validation
    const isValid = validateFormValues(formValues);
    if (isValid) {
      store.dispatch(onSetErrorHandler(false));
      applyFilters(formValues);
    }
  };

  // Periodic API Call
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (userEmail) {
        store.dispatch(getLeadCaptureByUserEmail(userEmail));
      }
    }, 120000); // Call API every 5 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [userEmail]);

  const handleRefresh = () => {
    if (userEmail !== undefined) {
      store.dispatch(getLeadCaptureByUserEmail(userEmail));
    }
  };
  return (
    <>
      <div className="flex ">
        <div className="flex gap-x-2 py-2  px-3 w-full">
          <form className="flex justify-center gap-x-2 items-center" onSubmit={submitHandler} ref={formRef}>
            {filterDataForTable.map((filter: any) => {
              return (
                <div key={filter.name} className="flex items-center gap-3">
                  <label className="text-black font-medium text-sm text-nowrap">{filter.name !== "Custom" && filter.name !== "Custom Date" && filter.name}</label>
                  <div className="select-container">
                    {filter.name !== "Custom" && filter.name !== "Custom Date" && (
                      <>
                        <SelectInput
                          isReadOnly={filter.name === "Lead Source" || filter.name === "Owner" ? true : false}
                          style="__custom-select"
                          isLoading={filter.name === "Lead Stage" ? isLoadingForStage : filter.name === "Lead Source" ? isLoadingForSource : false}
                          nameForSelect={filter.value}
                          cndtVal={filter.name}
                          firstCndtName="Date Range"
                          secondCndtName="modifiedOn"
                          thirdCndtName="createdOn"
                          options={filter.name === "Lead Stage" ? leadStageData : filter.name === "Lead Source" ? leadSourceData : filter.options}
                          setIsEnabled={disabledSelectedDateRangeHandler}
                          onChangeHandler={dateRangeChangehandler}
                        />
                        <i className="fas fa-chevron-down dropdown-icon text-[14px]"></i>
                      </>
                    )}

                    {filter.name === "Custom" && isSelectedDateRange && (
                      <>
                        <SelectInput
                          isReadOnly={false}
                          style="__custom-select"
                          nameForSelect={filter.value}
                          isRequired={filter.isRequired}
                          cndtVal={filter.name}
                          firstCndtName="Custom"
                          secondCndtName="custom"
                          options={filter.options}
                          setIsEnabled={disabledCustomDateHandelr}
                          onChangeHandler={handleCustomDate}
                        />
                        <i className="fas fa-chevron-down dropdown-icon text-[14px]"></i>
                      </>
                    )}
                  </div>

                  {filter.name === "Custom Date" && isCustomDate && isSelectedDateRange && (
                    <>
                      {filter.inputs.map((input: any) => {
                        return (
                          <Fragment key={input.id}>
                            <input
                              type={input.type}
                              name={input.name}
                              className="__custom_date"
                              onChange={() => store.dispatch(uiSliceAction.onManageFilterDropdownHandler(false))}
                            />
                          </Fragment>
                        );
                      })}
                    </>
                  )}
                </div>
              );
            })}

            {!isFilterDropdown && (
              <button type="submit" className=" border border-[#c9c9c9] bg-transparent text-sm  text-black font-medium rounded px-2 py-0.5 ">
                Go
              </button>
            )}
            {isFilterDropdown && (
              <button className=" px-4 py-1 bg-red-500 text-white rounded text-sm" onClick={resetFilters}>
                Reset
              </button>
            )}
            <div className="flex space-x-2 ml-3">
              {/* <i className="fas fa-cog text-gray-500"></i> */}
              <button type="button" onClick={handleRefresh}>
                <i className="fas fa-sync-alt text-gray-500 table-icon"></i>
              </button>
              <Tooltip anchorSelect=".table-icon" place="right-start">
                Refresh Table
              </Tooltip>
            </div>
          </form>

          {/* <span className=" mt-1 sub_bar1 pr-2">
            <i className="fa fa-bars cursor-pointer text-gray-500" aria-hidden="true"></i>
          </span> */}
        </div>
        {/* <span className=" mt-3 mr-3 sub_bar2 ">
          <i className="fa fa-bars cursor-pointer text-gray-500" aria-hidden="true"></i>
        </span> */}
      </div>

      <span className={isError ? `px-3 text-sm text-red-500 relative bottom-2` : `hidden`}>Please Select atleast one field</span>
    </>
  );
};

export default FilterHead;
