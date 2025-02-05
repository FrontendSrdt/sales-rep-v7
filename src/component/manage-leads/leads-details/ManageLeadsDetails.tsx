import { useSelector } from "react-redux";
import LeftView from "./LeftView";
import RightView from "./RightView";
import LoadingSpinner from "../../../util/custom/ui/LoadingSpinner";
import { emptyDataIcon } from "../../../data/savgIcons";
import Fallback from "../../../util/custom/ui/Fallback";
import { RootState } from "../../../store";

const ManageLeadsDetails: React.FC = () => {
  const { isLoading, leadPropertiesDataById } = useSelector((state: RootState) => state.getLeadPropertiesDataById);

  return (
    <>
      {/* <ManageLeadDetailsHead /> */}

      <div className="flex w-full flex-col lg:flex-row mt-8 gap-3 items-start px-3 sm:px-6">
        <div className="w-full lg:w-auto lg:min-w-[400px] lg:sticky top-[88px]">
          {isLoading && <LoadingSpinner size={35} mainLoading={true} message="Fetching Leads Properties !" centered={true} />}
          {!isLoading && Object.keys(leadPropertiesDataById).length === 0 && (
            <div className="mt-[35px]">
              <Fallback errorInfo="No properties Found !!" icon={emptyDataIcon} />
            </div>
          )}
          {!isLoading && Object.keys(leadPropertiesDataById).length > 0 && <LeftView />}
        </div>

        <div className="w-full border mr-1 rounded-md overflow-hidden mb-3">
          <RightView />
        </div>
      </div>
    </>
  );
};

export default ManageLeadsDetails;
