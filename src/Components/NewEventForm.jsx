import { useDispatch, useSelector } from 'react-redux';
// eslint-disable-next-line no-unused-vars
import { addEventDetail, setEventDetails, updateEventDetail, deleteEventDetail } from '../store/eventsSlice';
import { useState } from 'react';

const NewEventForm = () => {
  const dispatch = useDispatch();
  const eventDetails = useSelector((state) => state.events.eventDetails);
  const selectedEvent = useSelector((state) => state.events.selectedEvent);

  const [eventName, setEventName] = useState("");
  const [category, setCategory] = useState("");
  const [laps, setLaps] = useState("");
  const [participants, setParticipants] = useState("");
  const [entryPrice, setEntryPrice] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newEventDetail = {
      eventName,
      category,
      laps,
      participants,
      entryPrice,
    };

    // Update the event details in Redux store
    if (selectedEvent) {
      // Update existing event detail
      dispatch(updateEventDetail({ index: eventDetails.indexOf(selectedEvent), updatedDetail: newEventDetail }));
    } else {
      // Add new event detail
      dispatch(addEventDetail(newEventDetail));
    }

    // Reset the form after submission
    setEventName("");
    setCategory("");
    setLaps("");
    setParticipants("");
    setEntryPrice("");
  };



  return (
    <div  >
      <div >
        <section className="h-auto w-full flex justify-center items-center">
          <form
           id='#addEvent'
            className="h-auto w-3/4 flex flex-col items-center gap-4 border rounded-lg bg-gray-100/10 p-6 shadow-md"
            onSubmit={handleSubmit}
          >
            <h2 className="text-xl font-semibold mb-4">Event Details Form</h2>

            {/* Event Name */}
            <div className="w-full flex items-center justify-between mb-4">
              <label htmlFor="eventName" className="text-sm font-medium text-gray-900 w-1/4">
                Event Name
              </label>
              <input
                type="text"
                id="eventName"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/4 p-2.5"
                placeholder="Enter Your Event Name"
                required
              />
            </div>

            {/* Category */}
            <div className="w-full flex items-center justify-between mb-4">
              <label htmlFor="category" className="text-sm font-medium text-gray-900 w-1/4">
                Category
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-3/4 p-2"
              >
                <option value="">Select Category</option>
                <option>Autocross</option>
                <option>Drag</option>
                <option>Sprint</option>
                <option>Rally</option>
              </select>
            </div>

            {/* No. of Laps */}
            <div className="w-full flex items-center justify-between mb-4">
              <label htmlFor="laps" className="text-sm font-medium text-gray-900 w-1/4">
                No. of Laps
              </label>
              <input
                type="number"
                id="laps"
                value={laps}
                onChange={(e) => setLaps(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-3/4 p-2"
                placeholder="Number of laps"
              />
            </div>

            {/* No. of Participants */}
            <div className="w-full flex items-center justify-between mb-4">
              <label htmlFor="participants" className="text-sm font-medium text-gray-900 w-1/4">
                No. of Participants
              </label>
              <input
                type="number"
                id="participants"
                value={participants}
                onChange={(e) => setParticipants(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-3/4 p-2"
                placeholder="Number of participants"
              />
            </div>

            {/* Entry Price */}
            <div className="w-full flex items-center justify-between mb-4">
              <label htmlFor="entryPrice" className="text-sm font-medium text-gray-900 w-1/4">
                Entry Price
              </label>
              <input
                type="number"
                id="entryPrice"
                value={entryPrice}
                onChange={(e) => setEntryPrice(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-3/4 p-2"
                placeholder="Entry price"
              />
            </div>

            {/* Submit Button */}
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4">
              Submit
            </button>
            
          </form>
        </section>

        
      </div>
    </div>
  );
};

export default NewEventForm;

// eslint-disable-next-line react/prop-types
const EventTable = ({ eventsData, handleEdit, handleDelete }) => {
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-900 uppercase dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">Event Name</th>
            <th scope="col" className="px-6 py-3">Category</th>
            <th scope="col" className="px-6 py-3">Edit</th>
            <th scope="col" className="px-6 py-3">Delete</th>
          </tr>
        </thead>
        <tbody>
          {eventsData.map((event, index) => (
            <tr key={index} className="bg-white dark:bg-gray-800">
              <td className="px-6 py-4">{event.eventName}</td>
              <td className="px-6 py-4">{event.category}</td>
              <td className="px-6 py-4">
                <button
                  onClick={() => handleEdit(index)}
                  className="bg-yellow-500 text-white py-1 px-4 rounded-lg"
                >
                  Edit
                </button>
              </td>
              <td className="px-6 py-4">
                <button
                  onClick={() => handleDelete(index)}
                  className="bg-red-500 text-white py-1 px-4 rounded-lg"
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

export {EventTable};








