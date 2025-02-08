import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface ExportLead {
  isLoading: boolean;
  isError: null | string;
  responseExportLead: {};
  isRun: string;
  resetActions: any;
}

const initialState: ExportLead = {
  isLoading: false,
  isError: null,
  responseExportLead: {},
  isRun: uuidv4(),
  resetActions: "",
};

//thunk to create new lead academic details

export const exportLead = createAsyncThunk<any | ExportLead, any>("responseExportLead/export", async (payload, { rejectWithValue }) => {
  try {
    const response = await coreLeadCaptureApi.post("api/crm/lead/exportsLeads", payload, {
      responseType: "blob", // Important for file download
    });

    // Create a downloadable link
    const blob = new Blob([response.data], { type: response.headers["content-type"] });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;

    // Set file name (check if content-disposition header is available)
    const contentDisposition = response.headers["content-disposition"];
    let filename = "Lead_Capture.xlsx"; // Default filename

    if (contentDisposition) {
      const match = contentDisposition.match(/filename="?([^"]+)"?/);
      if (match) {
        filename = match[1];
      }
    }

    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);

    toast.success("Lead Exported Successfully");

    return { success: true };
  } catch (e: any) {
    console.error(e);
    toast.error(e.response?.data?.error || "Error occurred while exporting lead");
    return rejectWithValue(e.message);
  }
});

const exportLeadSlice = createSlice({
  name: "responseExportLead",
  initialState,
  reducers: {
    resetResponseForExportLead: (state) => {
      state.responseExportLead = {};
    },

    takeActionForExportLead: (state, action) => {
      state.resetActions = action.payload;
    },
  },
  extraReducers(builder) {
    builder;
    builder.addCase(exportLead.pending, (state) => {
      state.isError = null;
      state.isLoading = true;
    });

    builder.addCase(exportLead.fulfilled, (state, action) => {
      state.isLoading = false;
      state.responseExportLead = action.payload;
      state.isRun = uuidv4();
    });
    builder.addCase(exportLead.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.error.message || "An error occured while creating new lead academic details for tenth";
    });
  },
});

export const { resetResponseForExportLead, takeActionForExportLead } = exportLeadSlice.actions;

export const exportLeadReducer = exportLeadSlice.reducer;

//ExportLead
