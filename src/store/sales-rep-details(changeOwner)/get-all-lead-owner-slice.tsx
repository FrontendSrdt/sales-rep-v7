import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import coreservicesApi from "../../interceptor/coreservicesApi";
import { leadOwnerType } from "../../types/lead-owner-type";



interface LeadOwnerType {
  isLoading: boolean;
  isError: string | null;
  isRun: string;
  resetActions: string;
  responseForLeadOwner: leadOwnerType[];
}

const initialState: LeadOwnerType = {
  isLoading: false,
  isError: null,
  resetActions: "",
  isRun: uuidv4(),
  responseForLeadOwner: [],
};

// create thunk to get all responseForLeadOwner data

export const getLeadOwnerValues = createAsyncThunk<any>(
  "getAllLeadOwner",
  async (_, { rejectWithValue }) => {
    try {
      const response = await coreservicesApi.get(
        "api/crm/core/salesrepdetails"
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data.message || "An error occured"
      );
    }
  }
);

const getAllLeadOwnerSlice = createSlice({
  name: "state/getAllState",
  initialState,
  reducers: {
    resetActionsForLeadOwnerFormField: (state) => {
      state.responseForLeadOwner = [];
    },
    takeActionsForLeadOwnerFormField: (state, action) => {
      state.resetActions = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getLeadOwnerValues.pending, (state) => {
        state.isError = null;
        state.isLoading = true;
      })
      .addCase(getLeadOwnerValues.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isRun = uuidv4();
        state.responseForLeadOwner = action.payload.map((item: any) => ({
          id: item.salesrpDetailsId,
          value: item.salesrpDetailsId,
          label: item.fullName,
        }));
      })
      .addCase(getLeadOwnerValues.rejected, (state, action) => {
        state.isLoading = false;
        state.isError =
          action.error.message ||
          "An Error occured while getting lead owner data";
      });
  },
});

export const { resetActionsForLeadOwnerFormField, takeActionsForLeadOwnerFormField } =
  getAllLeadOwnerSlice.actions;
export const getAllLeadOwnerReducer = getAllLeadOwnerSlice.reducer;

//getAllLeadOwner
