import { v4 as uuidv4 } from "uuid";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreservicesApi from "../../interceptor/coreservicesApi";
import { cityValuesType } from "../../types/general/get-request-types";

interface CityType {
  isLoading: boolean;
  isError: string | null;
  isRun: string;
  resetActions: string;
  responseForCity: cityValuesType[];
}

const initialState: CityType = {
  isLoading: false,
  isError: null,
  resetActions: "",
  isRun: uuidv4(),
  responseForCity: [],
};

// create thunk to get all State data

export const getCityValues = createAsyncThunk<any>("getAllCity", async (_, { rejectWithValue }) => {
  try {
    const response = await coreservicesApi.get("api/crm/core/corecity");
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data.message || "An error occured");
  }
});

const getAllCitySlice = createSlice({
  name: "state/getAllState",
  initialState,
  reducers: {
    resetActionsForCityFormField: (state) => {
      state.responseForCity = [];
    },
    takeActionsForCityFormField: (state, action) => {
      state.resetActions = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getCityValues.pending, (state) => {
        state.isError = null;
        state.isLoading = true;
      })
      .addCase(getCityValues.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isRun = uuidv4();
        state.responseForCity = action.payload.map((item: any) => ({
          id: item.coreCityId,
          value: item.coreCityId,
          label: item.name,
        }));
      })
      .addCase(getCityValues.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "An Error occured while getting City data";
      });
  },
});

export const { resetActionsForCityFormField, takeActionsForCityFormField } = getAllCitySlice.actions;
export const getAllCityReducer = getAllCitySlice.reducer;

// getAllCityData
