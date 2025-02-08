import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

// import { ScholarShipSlabType } from "../../types/scholarhip-categ-type";

interface ScholarSlabData_By_SchemeId_Type {
  scholarSlabBySchemeId: [] | any;
  isLoading: boolean;
  isError: null | string;
}

const initialState: ScholarSlabData_By_SchemeId_Type = {
  scholarSlabBySchemeId: [],
  isLoading: false,
  isError: null,
};

//  Create Thunk for gettting Academic Program By categ ID

export const getScholarSlabBySchemeId = createAsyncThunk<any, string>("get/getScholarSlabBySchemeId", async (schemeId, { rejectWithValue }) => {
  try {
    const response = await coreLeadCaptureApi.get(`api/crm/lead/leadScholarshipDetails/getAllActiveScholarshipSlab/${schemeId}`);
    return response.data;
  } catch (e: any) {
    return rejectWithValue(e.response?.data.message || "An error occurred.");
  }
});

const getScholarSlabBySchemeIdSlice = createSlice({
  name: "scholarscheme-by-Category-id",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getScholarSlabBySchemeId.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getScholarSlabBySchemeId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.scholarSlabBySchemeId = action.payload.map((item: any) => ({
          id: item.scholarshipSlabId,
          value: item.scholarshipSlabId,
          label: item.displayName,
        }));
      })
      .addCase(getScholarSlabBySchemeId.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "something went wrong ";
      });
  },
});

export const getScholarshipSlabBySchemeIdReducer = getScholarSlabBySchemeIdSlice.reducer;
//getAllScholarshipSlabBySchemeId
