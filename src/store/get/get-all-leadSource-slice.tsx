import { v4 as uuidv4 } from "uuid";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface LeadSourceType {
  isLoading: boolean;
  isError: string | null;
  isRun: string;
  resetActions: string;
  responseForLeadSource: any;
}

const initialState: LeadSourceType = {
  isLoading: false,
  isError: null,
  resetActions: "",
  isRun: uuidv4(),
  responseForLeadSource: [],
};

// create thunk to get all State data

export const getLeadSourceValues = createAsyncThunk<any>("getAllLeadSource", async (_, { rejectWithValue }) => {
  try {
    const response = await coreLeadCaptureApi.get("api/crm/lead/leadcapture");
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data.message || "An error occured");
  }
});

const getAllLeadSourceSlice = createSlice({
  name: "LeadSource/getAllLeadSource",
  initialState,
  reducers: {
    resetActionsForLeadSourceFormField: (state) => {
      state.responseForLeadSource = [];
    },
    takeActionsForLeadSourceFormField: (state, action) => {
      state.resetActions = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getLeadSourceValues.pending, (state) => {
        state.isError = null;
        state.isLoading = true;
      })
      .addCase(getLeadSourceValues.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isRun = uuidv4();
        state.responseForLeadSource = action.payload.map((item: any) => ({
          id: item.leadSourceId,
          value: item.leadSourceId,
          name: item.description,
        }));
      })
      .addCase(getLeadSourceValues.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "An Error occured while getting LeadSource data";
      });
  },
});

export const { resetActionsForLeadSourceFormField, takeActionsForLeadSourceFormField } = getAllLeadSourceSlice.actions;
export const getAllLeadSourceReducer = getAllLeadSourceSlice.reducer;

//getAllLeadSource
