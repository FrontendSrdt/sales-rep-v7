import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreservicesApi from "../../interceptor/coreservicesApi";


interface AdmitTypeServiceType {
  admitTypeServiceDataById: {};
  isLoading: boolean;
  isError: null | string;
}

const initialState: AdmitTypeServiceType = {
  admitTypeServiceDataById: {},
  isLoading: true,
  isError: null,
};

export const getAdmitTypeServiceDataById = createAsyncThunk<any | string, any>(
  "admitTypeData-byId",
  async (admitTypeService, { rejectWithValue }) => {
    try {
      const response = await coreservicesApi.get(`api/crm/core/admittype/${admitTypeService}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data.message || "An error occurred.");
    }
  }
);

const getAdmitTypeServiceDataByIdSlice = createSlice({
  name: "get-admitTypeService",
  initialState,
  reducers: {
    resetAdmitTypeServiceDataById: (state) => {
      state.admitTypeServiceDataById = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAdmitTypeServiceDataById.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getAdmitTypeServiceDataById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.admitTypeServiceDataById = action.payload;
      })
      .addCase(getAdmitTypeServiceDataById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "Something went wrong";
      });
  },
});

export const { resetAdmitTypeServiceDataById } = getAdmitTypeServiceDataByIdSlice.actions;
export const getAdmitTypeServiceDataByIdReducer = getAdmitTypeServiceDataByIdSlice.reducer;
