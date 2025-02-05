import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useTable, usePagination, useFilters, useGlobalFilter, Column, TableInstance, TableState } from "react-table";
import { AppDispatch, RootState } from "../../store";
import { getFilterProps, getPaginationProps, onGetOnlyDataLength } from "../../store/ui/table-slice";

interface TableInstanceWithPlugins<T extends object> extends TableInstance<T> {
  setGlobalFilter: (filterValue: any) => void;
  setPageSize: (pageSize: number) => void;
  page: Array<any>;
  gotoPage: (page: number) => void;
  previousPage: () => void;
  nextPage: () => void;
  canPreviousPage: boolean;
  canNextPage: boolean;
  pageCount: number;
  getTableProps: any;
  getTableBodyProps: any;
  headerGroups: any;
  prepareRow: any;
  state: any;
}

interface TableStateWithFiltersAndPagination<T extends object> extends TableState<T> {
  globalFilter: string;
  pageIndex: number;
  pageSize: number;
}

interface CustomDetailsTableProps<T extends object> {
  columns: Column<T>[];
  data?: T[] | any;
  isMode?: string;
}

export function CustomTableForDocs<T extends object>({ columns, data }: CustomDetailsTableProps<T>) {
  const [currentData, setCurrentData] = useState(data); // Local state for table data
  const [filteredDataLength, setFilteredDataLength] = useState(data?.length || 0);
  const { settingId } = useSelector((state: RootState) => state.ui);
  //   const { userDetails } = useSelector((state: RootState) => state.getLoggedInUserData);

  // const { leadId } = useSelector((state: RootState) => state.ui)
  // console.log("currentData= ", currentData)

  const { getTableBodyProps, headerGroups, prepareRow, state, setGlobalFilter, setPageSize, page, gotoPage, previousPage, nextPage, canPreviousPage, canNextPage, pageCount } =
    useTable<T>(
      {
        columns,
        data: currentData, // Use the local state for data
        initialState: { pageIndex: 0, pageSize: 10 } as Partial<TableStateWithFiltersAndPagination<T>>,
      },
      useFilters,
      useGlobalFilter,
      usePagination
    ) as TableInstanceWithPlugins<T>;

  const { globalFilter, pageIndex, pageSize } = state as TableStateWithFiltersAndPagination<T>;

  const dispatch = useDispatch<AppDispatch>();

  // Sync current data with the passed data prop
  useEffect(() => {
    setCurrentData(data);
  }, [data]);

  // const dataLength = currentData?.length;
  // console.log(currentData);

  useEffect(() => {
    dispatch(
      getFilterProps({
        globalFilter,
        setGlobalfilter: setGlobalFilter,
      })
    );
  }, [globalFilter, dispatch]);

  useEffect(() => {
    if (globalFilter) {
      setFilteredDataLength(page.length || 0);
    } else {
      setFilteredDataLength(data?.length || 0);
    }
  }, [globalFilter, page, data]);

  useEffect(() => {
    dispatch(onGetOnlyDataLength(filteredDataLength));
  }, [filteredDataLength]);
  // console.log(filteredDataLength);

  useEffect(() => {
    dispatch(
      getPaginationProps({
        canPreviousPage,
        canNextPage,
        gotoPage,
        setPageSize,
        previousPage,
        nextPage,
        pageIndex,
        pageCount,
        dataLength: filteredDataLength, // Update pagination when data length changes
        pageSize,
      })
    );
  }, [pageIndex, pageSize, filteredDataLength, dispatch]); // Include currentData as a dependency

  //   const handleDownload = (docName: string, leadCaptureId: number, docTypeId: number | undefined) => {
  //     store.dispatch(downloadDocForNotes({ leadCaptureId, docName, docTypeId }));
  //   };

  return (
    <>
      <table className="w-full bg-white">
        <thead>
          {headerGroups.map((headerGroup: any, i: number) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={i} className="__fliter_gradient">
              {headerGroup.headers.map((column: any, id: any) => (
                <th
                  {...column.getHeaderProps()}
                  key={id}
                  className={`border p-2 text-left text-black text-sm text-nowrap ${
                    column.render("Header") === "Action" ? " w-[150px] min-w-[150px] max-w-[130px]" : " min-w-[130px]"
                  }`}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row: any, i: number) => {
            const leadId = row.original.leadCaptureId;
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={i} className={`relative group  ${i % 2 === 0 ? "  hover:bg-gray-200" : "hover:bg-gray-100"}`}>
                {row.cells.map((cell: any, id: any) => {
               
                  return (
                    <td
                      {...cell.getCellProps()}
                      key={id}
                      className={`${leadId === settingId && i % 2 === 0 ? "bg-gray-200" : ""}  
              ${leadId === settingId && i % 2 !== 0 ? "bg-gray-100" : ""}  
              ${leadId === settingId ? "border border-gray-300 " : "border "}  
              p-2 text-left text-sm text-nowrap`}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
