import { useEffect, useState } from "react";

interface typeRefresh {
  onRefresh: () => void;
}

const CustomRefresh: React.FC<typeRefresh> = ({ onRefresh }) => {
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [timeAgo, setTimeAgo] = useState("");

  const calculateTimeAgo = () => {
    const now = new Date();
    const secondsAgo = Math.floor((now.getTime() - lastUpdated.getTime()) / 1000);
    if (secondsAgo < 60) {
      setTimeAgo(`${secondsAgo} seconds ago`);
    } else {
      const minutesAgo = Math.floor(secondsAgo / 60);
      setTimeAgo(`${minutesAgo} minutes ago`);
    }
  };

  useEffect(() => {
    setLastUpdated(new Date());

    const interval = setInterval(() => {
      calculateTimeAgo();
    }, 10000);

    return () => clearInterval(interval); // Clear interval when component unmounts
  }, []);

  return (
    <>
      <div className="flex items-center text-[12px] sm:text-sm bg-gray-100 gap-x-2 px-2   rounded">
        <div className="flex items-center py-1 ">
          <span className="w-3 h-3 bg-green-600 rounded-full block mr-2"></span>
          {timeAgo === "" ? "just updated" : `updated ${timeAgo} `}
        </div>
        <div className="flex items-center gap-x-1 pl-2 py-1 border-l  cursor-pointer text-blue-600">
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
            <path
              fill="blue"
              d="M12.079 2.25c-4.794 0-8.734 3.663-9.118 8.333H2a.75.75 0 0 0-.528 1.283l1.68 1.666a.75.75 0 0 0 1.056 0l1.68-1.666a.75.75 0 0 0-.528-1.283h-.893c.38-3.831 3.638-6.833 7.612-6.833a7.66 7.66 0 0 1 6.537 3.643a.75.75 0 1 0 1.277-.786A9.16 9.16 0 0 0 12.08 2.25m8.761 8.217a.75.75 0 0 0-1.054 0L18.1 12.133a.75.75 0 0 0 .527 1.284h.899c-.382 3.83-3.651 6.833-7.644 6.833a7.7 7.7 0 0 1-6.565-3.644a.75.75 0 1 0-1.277.788a9.2 9.2 0 0 0 7.842 4.356c4.808 0 8.765-3.66 9.15-8.333H22a.75.75 0 0 0 .527-1.284z"
            />
          </svg>
          <span onClick={onRefresh}>refresh</span>
        </div>
      </div>
    </>
  );
};

export default CustomRefresh;
