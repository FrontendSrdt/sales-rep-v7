import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { filterLeadCaptureType } from "../../types/manage-leads/manage-leads-type";
import { v4 as uuidv4 } from "uuid";
import coreservicesApi from "../../interceptor/coreservicesApi";

interface FilterLeadCaptureType {
  isLoading: boolean;
  isError: null | string;
  isRun: string;
  responseLeadCaptureFilterData: filterLeadCaptureType[];
  resetActions: any;
}

const initialState: FilterLeadCaptureType = {
  isLoading: false,
  isError: null,
  isRun: uuidv4(),
  responseLeadCaptureFilterData: [],
  resetActions: "",
};

// create thunk to get filter data

export const getLeadCaptureFilterData = createAsyncThunk<any, { filters: any }>(
  "getLeadCaptureFilterData",

  async ({ filters }, { rejectWithValue }) => {
    const queryParams = new URLSearchParams(filters).toString();
    const response = coreservicesApi.get(`api/crm/lead/leadcapture/filterData`, {
      params: queryParams,
    });

    return response
      .then((res: any) => {
        
        return res.data;
      })
      .catch((error: any) => {
        return rejectWithValue(error.message || "An error occured");
      });
  }
);

const getLeadCapturefilterDataSlice = createSlice({
  name: "leadCapture/filterData",
  initialState,
  reducers: {
    takeActionForLeadCapturefilterData: (state, action) => {
     
      state.resetActions = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getLeadCaptureFilterData.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getLeadCaptureFilterData.fulfilled, (state, action) => {
        state.isError = null;
        state.isLoading = false;
        state.isRun = uuidv4();
        state.responseLeadCaptureFilterData = action.payload;
      })
      .addCase(getLeadCaptureFilterData.rejected, (state, action) => {
        state.isError = action.error.message || "An error occured";
        state.isLoading = false;
      });
  },
});

export const getLeadCapturefilterDataReducer = getLeadCapturefilterDataSlice.reducer;

//getLeadCapturefilterData
