import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreservicesApi from "../../interceptor/coreservicesApi";


interface AcademicCareerIdType {
  academicCareerDataById: {};
  isLoading: boolean;
  isError: null | string;
}

const initialState: AcademicCareerIdType = {
  academicCareerDataById: {},
  isLoading: true,
  isError: null,
};

export const getAcademicCareerById = createAsyncThunk<any | string, any>("AcademicCareer-byId", async (academicCareerId, { rejectWithValue }) => {
  try {
    const response = await coreservicesApi.get(`api/crm/core/academiccareer/${academicCareerId}`);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data.message || "An error occurred.");
  }
});

const getAcademicCareerByIdSlice = createSlice({
  name: "academicCareer-details",
  initialState,
  reducers: {
    resetAcademicCareerDataById: (state) => {
      state.academicCareerDataById = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAcademicCareerById.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getAcademicCareerById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.academicCareerDataById = action.payload;
      })
      .addCase(getAcademicCareerById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "Something went wrong";
      });
  },
});

export const { resetAcademicCareerDataById } = getAcademicCareerByIdSlice.actions;
export const getAcademicCareerByIdReducer = getAcademicCareerByIdSlice.reducer;
