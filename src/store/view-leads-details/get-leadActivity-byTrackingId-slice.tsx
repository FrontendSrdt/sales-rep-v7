import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface LeadActivityByTrackingIdType {
  leadActivityDataByTrackingId: [];
  isLoading: boolean;
  isError: null | string;
}

const initialState: LeadActivityByTrackingIdType = {
  leadActivityDataByTrackingId: [],
  isLoading: true,
  isError: null,
};
export const getLeadActivityByTrackingId = createAsyncThunk<any, number | any>("LeadActivityDataByTrackingId", async (trackingId, { rejectWithValue }) => {
  try {
    console.log(trackingId);
    const response = await coreLeadCaptureApi.get(`api/crm/lead/leadActivity/getActionDetailsByTrackId/${trackingId}`);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data.message || "An error occurred.");
  }
});

const getLeadActivityByTrackingIdSlice = createSlice({
  name: "LeadActivityByTrackingId",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLeadActivityByTrackingId.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getLeadActivityByTrackingId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.leadActivityDataByTrackingId = action.payload;
      })
      .addCase(getLeadActivityByTrackingId.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "Something went wrong!";
      });
  },
});

export const getLeadActivityByTrackingIdReducer = getLeadActivityByTrackingIdSlice.reducer;

//getleadActivityDataByTrackingId
