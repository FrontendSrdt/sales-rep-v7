import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { leadContactPhoneType } from "../../types/lead-contact-phone-type";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface LeadContactByIdType {
  isLoading: boolean;
  isError: null | string;
  responseLeadContactByIdData: leadContactPhoneType[];
}

const initialState: LeadContactByIdType = {
  isLoading: false,
  isError: null,
  responseLeadContactByIdData: [],
};

//thunk to create new lead contact phone

export const getLeadcontactPhoneById = createAsyncThunk<any | LeadContactByIdType, any>(
  "leadcontact/ledContactById",

  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await coreLeadCaptureApi.get(`api/crm/lead/leadcontactphone/${id}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data.message || "An error occurred.");
    }
  }
);

const getLeadContactPhoneByIdSlice = createSlice({
  name: "leadContactById",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder;
    builder.addCase(getLeadcontactPhoneById.pending, (state) => {
      state.isError = null;
      state.isLoading = true;
    });

    builder.addCase(getLeadcontactPhoneById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.responseLeadContactByIdData = action.payload;
    });
    builder.addCase(getLeadcontactPhoneById.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.error.message || "An error occured";
    });
  },
});

export const leadContactPhoneByIdReducer = getLeadContactPhoneByIdSlice.reducer;

//getLeadContactPhoneById
