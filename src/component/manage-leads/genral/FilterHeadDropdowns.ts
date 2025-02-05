import store from "../../../store";
import { onSetErrorHandler, uiSliceAction } from "../../../store/ui/ui-slice";

export const disabledSelectedDateRangeHandler = (val: boolean) => {
  store.dispatch(uiSliceAction.onSelectedDateRange(val));
};

export const disabledCustomDateHandelr = (val: boolean) => {
  store.dispatch(uiSliceAction.onCustomDateChange(val));
};

export const dateRangeChangehandler = () => {
  store.dispatch(onSetErrorHandler(false));
  store.dispatch(uiSliceAction.onSelectedDateRange(true));
  store.dispatch(uiSliceAction.onCustomDateChange(false));
};

export const handleCustomDate = () => {
  console.log("Click Custom Date");
  // setcustomDate(true);
  store.dispatch(uiSliceAction.onCustomDateChange(true));
};
