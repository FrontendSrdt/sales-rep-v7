import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface leadOfferHistoryByOfferIdType {
  leadOfferHistoryByOfferIdResponse: any;
  isLoading: boolean;
  isError: null | string;
}

const initialState: leadOfferHistoryByOfferIdType = {
  leadOfferHistoryByOfferIdResponse: {},
  isLoading: false,
  isError: null,
};
export const leadOfferHistoryByOfferId = createAsyncThunk<any, any>("leadOfferHistoryByOfferId", async ({ offerId, leadCaptureId }, { rejectWithValue }) => {
  try {
    const response = await coreLeadCaptureApi.get(`api/crm/lead/leadOffer/findOfferHistory/${offerId}/${leadCaptureId}`);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data.message || "An error occurred.");
  }
});

const getLeadOfferHistoryByOfferIdSlice = createSlice({
  name: "LeadCapture/leadOfferHistoryByOfferId",
  initialState,
  reducers: {
    resetLeadOfferHistoryByOfferIdResponse: (state) => {
      state.leadOfferHistoryByOfferIdResponse = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(leadOfferHistoryByOfferId.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(leadOfferHistoryByOfferId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.leadOfferHistoryByOfferIdResponse = action.payload;
      })
      .addCase(leadOfferHistoryByOfferId.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "Something went wrong!";
      });
  },
});

export const { resetLeadOfferHistoryByOfferIdResponse } = getLeadOfferHistoryByOfferIdSlice.actions;
export const getLeadOfferHistoryByOfferIdReducer = getLeadOfferHistoryByOfferIdSlice.reducer;

//leadOfferHistoryByOfferId
