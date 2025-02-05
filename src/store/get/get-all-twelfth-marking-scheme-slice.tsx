import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import coreservicesApi from "../../interceptor/coreservicesApi";
import { twelfthmarkingSchemeType } from "../../types/twelfth-marking-scheme-type";


interface TwelfthMarkingSchemeType {
  isLoading: boolean;
  isError: string | null;
  isRun: string;
  resetActions: string;
  responseForTwelfthMarkingScheme: twelfthmarkingSchemeType[];
}

const initialState: TwelfthMarkingSchemeType = {
  isLoading: false,
  isError: null,
  resetActions: "",
  isRun: uuidv4(),
  responseForTwelfthMarkingScheme: [],
};

// create thunk to get all TwelfthBoard data

export const getTwelfthMarkingSchemeValues = createAsyncThunk<any>(
  "getAllTwelfthMarkingScheme",
  async (_, { rejectWithValue }) => {
    try {
      const response = await coreservicesApi.get(
        "api/crm/core/coretwelvemarkingscheme"
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data.message || "An error occured"
      );
    }
  }
);

const getAllTwelfthMarkingSchemeSlice = createSlice({
  name: "twelfthMarkingScheme/getAllTwelfthMarkingScheme",
  initialState,
  reducers: {
    resetActionsForTwelfthMarkingSchemeFormField: (state) => {
      state.responseForTwelfthMarkingScheme = [];
    },
    takeActionsForTwelfthMarkingSchemeFormField: (state, action) => {
      state.resetActions = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getTwelfthMarkingSchemeValues.pending, (state) => {
        state.isError = null;
        state.isLoading = true;
      })
      .addCase(getTwelfthMarkingSchemeValues.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isRun = uuidv4();
        state.responseForTwelfthMarkingScheme = action.payload.map(
          (item: any) => ({
            id: item.twelveMarkingSchemeId,
            value: item.twelveMarkingSchemeId,
            name: item.description,
          })
        );
      })
      .addCase(getTwelfthMarkingSchemeValues.rejected, (state, action) => {
        state.isLoading = false;
        state.isError =
          action.error.message ||
          "An Error occured while getting TwelfthMarkingScheme data";
      });
  },
});

export const {
  resetActionsForTwelfthMarkingSchemeFormField,
  takeActionsForTwelfthMarkingSchemeFormField,
} = getAllTwelfthMarkingSchemeSlice.actions;
export const getAllTwelfthMarkingSchemeReducer =
  getAllTwelfthMarkingSchemeSlice.reducer;

//coreTwelfthMarkingScheme
