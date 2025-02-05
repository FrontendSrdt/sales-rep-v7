// import { v4 as uuidv4 } from "uuid";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface NewAdditionalDetailsType {
  isRun: string;
  isError: null | string;
  isLoading: boolean;
  resetActions: any;
  responseOfAdditionalDetails: any;
}

const initialState: NewAdditionalDetailsType = {
  isLoading: true,
  isError: null,
  isRun: uuidv4(),
  resetActions: "",
  responseOfAdditionalDetails: "",
};

// Create Thunk to CREATE AddAdditionalDetails
export const AddAdditionalDetails = createAsyncThunk<any | NewAdditionalDetailsType, any>("create-new/AdditionalDetails", (newAdditionalDetailsData, { rejectWithValue }) => {
  const response = coreLeadCaptureApi.post("/api/crm/lead/leadadditionaldetails", newAdditionalDetailsData);

  toast.promise(response, {
    loading: "Loading",
    success: "Lead Additional Details Successfully Added",
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

const AddAdditionalDetailsSlice = createSlice({
  name: "AddNewAdditionalDetails",
  initialState,
  reducers: {
    resetResposneforAdditionalDetails: (state) => {
      state.responseOfAdditionalDetails = "";
    },
    takeActionForAdditionalDetails: (state, action) => {
      state.resetActions = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(AddAdditionalDetails.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(AddAdditionalDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.responseOfAdditionalDetails = action.payload;
        state.isRun = uuidv4();
      })
      .addCase(AddAdditionalDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "Error occured!";
      });
  },
});

export const { resetResposneforAdditionalDetails, takeActionForAdditionalDetails } = AddAdditionalDetailsSlice.actions;
export const AddAdditionalDetailsReducer = AddAdditionalDetailsSlice.reducer;

// addAdditionalDetails
