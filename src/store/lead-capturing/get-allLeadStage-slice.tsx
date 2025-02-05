import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";


import coreservicesApi from "../../interceptor/coreservicesApi";
import { leadStageType } from "../../types/manage-leads/manage-leads-type";

interface LeadStageType {
  isRun: string;
  isError: null | string;
  isLoading: boolean;
  resetActions: any;
  responseForLeadStage: leadStageType[];
}

const initialState: LeadStageType = {
  isLoading: true,
  isError: null,
  isRun: uuidv4(),
  resetActions: "",
  responseForLeadStage: [],
};

// Create Thunk to get Lead Stages

export const getLeadStageValues = createAsyncThunk("lead-stage", async (_, { rejectWithValue }) => {
  try {
    const res = await coreservicesApi.get("api/crm/core/coreleadstage");
    return res.data;
  } catch (e: any) {
    return rejectWithValue(e.response?.data.message || "An error occurred.");
  }
});

const leadStagesSlice = createSlice({
  name: "lead-stage",
  initialState,
  reducers: {
    resetLeadStageForValues: (state) => {
      state.responseForLeadStage = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLeadStageValues.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getLeadStageValues.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.responseForLeadStage = [];
        // console.log(action.payload);
        state.responseForLeadStage = action.payload.map((item: any) => ({
          id: item.leadStageId,
          value: item.leadStageId,
          name: item.displayName,
        }));
      })
      .addCase(getLeadStageValues.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "Something went wrong!";
      });
  },
});

export const leadStageAction = leadStagesSlice.actions;

export default leadStagesSlice.reducer;
