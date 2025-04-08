/* eslint-disable react/prop-types */
import { Calendar, Flag, MapPin, Timer } from "lucide-react";
import { useState } from "react";
import { IMAGE_URL } from "../constants/global-const";
import { TfiCup } from "react-icons/tfi";
import { useNavigate } from "react-router-dom";

const Card = ({ event, type }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleDetailsClick = (eventId) => {
    const url = `/table/${eventId}`;
    window.open(url, "_blank");
  };

  const handleRegisterClick = (eventData) => {
    navigate("/registrationdesk", { state: eventData });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div
        className="min-w-max h-full rounded-lg overflow-hidden  shadow-lg cursor-pointer bg-white border"
        onClick={handleClick}
      >
        <div>
          {type === "live" && (
            <img
              src={`${IMAGE_URL}${event.banner}`}
              alt={event.eventname}
              className="w-full h-48 rounded-lg  object-fill"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://chronopulse-pulse.s3.ap-south-1.amazonaws.com/MapFiles/Events/469.png";
              }}
            />
          )}

          {type === "upcoming" && (
            <img
              src={`${IMAGE_URL}${event.banner}`}
              alt={event.eventname}
              className="w-96 h-48 rounded-lg object-cover border"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://chronopulse-pulse.s3.ap-south-1.amazonaws.com/MapFiles/Events/466.png";
              }}
            />
          )}

          {type === "completed" && (
            <img
              src={`${IMAGE_URL}${event.banner}`}
              alt={event.eventname}
              className="w-96 h-48 rounded-lg object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://chronopulse-pulse.s3.ap-south-1.amazonaws.com/MapFiles/Events/433.png";
              }}
            />
          )}
        </div>

        <div className="p-4">
          <h3 className="text-xl font-bold">{event.eventname}</h3>
          <p className="text-gray-600 flex items-center">
            <MapPin className="mr-2 " size={20} />
            {event.location}
          </p>
          {type === "live" && (
            <p className="text-gray-600 flex items-center">
              <Timer className="mr-2 " size={20} />
              Lap {event.currentLap} of {event.totalLaps}
            </p>
          )}
          {type === "upcoming" && (
            <p className="text-gray-600 flex items-center">
              <p className="text-gray-600 items-center flex justify-center  text-wrap flex-col">
                <span className="flex items-center justify-between">
                  <Calendar className="mr-2" size={20} />
                  Start Date: {formatDate(event.startdate)}
                </span>
                <span className="flex items-center justify-start">
                  <Calendar className="mr-3" size={20} />
                  End Date: {formatDate(event.enddate)}
                </span>
              </p>
            </p>
          )}

          {type === "completed" && (
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-600 flex items-center">
                  <Flag className="mr-2" size={16} />
                  Completed on {formatDate(event.startdate)}
                </p>
              </div>
              <div className="text-4xl text-yellow-600">
                <TfiCup />
              </div>
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="z-50 fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg max-w-2xl w-full">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-2xl font-bold mb-4 text-center">
                {event.eventname}
              </h2>
              <button
                onClick={closeModal}
                className="bg-cyan-500 text-white p-2 rounded-md hover:bg-cyan-600 hover:text-black transition-all duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2.5"
                  stroke="currentColor"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {type === "live" && (
              <img
                src={`${IMAGE_URL}${event.banner}`}
                alt={event.eventname}
                className="w-full h-48 rounded-lg object-fill"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://chronopulse-pulse.s3.ap-south-1.amazonaws.com/MapFiles/Events/469.png";
                }}
              />
            )}

            {type === "upcoming" && (
              <img
                src={`${IMAGE_URL}${event.banner}`}
                alt={event.eventname}
                className="w-full rounded-lg h-48 object-fill"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://chronopulse-pulse.s3.ap-south-1.amazonaws.com/MapFiles/Events/466.png";
                }}
              />
            )}

            {type === "completed" && (
              <img
                src={`${IMAGE_URL}${event.banner}`}
                alt={event.eventname}
                className="w-full h-48 rounded-lg object-fill"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://chronopulse-pulse.s3.ap-south-1.amazonaws.com/MapFiles/Events/433.png";
                }}
              />
            )}

            <p className="text-gray-600 mb-2">
              <MapPin
                className="inline mr-2 border-4 border-red-800"
                size={16}
              />{" "}
              {event.location}
            </p>

            {type === "live" && (
              <p className="text-gray-600 mb-2">
                <Timer className="inline mr-2" size={16} /> Lap{" "}
                {event.currentLap} of {event.totalLaps}
              </p>
            )}

            {type === "upcoming" && (
              <p className="text-gray-600 mb-2">
                <Calendar className="inline mr-2" size={16} />{" "}
                {new Date(event.startdate).toLocaleString()}
              </p>
            )}

            {type === "completed" && (
              <div className="mt-4">{/* Results can be displayed here */}</div>
            )}

            <div className="w-full mt-5 flex justify-between gap-5">
              <button
                onClick={closeModal}
                className="w-1/2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
              >
                Close
              </button>

              {type === "upcoming" ? (
                <button
                  onClick={() => handleRegisterClick(event)}
                  className="w-1/2 bg-cyan-500 text-white px-4 py-2 rounded-md hover:bg-cyan-600 hover:text-black transition-all duration-300"
                >
                  Register Now
                </button>
              ) : (
                <button
                  onClick={() => handleDetailsClick(event.eventid)} // Use event.eventid here for live/completed events
                  className="w-1/2 bg-cyan-500 text-white px-4 py-2 rounded-md hover:bg-cyan-600 hover:text-black transition-all duration-300"
                >
                  Details
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Card;
