import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";
import toast from "react-hot-toast";

interface updateLeadScholarshipDetailsByScholarshipDetailsIdType {
  updateLeadScholarshipDetailsByScholarshipDetailsIdResponse: {};
  isLoading: boolean;
  isError: null | string;
}

const initialState: updateLeadScholarshipDetailsByScholarshipDetailsIdType = {
  updateLeadScholarshipDetailsByScholarshipDetailsIdResponse: {},
  isLoading: false,
  isError: null,
};
export const updateLeadScholarshipDetailsByScholarshipDetailsId = createAsyncThunk<any, any>(
  "updateLeadScholarshipDetailsByScholarshipDetailsId",
  async (leadScholarId, { rejectWithValue }) => {
    const response = coreLeadCaptureApi.patch(`api/crm/lead/leadScholarshipDetails/updateStatus/${leadScholarId}`);

    toast.promise(response, {
      loading: "Updating lead scholarship details...",
      success: "Scholarship details updated successfully!",
      error: "Failed to update scholarship details.",
    });

    return response.then((res) => res.data).catch((error: any) => rejectWithValue(error.response?.data.message || "An error occurred."));
  }
);

const updateLeadScholarshipDetailsByScholarshipDetailsIdSlice = createSlice({
  name: "LeadCapture/updateLeadScholarshipDetailsByScholarshipDetailsId",
  initialState,
  reducers: {
    resetResponseForUpdateLeadScholarshipDetailsByScholarId: (state) => {
      state.updateLeadScholarshipDetailsByScholarshipDetailsIdResponse = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateLeadScholarshipDetailsByScholarshipDetailsId.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(updateLeadScholarshipDetailsByScholarshipDetailsId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.updateLeadScholarshipDetailsByScholarshipDetailsIdResponse = action.payload;
      })
      .addCase(updateLeadScholarshipDetailsByScholarshipDetailsId.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "Something went wrong!";
      });
  },
});

export const { resetResponseForUpdateLeadScholarshipDetailsByScholarId } = updateLeadScholarshipDetailsByScholarshipDetailsIdSlice.actions;
export const updateLeadScholarshipDetailsByScholarIdReducer = updateLeadScholarshipDetailsByScholarshipDetailsIdSlice.reducer;

//updateLeadScholarshipDetailsByScholarId
