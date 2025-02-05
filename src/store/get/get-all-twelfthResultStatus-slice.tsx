import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import coreservicesApi from "../../interceptor/coreservicesApi";
import { getValuesType } from "../../types/general/get-request-types";

interface TwelfthResultStatusType {
  isLoading: boolean;
  isError: string | null;
  isRun: string;
  resetActions: string;
  responseForTwelfthResultStatus: getValuesType[];
}

const initialState: TwelfthResultStatusType = {
  isLoading: false,
  isError: null,
  resetActions: "",
  isRun: uuidv4(),
  responseForTwelfthResultStatus: [],
};

// create thunk to get all Twelfth data

export const getTwelfthResultStatusValues = createAsyncThunk<any>("getAllTwelfthResultStatus", async (_, { rejectWithValue }) => {
  try {
    const response = await coreservicesApi.get("api/crm/core/coretwelveresultstatus");
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data.message || "An error occured");
  }
});

const getAllTwelfthResultStatusSlice = createSlice({
  name: "tenthResultStatus/getAllTenthResultStatus",
  initialState,
  reducers: {
    resetActionsForTwelfthResultStatusFormField: (state) => {
      state.responseForTwelfthResultStatus = [];
    },
    takeActionsForTwelfthResultStatusFormField: (state, action) => {
      state.resetActions = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getTwelfthResultStatusValues.pending, (state) => {
        state.isError = null;
        state.isLoading = true;
      })
      .addCase(getTwelfthResultStatusValues.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isRun = uuidv4();
        state.responseForTwelfthResultStatus = action.payload.map((item: any) => ({
          id: item.twelveMarkingSchemeId,
          value: item.twelveMarkingSchemeId,
          name: item.displayName,
        }));
      })
      .addCase(getTwelfthResultStatusValues.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "An Error occured while getting Twelfth ResultStatus data";
      });
  },
});

export const { resetActionsForTwelfthResultStatusFormField, takeActionsForTwelfthResultStatusFormField } = getAllTwelfthResultStatusSlice.actions;
export const getAllTwelfthResultStatusReducer = getAllTwelfthResultStatusSlice.reducer;
