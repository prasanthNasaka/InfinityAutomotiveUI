// import Card from "../Components/Card";
// import MainSideBar from "../Components/MainSideBar";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, Clock, Thermometer as Speedometer, Flag } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

import Newheader from "../Components/Newheader";

import MainSideBar from "../Components/MainSideBar";

const sampleData = [
  {
    id: 1,
    name: "Max Verstappen",
    team: "Red Bull",
    lapTime: "1:32.456",
    speed: "215 km/h",
  },
  {
    id: 2,
    name: "Lewis Hamilton",
    team: "Mercedes",
    lapTime: "1:33.012",
    speed: "213 km/h",
  },
  {
    id: 3,
    name: "Charles Leclerc",
    team: "Ferrari",
    lapTime: "1:33.210",
    speed: "212 km/h",
  },
  {
    id: 4,
    name: "Lando Norris",
    team: "McLaren",
    lapTime: "1:33.876",
    speed: "210 km/h",
  },
];

const Dashboard = () => {
  const [leaderboard, setLeaderboard] = useState(sampleData);
  const [speedData, setSpeedData] = useState([
    { lap: 1, maxVerstappen: 115, lewisHamilton: 213, charlesLeclerc: 212 },
    { lap: 2, maxVerstappen: 250, lewisHamilton: 252, charlesLeclerc: 255 },
    { lap: 3, maxVerstappen: 316, lewisHamilton: 215, charlesLeclerc: 213 },
    { lap: 4, maxVerstappen: 416, lewisHamilton: 215, charlesLeclerc: 213 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSpeedData((prev) => {
        const newLap = prev.length + 1;
        return [
          ...prev.slice(-9), // Keep only the last 10 laps for performance
          {
            lap: newLap,
            maxVerstappen: 210 + Math.random() * 10, // Random speed variation
            lewisHamilton: 208 + Math.random() * 10,
            charlesLeclerc: 207 + Math.random() * 10,
          },
        ];
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setLeaderboard((prev) => {
        // Randomly adjust lap times to simulate new lap data
        const updatedData = prev.map((driver) => ({
          ...driver,
          lapTime: (
            parseFloat(driver.lapTime) +
            (Math.random() * 0.1 - 0.05)
          ).toFixed(3), // Slight variation
        }));

        // Sort updated data based on new lap times
        return [...updatedData].sort(
          (a, b) => parseFloat(a.lapTime) - parseFloat(b.lapTime)
        );
      });
    }, 800); // Runs every 500ms

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen w-full h-screen flex flex-col ">
      {/* Navigation Bar */}
      <Newheader />
      {/* <nav className="bg-white p-4  ">
        <div className="container flex justify-between items-center ">
          <div className="flex">
          <FaFlagCheckered className="text-3xl" />

<h1 className="text-3xl font- font-bold text-cyan-500">Amon</h1>
<h1 className="text-3xl font-bold text-black">Racing</h1>
          </div>
         
          <div className="flex items-center space-x-4">
            <span className="text-lg">Welcome, Racer!</span>
            <img className="border w-10 rounded-lg h-10"
              
            />
          </div>
        </div>
      </nav> */}

      <div className="w-full flex h-full">
        <div className="h-full">
          <MainSideBar />
        </div>
        <div className="p-6 w-full">
          <h1 className="text-3xl font-bold text-center mb-6">
            🏁 Live Race Dashboard
          </h1>

          {/* Dashboard Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Race Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="p-6 rounded-lg shadow-lg"
            >
              <h2 className="text-xl font-semibold mb-4">📊 Race Statistics</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-lg">
                  <Flag className="text-red-500" />
                  <span>Total Laps:</span>
                  <strong>58</strong>
                </div>
                <div className="flex items-center gap-3 text-lg">
                  <Clock className="text-green-500" />
                  <span>Current Lap:</span>
                  <strong>23</strong>
                </div>
                <div className="flex items-center gap-3 text-lg">
                  <Speedometer className="text-yellow-500" />
                  <span>Track Temperature:</span>
                  <strong>38°C</strong>
                </div>
                <div className="flex items-center gap-3 text-lg">
                  <MapPin className="text-blue-500" />
                  <span>Track Location:</span>
                  <strong>Silverstone</strong>
                </div>
              </div>
            </motion.div>

            {/* Leaderboard */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="p-6 rounded-lg shadow-lg md:col-span-2"
            >
              <h2 className="text-xl font-semibold mb-4">🏎 Live Leaderboard</h2>
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="p-2 text-left">Rank</th>
                    <th className="p-2 text-left">Driver</th>
                    <th className="p-2 text-left">Lap Time</th>
                    <th className="p-2 text-left">Speed</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.map((driver, index) => (
                    <motion.tr
                      key={driver.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <td className="p-2 font-bold">{index + 1}</td>
                      <td className="p-2">
                        {driver.name}{" "}
                        <span className="text-gray-400 ml-2">
                          ({driver.team})
                        </span>
                      </td>
                      <td className="p-2">{driver.lapTime}</td>
                      <td className="p-2">{driver.speed}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          </div>

          {/* Speed Graph (Placeholder) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-6 rounded-lg shadow-lg"
          >
            <h2 className="text-xl font-semibold mb-4">📊 Speed Analysis</h2>
            <div className="h-60 w-full rounded-lg flex items-center justify-center">
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={speedData}>
                  <XAxis dataKey="lap" stroke="#8884d8" />
                  <YAxis stroke="#82ca9d" />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="maxVerstappen"
                    stroke="#ff7300"
                    strokeWidth={2}
                    name="Max Verstappen"
                  />
                  <Line
                    type="monotone"
                    dataKey="lewisHamilton"
                    stroke="#00C49F"
                    strokeWidth={2}
                    name="Lewis Hamilton"
                  />
                  <Line
                    type="monotone"
                    dataKey="charlesLeclerc"
                    stroke="#8884d8"
                    strokeWidth={2}
                    name="Charles Leclerc"
                  />
                   <Line
                    type="monotone"
                    dataKey="charlesLeclerc"
                    stroke="#2563EB"
                    strokeWidth={2}
                    name="Charles Leclerc"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
        {/* <div className="container mx-auto p-6 ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         
          <div className="bg-white p-6 rounded-lg shadow-lg ">
            <h2 className="text-xl font-semibold text-cyan-500 mb-4">Race Statistics</h2>
            <div className="space-y-3">
              <p className="text-gray-700">Total Races: <span className="font-bold">25</span></p>
              <p className="text-gray-700">Wins: <span className="font-bold">18</span></p>
              <p className="text-gray-700">Losses: <span className="font-bold">7</span></p>
              <p className="text-gray-700">Win Rate: <span className="font-bold">72%</span></p>
            </div>
          </div>

         
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-cyan-500 mb-4">Upcoming Events</h2>
            <div className="space-y-3">
              <p className="text-gray-700">Grand Prix - <span className="font-bold">Oct 15, 2023</span></p>
              <p className="text-gray-700">Night Race - <span className="font-bold">Nov 5, 2023</span></p>
              <p className="text-gray-700">Championship Final - <span className="font-bold">Dec 10, 2023</span></p>
            </div>
          </div>

        
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-cyan-500 mb-4">Recent Activities</h2>
            <div className="space-y-3">
              <p className="text-gray-700">Completed Race: <span className="font-bold">Track A</span></p>
              <p className="text-gray-700">New Record: <span className="font-bold">Lap Time - 1:23.45</span></p>
              <p className="text-gray-700">Joined Event: <span className="font-bold">Night Race</span></p>
            </div>
          </div>
        </div>

       
        <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-cyan-500 mb-4">Performance Overview</h2>
          <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Chart or Graph Placeholder</p>
          </div>
        </div>
      </div> */}
      </div>
      {/* Main Content */}
    </div>
  );
};

export default Dashboard;
