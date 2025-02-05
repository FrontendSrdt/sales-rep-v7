import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface LeadApplicationStatusIdType {
  leadApplicationStatusById: {};
  isLoading: boolean;
  isError: null | string;
}

const initialState: LeadApplicationStatusIdType = {
  leadApplicationStatusById: {},
  isLoading: true,
  isError: null,
};
export const getLeadApplicationStatusById = createAsyncThunk("leadApplicationStatusId", async (leadApplicationStatusId, { rejectWithValue }) => {
  try {
    const response = await coreLeadCaptureApi.get(`api/crm/lead/leadapplicationstatus/${leadApplicationStatusId}`);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data.message || "An error occurred.");
  }
});

const getLeadApplicationStatusByIdSlice = createSlice({
  name: "LeadApplicationStatusByID",
  initialState,
  reducers: {
    resetLeadApplicationStatusDataById: (state) => {
      state.leadApplicationStatusById = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLeadApplicationStatusById.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getLeadApplicationStatusById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.leadApplicationStatusById = action.payload;
      })
      .addCase(getLeadApplicationStatusById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "Something went wrong!";
      });
  },
});

export const { resetLeadApplicationStatusDataById } = getLeadApplicationStatusByIdSlice.actions;
export const getLeadApplicationStatusByIdReducer = getLeadApplicationStatusByIdSlice.reducer;

//getLeadApplicationStatusDataById
