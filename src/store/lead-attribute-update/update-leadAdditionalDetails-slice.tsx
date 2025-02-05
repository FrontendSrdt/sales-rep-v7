import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface UpdateLeadAdditionalInfoType {
  isRun: string;
  isError: null | string;
  isLoading: boolean;
  responseOfLeadAdditionalInfo: any;
  resetActions: any;
}

const initialState: UpdateLeadAdditionalInfoType = {
  isLoading: false,
  isError: null,
  isRun: uuidv4(),
  responseOfLeadAdditionalInfo: "",
  resetActions: "",
};

export const updateLeadAdditionalInfo = createAsyncThunk<any, any, any>("update/updateLeadAdditionalInfo", async ({ additionalDetailsId, updatedData }, { rejectWithValue }) => {
  const response = coreLeadCaptureApi.put(`api/crm/lead/leadadditionaldetails/update/${additionalDetailsId}`, updatedData);

  toast.promise(response, {
    loading: "Loading",
    success: "Lead Additional Info has been Successfully Updated",
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

const updateLeadAdditionalInfoSlice = createSlice({
  name: "updateLeadsBioInfo",
  initialState,
  reducers: {
    resetResponseForUpdateLeadAdditionalInfo: (state) => {
      state.responseOfLeadAdditionalInfo = "";
    },
    takeActionsForUpdateLeadAdditionalInfo: (state, action) => {
      state.resetActions = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(updateLeadAdditionalInfo.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(updateLeadAdditionalInfo.fulfilled, (state, action) => {
        state.isRun = uuidv4();
        state.isLoading = false;
        state.responseOfLeadAdditionalInfo = action.payload;
      })
      .addCase(updateLeadAdditionalInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "Error occured!";
      });
  },
});

export const updateLeadAdditionalInfoReducer = updateLeadAdditionalInfoSlice.reducer;
export const { resetResponseForUpdateLeadAdditionalInfo, takeActionsForUpdateLeadAdditionalInfo } = updateLeadAdditionalInfoSlice.actions;
// LeadAdditionalInfoUpdate
