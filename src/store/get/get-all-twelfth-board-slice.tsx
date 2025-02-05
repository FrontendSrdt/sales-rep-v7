import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import coreservicesApi from "../../interceptor/coreservicesApi";
import { Option } from "../../types/twelfth-board-type";

interface TwelfthBoardType {
  isLoading: boolean;
  isError: string | null;
  isRun: string;
  resetActions: string;
  responseForTwelfthBoard: Option[];
}

const initialState: TwelfthBoardType = {
  isLoading: false,
  isError: null,
  resetActions: "",
  isRun: uuidv4(),
  responseForTwelfthBoard: [],
};

// create thunk to get all Twelfth data

export const getTwelfthBoardValues = createAsyncThunk<any>("getAllTwelfthBoard", async (_, { rejectWithValue }) => {
  try {
    const response = await coreservicesApi.get("api/crm/core/core12thboard");
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data.message || "An error occured");
  }
});

const getAllTwelfthBoardSlice = createSlice({
  name: "tenthBoard/getAllTenthBoard",
  initialState,
  reducers: {
    resetActionsForTwelfthBoardFormField: (state) => {
      state.responseForTwelfthBoard = [];
    },
    takeActionsForTwelfthBoardFormField: (state, action) => {
      state.resetActions = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getTwelfthBoardValues.pending, (state) => {
        state.isError = null;
        state.isLoading = true;
      })
      .addCase(getTwelfthBoardValues.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isRun = uuidv4();
        state.responseForTwelfthBoard = action.payload.map((item: any) => ({
          id: item.core12thBoardId,
          value: item.core12thBoardId,
          name: item.name,
        }));
      })
      .addCase(getTwelfthBoardValues.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "An Error occured while getting Twelfth Board data";
      });
  },
});

export const { resetActionsForTwelfthBoardFormField, takeActionsForTwelfthBoardFormField } = getAllTwelfthBoardSlice.actions;
export const getAllTwelfthBoardReducer = getAllTwelfthBoardSlice.reducer;

//coreTwelfthBoard
