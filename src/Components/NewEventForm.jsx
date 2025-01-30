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

  const handleEdit = (index) => {
    const eventDetailToEdit = eventDetails[index];
    // You can populate the form fields with eventDetailToEdit if needed
    setEventName(eventDetailToEdit.eventName);
    setCategory(eventDetailToEdit.category);
    setLaps(eventDetailToEdit.laps);
    setParticipants(eventDetailToEdit.participants);
    setEntryPrice(eventDetailToEdit.entryPrice);
  };

  const handleDelete = (index) => {
    dispatch(deleteEventDetail(index));
  };

  return (
    <div className="border">
      <div className="border">
        <section className="h-screen w-full flex justify-center items-center">
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

        <section className="h-screen">
          <div>
            <EventTable
              eventsData={eventDetails}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          </div>
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








// import { useState } from "react";


// const NewEventForm = () => {
//   const [eventName, setEventName] = useState("");
//   const [category, setCategory] = useState("");
//   const [laps, setLaps] = useState("");
//   const [participants, setParticipants] = useState("");
//   const [entryPrice, setEntryPrice] = useState("");
//   const [eventsData, setEventsData] = useState([]);
//   const [vehicleType, setVehicleType] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Add new event to the table
//     const newEvent = {
//       eventName,
//       category,
//       laps,
//       participants,
//       entryPrice,
//     };

//     setEventsData([...eventsData, newEvent]);

//     // Reset the form after submission
//     setEventName("");
//     setCategory("");
//     setLaps("");
//     setParticipants("");
//     setEntryPrice("");
//   };

//   const handleEdit = (index) => {
//     const event = eventsData[index];
//     setEventName(event.eventName);
//     setCategory(event.category);
//     setLaps(event.laps);
//     setParticipants(event.participants);
//     setEntryPrice(event.entryPrice);

//     // Remove the item to be edited from the table
//     const updatedData = eventsData.filter((_, i) => i !== index);
//     setEventsData(updatedData);
//   };

//   const handleDelete = (index) => {
//     const updatedData = eventsData.filter((_, i) => i !== index);
//     setEventsData(updatedData);
//   };

//   return (
//     <div className="border">
//       <div className="border">
//         <section className="h-screen w-full flex justify-center items-center">
//           <form
//             className="h-auto w-3/4 flex flex-col items-center gap-4 border rounded-lg bg-gray-100/10 p-6 shadow-md"
//             onSubmit={handleSubmit}
//           >
//             <h2 className="text-xl font-semibold mb-4">Event Details Form</h2>

//             {/* Event Name */}
//             <div className="w-full flex items-center justify-between mb-4">
//               <label htmlFor="eventName" className="text-sm font-medium text-gray-900 w-1/4">
//                 Event Name
//               </label>
//               <input
//                     type="text"
//                     id="text"
//                     className="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/4 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                     placeholder="Enter Your Event Name"
//                     required
//                   />
//             </div>

//             {/* Category */}
//             <div className="w-full flex items-center justify-between mb-4">
//               <label htmlFor="category" className="text-sm font-medium text-gray-900 w-1/4">
//                 Category
//               </label>
//               <select
//                 id="category"
//                 value={category}
//                 onChange={(e) => setCategory(e.target.value)}
//                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-3/4 p-2"
//               >
//                 <option value="">Select Category</option>
//                 <option>Autocross</option>
//                 <option>Drag</option>
//                 <option>Sprint</option>
//                 <option>Rally</option>
//               </select>
//             </div>

//             {/* No. of Laps */}
//             <div className="w-full flex items-center justify-between mb-4">
//               <label htmlFor="laps" className="text-sm font-medium text-gray-900 w-1/4">
//                 No. of Laps
//               </label>
//               <input
//                 id="laps"
//                 type="number"
//                 value={laps}
//                 onChange={(e) => setLaps(e.target.value)}
//                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-3/4 p-2"
//                 placeholder="Number of laps"
//               />
//             </div>

//             {/* No. of Participants */}
//             <div className="w-full flex items-center justify-between mb-4">
//               <label htmlFor="participants" className="text-sm font-medium text-gray-900 w-1/4">
//                 No. of Participants
//               </label>
//               <input
//                 id="participants"
//                 type="number"
//                 value={participants}
//                 onChange={(e) => setParticipants(e.target.value)}
//                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-3/4 p-2"
//                 placeholder="Number of participants"
//               />
//             </div>

//             <div className="flex flex-col items-start">
//                     <span className="block text-sm font-medium text-gray-900">
//                       Vehicle Type
//                     </span>
//                     <div className="flex mt-2">
//                       <label className="flex items-center mr-4">
//                         <input
//                           type="radio"
//                           name="vehicle type"
//                           value="2W"
//                           checked={vehicleType === "2W"}
//                           onChange={() => setVehicleType("2W")}
//                           className="w-4 h-4 text-blue-600 border-gray-300"
//                         />
//                         <span className="ml-2 text-sm font-medium text-gray-900">
//                           2W
//                         </span>
//                       </label>
//                       <label className="flex items-center">
//                         <input
//                           type="radio"
//                           name="vehicle type"
//                           value="4W"
//                           checked={vehicleType === "4W"}
//                           onChange={() => setVehicleType("4W")}
//                           className="w-4 h-4 text-blue-600 border-gray-300"
//                         />
//                         <span className="ml-2 text-sm font-medium text-gray-900">
//                           4W
//                         </span>
//                       </label>
//                     </div>
//                   </div>

//             {/* Entry Price */}
//             <div className="w-full flex items-center justify-between mb-4">
//               <label htmlFor="entryPrice" className="text-sm font-medium text-gray-900 w-1/4">
//                 Entry Price
//               </label>
//               <input
//                 id="entryPrice"
//                 type="number"
//                 value={entryPrice}
//                 onChange={(e) => setEntryPrice(e.target.value)}
//                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-3/4 p-2"
//                 placeholder="Entry price"
//               />
//             </div>

//             {/* Submit Button */}
//             <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4">
//               Submit
//             </button>
//           </form>
//         </section>

//         <section className="h-screen">
//           <div>
//             <EventTable
//               eventsData={eventsData}
//               handleEdit={handleEdit}
//               handleDelete={handleDelete}
//             />
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// };

// const EventTable = ({ eventsData, handleEdit, handleDelete }) => {
//   return (
//     <div className="relative overflow-x-auto">
//       <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
//         <thead className="text-xs text-gray-900 uppercase dark:text-gray-400">
//           <tr>
//             <th scope="col" className="px-6 py-3">
//               Event Name
//             </th>
//             <th scope="col" className="px-6 py-3">
//               Category
//             </th>
//             <th scope="col" className="px-6 py-3">
//               Edit
//             </th>
//             <th scope="col" className="px-6 py-3">
//               Delete
//             </th>
//           </tr>
//         </thead>
//         <tbody>
//           {eventsData.map((event, index) => (
//             <tr key={index} className="bg-white dark:bg-gray-800">
//               <td className="px-6 py-4">{event.eventName}</td>
//               <td className="px-6 py-4">{event.category}</td>
//               <td className="px-6 py-4">
//                 <button
//                   onClick={() => handleEdit(index)}
//                   className="bg-yellow-500 text-white py-1 px-4 rounded-lg"
//                 >
//                   Edit
//                 </button>
//               </td>
//               <td className="px-6 py-4">
//                 <button
//                   onClick={() => handleDelete(index)}
//                   className="bg-red-500 text-white py-1 px-4 rounded-lg"
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default NewEventForm;





// import { useDispatch, useSelector } from "react-redux";
// import { useState, useEffect } from "react";
// import { addEvent, setSelectedEvent, removeEvent } from "../store/eventsSlice"; // Adjust path

// const NewEventForm = () => {
//   const dispatch = useDispatch();
//   const selectedEvent = useSelector((state) => state.events.selectedEvent); // Get selectedEvent from Redux
//   const eventsData = useSelector((state) => state.events.eventsData); // Get events data from Redux

//   const [eventName, setEventName] = useState("");
//   const [category, setCategory] = useState("");
//   const [laps, setLaps] = useState("");
//   const [participants, setParticipants] = useState("");
//   const [entryPrice, setEntryPrice] = useState("");
//   const [vehicleType, setVehicleType] = useState("");

//   // If there is a selected event, pre-fill the form fields
//   useEffect(() => {
//     if (selectedEvent) {
//       setEventName(selectedEvent.eventName);
//       setCategory(selectedEvent.category);
//       setLaps(selectedEvent.laps);
//       setParticipants(selectedEvent.participants);
//       setEntryPrice(selectedEvent.entryPrice);
//       setVehicleType(selectedEvent.vehicleType);
//     }
//   }, [selectedEvent]);

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // If there's a selected event, update it
//     if (selectedEvent) {
//       const updatedEvent = {
//         eventName,
//         category,
//         laps,
//         participants,
//         entryPrice,
//         vehicleType,
//       };
//       dispatch(removeEvent(eventsData.findIndex((event) => event.eventName === selectedEvent.eventName))); // Remove the old event
//       dispatch(addEvent(updatedEvent)); // Add the updated event
//       dispatch(setSelectedEvent(null)); // Reset selected event after editing
//     } else {
//       const newEvent = {
//         eventName,
//         category,
//         laps,
//         participants,
//         entryPrice,
//         vehicleType,
//       };
//       dispatch(addEvent(newEvent));
//     }

//     // Reset the form fields
//     setEventName("");
//     setCategory("");
//     setLaps("");
//     setParticipants("");
//     setEntryPrice("");
//     setVehicleType("");
//   };

//   const handleEdit = (index) => {
//     const event = eventsData[index];
//     dispatch(setSelectedEvent(event)); // Set the selected event in Redux
//   };

//   const handleDelete = (index) => {
//     dispatch(removeEvent(index)); // Remove the event from Redux
//   };

//   return (
//     <div className="border">
//       <section className="h-screen w-full flex justify-center items-center">
//         <form
//           className="h-auto w-3/4 flex flex-col items-center gap-4 border rounded-lg bg-gray-100/10 p-6 shadow-md"
//           onSubmit={handleSubmit}
//         >
//           <h2 className="text-xl font-semibold mb-4">Event Details Form</h2>

//           {/* Event Name */}
//           <div className="w-full flex items-center justify-between mb-4">
//             <label htmlFor="eventName" className="text-sm font-medium text-gray-900 w-1/4">
//               Event Name
//             </label>
//             <input
//               type="text"
//               id="eventName"
//               value={eventName}
//               onChange={(e) => setEventName(e.target.value)}
//               className="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/4 p-2.5"
//               placeholder="Enter Your Event Name"
//               required
//             />
//           </div>

//           {/* Category */}
//           <div className="w-full flex items-center justify-between mb-4">
//             <label htmlFor="category" className="text-sm font-medium text-gray-900 w-1/4">
//               Category
//             </label>
//             <select
//               id="category"
//               value={category}
//               onChange={(e) => setCategory(e.target.value)}
//               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-3/4 p-2"
//             >
//               <option value="">Select Category</option>
//               <option>Autocross</option>
//               <option>Drag</option>
//               <option>Sprint</option>
//               <option>Rally</option>
//             </select>
//           </div>

//           {/* No. of Laps */}
//           <div className="w-full flex items-center justify-between mb-4">
//             <label htmlFor="laps" className="text-sm font-medium text-gray-900 w-1/4">
//               No. of Laps
//             </label>
//             <input
//               id="laps"
//               type="number"
//               value={laps}
//               onChange={(e) => setLaps(e.target.value)}
//               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-3/4 p-2"
//               placeholder="Number of laps"
//             />
//           </div>

//           {/* No. of Participants */}
//           <div className="w-full flex items-center justify-between mb-4">
//             <label htmlFor="participants" className="text-sm font-medium text-gray-900 w-1/4">
//               No. of Participants
//             </label>
//             <input
//               id="participants"
//               type="number"
//               value={participants}
//               onChange={(e) => setParticipants(e.target.value)}
//               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-3/4 p-2"
//               placeholder="Number of participants"
//             />
//           </div>

//           {/* Vehicle Type */}
//           <div className="w-full flex items-center justify-between mb-4">
//             <span className="text-sm font-medium text-gray-900 w-1/4">Vehicle Type</span>
//             <div className="flex mt-2">
//               <label className="flex items-center mr-4">
//                 <input
//                   type="radio"
//                   name="vehicleType"
//                   value="2W"
//                   checked={vehicleType === "2W"}
//                   onChange={() => setVehicleType("2W")}
//                   className="w-4 h-4 text-blue-600 border-gray-300"
//                 />
//                 <span className="ml-2 text-sm font-medium text-gray-900">2W</span>
//               </label>
//               <label className="flex items-center">
//                 <input
//                   type="radio"
//                   name="vehicleType"
//                   value="4W"
//                   checked={vehicleType === "4W"}
//                   onChange={() => setVehicleType("4W")}
//                   className="w-4 h-4 text-blue-600 border-gray-300"
//                 />
//                 <span className="ml-2 text-sm font-medium text-gray-900">4W</span>
//               </label>
//             </div>
//           </div>

//           {/* Entry Price */}
//           <div className="w-full flex items-center justify-between mb-4">
//             <label htmlFor="entryPrice" className="text-sm font-medium text-gray-900 w-1/4">
//               Entry Price
//             </label>
//             <input
//               id="entryPrice"
//               type="number"
//               value={entryPrice}
//               onChange={(e) => setEntryPrice(e.target.value)}
//               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-3/4 p-2"
//               placeholder="Entry price"
//             />
//           </div>

//           <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4">
//             Submit
//           </button>
//         </form>
//       </section>

//       <section className="h-screen">
//         <div>
//           <EventTable
//             eventsData={eventsData}
//             handleEdit={handleEdit}
//             handleDelete={handleDelete}
//           />
//         </div>
//       </section>
//     </div>
//   );
// };

// const EventTable = ({ eventsData, handleEdit, handleDelete }) => {
//   return (
//     <div className="relative overflow-x-auto">
//       <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
//         <thead className="text-xs text-gray-900 uppercase dark:text-gray-400">
//           <tr>
//             <th scope="col" className="px-6 py-3">
//               Event Name
//             </th>
//             <th scope="col" className="px-6 py-3">
//               Category
//             </th>
//             <th scope="col" className="px-6 py-3">
//               Edit
//             </th>
//             <th scope="col" className="px-6 py-3">
//               Delete
//             </th>
//           </tr>
//         </thead>
//         <tbody>
//           {eventsData.map((event, index) => (
//             <tr key={index} className="bg-white dark:bg-gray-800">
//               <td className="px-6 py-4">{event.eventName}</td>
//               <td className="px-6 py-4">{event.category}</td>
//               <td className="px-6 py-4">
//                 <button
//                   onClick={() => handleEdit(index)}
//                   className="bg-yellow-500 text-white py-1 px-4 rounded-lg"
//                 >
//                   Edit
//                 </button>
//               </td>
//               <td className="px-6 py-4">
//                 <button
//                   onClick={() => handleDelete(index)}
//                   className="bg-red-500 text-white py-1 px-4 rounded-lg"
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default NewEventForm;
