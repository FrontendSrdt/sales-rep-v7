// Get All Academic Program By Academic Career ID

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { academicProgramType } from "../../types/academic-program-type";
import coreservicesApi from "../../interceptor/coreservicesApi";


interface AcademicProgramData_By_CareerId_Type {
  academicProgramDataByCareerId: academicProgramType | [] | any;
  isLoading: boolean;
  isError: null | string;
}

const initialState: AcademicProgramData_By_CareerId_Type = {
  academicProgramDataByCareerId: [],
  isLoading: true,
  isError: null,
};

//  Create Thunk for gettting Academic Program By Academic Career ID

export const getApByCareerId = createAsyncThunk<any, string>(
  "get/AC-Data-By-CareerId",
  async (careerId, { rejectWithValue }) => {
    try {
      const response = await coreservicesApi.get(
        `api/crm/core/academicprogram/findByCareerId/${careerId}`
      );
      return response.data;
    } catch (e: any) {
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
      .addCase(getApByCareerId.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getApByCareerId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.academicProgramDataByCareerId = action.payload.map(
          (item: any) => ({
            id: item.academicProgramId,
            value: item.academicProgramId,
            name: item.description,
          })
        );
      })
      .addCase(getApByCareerId.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "something went wrong ";
      });
  },
});

export const getAcDataByCareerIdReducer = getAcDataByCareerIdSlice.reducer;
//getAllAcademicProgramByCareer
