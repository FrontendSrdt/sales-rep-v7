import { Form, Formik } from "formik";
import ButtonInput from "../../../../util/custom/FormInputs/ButtonInput";
import { RxCheck, RxCross2 } from "react-icons/rx";
import InterestShownTable from "./InterestShownTable";

interface TabFormType {
  tabName?: string;
  isReadOnly?: boolean;
  isModeUpdate?: boolean;
  initialValues: any;
  validationschema: any;
  onSaveAndAddHandler: any;
  btnText: string;
  btnType: string | any;
  isEnableForAction: boolean;
  isEditing: boolean;
  isRowAdded: boolean;
  setEditing: (e: any) => void;
  setIsRowAdded: (e: any) => void;
}

const InterestShownForm: React.FC<TabFormType> = ({
  initialValues,
  validationschema,
  onSaveAndAddHandler,
  btnType,
  isEnableForAction,
  isEditing,
  setEditing,
  setIsRowAdded,
  isRowAdded,
}) => {
  return (
    <div className={` w-full py-5 `}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationschema}
        onSubmit={(values, actions) => {
          const updatedValues = { ...values };

          // console.log(updatedValues);
          onSaveAndAddHandler?.({ values: updatedValues, actions });
        }}
      >
        {({ values }) => (
          <Form className="">
            {isEditing && (
              <div className="flex justify-end mb-10 gap-4 items-center mt-5 absolute -top-[11px] right-4">
                <button type="button" className=" py-1.5 font-medium rounded" onClick={() => setEditing(false)}>
                  <RxCross2 size={22} color="red" />
                </button>
                {isRowAdded && (
                  <ButtonInput style=" py-1.5 font-medium rounded" icon={<RxCheck size={24} color="green" />} btnType={btnType} isEnableForAction={isEnableForAction} />
                )}
              </div>
            )}

            <InterestShownTable values={values} isEditing={isEditing} setIsRowAdded={setIsRowAdded} isRowAdded={isRowAdded} />
            {/* Submit Button */}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default InterestShownForm;
