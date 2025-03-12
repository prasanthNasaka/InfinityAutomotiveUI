import { Link } from "react-router-dom";
import Card from "../Components/Card";
import { FaArrowRightLong } from "react-icons/fa6";
import RacingVideo from "../assets/Racing.mp4";
import { useEffect, useState } from "react";

const LandingPage = () => {
  const [liveEvents, setLiveEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [completedEvents, setCompletedEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          "https://c4pfntkn-7206.inc1.devtunnels.ms/api/LandingPage"
        );
        const data = await response.json();
        setLiveEvents(data.liveEvents);
        setUpcomingEvents(data.upcommingEvents);
        setCompletedEvents(data.completedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <>
      <div className="relative overflow-hidden h-full">
        <video
          autoPlay
          loop
          muted
          className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
          style={{ animation: "fadeIn 3s ease-in-out" }}
        >
          <source src={RacingVideo} type="video/mp4" />
        </video>
        <div className="w-full mx-auto p-4 relative z-10 flex">
          <div className="w-3/4">
            <div className="w-full flex items-center justify-end mb-4">
              <Link
                to="/login"
                className="flex items-center bg-cyan-500 text-white gap-3 p-2 border-none rounded-md hover:bg-cyan-600 hover:text-black transition-all duration-300"
              >
                Login
                <FaArrowRightLong className="size-5" />
              </Link>
            </div>

            <h1 className="text-3xl font-bold mb-6">Live Events</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {liveEvents.map((event) => (
                <Card key={event.eventid} event={event} type="live" />
              ))}
            </div>

            <h2 className="text-2xl font-bold mt-8 mb-4">Upcoming Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map((event) => (
                <Card key={event.eventid} event={event} type="upcoming" />
              ))}
            </div>
          </div>

          <div className="w-1/4 h-fit bg-white relative overflow-y-auto ml-2">
            <h2 className="text-2xl font-bold mt-3 flex items-center justify-center">
              Completed Events
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
              {completedEvents.map((event) => (
                <Card key={event.eventid} event={event} type="completed" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
