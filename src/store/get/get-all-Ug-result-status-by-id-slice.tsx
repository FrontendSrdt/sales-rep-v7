import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreservicesApi from "../../interceptor/coreservicesApi";

export interface UgResultStatusById {
  isLoading: boolean;
  isError: string | null;
  ugResultStatusDataById: any;
}

const initialState: UgResultStatusById = {
  isLoading: false,
  isError: null,
  ugResultStatusDataById: {},
};

//  create thunk to get ugResultStatus data by id

export const getUgResultStatusById = createAsyncThunk<any, string | any>(
  "UgResultStatus-byId",
  async (id, { rejectWithValue }) => {
    try {
      const response = await coreservicesApi.get(
        `api/crm/lead/leadacademicdetailsug/${id}`
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data.message || "An error occured"
      );
    }
  }
);

const getUgResultStatusByIdSlice = createSlice({
  name: "ugResultStatus-details",
  initialState,
  reducers: {
    resetUgResultStatusDataById: (state) => {
      state.ugResultStatusDataById = {};
    },
  },

  extraReducers(builder) {
    builder
      .addCase(getUgResultStatusById.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getUgResultStatusById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ugResultStatusDataById = action.payload.map((item: any) => ({
          name: item.name,
        }));
      })
      .addCase(getUgResultStatusById.rejected, (state, action) => {
        state.isError =
          action.error.message ||
          "An error occured while fetching ugResultStatus by Id";
        state.isLoading = false;
      });
  },
});

export const { resetUgResultStatusDataById } = getUgResultStatusByIdSlice.actions;
export const getUgResultStatusByIdReducer = getUgResultStatusByIdSlice.reducer;

//getUgResultStatusById--reducers name
