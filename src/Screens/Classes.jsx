// /* eslint-disable no-unused-vars */

// import MainSideBar from "../Components/MainSideBar";
// import Newheader from "../Components/Newheader";
// import { useEffect, useState } from "react";
// import { BASE_URL } from "../constants/global-const";
// import axios from "axios";
// import { MdOutlineDelete } from "react-icons/md";
// import { CiEdit } from "react-icons/ci";
// import toast, { Toaster } from "react-hot-toast";

// const Classes = () => {
//   const [selectedEvent, setSelectedEvent] = useState(null);
//   const [events, setEvents] = useState([]);
//   const [eventCategories, setEventCategories] = useState([]);
//   const [newCategory, setNewCategory] = useState({
//     evtCategory: "",
//     noOfVeh: 0,
//     status: "1",
//     nooflaps: 0,
//     entryprice: 0,
//     wheelertype: 0,
//     template: "",
//   });

//   const [editCategory, setEditCategory] = useState(null);
//   const [templates, setTemplates] = useState([]);

//   // Fetch Event Data
//   const handleGetData = async () => {
//     try {
//       const response = await axios.get(
//         `${BASE_URL}/api/EventRegistration/names`
//       );
//       setEvents(response.data.$values);
//     } catch (error) {
//       console.error("Error fetching events:", error);
//     }
//   };

//   // Fetch Template Data
//   const fetchTemplates = async () => {
//     try {
//       const response = await axios.get(
//         `${BASE_URL}/api/Scrutiny/Template`
//       );
//       setTemplates(response.data.$values || []);
//     } catch (error) {
//       console.error("Error fetching templates:", error);
//       toast.error("Error fetching templates");
//     }
//   };

//   const handleEventChange = (event) => {
//     const eventId = event.target.value;
//     setSelectedEvent(eventId);
//     if (eventId) {
//       axios
//         .get(`${BASE_URL}/api/eventcategories?event_id=${eventId}`)
//         .then((response) => {
//           setEventCategories(response.data.$values || []);
//         })
//         .catch((error) => {
//           console.error("Error fetching event categories:", error);
//           setEventCategories([]);
//         });
//     } else {
//       setEventCategories([]);
//     }
//   };

//   const handleSubmitCategory = async (e) => {
//     e.preventDefault();
//     if (
//       !newCategory.evtCategory ||
//       !newCategory.noOfVeh ||
//       !newCategory.nooflaps ||
//       !newCategory.entryprice ||
//       !newCategory.wheelertype ||
//       !newCategory.template
//     ) {
//       toast.error("Please fill all the required fields!");
//       return;
//     }

//     if (!selectedEvent) {
//       toast.error("Please select an event first!");
//       return;
//     }

//     const categoryData = {
//       evtCatId: editCategory ? editCategory.evtCatId : 0,
//       evtCategory: newCategory.evtCategory,
//       noOfVeh: newCategory.noOfVeh,
//       status: newCategory.status,
//       nooflaps: newCategory.nooflaps,
//       entryprice: newCategory.entryprice,
//       wheelertype: newCategory.wheelertype,
//       eventId: selectedEvent,
//       template: newCategory.template,
//     };

//     try {
//       let response;
//       if (editCategory) {
//         response = await axios.put(
//           `${BASE_URL}/api/eventcategories/${editCategory.evtCatId}`,
//           categoryData
//         );
//         toast.success("Class updated successfully!");
//         setEditCategory(null);
//       } else {
//         response = await axios.post(
//           `${BASE_URL}/api/eventcategories`,
//           categoryData
//         );
//         toast.success("Class added successfully!");
//       }

//       resetForm();
//       handleEventChange({ target: { value: selectedEvent } });
//     } catch (error) {
//       console.error("Error saving category:", error);
//       toast.error("An error occurred while saving the class.");
//     }
//   };

//   const handleEditCategory = (category) => {
//     setEditCategory(category);
//     setNewCategory({
//       evtCategory: category.evtCategory,
//       noOfVeh: category.noOfVeh,
//       status: category.status,
//       nooflaps: category.nooflaps,
//       entryprice: category.entryprice,
//       wheelertype: category.wheelertype,
//       template: category.template || "",
//     });
//   };

