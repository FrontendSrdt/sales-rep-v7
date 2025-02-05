import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import store, { RootState } from "../../../store";
import { getFilterProps, onGetOnlyDataLength } from "../../../store/ui/table-slice";
import { useTable, usePagination, Column, TableInstance, TableState, useGlobalFilter, useFilters } from "react-table";
import { highlightText } from "../general/genral-action";

// Extend the TableInstance to include plugins
interface TableInstanceWithPlugins<T extends object> extends TableInstance<T> {
  setGlobalFilter: (filterValue: any) => void;
  getTableProps: any;
  getTableBodyProps: any;
  headerGroups: any;
  prepareRow: any;
  state: any;
  page: Array<any>;
}

// Extend TableState to include additional SSR-related fields
interface TableStateWithFiltersAndPagination<T extends object> extends TableState<T> {
  globalFilter: string;
  pageIndex?: number;
  pageSize?: number;
}

// Props for the CustomTableSSR component
interface CustomTableSSRProps<T extends object> {
  columns: Column<T>[]; // Array of column definitions
  data: T[]; // Table data
}

export function CustomTableSSR<T extends object>({ columns, data }: CustomTableSSRProps<T>) {
  const { settingId } = useSelector((state: RootState) => state.ui);
  const [filteredDataLength, setFilteredDataLength] = useState(data?.length || 0);
  // Get pagination state from Redux
  const { dataLength, pageSize, pageIndex } = useSelector((state: RootState) => state.paginationForLeads);
  const dispatch = store.dispatch;

  // Calculate the total page count based on the server-provided data length
  const pageCount = Math.ceil(dataLength / pageSize);

  // Set up the table instance with plugins and SSR options
  const { getTableProps, page, setGlobalFilter, getTableBodyProps, headerGroups, prepareRow, state } = useTable<T>(
    {
      columns,
      data,
      manualPagination: true, // Required for SSR pagination
      pageCount, // Total number of pages
      initialState: {
        pageIndex,
        pageSize,
      } as Partial<TableState<T>>,
    },
    useFilters,
    useGlobalFilter,
    usePagination
  ) as TableInstanceWithPlugins<T>;

  // Extract the globalFilter from the table state
  const { globalFilter } = state as TableStateWithFiltersAndPagination<T>;

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
  // Dispatch globalFilter to the Redux store when it changes
  useEffect(() => {
    dispatch(
      getFilterProps({
        globalFilter,
        setGlobalfilter: setGlobalFilter,
      })
    );
  }, [globalFilter, dispatch]);

  // console.log("filteredDataLength= ", filteredDataLength);
  // Render the table
  return (
    <table className="w-full bg-white" {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup: any, i: number) => (
          <tr {...headerGroup.getHeaderGroupProps()} key={i} className="__fliter_gradient">
            {headerGroup.headers.map((column: any, id: any) => (
              <th
                {...column.getHeaderProps()}
                key={id}
                className={`border p-2 text-left text-black text-sm text-nowrap ${column.render("Header") === "Action" ? "w-[150px] min-w-[150px] max-w-[130px]" : " min-w-[220px] lg:min-w-[150px] "
                  }`}
              >
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {page?.map((row, i) => {
          const leadId = row.original.leadCaptureId;
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} key={i} className={`relative   ${i % 2 === 0 ? "  hover:bg-gray-100" : "hover:bg-gray-50"}`}>
              {row.cells.map((cell: any, id: number) => {
                const cellValue = cell.value; // Get raw cell value
                return (
                  <td
                    {...cell.getCellProps()}
                    key={id}
                    className={`${leadId === settingId && i % 2 === 0 ? "  bg-gray-100" : ""}  ${leadId === settingId && i % 2 !== 0 ? "  bg-gray-50" : ""}    ${leadId === settingId ? "border border-gray-300 " : "border "
                      }  p-2 text-left text-sm text-nowrap `}
                  >
                    {typeof cellValue === "string" ? highlightText(cellValue, globalFilter || "") : cell.render("Cell")}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
