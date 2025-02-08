import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface ScholarshipCategType {
  isLoading: boolean;
  isError: string | null;
  isRun: string;
  resetActions: string;
  responseForAllScholarshipCateg: any;
}

const initialState: ScholarshipCategType = {
  isLoading: false,
  isError: null,
  resetActions: "",
  isRun: uuidv4(),
  responseForAllScholarshipCateg: [],
};

// create thunk to get all Academic Career data

export const getAllScholarshipCategory = createAsyncThunk<any>("getAllActiveScholarshipCategory", async (_, { rejectWithValue }) => {
  try {
    const response = await coreLeadCaptureApi.get("api/crm/lead/leadScholarshipDetails/getAllActiveScholarshipCategory");
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data.message || "An error occured");
  }
});

const getAllActiveScholarshipCategorySlice = createSlice({
  name: "getAllActiveScholarshipCategory",
  initialState,
  reducers: {
    resetActionsForAllActiveScholarshipCateg: (state) => {
      state.responseForAllScholarshipCateg = [];
    },
    takeActionsForAllActiveScholarshipCateg: (state, action) => {
      state.resetActions = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllScholarshipCategory.pending, (state) => {
        state.isError = null;
        state.isLoading = true;
      })
      .addCase(getAllScholarshipCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isRun = uuidv4();
        state.responseForAllScholarshipCateg = action.payload.map((item: any) => ({
          id: item.scholarshipCategoryId,
          value: item.scholarshipCategoryId,
          label: item.displayName,
        }));
      })
      .addCase(getAllScholarshipCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "An Error occured while getting Scholar ship category data";
      });
  },
});

export const { resetActionsForAllActiveScholarshipCateg, takeActionsForAllActiveScholarshipCateg } = getAllActiveScholarshipCategorySlice.actions;
export const getAllActiveScholarCategoryReducer = getAllActiveScholarshipCategorySlice.reducer;

//getAllActiveScholarCategory
