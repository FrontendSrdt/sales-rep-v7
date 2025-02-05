import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// import { v4 as uuidv4 } from "uuid";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface LeadAdditionalDetailsType {
  isRun: string;
  isError: null | string;
  isLoading: boolean;
  resetActions: any;
  responseOfLeadAdditionalDetails: any;
}

const initialState: LeadAdditionalDetailsType = {
  isLoading: true,
  isError: null,
  isRun: uuidv4(),
  resetActions: "",
  responseOfLeadAdditionalDetails: "",
};

// Create Thunk to CREATE Lead Capture
export const addLeadAdditionalDetails = createAsyncThunk<any | LeadAdditionalDetailsType, any>(
  "create-new/lead-additional-details",
  (newLeadDetailsData, { rejectWithValue }) => {
    const response = coreLeadCaptureApi.post("api/crm/lead/leadcapture/leads/submitAndSave", newLeadDetailsData);

    toast.promise(response, {
      loading: "Loading",
      success: "Lead Additional Details has been Successfully Added",
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
  }
);

const AddLeadAdditionalDetailsSlice = createSlice({
  name: "AddLeadAdditionalDetails",
  initialState,
  reducers: {
    resetResposneforLeadAdditionalDetails: (state) => {
      state.responseOfLeadAdditionalDetails = "";
    },
    takeActionForLeadAdditionalDetails: (state, action) => {
      state.resetActions = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(addLeadAdditionalDetails.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(addLeadAdditionalDetails.fulfilled, (state, action) => {
        state.isRun = uuidv4();
        // console.log(state.isRun);
        state.isLoading = false;
        state.responseOfLeadAdditionalDetails = action.payload;
      })
      .addCase(addLeadAdditionalDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "Error occured!";
      });
  },
});

export const { resetResposneforLeadAdditionalDetails, takeActionForLeadAdditionalDetails } =
  AddLeadAdditionalDetailsSlice.actions;
export const AddLeadAdditionalDetailsReducer = AddLeadAdditionalDetailsSlice.reducer;

// addLeadAdditionalDetails
