import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreservicesApi from "../../interceptor/coreservicesApi";

interface AcademicProgramRowWiseData_By_CareerId_Type {
  AcademicProgramRowWiseDataByCareerId: Record<number, any>; // Object to store data per index
  isLoading: boolean;
  isError: null | string;
}

const initialState: AcademicProgramRowWiseData_By_CareerId_Type = {
  AcademicProgramRowWiseDataByCareerId: {}, // Using an object instead of an array
  isLoading: false,
  isError: null,
};

// Async thunk with index parameter
export const getApRowWiseByCareerId = createAsyncThunk<{ index: number; data: any }, { careerId: string; index: number }>(
  "get/AC-Data-Row-Wise-By-CareerId",
  async ({ careerId, index }, { rejectWithValue }) => {
    try {
      const response = await coreservicesApi.get(`api/crm/core/academicprogram/findByCareerId/${careerId}`);

      return { index, data: response.data };
    } catch (e: any) {
      console.error("API Error:", e.response?.data.message); // ✅ Check API Errors
      return rejectWithValue(e.response?.data.message || "An error occurred.");
    }
  }
);

const getAcDataByCareerIdSlice = createSlice({
  name: "acData-by-CareerId",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getApRowWiseByCareerId.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getApRowWiseByCareerId.fulfilled, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
        if (action.payload.data && Array.isArray(action.payload.data)) {
          state.AcademicProgramRowWiseDataByCareerId[action.payload.index] = action.payload.data.map((item: any) => ({
            id: item.academicProgramId,
            name: item.name,
            value: item.academicProgramId,
          }));
        } else {
          console.error("Unexpected Data Structure:", action.payload);
        }
      })

      .addCase(getApRowWiseByCareerId.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload as string;
      });
  },
});

export const getAcDataRowWiseByCareerIdReducer = getAcDataByCareerIdSlice.reducer;

//getAcademicProgramRowWiseByCareerId
