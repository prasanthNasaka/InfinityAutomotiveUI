// /* eslint-disable no-unused-vars */
// import { useState, useEffect } from "react";
// import Newheader from "../Components/Newheader";
// import MainSideBar from "../Components/MainSideBar";
// import DatePicker from "react-datepicker";
// import axios from "axios";
// import { BASE_URL } from "../constants/global-const";

// import "react-datepicker/dist/react-datepicker.css";
// import { FaCalendarAlt } from "react-icons/fa";

// import { CiEdit } from "react-icons/ci";
// import { MdOutlineDelete } from "react-icons/md";

// import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
// import { parse } from "postcss";

// const EventForm = () => {
//   const [eventData, setEventData] = useState({
//     eventType: 0,
//     eventName: "",
//     dateRange: { start: null, end: null },
//     status: 9,
//     bannerImage: null, // We will store the File object here
//     bankDetails: {
//       bankName: "",
//       accountHolderName: "",
//       accountNumber: "",
//       ifscCode: "",
//       qrCode: "", // Store the File object for QR code here
//     },
//   });

//   // console.log("jhgtds", EventForm);

//   const [editMode, setEditMode] = useState(false);
//   const [editId, setEditId] = useState(null);
//   const [submittedEvents, setSubmittedEvents] = useState([]);

//   const handleInputChange = (e, field) => {
//     setEventData({ ...eventData, [field]: e.target.value });
//   };

//   const handleBankDetailsChange = (e, field) => {
//     setEventData({
//       ...eventData,
//       bankDetails: {
//         ...eventData.bankDetails,
//         [field]: e.target.value,
//       },
//     });
//   };

//   const handleBannerImageChange = (e) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setEventData({ ...eventData, bannerImage: file });
//     }
//     e.target.value = ""; // Reset input to allow re-upload of the same file
//   };

