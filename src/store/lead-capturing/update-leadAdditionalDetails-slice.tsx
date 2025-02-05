import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// import { v4 as uuidv4 } from "uuid";
import { v4 as uuidv4 } from "uuid";

import toast from "react-hot-toast";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface UpdateLeadAdditionalType {
  isRun: string;
  isError: null | string;
  isLoading: boolean;
  responseOfUpdateLeadAdditionaldetails: any;
}

const initialState: UpdateLeadAdditionalType = {
  isLoading: true,
  isError: null,
  isRun: uuidv4(),
  responseOfUpdateLeadAdditionaldetails: "",
};

// Create Thunk to CREATE Lead Capture
export const updateLeadAdditionalDetails = createAsyncThunk<any, any>("update-new/lead-details", (updatedData, { rejectWithValue }) => {
  const response = coreLeadCaptureApi.put("api/crm/lead/leadcapture", updatedData);

  toast.promise(response, {
    loading: "Loading",
    success: "Lead Details has been Successfully Updated",
    error: (e: any) => {
      // Extract the error message dynamically from response
      const errorMessage = e.response?.data?.error || "Error occurred while submitting";
      return errorMessage;
    },
  });

  return response
    .then((res) => {
      return res.data;
    })
    .catch((e: any) => {
      console.error(e.message);
      return rejectWithValue(e.message);
    });
});

const updateLeadAdditionalDetailsSlice = createSlice({
  name: "updateLeadsDetails",
  initialState,
  reducers: {
    resetResponseForUpdateLeaddetails: (state) => {
      state.responseOfUpdateLeadAdditionaldetails = "";
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(updateLeadAdditionalDetails.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(updateLeadAdditionalDetails.fulfilled, (state, action) => {
        state.isRun = uuidv4();

        state.isLoading = false;
        state.responseOfUpdateLeadAdditionaldetails = action.payload;
      })
      .addCase(updateLeadAdditionalDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "Error occured!";
      });
  },
});

export const updateLeadAdditionalDetailsReducer = updateLeadAdditionalDetailsSlice.reducer;
export const { resetResponseForUpdateLeaddetails } = updateLeadAdditionalDetailsSlice.actions;

// leadAdditionalDetailsUpdate
