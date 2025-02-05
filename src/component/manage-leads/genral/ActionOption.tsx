import React from "react";
import toast from "react-hot-toast";
import ChangeOwner from "./ChangeOwner";
import { useSelector } from "react-redux";
import CallingRequest from "./CallingRequest";
import store, { RootState } from "../../../store";
import CustomModal from "../../../util/custom/ui/CustomModal";
import CustomActionOptions from "../../../util/custom/general/CustomActionOptions";
import { onDropDownOpenHandler, uiSliceAction } from "../../../store/ui/ui-slice";
import { makeCallRequest } from "../../../store/lead-contact-phone/make-call-slice";
import { callingData, changeOwnerData, ManageLeadsActionsData } from "../../../data/manage-leads/ManageLeadsData";

interface Type {
  leadId: any;
  pageFlag: string;
  rowIndex: number;

  leadNum: number | string | any;
  leadStageId?: number | string | any;
}

const ActionOptions: React.FC<Type> = ({ leadId, pageFlag, rowIndex, leadNum, leadStageId }) => {
  const dispatch = store.dispatch;


  const { modalId } = useSelector((state: RootState) => state.ui);
  const {
    paginationAction: { pageSize },
  } = useSelector((state: RootState) => state.table);
  const { userDetails } = useSelector((state: RootState) => state.getLoggedInUserData);
  const { phone: executiveNum } = userDetails;
  const { isActionModalShow, settingId, isActionOwnerModalShow } = useSelector((state: RootState) => state.ui);
  const isLastThreeRows: boolean = pageSize >= 1 && rowIndex >= pageSize - 3;
  const closeModal = () => dispatch(uiSliceAction.onDisabledModalForActionHandler());

  const handleIconClick = () => {
    // console.log("isLastThreeRows= ", isLastThreeRows);
    if (settingId === leadId) {
      dispatch(uiSliceAction.onDisabledDropdownHandler());
    } else {
      dispatch(onDropDownOpenHandler(leadId));
      dispatch(uiSliceAction.onDisabledModalForActionHandler());
    }
    // console.log("pageCOunt", pageCount);
    // console.log("pageSize", pageSize);

    // console.log("rowIndex= ", rowIndex);

    dispatch(uiSliceAction.onIsLastThreeRows(isLastThreeRows));
    // if (getOnlyDataLength === 1) {
    //   console.log("if1");
    //   dispatch(uiSliceAction.onIsLastThreeRows(true));
    // } else {
    //   console.log("else1");
    //   if (rowIndex >= 2) {
    //     console.log("if 2");
    //     dispatch(uiSliceAction.onIsLastThreeRows(true));
    //   } else {
    //     console.log("else 2");
    //     dispatch(uiSliceAction.onIsLastThreeRows(false));
    //   }
    //   // dispatch(uiSliceAction.onIsLastThreeRows(isLastThreeRows));
    // }
  };

  const onCallHandler = () => {
    const leadSourceId = leadId;
    if (leadStageId) {
      dispatch(makeCallRequest({ executiveNum, leadNum, leadSourceId, leadStageId }));
    } else {
      toast("Sorry 😔,This Lead is not able to make call.", {
        duration: 6000,
      });
    }
  };

  const onWhatsAppHandler = () => {
    dispatch(uiSliceAction.onShowModalForActionHandler());
    dispatch(uiSliceAction.onDisabledDropdownHandler());
    dispatch(uiSliceAction.onGetLeadPhoneHandler(leadNum));

    // console.log("leadPhone Column= ", leadPhone);
    // console.log(row.original.phone);
  };

  const onChangeOwnerHandler = () => {
    dispatch(uiSliceAction.onShowOwnerModalForActionHandler());
    dispatch(uiSliceAction.onDisabledDropdownHandler());
  };

  const actionHandlers = {
    Call: onCallHandler,
    WhatsApp: onWhatsAppHandler,
    ChangeOwner: onChangeOwnerHandler,
    // Add more actions here if needed
  };

  return (
    <>
      <span className={` border  ${settingId === leadId ? " border-gray-400 px-1 bg-[#f3f4f5]" : " px-1 border-transparent"} `}>
        <i onClick={handleIconClick} className={`fas fa-cog  text-gray-500 cursor-pointer`}></i>
      </span>
      {settingId === leadId && <CustomActionOptions leadId={leadId} pageFlag={pageFlag} isContent="ManageLead" options={ManageLeadsActionsData} actionHandlers={actionHandlers} />}

      {modalId === leadId && isActionModalShow && (
        <CustomModal isShowModal={isActionModalShow} onHideModal={closeModal} data={callingData}>
          <CallingRequest />
        </CustomModal>
      )}

      {modalId === leadId && isActionOwnerModalShow && (
        <CustomModal isShowModal={isActionOwnerModalShow} onHideModal={closeModal} data={changeOwnerData}>
          <ChangeOwner leadCaptureId={leadId} onHideModal={closeModal} />
        </CustomModal>
      )}
    </>
  );
};

export default ActionOptions;
