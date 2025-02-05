import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface LeadScheduledNotesType {
  isRun: string;
  isError: null | string;
  isLoading: boolean;
  responseForLeadScheduledNotes: any;
}

const initialState: LeadScheduledNotesType = {
  isLoading: true,
  isError: null,
  isRun: uuidv4(),
  responseForLeadScheduledNotes: [],
};

export const getLeadScheduledNotesValuesById = createAsyncThunk<any, any>("leadscheduledNotes", async (leadCaptureId, { rejectWithValue }) => {
  try {
    const res = await coreLeadCaptureApi.get(`api/crm/lead/leadNotes/findByLeadCaptureIdGroupedByDate/${leadCaptureId}`);
    return res.data;
  } catch (e: any) {
    return rejectWithValue(e.response?.data.message || "An error occurred.");
  }
});

const leadScheduledNotesByIdSlice = createSlice({
  name: "LeadScheduledNotes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLeadScheduledNotesValuesById.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getLeadScheduledNotesValuesById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.responseForLeadScheduledNotes = action.payload;
        state.isRun = uuidv4();
      })
      .addCase(getLeadScheduledNotesValuesById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "Something went wrong!";
      });
  },
});

export const leadScheduledNotesReducer = leadScheduledNotesByIdSlice.reducer;
//getLeadScheduledNotes