//   const handleQRCodeChange = (e) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setEventData({
//         ...eventData,
//         bankDetails: {
//           ...eventData.bankDetails,
//           qrCode: file, // Store the file object for QR code
//         },
//       });
//     }
//     e.target.value = ""; // Reset input to allow re-upload of the same file
//   };

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   const payload = {
//   //     eventtype: eventData.eventType,
//   //     eventname: eventData.eventName,
//   //     startdate: eventData.dateRange.start.toISOString(),
//   //     enddate: eventData.dateRange.end.toISOString(),
//   //     isactive: eventData.status === "active" ? "true" : "false",
//   //     showdashboard: "true",
//   //     eventstatus: 0,
//   //     bankname: eventData.bankDetails.bankName,
//   //     ifsccode: eventData.bankDetails.ifscCode,
//   //     accountname: eventData.bankDetails.accountHolderName,
//   //     accountnum: eventData.bankDetails.accountNumber,
//   //     companyid: 1,
//   //     lstcat: eventData.categories.map((cat) => ({
//   //       evtCatId: 0,
//   //       evtCategory: cat.category,
//   //       noOfVeh: cat.participants,
//   //       status: "inactive",
//   //       nooflaps: cat.laps,
//   //       entryprice: cat.entryPrice,
//   //       wheelertype: 0,
//   //       eventId: 0,
//   //     })),
//   //   };
//   //   let banner = FormData.append("banner",eventData.bannerImage)

//   //   try {
//   //     const response = await axios.post(
//   //       `${BASE_URL}/api/EventRegistration`,
//   //       payload, banner

//   //     );
//   //     console.log("Event registered successfully:", response.data);
//   //     setSubmittedEvents([...submittedEvents, response.data]);
//   //     setEventData({
//   //       eventType: "",
//   //       eventName: "",
//   //       dateRange: { start: null, end: null },
//   //       status: "active",
//   //       bannerImage: "",
//   //       bankDetails: {
//   //         bankName: "",
//   //         accountHolderName: "",
//   //         accountNumber: "",
//   //         ifscCode: "",
//   //         qrCode: "",
//   //       },
//   //       categories: [],
//   //     });
//   //   } catch (error) {
//   //     console.error("Failed to register event:", error);
//   //   }
//   // };

//   // const handleEdit = (event) => {
//   //   setEditMode(true);
//   //   setEventData({
//   //     eventType: event.eventtype,
//   //     eventName: event.eventname,
//   //     dateRange: {
//   //       start: new Date(event.startdate),
//   //       end: new Date(event.enddate),
//   //     },
//   //     status: event.isactive === "true" ? "active" : "inactive",
//   //     bannerImage: "",
//   //     bankDetails: {
//   //       bankName: event.bankname,
//   //       accountHolderName: event.accountname,
//   //       accountNumber: event.accountnum,
//   //       ifscCode: event.ifsccode,
//   //       qrCode: "",
//   //     },
//   //     categories:
//   //       event.lstcat?.$values?.map((cat) => ({
//   //         id: cat.evtCatId,
//   //         category: cat.evtCategory,
//   //         laps: cat.nooflaps,
//   //         entryPrice: cat.entryprice,
//   //         participants: cat.noOfVeh,
//   //       })) || [],
//   //   });

//   //   setSubmittedEvents(
//   //     submittedEvents.filter((e) => e.eventname !== event.eventname)
//   //   );
//   // };

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();

//   //   // Create a FormData object
//   //   const formData = new FormData();
//   //   console.log("Dummy", eventData.bannerImage);

//   //   // Append the non-file fields to FormData
//   //   formData.append("eventtype", eventData.eventType);
//   //   formData.append("eventname", eventData.eventName);
//   //   formData.append("startdate", eventData.dateRange.start.toISOString());
//   //   formData.append("enddate", eventData.dateRange.end.toISOString());
//   //   formData.append(
//   //     "isactive",
//   //     eventData.status === "active" ? "true" : "false"
//   //   );
//   //   formData.append("showdashboard", "true");
//   //   formData.append("eventstatus", 0);
//   //   formData.append("bankname", eventData.bankDetails.bankName);
//   //   formData.append("ifsccode", eventData.bankDetails.ifscCode);
//   //   formData.append("accountname", eventData.bankDetails.accountHolderName);
//   //   formData.append("accountnum", eventData.bankDetails.accountNumber);
//   //   formData.append("companyid", 1);
//   //   formData.append("banner", eventData.bannerImage);

//   //   // Loop through categories and append them as JSON string
//   //   eventData.categories.forEach((cat) => {
//   //     formData.append(
//   //       "lstcat",
//   //       JSON.stringify({
//   //         evtCatId: 0,
//   //         evtCategory: cat.category,
//   //         noOfVeh: cat.participants,
//   //         status: "inactive",
//   //         nooflaps: cat.laps,
//   //         entryprice: cat.entryPrice,
//   //         wheelertype: 0,
//   //         eventId: 0,
//   //       })
//   //     );
//   //   });

//   //   // Append the banner image to FormData

//   //   try {
//   //     // Make the POST request with the FormData
//   //     const response = await axios.post(
//   //       `${BASE_URL}/api/EventRegistration`,
//   //       formData,
//   //       {
//   //         headers: {
//   //           "Content-Type": "multipart/form-data",
//   //         },
//   //       }
//   //     );
//   //     console.log("Event registered successfully:", response.data);

//   //     // Reset the form data
//   //     setSubmittedEvents([...submittedEvents, response.data]);
//   //     setEventData({
//   //       eventType: "",
//   //       eventName: "",
//   //       dateRange: { start: null, end: null },
//   //       status: "active",
//   //       bannerImage: "",
//   //       bankDetails: {
//   //         bankName: "",
//   //         accountHolderName: "",
//   //         accountNumber: "",
//   //         ifscCode: "",
//   //         qrCode: "",
//   //       },
//   //       categories: [],
//   //     });
//   //   } catch (error) {
//   //     console.error("Failed to register event:", error);
//   //   }
//   // };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("eventtype", eventData.eventType);
//     formData.append("eventname", eventData.eventName);
//     formData.append("startdate", eventData.dateRange.start.toISOString());
//     formData.append("enddate", eventData.dateRange.end.toISOString());
//     formData.append("isactive", eventData.status === "active" ? 9 : 8);
//     formData.append("eventstatus", 0);
//     formData.append("bankname", eventData.bankDetails.bankName);
//     formData.append("ifsccode", eventData.bankDetails.ifscCode);
//     formData.append("accountname", eventData.bankDetails.accountHolderName);
//     formData.append("accountnum", eventData.bankDetails.accountNumber);
//     formData.append("companyid", 1);

//     // Append the banner image (File object)
//     if (eventData.bannerImage) {
//       formData.append("banner", eventData.bannerImage);
//     }

//     // Append the QR Code image (File object)
//     if (eventData.bankDetails.qrCode) {
//       formData.append("qrCode", eventData.bankDetails.qrCode);
//     }

//     console.log("form data", formData);

//     try {
//       // Make the POST request with FormData
//       const response = await axios.post(
//         `${BASE_URL}/api/EventRegistration`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       console.log("Event registered successfully:", response.data);
//       const addCategory = response.data;
//       setEditId(addCategory);
//       // Reset the form data
//       setSubmittedEvents([...submittedEvents, response.data]);
//       setEventData({
//         eventType: "",
//         eventName: "",
//         dateRange: { start: null, end: null },
//         status: 1,
//         bannerImage: null,
//         bankDetails: {
//           bankName: "",
//           accountHolderName: "",
//           accountNumber: "",
//           ifscCode: "",
//           qrCode: "",
//         },
//       });
//     } catch (error) {
//       console.error("Failed to register event:", error);
//     }
//     setFormSubmitted(true);
//   };

//   const handleEdit = (event) => {
//     setEditMode(true);

//     // Pre-fill the form fields with the selected event's data
//     setEventData({
//       eventType: event.eventtype,
//       eventName: event.eventname,
//       dateRange: {
//         start: new Date(event.startdate),
//         end: new Date(event.enddate),
//       },
//       status: event.isactive === 8 ? 8 : 9,
//       bannerImage: "", // Assuming you're handling this later
//       bankDetails: {
//         bankName: event.bankname,
//         accountHolderName: event.accountname,
//         accountNumber: event.accountnum,
//         ifscCode: event.ifsccode,
//         qrCode: "",
//       },
//     });

//     // Update the event in the submitted events list
//     setSubmittedEvents((prevEvents) =>
//       prevEvents.map((e) =>
//         e.eventname === event.eventname ? { ...e, ...event } : e
//       )
//     );
//   };

//   const handleDelete = (eventName) => {
//     setSubmittedEvents(
//       submittedEvents.filter((event) => event.eventname !== eventName)
//     );
//   };

//   const handleDateChange = (date, key) => {
//     setEventData((prev) => ({
//       ...prev,
//       dateRange: { ...prev.dateRange, [key]: date },
//     }));
//   };

//   const handleDateInput = (e, key) => {
//     if (e.target && e.target.value) {
//       let input = e.target.value.replace(/\D/g, "");

//       if (input.length > 2) input = input.slice(0, 2) + "-" + input.slice(2);
//       if (input.length > 5) input = input.slice(0, 5) + "-" + input.slice(5);
//       if (input.length > 10) input = input.slice(0, 10);

//       e.target.value = input;

//       if (input.length === 10) {
//         const parsedDate = parse(input, "dd-MM-yyyy", new Date());

//         if (!isNaN(parsedDate.getTime())) {
//           const month = parsedDate.getMonth() + 1; // Month is 0-indexed

//           if (month >= 1 && month <= 12) {
//             // <-- Explicit month validation
//             setEventData((prev) => ({
//               ...prev,
//               dateRange: { ...prev.dateRange, [key]: parsedDate },
//             }));
//           } else {
//             // Handle invalid month (e.g., reset input, show error message)
//             e.target.value = ""; // Or previous valid date
//             alert("Invalid month. Please enter a value between 1 and 12.");
//           }
//         }
//       }
//     } else if (!e.target || !e.target.value) {
//       if (e.target && !e.target.value) {
//         handleDateChange(null, key);
//       }
//     }
//   };
//   const [formSubmitted, setFormSubmitted] = useState(false);

//   const navigate = useNavigate(); // Initialize useNavigate to programmatically navigate to the Categorys page

//   const handleRedirectToCategory = (eventId) => {
//     console.log("eventID", eventId);
//     const followingData = eventId.navigate(`/category/${eventId}`);
//   };

//   useEffect(() => {
//     axios
//       .get(`${BASE_URL}/api/EventRegistration`)
//       .then((response) => {
//         console.log("API Response:", response.data.$values); // Debugging
//         setSubmittedEvents(response.data.$values);
//       })
//       .catch((error) => {
//         console.error("There was an error!", error);
//       });
//   }, []);

//   return (
//     <section className="w-full h-full">
//       <div className="w-full h-24 overflow-y-hidden shadow-lg">
//         <Newheader />
//       </div>

//       <div className="flex w-full h-[calc(100vh-6rem)]">
//         <div className="bg-gray-100">
//           <MainSideBar />
//         </div>
//         <div id="form" className="w-full overflow-auto flex flex-col">
//           <section className="h-auto w-full flex p-6 justify-center items-center">
//             <form
//               onSubmit={handleSubmit}
//               className="w-full  flex flex-col gap-6 rounded-lg bg-white shadow-lg p-4"
//             >
//               <h2 className="text-2xl font-bold text-center">
//                 {editMode ? "Edit Event" : "Event Form"}
//               </h2>
//               <div className="flex gap-4">
//                 <div className="w-1/2 gap-2 flex flex-col">
//                   <label className="block text-sm font-bold text-gray-700">
//                     Event Type
//                   </label>
//                   <select
//                     value={eventData.eventType}
//                     onChange={(e) => handleInputChange(e, "eventType")}
//                     className="w-full p-2 border border-gray-300 rounded-lg focus:ring-cyan-500 focus:border-cyan-500"
//                     required
//                   >
//                     <option value="">Select Event Type</option>
//                     <option value={21}>Autocross</option>
//                     <option value={22}>DragRacing</option>
//                     <option value={23}> RallySprint </option>
//                     <option value={24}>StageRally</option>
//                   </select>
//                 </div>

//                 <div className="w-1/2 gap-2 flex flex-col">
//                   <label className="block text-sm font-bold text-gray-700">
//                     Event Name
//                   </label>
//                   <input
//                     type="text"
//                     value={eventData.eventName}
//                     onChange={(e) => handleInputChange(e, "eventName")}
//                     className="w-full p-2 border border-gray-300 rounded-lg focus:ring-cyan-500 focus:border-cyan-500"
//                     placeholder="Enter Event Name"
//                     required
//                   />
//                 </div>
//               </div>
//               <div className="flex w-full">
//                 <div className="w-1/2 flex gap-2 bg-gray-50 rounded-lg p-3 h-auto">
//                   <div className="flex w-1/2 flex-col gap-2">
//                     <div className="flex items-center">
//                       <label className="block w-full text-sm font-bold text-gray-700">
//                         Event Duration
//                       </label>
//                     </div>
//                     <div className="flex items-center justify-center gap-2 w-full">
//                       <div className="flex flex-col w-3/4 gap-3">
//                         <div className="relative w-60">
//                           <DatePicker
//                             selected={eventData.dateRange.start}
//                             onChange={(date) => handleDateChange(date, "start")}
//                             dateFormat="dd-MM-yyyy"
//                             className="w-full p-2 pl-10 border border-gray-300 rounded-lg focus:ring-cyan-500 focus:border-cyan-500"
//                             placeholderText="Start Date (dd-mm-yyyy)"
//                             minDate={new Date()}
//                             required
//                             onChangeRaw={(e) => handleDateInput(e, "start")}
//                             onBlur={(e) => {
//                               if (!e.target.value)
//                                 handleDateChange(null, "start");
//                             }}
//                           />
//                           <FaCalendarAlt className="absolute left-3 top-3 text-gray-500 pointer-events-none" />
//                         </div>

//                         <div className="relative w-60">
//                           <DatePicker
//                             selected={eventData.dateRange.end}
//                             onChange={(date) => handleDateChange(date, "end")}
//                             dateFormat="dd-MM-yyyy"
//                             className="w-full p-2 pl-10 border border-gray-300 rounded-lg focus:ring-cyan-500 focus:border-cyan-500"
//                             placeholderText="End Date (DD-MM-YYYY)"
//                             minDate={eventData.dateRange.start || new Date()}
//                             required
//                             onChangeRaw={(e) => handleDateInput(e, "end")}
//                             onBlur={(e) => {
//                               if (!e.target.value)
//                                 handleDateChange(null, "end");
//                             }}
//                           />
//                           <FaCalendarAlt className="absolute left-3 top-3 text-gray-500 pointer-events-none" />
//                         </div>
//                       </div>
//                     </div>
//                     <div className="space-y-4">
//                       <h3 className="text-lg font-bold">Status</h3>
//                       <div className="flex gap-4">
//                         <label className="flex items-center">
//                           <input
//                             type="radio"
//                             name="status"
//                             value={8}
//                             checked={eventData.status === 1}
//                             onChange={(e) => handleInputChange(e, "status")}
//                             className="w-4 h-4 text-cyan-600 border-gray-300"
//                           />
//                           <span className="ml-2 text-sm font-bold text-gray-700">
//                             Active
//                           </span>
//                         </label>
//                         <label className="flex items-center">
//                           <input
//                             type="radio"
//                             name="status"
//                             value={9}
//                             checked={eventData.status === 0}
//                             onChange={(e) => handleInputChange(e, "status")}
//                             className="w-4 h-4 text-cyan-600 border-gray-300"
//                           />
//                           <span className="ml-2 text-sm font-bold text-gray-700">
//                             Inactive
//                           </span>
//                         </label>
//                       </div>
//                     </div>
//                     <div className="w-full">
//                       <div className="w-full flex gap-2 bg-gray-50 rounded-lg p-1 h-auto">
//                         <div className="flex flex-col gap-2 w-3/4">
//                           <div className="w-full">
//                             <label className="block text-sm font-bold text-gray-700">
//                               Location
//                             </label>
//                             <input
//                               type="text"
//                               value={eventData.location}
//                               onChange={(e) => handleInputChange(e, "location")}
//                               className="w-full p-2 border border-gray-300 rounded-lg focus:ring-cyan-500 focus:border-cyan-500"
//                               placeholder="Enter Event Location"
//                               required
//                             />
//                           </div>

//                           <div className="w-full">
//                             <label className="block text-sm font-bold text-gray-700">
//                               Geo Location (URL)
//                             </label>
//                             <input
//                               type="text"
//                               value={eventData.geoLocation}
//                               onChange={(e) =>
//                                 handleInputChange(e, "geoLocation")
//                               }
//                               className="w-full p-2 border border-gray-300 rounded-lg focus:ring-cyan-500 focus:border-cyan-500"
//                               placeholder="Enter Geo Location URL"
//                               required
//                             />
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="w-1/2">
//                     <div className="flex flex-col gap-3">
//                       <h3 className="text-lg font-bold">Upload Banner</h3>
//                       <div className="flex items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100">
//                         {/* <label className="cursor-pointer w-full h-full flex items-center justify-center">
//                         {eventData.bannerImage ? (
//                           <div className="relative w-full h-full">
//                             <img
//                               src={URL.createObjectURL(eventData.bannerImage)} // Show image preview using File URL
//                               alt="Uploaded Banner"
//                               className="w-full h-full object-cover rounded-lg"
//                             />
//                             <button
//                               type="button"
//                               onClick={() =>
//                                 setEventData({
//                                   ...eventData,
//                                   bannerImage: null,
//                                 })
//                               }
//                               className="absolute bottom-2 right-2 bg-white text-gray-700 px-4 py-2 rounded-md shadow-md hover:bg-gray-200"
//                             >
//                               Re-upload
//                             </button>
//                           </div>
//                         ) : (
//                           <div className="text-center">
//                             <svg
//                               className="w-8 h-8 mb-2 text-gray-500 mx-auto"
//                               aria-hidden="true"
//                               xmlns="http://www.w3.org/2000/svg"
//                               fill="none"
//                               viewBox="0 0 20 16"
//                             >
//                               <path
//                                 stroke="currentColor"
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 strokeWidth="2"
//                                 d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
//                               />
//                             </svg>
//                             <p className="text-sm text-gray-500">
//                               <span className="font-bold">Click to upload</span>{" "}
//                               or drag and drop
//                             </p>
//                             <p className="text-xs text-gray-500">
//                               SVG, PNG, JPG, or GIF (MAX. 800x400px)
//                             </p>
//                           </div>
//                         )}
//                         <input
//                           type="file"
//                           className="hidden"
//                           onChange={handleBannerImageChange} // Attach the file handler
//                           accept="image/*"
//                         />
//                       </label> */}
//                         <label className="cursor-pointer w-full h-full flex items-center justify-center">
//                           {eventData.bannerImage ? (
//                             <div className="relative w-full h-full">
//                               {/* Check if the image source is a URL or a File */}
//                               <img
//                                 src={
//                                   typeof eventData.bannerImage === "string"
//                                     ? eventData.bannerImage // Use URL if it's a string
//                                     : URL.createObjectURL(eventData.bannerImage) // Use object URL if it's a file object
//                                 }
//                                 alt="Uploaded Banner"
//                                 className="w-full h-full object-cover rounded-lg"
//                               />
//                               <button
//                                 type="button"
//                                 onClick={() =>
//                                   setEventData({
//                                     ...eventData,
//                                     bannerImage: null, // Reset the banner image
//                                   })
//                                 }
//                                 className="absolute bottom-2 right-2 bg-white text-gray-700 px-4 py-2 rounded-md shadow-md hover:bg-gray-200"
//                               >
//                                 Re-upload
//                               </button>
//                             </div>
//                           ) : (
//                             <div className="text-center">
//                               <svg
//                                 className="w-8 h-8 mb-2 text-gray-500 mx-auto"
//                                 aria-hidden="true"
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 fill="none"
//                                 viewBox="0 0 20 16"
//                               >
//                                 <path
//                                   stroke="currentColor"
//                                   strokeLinecap="round"
//                                   strokeLinejoin="round"
//                                   strokeWidth="2"
//                                   d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
//                                 />
//                               </svg>
//                               <p className="text-sm text-gray-500">
//                                 <span className="font-bold">
//                                   Click to upload
//                                 </span>{" "}
//                                 or drag and drop
//                               </p>
//                               <p className="text-xs text-gray-500">
//                                 SVG, PNG, JPG, or GIF (MAX. 800x400px)
//                               </p>
//                             </div>
//                           )}
//                           <input
//                             type="file"
//                             className="hidden"
//                             onChange={handleBannerImageChange} // Handle file change here
//                             accept="image/*"
//                           />
//                         </label>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="w-1/2 bg-gray-100 p-3 rounded-lg">
//                   <div className="text-xl font-bold mb-4">Bank Details</div>
//                   <div className="flex gap-4">
//                     <div className="flex w-1/2">
//                       <div className="flex flex-col gap-3 w-full">
//                         <div className="space-y-2">
//                           <label className="block text-sm font-bold text-gray-700">
//                             Bank Name
//                           </label>
//                           <input
//                             type="text"
//                             value={eventData.bankDetails.bankName}
//                             onChange={(e) =>
//                               handleBankDetailsChange(e, "bankName")
//                             }
//                             className="w-full p-2 border border-gray-300 rounded-lg focus:ring-cyan-500 focus:border-cyan-500"
//                             placeholder="Enter Bank Name"
//                             required
//                           />
//                         </div>
//                         <div className="space-y-2">
//                           <label className="block text-sm font-bold text-gray-700">
//                             IFSC Code
//                           </label>
//                           <input
//                             type="text"
//                             value={eventData.bankDetails.ifscCode}
//                             onChange={(e) =>
//                               handleBankDetailsChange(e, "ifscCode")
//                             }
//                             className="w-full p-2 border border-gray-300 rounded-lg focus:ring-cyan-500 focus:border-cyan-500"
//                             placeholder="Enter IFSC Code"
//                             required
//                           />
//                         </div>
//                         <div className="space-y-2">
//                           <label className="block text-sm font-bold text-gray-700">
//                             Account Holder Name
//                           </label>
//                           <input
//                             type="text"
//                             value={eventData.bankDetails.accountHolderName}
//                             onChange={(e) =>
//                               handleBankDetailsChange(e, "accountHolderName")
//                             }
//                             className="w-full p-2 border border-gray-300 rounded-lg focus:ring-cyan-500 focus:border-cyan-500"
//                             placeholder="Enter Account Holder Name"
//                             required
//                           />
//                         </div>
//                         <div className="space-y-2">
//                           <label className="block text-sm font-bold text-gray-700">
//                             Account Number
//                           </label>
//                           <input
//                             type="text"
//                             value={eventData.bankDetails.accountNumber}
//                             onChange={(e) =>
//                               handleBankDetailsChange(e, "accountNumber")
//                             }
//                             className="w-full p-2 border border-gray-300 rounded-lg focus:ring-cyan-500 focus:border-cyan-500"
//                             placeholder="Enter Account Number"
//                             required
//                           />
//                         </div>
//                       </div>
//                     </div>

//                     <div className="w-1/2">
//                       <div className="flex flex-col gap-3">
//                         <h3 className="text-lg font-bold">Upload QR Code</h3>
//                         <div className="flex items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100">
//                           {/* <label className="cursor-pointer w-full h-full flex items-center justify-center">
//                           {eventData.bankDetails.qrCode ? (
//                             <div className="relative w-full h-full">
//                               <img
//                                 src={URL.createObjectURL(
//                                   eventData.bankDetails.qrCode
//                                 )} // Show QR code preview
//                                 alt="Uploaded QR Code"
//                                 className="w-full h-full object-cover rounded-lg"
//                               />
//                               <button
//                                 type="button"
//                                 onClick={() =>
//                                   setEventData({
//                                     ...eventData,
//                                     bankDetails: {
//                                       ...eventData.bankDetails,
//                                       qrCode: null, // Reset the QR code
//                                     },
//                                   })
//                                 }
//                                 className="absolute bottom-2 right-2 bg-white text-gray-700 px-4 py-2 rounded-md shadow-md hover:bg-gray-200"
//                               >
//                                 Re-upload
//                               </button>
//                             </div>
//                           ) : (
//                             <div className="text-center">
//                               <svg
//                                 className="w-8 h-8 mb-2 text-gray-500 mx-auto"
//                                 aria-hidden="true"
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 fill="none"
//                                 viewBox="0 0 20 16"
//                               >
//                                 <path
//                                   stroke="currentColor"
//                                   strokeLinecap="round"
//                                   strokeLinejoin="round"
//                                   strokeWidth="2"
//                                   d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
//                                 />
//                               </svg>
//                               <p className="text-sm text-gray-500">
//                                 <span className="font-bold">
//                                   Click to upload
//                                 </span>{" "}
//                                 or drag and drop
//                               </p>
//                               <p className="text-xs text-gray-500">
//                                 SVG, PNG, JPG, or GIF (MAX. 800x400px)
//                               </p>
//                             </div>
//                           )}
//                           <input
//                             type="file"
//                             className="hidden"
//                             onChange={handleQRCodeChange} // Attach the file handler for QR code
//                             accept="image/*"
//                           />
//                         </label> */}
//                           <label className="cursor-pointer w-full h-full flex items-center justify-center">
//                             {eventData.bankDetails.qrCode ? (
//                               <div className="relative w-full h-full">
//                                 {/* Check if the QR code is a URL or File */}
//                                 <img
//                                   src={
//                                     typeof eventData.bankDetails.qrCode ===
//                                     "string"
//                                       ? eventData.bankDetails.qrCode // Use URL if it's a string
//                                       : URL.createObjectURL(
//                                           eventData.bankDetails.qrCode
//                                         ) // Use object URL if it's a file object
//                                   }
//                                   alt="Uploaded QR Code"
//                                   className="w-full h-full object-cover rounded-lg"
//                                 />
//                                 <button
//                                   type="button"
//                                   onClick={() =>
//                                     setEventData({
//                                       ...eventData,
//                                       bankDetails: {
//                                         ...eventData.bankDetails,
//                                         qrCode: null, // Reset the QR code
//                                       },
//                                     })
//                                   }
//                                   className="absolute bottom-2 right-2 bg-white text-gray-700 px-4 py-2 rounded-md shadow-md hover:bg-gray-200"
//                                 >
//                                   Re-upload
//                                 </button>
//                               </div>
//                             ) : (
//                               <div className="text-center">
//                                 <svg
//                                   className="w-8 h-8 mb-2 text-gray-500 mx-auto"
//                                   aria-hidden="true"
//                                   xmlns="http://www.w3.org/2000/svg"
//                                   fill="none"
//                                   viewBox="0 0 20 16"
//                                 >
//                                   <path
//                                     stroke="currentColor"
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                     strokeWidth="2"
//                                     d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
//                                   />
//                                 </svg>
//                                 <p className="text-sm text-gray-500">
//                                   <span className="font-bold">
//                                     Click to upload
//                                   </span>{" "}
//                                   or drag and drop
//                                 </p>
//                                 <p className="text-xs text-gray-500">
//                                   SVG, PNG, JPG, or GIF (MAX. 800x400px)
//                                 </p>
//                               </div>
//                             )}
//                             <input
//                               type="file"
//                               className="hidden"
//                               onChange={handleQRCodeChange} // Handle file change for QR code
//                               accept="image/*"
//                             />
//                           </label>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="flex justify-end p-2">
//                 <button
//                   type="submit"
//                   className="bg-cyan-500 text-white py-2 px-6 rounded-lg hover:bg-cyan-600 transition-colors"
//                 >
//                   {editMode ? "Update Event" : "Submit Event"}
//                 </button>
//               </div>

//               {formSubmitted && (
//                 <div className="flex justify-between items-center">
//                   <button
//                     type="button"
//                     onClick={() => handleRedirectToCategory(editId)}
//                     className="flex items-center gap-2 bg-cyan-500 text-white py-2 px-4 rounded-lg hover:bg-cyan-600 transition-colors"
//                   >
//                     Add Class
//                   </button>
//                 </div>
//               )}
//             </form>
//           </section>

//           {submittedEvents.length > 0 && (
//             <section className="p-6">
//               <div className="w-full  mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
//                 <h2 className="text-xl font-bold p-4 bg-gray-50 border-b">
//                   Submitted Events
//                 </h2>
//                 <div className=" overflow-auto max-h-96">
//                   <table className="w-full h-full overflow-y-auto">
//                     <thead className="bg-gray-50">
//                       <tr>
//                         <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
//                           Event Name
//                         </th>
//                         <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
//                           Event Type
//                         </th>
//                         <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
//                           Status
//                         </th>
//                         <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
//                           Categories
//                         </th>
//                         <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
//                           Actions
//                         </th>
//                       </tr>
//                     </thead>
//                     <tbody className="bg-white divide-y divide-gray-200">
//                       {submittedEvents.map((event, index) => (
//                         <tr key={index}>
//                           <td className="px-6 py-4 whitespace-nowrap">
//                             {event.eventname}
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap">
//                             {event.eventtype}
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap">
//                             <span
//                               className={`px-2 inline-flex text-xs leading-5 font-bold rounded-full ${
//                                 event.isactive === 9
//                                   ? "bg-green-100 text-green-800"
//                                   : "bg-red-100 text-red-800"
//                               }`}
//                             >
//                               {event.isactive === 9 ? "Active" : "Inactive"}
//                             </span>
//                           </td>
//                           <td className="px-6 py-4  whitespace-nowrap">
//                             {event.lstcat?.$values?.length || 0}
//                           </td>
//                           <td className="px-6 py-4  whitespace-nowrap text-sm font-bold">
//                             <button
//                               onClick={() => handleEdit(event)}
//                               className="p-2 mr-2 bg-gray-50 border hover:bg-green-300 text-black rounded-lg transition-colors "
//                             >
//                               <CiEdit className="size-6" />
//                             </button>
//                             <button
//                               type="button"
//                               onClick={() => handleDelete(event.eventname)}
//                               className="p-2 bg-gray-50 border hover:bg-red-300 text-black rounded-lg transition-colors "
//                             >
//                               <MdOutlineDelete className="size-6" />
//                             </button>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </section>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// };
// export default EventForm;

import { useState, useEffect } from "react";
import Newheader from "../Components/Newheader";
import MainSideBar from "../Components/MainSideBar";
import DatePicker from "react-datepicker";
import axios from "axios";
import { BASE_URL } from "../constants/global-const";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { parse } from "date-fns"; // Changed from postcss to date-fns which is appropriate for date parsing

const EventForm = () => {
  // Base state structure with correct default values
  const [eventData, setEventData] = useState({
    eventType: "",
    eventName: "",
    dateRange: { start: null, end: null },
    status: 8, // Default to 8 (Active) as per the enum
    location: "",
    geoLocation: "",
    bannerImage: null,
    bankDetails: {
      bankName: "",
      accountHolderName: "",
      accountNumber: "",
      ifscCode: "",
      qrCode: null,
    },
  });

  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [submittedEvents, setSubmittedEvents] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const navigate = useNavigate();

  // Input handlers
  const handleInputChange = (e, field) => {
    setEventData({ ...eventData, [field]: e.target.value });
  };

  const handleBankDetailsChange = (e, field) => {
    setEventData({
      ...eventData,
      bankDetails: {
        ...eventData.bankDetails,
        [field]: e.target.value,
      },
    });
  };

  const handleBannerImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setEventData({ ...eventData, bannerImage: file });
    }
    e.target.value = ""; // Reset input to allow re-upload of the same file
  };

  const handleQRCodeChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setEventData({
        ...eventData,
        bankDetails: {
          ...eventData.bankDetails,
          qrCode: file,
        },
      });
    }
    e.target.value = ""; // Reset input to allow re-upload of the same file
  };

  const handleDateChange = (date, key) => {
    setEventData((prev) => ({
      ...prev,
      dateRange: { ...prev.dateRange, [key]: date },
    }));
  };

  const handleDateInput = (e, key) => {
    if (e.target && e.target.value) {
      let input = e.target.value.replace(/\D/g, "");

      if (input.length > 2) input = input.slice(0, 2) + "-" + input.slice(2);
      if (input.length > 5) input = input.slice(0, 5) + "-" + input.slice(5);
      if (input.length > 10) input = input.slice(0, 10);

      e.target.value = input;

      if (input.length === 10) {
        const parsedDate = parse(input, "dd-MM-yyyy", new Date());

        if (!isNaN(parsedDate.getTime())) {
          const month = parsedDate.getMonth() + 1; // Month is 0-indexed

          if (month >= 1 && month <= 12) {
            setEventData((prev) => ({
              ...prev,
              dateRange: { ...prev.dateRange, [key]: parsedDate },
            }));
          } else {
            e.target.value = "";
            alert("Invalid month. Please enter a value between 1 and 12.");
          }
        }
      }
    } else if (!e.target || !e.target.value) {
      if (e.target && !e.target.value) {
        handleDateChange(null, key);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("eventtype", eventData.eventType);
    formData.append("eventname", eventData.eventName);
    formData.append("startdate", eventData.dateRange.start.toISOString());
    formData.append("enddate", eventData.dateRange.end.toISOString());
    formData.append("isactive", eventData.status); // Use the status directly (8 or 9)
    formData.append("eventstatus", 0);
    formData.append("bankname", eventData.bankDetails.bankName);
    formData.append("ifsccode", eventData.bankDetails.ifscCode);
    formData.append("accountname", eventData.bankDetails.accountHolderName);
    formData.append("accountnum", eventData.bankDetails.accountNumber);
    formData.append("companyid", 1);
    formData.append("location", eventData.location || "");
    formData.append("geolocation", eventData.geoLocation || "");

    // Append the banner image (File object)
    if (eventData.bannerImage) {
      formData.append("banner", eventData.bannerImage);
    }

    // Append the QR Code image (File object)
    if (eventData.bankDetails.qrCode) {
      formData.append("qrCode", eventData.bankDetails.qrCode);
    }

    try {
      // Make the POST request with FormData
      const response = await axios.post(
        `${BASE_URL}/api/EventRegistration`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Event registered successfully:", response.data);
      const addCategory = response.data;
      setEditId(addCategory);
      // Reset the form data
      setSubmittedEvents([...submittedEvents, response.data]);
      resetForm();
      setFormSubmitted(true);
    } catch (error) {
      console.error("Failed to register event:", error);
    }
  };

  const eventTypeMapping = {
    21: "Autocross",
    22: "DragRacing",
    23: "RallySprint",
    24: "StageRally",
  };

  const resetForm = () => {
    setEventData({
      eventType: "",
      eventName: "",
      dateRange: { start: null, end: null },
      status: 8,
      location: "",
      geoLocation: "",
      bannerImage: null,
      bankDetails: {
        bankName: "",
        accountHolderName: "",
        accountNumber: "",
        ifscCode: "",
        qrCode: null,
      },
    });
  };

  const handleEdit = (event) => {
    setEditMode(true);

    // Pre-fill the form fields with the selected event's data
    setEventData({
      eventType: event.eventtype,
      eventName: event.eventname,
      dateRange: {
        start: new Date(event.startdate),
        end: new Date(event.enddate),
      },
      status: event.isactive, // Use the API's status value directly
      location: event.location || "",
      geoLocation: event.geolocation || "",
      bannerImage: event.banner || null, // Handle image URL
      bankDetails: {
        bankName: event.bankname,
        accountHolderName: event.accountname,
        accountNumber: event.accountnum,
        ifscCode: event.ifsccode,
        qrCode: event.qrcode || null,
      },
    });

    setEditId(event.id || event.eventId);
  };

  const handleDelete = (eventName) => {
    // Here you would typically call an API to delete the event
    // For now, just update the UI
    setSubmittedEvents(
      submittedEvents.filter((event) => event.eventname !== eventName)
    );
  };

  const handleRedirectToCategory = (eventId) => {
    navigate(`/category/${eventId}`);
  };

  // Load events on component mount
  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/EventRegistration`)
      .then((response) => {
        console.log("API Response:", response.data.$values);
        setSubmittedEvents(response.data.$values || []);
      })
      .catch((error) => {
        console.error("There was an error loading events!", error);
      });
  }, []);

  return (
    <section className="w-full h-full">
      <div className="w-full h-24 overflow-y-hidden shadow-lg">
        <Newheader />
      </div>

      <div className="flex w-full h-[calc(100vh-6rem)]">
        <div className="bg-gray-100">
          <MainSideBar />
        </div>
        <div id="form" className="w-full overflow-auto flex flex-col">
          <section className="h-auto w-full flex p-6 justify-center items-center">
            <form
              onSubmit={handleSubmit}
              className="w-full flex flex-col gap-6 rounded-lg bg-white shadow-lg p-4"
            >
              <h2 className="text-2xl font-bold text-center">
                {editMode ? "Edit Event" : "Event Form"}
              </h2>

              {/* Event Type and Name */}
              <div className="flex gap-4">
                <div className="w-1/2 gap-2 flex flex-col">
                  <label className="block text-sm font-bold text-gray-700">
                    Event Type
                  </label>
                  <select
                    value={eventData.eventType}
                    onChange={(e) => handleInputChange(e, "eventType")}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-cyan-500 focus:border-cyan-500"
                    required
                  >
                    <option value="">Select Event Type</option>
                    <option value={21}>Autocross</option>
                    <option value={22}>DragRacing</option>
                    <option value={23}>RallySprint</option>
                    <option value={24}>StageRally</option>
                  </select>
                </div>

                <div className="w-1/2 gap-2 flex flex-col">
                  <label className="block text-sm font-bold text-gray-700">
                    Event Name
                  </label>
                  <input
                    type="text"
                    value={eventData.eventName}
                    onChange={(e) => handleInputChange(e, "eventName")}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-cyan-500 focus:border-cyan-500"
                    placeholder="Enter Event Name"
                    required
                  />
                </div>
              </div>

              {/* Event Details and Bank Details */}
              <div className="flex w-full">
                {/* Left Column - Event Details */}
                <div className="w-1/2 flex gap-2 bg-gray-50 rounded-lg p-3 h-auto">
                  <div className="flex w-1/2 flex-col gap-2">
                    <div className="flex items-center">
                      <label className="block w-full text-sm font-bold text-gray-700">
                        Event Duration
                      </label>
                    </div>

                    {/* Date Pickers */}
                    <div className="flex items-center justify-center gap-2 w-full">
                      <div className="flex flex-col w-3/4 gap-3">
                        <div className="relative w-60">
                          <DatePicker
                            selected={eventData.dateRange.start}
                            onChange={(date) => handleDateChange(date, "start")}
                            dateFormat="dd-MM-yyyy"
                            className="w-full p-2 pl-10 border border-gray-300 rounded-lg focus:ring-cyan-500 focus:border-cyan-500"
                            placeholderText="Start Date (dd-mm-yyyy)"
                            minDate={new Date()}
                            required
                            onChangeRaw={(e) => handleDateInput(e, "start")}
                            onBlur={(e) => {
                              if (!e.target.value)
                                handleDateChange(null, "start");
                            }}
                          />
                          <FaCalendarAlt className="absolute left-3 top-3 text-gray-500 pointer-events-none" />
                        </div>

                        <div className="relative w-60">
                          <DatePicker
                            selected={eventData.dateRange.end}
                            onChange={(date) => handleDateChange(date, "end")}
                            dateFormat="dd-MM-yyyy"
                            className="w-full p-2 pl-10 border border-gray-300 rounded-lg focus:ring-cyan-500 focus:border-cyan-500"
                            placeholderText="End Date (DD-MM-YYYY)"
                            minDate={eventData.dateRange.start || new Date()}
                            required
                            onChangeRaw={(e) => handleDateInput(e, "end")}
                            onBlur={(e) => {
                              if (!e.target.value)
                                handleDateChange(null, "end");
                            }}
                          />
                          <FaCalendarAlt className="absolute left-3 top-3 text-gray-500 pointer-events-none" />
                        </div>
                      </div>
                    </div>

                    {/* Status Radio Buttons - FIXED */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-bold">Status</h3>
                      <div className="flex gap-4">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="status"
                            value={8} // Enum value for Active
                            checked={eventData.status == 8} // Use comparison operator, not assignment
                            onChange={(e) => handleInputChange(e, "status")}
                            className="w-4 h-4 text-cyan-600 border-gray-300"
                          />
                          <span className="ml-2 text-sm font-bold text-gray-700">
                            Active
                          </span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="status"
                            value={9} // Enum value for Inactive
                            checked={eventData.status == 9} // Use comparison operator, not assignment
                            onChange={(e) => handleInputChange(e, "status")}
                            className="w-4 h-4 text-cyan-600 border-gray-300"
                          />
                          <span className="ml-2 text-sm font-bold text-gray-700">
                            Inactive
                          </span>
                        </label>
                      </div>
                    </div>

                    {/* Location Fields */}
                    <div className="w-full">
                      <div className="w-full flex gap-2 bg-gray-50 rounded-lg p-1 h-auto">
                        <div className="flex flex-col gap-2 w-3/4">
                          <div className="w-full">
                            <label className="block text-sm font-bold text-gray-700">
                              Location
                            </label>
                            <input
                              type="text"
                              value={eventData.location || ""}
                              onChange={(e) => handleInputChange(e, "location")}
                              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-cyan-500 focus:border-cyan-500"
                              placeholder="Enter Event Location"
                              required
                            />
                          </div>

                          <div className="w-full">
                            <label className="block text-sm font-bold text-gray-700">
                              Geo Location (URL)
                            </label>
                            <input
                              type="text"
                              value={eventData.geoLocation || ""}
                              onChange={(e) =>
                                handleInputChange(e, "geoLocation")
                              }
                              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-cyan-500 focus:border-cyan-500"
                              placeholder="Enter Geo Location URL"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Banner Image Upload */}
                  <div className="w-1/2">
                    <div className="flex flex-col gap-3">
                      <h3 className="text-lg font-bold">Upload Banner</h3>
                      <div className="flex items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100">
                        <label className="cursor-pointer w-full h-full flex items-center justify-center">
                          {eventData.bannerImage ? (
                            <div className="relative w-full h-full">
                              <img
                                src={
                                  typeof eventData.bannerImage === "string"
                                    ? eventData.bannerImage
                                    : URL.createObjectURL(eventData.bannerImage)
                                }
                                alt="Uploaded Banner"
                                className="w-full h-full object-cover rounded-lg"
                              />
                              <button
                                type="button"
                                onClick={() =>
                                  setEventData({
                                    ...eventData,
                                    bannerImage: null,
                                  })
                                }
                                className="absolute bottom-2 right-2 bg-white text-gray-700 px-4 py-2 rounded-md shadow-md hover:bg-gray-200"
                              >
                                Re-upload
                              </button>
                            </div>
                          ) : (
                            <div className="text-center">
                              <svg
                                className="w-8 h-8 mb-2 text-gray-500 mx-auto"
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
                              <p className="text-sm text-gray-500">
                                <span className="font-bold">
                                  Click to upload
                                </span>{" "}
                                or drag and drop
                              </p>
                              <p className="text-xs text-gray-500">
                                SVG, PNG, JPG, or GIF (MAX. 800x400px)
                              </p>
                            </div>
                          )}
                          <input
                            type="file"
                            className="hidden"
                            onChange={handleBannerImageChange}
                            accept="image/*"
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Bank Details */}
                <div className="w-1/2 bg-gray-100 p-3 rounded-lg">
                  <div className="text-xl font-bold mb-4">Bank Details</div>
                  <div className="flex gap-4">
                    <div className="flex w-1/2">
                      <div className="flex flex-col gap-3 w-full">
                        <div className="space-y-2">
                          <label className="block text-sm font-bold text-gray-700">
                            Bank Name
                          </label>
                          <input
                            type="text"
                            value={eventData.bankDetails.bankName}
                            onChange={(e) =>
                              handleBankDetailsChange(e, "bankName")
                            }
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-cyan-500 focus:border-cyan-500"
                            placeholder="Enter Bank Name"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="block text-sm font-bold text-gray-700">
                            IFSC Code
                          </label>
                          <input
                            type="text"
                            value={eventData.bankDetails.ifscCode}
                            onChange={(e) =>
                              handleBankDetailsChange(e, "ifscCode")
                            }
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-cyan-500 focus:border-cyan-500"
                            placeholder="Enter IFSC Code"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="block text-sm font-bold text-gray-700">
                            Account Holder Name
                          </label>
                          <input
                            type="text"
                            value={eventData.bankDetails.accountHolderName}
                            onChange={(e) =>
                              handleBankDetailsChange(e, "accountHolderName")
                            }
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-cyan-500 focus:border-cyan-500"
                            placeholder="Enter Account Holder Name"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="block text-sm font-bold text-gray-700">
                            Account Number
                          </label>
                          <input
                            type="text"
                            value={eventData.bankDetails.accountNumber}
                            onChange={(e) =>
                              handleBankDetailsChange(e, "accountNumber")
                            }
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-cyan-500 focus:border-cyan-500"
                            placeholder="Enter Account Number"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    {/* QR Code Upload */}
                    <div className="w-1/2">
                      <div className="flex flex-col gap-3">
                        <h3 className="text-lg font-bold">Upload QR Code</h3>
                        <div className="flex items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100">
                          <label className="cursor-pointer w-full h-full flex items-center justify-center">
                            {eventData.bankDetails.qrCode ? (
                              <div className="relative w-full h-full">
                                <img
                                  src={
                                    typeof eventData.bankDetails.qrCode ===
                                    "string"
                                      ? eventData.bankDetails.qrCode
                                      : URL.createObjectURL(
                                          eventData.bankDetails.qrCode
                                        )
                                  }
                                  alt="Uploaded QR Code"
                                  className="w-full h-full object-cover rounded-lg"
                                />
                                <button
                                  type="button"
                                  onClick={() =>
                                    setEventData({
                                      ...eventData,
                                      bankDetails: {
                                        ...eventData.bankDetails,
                                        qrCode: null,
                                      },
                                    })
                                  }
                                  className="absolute bottom-2 right-2 bg-white text-gray-700 px-4 py-2 rounded-md shadow-md hover:bg-gray-200"
                                >
                                  Re-upload
                                </button>
                              </div>
                            ) : (
                              <div className="text-center">
                                <svg
                                  className="w-8 h-8 mb-2 text-gray-500 mx-auto"
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
                                <p className="text-sm text-gray-500">
                                  <span className="font-bold">
                                    Click to upload
                                  </span>{" "}
                                  or drag and drop
                                </p>
                                <p className="text-xs text-gray-500">
                                  SVG, PNG, JPG, or GIF (MAX. 800x400px)
                                </p>
                              </div>
                            )}
                            <input
                              type="file"
                              className="hidden"
                              onChange={handleQRCodeChange}
                              accept="image/*"
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end p-2">
                <button
                  type="submit"
                  className="bg-cyan-500 text-white py-2 px-6 rounded-lg hover:bg-cyan-600 transition-colors"
                >
                  {editMode ? "Update Event" : "Submit Event"}
                </button>
              </div>

              {formSubmitted && (
                <div className="flex justify-between items-center">
                  <button
                    type="button"
                    onClick={() => handleRedirectToCategory(editId)}
                    className="flex items-center gap-2 bg-cyan-500 text-white py-2 px-4 rounded-lg hover:bg-cyan-600 transition-colors"
                  >
                    Add Class
                  </button>
                </div>
              )}
            </form>
          </section>

          {/* Submitted Events Table */}
          {submittedEvents.length > 0 && (
            <section className="p-6">
              <div className="w-full mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
                <h2 className="text-xl font-bold p-4 bg-gray-50 border-b">
                  Submitted Events
                </h2>
                <div className="overflow-auto max-h-96">
                  <table className="w-full h-full overflow-y-auto">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                          Event Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                          Event Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                          Categories
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {submittedEvents.map((event, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {event.eventname}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {eventTypeMapping[event.eventtype] || "Unknown"}{" "}
                            {/* Fallback if value not found */}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-bold rounded-full ${
                                event.isactive == 8
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {event.isactive == 8 ? "Active" : "Inactive"}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {event.lstcat?.$values?.length || 0}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-bold">
                            <button
                              onClick={() => handleEdit(event)}
                              className="p-2 mr-2 bg-gray-50 border hover:bg-green-300 text-black rounded-lg transition-colors"
                            >
                              <CiEdit className="size-6" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDelete(event.eventname)}
                              className="p-2 bg-gray-50 border hover:bg-red-300 text-black rounded-lg transition-colors "
                            >
                              <MdOutlineDelete className="size-6" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
    </section>
  );
};
export default EventForm;
