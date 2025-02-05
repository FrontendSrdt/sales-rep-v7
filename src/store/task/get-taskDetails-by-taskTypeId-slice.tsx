import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface LeadTaskDetailsByTaskIdType {
  isRun: string;
  isError: null | string;
  isLoading: boolean;
  responseForLeadTaskDetailsByTaskId: any;
}

const initialState: LeadTaskDetailsByTaskIdType = {
  isLoading: true,
  isError: null,
  isRun: uuidv4(),
  responseForLeadTaskDetailsByTaskId: [],
};

export const getLeadTaskDetailsByTaskIdValues = createAsyncThunk<any, any>(
  "leadscheduledTaskById",
  async ({ leadScheduledTaskId, coreTaskTypeId }, { rejectWithValue }) => {
    try {
      const res = await coreLeadCaptureApi.get(
        `api/crm/lead/leadScheduledTask/getTaskDetailsByTaskTypeId/${leadScheduledTaskId}/${coreTaskTypeId}`
      );
      // console.log(res.data);
      return res.data;
    } catch (e: any) {
      return rejectWithValue(e.response?.data.message || "An error occurred.");
    }
  }
);

const leadTaskDetailsByTasksIdSlice = createSlice({
  name: "LeadTaskDetailsByTask",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLeadTaskDetailsByTaskIdValues.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getLeadTaskDetailsByTaskIdValues.fulfilled, (state, action) => {
        state.isLoading = false;
        state.responseForLeadTaskDetailsByTaskId = action.payload;
      })
      .addCase(getLeadTaskDetailsByTaskIdValues.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "Something went wrong!";
      });
  },
});

export const leadTaskDetailsByTasksIdReducer = leadTaskDetailsByTasksIdSlice.reducer;
//getLeadTaskDetailsByTaskId
