import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface LeadDetailsByIdType {
  leadDetailsDataById: [];
  isLoading: boolean;
  isError: null | string;
}

const initialState: LeadDetailsByIdType = {
  leadDetailsDataById: [],
  isLoading: true,
  isError: null,
};
export const getleadDetailsById = createAsyncThunk<any, number | any>("LeadDetailsById", async (leadId, { rejectWithValue }) => {
  try {
    const response = await coreLeadCaptureApi.get(`api/crm/lead/leadActivity/getLeadActivityHistory/${leadId}`);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data.message || "An error occurred.");
  }
});

const getleadDetailsByIdSlice = createSlice({
  name: "leadDetailsByID",
  initialState,
  reducers: {
    resetleadDetailsDataById: (state) => {
      state.leadDetailsDataById = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getleadDetailsById.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getleadDetailsById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = "false";
        state.leadDetailsDataById = action.payload;
      })
      .addCase(getleadDetailsById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "Something went wrong!";
      });
  },
});

export const { resetleadDetailsDataById } = getleadDetailsByIdSlice.actions;
export const getleadDetailsByIdReducer = getleadDetailsByIdSlice.reducer;

//getleadDetailsDataById
