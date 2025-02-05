import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface LeadScholarshipDetailsForDeclineById {
  LeadScholarshipDetailsForDeclineByIdResponse: {} | any;
  isLoading: boolean;
  isError: null | string;
}

const initialState: LeadScholarshipDetailsForDeclineById = {
  LeadScholarshipDetailsForDeclineByIdResponse: {},
  isLoading: false,
  isError: null,
};

//  Create Thunk for gettting lead scholarship details by capture id

export const getLeadScholarshipDetailsForDeclineById = createAsyncThunk<any, string | undefined>(
  "get/getLeadScholarshipDetailsForDeclineById",
  async (leadCaptureId, { rejectWithValue }) => {
    try {
      const response = await coreLeadCaptureApi.get(`api/crm/lead/leadScholarshipDetails/findByLeadCaptureIdWithDeclinedStatus/${leadCaptureId}`);
      return response.data;
    } catch (e: any) {
      return rejectWithValue(e.response?.data.message || "An error occurred.");
    }
  }
);

const getLeadScholarshipDetailsForDeclineByIdSlice = createSlice({
  name: "getLeadScholarshipDetailsForDeclineByIdSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLeadScholarshipDetailsForDeclineById.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getLeadScholarshipDetailsForDeclineById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.LeadScholarshipDetailsForDeclineByIdResponse = action.payload;
      })
      .addCase(getLeadScholarshipDetailsForDeclineById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "something went wrong ";
      });
  },
});

export const getLeadScholarshipDetailsForDeclineByIdSliceReducer = getLeadScholarshipDetailsForDeclineByIdSlice.reducer;
//getLeadScholarshipDetailsForDeclineById
