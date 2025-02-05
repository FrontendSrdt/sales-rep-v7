import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface NewNotesType {
  isRun: string;
  isError: null | string;
  isLoading: boolean;
  resetActions: any;
  responseOfNewNotes: any;
}

const initialState: NewNotesType = {
  isLoading: true,
  isError: null,
  isRun: uuidv4(),
  resetActions: "",
  responseOfNewNotes: "",
};

// Create Thunk to CREATE Lead Note
export const AddNewNotes = createAsyncThunk<any | NewNotesType, FormData>("create-new/notes", async (formData, { rejectWithValue }) => {
  const response = coreLeadCaptureApi.post("api/crm/lead/leadNotes/save", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return toast
    .promise(response, {
      loading: "Loading",
      success: "Note has been Successfully Added",
      error: (e: any) => {
        // Extract the error message dynamically from response
        const errorMessage = e.response?.data?.error || "Error occurred while submitting";
        return errorMessage;
      },
    })
    .then((res) => {
      console.log("NewLeadNoteResponse =", res.data);
      return res.data;
    })
    .catch((e: any) => {
      console.error(e.message);
      return rejectWithValue(e.message);
    });
});

const AddNewNotesSlice = createSlice({
  name: "AddNewNotes",
  initialState,
  reducers: {
    resetResposneforNewNotes: (state) => {
      state.responseOfNewNotes = "";
    },
    takeActionForNewNotes: (state, action) => {
      // console.log("action", action);
      state.resetActions = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(AddNewNotes.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(AddNewNotes.fulfilled, (state, action) => {
        state.isRun = uuidv4();
        console.log(state.isRun);
        state.isLoading = false;
        state.responseOfNewNotes = action.payload;
      })
      .addCase(AddNewNotes.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "Error occurred!";
      });
  },
});

export const { resetResposneforNewNotes, takeActionForNewNotes } = AddNewNotesSlice.actions;
export const AddNewNotesReducer = AddNewNotesSlice.reducer;

//addNewNotes
