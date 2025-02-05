import store from "../../../store";
import { onSetErrorHandler } from "../../../store/ui/ui-slice";

// validation function
export const validateFormValues = (
  formValues: Record<string, string | number>
): boolean => {
  if (!formValues["leadStage"] && !formValues["dateRangeFilterType"]) {
    store.dispatch(onSetErrorHandler(true));
    return false; // return false no any value present
  }
  return true; // return true if value present
};
