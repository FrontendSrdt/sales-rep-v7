import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SyntheticEvent } from "react";

// Define the interface for table data
interface TableData {
  filterActions: {
    globalFilter: string;
    setGlobalfilter: (e: SyntheticEvent) => void;
  };

  paginationAction: {
    canPreviousPage: boolean;
    canNextPage: boolean;
    gotoPage: (page: number) => void;
    setPageSize: (page: number) => void;
    previousPage: () => void;
    nextPage: () => void;
    pageIndex: number;
    pageCount: number;
    dataLength: number;
    pageSize: number;
  };

  getOnlyDataLength: number;
}

// Define the initial state
const initialState: TableData = {
  filterActions: {
    globalFilter: "",
    setGlobalfilter: () => {}, // Placeholder function
  },

  paginationAction: {
    canPreviousPage: false,
    canNextPage: false,
    gotoPage: () => {},
    setPageSize: () => {},
    previousPage: () => {},
    nextPage: () => {},
    pageIndex: 0,
    pageCount: 0,
    dataLength: 0,
    pageSize: 0,
  },
  getOnlyDataLength: 0,
};

// Create a slice for table-related actions and reducers
const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    // get only Data Length for UI purpose on the table

    onGetOnlyDataLength: (state, action) => {
      state.getOnlyDataLength = action.payload;
    },
    // Action to update filter properties
    getFilterProps(
      state,
      action: PayloadAction<{
        globalFilter: string;
        setGlobalfilter: (e: SyntheticEvent) => void;
      }>
    ) {
      // Ensure immutability by creating a new object for filterActions
      const { globalFilter, setGlobalfilter } = action.payload;
      state.filterActions = {
        globalFilter: globalFilter,
        setGlobalfilter: setGlobalfilter,
      };
    },

    getPaginationProps(
      state,
      action: PayloadAction<{
        canPreviousPage: boolean;
        canNextPage: boolean;
        gotoPage: (page: number) => void;
        setPageSize: (page: number) => void;
        previousPage: () => void;
        nextPage: () => void;
        pageIndex: number;
        pageCount: number;
        dataLength: number;
        pageSize: number;
      }>
    ) {
      const { canPreviousPage, canNextPage, gotoPage, setPageSize, previousPage, nextPage, pageIndex, pageCount, dataLength, pageSize } = action.payload;
      state.paginationAction = {
        canPreviousPage,
        canNextPage,
        gotoPage,
        setPageSize,
        previousPage,
        nextPage,
        pageIndex,
        pageCount,
        dataLength,
        pageSize,
      };
    },
  },
});

// Export action creators and reducer
export const { onGetOnlyDataLength, getFilterProps, getPaginationProps } = tableSlice.actions;
export const tableReducer = tableSlice.reducer;