//   const handleDeleteCategory = async (categoryId) => {
//     try {
//       await axios.delete(`${BASE_URL}/api/eventcategories/${categoryId}`);
//       toast("Class deleted successfully!");
//       handleEventChange({ target: { value: selectedEvent } });
//     } catch (error) {
//       console.error("Error deleting category:", error);
//       toast("An error occurred while deleting the category.");
//     }
//   };

//   const resetForm = () => {
//     setNewCategory({
//       evtCategory: "",
//       noOfVeh: 0,
//       status: "1",
//       nooflaps: 0,
//       entryprice: 0,
//       wheelertype: 0,
//       template: "",
//     });
//     setEditCategory(null);
//   };

//   useEffect(() => {
//     handleGetData();
//     fetchTemplates();
//   }, []);

//   return (
//     <>
//       <Toaster position="bottom-center" reverseOrder={false} />
//       <section className="w-full h-screen flex flex-col">
//         <div className="overflow-y-hidden shadow-lg ">
//           <Newheader />
//         </div>
//         <div className="flex w-full h-[calc(100vh-1rem)]">
//           <div className="bg-gray-100">
//             <MainSideBar />
//           </div>
//           <div className="flex w-full flex-col overflow-auto p-4 gap-4">
//             <div className="w-full flex flex-col gap-2 tab:flex-col">
//             <h3 className="text-2xl font-bold mb-4 text-gray-800 text-center">
//                 {editCategory ? "Edit Class" : "Add Class"}
//               </h3>

//               <div className="w-1/2 tab:w-full">
//                 <label className="text-sm font-medium text-white">
//                   Event Name
//                 </label>
//                 <select
//                   value={selectedEvent}
//                   onChange={handleEventChange}
//                   className="w-full h-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5"
//                 >
//                   <option value="">Choose Event</option>
//                   {events.map((event) => (
//                     <option key={event.eventid} value={event.eventid}>
//                       {event.eventname}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>

//             {/* <div className="w-full p-4 bg-white border rounded-lg shadow-lg">
//               <h3 className="text-xl font-bold mb-4">{editCategory ? "Edit Class" : "Add Class"}</h3>
//               <div className="grid grid-cols-6 gap-4 mb-4">
//                 <div className="col-span-1">
//                   <label className="block text-sm font-bold text-gray-700">Category Type</label>
//                   <select
//                     value={newCategory.wheelertype}
//                     onChange={(e) => setNewCategory({ ...newCategory, wheelertype: e.target.value })}
//                     className="w-full p-2 border border-gray-300 rounded-lg"
//                     required
//                   >
//                     <option value={0}>Select Category</option>
//                     <option value={51}>TwoWheeler</option>
//                     <option value={52}>FourWheeler</option>
//                     <option value={53}>Karting</option>
//                     <option value={54}>GrassRoots</option>
//                     <option value={75}>ESPORTS</option>
//                   </select>
//                 </div>

//                 <div className="col-span-1">
//                   <label className="block text-sm font-bold text-gray-700">Template</label>
//                   <select
//                     value={newCategory.template}
//                     onChange={(e) => setNewCategory({ ...newCategory, template: e.target.value })}
//                     className="w-full p-2 border border-gray-300 rounded-lg"
//                     required
//                   >
//                     <option value="">Select Template</option>
//                     {templates.map((template, index) => (
//                       <option key={index} value={template}>
//                         {template || "Default"}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <div className="col-span-2">
//                   <label className="block text-sm font-bold text-gray-700">Class Name</label>
//                   <input
//                     type="text"
//                     value={newCategory.evtCategory}
//                     onChange={(e) => setNewCategory({ ...newCategory, evtCategory: e.target.value })}
//                     className="w-full p-2 border border-gray-300 rounded-lg"
//                     placeholder="Enter Your Class Name"
//                     required
//                   />
//                 </div>

