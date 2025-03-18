/* eslint-disable no-unused-vars */
import MainSideBar from "../Components/MainSideBar";
import Newheader from "../Components/Newheader";
import { useEffect, useState } from "react";
import { BASE_URL } from "../constants/global-const";
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
    evtClass: "",
    noOfVeh: "",
    status: 1,
    nooflaps: "",
    entryprice: "",
    evtCategory: "",
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
      category.evtClass.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
      pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    } else {
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

  const handleEventChange = async (event) => {
    const eventId = event.target.value;
    setSelectedEvent(eventId);
    if (eventId) {
      try {
        const response = await AxiosInstance.get(
          `${BASE_URL}/api/eventcategories?event_id=${eventId}`
        );
        setEventCategories(response.data || []);
      } catch (error) {
        console.error("Error fetching event categories:", error);
        setEventCategories([]);
      }
    } else {
      setEventCategories([]);
    }
  };

  const handleSubmitCategory = async (e) => {
    e.preventDefault();
    if (
      !newCategory.evtClass ||
      !newCategory.noOfVeh ||
      !newCategory.nooflaps ||
      !newCategory.entryprice ||
      !newCategory.evtCategory ||
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
      evtClass: newCategory.evtClass,
      noOfVeh: newCategory.noOfVeh,
      status: newCategory.status,
      nooflaps: newCategory.nooflaps,
      entryprice: newCategory.entryprice,
      evtCategory: newCategory.evtCategory,
      eventId: selectedEvent,
      template: newCategory.template,
    };

    try {
      if (editCategory) {
        await AxiosInstance.put(
          `${BASE_URL}/api/eventcategories/${editCategory.evtCatId}`,
          categoryData
        );
        toast.success("Class updated successfully!");
        setEditCategory(null);
      } else {
        await AxiosInstance.post(
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
      evtClass: category.evtClass,
      noOfVeh: category.noOfVeh,
      status: category.status,
      nooflaps: category.nooflaps,
      entryprice: category.entryprice,
      evtCategory: category.evtCategory,
      template: category.template || "",
    });
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      await AxiosInstance.delete(
        `${BASE_URL}/api/eventcategories/${categoryId}`
      );
      toast.success("Class deleted successfully!");
      handleEventChange({ target: { value: selectedEvent } });
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error("An error occurred while deleting the category.");
    }
  };

  const resetForm = () => {
    setNewCategory({
      evtClass: "",
      noOfVeh: "",
      status: "w",
      nooflaps: "",
      entryprice: "",
      evtCategory: "",
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
          <div className="flex-1 p-3 overflow-y-auto">
            <div className="max-w-full mx-auto">
              <div className="bg-white p-2 mb-6">
                <div className="p-2 flex">
                  <h3
                    style={Styles.heading}
                    className="text-2xl font-bold text-gray-800 text-center"
                  >
                    {editCategory ? "Edit Class" : "Add Class"}
                  </h3>
                </div>

                <div className="w-full tab:w-full">
                  <label className="text-sm font-medium text-white">
                    Event Name
                  </label>
                  <div className="w-full flex flex-col gap-2">
                    <div className="w-full h-full border-1 p-2 border mb-4 rounded-lg">
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

                      <div className="w-full p-3 bg-white">
                        <div
                          disabled={!selectedEvent}
                          className="flex items-end gap-4 mb-4 flex-wrap"
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
                              value={newCategory.evtCategory}
                              onChange={(e) =>
                                setNewCategory({
                                  ...newCategory,
                                  evtCategory: Number(e.target.value),
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
                              value={newCategory.evtClass}
                              onChange={(e) =>
                                setNewCategory({
                                  ...newCategory,
                                  evtClass: e.target.value,
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
                                  noOfVeh: Number(e.target.value),
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
                                  nooflaps: Number(e.target.value),
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
                                  entryprice: Number(e.target.value),
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
                    <div className="w-full p-4 bg-white mt-6 rounded-lg">
                      <h3 style={Styles.tableheading}>Event Classes</h3>
                      <div className="overflow-auto max-h-auto">
                        {selectedEvent && currentRecords.length === 0 ? (
                          <div className="text-center text-gray-500 py-4">
                            Oops, No classes available for the selected event.
                            Please add a new class.
                          </div>
                        ) : (
                          <table className="w-full text-sm text-left text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 sticky top-0 text-center">
                              <tr>
                                <th className="py-2 px-4 border-b">
                                  Class Name
                                </th>
                                <th className="py-2 px-4 border-b">Type</th>
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
                                    {category.evtClass}
                                  </td>
                                  <td className="py-2 px-4 border-b text-center">
                                    {category.evtCategory === 51
                                      ? "TwoWheeler"
                                      : category.evtCategory === 52
                                      ? "FourWheeler"
                                      : category.evtCategory === 53
                                      ? "Karting"
                                      : category.evtCategory === 54
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
                                      onClick={() =>
                                        handleEditCategory(category)
                                      }
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
                        )}
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
