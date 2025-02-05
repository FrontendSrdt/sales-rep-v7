import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import coreservicesApi from "../../interceptor/coreservicesApi";
import { Option } from "../../types/state-Type";


interface StateType {
  isLoading: boolean;
  isError: string | null;
  isRun: string;
  resetActions: string;
  responseForState: Option[];
}

const initialState: StateType = {
  isLoading: false,
  isError: null,
  resetActions: "",
  isRun: uuidv4(),
  responseForState: [],
};

// create thunk to get all State data

export const getStateValues = createAsyncThunk<any>("getAllState", async (_, { rejectWithValue }) => {
  try {
    const response = await coreservicesApi.get("api/crm/core/corestate");
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data.message || "An error occured");
  }
});

const getAllStateSlice = createSlice({
  name: "state/getAllState",
  initialState,
  reducers: {
    resetActionsForStateFormField: (state) => {
      state.responseForState = [];
    },
    takeActionsForStateFormField: (state, action) => {
      state.resetActions = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getStateValues.pending, (state) => {
        state.isError = null;
        state.isLoading = true;
      })
      .addCase(getStateValues.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isRun = uuidv4();
        state.responseForState = action.payload.map((item: any) => ({
          id: item.coreStateId,
          value: item.coreStateId,
          name: item.name,
        }));
      })
      .addCase(getStateValues.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "An Error occured while getting State data";
      });
  },
});

export const { resetActionsForStateFormField, takeActionsForStateFormField } = getAllStateSlice.actions;
export const getAllStateReducer = getAllStateSlice.reducer;

//getAllStatesData
