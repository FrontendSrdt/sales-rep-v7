import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface LeadAddressIdType {
  responseOfLeadAddressById: [];
  isLoading: boolean;
  isError: null | string;
}

const initialState: LeadAddressIdType = {
  responseOfLeadAddressById: [],
  isLoading: true,
  isError: null,
};
export const getLeadAddressById = createAsyncThunk<any, number| any>("LeadAddressId", async (leadCaptureId, { rejectWithValue }) => {
  try {
    const response = await coreLeadCaptureApi.get(`api/crm/lead/leadaddressdetails/findByLeadCapture/${leadCaptureId}`);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data.message || "An error occurred.");
  }
});

const getLeadAddressByIdSlice = createSlice({
  name: "LeadAddressByID",
  initialState,
  reducers: {
    resetLeadAddressDataById: (state) => {
      state.responseOfLeadAddressById = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLeadAddressById.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getLeadAddressById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.responseOfLeadAddressById = action.payload;
      })
      .addCase(getLeadAddressById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "Something went wrong!";
      });
  },
});

export const { resetLeadAddressDataById } = getLeadAddressByIdSlice.actions;
export const getLeadAddressByIdReducer = getLeadAddressByIdSlice.reducer;

//getLeadAddressDataById
