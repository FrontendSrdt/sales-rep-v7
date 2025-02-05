import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import coreservicesApi from "../../interceptor/coreservicesApi";

interface TaskType {
  isRun: string;
  isError: null | string;
  isLoading: boolean;
  responseForTaskType: Array<{
    value: any; id: string; label: string; options: any[] 
}>;
}

const initialState: TaskType = {
  isLoading: true,
  isError: null,
  isRun: uuidv4(),
  responseForTaskType: [],
};

export const getTaskTypeValues = createAsyncThunk("task-type", async (_, { rejectWithValue }) => {
  try {
    const res = await coreservicesApi.get("api/crm/core/coreTaskType");
    return res.data;
  } catch (e: any) {
    return rejectWithValue(e.response?.data.message || "An error occurred.");
  }
});

const taskTypesSlice = createSlice({
  name: "taskType",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTaskTypeValues.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getTaskTypeValues.fulfilled, (state, action) => {
        state.isLoading = false;
        state.responseForTaskType = action.payload.map((item: any) => ({
          id: item.categoryId,
          label: item.name,
          options: item.coreTaskTypes.map((task: any) => ({
            value: task.coreTaskTypeId,
            label: task.name,
          })),
        }));
      })
      .addCase(getTaskTypeValues.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "Something went wrong!";
      });
  },
});

export const taskTypesReducer = taskTypesSlice.reducer;
