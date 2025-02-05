import React, { useEffect, useState } from "react";
import Select, { SingleValue } from "react-select";
import { useSelector } from "react-redux";
import store, { RootState } from "../../../store";
import { getLeadOwnerValues } from "../../../store/sales-rep-details(changeOwner)/get-all-lead-owner-slice";
import useForLocation from "../../../hooks/useForLocation";
import { updateLeadOwner } from "../../../store/sales-rep-details(changeOwner)/update-lead-owner-by-id-slice";

interface changeOwnerProps {
  leadCaptureId: number;
  onHideModal: () => void;
}

interface LeadOwnerOption {
  value: number;
  label: string;
}

const ChangeOwner: React.FC<changeOwnerProps> = ({ leadCaptureId, onHideModal }) => {
  const { currentURL } = useForLocation();

  const [selectedOption, setSelectedOption] = useState<SingleValue<LeadOwnerOption>>();

  const { responseForLeadOwner } = useSelector((state: RootState) => state.getAllLeadOwner);
  // const { isError, responseLeadOwnerUpdate } = useSelector((state: RootState) => state.updateLeadOwner);

  useEffect(() => {
    store.dispatch(getLeadOwnerValues());
  }, [currentURL]);

  const changeOwner = () => {
    const id = leadCaptureId;
    const updatedvalue = selectedOption?.value;
    // console.log(selectedOption);
    store.dispatch(updateLeadOwner({ id, updatedvalue }));
    onHideModal();
  };

  return (
    <div className="p-4">
      <form>
        <div className="grid w-full pb-5">
          <div className="pb-1">
            <label className="text-black font-medium text-base text-nowrap">Update To</label>
            <span className="text-red-500 text-base font-bold">*</span>
          </div>
          <Select defaultValue={selectedOption} onChange={setSelectedOption} options={responseForLeadOwner} />
        </div>
      </form>

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded absolute bottom-[16px] right-[16px]" onClick={changeOwner}>
        Save
      </button>
    </div>
  );
};

export default ChangeOwner;
