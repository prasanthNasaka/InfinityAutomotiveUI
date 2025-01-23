import { Link, useLocation } from "react-router-dom";
import lambo from "../assets/lamborghini.mp4";
const Sidebar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <section className=" p-2 w-full h-full flex flex-col bg-black ">
      <div className="flex justify-center items-center w-full h-14">
        <h2 className="text-xl font-bold text-white bg-black w-full text-center h-full">
          Highlight
        </h2>
      </div>

      <div className="flex-grow">
        <ul className="p-2 flex flex-col font-serif">
          <Link
            to="/dashboard/live"
            className={`p-2 text-lg text-white cursor-pointer hover:bg-cyan-600 hover:rounded-lg ${
              isActive("/dashboard/live") ? "bg-cyan-600 rounded-lg" : ""
            }`}
          >
            Live
          </Link>
          <Link
            to="/dashboard/upcoming"
            className={`p-2 text-lg text-white cursor-pointer hover:bg-cyan-600 hover:rounded-lg ${
              isActive("/dashboard/upcoming") ? "bg-cyan-600 rounded-lg" : ""
            }`}
          >
            Upcoming
          </Link>
          <Link
            to="/dashboard/done"
            className={`p-2 text-lg text-white cursor-pointer hover:bg-cyan-600 hover:rounded-lg ${
              isActive("/dashboard/done") ? "bg-cyan-600 rounded-lg" : ""
            }`}
          >
            Done & Dusted
          </Link>
        </ul>
      </div>

      <div className="w-full flex-grow flex justify-center items-center overflow-hidden">
        <video
          className="w-full h-full object-cover desk:max-h-[700px] lappy:max-h-[600px] tab:max-h-[500px]"
          autoPlay
          loop
          muted
          preload="auto"
          src={lambo}
        ></video>
      </div>
    </section>
  );
};

export default Sidebar;
