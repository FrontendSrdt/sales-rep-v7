import { useTable, usePagination, useFilters, useGlobalFilter, Column, TableInstance, TableState } from "react-table";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getFilterProps, getPaginationProps } from "../../store/ui/table-slice";
// import CustomPaginationForTable from "./CustomPaginationForTable";
import { AppDispatch } from "../../store";
// import CustomSearchForTable from "./CustomSearchForTable";

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
}

interface TableStateWithFiltersAndPagination<T extends object> extends TableState<T> {
  globalFilter: string;
  pageIndex: number;
  pageSize: number;
}
interface TableStateWithPagination<T extends object> extends TableState<T> {
  pageIndex: number;
  pageSize: number;
}

interface CustomDetailsTableProps<T extends object> {
  columns: Column<T>[];
  data?: T[] | any;
  btnText?: string;
  linkUrl?: string;
  isOperationModeType?: string;
  isCreateEnabled?: boolean;
  isUserCreateEnabled?: boolean;
  isUserEditEnable?: boolean;
  isCrateSamePage?: boolean;
  handleAddForm?: () => void;
  initialValues?: any;
  validationSchema?: any;
  inputData?: any;
  onAction?: any;
  onSaveAndAddHandler?: any;
  isUserMode?: boolean;
  propsForSearchSelectInputs?: any;
  isManagerModeForCreate?: boolean;
  isLoadingForCreate?: boolean;
}

export function CustomTable<T extends object>({ columns, data }: CustomDetailsTableProps<T>) {
  const {
    getTableBodyProps,
    headerGroups,
    prepareRow,
    state,
    setGlobalFilter,
    setPageSize,
    page,
    gotoPage,
    previousPage,
    nextPage,
    canPreviousPage,
    canNextPage,
    pageCount,
  } = useTable<T>(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 } as Partial<TableStateWithPagination<T>>,
    },
    useFilters,
    useGlobalFilter,
    usePagination
  ) as TableInstanceWithPlugins<T>;

  const { globalFilter, pageIndex, pageSize } = state as TableStateWithFiltersAndPagination<T>;

  const dispatch = useDispatch<AppDispatch>();
  const dataLength = data?.length;

  useEffect(() => {
    dispatch(
      getFilterProps({
        globalFilter,
        setGlobalfilter: setGlobalFilter,
      })
    );
  }, [globalFilter, dispatch]);

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
        dataLength,
        pageSize,
      })
    );
  }, [pageIndex, pageSize, dispatch]);

  return (
    <div>
      <div className="overflow-x-auto horizontal w-full ">
        <table className="w-full table-auto mt-4">
          <thead className=" bg-blue-50  ">
            {headerGroups.map((headerGroup: any, i: number) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={i}>
                {headerGroup.headers.map((column: any, id: any) => (
                  <th
                    className={`px-10 py-2.5 text-start text-nowrap border border-[#02AFAE1A]  text-gray-500  "
                                                    }`}
                    {...column.getHeaderProps()}
                    key={id}
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row: any) => {
              prepareRow(row);
              const { key: rowKey, ...rowProps } = row.getRowProps(); // Destructure the key separately
              return (
                <tr className="text-[#757575]" key={rowKey} {...rowProps}>
                  {/* Pass the key explicitly */}
                  {row.cells.map((cell: any) => {
                    const { key: cellKey, ...cellProps } = cell.getCellProps(); // Destructure the key separately
                    return (
                      <td key={cellKey} className="py-2 px-10  border border-[#02AFAE1A]  text-nowrap " {...cellProps}>
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
