import { useEffect, useState } from "react";
import { FaClock } from "react-icons/fa";
import AxiosInstance from "./AxiosInstance";
import { IMAGE_URL } from "../constants/global-const";

const ResultsCard = () => {
  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await AxiosInstance.get(`/api/LandingPage/ById`, {
        params: { EventId: 10 },
      });

      setEventData(response.data[0]);
    } catch (error) {
      console.error("Failed to fetch data", error);

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  if (!eventData) return <div>No event data available</div>;

  return (
    <div className="w-full flex justify-center items-center h-auto p-2">
      <div className="w-3/7  flex flex-col items-center h-auto border rounded-lg shadow-md">
        <div className="w-full h-10 flex items-center p-2 justify-between rounded-t-lg bg-cyan-400">
          <span className="text-black font-bold w-fit h-fit rounded-full bg-white px-3">
          {eventData.driverName}          
           </span>
         
          <span className="text-black font-bold w-fit h-fit rounded-full bg-white px-3">
          {eventData.eventClass}         
            </span>
          

          <span className="text-cyan-400 font-bold w-fit h-fit rounded-full bg-white px-3">
            # {eventData.contestentNumb} 
          </span>
        </div>

        <div className="w-full flex flex-col items-center p-2 gap-2">
         
          <div className="flex items-center justify-between w-full gap-4 border p-4 rounded-lg">
           
            <div className="w-28 h-28">
              <img
                src={`${IMAGE_URL}${eventData.driverPhoto}`}
                alt="contestant"
                className="w-full h-full object-fill rounded-lg border-2 border-cyan-500"
              />
            </div>

            <div className="flex-1">
              <div className="bg-gray-50 rounded-lg p-4 text-sm font-medium flex flex-col gap-3">
                <h4 className="text-base font-semibold flex items-center gap-2 border-b pb-1">
                  <FaClock className="text-cyan-400" />
                  Race Timings
                </h4>

                <div className="flex justify-between px-2 gap-2">
                  <span>Start Time: {eventData.starttime || "N/A"}</span>
                  <span>End Time: {eventData.endtime || "N/A"} </span>
                </div>

                <div className="flex justify-between px-2 gap-2">
                  <span>Total Duration: {eventData.totaltime || "N/A"}</span>
                  <span>Penalty: {eventData.penaltytime || "N/A"} </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center flex-col gap-4 w-full p-2 border bg-cyan-400  rounded-lg">
            <div className="w-full h-20  ">
              <img
                src={`${IMAGE_URL}${eventData.vechPhoto}`}
                alt="vehicle"
                className="w-full h-full object-fill rounded-lg border"
              />
            </div>
            <div className="flex  text-md font-medium gap-1 justify-center items-center h-fit w-full">
              <span>{eventData.vechMakeModel}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsCard;
