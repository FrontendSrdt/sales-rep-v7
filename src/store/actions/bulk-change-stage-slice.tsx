import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface BulkChangeStage {
  isLoading: boolean;
  isError: null | string;
  responseBulkChangeStage: {};
  isRun: string;
  resetActions: any;
}

const initialState: BulkChangeStage = {
  isLoading: false,
  isError: null,
  responseBulkChangeStage: {},
  isRun: uuidv4(),
  resetActions: "",
};

//thunk to create new lead academic details

export const ChangeStageInBulk = createAsyncThunk<any | BulkChangeStage, any>(
  "bulkChangeStage",

  async (payload, { rejectWithValue }) => {
    const response = coreLeadCaptureApi.put("api/crm/lead/changeStage", payload);

    toast.promise(response, {
      loading: "Loading",
      success: "Stage Changed successfully",
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

const BulkChangeStageSlice = createSlice({
  name: "responseBulkChangeStage",
  initialState,
  reducers: {
    resetResponseForBulkChangeStage: (state) => {
      state.responseBulkChangeStage = {};
    },

    takeActionForBulkChangeStage: (state, action) => {
      state.resetActions = action.payload;
    },
  },
  extraReducers(builder) {
    builder;
    builder.addCase(ChangeStageInBulk.pending, (state) => {
      state.isError = null;
      state.isLoading = true;
    });

    builder.addCase(ChangeStageInBulk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.responseBulkChangeStage = action.payload;
      state.isRun = uuidv4();
    });
    builder.addCase(ChangeStageInBulk.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.error.message || "An error occured while creating new lead academic details for tenth";
    });
  },
});

export const { resetResponseForBulkChangeStage, takeActionForBulkChangeStage } = BulkChangeStageSlice.actions;

export const BulkChangeStageReducer = BulkChangeStageSlice.reducer;

//BulkChangeStage
