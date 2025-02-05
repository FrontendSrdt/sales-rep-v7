import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import store, { RootState } from "../../../../store";
import CustomSideDrawer from "../../../../util/custom/ui/CustomSideDrawer";
import TaskSelectors from "../task/TaskSelectors";
import AddNotes from "../notes/AddNotes";
import UploadDocs from "../upload-docs/UploadDocs";
import { getLeadOwnerValues } from "../../../../store/sales-rep-details(changeOwner)/get-all-lead-owner-slice";

const TopHeaderTabsActions: React.FC = () => {
  let childrenContent: any = "";
  // const formikRef = useRef<any>(null);
  const { isDrawerOpen, getHeaderTabIconsName } = useSelector((state: RootState) => state.ui);

  // console.log("getHeaderTabIconsName", getHeaderTabIconsName);

  if (getHeaderTabIconsName === "Note" || getHeaderTabIconsName === "NotesEdit") {
    childrenContent = <AddNotes />;
    // console.log("Note");
  }

  if (getHeaderTabIconsName === "Tasks" || getHeaderTabIconsName === "taskEdit") {
    childrenContent = <TaskSelectors />;
  }

  if (getHeaderTabIconsName === "Upload Docs") {
    childrenContent = <UploadDocs />;
  }


  useEffect(()=>{
    store.dispatch(getLeadOwnerValues())
  },[])
  return (
    <>
      {((isDrawerOpen && getHeaderTabIconsName === "Tasks") ||
        getHeaderTabIconsName === "Note" ||
        getHeaderTabIconsName === "taskEdit" ||
        getHeaderTabIconsName === "NotesEdit" ||
        getHeaderTabIconsName === "Upload Docs") && <CustomSideDrawer>{childrenContent}</CustomSideDrawer>}
    </>
  );
};

export default TopHeaderTabsActions;
