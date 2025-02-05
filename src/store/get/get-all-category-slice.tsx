import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import coreservicesApi from "../../interceptor/coreservicesApi";
import { stateValuesType } from "../../types/general/get-request-types";

interface CategoryType {
  isLoading: boolean;
  isError: string | null;
  isRun: string;
  resetActions: string;
  responseForCategory: stateValuesType[];
}

const initialState: CategoryType = {
  isLoading: false,
  isError: null,
  resetActions: "",
  isRun: uuidv4(),
  responseForCategory: [],
};

// create thunk to get all Category data

export const getCategoryValues = createAsyncThunk<any>("getAllCategory", async (_, { rejectWithValue }) => {
  try {
    const response = await coreservicesApi.get("api/crm/core/corecategory");
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data.message || "An error occured");
  }
});

const getAllCategorySlice = createSlice({
  name: "category/getAllCategory",
  initialState,
  reducers: {
    resetActionsForCategoryFormField: (state) => {
      state.responseForCategory = [];
    },
    takeActionsForCategoryFormField: (state, action) => {
      state.resetActions = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getCategoryValues.pending, (state) => {
        state.isError = null;
        state.isLoading = true;
      })
      .addCase(getCategoryValues.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isRun = uuidv4();
        state.responseForCategory = action.payload.map((item: any) => ({
          id: item.categoryId,
          value: item.categoryId,
          name: item.name,
        }));
      })
      .addCase(getCategoryValues.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "An Error occured while getting category data";
      });
  },
});

export const { resetActionsForCategoryFormField, takeActionsForCategoryFormField } = getAllCategorySlice.actions;
export const getAllCategoryReducer = getAllCategorySlice.reducer;

//getAllCategory
