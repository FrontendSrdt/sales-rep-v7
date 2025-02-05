import React, { useState } from "react";
import { useSelector } from "react-redux";
import store, { RootState } from "../../store";
import CoverOne from "../../assets/cover-01.png";
import userImg from "../../assets/logo/download-removebg-preview.png";
import { FaEdit, FaSave } from "react-icons/fa";
import { MdCancelPresentation } from "react-icons/md";
import { onToggleEditPhone } from "../../store/ui/ui-slice";
import { PasswordForm } from "./PasswordForm";
import { passwordInitialValue, PasswordInputFields, passwordValidation } from "../../data/password-update-data";
import { updateUserPassword } from "../../store/profile-update/update-userPassword-slice";

interface propsType {
  data: any;
  onSubmitHandler: (e: any) => void | any;
}

const Profile: React.FC<propsType> = ({ data, onSubmitHandler }) => {
  const { isEditPhone } = useSelector((state: RootState) => state.ui);

  const [phone, setPhone] = useState(data?.phone);

  const toggleEditPhone = () => store.dispatch(onToggleEditPhone());

  const onPasswordSubmitHandler = (value: any) => {
    console.log("hello password update", value);
    const finalPayload = { ...value };
    finalPayload["userName"] = data?.email;
    console.log("finalPayload==", finalPayload);
    store.dispatch(updateUserPassword(finalPayload));
  };

  const authorityContent = Array.isArray(data.authority)
    ? data.authority.map((item: any, index: any) => (
        <p key={index} className="font-medium user-role">
          {item}
        </p>
      ))
    : null;

  return (
    <div className="container mx-auto  max-w-3xl w-full rounded-2xl">
      <div className="overflow-hidden  border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark rounded-xl">
        <div className="relative z-20 h-[150px]">
          <img src={CoverOne} alt="profile cover" className="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center" />
        </div>
        <div className="px-4 pb-1 text-center ">
          <div className="relative z-30 mx-auto -mt-[3.5rem] sm:-mt-[4.5rem] h-[7.5rem] w-full max-w-[7.5rem] rounded-full bg-white/20 p-1 backdrop-blur sm:h-[9rem] sm:max-w-[9rem] sm:p-1">
            <div className="relative drop-shadow-2">
              <img src={userImg} alt="profile" />
              <label
                htmlFor="profile"
                className="absolute bottom-0 right-0 flex h-[2.125rem] w-[2.125rem] cursor-pointer items-center justify-center rounded-full bg-blue-500 text-white hover:bg-opacity-90 sm:bottom-2 sm:right-2"
              >
                <svg className="fill-current" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4.76464 1.42638C4.87283 1.2641 5.05496 1.16663 5.25 1.16663H8.75C8.94504 1.16663 9.12717 1.2641 9.23536 1.42638L10.2289 2.91663H12.25C12.7141 2.91663 13.1592 3.101 13.4874 3.42919C13.8156 3.75738 14 4.2025 14 4.66663V11.0833C14 11.5474 13.8156 11.9925 13.4874 12.3207C13.1592 12.6489 12.7141 12.8333 12.25 12.8333H1.75C1.28587 12.8333 0.840752 12.6489 0.512563 12.3207C0.184375 11.9925 0 11.5474 0 11.0833V4.66663C0 4.2025 0.184374 3.75738 0.512563 3.42919C0.840752 3.101 1.28587 2.91663 1.75 2.91663H3.77114L4.76464 1.42638ZM5.56219 2.33329L4.5687 3.82353C4.46051 3.98582 4.27837 4.08329 4.08333 4.08329H1.75C1.59529 4.08329 1.44692 4.14475 1.33752 4.25415C1.22812 4.36354 1.16667 4.51192 1.16667 4.66663V11.0833C1.16667 11.238 1.22812 11.3864 1.33752 11.4958C1.44692 11.6052 1.59529 11.6666 1.75 11.6666H12.25C12.4043 11.6666 12.5531 11.6052 12.6625 11.4958C12.7719 11.3864 12.8333 11.238 12.8333 11.0833V4.66663C12.8333 4.51192 12.7719 4.36354 12.6625 4.25415C12.5531 4.14475 12.4043 4.08329 12.25 4.08329H9.91667C9.72163 4.08329 9.53949 3.98582 9.4313 3.82353L8.43781 2.33329H5.56219Z"
                    fill=""
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7.00004 5.83329C6.03354 5.83329 5.25004 6.61679 5.25004 7.58329C5.25004 8.54979 6.03354 9.33329 7.00004 9.33329C7.96654 9.33329 8.75004 8.54979 8.75004 7.58329C8.75004 6.61679 7.96654 5.83329 7.00004 5.83329ZM4.08337 7.58329C4.08337 5.97246 5.38921 4.66663 7.00004 4.66663C8.61087 4.66663 9.91671 5.97246 9.91671 7.58329C9.91671 9.19412 8.61087 10.5 7.00004 10.5C5.38921 10.5 4.08337 9.19412 4.08337 7.58329Z"
                    fill=""
                  />
                </svg>
                <input type="file" name="profile" id="profile" className="sr-only" />
              </label>
            </div>
          </div>
          <div className="">
            <h3 className="mb-1.5 text-2xl font-semibold text-black">{data.fullName}</h3>
            <div className="flex items-center justify-center gap-2">
              <p className="font-medium">{`Email : ${data.email}`}</p>
            </div>
            <div className="flex items-center justify-center gap-2">
              <p className="font-medium">Authority :</p>
              <span className="flex gap-x-2">{authorityContent}</span>
            </div>
            <div className="flex items-center justify-center gap-x-2 ">
              {isEditPhone ? (
                <>
                  <div className="flex gap-x-4 items-center">
                    <label htmlFor="phone" className="font-medium">
                      Phone :
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="font-medium text-black bg-transparent  border-b border-dotted focus:outline-none"
                      style={{ padding: 0, width: "100px" }}
                    />
                    <FaSave className="text-green-500 cursor-pointer" onClick={onSubmitHandler.bind({}, phone)} />
                    <MdCancelPresentation className="text-red-500 cursor-pointer" onClick={toggleEditPhone} />
                  </div>
                </>
              ) : (
                <div className="flex gap-x-4 items-center">
                  <p className="font-medium">{`Phone : ${data?.phone}`}</p>
                  <FaEdit className="text-blue-500 cursor-pointer" onClick={toggleEditPhone} />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full sm:mt-3 px-4 pb-6 ">
          <PasswordForm fields={PasswordInputFields} initialValues={passwordInitialValue} validationSchema={passwordValidation} onSubmit={onPasswordSubmitHandler} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
