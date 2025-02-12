// // // import  { useState, useEffect } from "react";
// // // import { useParams, useNavigate } from "react-router-dom";
// // // import EventForm from "./EventForm";
// // // import CategoryForm from "./CategoryForm";

// // // const EventDetailsScreen = ({ events, updateEvent }) => {
// // //   const { eventId } = useParams();
// // //   const navigate = useNavigate();
// // //   const [eventData, setEventData] = useState(null);

// // //   useEffect(() => {
// // //     const selectedEvent = events.find(event => event.id === parseInt(eventId));
// // //     if (selectedEvent) {
// // //       setEventData({ ...selectedEvent });
// // //     }
// // //   }, [eventId, events]);

// // //   const handleInputChange = (e) => {
// // //     const { name, value } = e.target;
// // //     setEventData((prevData) => ({ ...prevData, [name]: value }));
// // //   };

// // //   const handleUpdate = () => {
// // //     updateEvent(eventData);
// // //     navigate(-1); // Navigate back to the events table
// // //   };

// // //   if (!eventData) return <p>Loading event details...</p>;

// // //   return (
// // //     <div id="checkall" className="container mx-auto p-6">
// // //       <h2 className="text-2xl font-semibold mb-4">Event Details</h2>
// // //       <EventForm eventData={eventData} handleInputChange={handleInputChange} />
// // //       <CategoryForm eventData={eventData} handleInputChange={handleInputChange} />
// // //       <div className="flex justify-end gap-4 mt-4">
// // //         <button
// // //           onClick={() => navigate(-1)}
// // //           className="px-4 py-2 bg-gray-300 rounded-lg"
// // //         >
// // //           Cancel
// // //         </button>
// // //         <button
// // //           onClick={handleUpdate}
// // //           className="px-4 py-2 bg-blue-600 text-white rounded-lg"
// // //         >
// // //           Update
// // //         </button>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default EventDetailsScreen;

// // import { useState, useEffect } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import { useNavigate, useParams } from "react-router-dom";
// // import DatePicker from "react-datepicker";
// // import "react-datepicker/dist/react-datepicker.css";
// // import { updateEvent } from "../store/eventsSlice";
// // import Newheader from "../Components/Newheader";
// // import MainSideBar from "../Components/MainSideBar";

// // const CheckAll = () => {
// //   const dispatch = useDispatch();
// //   const navigate = useNavigate();
// //   const { eventIndex } = useParams();
// //   const { events } = useSelector((state) => state.events);
// //   const currentEvent = events[parseInt(eventIndex)];

// //   // Event Form State
// //   const [eventData, setEventData] = useState({
// //     eventType: "",
// //     eventName: "",
// //     dateRange: {
// //       start: null,
// //       end: null,
// //     },
// //     file: null,
// //     qrFile: null,
// //     status: "inactive",
// //     bankName: "",
// //     accountNumber: "",
// //     ifscCode: "",
// //     accountHolderName: "",
// //   });

// //   // Event Details Form State
// //   const [eventDetails, setEventDetails] = useState({
// //     eventName: "",
// //     category: "",
// //     laps: "",
// //     participants: "",
// //     entryPrice: "",
// //   });

// //   useEffect(() => {
// //     if (currentEvent) {
// //       setEventData({
// //         eventType: currentEvent.eventType || "",
// //         eventName: currentEvent.eventName || "",
// //         dateRange: {
// //           start: currentEvent.startDate || null,
// //           end: currentEvent.endDate || null,
// //         },
// //         file: currentEvent.file || null,
// //         qrFile: currentEvent.qrFile || null,
// //         status: currentEvent.status || "inactive",
// //         bankName: currentEvent.bankName || "",
// //         accountNumber: currentEvent.accountNumber || "",
// //         ifscCode: currentEvent.ifscCode || "",
// //         accountHolderName: currentEvent.accountHolderName || "",
// //       });

