/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { useNavigate, useParams } from "react-router-dom"; // Import useNavigate to redirect back to events page
import MainSideBar from "./MainSideBar";
import Newheader from "./Newheader";
import { useEffect, useState } from "react";
import { BASE_URL } from "../constants/global-const";
import axios from "axios";

const Classes = () => {
  const { eventId } = useParams(); // Getting eventId from URL params
  const [selectedEvent, setSelectedEvent] = useState("");

  useEffect(() => {
    console.log("Saad", eventId);
    const yourAuthToken = localStorage.getItem("authToken");
    console.log("yourAuthToken", yourAuthToken);

    if (eventId) {
      setSelectedEvent(eventId.eventname); // Set the selected event from URL param
    }
  }, [eventId]); // Run effect when eventId changes

  // Initially, there is one category form by default
  const [eventData, setEventData] = useState({
    categories: [
      {
        id: Date.now().toString(), // Unique ID for the category
        evtCategory: "",
        noOfVeh: 0,
        status: "",
        nooflaps: 0,
        entryprice: 0,
        wheelertype: 0,
        eventId: 0,
      },
    ],
  });

  const [expandedCategories, setExpandedCategories] = useState({
    [Date.now().toString()]: true, // Initially expanded category
  });

  // Handle adding a new category
  const handleAddCategory = () => {
    const newCategory = {
      id: Date.now().toString(),
      evtCategory: "",
      noOfVeh: 0,
      status: "",
      nooflaps: 0,
      entryprice: 0,
      wheelertype: 0,
      eventId: 0,
    };
    setEventData({
      ...eventData,
      categories: [...eventData.categories, newCategory],
    });
    setExpandedCategories({ ...expandedCategories, [newCategory.id]: true });
  };

  // Handle changes within the category fields
  const handleCategoryChange = (id, field, value) => {
    setEventData({
      ...eventData,
      categories: eventData.categories.map((cat) =>
        cat.id === id ? { ...cat, [field]: value } : cat
      ),
    });
  };

  // Handle deletion of a category
  // const handleDeleteCategory = (id) => {
  //   setEventData({
  //     ...eventData,
  //     categories: eventData.categories.filter((cat) => cat.id !== id),
  //   });
  //   const { [id]: _, ...rest } = expandedCategories;
  //   setExpandedCategories(rest);
  // };

  // Handle redirection to the events page
  const navigate = useNavigate();
  const handleRedirectToEvent = () => {
    navigate("/events");
  };

  // Handle form submission for categories
  const handleSubmitCategory = async (e) => {
    e.preventDefault();

    if (!selectedEvent || eventData.categories.length === 0) {
      alert("Please select an event and fill in the categories!");
      return;
    }

    try {
      // Prepare the data for submission
      const categoryData = {
        eventId: selectedEvent,
        categories: eventData.categories,
      };
      // Set appropriate headers (optional, check with backend requirements)
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${yourAuthToken}`, // If authentication is required
      };

      const response = await axios.post(
        `${BASE_URL}/api/EventRegistration/addCategories`,
        categoryData,
        { headers }
      );

      if (response.status === 200) {
        console.log("Categories submitted successfully:", response.data);
        alert("Categories submitted successfully!");
      } else {
        console.error("Error submitting categories:", response);
        alert("Error submitting categories!");
      }
    } catch (error) {
      console.error("Error during category submission:", error);
      alert("An error occurred while submitting the categories.");
    }
  };

  const [tableData, setTableData] = useState({});

  const handleEventChange = (event) => {
    const eventId = event.target.value;
    setSelectedEvent(eventId);

    if (eventId) {
      fetch(`${BASE_URL}/api/Registration/event/${eventId}`)
        .then((response) => response.json())
        .then((data) => {
          if (Array.isArray(data.$values)) {
            setTableData(data.$values);
          } else {
            console.error("Expected an array of events, but received:", data);
            setTableData([]);
          }
        })
        .catch((error) => console.error("Error fetching events:", error));
    } else {
      setTableData([]);
    }
  };
  const [events, setEvents] = useState([]);

  const handleGetData = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/EventRegistration/names`
      );
      setEvents(response.data.$values);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    handleGetData();
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
        <div className="flex flex-col">
          <div className="w-full  flex p-4 gap-2  tab:flex-col">
            <div className="w-1/2 tab:w-full">
              <label className="text-sm font-medium text-white">
                Event Name
              </label>
              <select
                value={selectedEvent} // Set the selectedEvent value to the one from the URL
                onChange={handleEventChange} // Handle event change when user manually selects
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
          <div className="w-full p-4 bg-white">
            <div className="space-y-4">
              {/* Category Form (Initial + Dynamically Added) */}
              {eventData.categories.map((category, index) => (
                <div
                  key={category.id}
                  className="border rounded-lg p-4 bg-gray-50 mb-4"
                >
                  <div className="flex justify-between items-center mb-4">
                    {/* <h3 className="text-lg font-bold">Category {index + 1}</h3>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedCategories({
                          ...expandedCategories,
                          [category.id]: !expandedCategories[category.id],
                        })
                      }
                      className="text-gray-500 hover:text-gray-700"
                    >
                      {expandedCategories[category.id] ? (
                        <ChevronUp size={24} />
                      ) : (
                        <ChevronDown size={24} />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteCategory(category.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={24} />
                    </button>
                  </div> */}
                  </div>

                  {/* Expandable Category Fields */}
                  {expandedCategories[category.id] && (
                    <div>
                      <div className="w-full flex gap-2">
                        <div className=" w-3/4   mb-4">
                          <label className="block text-sm font-bold text-gray-700">
                            Class Name
                          </label>
                          <input
                            type="text"
                            value={category.evtCategory}
                            onChange={(e) =>
                              handleCategoryChange(
                                category.id,
                                "evtCategory",
                                e.target.value
                              )
                            }
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-cyan-500 focus:border-cyan-500"
                          />
                        </div>
                        <div className="w-1/2 mb-4">
                          <label className="block text-sm font-bold text-gray-700">
                            Category
                          </label>
                          <select
                            value={category.wheelertype}
                            onChange={(e) =>
                              handleCategoryChange(
                                category.id,
                                "wheelertype",
                                e.target.value
                              )
                            }
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-cyan-500 focus:border-cyan-500"
                          >
                            <option value={0}>Select Category</option>
                            <option value={51}>TwoWheeler</option>
                            <option value={52}>FourWheeler</option>
                            <option value={53}>Karting</option>
                            <option value={54}>GrassRoots</option>
                            <option value={75}>ESPORTS</option>
                          </select>
                        </div>

                        <div className="grid grid-cols-3 gap-2 mb-4">
                          {/* Vehicle Type Field First */}

                          <div>
                            <label className="block text-sm font-bold text-gray-700">
                              Participants
                            </label>
                            <input
                              type="number"
                              value={category.noOfVeh}
                              onChange={(e) =>
                                handleCategoryChange(
                                  category.id,
                                  "noOfVeh",
                                  e.target.value
                                )
                              }
                              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-cyan-500 focus:border-cyan-500"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-bold text-gray-700">
                              Laps
                            </label>
                            <input
                              type="number"
                              value={category.nooflaps}
                              onChange={(e) =>
                                handleCategoryChange(
                                  category.id,
                                  "nooflaps",
                                  e.target.value
                                )
                              }
                              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-cyan-500 focus:border-cyan-500"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-bold text-gray-700">
                              Price
                            </label>
                            <input
                              type="number"
                              value={category.entryprice}
                              onChange={(e) =>
                                handleCategoryChange(
                                  category.id,
                                  "entryprice",
                                  e.target.value
                                )
                              }
                              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-cyan-500 focus:border-cyan-500"
                            />
                          </div>
                        </div>
                      </div>
                      {/* Add Category Button placed above Submit */}
                      <button
                        type="button"
                        onClick={handleAddCategory}
                        className="bg-cyan-500 text-white py-2 px-6 rounded-lg hover:bg-cyan-600 transition-colors"
                      >
                        Add Category
                      </button>

                      {/* Participants, Laps, Price */}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex justify-between items-center mt-6">
              {/* Back to Events Button */}
              <button
                type="button"
                onClick={handleRedirectToEvent}
                className="bg-cyan-500 text-white py-2 px-6 rounded-lg hover:bg-cyan-600 transition-colors"
              >
                Back to Events
              </button>

              {/* Submit Category Button */}
              <button
                type="button" // Use "button" to prevent page reload
                onClick={handleSubmitCategory} // Trigger the form submission
                className="bg-cyan-500 text-white py-2 px-6 rounded-lg hover:bg-cyan-600 transition-colors"
              >
                Submit Category
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Classes;
