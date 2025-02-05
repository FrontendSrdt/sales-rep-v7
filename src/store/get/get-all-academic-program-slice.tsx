import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import coreservicesApi from "../../interceptor/coreservicesApi";
import { academicProgramType } from "../../types/academic-program-type";

interface AcademicProgramType {
  isLoading: boolean;
  isError: string | null;
  isRun: string;
  resetActions: string;
  responseForAcademicProgram: academicProgramType[];
}

const initialState: AcademicProgramType = {
  isLoading: false,
  isError: null,
  resetActions: "",
  isRun: uuidv4(),
  responseForAcademicProgram: [],
};

// create thunk to get all Academic program data

export const getAcademicProgramValues = createAsyncThunk<any>(
  "getAllAcademicProgram",
  async (_, { rejectWithValue }) => {
    try {
      const response = await coreservicesApi.get(
        "api/crm/core/academicprogram"
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data.message || "An error occured"
      );
    }
  }
);

const getAllAcademicProgramSlice = createSlice({
  name: "academicProgram/getAllAcademicProgram",
  initialState,
  reducers: {
    resetActionsForAcademicProgramFormField: (state) => {
      state.responseForAcademicProgram = [];
    },
    takeActionsForAcademicProgramFormField: (state, action) => {
      state.resetActions = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAcademicProgramValues.pending, (state) => {
        state.isError = null;
        state.isLoading = true;
      })
      .addCase(getAcademicProgramValues.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isRun = uuidv4();
        state.responseForAcademicProgram = action.payload.map((item: any) => ({
          id: item.academicProgramId,
          value: item.academicProgramId,
          label: item.description,
        }));
      })
      .addCase(getAcademicProgramValues.rejected, (state, action) => {
        state.isLoading = false;
        state.isError =
          action.error.message ||
          "An Error occured while getting Academic Program data";
      });
  },
});

export const {
  resetActionsForAcademicProgramFormField,
  takeActionsForAcademicProgramFormField,
} = getAllAcademicProgramSlice.actions;
export const getAllAcademicProgramReducer = getAllAcademicProgramSlice.reducer;

//coreAcademicProgram
