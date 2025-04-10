// import { Divider } from "@mui/material";
// import { FaClock } from "react-icons/fa";

// const ResultsCard = (eventData) => {
//   console.log("eventData", eventData);

//   return (
//     <>
//       <div className="w-full flex justify-center items-center  h-auto p-2">
//         <div className="w-3/6 flex flex-col items-center h-auto border rounded-lg shadow-md">
//           <div className="w-full h-10 flex items-center p-2 justify-between rounded-t-lg bg-cyan-400">
//             <span className="text-white font-semibold">
//              {eventData.eventname}
//             </span>
//             <span className="text-cyan-400 font-bold w-fit h-fit rounded-full bg-white px-3">
//               #contestestan no.
//             </span>
//           </div>

//           <div className="w-full flex justify-between items-center p-4 gap-6">
//             <div className="flex items-center gap-4 w-1/3">
//               <img
//                 className="w-28 h-28 rounded-lg object-cover"
//                 // driver img
//                 src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5TaivUIIdSQht0uxky5eiVJIuUZorszOO0A&s"
//                 alt="contestant"
//               />
//               <div className="flex flex-col text-sm font-medium gap-1">
//                 <span>driverName</span>
//                 <span>evtClass</span>
//               </div>
//             </div>

//             <Divider
//               orientation="vertical"
//               flexItem
//               sx={{ borderRightWidth: "2px" }}
//             />

//             <div className="flex items-center gap-4 w-1/3">
//               <img
//                 className="w-28 h-28 rounded-lg object-cover"
//                 src="https://imgd.aeplcdn.com/370x208/n/ih9n6sa_1475616.jpg?q=80"
//                 alt="vehicle"
//               />
//               <div className="flex flex-col text-sm font-medium gap-1">
//                 <span>Vehicle Make Model</span>
//               </div>
//             </div>

//             <Divider
//               orientation="vertical"
//               flexItem
//               sx={{ borderRightWidth: "2px" }}
//             />

//             <div className="w-1/3 bg-gray-50 rounded-lg p-3 text-sm font-medium flex flex-col gap-1">
//               <h4 className="text-base font-semibold mb-1 flex items-center gap-1">
//                 {" "}
//                 <FaClock className="text-cyan-400" /> Race Timings
//               </h4>
//               <span>Start Date: </span>
//               <span>End Date: </span>
//               <span>Total Duration: </span>
//               <span>Penalty: </span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ResultsCard;

import { useEffect, useState } from "react";
import { Divider } from "@mui/material";
import { FaClock } from "react-icons/fa";
import AxiosInstance from "./AxiosInstance";
import { IMAGE_URL } from "../constants/global-const";

const ResultsCard = () => {
  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch event data with static EventId
  const fetchData = async () => {
    try {
      const response = await AxiosInstance.get(`/api/LandingPage/ById`, {
        params: { EventId: 10 }, // Static EventId as 10
      });

      setEventData(response.data[0]); // Assuming the response is an array, we pick the first item
    } catch (error) {
      console.error("Failed to fetch data", error);
      // Optionally show a toast or error message
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array to call fetchData only once when the component mounts

  // Show loading state while data is being fetched
  if (loading) return <div>Loading...</div>;

  // If no data, return early
  if (!eventData) return <div>No event data available</div>;

  return (
    <div className="w-full flex justify-center items-center h-auto p-2">
      <div className="w-3/6 flex flex-col items-center h-auto border rounded-lg shadow-md">
        <div className="w-full h-10 flex items-center p-2 justify-between rounded-t-lg bg-cyan-400">
          <span className="text-white font-semibold">
            {eventData.eventname}
          </span>
          <span className="text-cyan-400 font-bold w-fit h-fit rounded-full bg-white px-3">
            #{eventData.contestentNumb}
          </span>
        </div>

        <div className="w-full flex justify-between items-center p-4 gap-6">
          {/* Driver section */}
          <div className="flex items-center gap-4 w-1/3">
            <img
              className="w-28 h-28 rounded-lg object-cover"
              src={`${IMAGE_URL}${eventData.driverPhoto}`} // Use driver photo path from API response
              alt="contestant"
            />
            <div className="flex flex-col text-sm font-medium gap-1">
              <span>{eventData.driverName}</span>
              <span>{eventData.eventClass}</span>
            </div>
          </div>

          <Divider
            orientation="vertical"
            flexItem
            sx={{ borderRightWidth: "2px" }}
          />

          {/* Vehicle section */}
          <div className="flex items-center gap-4 w-1/3">
            <img
              className="w-28 h-28 rounded-lg object-cover"
              src={`${IMAGE_URL}${eventData.vechPhoto}`} // Use vehicle photo path from API response
              alt="vehicle"
            />
            <div className="flex flex-col text-sm font-medium gap-1">
              <span>{eventData.vechMakeModel}</span>
            </div>
          </div>

          <Divider
            orientation="vertical"
            flexItem
            sx={{ borderRightWidth: "2px" }}
          />

          {/* Race timings section */}
          <div className="w-1/3 bg-gray-50 rounded-lg p-3 text-sm font-medium flex flex-col gap-1">
            <h4 className="text-base font-semibold mb-1 flex items-center gap-1">
              <FaClock className="text-cyan-400" /> Race Timings
            </h4>
            <span>Start Date: {eventData.starttime || "N/A"}</span>
            <span>End Date: {eventData.endtime || "N/A"}</span>
            <span>Total Duration: {eventData.totaltime || "N/A"}</span>
            <span>Penalty: {eventData.penaltytime || "N/A"}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsCard;
