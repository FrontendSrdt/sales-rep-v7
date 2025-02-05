import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface DocumentsByIdType {
  leadDocumentsById: {};
  isLoading: boolean;
  isError: null | string;
}

const initialState: DocumentsByIdType = {
  leadDocumentsById: {},
  isLoading: true,
  isError: null,
};
export const getDocumentsById = createAsyncThunk<any, any>("leadDocumentsById", async (leadCaptureId, { rejectWithValue }) => {
  try {
    const response = await coreLeadCaptureApi.get(`api/crm/lead/leadDocAttachment/findAllByLeadCaptureId/${leadCaptureId}/R`);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data.message || "An error occurred.");
  }
});

const getDocumentsByIdSlice = createSlice({
  name: "leadDocumentsByIdSlice",
  initialState,
  reducers: {
    resetDocumentsDataById: (state) => {
      state.leadDocumentsById = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDocumentsById.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getDocumentsById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.leadDocumentsById = action.payload;
      })
      .addCase(getDocumentsById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "Something went wrong!";
      });
  },
});

export const { resetDocumentsDataById } = getDocumentsByIdSlice.actions;
export const getDocumentsByIdReducer = getDocumentsByIdSlice.reducer;

//getDocumentsDataById
