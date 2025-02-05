import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import makeCallServiceApi from "../../interceptor/makeCallServiceApi";
import toast from "react-hot-toast";

interface makeCallType {
  isLoading: boolean;
  isError: null | string;
  responseforMakeCall: {};
  isRun: string;
  resetActions: any;
}

const initialState: makeCallType = {
  isLoading: false,
  isError: null,
  isRun: uuidv4(),
  resetActions: "",
  responseforMakeCall: {},
};

export const makeCallRequest = createAsyncThunk<any | makeCallType, any>(
  "make call ",

  async (
    { executiveNum, leadNum, leadSourceId, leadStageId },
    { rejectWithValue }
  ) => {
    const response = makeCallServiceApi.post(
      `placeoutboundcall/${executiveNum}/${leadNum}/${leadSourceId}/${leadStageId}`
    );

    toast.promise(response, {
      loading: "Calling...",
      success: "Call placed Successfully ",
      error: (e: any) => {
        // Extract the error message dynamically from response

   
        const errorMessage =
          e.response?.data?.message || "Error occurred while calling";
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

const makeCallRequestSlice = createSlice({
  name: "call request",
  initialState,
  reducers: {
    resetResponseForCallRequest: (state) => {
      state.responseforMakeCall = {};
    },

    takeActionForCallRequest: (state, action) => {
      state.resetActions = action.payload;
    },
  },
  extraReducers(builder) {
    builder;
    builder.addCase(makeCallRequest.pending, (state) => {
      state.isError = null;
      state.isLoading = true;
    });

    builder.addCase(makeCallRequest.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isRun = uuidv4();
      state.responseforMakeCall = action.payload;
    });
    builder.addCase(makeCallRequest.rejected, (state, action) => {
      state.isLoading = false;
      state.isError =
        action.error.message ||
        "An error occured while creating new lead contact phone";
    });
  },
});

export const { resetResponseForCallRequest, takeActionForCallRequest } =
  makeCallRequestSlice.actions;
export default makeCallRequestSlice.reducer;
