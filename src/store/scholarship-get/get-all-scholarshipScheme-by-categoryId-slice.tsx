import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface ScholarSchemeData_By_CategId_Type {
  scholarSchemeByCategId: [] | any;
  isLoading: boolean;
  isError: null | string;
}

const initialState: ScholarSchemeData_By_CategId_Type = {
  scholarSchemeByCategId: [],
  isLoading: false,
  isError: null,
};

//  Create Thunk for gettting Academic Program By categ ID

export const getScholarSchemeByCategId = createAsyncThunk<any, string>("get/getScholarSchemeByCategId", async (categoryId, { rejectWithValue }) => {
  try {
    const response = await coreLeadCaptureApi.get(`api/crm/lead/leadScholarshipDetails/getAllActiveScholarshipScheme/${categoryId}`);
    return response.data;
  } catch (e: any) {
    return rejectWithValue(e.response?.data.message || "An error occurred.");
  }
});

const getScholarSchemeByCategIdSlice = createSlice({
  name: "scholarscheme-by-Category-id",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getScholarSchemeByCategId.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getScholarSchemeByCategId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.scholarSchemeByCategId = action.payload.map((item: any) => ({
          id: item.scholarshipSchemeId,
          value: item.scholarshipSchemeId,
          label: item.displayName,
        }));
      })
      .addCase(getScholarSchemeByCategId.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "something went wrong ";
      });
  },
});

export const getScholarshipSchemeByCategIdReducer = getScholarSchemeByCategIdSlice.reducer;
//getAllScholarshipSchemeByCategoryId
