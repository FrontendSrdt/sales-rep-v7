import React, { useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import { useSelector } from "react-redux";
import store, { RootState } from "../../../store";
import { transformDataForLeadStagesAndSource, transformDataForLeadSubStages } from "../../../util/actions/transformFilterApiData";
import { changeStageFormData } from "../../../data/change-stage-data";
import { getleadSubStagesById } from "../../../store/lead-capturing/get-allLeadSubStages-byId-slice";
import { ChangeStageInBulk, takeActionForBulkChangeStage } from "../../../store/actions/bulk-change-stage-slice";

interface changeStageType {
  onHideModal: any;
}
// Validation Schema
const validationSchema = Yup.object().shape({
  current_lead_stage_display_name: Yup.string().required("Lead Stage is required"),
  current_lead_sub_stage_display_name: Yup.string().required("Lead Sub Stage is required"),
});

const ChangeStage: React.FC<changeStageType> = ({ onHideModal }) => {
  const { leadSubStagesDataById } = useSelector((state: RootState) => state.getleadSubStagesDataById);
  const { responseForLeadStage: leadStageData } = useSelector((state: RootState) => state.leadStageValues);
  //   const { isError, responseBulkChangeStage, resetActions } = useSelector((state: RootState) => state.BulkChangeStage);

  const optionForLeadStages = transformDataForLeadStagesAndSource(leadStageData);
  const optionForLeadSubStages = transformDataForLeadSubStages(leadSubStagesDataById);

  const { getAllCheckSelectedDataFormCustomTable } = useSelector((state: RootState) => state.ui);
  const leadCaptureIds = (getAllCheckSelectedDataFormCustomTable ?? []).map((item: { lead_capture_id: number }) => {
    return item.lead_capture_id;
  });

  const onChangeOwner = (values: any, actions: any) => {
    const payload = {
      leadCaptureIds: leadCaptureIds,
      coreStageId: values.current_lead_stage_display_name,
      coreSubStageId: values.current_lead_sub_stage_display_name,
    };

    store.dispatch(ChangeStageInBulk(payload));
    store.dispatch(takeActionForBulkChangeStage(actions));
    onHideModal();
  };

  //   useEffect(() => {
  //     if (!isError && responseBulkChangeStage) {
  //       store.dispatch(resetResponseForBulkChangeStage());
  //       onHideModal();
  //       //   resetActions.resetForm();
  //     }
  //   }, [responseBulkChangeStage, isError]);

  return (
    <Formik
      initialValues={{
        current_lead_stage_display_name: "",
        current_lead_sub_stage_display_name: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values, actions) => {
        onChangeOwner(values, actions);
      }}
    >
      {({ values, setFieldValue, errors, touched }: { values: { [key: string]: any }; setFieldValue: any; errors: any; touched: any }) => {
        useEffect(() => {
          if (values.current_lead_stage_display_name !== "") {
            console.log(values.current_lead_stage_display_name);
            store.dispatch(getleadSubStagesById(values.current_lead_stage_display_name));
          }
        }, [values]);
        return (
          <Form>
            <div className="space-y-4 p-4 mb-8">
              {changeStageFormData.map((field: any) => (
                <div key={field.id} className="flex flex-col gap-y-1">
                  <label className="text-sm font-medium">{field.label}</label>
                  <Select
                    className="min-w-[212px]"
                    options={
                      field.name === "current_lead_stage_display_name"
                        ? optionForLeadStages
                        : field.name === "current_lead_sub_stage_display_name"
                        ? optionForLeadSubStages.length > 0
                          ? optionForLeadSubStages
                          : [{ label: "No data found for this Lead Stage", value: "" }]
                        : []
                    }
                    value={
                      (field.name === "current_lead_stage_display_name"
                        ? optionForLeadStages
                        : field.name === "current_lead_sub_stage_display_name"
                        ? optionForLeadSubStages
                        : []
                      ).find((opt: any) => opt.value === values[field.name]) || null
                    }
                    onChange={(selectedOption) => setFieldValue(field.name, selectedOption ? selectedOption.value : "")}
                    isClearable
                    styles={{
                      control: (provided) => ({
                        ...provided,
                        minHeight: "35px",
                        height: "35px",
                        padding: "0 5px",
                      }),
                      placeholder: (provided) => ({
                        ...provided,
                        fontSize: "14px",
                      }),
                      valueContainer: (provided) => ({
                        ...provided,
                        padding: "0 5px",
                      }),
                      input: (provided) => ({
                        ...provided,
                        margin: "0px",
                        padding: "0px",
                      }),
                      indicatorsContainer: (provided) => ({
                        ...provided,
                        height: "27px",
                      }),
                    }}
                  />
                  {errors[field.name] && touched[field.name] && <p className="text-red-500 text-sm">{errors[field.name]?.value}</p>}
                </div>
              ))}
              {leadCaptureIds.length === 0 && <span className="text-sm text-red-500 my-2">Please Select atleast on lead</span>}
              <button disabled={leadCaptureIds.length === 0} type="submit" className={` bg-blue-600 text-white px-4 py-2 rounded absolute bottom-[16px] right-[16px]`}>
                Save
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default ChangeStage;
