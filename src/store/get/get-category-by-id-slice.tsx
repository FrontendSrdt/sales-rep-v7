import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreservicesApi from "../../interceptor/coreservicesApi";


interface categoryByIdType {
  isLoading: boolean;
  isError: null | string;
  categoryDataById: any;
}

const initialState: categoryByIdType = {
  isLoading: false,
  isError: null,
  categoryDataById: {},
};

// thunk to get catgory data by id

export const getCategoryById = createAsyncThunk<any, string | any>(
  "category-byId",

  async (id, { rejectWithValue }) => {
    try {
      const response = await coreservicesApi.get(`api/crm/core/corecategory/${id}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data.message || "An error occured");
    }
  }
);

const getCategoryByIdSlice = createSlice({
  name: "category-details",
  initialState,
  reducers: {
    resetCategoryDataById: (state) => {
      state.categoryDataById = {};
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getCategoryById.pending, (state) => {
        state.isError = null;
        state.isLoading = true;
      })
      .addCase(getCategoryById.fulfilled, (state, action) => {
        state.isError = null;
        state.isLoading = false;
        state.categoryDataById = action.payload;
      })
      .addCase(getCategoryById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "An error occured while fetching category data by id";
      });
  },
});

export const { resetCategoryDataById } = getCategoryByIdSlice.actions;
export const getCategoryByIdReducer = getCategoryByIdSlice.reducer;

// getCategoryById - Reducer Name
