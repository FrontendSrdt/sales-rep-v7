import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface LeadAcadDetailsTwelfthIdType {
  leadAcadDetailsTwelfthById: {};
  isLoading: boolean;
  isError: null | string;
}

const initialState: LeadAcadDetailsTwelfthIdType = {
  leadAcadDetailsTwelfthById: {},
  isLoading: true,
  isError: null,
};
export const getLeadAcadDetailsTwelfthById = createAsyncThunk("leadAcadDetailsTwelfthId", async (leadAcadDetailsTwelfthId, { rejectWithValue }) => {
  try {
    const response = await coreLeadCaptureApi.get(`api/crm/core/leadAcadDetailsTwelfth/${leadAcadDetailsTwelfthId}`);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data.message || "An error occurred.");
  }
});

const getLeadAcadDetailsTwelfthByIdSlice = createSlice({
  name: "LeadAcadDetailsTwelfthByID",
  initialState,
  reducers: {
    resetLeadAcadDetailsTwelfthDataById: (state) => {
      state.leadAcadDetailsTwelfthById = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLeadAcadDetailsTwelfthById.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getLeadAcadDetailsTwelfthById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.leadAcadDetailsTwelfthById = action.payload;
      })
      .addCase(getLeadAcadDetailsTwelfthById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "Something went wrong!";
      });
  },
});

export const { resetLeadAcadDetailsTwelfthDataById } = getLeadAcadDetailsTwelfthByIdSlice.actions;
export const getLeadAcadDetailsTwelfthByIdReducer = getLeadAcadDetailsTwelfthByIdSlice.reducer;

//getLeadAcadDetailsTwelfthDataById
