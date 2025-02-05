import { useState } from "react";
import Calendar from "react-calendar";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

function SmallCalendar() {
  const [value, onChange] = useState<Value>(new Date());

  // Function to apply conditional class names
  const tileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (view === "month") {
      // Highlight the current date
      if (date.toDateString() === new Date().toDateString()) {
        return "react-calendar__tile--now";
      }
    }
    return null;
  };

  return (
    <div>
      <Calendar onChange={onChange} value={value} tileClassName={tileClassName} />
    </div>
  );
}

export default SmallCalendar;
