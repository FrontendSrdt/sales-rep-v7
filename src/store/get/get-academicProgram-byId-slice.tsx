import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreservicesApi from "../../interceptor/coreservicesApi";


interface AcademicProgramType {
  academicProgramDataById: {};
  isLoading: boolean;
  isError: null | string;
}

const initialState: AcademicProgramType = {
  academicProgramDataById: {},
  isLoading: true,
  isError: null,
};

export const getAcademicProgramById = createAsyncThunk<any | string, any>("getAcademicProgram-byId", async (academicProgramId, { rejectWithValue }) => {
  try {
    const response = await coreservicesApi.get(`api/crm/core/academicprogram/${academicProgramId}`);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data.message || "An error occurred.");
  }
});

const getAcademicProgramByIdSlice = createSlice({
  name: "get-academicprogramByid",
  initialState,
  reducers: {
    resetAcademicProgramDataById: (state) => {
      state.academicProgramDataById = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAcademicProgramById.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getAcademicProgramById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.academicProgramDataById = action.payload;
      })
      .addCase(getAcademicProgramById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "Something went wrong";
      });
  },
});

export const { resetAcademicProgramDataById } = getAcademicProgramByIdSlice.actions;
export const getAcademicProgramByIdReducer = getAcademicProgramByIdSlice.reducer;
