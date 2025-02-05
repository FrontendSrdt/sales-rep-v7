import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";
import toast from "react-hot-toast";

interface newLeadApplicationStatusType {
  isRun: string;
  isError: null | string;
  isLoading: boolean;
  resetActions: any;
  responseOfLeadApplicationStatus: any;
}

const initialState: newLeadApplicationStatusType = {
  isRun: uuidv4(),
  isError: null,
  isLoading: true,
  resetActions: "",
  responseOfLeadApplicationStatus: "",
};

export const createLeadApplicationStatus = createAsyncThunk<any | newLeadApplicationStatusType, any>(
  "newLeadApplicationStatus",
  async (newLeadApplicationStatusData, { rejectWithValue }) => {
    const response = coreLeadCaptureApi.post("api/crm/lead/leadapplicationstatus", newLeadApplicationStatusData);

    toast.promise(response, {
      loading: "Loading",
      success: "Lead Application Status has been Successfully Added",
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

export const createLeadApplicationStatusSlice = createSlice({
  name: "newLeadApplicationStatusdata",
  initialState,
  reducers: {
    resetResposneforLeadApplicationStatus: (state) => {
      state.responseOfLeadApplicationStatus = "";
    },
    takeActionForLeadApplicationStatus: (state, action) => {
      state.resetActions = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createLeadApplicationStatus.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(createLeadApplicationStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.responseOfLeadApplicationStatus = action.payload;
        state.isRun = uuidv4();
      })
      .addCase(createLeadApplicationStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "Error occured!";
      });
  },
});

export const { resetResposneforLeadApplicationStatus, takeActionForLeadApplicationStatus } = createLeadApplicationStatusSlice.actions;
export const createLeadApplicationStatusReducer = createLeadApplicationStatusSlice.reducer;

// addLeadApplicationStatus
