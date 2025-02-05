import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface LeadScheduleTaskByIdType {
  leadScheduleTaskDataById: any | {};
  isLoading: boolean;
  isError: null | string;
}

const initialState: LeadScheduleTaskByIdType = {
  leadScheduleTaskDataById: {},
  isLoading: true,
  isError: null,
};
export const getLeadScheduleTaskById = createAsyncThunk<any, any>("getLeadScheduleTaskById", async (leadCaptureId, { rejectWithValue }) => {
  try {
    const response = await coreLeadCaptureApi.get(`api/crm/lead/leadScheduledTask/leadScheduledTaskId/${leadCaptureId}`);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data.message || "An error occurred.");
  }
});

const getLeadScheduleTaskByIdByIdSlice = createSlice({
  name: "getLeadScheduleTask-ById",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLeadScheduleTaskById.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getLeadScheduleTaskById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.leadScheduleTaskDataById = action.payload;
      })
      .addCase(getLeadScheduleTaskById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "Something went wrong!";
      });
  },
});

export const getLeadScheduleTaskByIdReducer = getLeadScheduleTaskByIdByIdSlice.reducer;
//getLeadScheduleTaskDataById
