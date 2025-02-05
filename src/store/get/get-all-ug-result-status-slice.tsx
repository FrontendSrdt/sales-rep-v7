import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { ugResultStatusType } from "../../types/ug-result-status-type";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface UgResultStatusType {
  isLoading: boolean;
  isError: string | null;
  isRun: string;
  resetActions: string;
  responseForUgResultStatus: ugResultStatusType[];
}

const initialState: UgResultStatusType = {
  isLoading: false,
  isError: null,
  resetActions: "",
  isRun: uuidv4(),
  responseForUgResultStatus: [],
};

// create thunk to get all Ug data

export const getUgResultStatusValues = createAsyncThunk<any>(
  "getAllUgResultStatus",
  async (_, { rejectWithValue }) => {
    try {
      const response = await coreLeadCaptureApi.get(
        "api/crm/lead/leadacademicdetailsug"
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data.message || "An error occured"
      );
    }
  }
);

const getAllUgResultStatusSlice = createSlice({
  name: "tenthResultStatus/getAllTenthResultStatus",
  initialState,
  reducers: {
    resetActionsForUgResultStatusFormField: (state) => {
      state.responseForUgResultStatus = [];
    },
    takeActionsForUgResultStatusFormField: (state, action) => {
      state.resetActions = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getUgResultStatusValues.pending, (state) => {
        state.isError = null;
        state.isLoading = true;
      })
      .addCase(getUgResultStatusValues.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isRun = uuidv4();
        state.responseForUgResultStatus = action.payload.map((item: any) => ({
          id: item.academicDetailsUGId,
          value: item.academicDetailsUGId,
          name: item.resultStatus,
        }));
      })
      .addCase(getUgResultStatusValues.rejected, (state, action) => {
        state.isLoading = false;
        state.isError =
          action.error.message ||
          "An Error occured while getting Ug ResultStatus data";
      });
  },
});

export const {
  resetActionsForUgResultStatusFormField,
  takeActionsForUgResultStatusFormField,
} = getAllUgResultStatusSlice.actions;
export const getAllUgResultStatusReducer = getAllUgResultStatusSlice.reducer;

//coreUgResultStatus
