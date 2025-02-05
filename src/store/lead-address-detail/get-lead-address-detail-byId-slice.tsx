import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface LeadAddressIdType {
  leadAddessDetailById: {};
  isLoading: boolean;
  isError: null | string;
}

const initialState: LeadAddressIdType = {
  leadAddessDetailById: {},
  isLoading: true,
  isError: null,
};
export const getLeadAddressDetailsById = createAsyncThunk("leadCaptureId", async (leadAddressDetailId, { rejectWithValue }) => {
  try {
    const response = await coreLeadCaptureApi.get(`api/crm/lead/leadaddressdetails/${leadAddressDetailId}`);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data.message || "An error occurred.");
  }
});

const getLeadAddressDetailsByIdSlice = createSlice({
  name: "LeadCaptureByID",
  initialState,
  reducers: {
    resetLeadAddressDetailsDataById: (state) => {
      state.leadAddessDetailById = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLeadAddressDetailsById.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getLeadAddressDetailsById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.leadAddessDetailById = action.payload;
      })
      .addCase(getLeadAddressDetailsById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "Something went wrong!";
      });
  },
});

export const { resetLeadAddressDetailsDataById } = getLeadAddressDetailsByIdSlice.actions;
export const getLeadAddressDetailByIdReducer = getLeadAddressDetailsByIdSlice.reducer;
