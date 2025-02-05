import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface UpdateLeadAddressType {
  isRun: string;
  isError: null | string;
  isLoading: boolean;
  responseOfUpdateLeadAddress: any;
  resetActions: any;
}

const initialState: UpdateLeadAddressType = {
  isLoading: false,
  isError: null,
  isRun: uuidv4(),
  responseOfUpdateLeadAddress: "",
  resetActions: "",
};

export const updateLeadAddress = createAsyncThunk<any, any, any>("update/updateLeadAddress", async (updatedData, { rejectWithValue }) => {
  const response = coreLeadCaptureApi.put(`api/crm/lead/leadupdate/updateLeadAddress`, updatedData);

  toast.promise(response, {
    loading: "Loading",
    success: "Lead Address Info has been Successfully Updated",
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

const updateLeadAddressSlice = createSlice({
  name: "updateLeadsAdress",
  initialState,
  reducers: {
    resetResponseForUpdateLeadAddress: (state) => {
      state.responseOfUpdateLeadAddress = "";
    },
    takeActionsForUpdateLeadAddress: (state, action) => {
      state.resetActions = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(updateLeadAddress.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(updateLeadAddress.fulfilled, (state, action) => {
        state.isRun = uuidv4();
        state.isLoading = false;
        state.responseOfUpdateLeadAddress = action.payload;
      })
      .addCase(updateLeadAddress.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "Error occured!";
      });
  },
});

export const updateLeadAddressReducer = updateLeadAddressSlice.reducer;
export const { resetResponseForUpdateLeadAddress, takeActionsForUpdateLeadAddress } = updateLeadAddressSlice.actions;
// LeadAddressUpdate
