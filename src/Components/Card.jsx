/* eslint-disable react/prop-types */
import { Calendar, MapPin, Timer } from "lucide-react";
import { useState } from "react";
import { IMAGE_URL } from "../constants/global-const";
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { RxOpenInNewWindow } from "react-icons/rx";

const Card = ({ event, type }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleDetailsClick = (eventId, eventType) => {
    const url = `/table/${eventId}?type=${eventType}`;
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
        className="min-w-max h-full rounded-lg overflow-hidden  shadow-lg cursor-pointer bg-white"
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

          {/* {type === "completed" && (
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
          )} */}
        </div>

        <div className="p-2 flex flex-col items-start justify-start gap-2">
          <div>
            <h3 className="text-xl font-bold">{event.eventname}</h3>
            <span className="text-gray-600 flex items-center gap-1">
              <MapPin className="text-green-600" size={20} />
              {event.location}
            </span>

            {type === "live" && (
              <span className="text-gray-600 flex items-center gap-1">
                <Timer className="text-yellow-600" size={20} />
                Lap {event.currentLap} of {event.totalLaps}
              </span>
            )}
          </div>

          {type === "upcoming" && (
            <div className="text-gray-600 flex border flex-col gap-1">
              <div className="flex items-center gap-1">
                <Calendar size={20} />
                <span>Start Date: {formatDate(event.startdate)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar size={20} />
                <span>End Date: {formatDate(event.enddate)}</span>
              </div>
            </div>
          )}

          {type === "completed" && (
            <div className="flex w-80 justify-between items-center gap-4">
              <div>
                <span className="text-gray-600 flex items-center gap-1">
                  <FaCheckCircle className="text-green-600 text-xl" />
                  {formatDate(event.startdate)}
                </span>
              </div>
              <div className="w-1/2 h-full">
                <img
                  src={`${IMAGE_URL}${event.banner}`}
                  alt={event.eventname}
                  className="w-full h-14 rounded-lg object-fill"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://chronopulse-pulse.s3.ap-south-1.amazonaws.com/MapFiles/Events/433.png";
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="z-50 fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg flex-flex-col  w-1/3">
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
            <div className="p-1">
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
            </div>

            <div className="flex flex-col w-full justify-start p-1 gap-2">
              <div className="flex items-center gap-2 font-poppins flex-wrap">
                {/* Location Icon + Text */}
                <MapPin className="text-green-600 min-w-[20px]" size={20} />
                <span className="text-base text-gray-700">
                  {event.location}
                </span>

                {/* "View In Map" Link */}
                <a
                  target="_blank"
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    event.gmapLocation
                  )}`}
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-sm text-cyan-500 hover:text-cyan-600 hover:underline transition duration-150"
                >
                  View In Map
                  <RxOpenInNewWindow className="text-lg" size={18} />
                </a>
              </div>

              {type === "live" && (
                <span className=" flex gap">
                  <Timer className=" text-yellow-600" size={20} /> Lap{" "}
                  {event.currentLap} of {event.totalLaps}
                </span>
              )}

              {type === "upcoming" && (
                <span className="text-gray-600 flex items-center">
                  <Calendar className=" " size={20} />{" "}
                  {new Date(event.startdate).toLocaleString()}
                </span>
              )}

              {type === "completed" && (
                <span className="text-gray-600 flex items-center">
                  <Calendar className=" " size={20} />
                  {new Date(event.startdate).toLocaleString()}
                </span>
              )}
            </div>

            <div className="w-full  flex justify-between gap-5">
              {type === "upcoming" ? (
                <button
                  onClick={() => handleRegisterClick(event)}
                  className="w-1/2 bg-cyan-500 text-white px-4 py-2 rounded-md hover:bg-cyan-600 hover:text-black transition-all duration-300"
                >
                  Register Now
                </button>
              ) : (
                <button
                  onClick={() => handleDetailsClick(event.eventid, type)} // Pass the type here
                  className="w-1/2 bg-cyan-500 text-white px-4 py-2 rounded-md hover:bg-cyan-600 hover:text-black transition-all duration-300"
                >
                  Details
                </button>
              )}
              <button
                onClick={closeModal}
                className="w-1/2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Card;
