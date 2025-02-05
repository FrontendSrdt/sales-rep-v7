import React, { useState } from "react";
import { Calendar, momentLocalizer, SlotInfo } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import AddEventModal from "./AddEventModal";

const localizer = momentLocalizer(moment);

interface Event {
  title: string;
  start: Date;
  end: Date;
}

const BigCalendar: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]); // Define the type of events array

  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null); // selectedDate can be null initially

  // Function to handle clicks on calendar dates
  const handleSelectSlot = (slotInfo: SlotInfo) => {
    setSelectedDate(slotInfo.start);
    setShowModal(true);
  };

  // Function to close modal
  const closeModal = () => {
    setShowModal(false);
  };

  // Function to handle form submission (adding new event)
  const handleAddEvent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const title = (e.target as any).title.value;
    if (title && selectedDate) {
      setEvents([...events, { title, start: selectedDate, end: selectedDate }]);
    }
    setShowModal(false);
  };

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        selectable
        onSelectSlot={handleSelectSlot} // Open modal on date select
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        className="text-sm w-full"
      />

      {/* Modal for adding events */}
      {showModal && <AddEventModal closeModal={closeModal} handleAddEvent={handleAddEvent} selectedDate={selectedDate} />}
    </div>
  );
};

export default BigCalendar;
