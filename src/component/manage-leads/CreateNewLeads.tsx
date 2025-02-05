import { useEffect, useMemo, useState } from "react";
import { tabsDataForCreateLeads } from "../../data/manage-leads/ManageLeadsData";
import { Form, Formik } from "formik";
import { getValidationSchema, initialValueForAll } from "../../data/manage-leads/create-leads-data";
import ButtonInput from "../../util/custom/FormInputs/ButtonInput";
import CustomFormForTab from "../../util/custom/CustomFormForTab";
import transformPayload from "./genral/transformPayload";
import { useSelector } from "react-redux";
import store, { RootState } from "../../store";
import { onGetCreateLeadErrors, onResetFinalDataForForm } from "../../store/ui/ui-slice";
import { useNavigate } from "react-router-dom";
import { selectReduxOptions } from "./genral/selectReduxOptions";
import { fieldMapping } from "./genral/fieldOptionsforAddress";
import { nextHandlerForPreview } from "./genral/nextHandlerForPreview";
import { getPreviousAndNextTab } from "./genral/getPreviousAndNextTab";

import {
  addLeadAdditionalDetails,
  resetResposneforLeadAdditionalDetails,
  takeActionForLeadAdditionalDetails,
} from "../../store/lead-capturing/create-lead-with-additional-details-slice";
import { getAllCityByStateId } from "../../store/get/get-allCity-byStateId-slice";

interface NewLeadsTypes {
  onGetCity: any;
  onGetAcademicProgram: (e: any) => void;
}
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const CreateNewLeads: React.FC<NewLeadsTypes> = ({ onGetCity, onGetAcademicProgram }) => {
  // console.log(initialValueForAll);
  const [activeTab, setActiveTab] = useState<number>(0);
  const { isOpenFor12th, isOpenForDiploma, isNotUndergraduate, getLeadsPrimaryNumber } = useSelector((state: RootState) => state.ui);
  const { getCreateLeadErrors } = useSelector((state: RootState) => state.ui);

  const reduxOptions = useSelector(selectReduxOptions);
  const memoizedReduxOptions = useMemo(() => reduxOptions, [reduxOptions]);

  const { isLoading, isError, resetActions, responseOfLeadAdditionalDetails } = useSelector((state: RootState) => state.addLeadAdditionalDetails);

  const navigate = useNavigate();

  const saveHandler = (finalData: any) => {
    const { values, actions } = finalData;
    const newLeadDetailsData = transformPayload(values, false);
    console.log(newLeadDetailsData);
    store.dispatch(takeActionForLeadAdditionalDetails(actions));
    store.dispatch(addLeadAdditionalDetails(newLeadDetailsData));
  };

  useEffect(() => {
    if (!isError && !isLoading && responseOfLeadAdditionalDetails) {
      store.dispatch(resetResposneforLeadAdditionalDetails());

      if (resetActions) {
        resetActions.resetForm();
        store.dispatch(onResetFinalDataForForm());
        setTimeout(() => {
          navigate("/manage-leads");
        }, 2000);
      }
    }
  }, [isLoading, isError, responseOfLeadAdditionalDetails]);

  const handleTabClick = (tabId: number) => {
    setActiveTab(tabId);
  };

  const { nextTabName, previousTabName } = getPreviousAndNextTab(activeTab);

  return (
    <div className="md:flex items-start w-full gap-4 lg:gap-5 container mx-auto border bg-white rounded-md shadow-md mb-5 px-4 py-4 relative  mt-8 ">
      <ul className="w-full flex flex-col gap-y-3 md:max-w-[220px] bg-gray-50 border border-gray-300 rounded-md  py-5 px-2 md:sticky md:top-[105px]">
        {tabsDataForCreateLeads.map((tab) => (
          <li
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={`tab flex  items-center text-sm cursor-pointer transition-all duration-300 py-3 px-3 font-semibold ${
              activeTab === tab.id ? " text-white bg-blue-700 rounded-sm" : "text-gray-800 hover:text-blue-600"
            }`}
          >
            {tab.label}
          </li>
        ))}
      </ul>

      <div className={`bg-gray-50 rounded-md w-full pt-5 pb-16 relative mt-5 md:mt-0 border border-gray-300 `}>
        <Formik
          initialValues={initialValueForAll}
          validationSchema={getValidationSchema({
            isOpenFor12th,
            isOpenForDiploma,
            isNotUndergraduate,
          })}
          onSubmit={async (values, actions) => {
            await sleep(500);
            const finalData = {
              values,
              actions,
            };

            saveHandler(finalData);
          }}
        >
          {({ values, setFieldValue, validateForm }) => {
            // console.log(values);

            const allKeys = Object.keys(values);

            const handleNext = async () => {
              const isLastTab = activeTab === tabsDataForCreateLeads.length - 2;

              if (isLastTab) {
                await validateForm().then((errors) => {
                  if (Object.keys(errors).length === 0) {
                    nextHandlerForPreview({ values }, memoizedReduxOptions);
                  } else {
                    // const errorsWithValidName = transformData(errors, sectionsConfig);
                    store.dispatch(onGetCreateLeadErrors(errors));
                  }
                });
              }

              setActiveTab((prev) => Math.min(prev + 1, tabsDataForCreateLeads.length - 1));
            };

            useEffect(() => {
              // Update the contact field dynamically based on name and phone changes
              setFieldValue("contact[0].contactName", values.name || "");
              if (!getLeadsPrimaryNumber) {
                setFieldValue("contact[0].contactNumber", values.phone || "");
              }
              // setFieldValue("contact[0].primary", true);
              if (values.phone !== "") {
                setFieldValue("contact[0].contactRelation", "Self");
              }

              // if (values.contact[0].contactName !== "" && values.contact[0].contactNumber !== "" && values.contact[0].contactRelation !== "") {
              //   setFieldValue("contact[0].primary", true);
              // }

              if (getLeadsPrimaryNumber && allKeys[2] === "phone") {
                setFieldValue("phone", getLeadsPrimaryNumber);
                console.log("getLeadsPrimaryNumber", getLeadsPrimaryNumber);
              }
            }, [values.name, values.phone, values.contact[0].contactRelation, getLeadsPrimaryNumber, setFieldValue]);

            const handleCheckboxChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
              const isChecked = e.target.checked;

              if (isChecked) {
                const stateId = values["coreStateId"];
                const target = "coreStateId2";
                store.dispatch(getAllCityByStateId({ stateId, target }));
              }

              for (const [secondaryField, primaryField] of Object.entries(fieldMapping)) {
                await setFieldValue(secondaryField, isChecked ? values[primaryField as keyof typeof values] : "");
              }

              await validateForm();
            };

            return (
              <Form className="relative" autoComplete="off">
                <div className="w-full">
                  {tabsDataForCreateLeads &&
                    tabsDataForCreateLeads.map((tab: any) => {
                      return (
                        <div key={tab.contentId} id={tab.contentId} className={`tab-content w-full pb-5 border-b-2 border-gray-200 ${activeTab === tab.id ? "block" : "hidden"}`}>
                          <div className="pb-2 border-b-2 border-gray-200">
                            <h4
                              className={`text-lg font-bold text-gray-600 px-4 text-center
                                }`}
                            >
                              {tab.label === "Preview" && getCreateLeadErrors ? "Please address the following errors" : tab.label === "Preview" ? "Review Your Details" : tab.label}
                            </h4>
                          </div>

                          <CustomFormForTab
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
                {activeTab === 4 && (
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

                  {activeTab <= tabsDataForCreateLeads.length - 2 && (
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
  );
};

export default CreateNewLeads;
