import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { highlightText } from "../general/genral-action";
import { MdDelete, MdFileDownload } from "react-icons/md";
import store, { AppDispatch, RootState } from "../../../store";
import { downloadDocForNotes } from "../../../store/task/download-doc-slice";
import { getFilterProps, getPaginationProps, onGetOnlyDataLength } from "../../../store/ui/table-slice";
import { useTable, usePagination, useFilters, useGlobalFilter, Column, TableInstance, TableState, useRowSelect } from "react-table";
import { useNavigate } from "react-router-dom";
import { onGetAllCheckSelectedDataFormCustomTable } from "../../../store/ui/ui-slice";

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
  selectedRowIds: any;
  selectedFlatRows: any;
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
  onRowClick?: (row: any) => void;
}

export function CustomDetailsTable<T extends object>({ columns, data, onRowClick, isMode }: CustomDetailsTableProps<T>) {
  const [currentData, setCurrentData] = useState(data); // Local state for table data
  const [filteredDataLength, setFilteredDataLength] = useState(data?.length || 0);
  const { settingId } = useSelector((state: RootState) => state.ui);
  const { userDetails } = useSelector((state: RootState) => state.getLoggedInUserData);
  // const [selectedRows, setSelectedRows] = useState<any[]>([]); // Store selected rows

  // console.log("data= ", data);
  // const [selectedRow, setSelectedRow] = useState(data[0]?.leadOfferId || null);
  const [selectedRow, setSelectedRow] = useState({
    offerId: data[0]?.leadOfferId,
    leadStatus: data[0]?.status,
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedRow !== undefined && onRowClick) {
      onRowClick(selectedRow);
    }
  }, [selectedRow]);

  // console.log("selectedRow=======>", selectedRow);

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
    selectedFlatRows,
    // state: { selectedRowIds: selectedRows },
  } = useTable<T>(
    {
      columns,
      data: currentData, // Use the local state for data
      initialState: { pageIndex: 0, pageSize: 10 } as Partial<TableStateWithFiltersAndPagination<T>>,
    },
    useFilters,
    useGlobalFilter,
    usePagination,
    useRowSelect, // Enable row selection plugin
    // this column is used to enable checkbox function
    (hooks: any) => {
      hooks.visibleColumns.push((columns: any) => [
        {
          id: "selection",
          Header: ({ getToggleAllRowsSelectedProps }: any) => <input type="checkbox" {...getToggleAllRowsSelectedProps()} />,
          Cell: ({ row }: any) => <input type="checkbox" {...row.getToggleRowSelectedProps()} />,
          className: "w-8",
        },
        ...columns,
      ]);
    }
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

  const handleDownload = (docName: string, leadCaptureId: number, docTypeId: number | undefined) => {
    // console.log("docName, leadCaptureId, docTypeId", docName, leadCaptureId, docTypeId);
    store.dispatch(downloadDocForNotes({ leadCaptureId, docName, docTypeId }));
  };
  const handleNavigation = (leadId: number) => {
    const path = userDetails?.authority?.includes("ROLE_AUTHORITY") ? `/view-decline-cases/manage-contract/${leadId}` : `/manage-leads/details/${leadId}`;
    navigate(path, { state: { viaButton: true } });
  };

  // this is using to capture all leads data on clicking the checkbox
  useEffect(() => {
    const selectedData = selectedFlatRows.map((row: any) => row.original);
    console.log("Selected Data Across Pages:", selectedData);
    store.dispatch(onGetAllCheckSelectedDataFormCustomTable(selectedData));
  }, [selectedFlatRows]);

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
                  className={`border p-2 text-left text-black text-sm text-nowrap ${column.render("Header") === "Action" ? " w-[150px] min-w-[150px] max-w-[130px]" : " "}`}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row: any, i: number) => {
            const leadId = row.original.leadCaptureId || row.original.lead_capture_id;
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={i} className={`relative group  ${i % 2 === 0 ? "  hover:bg-gray-200" : "hover:bg-gray-100"}`}>
                {row.cells.map((cell: any, id: any) => {
                  const cellValue = cell.value;
                  return (
                    <td
                      {...cell.getCellProps()}
                      key={id}
                      onClick={() => {
                        if (onRowClick) {
                          // console.log("row.original Table", row.original.status);
                          setSelectedRow((prev) => {
                            return {
                              ...prev,
                              offerId: row.original.leadOfferId,
                              leadStatus: row.original.status,
                            };
                          });
                        }
                      }} // Handle row click
                      className={`${leadId === settingId && i % 2 === 0 ? "bg-gray-200" : ""}  
              ${leadId === settingId && i % 2 !== 0 ? "bg-gray-100" : ""}  
              ${leadId === settingId ? "border border-gray-300 " : "border "}  
            ${
              isMode !== "viewDecline" && isMode !== "manageLeads" && isMode !== "documents" && row.original.leadOfferId === selectedRow.offerId
                ? "bg-blue-100 cursor-pointer"
                : "cursor-pointer"
            }
 p-2 text-left text-sm text-nowrap`}
                    >
                      {cell.column.Header === "Created By" ? (
                        <div className="flex items-center justify-between">
                          {/* Render the cell content with text highlighting */}
                          <span>{typeof cellValue === "string" ? highlightText(cellValue, globalFilter || "") : cell.render("Cell")}</span>
                          {/* Render icons */}
                          <div className="flex items-center gap-1 text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity text-lg cursor-pointer">
                            <MdFileDownload onClick={() => handleDownload(row.original.name, row.original.leadCaptureId, row.original.coreDocAttachmentTypeId)} />
                            <MdDelete />
                          </div>
                        </div>
                      ) : cell.column.Header === "Lead Name" ? (
                        // <Link
                        //   to={userDetails?.authority?.includes("ROLE_AUTHORITY") ? `/view-decline-cases/manage-contract/${leadId}` : `/manage-leads/details/${leadId}`}
                        //   className="text-blue-500 text-[14px] text-semibold hover:underline cursor-pointer"
                        // >
                        //   {highlightText(cellValue, globalFilter || "")}
                        // </Link>
                        <span onClick={() => handleNavigation(leadId)} className="text-blue-500 text-[14px] font-semibold hover:underline cursor-pointer">
                          {highlightText(cellValue, globalFilter || "")}
                        </span>
                      ) : /* Render cell content normally for other columns */
                      typeof cellValue === "string" ? (
                        highlightText(cellValue, globalFilter || "")
                      ) : (
                        cell.render("Cell")
                      )}
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
