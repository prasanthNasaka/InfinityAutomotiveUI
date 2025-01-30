// import { useState } from "react";

// import DatePicker from "react-datepicker"; // Correct import
// import "react-datepicker/dist/react-datepicker.css"; // Import styles
// import Header from "./Header";
// import MainSideBar from "./MainSideBar";
// import NewEventForm from "./NewEventForm";

// const Events = () => {
//   const [eventType, setEventType] = useState("");
//   const [eventName, setEventName] = useState("");
//   const [dateRange, setDateRange] = useState({ start: null, end: null });
//   const [file, setFile] = useState(null);
//   const [status, setStatus] = useState("inactive");

//   const [eventsData, setEventsData] = useState([]);

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const newEvent = {
//       eventName,
//       eventType,
//       startDate: dateRange.start,
//       endDate: dateRange.end,
//       status,

//       file,
//     };

//     setEventsData([...eventsData, newEvent]);

//     // Reset form fields
//     setEventType("");
//     setEventName("");
//     setDateRange({ start: null, end: null });
//     setFile(null);
//     setStatus("inactive");

//   };

//   return (
//     <>
//       <Header />
//       <div className="flex">
//         <MainSideBar />
//         {/* events fill */}
//         <div className="border w-full">
//           <div className="border">
//             <section className="h-screen w-full flex justify-center items-center ">
//               <form
//                 className="h-auto w-3/4 flex flex-col items-center gap-4 rounded-lg bg-gray-100/10 p-6 "
//                 onSubmit={handleSubmit}
//               >
//                 <h2 className="text-xl font-semibold mb-4">Event Form</h2>

//                 {/* Event Type */}
//                 <div className="w-full flex items-center justify-between mb-4">
//                   <label
//                     htmlFor="events"
//                     className="text-sm font-medium text-gray-900 w-1/4"
//                   >
//                     Event Type
//                   </label>
//                   <select
//                     id="events"
//                     value={eventType}
//                     onChange={(e) => setEventType(e.target.value)}
//                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-3/4 p-2"
//                   >
//                     <option value="">Select Type</option>
//                     <option>Autocross</option>
//                     <option>Drag</option>
//                     <option>Sprint</option>
//                     <option>Rally</option>
//                   </select>
//                 </div>

//                 {/* Event Name */}
//                 <div className="w-full flex items-center justify-between mb-4">
//                   <label
//                     htmlFor="Ename"
//                     className="text-sm font-medium text-gray-900 w-1/4"
//                   >
//                     Event Name
//                   </label>
//                   <input
//                     type="text"
//                     id="text"
//                     value={eventName}
//                     onChange={(e) => setEventName(e.target.value)}
//                     className="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/4 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                     placeholder="Enter Your Event Name"
//                     required
//                   />
//                 </div>

//                 {/* Date Range */}
//                 <div className="w-full flex items-center justify-between mb-4">
//                   <label className="text-sm font-medium text-gray-900 w-1/4">
//                     Date Range
//                   </label>
//                   <div className="flex w-3/4 gap-4">
//                     <DatePicker
//                       selected={dateRange.start}
//                       onChange={(date) =>
//                         setDateRange({ ...dateRange, start: date })
//                       }
//                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2"
//                       placeholderText="Start Date"
//                       minDate={new Date()}
//                     />
//                     <span className="mx-2 pt-1 text-gray-500">to</span>
//                     <DatePicker
//                       selected={dateRange.end}
//                       onChange={(date) =>
//                         setDateRange({ ...dateRange, end: date })
//                       }
//                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2"
//                       placeholderText="End Date"
//                       minDate={dateRange.start || new Date()}
//                     />
//                   </div>
//                 </div>

//                 {/* Upload Banner */}

//                 <FileUpload status={status} setStatus={setStatus} />

//                 {/* Status & Show in Dashboard */}

//                 {/* Submit Button */}
//                 <button
//                   type="submit"
//                   className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4"
//                 >
//                   Submit
//                 </button>
//               </form>
//             </section>
//             <section className="h-screen">
//               <div>
//                 <ProductTable eventsData={eventsData} />
//               </div>
//             </section>
//             <section>
//               <NewEventForm />
//             </section>
//           </div>
//         </div>
//         <div></div>
//       </div>
//     </>
//   );
// };

// export default Events;

// const ProductTable = ({ eventsData }) => {
//   console.log(eventsData);
//   return (
//     <div className="relative overflow-x-auto">
//       <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
//         <thead className="text-xs text-gray-900 uppercase dark:text-gray-400">
//           <tr>
//             <th scope="col" className="px-6 py-3">
//               Event Name
//             </th>
//             <th scope="col" className="px-6 py-3">
//               Event Type
//             </th>
//             <th scope="col" className="px-6 py-3">
//               Start Date
//             </th>
//             <th scope="col" className="px-6 py-3">
//               End Date
//             </th>
//             <th scope="col" className="px-6 py-3">
//               Status
//             </th>
//             <th scope="col" className="px-6 py-3">
//               View
//             </th>
//             <th scope="col" className="px-6 py-3">
//               Add Details
//             </th>

//           </tr>
//         </thead>
//         <tbody>
//           {eventsData.map((event, index) => (
//             <tr key={index} className="bg-white dark:bg-gray-800">
//               <td className="px-6 py-4">{event.eventName}</td>
//               <td className="px-6 py-4">{event.eventType}</td>
//               <td className="px-6 py-4">
//                 {event.startDate?.toLocaleDateString()}
//               </td>
//               <td className="px-6 py-4">
//                 {event.endDate?.toLocaleDateString()}
//               </td>
//               <td className="px-6 py-4">{event.status}</td>
//               <td className="px-6 py-4">
//                 <button
//                   onClick={() => handleEdit(index)}
//                   className="bg-yellow-500 text-white py-1 px-4 rounded-lg"
//                 >
//                   Edit
//                 </button></td>

//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export { ProductTable };

// function FileUpload({ status, setStatus }) {
//   const [file, setFile] = useState(null);

//   // Handle file selection (when the user selects or drags and drops a file)
//   const handleFileChange = (e) => {
//     if (e.target.files && e.target.files[0]) {
//       setFile(URL.createObjectURL(e.target.files[0])); // Create a preview URL
//     }
//   };

//   // Handle re-upload (reset the file)
//   const handleReupload = () => {
//     setFile(null); // Reset the file
//   };

//   return (
//     <div className="w-full h-full flex justify-between">
//       {/* Status Section */}
//       <div className="flex w-1/2 justify-between mb-4">
//         <div className="flex flex-col items-start">
//           <span className="block text-sm font-medium text-gray-900">
//             Status
//           </span>
//           <div className="flex mt-2">
//             <label className="flex items-center mr-4">
//               <input
//                 type="radio"
//                 name="status"
//                 value="active"
//                 checked={status === "active"}
//                 onChange={() => setStatus("active")}
//                 className="w-4 h-4 text-blue-600 border-gray-300"
//               />
//               <span className="ml-2 text-sm font-medium text-gray-900">
//                 Active
//               </span>
//             </label>
//             <label className="flex items-center">
//               <input
//                 type="radio"
//                 name="status"
//                 value="inactive"
//                 checked={status === "inactive"}
//                 onChange={() => setStatus("inactive")}
//                 className="w-4 h-4 text-blue-600 border-gray-300"
//               />
//               <span className="ml-2 text-sm font-medium text-gray-900">
//                 Inactive
//               </span>
//             </label>
//           </div>
//         </div>
//       </div>

//       {/* File Upload Section */}

//       <div className="flex flex-col justify-center items-center h-full w-1/2 ">
//         <div className="flex justify-center ">
//         <span className="mb-2 text-lg font-medium text-gray-900">Upload Banner</span>
//         </div>
//       <div className="flex items-center justify-center  w-full  rounded-lg p-4">

//       <label
//         htmlFor="dropzone-file"
//         className="flex flex-col items-center justify-center w-full h-36 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 dark:hover:border-gray-500 transition-all"
//       >
//         {/* Upload Banner Label */}

//         <div className="relative flex flex-col items-center justify-center w-full h-full overflow-hidden">
//           {/* Show an SVG icon when no file is selected */}
//           {!file && (
//             <svg
//               className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
//               aria-hidden="true"
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 20 16"
//             >
//               <path
//                 stroke="currentColor"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
//               />
//             </svg>
//           )}

//           {/* Show file name and image preview if a file is selected */}
//           {file ? (
//             <div className="relative w-full h-full">
//               <img
//                 src={file}
//                 alt="Uploaded banner preview"
//                 className="w-full h-full object-fill rounded-lg"
//               />

//               {/* Re-upload Button */}
//               <div className="absolute bottom-4 right-4">
//                 <button
//                   type="button"
//                   onClick={handleReupload}
//                   className="bg-white text-gray-700 px-4 py-2 rounded-md shadow-md hover:bg-gray-200 focus:outline-none"
//                 >
//                   Re-upload
//                 </button>
//               </div>
//             </div>
//           ) : (
//             <>
//               <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
//                 <span className="font-semibold">Click to upload</span> or drag and drop
//               </p>
//               <p className="text-xs text-gray-500 dark:text-gray-400">
//                 SVG, PNG, JPG, or GIF (MAX. 800x400px)
//               </p>
//             </>
//           )}
//         </div>

//         {/* File input */}
//         <input
//           id="dropzone-file"
//           type="file"
//           className="hidden"
//           onChange={handleFileChange}
//           aria-label="Upload file"
//         />
//       </label>
//     </div>
//       </div>

//       <div></div>
//     </div>
//   );
// }

// export { FileUpload };

// import { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { addEvent, setSelectedEvent, updateEvent, resetSelectedEvent } from '../store/eventsSlice';
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import Header from "./Header";
// import MainSideBar from "./MainSideBar";
// import NewEventForm from './NewEventForm'; // Assuming this is already created

// const Events = () => {
//   const dispatch = useDispatch();
//   const { events, selectedEvent } = useSelector((state) => state.events);

//   const [eventType, setEventType] = useState(selectedEvent ? selectedEvent.eventType : "");
//   const [eventName, setEventName] = useState(selectedEvent ? selectedEvent.eventName : "");
//   const [dateRange, setDateRange] = useState({
//     start: selectedEvent ? selectedEvent.startDate : null,
//     end: selectedEvent ? selectedEvent.endDate : null,
//   });
//   const [file, setFile] = useState(selectedEvent ? selectedEvent.file : null);
//   const [status, setStatus] = useState(selectedEvent ? selectedEvent.status : "inactive");

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const newEvent = {
//       eventName,
//       eventType,
//       startDate: dateRange.start,
//       endDate: dateRange.end,
//       status,
//       file,
//     };

//     if (selectedEvent) {
//       // Update existing event
//       dispatch(updateEvent({ index: events.indexOf(selectedEvent), updatedEvent: newEvent }));
//       dispatch(resetSelectedEvent());
//     } else {
//       // Add new event
//       dispatch(addEvent(newEvent));
//     }

//     // Reset form fields
//     setEventType("");
//     setEventName("");
//     setDateRange({ start: null, end: null });
//     setFile(null);
//     setStatus("inactive");
//   };

//   const handleEdit = (index) => {
//     const eventToEdit = events[index];
//     dispatch(setSelectedEvent(eventToEdit));  // Set the selected event to edit
//   };

//   useEffect(() => {
//     if (selectedEvent) {
//       // If there's a selected event, populate the form with that event's details
//       setEventType(selectedEvent.eventType);
//       setEventName(selectedEvent.eventName);
//       setDateRange({
//         start: selectedEvent.startDate,
//         end: selectedEvent.endDate,
//       });
//       setFile(selectedEvent.file);
//       setStatus(selectedEvent.status);
//     } else {
//       // If no event is selected, reset the form
//       setEventType("");
//       setEventName("");
//       setDateRange({ start: null, end: null });
//       setFile(null);
//       setStatus("inactive");
//     }
//   }, [selectedEvent]);

//   return (
//     <>
//       <Header />
//       <div className="flex">
//         <MainSideBar />
//         <div className="border w-full">
//           <div className="border">
//             <section className="h-screen w-full flex justify-center items-center ">
//               <form
//                 className="h-auto w-3/4 flex flex-col items-center gap-4 rounded-lg bg-gray-100/10 p-6 "
//                 onSubmit={handleSubmit}
//               >
//                 <h2 className="text-xl font-semibold mb-4">{selectedEvent ? "Edit Event" : "Event Form"}</h2>

//                 {/* Event Type */}
//                 <div className="w-full flex items-center justify-between mb-4">
//                   <label
//                     htmlFor="events"
//                     className="text-sm font-medium text-gray-900 w-1/4"
//                   >
//                     Event Type
//                   </label>
//                   <select
//                     id="events"
//                     value={eventType}
//                     onChange={(e) => setEventType(e.target.value)}
//                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-3/4 p-2"
//                   >
//                     <option value="">Select Type</option>
//                     <option>Autocross</option>
//                     <option>Drag</option>
//                     <option>Sprint</option>
//                     <option>Rally</option>
//                   </select>
//                 </div>

//                 {/* Event Name */}
//                 <div className="w-full flex items-center justify-between mb-4">
//                   <label
//                     htmlFor="Ename"
//                     className="text-sm font-medium text-gray-900 w-1/4"
//                   >
//                     Event Name
//                   </label>
//                   <input
//                     type="text"
//                     id="text"
//                     value={eventName}
//                     onChange={(e) => setEventName(e.target.value)}
//                     className="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/4 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                     placeholder="Enter Your Event Name"
//                     required
//                   />
//                 </div>

//                 {/* Date Range */}
//                 <div className="w-full flex items-center justify-between mb-4">
//                   <label className="text-sm font-medium text-gray-900 w-1/4">
//                     Date Range
//                   </label>
//                   <div className="flex w-3/4 gap-4">
//                     <DatePicker
//                       selected={dateRange.start}
//                       onChange={(date) =>
//                         setDateRange({ ...dateRange, start: date })
//                       }
//                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2"
//                       placeholderText="Start Date"
//                       minDate={new Date()}
//                     />
//                     <span className="mx-2 pt-1 text-gray-500">to</span>
//                     <DatePicker
//                       selected={dateRange.end}
//                       onChange={(date) =>
//                         setDateRange({ ...dateRange, end: date })
//                       }
//                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2"
//                       placeholderText="End Date"
//                       minDate={dateRange.start || new Date()}
//                     />
//                   </div>
//                 </div>

//                 {/* Upload Banner */}
//                 <FileUpload status={status} setStatus={setStatus} file={file} setFile={setFile} />

//                 {/* Submit Button */}
//                 <button
//                   type="submit"
//                   className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4"
//                 >
//                   {selectedEvent ? "Update Event" : "Submit"}
//                 </button>
//                 <button
//                   type="submit"
//                   className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4"
//                 >
//                   {selectedEvent ? "Cancel" : "Submit"}
//                 </button>
//               </form>
//             </section>

//             <section className="h-screen">
//               <div>
//                 <ProductTable eventsData={events} handleEdit={handleEdit} />
//               </div>
//             </section>
//             <section>
//               <NewEventForm/>
//             </section>
//           </div>
//         </div>
//         <div></div>
//       </div>
//     </>
//   );
// };

// export default Events;

// function FileUpload({ status, setStatus }) {
//   const [file, setFile] = useState(null);

//   // Handle file selection (when the user selects or drags and drops a file)
//   const handleFileChange = (e) => {
//     if (e.target.files && e.target.files[0]) {
//       setFile(URL.createObjectURL(e.target.files[0])); // Create a preview URL
//     }
//   };

//   // Handle re-upload (reset the file)
//   const handleReupload = () => {
//     setFile(null); // Reset the file
//   };

//   return (
//     <div className="w-full h-full flex justify-between">
//       {/* Status Section */}
//       <div className="flex w-1/2 justify-between mb-4">
//         <div className="flex flex-col items-start">
//           <span className="block text-sm font-medium text-gray-900">
//             Status
//           </span>
//           <div className="flex mt-2">
//             <label className="flex items-center mr-4">
//               <input
//                 type="radio"
//                 name="status"
//                 value="active"
//                 checked={status === "active"}
//                 onChange={() => setStatus("active")}
//                 className="w-4 h-4 text-blue-600 border-gray-300"
//               />
//               <span className="ml-2 text-sm font-medium text-gray-900">
//                 Active
//               </span>
//             </label>
//             <label className="flex items-center">
//               <input
//                 type="radio"
//                 name="status"
//                 value="inactive"
//                 checked={status === "inactive"}
//                 onChange={() => setStatus("inactive")}
//                 className="w-4 h-4 text-blue-600 border-gray-300"
//               />
//               <span className="ml-2 text-sm font-medium text-gray-900">
//                 Inactive
//               </span>
//             </label>
//           </div>
//         </div>
//       </div>

//       {/* File Upload Section */}

//       <div className="flex flex-col justify-center items-center h-full w-1/2 ">
//         <div className="flex justify-center ">
//         <span className="mb-2 text-lg font-medium text-gray-900">Upload Banner</span>
//         </div>
//       <div className="flex items-center justify-center  w-full  rounded-lg p-4">

//       <label
//         htmlFor="dropzone-file"
//         className="flex flex-col items-center justify-center w-full h-36 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 dark:hover:border-gray-500 transition-all"
//       >
//         {/* Upload Banner Label */}

//         <div className="relative flex flex-col items-center justify-center w-full h-full overflow-hidden">
//           {/* Show an SVG icon when no file is selected */}
//           {!file && (
//             <svg
//               className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
//               aria-hidden="true"
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 20 16"
//             >
//               <path
//                 stroke="currentColor"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
//               />
//             </svg>
//           )}

//           {/* Show file name and image preview if a file is selected */}
//           {file ? (
//             <div className="relative w-full h-full">
//               <img
//                 src={file}
//                 alt="Uploaded banner preview"
//                 className="w-full h-full object-fill rounded-lg"
//               />

//               {/* Re-upload Button */}
//               <div className="absolute bottom-4 right-4">
//                 <button
//                   type="button"
//                   onClick={handleReupload}
//                   className="bg-white text-gray-700 px-4 py-2 rounded-md shadow-md hover:bg-gray-200 focus:outline-none"
//                 >
//                   Re-upload
//                 </button>
//               </div>
//             </div>
//           ) : (
//             <>
//               <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
//                 <span className="font-semibold">Click to upload</span> or drag and drop
//               </p>
//               <p className="text-xs text-gray-500 dark:text-gray-400">
//                 SVG, PNG, JPG, or GIF (MAX. 800x400px)
//               </p>
//             </>
//           )}
//         </div>

//         {/* File input */}
//         <input
//           id="dropzone-file"
//           type="file"
//           className="hidden"
//           onChange={handleFileChange}
//           aria-label="Upload file"
//         />
//       </label>
//     </div>
//       </div>

//       <div></div>
//     </div>
//   );
// }
// export {FileUpload}

// const ProductTable = ({ eventsData, handleEdit }) => {

//   return (
//     <div className="relative overflow-x-auto">
//       <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
//         <thead className="text-xs text-gray-900 uppercase dark:text-gray-400">
//           <tr>
//             <th scope="col" className="px-6 py-3">
//               Event Name
//             </th>
//             <th scope="col" className="px-6 py-3">
//               Event Type
//             </th>
//             <th scope="col" className="px-6 py-3">
//               Start Date
//             </th>
//             <th scope="col" className="px-6 py-3">
//               End Date
//             </th>
//             <th scope="col" className="px-6 py-3">
//               Status
//             </th>
//             <th scope="col" className="px-6 py-3">
//               Action
//             </th>
//             <th scope="col" className="px-6 py-3">
//               Add Details
//             </th>
//           </tr>
//         </thead>
//         <tbody>
//           {eventsData.map((event, index) => (
//             <tr key={index} className="bg-white dark:bg-gray-800">
//               <td className="px-6 py-4">{event.eventName}</td>
//               <td className="px-6 py-4">{event.eventType}</td>
//               <td className="px-6 py-4">
//                 {event.startDate?.toLocaleDateString()}
//               </td>
//               <td className="px-6 py-4">
//                 {event.endDate?.toLocaleDateString()}
//               </td>
//               <td className="px-6 py-4">{event.status}</td>
//               <td className="px-6 py-4">
//                 <button
//                   onClick={() => handleEdit(index)}
//                   className="bg-yellow-500 text-white py-1 px-4 rounded-lg"
//                 >
//                   View
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export { ProductTable };

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addEvent,
  setSelectedEvent,
  updateEvent,
  resetSelectedEvent,
} from "../store/eventsSlice";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Header from "./Header";
import MainSideBar from "./MainSideBar";
import NewEventForm from "./NewEventForm"; // Assuming this is already created
import { Link } from "react-scroll";

const Events = () => {
  const dispatch = useDispatch();
  const { events, selectedEvent } = useSelector((state) => state.events);

  const [eventType, setEventType] = useState(
    selectedEvent ? selectedEvent.eventType : ""
  );
  const [eventName, setEventName] = useState(
    selectedEvent ? selectedEvent.eventName : ""
  );
  const [dateRange, setDateRange] = useState({
    start: selectedEvent ? selectedEvent.startDate : null,
    end: selectedEvent ? selectedEvent.endDate : null,
  });
  const [file, setFile] = useState(selectedEvent ? selectedEvent.file : null);
  const [status, setStatus] = useState(
    selectedEvent ? selectedEvent.status : "inactive"
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    const newEvent = {
      eventName,
      eventType,
      startDate: dateRange.start,
      endDate: dateRange.end,
      status,
      file,
    };

    if (selectedEvent) {
      // Update existing event
      dispatch(
        updateEvent({
          index: events.indexOf(selectedEvent),
          updatedEvent: newEvent,
        })
      );
      dispatch(resetSelectedEvent());
    } else {
      // Add new event
      dispatch(addEvent(newEvent));
    }

    // Reset form fields
    setEventType("");
    setEventName("");
    setDateRange({ start: null, end: null });
    setFile(null);
    setStatus("inactive");
  };

  const handleEdit = (index) => {
    const eventToEdit = events[index];
    dispatch(setSelectedEvent(eventToEdit)); // Set the selected event to edit
  };

  // Reset the form and clear selected event when cancel is clicked
  const handleCancel = () => {
    dispatch(resetSelectedEvent());
    setEventType("");
    setEventName("");
    setDateRange({ start: null, end: null });
    setFile(null);
    setStatus("inactive");
  };

  useEffect(() => {
    if (selectedEvent) {
      // If there's a selected event, populate the form with that event's details
      setEventType(selectedEvent.eventType);
      setEventName(selectedEvent.eventName);
      setDateRange({
        start: selectedEvent.startDate,
        end: selectedEvent.endDate,
      });
      setFile(selectedEvent.file);
      setStatus(selectedEvent.status);
    } else {
      // If no event is selected, reset the form
      setEventType("");
      setEventName("");
      setDateRange({ start: null, end: null });
      setFile(null);
      setStatus("inactive");
    }
  }, [selectedEvent]);

  return (
    <>
      <Header />
      <div className="flex">
        <MainSideBar />
        <div className="border w-full">
          <div className="border">
            <section className="h-screen w-full flex justify-center items-center ">
              <form
                className="h-auto w-3/4 flex flex-col items-center gap-4 rounded-lg bg-gray-100/10 p-6 "
                onSubmit={handleSubmit}
              >
                <h2 className="text-xl font-semibold mb-4">
                  {selectedEvent ? "Edit Event" : "Event Form"}
                </h2>

                {/* Event Type */}
                <div className="w-full flex items-center justify-between mb-4">
                  <label
                    htmlFor="events"
                    className="text-sm font-medium text-gray-900 w-1/4"
                  >
                    Event Type
                  </label>
                  <select
                    id="events"
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-3/4 p-2"
                  >
                    <option value="">Select Type</option>
                    <option>Autocross</option>
                    <option>Drag</option>
                    <option>Sprint</option>
                    <option>Rally</option>
                  </select>
                </div>

                {/* Event Name */}
                <div className="w-full flex items-center justify-between mb-4">
                  <label
                    htmlFor="Ename"
                    className="text-sm font-medium text-gray-900 w-1/4"
                  >
                    Event Name
                  </label>
                  <input
                    type="text"
                    id="text"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    className="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/4 p-2.5"
                    placeholder="Enter Your Event Name"
                    required
                  />
                </div>

                {/* Date Range */}
                <div className="w-full flex items-center justify-between mb-4">
                  <label className="text-sm font-medium text-gray-900 w-1/4">
                    Date Range
                  </label>
                  <div className="flex w-3/4 gap-4">
                    <DatePicker
                      selected={dateRange.start}
                      onChange={(date) =>
                        setDateRange({ ...dateRange, start: date })
                      }
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2"
                      placeholderText="Start Date"
                      minDate={new Date()}
                    />
                    <span className="mx-2 pt-1 text-gray-500">to</span>
                    <DatePicker
                      selected={dateRange.end}
                      onChange={(date) =>
                        setDateRange({ ...dateRange, end: date })
                      }
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2"
                      placeholderText="End Date"
                      minDate={dateRange.start || new Date()}
                    />
                  </div>
                </div>

                {/* Upload Banner */}
                <FileUpload
                  status={status}
                  setStatus={setStatus}
                  file={file}
                  setFile={setFile}
                />

                <div className="flex  w-full justify-center items-center gap-4 ">
                  {/* Cancel Button (Only if editing an event) */}
                  {selectedEvent && (
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="bg-red-500 text-white py-2 px-4 rounded-lg mt-4"
                    >
                      Cancel
                    </button>
                  )}
                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4"
                  >
                    {selectedEvent ? "Update Event" : "Submit"}
                  </button>
                </div>
              </form>
            </section>

            <section className="h-screen">
              <div>
                <ProductTable eventsData={events} handleEdit={handleEdit} />
              </div>
            </section>
            <section id="newEventForm">
              <NewEventForm />
            </section>
          </div>
        </div>
        <div></div>
      </div>
    </>
  );
};

export default Events;

// eslint-disable-next-line react/prop-types
function FileUpload({ status, setStatus }) {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(URL.createObjectURL(e.target.files[0])); // Create a preview URL
    }
  };

  const handleReupload = () => {
    setFile(null); // Reset the file
  };

  return (
    <div className="w-full h-full flex justify-between">
      <div className="flex w-1/2 justify-between mb-4">
        <div className="flex flex-col items-start">
          <span className="block text-sm font-medium text-gray-900">
            Status
          </span>
          <div className="flex mt-2">
            <label className="flex items-center mr-4">
              <input
                type="radio"
                name="status"
                value="active"
                checked={status === "active"}
                onChange={() => setStatus("active")}
                className="w-4 h-4 text-blue-600 border-gray-300"
              />
              <span className="ml-2 text-sm font-medium text-gray-900">
                Active
              </span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="status"
                value="inactive"
                checked={status === "inactive"}
                onChange={() => setStatus("inactive")}
                className="w-4 h-4 text-blue-600 border-gray-300"
              />
              <span className="ml-2 text-sm font-medium text-gray-900">
                Inactive
              </span>
            </label>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center h-full w-1/2 ">
        <div className="flex justify-center ">
          <span className="mb-2 text-lg font-medium text-gray-900">
            Upload Banner
          </span>
        </div>
        <div className="flex items-center justify-center w-full rounded-lg p-4">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-36 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
          >
            <div className="relative flex flex-col items-center justify-center w-full h-full overflow-hidden">
              {!file && (
                <svg
                  className="w-8 h-8 mb-4 text-gray-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
              )}

              {file ? (
                <div className="relative w-full h-full">
                  <img
                    src={file}
                    alt="Uploaded banner preview"
                    className="w-full h-full object-fill rounded-lg"
                  />
                  <div className="absolute bottom-4 right-4">
                    <button
                      type="button"
                      onClick={handleReupload}
                      className="bg-white text-gray-700 px-4 py-2 rounded-md shadow-md hover:bg-gray-200 focus:outline-none"
                    >
                      Re-upload
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500">
                    SVG, PNG, JPG, or GIF (MAX. 800x400px)
                  </p>
                </>
              )}
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              onChange={handleFileChange}
              aria-label="Upload file"
            />
          </label>
        </div>
      </div>
    </div>
  );
}

