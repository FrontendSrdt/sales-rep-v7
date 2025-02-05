import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface LeadAcademicDetailsForTenthType {
  isLoading: boolean;
  isError: null | string;
  responseNewLeadAcademicDetails: {};
  isRun: string;
  resetActions: any;
}

const initialState: LeadAcademicDetailsForTenthType = {
  isLoading: false,
  isError: null,
  responseNewLeadAcademicDetails: {},
  isRun: uuidv4(),
  resetActions: "",
};

//thunk to create new lead academic details

export const AddLeadAcademicDetailsForTenthType = createAsyncThunk<any | LeadAcademicDetailsForTenthType, any>(
  "leadAcademicDetailsForTenth/Add",

  async ({ newLeadAcademicDetails }, { rejectWithValue }) => {
    const response = coreLeadCaptureApi.post("api/crm/lead/leadacademicdetailsfortenth", newLeadAcademicDetails);

    toast.promise(response, {
      loading: "Loading",
      success: "Lead Contact Phone has been Successfully Added",
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

const addLeadtakeActionForLeadAcademicDetailsForTenthSlice = createSlice({
  name: "addNewLeadAcademicDetailsForTenth",
  initialState,
  reducers: {
    resetResponseForLeadAcademicDetailsForTenth: (state) => {
      state.responseNewLeadAcademicDetails = {};
    },

    takeActionForLeadAcademicDetailsForTenth: (state, action) => {
      state.resetActions = action.payload;
    },
  },
  extraReducers(builder) {
    builder;
    builder.addCase(AddLeadAcademicDetailsForTenthType.pending, (state) => {
      state.isError = null;
      state.isLoading = true;
    });

    builder.addCase(AddLeadAcademicDetailsForTenthType.fulfilled, (state, action) => {
      state.isLoading = false;
      state.responseNewLeadAcademicDetails = action.payload;
      state.isRun = uuidv4();
    });
    builder.addCase(AddLeadAcademicDetailsForTenthType.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.error.message || "An error occured while creating new lead academic details for tenth";
    });
  },
});

export const { resetResponseForLeadAcademicDetailsForTenth, takeActionForLeadAcademicDetailsForTenth } =
  addLeadtakeActionForLeadAcademicDetailsForTenthSlice.actions;

export const addLeadAcademicDetailsForTenthReducer = addLeadtakeActionForLeadAcademicDetailsForTenthSlice.reducer;

//addLeadAcademicDetailsForTenth
