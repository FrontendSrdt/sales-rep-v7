import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface ScholarshipPercentageDiscountBySlabIdType {
  scholarshipPercentageDiscountBySlabId: [] | any;
  isLoading: boolean;
  isError: null | string;
}

const initialState: ScholarshipPercentageDiscountBySlabIdType = {
  scholarshipPercentageDiscountBySlabId: [],
  isLoading: false,
  isError: null,
};

//  Create Thunk for gettting Academic Program By categ ID

export const getScholarshipPercentageDiscountBySlabId = createAsyncThunk<any, string>("get/getScholarshipPercentageDiscountBySlabId", async (slabId, { rejectWithValue }) => {
  try {
    const response = await coreLeadCaptureApi.get(`api/crm/lead/leadScholarshipDetails/getCoreScholarshipSlabNameAndDiscount/${slabId}`);
    return response.data;
  } catch (e: any) {
    return rejectWithValue(e.response?.data.message || "An error occurred.");
  }
});

const getScholarshipPercentageDiscountBySlabIdSlice = createSlice({
  name: "get-Scholarship-PercentageDiscount-By-SlabId",
  initialState,
  reducers: {
    resetResponseForScholarshipPercentageDiscount: (state) => {
      state.scholarshipPercentageDiscountBySlabId = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getScholarshipPercentageDiscountBySlabId.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getScholarshipPercentageDiscountBySlabId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.scholarshipPercentageDiscountBySlabId = action.payload;
      })
      .addCase(getScholarshipPercentageDiscountBySlabId.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "something went wrong ";
      });
  },
});

export const { resetResponseForScholarshipPercentageDiscount } = getScholarshipPercentageDiscountBySlabIdSlice.actions;
export const getScholarshipPercentageDiscountBySlabIdReducer = getScholarshipPercentageDiscountBySlabIdSlice.reducer;
//getScholarshipPercentageDiscountBySlabId
