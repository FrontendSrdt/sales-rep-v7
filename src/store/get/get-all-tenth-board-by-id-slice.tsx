import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreservicesApi from "../../interceptor/coreservicesApi";

export interface TenthBoardById {
  isLoading: boolean;
  isError: string | null;
  tenthBoardDataById: any;
}

const initialState: TenthBoardById = {
  isLoading: false,
  isError: null,
  tenthBoardDataById: {},
};

//  create thunk to get tenthBoard data by id

export const getTenthBoardById = createAsyncThunk<any, string | any>(
  "TenthBoard-byId",
  async (id, { rejectWithValue }) => {
    try {
      const response = await coreservicesApi.get(
        `api/crm/core/core10thboard/findById/${id}`
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data.message || "An error occured"
      );
    }
  }
);

const getTenthBoardByIdSlice = createSlice({
  name: "tenthBoard-details",
  initialState,
  reducers: {
    resetTenthBoardDataById: (state) => {
      state.tenthBoardDataById = {};
    },
  },

  extraReducers(builder) {
    builder
      .addCase(getTenthBoardById.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getTenthBoardById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tenthBoardDataById = action.payload.map((item: any) => ({
          name: item.name,
        }));
      })
      .addCase(getTenthBoardById.rejected, (state, action) => {
        state.isError =
          action.error.message ||
          "An error occured while fetching tenthBoard by Id";
        state.isLoading = false;
      });
  },
});

export const { resetTenthBoardDataById } = getTenthBoardByIdSlice.actions;
export const getTenthBoardByIdReducer = getTenthBoardByIdSlice.reducer;

//getTenthBoardById--reducers name
