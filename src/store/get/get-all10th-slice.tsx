import { v4 as uuidv4 } from "uuid";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreservicesApi from "../../interceptor/coreservicesApi";
import { getValuesType } from "../../types/general/get-request-types";

interface TenthBoardType {
  isLoading: boolean;
  isError: string | null;
  isRun: string;
  resetActions: string;
  responseForTenthBoard: getValuesType[];
}

const initialState: TenthBoardType = {
  isLoading: false,
  isError: null,
  resetActions: "",
  isRun: uuidv4(),
  responseForTenthBoard: [],
};

// create thunk to get all TenthBoard data

export const getTenthBoardValues = createAsyncThunk<any>("getAllTenthBoard", async (_, { rejectWithValue }) => {
  try {
    const response = await coreservicesApi.get("api/crm/core/core10thboard");
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data.message || "An error occured");
  }
});

const getAllTenthBoardSlice = createSlice({
  name: "tenthBoard/getAllTenthBoard",
  initialState,
  reducers: {
    resetActionsForTenthBoardFormField: (state) => {
      state.responseForTenthBoard = [];
    },
    takeActionsForTenthBoardFormField: (state, action) => {
      state.resetActions = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getTenthBoardValues.pending, (state) => {
        state.isError = null;
        state.isLoading = true;
      })
      .addCase(getTenthBoardValues.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isRun = uuidv4();
        state.responseForTenthBoard = action.payload.map((item: any) => ({
          id: item.core10BoardId,
          value: item.core10BoardId,
          name: item.name,
        }));
      })
      .addCase(getTenthBoardValues.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "An Error occured while getting TenthBoard data";
      });
  },
});

export const { resetActionsForTenthBoardFormField, takeActionsForTenthBoardFormField } = getAllTenthBoardSlice.actions;
export const getAllTenthBoardReducer = getAllTenthBoardSlice.reducer;
