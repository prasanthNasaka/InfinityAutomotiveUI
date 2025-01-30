import { Link, useLocation } from "react-router-dom";

const MainSideBar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <section className="w-52 bg-black h-full">
      <div className="flex-grow">
        <ul className="p-2 flex flex-col font-serif gap-5">
          <Link
            to="/registration"
            className={`p-2 text-lg text-white cursor-pointer hover:bg-cyan-600 hover:rounded-lg ${
              isActive("/registration") ? "bg-cyan-600 rounded-lg" : ""
            }`}
          >
            Registration
          </Link>
          <Link
            to="/events"
            className={`p-2 text-lg text-white cursor-pointer hover:bg-cyan-600 hover:rounded-lg ${
              isActive("/events") ? "bg-cyan-600 rounded-lg" : ""
            }`}
          >
            Events
          </Link>
          <Link
            to="/driverracelink"
            className={`p-2 text-lg text-white cursor-pointer hover:bg-cyan-600 hover:rounded-lg ${
              isActive("/driverracelink") ? "bg-cyan-600 rounded-lg" : ""
            }`}
          >
            Link race and driver
          </Link>
          <Link
            to="/timekeeper"
            className={`p-2 text-lg text-white cursor-pointer hover:bg-cyan-600 hover:rounded-lg ${
              isActive("/timekeeper") ? "bg-cyan-600 rounded-lg" : ""
            }`}
          >
            TimeKeeper
          </Link>
          <Link
            to="/bigscreen_display"
            className={`p-2 text-lg text-white cursor-pointer hover:bg-cyan-600 hover:rounded-lg ${
              isActive("/bigscreen_display") ? "bg-cyan-600 rounded-lg" : ""
            }`}
          >
            BigScr Display
          </Link>
          <Link
            to="/current_categ"
            className={`p-2 text-lg text-white cursor-pointer hover:bg-cyan-600 hover:rounded-lg ${
              isActive("/current_categ") ? "bg-cyan-600 rounded-lg" : ""
            }`}
          >
            Results
          </Link>

          <Link
            to="/scrutiny"
            className={`p-2 text-lg text-white cursor-pointer hover:bg-cyan-600 hover:rounded-lg ${
              isActive("/scrutiny") ? "bg-cyan-600 rounded-lg" : ""
            }`}
          >
            Scrutiny
          </Link>
        </ul>
      </div>
    </section>
  );
};

export default MainSideBar;
