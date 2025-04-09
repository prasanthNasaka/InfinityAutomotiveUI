import { Divider } from "@mui/material";
import { FaClock } from "react-icons/fa";

const ResultsCard = (eventData) => {
  console.log("eventData", eventData);

  return (
    <>
      <div className="w-full flex justify-center items-center  h-auto p-2">
        <div className="w-3/6 flex flex-col items-center h-auto border rounded-lg shadow-md">
          <div className="w-full h-10 flex items-center p-2 justify-between rounded-t-lg bg-cyan-400">
            <span className="text-white font-semibold">
             {eventData.eventname} 
            </span>
            <span className="text-cyan-400 font-bold w-fit h-fit rounded-full bg-white px-3">
              #143
            </span>
          </div>

          <div className="w-full flex justify-between items-center p-4 gap-6">
            <div className="flex items-center gap-4 w-1/3">
              <img
                className="w-28 h-28 rounded-lg object-cover"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5TaivUIIdSQht0uxky5eiVJIuUZorszOO0A&s"
                alt="contestant"
              />
              <div className="flex flex-col text-sm font-medium gap-1">
                <span>Contestant</span>
                <span>Class</span>
              </div>
            </div>

            <Divider
              orientation="vertical"
              flexItem
              sx={{ borderRightWidth: "2px" }}
            />

            <div className="flex items-center gap-4 w-1/3">
              <img
                className="w-28 h-28 rounded-lg object-cover"
                src="https://imgd.aeplcdn.com/370x208/n/ih9n6sa_1475616.jpg?q=80"
                alt="vehicle"
              />
              <div className="flex flex-col text-sm font-medium gap-1">
                <span>Vehicle Make Model</span>
              </div>
            </div>

            <Divider
              orientation="vertical"
              flexItem
              sx={{ borderRightWidth: "2px" }}
            />

            <div className="w-1/3 bg-gray-50 rounded-lg p-3 text-sm font-medium flex flex-col gap-1">
              <h4 className="text-base font-semibold mb-1 flex items-center gap-1">
                {" "}
                <FaClock className="text-cyan-400" /> Race Timings
              </h4>
              <span>Start Date: </span>
              <span>End Date: </span>
              <span>Total Duration: </span>
              <span>Penalty: </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResultsCard;
