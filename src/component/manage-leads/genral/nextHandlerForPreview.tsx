import { sectionsConfig } from "../../../data/manage-leads/ManageLeadsData";
import store from "../../../store";
import { onSetFinalDataForForm } from "../../../store/ui/ui-slice";
import { transformData } from "./transformPayloadForPreview";
import transformValuesToNames from "./transformValuesToNames";

export const nextHandlerForPreview = (finalData: any, reduxopt: any) => {
  const { values } = finalData;
  // console.log(values);
  const transformName = transformValuesToNames(values, reduxopt);
  // console.log(transformName);
  // const transformedPayload = transformPayload(values);
  const transformedData = {
    id: 4,
    label: "Preview",
    icon: "settingsIcon",
    contentId: "previewContent",
    contentForPreview: transformData(transformName, sectionsConfig),
  };

  // console.log(transformedData);
  store.dispatch(onSetFinalDataForForm(transformedData));
};
