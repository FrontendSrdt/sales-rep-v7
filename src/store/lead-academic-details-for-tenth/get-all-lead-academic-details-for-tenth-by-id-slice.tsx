import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { leadAcademicDetailsForTenth } from "../../types/lead-cademic-details-for-tenth";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface LeadAcademicDetailsForTenthByIdType {
  isLoading: boolean;
  isError: null | string;
  responseLeadAcademicDetailsForTenthByIdData: leadAcademicDetailsForTenth[];
}

const initialState: LeadAcademicDetailsForTenthByIdType = {
  isLoading: false,
  isError: null,
  responseLeadAcademicDetailsForTenthByIdData: [],
};

//thunk to create new lead contact phone

export const getLeadAcademicDetailsForTenthByIdById = createAsyncThunk<any | LeadAcademicDetailsForTenthByIdType, any>(
  "leadAcademicDetailsForTenth/LeadacademicDetailsById",

  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await coreLeadCaptureApi.get(`api/crm/lead/leadacademicdetailsfortenth/${id}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data.message || "An error occurred.");
    }
  }
);

const getLeadAcademicDetailsForTenthByIdSlice = createSlice({
  name: "leadAcademicDetailsForTenthById",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder;
    builder.addCase(getLeadAcademicDetailsForTenthByIdById.pending, (state) => {
      state.isError = null;
      state.isLoading = true;
    });

    builder.addCase(getLeadAcademicDetailsForTenthByIdById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.responseLeadAcademicDetailsForTenthByIdData = action.payload;
    });
    builder.addCase(getLeadAcademicDetailsForTenthByIdById.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.error.message || "An error occured";
    });
  },
});

export const leadAcademicDetailsForTenthByIdReducer = getLeadAcademicDetailsForTenthByIdSlice.reducer;

// getLeadAcademicDetailsForTenthById
