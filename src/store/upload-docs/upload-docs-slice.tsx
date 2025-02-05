import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

import toast from "react-hot-toast";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface UploadDocsType {
  isRun: string;
  isError: null | string;
  isLoading: boolean;
  resetActions: any;
  responseOfUploadDocs: any;
}

const initialState: UploadDocsType = {
  isLoading: true,
  isError: null,
  isRun: uuidv4(),
  resetActions: "",
  responseOfUploadDocs: "",
};

export const uploadDocs = createAsyncThunk<any | UploadDocsType, any>("/upload-docs", (uploadedData, { rejectWithValue }) => {
  const response = coreLeadCaptureApi.post("api/crm/lead/leadDocAttachment/upload", uploadedData);
  toast.promise(response, {
    loading: "Loading",
    success: "document has been Successfully uploaded",
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
});

const uploadDocsSlice = createSlice({
  name: "AddUploadDocs",
  initialState,
  reducers: {
    resetResposneforUploadDocs: (state) => {
      state.responseOfUploadDocs = "";
    },
    takeActionForUploadDocs: (state, action) => {
      state.resetActions = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(uploadDocs.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(uploadDocs.fulfilled, (state, action) => {
        state.isRun = uuidv4();
        state.isLoading = false;
        state.responseOfUploadDocs = action.payload;
      })
      .addCase(uploadDocs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "Error occured!";
      });
  },
});

export const { resetResposneforUploadDocs, takeActionForUploadDocs } = uploadDocsSlice.actions;
export const uploadDocsReducer = uploadDocsSlice.reducer;

// docsUpload
