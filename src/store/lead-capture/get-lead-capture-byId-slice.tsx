import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface LeadCaptureIdType {
  leadCaptureById: {};
  isLoading: boolean;
  isError: null | string;
}

const initialState: LeadCaptureIdType = {
  leadCaptureById: {},
  isLoading: true,
  isError: null,
};
export const getLeadCaptureById = createAsyncThunk("leadCaptureId", async (leadCaptureId, { rejectWithValue }) => {
  try {
    const response = await coreLeadCaptureApi.get(`api/crm/core/leadcapture/${leadCaptureId}`);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data.message || "An error occurred.");
  }
});

const getLeadCaptureByIdSlice = createSlice({
  name: "LeadCaptureByID",
  initialState,
  reducers: {
    resetLeadCaptureDataById: (state) => {
      state.leadCaptureById = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLeadCaptureById.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getLeadCaptureById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.leadCaptureById = action.payload;
      })
      .addCase(getLeadCaptureById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "Something went wrong!";
      });
  },
});

export const { resetLeadCaptureDataById } = getLeadCaptureByIdSlice.actions;
export const getLeadCaptureByIdReducer = getLeadCaptureByIdSlice.reducer;
