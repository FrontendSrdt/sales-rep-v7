import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface GetMaxLeadScholarshipDetailsIdType {
  findLeadScholarshipDetailsResponse: {} | any;
  isLoading: boolean;
  isError: null | string;
}

const initialState: GetMaxLeadScholarshipDetailsIdType = {
  findLeadScholarshipDetailsResponse: {},
  isLoading: false,
  isError: null,
};
export const findLeadScholarshipDetailsById = createAsyncThunk<any, any>("findLeadScholarshipDetailsdfdagsdg", async ({ leadCaptureId, leadEnquiryId }, { rejectWithValue }) => {
  try {
    const response = await coreLeadCaptureApi.get(`api/crm/lead/leadScholarshipDetails/findByLeadCaptureAndEnquiryId/${leadCaptureId}/${leadEnquiryId}`);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data.message || "An error occurred.");
  }
});

const findLeadScholarshipDetailsSlice = createSlice({
  name: "LeadCapture/findLeadScholarshipDetails",
  initialState,
  reducers: {
    resetResponseForfindLeadScholarshipDetails: (state) => {
      state.findLeadScholarshipDetailsResponse = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(findLeadScholarshipDetailsById.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(findLeadScholarshipDetailsById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.findLeadScholarshipDetailsResponse = action.payload;
      })
      .addCase(findLeadScholarshipDetailsById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "Something went wrong!";
      });
  },
});

export const { resetResponseForfindLeadScholarshipDetails } = findLeadScholarshipDetailsSlice.actions;
export const findLeadScholarshipDetailsReducer = findLeadScholarshipDetailsSlice.reducer;

//findLeadScholarshipDetails
