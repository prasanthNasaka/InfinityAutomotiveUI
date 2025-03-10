// import Card from "../Components/Card";
// import MainSideBar from "../Components/MainSideBar";
import Newheader from "../Components/Newheader";


import MainSideBar from "../Components/MainSideBar";

const Dashboard = () => {
  return (
    <div className="min-h-screen w-full h-screen flex flex-col bg-gray-100">
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
        <div className="container mx-auto p-6 ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Race Statistics Card */}
          <div className="bg-white p-6 rounded-lg shadow-lg ">
            <h2 className="text-xl font-semibold text-cyan-500 mb-4">Race Statistics</h2>
            <div className="space-y-3">
              <p className="text-gray-700">Total Races: <span className="font-bold">25</span></p>
              <p className="text-gray-700">Wins: <span className="font-bold">18</span></p>
              <p className="text-gray-700">Losses: <span className="font-bold">7</span></p>
              <p className="text-gray-700">Win Rate: <span className="font-bold">72%</span></p>
            </div>
          </div>

          {/* Upcoming Events Card */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-cyan-500 mb-4">Upcoming Events</h2>
            <div className="space-y-3">
              <p className="text-gray-700">Grand Prix - <span className="font-bold">Oct 15, 2023</span></p>
              <p className="text-gray-700">Night Race - <span className="font-bold">Nov 5, 2023</span></p>
              <p className="text-gray-700">Championship Final - <span className="font-bold">Dec 10, 2023</span></p>
            </div>
          </div>

          {/* Recent Activities Card */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-cyan-500 mb-4">Recent Activities</h2>
            <div className="space-y-3">
              <p className="text-gray-700">Completed Race: <span className="font-bold">Track A</span></p>
              <p className="text-gray-700">New Record: <span className="font-bold">Lap Time - 1:23.45</span></p>
              <p className="text-gray-700">Joined Event: <span className="font-bold">Night Race</span></p>
            </div>
          </div>
        </div>

        {/* Additional Content */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-cyan-500 mb-4">Performance Overview</h2>
          <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Chart or Graph Placeholder</p>
          </div>
        </div>
      </div>

        </div>
      {/* Main Content */}
      
    </div>
  );
};

export default Dashboard;
