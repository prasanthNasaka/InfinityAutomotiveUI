import { Link } from "react-router-dom";
import lambo from "../assets/lamborghini.mp4";
const Sidebar = () => {
  return (
    <section className=" p-2 w-full h-full flex flex-col bg-black ">
      <div className="flex justify-center items-center w-full h-14">
        <h2 className="text-xl font-bold text-white bg-black w-full text-center h-full">
          Highlight
        </h2>
      </div>

      <div className="flex-grow">
        <ul className="p-2 flex flex-col font-serif">
          <li className="p-2 text-lg text-white cursor-pointer hover:bg-cyan-600 hover:rounded-lg">
            <Link to="link">Live</Link>
          </li>
          <li className="p-2 text-lg text-white cursor-pointer hover:bg-cyan-600 hover:rounded-lg">
            <Link to="upcoming">Upcoming</Link>
          </li>
          <li className="p-2 text-lg flex text-white cursor-pointer hover:bg-cyan-600 hover:rounded-lg">
            <Link to="done">Done & Dusted</Link>
          </li>
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
