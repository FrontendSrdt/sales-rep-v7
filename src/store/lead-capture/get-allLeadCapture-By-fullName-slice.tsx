import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface LeadCaptureByFullNameType {
  leadCaptureByFullName: [];
  isLoading: boolean;
  isError: null | string;
}

const initialState: LeadCaptureByFullNameType = {
  leadCaptureByFullName: [],
  isLoading: true,
  isError: null,
};
export const getLeadCaptureByFullName = createAsyncThunk<any, any>("leadCaptureByFullName", async (payload, { rejectWithValue }) => {
  try {
    const response = await coreLeadCaptureApi.post(`/api/crm/lead/leadFilter/getLeads`, payload);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data.message || "An error occurred.");
  }
});

const getLeadCaptureByFullNameSlice = createSlice({
  name: "LeadCapture/LeadCaptureByFullName",
  initialState,
  reducers: {
    resetLeadCaptureDataByFullName: (state) => {
      state.leadCaptureByFullName = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLeadCaptureByFullName.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getLeadCaptureByFullName.fulfilled, (state, action) => {
        state.isLoading = false;
        state.leadCaptureByFullName = action.payload;
      })
      .addCase(getLeadCaptureByFullName.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "Something went wrong!";
      });
  },
});

export const { resetLeadCaptureDataByFullName } = getLeadCaptureByFullNameSlice.actions;
export const getLeadCaptureByFullNameReducer = getLeadCaptureByFullNameSlice.reducer;

//getLeadCaptureByFullName