// //       setEventDetails({
// //         eventName: currentEvent.eventDetailsName || "",
// //         category: currentEvent.category || "",
// //         laps: currentEvent.laps || "",
// //         participants: currentEvent.participants || "",
// //         entryPrice: currentEvent.entryPrice || "",
// //       });
// //     }
// //   }, [currentEvent]);

// //   const handleEventChange = (field, value) => {
// //     setEventData((prev) => ({
// //       ...prev,
// //       [field]: value,
// //     }));
// //   };

// //   const handleDetailsChange = (e) => {
// //     const { name, value } = e.target;
// //     setEventDetails((prev) => ({
// //       ...prev,
// //       [name]: value,
// //     }));
// //   };

// //   const handleFileChange = (e, type) => {
// //     if (e.target.files && e.target.files[0]) {
// //       const file = URL.createObjectURL(e.target.files[0]);
// //       handleEventChange(type, file);
// //     }
// //   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();

// //     const updatedEvent = {
// //       ...currentEvent,
// //       eventType: eventData.eventType,
// //       eventName: eventData.eventName,
// //       startDate: eventData.dateRange.start,
// //       endDate: eventData.dateRange.end,
// //       file: eventData.file,
// //       qrFile: eventData.qrFile,
// //       status: eventData.status,
// //       bankName: eventData.bankName,
// //       accountNumber: eventData.accountNumber,
// //       ifscCode: eventData.ifscCode,
// //       accountHolderName: eventData.accountHolderName,
// //       // Event Details
// //       eventDetailsName: eventDetails.eventName,
// //       category: eventDetails.category,
// //       laps: eventDetails.laps,
// //       participants: eventDetails.participants,
// //       entryPrice: eventDetails.entryPrice,
// //     };

// //     dispatch(
// //       updateEvent({
// //         index: parseInt(eventIndex),
// //         updatedEvent,
// //       })
// //     );

// //     navigate("/events");
// //   };

// //   return (
// //     <section className="w-full h-full">
// //       <div className="w-full overflow-auto p-6">
// //         <form onSubmit={handleSubmit} className="space-y-8">
// //           {/* Event Form Section */}
// //           <div className="bg-white p-6 rounded-lg shadow-md">
// //             <h2 className="text-2xl font-bold mb-6">Event Information</h2>

// //             <div className="grid grid-cols-2 gap-6">
// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700">
// //                   Event Type
// //                 </label>
// //                 <select
// //                   value={eventData.eventType}
// //                   onChange={(e) =>
// //                     handleEventChange("eventType", e.target.value)
// //                   }
// //                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
// //                 >
// //                   <option value="">Select Event Type</option>
// //                   <option>Autocross</option>
// //                   <option>Drag</option>
// //                   <option>Sprint</option>
// //                   <option>Rally</option>
// //                 </select>
// //               </div>

// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700">
// //                   Event Name
// //                 </label>
// //                 <input
// //                   type="text"
// //                   value={eventData.eventName}
// //                   onChange={(e) =>
// //                     handleEventChange("eventName", e.target.value)
// //                   }
// //                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
// //                 />
// //               </div>

