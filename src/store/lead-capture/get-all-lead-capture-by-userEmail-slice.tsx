import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";


interface LeadCaptureByUserEmailType {
  leadCaptureByUserEmail: {};
  isLoading: boolean;
  isError: null | string;
}

const initialState: LeadCaptureByUserEmailType = {
  leadCaptureByUserEmail: {},
  isLoading: true,
  isError: null,
};
export const getLeadCaptureByUserEmail = createAsyncThunk<any, string>(
  "leadCaptureByUserEmail",
  async (userEmail, { rejectWithValue }) => {
    try {
      const response = await coreLeadCaptureApi.get(
        `api/crm/lead/leadCaptureRetrieval/getAllSalesRep/${userEmail}`
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data.message || "An error occurred."
      );
    }
  }
);

const getLeadCaptureByUserEmailSlice = createSlice({
  name: "LeadCapture/LeadCaptureByUserEmail",
  initialState,
  reducers: {
    resetLeadCaptureDataByUserEmail: (state) => {
      state.leadCaptureByUserEmail = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLeadCaptureByUserEmail.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getLeadCaptureByUserEmail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.leadCaptureByUserEmail = action.payload;
      })
      .addCase(getLeadCaptureByUserEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "Something went wrong!";
      });
  },
});

export const { resetLeadCaptureDataByUserEmail } =
  getLeadCaptureByUserEmailSlice.actions;
export const getLeadCaptureByUserEmailReducer =
  getLeadCaptureByUserEmailSlice.reducer;

//getLeadCaptureByUserEmail
