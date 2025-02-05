import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface ProgramTutionFeeByProgramIdType {
  programTutionFeeByProgramIdResponse: {};
  isLoading: boolean;
  isError: null | string;
}

const initialState: ProgramTutionFeeByProgramIdType = {
  programTutionFeeByProgramIdResponse: {},
  isLoading: true,
  isError: null,
};
export const getProgramTutionFeeByProgramId = createAsyncThunk<any, string>("getProgramTutionFeeByProgramIdResponse", async (programId, { rejectWithValue }) => {
  try {
    const response = await coreLeadCaptureApi.get(`api/crm/lead/programTuitionFee/${programId}`);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data.message || "An error occurred.");
  }
});

const getProgramTutionFeeByProgramIdSlice = createSlice({
  name: "LeadCapture/getProgramTutionFeeByProgramIdResponse",
  initialState,
  reducers: {
    resetProgramTutionFeeByProgramIdResponse: (state) => {
      state.programTutionFeeByProgramIdResponse = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProgramTutionFeeByProgramId.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getProgramTutionFeeByProgramId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.programTutionFeeByProgramIdResponse = action.payload;
      })
      .addCase(getProgramTutionFeeByProgramId.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "Something went wrong!";
      });
  },
});

export const { resetProgramTutionFeeByProgramIdResponse } = getProgramTutionFeeByProgramIdSlice.actions;
export const getProgramTutionFeeByProgramIdReducer = getProgramTutionFeeByProgramIdSlice.reducer;

//getProgramTutionFeeByProgramIdResponse
