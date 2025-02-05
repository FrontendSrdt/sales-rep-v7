import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface UpdateLeadContactType {
  isRun: string;
  isError: null | string;
  isLoading: boolean;
  responseOfUpdateLeadContact: any;
  resetActions: any;
}

const initialState: UpdateLeadContactType = {
  isLoading: false,
  isError: null,
  isRun: uuidv4(),
  responseOfUpdateLeadContact: "",
  resetActions: "",
};

export const updateLeadContact = createAsyncThunk<any, any, any>("update/updateLeadContact", async (updatedData, { rejectWithValue }) => {
  const response = coreLeadCaptureApi.put(`api/crm/lead/leadupdate/updateLeadRelatedContactNumber`, updatedData);

  toast.promise(response, {
    loading: "Loading",
    success: "Lead Contact Info has been Successfully Updated",
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

const updateLeadContactSlice = createSlice({
  name: "updateLeadContactInfo",
  initialState,
  reducers: {
    resetResponseForUpdateLeadContact: (state) => {
      state.responseOfUpdateLeadContact = "";
    },
    takeActionsForUpdateLeadContact: (state, action) => {
      state.resetActions = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(updateLeadContact.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(updateLeadContact.fulfilled, (state, action) => {
        state.isRun = uuidv4();
        state.isLoading = false;
        state.responseOfUpdateLeadContact = action.payload;
      })
      .addCase(updateLeadContact.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "Error occured!";
      });
  },
});

export const updateLeadContactReducer = updateLeadContactSlice.reducer;
export const { resetResponseForUpdateLeadContact, takeActionsForUpdateLeadContact } = updateLeadContactSlice.actions;
// LeadContactUpdate
