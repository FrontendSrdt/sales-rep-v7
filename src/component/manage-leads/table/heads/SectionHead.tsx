import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import store, { RootState } from "../../../../store";
import {
  onDisableModalForChangeStage,
  onDisableModalForTestAction,
  onSetOpenModalForChangeStage,
  onShowModalForQuickAddLeadForm,
  onShowModalForTestAction,
  uiSliceAction,
} from "../../../../store/ui/ui-slice";
import useClickOutside from "../../../../hooks/useClickOutside";
import { Link } from "react-router-dom";
import QuickAddLeadForm from "../../genral/QuickAddLeadForm";
import CustomModal from "../../../../util/custom/ui/CustomModal";
import { quickAddLeadFormData, testActionData } from "../../../../data/manage-leads/quick-add-form-data";
import { Tooltip } from "react-tooltip";
import { resetResposneforLeadCaptureByQuickAddForm } from "../../../../store/lead-capture/create-lead-capture-byQuickAddForm-slice";
import BulkChangeOwner from "../../genral/BulkChangeOwner";
import { exportLead } from "../../../../store/actions/export-lead-slice";
import toast from "react-hot-toast";
import { changeStageData } from "../../../../data/change-stage-data";
import ChangeStage from "../../genral/ChangeStage";
import { bulkChangeOwnerData } from "../../../../data/bulk-changeOwner-data";

interface SectionHeadPropsType {
  sectionHeadData: any;
}

interface SectionItem {
  id: number;
  name: string;
  path?: string; // Optional, since not all items may have a path
}

