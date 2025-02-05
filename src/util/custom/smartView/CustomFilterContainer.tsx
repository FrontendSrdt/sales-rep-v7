import { useEffect, useState } from "react";
import MultiSelecterInput from "./MultiSelecterInput";
import { useSelector } from "react-redux";
import store, { RootState } from "../../../store";
import { filterCounter, resetFlagHandler } from "../../../store/ui/ui-slice";

interface props {
  filterData: any;
}
const FilterContainer: React.FC<props> = ({ filterData }) => {
  const [selectedValues, setSelectedValues] = useState<{ [key: string]: any }>({});
  const { filterCount, resetFlag } = useSelector((state: RootState) => state.ui);

  // Handler for capturing multi-select data
  const onGetPayloadHandler = (fieldKey: any, selectedData: any) => {
    setSelectedValues((prevValues) => ({
      ...prevValues,
      [fieldKey]: selectedData,
    }));
  };

  // Handler for capturing select (single-option) data
  const handleSelectChange = (fieldKey: any, e: any) => {
    const selectedValue = e.target.value;
    setSelectedValues((prevValues) => ({
      ...prevValues,
      [fieldKey]: selectedValue,
    }));
  };

  // Reset all selected values
  const handleReset = () => {
    setSelectedValues({});
    store.dispatch(resetFlagHandler(true));

    setTimeout(() => store.dispatch(resetFlagHandler(false)), 0);
  };

  // Form submission
  const handleSubmit = (e: any) => {
    e.preventDefault();

    handleReset();
  };

  useEffect(() => {
    let count = 0;
    Object.values(selectedValues).forEach((value) => {
      if (Array.isArray(value)) {
        count += value.length;
      } else {
        count += 1;
      }
    });
    store.dispatch(filterCounter(count));
  }, [selectedValues]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex relative gap-x-4">
          {filterData.map((data: any, index: any) => {
            return (
              <div key={index}>
                {/* Multi-select field */}
                {data.type === "multiselect" ? (
                  <div>
                    <span>{data.name}</span>
                    <MultiSelecterInput options={data.options} onGetPayload={(selectedData) => onGetPayloadHandler(data.value, selectedData)} resetFlag={resetFlag} />
                  </div>
                ) : (
                  // Single select field
                  <div className="flex flex-col">
                    <span>{data.name}</span>
                    <select
                      className="w-full text-gray-400  h-[42px] min-w-[250px] border border-[#e5e7eb] py-2 px-2 rounded focus:border-2 focus:border-blue-500 focus:outline-none "
                      name={data.name}
                      value={selectedValues[data.value] || ""}
                      onChange={(e) => handleSelectChange(data.value, e)}
                    >
                      {data.options.map((option: any, index: any) => (
                        <option key={index} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            );
          })}
          <div className="flex mt-4">
            <button type="submit">Submit</button>
            {filterCount > 0 && (
              <button onClick={handleReset} className="absolute -top-[34px] left-[26rem] text-[13px] text-gray-500 text-nowrap cursor-pointer ">
                clear filters
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default FilterContainer;
