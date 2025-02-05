// import { v4 as uuidv4 } from "uuid";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface NewLeadCaptureType {
  isRun: string;
  isError: null | string;
  isLoading: boolean;
  resetActions: any;
  responseOfLeadsCapture: any;
}

const initialState: NewLeadCaptureType = {
  isLoading: true,
  isError: null,
  isRun: uuidv4(),
  resetActions: "",
  responseOfLeadsCapture: "",
};

// Create Thunk to CREATE Lead Capture
export const AddLeadCapture = createAsyncThunk<any | NewLeadCaptureType, any>(
  "create-new/lead-capture",
  (newLeadCaptureData, { rejectWithValue }) => {
    const response = coreLeadCaptureApi.post("api/crm/core/leadcapture", newLeadCaptureData);

    toast.promise(response, {
      loading: "Loading",
      success: "Lead captured successfully Successfully Added",
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

const AddLeadCaptureSlice = createSlice({
  name: "AddNewLeadCapture",
  initialState,
  reducers: {
    resetResposneforLeadCapture: (state) => {
      state.responseOfLeadsCapture = "";
    },
    takeActionForLeadCapture: (state, action) => {

      state.resetActions = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(AddLeadCapture.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(AddLeadCapture.fulfilled, (state, action) => {
        state.isLoading = false;
        state.responseOfLeadsCapture = action.payload;
        state.isRun = uuidv4();
      })
      .addCase(AddLeadCapture.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "Error occured!";
      });
  },
});

export const { resetResposneforLeadCapture, takeActionForLeadCapture } = AddLeadCaptureSlice.actions;
export const AddLeadCaptureReducer = AddLeadCaptureSlice.reducer;

// addLeadCapture
