import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface LeadAdditionalDetailsByIdType {
  leadAdditionalDetailsDataById: any | {};
  isLoading: boolean;
  isError: null | string;
}

const initialState: LeadAdditionalDetailsByIdType = {
  leadAdditionalDetailsDataById: {},
  isLoading: true,
  isError: null,
};
export const getleadAdditionalDetailsById = createAsyncThunk<any, any>("leadAdditionalDetailsId", async (leadCaptureId, { rejectWithValue }) => {
  try {
    const response = await coreLeadCaptureApi.get(`api/crm/lead/leadcapture/getLeadAdditionalDetails/${leadCaptureId}`);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data.message || "An error occurred.");
  }
});

const getleadAdditionalDetailsByIdSlice = createSlice({
  name: "leadAdditionalDetailsByID",
  initialState,
  reducers: {
    resetResponseForAdditionalDetailsById: (state) => {
      console.log("inside the reducers");
      state.leadAdditionalDetailsDataById = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getleadAdditionalDetailsById.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getleadAdditionalDetailsById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.leadAdditionalDetailsDataById = action.payload;
      })
      .addCase(getleadAdditionalDetailsById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "Something went wrong!";
      });
  },
});

export const { resetResponseForAdditionalDetailsById } = getleadAdditionalDetailsByIdSlice.actions;
export const getleadAdditionalDetailsByIdReducer = getleadAdditionalDetailsByIdSlice.reducer;
//getleadAdditionalDetailsDataById
