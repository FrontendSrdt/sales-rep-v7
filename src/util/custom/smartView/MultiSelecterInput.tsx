import React, { useState, useEffect } from "react";
import { MultiSelect } from "react-multi-select-component";

interface props {
  options: any | [];
  onGetPayload: (e: any) => void;
  resetFlag: any;
}
const MultiSelecterInput: React.FC<props> = ({
  options,
  onGetPayload,
  resetFlag,
}) => {
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    onGetPayload(selected);
  }, [selected]);

  useEffect(() => {
    if (resetFlag) {
      setSelected([]);
      onGetPayload(selected);
    }
  }, [resetFlag]);

  return (
    <div className="w-full min-w-[250px] max-w-[250px]">
      <MultiSelect
        options={options}
        value={selected}
        onChange={setSelected}
        labelledBy={"Select"}
        isCreatable={true}
      />
    </div>
  );
};

export default MultiSelecterInput;
