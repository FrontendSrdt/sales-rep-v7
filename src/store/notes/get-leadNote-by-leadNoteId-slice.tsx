import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface LeadNotesByNoteIdType {
  leadNotesByNoteId: any;
  isLoading: boolean;
  isError: null | string;
}

const initialState: LeadNotesByNoteIdType = {
  leadNotesByNoteId: {},
  isLoading: true,
  isError: null,
};
export const getLeadNotesByNoteId = createAsyncThunk<any, any>("leadNotesId", async (leadNotesId, { rejectWithValue }) => {
  try {
    const response = await coreLeadCaptureApi.get(`api/crm/lead/leadNotes/leadNote/${leadNotesId}`);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data.message || "An error occurred.");
  }
});

const getLeadNotesByNoteIdSlice = createSlice({
  name: "leadNotesByNoteId",
  initialState,
  reducers: {
    resetLeadNotesDataByNoteId: (state) => {
      state.leadNotesByNoteId = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLeadNotesByNoteId.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getLeadNotesByNoteId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.leadNotesByNoteId = action.payload;
      })
      .addCase(getLeadNotesByNoteId.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "Something went wrong!";
      });
  },
});

export const { resetLeadNotesDataByNoteId } = getLeadNotesByNoteIdSlice.actions;
export const getLeadNotesByNoteIdReducer = getLeadNotesByNoteIdSlice.reducer;

//getLeadNotesDataByNoteId