//                 <div className="col-span-1">
//                   <label className="block text-sm font-bold text-gray-700">Participants</label>
//                   <input
//                     type="number"
//                     value={newCategory.noOfVeh}
//                     onChange={(e) => setNewCategory({ ...newCategory, noOfVeh: e.target.value })}
//                     className="w-full p-2 border border-gray-300 rounded-lg"
//                     required
//                     min="1"
//                   />
//                 </div>

//                 <div className="col-span-1">
//                   <label className="block text-sm font-bold text-gray-700">Laps</label>
//                   <input
//                     type="number"
//                     value={newCategory.nooflaps}
//                     onChange={(e) => setNewCategory({ ...newCategory, nooflaps: e.target.value })}
//                     className="w-full p-2 border border-gray-300 rounded-lg"
//                     required
//                     min="1"
//                   />
//                 </div>

//                 <div className="col-span-1">
//                   <label className="block text-sm font-bold text-gray-700">Price</label>
//                   <input
//                     type="number"
//                     value={newCategory.entryprice}
//                     onChange={(e) => setNewCategory({ ...newCategory, entryprice: e.target.value })}
//                     className="w-full p-2 border border-gray-300 rounded-lg"
//                     required
//                     min="0"
//                   />
//                 </div>
//               </div>

//               <div className="flex justify-end p-2">
//                 <button
//                   type="button"
//                   onClick={handleSubmitCategory}
//                   className="bg-cyan-500 text-white py-2 px-6 rounded-lg hover:bg-cyan-600 transition-colors w-full sm:w-auto"
//                 >
//                   {editCategory ? "Update Category" : "Add Class"}
//                 </button>
//               </div>
//             </div> */}
//             <div className="w-full p-6 bg-white border rounded-lg shadow-lg">

//               <div className="flex items-end gap-4 mb-4 flex-wrap">
//                 <div className="flex-1 min-w-[150px]">
//                   <label className="block text-sm font-semibold text-gray-700 mb-1">
//                     Category Type
//                   </label>
//                   <select
//                     value={newCategory.wheelertype}
//                     onChange={(e) =>
//                       setNewCategory({
//                         ...newCategory,
//                         wheelertype: e.target.value,
//                       })
//                     }
//                     className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
//                     required
//                   >
//                     <option value={0}>Select Category</option>
//                     <option value={51}>TwoWheeler</option>
//                     <option value={52}>FourWheeler</option>
//                     <option value={53}>Karting</option>
//                     <option value={54}>GrassRoots</option>
//                     <option value={75}>ESPORTS</option>
//                   </select>
//                 </div>

//                 <div className="flex-1 min-w-[150px]">
//                   <label className="block text-sm font-semibold text-gray-700 mb-1">
//                     Template
//                   </label>
//                   <select
//                     value={newCategory.template}
//                     onChange={(e) =>
//                       setNewCategory({
//                         ...newCategory,
//                         template: e.target.value,
//                       })
//                     }
//                     className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
//                     required
//                   >
//                     <option value="">Select Template</option>
//                     {templates.map((template, index) => (
//                       <option key={index} value={template}>
//                         {template || "Default"}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <div className="flex-1 min-w-[150px]">
//                   <label className="block text-sm font-semibold text-gray-700 mb-1">
//                     Class Name
//                   </label>
//                   <input
//                     type="text"
//                     value={newCategory.evtCategory}
//                     onChange={(e) =>
//                       setNewCategory({
//                         ...newCategory,
//                         evtCategory: e.target.value,
//                       })
//                     }
//                     className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
//                     placeholder="Enter Your Class Name"
//                     required
//                   />
//                 </div>

//                 <div className="flex-1 min-w-[80px]">
//                   <label className="block text-sm font-semibold text-gray-700 mb-1">
//                     Participants
//                   </label>
//                   <input
//                     type="number"
//                     value={newCategory.noOfVeh}
//                     onChange={(e) =>
//                       setNewCategory({
//                         ...newCategory,
//                         noOfVeh: e.target.value,
//                       })
//                     }
//                     className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
//                     required
//                     min="1"
//                   />
//                 </div>

