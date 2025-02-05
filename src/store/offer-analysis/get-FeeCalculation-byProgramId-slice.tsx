import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface FeeCalculationByProgramIdType {
  FeeCalculationByProgramIdResponse: any;
  isLoading: boolean;
  isError: null | string;
}

const initialState: FeeCalculationByProgramIdType = {
  FeeCalculationByProgramIdResponse: {},
  isLoading: true,
  isError: null,
};
export const getFeeCalculationByProgramId = createAsyncThunk<any, any>("getFeeCalculationByProgramIdResponse", async ({ programId, leadCaptureId }, { rejectWithValue }) => {
  try {
    console.log("programidinslice", programId);
    console.log("leadcaptureIdinsliceeee", leadCaptureId);
    const response = await coreLeadCaptureApi.get(`api/crm/lead/leadFeeCalculation/${programId}/${leadCaptureId}`);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data.message || "An error occurred.");
  }
});

const getFeeCalculationByProgramIdSlice = createSlice({
  name: "LeadCapture/getFeeCalculationByProgramIdResponse",
  initialState,
  reducers: {
    resetFeeCalculationByProgramIdResponse: (state) => {
      state.FeeCalculationByProgramIdResponse = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeeCalculationByProgramId.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getFeeCalculationByProgramId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.FeeCalculationByProgramIdResponse = action.payload;
      })
      .addCase(getFeeCalculationByProgramId.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "Something went wrong!";
      });
  },
});

export const { resetFeeCalculationByProgramIdResponse } = getFeeCalculationByProgramIdSlice.actions;
export const getFeeCalculationByProgramIdReducer = getFeeCalculationByProgramIdSlice.reducer;

//getFeeCalculationByProgramIdResponse
