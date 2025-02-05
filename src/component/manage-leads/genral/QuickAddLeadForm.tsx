import React, { useEffect } from "react";
import CustomForm from "../../../util/custom/CustomForm";
import { initialValueForQuickAddForm, quickAddFormInputs, validationSchemaForQuickAddForm } from "../../../data/manage-leads/quick-add-form-data";
import store, { RootState } from "../../../store";
import { getApByCareerId } from "../../../store/get/get-all-academic-program-by-academic-career-id-slice";
import { AddLeadCaptureByQuickAddForm } from "../../../store/lead-capture/create-lead-capture-byQuickAddForm-slice";
import { uiSliceAction } from "../../../store/ui/ui-slice";
import { useSelector } from "react-redux";
import { getAllCityByStateId } from "../../../store/get/get-allCity-byStateId-slice";

const QuickAddLeadForm: React.FC = () => {
  const { isLoading, responseOfLeadsCaptureByQuickAddForm, isRun } = useSelector((state: RootState) => state.addLeadCaptureByQuickAddForm);

  const getAcademicProgramHandler = (careerId: any) => {
    store.dispatch(getApByCareerId(careerId));
  };

  const getCityByStateHandler = ({ stateId, target }: { stateId: any; target: any }) => {
    if (stateId !== undefined) {
      store.dispatch(getAllCityByStateId({ stateId, target }));
    }
  };
  const addLeadCaptureHandler = (data: any) => {
    console.log(data);
    const { values } = data;
    // console.log(values);

    const payload = {
      name: values.name,
      email: values.email,
      phone: values.phone,
      leadEnquiryDTOS: [
        {
          coreStateId: values.currentCoreStateId,
          coreCityId: values.currentCoreCityId,
          academicCareerId: values.academicCareerId,
          academicProgramId: values.academicProgramId,
          leadSourceId: values.leadSourceId,
        },
      ],
    };

    // console.log(payload);
    store.dispatch(AddLeadCaptureByQuickAddForm(payload));
  };

  useEffect(() => {
    if (!isLoading && responseOfLeadsCaptureByQuickAddForm) {
      store.dispatch(uiSliceAction.onDisableModalForQuickAddLeadForm());
    }
  }, [responseOfLeadsCaptureByQuickAddForm, isRun]);

  return (
    <div className="p-3">
      <CustomForm
        btnText={"Save"}
        btnType={"submit"}
        initialValues={initialValueForQuickAddForm}
        validationSchema={validationSchemaForQuickAddForm}
        inputData={quickAddFormInputs}
        isEnableForAction={true}
        onGetAcademicProgram={getAcademicProgramHandler}
        onGetCity={getCityByStateHandler}
        onSaveAndAddHandler={addLeadCaptureHandler}
      />
    </div>
  );
};

export default QuickAddLeadForm;
