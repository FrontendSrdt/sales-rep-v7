import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface LeadNameType {
  isRun: string;
  isError: null | string;
  isLoading: boolean;
  responseForLeadName: [];
}

const initialState: LeadNameType = {
  isLoading: true,
  isError: null,
  isRun: uuidv4(),
  responseForLeadName: [],
};

export const getLeadNameValues = createAsyncThunk("leadname", async (_, { rejectWithValue }) => {
  try {
    const res = await coreLeadCaptureApi.get("api/crm/lead/leadcapture/getLeadNameId");
    return res.data;
  } catch (e: any) {
    return rejectWithValue(e.response?.data.message || "An error occurred.");
  }
});

const leadNamesSlice = createSlice({
  name: "LeadName",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLeadNameValues.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getLeadNameValues.fulfilled, (state, action) => {
        state.isLoading = false;
        state.responseForLeadName = action.payload.map((item: any) => ({
          label: item.name,
          value: item.leadCaptureId,
        }));
      })
      .addCase(getLeadNameValues.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "Something went wrong!";
      });
  },
});

export const leadNamesReducer = leadNamesSlice.reducer;
//getLeadName
