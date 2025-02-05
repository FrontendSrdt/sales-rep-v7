import React, { useEffect, useMemo, useState } from "react";
import { sectionsConfigForLeadUpdate, tabsDataForUpdateLeads } from "../../../../data/manage-leads/ManageLeadsData";
import { Form, Formik } from "formik";
import { getValidationSchema } from "../../../../data/manage-leads/create-leads-data";
import CustomFormForTab from "../../../../util/custom/CustomFormForTab";
import ButtonInput from "../../../../util/custom/FormInputs/ButtonInput";
import store, { RootState } from "../../../../store";
import { useSelector } from "react-redux";
import { fieldMapping } from "../../genral/fieldOptionsforAddress";
import { getPreviousAndNextTab } from "../../genral/getPreviousAndNextTab";
import { mapBackendResponseToInitialValues } from "../../genral/convertApirRsponseToInitialValues";
import { nextHandlerForPreview } from "../../genral/nextHandlerForPreview";
import { selectReduxOptions } from "../../genral/selectReduxOptions";
import { transformData } from "../../genral/transformPayloadForPreview";
import { ondisableUndergraduateHandler, onGetCreateLeadErrors, uiSliceAction } from "../../../../store/ui/ui-slice";
import transformPayload from "../../genral/transformPayload";
import { resetResponseForUpdateLeaddetails, updateLeadAdditionalDetails } from "../../../../store/lead-capturing/update-leadAdditionalDetails-slice";

interface propsType {
  onGetCity: (e: any) => void;
  onGetAcademicProgram: (e: any) => void;
}

