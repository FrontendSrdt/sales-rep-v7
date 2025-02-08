import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface BulkChangeOwner {
  isLoading: boolean;
  isError: null | string;
  responseBulkChangeOwner: {};
  isRun: string;
  resetActions: any;
}

const initialState: BulkChangeOwner = {
  isLoading: false,
  isError: null,
  responseBulkChangeOwner: {},
  isRun: uuidv4(),
  resetActions: "",
};

//thunk to create new lead academic details

export const ChangeOwnerInBulk = createAsyncThunk<any | BulkChangeOwner, any>(
  "bulkChangeOwner",

  async (payload, { rejectWithValue }) => {
    const response = coreLeadCaptureApi.put("api/crm/lead/changeOwner", payload);

    toast.promise(response, {
      loading: "Loading",
      success: "Owner Changed successfully",
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

const BulkChangeOwnerSlice = createSlice({
  name: "responseBulkChangeOwner",
  initialState,
  reducers: {
    resetResponseForBulkChangeOwner: (state) => {
      state.responseBulkChangeOwner = {};
    },

    takeActionForBulkChangeOwner: (state, action) => {
      state.resetActions = action.payload;
    },
  },
  extraReducers(builder) {
    builder;
    builder.addCase(ChangeOwnerInBulk.pending, (state) => {
      state.isError = null;
      state.isLoading = true;
    });

    builder.addCase(ChangeOwnerInBulk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.responseBulkChangeOwner = action.payload;
      state.isRun = uuidv4();
    });
    builder.addCase(ChangeOwnerInBulk.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.error.message || "An error occured while creating new lead academic details for tenth";
    });
  },
});

export const { resetResponseForBulkChangeOwner, takeActionForBulkChangeOwner } = BulkChangeOwnerSlice.actions;

export const BulkChangeOwnerReducer = BulkChangeOwnerSlice.reducer;

//BulkChangeOwner
