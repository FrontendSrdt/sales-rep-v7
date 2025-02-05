import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface GetMaxLeadScholarshipDetailsIdType {
  getMaxLeadScholarshipDetailsResponse: {};
  isLoading: boolean;
  isError: null | string;
}

const initialState: GetMaxLeadScholarshipDetailsIdType = {
  getMaxLeadScholarshipDetailsResponse: {},
  isLoading: false,
  isError: null,
};
export const getMaxLeadScholarshipDetailsById = createAsyncThunk<any, string>("getMaxLeadScholarshipDetails", async (leadCaptureId, { rejectWithValue }) => {
  try {
    const response = await coreLeadCaptureApi.get(`api/crm/lead/leadScholarshipDetails/getApplicationStatus/${leadCaptureId}`);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data.message || "An error occurred.");
  }
});

const getMaxLeadScholarshipDetailsSlice = createSlice({
  name: "LeadCapture/getLeadScholarshipDetails",
  initialState,
  reducers: {
    resetResponseForGetMaxLeadScholarshipDetails: (state) => {
      state.getMaxLeadScholarshipDetailsResponse = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMaxLeadScholarshipDetailsById.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getMaxLeadScholarshipDetailsById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.getMaxLeadScholarshipDetailsResponse = action.payload;
      })
      .addCase(getMaxLeadScholarshipDetailsById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "Something went wrong!";
      });
  },
});

export const { resetResponseForGetMaxLeadScholarshipDetails } = getMaxLeadScholarshipDetailsSlice.actions;
export const getMaxLeadScholarshipDetailsReducer = getMaxLeadScholarshipDetailsSlice.reducer;

//getMaxLeadScholarshipDetails
