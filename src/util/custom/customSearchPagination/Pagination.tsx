import { useSelector } from "react-redux";
import { RootState } from "../../../store";

function Pagination() {
  const table = useSelector((state: RootState) => state.table);

  const {
    paginationAction: { canPreviousPage, canNextPage, gotoPage, setPageSize, previousPage, nextPage, pageIndex, dataLength, pageSize },
  } = table;

  //  console.log("dataLength= ", dataLength);
  // console.log("pageSize= ", pageSize);

  const pageRange = `${pageIndex * pageSize + 1}-${Math.min((pageIndex + 1) * pageSize, dataLength)} / ${dataLength}`;

  // console.log(pageRange);
  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-x-2">
          <label htmlFor="">Size</label>
          <div className="flex gap-x-2">
            <div className="select-container">
              <select
                className="__custom-select"
                value={pageSize}
                onChange={(e) => {
                  const size = parseInt(e.target.value);
                  gotoPage(0); // Go to first page when changing page size
                  setPageSize(size);
                }}
              >
                {[2, 3, 5, 10, 20, 50, 100].map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
              <i className="fas fa-chevron-down dropdown-icon text-[14px]"></i>
            </div>
          </div>
        </div>

        <div className="flex justify-between gap-x-1 sm:gap-x-2 min-w-[150px] sm:min-w-[212px] ">
          <div className="flex justify-center w-full  items-center  sm:gap-x-1">
            <button className={`  py-2 ${!canPreviousPage && "opacity-50 cursor-not-allowed"}`} onClick={() => previousPage()} disabled={!canPreviousPage}>
              <i className="fa fa-chevron-left" aria-hidden="true"></i>
            </button>
            <div className="text-gray-600">{pageRange}</div>
            <button className={`   py-2  ${!canNextPage && "opacity-50 cursor-not-allowed"}`} onClick={() => nextPage()} disabled={!canNextPage}>
              <i className="fa fa-chevron-right" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Pagination;

// header rootlayout table slice paginaltion search detailstable
