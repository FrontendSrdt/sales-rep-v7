import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

export interface getAdditionalInfoById {
  isLoading: boolean;
  isError: string | null;
  responseofLeadAdditionalInfo: any;
}

const initialState: getAdditionalInfoById = {
  isLoading: false,
  isError: null,
  responseofLeadAdditionalInfo: {},
};

export const getAdditionalInfoById = createAsyncThunk<any, string | any>("additionalInfo-byId", async (id, { rejectWithValue }) => {
  try {
    const response = await coreLeadCaptureApi.get(`api/crm/lead/leadadditionaldetails/findByLeadCapture/${id}`);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data.message || "An error occured");
  }
});

const getAdditionalInfoByIdSlice = createSlice({
  name: "AdditionalInfo-details",
  initialState,
  reducers: {
    resetLeadCaptureDataById: (state) => {
      state.responseofLeadAdditionalInfo = {};
    },
  },

  extraReducers(builder) {
    builder
      .addCase(getAdditionalInfoById.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getAdditionalInfoById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.responseofLeadAdditionalInfo = action.payload;
      })
      .addCase(getAdditionalInfoById.rejected, (state, action) => {
        state.isError = action.error.message || "An error occured while fetching Additional by Id";
        state.isLoading = false;
      });
  },
});

export const { resetLeadCaptureDataById } = getAdditionalInfoByIdSlice.actions;
export const getAdditionalInfoByIdReducer = getAdditionalInfoByIdSlice.reducer;

//getAdditionalInfoByIdData
