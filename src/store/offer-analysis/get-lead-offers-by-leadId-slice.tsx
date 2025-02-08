import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface getLeadOfferByLeadIdType {
  getLeadOfferByLeadIdResponse: any;
  isLoading: boolean;
  isError: null | string;
}

const initialState: getLeadOfferByLeadIdType = {
  getLeadOfferByLeadIdResponse: {},
  isLoading: true,
  isError: null,
};
export const getLeadOfferByLeadId = createAsyncThunk<any, any>("getLeadOfferByLeadId", async ({ leadCaptureId, leadEnquiryId }, { rejectWithValue }) => {
  try {
    const response = await coreLeadCaptureApi.get(`api/crm/lead/leadOffer/findByLeadCapture/${leadCaptureId}/${leadEnquiryId}`);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data.message || "An error occurred.");
  }
});

const getLeadOfferByLeadIdSlice = createSlice({
  name: "LeadCapture/getLeadOfferByLeadId",
  initialState,
  reducers: {
    resetLeadOfferByLeadIdResponse: (state) => {
      state.getLeadOfferByLeadIdResponse = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLeadOfferByLeadId.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getLeadOfferByLeadId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.getLeadOfferByLeadIdResponse = action.payload;
      })
      .addCase(getLeadOfferByLeadId.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "Something went wrong!";
      });
  },
});

export const { resetLeadOfferByLeadIdResponse } = getLeadOfferByLeadIdSlice.actions;
export const getLeadOfferByLeadIdReducer = getLeadOfferByLeadIdSlice.reducer;

//getLeadOfferByLeadId