const UpdateLeadDetails: React.FC<propsType> = ({ onGetCity, onGetAcademicProgram }) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const { isOpenFor12th, isOpenForDiploma, isNotUndergraduate, getLeadsPrimaryNumber } = useSelector((state: RootState) => state.ui);

  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
  const { leadAdditionalDetailsDataById } = useSelector((state: RootState) => state.getLeadAdditionalDetailsDataById);

  const initialValueForUpdateLead = mapBackendResponseToInitialValues(leadAdditionalDetailsDataById);

  // console.log("initialValueForUpdateLead", initialValueForUpdateLead);

  const { responseOfUpdateLeadAdditionaldetails, isError } = useSelector((state: RootState) => state.leadAdditionalDetailsUpdate);

  const saveHandler = (finalData: any) => {
    const { values } = finalData;
    const newLeadDetailsData = transformPayload(values, true);
    // (newLeadDetailsData.personal as any)["leadSourceId"] = leadCaptureId;

    if (isOpenFor12th) {
      delete newLeadDetailsData["diploma"];
    } else if (isOpenForDiploma) {
      delete newLeadDetailsData["twelfthBoard"];
    }
    if (!isNotUndergraduate) {
      delete newLeadDetailsData["ug"];
    }

    console.log("newLeadDetailsData =", newLeadDetailsData);
    store.dispatch(updateLeadAdditionalDetails(newLeadDetailsData));
  };

  useEffect(() => {
    if (leadAdditionalDetailsDataById.twelfthSchool) {
      store.dispatch(uiSliceAction.onShow12thHandler());
      store.dispatch(uiSliceAction.onDisabledDiplomaHandler());
    } else if (leadAdditionalDetailsDataById.diplomaSchool) {
      store.dispatch(uiSliceAction.onShowDiplomaHandler());
      store.dispatch(uiSliceAction.onDisabled12thHandler());
    }

    if (leadAdditionalDetailsDataById.ugSchool || leadAdditionalDetailsDataById.academicCareerId =="46") {
      store.dispatch(ondisableUndergraduateHandler());
    }
  }, []);

  const handleTabClick = (tabId: number) => {
    setActiveTab(tabId);
  };

  const reduxOptions = useSelector(selectReduxOptions);
  const memoizedReduxOptions = useMemo(() => reduxOptions, [reduxOptions]);

  const { nextTabName, previousTabName } = getPreviousAndNextTab(activeTab);

  useEffect(() => {
    if (!isError && responseOfUpdateLeadAdditionaldetails) {
      store.dispatch(resetResponseForUpdateLeaddetails());
      store.dispatch(uiSliceAction.onDrawrCloseHandler());
    }
  }, [responseOfUpdateLeadAdditionaldetails, isError]);

  return (
    <>
      <div className="bg-[#F7F7F7] py-5 px-5 border-b ">
        <h2 className="text-lg font-bold">Edit</h2>
      </div>
      <div className=" items-start w-full  container mx-auto  rounded-md   relative">
        <ul className="w-full flex justify-evenly  rounded-md  px-2 md:sticky ">
          {tabsDataForUpdateLeads.map((tab) => (
            <li
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`tab flex items-center text-sm cursor-pointer py-4 px-3 font-semibold ${
                activeTab === tab.id ? "border-b-2 border-blue-500 rounded-sm" : "text-gray-800 hover:text-blue-600 border-b-2 border-transparent"
              }`}
            >
              {tab.label}
            </li>
          ))}
        </ul>
        <hr />
        <div className={` rounded-md w-full pb-16 relative overflow-auto h-[calc(100vh-125px)]  `}>
          <Formik
            initialValues={initialValueForUpdateLead}
            validationSchema={getValidationSchema({
              isOpenFor12th,
              isOpenForDiploma,
              isNotUndergraduate,
            })}
            onSubmit={async (values, actions) => {
              // console.log("click");

              await sleep(500);
              const finalData = {
                values,
                actions,
              };

              saveHandler(finalData);
              // console.log(finalData);
            }}
          >
            {({ values, setFieldValue, validateForm }) => {
              // console.log("values= ", values);
              const allKeys = Object.keys(values);

              const handleNext = async () => {
                const isLastTab = activeTab === tabsDataForUpdateLeads.length - 2;

                if (isLastTab) {
                  await validateForm().then((errors) => {
                    if (Object.keys(errors).length === 0) {
                      //next handler for preview moved to general
                      nextHandlerForPreview({ values }, memoizedReduxOptions);
                    } else {
                      const errorsWithValidName = transformData(errors, sectionsConfigForLeadUpdate);
                      store.dispatch(onGetCreateLeadErrors(errorsWithValidName));
                    }
                  });
                }

                setActiveTab((prev) => Math.min(prev + 1, tabsDataForUpdateLeads.length - 1));
              };

              useEffect(() => {
                // Update the contact field dynamically based on name and phone changes
                setFieldValue("contact[0].contactName", values.name || "");
                // setFieldValue("contact[0].primary", true);
                if (!getLeadsPrimaryNumber) {
                  setFieldValue("contact[0].contactNumber", values.phone || "");
                }
                // setFieldValue("contact[0].primary", true);
                if (values.phone !== "") {
                  setFieldValue("contact[0].contactRelation", "Self");
                }

                if (getLeadsPrimaryNumber && allKeys[2] === "phone") {
                  setFieldValue("phone", getLeadsPrimaryNumber);
                  console.log("getLeadsPrimaryNumber", getLeadsPrimaryNumber);
                }
              }, [values.name, values.phone, values.contact[0]?.contactRelation, getLeadsPrimaryNumber, setFieldValue]);

              const handleCheckboxChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
                const isChecked = e.target.checked;

                // Set or clear secondary fields based on checkbox state
                for (const [secondaryField, primaryField] of Object.entries(fieldMapping)) {
                  await setFieldValue(secondaryField, isChecked ? values[primaryField as keyof typeof values] : "");
                }
                await validateForm();
              };
              return (
                <Form className="relative" autoComplete="off">
                  <div className="w-full">
                    {tabsDataForUpdateLeads &&
                      tabsDataForUpdateLeads.map((tab: any) => {
                        return (
                          <div key={tab.contentId} id={tab.contentId} className={`tab-content w-full pb-5  ${activeTab === tab.id ? "block" : "hidden"}`}>
                            <div className="pb-2">
                              {/* <h4
                                className={`text-lg font-bold text-gray-600 px-4 text-center
                                }`}
                              >
                                {tab.label === "Preview" ? "Review Your Details" : tab.label}
                              </h4> */}
                            </div>

                            <CustomFormForTab
                              isModeUpdate={true}
                              values={values}
                              onGetCity={onGetCity}
                              setFieldValue={setFieldValue}
                              inputData={tab.contentForInput}
                              onGetAcademicProgram={onGetAcademicProgram}
                              handleCheckboxChange={handleCheckboxChange}
                              previewData={tab.contentForPreview}
                            />
                          </div>
                        );
                      })}
                  </div>
                  {activeTab === 3 && (
                    <div className="flex justify-end absolute -bottom-[75px] right-0  pb-5 px-4 z-50">
                      <ButtonInput
                        style="bg-blue-700 px-10 py-2 rounded-full text-white text-base font-medium text-base "
                        // btnText={activeTab <= tabsDataForCreateLeads.length - 2 ? "Next" : "Save"}
                        btnText={"Save"}
                        btnType="submit"
                        isEnableForAction={false}
                      />
                    </div>
                  )}

                  <div className={`absolute  bottom-[-55px] left-0  gap-x-2 w-full flex  px-4 ${activeTab == 0 ? "justify-end " : "justify-between"}`}>
                    {activeTab != 0 && (
                      <span
                        className="group success block relative cursor-pointer bg-blue-700 px-10 py-2 rounded-full text-white font-medium text-base"
                        onClick={() => setActiveTab((prev) => Math.max(prev - 1, 0))}
                      >
                        Previous
                        <span className=" transition-all duration-500 invisible opacity-0 group-hover:visible group-hover:opacity-100 absolute left-[50%] -top-7 -translate-x-[50%]  text-[10px] bg-black text-white bg-opacity-65 rounded-sm text-nowrap px-1">
                          {previousTabName}
                        </span>
                      </span>
                    )}

                    {activeTab <= tabsDataForUpdateLeads.length - 2 && (
                      <span className="group relative success block cursor-pointer bg-blue-700 px-10 py-2 rounded-full text-white font-medium text-base" onClick={handleNext}>
                        Next
                        <span className=" transition-all duration-500 invisible opacity-0 group-hover:visible group-hover:opacity-100 absolute left-[50%] -top-7 -translate-x-[50%] text-[10px] bg-black text-white bg-opacity-65 px-1 rounded-sm text-nowrap">
                          {nextTabName}
                        </span>
                      </span>
                    )}
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default UpdateLeadDetails;
