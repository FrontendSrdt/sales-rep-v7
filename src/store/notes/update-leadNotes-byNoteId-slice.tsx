import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface UpdateLeadNotesType {
  isRun: string;
  isError: null | string;
  isLoading: boolean;
  responseOfUpdateLeadNotes: any;
  resetActions: any;
}

const initialState: UpdateLeadNotesType = {
  isLoading: true,
  isError: null,
  isRun: uuidv4(),
  responseOfUpdateLeadNotes: "",
  resetActions: "",
};

// Create Thunk to CREATE Lead notes
export const updateLeadNotes = createAsyncThunk<any, any, any>(
  "update-notes/updateLeadNotes",
  async ({ leadNoteId, formData }, { rejectWithValue }) => {
    console.log(leadNoteId, formData);
    const response = coreLeadCaptureApi.put(`api/crm/lead/leadNotes/update/${leadNoteId}`, formData);

    toast.promise(response, {
      loading: "Loading",
      success: "Lead Notes has been Successfully Updated",
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

const updateLeadNotesSlice = createSlice({
  name: "updateLeadsNotes",
  initialState,
  reducers: {
    resetResponseForUpdateLeadNotes: (state) => {
      state.responseOfUpdateLeadNotes = "";
    },
    takeActionsForUpdateLeadNotes: (state, action) => {
      state.resetActions = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(updateLeadNotes.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(updateLeadNotes.fulfilled, (state, action) => {
        state.isRun = uuidv4();
        state.isLoading = false;
        state.responseOfUpdateLeadNotes = action.payload;
      })
      .addCase(updateLeadNotes.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "Error occured!";
      });
  },
});

export const updateLeadNotesReducer = updateLeadNotesSlice.reducer;
export const {resetResponseForUpdateLeadNotes,takeActionsForUpdateLeadNotes} = updateLeadNotesSlice.actions;
// leadNotesUpdate