// //               <div className="col-span-2">
// //                 <label className="block text-sm font-medium text-gray-700">
// //                   Date Range
// //                 </label>
// //                 <div className="flex gap-4">
// //                   <DatePicker
// //                     selected={eventData.dateRange.start}
// //                     onChange={(date) =>
// //                       handleEventChange("dateRange", {
// //                         ...eventData.dateRange,
// //                         start: date,
// //                       })
// //                     }
// //                     className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
// //                     placeholderText="Start Date"
// //                   />
// //                   <DatePicker
// //                     selected={eventData.dateRange.end}
// //                     onChange={(date) =>
// //                       handleEventChange("dateRange", {
// //                         ...eventData.dateRange,
// //                         end: date,
// //                       })
// //                     }
// //                     className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
// //                     placeholderText="End Date"
// //                   />
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Bank Details */}
// //             <div className="mt-6">
// //               <h3 className="text-lg font-semibold mb-4">Bank Details</h3>
// //               <div className="grid grid-cols-2 gap-6">
// //                 <div>
// //                   <label className="block text-sm font-medium text-gray-700">
// //                     Bank Name
// //                   </label>
// //                   <input
// //                     type="text"
// //                     value={eventData.bankName}
// //                     onChange={(e) =>
// //                       handleEventChange("bankName", e.target.value)
// //                     }
// //                     className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
// //                   />
// //                 </div>
// //                 <div>
// //                   <label className="block text-sm font-medium text-gray-700">
// //                     Account Number
// //                   </label>
// //                   <input
// //                     type="text"
// //                     value={eventData.accountNumber}
// //                     onChange={(e) =>
// //                       handleEventChange("accountNumber", e.target.value)
// //                     }
// //                     className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
// //                   />
// //                 </div>
// //                 <div>
// //                   <label className="block text-sm font-medium text-gray-700">
// //                     IFSC Code
// //                   </label>
// //                   <input
// //                     type="text"
// //                     value={eventData.ifscCode}
// //                     onChange={(e) =>
// //                       handleEventChange("ifscCode", e.target.value)
// //                     }
// //                     className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
// //                   />
// //                 </div>
// //                 <div>
// //                   <label className="block text-sm font-medium text-gray-700">
// //                     Account Holder Name
// //                   </label>
// //                   <input
// //                     type="text"
// //                     value={eventData.accountHolderName}
// //                     onChange={(e) =>
// //                       handleEventChange("accountHolderName", e.target.value)
// //                     }
// //                     className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
// //                   />
// //                 </div>
// //               </div>
// //             </div>

// //             {/* File Uploads */}
// //             <div className="mt-6 grid grid-cols-2 gap-6">
// //               <div>
// //                 <h3 className="text-lg font-semibold mb-4">Upload QR Code</h3>
// //                 <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
// //                   <div className="space-y-1 text-center">
// //                     {eventData.qrFile ? (
// //                       <div className="relative">
// //                         <img
// //                           src={eventData.qrFile}
// //                           alt="QR Code"
// //                           className="h-32 w-auto mx-auto"
// //                         />
// //                         <button
// //                           type="button"
// //                           onClick={() => handleEventChange("qrFile", null)}
// //                           className="mt-2 px-3 py-1 text-sm text-red-600 hover:text-red-800"
// //                         >
// //                           Remove
// //                         </button>
// //                       </div>
// //                     ) : (
// //                       <div className="text-gray-600">
// //                         <label className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
// //                           <span>Upload a file</span>
// //                           <input
// //                             type="file"
// //                             className="sr-only"
// //                             onChange={(e) => handleFileChange(e, "qrFile")}
// //                           />
// //                         </label>
// //                       </div>
// //                     )}
// //                   </div>
// //                 </div>
// //               </div>

// //               <div>
// //                 <h3 className="text-lg font-semibold mb-4">Upload Banner</h3>
// //                 <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
// //                   <div className="space-y-1 text-center">
// //                     {eventData.file ? (
// //                       <div className="relative">
// //                         <img
// //                           src={eventData.file}
// //                           alt="Banner"
// //                           className="h-32 w-auto mx-auto"
// //                         />
// //                         <button
// //                           type="button"
// //                           onClick={() => handleEventChange("file", null)}
// //                           className="mt-2 px-3 py-1 text-sm text-red-600 hover:text-red-800"
// //                         >
// //                           Remove
// //                         </button>
// //                       </div>
// //                     ) : (
// //                       <div className="text-gray-600">
// //                         <label className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
// //                           <span>Upload a file</span>
// //                           <input
// //                             type="file"
// //                             className="sr-only"
// //                             onChange={(e) => handleFileChange(e, "file")}
// //                           />
// //                         </label>
// //                       </div>
// //                     )}
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Status */}
// //             <div className="mt-6">
// //               <h3 className="text-lg font-semibold mb-4">Status</h3>
// //               <div className="flex gap-4">
// //                 <label className="inline-flex items-center">
// //                   <input
// //                     type="radio"
// //                     value="active"
// //                     checked={eventData.status === "active"}
// //                     onChange={(e) =>
// //                       handleEventChange("status", e.target.value)
// //                     }
// //                     className="form-radio h-4 w-4 text-blue-600"
// //                   />
// //                   <span className="ml-2">Active</span>
// //                 </label>
// //                 <label className="inline-flex items-center">
// //                   <input
// //                     type="radio"
// //                     value="inactive"
// //                     checked={eventData.status === "inactive"}
// //                     onChange={(e) =>
// //                       handleEventChange("status", e.target.value)
// //                     }
// //                     className="form-radio h-4 w-4 text-blue-600"
// //                   />
// //                   <span className="ml-2">Inactive</span>
// //                 </label>
// //               </div>
// //             </div>
// //           </div>

