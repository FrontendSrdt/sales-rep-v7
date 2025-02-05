import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

import toast from "react-hot-toast";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface NewLeadTaskType {
  isRun: string;
  isError: null | string;
  isLoading: boolean;
  resetActions: any;
  responseOfNewLeadTask: any;
}

const initialState: NewLeadTaskType = {
  isLoading: true,
  isError: null,
  isRun: uuidv4(),
  resetActions: "",
  responseOfNewLeadTask: "",
};

// Create Thunk to CREATE Lead Capture
export const AddNewLeadTask = createAsyncThunk<any | NewLeadTaskType, any>("create-new/lead-task", (newLeadTaskData, { rejectWithValue }) => {
  const response = coreLeadCaptureApi.post("api/crm/lead/leadScheduledTask", newLeadTaskData);

  toast.promise(response, {
    loading: "Loading",
    success: "Task has been Successfully Added",
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

const AddNewLeadTaskSlice = createSlice({
  name: "AddNewLeadTask",
  initialState,
  reducers: {
    resetResposneforNewLeadTask: (state) => {
      state.responseOfNewLeadTask = "";
    },
    takeActionForNewLeadTask: (state, action) => {
      state.resetActions = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(AddNewLeadTask.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(AddNewLeadTask.fulfilled, (state, action) => {
        state.isRun = uuidv4();

        state.isLoading = false;
        state.responseOfNewLeadTask = action.payload;
      })
      .addCase(AddNewLeadTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "Error occured!";
      });
  },
});

export const { resetResposneforNewLeadTask, takeActionForNewLeadTask } = AddNewLeadTaskSlice.actions;
export const AddNewLeadTaskReducer = AddNewLeadTaskSlice.reducer;

// addNewLeadTask
