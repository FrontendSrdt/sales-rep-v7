import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface FeeCalculationForDeclineByIdType {
  FeeCalculationForDeclineByIdResponse: any | {};
  isLoading: boolean;
  isError: null | string;
}

const initialState: FeeCalculationForDeclineByIdType = {
  FeeCalculationForDeclineByIdResponse: {},
  isLoading: true,
  isError: null,
};

export const getFeeCalculationForDeclineById = createAsyncThunk<any, any>("getFeeCalculationForDeclineByIdResponse", async (leadCaptureId, { rejectWithValue }) => {
  try {
    const response = await coreLeadCaptureApi.get(`api/crm/lead/leadFeeCalculation/getLeadFeeForDeclinedOffer/${leadCaptureId}`);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data.message || "An error occurred.");
  }
});

const getFeeCalculationForDeclineByIdSlice = createSlice({
  name: "LeadCapture/getFeeCalculationForDeclineByIdResponse",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeeCalculationForDeclineById.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getFeeCalculationForDeclineById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.FeeCalculationForDeclineByIdResponse = action.payload;
      })
      .addCase(getFeeCalculationForDeclineById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "Something went wrong!";
      });
  },
});

export const getFeeCalculationForDeclineByIdReducer = getFeeCalculationForDeclineByIdSlice.reducer;

//getFeeCalculationForDeclineById
