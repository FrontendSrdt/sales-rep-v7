import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import coreservicesApi from "../../interceptor/coreservicesApi";
import { tenthmarkingSchemeType } from "../../types/tenth-marking-scheme-type";

interface TenthMarkingSchemeType {
  isLoading: boolean;
  isError: string | null;
  isRun: string;
  resetActions: string;
  responseForTenthMarkingScheme: tenthmarkingSchemeType[];
}

const initialState: TenthMarkingSchemeType = {
  isLoading: false,
  isError: null,
  resetActions: "",
  isRun: uuidv4(),
  responseForTenthMarkingScheme: [],
};

// create thunk to get all TenthBoard data

export const getTenthMarkingSchemeValues = createAsyncThunk<any>(
  "getAllTenthMarkingScheme",
  async (_, { rejectWithValue }) => {
    try {
      const response = await coreservicesApi.get(
        "api/crm/core/coremarkingscheme"
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data.message || "An error occured"
      );
    }
  }
);

const getAllTenthMarkingSchemeSlice = createSlice({
  name: "tenthMarkingScheme/getAllTenthMarkingScheme",
  initialState,
  reducers: {
    resetActionsForTenthMarkingSchemeFormField: (state) => {
      state.responseForTenthMarkingScheme = [];
    },
    takeActionsForTenthMarkingSchemeFormField: (state, action) => {
      state.resetActions = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getTenthMarkingSchemeValues.pending, (state) => {
        state.isError = null;
        state.isLoading = true;
      })
      .addCase(getTenthMarkingSchemeValues.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isRun = uuidv4();
        state.responseForTenthMarkingScheme = action.payload.map(
          (item: any) => ({
            id: item.core10thMarkingSchemeId,
            value: item.core10thMarkingSchemeId,
            label: item.description,
          })
        );
      })
      .addCase(getTenthMarkingSchemeValues.rejected, (state, action) => {
        state.isLoading = false;
        state.isError =
          action.error.message ||
          "An Error occured while getting TenthMarkingScheme data";
      });
  },
});

export const {
  resetActionsForTenthMarkingSchemeFormField,
  takeActionsForTenthMarkingSchemeFormField,
} = getAllTenthMarkingSchemeSlice.actions;
export const getAllTenthMarkingSchemeReducer = getAllTenthMarkingSchemeSlice.reducer;

//coreTenthMarkingScheme
