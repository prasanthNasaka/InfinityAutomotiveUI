/* eslint-disable no-unused-vars */

import MainSideBar from "../Components/MainSideBar";
import Newheader from "../Components/Newheader";
import { useEffect, useState } from "react";
import { BASE_URL } from "../constants/global-const";
import axios from "axios";
import { MdOutlineDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";

const Classes = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState([]);
  const [eventCategories, setEventCategories] = useState([]); // To store fetched categories

  const [newCategory, setNewCategory] = useState({
    evtCategory: "",
    noOfVeh: 0,
    status: "1",
    nooflaps: 0,
    entryprice: 0,
    wheelertype: 0,
  });

  const [editCategory, setEditCategory] = useState(null); // To store the category being edited

  // Fetch events from the backend
  const handleGetData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/EventRegistration/names`);
      setEvents(response.data.$values);
      console.log(response.data.$values);
      
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  // Fetch event categories when an event is selected
  const handleEventChange = (event) => {
    const eventId = event.target.value;
    setSelectedEvent(eventId);

    if (eventId) {
      // Fetch categories for the selected event
      axios
        .get(`${BASE_URL}/api/eventcategories?event_id=${eventId}`)
        .then((response) => {
          setEventCategories(response.data.$values || []);
        })
        .catch((error) => {
          console.error("Error fetching event categories:", error);
          setEventCategories([]);
        });
    } else {
      setEventCategories([]);
    }
  };

  // Handle submitting a new or edited category
  const handleSubmitCategory = async (e) => {
    e.preventDefault();

    // Check if the required fields are filled
    if (
      !newCategory.evtCategory ||
      !newCategory.noOfVeh ||
      !newCategory.nooflaps ||
      !newCategory.entryprice ||
      !newCategory.wheelertype
    ) {
      alert("Please fill all the required fields!");
      return;
    }

    if (!selectedEvent) {
      alert("Please select an event first!");
      return;
    }

    const categoryData = {
      evtCatId: editCategory ? editCategory.evtCatId : 0, // If editing, use existing evtCatId
      evtCategory: newCategory.evtCategory,
      noOfVeh: newCategory.noOfVeh,
      status: newCategory.status,
      nooflaps: newCategory.nooflaps,
      entryprice: newCategory.entryprice,
      wheelertype: newCategory.wheelertype,
      eventId: selectedEvent,
    };

    try {
      let response;
      if (editCategory) {
        // PUT request for editing
        response = await axios.put(
          `${BASE_URL}/api/eventcategories/${editCategory.evtCatId}`,
          categoryData
        );
        alert("Category updated successfully!");
        setEditCategory(null); // Reset after editing
      } else {
        // POST request for adding a new category
        response = await axios.post(`${BASE_URL}/api/eventcategories`, categoryData);
        alert("Category added successfully!");
      }

      // Reset form after add or update
      resetForm();
      handleEventChange({ target: { value: selectedEvent } }); // Reload categories after adding/editing
    } catch (error) {
      console.error("Error saving category:", error);
      alert("An error occurred while saving the category.");
    }
  };

  // Handle editing a category
  const handleEditCategory = (category) => {
    setEditCategory(category);
    setNewCategory({
      evtCategory: category.evtCategory,
      noOfVeh: category.noOfVeh,
      status: category.status,
      nooflaps: category.nooflaps,
      entryprice: category.entryprice,
      wheelertype: category.wheelertype,
    });
  };

  // Handle deleting a category
  const handleDeleteCategory = async (categoryId) => {
    try {
      await axios.delete(`${BASE_URL}/api/eventcategories/${categoryId}`);
      alert("Category deleted successfully!");
      handleEventChange({ target: { value: selectedEvent } }); // Reload categories after deletion
    } catch (error) {
      console.error("Error deleting category:", error);
      alert("An error occurred while deleting the category.");
    }
  };

  // Reset form after add or update
  const resetForm = () => {
    setNewCategory({
      evtCategory: "",
      noOfVeh: 0,
      status: "1",
      nooflaps: 0,
      entryprice: 0,
      wheelertype: 0,
    });
    setEditCategory(null); // Reset the edit state
  };

  useEffect(() => {
    handleGetData(); // Fetch events when the component mounts
  }, []);

  return (
    <section className="h-screen w-full">
      <div className="w-full h-24 overflow-y-hidden shadow-lg">
        <Newheader />
      </div>
      <div className="flex w-full h-[calc(100vh-6rem)]">
        <div className="bg-gray-100">
          <MainSideBar />
        </div>
        <div className="flex w-full flex-col">
          <div className="w-full flex p-4 gap-2 tab:flex-col">
            <div className="w-1/2 tab:w-full">
              <label className="text-sm font-medium text-white">Event Name</label>
              <select
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
          </div>

          {/* Form to Add/Edit Category */}
          <div className="w-full p-4 bg-white">
            <h3 className="text-xl font-bold mb-4">{editCategory ? "Edit Class" : "Add Class"}</h3>
            <div className="space-y-4">
              {/* Form Layout for Category Inputs in a Single Row */}
              <div className="grid grid-cols-5 gap-4 mb-4">
                {/* Category Type */}
                <div>
                  <label className="block text-sm font-bold text-gray-700">Category Type</label>
                  <select
                    value={newCategory.wheelertype}
                    onChange={(e) =>
                      setNewCategory({ ...newCategory, wheelertype: e.target.value })
                    }
                    className="w-full p-2 border border-gray-300 rounded-lg"
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

                {/* Class Name */}
                <div>
                  <label className="block text-sm font-bold text-gray-700">Class Name</label>
                  <input
                    type="text"
                    value={newCategory.evtCategory}
                    onChange={(e) =>
                      setNewCategory({ ...newCategory, evtCategory: e.target.value })
                    }
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>

                {/* Participants */}
                <div>
                  <label className="block text-sm font-bold text-gray-700">Participants</label>
                  <input
                    type="number"
                    value={newCategory.noOfVeh}
                    onChange={(e) =>
                      setNewCategory({ ...newCategory, noOfVeh: e.target.value })
                    }
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>

                {/* Laps */}
                <div>
                  <label className="block text-sm font-bold text-gray-700">Laps</label>
                  <input
                    type="number"
                    value={newCategory.nooflaps}
                    onChange={(e) =>
                      setNewCategory({ ...newCategory, nooflaps: e.target.value })
                    }
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>

                {/* Price */}
                <div>
                  <label className="block text-sm font-bold text-gray-700">Price</label>
                  <input
                    type="number"
                    value={newCategory.entryprice}
                    onChange={(e) =>
                      setNewCategory({ ...newCategory, entryprice: e.target.value })
                    }
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
              </div>

              {/* Add Class Button */}
              <button
                type="button"
                onClick={handleSubmitCategory}
                className="bg-cyan-500 text-white py-2 px-6 rounded-lg hover:bg-cyan-600 transition-colors mt-4"
              >
                {editCategory ? "Update Category" : "Add Class"}
              </button>
            </div>
          </div>

          {/* Display Categories in Table */}
          <div className="w-full p-4 bg-white mt-6">
            <h3 className="text-xl font-bold mb-4">Event Classes</h3>
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Class Name</th>
                  <th className="py-2 px-4 border-b">Type</th>
                  <th className="py-2 px-4 border-b">Participants</th>
                  <th className="py-2 px-4 border-b">Laps</th>
                  <th className="py-2 px-4 border-b">Price</th>
                  <th className="py-2 px-4 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {eventCategories.map((category) => (
                  <tr key={category.evtCatId}>
                    <td className="py-2 px-4 border-b">{category.evtCategory}</td>
                    <td className="py-2 px-4 border-b">
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
                    <td className="py-2 px-4 border-b">{category.noOfVeh}</td>
                    <td className="py-2 px-4 border-b">{category.nooflaps}</td>
                    <td className="py-2 px-4 border-b">{category.entryprice}</td>
                    <td className="py-2 px-4 border-b">
                      <button
                        onClick={() => handleEditCategory(category)}
                        className="p-2 mr-2 bg-gray-50 border hover:bg-green-300 text-black rounded-lg transition-colors"
                      >
                        <CiEdit className="size-6" />
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(category.evtCatId)}
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
    </section>
  );
};

export default Classes;
