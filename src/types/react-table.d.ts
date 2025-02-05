import { TableOptions } from "react-table";

// Extend react-table to include `manualPagination`
declare module "react-table" {
  export interface TableOptions<D extends object> {
    manualPagination?: boolean;
    pageCount?: number | string;
  }
}
