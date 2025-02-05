import { AlertMessageData } from "../../../data/smart-view/today-followUp/CalenderData";
import BigCalendar from "./BigCalendar";
import SmallCalendar from "./SmallCalendar";

const MainCalendar: React.FC = () => {
  const { heading, alertMessage } = AlertMessageData[0];
  return (
    <div className="main-calender mt-4 ">
      <div className="w-full small-callender">
        <SmallCalendar />
        <div className="mt-4">
          <p className="text-sm font-semibold">{heading}</p>
          {alertMessage.map((item: any) => (
            <div key={item.id} className="bg-gray-100 flex justify-between items-center text-sm px-3 py-1 mt-2 text-gray-600">
              {item.message} <span className="w-3 h-3 bg-red-500 rounded-full"></span>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full">
        <BigCalendar />
      </div>
    </div>
  );
};

export default MainCalendar;
