import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface PaginationState {
  pageIndex: number;
  pageSize: number;
  dataLength: number; // total
  canPreviousPage: boolean;
  canNextPage: boolean;
  loading: boolean;
  error: null | string;
  data: any[];
}

const initialState: PaginationState = {
  pageIndex: 0,
  pageSize: 10,
  dataLength: 0,
  canPreviousPage: false,
  canNextPage: true,
  loading: false,
  error: null,
  data: [],
};

// Thunk for fetching data
export const fetchLeadCapturesBySSR = createAsyncThunk(
  "leadCapture/fetchLeadCaptures",
  async ({ pageIndex, pageSize }: { pageIndex: number; pageSize: number }, { rejectWithValue }) => {
    try {
      const response = await coreLeadCaptureApi.get(`api/crm/lead/leadcapture/pagination?skip=${pageIndex * pageSize}&limit=${pageSize}`);
      return {
        data: response.data.leadCapture || [],
        total: response.data.total || 0,
      };
    } catch (error: any) {
      console.error("Error fetching data:", error);
      return rejectWithValue(error.response?.data || "Error fetching data");
    }
  }
);

const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    resetPageSzie: (state) => {
      state.pageSize = 10;
    },
    setPaginationProps(state, action: PayloadAction<{ pageIndex?: number; pageSize?: number }>) {
      const { pageIndex, pageSize } = action.payload;
      const dataLength = state.dataLength;
   
      if (pageIndex !== undefined) state.pageIndex = pageIndex;
      if (pageSize !== undefined) state.pageSize = pageSize;
      if (dataLength !== undefined) {
        state.canPreviousPage = state.pageIndex > 0;
        state.canNextPage = (state.pageIndex + 1) * state.pageSize < dataLength;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeadCapturesBySSR.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLeadCapturesBySSR.fulfilled, (state, action: PayloadAction<{ data: any[]; total: number }>) => {
        state.loading = false;
        state.data = action.payload.data;
        state.dataLength = action.payload.total;
      })
      .addCase(fetchLeadCapturesBySSR.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong!";
      });
  },
});

export const { resetPageSzie, setPaginationProps } = paginationSlice.actions;
export default paginationSlice.reducer;
