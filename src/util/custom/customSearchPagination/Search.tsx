import { useSelector } from "react-redux";
import { Fragment } from "react/jsx-runtime";
import { RootState } from "../../../store";

const Search: React.FC = () => {
  const table = useSelector((state: RootState) => state.table);
  const {
    filterActions: { globalFilter, setGlobalfilter },
  } = table;

  return (
    <Fragment>
      <div className="w-full ">
        <input
          className="border border-stroke focus:border-stroke rounded-md px-4 py-1 w-full outline-none dark:bg-form-input dark:border-strokedark "
          value={globalFilter || ""}
          onChange={(e: any) => {
            return setGlobalfilter(e.target.value);
          }}
          placeholder="Search..."
        />
      </div>
    </Fragment>
  );
};

export default Search;
