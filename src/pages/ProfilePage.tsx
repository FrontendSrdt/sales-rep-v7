import React from "react";
import Profile from "../component/profile/Profile";
import store, { RootState } from "../store";
import { useSelector } from "react-redux";
import LoadingSpinner from "../util/custom/ui/LoadingSpinner";
import { onToggleEditPhone } from "../store/ui/ui-slice";

const ProfilePage: React.FC = () => {
  const { userDetails, isLoading } = useSelector((state: RootState) => state.getLoggedInUserData);
  const { isEditPhone } = useSelector((state: RootState) => state.ui);

  const handleSubmit = (value: any) => {
    if (isEditPhone) {
      console.log("phone", value);
      store.dispatch(onToggleEditPhone());
    }
  };

  return (
    <>
      {isLoading && <LoadingSpinner size={35} mainLoading={true} message={"Hold On!"} centered={true} />}
      {!isLoading && (
        <div className="flex min-h-[calc(100vh-86px)] items-center px-4">
          <Profile data={userDetails} onSubmitHandler={handleSubmit} />
        </div>
      )}
    </>
  );
};

export default ProfilePage;
