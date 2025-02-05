import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import coreservicesApi from "../../interceptor/coreservicesApi";

interface AdmitType {
  isLoading: boolean;
  isError: string | null;
  isRun: string;
  resetActions: string;
  responseForAdmitType: any;
}

const initialState: AdmitType = {
  isLoading: false,
  isError: null,
  resetActions: "",
  isRun: uuidv4(),
  responseForAdmitType: [],
};

// create thunk to get all admit type data

export const getAdmitTypeValues = createAsyncThunk<any>("getAllAdmitType", async (_, { rejectWithValue }) => {
  try {
    const response = await coreservicesApi.get("api/crm/core/admittype");
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data.message || "An error occured");
  }
});

const getAllAdmitTypeSlice = createSlice({
  name: "admitType/getAllAdmitType",
  initialState,
  reducers: {
    resetActionsForAdmitTypeFormField: (state) => {
      state.responseForAdmitType = [];
    },
    takeActionsForAdmitTypeFormField: (state, action) => {
      state.resetActions = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAdmitTypeValues.pending, (state) => {
        state.isError = null;
        state.isLoading = true;
      })
      .addCase(getAdmitTypeValues.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isRun = uuidv4();
        state.responseForAdmitType = action.payload.map((item: any) => ({
          id: item.admitTypeId,
          value: item.admitTypeId,
          name: item.description,
        }));
      })
      .addCase(getAdmitTypeValues.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "An Error occured while getting admit type data";
      });
  },
});

export const { resetActionsForAdmitTypeFormField, takeActionsForAdmitTypeFormField } = getAllAdmitTypeSlice.actions;
export const getAllAdmitTypeReducer = getAllAdmitTypeSlice.reducer;

//getAllAdmitType
