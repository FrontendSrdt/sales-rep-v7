import Pagination from "../../../../util/custom/customSearchPagination/Pagination";
import Search from "../../../../util/custom/customSearchPagination/Search";

const TableHead: React.FC = () => {
  return (
    <div className="flex justify-between gap-x-7 items-center  pb-3">
      <Search />
      <Pagination />
      {/* <PaginationSSR /> */}
    </div>
  );
};

export default TableHead;
