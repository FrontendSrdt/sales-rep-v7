import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";
import toast from "react-hot-toast";

interface FeeDetailsV2Type {
  FeeDetailsV2Response: any;
  isLoading: boolean;
  isError: null | string;
}

const initialState: FeeDetailsV2Type = {
  FeeDetailsV2Response: {},
  isLoading: true,
  isError: null,
};

export const getFeeDetailsV2 = createAsyncThunk<any, any>("getFeeDetailsV2Response", async (payload, { rejectWithValue }) => {
  try {
    console.log("payload", payload);
    const response = await coreLeadCaptureApi.post("api/crm/lead/leadFeeCalculation/getLeadFeeV2", payload);

    toast.promise(Promise.resolve(response), {
      loading: "Loading",
      success: "Fees Details fetched successfully ",
      error: (e: any) => {
        // Extract the error message dynamically from response
        const errorMessage = e.response?.data?.error || "Error occurred while submitting";
        return errorMessage;
      },
    });
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data.message || "An error occurred.");
  }
});

const getFeeDetailsV2Slice = createSlice({
  name: "LeadCapture/getFeeDetailsV2",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeeDetailsV2.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getFeeDetailsV2.fulfilled, (state, action) => {
        state.isLoading = false;
        state.FeeDetailsV2Response = action.payload;
      })
      .addCase(getFeeDetailsV2.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "Something went wrong!";
      });
  },
});

export const getFeeDetailsV2Reducer = getFeeDetailsV2Slice.reducer;

//getFeeDetailsV2
