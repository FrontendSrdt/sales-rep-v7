import { useEffect } from "react";
import store from "../../../store";
import {
  ondisableUndergraduateHandler,
  onSetEnableForDiplomaInputFields,
  onSetEnableForTwefthInputFields,
  onSetErrorHandler,
  onSetUndergraduateHandler,
  uiSliceAction,
} from "../../../store/ui/ui-slice";

interface typeSelectInput {
  cndtVal: any; // filter.name
  options: [] | any; //filter.options
  firstCndtName?: string; // "Date Range"
  secondCndtVal?: any;
  secondCndtName?: any; //"modified_on"
  thirdCndtName?: any; // crated_on
  fourthCndtName?: any;
  isReadOnly: boolean;
  isLoading?: boolean;
  isRequired?: boolean;
  nameForSelect: string | any;
  value?: any;
  isModeFor?: string;
  style?: React.CSSProperties | string | any;
  onGetCity?: (val: any) => void;
  onGetAcademicProgram?: (val: any) => void;
  setIsEnabled?: (val: boolean) => void;
  onChangeHandler?: (e: any) => void; // handleDateRangeChange(e)
  onChangeHandlerForSelectedValue?: (val: any) => void;
  isModeUpdate?: boolean;
}
const SelectInput: React.FC<typeSelectInput> = ({
  style,
  cndtVal,
  options,
  isLoading,
  isReadOnly,
  setIsEnabled,
  onChangeHandler,
  onGetCity,
  nameForSelect,
  value,
  isModeFor,
  firstCndtName,
  secondCndtName,
  thirdCndtName,
  fourthCndtName,
  onGetAcademicProgram,
  onChangeHandlerForSelectedValue,
  isModeUpdate,
}) => {
  const dispatch = store.dispatch;

  // Handle the change event when an option is selected
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    console.log("nameForSelect= ", cndtVal, selectedValue);
    if (selectedValue === "DIPLOMA") {
      store.dispatch(onSetEnableForDiplomaInputFields());
    }
    if (selectedValue === "TWELFTH") {
      store.dispatch(onSetEnableForTwefthInputFields());
    }

    // console.log(selectedValue);

    onChangeHandlerForSelectedValue && onChangeHandlerForSelectedValue(selectedValue);

    if (cndtVal === firstCndtName && (isModeFor === "create" || isModeUpdate) && nameForSelect === "currentCoreStateId") {
      onGetCity && onGetCity({ stateId: selectedValue, target: "currentCoreStateId" });
    } else if (cndtVal === firstCndtName && (isModeFor === "create" || isModeUpdate) && nameForSelect === "coreStateId") {
      onGetCity && onGetCity({ stateId: selectedValue, target: "coreStateId" });
      onGetCity && onGetCity(selectedValue);
    } else if (cndtVal === firstCndtName && (isModeFor === "create" || isModeUpdate) && nameForSelect === "coreStateId2") {
      onGetCity && onGetCity({ stateId: selectedValue, target: "coreStateId2" });
    } else if (cndtVal === secondCndtName && (isModeFor === "create" || isModeUpdate)) {
      // console.log("if= ", selectedValue);
      dispatch(ondisableUndergraduateHandler());
      onGetAcademicProgram && onGetAcademicProgram(selectedValue);

      // condition for setting the isUndergraduate state true when undergraduate is selected for the academic career field based on id and name
      if (cndtVal === secondCndtName && selectedValue !== "46" && (isModeFor === "create" || isModeUpdate)) {
        dispatch(onSetUndergraduateHandler());
      }
    }
    // this condition is for isModeFor quick add form
    else if (cndtVal === secondCndtName && isModeFor === "quickAddForm") {
      // console.log("inside career condt");
      onGetAcademicProgram && onGetAcademicProgram(selectedValue);
    } else if (cndtVal === thirdCndtName && isModeFor === "quickAddForm" && nameForSelect === "currentCoreStateId") {
      // console.log("inside career condt");
      onGetCity && onGetCity({ stateId: selectedValue, target: "currentCoreStateId" });
    } else if (cndtVal === thirdCndtName && isModeFor === "quickAddForm" && nameForSelect === "coreStateId") {
      onGetCity && onGetCity({ stateId: selectedValue, target: "coreStateId" });
    } else if (cndtVal === thirdCndtName && isModeFor === "quickAddForm" && nameForSelect === "coreStateId2") {
      onGetCity && onGetCity({ stateId: selectedValue, target: "coreStateId2" });
    } else if (cndtVal === firstCndtName && (selectedValue === secondCndtName || selectedValue === thirdCndtName)) {
      // console.log("if")
      // setFilterGet(false);
      onChangeHandler && onChangeHandler(e);
      store.dispatch(uiSliceAction.onManageFilterDropdownHandler(false));
    } else if (cndtVal === firstCndtName && (selectedValue !== secondCndtName || selectedValue !== thirdCndtName)) {
      setIsEnabled && setIsEnabled(false);
      store.dispatch(uiSliceAction.onManageFilterDropdownHandler(false));
    } else if (selectedValue === fourthCndtName && (isModeFor === "create" || isModeUpdate)) {
      dispatch(uiSliceAction.onShow12thHandler());
      dispatch(uiSliceAction.onDisabledDiplomaHandler());
    } else if (selectedValue === thirdCndtName && (isModeFor === "create" || isModeUpdate)) {
      dispatch(uiSliceAction.onShowDiplomaHandler());
      dispatch(uiSliceAction.onDisabled12thHandler());
    } else if (cndtVal === firstCndtName && (selectedValue === secondCndtName || selectedValue === thirdCndtName)) {
      // console.log("if")
      // setFilterGet(false);
      onChangeHandler && onChangeHandler(e);
      dispatch(uiSliceAction.onManageFilterDropdownHandler(false));
    } else if (cndtVal === firstCndtName && (selectedValue !== secondCndtName || selectedValue !== thirdCndtName)) {
      // setFilterGet(false);
      setIsEnabled && setIsEnabled(false);
      dispatch(uiSliceAction.onManageFilterDropdownHandler(false));
      // console.log("else if")
    } else {
      // setFilterGet(false);
      dispatch(onSetErrorHandler(false));
      dispatch(uiSliceAction.onManageFilterDropdownHandler(false));
    }
  };

  useEffect(() => {
    // console.log("inside effect");
    if (isModeUpdate && nameForSelect === "coreStateId") {
      onGetCity && onGetCity({ stateId: value, target: "coreStateId" });
    } else if (isModeUpdate && nameForSelect === "coreStateId2") {
      onGetCity && onGetCity({ stateId: value, target: "coreStateId2" });
    } else if (isModeUpdate && nameForSelect === "currentCoreStateId") {
      // console.log("valueeee", value);
      onGetCity && onGetCity({ stateId: value, target: "currentCoreStateId" });
    } else {
      // console.log("Other cities..");
    }
  }, [value]);

  useEffect(() => {
    if (isModeUpdate && cndtVal === secondCndtName && nameForSelect === "academicCareerId") {
      onGetAcademicProgram && onGetAcademicProgram(value);
    }
  }, [value]);

  // console.log("options= ", options);

  // console.log(cndtVal);
  return (
    <>
      <select
        disabled={isReadOnly}
        // className={`${style} ${
        //   (cndtVal === "Lead Source" && isModeFor !== "create" && !isModeUpdate) || cndtVal === "Owner" ? "cursor-not-allowed" : ""
        // }  w-[130px] max-w-[130px]  appearance-none text-nowrap whitespace-nowrap overflow-hidden text-ellipsis `}
        className={`${style} ${
          cndtVal === "Owner" ? "cursor-not-allowed" : ""
        }  w-[130px] max-w-[130px]  appearance-none text-nowrap whitespace-nowrap overflow-hidden text-ellipsis  ${isReadOnly ? "cursor-not-allowed" : ""} `}
        name={nameForSelect}
        value={value}
        onChange={handleChange} // Use onChange for option selection
      >
        <option value="">--select--</option>
        {isLoading && <option>..loading</option>}
        {options.legnth === 0 && <option>Not Found</option>}
        {!isLoading &&
          options.legnth !== 0 &&
          options.map((option: any) => (
            <option key={option.id} value={option.value}>
              {option.name}
            </option>
          ))}
      </select>
    </>
  );
};

export default SelectInput;
