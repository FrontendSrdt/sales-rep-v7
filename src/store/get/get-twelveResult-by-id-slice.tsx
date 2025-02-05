import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreservicesApi from "../../interceptor/coreservicesApi";


export interface TwelveResultById {
  isLoading: boolean;
  isError: string | null;
  twelveResultDataById: any;
}

const initialState: TwelveResultById = {
  isLoading: false,
  isError: null,
  twelveResultDataById: {},
};

//  create thunk to get twelve result data by id

export const getTwelveResultById = createAsyncThunk<any, string | any>("TwelveResult-byId", async (id, { rejectWithValue }) => {
  try {
    const response = await coreservicesApi.get(`api/crm/core/coretwelveresultstatus/${id}`);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data.message || "An error occured");
  }
});

const getTwelveResultByIdSlice = createSlice({
  name: "twelveResult-details",
  initialState,
  reducers: {
    resetTwelveResultDataById: (state) => {
      state.twelveResultDataById = {};
    },
  },

  extraReducers(builder) {
    builder
      .addCase(getTwelveResultById.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getTwelveResultById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.twelveResultDataById = action.payload;
      })
      .addCase(getTwelveResultById.rejected, (state, action) => {
        state.isError = action.error.message || "An error occured while fetching twelve result by Id";
        state.isLoading = false;
      });
  },
});

export const { resetTwelveResultDataById } = getTwelveResultByIdSlice.actions;
export const getTwelveResultByIdReducer = getTwelveResultByIdSlice.reducer;

//getTwelveResultById--reducers name
