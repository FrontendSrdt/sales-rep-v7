import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// import { v4 as uuidv4 } from "uuid";
import { v4 as uuidv4 } from "uuid";

import toast from "react-hot-toast";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface UpdateLeadTaskType {
  isRun: string;
  isError: null | string;
  isLoading: boolean;
  responseOfUpdateLeadTask: any;
}

const initialState: UpdateLeadTaskType = {
  isLoading: true,
  isError: null,
  isRun: uuidv4(),
  responseOfUpdateLeadTask: "",
};

// Create Thunk to CREATE Lead Capture
export const updateLeadTask = createAsyncThunk<any, any, any>("update-new/lead-task", async ({ id, updatedData }, { rejectWithValue }) => {
  console.log(id, updatedData);
  const response = coreLeadCaptureApi.put(`api/crm/lead/leadScheduledTask/update/${id}`, updatedData);

  toast.promise(response, {
    loading: "Loading",
    success: "Lead Task has been Successfully Updated",
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

const updateLeadTaskSlice = createSlice({
  name: "updateLeadsTask",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(updateLeadTask.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(updateLeadTask.fulfilled, (state, action) => {
        state.isRun = uuidv4();

        state.isLoading = false;
        state.responseOfUpdateLeadTask = action.payload;
      })
      .addCase(updateLeadTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "Error occured!";
      });
  },
});

export const updateLeadTaskReducer = updateLeadTaskSlice.reducer;

// leadTaskUpdate
