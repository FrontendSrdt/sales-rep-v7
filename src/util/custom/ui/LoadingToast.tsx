import React, { useEffect } from "react";
import toast from "react-hot-toast";

interface LoadingToastProps {
  message: string;
  size?: "small" | "medium" | "large";
}

const getToastStyle = (size: LoadingToastProps["size"]) => {
  switch (size) {
    case "small":
      return { fontSize: "12px", padding: "8px 12px" };
    case "medium":
      return { fontSize: "14px", padding: "10px 14px" };
    case "large":
      return { fontSize: "16px", padding: "12px 16px" };
    default:
      return { fontSize: "14px", padding: "10px 14px" };
  }
};

const LoadingToast: React.FC<LoadingToastProps> = ({ message, size = "medium" }) => {
  useEffect(() => {
    const toastId = toast.loading(
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <span>{message}</span>
      </div>,
      {
        style: getToastStyle(size),
        duration: Infinity, // Keep it until manually dismissed
      }
    );

    return () => {
      toast.dismiss(toastId);
    };
  }, [message, size]);

  return null; // This component only triggers the toast and doesn't render anything
};

export default LoadingToast;
