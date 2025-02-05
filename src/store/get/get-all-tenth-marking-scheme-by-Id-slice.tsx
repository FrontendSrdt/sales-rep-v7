import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreservicesApi from "../../interceptor/coreservicesApi";

export interface TenthMarkingSchemeByIdType {
  isLoading: boolean;
  isError: null | string;
  tenthMarkingSchemeDataById: any;
}

const initialState: TenthMarkingSchemeByIdType = {
  isLoading: false,
  isError: null,
  tenthMarkingSchemeDataById: {},
};

// create thunk to get the tenth marking scheme by id

export const getTenthMarkingSchemeById = createAsyncThunk<any, string | any>(
  "TenthMarkingScheme-byId",

  async (id, { rejectWithValue }) => {
    try {
      const response = await coreservicesApi.get(
        `api/crm/core/coremarkingscheme/${id}`
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data.message || "An error occured"
      );
    }
  }
);

const getTenthMarkingSchemeByIdSlice = createSlice({
  name: "tenthMarkinScheme-details",
  initialState,
  reducers: {
    resetTenthMarkingSchemeDataById: (state) => {
      state.tenthMarkingSchemeDataById = {};
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getTenthMarkingSchemeById.pending, (state) => {
        state.isError = null;
        state.isLoading = true;
      })
      .addCase(getTenthMarkingSchemeById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tenthMarkingSchemeDataById = action.payload;
      })
      .addCase(getTenthMarkingSchemeById.rejected, (state, action) => {
        state.isError =
          action.error.message ||
          "An Error Occured while fetching Tenth Marking Scheme Data By Id";
        state.isLoading = false;
      });
  },
});

export const { resetTenthMarkingSchemeDataById } =
  getTenthMarkingSchemeByIdSlice.actions;
export const getTenthMarkingSchemeByIdReducer =
  getTenthMarkingSchemeByIdSlice.reducer;

//getTenthMarkingSchemeById
