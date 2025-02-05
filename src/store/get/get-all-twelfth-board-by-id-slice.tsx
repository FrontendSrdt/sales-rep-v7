import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreservicesApi from "../../interceptor/coreservicesApi";

export interface TwelfthBoardById {
  isLoading: boolean;
  isError: string | null;
  twelfthBoardDataById: any;
}

const initialState: TwelfthBoardById = {
  isLoading: false,
  isError: null,
  twelfthBoardDataById: {},
};

//  create thunk to get twelfthBoard data by id

export const getTwelfthBoardById = createAsyncThunk<any, string | any>(
  "TwelfthBoard-byId",
  async (id, { rejectWithValue }) => {
    try {
      const response = await coreservicesApi.get(
        `api/crm/core/core12thboard/findById/${id}`
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data.message || "An error occured"
      );
    }
  }
);

const getTwelfthBoardByIdSlice = createSlice({
  name: "twelfthBoard-details",
  initialState,
  reducers: {
    resetTwelfthBoardDataById: (state) => {
      state.twelfthBoardDataById = {};
    },
  },

  extraReducers(builder) {
    builder
      .addCase(getTwelfthBoardById.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getTwelfthBoardById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.twelfthBoardDataById = action.payload.map((item: any) => ({
          name: item.name,
        }));
      })
      .addCase(getTwelfthBoardById.rejected, (state, action) => {
        state.isError =
          action.error.message || "An error occured while fetching twelfthBoard by Id";
        state.isLoading = false;
      });
  },
});

export const { resetTwelfthBoardDataById } = getTwelfthBoardByIdSlice.actions;
export const getTwelfthBoardByIdReducer = getTwelfthBoardByIdSlice.reducer;

//getTwelfthBoardById--reducers name
