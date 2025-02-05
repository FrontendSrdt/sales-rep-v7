import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface UpdateLeadCompletionStatusType {
  isRun: string;
  isError: null | string;
  isLoading: boolean;
  responseOfUpdateLeadCompletionStatus: any;
}

const initialState: UpdateLeadCompletionStatusType = {
  isLoading: true,
  isError: null,
  isRun: uuidv4(),
  responseOfUpdateLeadCompletionStatus: "",
};

// Create Thunk to CREATE Lead Capture
export const updateLeadCompletionStatus = createAsyncThunk<any, any, any>(
  "update-task/updateLeadCompletionStatus",
  async ({ id, updatedData }, { rejectWithValue }) => {
    console.log(id, updatedData);
    const response = coreLeadCaptureApi.patch(`api/crm/lead/leadScheduledTask/${id}`, updatedData);

    toast.promise(response, {
      loading: "Loading",
      success: "Task status updated successfully",
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

const updateLeadCompletionStatusSlice = createSlice({
  name: "updateLeadsCompletionStatus",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(updateLeadCompletionStatus.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(updateLeadCompletionStatus.fulfilled, (state, action) => {
        state.isRun = uuidv4();
        state.isLoading = false;
        state.responseOfUpdateLeadCompletionStatus = action.payload;
      })
      .addCase(updateLeadCompletionStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "Error occured!";
      });
  },
});

export const updateLeadCompletionStatusReducer = updateLeadCompletionStatusSlice.reducer;
// leadCompletionStatusUpdate
