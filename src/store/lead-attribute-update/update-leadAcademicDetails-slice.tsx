import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface UpdateLeadAcademicDetailsType {
  isRun: string;
  isError: null | string;
  isLoading: boolean;
  responseOfLeadAcademicDetails: any;
  resetActions: any;
}

const initialState: UpdateLeadAcademicDetailsType = {
  isLoading: false,
  isError: null,
  isRun: uuidv4(),
  responseOfLeadAcademicDetails: "",
  resetActions: "",
};

export const updateLeadAcademicDetails = createAsyncThunk<any, any, any>("update/LeadAcademicDetail", async (updatedData, { rejectWithValue }) => {
  const response = coreLeadCaptureApi.put(`api/crm/lead/leadupdate/updateLeadAcademicDetails`, updatedData);

  toast.promise(response, {
    loading: "Loading",
    success: "Lead Academic Details has been Successfully Updated",
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

const updateLeadAcademicDetailsSlice = createSlice({
  name: "updateLeadsAcadInfo",
  initialState,
  reducers: {
    resetResponseForUpdateLeadAcademicDetails: (state) => {
      state.responseOfLeadAcademicDetails = "";
    },
    takeActionsForUpdateLeadAcademicDetails: (state, action) => {
      state.resetActions = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(updateLeadAcademicDetails.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(updateLeadAcademicDetails.fulfilled, (state, action) => {
        state.isRun = uuidv4();
        state.isLoading = false;
        state.responseOfLeadAcademicDetails = action.payload;
      })
      .addCase(updateLeadAcademicDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "Error occured!";
      });
  },
});

export const updateLeadAcademicDetailsReducer = updateLeadAcademicDetailsSlice.reducer;
export const { resetResponseForUpdateLeadAcademicDetails, takeActionsForUpdateLeadAcademicDetails } = updateLeadAcademicDetailsSlice.actions;
// LeadAcademicDetailsUpdate
