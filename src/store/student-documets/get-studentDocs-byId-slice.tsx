import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface StudentDocsByLeadCaptureIdType {
  StudentDocsByLeadCaptureIdResponse: [] | any;
  isLoading: boolean;
  isError: null | string;
}

const initialState: StudentDocsByLeadCaptureIdType = {
  StudentDocsByLeadCaptureIdResponse: [],
  isLoading: true,
  isError: null,
};
export const getStudentDocsByLeadCaptureId = createAsyncThunk<any, string | undefined>("getStudentDocsByLeadCaptureIdResponse", async (leadCaptureId, { rejectWithValue }) => {
  try {
    const response = await coreLeadCaptureApi.get(`api/crm/lead/leadDocAttachment/findAllByLeadCaptureId/${leadCaptureId}/S`);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data.message || "An error occurred.");
  }
});

const getStudentDocsByLeadCaptureIdSlice = createSlice({
  name: "LeadCapture/getStudentDocsByLeadCaptureIdResponse",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStudentDocsByLeadCaptureId.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getStudentDocsByLeadCaptureId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.StudentDocsByLeadCaptureIdResponse = action.payload;
      })
      .addCase(getStudentDocsByLeadCaptureId.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "Something went wrong!";
      });
  },
});

export const getStudentDocsByLeadCaptureIdReducer = getStudentDocsByLeadCaptureIdSlice.reducer;

//getStudentDocsByLeadCaptureIdResponse
