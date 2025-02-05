import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface LeadContactType {
  isLoading: boolean;
  isError: null | string;
  responseNewLeadContact: {};
  isRun: string;
  resetActions: any;
}

const initialState: LeadContactType = {
  isLoading: false,
  isError: null,
  responseNewLeadContact: {},
  isRun: uuidv4(),
  resetActions: "",
};

//thunk to create new lead contact phone

export const AddLeadcontactPhone = createAsyncThunk<any | LeadContactType, any>(
  "leadcontact/Add",

  async ({ newLeadContactData }, { rejectWithValue }) => {
    const response = coreLeadCaptureApi.post("api/crm/lead/leadcontactphone", newLeadContactData);

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

const addLeadContactPhoneSlice = createSlice({
  name: "addNewLeadContactPhone",
  initialState,
  reducers: {
    resetResponseForLeadContactPhone: (state) => {
      state.responseNewLeadContact = {};
    },

    takeActionForLeadContctFormFields: (state, action) => {
      state.resetActions = action.payload;
    },
  },
  extraReducers(builder) {
    builder;
    builder.addCase(AddLeadcontactPhone.pending, (state) => {
      state.isError = null;
      state.isLoading = true;
    });

    builder.addCase(AddLeadcontactPhone.fulfilled, (state, action) => {
      state.isLoading = false;
      state.responseNewLeadContact = action.payload;
      state.isRun = uuidv4();
    });
    builder.addCase(AddLeadcontactPhone.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.error.message || "An error occured while creating new lead contact phone";
    });
  },
});

export const { resetResponseForLeadContactPhone, takeActionForLeadContctFormFields } = addLeadContactPhoneSlice.actions;

export const addLeadContactPhoneReducer = addLeadContactPhoneSlice.reducer;

//addLeadContactPhone
