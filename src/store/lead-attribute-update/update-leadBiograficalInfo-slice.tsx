import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface UpdateLeadBiograficalInfoType {
  isRun: string;
  isError: null | string;
  isLoading: boolean;
  responseOfLeadBiograficalInfo: any;
  resetActions: any;
}

const initialState: UpdateLeadBiograficalInfoType = {
  isLoading: false,
  isError: null,
  isRun: uuidv4(),
  responseOfLeadBiograficalInfo: "",
  resetActions: "",
};

export const updateLeadBiograficalInfo = createAsyncThunk<any, any, any>("update/updateLeadBiograficalInfo", async (updatedData, { rejectWithValue }) => {
  const response = coreLeadCaptureApi.put(`/api/crm/lead/leadupdate/updateBiographicalAndAdditional`, updatedData);

  toast.promise(response, {
    loading: "Loading",
    success: "Lead Biografical Info has been Successfully Updated",
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

const updateLeadBiograficalInfoSlice = createSlice({
  name: "updateLeadsBioInfo",
  initialState,
  reducers: {
    resetResponseForUpdateLeadBiograficalInfo: (state) => {
      state.responseOfLeadBiograficalInfo = "";
    },
    takeActionsForUpdateLeadBiograficalInfo: (state, action) => {
      state.resetActions = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(updateLeadBiograficalInfo.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(updateLeadBiograficalInfo.fulfilled, (state, action) => {
        state.isRun = uuidv4();
        state.isLoading = false;
        state.responseOfLeadBiograficalInfo = action.payload;
      })
      .addCase(updateLeadBiograficalInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "Error occured!";
      });
  },
});

export const updateLeadBiograficalInfoReducer = updateLeadBiograficalInfoSlice.reducer;
export const { resetResponseForUpdateLeadBiograficalInfo, takeActionsForUpdateLeadBiograficalInfo } = updateLeadBiograficalInfoSlice.actions;
// LeadBiograficalInfoUpdate
