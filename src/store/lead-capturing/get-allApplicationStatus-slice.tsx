import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

import coreservicesApi from "../../interceptor/coreservicesApi";

interface ApplicationStatusType {
  isRun: string;
  isError: null | string;
  isLoading: boolean;
  resetActions: any;
  responseForApplicationStatus: [];
}

const initialState: ApplicationStatusType = {
  isLoading: true,
  isError: null,
  isRun: uuidv4(),
  resetActions: "",
  responseForApplicationStatus: [],
};

export const getApplicationStatusValues = createAsyncThunk("lead-ApplicationStatus", async (_, { rejectWithValue }) => {
  try {
    const res = await coreservicesApi.get("api/crm/core/coreapplicationstatus");
    return res.data;
  } catch (e: any) {
    return rejectWithValue(e.response?.data.message || "An error occurred.");
  }
});

const ApplicationStatusSlice = createSlice({
  name: "leadApplicationStatus",
  initialState,
  reducers: {
    resetApplicationStatusForValues: (state) => {
      state.responseForApplicationStatus = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getApplicationStatusValues.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getApplicationStatusValues.fulfilled, (state, action) => {
        state.isLoading = false;
        state.responseForApplicationStatus = action.payload.map((item: any) => ({
          value: item.coreApplicationStatusId,
          label: item.displayName,
        }));
      })
      .addCase(getApplicationStatusValues.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "Something went wrong!";
      });
  },
});

export const { resetApplicationStatusForValues } = ApplicationStatusSlice.actions;

export const ApplicationStatusReducer = ApplicationStatusSlice.reducer;

//getAllApplicationStatus
