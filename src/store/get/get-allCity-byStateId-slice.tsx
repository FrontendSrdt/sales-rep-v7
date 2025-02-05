import { cityValuesType } from "../../types/general/get-request-types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreservicesApi from "../../interceptor/coreservicesApi";

// Define the slice's state structure
interface CityType {
  coreCityData: cityValuesType[]; // For the first dropdown
  currentCoreCityData: cityValuesType[]; // For the second dropdown
  coreCityId2Data: cityValuesType[]; // For the third dropdown
  isLoading: boolean;
  isError: null | string;
}

// Initial state
const initialState: CityType = {
  coreCityData: [],
  currentCoreCityData: [],
  coreCityId2Data: [],
  isLoading: true,
  isError: null,
};

// Async thunk to fetch city data based on state ID
export const getAllCityByStateId = createAsyncThunk<
  cityValuesType[], // Payload returned on success
  { stateId: number | string; target: "coreStateId2" | "currentCoreStateId" | "coreStateId" }, // Arguments passed to the thunk
  { rejectValue: string } // Type for the rejection value
>("getCity-byId", async ({ stateId }, { rejectWithValue }) => {
  try {
    const response = await coreservicesApi.get(`api/crm/core/corecity/findByStateId/${stateId}`);
    return response.data.map((item: any) => ({
      id: item.coreCityId,
      value: item.coreCityId,
      name: item.name,
    }));
  } catch (error: any) {
    return rejectWithValue(error.response?.data.message || "An error occurred.");
  }
});

// Slice definition
const getAllCityByStateIdSlice = createSlice({
  name: "getAllCityByStateId",
  initialState,
  reducers: {
    // Reset data for specific dropdowns
    resetCoreCityData: (state) => {
      state.coreCityData = [];
    },
    resetCurrentCoreCityData: (state) => {
      state.currentCoreCityData = [];
    },
    resetCoreCityId2Data: (state) => {
      state.coreCityId2Data = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCityByStateId.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getAllCityByStateId.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.meta.arg.target === "coreStateId") {
          state.coreCityData = action.payload;
        } else if (action.meta.arg.target === "currentCoreStateId") {
          state.currentCoreCityData = action.payload;
        } else if (action.meta.arg.target === "coreStateId2") {
          state.coreCityId2Data = action.payload;
        }
      })
      .addCase(getAllCityByStateId.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload || "Something went wrong.";
      });
  },
});

// Export actions and reducer
export const { resetCoreCityData, resetCurrentCoreCityData, resetCoreCityId2Data } = getAllCityByStateIdSlice.actions;
export const getAllCityByStateIdReducer = getAllCityByStateIdSlice.reducer;
