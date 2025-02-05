import { ErrorMessage, Field, Form, Formik } from "formik";
import { genderOptions } from "../../../../data/manage-leads/create-leads-data";
import SelectInput from "../../../../util/custom/FormInputs/SelectInput";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import ButtonInput from "../../../../util/custom/FormInputs/ButtonInput";
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

const BiographicalInfoForm: React.FC<FormType> = ({
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
  const { currentCoreCityData } = useSelector((state: RootState) => state.getAllCityDataByStateId);
  const { responseForCategory } = useSelector((state: RootState) => state.getAllCategory);
  const { responseForAdmitType } = useSelector((state: RootState) => state.getAllAdmitType);
  // console.log("isEditing====", isEditing);
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, actions) => {
        const updatedValues = { ...values };
        inputData.forEach((field: any) => {
          if (!updatedValues[field.name]) {
            updatedValues[field.name] = ""; // Provide default if undefined
          }
        });

        // console.log(updatedValues);
        onSaveAndAddHandler?.({ values: updatedValues, actions });
      }}
    >
      {({ values, setFieldValue }) => (
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
          <div className="grid gap-4 grid-cols-2 lg:grid-cols-3">
            {inputData.map((field: any, index: number) => (
              <div key={index} className="w-full">
                <label htmlFor={field.name} className="block mb-1 font-medium text-gray-700 ml-1.5">
                  {field.label}:{field.isrequired && <span className="text-red-500 ml-1">*</span>}
                </label>
                {field.type === "select" ? (
                  <SelectInput
                    nameForSelect={field.name}
                    options={
                      field.label === "Academic Career"
                        ? careerOptions
                        : field.name === "academicProgramId" || field.label === "Program"
                        ? programOptions
                        : field.label === "Lead Source"
                        ? LeadSourceOptions
                        : field.name === "currentCoreStateId"
                        ? StateOptions
                        : field.name === "currentCoreCityId"
                        ? currentCoreCityData
                        : field.label === "Category"
                        ? responseForCategory
                        : field.label === "Admit Type"
                        ? responseForAdmitType
                        : field.label === "Gender"
                        ? genderOptions
                        : []
                    }
                    isLoading={field.label === "Academic Career" ? isLoadingForCareer : field.name === "academicProgramId" ? isLoadingForProgram : false}
                    isModeFor="quickAddForm"
                    style={`${
                      isEditing ? "border border-gray-200" : "border border-gray-200 bg-gray-100 "
                    }   px-2 py-1 outline-none focus:border-gray-400  focus:outline-none rounded-md w-full max-w-full `}
                    onGetCity={onGetCity}
                    onGetAcademicProgram={onGetAcademicProgram}
                    onChangeHandlerForSelectedValue={(value) => setFieldValue(field.name, value)}
                    value={values[field.name]}
                    cndtVal={field.label}
                    secondCndtName="Academic Career"
                    thirdCndtName="State"
                    isReadOnly={!isEditing}
                  />
                ) : (
                  <Field
                    name={field.name}
                    type={field.type}
                    disabled={!isEditing}
                    as={field.type === "textarea" ? "textarea" : "input"}
                    className={`w-full ${
                      isEditing ? "border border-gray-200" : "border text-gray-700 border-gray-200 bg-gray-100"
                    }  px-2 py-1 rounded-md focus:outline-none focus:border-gray-400`}
                  />
                )}
                {isEditing && <ErrorMessage name={field.name} component="div" className="text-red-500 text-sm mt-1" />}
              </div>
            ))}
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default BiographicalInfoForm;
