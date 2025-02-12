/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import {
  addEventDetail,
  updateEventDetail,
  deleteEventDetail,
} from "../store/eventsSlice";
import { useState } from "react";

const NewEventForm = () => {
  const dispatch = useDispatch();
  const eventDetails = useSelector((state) => state.events.eventDetails);

  const [formData, setFormData] = useState({
    eventName: "",
    category: "",
    laps: "",
    participants: "",
    entryPrice: "",
  });

  const [editIndex, setEditIndex] = useState(null);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      dispatch(
        updateEventDetail({ index: editIndex, updatedDetail: formData })
      );
    } else {
      dispatch(addEventDetail(formData));
    }
    resetForm();
  };

  // Edit an event
  const handleEdit = (index) => {
    setFormData(eventDetails[index]);
    setEditIndex(index);
  };

  // Delete an event
  const handleDelete = (index) => {
    dispatch(deleteEventDetail(index));
    if (editIndex === index) {
      resetForm(); // Reset if editing the deleted item
    }
  };

  // Reset form fields
  const resetForm = () => {
    setFormData({
      eventName: "",
      category: "",
      laps: "",
      participants: "",
      entryPrice: "",
    });
    setEditIndex(null);
  };

  return (
    <div>
      {/* Event Form */}
      <section className="h-auto w-full flex justify-center items-center">
        <form
          id="addEvent"
          className="h-auto w-3/4 flex flex-col items-center gap-4 border rounded-lg bg-gray-100/10 p-4 shadow-md"
          onSubmit={handleSubmit}
        >
          <h2 className="text-xl font-semibold mb-4">
            {editIndex !== null ? "Edit Event Details" : "Event Details Form"}
          </h2>

          {/* Event Name */}
          <div className="w-full flex items-center justify-between mb-4">
            <label
              htmlFor="eventName"
              className="text-sm font-medium text-gray-900 w-1/4"
            >
              Event Name
            </label>
            <input
              type="text"
              id="eventName"
              name="eventName"
              value={formData.eventName}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/4 p-2.5"
              placeholder="Enter Event Name"
              required
            />
          </div>

          {/* Category Dropdown */}
          <div className="w-full flex items-center justify-between mb-4">
            <label
              htmlFor="category"
              className="text-sm font-medium text-gray-900 w-1/4"
            >
              Category
            </label>
            <input
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-3/4 p-2"
            
              placeholder="Enter Event Category"
              required
            />
          </div>

          {/* Laps */}
          <div className="w-full flex items-center justify-between mb-4">
            <label
              htmlFor="laps"
              className="text-sm font-medium text-gray-900 w-1/4"
            >
              No. of Laps
            </label>
            <input
              type="number"
              id="laps"
              name="laps"
              value={formData.laps}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-3/4 p-2"
              placeholder="Number of laps"
              required
            />
          </div>

          {/* Participants */}
          <div className="w-full flex items-center justify-between mb-4">
            <label
              htmlFor="participants"
              className="text-sm font-medium text-gray-900 w-1/4"
            >
              No. of Participants
            </label>
            <input
              type="number"
              id="participants"
              name="participants"
              value={formData.participants}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-3/4 p-2"
              placeholder="Number of participants"
              required
            />
          </div>

          {/* Entry Price */}
          <div className="w-full flex items-center justify-between mb-4">
            <label
              htmlFor="entryPrice"
              className="text-sm font-medium text-gray-900 w-1/4"
            >
              Entry Price
            </label>
            <input
              type="number"
              id="entryPrice"
              name="entryPrice"
              value={formData.entryPrice}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-3/4 p-2"
              placeholder="Entry price"
              required
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-lg"
            >
              {editIndex !== null ? "Update" : "Submit"}
            </button>
            {editIndex !== null && (
              <button
                type="button"
                className="bg-gray-500 text-white py-2 px-4 rounded-lg"
                onClick={resetForm}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </section>

      {/* Event Table */}
      <EventTable
        eventsData={eventDetails}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default NewEventForm;

const EventTable = ({ eventsData, handleEdit, handleDelete }) => {
  console.log("eventsData", eventsData);

  return (
    <div className="relative overflow-x-auto mt-6">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th className="px-6 py-3">Event Name</th>
            <th className="px-6 py-3">Category</th>
            <th className="px-6 py-3">Action</th>
            <th className="px-6 py-3">Delete</th>
          </tr>
        </thead>
        <tbody>
          {eventsData.map((event, index) => (
            <tr key={index} className="bg-white border-b">
              <td className="px-6 py-4">{event.eventName}</td>
              <td className="px-6 py-4">{event.category}</td>
              <td className="px-6 py-4">
                <button
                  onClick={() => handleEdit(index)}
                  className="bg-yellow-500 text-white py-1 px-4 rounded-lg hover:bg-yellow-600"
                >
                  View
                </button>
              </td>
              <td className="px-6 py-4 ">
                <button
                  onClick={() => handleDelete(index)}
                  className="bg-red-500 text-white py-1 px-4 rounded-lg hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export { EventTable };
