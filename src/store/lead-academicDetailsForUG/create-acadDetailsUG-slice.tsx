import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";
import toast from "react-hot-toast";

interface newLeadAcadDetailsUGType {
  isRun: string;
  isError: null | string;
  isLoading: boolean;
  resetActions: any;
  responseOfLeadAcadDetailsUG: any;
}

const initialState: newLeadAcadDetailsUGType = {
  isRun: uuidv4(),
  isError: null,
  isLoading: true,
  resetActions: "",
  responseOfLeadAcadDetailsUG: "",
};

export const createLeadAcadDetailsUG = createAsyncThunk<any | newLeadAcadDetailsUGType, any>(
  "newLeadAcadDetailsUG",
  async (newLeadAcadDetailsUGData, { rejectWithValue }) => {
    const response = coreLeadCaptureApi.post("api/crm/lead/leadacademicdetailsug", newLeadAcadDetailsUGData);

    toast.promise(response, {
      loading: "Loading",
      success: "Lead Academic Details has been  Added Successfully",
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

export const createLeadAcadDetailsUGSlice = createSlice({
  name: "newLeadAcadDetailsUGdata",
  initialState,
  reducers: {
    resetResposneforLeadAcadDetailsUG: (state) => {
      state.responseOfLeadAcadDetailsUG = "";
    },
    takeActionForLeadAcadDetailsUG: (state, action) => {
      state.resetActions = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createLeadAcadDetailsUG.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(createLeadAcadDetailsUG.fulfilled, (state, action) => {
        state.isLoading = false;
        state.responseOfLeadAcadDetailsUG = action.payload;
        state.isRun = uuidv4();
      })
      .addCase(createLeadAcadDetailsUG.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "Error occured!";
      });
  },
});

export const { resetResposneforLeadAcadDetailsUG, takeActionForLeadAcadDetailsUG } = createLeadAcadDetailsUGSlice.actions;
export const createLeadAcadDetailsUGReducer = createLeadAcadDetailsUGSlice.reducer;

// addLeadAcadDetailsUG