// //           {/* Event Details Form Section */}
// //           <div className="bg-white p-6 rounded-lg shadow-md">
// //             <h2 className="text-2xl font-bold mb-6">Event Details</h2>

// //             <div className="space-y-6">
// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700">
// //                   Event Name
// //                 </label>
// //                 <input
// //                   type="text"
// //                   name="eventName"
// //                   value={eventDetails.eventName}
// //                   onChange={handleDetailsChange}
// //                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
// //                 />
// //               </div>

// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700">
// //                   Category
// //                 </label>
// //                 <select
// //                   name="category"
// //                   value={eventDetails.category}
// //                   onChange={handleDetailsChange}
// //                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
// //                 >
// //                   <option value="">Select Category</option>
// //                   <option>Autocross</option>
// //                   <option>Drag</option>
// //                   <option>Sprint</option>
// //                   <option>Rally</option>
// //                 </select>
// //               </div>

// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700">
// //                   Number of Laps
// //                 </label>
// //                 <input
// //                   type="number"
// //                   name="laps"
// //                   value={eventDetails.laps}
// //                   onChange={handleDetailsChange}
// //                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
// //                 />
// //               </div>

// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700">
// //                   Number of Participants
// //                 </label>
// //                 <input
// //                   type="number"
// //                   name="participants"
// //                   value={eventDetails.participants}
// //                   onChange={handleDetailsChange}
// //                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
// //                 />
// //               </div>

// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700">
// //                   Entry Price
// //                 </label>
// //                 <input
// //                   type="number"
// //                   name="entryPrice"
// //                   value={eventDetails.entryPrice}
// //                   onChange={handleDetailsChange}
// //                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
// //                 />
// //               </div>
// //             </div>
// //           </div>

// //           {/* Form Actions */}
// //           <div className="flex justify-end gap-4">
// //             <button
// //               type="button"
// //               onClick={() => navigate("/events")}
// //               className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
// //             >
// //               Cancel
// //             </button>
// //             <button
// //               type="submit"
// //               className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
// //             >
// //               Save Changes
// //             </button>
// //           </div>
// //         </form>
// //       </div>
// //     </section>
// //   );
// // };

// // export default CheckAll;




// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useParams } from "react-router-dom";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { updateEvent } from "../store/eventsSlice";
// import Newheader from "../Components/Newheader";
// import MainSideBar from "../Components/MainSideBar";

// const CheckAll = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { eventIndex } = useParams();
//   const { events } = useSelector((state) => state.events);
//   const currentEvent = events?.[parseInt(eventIndex)] || null;

//   const [eventData, setEventData] = useState(null);
//   const [eventDetails, setEventDetails] = useState(null);
  

//   useEffect(() => {
//     console.log("Events Array:", events);  // Debugging: Check if events exist
//     console.log("Event Index:", eventIndex); // Debugging: Check eventIndex value
//     console.log("Current Event:", currentEvent); // Debugging: Check if current event is found
  
//     if (currentEvent) {
//       setEventData({
//         eventType: currentEvent.eventType || "",
//         eventName: currentEvent.eventName || "",
//         dateRange: {
//           start: currentEvent.startDate || null,
//           end: currentEvent.endDate || null,
//         },
//         file: currentEvent.file || null,
//         qrFile: currentEvent.qrFile || null,
//         status: currentEvent.status || "inactive",
//         bankName: currentEvent.bankName || "",
//         accountNumber: currentEvent.accountNumber || "",
//         ifscCode: currentEvent.ifscCode || "",
//         accountHolderName: currentEvent.accountHolderName || "",
//       });
  
