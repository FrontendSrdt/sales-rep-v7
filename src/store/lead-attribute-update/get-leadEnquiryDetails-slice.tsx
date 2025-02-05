import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface LeadEnquiryDetailsIdType {
  responseOfLeadEnquiryDetailsById: {};
  isLoading: boolean;
  isError: null | string;
}

const initialState: LeadEnquiryDetailsIdType = {
  responseOfLeadEnquiryDetailsById: {},
  isLoading: true,
  isError: null,
};
export const getLeadEnquiryDetailsById = createAsyncThunk<any, number | any>("LeadEnquiryDetailsId", async (leadCaptureId, { rejectWithValue }) => {
  try {
    const response = await coreLeadCaptureApi.get(`api/crm/lead/leadEnquiry/findByLeadCapture/${leadCaptureId}`);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data.message || "An error occurred.");
  }
});

const getLeadEnquiryDetailsByIdSlice = createSlice({
  name: "LeadEnquiryDetailsByID",
  initialState,
  reducers: {
    resetLeadEnquiryDetailsDataById: (state) => {
      state.responseOfLeadEnquiryDetailsById = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLeadEnquiryDetailsById.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getLeadEnquiryDetailsById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.responseOfLeadEnquiryDetailsById = action.payload;
      })
      .addCase(getLeadEnquiryDetailsById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "Something went wrong!";
      });
  },
});

export const { resetLeadEnquiryDetailsDataById } = getLeadEnquiryDetailsByIdSlice.actions;
export const getLeadEnquiryDetailsByIdReducer = getLeadEnquiryDetailsByIdSlice.reducer;

//getLeadEnquiryDetailsDataById
