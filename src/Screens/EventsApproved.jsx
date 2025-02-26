import toast, { Toaster } from "react-hot-toast";
import MainSideBar from "../Components/MainSideBar";
import Newheader from "../Components/Newheader";
import { CalendarCheck2 } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../constants/global-const";

const EventsApproved = () => {
  const [events, setEvents] = useState([]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-GB"); 
  };

  const eventTypeMapping = {
    21: "Autocross",
    22: "DragRacing",
    23: "RallySprint",
    24: "StageRally",
  };

  const handleApprove = (event) => {
    const eventId = event.eventid;
    axios
      .put(`${BASE_URL}/api/EventRegistration/ApproveEvents?EventId=${eventId}`, {
        approved: true,
      })
      .then((response) => {
        if (response.status === 200) {
          setEvents((prevEvents) =>
            prevEvents.map((ev) =>
              ev.id === eventId ? { ...ev, approved: true } : ev
            )
          );
          toast.success("Event approved successfully 🎉");
          fetchEvents(); 
        }
      })
      .catch((error) => {
        console.error("Error Approving Event:", error);
        toast.error("Failed to approve the event. Please try again");
      });
  };
  
  const fetchEvents = () => {
    axios
      .get(`${BASE_URL}/api/EventRegistration/EventsToApprove`)
      .then((response) => {
        setEvents(response.data.$values);
        toast.success("Events loaded successfully");
      })
      .catch((error) => {
        console.error("Error Fetching Events:", error);
        toast.error("Failed to load events. Please check your connection 🔄");
      });
  };
  
  useEffect(() => {
    fetchEvents();
  }, []);
  

  return (
    <section className="w-full h-screen flex flex-col">
      <div className="w-full h-24 overflow-y-hidden shadow-lg">
        <Newheader />
      </div>

      <div className="flex h-[calc(100vh-6rem)] overflow-hidden">
        <div className=" h-full">
          <div className="h-full ">
            <MainSideBar />
          </div>
        </div>

        <div className="flex-1 p-3 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg border mb-6">
              <div className="p-2">
                <h3 className="text-2xl font-semibold text-center text-gray-900">
                  Approve Events
                </h3>
              </div>

              <div className="min-h-auto p-2">
                <div className="border rounded-lg overflow-hidden bg-white shadow-md">
                  <div className="overflow-x-auto ">
                    <table className="w-full text-sm text-left text-gray-500">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50 sticky top-0 text-center">
                        <tr>
                          <th className="px-6 py-3 whitespace-nowrap">SL.No</th>
                          <th className="px-6 py-3 whitespace-nowrap">
                            Event Type
                          </th>
                          <th className="px-6 py-3 whitespace-nowrap">
                            Event Name
                          </th>
                          <th className="px-6 py-3 whitespace-nowrap">
                            Start Date
                          </th>
                          <th className="px-6 py-3 whitespace-nowrap">
                            End Date
                          </th>
                          <th className="px-6 py-3 whitespace-nowrap">
                            Company
                          </th>
                          <th className="px-6 py-3 whitespace-nowrap">
                            Location
                          </th>
                          <th className="px-6 py-3 whitespace-nowrap">
                            Gmap Location
                          </th>
                          <th className="px-6 py-3 whitespace-nowrap">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 text-center uppercase">
                        {events.map((event, index) => (
                          <tr
                            key={event.id}
                            className="bg-white hover:bg-gray-50"
                          >
                            <td className="px-6 py-2 whitespace-nowrap ">
                              {index + 1}
                            </td>

                            <td className="px-6 py-2 whitespace-nowrap ">
                            {eventTypeMapping[event.eventtype] || "Unknown"}
                            </td>

                            <td className="px-6 py-2 whitespace-nowrap ">
                              {event.eventname}
                            </td>

                            <td className="px-6 py-2 whitespace-nowrap ">
                              {formatDate ( event.startdate)}
                            </td>

                            <td className="px-6 py-2 whitespace-nowrap ">
                              {formatDate ( event.enddate)}
                            </td>

                            <td className="px-6 py-2 whitespace-nowrap ">
                              {event.companyName}
                            </td>

                            <td className="px-6 py-2 whitespace-nowrap ">
                              {event.location}
                            </td>

                            <td className="px-6 py-2 whitespace-nowrap ">
                              {event.gmapLocation}
                            </td>

                            <td className="px-6 py-2 whitespace-nowrap ">
                              <div className="flex gap-2 justify-center">
                                {event.approved ? (
                                  <span>Approved</span>
                                ) : (
                                  <button
                                    onClick={() => handleApprove(event)}
                                    type="button"
                                    className="p-2 bg-gray-50 border hover:bg-green-300 text-black rounded-lg transition-colors"
                                  >
                                    <CalendarCheck2 className="w-6 h-6" />
                                  </button>
                                )}
                              </div>
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
      <Toaster position="bottom-center" reverseOrder={false} />
    </section>
  );
};

export default EventsApproved;
