import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";

interface VerifyStudentDocsType {
  VerifyStudentDocsResponse: string | any;
  isLoading: boolean;
  isRun: string;
  isError: null | string;
}

const initialState: VerifyStudentDocsType = {
  VerifyStudentDocsResponse: "",
  isLoading: true,
  isError: null,
  isRun: uuidv4(),
};

export const verifyStudentDocs = createAsyncThunk<any, any>("getVerifyStudentDocsResponse", async ({ leadDocAttachmentId, status }, { rejectWithValue }) => {
  const response = coreLeadCaptureApi.patch(`api/crm/lead/leadDocAttachment/updateStatus/${leadDocAttachmentId}/${status}`);

  toast.promise(response, {
    loading: "loading...",
    success: "Student docs updated successfully!",
    error: "Failed to update Student docs.",
  });

  return response.then((res) => res.data).catch((error: any) => rejectWithValue(error.response?.data.message || "An error occurred."));
});

const verifyStudentDocsSlice = createSlice({
  name: "LeadCapture/getVerifyStudentDocsResponse",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(verifyStudentDocs.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(verifyStudentDocs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.VerifyStudentDocsResponse = action.payload;
        state.isRun = uuidv4();
      })
      .addCase(verifyStudentDocs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "Something went wrong!";
      });
  },
});

export const verifyStudentDocsReducer = verifyStudentDocsSlice.reducer;

//verifyStudentDocsResponse
