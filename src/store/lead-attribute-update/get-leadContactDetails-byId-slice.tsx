import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface LeadContactDetailsIdType {
  responseOfLeadContactDetailsById: {};
  isLoading: boolean;
  isError: null | string;
}

const initialState: LeadContactDetailsIdType = {
  responseOfLeadContactDetailsById: {},
  isLoading: true,
  isError: null,
};
export const getLeadContactDetailsById = createAsyncThunk<any, number | any>("LeadContactDetailsId", async (leadCaptureId, { rejectWithValue }) => {
  try {
    const response = await coreLeadCaptureApi.get(`api/crm/lead/leadcontactphone/findByLeadCapture/${leadCaptureId}`);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data.message || "An error occurred.");
  }
});

const getLeadContactDetailsByIdSlice = createSlice({
  name: "LeadContactDetailsByID",
  initialState,
  reducers: {
    resetLeadContactDetailsDataById: (state) => {
      state.responseOfLeadContactDetailsById = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLeadContactDetailsById.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getLeadContactDetailsById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.responseOfLeadContactDetailsById = action.payload;
      })
      .addCase(getLeadContactDetailsById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "Something went wrong!";
      });
  },
});

export const { resetLeadContactDetailsDataById } = getLeadContactDetailsByIdSlice.actions;
export const getLeadContactDetailsByIdReducer = getLeadContactDetailsByIdSlice.reducer;

//getLeadContactDetailsDataById
