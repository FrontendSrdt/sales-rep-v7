import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

import toast from "react-hot-toast";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface newLeadAcadDetailsTwelfthType {
  isRun: string;
  isError: null | string;
  isLoading: boolean;
  resetActions: any;
  responseOfLeadAcadDetailsTwelfth: any;
}

const initialState: newLeadAcadDetailsTwelfthType = {
  isRun: uuidv4(),
  isError: null,
  isLoading: true,
  resetActions: "",
  responseOfLeadAcadDetailsTwelfth: "",
};

export const createLeadAcadDetailsTwelfth = createAsyncThunk<any | newLeadAcadDetailsTwelfthType, any>(
  "newLeadAcadDetailsTwelfth",
  async (newLeadAcadDetailsTwelfthData, { rejectWithValue }) => {
    const response = coreLeadCaptureApi.post("api/crm/lead/leadacademicdetailstwelfth", newLeadAcadDetailsTwelfthData);

    toast.promise(response, {
      loading: "Loading",
      success: "Lead Academic Details  has been Added Successfully",
      error: (e: any) => {
        // Extract the error message dynamically from response
        const errorMessage = e.response?.data?.error || "Error occurred while submitting";
        return errorMessage;
      },
    });

    return response
      .then((res) => {
        return res.data;
      })
      .catch((e: any) => {
        console.error(e.message);
        return rejectWithValue(e.message);
      });
  }
);

export const createLeadAcadDetailsTwelfthSlice = createSlice({
  name: "newLeadAcadDetailsTwelfthdata",
  initialState,
  reducers: {
    resetResposneforLeadAcadDetailsTwelfth: (state) => {
      state.responseOfLeadAcadDetailsTwelfth = "";
    },
    takeActionForLeadAcadDetailsTwelfth: (state, action) => {
      state.resetActions = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createLeadAcadDetailsTwelfth.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(createLeadAcadDetailsTwelfth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.responseOfLeadAcadDetailsTwelfth = action.payload;
        state.isRun = uuidv4();
      })
      .addCase(createLeadAcadDetailsTwelfth.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "Error occured!";
      });
  },
});

export const { resetResposneforLeadAcadDetailsTwelfth, takeActionForLeadAcadDetailsTwelfth } =
  createLeadAcadDetailsTwelfthSlice.actions;
export const createLeadAcadDetailsTwelfthReducer = createLeadAcadDetailsTwelfthSlice.reducer;

// addLeadAcadDetailsTwelfth
