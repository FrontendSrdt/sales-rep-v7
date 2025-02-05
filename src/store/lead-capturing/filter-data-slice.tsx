// filterSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface FilterState {
  filterData: any;
  loading: boolean;
  error: string | null;
}

const initialState: FilterState = {
  filterData: null,
  loading: false,
  error: null,
};

// Async thunk to fetch filter data based on dynamic parameters
export const fetchFilterData = createAsyncThunk("filter/fetchFilterData", async (params: Record<string, string | number>, { rejectWithValue }) => {
  try {
    // Construct query string dynamically based on the parameters received
    const queryParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        queryParams.append(key, String(value));
      }
    });

    const response = await coreLeadCaptureApi.get(`api/crm/lead/leadcapture/filterData?${queryParams.toString()}`);

    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data || "An error occurred");
  }
});

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilterData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFilterData.fulfilled, (state, action) => {
        state.loading = false;
        state.filterData = action.payload;
      })
      .addCase(fetchFilterData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default filterSlice.reducer;