//                 <div className="flex-1 min-w-[80px]">
//                   <label className="block text-sm font-semibold text-gray-700 mb-1">
//                     Laps
//                   </label>
//                   <input
//                     type="number"
//                     value={newCategory.nooflaps}
//                     onChange={(e) =>
//                       setNewCategory({
//                         ...newCategory,
//                         nooflaps: e.target.value,
//                       })
//                     }
//                     className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
//                     required
//                     min="1"
//                   />
//                 </div>

//                 <div className="flex-1 min-w-[80px]">
//                   <label className="block text-sm font-semibold text-gray-700 mb-1">
//                     Price
//                   </label>
//                   <input
//                     type="number"
//                     value={newCategory.entryprice}
//                     onChange={(e) =>
//                       setNewCategory({
//                         ...newCategory,
//                         entryprice: e.target.value,
//                       })
//                     }
//                     className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
//                     required
//                     min="0"
//                   />
//                 </div>

//                 <div className="flex items-end">
//                   <button
//                     type="button"
//                     onClick={handleSubmitCategory}
//                     className="bg-cyan-500 text-white py-2 px-4 rounded-lg hover:bg-cyan-600 transition-colors duration-300 shadow-md"
//                   >
//                     {editCategory ? "Update Class" : "Add Class"}
//                   </button>
//                 </div>
//               </div>
//             </div>

//             <div className="w-full p-4 bg-white mt-6 rounded-lg shadow-lg">
//               <h3 className="text-xl font-bold mb-4">Event Classes</h3>
//               <div className="overflow-auto max-h-auto">
//                 <table className="min-w-full bg-white border-gray-300 rounded-lg">
//                   <thead>
//                     <tr>
//                       <th className="py-2 px-4 border-b">Class Name</th>
//                       <th className="py-2 px-4 border-b">Type</th>
//                       <th className="py-2 px-4 border-b">Participants</th>
//                       <th className="py-2 px-4 border-b">Laps</th>
//                       <th className="py-2 px-4 border-b">Price</th>
//                       <th className="py-2 px-4 border-b">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {eventCategories.map((category) => (
//                       <tr key={category.evtCatId}>
//                         <td className="py-2 px-4 border-b text-center">
//                           {category.evtCategory}
//                         </td>
//                         <td className="py-2 px-4 border-b text-center">
//                           {category.wheelertype === 51
//                             ? "TwoWheeler"
//                             : category.wheelertype === 52
//                             ? "FourWheeler"
//                             : category.wheelertype === 53
//                             ? "Karting"
//                             : category.wheelertype === 54
//                             ? "GrassRoots"
//                             : "ESPORTS"}
//                         </td>
//                         <td className="py-2 px-4 border-b text-center">
//                           {category.noOfVeh}
//                         </td>
//                         <td className="py-2 px-4 border-b text-center">
//                           {category.nooflaps}
//                         </td>
//                         <td className="py-2 px-4 border-b text-center">
//                           {category.entryprice}
//                         </td>
//                         <td className="py-2 px-4 border-b text-center">
//                           <button
//                             onClick={() => handleEditCategory(category)}
//                             className="p-2 mr-2 bg-gray-50 border hover:bg-green-300 text-black rounded-lg transition-colors"
//                           >
//                             <CiEdit className="size-6" />
//                           </button>
//                           <button
//                             onClick={() =>
//                               handleDeleteCategory(category.evtCatId)
//                             }
//                             className="p-2 bg-gray-50 border hover:bg-red-300 text-black rounded-lg transition-colors"
//                           >
//                             <MdOutlineDelete className="size-6" />
//                           </button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default Classes;

