import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";
 
interface LeadOfferDeclineReasonByOfferId {
  LeadOfferDeclineReasonByOfferIdResponse: {} | any;
  isLoading: boolean;
  isError: null | string;
}
 
const initialState: LeadOfferDeclineReasonByOfferId = {
  LeadOfferDeclineReasonByOfferIdResponse: {},
  isLoading: false,
  isError: null,
};
 
//  Create Thunk for gettting lead scholarship details by capture id
 
export const getLeadOfferDeclineReasonByOfferId = createAsyncThunk<any, string | undefined>("get/getLeadOfferDeclineReasonByOfferId", async (offerId, { rejectWithValue }) => {
  try {
    const response = await coreLeadCaptureApi.get(`api/crm/lead/leadOffer/getDeclineReason/${offerId}`);
    return response.data;
  } catch (e: any) {
    return rejectWithValue(e.response?.data.message || "An error occurred.");
  }
});
 
const getLeadOfferDeclineReasonByOfferIdSlice = createSlice({
  name: "getLeadOfferDeclineReasonByOfferIdSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLeadOfferDeclineReasonByOfferId.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getLeadOfferDeclineReasonByOfferId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.LeadOfferDeclineReasonByOfferIdResponse = action.payload;
      })
      .addCase(getLeadOfferDeclineReasonByOfferId.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "something went wrong ";
      });
  },
});
 
export const getLeadOfferDeclineReasonByOfferIdSliceReducer = getLeadOfferDeclineReasonByOfferIdSlice.reducer;
//getLeadOfferDeclineReasonByOfferId