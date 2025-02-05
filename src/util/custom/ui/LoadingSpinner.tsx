import React from "react";
import { Oval } from "react-loader-spinner";

interface LoadingSpinnerPropsType {
  size: number;
  mainLoading: boolean;
  message: string;
  centered: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerPropsType> = ({ size, mainLoading, message, centered }) => {
  return (
    <div className={`flex ${mainLoading ? "flex-col space-y-2" : "flex-row space-x-2"} items-center justify-center ${centered ? "min-h-screen" : "my-4"}`}>
      <p className="text-gray-700">{message}</p>
      <Oval visible={true} height={size} width={size} color="#0000FF" ariaLabel="oval-loading" secondaryColor="#808080" />
    </div>
  );
};

export default LoadingSpinner;
