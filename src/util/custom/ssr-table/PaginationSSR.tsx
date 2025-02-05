import React from "react";
import store, { RootState } from "../../../store";
import { useSelector } from "react-redux";
import { setPaginationProps } from "../../../store/ui/pagination-slice";

const PaginationSSR: React.FC = () => {
  const dispatch = store.dispatch;
  const { dataLength, pageSize, canNextPage, canPreviousPage, pageIndex } = useSelector((state: RootState) => state.paginationForLeads);
  // Handle pagination events
  const handleNextPage = () => {
   
    if (pageIndex < Math.ceil(dataLength / pageSize) - 1) {
      dispatch(setPaginationProps({ pageIndex: pageIndex + 1 }));
    }
  };

  const handlePreviousPage = () => {
    if (pageIndex > 0) {
      dispatch(setPaginationProps({ pageIndex: pageIndex - 1 }));
    }
  };
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-x-2">
        <label htmlFor="">Size</label>
        <div className="flex gap-x-2">
          <div className="select-container">
            <select
              className="__custom-select"
              defaultValue={pageSize}
              onChange={(e) => {
                const size = parseInt(e.target.value);
              
                dispatch(setPaginationProps({ pageSize: size }));
              }}
            >
              {[5, 10, 20, 50, 100].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
            <i className="fas fa-chevron-down dropdown-icon text-[14px]"></i>
          </div>
        </div>
      </div>
      <div className="flex justify-between gap-x-1 sm:gap-x-2 min-w-[110px] sm:min-w-[212px] ">
        <div className="flex justify-center w-full  items-center  sm:gap-x-1">
          {/* Previous button */}
          <button onClick={handlePreviousPage} disabled={!canPreviousPage} className={`py-1 px-2 border ${!canPreviousPage ? "opacity-50 cursor-not-allowed" : ""}`}>
            <i className="fa fa-chevron-left" aria-hidden="true"></i>
          </button>

          {/* Page indicator */}

          <div className="text-gray-600">
            {pageIndex + 1} / {dataLength}
          </div>

          {/* Next button */}
          <button onClick={handleNextPage} disabled={!canNextPage} className={`py-1 px-2 border ${!canNextPage ? "opacity-50 cursor-not-allowed" : ""}`}>
            <i className="fa fa-chevron-right" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaginationSSR;
