import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreservicesApi from "../../interceptor/coreservicesApi";

interface CityRowWiseData_By_StateId_Type {
  CityRowWiseDataByStateId: Record<number, any>; // Object to store data per index
  isLoading: boolean;
  isError: null | string;
}

const initialState: CityRowWiseData_By_StateId_Type = {
  CityRowWiseDataByStateId: {}, // Using an object instead of an array
  isLoading: false,
  isError: null,
};

// Async thunk with index parameter
export const getCityRowWiseByStateId = createAsyncThunk<{ index: number; data: any }, { stateId: string; index: number }>(
  "get/City-Data-Row-Wise-By-StateId",
  async ({ stateId, index }, { rejectWithValue }) => {
    try {
      const response = await coreservicesApi.get(`api/crm/core/corecity/findByStateId/${stateId}`);

      return { index, data: response.data };
    } catch (e: any) {
      return rejectWithValue(e.response?.data.message || "An error occurred.");
    }
  }
);

const getCityDataByStateIdSlice = createSlice({
  name: "CityData-by-StateId",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCityRowWiseByStateId.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getCityRowWiseByStateId.fulfilled, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
        if (action.payload.data && Array.isArray(action.payload.data)) {
          state.CityRowWiseDataByStateId[action.payload.index] = action.payload.data.map((item: any) => ({
            id: item.coreCityId,
            name: item.name,
            value: item.coreCityId,
          }));
        } else {
          console.error("Unexpected Data Structure:", action.payload);
        }
      })

      .addCase(getCityRowWiseByStateId.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload as string;
      });
  },
});

export const getCityDataRowWiseByStateIdReducer = getCityDataByStateIdSlice.reducer;

//getCityRowWiseByStateId
