import { useSelector } from "react-redux";
import { RootState } from "../../store";
import SelectInput from "./FormInputs/SelectInput";
import { inputConfigTypes, inputsType } from "../../types/manage-leads/manage-leads-type";
import { genderOptions, resultStatusOptions, typesForSectionOptions } from "../../data/manage-leads/create-leads-data";
import { ErrorMessage, Field } from "formik";
import ContactTable from "../../component/manage-leads/genral/ContactTable";
import ShowPreview from "../../component/manage-leads/ShowPreview";
import ShowCreateNewLeadErrors from "../../component/manage-leads/ShowCreateNewLeadErrors";

interface TabFormType {
  values: any;
  inputData: any;
  tabName?: string;
  isReadOnly?: boolean;
  isModeUpdate?: boolean;
  onGetCity?: (e: any) => void;
  handleCheckboxChange?: (e: any) => void;
  onGetAcademicProgram?: (e: any) => void;
  setFieldValue?: (val1: any, val2: any) => void;
  previewData: any;
}

const CustomFormForTab: React.FC<TabFormType> = ({
  values,
  tabName,
  inputData,
  isModeUpdate,
  onGetCity,
  setFieldValue,
  handleCheckboxChange,
  onGetAcademicProgram,
  previewData,
}) => {
  const { isOpenFor12th, isOpenForDiploma, isNotUndergraduate, submittedFormData } = useSelector((state: RootState) => state.ui);
  // console.log(submittedFormData);
  const { isLoading: isLoadingForStates, responseForState: stateOptions } = useSelector((state: RootState) => state.getAllStatesData);
  const { isLoading: isLoadingForCity, coreCityData, currentCoreCityData, coreCityId2Data } = useSelector((state: RootState) => state.getAllCityDataByStateId);
  const { isLoading: isLoadingForTenthBoard, responseForTenthBoard: tenthBoardOptions } = useSelector((state: RootState) => state.getAllTenthBoardData);
  const { isLoading: isLoadingForTenthScheme, responseForTenthMarkingScheme: tenthSchemeOptions } = useSelector((state: RootState) => state.getAllTenthMarkingSchemeData);

  const { isLoading: isLoadingForCareer, responseForAcademicCareer: CareerOptions } = useSelector((state: RootState) => state.getAllAcademicCareer);
  const { isLoading: isLoadingForProgram, academicProgramDataByCareerId: ProgramOptions } = useSelector((state: RootState) => state.getAllAcademicProgramByCareer);
  const { isLoading: isLoadingForCategory, responseForCategory: CategoryOptions } = useSelector((state: RootState) => state.getAllCategory);

  const { isLoading: isLoadingForAdmitType, responseForAdmitType: AdmitTypeOptions } = useSelector((state: RootState) => state.getAllAdmitType);
  const { isLoading: isLoadingForLeadSource, responseForLeadSource: LeadSourceOptions } = useSelector((state: RootState) => state.getAllLeadSource);
  const { isLoading: isLoadingForTwelfthBoard, responseForTwelfthBoard: TwelfthBoardOptions } = useSelector((state: RootState) => state.getAllTwelfthBoardData);
  const { isLoading: isLoadingForTwelfthMarketingScheme, responseForTenthMarkingScheme: TwelfthMarketingSchemeOptions } = useSelector(
    (state: RootState) => state.getAllTenthMarkingSchemeData
  );

  const { isLoading: isLoadingForTwelfthResultStatus } = useSelector((state: RootState) => state.getAllTwelfthResultStatusData);
  const { isLoading: isLoadingForUgResultStatus } = useSelector((state: RootState) => state.getAllUgResultStatusData);

  // console.log("values =", values.currentCoreStateId);
  return (
    <div className={`tabs-for-${tabName} w-full ${!inputData && submittedFormData !== null ? "grid lg:grid-cols-2 gap-4 mt-4 px-4" : "px-4"} `}>
      {inputData &&
        inputData.map((inputGroup: inputConfigTypes) => {
          if (inputGroup.groupLabel === "12th" && !isOpenFor12th) {
            return null; // Hide the "12th" section if isOpenFor12th is false
          }

          if (inputGroup.groupLabel === "Diploma" && !isOpenForDiploma) {
            return null; // Hide the "Diploma" section if isOpenForDiploma is false
          }
          // if (inputGroup.groupLabel === "UG" && !isOpenForDiploma && !isOpenFor12th) {
          //   return null;
          // }
          if (inputGroup.groupLabel === "UG" && isNotUndergraduate === false) {
            return null;
          }
          return (
            <div className={`group-for-${inputGroup.groupLabel}`} key={inputGroup.id}>
              {inputGroup.groupLabel && <strong className={`${isModeUpdate ? "bg-gray-100" : "bg-gray-200"} my-4 block  py-2 px-2`}>{inputGroup.groupLabel}</strong>}

              {!previewData && (
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {inputGroup.groupInputsConfig && (
                      <>
                        {inputGroup.groupInputsConfig?.map((d: inputsType) => {
                          return (
                            <div key={d.id}>
                              {d.type === "select" ? (
                                <>
                                  <label htmlFor={d.name} className="flex">
                                    {d.label}
                                    {d.isrequired ? <span className="text-red-500 font-semibold text-xl ml-1 ">*</span> : ""} :
                                  </label>
                                  <SelectInput
                                    isReadOnly={false}
                                    nameForSelect={d.name}
                                    options={
                                      d.label === "State"
                                        ? stateOptions
                                        : d.name === "currentCoreCityId"
                                        ? currentCoreCityData.length === 0
                                          ? [
                                              {
                                                id: "",
                                                name: "No cities found",
                                              },
                                            ]
                                          : currentCoreCityData
                                        : d.name === "coreCityId"
                                        ? coreCityData.length === 0
                                          ? [
                                              {
                                                id: "",
                                                name: "No cities found",
                                              },
                                            ]
                                          : coreCityData
                                        : d.name === "coreCityId2"
                                        ? coreCityId2Data.length === 0
                                          ? [
                                              {
                                                id: "",
                                                name: "No cities found",
                                              },
                                            ]
                                          : coreCityId2Data
                                        : d.label === "Academic Career"
                                        ? CareerOptions
                                        : d.label === "Program"
                                        ? ProgramOptions.length === 0
                                          ? [
                                              {
                                                id: "",
                                                name: "No Programs found",
                                              },
                                            ]
                                          : ProgramOptions
                                        : d.label === "Category"
                                        ? CategoryOptions
                                        : d.label === "Admit Type"
                                        ? AdmitTypeOptions
                                        : d.label === "Gender"
                                        ? genderOptions
                                        : d.label === "10 plus 2 type"
                                        ? typesForSectionOptions
                                        : d.label === "10th Board"
                                        ? tenthBoardOptions
                                        : d.label === "10th Marking Scheme"
                                        ? tenthSchemeOptions
                                        : d.label === "Lead Source"
                                        ? LeadSourceOptions
                                        : d.label === "12th Board"
                                        ? TwelfthBoardOptions
                                        : d.label === "12th Marking Scheme"
                                        ? TwelfthMarketingSchemeOptions
                                        : d.label === "12th Result Status" || "UG Result Status" || "Diploma Result Status"
                                        ? resultStatusOptions
                                        : []
                                    }
                                    isLoading={
                                      d.label === "State"
                                        ? isLoadingForStates
                                        : d.label === "City"
                                        ? isLoadingForCity
                                        : d.label === "Academic Career"
                                        ? isLoadingForCareer
                                        : d.label === "program"
                                        ? isLoadingForProgram
                                        : d.label === "Category"
                                        ? isLoadingForCategory
                                        : d.label === "Admit Type"
                                        ? isLoadingForAdmitType
                                        : d.label === "10th Board"
                                        ? isLoadingForTenthBoard
                                        : d.label === "10th Marking Scheme"
                                        ? isLoadingForTenthScheme
                                        : d.label === "Lead Source"
                                        ? isLoadingForLeadSource
                                        : d.label === "12th Board"
                                        ? isLoadingForTwelfthBoard
                                        : d.label === "12th Marking Scheme"
                                        ? isLoadingForTwelfthMarketingScheme
                                        : d.label === "12th Result Status"
                                        ? isLoadingForTwelfthResultStatus
                                        : d.label === "UG Result Status"
                                        ? isLoadingForUgResultStatus
                                        : false
                                    }
                                    style={`border border-gray-200 ${
                                      isModeUpdate ? "bg-white" : "bg-gray-50"
                                    }  px-2 py-1 outline-none focus:border-gray-400 focus:bg-gray-50 focus:outline-none rounded-md w-full max-w-full `}
                                    cndtVal={d.label}
                                    firstCndtName="State"
                                    secondCndtName="Academic Career"
                                    fourthCndtName="TWELFTH"
                                    thirdCndtName="DIPLOMA"
                                    isModeFor="create"
                                    onGetCity={onGetCity}
                                    onGetAcademicProgram={onGetAcademicProgram}
                                    isModeUpdate={isModeUpdate}
                                    onChangeHandlerForSelectedValue={(value) => {
                                      if ((d.name === "coreTwelfthResultStatus" && value === "AWAITED") || (d.name === "coreDiplomaResultStatus" && value === "AWAITED")) {
                                        console.log("awaited selected");
                                        if (d.name === "coreTwelfthResultStatus") {
                                          setFieldValue && setFieldValue("TwelfthMarksOrGrade", "N/A");
                                        } else {
                                          setFieldValue && setFieldValue("coreDiplomaMarks", "N/A");
                                        }
                                      } else if ((d.name === "coreTwelfthResultStatus" && value === "DECLARED") || (d.name === "coreDiplomaMarks" && value === "DECLARED")) {
                                        if (d.name === "coreTwelfthResultStatus") {
                                          setFieldValue && setFieldValue("TwelfthMarksOrGrade", "");
                                        } else {
                                          setFieldValue && setFieldValue("coreDiplomaMarks", "");
                                        }
                                      }
                                      setFieldValue && setFieldValue(d.name, value);
                                    }}
                                    value={
                                      isModeUpdate
                                        ? d.label === "State" && d.name === "currentCoreStateId"
                                          ? values.currentCoreStateId
                                          : d.label === "State" && d.name === "coreStateId"
                                          ? values.coreStateId
                                          : d.label === "State" && d.name === "coreStateId2"
                                          ? values.coreStateId2
                                          : d.label === "City" && d.name === "currentCoreCityId"
                                          ? values.currentCoreCityId
                                          : d.label === "City" && d.name === "coreCityId"
                                          ? values.coreCityId
                                          : d.label === "City" && d.name === "coreCityId2"
                                          ? values.coreCityId2
                                          : d.label === "Academic Career"
                                          ? values.academicCareerId
                                          : d.label === "Program"
                                          ? values.academicProgramId
                                          : d.label === "Category"
                                          ? values.categoryId
                                          : d.label === "Admit Type"
                                          ? values.admitTypeId
                                          : d.label === "10th Board"
                                          ? values.coreTenthBoardId
                                          : d.label === "10th Marking Scheme"
                                          ? values.coreTenthMarkingSchemeId
                                          : d.label === "Lead Source"
                                          ? values.leadSourceId
                                          : d.label === "12th Board"
                                          ? values.coreTwelfthBoardId
                                          : d.label === "12th Marking Scheme"
                                          ? values.coreTwelfthMarkingSchemeId
                                          : d.label === "12th Result Status"
                                          ? values.coreTwelfthResultStatus
                                          : d.label === "UG Result Status"
                                          ? values.coreUgResultStatus
                                          : d.label === "Diploma Result Status"
                                          ? values.coreDiplomaResultStatus
                                          : d.label === "Gender"
                                          ? values.gender
                                          : d.label === "10 plus 2 type"
                                          ? values.tenth_plus_2_type
                                            ? values.tenth_plus_2_type
                                            : null
                                          : ""
                                        : values[d.name]
                                    }
                                  />
                                  <ErrorMessage name={d.name} component="div" render={(msg) => <div className="text-red-500 text-sm font-medium">{msg}</div>} />
                                </>
                              ) : d.type === "toggle" ? (
                                <p>Toggle Input</p>
                              ) : d.type === "checkbox" ? (
                                <>
                                  <label className="flex items-center">
                                    <input className="mr-1" type={d.type} name={d.name} onChange={handleCheckboxChange} />
                                    {d.label}
                                  </label>
                                </>
                              ) : (
                                <>
                                  <label htmlFor={d.name} className="flex">
                                    {d.label}
                                    {d.isrequired ? <span className="text-red-500 font-semibold text-xl ml-1 ">*</span> : ""} :
                                  </label>
                                  <Field
                                    className={`w-full border border-gray-200 ${
                                      isModeUpdate ? "bg-white" : "bg-gray-50"
                                    }  px-2 py-1 outline-none focus:border-gray-400 focus:bg-gray-50 focus:outline-none rounded-md ${d.isReadOnly ? "cursor-not-allowed" : ""}`}
                                    name={d.name}
                                    type={d.type}
                                    as={d.type === "textarea" ? "textarea" : "input"}
                                    disabled={d.isReadOnly}
                                  />
                                  {/* <Field className="border border-gray-500" type={d.type} name={d.name} value={values[d.name] || ""} /> */}
                                  <ErrorMessage name={d.name} component="div" render={(msg) => <div className="text-red-500 text-sm font-medium">{msg}</div>} />
                                </>
                              )}
                            </div>
                          );
                        })}
                      </>
                    )}
                  </div>
                  {inputGroup.tableInputsConfig && (
                    <>
                      <ContactTable values={values} />
                    </>
                  )}
                </div>
              )}
            </div>
          );
        })}

      {!inputData && submittedFormData !== null ? <ShowPreview isModeUpdate={isModeUpdate} /> : !inputData ? <ShowCreateNewLeadErrors /> : null}
    </div>
  );
};

export default CustomFormForTab;
