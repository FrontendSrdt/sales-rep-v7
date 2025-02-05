import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// import { v4 as uuidv4 } from "uuid";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface CreateLeadAddressDetailType {
  isRun: string;
  isError: null | string;
  isLoading: boolean;
  resetActions: any;
  responseOfLeadsAddressDetail: any;
}

const initialState: CreateLeadAddressDetailType = {
  isLoading: true,
  isError: null,
  isRun: uuidv4(),
  resetActions: "",
  responseOfLeadsAddressDetail: "",
};

// Create Thunk to CREATE Lead Capture
export const CreateLeadAddressDetail = createAsyncThunk<any | CreateLeadAddressDetailType, any>(
  "create-new/lead-addressDetail",
  (newLeadAddressDetailData, { rejectWithValue }) => {
    const response = coreLeadCaptureApi.post("api/crm/lead/leadaddressdetails", newLeadAddressDetailData);
  
    toast.promise(response, {
      loading: "Loading",
      success: "Lead Address Details has been Successfully Added",
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

const CreateLeadAddressDetailSlice = createSlice({
  name: "CreateLeadAddressDetail",
  initialState,
  reducers: {
    resetResposneforLeadAddressDetail: (state) => {
      state.responseOfLeadsAddressDetail = "";
    },
    takeActionForLeadAddressDetail: (state, action) => {
      
      state.resetActions = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(CreateLeadAddressDetail.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(CreateLeadAddressDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.responseOfLeadsAddressDetail = action.payload;
        state.isRun = uuidv4();
      })
      .addCase(CreateLeadAddressDetail.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "Error occured!";
      });
  },
});

export const { resetResposneforLeadAddressDetail, takeActionForLeadAddressDetail } = CreateLeadAddressDetailSlice.actions;
export const AddLeadAddressDetailReducer = CreateLeadAddressDetailSlice.reducer;

// addLeadAddressDetail
