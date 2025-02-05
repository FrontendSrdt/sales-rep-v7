import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

import toast from "react-hot-toast";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface NewLeadNotesType {
  isRun: string;
  isError: null | string;
  isLoading: boolean;
  resetActions: any;
  responseOfNewLeadNotes: any;
}

const initialState: NewLeadNotesType = {
  isLoading: true,
  isError: null,
  isRun: uuidv4(),
  resetActions: "",
  responseOfNewLeadNotes: "",
};

// Create Thunk to CREATE Lead Capture
export const AddNewLeadNotes = createAsyncThunk<any | NewLeadNotesType, any>(
  "create-new/lead-notes",
  (newLeadNotesData, { rejectWithValue }) => {
    const response = coreLeadCaptureApi.post("api/crm/lead/leadNotes", newLeadNotesData);
    console.log(response);
    toast.promise(response, {
      loading: "Loading",
      success: "Note has been Successfully Added",
      error: (e: any) => {
        // Extract the error message dynamically from response
        const errorMessage = e.response?.data?.error || "Error occurred while submitting";
        return errorMessage;
      },
    });

    return response
      .then((res) => {
        console.log("NewLeadNoteResponse =", res.data);
        return res.data;
      })
      .catch((e: any) => {
        console.error(e.message);
        return rejectWithValue(e.message);
      });
  }
);

const AddNewLeadNotesSlice = createSlice({
  name: "AddNewLeadNotes",
  initialState,
  reducers: {
    resetResposneforNewLeadNotes: (state) => {
      state.responseOfNewLeadNotes = "";
    },
    takeActionForNewLeadNotes: (state, action) => {
      console.log("action", action);
      state.resetActions = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(AddNewLeadNotes.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(AddNewLeadNotes.fulfilled, (state, action) => {
        state.isRun = uuidv4();
        console.log(state.isRun);
        state.isLoading = false;
        state.responseOfNewLeadNotes = action.payload;
      })
      .addCase(AddNewLeadNotes.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "Error occured!";
      });
  },
});

export const { resetResposneforNewLeadNotes, takeActionForNewLeadNotes } = AddNewLeadNotesSlice.actions;
export const AddNewLeadNotesReducer = AddNewLeadNotesSlice.reducer;

// addNewLeadNotes
