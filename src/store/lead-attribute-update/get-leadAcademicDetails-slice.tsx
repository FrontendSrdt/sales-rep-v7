import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface LeadAcademicDetailsIdType {
  responseOfLeadAcademicDetailsById: {};
  isLoading: boolean;
  isError: null | string;
}

const initialState: LeadAcademicDetailsIdType = {
  responseOfLeadAcademicDetailsById: {},
  isLoading: true,
  isError: null,
};
export const getLeadAcademicDetailsById = createAsyncThunk<any, any| number>("LeadAcademicDetailsId", async (leadCaptureId, { rejectWithValue }) => {
  try {
    const response = await coreLeadCaptureApi.get(`api/crm/lead/leadAllAcademic/${leadCaptureId}`);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data.message || "An error occurred.");
  }
});

const getLeadAcademicDetailsByIdSlice = createSlice({
  name: "LeadAcademicDetails/ByID",
  initialState,
  reducers: {
    resetLeadAcademicDetailsDataById: (state) => {
      state.responseOfLeadAcademicDetailsById = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLeadAcademicDetailsById.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getLeadAcademicDetailsById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.responseOfLeadAcademicDetailsById = action.payload;
      })
      .addCase(getLeadAcademicDetailsById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "Something went wrong!";
      });
  },
});

export const { resetLeadAcademicDetailsDataById } = getLeadAcademicDetailsByIdSlice.actions;
export const getLeadAcademicDetailsByIdReducer = getLeadAcademicDetailsByIdSlice.reducer;

//getLeadAcademicDetailsDataById