//       setEventDetails({
//         eventName: currentEvent.eventDetailsName || "",
//         category: currentEvent.category || "",
//         laps: currentEvent.laps || "",
//         participants: currentEvent.participants || "",
//         entryPrice: currentEvent.entryPrice || "",
//       });
//     } else {
//       console.warn("No event found for index:", eventIndex);
//     }
//   }, [currentEvent, eventIndex, events]);
//   console.log("currentEvent", currentEvent)

//   if (!currentEvent) {
//     return <p className="text-red-500">No event found! Check the URL or data source.</p>;
//   }
  
//   const handleEventChange = (field, value) => {
//     setEventData((prev) => ({ ...prev, [field]: value }));
//   };

//   const handleDetailsChange = (e) => {
//     const { name, value } = e.target;
//     setEventDetails((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleFileChange = (e, type) => {
//     if (e.target.files && e.target.files[0]) {
//       const file = URL.createObjectURL(e.target.files[0]);
//       handleEventChange(type, file);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const updatedEvent = {
//       ...currentEvent,
//       eventType: eventData.eventType,
//       eventName: eventData.eventName,
//       startDate: eventData.dateRange.start,
//       endDate: eventData.dateRange.end,
//       file: eventData.file,
//       qrFile: eventData.qrFile,
//       status: eventData.status,
//       bankName: eventData.bankName,
//       accountNumber: eventData.accountNumber,
//       ifscCode: eventData.ifscCode,
//       accountHolderName: eventData.accountHolderName,
//       eventDetailsName: eventDetails.eventName,
//       category: eventDetails.category,
//       laps: eventDetails.laps,
//       participants: eventDetails.participants,
//       entryPrice: eventDetails.entryPrice,
//     };

//     dispatch(updateEvent({ index: parseInt(eventIndex), updatedEvent }));
//     navigate("/events");
//   };

//   return (
//     <section className="w-full h-full">
//       <div className="w-full overflow-auto p-6">
//         <form onSubmit={handleSubmit} className="space-y-8">
//           {/* Event Form */}
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <h2 className="text-2xl font-bold mb-6">Event Information</h2>

//             <div className="grid grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">
//                   Event Type
//                 </label>
//                 <select
//                   value={eventData.eventType}
//                   onChange={(e) => handleEventChange("eventType", e.target.value)}
//                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
//                 >
//                   <option value="">Select Event Type</option>
//                   <option>Autocross</option>
//                   <option>Drag</option>
//                   <option>Sprint</option>
//                   <option>Rally</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700">
//                   Event Name
//                 </label>
//                 <input
//                   type="text"
//                   value={eventData.eventName}
//                   onChange={(e) => handleEventChange("eventName", e.target.value)}
//                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
//                 />
//               </div>

//               <div className="col-span-2">
//                 <label className="block text-sm font-medium text-gray-700">
//                   Date Range
//                 </label>
//                 <div className="flex gap-4">
//                   <DatePicker
//                     selected={eventData.dateRange.start}
//                     onChange={(date) => handleEventChange("dateRange", { ...eventData.dateRange, start: date })}
//                     className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
//                     placeholderText="Start Date"
//                   />
//                   <DatePicker
//                     selected={eventData.dateRange.end}
//                     onChange={(date) => handleEventChange("dateRange", { ...eventData.dateRange, end: date })}
//                     className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
//                     placeholderText="End Date"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Event Details Form */}
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <h2 className="text-2xl font-bold mb-6">Event Details</h2>

