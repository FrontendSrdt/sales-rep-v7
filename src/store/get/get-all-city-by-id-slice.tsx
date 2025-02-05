import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreservicesApi from "../../interceptor/coreservicesApi";


export interface CityById {
  isLoading: boolean;
  isError: string | null;
  cityDataById: any;
}

const initialState: CityById = {
  isLoading: false,
  isError: null,
  cityDataById: {},
};

//  create thunk to get city data by id

export const getCityById = createAsyncThunk<any, string | any>(
  "City-byId",
  async (id, { rejectWithValue }) => {
    try {
      const response = await coreservicesApi.get(`api/crm/core/corecity/${id}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data.message || "An error occured"
      );
    }
  }
);

const getCityByIdSlice = createSlice({
  name: "city-details",
  initialState,
  reducers: {
    resetCityDataById: (state) => {
      state.cityDataById = {};
    },
  },

  extraReducers(builder) {
    builder
      .addCase(getCityById.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getCityById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cityDataById = action.payload.map((item: any) => ({
          name: item.name,
        }));
      })
      .addCase(getCityById.rejected, (state, action) => {
        state.isError =
          action.error.message ||
          "An error occured while fetching city by Id";
        state.isLoading = false;
      });
  },
});

export const { resetCityDataById } = getCityByIdSlice.actions;
export const getCityByIdReducer = getCityByIdSlice.reducer;

//getCityById--reducers name
