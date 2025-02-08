import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface ScholarshipOptionsType {
  isLoading: boolean;
  isError: string | null;
  isRun: string;
  resetActions: string;
  responseForAllScholarshipOptions: any;
}

const initialState: ScholarshipOptionsType = {
  isLoading: false,
  isError: null,
  resetActions: "",
  isRun: uuidv4(),
  responseForAllScholarshipOptions: [],
};

// create thunk to get all Academic Career data

export const getAllScholarshipOption = createAsyncThunk<any, any>("getAllActiveScholarshipOptionsory", async ({ leadCaptureId, leadEnquiryId, status }, { rejectWithValue }) => {
  try {
    const response = await coreLeadCaptureApi.get(`api/crm/lead/scholarshipDetailsSalesrep/${leadCaptureId}/${leadEnquiryId}/${status}`);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data.message || "An error occured");
  }
});

const getAllActiveScholarshipOptionsSlice = createSlice({
  name: "getAllActiveScholarshipOptions",
  initialState,
  reducers: {
    resetActionsForAllActiveScholarshipOptions: (state) => {
      state.responseForAllScholarshipOptions = [];
    },
    takeActionsForAllActiveScholarshipOptions: (state, action) => {
      state.resetActions = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllScholarshipOption.pending, (state) => {
        state.isError = null;
        state.isLoading = true;
      })
      .addCase(getAllScholarshipOption.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isRun = uuidv4();
        state.responseForAllScholarshipOptions = action.payload;
      })
      .addCase(getAllScholarshipOption.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "An Error occured while getting Scholar ship category data";
      });
  },
});

export const { resetActionsForAllActiveScholarshipOptions, takeActionsForAllActiveScholarshipOptions } = getAllActiveScholarshipOptionsSlice.actions;
export const getAllActiveScholarshipOptionReducer = getAllActiveScholarshipOptionsSlice.reducer;

//getAllScholarshipOption
