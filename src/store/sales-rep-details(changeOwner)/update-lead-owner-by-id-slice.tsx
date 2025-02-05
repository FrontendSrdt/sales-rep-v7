import { v4 as uuidv4 } from "uuid";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface LeadOwnerUpdate {
  isLoading: boolean;
  isError: string | null;
  responseLeadOwnerUpdate: {};
  isRun: string;
}

const initialState: LeadOwnerUpdate = {
  isLoading: false,
  isError: null,
  responseLeadOwnerUpdate: {},
  isRun: uuidv4(),
};

//thunk to update owner

export const updateLeadOwner = createAsyncThunk<any | number, any>(
  "leadOwner/update-owner",

  async ({ id, updatedvalue }, { rejectWithValue }) => {
    console.log(id, updatedvalue);
    const response = coreLeadCaptureApi.put(`api/crm/lead/leadsalesrepassignment/updatesalesrep/${updatedvalue}/${id}`);

    toast.promise(response, {
      loading: "Loading",
      success: "Updated successfully",
      error: "Error while Updating",
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

// slice

const updateLeadOwnerSlice = createSlice({
  name: "LeadOwner/Update",
  initialState,
  reducers: {
    resetResponseForLeadOwnerUpdate: (state) => {
      state.responseLeadOwnerUpdate = "";
    },
  },

  extraReducers(builder) {
    builder
      .addCase(updateLeadOwner.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })

      .addCase(updateLeadOwner.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isRun = uuidv4();
        state.responseLeadOwnerUpdate = action.payload;
        state.isError = null;
      })

      .addCase(updateLeadOwner.rejected, (state, action) => {
        state.isError = action.error.message || "An Error Occured";
        state.isLoading = false;
      });
  },
});

export const { resetResponseForLeadOwnerUpdate } = updateLeadOwnerSlice.actions;
export const updateLeadOwnerReducer = updateLeadOwnerSlice.reducer;

//updateLeadOwner
