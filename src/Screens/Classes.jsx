import { useNavigate, useParams } from "react-router-dom";
import MainSideBar from "../Components/MainSideBar";
import Newheader from "../Components/Newheader";
import { useEffect, useState } from "react";
import { BASE_URL } from "../constants/global-const";
import axios from "axios";

const Classes = () => {
  const [selectedEvent, setSelectedEvent] = useState("");
  const [eventData, setEventData] = useState({
    categories: [
      {
        id: Date.now().toString(),
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

  const [tableData, setTableData] = useState([]);
  const [events, setEvents] = useState([]);
  const [eventCategories, setEventCategories] = useState([]); // New state for event categories

  const navigate = useNavigate();

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

  const handleGetEventCategories = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/eventcategories`);
      if (response.status === 200) {
        setEventCategories(response.data); // Set event categories data after successful API call
      } else {
        console.error("Error fetching event categories:", response);
      }
    } catch (error) {
      console.error("Error fetching event categories:", error);
    }
  };

  const handleSubmitCategory = async (e) => {
    e.preventDefault();

    const yourAuthToken = localStorage.getItem("authToken");

    if (!selectedEvent || eventData.categories.length === 0) {
      alert("Please select an event and fill in the categories!");
      return;
    }

    try {
      const categoryData = {
        eventId: selectedEvent,
        categories: eventData.categories,
      };

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${yourAuthToken}`, // Assuming you need the Bearer token
      };

      // Check if you have the correct API URL
      const response = await axios.post(
        `${BASE_URL}
/api/eventcategories`,
        categoryData,
        { headers }
      );

      if (response.status === 200) {
        console.log("Categories submitted successfully:", response.data);
        alert("Categories submitted successfully!");
        handleGetEventCategories(); // Fetch the event categories after submission
      } else {
        console.error("Error submitting categories:", response);
        alert("Error submitting categories!");
      }
    } catch (error) {
      console.error("Error during category submission:", error);
      alert("An error occurred while submitting the categories.");
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
        <div className="flex w-full flex-col">
          <div className="w-full flex p-4 gap-2 tab:flex-col">
            <div className="w-1/2 tab:w-full">
              <label className="text-sm font-medium text-white">
                Event Name
              </label>
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

          {/* Category Form */}
          <div className="w-full p-4 bg-white">
            <div className="space-y-4">
              {eventData.categories.map((category, index) => (
                <div
                  key={category.id}
                  className="border rounded-lg p-4 bg-gray-50 mb-4"
                >
                  <div className="w-full flex gap-2">
                    <div className="w-3/4 mb-4">
                      <label className="block text-sm font-bold text-gray-700">
                        Class Name
                      </label>
                      <input
                        type="text"
                        value={category.evtCategory}
                        onChange={(e) =>
                          setEventData({
                            ...eventData,
                            categories: eventData.categories.map((cat) =>
                              cat.id === category.id
                                ? { ...cat, evtCategory: e.target.value }
                                : cat
                            ),
                          })
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
                          setEventData({
                            ...eventData,
                            categories: eventData.categories.map((cat) =>
                              cat.id === category.id
                                ? { ...cat, wheelertype: e.target.value }
                                : cat
                            ),
                          })
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
                  </div>

                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700">
                        Participants
                      </label>
                      <input
                        type="number"
                        value={category.noOfVeh}
                        onChange={(e) =>
                          setEventData({
                            ...eventData,
                            categories: eventData.categories.map((cat) =>
                              cat.id === category.id
                                ? { ...cat, noOfVeh: e.target.value }
                                : cat
                            ),
                          })
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
                          setEventData({
                            ...eventData,
                            categories: eventData.categories.map((cat) =>
                              cat.id === category.id
                                ? { ...cat, nooflaps: e.target.value }
                                : cat
                            ),
                          })
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
                          setEventData({
                            ...eventData,
                            categories: eventData.categories.map((cat) =>
                              cat.id === category.id
                                ? { ...cat, entryprice: e.target.value }
                                : cat
                            ),
                          })
                        }
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-cyan-500 focus:border-cyan-500"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={handleSubmitCategory}
              className="bg-cyan-500 text-white py-2 px-6 rounded-lg hover:bg-cyan-600 transition-colors"
            >
              Submit Category
            </button>
          </div>

          {/* Table to display event categories */}
          <div className="w-full p-4 bg-white mt-6">
            <h3 className="text-xl font-bold mb-4">Event Categories</h3>
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Class Name</th>
                  <th className="py-2 px-4 border-b">Vehicle Type</th>
                  <th className="py-2 px-4 border-b">Participants</th>
                  <th className="py-2 px-4 border-b">Laps</th>
                  <th className="py-2 px-4 border-b">Entry Price</th>
                </tr>
              </thead>
              <tbody>
                {eventCategories.length > 0 ? (
                  eventCategories.map((category) => (
                    <tr key={category.id}>
                      <td className="py-2 px-4 border-b">
                        {category.evtCategory}
                      </td>
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
                      <td className="py-2 px-4 border-b">
                        {category.nooflaps}
                      </td>
                      <td className="py-2 px-4 border-b">
                        {category.entryprice}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="py-2 px-4 text-center">
                      No categories available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Classes;
