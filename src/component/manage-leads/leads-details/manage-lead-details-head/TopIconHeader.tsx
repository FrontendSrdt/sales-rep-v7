import React from "react";
import store, { RootState } from "../../../../store";
import { TopIconHeaderData } from "../../../../data/manage-leads/leadDetails-data";
import { onDrawrOpenHandler, onGetHeaderTabIconsName } from "../../../../store/ui/ui-slice";
import { useSelector } from "react-redux";

const TopIconHeader: React.FC = () => {
  const dispatch = store.dispatch;
  const { ResetFormikInitialValues } = useSelector((state: RootState) => state.ui);

  const onIconHandler = (name: string) => {
    // console.log("name===>", name);
    dispatch(onGetHeaderTabIconsName(name));
    // dispatch(uiSliceAction.onDrawerOpenHandlerForTabAction(true));
    dispatch(onDrawrOpenHandler());
    console.log("ResetFormikInitialValues= ", ResetFormikInitialValues);
    // ResetFormikInitialValues({ values: initialValuesForAddNotes });
  };

  return (
    <>
      <div className="mt-3 sm:mt-0 sm:ml-auto flex gap-2 flex-wrap">
        {TopIconHeaderData.map((element: any) => (
          <button
            className="border border-gray-300 px-2 py-1 rounded text-sm"
            key={element.id}
            onClick={element?.name === "Note" || element?.name === "Tasks" || element?.name === "Upload Docs" ? onIconHandler.bind({}, element.name) : undefined}
          >
            <div className="flex items-center gap-x-1">
              {element?.icon}
              {element?.name}
            </div>
          </button>
        ))}
      </div>
      {/* <TopHeaderTabsActions /> */}
    </>
  );
};

export default TopIconHeader;
