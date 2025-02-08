import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface LockLeadOfferType {
  isRun: string;
  isError: null | string;
  isLoading: boolean;
  resetActions: any;
  responseOfLockLeadOffer: any;
}

const initialState: LockLeadOfferType = {
  isLoading: true,
  isError: null,
  isRun: uuidv4(),
  resetActions: "",
  responseOfLockLeadOffer: "",
};

// Create Thunk to lock lead offer
export const lockLeadOffer = createAsyncThunk<any | LockLeadOfferType, any>("offer/LockLeadOfferSlice", async (lockLeadOfferData, { rejectWithValue }) => {
  const response = coreLeadCaptureApi.post("api/crm/lead/offerLocking/savev2", lockLeadOfferData);

  toast.promise(response, {
    loading: "Loading",
    success: "Offer has been locked successfully!",
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

const LockLeadOfferSlice = createSlice({
  name: "LockLeadOfferSlice",
  initialState,
  reducers: {
    resetResposneforLockLeadOffer: (state) => {
      state.responseOfLockLeadOffer = "";
    },
    takeActionForLockLeadOffer: (state, action) => {
      state.resetActions = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(lockLeadOffer.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(lockLeadOffer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.responseOfLockLeadOffer = action.payload;
        state.isRun = uuidv4();
      })
      .addCase(lockLeadOffer.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "Error occured!";
      });
  },
});

export const { resetResposneforLockLeadOffer, takeActionForLockLeadOffer } = LockLeadOfferSlice.actions;
export const LockLeadOfferReducer = LockLeadOfferSlice.reducer;

// lockLeadOffer
