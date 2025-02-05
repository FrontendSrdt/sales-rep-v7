import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface LeadScheduledTaskType {
  isRun: string;
  isError: null | string;
  isLoading: boolean;
  responseForLeadScheduledTask: any;
}

const initialState: LeadScheduledTaskType = {
  isLoading: true,
  isError: null,
  isRun: uuidv4(),
  responseForLeadScheduledTask: [],
};

export const getLeadScheduledTaskValues = createAsyncThunk("leadscheduledTask", async (_, { rejectWithValue }) => {
  try {
    const res = await coreLeadCaptureApi.get("api/crm/lead/leadScheduledTask");
    return res.data;
  } catch (e: any) {
    return rejectWithValue(e.response?.data.message || "An error occurred.");
  }
});

const leadScheduledTasksSlice = createSlice({
  name: "LeadScheduledTask",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLeadScheduledTaskValues.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getLeadScheduledTaskValues.fulfilled, (state, action) => {
        state.isLoading = false;
        state.responseForLeadScheduledTask = action.payload;
      })
      .addCase(getLeadScheduledTaskValues.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "Something went wrong!";
      });
  },
});

export const leadScheduledTasksReducer = leadScheduledTasksSlice.reducer;
//getLeadScheduledTask
