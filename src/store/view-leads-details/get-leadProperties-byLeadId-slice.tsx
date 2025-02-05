import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface LeadPropertiesByIdType {
  leadPropertiesDataById: Record<string, any>; // Update this to a stricter type if possible.
  isLoading: boolean;
  isError: string | null;
}

const initialState: LeadPropertiesByIdType = {
  leadPropertiesDataById: {},
  isLoading: true,
  isError: null,
};

// Async thunk for fetching lead properties by ID
export const getLeadPropertiesById = createAsyncThunk<any, any>("LeadPropertiesById", async (leadId, { rejectWithValue }) => {
  try {
    const response = await coreLeadCaptureApi.get(`api/crm/lead/leadActivity/getLeadProperties/${leadId}`);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "An error occurred.");
  }
});

const getLeadPropertiesByIdSlice = createSlice({
  name: "LeadPropertiesByID",
  initialState,
  reducers: {
    resetResponseForLeadPropertiesDataById: (state) => {
      state.leadPropertiesDataById = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLeadPropertiesById.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getLeadPropertiesById.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isError = "false";
        state.leadPropertiesDataById = action.payload;
      })
      .addCase(getLeadPropertiesById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = (action.payload as string) || "Something went wrong!";
      });
  },
});
export const { resetResponseForLeadPropertiesDataById } = getLeadPropertiesByIdSlice.actions;
export const getLeadPropertiesByIdReducer = getLeadPropertiesByIdSlice.reducer;
//getLeadPropertiesDataById
