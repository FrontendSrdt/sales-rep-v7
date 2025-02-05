import { ErrorMessage, Field, Form, Formik } from "formik";
import SelectInput from "./FormInputs/SelectInput";
import ButtonInput from "./FormInputs/ButtonInput";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { inputsType } from "../../types/manage-leads/manage-leads-type";

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
}

const CustomForm: React.FC<FormType> = ({
  btnText,
  btnType,
  initialValues,
  validationSchema,
  inputData,
  isEnableForAction,
  onGetCity,
  onGetAcademicProgram,
  onSaveAndAddHandler,
}) => {
  const { isLoading: isLoadingForCareer, responseForAcademicCareer: careerOptions } = useSelector((state: RootState) => state.getAllAcademicCareer);
  const { isLoading: isLoadingForProgram, academicProgramDataByCareerId: programOptions } = useSelector((state: RootState) => state.getAllAcademicProgramByCareer);
  const { responseForLeadSource: LeadSourceOptions } = useSelector((state: RootState) => state.getAllLeadSource);
  const { responseForState: StateOptions } = useSelector((state: RootState) => state.getAllStatesData);
  const { currentCoreCityData } = useSelector((state: RootState) => state.getAllCityDataByStateId);
  // console.log("StateOptions====", StateOptions);
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
          <div className="grid gap-4 grid-cols-2">
            {inputData.map((field: inputsType) => (
              <div key={field.id} className="w-full">
                <label htmlFor={field.name} className="block mb-1">
                  {field.label}
                  {field.isrequired && <span className="text-red-500 ml-1">*</span>}
                </label>
                {field.type === "select" ? (
                  <SelectInput
                    nameForSelect={field.name}
                    options={
                      field.label === "Academic Career"
                        ? careerOptions
                        : field.name === "academicProgramId"
                        ? programOptions
                        : field.label === "Lead Source"
                        ? LeadSourceOptions
                        : field.label === "State"
                        ? StateOptions
                        : field.label === "City"
                        ? currentCoreCityData
                        : []
                    }
                    isLoading={field.label === "Academic Career" ? isLoadingForCareer : field.name === "academicProgramId" ? isLoadingForProgram : false}
                    isModeFor="quickAddForm"
                    style={`border border-gray-200 bg-gray-50  px-2 py-1 outline-none focus:border-gray-400 focus:bg-gray-50 focus:outline-none rounded-md w-full max-w-full `}
                    onGetCity={onGetCity}
                    onGetAcademicProgram={onGetAcademicProgram}
                    onChangeHandlerForSelectedValue={(value) => setFieldValue(field.name, value)}
                    value={values[field.name]}
                    cndtVal={field.label}
                    secondCndtName="Academic Career"
                    thirdCndtName="State"
                    isReadOnly={field.isReadOnly ?? false}
                  />
                ) : (
                  <Field
                    name={field.name}
                    type={field.type}
                    as={field.type === "textarea" ? "textarea" : "input"}
                    className="w-full border border-gray-200 bg-gray-50 px-2 py-1 rounded-md focus:outline-none focus:border-gray-400"
                  />
                )}
                <ErrorMessage name={field.name} component="div" className="text-red-500 text-sm mt-1" />
              </div>
            ))}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end mt-5">
            <ButtonInput style="bg-blue-700 px-5 py-2 rounded text-white text-base font-medium" btnText={btnText} btnType={btnType} isEnableForAction={isEnableForAction} />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CustomForm;
