import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface AssignSalesRepToManagerType {
  isLoading: boolean;
  isError: string | null;
  isRun: string;
  resetActions: string;
  responseForAssignSalesRepToManager: any;
}

const initialState: AssignSalesRepToManagerType = {
  isLoading: false,
  isError: null,
  resetActions: "",
  isRun: uuidv4(),
  responseForAssignSalesRepToManager: [],
};

// create thunk to get all responseForAssignSalesRepToManager data

export const assignSalesRepToManagerValues = createAsyncThunk<any>(
  "assignSalesRepToManager",
  async (leadCaptureId, { rejectWithValue }) => {
    try {
      const response = await coreLeadCaptureApi.get(`api/crm/lead/assignment/salesrep/lead/${leadCaptureId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data.message || "An error occured");
    }
  }
);

const assignSalesRepToManagerSlice = createSlice({
  name: "assignSalesRepToManagerSlice",
  initialState,
  reducers: {
    resetActionsForAssignSalesRepToManagerFormField: (state) => {
      state.responseForAssignSalesRepToManager = [];
    },
    takeActionsForAssignSalesRepToManagerFormField: (state, action) => {
      state.resetActions = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(assignSalesRepToManagerValues.pending, (state) => {
        state.isError = null;
        state.isLoading = true;
      })
      .addCase(assignSalesRepToManagerValues.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isRun = uuidv4();
        state.responseForAssignSalesRepToManager = action.payload;
      })
      .addCase(assignSalesRepToManagerValues.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "An Error occured while assigning sales rep data";
      });
  },
});

export const { resetActionsForAssignSalesRepToManagerFormField, takeActionsForAssignSalesRepToManagerFormField } =
  assignSalesRepToManagerSlice.actions;
export const assignSalesRepToManagerReducer = assignSalesRepToManagerSlice.reducer;

//assignSalesRepToManager
