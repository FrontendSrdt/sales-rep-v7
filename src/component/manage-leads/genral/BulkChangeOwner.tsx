import React, { useEffect, useState } from "react";
import Select, { SingleValue } from "react-select";
import { useSelector } from "react-redux";
import store, { RootState } from "../../../store";
import { getLeadOwnerValues } from "../../../store/sales-rep-details(changeOwner)/get-all-lead-owner-slice";
import useForLocation from "../../../hooks/useForLocation";
import { ChangeOwnerInBulk } from "../../../store/actions/bulk-change-owner-slice";

interface changeOwnerProps {
  onHideModal: () => void;
}

interface LeadOwnerOption {
  value: number;
  label: string;
}

const BulkChangeOwner: React.FC<changeOwnerProps> = ({ onHideModal }) => {
  const { currentURL } = useForLocation();
  const { getAllCheckSelectedDataFormCustomTable } = useSelector((state: RootState) => state.ui);
  //   console.log(getAllCheckSelectedDataFormCustomTable);

  const leadCaptureIds = (getAllCheckSelectedDataFormCustomTable ?? []).map((item: { lead_capture_id: number }) => {
    return item.lead_capture_id;
  });

  // console.log(leadCaptureIds);
  const [selectedOption, setSelectedOption] = useState<SingleValue<LeadOwnerOption>>();

  const { responseForLeadOwner } = useSelector((state: RootState) => state.getAllLeadOwner);
  // const { isError, responseLeadOwnerUpdate } = useSelector((state: RootState) => state.updateLeadOwner);

  useEffect(() => {
    store.dispatch(getLeadOwnerValues());
  }, [currentURL]);

  const changeOwner = () => {
    const payload = {
      leadCaptureIds: leadCaptureIds,
      ownerId: selectedOption?.value,
    };
    store.dispatch(ChangeOwnerInBulk(payload));
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
          {leadCaptureIds.length === 0 && <span className="text-sm text-red-500 my-2">Please Select atleast on lead</span>}
        </div>
      </form>

      <button
        type="submit"
        disabled={leadCaptureIds.length === 0}
        className={`${
          leadCaptureIds.length === 0 ? "bg-opacity-50 cursor-not-allowed" : "cursor-pointer"
        } bg-blue-600 text-white px-4 py-2 rounded absolute bottom-[16px] right-[16px]`}
        onClick={changeOwner}
      >
        Save
      </button>
    </div>
  );
};

export default BulkChangeOwner;
