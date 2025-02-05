import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface LeadAcadDetailsUGIdType {
  leadAcadDetailsUGById: {};
  isLoading: boolean;
  isError: null | string;
}

const initialState: LeadAcadDetailsUGIdType = {
  leadAcadDetailsUGById: {},
  isLoading: true,
  isError: null,
};
export const getLeadAcadDetailsUGById = createAsyncThunk("leadAcadDetailsUGId", async (leadAcadDetailsUGId, { rejectWithValue }) => {
  try {
    const response = await coreLeadCaptureApi.get(`api/crm/lead/leadacademicdetailsug/${leadAcadDetailsUGId}`);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data.message || "An error occurred.");
  }
});

const getLeadAcadDetailsUGByIdSlice = createSlice({
  name: "LeadAcadDetailsUGByID",
  initialState,
  reducers: {
    resetLeadAcadDetailsUGDataById: (state) => {
      state.leadAcadDetailsUGById = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLeadAcadDetailsUGById.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getLeadAcadDetailsUGById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.leadAcadDetailsUGById = action.payload;
      })
      .addCase(getLeadAcadDetailsUGById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "Something went wrong!";
      });
  },
});

export const { resetLeadAcadDetailsUGDataById } = getLeadAcadDetailsUGByIdSlice.actions;
export const getLeadAcadDetailsUGByIdReducer = getLeadAcadDetailsUGByIdSlice.reducer;

//getLeadAcadDetailsUGDataById
