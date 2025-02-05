import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface LeadEnquiryType {
  isLoading: boolean;
  isError: null | string;
  responseOfLeadEnquiry: {};
  isRun: string;
  resetActions: any;
}

const initialState: LeadEnquiryType = {
  isLoading: false,
  isError: null,
  responseOfLeadEnquiry: {},
  isRun: uuidv4(),
  resetActions: "",
};

//thunk to create new lead academic details

export const createLeadEnquiry = createAsyncThunk<any | LeadEnquiryType, any>(
  "LeadEnquiry/Add",

  async (newLeadEnquiry, { rejectWithValue }) => {
    console.log(newLeadEnquiry);
    const response = coreLeadCaptureApi.post("api/crm/lead/leadEnquiry/save", newLeadEnquiry);

    toast.promise(response, {
      loading: "Loading",
      success: "Lead Enquiry has been Successfully Added",
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

const createLeadEnquirySlice = createSlice({
  name: "addNewLeadEnquiry",
  initialState,
  reducers: {
    resetResponseForLeadEnquiry: (state) => {
      state.responseOfLeadEnquiry = {};
    },

    takeActionForLeadEnquiry: (state, action) => {
      state.resetActions = action.payload;
    },
  },
  extraReducers(builder) {
    builder;
    builder.addCase(createLeadEnquiry.pending, (state) => {
      state.isError = null;
      state.isLoading = true;
    });

    builder.addCase(createLeadEnquiry.fulfilled, (state, action) => {
      state.isLoading = false;
      state.responseOfLeadEnquiry = action.payload;
      state.isRun = uuidv4();
    });
    builder.addCase(createLeadEnquiry.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.error.message || "An error occured while creating lead enquiry";
    });
  },
});

export const { resetResponseForLeadEnquiry, takeActionForLeadEnquiry } = createLeadEnquirySlice.actions;

export const createLeadEnquirySliceReducer = createLeadEnquirySlice.reducer;

//addLeadEnquiry
