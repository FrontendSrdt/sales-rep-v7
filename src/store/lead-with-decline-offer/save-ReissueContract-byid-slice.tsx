import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface ReissueContractType {
  isRun: string;
  isError: null | string;
  isLoading: boolean;
  responseOfReissueContract: any;
}

const initialState: ReissueContractType = {
  isLoading: true,
  isError: null,
  isRun: uuidv4(),
  responseOfReissueContract: {},
};

export const ReissueContractById = createAsyncThunk<any, { leadCaptureId: string|undefined; updatedAmount: any }, any>(
  "save-new/lead-all-details",
  ({ leadCaptureId, updatedAmount }, { rejectWithValue }) => {
    const response = coreLeadCaptureApi.post(`api/crm/lead/authoritySpecialDiscount/save/${leadCaptureId}/${updatedAmount}`);
    toast.promise(response, {
      loading: "Loading",
      success: " Details has been Successfully Submitted",
      error: (e: any) => {
        // Extract the error message dynamically from response
        const errorMessage = e.response?.data?.error || "Error occurred while submitting";
        return errorMessage;
      },
    });

    return response
      .then((res: any) => {
        return res.data;
      })
      .catch((e: any) => {
        console.error(e.message);
        return rejectWithValue(e.message);
      });
  }
);

const reissueContractByIdSlice = createSlice({
  name: "SubmitReissueContract",
  initialState,
  reducers: {
    resetResposneforReissueContract: (state) => {
      state.responseOfReissueContract = {};
      state.isError = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(ReissueContractById.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(ReissueContractById.fulfilled, (state, action) => {
        state.isRun = uuidv4();
        state.isLoading = false;
        state.responseOfReissueContract = action.payload;
      })
      .addCase(ReissueContractById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "Error occured!";
      });
  },
});

export const { resetResposneforReissueContract } = reissueContractByIdSlice.actions;
export const reissueContractByIdReducer = reissueContractByIdSlice.reducer;

// saveReissueContract
