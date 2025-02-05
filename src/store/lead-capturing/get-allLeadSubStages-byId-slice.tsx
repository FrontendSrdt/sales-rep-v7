import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreservicesApi from "../../interceptor/coreservicesApi";

interface LeadSubStagesByIdType {
  leadSubStagesDataById: any | {};
  isLoading: boolean;
  isError: null | string;
}

const initialState: LeadSubStagesByIdType = {
  leadSubStagesDataById: {},
  isLoading: true,
  isError: null,
};
export const getleadSubStagesById = createAsyncThunk<any, any>("leadSubStagesId", async (subStageId, { rejectWithValue }) => {
  console.log("run apiiiiiii")
  try {
    const response = await coreservicesApi.get(`api/crm/core/coreleadsubstage/findByCoreLeadStage/${subStageId}`);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data.message || "An error occurred.");
  }
});

const getleadSubStagesByIdSlice = createSlice({
  name: "leadSubStagesByID",
  initialState,
  reducers: {
    resetResponseForSubStagesById: (state) => {
      console.log("inside the reducers");
      state.leadSubStagesDataById = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getleadSubStagesById.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getleadSubStagesById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.leadSubStagesDataById = action.payload;
      })
      .addCase(getleadSubStagesById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "Something went wrong!";
      });
  },
});

export const { resetResponseForSubStagesById } = getleadSubStagesByIdSlice.actions;
export const getleadSubStagesByIdReducer = getleadSubStagesByIdSlice.reducer;
//getleadSubStagesDataById
