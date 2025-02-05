import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreservicesApi from "../../interceptor/coreservicesApi";


interface CoreStateType {
  getCoreStateDataByStateId: any;
  isLoading: boolean;
  isError: null | string;
}

const initialState: CoreStateType = {
  getCoreStateDataByStateId: {},
  isLoading: true,
  isError: null,
};

export const getCoreStateByStateId = createAsyncThunk<any | string, any>("getCoreState-byId", async (StateId, { rejectWithValue }) => {
  try {
    const response = await coreservicesApi.get(`api/crm/core/corestate/${StateId}`);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data.message || "An error occurred.");
  }
});

const getCoreStateDataByStateIdSlice = createSlice({
  name: "get-AllCoreStateByid",
  initialState,
  reducers: {
    resetCoreStateDataByStateId: (state) => {
      state.getCoreStateDataByStateId = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCoreStateByStateId.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getCoreStateByStateId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.getCoreStateDataByStateId = action.payload;
      })
      .addCase(getCoreStateByStateId.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "Something went wrong";
      });
  },
});

export const { resetCoreStateDataByStateId } = getCoreStateDataByStateIdSlice.actions;
export const getCoreStateByStateIdReducer = getCoreStateDataByStateIdSlice.reducer;
