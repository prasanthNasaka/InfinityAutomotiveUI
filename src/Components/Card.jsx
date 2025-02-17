/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Calendar, Flag, MapPin, Timer } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Card = ({ event, type }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div
        className="border rounded-lg overflow-hidden shadow-lg cursor-pointer"
        onClick={handleClick}
      >
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="text-xl font-bold">{event.title}</h3>
          <p className="text-gray-600 flex items-center">
            <MapPin className="mr-2" size={16} />
            {event.location}
          </p>
          {type === "live" && (
            <p className="text-gray-600 flex items-center">
              <Timer className="mr-2" size={16} />
              Lap {event.currentLap} of {event.totalLaps}
            </p>
          )}
          {type === "upcoming" && (
            <>
              <p className="text-gray-600 flex items-center">
                <Calendar className="mr-2" size={16} />
                {event.date}
              </p>
              <Link
                to="/register"
                className="mt-4 w-full bg-cyan-500 text-white px-4 py-2 rounded flex justify-center hover:bg-cyan-600 transition"
              >
                Register Now
              </Link>
            </>
          )}
          {type === "completed" && (
            <p className="text-gray-600 flex items-center">
              <Flag className="mr-2" size={16} />
              Completed on {event.date}
            </p>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg max-w-2xl w-full">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-2xl font-bold mb-4 text-center">
                {event.title}
              </h2>

              <button
                onClick={closeModal}
                className="bg-cyan-500 text-white p-2 rounded-full hover:bg-cyan-600 transition"
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
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-48 object-cover mb-4"
            />
            <p className="text-gray-600 mb-2">
              <MapPin className="inline mr-2" size={16} />
              {event.location}
            </p>
            {type === "live" && (
              <p className="text-gray-600 mb-2">
                <Timer className="inline mr-2" size={16} />
                Lap {event.currentLap} of {event.totalLaps}
              </p>
            )}
            {type === "upcoming" && (
              <>
                <p className="text-gray-600 mb-2">
                  <Calendar className="inline mr-2" size={16} />
                  {event.date}
                </p>
                <p className="text-gray-600">{event.description}</p>
                <p className="text-gray-600 mt-2">
                  Registration Fee: {event.registrationFee}
                </p>
                <p className="text-gray-600">
                  Total Spots: {event.totalSpots}, Spots Left: {event.spotsLeft}
                </p>
                <ul className="list-disc list-inside mt-2">
                  {event.features.map((feature, index) => (
                    <li key={index} className="text-gray-600">
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex justify-between gap-5">
                  <button
                    onClick={closeModal}
                    className="w-full text-center bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
                  >
                    Close
                  </button>
                  <Link
                    to="/register"
                    className="w-full text-center bg-cyan-500 text-white px-4 py-2 rounded hover:bg-cyan-600 transition"
                  >
                    Register Now
                  </Link>
                </div>
              </>
            )}
            {type === "live" && (
              <div className="mt-4">
                <h4 className="font-semibold">Leaders</h4>
                {event.leaders.map((leader) => (
                  <div key={leader.position} className="text-sm">
                    {leader.position}. {leader.rider} ({leader.team}) -{" "}
                    {leader.gap}
                  </div>
                ))}
              </div>
            )}
            {type === "completed" && (
              <div className="mt-4">
                <h4 className="font-semibold">Results</h4>
                {event.results.map((result) => (
                  <div key={result.position} className="text-sm">
                    {result.position}. {result.rider} ({result.team}) -{" "}
                    {result.time}
                  </div>
                ))}
              </div>
            )}
            {type != "upcoming" && (
              <button
                onClick={closeModal}
                className="mt-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
              >
                Close
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Card;
