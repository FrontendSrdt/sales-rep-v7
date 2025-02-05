import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";


interface ConfirmationForAllDocsByLeadCaptureIdType {
  ConfirmationForAllDocsByLeadCaptureIdResponse: [] | any;
  isRun: string;
  isLoading: boolean;
  isError: null | string;
}

const initialState: ConfirmationForAllDocsByLeadCaptureIdType = {
  ConfirmationForAllDocsByLeadCaptureIdResponse: [],
  isLoading: true,
  isError: null,
  isRun: uuidv4(),

};

export const getConfirmationForAllDocsById = createAsyncThunk<any, string | any>("getConfirmationForAllDocsByLeadCaptureIdResponse", async (leadCaptureId, { rejectWithValue }) => {
  const response = coreLeadCaptureApi.get(`api/crm/lead/leadDocAttachment/confirmationOfAllValidatedDocument/${leadCaptureId}`);

  toast.promise(response, {
    loading: "loading...",
    success: "Student docs confirmation successfully!",
    error: "Failed to update Student docs.",
  });

  return response.then((res) => res.data).catch((error: any) => rejectWithValue(error.response?.data.message || "An error occurred."));
});

const getConfirmationForAllDocsByLeadCaptureIdSlice = createSlice({
  name: "LeadCapture/getConfirmationForAllDocsByLeadCaptureIdResponse",
  initialState,
  reducers: {
    resetResponseForGetConfirmationForAllDocs : (state) => {
      state.ConfirmationForAllDocsByLeadCaptureIdResponse = "";
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getConfirmationForAllDocsById.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getConfirmationForAllDocsById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ConfirmationForAllDocsByLeadCaptureIdResponse = action.payload;
        state.isRun = uuidv4();

      })
      .addCase(getConfirmationForAllDocsById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "Something went wrong!";
      });
  },
});

export const {resetResponseForGetConfirmationForAllDocs} = getConfirmationForAllDocsByLeadCaptureIdSlice.actions;
export const getConfirmationForAllDocsByLeadCaptureIdReducer = getConfirmationForAllDocsByLeadCaptureIdSlice.reducer;

//getConfirmationForAllDocsByLeadCaptureId