/* eslint-disable no-unused-vars */
import MainSideBar from "../Components/MainSideBar";
import Newheader from "../Components/Newheader";
import { useEffect, useState } from "react";
import { BASE_URL } from "../constants/global-const";
import axios from "axios";
import { MdOutlineDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import toast, { Toaster } from "react-hot-toast";
import Styles from "../constants/Styles";
import AxiosInstance from "../Components/AxiosInstance";

const Classes = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState([]);
  const [eventCategories, setEventCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({
    evtCategory: "",
    noOfVeh: 0,
    status: "1",
    nooflaps: 0,
    entryprice: 0,
    wheelertype: 0,
    template: "",
  });

  const [editCategory, setEditCategory] = useState(null);
  const [templates, setTemplates] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // For global search
  const [currentPage, setCurrentPage] = useState(1); // For pagination
  const [recordsPerPage, setRecordsPerPage] = useState(10); // For page type (records per page)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // For dropdown visibility

  const filteredData = eventCategories.filter((category) => {
    return (
      category.evtCategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.wheelertype.toString().includes(searchQuery.toLowerCase()) ||
      category.noOfVeh.toString().includes(searchQuery.toLowerCase()) ||
      category.nooflaps.toString().includes(searchQuery.toLowerCase()) ||
      category.entryprice.toString().includes(searchQuery.toLowerCase())
    );
  });

  // Calculate total pages
  const totalPages = Math.ceil(filteredData.length / recordsPerPage);

  // Get current records based on pagination
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredData.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  const options = [
    { value: 5, label: "5 per page" },
    { value: 10, label: "10 per page" },
    { value: 15, label: "15 per page" },
    { value: 20, label: "20 per page" },
  ];

  const handleOptionClick = (value) => {
    setRecordsPerPage(value);
    setCurrentPage(1); // Reset to the first page when changing records per page
    setIsDropdownOpen(false); // Close the dropdown
  };

  const getPageNumbers = () => {
    let pages = [];
    const maxVisiblePages = 2; // Number of pages to show around the current page

    if (totalPages <= 5) {
      // If total pages are less than or equal to 5, show all pages
      pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    } else {
      // Otherwise, show first page, ellipses, current page range, ellipses, and last page
      pages = [1];

      let start = Math.max(2, currentPage - maxVisiblePages);
      let end = Math.min(totalPages - 1, currentPage + maxVisiblePages);

      if (start > 2) {
        pages.push("...");
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (end < totalPages - 1) {
        pages.push("...");
      }

      pages.push(totalPages);
    }

    return pages;
  };

  const handlePageChange = (page) => {
    if (page === "...") return; // Ignore ellipses clicks
    setCurrentPage(page);
  };

  // Fetch Event Data
  const handleGetData = async () => {
    try {
      const response = await AxiosInstance.get(
        `${BASE_URL}/api/EventRegistration/names`
      );
      setEvents(response.data || []);
    } catch (error) {
      console.error("Error fetching events:", error);
      toast.error("Error fetching events");
    }
  };

  // Fetch Template Data
  const fetchTemplates = async () => {
    try {
      const response = await AxiosInstance.get(
        `${BASE_URL}/api/Scrutiny/Template`
      );
      setTemplates(response.data || []);
    } catch (error) {
      console.error("Error fetching templates:", error);
      toast.error("Error fetching templates");
    }
  };

  const handleEventChange = (event) => {
    const eventId = event.target.value;
    setSelectedEvent(eventId);
    if (eventId) {
      AxiosInstance.get(`${BASE_URL}/api/eventcategories?event_id=${eventId}`)
        .then((response) => {
          setEventCategories(response.data || []);
        })
        .catch((error) => {
          console.error("Error fetching event categories:", error);
          setEventCategories([]);
        });
    } else {
      setEventCategories([]);
    }
  };

  const handleSubmitCategory = async (e) => {
    e.preventDefault();
    if (
      !newCategory.evtCategory ||
      !newCategory.noOfVeh ||
      !newCategory.nooflaps ||
      !newCategory.entryprice ||
      !newCategory.wheelertype ||
      !newCategory.template
    ) {
      toast.error("Please fill all the required fields!");
      return;
    }

    if (!selectedEvent) {
      toast.error("Please select an event first!");
      return;
    }

    const categoryData = {
      evtCatId: editCategory ? editCategory.evtCatId : 0,
      evtCategory: newCategory.evtCategory,
      noOfVeh: newCategory.noOfVeh,
      status: newCategory.status,
      nooflaps: newCategory.nooflaps,
      entryprice: newCategory.entryprice,
      wheelertype: newCategory.wheelertype,
      eventId: selectedEvent,
      template: newCategory.template,
    };

    try {
      let response;
      if (editCategory) {
        response = await axios.put(
          `${BASE_URL}/api/eventcategories/${editCategory.evtCatId}`,
          categoryData
        );
        toast.success("Class updated successfully!");
        setEditCategory(null);
      } else {
        response = await axios.post(
          `${BASE_URL}/api/eventcategories`,
          categoryData
        );
        toast.success("Class added successfully!");
      }

      resetForm();
      handleEventChange({ target: { value: selectedEvent } });
    } catch (error) {
      console.error("Error saving category:", error);
      toast.error("An error occurred while saving the class.");
    }
  };

  const handleEditCategory = (category) => {
    setEditCategory(category);
    setNewCategory({
      evtCategory: category.evtCategory,
      noOfVeh: category.noOfVeh,
      status: category.status,
      nooflaps: category.nooflaps,
      entryprice: category.entryprice,
      wheelertype: category.wheelertype,
      template: category.template || "",
    });
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      await axios.delete(`${BASE_URL}/api/eventcategories/${categoryId}`);
      toast.success("Class deleted successfully!");
      handleEventChange({ target: { value: selectedEvent } });
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error("An error occurred while deleting the category.");
    }
  };

  const resetForm = () => {
    setNewCategory({
      evtCategory: "",
      noOfVeh: 0,
      status: "1",
      nooflaps: 0,
      entryprice: 0,
      wheelertype: 0,
      template: "",
    });
    setEditCategory(null);
  };

  useEffect(() => {
    handleGetData();
    fetchTemplates();
  }, []);

  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />
      <section className="w-full h-screen flex flex-col">
        <div className="overflow-y-hidden shadow-lg">
          <Newheader />
        </div>
        <div className="flex overflow-hidden h-[calc(100vh-1rem)]">
        <div className="h-full">
            <MainSideBar />
          </div>
          <div className="flex-1 p-2  overflow-y-auto">
            <div className="max-w-7xl  mx-auto">
              <div className="bg-white    mb-6">
                <div className="p-2 flex">
                  <h3
                    style={Styles.heading}
                    className="text-2xl font-bold  text-gray-800 text-center "
                  >
                    {editCategory ? "Edit Class" : "Add Class"}
                  </h3>
                </div>

                <div className="w-full tab:w-full">
                  <label className="text-sm font-medium text-white">
                    Event Name
                  </label>
                  <div className="w-full flex flex-col gap-2">
                    {/* <h3 className="text-2xl font-bold mb-4 text-gray-800 text-center">
                    {editCategory ? "Edit Class" : "Add Class"}
                  </h3> */}

                    <div className="w-full  h-full border-1  p-2 border mb-4 rounded-lg">
                      <div className="w-1/2">
                        <label className="text-sm font-medium text-gray-700">
                          Event Name
                        </label>
                        <select
                          style={Styles.select}
                          value={selectedEvent}
                          onChange={handleEventChange}
                          className="w-full h-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5"
                        >
                          <option value="">Choose Event</option>
                          {events.map((event) => (
                            <option key={event.eventid} value={event.eventid}>
                              {event.eventname}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="w-full p-3 bg-white  ">
                        <div
                          disabled={!selectedEvent}
                          className="flex items-end gap-4 mb-4 flex-wrap "
                        >
                          <div className="flex-1 min-w-[150px]">
                            <label
                              style={Styles.label}
                              className="block text-sm font-semibold text-gray-700 mb-1"
                            >
                              Category Type
                            </label>
                            <select
                              style={Styles.select}
                              value={newCategory.wheelertype}
                              onChange={(e) =>
                                setNewCategory({
                                  ...newCategory,
                                  wheelertype: e.target.value,
                                })
                              }
                              className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
                              required
                            >
                              <option value={0}>Select Category</option>
                              <option value={51}>TwoWheeler</option>
                              <option value={52}>FourWheeler</option>
                              <option value={53}>Karting</option>
                              <option value={54}>GrassRoots</option>
                              <option value={75}>ESPORTS</option>
                            </select>
                          </div>

                          <div className="flex-1 min-w-[150px]">
                            <label
                              style={Styles.label}
                              className="block text-sm font-semibold text-gray-700 mb-1"
                            >
                              Template
                            </label>
                            <select
                              style={Styles.select}
                              value={newCategory.template}
                              onChange={(e) =>
                                setNewCategory({
                                  ...newCategory,
                                  template: e.target.value,
                                })
                              }
                              className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
                              required
                            >
                              <option value="">Select Template</option>
                              {templates.map((template, index) => (
                                <option key={index} value={template}>
                                  {template || "Default"}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className="flex-1 min-w-[150px]">
                            <label
                              style={Styles.label}
                              className="block text-sm font-semibold text-gray-700 mb-1"
                            >
                              Class Name
                            </label>
                            <input
                              style={Styles.select}
                              type="text"
                              value={newCategory.evtCategory}
                              onChange={(e) =>
                                setNewCategory({
                                  ...newCategory,
                                  evtCategory: e.target.value,
                                })
                              }
                              className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
                              placeholder="Enter Your Class Name"
                              required
                            />
                          </div>

                          <div className="flex-1 min-w-[80px]">
                            <label
                              style={Styles.label}
                              className="block text-sm font-semibold text-gray-700 mb-1"
                            >
                              Participants
                            </label>
                            <input
                              style={Styles.select}
                              type="number"
                              value={newCategory.noOfVeh}
                              onChange={(e) =>
                                setNewCategory({
                                  ...newCategory,
                                  noOfVeh: e.target.value,
                                })
                              }
                              className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
                              required
                              min="1"
                            />
                          </div>

                          <div className="flex-1 min-w-[80px]">
                            <label
                              style={Styles.label}
                              className="block text-sm font-semibold text-gray-700 mb-1"
                            >
                              Laps
                            </label>
                            <input
                              style={Styles.select}
                              type="number"
                              value={newCategory.nooflaps}
                              onChange={(e) =>
                                setNewCategory({
                                  ...newCategory,
                                  nooflaps: e.target.value,
                                })
                              }
                              className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
                              required
                              min="1"
                            />
                          </div>

                          <div className="flex-1 min-w-[80px]">
                            <label
                              style={Styles.label}
                              className="block text-sm font-semibold text-gray-700 mb-1"
                            >
                              Price
                            </label>
                            <input
                              style={Styles.select}
                              type="number"
                              value={newCategory.entryprice}
                              onChange={(e) =>
                                setNewCategory({
                                  ...newCategory,
                                  entryprice: e.target.value,
                                })
                              }
                              className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
                              required
                              min="0"
                            />
                          </div>

                          <div className="flex items-end">
                            <button
                              type="button"
                              onClick={handleSubmitCategory}
                              className="bg-cyan-500 text-white py-2 px-4 rounded-lg hover:bg-cyan-600 transition-colors duration-300 shadow-md"
                            >
                              {editCategory ? "Update Class" : "Add Class"}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="w-full border  bg-white mt-6 rounded-lg ">
                      <div className="w-full h-auto rounded-t-lg p-2 flex justify-center items-center border bg-gray-50 border-b">
                        <h3 style={Styles.tableheading}>Event Classes</h3>
                      </div>

                      <div className="w-full h-auto flex justify-between items-center p-2">
                        {/* Search Input */}
                        <div className="w-1/2">
                          <input
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-cyan-500 focus:border-cyan-500"
                            type="text"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => {
                              setSearchQuery(e.target.value);
                              setCurrentPage(1); // Reset to the first page on search
                            }}
                          />
                        </div>

                        {/* Page Type Dropdown */}
                        <div className="w-1/2 flex justify-end">
                          <div className="w-full flex relative  justify-end items-center">
                            <label
                              htmlFor="pageType-select"
                              className="block text-sm font-medium text-gray-700 mb-1"
                            >
                              Page Type
                            </label>
                            <button
                              id="pageType-select"
                              className="w-1/2 rounded-md border border-gray-300 bg-white px-4 py-2 text-left text-sm text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                              aria-haspopup="true"
                              aria-expanded={isDropdownOpen}
                              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            >
                              <div className="flex items-center justify-between">
                                <span>{`${recordsPerPage} per page`}</span>
                                <svg
                                  className="h-4 w-4 text-gray-500"
                                  fill="currentColor"
                                  viewBox="0 0 16 16"
                                  aria-hidden="true"
                                >
                                  <path d="M8.67903 10.7962C8.45271 11.0679 8.04729 11.0679 7.82097 10.7962L4.63962 6.97649C4.3213 6.59428 4.5824 6 5.06866 6L11.4313 6C11.9176 6 12.1787 6.59428 11.8604 6.97649L8.67903 10.7962Z" />
                                </svg>
                              </div>
                            </button>

                            {isDropdownOpen && (
                              <div className="absolute mt-1 top-12 w-1/2 rounded-md bg-white shadow-lg">
                                <ul className="py-1">
                                  {options.map((option, index) => (
                                    <li
                                      key={index}
                                      className="cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                      onClick={() =>
                                        handleOptionClick(option.value)
                                      }
                                    >
                                      {option.label}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="overflow-auto max-h-auto">
                        <table className="w-full text-sm text-left text-gray-500">
                          <thead className="text-xs text-gray-700 uppercase bg-gray-50  text-center">
                            <tr className="p-2">
                              <th className="py-4 px-4 border-b">Class Name</th>
                              <th className=" px-4 border-b">Type</th>
                              <th className="py-2 px-4 border-b">
                                Participants
                              </th>
                              <th className="py-2 px-4 border-b">Laps</th>
                              <th className="py-2 px-4 border-b">Price</th>
                              <th className="py-2 px-4 border-b">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {currentRecords.map((category) => (
                              <tr key={category.evtCatId}>
                                <td className="py-2 px-4 border-b text-center">
                                  {category.evtCategory}
                                </td>
                                <td className="py-2 px-4 border-b text-center">
                                  {category.wheelertype === 51
                                    ? "TwoWheeler"
                                    : category.wheelertype === 52
                                    ? "FourWheeler"
                                    : category.wheelertype === 53
                                    ? "Karting"
                                    : category.wheelertype === 54
                                    ? "GrassRoots"
                                    : "ESPORTS"}
                                </td>
                                <td className="py-2 px-4 border-b text-center">
                                  {category.noOfVeh}
                                </td>
                                <td className="py-2 px-4 border-b text-center">
                                  {category.nooflaps}
                                </td>
                                <td className="py-2 px-4 border-b text-center">
                                  {category.entryprice}
                                </td>
                                <td className="py-2 px-4 border-b text-center">
                                  <button
                                    onClick={() => handleEditCategory(category)}
                                    className="p-2 mr-2 bg-gray-50 border hover:bg-green-300 text-black rounded-lg transition-colors"
                                  >
                                    <CiEdit className="size-6" />
                                  </button>
                                  <button
                                    onClick={() =>
                                      handleDeleteCategory(category.evtCatId)
                                    }
                                    className="p-2 bg-gray-50 border hover:bg-red-300 text-black rounded-lg transition-colors"
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {filteredData.length > 0 && (
          <div className="flex justify-end px-2 items-center space-x-2 m-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-3 py-2 rounded-md ${
                currentPage === 1
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-cyan-500 text-white hover:bg-cyan-700"
              }`}
            >
              Prev
            </button>
            {getPageNumbers().map((page, index) =>
              page === "..." ? (
                <span key={index} className="px-3 py-2">
                  ...
                </span>
              ) : (
                <button
                  key={index}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-2 rounded-md ${
                    currentPage === page
                      ? "bg-cyan-700 text-white"
                      : "bg-gray-200 hover:bg-gray-400"
                  }`}
                >
                  {page}
                </button>
              )
            )}
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className={`px-3 py-2 rounded-md ${
                currentPage === totalPages
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-cyan-500 text-white hover:bg-cyan-700"
              }`}
            >
              Next
            </button>
          </div>
        )}
      </section>
    </>
  );
};

export default Classes;
