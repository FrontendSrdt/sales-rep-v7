import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

export interface getBiographicalInfoById {
  isLoading: boolean;
  isError: string | null;
  responseofLeadBiographicalInfo: any;
}

const initialState: getBiographicalInfoById = {
  isLoading: false,
  isError: null,
  responseofLeadBiographicalInfo: {},
};

export const getBiographicalInfoById = createAsyncThunk<any, string | any>("bioInfo-byId", async (id, { rejectWithValue }) => {
  try {
    const response = await coreLeadCaptureApi.get(`api/crm/lead/leadBiographical/getDetails/${id}`);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data.message || "An error occured");
  }
});

const getBiographicalInfoByIdSlice = createSlice({
  name: "biographicalInfo-details",
  initialState,
  reducers: {
    resetLeadCaptureDataById: (state) => {
      state.responseofLeadBiographicalInfo = {};
    },
  },

  extraReducers(builder) {
    builder
      .addCase(getBiographicalInfoById.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getBiographicalInfoById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.responseofLeadBiographicalInfo = action.payload;
      })
      .addCase(getBiographicalInfoById.rejected, (state, action) => {
        state.isError = action.error.message || "An error occured while fetching biographical by Id";
        state.isLoading = false;
      });
  },
});

export const { resetLeadCaptureDataById } = getBiographicalInfoByIdSlice.actions;
export const getBiographicalInfoByIdReducer = getBiographicalInfoByIdSlice.reducer;

//getBiographicalInfoByIdData