export { FileUpload };

// eslint-disable-next-line react/prop-types
const ProductTable = ({ eventsData, handleEdit }) => {
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-900 uppercase dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Event Name
            </th>
            <th scope="col" className="px-6 py-3">
              Event Type
            </th>
            <th scope="col" className="px-6 py-3">
              Start Date
            </th>
            <th scope="col" className="px-6 py-3">
              End Date
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
            <th scope="col" className="px-6 py-3">
              Add Details
            </th>
          </tr>
        </thead>
        <tbody>
          {eventsData.map((event, index) => (
            <tr key={index} className="bg-white dark:bg-gray-800">
              <td className="px-6 py-4">{event.eventName}</td>
              <td className="px-6 py-4">{event.eventType}</td>
              <td className="px-6 py-4">
                {event.startDate?.toLocaleDateString()}
              </td>
              <td className="px-6 py-4">
                {event.endDate?.toLocaleDateString()}
              </td>
              <td className="px-6 py-4">{event.status}</td>
              <td className="px-6 py-4">
                <button
                  onClick={() => handleEdit(index)}
                  className="bg-yellow-500 text-white py-1 px-4 rounded-lg"
                >
                  View
                </button>
              </td>
              <td className="px-6 py-4">
                <Link
                  to="newEventForm" // This is the id of the NewEventForm section
                  smooth={true}
                  offset={-70} // Optional, for adjusting scroll position
                  duration={500} // Smooth scroll duration in ms
                >
                  <button className="bg-yellow-500 text-white py-1 px-4 rounded-lg">
                    Add Event Details
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export { ProductTable };
