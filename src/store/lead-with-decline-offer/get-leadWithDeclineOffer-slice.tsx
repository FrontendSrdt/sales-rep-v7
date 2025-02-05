import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";
import { declineLeadCases } from "../../types/view-decline-cases-type";

interface LeadWithDeclineOfferType {
  isLoading: boolean;
  isError: string | null;
  isRun: string;
  responseForLeadWithDeclineOffer: declineLeadCases[];
}

const initialState: LeadWithDeclineOfferType = {
  isLoading: false,
  isError: null,
  isRun: uuidv4(),
  responseForLeadWithDeclineOffer: [],
};

// create thunk to get all lead source data

export const getLeadWithDeclineOfferValues = createAsyncThunk<any>("getAllLeadWithDeclineOffer", async (_, { rejectWithValue }) => {
  try {
    const response = await coreLeadCaptureApi.get("api/crm/lead/leadCaptureRetrieval/getAllLeadsWithOfferDeclined");
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data.message || "An error occured");
  }
});

const getAllLeadWithDeclineOfferSlice = createSlice({
  name: "LeadWithDeclineOffer/getAllLeadWithDeclineOffer",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getLeadWithDeclineOfferValues.pending, (state) => {
        state.isError = null;
        state.isLoading = true;
      })
      .addCase(getLeadWithDeclineOfferValues.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isRun = uuidv4();
        state.responseForLeadWithDeclineOffer = action.payload;
      })
      .addCase(getLeadWithDeclineOfferValues.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "An Error occured while getting lead source data";
      });
  },
});

export const getAllLeadWithDeclineOfferReducer = getAllLeadWithDeclineOfferSlice.reducer;

//coreLeadWithDeclineOffer