//             <div className="grid grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Category</label>
//                 <input
//                   type="text"
//                   name="category"
//                   value={eventDetails.category}
//                   onChange={handleDetailsChange}
//                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Laps</label>
//                 <input
//                   type="text"
//                   name="laps"
//                   value={eventDetails.laps}
//                   onChange={handleDetailsChange}
//                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Submit Button */}
//           <div className="flex justify-end gap-4">
//             <button type="button" onClick={() => navigate("/events")} className="px-4 py-2 bg-gray-300 rounded-lg">
//               Cancel
//             </button>
//             <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg">
//               Update
//             </button>
//           </div>
//         </form>
//       </div>
//     </section>
//   );
// };

// export default CheckAll;



import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { updateEvent, updateEventDetail } from "../store/eventsSlice";

const CheckAll = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { events, selectedEvent, eventDetails } = useSelector((state) => state.events);

  const [formData, setFormData] = useState({
    // Event Form Data
    eventType: "",
    eventName: "",
    dateRange: {
      start: null,
      end: null,
    },
    status: "inactive",
    file: null,
    qrFile: null,
    
    // Bank Details
    bankName: "",
    accountNumber: "",
    ifscCode: "",
    accountHolderName: "",
    
    // Event Details
    category: "",
    laps: "",
    participants: "",
    entryPrice: "",
    eventDetailsName: ""
  });

  useEffect(() => {
    if (selectedEvent) {
      // Find associated event details
      const eventDetail = eventDetails.find(detail => detail.eventId === selectedEvent.id);
      
      setFormData({
        eventType: selectedEvent.eventType || "",
        eventName: selectedEvent.eventName || "",
        dateRange: {
          start: selectedEvent.startDate || null,
          end: selectedEvent.endDate || null,
        },
        status: selectedEvent.status || "inactive",
        file: selectedEvent.file || null,
        qrFile: selectedEvent.qrFile || null,
        bankName: selectedEvent.bankName || "",
        accountNumber: selectedEvent.accountNumber || "",
        ifscCode: selectedEvent.ifscCode || "",
        accountHolderName: selectedEvent.accountHolderName || "",
        category: eventDetail?.category || selectedEvent.category || "",
        laps: eventDetail?.laps || selectedEvent.laps || "",
        participants: eventDetail?.participants || selectedEvent.participants || "",
        entryPrice: eventDetail?.entryPrice || selectedEvent.entryPrice || "",
        eventDetailsName: eventDetail?.eventName || selectedEvent.eventDetailsName || ""
      });
    }
  }, [selectedEvent, eventDetails]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDateChange = (field, date) => {
    setFormData(prev => ({
      ...prev,
      dateRange: {
        ...prev.dateRange,
        [field]: date
      }
    }));
  };

  const handleFileChange = (e, type) => {
    if (e.target.files && e.target.files[0]) {
      const file = URL.createObjectURL(e.target.files[0]);
      handleInputChange(type, file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedEvent) {
      console.error("No event selected");
      return;
    }

    const eventIndex = events.findIndex(event => 
      event.eventName === selectedEvent.eventName && 
      event.eventType === selectedEvent.eventType
    );

    if (eventIndex === -1) {
      console.error("Event not found");
      return;
    }

    // Update main event data
    const updatedEvent = {
      ...selectedEvent,
      eventType: formData.eventType,
      eventName: formData.eventName,
      startDate: formData.dateRange.start,
      endDate: formData.dateRange.end,
      status: formData.status,
      file: formData.file,
      qrFile: formData.qrFile,
      bankName: formData.bankName,
      accountNumber: formData.accountNumber,
      ifscCode: formData.ifscCode,
      accountHolderName: formData.accountHolderName,
    };

    // Update event details
    const eventDetailIndex = eventDetails.findIndex(detail => detail.eventId === selectedEvent.id);
    const updatedEventDetail = {
      eventId: selectedEvent.id,
      category: formData.category,
      laps: formData.laps,
      participants: formData.participants,
      entryPrice: formData.entryPrice,
      eventName: formData.eventDetailsName
    };

    // Dispatch updates
    dispatch(updateEvent({ index: eventIndex, updatedEvent }));
    
    if (eventDetailIndex !== -1) {
      dispatch(updateEventDetail({ index: eventDetailIndex, updatedDetail: updatedEventDetail }));
    } else {
      dispatch(addEventDetail(updatedEventDetail));
    }

    navigate("/events");
  };

  if (!selectedEvent) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl text-gray-600">No event selected. Please select an event from the events list.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Event Information */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6">Event Information</h2>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Event Type</label>
              <select
                value={formData.eventType}
                onChange={(e) => handleInputChange("eventType", e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Event Type</option>
                <option>Autocross</option>
                <option>Drag</option>
                <option>Sprint</option>
                <option>Rally</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Event Name</label>
              <input
                type="text"
                value={formData.eventName}
                onChange={(e) => handleInputChange("eventName", e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700">Date Range</label>
              <div className="flex gap-4">
                <DatePicker
                  selected={formData.dateRange.start}
                  onChange={(date) => handleDateChange("start", date)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholderText="Start Date"
                />
                <DatePicker
                  selected={formData.dateRange.end}
                  onChange={(date) => handleDateChange("end", date)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholderText="End Date"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bank Details */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6">Bank Details</h2>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Bank Name</label>
              <input
                type="text"
                value={formData.bankName}
                onChange={(e) => handleInputChange("bankName", e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Account Number</label>
              <input
                type="text"
                value={formData.accountNumber}
                onChange={(e) => handleInputChange("accountNumber", e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">IFSC Code</label>
              <input
                type="text"
                value={formData.ifscCode}
                onChange={(e) => handleInputChange("ifscCode", e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Account Holder Name</label>
              <input
                type="text"
                value={formData.accountHolderName}
                onChange={(e) => handleInputChange("accountHolderName", e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* File Uploads */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6">Uploads</h2>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">QR Code</h3>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  {formData.qrFile ? (
                    <div className="relative">
                      <img src={formData.qrFile} alt="QR Code" className="h-32 w-auto mx-auto" />
                      <button
                        type="button"
                        onClick={() => handleInputChange("qrFile", null)}
                        className="mt-2 px-3 py-1 text-sm text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div className="text-gray-600">
                      <label className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500">
                        <span>Upload a file</span>
                        <input
                          type="file"
                          className="sr-only"
                          onChange={(e) => handleFileChange(e, "qrFile")}
                        />
                      </label>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Banner</h3>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  {formData.file ? (
                    <div className="relative">
                      <img src={formData.file} alt="Banner" className="h-32 w-auto mx-auto" />
                      <button
                        type="button"
                        onClick={() => handleInputChange("file", null)}
                        className="mt-2 px-3 py-1 text-sm text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div className="text-gray-600">
                      <label className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500">
                        <span>Upload a file</span>
                        <input
                          type="file"
                          className="sr-only"
                          onChange={(e) => handleFileChange(e, "file")}
                        />
                      </label>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Event Details */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6">Event Details</h2>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Event Name</label>
              <input
                type="text"
                value={formData.eventDetailsName}
                onChange={(e) => handleInputChange("eventDetailsName", e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <select
                value={formData.category}
                onChange={(e) => handleInputChange("category", e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Category</option>
                <option>Autocross</option>
                <option>Drag</option>
                <option>Sprint</option>
                <option>Rally</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Number of Laps</label>
              <input
                type="number"
                value={formData.laps}
                onChange={(e) => handleInputChange("laps", e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Number of Participants</label>
              <input
                type="number"
                value={formData.participants}
                onChange={(e) => handleInputChange("participants", e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Entry Price</label>
              <input
                type="number"
                value={formData.entryPrice}
                onChange={(e) => handleInputChange("entryPrice", e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6">Status</h2>
          <div className="flex gap-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="active"
                checked={formData.status === "active"}
                onChange={(e) => handleInputChange("status", e.target.value)}
                className="form-radio h-4 w-4 text-blue-600"
              />
              <span className="ml-2">Active</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="inactive"
                checked={formData.status === "inactive"}
                onChange={(e) => handleInputChange("status", e.target.value)}
                className="form-radio h-4 w-4 text-blue-600"
              />
              <span className="ml-2">Inactive</span>
            </label>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate("/events")}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckAll;