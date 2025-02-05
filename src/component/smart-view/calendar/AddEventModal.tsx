import React from "react";
import moment from "moment";
import ReactDOM from "react-dom";
import usePortal from "../../../hooks/UsePortal";
import { BigCalendarEventFormData } from "../../../data/smart-view/today-followUp/CalenderData";

interface AddEventModalPropsType {
  closeModal: (e: any) => void;
  handleAddEvent: (e: any) => void;
  selectedDate: any;
}
const AddEventModal: React.FC<AddEventModalPropsType> = ({
  closeModal,
  handleAddEvent,
  selectedDate,
}) => {
  const portalContainer: HTMLElement | null = usePortal("portal");
  if (!portalContainer) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-1/3 p-6">
        <h2 className="text-xl font-bold mb-4">
          {BigCalendarEventFormData.title}
        </h2>
        <form onSubmit={handleAddEvent}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              {BigCalendarEventFormData.subTitle}
            </label>
            <input
              type="text"
              name="title"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <p>
              <strong>{BigCalendarEventFormData.Date}</strong>{" "}
              {moment(selectedDate).format("MMMM Do, YYYY")}
            </p>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="mr-4 px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              onClick={closeModal}
            >
              {BigCalendarEventFormData.cancelButton}
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {BigCalendarEventFormData.addButton}
            </button>
          </div>
        </form>
      </div>
    </div>,
    portalContainer
  );
};

export default AddEventModal;
