import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import coreservicesApi from "../../interceptor/coreservicesApi";
import { Option } from "../../types/state-Type";

interface AttachmentType {
  isLoading: boolean;
  isError: string | null;
  isRun: string;
  resetActions: string;
  responseForAttachmentType: Option[];
}

const initialState: AttachmentType = {
  isLoading: false,
  isError: null,
  resetActions: "",
  isRun: uuidv4(),
  responseForAttachmentType: [],
};

// create thunk to get all State data

export const getAttachmentTypeValues = createAsyncThunk<any>(
  "getAllAttachementType",
  async (_, { rejectWithValue }) => {
    try {
      const response = await coreservicesApi.get("api/crm/core/coreDocAttachmentType");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data.message || "An error occured");
    }
  }
);

const getAllAttachemntTypeSlice = createSlice({
  name: "state/getAllState",
  initialState,
  reducers: {
    resetActionsForAttachemntTypeFormField: (state) => {
      state.responseForAttachmentType = [];
    },
    takeActionsForAttachmentTypeFormField: (state, action) => {
      state.resetActions = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAttachmentTypeValues.pending, (state) => {
        state.isError = null;
        state.isLoading = true;
      })
      .addCase(getAttachmentTypeValues.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isRun = uuidv4();
        state.responseForAttachmentType = action.payload.map((item: any) => ({
          id: item.coreDocAttachmentTypeId,
          value: item.coreDocAttachmentTypeId,
          name: item.name,
        }));
      })
      .addCase(getAttachmentTypeValues.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "An Error occured while getting Attachment Type data";
      });
  },
});

export const { resetActionsForAttachemntTypeFormField, takeActionsForAttachmentTypeFormField } =
  getAllAttachemntTypeSlice.actions;
export const getAllAttachmentTypeReducer = getAllAttachemntTypeSlice.reducer;

//coreAttachementType
