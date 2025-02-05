import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";


export interface LeadCaptureById {
  isLoading: boolean;
  isError: string | null;
  leadCaptureDataById: any;
}

const initialState: LeadCaptureById = {
  isLoading: false,
  isError: null,
  leadCaptureDataById: {},
};

//  create thunk to get twelve result data by id

export const getLeadCaptureById = createAsyncThunk<any, string | any>(
  "LeadCapture-byId",
  async (id, { rejectWithValue }) => {
    try {
      const response = await coreLeadCaptureApi.get(
        `api/crm/lead/leadcapture/${id}`
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data.message || "An error occured"
      );
    }
  }
);

const getLeadCaptureByIdSlice = createSlice({
  name: "leadCapture-details",
  initialState,
  reducers: {
    resetLeadCaptureDataById: (state) => {
      state.leadCaptureDataById = {};
    },
  },

  extraReducers(builder) {
    builder
      .addCase(getLeadCaptureById.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getLeadCaptureById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.leadCaptureDataById = action.payload.map((item: any) => ({
          name: item.name,
        }));
      })
      .addCase(getLeadCaptureById.rejected, (state, action) => {
        state.isError =
          action.error.message ||
          "An error occured while fetching twelve result by Id";
        state.isLoading = false;
      });
  },
});

export const { resetLeadCaptureDataById } = getLeadCaptureByIdSlice.actions;
export const getLeadCaptureByIdReducer = getLeadCaptureByIdSlice.reducer;

//getLeadCaptureById--reducers name
