import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import coreservicesApi from "../../interceptor/coreservicesApi";

interface AcademicCareerType {
  isLoading: boolean;
  isError: string | null;
  isRun: string;
  resetActions: string;
  responseForAcademicCareer: any;
}

const initialState: AcademicCareerType = {
  isLoading: false,
  isError: null,
  resetActions: "",
  isRun: uuidv4(),
  responseForAcademicCareer: [],
};

// create thunk to get all Academic Career data

export const getAcademicCareerValues = createAsyncThunk<any>("getAllAcademicCareer", async (_, { rejectWithValue }) => {
  try {
    const response = await coreservicesApi.get("api/crm/core/academiccareer");
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data.message || "An error occured");
  }
});

const getAllAcademicCareerSlice = createSlice({
  name: "academicCareer/getAllAcademicCareer",
  initialState,
  reducers: {
    resetActionsForAcademicCareerFormField: (state) => {
      state.responseForAcademicCareer = [];
    },
    takeActionsForAcademicCareerFormField: (state, action) => {
      state.resetActions = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAcademicCareerValues.pending, (state) => {
        state.isError = null;
        state.isLoading = true;
      })
      .addCase(getAcademicCareerValues.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isRun = uuidv4();
        state.responseForAcademicCareer = action.payload.map((item: any) => ({
          id: item.academicCareerId,
          value: item.academicCareerId,
          name: item.description,
        }));
      })
      .addCase(getAcademicCareerValues.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "An Error occured while getting Academic Career data";
      });
  },
});

export const { resetActionsForAcademicCareerFormField, takeActionsForAcademicCareerFormField } = getAllAcademicCareerSlice.actions;
export const getAllAcademicCareerReducer = getAllAcademicCareerSlice.reducer;

//getAllAcademicCareer
