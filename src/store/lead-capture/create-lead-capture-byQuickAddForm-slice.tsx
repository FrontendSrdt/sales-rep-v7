// import { v4 as uuidv4 } from "uuid";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface NewLeadCaptureByQuickAddFormType {
  isRun: string;
  isError: null | string;
  isLoading: boolean;
  resetActions: any;
  responseOfLeadsCaptureByQuickAddForm: any;
}

const initialState: NewLeadCaptureByQuickAddFormType = {
  isLoading: true,
  isError: null,
  isRun: uuidv4(),
  resetActions: "",
  responseOfLeadsCaptureByQuickAddForm: "",
};

// Create Thunk to CREATE Lead Capture
export const AddLeadCaptureByQuickAddForm = createAsyncThunk<any | NewLeadCaptureByQuickAddFormType, any>(
  "create-new/lead-captureByQuickAddForm",
  async (newLeadCaptureByQuickAddFormData, { rejectWithValue }) => {
    const response = coreLeadCaptureApi.post("api/crm/lead/leadcapture", newLeadCaptureByQuickAddFormData);

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

const AddLeadCaptureByQuickAddFormSlice = createSlice({
  name: "AddNewLeadCaptureByQuickAddForm",
  initialState,
  reducers: {
    resetResposneforLeadCaptureByQuickAddForm: (state) => {
      state.responseOfLeadsCaptureByQuickAddForm = "";
    },
    takeActionForLeadCaptureByQuickAddForm: (state, action) => {
      state.resetActions = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(AddLeadCaptureByQuickAddForm.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(AddLeadCaptureByQuickAddForm.fulfilled, (state, action) => {
        state.isLoading = false;
        state.responseOfLeadsCaptureByQuickAddForm = action.payload;
        state.isRun = uuidv4();
      })
      .addCase(AddLeadCaptureByQuickAddForm.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "Error occured!";
      });
  },
});

export const { resetResposneforLeadCaptureByQuickAddForm, takeActionForLeadCaptureByQuickAddForm } =
  AddLeadCaptureByQuickAddFormSlice.actions;
export const AddLeadCaptureByQuickAddFormReducer = AddLeadCaptureByQuickAddFormSlice.reducer;

// addLeadCaptureByQuickAddForm
