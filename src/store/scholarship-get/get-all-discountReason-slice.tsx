import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import coreservicesApi from "../../interceptor/coreservicesApi";

interface DiscountReasonType {
  isLoading: boolean;
  isError: string | null;
  isRun: string;
  resetActions: string;
  responseForAllDiscountReason: any;
}

const initialState: DiscountReasonType = {
  isLoading: false,
  isError: null,
  resetActions: "",
  isRun: uuidv4(),
  responseForAllDiscountReason: [],
};

// create thunk to get all Academic Career data

export const getAllDiscountReason = createAsyncThunk<any>("getAllActiveDiscountReasonory", async (_, { rejectWithValue }) => {
  try {
    const response = await coreservicesApi.get("api/crm/core/additionalDiscountReason");
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data.message || "An error occured");
  }
});

const getAllActiveDiscountReasonSlice = createSlice({
  name: "getAllActiveDiscountReasonory",
  initialState,
  reducers: {
    resetActionsForAllActiveDiscountReason: (state) => {
      state.responseForAllDiscountReason = [];
    },
    takeActionsForAllActiveDiscountReason: (state, action) => {
      state.resetActions = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllDiscountReason.pending, (state) => {
        state.isError = null;
        state.isLoading = true;
      })
      .addCase(getAllDiscountReason.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isRun = uuidv4();
        state.responseForAllDiscountReason = action.payload.map((item: any) => ({
          id: item.coreAdditionalDiscountReasonId,
          value: item.coreAdditionalDiscountReasonId,
          label: item.reason,
        }));
      })
      .addCase(getAllDiscountReason.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "An Error occured while getting Scholar ship category data";
      });
  },
});

export const { resetActionsForAllActiveDiscountReason, takeActionsForAllActiveDiscountReason } = getAllActiveDiscountReasonSlice.actions;
export const getAllDiscountReasonReducer = getAllActiveDiscountReasonSlice.reducer;

//getAllDiscountReason
