import { ErrorMessage, Field, Form, Formik } from "formik";
import { genderOptions } from "../../../../data/manage-leads/create-leads-data";
import SelectInput from "../../../../util/custom/FormInputs/SelectInput";
import { useSelector } from "react-redux";
import store, { RootState } from "../../../../store";
import ButtonInput from "../../../../util/custom/FormInputs/ButtonInput";
import { getAllCityByStateId } from "../../../../store/get/get-allCity-byStateId-slice";
import { FieldMappingForUpdateLeadDetails } from "../../genral/fieldOptionsforAddress";
import { RxCheck, RxCross2 } from "react-icons/rx";

interface FormType {
  btnText: string;
  btnType: string | any;
  tabName?: string;
  inputData: any;
  initialValues: any;
  validationSchema: any;
  isReadOnly?: boolean;
  onGetCity?: (e: any) => void;
  onGetAcademicProgram?: (e: any) => void;
  onSaveAndAddHandler?: (data: any) => void;
  isEnableForAction: boolean;
  isEditing: boolean;
  setEditing: (e: any) => void;
}

const AddressInfoForm: React.FC<FormType> = ({
  btnType,
  initialValues,
  validationSchema,
  inputData,
  isEnableForAction,
  onGetCity,
  onGetAcademicProgram,
  onSaveAndAddHandler,
  isEditing,
  setEditing,
}) => {
  const { isLoading: isLoadingForCareer, responseForAcademicCareer: careerOptions } = useSelector((state: RootState) => state.getAllAcademicCareer);
  const { isLoading: isLoadingForProgram, academicProgramDataByCareerId: programOptions } = useSelector((state: RootState) => state.getAllAcademicProgramByCareer);
  const { responseForLeadSource: LeadSourceOptions } = useSelector((state: RootState) => state.getAllLeadSource);
  const { responseForState: StateOptions } = useSelector((state: RootState) => state.getAllStatesData);
  const { responseForCategory } = useSelector((state: RootState) => state.getAllCategory);
  const { responseForAdmitType } = useSelector((state: RootState) => state.getAllAdmitType);
  const { isLoading: isLoadingForCity, coreCityData, coreCityId2Data } = useSelector((state: RootState) => state.getAllCityDataByStateId);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, actions) => {
        const updatedValues = { ...values };
        inputData.forEach((group: any) => {
          group.inputFields.forEach((field: any) => {
            if (!updatedValues[field.name]) {
              updatedValues[field.name] = ""; // Provide default if undefined
            }
          });
        });

        onSaveAndAddHandler?.({ values: updatedValues, actions });
      }}
    >
      {({ values, setFieldValue, validateForm }) => {
        const handleCheckboxChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
          const isChecked = e.target.checked;

          if (isChecked) {
            const stateId = values["coreStateId"];
            const target = "coreStateId2";
            store.dispatch(getAllCityByStateId({ stateId, target }));
          }

          for (const [secondaryField, primaryField] of Object.entries(FieldMappingForUpdateLeadDetails)) {
            await setFieldValue(secondaryField, isChecked ? values[primaryField as keyof typeof values] : "");
          }

          await validateForm();
        };
        return (
          <Form className="w-full" autoComplete="off">
            {/* Submit Button */}
            {isEditing && (
              <div className="flex justify-end mb-10 gap-4 items-center absolute top-[8px] right-4">
                <button type="button" className=" py-1.5 font-medium rounded" onClick={() => setEditing(false)}>
                  <RxCross2 size={22} color="red" />
                </button>
                <ButtonInput style=" py-1.5 font-medium rounded" icon={<RxCheck size={24} color="green" />} btnType={btnType} isEnableForAction={isEnableForAction} />
              </div>
            )}
            {inputData.map((section: any) => (
              <div key={section.id} className="mb-6">
                <h2 className="font-medium text-base mb-4 bg-[#e2d1ba] px-6 py-1.5 rounded-full inline-block">{section.heading || section.groupLabel}</h2>
                <div className="grid gap-4 grid-cols-2 lg:grid-cols-3">
                  {section.inputFields.map((field: any, index: number) => (
                    <div key={index} className="w-full">
                      {field.type === "select" ? (
                        <>
                          <label htmlFor={field.name} className="block mb-1 ml-1.5 text-gray-700 font-medium">
                            {field.label}
                            {field.isrequired && <span className="text-red-500 ml-1">*</span>}
                          </label>
                          <SelectInput
                            nameForSelect={field.name}
                            options={
                              field.label === "Academic Career"
                                ? careerOptions
                                : field.name === "academicProgramId" || field.label === "Program"
                                ? programOptions
                                : field.label === "Lead Source"
                                ? LeadSourceOptions
                                : field.label === "State"
                                ? StateOptions
                                : field.label === "Category"
                                ? responseForCategory
                                : field.label === "Admit Type"
                                ? responseForAdmitType
                                : field.label === "Gender"
                                ? genderOptions
                                : field.name === "coreCityId"
                                ? coreCityData
                                : field.name === "coreCityId2"
                                ? coreCityId2Data
                                : []
                            }
                            isLoading={
                              field.label === "Academic Career"
                                ? isLoadingForCareer
                                : field.name === "academicProgramId"
                                ? isLoadingForProgram
                                : field.name === "coreCityId" || field.name === "coreCityId2"
                                ? isLoadingForCity
                                : false
                            }
                            isModeFor="quickAddForm"
                            style={`${
                              isEditing ? "border border-gray-200" : "border border-gray-200 bg-gray-100"
                            }   px-2 py-1 outline-none focus:border-gray-400 focus:bg-gray-50 focus:outline-none rounded-md w-full max-w-full `}
                            onGetCity={onGetCity}
                            onGetAcademicProgram={onGetAcademicProgram}
                            onChangeHandlerForSelectedValue={(value) => setFieldValue(field.name, value)}
                            value={values[field.name]}
                            cndtVal={field.label}
                            secondCndtName="Academic Career"
                            thirdCndtName="State"
                            isReadOnly={!isEditing}
                          />
                        </>
                      ) : field.type === "checkbox" ? (
                        <>
                          <label className="flex items-center">
                            <input className="mr-1" type={field.type} name={field.name} onChange={handleCheckboxChange} />
                            {field.label}
                          </label>
                        </>
                      ) : (
                        <>
                          <label htmlFor={field.name} className="block mb-1 ml-1.5 text-gray-700 font-medium">
                            {field.label}
                            {field.isrequired && <span className="text-red-500 ml-1">*</span>}
                          </label>
                          <Field
                            name={field.name}
                            disabled={!isEditing}
                            type={field.type}
                            as={field.type === "textarea" ? "textarea" : "input"}
                            className={`w-full ${
                              isEditing ? "border border-gray-200" : "border border-gray-200 bg-gray-100"
                            }  px-2 py-1 rounded-md focus:outline-none focus:border-gray-400`}
                          />
                        </>
                      )}
                      {isEditing && <ErrorMessage name={field.name} component="div" className="text-red-500 text-sm mt-1" />}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddressInfoForm;
