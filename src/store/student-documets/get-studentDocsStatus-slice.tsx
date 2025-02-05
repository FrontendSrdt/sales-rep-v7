import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface StudentDocsStatusType {
  isLoading: boolean;
  isError: null | string;
  responseOfStudentDocsStatus: {};
  isRun: string;
  resetActions: any;
}

const initialState: StudentDocsStatusType = {
  isLoading: false,
  isError: null,
  responseOfStudentDocsStatus: {},
  isRun: uuidv4(),
  resetActions: "",
};

//thunk to create new lead academic details

export const getStudentDocsStatusType = createAsyncThunk<any, any>(
  "StudentDocsStatus/Add",

  async (LeadDetails, { rejectWithValue }) => {
    console.log(LeadDetails);
    const response = coreLeadCaptureApi.get("api/crm/lead/leadOffer/getApplicationStatusByDisplayName", LeadDetails);
    console.log("tstttttt", LeadDetails);
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

const studentDocsStatusSlice = createSlice({
  name: "addNewStudentDocsStatus",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder;
    builder.addCase(getStudentDocsStatusType.pending, (state) => {
      state.isError = null;
      state.isLoading = true;
    });

    builder.addCase(getStudentDocsStatusType.fulfilled, (state, action) => {
      state.isLoading = false;
      state.responseOfStudentDocsStatus = action.payload;
      state.isRun = uuidv4();
    });
    builder.addCase(getStudentDocsStatusType.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.error.message || "An error occured while creating new lead academic details for tenth";
    });
  },
});

export const studentDocsStatusReducer = studentDocsStatusSlice.reducer;

//studentDocsStatus
