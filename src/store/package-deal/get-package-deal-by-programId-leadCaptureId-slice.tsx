import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface packageDealByLeadCaptureIdType {
  packageDealByLeadCaptureIdResponse: any;
  isLoading: boolean;
  isError: null | string;
}

const initialState: packageDealByLeadCaptureIdType = {
  packageDealByLeadCaptureIdResponse: {},
  isLoading: false,
  isError: null,
};
export const packageDealByLeadCaptureId = createAsyncThunk<any, any>("packageDealByLeadCaptureId", async ({ programId, leadCaptureId, feeAmount }, { rejectWithValue }) => {
  console.log(programId, leadCaptureId, feeAmount);
  try {
    const response = await coreLeadCaptureApi.get(`/api/crm/lead/packageDeal/getFee/${programId}/${leadCaptureId}/${feeAmount}`);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data.message || "An error occurred.");
  }
});

const getPackageDealByLeadCaptureIdSlice = createSlice({
  name: "LeadCapture/packageDealByLeadCaptureId",
  initialState,
  reducers: {
    resetPackageDealByLeadCaptureIdResponse: (state) => {
      state.packageDealByLeadCaptureIdResponse = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(packageDealByLeadCaptureId.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(packageDealByLeadCaptureId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.packageDealByLeadCaptureIdResponse = action.payload;
      })
      .addCase(packageDealByLeadCaptureId.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "Something went wrong!";
      });
  },
});

export const { resetPackageDealByLeadCaptureIdResponse } = getPackageDealByLeadCaptureIdSlice.actions;
export const getPackageDealByLeadCaptureIdReducer = getPackageDealByLeadCaptureIdSlice.reducer;

//packageDealByLeadCaptureId