const SectionHead: React.FC<SectionHeadPropsType> = ({ sectionHeadData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<SectionItem | null>(null);

  const { heading, sectionHeadSelectData, sectionHeadSettingData, sectionHeadManageFilterData } = sectionHeadData[0];
  const { isSettingData, isSubData } = useSelector((state: RootState) => state.ui);

  const settingRef = useRef<HTMLDivElement | null>(null);
  const subDataRef = useRef<HTMLDivElement | null>(null);
  const dropDownRef = useRef<HTMLDivElement | null>(null);

  const dispatch = store.dispatch;

  // Define the callbacks to be executed
  const closeSettingDataHandler = () => dispatch(uiSliceAction.onDisabledSettingData());
  const closeSubDataHandelr = () => dispatch(uiSliceAction.onDisabledSubData());
  const closeModal = () => dispatch(uiSliceAction.onDisableModalForQuickAddLeadForm());
  const closeModalForTestAction = () => dispatch(onDisableModalForTestAction());
  const closeModalForChangeStage = () => dispatch(onDisableModalForChangeStage());
  const { isQuickAddFormModalOpen, isShowModalForTestAction, isShowModalForChangeStage } = useSelector((state: RootState) => state.ui);

  useClickOutside([settingRef, subDataRef], [closeSettingDataHandler, closeSubDataHandelr]);
  const { getAllCheckSelectedDataFormCustomTable } = useSelector((state: RootState) => state.ui);

  // console.log("isQuickAddFormModalOpen =", isQuickAddFormModalOpen);
  // console.log("selectedItem=============", selectedItem);
  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item: any) => {
    setSelectedItem(item);
    setIsOpen(false); // Close the dropdown after selection
    // console.log("clickeddddddddd");
  };

  // console.log("isShowModalForTestAction====", isShowModalForTestAction);
  const closeDropDown = () => {
    setIsOpen(false);
  };

  const handleModal = (id: number) => {
    // console.log("id", id);
    if (id === 2) {
      store.dispatch(onShowModalForQuickAddLeadForm());
      store.dispatch(resetResposneforLeadCaptureByQuickAddForm());
    }

    // if (id === 5) {
    //   store.dispatch(onShowModalForTestAction());
    // }
  };

  console.log("isShowModalForChangeStage", isShowModalForChangeStage);

  useClickOutside([dropDownRef], [closeDropDown]);
  return (
    <div className="w-full border-b border-gray-200 mb-3 flex justify-between pb-3">
      <div className="flex gap-x-1 items-center">
        <h3 className="text-base sm:text-[22px] font-medium ">{heading}</h3>
        <a className="mt-1 text-gray-600 help-icon">
          <i className="fa fa-question-circle" aria-hidden="true"></i>
        </a>
        <Tooltip anchorSelect=".help-icon" place="right-start" className="custom-tooltip">
          <div className="tooltip-content">
            Access all the leads assigned to you through the Manage Leads page.
            <br />
            Add, edit, and perform various actions on your leads, such as:
            <ul className="list-disc pl-4 mt-2">
              <li>Sending emails</li>
              <li>Making a call</li>
              <li>Sending WhatsApp messages</li>
              <li>Adding an activity</li>
            </ul>
            You can filter your leads using the search textbox at the top of the grid.
            <br />
            Access lead details by clicking on their name or the view option under the action button.
            <br />
            <strong>Note:</strong> If you are a manager, you will get the list of all leads assigned to you as well as to your subordinates.
          </div>
        </Tooltip>
      </div>
      <div className="flex gap-x-2 items-center">
        <div className="select-container w-[150px]">
          <div>
            <button
              onClick={handleToggleDropdown}
              className="inline-flex justify-between w-full rounded-md border border-gray-300 shadow-sm px-4 py-1 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
            >
              {selectedItem ? selectedItem.name : "More Action"}
            </button>
            <i className="fas fa-chevron-down dropdown-icon text-[14px]"></i>
          </div>
          {isOpen && (
            <div ref={dropDownRef}>
              <ul className="absolute right-0 z-10 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                {sectionHeadSelectData.map((item: any) => (
                  <li
                    key={item.id}
                    className={`py-2 cursor-pointer hover:bg-gray-100 ${item.id === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
                    onClick={() => handleItemClick(item)}
                  >
                    {item.path ? (
                      <div className="flex gap-x-2 px-2">
                        <div>{item.icon}</div>
                        <Link to={item.path} className="block w-full text-left">
                          {item.name}
                        </Link>
                      </div>
                    ) : (
                      <div className="flex gap-x-2 items-center group relative px-2">
                        <span>{item.icon}</span>

                        <span onClick={handleModal.bind({}, item.id)}>{item.name}</span>
                        <div className="hidden group-hover:block absolute hover:bg-gray-100 right-[100%] -top-[8px] min-w-[200px] pr-2">
                          <div className={`rounded-md shadow-lg bg-white`}>
                            {item.subMenu &&
                              item.subMenu.map((ele: any) => (
                                <div
                                  className="flex items-center gap-2 p-2 hover:bg-gray-100"
                                  key={ele.id}
                                  onClick={() => {
                                    if (ele.id === 2) {
                                      store.dispatch(onShowModalForTestAction());
                                    }

                                    if (ele.id === 1) {
                                      if (getAllCheckSelectedDataFormCustomTable && getAllCheckSelectedDataFormCustomTable.length === 0) {
                                        toast.error("Please select at least one lead");
                                        return; // Stop execution
                                      }
                                      store.dispatch(exportLead(getAllCheckSelectedDataFormCustomTable));
                                    }

                                    if (ele.id === 3) {
                                      dispatch(onSetOpenModalForChangeStage());
                                    }
                                  }}
                                >
                                  <div>{ele.icon}</div>
                                  <Link to={item.path} className="block w-full text-left  cursor-pointer">
                                    {ele.name}
                                  </Link>
                                </div>
                              ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="relative">
          {/* <span
            onClick={() => dispatch(uiSliceAction.onToggleSettingData())}
            className="border border-gray-300 text-gray-500 rounded px-2 py-[5px] flex items-center cursor-pointer"
          >
            <i className="fa fa-cog" aria-hidden="true"></i>
          </span> */}

          {isSettingData && (
            <div
              ref={settingRef} // Attach ref to the setting dropdown
              className="absolute top-8 shadow-md right-0 bg-white px-2 py-2 z-[9999]"
            >
              <ul className="relative">
                {sectionHeadSettingData.slice(0, 2).map((item: any) => (
                  <li key={item.id} className="text-nowrap text-gray-500 cursor-pointer">
                    {item.name}
                  </li>
                ))}
                {sectionHeadSettingData.slice(2, 3).map((item: any) => (
                  <li key={item.id} onClick={() => dispatch(uiSliceAction.onToggleSubData())} className="text-nowrap text-gray-500 cursor-pointer">
                    {item.name}
                    {isSubData ? (
                      <i className="fa fa-chevron-down text-sm ml-2 w-4" aria-hidden="true"></i>
                    ) : (
                      <i className="fa fa-chevron-right text-sm ml-2 w-4" aria-hidden="true"></i>
                    )}
                  </li>
                ))}

                {isSubData && (
                  <div
                    ref={subDataRef} // Attach ref to the sub dropdown
                    className="absolute top-[70px] left-[-110px] bg-white shadow-md min-w-[100px] rounded px-2 py-1"
                  >
                    <ul>
                      {sectionHeadManageFilterData.map((item: any) => (
                        <li key={item.id} className="mt-2 text-gray-500">
                          {item.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>

      {isQuickAddFormModalOpen && (
        <CustomModal isMode="quickAddForm" isShowModal={isQuickAddFormModalOpen} onHideModal={closeModal} data={quickAddLeadFormData}>
          <QuickAddLeadForm />
        </CustomModal>
      )}

      {isShowModalForTestAction && (
        <CustomModal isMode="testAction" isShowModal={isShowModalForTestAction} onHideModal={closeModalForTestAction} data={bulkChangeOwnerData}>
          <BulkChangeOwner onHideModal={closeModalForTestAction} />
        </CustomModal>
      )}
      {isShowModalForChangeStage && (
        <CustomModal isMode="testAction" isShowModal={isShowModalForChangeStage} onHideModal={closeModalForChangeStage} data={changeStageData}>
          <ChangeStage onHideModal={closeModalForChangeStage} />
        </CustomModal>
      )}
    </div>
  );
};

export default SectionHead;
